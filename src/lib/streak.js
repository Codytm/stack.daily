import { addCalendarDays } from "./puzzle.js";

/** Streak shown in the UI: zero out if the player already missed a day. */
export function liveStreak(stats, todayKey) {
  if (!stats?.lastPlayedDate) return 0;
  if (stats.lastPlayedDate === todayKey) return stats.streak || 0;
  if (stats.lastPlayedDate === addCalendarDays(todayKey, -1)) return stats.streak || 0;
  return 0;
}

export function lastNDays(todayKey, n) {
  return Array.from({ length: n }, (_, i) => addCalendarDays(todayKey, -(n - 1 - i)));
}
