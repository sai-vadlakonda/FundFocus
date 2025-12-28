const getInsights = (history = []) => {
  if (history.length === 0) return null;

  const appUsage = {};
  let totalSpent = 0;

  history.forEach((h) => {
    if (h.type === "spend") {
      appUsage[h.source] = (appUsage[h.source] || 0) + h.amount;
      totalSpent += h.amount;
    }
  });

  if (totalSpent === 0) {
    return {
      message: "Great job! No attention was wasted 🎉",
      severity: "good",
    };
  }

  const mostUsedApp = Object.keys(appUsage).reduce((a, b) =>
    appUsage[a] > appUsage[b] ? a : b
  );

  const percentage = Math.round(
    (appUsage[mostUsedApp] / totalSpent) * 100
  );

  let severity = "medium";
  if (percentage > 60) severity = "high";
  if (percentage < 30) severity = "low";

  return {
    app: mostUsedApp,
    percentage,
    severity,
    message: `Most attention lost on ${mostUsedApp} (${percentage}%)`,
  };
};

export default function SmartInsights({ history }) {
  const insight = getInsights(history);

  if (!insight) return null;

  const bgColor =
    insight.severity === "high"
      ? "#fee2e2"
      : insight.severity === "medium"
      ? "#fef9c3"
      : "#dcfce7";

  const textColor =
    insight.severity === "high"
      ? "#991b1b"
      : insight.severity === "medium"
      ? "#92400e"
      : "#166534";

  return (
    <div
      style={{
        marginTop: 24,
        padding: 16,
        borderRadius: 14,
        background: bgColor,
        color: textColor,
      }}
    >
      <h4 style={{ marginBottom: 6 }}>🧠 Smart Insight</h4>
      <p>{insight.message}</p>

      {insight.severity === "high" && (
        <p style={{ marginTop: 6 }}>
          💡 Suggestion: Consider limiting this app or replacing it with a
          learning activity.
        </p>
      )}
    </div>
  );
}
