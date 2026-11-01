# SWORD & SCRIPT — dungeon design brief (read docs/AGENT_BRIEF.md rules A and B first, then this)

A real-time, top-down action RPG in Code Arcade (classic Zelda feel). Hero **Rowan** (young knight, sword + shield),
fairy **Spark**, villain **the Hex King**. Rowan walks (WASD / stick), swings his sword (Space / ⚔️ — cuts bushes `B`,
breaks pots `p`, beats monsters, knocks arrows away) and uses things with E / ✋. When the way is blocked he uses a
**rune altar** `R`: the code he writes is laid out by the browser in an invisible box (the **zone**) and every element
matching the lesson's `solid` selector becomes either real **stone blocks** (`kind:'block'` — solid walls; they also press
switches `P`) or **wooden bridges** (`kind:'bridge'` — walkable floor over water `~` and pits `_`). Ghost blocks move live
while typing; ⚡ Cast the rune runs `checks`, then the blocks become real. The STARTER layout is real in the world before
the altar is solved (so starter blocks can block a corridor = a gate). THE DUNGEON ITSELF IS THE TEST.

Engine: `src/7j_sword.js` (do NOT edit unless your task says so). Example dungeon: `src/7k_sword_d1.js` — study it.
Map helper: `tools/dungen.py` (rooms with walls already drawn, `door()`, `put/rect/rput/rrect`).

## Dungeon file shape
```js
/* Sword & Script — Dungeon N: Name (topic) */
(()=>{
const D={id:'k2',name:'Coral Grotto',theme:'coral',topic:'CSS — sizes and spacing',
 story:[...], outro:[...], boss:{name:'Crab Tyrant',color:'#f97316'},
 map:[...rows...],
 zones:[{kind:'bridge'|'block', w, h, at:[x,y] (optional; else digit 1..9 in the map), rune:[x,y] (optional; else the nearest R), lesson:{…}}, …]};
SWORD_DATA.dungeons.push(D);
})();
```
Themes: `moss` (D1), `coral` (D2), `bramble` (D3), `clock` (D4), `sand` (D5), `cloud` (D6). Ids `k1`…`k6`; lesson ids
`rzk<n>_<i>` unique. Zones are listed in PLAY ORDER.

## Map (1 char = 1 tile = 32 px; rooms are 15 × 11 tiles; the map must be a whole number of rooms, e.g. 3×2 = 45×22)
`#` wall `.` floor `,` grass `~` water `_` pit (both are holes: walking onto one = fall, lose half a heart, back to the room door)
`B` bush (cuttable) `p` pot (breakable) `T` torch `C` chest (opening every chest = a star) `R` rune altar
`D` door: opens when EVERY switch `P` in ITS room is covered by a block; if its room has no switches it opens when the
room's monsters are beaten. `L` locked door (needs a key `K`). `Z` boss door (opens when the boss dies).
`S` start `E` crystal (the goal) `H` heart container (put it near the crystal) `g` gem
Monsters: `s` slime `b` bat (flies over holes) `x` skeleton `a` arrow turret (a wall that shoots; arrows stop at walls and
code blocks) `X` the boss (exactly one, in its own room, behind which a `Z` door leads to the crystal).
`1`..`9` zone top-left corner (the tile underneath becomes floor — use `at:[x,y]` instead when the zone starts on a hole).
Doors connect rooms: use `d.door(rx,ry,side,kind)` — gaps in the double wall between rooms.

## Zones
A zone is `w`×`h` TILES; its iframe is `w*32`×`h*32` px with base CSS `*{box-sizing:border-box} html,body{margin:0;width:100%;
height:100%;overflow:hidden} body{position:relative}`. (0,0) = the zone's top-left tile corner; CSS px = game px. Elements
partly outside are clipped; smaller than 6×6 px ignored. Element `background` = its colour in the game.
- Bridges: the hero (20 px) falls if his CENTRE is over an unbridged hole — make bridges ≥ 32 px wide.
- Blocks on switches: a switch counts as covered when its tile CENTRE is inside a block.
- Gates: starter blocks fill a 1–2 tile corridor; the answer moves/removes them. Lessons whose answer leaves no
  element must set `empty:true`.
- Moving blocks/bridges (D5/D6 only): `anim:true` + `period` seconds (must cover the full cycle). Rowan rides moving
  bridges. The validator treats moving bridges as walkable everywhere they go and moving blocks as NOT blocking.

## Lessons
Same shape as D1: `{id, concept, solid, learn, example, mission, job, starter, answer, hints[≥2], tip, checks}` (+ `empty`,
`anim`, `period`, `js:true` for D6). Rule A: every number the checks need is written in `job`. Rule B: job readable by a
5-year-old. Accept sensible alternatives, but the checks must guarantee the dungeon really opens. One new idea per altar,
building through the dungeon; the last altar combines ideas. Don't copy Rift Runner / Spire City / Shadowblade lessons —
make each altar a different puzzle (bridge, gate, switch puzzle, stepping stones, wall that protects from a turret…).

## Quality bar (a GAME first)
3×2 or 3×3 rooms. 4–5 altars (D2–D6). A key + locked door, a kill-room (door `D` with monsters and no switches), at
least one turret room, chests in clever corners (behind bushes, across optional bridges), pots/bushes with drops,
a boss room with a `Z` door to the crystal + heart container. Varied monster mixes. Each altar must be REQUIRED.
Story 2–4 lines at the start, 2–3 at the end (D6's outro ends the whole adventure).

## Tests (must be clean)
Build: `cd /home/claude/code-arcade && python3 build.py --out <scratchpad>/<you>.html`
1. `python3 tests/sword.py <path> k2` (any ids) → `[]`: answers pass / starters fail, altars reachable in order, crystal
   reachable with all answers, EVERY altar NEEDED, all items & chests reachable, map size ok.
2. `python3 tests/sword_play.py <path>` (Dungeon 1 runtime) must stay `PLAY PROBLEMS []`.
3. Screenshots — look at them and fix anything ugly or confusing:
   `WAIT=1500 python3 tests/shot.py <path> <png> 1280 800 "()=>{APP.show('sword');SWORD._test.startLevel('k2');setTimeout(()=>{for(let i=0;i<8;i++)document.querySelector('#g-sword .rfDialog').click();SWORD._test.teleport(X,Y)},300)}"`
   (tile coords). Panel: add `setTimeout(()=>SWORD._test.openPanel(SWORD._test.state().ZONES[i]),300)` with WAIT=2500.
