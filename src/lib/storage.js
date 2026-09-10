// Small wrapper around localStorage so the rest of the app doesn't touch
// browser storage APIs directly. Swap this file out later if you want to
// move stats to a server/database instead (e.g. for a shared leaderboard).

const PROGRESS_PREFIX = "stackdaily:progress:";
const STATS_KEY = "stackdaily:stats";

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

const DEFAULT_STATS = { streak: 0, maxStreak: 0, lastPlayedDate: null, totalPlayed: 0 };

export function getStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}
