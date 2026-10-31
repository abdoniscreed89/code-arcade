# Code Arcade — ADVENTURE GAME brief (read AGENT_BRIEF.md first, then this)

Three new story-driven action-adventure games (think: a stealth assassin game, a Norse god-war saga, a tomb
raiding adventure — but ORIGINAL characters/places only; never use real game/franchise names or characters).
The player walks a hero around a world map; guards/monsters are encounters. Beating an encounter = writing
code correctly; each correct answer triggers a cinematic combo attack, each mistake lets the enemy hit back.
Every chapter ends with a BOSS fight of 3 phases (3 lessons in a row). The engine is being written
separately — you write the STORY + LESSON DATA only.

## Your file shape
```js
(()=>{
const {css,lay,html,js}=LESSON;   // lesson builders (see src/10_core.js bottom)
SAGA_DATA.<game>.chapters.push(
 { id:'c1', title:'The Market of Azura', topic:'CSS selectors & colours', place:'market',
   intro:["line of cutscene dialogue","..."],       // 3–6 short lines, speaker prefix allowed: "Idris: ..."
   outro:["...","..."],                              // 2–4 lines after the boss falls
   relics:[{name:'Torn Map',lore:'1–2 sentence lore'},{...},{...}],   // 3 hidden collectibles per chapter
   enemies:[ <lesson>, ... ],                        // 7 encounters, gentle → harder
   boss:{ name:'Overseer Brutus', title:'Master of the Market', intro:["..",".."], defeat:["..",".."],
          phases:[<lesson>,<lesson>,<lesson>] } },   // 3 phases = 3 harder lessons combining the chapter's ideas
 { ...next chapter... }
);
})();
```
`place` = one of the map themes listed in your assignment (the engine draws that tileset).

## Lesson shape (same as Codeling Legends — study src/50_legends.js top for ~10 real examples)
Use the builders: `css({...})` (o.html given; player writes CSS in an empty `<style>`; give `css` = the answer CSS),
`lay({...})` (like css but o.base CSS is pre-filled), `html({...})` (player writes HTML; `starter` defaults ''),
`js({...})` (JavaScript run in a worker; `tests:[["expression","message"],...]` — expressions may use the
player's variables, `__out` (array of console.log lines as strings) and `__code` (their source text)).
Fields: `id` (unique within the game, e.g. 'sh1_3' / 'rb4_2' / 'tb6_b1'), `enemy` (the guard/monster name
shown in battle, e.g. 'Dock Brute'), `concept` (short tag e.g. 'padding'), `learn` (2–4 short simple
sentences + the key syntax), `example` (tiny code example, DIFFERENT from the answer), `mission`
(exact instruction), **`job`** (1–3 very short sentences a 5-year-old understands, containing every exact
value the checks need), `hints` (≥2, progressive, last ≈ answer), `answer`, `tip` (pro tip/fun fact),
`checks` (css/html) or `tests` (js). Optional `starter` (html/js lessons may start with given code).
- Story flavour: the `mission`/`learn` should connect the code to the fiction ("Rewrite the guard's style
  scroll so his lantern turns `blue`…") but the code itself must be a normal, real-world skill.
- Difficulty: chapter 1 is for absolute beginners; by chapter 6 kids combine several ideas.
- Each lesson teaches or practises something specific; no near-duplicates inside your game.
- Follow AGENT_BRIEF rule A strictly: no secret requirements. Checks must accept reasonable alternatives.

## Test
Build: `cd /home/claude/arcade && python3 build.py --out /tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/<you>.html`
Test: `python3 tests/saga.py <path> <game>` → your lessons must produce no problems (another agent writes the
other half of your game in a different file; a line like "chapter missing" for THEIR chapters is not yours —
but ids must not collide: use the id prefixes you were given).
