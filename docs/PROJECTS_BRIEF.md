# Code Arcade — PROJECTS brief (read AGENT_BRIEF.md first, then this)

Projects are step-by-step guided builds of ONE real web page. The player's code carries over from step to
step. Each step adds a `snippet` to the code automatically placed by kind:
- `H(id,title,{...})` HTML step → snippet is inserted ABOVE the `<style>`/`<script>` sections.
- `C(id,title,{...})` CSS step → snippet inserted inside `<style>` (created if missing, placed before `<script>`).
- `J(id,title,{...})` JavaScript step → snippet inserted inside `<script>` before `</script>` (created if missing).
- Optional `apply:c=>newCode` overrides placement (use for "edit an existing line" steps; also set `kind:'edit'`).
Code order in every project is: HTML, then one `<style>…</style>`, then one `<script>…</script>`.

Engine: `src/40_projects.js` (do NOT edit). Look at `src/43_proj_web.js` for 5 complete examples (Café, Resume,
Link-in-bio, Recipe, Landing page). Your data file starts with:
```js
(()=>{
const {H,C,J,W_HTML,W_CSS,W_JS,nonDefaultFont,labelLinked,anyHover,hasMedia,grad,transOn,clickThen,noErrors}=PK;
PK.PROJECTS.push(
 {project}, {project}, ...
);
})();
```

## Project object
`{id, cat, emoji, title, mentor, blurb, intro, uses?, base?, steps:[...]}`
- `id`: unique, lowercase, prefix by category: html → `ph_`, css → `pc_`, web → `pw_`, js → `pj_`, full → `pf_`
  (e.g. `pj_dice`). Step ids must be unique inside the project (e.g. `d1`,`d2`…).
- `cat`: `'html'` (HTML only — no CSS/JS steps), `'css'` (HTML given in `base`, every step is CSS),
  `'web'` (build HTML then CSS), `'js'` (HTML+CSS given in `base`, every step is JavaScript),
  `'full'` (build all three: HTML steps, then CSS steps, then JS steps).
- `mentor`: the friendly character who asks for the site ("Mia, café owner").
- `blurb`: one line for the project card. `intro`: 2–3 kid-friendly sentences about what they'll build.
- `base`: starting code for `css` and `js` projects. For `js` projects include an empty script section at
  the end: `...\n\n<script>\n</script>`. For `css` projects end with `\n\n<style>\n  \n</style>`.
- 8–12 steps per project (`css`/`js` may have 7–10). Use `ch:` to name chapters if you want
  (defaults: "Part 1: Build it (HTML)", "Part 2: Style it (CSS)", "Part 3: Make it work (JavaScript)").

## Step object (all required unless marked optional)
`why` (one sentence, in the mentor's voice: why this step matters), `learn` (optional, short explanation of the
new idea with a tiny example), `todo` (exact instruction), **`job`** (the always-visible "Your job" box: 1–3 very
short sentences a 5-year-old understands, containing every exact value the checks need), `where` (optional —
defaults are fine; override only for special placements), `snippet` (the exact code added), `hints` (≥2,
progressively more revealing), `tip` (a pro tip or fun fact), `checks` (array of `[a=>bool, "message"]`).

## Checks
Same helpers as games (`has`, `hasText`, `cssIs`, `cssPx`, `cssMin`, `cssNot`, `gapPx`, `gridCols`, `px`,
colour constants) plus project helpers: `labelLinked(a,scope)`, `anyHover(regex,prop)`, `hasMedia(regex,msg)`,
`grad(sel,msg)`, `transOn(sel,msg)`, `nonDefaultFont(a)`.
For JavaScript (`js`/`full` projects the preview RUNS the player's script; checks may be `async`):
- `a.click(sel)` clicks an element (returns false if missing). `a.type(sel,'text')` sets an input's value
  and fires `input` + `change`. `a.key(sel,'Enter')` fires keydown/keyup. `await a.wait(ms)`.
- `a.logs` = lines printed with console.log. `a.errs` = runtime errors (if any error happened the check
  automatically fails with a friendly message).
- `clickThen(sel, a=>bool, msg)` = click then test. Example:
  `clickThen('#roll', a=>/[1-6]/.test(a.text(a.$('#result'))), "Clicking Roll should show a number 1–6 in #result.")`
- All checks of a step run in order on ONE fresh page, so clicks add up (click twice → counter shows 2).
- Never rely on timing longer than ~300ms; for timers (setInterval) check that something changed after
  `await a.wait(250)` or check the code text with a regex on `a.doc.documentElement.innerHTML`... prefer behaviour.
- Randomness: test the range/possible values, not one exact random value.
- Every step's checks must FAIL on the code before the step and PASS after it (the test enforces this).
  When a step changes behaviour already partly present, check the NEW behaviour specifically.
- Never use `alert()`, `prompt()`, `confirm()` (blocked in the preview). Show results on the page instead.
- No external images/fonts/libraries. Use emoji, CSS shapes and gradients for visuals. Light, cheerful colours.

## Quality bar
- Each project must be genuinely DIFFERENT from every other project in the whole platform (the theme list
  you were given is unique across all categories — stick to it, don't drift into another agent's theme).
- Teach progressively: early steps simple, later steps combine ideas. Mention new concepts in `learn`.
- Real, useful pages kids would be proud to show family. Snippets must be clean, modern, well-indented code.
- Exact values in `todo`/`job` whenever the checks need them. If the checks accept anything ("any colour"),
  say so ("pick any colour you like").

## Testing
Build: `cd /home/claude/arcade && python3 build.py --out /tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/<you>.html`
Test: `python3 tests/projects.py <that path> <cat>` → every project must show `[]`.
It checks: required fields, ≥6 steps, ≥2 hints, unique ids, each step fails-before/passes-after, and the
finished page has no JavaScript errors. Also open-and-eyeball one finished project:
`python3 tests/shot.py <path> <out.png> 1366 800 "()=>{APP.show('<projectid>');GAMES['<projectid>'].open(0)}"`
and look at the PNG with your image reader.
