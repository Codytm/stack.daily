import { CATEGORIES } from "../data/categories.js";
import { CODE_OUTPUTS } from "../data/codeOutputs.js";

const EPOCH = Date.UTC(2026, 0, 1); // puzzle #1
const CATEGORY_OFFSETS = [0, 3, 5, 7, 11]; // spreads out which question each category shows

export function dateKey(d) {
  return d.toISOString().slice(0, 10);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

/**
 * Builds today's (or any date's) puzzle deterministically, so everyone who
 * plays on the same day sees the same 5 questions, and reloading doesn't
 * reshuffle anything.
 */
export function getDailyPuzzle(now = new Date()) {
  const todayKey = dateKey(now);
  const daysSince = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - EPOCH) / 86400000
  );
  const puzzleNumber = daysSince + 1;

  // Rotate which one of the 5 categories sits out today, so the mix varies.
  const skipIdx = mod(daysSince, 5);
  const chosenCats = CATEGORIES.filter((_, i) => i !== skipIdx);

  const questions = chosenCats.map((cat) => {
    const origIdx = CATEGORIES.indexOf(cat);
    const qi = mod(daysSince + CATEGORY_OFFSETS[origIdx], cat.data.length);
    return {
      type: "mcq",
      category: cat.name,
      color: cat.color,
      bg: cat.bg,
      ...cat.data[qi],
    };
  });

  const codeIdx = mod(daysSince, CODE_OUTPUTS.length);
  questions.push({
    type: "code",
    category: "Predict the output",
    color: "#5F5E5A",
    bg: "#F1EFE8",
    ...CODE_OUTPUTS[codeIdx],
  });

  return { todayKey, puzzleNumber, questions };
}

/** Normalizes multi-line text answers so trailing whitespace/blank lines don't fail a match. */
export function normalize(s) {
  return s
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .join("\n");
}
