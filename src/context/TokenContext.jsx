import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const TokenContext = createContext();
const API = "http://localhost:5000/api/tokens";

export function TokenProvider({ children }) {
  const [summary, setSummary] = useState({
    earned: 0,   // TODAY
    spent: 0,    // TODAY
    balance: 0,  // LIFETIME
    recent: [],
  });

  const socketRef = useRef(null);
  const token = localStorage.getItem("focusfund_token");

  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  /* =========================
     🔹 FETCH SUMMARY (NORMALIZED)
     ========================= */
  const fetchSummary = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${API}/summary`, { headers });

      const { today, lifetime, recent } = res.data;

      setSummary({
        earned: today?.earned ?? 0,
        spent: today?.spent ?? 0,
        balance: lifetime?.balance ?? 0,
        recent: recent ?? [],
      });
    } catch (err) {
      console.error("SUMMARY ERROR:", err);
      toast.error("Failed to load dashboard data");
    }
  };

  /* =========================
     🔹 INITIAL LOAD + AUTO REFRESH
     ========================= */
  useEffect(() => {
    fetchSummary();

    const interval = setInterval(fetchSummary, 60 * 1000);
    return () => clearInterval(interval);
  }, [token]);

  /* =========================
     🔥 SOCKET LIVE SYNC
     ========================= */
  useEffect(() => {
    if (!token) return;

    const socket = io("http://localhost:5000", {
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Token socket connected");
    });

    socket.on("child-token-update", fetchSummary);

    socket.on("child-limit-hit", (data) => {
      toast.error(
        `🚫 Daily limit reached (${data.dailyLimit} tokens)`,
        { duration: 5000 }
      );
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token]);

  /* =========================
     🔹 ACTIONS
     ========================= */

  const earnTokens = async (source, amount) => {
    try {
      await axios.post(
        `${API}/earn`,
        { source, amount },
        { headers }
      );

      toast.success(`🎉 Earned ${amount} tokens`);
      fetchSummary();
    } catch {
      toast.error("Failed to earn tokens");
    }
  };

  const spendTokens = async (source, amount) => {
    try {
      await axios.post(
        `${API}/spend`,
        { source, amount },
        { headers }
      );

      toast.success(`💸 Spent ${amount} tokens`);
      fetchSummary();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Unable to spend tokens"
      );
    }
  };

  return (
    <TokenContext.Provider
      value={{
        summary,
        earnTokens,
        spendTokens,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  return useContext(TokenContext);
}
