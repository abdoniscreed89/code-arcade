# SPIRE CITY: district design brief
Read `docs/AGENT_BRIEF.md` (lesson rules A and B) first, then this file.

## What the game is
Spire City is a 3D low-poly city game inside Code Arcade, for kids aged 6 to 14. It has a cartoony Assassin's Creed feel.
- **Characters:** the hero **Kai** is a hooded runner. **Pip** is an owl friend. The villain is **Baron Rust**.
- **Moving:** Kai runs (WASD/joystick), jumps (Space), and **climbs any building that has windows** by running into it. Smooth white walls with gold seams (capital letters in the map) **cannot be climbed**.
- **Code terminals:** when a bridge, gate, stair or lift is broken, Kai walks to a terminal and writes code. The browser lays out the code inside an invisible box (the **zone**). Every element that matches the lesson's `solid` selector becomes a **real solid 3D block**. The player sees see-through ghost blocks move as they type, then presses ⚡ Build it. The `checks` must pass, and then the blocks become real (they animate into place).
- **THE LEVEL ITSELF IS THE TEST:** wrong code puts the blocks in the wrong place.
- **Finishing:** reach the **sync point** (an owl perch on top of the tallest tower), then a leap of faith into a haystack. Stars: 1 for syncing, 1 for all golden feathers, and 1 if no answer was revealed.
- **Starter code is REAL in the world:** before a terminal is fixed, its blocks are built from the STARTER code. This is how gates block the way: the starter's bars are solid.

Files:
- Engine: `src/7c_spire.js` (do NOT edit unless your task says so).
- Example district with 3 finished terminals: `src/7d_spire_d1.js`. Study it.
- Map helper: `tools/citygen.py`.

## District file shape
```js
/* Spire City — District N: Name (topic) */
(()=>{
const D={id:'s2',name:'Harbour Docks',theme:'harbour',topic:'CSS — sizes and spacing',
 story:["Pip: …","Kai: …"], outro:["Pip: Synchronized! …","Baron Rust: …"],
 start:[x,z], startFace:Math.PI/2,   // facing: 0 = south(+z), Math.PI/2 = east(+x), Math.PI = north, -Math.PI/2 = west
 sync:[x,z], hay:[x,z],              // sync = a tower-top cell; hay = a '+' cell on the ground
 feathers:[[x,z],...],               // 5–8; each sits on top of whatever cell is there (ground or roof)
 bots:[[x1,z1,x2,z2],...],           // Rust Bots patrol a straight street; touching one sends Kai back to the last checkpoint
 map:[ ...rows... ],
 zones:[ {at:[cx,cz], y, w, h, kind, face, depth, thick, term:[x,z], lesson:{…}}, … ]};
SPIRE_DATA.districts.push(D);
})();
```
- **Themes:** `market` (D1), `harbour` (D2), `garden` (D3), `clock` (D4), `castle` (D5), `sky` (D6).
- **Ids:** districts are `s1`…`s6`. Lesson ids are `rzs<district>_<n>`, for example `rzs2_3`, and must be unique across the game.
- **Zone order:** zones are listed in PLAY ORDER. The HUD shows "Terminal 1 of 4" for the first unsolved zone in the list.

## The map (1 character = 1 m × 1 m; row index = z (south is +z), column = x)
| Character | Meaning |
|---|---|
| `.` | street |
| `,` | grass (gets trees) |
| `=` | plaza tiles |
| `~` | water: falling in sends Kai back to the last checkpoint |
| `+` | haystack (ground, decoration and leap-of-faith target) |
| `a`…`z` | **climbable** building, height 1…26 m (a=1, e=5, j=10, t=20, v=22) |
| `A`…`Z` | **smooth wall, NOT climbable**, height 1…26 m |

- **Size:** districts are 36–48 wide and 30–48 deep. Use `c.border(2)` for sea around the island.
- **Map edge:** the edge of the map is an invisible wall.
- **Checkpoints:** the start, and each terminal once it is solved.

## Zones (the code → 3D blocks)
- **Units:** 32 CSS px = 1 m. A zone is `w`×`h` px. The player's whole code (HTML + `<style>`, plus `<script>` in D6) is rendered in an iframe of exactly that size, with base CSS `*{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden} body{position:relative}`.
- **Clipping:** elements partly outside the zone are clipped. Elements smaller than 6×4 px are ignored.
- **`face`:** the side the viewer stands on (`s`=south/+z, `n`, `e`, `w`). Screen-left in the code is left as seen from that side.
- **`kind:'side'` (an upright wall of blocks: stairs, gates, towers, lifts):**
  - The zone stands up like a page facing the viewer.
  - `at` is the centre of its footprint and `y` is the height in metres of the zone's TOP edge.
  - A rect at `top: T px` with height `H px` becomes a block from `y - T/32` down to `y - (T+H)/32` metres.
  - The block is `depth` m thick (default 2), going away from the viewer.
- **`kind:'plan'` (a floor seen from above: bridges, floors, stepping stones):**
  - The page lies flat and its TOP surface is at height `y`.
  - The top of the page is the FAR side from the viewer, and the bottom is near the viewer.
  - Slabs are `thick` m thick (default 0.3).
- **Colours:** each block is drawn in the element's `background` colour. Pick cheerful colours.
- **Viewing room:** the code-mode camera looks at the zone FROM ITS FACE SIDE.
  - Leave **at least 5 m of open ground on the face side**, and put the **terminal there**, 2–5 m from the zone.
  - Walls on that side should be ≤ 8 m.
  - The camera rises over walls if needed, but a low, front-on view is much nicer.
- **Gates:** put the bars in a gap in a smooth wall. Make the bars ≥ 16px wide with gaps < 16px, so the validator sees them as solid.
  - Lessons whose correct answer leaves NO solid element must set `empty:true`.
- **Moving lifts (D5/D6 only):**
  - Set `anim:true` and `period:<seconds>` on the lesson.
  - The engine reads the moving layout every frame (CSS `@keyframes`/`transition`, or JS timers), and Kai rides moving blocks.
  - The validator samples 16 times over `period` and treats the samples as rideable.

## Physics (design numbers)
- **Kai's size:** 0.6 m wide and 1.7 m tall. Run speed is 5.2 m/s.
- **Jumps:**
  - A jump goes **1.4 m up**, and a running jump covers about **3.5 m**.
  - The **validator** only trusts **1.05 m up** and about **3 m** across (center to center) for "beatable".
  - For "needed" it uses the full jump: 1.45 m up and about 4.7 m across, edge cases included.
- **Steps:** a step of ≤ 0.36 m is walked up without jumping.
- **Climbing:** hold forward into a climbable wall. Kai climbs to the top and pulls up onto the roof. Zone blocks and smooth walls cannot be climbed.
- **Falls** don't hurt.

## Lessons (one per zone)
- **Shape:** the same as D1: `{id, concept, solid, learn, example, mission, job, starter, answer, hints[≥2], tip, checks:[[a=>bool,"msg"],…]}` plus optional `empty`, `anim`, `period`, and `js:true` (D6).
- **Checks** get the iframe api: `a.$`, `a.$$`, `a.css(el,'prop')`, `a.text(el)`, `a.doc`, `a.win`, `a.errs`, and `a.wait(ms)`.
- **Rules A and B of AGENT_BRIEF apply fully:**
  - Every number the checks need must be written in `job`. No secret values.
  - Write `job` for a 5-year-old.
  - Accept sensible alternatives (any colour, `flex:1` vs `flex-grow:1`, and so on), but tighten the checks if an alternative would pass yet leave the path broken.
- **One new idea per terminal**, building up through the district. The last terminal of a district combines ideas. Never repeat the exact same lesson as Rift Runner or Shadowblade. Make each one feel like a different machine (bridge, gate, stairs, lift, ferry, drawbridge, ramp…).
- **Starters** must show all the CSS the kid needs to see, one rule per line, kept short and readable.

## Level-design quality bar (this is a GAME first)
- **Layout:** a real little city: streets, plazas, a canal or harbour, climbable houses of different heights, rooftop routes, a few Rust Bots on streets, and grass parks.
- **Terminals:** 4–5 per district (D2–D6). The path must REQUIRE each one: islands, smooth walls, gates, or plinths too tall to climb.
- **Sync tower:** the sync point is on the tallest tower (climbable, ≥ 16 m) that sits behind the last code obstacle.
- **Feathers:** 5–8. Hide some on high roofs that need clever climbing or jumping.
- **Story:** 2–4 short story lines at the start and 2–3 at the end (`outro`). The last line of D6's outro ends the whole adventure.
- **Bots:** they should never block the only path at a terminal. Put them on wide streets.

## Tests (must be clean)
- **Build:** `cd /home/claude/code-arcade && python3 build.py --out <scratchpad>/<you>.html`
1. **Validator:** `python3 tests/spire.py <path> s2` (any district ids) must print `[]` for your districts. It checks:
   - all fields are present
   - each answer passes its checks and each starter fails them
   - terminals can be reached in order
   - the sync point is reachable with all answers ("safe" jump)
   - EVERY terminal is NEEDED ("full" jump, starter in place)
   - all feathers can be reached
2. **Physics:** `python3 tests/spire_phys.py <path>` (D1 physics) must stay `PHYSICS PROBLEMS []`.
3. **Look at it:** take screenshots, and fix anything ugly or confusing.
   - Overview of a district: `WAIT=2500 python3 tests/shot.py <path> <png> 1280 800 "()=>{APP.show('spire');SPIRE._test.startLevel('s2');setTimeout(()=>{for(let i=0;i<8;i++)document.querySelector('#g-spire .rfDialog').click();},300)}"`
   - Code view of a terminal: also teleport next to it and open the panel: `SPIRE._test.teleport(x+.5,0,z+.5);setTimeout(()=>SPIRE._test.openPanel(SPIRE._test.state().ZONES[i]),200)` (with WAIT=4000).
   - Look at both the 3D view and the panel. In code view the ghost blocks must be clearly visible from the front.
