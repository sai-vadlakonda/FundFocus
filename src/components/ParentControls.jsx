import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ParentControls({ childId }) {
  const [dailyLimit, setDailyLimit] = useState("");

  const token = localStorage.getItem("focusfund_token");

  const saveLimit = async () => {
    if (!token) {
      toast.error("Session expired. Please login again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tokens/set-limits",
        {
          childId,
          dailySpendLimit: Number(dailyLimit),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Daily limit fixed. You can edit it anytime."
      );
      setDailyLimit("");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to save daily limit"
      );
    }
  };

  return (
    <div className="card" style={{ marginTop: 24 }}>
      <h4>🛑 Parent Controls</h4>

      <input
        type="number"
        placeholder="Daily token limit"
        value={dailyLimit}
        onChange={(e) => setDailyLimit(e.target.value)}
        style={{
          marginTop: 12,
          padding: 10,
          width: "100%",
          borderRadius: 10,
        }}
      />

      <button
        className="btn btn-blue"
        onClick={saveLimit}
        style={{ marginTop: 14 }}
      >
        Save Limit
      </button>
    </div>
  );
}
