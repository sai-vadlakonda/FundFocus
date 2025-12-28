import { useAuth } from "../context/AuthContext";
import { useTokens } from "../context/TokenContext";
import { useTheme } from "../context/ThemeContext";

import WalletCard from "../components/WalletCard";
import EarnTokens from "../components/EarnTokens";
import SpendTokens from "../components/SpendTokens";
import TransactionHistory from "../components/TransactionHistory";

export default function ChildView() {
  const { user, logout } = useAuth();
  const { summary } = useTokens();
  const { theme, toggleTheme } = useTheme();

  // ✅ USE SUMMARY DIRECTLY (DO NOT RE-COMPUTE)
  const earned = summary.earned;
  const spent = summary.spent;
  const balance = summary.balance;
  const recent = summary.recent;

  return (
    <div className="container dashboard">
      {/* HEADER */}
      <header className="dashboard-header">
        <div>
          <h1>👶 Child Dashboard</h1>
          <p>
            Welcome, <strong>{user?.username}</strong> 👋 <br />
            Earn attention through good habits. Spend it wisely.
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

      {/* WALLET */}
      <WalletCard
        earned={earned}
        spent={spent}
        balance={balance}
      />

      {/* ACTIONS */}
      <section className="dashboard-grid">
        <div className="card">
          <h2>➕ Earn Balance</h2>
          <EarnTokens />
        </div>

        <div className="card">
          <h2>➖ Spend Balance</h2>
          <SpendTokens />
        </div>
      </section>

      {/* HISTORY */}
      <TransactionHistory history={recent} />
    </div>
  );
}
