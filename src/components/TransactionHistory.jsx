export default function TransactionHistory({ history = [] }) {
  if (!history.length) {
    return (
      <div className="card" style={{ marginTop: 30, textAlign: "center" }}>
        No activity yet 🚀
      </div>
    );
  }

  // ✅ FORCE LATEST FIRST (LIFO)
  const sortedHistory = [...history].sort(
    (a, b) =>
      new Date(b.date || b.timeStamp || b.time) -
      new Date(a.date || a.timeStamp || a.time)
  );

  return (
    <div className="card" style={{ marginTop: 30 }}>
      <h3 style={{ marginBottom: 20 }}>📜 Transaction History</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          maxHeight: 340,
          overflowY: "auto",
          paddingRight: 6,
        }}
      >
        {sortedHistory.map((item, index) => {
          const isEarn = item.type === "earn";

          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
                background: "var(--card)",
                border: "1px solid var(--border-soft)",
              }}
            >
              {/* LEFT */}
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isEarn ? "var(--success)" : "var(--danger)",
                  }}
                >
                  {isEarn ? "➕ Earned" : "➖ Spent"} • {item.source}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    marginTop: 4,
                  }}
                >
                  {new Date(
                    item.date || item.timeStamp || item.time
                  ).toLocaleString()}
                </div>
              </div>

              {/* RIGHT */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: isEarn ? "var(--success)" : "var(--danger)",
                }}
              >
                {isEarn ? "+" : "-"}
                {item.amount}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
