import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--text)",
  boxShadow: "var(--shadow)",
};

export default function ChildCharts({ earned = 0, spent = 0 }) {
  const barData = [
    { name: "Earned", value: earned },
    { name: "Spent", value: spent },
  ];

  const pieData = [
    { name: "Earned", value: earned },
    { name: "Spent", value: spent },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24,
        marginTop: 24,
      }}
    >
      {/* 📊 BAR CHART */}
      <div className="card">
        <h4>📊 Earn vs Spent</h4>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="var(--muted)" />
            <YAxis stroke="var(--muted)" />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="var(--accent)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🍩 DONUT CHART */}
      <div className="card">
        <h4>🍩 Balance Overview</h4>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            {/* 🔥 FIXED TOOLTIP */}
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value, name) => [`${value}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
