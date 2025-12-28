import { useTokens } from "../context/TokenContext";

export default function Dashboard() {
  const { summary } = useTokens();

  if (!summary) return null;

  return (
    <div>
      <h3>📊 Attention Dashboard</h3>
      <p>Earned Today: {summary.earned}</p>
      <p>Spent Today: {summary.spent}</p>
      <p>Net Balance: {summary.net}</p>
    </div>
  );
}
