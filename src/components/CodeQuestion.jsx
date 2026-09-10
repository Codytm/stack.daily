import { normalize } from "../lib/puzzle.js";

export default function CodeQuestion({ question, locked, value, error, onChange, onSubmit }) {
  const isCorrect = locked && normalize(value) === normalize(question.output);

  return (
    <>
      <p style={{ fontSize: 14, margin: "0 0 10px", color: "var(--muted)" }}>What does this print?</p>
      <pre
        style={{
          fontFamily: "var(--mono)",
          fontSize: 13,
          background: "var(--ink)",
          color: "var(--border)",
          padding: "12px 14px",
          borderRadius: 6,
          overflowX: "auto",
          margin: "0 0 1rem",
        }}
      >
        {question.code}
      </pre>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={locked}
        placeholder="Type the exact output"
        rows={3}
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "var(--mono)",
          fontSize: 13,
          padding: 10,
          borderRadius: 6,
          border: `1px solid ${error ? "var(--red-border)" : "#D7D6CE"}`,
          resize: "vertical",
          background: locked ? "var(--bg-page)" : "#FFFFFF",
        }}
      />
      {error && <div style={{ fontSize: 12, color: "var(--red-text)", marginTop: 4 }}>{error}</div>}
      {locked && (
        <div
          style={{
            marginTop: 10,
            padding: "8px 10px",
            borderRadius: 6,
            background: isCorrect ? "var(--green-bg)" : "var(--red-bg)",
            fontSize: 13,
          }}
        >
          <div style={{ fontFamily: "var(--mono)", marginBottom: 2 }}>
            {isCorrect ? "Correct — " : "Actual output: "}
            <span style={{ fontWeight: 700 }}>{question.output}</span>
          </div>
        </div>
      )}
      {!locked && (
        <button
          onClick={onSubmit}
          style={{
            marginTop: 10,
            fontFamily: "var(--mono)",
            fontSize: 13,
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid var(--ink)",
            background: "var(--ink)",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          submit
        </button>
      )}
    </>
  );
}
