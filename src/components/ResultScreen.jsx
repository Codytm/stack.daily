import { useState } from "react";
import { Flame, Share2 } from "lucide-react";

export default function ResultScreen({ answers, stats, puzzleNumber, buildShareText }) {
  const [copied, setCopied] = useState(false);
  const score = answers.filter((a) => a.correct).length;

  function copyShare() {
    navigator.clipboard.writeText(buildShareText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "1.5rem", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>score</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 36, fontWeight: 700, marginBottom: 12 }}>{score}/5</div>
      <div style={{ fontSize: 24, letterSpacing: 3, marginBottom: 16 }}>
        {answers.map((a, i) => (
          <span key={i}>{a.correct ? "\u{1F7E9}" : "\u{1F7E5}"}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20, fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)" }}>
        <div>
          <Flame size={14} style={{ verticalAlign: -2 }} color="var(--flame)" fill="var(--flame)" /> {stats.streak} streak
        </div>
        <div>best: {stats.maxStreak}</div>
      </div>
      <button
        onClick={copyShare}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--mono)",
          fontSize: 13,
          padding: "10px 18px",
          borderRadius: 6,
          border: "1px solid var(--ink)",
          background: copied ? "var(--green-bg)" : "var(--ink)",
          color: copied ? "var(--green-text)" : "#FFFFFF",
          cursor: "pointer",
        }}
      >
        <Share2 size={14} /> {copied ? "copied!" : "share result"}
      </button>
      <p style={{ fontSize: 12, color: "var(--faint)", marginTop: 16 }}>come back tomorrow for puzzle #{puzzleNumber + 1}</p>
    </div>
  );
}
