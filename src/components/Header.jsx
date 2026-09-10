import { Terminal, Flame } from "lucide-react";

export default function Header({ puzzleNumber, streak }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Terminal size={20} color="var(--green)" strokeWidth={2} />
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 16, fontWeight: 700 }}>stack.daily()</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)" }}>#{puzzleNumber}</div>
        </div>
      </div>
      {streak > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--mono)", fontSize: 13, color: "var(--flame)" }}>
          <Flame size={16} fill="var(--flame)" color="var(--flame)" />
          {streak}
        </div>
      )}
    </div>
  );
}
