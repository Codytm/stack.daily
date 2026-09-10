# stack.daily()

A Wordle-style daily trivia game for CS/dev topics. Five questions a day:
four multiple choice pulled from rotating categories (networking, programming,
cloud, devops, databases), plus a "predict the output" Python challenge.

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
    networking.js
    programming.js
    cloud.js
    devops.js
    databases.js
    codeOutputs.js   Python "predict the output" questions
    categories.js    combines the category files into one list

  lib/
    puzzle.js       picks today's 5 questions deterministically from the date
    storage.js      localStorage wrapper for progress + streaks

  components/
    Header.jsx
    ProgressBar.jsx
    CategoryTag.jsx
    McqQuestion.jsx     the multiple-choice question UI
    CodeQuestion.jsx    the "predict the output" UI
    QuestionCard.jsx    wraps either question type + explanation + next button
    ResultScreen.jsx    score, share button, streak

  App.jsx    wires state + storage to the components above
  main.jsx   React entry point
  index.css  design tokens / global styles
```

## Adding questions

Open the relevant file in `src/data/` and add an object to the array:

```js
{ q: "...", opts: ["A", "B", "C", "D"], correct: 1, exp: "why B is right" }
```

`correct` is the index into `opts`. No other file needs to change — the
puzzle generator in `lib/puzzle.js` automatically rotates through whatever
is in each array based on the date.

To add a whole new category: copy the shape of an existing file in
`src/data/`, then add it to the `CATEGORIES` array in `src/data/categories.js`.

## Adding a new language to the code-output question

Right now `codeOutputs.js` is Python only. To add JavaScript (or others):

1. Create `src/data/codeOutputsJS.js` with the same shape as `codeOutputs.js`.
2. In `lib/puzzle.js`, pick which bank to use for the day (e.g. alternate by
   `daysSince % 2`) and tag the question with a `lang` field.
3. In `CodeQuestion.jsx`, use `question.lang` to switch syntax highlighting
   or labeling if you want.

## Notes on storage

Progress and streaks are saved to `localStorage` per-browser (see
`src/lib/storage.js`). That means streaks don't sync across devices and
there's no shared leaderboard yet. If you want either of those, the natural
next step is swapping `storage.js` for calls to a small backend (or a
service like Supabase/Firebase) instead of `localStorage`, since everything
else in the app just calls `getStats()` / `saveStats()` / `getProgress()` /
`saveProgress()` without knowing how they're implemented.
