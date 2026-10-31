# RIFT RUNNER — level design brief (read AGENT_BRIEF.md first, then this)

Rift Runner is a real-time 2D platformer inside Code Arcade (kids 6–14). Hero **Nova** runs, jumps (hold for
higher), wall-jumps and dashes. Her robot friend **Byte** talks in cutscenes. The villain **The Glitch** has torn
holes in the world. When the path is broken, Nova walks to a glowing **terminal** (T), presses E, and writes
code. **The code is rendered by the browser inside an invisible box (the "zone") and every element matching
the lesson's `solid` selector becomes a REAL one-way platform** (you land on its top edge; you can jump up
through it). The player sees ghost platforms move live while typing, then presses ⚡ Apply: the lesson's
`checks` must pass, then the platforms become solid. THE LEVEL ITSELF IS THE TEST: if the code is wrong,
the platforms are in the wrong place and Nova can't get across.

Engine: `src/75_rift.js` (do NOT edit). Example world with 2 finished levels: `src/76_rift_w1.js` — study it.
Map helper (optional): `tools/mapgen.py` (`Map(W,H).ground(x1,x2,top).block(...).plat(x,y,n).put(x,y,ch)`).

## World file shape
```js
(()=>{
const W={id:'w3',name:'Cloud Kingdom',theme:'clouds',topic:'Flexbox — line platforms up in rows',levels:[]};
RIFT_DATA.worlds.push(W);              // worlds are pushed in file order (w1 … w6)
W.levels.push({id:'r3_1',name:'…',story:["Byte: …","Nova: …"],map:[…rows…],zones:[{w:9,h:5,lesson:{…}}, …]});
})();
```
Themes: `meadow` (W1), `caves` (W2), `clouds` (W3), `clock` (W4), `ruins` (W5), `stars` (W6).
Level ids: `r<world>_<n>` (e.g. `r3_2`). Lesson ids: `rz<world>_<n>` unique across the game (e.g. `rz3_4`).

## Map characters (tiles are 32×32 px; row 0 is the top)
`#` solid ground/wall · `=` one-way wooden platform · `^` spikes (hurt) · `o` gem · `S` start · `E` exit portal
(stand-height: put it on the row just above ground) · `C` checkpoint flag · `s` slime (walks on ground, turns at
edges) · `b` bat (flies in a figure-8 around its spot) · `B` spring (launches very high) · `T` terminal ·
`1`–`9` = top-left corner of zone 1–9. Zone `i` uses `zones[i-1]` (`w`,`h` in tiles). Terminals are matched to
zones **left-to-right**: the leftmost `T` opens zone 1, etc. Put each `T` on solid ground a few tiles BEFORE
its zone. Levels: 60–110 columns wide, 12–18 rows tall. Leave the bottom 2–3 rows solid where there is ground;
pits are columns with no `#` (falling = respawn at the last checkpoint).

## The zone (very important)
The zone is a box exactly `w*32` × `h*32` px placed at its digit. The player's whole code (HTML + `<style>`
[+ `<script>` in W6]) is rendered inside it with this base CSS:
`*{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden} body{position:relative}`
So `(0,0)` is the zone's top-left corner, and CSS pixels = game pixels (`width: 300px` is a 300px platform).
Elements partly outside the zone are clipped to it; elements smaller than 6×4px are ignored.
- `solid`: CSS selector of elements that become platforms (default `.platform`). Only those count.
- Put the zone over a pit/gap/cliff so that with the ANSWER the platforms bridge it, and with the STARTER
  they don't (tests enforce both). A platform's TOP edge is where Nova lands.
- Use the element's `background` colour — it is drawn in the game in that colour (pick cheerful colours).
- Text inside an element is drawn on it (short words look fun: "LIFT", "STEP 1").

## Physics (for designing jumps)
Player 16×28px. Jump height ≈140px (≈4.4 tiles); the validator only trusts ≈115px (3.5 tiles) up.
Same-height jump distance: validator trusts ≈125px (≈4 tiles); falling further adds a little reach.
Springs (`B`) launch ≈280px up. Wall-jumps and dash exist, but the validator ignores them — every level must
be beatable WITHOUT them (use them for optional gem routes). A 3-tile pit is an easy jump; 5+ tiles needs code.

## Lessons (one per zone)
Same shape as the example: `{id, concept, solid, learn, example, mission, job, starter, answer, hints[≥2], tip,
checks:[[a=>bool,"msg"],…]}`. For W6 (JavaScript) add `js:true` — scripts then RUN inside the zone, and checks
can read the resulting DOM and `a.doc.documentElement.innerHTML` (to require e.g. a `for` loop).
- Starter = full code the player edits (show the CSS they need to see; hide nothing important). Keep starters
  short and readable, one rule per line. The `<style>` goes after the HTML; `<script>` last.
- The answer must be the natural, simple solution. Checks must also accept sensible alternatives (any colour,
  extra whitespace, `flex: 1` vs `flex-grow: 1`, etc.) — but the platforms must still bridge the gap: the
  test checks that with the answer the exit is reachable, so if alternatives still pass checks but leave a
  gap, tighten the checks (e.g. require `justify-content` to be `space-between`).
- AGENT_BRIEF rule A (no secret requirements) and rule B (`job` for a 5-year-old) apply fully. Every number
  the checks need must be in `job`. The story voice is Byte/Nova ("Byte: Make the stones spread out!").
- Teach ONE new idea per terminal, building through the world: first terminals very easy, last level of the
  world combines ideas. Never repeat the exact same lesson.

## Level design quality bar (this is a GAME first)
- Each level should feel different: vary heights, add wall-jump shafts for bonus gems, spring jumps, moving
  bats over pits, slimes on long floors, spike strips to hop, a checkpoint before every terminal.
- 5–10 gems per level, some hidden in tricky spots (high ledges, wall-jump shafts). The 3rd star needs all gems.
- Level 1 of a world is gentle; level 5 is the "Rift Gate": longer, 3 terminals, a real challenge.
- 1 story line per level start (2–4 short lines). Last level of the world: a short victory line.
- Don't block the camera: zones should be ≤ 12 tiles wide and ≤ 7 tiles tall.

## Tests (must be clean)
Build: `cd /home/claude/arcade && python3 build.py --out /tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/<you>.html`
1. `python3 tests/rift.py <path> <worldIndex 0-5>` → every level `[]`. It checks: fields, ids, terminal/zone
   count, answer passes + starter fails checks, the exit is reachable with all answers, each terminal is
   NEEDED (exit unreachable with that zone's starter), and the level can't be beaten with no code at all.
2. `python3 tests/rift_bot.py <path> <levelId>` → a dumb bot holds RIGHT, jumps at gaps/walls and auto-solves
   terminals. It should say WON for most levels; if it fails on a level that needs a back-track or a careful
   jump, that's acceptable — but look at the screenshot it saves to make sure the level isn't broken.
3. Screenshot a level and a terminal to check it looks good:
   `python3 tests/shot.py <path> <png> 1280 800 "()=>{APP.show('rift');RIFT._test.startLevel('r3_1')}"`
   and with the panel open: add `;setTimeout(()=>RIFT._test.openPanel(RIFT._test.state().ZONES[0]),300)`.
