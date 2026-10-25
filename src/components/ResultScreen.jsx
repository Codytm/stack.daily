import { useState } from "react";
import { Flame, Share2, MessageCircle } from "lucide-react";
import HistoryStrip from "./HistoryStrip.jsx";

export default function ResultScreen({ answers, stats, puzzle, buildShareText }) {
  const [copied, setCopied] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);
  const score = answers.filter((a) => a.correct).length;
  const accuracy =
    stats.totalPlayed > 0 ? Math.round((stats.totalCorrect / (stats.totalPlayed * answers.length)) * 100) : 0;

  async function copyText(text, which) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    if (which === "discord") {
      setDiscordCopied(true);
      setTimeout(() => setDiscordCopied(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function shareNative() {
    const text = buildShareText("plain");
    if (navigator.share) {
      navigator.share({ title: "stack.daily()", text }).catch(() => copyText(text, "plain"));
    } else {
      copyText(text, "plain");
    }
  }

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>score</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 36, fontWeight: 700, marginBottom: 12 }}>{score}/5</div>
      <div style={{ fontSize: 24, letterSpacing: 3, marginBottom: 16 }}>
        {answers.map((a, i) => (
          <span key={i}>{a.correct ? "\u{1F7E9}" : "\u{1F7E5}"}</span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginBottom: 20,
          fontFamily: "var(--mono)",
          fontSize: 13,
          color: "var(--muted)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <Flame size={14} style={{ verticalAlign: -2 }} color="var(--flame)" fill="var(--flame)" /> {stats.streak}{" "}
          streak
        </div>
        <div>best: {stats.maxStreak}</div>
        <div>played: {stats.totalPlayed}</div>
        <div>{accuracy}% all-time</div>
      </div>

      <HistoryStrip stats={stats} todayKey={puzzle.todayKey} />

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
        <button
          onClick={shareNative}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--mono)",
            fontSize: 13,
            padding: "10px 16px",
            borderRadius: 6,
            border: "1px solid var(--ink)",
            background: copied ? "var(--green-bg)" : "var(--ink)",
            color: copied ? "var(--green-text)" : "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <Share2 size={14} /> {copied ? "copied!" : "share"}
        </button>
        <button
          onClick={() => copyText(buildShareText("discord"), "discord")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--mono)",
            fontSize: 13,
            padding: "10px 16px",
            borderRadius: 6,
            border: "1px solid var(--ink)",
            background: discordCopied ? "var(--green-bg)" : "#FFFFFF",
            color: discordCopied ? "var(--green-text)" : "var(--ink)",
            cursor: "pointer",
          }}
        >
          <MessageCircle size={14} /> {discordCopied ? "copied for discord" : "copy for discord"}
        </button>
      </div>
      <p style={{ fontSize: 12, color: "var(--faint)", marginTop: 16 }}>
        paste the Discord copy into a channel to show your streak. come back tomorrow for puzzle #{puzzle.puzzleNumber + 1}
      </p>
    </div>
  );
}
