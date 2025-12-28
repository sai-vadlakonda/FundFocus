import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* 🔹 Group history by day */
const groupByDay = (history) => {
  const map = {};

  history.forEach((h) => {
    const day = new Date(h.date || h.time || Date.now())
      .toLocaleDateString("en-IN", { weekday: "short" });

    if (!map[day]) {
      map[day] = { day, earned: 0, spent: 0 };
    }

    if (h.type === "earn") map[day].earned += h.amount;
    if (h.type === "spend") map[day].spent += h.amount;
  });

  return Object.values(map).slice(-7);
};

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--text)",
  boxShadow: "var(--shadow)",
};

export default function TrendCharts({ history = [] }) {
  const data = groupByDay(history);

  if (!data.length) return null;

  return (
    <div className="card" style={{ marginTop: 28 }}>
      <h4>📅 Weekly Attention Trend</h4>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="var(--muted)" />
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
