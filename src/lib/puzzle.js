import { CATEGORIES } from "../data/categories.js";
import { CODE_OUTPUTS } from "../data/codeOutputs.js";

const EPOCH = Date.UTC(2026, 0, 1); // puzzle #1
const CATEGORY_OFFSETS = [0, 3, 5, 7, 11]; // extra salt per category so banks don't lock-step

/** How many later picks from the same bank a used question is blocked. Capped at n-1. */
export const COOLDOWN_DAYS = 14;

export function localDateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addCalendarDays(dateKey, delta) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return localDateKey(new Date(y, m - 1, d + delta));
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function appearanceIndex(daysSince, catIdx, catCount) {
  let n = 0;
  for (let d = 0; d <= daysSince; d++) {
    if (mod(d, catCount) !== catIdx) n++;
  }
  return Math.max(0, n - 1);
}

function shuffleIndices(n, rng) {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Picks a bank index for `day` so recently used items stay on cooldown.
 * Deterministic: same day + salt always yields the same index for everyone.
 */
export function pickWithCooldown(bankLen, daysSince, salt) {
  if (bankLen <= 0) throw new Error("empty question bank");
  const cooldown = Math.min(COOLDOWN_DAYS, Math.max(0, bankLen - 1));
  const recent = [];

  for (let day = 0; day <= daysSince; day++) {
    const banned = new Set(recent.slice(-cooldown));
    const rng = mulberry32(hashSeed(`${salt}:${day}`));
    const order = shuffleIndices(bankLen, rng);
    let chosen = order.find((i) => !banned.has(i));
    if (chosen === undefined) chosen = recent[0] ?? 0;
    recent.push(chosen);
    if (recent.length > cooldown) recent.shift();
  }

  return recent[recent.length - 1];
}

/**
 * Builds today's (or any date's) puzzle deterministically, so everyone who
 * plays on the same calendar day sees the same 5 questions. Used questions
 * stay on cooldown so the same item cannot reappear for COOLDOWN_DAYS.
 */
export function getDailyPuzzle(now = new Date()) {
  const todayKey = localDateKey(now);
  const daysSince = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - EPOCH) / 86400000
  );
  const puzzleNumber = daysSince + 1;

  const skipIdx = mod(daysSince, CATEGORIES.length);
  const chosenCats = CATEGORIES.filter((_, i) => i !== skipIdx);

  const questions = chosenCats.map((cat) => {
    const origIdx = CATEGORIES.indexOf(cat);
    const qi = pickWithCooldown(
      cat.data.length,
      appearanceIndex(daysSince, origIdx, CATEGORIES.length),
      `mcq:${cat.name}:${CATEGORY_OFFSETS[origIdx]}`
    );
    return {
      type: "mcq",
      id: `${cat.name}:${qi}`,
      category: cat.name,
      color: cat.color,
      bg: cat.bg,
      ...cat.data[qi],
    };
  });

  const codeIdx = pickWithCooldown(CODE_OUTPUTS.length, daysSince, "code:python");
  questions.push({
    type: "code",
    id: `code:${codeIdx}`,
    category: "Predict the output",
    color: "#5F5E5A",
    bg: "#F1EFE8",
    ...CODE_OUTPUTS[codeIdx],
  });

  return { todayKey, puzzleNumber, questions, cooldownDays: COOLDOWN_DAYS };
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
