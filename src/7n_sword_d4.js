/* Sword & Script — Dungeon 4: Clockwork Keep (CSS Grid — rows and columns) */
(()=>{
/* geometry helpers for the checks: they look at where the pieces REALLY landed, so any correct answer opens the dungeon */
const boxes=(a,sel)=>{let els=[];try{els=a.$$(sel);}catch(e){}return els.map(el=>el.getBoundingClientRect()).filter(r=>r.width>=6&&r.height>=6);};
const inBox=(rs,x,y)=>rs.some(r=>x>r.left&&x<r.right&&y>r.top&&y<r.bottom);
/* a tile is bridged when its middle and 4 inner corners sit on a plank */
const bridged=(sel,tiles)=>a=>{const rs=boxes(a,sel);return tiles.every(([x,y])=>[[16,16],[6,6],[26,6],[6,26],[26,26]].every(([dx,dy])=>inBox(rs,x*32+dx,y*32+dy)));};
/* some whole row of the zone is bridged */
const rowBridged=(sel,w,h)=>a=>{for(let y=0;y<h;y++){const t=[];for(let x=0;x<w;x++)t.push([x,y]);if(bridged(sel,t)(a))return true;}return false;};
/* a switch is pressed when its tile centre is inside a block (same rule as the game) */
const pressed=(sel,tiles)=>a=>{const rs=boxes(a,sel);return tiles.every(([x,y])=>rs.some(r=>x*32+16>=r.left&&x*32+16<=r.right&&y*32+16>=r.top&&y*32+16<=r.bottom));};
/* no block touches these tiles */
const clear=(sel,tiles)=>a=>{const rs=boxes(a,sel);return tiles.every(([x,y])=>!rs.some(r=>r.right>x*32+1&&r.left<x*32+31&&r.bottom>y*32+1&&r.top<y*32+31));};
const disp=(a,sel)=>{const e=a.$(sel);return e?a.css(e,'display'):'';};

const D={id:'k4',name:'Clockwork Keep',theme:'clock',topic:'CSS Grid — rows and columns',
 story:["Spark: Tick… tock… Rowan, listen! This whole castle is one giant clock!","Rowan: The Hex King hid the fourth crystal somewhere in these gears.","Spark: Clockwork loves neat rows and columns. Here the rune altars speak CSS Grid — squares, like a chess board!"],
 outro:["Spark: The fourth crystal! Hear that? Every clock in the keep ticks in time again.","Rowan: Rows, columns, gaps and maps. Grid is like building with a ruler!","Hex King: Tick-tock, little knight. Your time is running out… My desert will bury you in sand!"],
 boss:{name:'Cog Colossus',color:'#d97706'},
 map:[
  "#############################################",
  "#T..._____.g.p##T...........T##.............#",
  "#.R.._____....##.............##...g.........#",
  "#...._____..b.##...#.....#...##......T.H.T..#",
  "#....___##....##.............##.............#",
  "#....##_##............X......Z.........E....#",
  "#.b..##___....##.............##.............#",
  "#...._____....##...#.....#...##......T...T..#",
  "#...._____..g.##.............##...g.........#",
  "#T..._____...p##T...........T##.............#",
  "###.#########################################",
  "###L#########################################",
  "#T.....a....pC##T.p........#C##a________...a#",
  "#.............##.p...PPP...#.##.________....#",
  "#....#........##.............##.__.__.__.R..#",
  "#....#...#....##........P....##.__.__.__....#",
  "#..b.#...#.....D................__.__.__....#",
  "#....#...#....##.............##.__.__.__...T#",
  "#....#...#....##......R......##._____.__..s.#",
  "#..p.....#.b..##..s.......s..##._____g__....#",
  "#Kp....a.....g##T...........g##g_____C__...p#",
  "#########################################.###",
  "#########################################D###",
  "#T,,p.~~~~~.pC##pp...g..R....##p...........p#",
  "#,,p,.~~~~~...##.............##...........b.#",
  "#...R.~~~~~...###T########...##...#..x..#...#",
  "#.....~~~~~...##........s....##.............#",
  "#.S...~~~~~.........s............b...T...s..#",
  "#.....~~~~~...##............................#",
  "#,,,,.~~~~~...##...####T#######...#..x..#...#",
  "#gBB,.~~~~~.sg##............p##............g#",
  "#T,,,.~~~~~.pp##g.......p..pC##p...........p#",
  "#############################################"],
 zones:[
  /* 1 — Clock Courtyard: a bridge over the river */
  {kind:'bridge',w:5,h:3,at:[6,26],rune:[4,25],lesson:{id:'rzk4_1',concept:'display: grid and columns',solid:'.plank',
   learn:"**CSS Grid** puts things in **columns** (side by side) and **rows** (one under the other) — like the squares on a chess board.\nStep 1: `display: grid;` turns a box into a grid.\nStep 2: `grid-template-columns` says how many columns there are, and how wide. `32px 32px` = 2 columns, each 32px wide.",
   example:".shelf {\n  display: grid;\n  grid-template-columns: 32px 32px 32px;\n}",
   mission:"The river is 5 tiles wide. The 5 planks are piled up on the left bank, one on top of the other. Make a grid with 5 columns, so the planks lie side by side.",
   job:"Inside `.bridge { }` type `display: grid;` and `grid-template-columns: 32px 32px 32px 32px 32px;` — that is 5 columns.",
   starter:"<div class=\"bridge\">\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n</div>\n\n<style>\n  .bridge {\n    margin-top: 32px;\n\n  }\n  .plank {\n    width: 32px;\n    height: 32px;\n    background: #c98a4b;\n  }\n</style>",
   answer:"<div class=\"bridge\">\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n</div>\n\n<style>\n  .bridge {\n    margin-top: 32px;\n    display: grid;\n    grid-template-columns: 32px 32px 32px 32px 32px;\n  }\n  .plank {\n    width: 32px;\n    height: 32px;\n    background: #c98a4b;\n  }\n</style>",
   hints:["Both new lines go inside `.bridge { }`, under `margin-top`.","First `display: grid;` — then the columns. Each plank is 32px wide and there are 5 planks.","Type: `display: grid;` and then `grid-template-columns: 32px 32px 32px 32px 32px;`"],
   tip:"Typing 32px five times is boring! `repeat(5, 32px)` means exactly the same. You will see it again soon.",
   checks:[[a=>disp(a,'.bridge')==='grid',"Turn the box into a grid: type `display: grid;` inside `.bridge { }`."],
    [a=>gridCols(a,'.bridge').length>=5,"Make 5 columns: `grid-template-columns: 32px 32px 32px 32px 32px;`"],
    [rowBridged('.plank',5,3),"The planks must lie in one line all the way across the river. Use 5 columns of `32px`."]]}},

  /* 2 — Pendulum Hall: a gate made of two stone blocks */
  {kind:'block',w:2,h:4,at:[29,25],rune:[24,23],lesson:{id:'rzk4_2',concept:'Rows and fr',solid:'.block',
   learn:"`grid-template-rows` makes **rows**, one under the other.\n`fr` means **a share** of the space. `1fr 1fr` = 2 rows of the same size.\n`1fr 1fr 2fr` = 3 rows, and the last one gets **2 shares**, so it is twice as tall.\nA row with nothing in it stays **empty**.",
   example:".tower {\n  display: grid;\n  grid-template-rows: 1fr 2fr;\n}",
   mission:"Two stone blocks fill the whole gate. Make 3 rows instead of 2: the blocks take the two small rows at the top, and the big empty row at the bottom opens the way.",
   job:"Change the rows to `grid-template-rows: 1fr 1fr 2fr;`. The big empty 3rd row is your way through!",
   starter:"<div class=\"gate\">\n  <div class=\"block\"></div>\n  <div class=\"block\"></div>\n</div>\n\n<style>\n  .gate {\n    display: grid;\n    height: 100%;\n    grid-template-rows: 1fr 1fr;\n  }\n  .block { background: #a8a29e; }\n</style>",
   answer:"<div class=\"gate\">\n  <div class=\"block\"></div>\n  <div class=\"block\"></div>\n</div>\n\n<style>\n  .gate {\n    display: grid;\n    height: 100%;\n    grid-template-rows: 1fr 1fr 2fr;\n  }\n  .block { background: #a8a29e; }\n</style>",
   hints:["Find `grid-template-rows: 1fr 1fr;` inside `.gate { }`.","Add a 3rd row at the end that gets 2 shares: `2fr`.","It becomes: `grid-template-rows: 1fr 1fr 2fr;`"],
   tip:"`fr` works on any screen. `1fr 3fr` gives a thin menu and a big page — on a phone or on a TV.",
   checks:[[a=>gridCols(a,'.gate','gridTemplateRows').length>=3,"Make 3 rows: `grid-template-rows: 1fr 1fr 2fr;`"],
    [clear('.block',[[0,2],[1,2],[0,3],[1,3]]),"The gate is still blocked! The LAST row must be the big one: `1fr 1fr 2fr`."]]}},

  /* 3 — Stepping Stones: planks over a pit, the gaps land on the stone posts */
  {kind:'bridge',w:8,h:2,at:[32,15],rune:[41,14],lesson:{id:'rzk4_3',concept:'gap',solid:'.plank',
   learn:"`gap` puts **empty space between** the cells of a grid.\n`gap: 32px;` = 32px of space between the columns (and between the rows).\nNothing is drawn in a gap.\nNew trick: `repeat(3, 64px)` is short for `64px 64px 64px`.",
   example:".stones {\n  display: grid;\n  grid-template-columns: repeat(3, 64px);\n  gap: 32px;\n}",
   mission:"A deep pit with two stone posts in the middle. The 3 planks are squashed together, so the last hole has no plank. Add a gap: the gaps sit on the stone posts, and the planks cover the holes.",
   job:"Add `gap: 32px;` inside `.path { }`. The planks spread out and cover all 3 holes.",
   starter:"<div class=\"path\">\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n</div>\n\n<style>\n  .path {\n    display: grid;\n    grid-template-columns: repeat(3, 64px);\n    grid-template-rows: 64px;\n\n  }\n  .plank { background: #c98a4b; }\n</style>",
   answer:"<div class=\"path\">\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n  <div class=\"plank\"></div>\n</div>\n\n<style>\n  .path {\n    display: grid;\n    grid-template-columns: repeat(3, 64px);\n    grid-template-rows: 64px;\n    gap: 32px;\n  }\n  .plank { background: #c98a4b; }\n</style>",
   hints:["`gap` goes inside `.path { }`, under the other lines.","The stone posts are 32px wide, so the gap is 32px too.","Add this line: `gap: 32px;`"],
   tip:"`column-gap` and `row-gap` make space only one way. Photo galleries use `gap` to keep the pictures apart.",
   checks:[[a=>{const e=a.$('.path');return !!e&&parseFloat(a.css(e,'columnGap'))>0;},"Add `gap: 32px;` inside `.path { }`."],
    [bridged('.plank',[[0,0],[1,0],[3,0],[4,0],[6,0],[7,0],[0,1],[1,1],[3,1],[4,1],[6,1],[7,1]]),"A hole still has no plank! Use `gap: 32px;` so the gaps land on the 2 stone posts."]]}},

  /* 4 — Switch Grid: put the blocks on four switches at once */
  {kind:'block',w:5,h:4,at:[20,12],rune:[22,18],lesson:{id:'rzk4_4',concept:'Grid lines: grid-column and grid-row',solid:'.block',
   learn:"Grid **lines** are the lines between the cells. They have numbers, starting at **1** on the left and at the top.\n5 columns have 6 lines: 1 2 3 4 5 6.\n`grid-column: 2 / 5;` = start at line 2, stop at line 5 — so the block is 3 cells long.\n`grid-row: 2;` = put it in row 2.",
   example:".boat {\n  grid-column: 1 / 3;\n  grid-row: 2;\n}",
   mission:"Four switches glow on the floor: three in a row, and one in the corner. Put the long block on the three, and the small block on the last one. Then the door opens!",
   job:"In `.long { }` type `grid-column: 2 / 5;` and `grid-row: 2;`. In `.small { }` type `grid-column: 5;` and `grid-row: 4;`.",
   starter:"<div class=\"grid\">\n  <div class=\"block long\"></div>\n  <div class=\"block small\"></div>\n</div>\n\n<style>\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(5, 32px);\n    grid-template-rows: repeat(4, 32px);\n  }\n  .long {\n    grid-column: span 3;\n  }\n  .small {\n\n  }\n  .block { background: #d6a75c; }\n</style>",
   answer:"<div class=\"grid\">\n  <div class=\"block long\"></div>\n  <div class=\"block small\"></div>\n</div>\n\n<style>\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(5, 32px);\n    grid-template-rows: repeat(4, 32px);\n  }\n  .long {\n    grid-column: 2 / 5;\n    grid-row: 2;\n  }\n  .small {\n    grid-column: 5;\n    grid-row: 4;\n  }\n  .block { background: #d6a75c; }\n</style>",
   hints:["Count the lines from the left: the first switch starts at line 2. The row of 3 switches is row 2.","Long block: change `grid-column: span 3;` to `grid-column: 2 / 5;` and add `grid-row: 2;`.","Small block: inside `.small { }` type `grid-column: 5;` and `grid-row: 4;`."],
   tip:"`grid-column: 2 / span 3;` means the same thing: start at line 2 and stretch over 3 cells.",
   checks:[[pressed('.long',[[1,1],[2,1],[3,1]]),"Put the long block on the 3 switches in a row: `grid-column: 2 / 5;` and `grid-row: 2;` inside `.long { }`."],
    [pressed('.small',[[4,3]]),"Put the small block on the corner switch: `grid-column: 5;` and `grid-row: 4;` inside `.small { }`."],
    [pressed('.block',[[1,1],[2,1],[3,1],[4,3]]),"Keep `class=\"block long\"` and `class=\"block small\"` on the two tags, so they stay stone blocks."]]}},

  /* 5 — Gear Pit: a zig-zag bridge drawn as a map */
  {kind:'bridge',w:5,h:3,at:[5,4],rune:[2,2],lesson:{id:'rzk4_5',concept:'grid-template-areas: a map',solid:'.bridge > div',
   learn:"`grid-template-areas` draws a **map** of the grid with words.\nEach line in quotes is one **row**. Each word is one **cell**. A `.` is an empty cell.\nThen `grid-area: b;` sends a piece to the cells called `b`.\nHere you use everything: columns, rows, `repeat` and a map!",
   example:"grid-template-areas:\n  \"top  top\"\n  \"left right\";",
   mission:"Stone gear-posts stand in the pit, so the bridge must zig-zag: across the top, down the middle, then across the bottom. Plank `a` is already on the map. Finish the map for planks `b` and `c`.",
   job:"Change row 2 of the map to `\". . b . .\"` and row 3 to `\". . c c c\"`. Then the bridge zig-zags across!",
   starter:"<div class=\"bridge\">\n  <div class=\"a\"></div>\n  <div class=\"b\"></div>\n  <div class=\"c\"></div>\n</div>\n\n<style>\n  .bridge {\n    display: grid;\n    grid-template-columns: repeat(5, 32px);\n    grid-template-rows: repeat(3, 32px);\n    grid-template-areas:\n      \"a a a . .\"\n      \". . . . .\"\n      \". . . . .\";\n  }\n  .a { grid-area: a; }\n  .b { grid-area: b; }\n  .c { grid-area: c; }\n  .bridge div { background: #c98a4b; }\n</style>",
   answer:"<div class=\"bridge\">\n  <div class=\"a\"></div>\n  <div class=\"b\"></div>\n  <div class=\"c\"></div>\n</div>\n\n<style>\n  .bridge {\n    display: grid;\n    grid-template-columns: repeat(5, 32px);\n    grid-template-rows: repeat(3, 32px);\n    grid-template-areas:\n      \"a a a . .\"\n      \". . b . .\"\n      \". . c c c\";\n  }\n  .a { grid-area: a; }\n  .b { grid-area: b; }\n  .c { grid-area: c; }\n  .bridge div { background: #c98a4b; }\n</style>",
   hints:["Each row of the map is in quotes, with 5 cells and spaces between them.","Row 2 needs `b` in the middle cell: `\". . b . .\"`","Row 3: `\". . c c c\"` — `c` fills the last 3 cells."],
   tip:"Real websites draw their page like this: `\"header header\"` and `\"menu main\"`. Easy to read, easy to change!",
   checks:[[a=>{const e=a.$('.bridge');return !!e&&/\bb\b/.test(a.css(e,'gridTemplateAreas'));},"Put `b` on the map: row 2 is `\". . b . .\"` (5 cells, with spaces, every row the same length)."],
    [a=>{const e=a.$('.bridge');return !!e&&/\bc\b/.test(a.css(e,'gridTemplateAreas'));},"Put `c` on the map: row 3 is `\". . c c c\"`."],
    [bridged('.bridge > div',[[0,0],[1,0],[2,0],[2,1],[2,2],[3,2],[4,2]]),"The bridge doesn't reach! Row 2 = `\". . b . .\"` and row 3 = `\". . c c c\"`."]]}}
 ]};
SWORD_DATA.dungeons.push(D);
})();
