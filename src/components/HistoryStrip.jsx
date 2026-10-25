import { lastNDays } from "../lib/streak.js";
import { historyByDate } from "../lib/storage.js";

export default function HistoryStrip({ stats, todayKey }) {
  const days = lastNDays(todayKey, 14);
  const byDate = historyByDate(stats);

  return (
    <div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>
        last 14 days
      </div>
      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
        {days.map((date) => {
          const entry = byDate[date];
          const isToday = date === todayKey;
          let bg = "var(--border)";
          let title = date;
          if (entry) {
            const ratio = entry.score / entry.total;
            bg = ratio === 1 ? "var(--green)" : ratio >= 0.6 ? "#7d9a4a" : "var(--red-border)";
            title = `${date}: ${entry.score}/${entry.total}`;
          }
          return (
            <div
              key={date}
              title={title}
              style={{
                width: 12,
                height: 22,
                borderRadius: 3,
                background: bg,
                outline: isToday ? "2px solid var(--primary)" : "none",
                outlineOffset: 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
