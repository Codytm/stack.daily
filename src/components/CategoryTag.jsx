export default function CategoryTag({ label, color, bg }) {
  return (
    <div
      style={{
        display: "inline-block",
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: 0.3,
        color,
        background: bg,
        padding: "3px 8px",
        borderRadius: 4,
        marginBottom: 12,
      }}
    >
      {label}
    </div>
  );
}
