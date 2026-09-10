export default function ProgressBar({ total, current }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            background: i < current ? "var(--green)" : i === current ? "var(--ink)" : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}
