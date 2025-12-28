import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { socket } from "../utils/socket";

import ChildCharts from "../components/ChildCharts";
import TrendCharts from "../components/TrendCharts";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import SmartInsights from "../components/SmartInsights";
import ParentControls from "../components/ParentControls";
import TransactionHistory from "../components/TransactionHistory";

/* 🔹 SMALL STAT CARD */
const Stat = ({ label, value }) => (
  <div className="stat-card">
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
  </div>
);

export default function ParentView() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     🔹 FETCH CHILDREN
     ========================= */
  const fetchChildren = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/children/${user.id}`
      );
      setChildren(res.data || []);
    } catch (err) {
      console.error("Fetch children error:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /* =========================
     🔥 SOCKET LIVE SYNC
     ========================= */
  useEffect(() => {
    if (!user?.id) return;

    fetchChildren();

    socket.connect();
    socket.emit("join-parent", user.id);
    socket.on("child-token-update", fetchChildren);

    return () => {
      socket.off("child-token-update", fetchChildren);
      socket.disconnect();
    };
  }, [user, fetchChildren]);

  /* =========================
     🔹 CALCULATE STATS
     ========================= */
  const calculateStats = (history = []) => {
    const earned = history
      .filter((h) => h.type === "earn")
      .reduce((s, h) => s + h.amount, 0);

    const spent = history
      .filter((h) => h.type === "spend")
      .reduce((s, h) => s + h.amount, 0);

    return {
      earned,
      spent,
      balance: earned - spent,
    };
  };

  return (
    <div className="container dashboard">
      {/* ================= HEADER ================= */}
      <header className="dashboard-header">
        <div>
          <h1>👨‍👩‍👧 Parent Dashboard</h1>
          <p>
            Welcome, <strong>{user?.username}</strong>
          </p>
        </div>

        <div className="header-actions">
          <button className="btn btn-theme" onClick={toggleTheme}>
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>

          <button className="btn btn-red" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* ================= ANALYTICS ================= */}
      <section className="card dashboard-analytics">
        <h2>📊 Live Child Analytics</h2>

        {loading && <p>Loading children data...</p>}
        {!loading && children.length === 0 && (
          <p>No children linked yet.</p>
        )}

        <div className="dashboard-grid">
          {children.map((child) => {
            const history = child.history || [];
            const stats = calculateStats(history);

            return (
              <div key={child._id} className="child-card">
                <h3>👶 {child.username}</h3>

                {/* ===== STATS ===== */}
                <div className="stats-grid">
                  <Stat label="🟢 Earned" value={stats.earned} />
                  <Stat label="🔴 Spent" value={stats.spent} />
                  <Stat label="💰 Balance" value={stats.balance} />
                </div>

                {/* ===== CHARTS (VISUAL LAYER) ===== */}
                <ChildCharts
                  earned={stats.earned}
                  spent={stats.spent}
                />

                <TrendCharts history={history} />
                <MonthlyTrendChart history={history} />

                {/* ===== HISTORY (NEUTRAL BG) ===== */}
                <TransactionHistory history={history} />

                {/* ===== CONTROLS ===== */}
                <SmartInsights history={history} />
                <ParentControls childId={child._id} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
