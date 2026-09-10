import { useEffect, useState } from "react";
import { getDailyPuzzle, normalize } from "./lib/puzzle.js";
import { getProgress, saveProgress, getStats, saveStats } from "./lib/storage.js";
import Header from "./components/Header.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import ResultScreen from "./components/ResultScreen.jsx";

export default function App() {
  const [puzzle] = useState(() => getDailyPuzzle());
  const [stats, setStats] = useState(() => getStats());
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");

  // Resume today's puzzle if it was already completed.
  useEffect(() => {
    const saved = getProgress(puzzle.todayKey);
    if (saved) {
      setAnswers(saved.answers);
      setFinished(true);
    }
  }, [puzzle.todayKey]);

  const current = puzzle.questions[stepIdx];
  const isLast = stepIdx === puzzle.questions.length - 1;

  function pickOption(i) {
    if (locked) return;
    setSelected(i);
    setLocked(true);
  }

  function submitCode() {
    if (!codeInput.trim()) {
      setCodeError("Type what you think it prints first");
      return;
    }
    setCodeError("");
    setLocked(true);
  }

  function finishPuzzle(finalAnswers) {
    const score = finalAnswers.filter((a) => a.correct).length;
    saveProgress(puzzle.todayKey, { answers: finalAnswers, score });

    const yesterdayKey = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let newStreak = 1;
    if (stats.lastPlayedDate === puzzle.todayKey) {
      newStreak = stats.streak;
    } else if (stats.lastPlayedDate === yesterdayKey) {
      newStreak = stats.streak + 1;
    }
    const newStats = {
      streak: newStreak,
      maxStreak: Math.max(newStreak, stats.maxStreak || 0),
      lastPlayedDate: puzzle.todayKey,
      totalPlayed: (stats.totalPlayed || 0) + 1,
    };
    saveStats(newStats);
    setStats(newStats);
    setFinished(true);
  }

  function next() {
    const answer =
      current.type === "mcq"
        ? { correct: selected === current.correct, chosen: selected }
        : { correct: normalize(codeInput) === normalize(current.output), chosen: codeInput };

    const finalAnswers = [...answers, answer];
    setAnswers(finalAnswers);
    setLocked(false);
    setSelected(null);
    setCodeInput("");
    setCodeError("");

    if (isLast) {
      finishPuzzle(finalAnswers);
    } else {
      setStepIdx(stepIdx + 1);
    }
  }

  function buildShareText() {
    const score = answers.filter((a) => a.correct).length;
    const squares = answers.map((a) => (a.correct ? "\u{1F7E9}" : "\u{1F7E5}")).join("");
    return `stack.daily() #${puzzle.puzzleNumber} — ${score}/5\n${squares}\nstreak: ${stats.streak} \u{1F525}`;
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      <Header puzzleNumber={puzzle.puzzleNumber} streak={stats.streak} />

      {!finished && (
        <>
          <ProgressBar total={puzzle.questions.length} current={stepIdx} />
          <QuestionCard
            question={current}
            isLast={isLast}
            locked={locked}
            selected={selected}
            onPick={pickOption}
            codeValue={codeInput}
            codeError={codeError}
            onCodeChange={(v) => {
              setCodeInput(v);
              if (codeError) setCodeError("");
            }}
            onCodeSubmit={submitCode}
            onNext={next}
          />
        </>
      )}

      {finished && (
        <ResultScreen answers={answers} stats={stats} puzzleNumber={puzzle.puzzleNumber} buildShareText={buildShareText} />
      )}
    </div>
  );
}
