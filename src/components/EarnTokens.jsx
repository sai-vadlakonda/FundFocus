import { useTokens } from "../context/TokenContext";

const earnOptions = [
  { label: "Reading", amount: 10, icon: "📘" },
  { label: "Exercise", amount: 8, icon: "🏃‍♂️" },
  { label: "Homework", amount: 12, icon: "📝" },
];

export default function EarnTokens() {
  const { earnTokens } = useTokens();

  return (
    <div className="action-buttons">
      {earnOptions.map((item) => (
        <button
          key={item.label}
          className="action-btn action-btn-earn"
          onClick={() => earnTokens(item.label, item.amount)}
        >
          <span className="action-icon">{item.icon}</span>
          <span className="action-text">{item.label}</span>
          <span className="action-amount">+{item.amount}</span>
        </button>
      ))}
    </div>
  );
}
