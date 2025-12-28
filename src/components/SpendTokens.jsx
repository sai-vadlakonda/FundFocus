import { useTokens } from "../context/TokenContext";
import axios from "axios";

export default function SpendTokens() {
  const { spendTokens } = useTokens();

  const handleSpend = async (source, amount) => {
    try {
      await spendTokens(source, amount);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "❌ Spend failed"
      );
    }
  };

  return (
    <div className="action-buttons">
      <button
        className="action-btn action-btn-spend"
        onClick={() => handleSpend("YouTube", 5)}
      >
        📺 YouTube
        <span className="action-amount">-5</span>
      </button>

      <button
        className="action-btn action-btn-spend"
        onClick={() => handleSpend("Instagram", 4)}
      >
        📸 Instagram
        <span className="action-amount">-4</span>
      </button>

      <button
        className="action-btn action-btn-spend"
        onClick={() => handleSpend("Games", 3)}
      >
        🎮 Games
        <span className="action-amount">-3</span>
      </button>
    </div>
  );
}
