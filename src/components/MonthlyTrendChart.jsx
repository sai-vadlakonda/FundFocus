import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* 🔹 Group history by month */
const groupByMonth = (history) => {
  const map = {};

  history.forEach((h) => {
    const date = new Date(h.date || h.time || Date.now());
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!map[month]) {
      map[month] = { month, earned: 0, spent: 0 };
    }

    if (h.type === "earn") map[month].earned += h.amount;
    if (h.type === "spend") map[month].spent += h.amount;
  });

  return Object.values(map);
};

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--text)",
  boxShadow: "var(--shadow)",
};

export default function MonthlyTrendChart({ history = [] }) {
  const data = groupByMonth(history);

  if (!data.length) return null;

  return (
    <div className="card" style={{ marginTop: 28 }}>
      <h4>📆 Monthly Attention Trend</h4>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="var(--muted)" />
          <YAxis stroke="var(--muted)" />
          <Tooltip contentStyle={tooltipStyle} />

          <Line
            type="monotone"
            dataKey="earned"
            stroke="var(--success)"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="spent"
            stroke="var(--danger)"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
