import { Check, X } from "lucide-react";

export default function McqQuestion({ question, locked, selected, onPick }) {
  return (
    <>
      <p style={{ fontSize: 16, lineHeight: 1.5, margin: "0 0 1rem" }}>{question.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {question.opts.map((opt, i) => {
          let bg = "#FFFFFF";
          let border = "#D7D6CE";
          if (locked) {
            if (i === question.correct) {
              bg = "var(--green-bg)";
              border = "var(--green-border)";
            } else if (i === selected) {
              bg = "var(--red-bg)";
              border = "var(--red-border)";
            }
          }
          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              disabled={locked}
              style={{
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 6,
                border: `1px solid ${border}`,
                background: bg,
                cursor: locked ? "default" : "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {opt}
              {locked && i === question.correct && <Check size={16} color="var(--green-text)" />}
              {locked && i === selected && i !== question.correct && <X size={16} color="var(--red-text)" />}
            </button>
          );
        })}
      </div>
    </>
  );
}
