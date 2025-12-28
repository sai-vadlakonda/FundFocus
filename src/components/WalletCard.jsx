export default function WalletCard({ earned = 0, spent = 0, balance = 0 }) {
  return (
    <div className="wallet-card">
      <div className="wallet-header">
        <h2>🎒 FocusFund Wallet</h2>
        <p>Your attention balance at a glance</p>
      </div>

      <div className="wallet-stats">
        <Stat label="🟢 Earned" value={earned} type="earned" />
        <Stat label="🔴 Spent" value={spent} type="spent" />
        <Stat label="💰 Balance" value={balance} type="balance" />
      </div>
    </div>
  );
}

const Stat = ({ label, value, type }) => {
  return (
    <div className={`wallet-stat ${type}`}>
      <div className="wallet-stat-label">{label}</div>
      <div className="wallet-stat-value">{value}</div>
    </div>
  );
};
