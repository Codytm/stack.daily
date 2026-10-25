# stack.daily()

A Wordle-style daily trivia game for CS/dev topics. Five questions a day:
four multiple choice pulled from rotating categories (networking, programming,
cloud, devops, databases), plus a "predict the output" Python challenge.

Everyone who plays on the same calendar day gets the same puzzle. After a
question is used, it stays on cooldown for 14 days (or until every other
question in that bank has been used, if the bank is smaller than 14).

Progress, streaks, and a 14-day history live in this browser's `localStorage`.
Copy the Discord-formatted result into a channel to share your score and streak.

## Run it

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  data/           question banks, one file per category
  lib/
    puzzle.js     daily pick + question cooldowns
    storage.js    localStorage for progress, streaks, history
    streak.js     live streak (zeros out after a missed day)
  components/
  App.jsx
```

## Adding questions

Open the relevant file in `src/data/` and add an object to the array:

```js
{ q: "...", opts: ["A", "B", "C", "D"], correct: 1, exp: "why B is right" }
```

`correct` is the index into `opts`. Prefer appending so existing indices stay
stable. Bigger banks mean a longer real cooldown (`COOLDOWN_DAYS` in
`lib/puzzle.js`, currently 14, capped at `bank.length - 1`).

## Sharing and streaks

Streaks are per-browser. Missing a day resets the live streak to 0. There is
no Discord bot or shared leaderboard in this static app (browser calls to
Discord webhooks are blocked by CORS). Use **copy for discord** and paste.

To sync streaks across devices later, replace `storage.js` with a small
backend (or a Discord bot that records `/daily` results). The UI only calls
`getStats()` / `recordCompletion()` / `getProgress()` / `saveProgress()`.
