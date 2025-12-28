import { useTokens } from "../context/TokenContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AttentionChart() {
  const { summary } = useTokens();

  if (!summary) return null;

  const data = [
    { name: "Earned", value: summary.earned },
    { name: "Spent", value: summary.spent },
  ];

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
