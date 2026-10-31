(()=>{
const WORKER=`onmessage=e=>{const{code,grid}=e.data;let x=0,y=0;const gems=new Set(),acts=[];const H=grid.length,W=grid[0].length;
for(let r=0;r<H;r++)for(let c=0;c<W;c++){if(grid[r][c]==='S'){x=c;y=r;}if(grid[r][c]==='*')gems.add(c+','+r);}
const wall=(c,r)=>r<0||c<0||r>=H||c>=W||grid[r][c]==='#';
class Stop extends Error{}
const push=a=>{acts.push(a);if(acts.length>500)throw new Stop('too many');};
const mv=(dx,dy)=>{if(wall(x+dx,y+dy)){push({t:'bonk',x,y});throw new Stop('bonk');}x+=dx;y+=dy;push({t:'move',x,y});};
const api={moveRight:()=>mv(1,0),moveLeft:()=>mv(-1,0),moveUp:()=>mv(0,-1),moveDown:()=>mv(0,1),
 pickUp:()=>{const k=x+','+y;if(gems.has(k)){gems.delete(k);push({t:'pick',x,y});}else push({t:'miss',x,y});},
 isWallRight:()=>wall(x+1,y),isWallLeft:()=>wall(x-1,y),isWallUp:()=>wall(x,y-1),isWallDown:()=>wall(x,y+1),
 isGemHere:()=>gems.has(x+','+y),atGoal:()=>grid[y][x]==='G',say:t=>push({t:'say',text:String(t)})};
let err=null,stop=null;
try{new Function(...Object.keys(api),'"use strict";'+code)(...Object.values(api));}catch(ex){if(ex instanceof Stop)stop=ex.message;else err={name:ex.name,message:ex.message};}
postMessage({acts,err,stop,gemsLeft:gems.size,atGoal:grid[y][x]==='G'});};`;
let workerURL=null;
function runRobot(code,grid,ms=2000){return new Promise(res=>{
  if(!workerURL)workerURL=URL.createObjectURL(new Blob([WORKER],{type:'text/javascript'}));
  const w=new Worker(workerURL);const t=setTimeout(()=>{w.terminate();res({timeout:true,acts:[]});},ms);
  w.onmessage=e=>{clearTimeout(t);w.terminate();res(e.data);};
  w.onerror=e=>{clearTimeout(t);w.terminate();res({err:{name:'Error',message:e.message},acts:[]});};
  w.postMessage({code,grid});});}
const FOR="for (let i = 0; i < 3; i++) {\n  \n}\n",IF="if (isGemHere()) {\n  pickUp();\n}\n",WHILE="while (!atGoal()) {\n  \n}\n",FN="function step() {\n  \n}\n",ELSE="if (isWallRight()) {\n  moveDown();\n} else {\n  moveRight();\n}\n";
const LV=[
{id:'j1',ch:'Part 1: Commands',title:'Wake Up, Bolt',grid:["S..G"],tools:[],
 story:"Bolt the robot just woke up in a dark factory. He can't move on his own — he only does what YOUR code tells him. Get him to the exit door!",
 learn:"In JavaScript, a command looks like `moveRight();`\n• the name → `moveRight`\n• round brackets `()` → mean \"do it now!\"\n• semicolon `;` → the full stop at the end\n\nBolt reads your code from top to bottom, one line at a time.",
 job:"Get Bolt to the exit 🚪. Type `moveRight();` 3 times, one on each line.",
 hints:["Bolt needs to move right 3 times.","Write `moveRight();` on 3 separate lines."],answer:"moveRight();\nmoveRight();\nmoveRight();",
 tip:"Capital letters matter! `moveRight` works. `moveright` doesn't."},
{id:'j2',ch:'Part 1: Commands',title:'Around the Corner',grid:["S..##","##.##","##..G"],tools:[],
 story:"A corner! Bolt needs to go right, then down, then right again.",
 learn:"You have 4 move commands: `moveRight();` `moveLeft();` `moveUp();` `moveDown();`\nOrder matters — Bolt does them in the order you write them.",
 job:"Get Bolt to the exit 🚪. Go right 2, down 2, then right 2. Use `moveRight();` and `moveDown();`",
 hints:["Count the squares: right 2, down 2, right 2.","Use the command buttons to add lines quickly."],answer:"moveRight();\nmoveRight();\nmoveDown();\nmoveDown();\nmoveRight();\nmoveRight();",
 tip:"If Bolt hits a wall, he stops with a BONK. Watch where he bonks — that's where your code went wrong."},
{id:'j3',ch:'Part 1: Commands',title:'Shiny!',grid:["S.*.G"],tools:[],
 story:"A shiny gem 💎! Bolt can only leave once he has picked up every gem in the room.",
 learn:"`pickUp();` grabs a gem — but only if Bolt is standing ON it.",
 job:"Walk onto the gem 💎, then `pickUp();`. Then walk on to the exit 🚪.",
 hints:["Move to the gem first, THEN pick it up.","right, right, pickUp, right, right."],answer:"moveRight();\nmoveRight();\npickUp();\nmoveRight();\nmoveRight();",
 tip:"Code is a list of very exact steps. Computers never guess what you meant."},
{id:'j4',ch:'Part 2: Loops',title:'The Long Hallway',grid:["S.........G"],tools:['for'],
 story:"A super long hallway! You COULD write moveRight 10 times... but real programmers are lazy in a smart way.",
 learn:"A **for loop** repeats code for you, like a song chorus:\n`for (let i = 0; i < 10; i++) {`\n`  moveRight();`\n`}`\n\nSay it like this: \"count from 0 up to 10, and each time, do what's inside the curly braces\". That's 10 times!",
 job:"Use a `for` loop to do `moveRight();` 10 times. Tap `+ for loop`, change the 3 to 10.",
 hints:["Tap the `for` button to get a loop.","Change the 3 to 10, and put `moveRight();` inside the braces."],answer:"for (let i = 0; i < 10; i++) {\n  moveRight();\n}",
 tip:"`i++` means 'add 1 to i'. You'll see it everywhere in JavaScript."},
{id:'j5',ch:'Part 2: Loops',title:'The Staircase',grid:["S#####","..####","#..###","##..##","###..G"],tools:['for'],
 story:"A staircase going down! Down, right, down, right... can you spot the pattern?",
 learn:"Loops can repeat MORE than one command. Everything inside the `{ }` repeats each time.",
 job:"Loop 4 times: `moveDown();` then `moveRight();`. After the loop, one more `moveRight();` to the exit.",
 hints:["The pattern is: moveDown, moveRight. It repeats 4 times.","After the loop, one more `moveRight();` reaches the exit."],answer:"for (let i = 0; i < 4; i++) {\n  moveDown();\n  moveRight();\n}\nmoveRight();",
 tip:"Spotting patterns is the #1 programming superpower. Look for what repeats."},
{id:'j6',ch:'Part 2: Loops',title:'Gem Collector',grid:["S*.*.*G"],tools:['for'],
 story:"Three gems in a row, each with a gap after it. Can your loop collect them all?",
 learn:"Put move AND pickUp inside the loop — the loop repeats the whole pattern.",
 job:"Grab all 3 gems 💎. Loop 3 times: `moveRight();` `pickUp();` `moveRight();`",
 hints:["Pattern: moveRight, pickUp, moveRight.","Repeat that 3 times."],answer:"for (let i = 0; i < 3; i++) {\n  moveRight();\n  pickUp();\n  moveRight();\n}",
 tip:"Try changing the number in the loop and see what happens. Breaking things on purpose teaches a lot!"},
{id:'j7',ch:'Part 3: Smart Bolt',title:'Make Your Own Command',grid:["S..####","##...##","####...","######G"],tools:['for','function'],
 story:"Bolt wishes he had a 'zig-zag step' command. Good news: in JavaScript, you can INVENT your own commands!",
 learn:"A **function** is your own command, made of other commands — like a recipe with a name:\n`function step() {`\n`  moveRight();`\n`  moveRight();`\n`  moveDown();`\n`}`\nThen use it: `step();`",
 job:"Make `function step()` that does right, right, down. Then call `step();` 3 times.",
 hints:["The pattern is right, right, down — 3 times.","Make `function step() { ... }` then call `step();` 3 times."],answer:"function step() {\n  moveRight();\n  moveRight();\n  moveDown();\n}\n\nstep();\nstep();\nstep();",
 tip:"Functions keep big programs tidy. Every app you use is built from thousands of them."},
{id:'j8',ch:'Part 3: Smart Bolt',title:'Maybe a Gem?',grid:["S.**.*..*G"],tools:['for','if'],
 story:"The gems are scattered about. Bolt needs to CHECK each square: 'Is there a gem here? If yes, grab it.'",
 learn:"An **if** only runs code when the answer is yes:\n`if (isGemHere()) {`\n`  pickUp();`\n`}`\n`isGemHere()` answers true (yes) or false (no).",
 job:"Loop 9 times. Each time: `moveRight();` then `if (isGemHere()) { pickUp(); }`. Grab every gem 💎.",
 hints:["Loop 9 times. Each time: move right, then check for a gem.","Inside the loop: `moveRight();` then the `if` block."],answer:"for (let i = 0; i < 9; i++) {\n  moveRight();\n  if (isGemHere()) {\n    pickUp();\n  }\n}",
 tip:"`if` is how programs make choices. Every game, app and website is full of them."},
{id:'j9',ch:'Part 3: Smart Bolt',title:'The Mystery Hall',grid:["S...............G"],tools:['while'],
 story:"A hallway so long nobody knows how long it is! Bolt can't count it... but he CAN keep going until he reaches the exit.",
 learn:"A **while loop** keeps going as long as something is true:\n`while (!atGoal()) {`\n`  moveRight();`\n`}`\n`!` means NOT. So: \"while NOT at the exit, keep moving right\".",
 job:"Write `while (!atGoal()) { moveRight(); }` so Bolt walks until he reaches the exit 🚪.",
 hints:["Tap the `while` button.","Put `moveRight();` inside it."],answer:"while (!atGoal()) {\n  moveRight();\n}",
 tip:"Careful: a while loop that never ends freezes the program. Bolt has a safety switch — real programs don't!"},
{id:'j10',ch:'Part 3: Smart Bolt',title:'Smart Bolt',grid:["S..#####","##..*.##","#####..#","######.G"],tools:['while','if','else'],
 story:"The last room down here! Walls everywhere and a gem on the way. Make Bolt SMART: if there's a wall to the right, go down — if not, go right. Get him out and he'll reach the upper factory!",
 learn:"**if / else** picks one of two choices:\n`if (isWallRight()) {`\n`  moveDown();`\n`} else {`\n`  moveRight();`\n`}`\nPut it inside a while loop, and add a gem check too!",
 job:"Use `while (!atGoal())`. Inside: if `isGemHere()` → `pickUp();`. Then if `isWallRight()` → `moveDown();`, else → `moveRight();`.",
 hints:["Use `while (!atGoal()) { ... }` around everything.","Inside: first check for a gem (`if (isGemHere())`), then the if/else to move.","Tap the `while`, `if` and `if/else` buttons and combine them."],
 answer:"while (!atGoal()) {\n  if (isGemHere()) {\n    pickUp();\n  }\n  if (isWallRight()) {\n    moveDown();\n  } else {\n    moveRight();\n  }\n}",
 tip:"You just wrote a real algorithm — a set of smart rules that solves a problem. That's what programmers do!"},
{id:'j11',ch:'Part 4: Variables',title:'Remember a Number',grid:["S.....G"],tools:['for'],
 story:"Bolt made it to the upper factory! He has a tiny memory chip. Let's teach him to remember numbers.",
 learn:"A **variable** is a box with a label on it. It keeps a value for later:\n`let steps = 6;`\nNow `steps` means 6. Use it anywhere:\n`for (let i = 0; i < steps; i++) {`",
 job:"On its own line, make `let steps = 6;`. Then loop with `i < steps` and `moveRight();` to reach the exit.",
 need:[[/^\s*let\s+\w+\s*=\s*\d/m,"This level is about variables! On its own line, make one first, like `let steps = 6;`"]],
 hints:["Make a variable: `let steps = 6;`","Use it in a for loop: `i < steps`"],answer:"let steps = 6;\nfor (let i = 0; i < steps; i++) {\n  moveRight();\n}",
 tip:"Good names explain themselves. `steps` is much better than `x`."},
{id:'j12',ch:'Part 4: Variables',title:'Bolt Speaks',grid:["S..G"],tools:[],
 story:"Bolt wants to say hello to the factory workers! Robots can talk using words.",
 learn:"Words in code are called a **string**. Strings go inside quote marks:\n`say(\"Hello!\");`\nWithout quotes, JavaScript thinks the word is a command name and gets confused.",
 job:"Make Bolt talk: `say(\"Hello!\");` (any words, inside quotes). Then `moveRight();` 3 times.",
 need:[[/say\s*\(\s*["'`]/,"Make Bolt talk first! Try `say(\"Hello!\");` — with quotes around the words."]],
 hints:["`say(\"Hello!\");`","Then move right 3 times."],answer:"say(\"Hello!\");\nmoveRight();\nmoveRight();\nmoveRight();",
 tip:"You can use \"double\" or 'single' quotes — just make the start and end match."},
{id:'j13',ch:'Part 4: Variables',title:'Gem Counter',grid:["S*.*.*G"],tools:['for','if'],
 story:"Bolt wants to count gems as he collects them, then shout the total at the end.",
 learn:"Variables can CHANGE:\n`let gems = 0;`\n`gems = gems + 1;` adds one.\nThen `say(gems);` shows the number (no quotes — it's a variable, not a word!).",
 job:"Start with `let gems = 0;`. Collect all 3 gems 💎, and after each `pickUp();` add `gems = gems + 1;`. At the end, `say(gems);`",
 need:[[/^\s*let\s+\w+\s*=\s*0/m,"Start a counter at zero, like `let gems = 0;`"],[/\w+\s*=\s*\w+\s*\+\s*1|\w+\s*\+=\s*1|\w{2,}\s*\+\+/,"Add 1 to your counter each time, like `gems = gems + 1;`"],[/say\s*\(/,"Make Bolt say the total with `say(gems);`"]],
 hints:["`let gems = 0;` at the top.","Inside your loop, after `pickUp();`, add `gems = gems + 1;`","At the very end: `say(gems);`"],
 answer:"let gems = 0;\nfor (let i = 0; i < 3; i++) {\n  moveRight();\n  pickUp();\n  gems = gems + 1;\n  moveRight();\n}\nsay(gems);",
 tip:"`gems++` is a shortcut for `gems = gems + 1`. Pros use it all the time."},
{id:'j21',ch:'Part 4: Variables',title:'Halfway Cheer',grid:["S.....G"],tools:['for','if'],
 story:"Bolt loves a cheer. On his walk to the exit, he wants to shout \"Halfway!\" when he reaches step 3.",
 learn:"In a `for` loop, `i` is a counter. It goes up by 1 each time round. You can CHECK it with `if`:\n`for (let i = 1; i <= 6; i++) {`\n`  moveRight();`\n`  if (i === 3) { say(\"Halfway!\"); }`\n`}`\n`===` means \"is exactly the same as\".",
 job:"Loop with `for (let i = 1; i <= 6; i++)`. Each time, `moveRight();`. When `i === 3`, `say(\"Halfway!\");`",
 need:[[/for\s*\(/,"Use a `for` loop to walk right 6 times."],[/if\s*\(\s*\w+\s*===?\s*\d+\s*\)/,"Inside the loop, check the counter, like `if (i === 3) { ... }`"],[/say\s*\(\s*["'`]\s*halfway/i,"Make Bolt say **Halfway!** — `say(\"Halfway!\");`"]],
 hints:["Start with `for (let i = 1; i <= 6; i++) { moveRight(); }`","Inside the loop, after moving, add `if (i === 3) { }`","Inside the if: `say(\"Halfway!\");`"],
 answer:"for (let i = 1; i <= 6; i++) {\n  moveRight();\n  if (i === 3) {\n    say(\"Halfway!\");\n  }\n}",
 tip:"One `=` puts a value IN a box. `===` asks a question: \"are these the same?\""},
{id:'j22',ch:'Part 4: Variables',title:'Measure the Hall',grid:["S........G"],tools:['while'],
 story:"The factory boss wants to know how long this hall is. Bolt can walk it AND count every step on his memory chip!",
 learn:"Mix a counter with a while loop:\n`let steps = 0;`\n`while (!atGoal()) {`\n`  moveRight();`\n`  steps = steps + 1;`\n`}`\n`say(steps);` → Bolt says how many steps he took!",
 job:"Make `let steps = 0;`. Use `while (!atGoal())` to `moveRight();` and add 1 to `steps` each time. At the end, `say(steps);`",
 need:[[/^\s*let\s+\w+\s*=\s*0/m,"Start a counter at zero: `let steps = 0;`"],[/while\s*\(/,"Use a `while (!atGoal())` loop — don't count the squares yourself!"],[/\w+\s*\+\+|\w+\s*\+=\s*1|\w+\s*=\s*\w+\s*\+\s*1/,"Add 1 to your counter every step: `steps = steps + 1;`"],[/say\s*\(\s*[A-Za-z_$][\w$]*\s*\)/,"At the end, say the counter with NO quotes: `say(steps);`"]],
 hints:["`let steps = 0;` at the top.","`while (!atGoal()) { moveRight(); steps = steps + 1; }`","After the loop: `say(steps);`"],
 answer:"let steps = 0;\nwhile (!atGoal()) {\n  moveRight();\n  steps = steps + 1;\n}\nsay(steps);",
 tip:"Bolt should say 9. Counting with code works even when YOU don't know the answer!"},
{id:'j14',ch:'Part 5: Smarter Functions',title:'Commands with Inputs',grid:["S...#####","###.#####","###.....G"],tools:['function','for'],
 story:"Bolt is tired of counting steps one by one. What if a command could take a NUMBER, like 'walk right 5 steps'?",
 learn:"Functions can take an **input** (called a parameter). It's like telling a friend \"jump 3 times\":\n`function walkRight(n) {`\n`  for (let i = 0; i < n; i++) {`\n`    moveRight();`\n`  }`\n`}`\nNow `walkRight(3);` walks 3 steps and `walkRight(5);` walks 5!",
 job:"Make commands with an input, like `function walkRight(n)` and `function walkDown(n)`. Then: right 3, down 2, right 5.",
 need:[[/function\s+\w+\s*\(\s*\w+/,"This level needs a function with an input, like `function walkRight(n) { ... }`"]],
 hints:["Make two functions: `walkRight(n)` and `walkDown(n)`.","The path is: right 3, down 2, right 5.","`walkRight(3); walkDown(2); walkRight(5);`"],
 answer:"function walkRight(n) {\n  for (let i = 0; i < n; i++) {\n    moveRight();\n  }\n}\n\nfunction walkDown(n) {\n  for (let i = 0; i < n; i++) {\n    moveDown();\n  }\n}\n\nwalkRight(3);\nwalkDown(2);\nwalkRight(5);",
 tip:"`moveRight` is just a function someone else wrote. Now you're writing your own!"},
{id:'j23',ch:'Part 5: Smarter Functions',title:'Two Inputs',grid:["S...###","###..##","####.##","####...","######G"],tools:['function','for'],
 story:"Hop, hop, hop! Bolt wants ONE command that can do 'go right some steps, then down some steps' — any amounts you like.",
 learn:"A function can take MORE than one input. Put a comma between them:\n`function hop(right, down) {`\n`  for (let i = 0; i < right; i++) { moveRight(); }`\n`  for (let i = 0; i < down; i++) { moveDown(); }`\n`}`\n`hop(3, 1);` = 3 steps right, then 1 step down.",
 job:"Make `function hop(right, down)` that moves right `right` times, then down `down` times. Then call `hop(3, 1);` `hop(1, 2);` `hop(2, 1);`",
 need:[[/function\s+\w+\s*\(\s*\w+\s*,\s*\w+\s*\)/,"Make a function with TWO inputs, like `function hop(right, down) { ... }`"]],
 hints:["Inside `hop`, use two loops: one with `i < right` for `moveRight();`, one with `i < down` for `moveDown();`.","The path is: hop(3, 1), then hop(1, 2), then hop(2, 1)."],
 answer:"function hop(right, down) {\n  for (let i = 0; i < right; i++) {\n    moveRight();\n  }\n  for (let i = 0; i < down; i++) {\n    moveDown();\n  }\n}\n\nhop(3, 1);\nhop(1, 2);\nhop(2, 1);",
 tip:"The ORDER of inputs matters: `hop(1, 2)` is not the same as `hop(2, 1)`!"},
{id:'j15',ch:'Part 5: Smarter Functions',title:'Loops in Loops',grid:["S..######","##...####","####...##","######...","########G"],tools:['for'],
 story:"A long staircase: 2 steps right, then 1 step down — four times over. Can you put a loop INSIDE a loop?",
 learn:"**Nested loops** = a loop inside a loop:\n`for (let s = 0; s < 4; s++) {`\n`  for (let i = 0; i < 2; i++) {`\n`    moveRight();`\n`  }`\n`  moveDown();`\n`}`\nThe inside loop runs all the way through each time the outside loop goes round once.",
 job:"Put a loop inside a loop. The outside loop runs 4 times: an inside loop does `moveRight();` 2 times, then `moveDown();`",
 need:[[/for[\s\S]*for/,"Try putting one loop inside another loop!"]],
 hints:["Outside loop: 4 times. Inside loop: moveRight 2 times.","After the inside loop (but still inside the outside one): `moveDown();`"],
 answer:"for (let s = 0; s < 4; s++) {\n  for (let i = 0; i < 2; i++) {\n    moveRight();\n  }\n  moveDown();\n}",
 tip:"Use different letters (s and i) for nested loops so they don't get mixed up."},
{id:'j16',ch:'Part 5: Smarter Functions',title:'Until the Wall',grid:["S.....#","#####G#"],tools:['while'],
 story:"Bolt can feel walls! Keep walking right UNTIL there's a wall, then step down to the exit.",
 learn:"`isWallRight()` answers true or false. Mix it with a while loop:\n`while (!isWallRight()) {`\n`  moveRight();`\n`}`\n= keep going right while there's NO wall.",
 job:"Write `while (!isWallRight()) { moveRight(); }` Then `moveDown();` to the exit.",
 need:[[/while/,"Use a `while` loop with `isWallRight()` — don't count the steps!"]],
 hints:["`while (!isWallRight()) { moveRight(); }`","Then `moveDown();` after the loop."],answer:"while (!isWallRight()) {\n  moveRight();\n}\nmoveDown();",
 tip:"Code that feels the world (instead of counting) still works if the room changes size. That's smart code!"},
{id:'j24',ch:'Part 5: Smarter Functions',title:'Hug the Walls',grid:["S.....","#####.","#####.","G....."],tools:['while'],
 story:"A big empty room shaped like a hook. Bolt should follow the walls: right as far as he can, then down, then left — without counting a single step.",
 learn:"Bolt has 4 wall sensors: `isWallRight()` `isWallLeft()` `isWallUp()` `isWallDown()`. The edge of the room counts as a wall too!\n`while (!isWallDown()) { moveDown(); }` = keep going down until you can't.",
 job:"Use 3 `while` loops: right until `isWallRight()`, then down until `isWallDown()`, then left until `isWallLeft()`.",
 need:[[/while[\s\S]*while[\s\S]*while/,"Use THREE `while` loops: right until a wall, down until a wall, left until a wall."]],
 hints:["First: `while (!isWallRight()) { moveRight(); }`","Then the same with `isWallDown()` and `moveDown();`","Last: `while (!isWallLeft()) { moveLeft(); }`"],
 answer:"while (!isWallRight()) {\n  moveRight();\n}\nwhile (!isWallDown()) {\n  moveDown();\n}\nwhile (!isWallLeft()) {\n  moveLeft();\n}",
 tip:"Robot vacuums follow walls just like this to clean the edges of a room!"},
{id:'j17',ch:'Part 5: Smarter Functions',title:'The Winding Corridor',grid:["S...####","###.####","###....#","######.#","######.G"],tools:['while','else'],
 story:"A winding corridor full of turns. One smart rule solves it all: if there's a wall ahead, go down — if not, go right.",
 learn:"Put **if / else** inside a **while** loop and Bolt finds his own way:\n`while (!atGoal()) {`\n`  if (isWallRight()) { moveDown(); }`\n`  else { moveRight(); }`\n`}`",
 job:"Use `while (!atGoal())`. Inside, use `if / else`: wall to the right → `moveDown();`, else → `moveRight();`",
 need:[[/while/,"Use a `while` loop."],[/else/,"Use `if / else` inside your loop."]],
 hints:["Tap `+ while`, then put `+ if / else` inside it.","Change the while question to `!atGoal()`."],
 answer:"while (!atGoal()) {\n  if (isWallRight()) {\n    moveDown();\n  } else {\n    moveRight();\n  }\n}",
 tip:"Self-driving robots use rules like this one — just millions of them!"},
{id:'j25',ch:'Part 5: Smarter Functions',title:'Mind the Gap',grid:["S.....##","#....###","###.*.##","#####.G#"],tools:['while','if','else'],
 story:"Holes in the floor! Bolt has a new trick: if there's floor under him, he walks right. If there's a hole, he drops down into it. Wheee!",
 learn:"`isWallDown()` checks the floor under Bolt. True = solid floor. False = a hole!\n`if (isWallDown()) {`\n`  moveRight();`\n`} else {`\n`  moveDown();`\n`}`",
 job:"Use `while (!atGoal())`. Grab gems with `if (isGemHere())`. Then: if `isWallDown()` → `moveRight();`, else → `moveDown();`",
 need:[[/isWallDown/,"Use the `isWallDown()` sensor to check the floor."],[/while/,"Use a `while (!atGoal())` loop."],[/else/,"Use `if / else`: floor below → move right, hole below → drop down."]],
 hints:["`while (!atGoal()) { ... }` around everything.","Inside: first `if (isGemHere()) { pickUp(); }`","Then: `if (isWallDown()) { moveRight(); } else { moveDown(); }`"],
 answer:"while (!atGoal()) {\n  if (isGemHere()) {\n    pickUp();\n  }\n  if (isWallDown()) {\n    moveRight();\n  } else {\n    moveDown();\n  }\n}",
 tip:"Games use a rule just like this for gravity: no floor under you? You fall!"},
{id:'j18',ch:'Part 6: Master Bolt',title:'The Gem Snake',grid:["S*.*.*",".*..*.","..*..G"],tools:['function','for','if'],
 story:"Gems all over three rows! Sweep right, step down, sweep left, step down, sweep right. Functions will save you SO much typing.",
 learn:"Mix everything: functions + loops + if.\n`function sweepRight() {`\n`  for (let i = 0; i < 5; i++) {`\n`    moveRight();`\n`    if (isGemHere()) { pickUp(); }`\n`  }`\n`}`\nThen make a `sweepLeft()` too!",
 job:"Make `sweepRight()` and `sweepLeft()` (5 moves each, grab any gem). Then: sweepRight, `moveDown();`, sweepLeft, `moveDown();`, sweepRight.",
 hints:["Make `sweepRight()` and `sweepLeft()` (5 moves each, checking for gems each step).","Order: sweepRight, moveDown, sweepLeft, moveDown, sweepRight."],
 answer:"function sweepRight() {\n  for (let i = 0; i < 5; i++) {\n    moveRight();\n    if (isGemHere()) {\n      pickUp();\n    }\n  }\n}\n\nfunction sweepLeft() {\n  for (let i = 0; i < 5; i++) {\n    moveLeft();\n    if (isGemHere()) {\n      pickUp();\n    }\n  }\n}\n\nsweepRight();\nmoveDown();\nsweepLeft();\nmoveDown();\nsweepRight();",
 tip:"Breaking a big problem into small named pieces is the most important programming skill there is."},
{id:'j26',ch:'Part 6: Master Bolt',title:'The Growing Stairs',grid:["S.#####","#...###","###....","######G"],tools:['for'],
 story:"Strange stairs: each step is longer than the one before! 1 step right, then 2, then 3 — with a step down after each.",
 learn:"The inside loop can use the OUTSIDE loop's counter!\n`for (let s = 1; s <= 3; s++) {`\n`  for (let i = 0; i < s; i++) { moveRight(); }`\n`  moveDown();`\n`}`\nThe first time round s is 1, then 2, then 3 — so each step gets longer.",
 job:"Outside loop: `s` goes from 1 to 3. Inside loop: `moveRight();` `s` times (use `i < s`). After the inside loop, `moveDown();`",
 need:[[/for[\s\S]*for/,"Put one `for` loop inside another."],[/for\s*\([^)]*;\s*\w+\s*<=?\s*[A-Za-z_$][\w$]*\s*;/,"The inside loop should count up to the OUTSIDE counter, like `i < s` — not a fixed number."]],
 hints:["Outside: `for (let s = 1; s <= 3; s++) { ... }`","Inside it: `for (let i = 0; i < s; i++) { moveRight(); }` then `moveDown();`"],
 answer:"for (let s = 1; s <= 3; s++) {\n  for (let i = 0; i < s; i++) {\n    moveRight();\n  }\n  moveDown();\n}",
 tip:"Patterns that grow are everywhere: triangles of stars, times tables, pyramids of blocks."},
{id:'j27',ch:'Part 6: Master Bolt',title:'A Smart Command',grid:["S..#######","##.....###","######..##","#######..G"],tools:['function','while'],
 story:"Corridors of all different lengths! Make ONE smart command that runs right until it hits a wall — however long the corridor is.",
 learn:"Functions can hold smart loops too:\n`function run() {`\n`  while (!isWallRight()) { moveRight(); }`\n`}`\nNow `run();` always stops at the wall — short corridor or long!",
 job:"Make `function run()` with `while (!isWallRight()) { moveRight(); }` inside. Then do `run();` `moveDown();` 3 times, and one last `run();`",
 need:[[/function\s+\w+\s*\(\s*\)\s*\{[^}]*while/,"Make your own command with a `while` loop inside, like `function run() { while (...) { ... } }`"]],
 hints:["`function run() { while (!isWallRight()) { moveRight(); } }`","Then: `run(); moveDown(); run(); moveDown(); run(); moveDown(); run();`"],
 answer:"function run() {\n  while (!isWallRight()) {\n    moveRight();\n  }\n}\n\nrun();\nmoveDown();\nrun();\nmoveDown();\nrun();\nmoveDown();\nrun();",
 tip:"A smart command you can use again and again is worth more than 100 lines of copy-paste."},
{id:'j28',ch:'Part 6: Master Bolt',title:'Over and Under',grid:["S.#...##","#...#..G"],tools:['while','else'],
 story:"This tunnel goes UNDER walls and OVER them. Bolt needs three choices now, not two!",
 learn:"`else if` adds a THIRD choice. Bolt checks from the top and does the first one that's true:\n`if (!isWallRight()) { moveRight(); }`\n`else if (!isWallDown()) { moveDown(); }`\n`else { moveUp(); }`",
 job:"Use `while (!atGoal())`. Inside: if NO wall right → `moveRight();`. `else if` NO wall down → `moveDown();`. `else` → `moveUp();`",
 need:[[/while/,"Use a `while (!atGoal())` loop."],[/else\s+if/,"Use `else if` to give Bolt a third choice."]],
 hints:["`while (!atGoal()) { ... }` around everything.","Inside: `if (!isWallRight()) { moveRight(); } else if (!isWallDown()) { moveDown(); } else { moveUp(); }`"],
 answer:"while (!atGoal()) {\n  if (!isWallRight()) {\n    moveRight();\n  } else if (!isWallDown()) {\n    moveDown();\n  } else {\n    moveUp();\n  }\n}",
 tip:"You can chain as many `else if` choices as you like. The first true one wins."},
{id:'j19',ch:'Part 6: Master Bolt',title:'Countdown',grid:["S..G"],tools:['for'],
 story:"Before the final escape, Bolt wants a big countdown: 3... 2... 1... GO!",
 learn:"Loops can count DOWN too:\n`for (let i = 3; i > 0; i--) {`\n`  say(i);`\n`}`\n`i--` means 'take 1 away'. Then say \"GO!\" and move!",
 job:"Count down with `for (let i = 3; i > 0; i--)` and `say(i);` inside. Then `say(\"GO!\");` and `moveRight();` 3 times.",
 need:[[/--|-=\s*1/,"Count DOWN using `i--` in your loop."],[/say\s*\(/,"Use `say(i);` so Bolt counts out loud."]],
 hints:["`for (let i = 3; i > 0; i--) { say(i); }`","Then `say(\"GO!\");` and move right 3 times."],
 answer:"for (let i = 3; i > 0; i--) {\n  say(i);\n}\nsay(\"GO!\");\nmoveRight();\nmoveRight();\nmoveRight();",
 tip:"`say(i)` shows the NUMBER inside i — because there are no quotes around i."},
{id:'j20',ch:'Part 6: Master Bolt',title:'The Great Escape',grid:["S.*.######","###.######","###.*...##","#######.##","#######*..","#########G"],tools:['while','if','else','function'],
 story:"The final exit! A long winding path with gems hidden along it. Write ONE smart program and Bolt walks out into the sunshine. ☀️",
 learn:"Use everything you know: a while loop, a gem check, and an if/else to choose a direction. You've got this!",
 job:"Grab every gem 💎 and reach the exit. Use `while (!atGoal())`, a gem check, and: wall right → `moveDown();`, else → `moveRight();`",
 hints:["`while (!atGoal()) { ... }` around everything.","Inside: first check for a gem, then: if wall right → moveDown, else → moveRight."],
 answer:"while (!atGoal()) {\n  if (isGemHere()) {\n    pickUp();\n  }\n  if (isWallRight()) {\n    moveDown();\n  } else {\n    moveRight();\n  }\n}",
 tip:"You just wrote a real path-finding algorithm. Robot vacuums use ideas just like this!"}
];
function friendly(err){
  if(!err)return'';const m=err.message||'';
  let r=/([\w$]+) is not defined/.exec(m);
  if(r)return`JavaScript doesn't know <code>${esc(r[1])}</code>. Check the spelling — capital letters matter! (e.g. <code>moveRight</code>, not <code>moveright</code>)`;
  if(err.name==='SyntaxError')return`Something's wrong with the punctuation. Check every <code>(</code> has a <code>)</code>, every <code>{</code> has a <code>}</code>.<br><small>Browser says: ${esc(m)}</small>`;
  if(/is not a function/.test(m))return`Something is being used like a command, but it isn't one. Did you forget the <code>()</code> or misspell a name?<br><small>${esc(m)}</small>`;
  return esc(err.name+': '+m);
}
let animT=null;
function cleanup(){clearTimeout(animT);animT=null;}
function play(L,el,done){
  cleanup();let hints=0,used=false,running=false;
  const rows=L.grid.length,cols=L.grid[0].length;
  const tb={for:['for loop',FOR],if:['if',IF],while:['while',WHILE],function:['function',FN],else:['if / else',ELSE]};
  const S=Studio(el,{cls:'robot'});S.job(L.job||'');
  S.task.innerHTML=`<div class="bstory">${storyHTML('Bolt the robot',L.story)}<div class="lesson">📖 ${md(L.learn)}</div></div>`;
  S.code.innerHTML=`<div class="pane-h">✍️ Your JavaScript <small>Ctrl + Enter = run</small></div><textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="JavaScript code"></textarea><div class="snips cmds"></div><div class="snips"></div>`;
  S.view.innerHTML=`<div class="pane-h">🏭 The factory <small>watch Bolt follow your code</small></div><div class="rgridwrap"><div class="rgrid"></div></div><div class="count gemc"></div>`;
  S.actions.innerHTML=`<button class="btn" data-a="hint">💡 Hint</button><button class="btn" data-a="tip">✨ Tip</button><button class="btn" data-a="ans">👁 Answer</button><button class="btn ghost" data-a="clear">🗑 Clear</button><button class="btn primary big" data-a="run">▶ Run my code</button>`;
  el=S.el;
  const ed=$('textarea.code',el),grid=$('.rgrid',el),hb=S.hb;
  const fb=(t,h)=>S.fb(t,h);
  const cell=Math.max(15,Math.min(48,Math.floor((Math.min(S.view.clientWidth||9999,window.innerWidth,560)-40)/cols)-3));
  grid.style.setProperty('--cell',cell+'px');grid.style.gridTemplateColumns=`repeat(${cols},var(--cell))`;
  const key='code_'+L.id;ed.value=PROG.robot[key]||'';
  ed.addEventListener('input',()=>{PROG.robot[key]=ed.value;saveProg();});
  wireEditor(ed,()=>{},()=>run());
  const cmds=$('.cmds',el);
  ['moveRight();','moveLeft();','moveUp();','moveDown();','pickUp();'].forEach(cm=>{const b=document.createElement('button');b.className='cmd';b.type='button';b.textContent=cm;b.onmousedown=e=>e.preventDefault();b.onclick=()=>{insertAt(ed,cm+'\n');PROG.robot[key]=ed.value;saveProg();};cmds.appendChild(b);});
  L.tools.forEach(t=>{const b=document.createElement('button');b.className='cmd';b.type='button';b.textContent='+ '+tb[t][0];b.onmousedown=e=>e.preventDefault();b.onclick=()=>{insertAt(ed,tb[t][1]);PROG.robot[key]=ed.value;saveProg();};cmds.appendChild(b);});
  addSnips($('.snips:not(.cmds)',el),ed,()=>{},['(',')','{','}',';','!','<','>','=','+','-','"']);
  let start=[0,0];const gemCells={};
  function draw(){grid.innerHTML='';L.grid.forEach((r,y)=>[...r].forEach((ch,x)=>{const d=document.createElement('div');d.className='rcell'+(ch==='#'?' wall':ch==='G'?' goal':'');d.textContent=ch==='G'?'🚪':ch==='*'?'💎':'';if(ch==='*')gemCells[x+','+y]=d;if(ch==='S')start=[x,y];grid.appendChild(d);}));
    const bot=document.createElement('div');bot.className='bot';bot.textContent='🤖';grid.appendChild(bot);place(bot,start[0],start[1]);
    $('.gemc',el).textContent=Object.keys(gemCells).length?`💎 Gems to collect: ${Object.keys(gemCells).length}`:'';}
  const place=(b,x,y)=>{b.style.left=(3+x*(cell+3))+'px';b.style.top=(3+y*(cell+3))+'px';};
  draw();
  async function run(){if(running)return;if(!ed.value.trim()){fb('bad','Write some commands first! Tap the buttons below the editor to add them.');return;}
    if(L.need)for(const[re,msg]of L.need)if(!re.test(ed.value)){fb('bad','📚 '+md(msg));return;}
    running=true;cleanup();draw();fb('info','🤖 Bolt is following your code…');
    const r=await runRobot(ed.value,L.grid);
    if(r.timeout||(r.err&&!r.acts.length))TRACK.attempt(CURRENT_GAME,L.id,false);
    if(r.timeout){running=false;fb('bad','⏳ Your loop never ended! (That\'s called an infinite loop.) Check the condition in your <code>while</code> or <code>for</code>.');return;}
    if(r.err&&!r.acts.length){running=false;fb('bad','❌ '+friendly(r.err));return;}
    const bot=$('.bot',grid);let i=0;let total=Object.keys(gemCells).length,got=0;
    const stepA=()=>{if(i>=r.acts.length){end();return;}const a=r.acts[i++];
      if(a.t==='move')place(bot,a.x,a.y);
      else if(a.t==='pick'){const c=gemCells[a.x+','+a.y];if(c)c.textContent='✨';got++;$('.gemc',el).textContent=`💎 Gems: ${got}/${total}`;}
      else if(a.t==='miss'){bot.innerHTML='🤖<span class="bubble">No gem here!</span>';setTimeout(()=>{bot.textContent='🤖';},500);}
      else if(a.t==='say'){bot.innerHTML=`🤖<span class="bubble">${esc(a.text)}</span>`;setTimeout(()=>{bot.textContent='🤖';},800);}
      else if(a.t==='bonk'){bot.classList.remove('bonk');void bot.offsetWidth;bot.classList.add('bonk');}
      animT=setTimeout(stepA,a.t==='say'?800:230);};
    const end=()=>{running=false;TRACK.attempt(CURRENT_GAME,L.id,!r.err&&!r.stop&&r.atGoal&&!r.gemsLeft);
      if(r.err){fb('bad','❌ '+friendly(r.err));return;}
      if(r.stop==='bonk'){fb('bad','💥 BONK! Bolt walked into a wall. Look where he stopped — which command sent him the wrong way?');return;}
      if(r.stop==='too many'){fb('bad','😵 Bolt took way too many steps. Is a loop running more times than you meant?');return;}
      if(!r.atGoal){fb('bad','🤖 Bolt stopped, but he isn\'t at the exit 🚪 yet. Add more commands!');return;}
      if(r.gemsLeft){fb('bad',`💎 Bolt reached the exit, but left ${r.gemsLeft} gem${r.gemsLeft>1?'s':''} behind! Use <code>pickUp();</code> while standing on a gem.`);return;}
      fb('good','✅ Bolt escaped! Your code works.');done(used?1:hints?2:3);};
    stepA();}
  $('[data-a=run]',el).onclick=run;
  $('[data-a=clear]',el).onclick=()=>{ed.value='';PROG.robot[key]='';saveProg();cleanup();running=false;draw();fb();};
  $('[data-a=hint]',el).onclick=()=>{if(hints<L.hints.length)hints++;TRACK.hint(CURRENT_GAME,L.id,hints);hb.innerHTML=L.hints.slice(0,hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('');el.classList.add('has-fb');};
  $('[data-a=tip]',el).onclick=()=>{showTip(hb,L.tip);el.classList.add('has-fb');};
  $('[data-a=ans]',el).onclick=()=>{used=true;TRACK.answer(CURRENT_GAME,L.id);ed.value=L.answer;PROG.robot[key]=ed.value;saveProg();hb.innerHTML=`<div class="h a">👁 <b>Here's one answer.</b> Read it line by line and imagine Bolt doing each step. Then press ▶ Run.</div>`;};
}
Game({id:'robot',emoji:'🤖',title:'Robot Commander',levels:LV,play,cleanup,
 intro:`<h2>🏭 Bolt's Big Escape</h2><p class="lesson">Bolt is a tiny robot lost in a giant factory. He can't think for himself — he only does exactly what your code says. Guide him to the exit 🚪 and collect every gem 💎.</p><p class="lesson">This game teaches <b>JavaScript</b> — the language that makes websites DO things. You'll learn commands, loops, functions and if-statements. Best played after the HTML &amp; CSS games.</p>`,
 finale:"Bolt is free! ☀️ You learned commands, variables, strings, counters, loops, nested loops, functions with inputs, wall sensors, if/else, else if and while loops — the core building blocks of every program ever written."});
window.__ROBOT={LV,runRobot};
})();
