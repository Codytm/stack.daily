import { ChevronRight } from "lucide-react";
import CategoryTag from "./CategoryTag.jsx";
import McqQuestion from "./McqQuestion.jsx";
import CodeQuestion from "./CodeQuestion.jsx";

export default function QuestionCard({
  question,
  isLast,
  locked,
  selected,
  onPick,
  codeValue,
  codeError,
  onCodeChange,
  onCodeSubmit,
  onNext,
}) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderLeft: `4px solid ${question.color}`,
        borderRadius: 8,
        padding: "1.25rem",
      }}
    >
      <CategoryTag label={question.category} color={question.color} bg={question.bg} />

      {question.type === "mcq" ? (
        <McqQuestion question={question} locked={locked} selected={selected} onPick={onPick} />
      ) : (
        <CodeQuestion
          question={question}
          locked={locked}
          value={codeValue}
          error={codeError}
          onChange={onCodeChange}
          onSubmit={onCodeSubmit}
        />
      )}

      {locked && (
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 12, lineHeight: 1.5 }}>{question.exp}</p>
      )}

      {locked && (
        <button
          onClick={onNext}
          style={{
            marginTop: 16,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            fontFamily: "var(--mono)",
            fontSize: 13,
            padding: "10px",
            borderRadius: 6,
            border: "1px solid var(--ink)",
            background: "#FFFFFF",
            color: "var(--ink)",
            cursor: "pointer",
          }}
        >
          {isLast ? "see results" : "next"} <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}
