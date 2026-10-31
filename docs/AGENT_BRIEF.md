# Code Arcade — content brief for helper agents

Code Arcade is ONE self-contained web page (`index.html`) that teaches HTML, CSS and JavaScript to
complete beginners — including children as young as 5–8 — through story games. It is assembled from
`src/` by `python3 build.py` (order listed in `src/MANIFEST`). Each game lives in its own file in `src/`.

## Golden rules (read twice)

1. **Only edit the files you were assigned.** Other agents are editing other files at the same time.
2. **Never rename or delete an existing level `id`.** Player progress is saved by id. You MAY reorder,
   insert new levels anywhere (pick ids that don't exist yet), and rewrite text/checks of existing levels.
3. **Build to your own output path**, never to `index.html`:
   `cd /home/claude/arcade && python3 build.py --out /tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/<yourname>.html`
4. **Test** with `python3 tests/levels.py <that html path>` (checks every answer passes and every starter
   fails, for every classic game). For Codeling Legends use `python3 tests/legends.py <path>`.
   Expected harmless lines: `rooms : ['r1 matches everything']`, `spell : ['inf:caught', 'undeclared:...']`.
   Everything else must be `[]` and `ERRORS []`. Fix until clean. Google-font proxy errors are harmless.
5. Plain JavaScript only, no external libraries. Keep the existing code style of the file.

## The two big quality problems you are fixing

### A. "Secret" requirements (the #1 complaint)
A player was asked to make a grid where the checker wanted exactly `48px`, but the task never said 48px.
That must NEVER happen. For EVERY level (existing and new):
- List every value the checks actually require (sizes, colours, words, counts, tag names, class names,
  property names). Each one must appear **explicitly** in the mission/job text (or be shown in a starter
  the player is editing).
- If the mission says something vague ("give it some padding", "make it big"), then the check must accept
  any reasonable value (e.g. `cssMin(...,'paddingTop',1,...)`), not one exact number. Either make the
  mission exact or make the check lenient — never vague text + exact check.
- Colour names: if a check compares a computed colour (e.g. `RED`), the mission must name the colour
  word the player should type (`red`). Hex colours must be written out in full in the mission.
- Text content checks: say the exact words in **bold**, and checks should be case-insensitive
  (`a.text()` already lowercases) and accept extra punctuation.
- Error messages (the second item of each check) must tell the player exactly what to fix, in simple words.

### B. Explain it so a 5-year-old gets it
Add a **`job`** field to EVERY level (existing ones too). It is shown in a big "Your job" box that is
always on screen while they code. Rules for `job`:
- 1–3 very short sentences, max ~35 words. Simple words. Talk to the child ("Make…", "Put…", "Change…").
- Contains every exact value the checks need (see A). Use backticks for code: `` `<h1>` ``, `` `gap: 20px;` ``.
- Say WHERE when it matters ("inside the `<style>` box", "under the heading").
- Example: `job:"Make the boxes sit in a row. Put \`display: flex;\` inside \`.row { }\`."`
- Example: `job:"Make 3 columns that are all the same size. Use \`grid-template-columns: 1fr 1fr 1fr;\` and \`gap: 48px;\`."`
Also simplify any `learn`/`story`/`mission` text that uses big words or long sentences (keep the story fun).
Keep `**bold**` and `` `code` `` markdown (the `md()` helper renders only those two plus newlines).

## Adding new levels
- Match the exact object shape the file already uses (look at 3–4 existing levels first).
- New levels must teach something NOT already covered, or practise a covered skill in a new situation.
  No near-duplicates. Keep the difficulty curve gentle → harder within each chapter.
- Each level needs: clear story line in the game's voice, `learn` (short), example where the file uses one,
  mission, `job`, ≥2 hints (progressively more revealing; last hint ≈ the answer), a `tip`, a correct
  `answer`, a `starter`, and checks/tests that (a) the answer passes, (b) the starter fails,
  (c) a sensible alternative correct answer would ALSO pass (don't over-constrain: allow extra
  whitespace, either quote style, any order of properties, `#f00` vs `red` where reasonable).
- Check helpers available in every file (from `src/10_core.js`): `has(sel,msg)`, `hasText(sel,word,msg)`,
  `cssIs(sel,prop,value,msg)` (computed value, e.g. `'flex'`, `RED`), `cssPx(sel,prop,n,msg,tol=1)`,
  `cssMin(sel,prop,n,msg)`, `cssNot(sel,prop,[vals],msg)`, `gapPx(sel,n,msg)`, `gridCols(a,sel)` (array of px),
  `hoverRule(sel,msg)`, custom `[a=>bool, msg]` where `a` has `$`, `$$`, `text(el)`, `css(el,prop)`, `rules()`, `doc`, `win`.
  Colour constants: RED GREEN BLUE PURPLE ORANGE YELLOW WHITE CLEAR INK LIGHTBLUE (computed rgb strings).
- Computed-style props are camelCase (`paddingTop`, `borderTopLeftRadius`, `gridTemplateColumns`, `columnGap`).
  Shorthands like `padding` / `border-radius` are NOT readable as computed values — check a longhand.
- The preview iframe for most games is ~300–520px wide. Grid/flex checks must pass at both widths
  (tests/levels.py runs Grid Farm at two widths).

## When you finish
Reply with: files changed, number of levels before → after per game, list of new level ids + titles,
a list of every existing level whose text/checks you changed for clarity (one line each: id — what was
unclear — what you did), and the final test output lines for your games.
