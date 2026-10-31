/* =====================================================================
   RIFT RUNNER · World 4 — Clockwork Tower (CSS Grid: rows, columns & cells)
   The HTML is given; the player writes grid CSS. Every `.platform` becomes
   a real platform, so the grid they draw IS the staircase they climb.
   ===================================================================== */
(()=>{
const W4={id:'w4',name:'Clockwork Tower',theme:'clock',topic:'CSS Grid — draw rows and columns, climb what you build',levels:[]};
RIFT_DATA.worlds.push(W4);
/* code = HTML + a <style> box (one rule per line, indented like the other worlds) */
const code=(html,css)=>html+"\n\n<style>\n  "+css.replace(/\n/g,'\n  ')+"\n</style>";
/* check helpers: positions are measured inside the zone (0,0 = its top-left corner) */
const box=(a,s)=>{const e=a.$(s);return e?e.getBoundingClientRect():null;};
const near=(v,n,t)=>Math.abs(v-n)<=(t==null?4:t);
const at=(a,s,x,y)=>{const r=box(a,s);return !!r&&near(r.left,x)&&near(r.top,y);};
const isGrid=s=>[a=>/grid/.test(a.css(a.$(s),'display')),"Write `display: grid;` inside `"+s+" { }`."];
const wrote=(a,prop,re)=>a.rules().some(r=>r.style&&re.test(r.style[prop]||''));
const between=(v,lo,hi)=>v>=lo&&v<=hi;

/* ---------------------------------------------------------------- 4-1 */
const H1='<div class="bridge">\n  <div class="platform">GEAR</div>\n  <div class="platform">GEAR</div>\n  <div class="platform">GEAR</div>\n</div>';
const P1='.platform { width: 100px; height: 16px; background: #f59e0b; border-radius: 6px; }';
const H2='<div class="stones">\n  <div class="platform">TICK</div>\n  <div class="platform">TOCK</div>\n  <div class="platform">TICK</div>\n  <div class="platform">TOCK</div>\n</div>';
const P2='.platform { height: 16px; background: #fb923c; border-radius: 6px; }';
W4.levels.push({id:'r4_1',name:'The Gear Gate',
 story:["Byte: Welcome to the Clockwork Tower! The Glitch jammed every gear.","Nova: The bridges are all piled up in heaps!","Byte: Then we use CSS Grid. A grid sorts boxes into neat rows and columns — like squares on a chess board."],
 map:[
  ".",
  ".",
  ".",
  "........................................................................o",
  ".",
  "...................................................b",
  ".",
  ".........o........................................o",
  "........===.....o......o.......1.................===....2",
  "......................###....................................................o",
  "..S...................###..sC.T......o.......^^......C.T.......o........B...s..E",
  "###############...###############........#################..........##############",
  "###############...###############........#################..........##############",
  "###############...###############........#################..........##############"],
 zones:[
  {w:10,h:4,lesson:{id:'rz4_1',concept:'Grid: display: grid + columns',solid:'.platform',
   learn:"Boxes normally sit in a **pile**, one on top of the other.\n`display: grid;` turns their parent into a **grid**.\n`grid-template-columns` says how many **columns** there are and how wide each one is. `100px 100px 100px` = 3 columns, each 100px wide.",
   example:".box {\n  display: grid;\n  grid-template-columns: 50px 50px;\n}",
   mission:"The 3 gears are piled up. Inside `.bridge { }` write `display: grid;` and `grid-template-columns: 100px 100px 100px;` so they line up in a row and make a bridge.",
   job:"Inside `.bridge { }` type `display: grid;` and `grid-template-columns: 100px 100px 100px;` — the pile becomes a bridge!",
   starter:code(H1,".bridge {\n  margin-top: 96px;\n  \n}\n"+P1),
   answer:code(H1,".bridge {\n  margin-top: 96px;\n  display: grid;\n  grid-template-columns: 100px 100px 100px;\n}\n"+P1),
   hints:["First turn the box into a grid: `display: grid;` goes inside `.bridge { }`.","Now make 3 columns. Write the width 3 times: `100px 100px 100px`.","`display: grid;`\n`grid-template-columns: 100px 100px 100px;`"],
   tip:"Each number in `grid-template-columns` is one column. Write 4 numbers and you get 4 columns!",
   checks:[isGrid('.bridge'),
     [a=>gridCols(a,'.bridge').length===3,"Make **3** columns: `grid-template-columns: 100px 100px 100px;`"],
     [a=>gridCols(a,'.bridge').every(w=>w>=90),"Each column must be `100px` wide: `grid-template-columns: 100px 100px 100px;`"]]}},
  {w:12,h:4,lesson:{id:'rz4_2',concept:'Space between columns: column-gap',solid:'.platform',
   learn:"`column-gap` puts **empty space between the columns** of a grid.\nThe boxes stay the same size — they just move apart.\n`column-gap: 40px;` = 40px of air between each stone.",
   example:".row {\n  display: grid;\n  grid-template-columns: 30px 30px;\n  column-gap: 20px;\n}",
   mission:"The 4 stones are squashed together and don't reach the far side. Add `column-gap: 40px;` inside `.stones { }` to spread them out.",
   job:"The stones are squashed. Add `column-gap: 40px;` inside `.stones { }` to spread them across the pit.",
   starter:code(H2,".stones {\n  display: grid;\n  grid-template-columns: 48px 48px 48px 48px;\n  margin-top: 96px;\n}\n"+P2),
   answer:code(H2,".stones {\n  display: grid;\n  grid-template-columns: 48px 48px 48px 48px;\n  margin-top: 96px;\n  column-gap: 40px;\n}\n"+P2),
   hints:["You need space **between** the columns. The property is `column-gap`.","Put it inside `.stones { }`, under the other lines.","`column-gap: 40px;`"],
   tip:"`gap: 40px;` is a shortcut that puts space between the columns AND between the rows.",
   checks:[isGrid('.stones'),
     [a=>px(a.css(a.$('.stones'),'columnGap'))>=32,"The stones are still too close. Add `column-gap: 40px;` inside `.stones { }`."],
     [a=>px(a.css(a.$('.stones'),'columnGap'))<=64,"That gap is so big the last stone falls off! Use `column-gap: 40px;`."]]}}]});

/* ---------------------------------------------------------------- 4-2 */
const H3='<div class="bridge">\n  <div class="platform">PLANK</div>\n  <div class="platform">PLANK</div>\n  <div class="platform">PLANK</div>\n</div>';
const P3='.platform { height: 16px; background: #facc15; border-radius: 6px; }';
const H4='<div class="stones">\n  <div class="platform"></div>\n  <div class="platform"></div>\n  <div class="platform"></div>\n  <div class="platform"></div>\n  <div class="platform"></div>\n</div>';
const P4='.platform { width: 40px; height: 16px; background: #f472b6; border-radius: 6px; }';
W4.levels.push({id:'r4_2',name:'Pendulum Hall',
 story:["Byte: Spikes below, Nova! Don't look down.","Nova: These planks are way too short.","Byte: Then let them grow! In a grid, `fr` means 'a fair share of the space'."],
 map:[
  ".",
  ".",
  "....................o",
  "...................#..#",
  "...................#..#",
  "...................#..#",
  "...................#..#",
  "...................#..#.........................b..o",
  "..S..o.......o.....#..#...........................===..........................o",
  "########....===....#..#.....1..............................2..................###...o",
  "########......................................................................###",
  "########........s........C.T.......o..........^^......s.C.T.......o.......s...###......E",
  "##############################..........#####################..........###################",
  "##############################..........#####################..........###################",
  "##############################^^^^^^^^^^#####################^^^^^^^^^^###################"],
 zones:[
  {w:12,h:4,lesson:{id:'rz4_3',concept:'Share the space: fr',solid:'.platform',
   learn:"`fr` means **a fair share** of the free space.\n`1fr 1fr 1fr` = 3 columns that share ALL the space equally, so they stretch to fill the whole width.\n`50px` columns stay small, even if there's lots of room.",
   example:".box {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}",
   mission:"The 3 planks are only `50px` wide, so the bridge stops halfway. Change the columns to `1fr 1fr 1fr` so the planks share all the space.",
   job:"The bridge is too short! Change `50px 50px 50px` to `1fr 1fr 1fr` so the 3 planks stretch across.",
   starter:code(H3,".bridge {\n  display: grid;\n  grid-template-columns: 50px 50px 50px;\n  column-gap: 32px;\n  margin-top: 96px;\n}\n"+P3),
   answer:code(H3,".bridge {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  column-gap: 32px;\n  margin-top: 96px;\n}\n"+P3),
   hints:["Find the line `grid-template-columns: 50px 50px 50px;`.","Swap each `50px` for `1fr` (one fair share).","`grid-template-columns: 1fr 1fr 1fr;`"],
   tip:"Try `1fr 2fr 1fr` — the middle plank gets 2 shares, so it's twice as wide!",
   checks:[isGrid('.bridge'),
     [a=>gridCols(a,'.bridge').length===3,"Keep **3** columns: `grid-template-columns: 1fr 1fr 1fr;`"],
     [a=>wrote(a,'gridTemplateColumns',/fr/),"Use `fr` for the columns: `grid-template-columns: 1fr 1fr 1fr;`"],
     [a=>{const p=a.$$('.platform');const r=p.length&&p[p.length-1].getBoundingClientRect();return !!r&&r.right>=360;},"The planks must stretch all the way across. Use `1fr 1fr 1fr`."]]}},
  {w:12,h:4,lesson:{id:'rz4_4',concept:'Say it once: repeat()',solid:'.platform',
   learn:"Writing `80px 80px 80px 80px 80px` is a lot of typing!\n`repeat(5, 80px)` means **80px, five times**. Same grid, less work.",
   example:".box {\n  display: grid;\n  grid-template-columns: repeat(3, 40px);\n}",
   mission:"There is only 1 column, so the 5 stones are in a pile. Change the columns to `repeat(5, 80px)` so each stone gets its own column.",
   job:"Make 5 columns. Change the columns to `grid-template-columns: repeat(5, 80px);` — that means 80px, five times!",
   starter:code(H4,".stones {\n  display: grid;\n  grid-template-columns: 80px;\n  margin-top: 96px;\n}\n"+P4),
   answer:code(H4,".stones {\n  display: grid;\n  grid-template-columns: repeat(5, 80px);\n  margin-top: 96px;\n}\n"+P4),
   hints:["`repeat( how many , how wide )` — you need 5 columns that are 80px wide.","Replace `80px` in `grid-template-columns` with `repeat(5, 80px)`.","`grid-template-columns: repeat(5, 80px);`"],
   tip:"`repeat(5, 1fr)` makes 5 columns that share all the space. Grids love `repeat`!",
   checks:[isGrid('.stones'),
     [a=>gridCols(a,'.stones').length===5,"Make **5** columns: `grid-template-columns: repeat(5, 80px);`"],
     [a=>gridCols(a,'.stones').every(w=>between(w,70,90)),"Each column should be `80px` wide: `repeat(5, 80px)`."],
     [a=>wrote(a,'gridTemplateColumns',/repeat\s*\(/),"Use the shortcut `repeat(5, 80px)` instead of typing 80px five times."]]}}]});

/* ---------------------------------------------------------------- 4-3 */
const H5='<div class="tower">\n  <div></div> <div></div> <div class="platform">3</div>\n  <div></div> <div class="platform">2</div> <div></div>\n  <div class="platform">1</div> <div></div> <div></div>\n</div>';
const H6='<div class="lift">\n  <div class="platform">FLOOR 3</div>\n  <div class="platform">FLOOR 2</div>\n  <div class="platform">FLOOR 1</div>\n</div>';
W4.levels.push({id:'r4_3',name:'Tick-Tock Tower',
 story:["Nova: Whoa… the tower goes straight UP.","Byte: Grids have rows too! Make the rows taller and the steps spread out like a staircase.","Byte: Look at the HTML — it's a little picture of the stairs. Three boxes on each line, just like the grid!"],
 map:[
  ".",
  ".......................................................o....E",
  "..............................................2.....############",
  "................................................o...############",
  "........................................b...........############",
  "..............o.........................o...........############",
  ".............#..#...................................############",
  ".............#..#...................................############",
  "....o........#..#................C..o.s..^..T.......############",
  ".............#..#.......1.....##################################",
  ".............#..#.........o...##################################",
  ".............#..#.............##################################",
  ".............#..#.............##################################",
  ".......o......................##################################",
  "..S.B......s........C.T.......##################################",
  "################################################################",
  "################################################################",
  "################################################################"],
 zones:[
  {w:6,h:6,lesson:{id:'rz4_5',concept:'Row heights: grid-template-rows',solid:'.platform',
   learn:"`grid-template-columns` sets how **wide** each column is.\n`grid-template-rows` sets how **tall** each row is.\nEach box fills its cell, so taller rows = steps further apart. `64px 64px 64px` = 3 rows, each 64px tall.",
   example:".box {\n  display: grid;\n  grid-template-rows: 30px 30px;\n}",
   mission:"The rows are only `16px` tall, so the stairs are squashed at the top. Change them to `grid-template-rows: 64px 64px 64px;` to stretch the staircase down to the floor.",
   job:"The steps are squashed at the top. Change the rows to `grid-template-rows: 64px 64px 64px;` so each row is 64px tall.",
   starter:code(H5,".tower {\n  display: grid;\n  grid-template-columns: 64px 64px 64px;\n  grid-template-rows: 16px 16px 16px;\n}\n.platform { background: #d97706; border-radius: 6px; }"),
   answer:code(H5,".tower {\n  display: grid;\n  grid-template-columns: 64px 64px 64px;\n  grid-template-rows: 64px 64px 64px;\n}\n.platform { background: #d97706; border-radius: 6px; }"),
   hints:["Find `grid-template-rows: 16px 16px 16px;` — those are the 3 row heights.","Make each row `64px` tall instead of `16px`.","`grid-template-rows: 64px 64px 64px;`"],
   tip:"See how the HTML looks like the stairs? Step 1 is bottom-left and step 3 is top-right. Grids turn pictures into layouts.",
   checks:[isGrid('.tower'),
     [a=>gridCols(a,'.tower','gridTemplateRows').length===3,"Keep **3** rows: `grid-template-rows: 64px 64px 64px;`"],
     [a=>gridCols(a,'.tower','gridTemplateRows').every(h=>h>=56),"The rows are too short. Use `grid-template-rows: 64px 64px 64px;`"],
     [a=>gridCols(a,'.tower','gridTemplateRows').every(h=>h<=72),"The rows are too tall now. Use `64px` for each: `grid-template-rows: 64px 64px 64px;`"]]}},
  {w:6,h:7,lesson:{id:'rz4_6',concept:'Space between rows: row-gap',solid:'.platform',
   learn:"`row-gap` puts **empty space between the rows** of a grid — like floors in a building.\nNova can jump up **through** a floor from below and land on top of it.",
   example:".box {\n  display: grid;\n  row-gap: 30px;\n}",
   mission:"The 3 lift floors are squashed together at the ceiling. Change `row-gap: 0px;` to `row-gap: 80px;` so the floors spread down the shaft.",
   job:"The floors are stuck at the top. Change it to `row-gap: 80px;` so you can jump up floor by floor.",
   starter:code(H6,".lift {\n  display: grid;\n  row-gap: 0px;\n}\n.platform { height: 16px; background: #fbbf24; border-radius: 6px; }"),
   answer:code(H6,".lift {\n  display: grid;\n  row-gap: 80px;\n}\n.platform { height: 16px; background: #fbbf24; border-radius: 6px; }"),
   hints:["The space between rows is set by `row-gap`.","Change the `0px` to `80px`.","`row-gap: 80px;`"],
   tip:"`column-gap` = space between columns (side by side). `row-gap` = space between rows (up and down). `gap` does both!",
   checks:[isGrid('.lift'),
     [a=>px(a.css(a.$('.lift'),'rowGap'))>=64,"The floors are still too close together. Use `row-gap: 80px;`"],
     [a=>px(a.css(a.$('.lift'),'rowGap'))<=96,"That gap is too big — the bottom floor falls out of the shaft! Use `row-gap: 80px;`"]]}}]});

/* ---------------------------------------------------------------- 4-4 */
const H7='<div class="stairs">\n  <div class="platform s1">1</div>\n  <div class="platform s2">2</div>\n  <div class="platform s3">3</div>\n</div>';
const G7='.stairs {\n  display: grid;\n  grid-template-columns: repeat(3, 64px);\n  grid-template-rows: repeat(4, 48px);\n}\n.platform { background: #ea580c; border-radius: 6px; }';
const H8='<div class="bridge">\n  <div class="platform plank">CLOCK BRIDGE</div>\n</div>';
const G8='.bridge {\n  display: grid;\n  grid-template-columns: repeat(6, 64px);\n  grid-template-rows: 96px 16px;\n}\n.platform { background: #b45309; border-radius: 6px; }';
W4.levels.push({id:'r4_4',name:'Cog Stairs',
 story:["Byte: The Glitch shoved all the steps into the top row!","Nova: So I tell each step which square to go in?","Byte: Exactly. Every cell has an address: a column number and a row number. Rows count from the TOP."],
 map:[
  ".",
  ".",
  ".",
  ".",
  "..............#o.#...................o........2............................o",
  "..............#..#...................................b........o",
  "..............#..#.................s....C...T.......o",
  "..............#..#.......1.....################...........#########",
  "..............#..#.............################...........#########",
  "..........o...#..#.........o...################...........#########",
  ".........===..#..#.............################...........#########.==",
  "...............................################...........#########",
  "..S...o............s.C.T.......################...........#########........B...s.o.....E",
  "###############################################...........################################",
  "###############################################...........################################",
  "###############################################^^^^^^^^^^^################################"],
 zones:[
  {w:6,h:6,lesson:{id:'rz4_7',concept:'Pick a cell: grid-column & grid-row',solid:'.platform',
   learn:"You can tell a box **which cell** to sit in.\n`grid-column: 2;` = the 2nd column (counting from the left).\n`grid-row: 3;` = the 3rd row (counting from the **top**).\nThis grid has 3 columns and 4 rows.",
   example:".star {\n  grid-column: 2;\n  grid-row: 1;\n}",
   mission:"All 3 steps are stuck in row 1, too high to reach. Put **step 1** in column 1, row 4; **step 2** in column 2, row 3; **step 3** in column 3, row 2.",
   job:"Write `.s1 { grid-column: 1; grid-row: 4; }`, `.s2 { grid-column: 2; grid-row: 3; }` and `.s3 { grid-column: 3; grid-row: 2; }`.",
   starter:code(H7,G7+"\n.s1 {  }\n.s2 {  }\n.s3 {  }"),
   answer:code(H7,G7+"\n.s1 { grid-column: 1; grid-row: 4; }\n.s2 { grid-column: 2; grid-row: 3; }\n.s3 { grid-column: 3; grid-row: 2; }"),
   hints:["Each step needs 2 lines: which column and which row. Rows count from the top, so row 4 is the bottom.","Step 1 is the lowest: `.s1 { grid-column: 1; grid-row: 4; }`. Step 2 goes one up and one right.","`.s1 { grid-column: 1; grid-row: 4; }`\n`.s2 { grid-column: 2; grid-row: 3; }`\n`.s3 { grid-column: 3; grid-row: 2; }`"],
   tip:"Grid is like a treasure map: column, row — and the box goes exactly there, no matter where it is in the HTML.",
   checks:[isGrid('.stairs'),
     [a=>at(a,'.s1',0,144),"Step 1 goes at the bottom-left: `.s1 { grid-column: 1; grid-row: 4; }`"],
     [a=>at(a,'.s2',64,96),"Step 2 goes one up and one right: `.s2 { grid-column: 2; grid-row: 3; }`"],
     [a=>at(a,'.s3',128,48),"Step 3 goes one more up and right: `.s3 { grid-column: 3; grid-row: 2; }`"]]}},
  {w:12,h:4,lesson:{id:'rz4_8',concept:'Stretch over cells: span',solid:'.platform',
   learn:"A box can cover **more than one cell**.\n`grid-column: span 6;` = stretch across **6 columns**.\nThe box grows to fill all of them.",
   example:".banner {\n  grid-column: span 3;\n}",
   mission:"The bridge plank only fills 1 of the 6 columns. Add `grid-column: span 6;` inside `.plank { }` so it reaches across the whole spike pit.",
   job:"The plank only covers 1 column. Add `grid-column: span 6;` inside `.plank { }` so it stretches over all 6.",
   starter:code(H8,G8+"\n.plank {\n  grid-row: 2;\n}"),
   answer:code(H8,G8+"\n.plank {\n  grid-row: 2;\n  grid-column: span 6;\n}"),
   hints:["`span` means 'stretch across'. You need it on the columns.","Inside `.plank { }` add a `grid-column` line that spans 6 columns.","`grid-column: span 6;`"],
   tip:"`grid-column: 1 / 7;` does the same thing: start at line 1 and stop at line 7. `1 / -1` means 'all the way to the end'.",
   checks:[isGrid('.bridge'),
     [a=>{const r=box(a,'.plank');return !!r&&near(r.top,96);},"Keep `grid-row: 2;` inside `.plank { }` so the bridge stays at the right height."],
     [a=>{const r=box(a,'.plank');return !!r&&r.width>=380;},"Make the plank cover all 6 columns: `grid-column: span 6;`"]]}}]});

/* ---------------------------------------------------------------- 4-5 */
const H9='<div class="cogs">\n  <div class="platform">TICK</div>\n  <div class="platform">TOCK</div>\n  <div class="platform">TICK</div>\n</div>';
const G9='.platform { width: 64px; height: 16px; background: #f97316; border-radius: 6px; }';
const H10='<div class="tower">\n  <div class="platform low">LOW</div>\n  <div class="platform mid">MID</div>\n  <div class="platform top">TOP</div>\n</div>';
const G10='.platform { background: #eab308; border-radius: 6px; }\n.low { grid-area: low; }\n.mid { grid-area: mid; }\n.top { grid-area: top; }';
const T10=(r1,r2,r3)=>".tower {\n  display: grid;\n  grid-template-columns: repeat(3, 64px);\n  grid-template-rows: repeat(3, 72px);\n  grid-template-areas:\n    \""+r1+"\"\n    \""+r2+"\"\n    \""+r3+"\";\n}\n";
const H11='<div class="gate">\n  <div class="platform a"></div>\n  <div class="platform b"></div>\n  <div class="platform c"></div>\n  <div class="platform d"></div>\n</div>';
const G11='.platform { background: #d97706; border-radius: 6px; }\n.a { grid-column: 1 / 3; grid-row: 4; }\n.b { grid-column: 3; grid-row: 3; }\n.c { grid-column: 4; grid-row: 2; }\n.d { grid-column: 5 / 7; grid-row: 1; }';
W4.levels.push({id:'r4_5',name:'The Rift Gate',
 story:["Byte: There it is — the Rift Gate at the very top of the tower!","Glitch: Hee hee! I scrambled every grid. You'll never climb it!","Nova: Columns, rows, gaps, cells… I know them all now. Let's fix this clock!"],
 map:[
  ".",
  "..................................................................o",
  ".",
  "................................................................b.......................C...s...o........E",
  "...................................o............................o.......3...........########################",
  "..................................#..#..............................................########################",
  "..................................#..#...............C...s..^^....B..T.......o......########################",
  "..................................#..#..........o.######################............########################",
  "..................................#..#......2.....######################............########################",
  "..................................#..#............######################............########################",
  ".........o...........1............#..#............######################............########################",
  "........===................o......#..#............######################............########################",
  "..................................#..#............######################............########################",
  "..................................................######################............########################",
  "..S..o......s.^^.C.T...................sC.T.......######################............########################",
  "#######################..........#######################################............########################",
  "#######################..........#######################################............########################",
  "#######################^^^^^^^^^^#######################################............########################"],
 zones:[
  {w:12,h:5,lesson:{id:'rz4_9',concept:'Line up inside cells: place-items',solid:'.platform',
   learn:"When a box is smaller than its cell, it sits in the **top-left corner**.\n`align-items` moves boxes **up and down** in their cells. `justify-items` moves them **left and right**.\n`place-items: center;` does both at once: every box goes to the **middle** of its cell.",
   example:".box {\n  display: grid;\n  place-items: center;\n}",
   mission:"The cog stones are stuck in the top corner of their tall cells — too high to reach. Add `place-items: center;` inside `.cogs { }` to move every stone to the middle of its cell.",
   job:"The stones are stuck in the top corner. Add `place-items: center;` inside `.cogs { }` to move them to the middle.",
   starter:code(H9,".cogs {\n  display: grid;\n  grid-template-columns: repeat(3, 128px);\n  grid-template-rows: 160px;\n}\n"+G9),
   answer:code(H9,".cogs {\n  display: grid;\n  grid-template-columns: repeat(3, 128px);\n  grid-template-rows: 160px;\n  place-items: center;\n}\n"+G9),
   hints:["You want the stones in the **middle** of their cells, both up-down and left-right.","`place-items` is the shortcut for `align-items` + `justify-items`. Put it inside `.cogs { }`.","`place-items: center;`"],
   tip:"Try `place-items: end;` — the stones slide to the bottom-right corner of each cell.",
   checks:[isGrid('.cogs'),
     [a=>a.css(a.$('.cogs'),'alignItems')==='center',"Move the stones down to the middle: add `place-items: center;` inside `.cogs { }`."],
     [a=>a.css(a.$('.cogs'),'justifyItems')==='center',"Also center them left-to-right. `place-items: center;` does both at once."]]}},
  {w:6,h:7,lesson:{id:'rz4_10',concept:'Draw it with words: grid-template-areas',solid:'.platform',
   learn:"`grid-template-areas` lets you **draw** your grid with words!\nEach `\"...\"` is one row. Each word is one cell. A dot `.` is an empty cell.\nA box with `grid-area: top;` goes wherever you wrote **top**.",
   example:".box {\n  grid-template-areas:\n    \"sun .\"\n    \". sea\";\n}\n.s { grid-area: sun; }",
   mission:"The map puts all 3 steps on the bottom row, so the wall is too high. Redraw the map as a staircase:\n`\". . top\"`\n`\". mid .\"`\n`\"low . .\"`",
   job:"Draw the stairs with words! Change the map rows to `\". . top\"`, then `\". mid .\"`, then `\"low . .\"`.",
   starter:code(H10,T10('. . .','. . .','low mid top')+G10),
   answer:code(H10,T10('. . top','. mid .','low . .')+G10),
   hints:["The map has 3 rows (top to bottom). `top` must be in the top row, `mid` in the middle row, `low` in the bottom row.","Each row needs exactly 3 words or dots. Top row: `\". . top\"`.","Rows: `\". . top\"` then `\". mid .\"` then `\"low . .\"`"],
   tip:"Real websites draw whole pages this way: `\"header header\" \"menu main\" \"footer footer\"`.",
   checks:[isGrid('.tower'),
     [a=>!/none/.test(a.css(a.$('.tower'),'gridTemplateAreas')),"Your map is broken. Every row needs 3 words or dots, in quotes, like `\". . top\"`."],
     [a=>at(a,'.low',0,144),"`low` goes in the bottom row, on the left: `\"low . .\"`"],
     [a=>at(a,'.mid',64,72),"`mid` goes in the middle row, in the middle: `\". mid .\"`"],
     [a=>at(a,'.top',128,0),"`top` goes in the top row, on the right: `\". . top\"`"]]}},
  {w:12,h:6,lesson:{id:'rz4_11',concept:'Build the whole grid',solid:'.platform',
   learn:"Every step already knows its cell (look at `.a`, `.b`, `.c`, `.d`).\nBut there is **no grid yet**, so the steps have nowhere to go!\nBuild it: `display: grid;`, then 6 columns and 4 rows using `repeat()`.",
   example:".box {\n  display: grid;\n  grid-template-columns: repeat(2, 50px);\n  grid-template-rows: repeat(2, 30px);\n}",
   mission:"Make `.gate` a grid with **6 columns** of `64px` and **4 rows** of `48px`. Then every step jumps into its cell and you can climb to the Rift Gate!",
   job:"In `.gate { }` write `display: grid;`, `grid-template-columns: repeat(6, 64px);` and `grid-template-rows: repeat(4, 48px);`.",
   starter:code(H11,".gate {\n  \n}\n"+G11),
   answer:code(H11,".gate {\n  display: grid;\n  grid-template-columns: repeat(6, 64px);\n  grid-template-rows: repeat(4, 48px);\n}\n"+G11),
   hints:["Start with `display: grid;` inside `.gate { }`.","Add 6 columns that are 64px wide: `grid-template-columns: repeat(6, 64px);`","Then 4 rows that are 48px tall: `grid-template-rows: repeat(4, 48px);`"],
   tip:"You did it — the Rift Gate is closed and the Clockwork Tower ticks again! Columns, rows, gaps and cells: that's all of CSS Grid.",
   checks:[isGrid('.gate'),
     [a=>gridCols(a,'.gate').length===6,"Make **6** columns: `grid-template-columns: repeat(6, 64px);`"],
     [a=>gridCols(a,'.gate').every(w=>between(w,56,72)),"Each column should be `64px` wide: `repeat(6, 64px)`."],
     [a=>gridCols(a,'.gate','gridTemplateRows').length===4,"Make **4** rows: `grid-template-rows: repeat(4, 48px);`"],
     [a=>gridCols(a,'.gate','gridTemplateRows').every(h=>between(h,40,56)),"Each row should be `48px` tall: `repeat(4, 48px)`."]]}}]});
})();
