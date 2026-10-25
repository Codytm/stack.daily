// Small wrapper around localStorage so the rest of the app doesn't touch
// browser storage APIs directly. Swap this file out later if you want to
// move stats to a server (or Discord bot) for a shared leaderboard.

import { addCalendarDays } from "./puzzle.js";

const PROGRESS_PREFIX = "stackdaily:progress:";
const STATS_KEY = "stackdaily:stats";
const HISTORY_LIMIT = 60;

export function getProgress(dateKey) {
  try {
    const raw = localStorage.getItem(PROGRESS_PREFIX + dateKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProgress(dateKey, progress) {
  try {
    localStorage.setItem(PROGRESS_PREFIX + dateKey, JSON.stringify(progress));
  } catch {
    // storage unavailable (e.g. private browsing) - fail silently
  }
}

const DEFAULT_STATS = {
  streak: 0,
  maxStreak: 0,
  lastPlayedDate: null,
  totalPlayed: 0,
  totalCorrect: 0,
  history: [],
};

export function getStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : { ...DEFAULT_STATS };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

export function recordCompletion(todayKey, score, questionCount) {
  const stats = getStats();
  if (stats.lastPlayedDate === todayKey) {
    return stats;
  }

  let streak = 1;
  if (stats.lastPlayedDate === addCalendarDays(todayKey, -1)) {
    streak = (stats.streak || 0) + 1;
  }

  const history = [
    ...(stats.history || []).filter((h) => h.date !== todayKey),
    { date: todayKey, score, total: questionCount },
  ]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-HISTORY_LIMIT);

  const next = {
    streak,
    maxStreak: Math.max(streak, stats.maxStreak || 0),
    lastPlayedDate: todayKey,
    totalPlayed: (stats.totalPlayed || 0) + 1,
    totalCorrect: (stats.totalCorrect || 0) + score,
    history,
  };
  saveStats(next);
  return next;
}

export function historyByDate(stats) {
  const map = {};
  for (const entry of stats.history || []) {
    map[entry.date] = entry;
  }
  return map;
}
