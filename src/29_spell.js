(()=>{
const WORKER=`onmessage=e=>{const{code,tests}=e.data;const out=[];
const fmt=v=>typeof v==='string'?v:(()=>{try{const j=JSON.stringify(v);return j===undefined?String(v):j;}catch(_){return String(v);}})();
const con={log:(...a)=>{out.push(a.map(fmt).join(' '));if(out.length>300)throw new Error('TOO_MUCH');}};
let res=null,err=null;
try{const fn=new Function('console','__code','__out','"use strict";\\n'+code+'\\n;return ['+tests.map(t=>'(()=>{try{return !!('+t+')}catch(_e){return false}})()').join(',')+'];');res=fn(con,code,out);}
catch(ex){err={name:ex.name,message:ex.message};}
postMessage({out,res,err});};`;
let url=null;
function runSpell(code,tests,ms=1500){return new Promise(res=>{
  if(!url)url=URL.createObjectURL(new Blob([WORKER],{type:'text/javascript'}));
  const w=new Worker(url);const t=setTimeout(()=>{w.terminate();res({timeout:true,out:[]});},ms);
  w.onmessage=e=>{clearTimeout(t);w.terminate();res(e.data);};
  w.onerror=e=>{clearTimeout(t);w.terminate();res({err:{name:'Error',message:e.message},out:[]});};
  w.postMessage({code,tests});});}
function friendly(err){
  const m=err.message||'';let r;
  if(m==='TOO_MUCH')return'Your spell printed way too much! Is a loop running forever?';
  if((r=/([\w$]+) is not defined/.exec(m)))return`JavaScript doesn't know <code>${esc(r[1])}</code>. Did you create it with <code>let</code> first? Check the spelling — capital letters matter!`;
  if(/Assignment to constant/.test(m))return`You used <code>const</code>, which can never change. Use <code>let</code> for things that change.`;
  if(/has already been declared/.test(m))return`You used <code>let</code> twice for the same name. Only use <code>let</code> the FIRST time — after that, just write <code>name = ...</code><br><small>${esc(m)}</small>`;
  if(err.name==='SyntaxError')return`Something's wrong with the punctuation. Check every <code>(</code> has a <code>)</code>, every <code>{</code> has a <code>}</code>, and text has quotes on BOTH sides.<br><small>Browser says: ${esc(m)}</small>`;
  if(/is not a function/.test(m))return`Something is being used like a command, but it isn't one. A typo in the name?<br><small>${esc(m)}</small>`;
  return esc(err.name+': '+m);
}
// {BT} in any text below is shown to the player as a backtick character (md() can't show one inside code).
const mdx=s=>md(s).replace(/\{BT\}/g,'&#96;');
const S=[
{id:'s1',ch:'Year 1: First Spells',title:'Speak!',
 story:"Welcome to Spell Academy, young wizard! Every spell here is written in **JavaScript**. Your first spell: make the crystal ball talk.",
 learn:"`console.log()` makes the crystal ball say something. Put your words inside quote marks:\n`console.log(\"Hi there!\");`",
 mission:"Make the crystal ball say **Hello, world!**",
 job:"Make the crystal ball say **Hello, world!** Type `console.log(\"Hello, world!\");`",starter:"",
 tests:[["__out.some(l=>/hello/i.test(l))","Make it say Hello, world! Type `console.log(\"Hello, world!\");`"]],
 hints:["The spell is `console.log( )`","Put your words inside quotes, inside the brackets: `console.log(\"Hello, world!\");`"],answer:"console.log(\"Hello, world!\");",
 tip:"'Hello, world!' is the very first program almost every programmer ever writes. Welcome to the club!"},
{id:'s2',ch:'Year 1: First Spells',title:'Name Your Familiar',
 story:"Every wizard has a magic pet, called a familiar. Let's keep its name in a magic jar.",
 learn:"A **variable** is a jar with a label on it. You can put something inside:\n`let pet = \"Owl\";`\nNow `pet` means \"Owl\". Show it with `console.log(pet);` — NO quotes around pet, because you want what's INSIDE the jar.",
 mission:"Make a variable called `pet` holding any name you like, then print it.",
 job:"Make a jar called `pet` with any name inside, like `let pet = \"Owl\";` Then print it: `console.log(pet);`",starter:"",
 tests:[["typeof pet==='string'&&pet.length>0","Make a jar called `pet` holding a name in quotes, like `let pet = \"Owl\";`"],["__out.some(l=>l===pet)","Print your pet's name with `console.log(pet);` (no quotes around pet!)"]],
 hints:["`let pet = \"Owl\";`","On the next line: `console.log(pet);`"],answer:"let pet = \"Owl\";\nconsole.log(pet);",
 tip:"Try `console.log(\"pet\");` WITH quotes and see the difference. Quotes = the actual word. No quotes = what's in the jar."},
{id:'s3',ch:'Year 1: First Spells',title:'Mana Points',
 story:"Spells use magic energy called mana. You start with 100.",
 learn:"Jars can hold numbers too. Numbers do NOT need quotes:\n`let age = 12;`",
 mission:"Make `let mana = 100;` and print it.",
 job:"Write `let mana = 100;` Then print it with `console.log(mana);`",starter:"",
 tests:[["mana===100","Write `let mana = 100;` — numbers don't need quotes."],["__out.some(l=>l==='100')","Print it with `console.log(mana);`"]],
 hints:["`let mana = 100;`","`console.log(mana);`"],answer:"let mana = 100;\nconsole.log(mana);",
 tip:"`100` is a number you can do maths with. `\"100\"` with quotes is just text that looks like a number."},
{id:'s4',ch:'Year 1: First Spells',title:'Spell Maths',
 story:"A Power Spell is 7 times 6 strong. Don't do the maths yourself — let the magic do it!",
 learn:"JavaScript is a super calculator:\n`+` add, `-` take away, `*` times, `/` share (divide)\n`let total = 5 + 3;` → total is 8",
 mission:"Make `let power = 7 * 6;` and print it. Don't type the answer (42) — write the sum `7 * 6`.",
 job:"Write `let power = 7 * 6;` (don't type 42 yourself!). Then `console.log(power);`",starter:"",
 tests:[["power===42","`power` should be 7 times 6: `let power = 7 * 6;`"],["!/=\\s*42\\b/.test(__code)","Don't type 42 yourself — write the sum: `7 * 6`."],["__out.some(l=>l==='42')","Print it with `console.log(power);`"]],
 hints:["Times uses a star: `*`","`let power = 7 * 6;` then `console.log(power);`"],answer:"let power = 7 * 6;\nconsole.log(power);",
 tip:"Computers can do billions of sums every second. Let them do the maths!"},
{id:'s22',ch:'Year 1: First Spells',title:'Sharing Sweets',
 story:"Professor Bytewood has 17 chocolate frogs to share between 5 students. Everyone gets the same. How many frogs are LEFT OVER for the professor?",
 learn:"`%` tells you the **leftover** after sharing (grown-ups call it the remainder):\n`10 % 3` → 1 (3 + 3 + 3 = 9, and 1 is left)\n`8 % 2` → 0 (nothing left over)",
 mission:"Make `let left = 17 % 5;` and print it. Let `%` work out the answer — don't type it yourself!",
 job:"Share 17 frogs between 5. Write `let left = 17 % 5;` Then print it: `console.log(left);`",starter:"",
 tests:[["left===2","`left` should be the leftover after sharing 17 between 5: `let left = 17 % 5;`"],["/%/.test(__code)","Use the leftover sign `%`: `17 % 5`."],["__out.some(l=>l==='2')","Print it with `console.log(left);`"]],
 hints:["The leftover sign is `%` (tap the `%` button).","`let left = 17 % 5;` then `console.log(left);`"],answer:"let left = 17 % 5;\nconsole.log(left);",
 tip:"`%` can spot even numbers: if `n % 2` is 0, then n is even!"},
{id:'s5',ch:'Year 1: First Spells',title:'Joining Words',
 story:"The Academy needs your full wizard name for the register. Your first and last names are already in jars.",
 learn:"`+` also GLUES words together:\n`\"Hi\" + \"There\"` → \"HiThere\"\nNeed a space? Glue one in the middle: `first + \" \" + last`",
 mission:"Make `fullName` by gluing `first`, a space and `last` together (so it says **Luna Star**). Then print it. Use the jars — don't type Luna Star yourself.",
 job:"Glue the names: `let fullName = first + \" \" + last;` Then `console.log(fullName);`",starter:"let first = \"Luna\";\nlet last = \"Star\";\n\n",
 tests:[["fullName==='Luna Star'","`fullName` should be \"Luna Star\": `first + \" \" + last` (don't forget the space in the middle)."],["!/['\"`]Luna Star['\"`]/.test(__code)","Build it from the jars `first` and `last` — don't type \"Luna Star\" yourself!"]],
 hints:["`let fullName = first + \" \" + last;`","Then `console.log(fullName);`"],answer:"let first = \"Luna\";\nlet last = \"Star\";\n\nlet fullName = first + \" \" + last;\nconsole.log(fullName);",
 tip:"Gluing text together is called 'concatenation'. Fancy word, simple idea."},
{id:'s23',ch:'Year 1: First Spells',title:'Magic Backticks',
 story:"Gluing words with `+` gets fiddly. Wizards have a shortcut: magic backticks that drop a jar right into a sentence!",
 learn:"Use **backticks** {BT} instead of quote marks (the {BT} key is top-left, under Esc — or tap the {BT} button). Inside, put a jar in `${ }`:\n`let pet = \"Owl\";`\n`console.log({BT}I love my ${pet}{BT});` → I love my Owl",
 mission:"Make `message` with backticks so it says **Luna has 7 wands**. Use `${name}` and `${wands}` inside — don't type Luna or 7 yourself. Then print it.",
 job:"Write `let message = {BT}${name} has ${wands} wands{BT};` (with backticks!). Then `console.log(message);`",starter:"let name = \"Luna\";\nlet wands = 7;\n\n",
 tests:[["typeof message==='string'&&message.trim().toLowerCase().replace(/[.!]+$/,'')==='luna has 7 wands'","`message` should say \"Luna has 7 wands\"."],["/`[^`]*\\$\\{\\s*name\\s*\\}[^`]*`/.test(__code)&&/\\$\\{\\s*wands\\s*\\}/.test(__code)","Use backticks with `${name}` and `${wands}` inside — don't type Luna or 7 yourself."],["__out.some(l=>l===message)","Print it with `console.log(message);`"]],
 hints:["Backticks look like this: {BT} — not ' and not \".","`let message = {BT}${name} has ${wands} wands{BT};`","Then on the next line: `console.log(message);`"],answer:"let name = \"Luna\";\nlet wands = 7;\n\nlet message = `${name} has ${wands} wands`;\nconsole.log(message);",
 tip:"Backtick text is called a 'template literal'. It can even do sums inside: `${wands * 2}`."},
{id:'s6',ch:'Year 1: First Spells',title:'Level Up!',
 story:"You just passed your first exam! Time to go up a level.",
 learn:"Jars made with `let` can change:\n`level = level + 1;`\nSay it like this: 'level becomes level plus 1'.\nNo `let` the second time — the jar is already there!",
 mission:"Add 1 to `level` using `level = level + 1;` (keep the starting `let level = 1;`).",
 job:"On the empty line, write `level = level + 1;` Don't change the 1 at the top.",starter:"let level = 1;\n\n// add 1 to level on the line below\n\n\nconsole.log(level);",
 tests:[["level===2","Add 1 to level: `level = level + 1;`"],["!/let\\s+level\\s*=\\s*2/.test(__code)","Keep `let level = 1;` at the top — add to it with `level = level + 1;`"]],
 hints:["On the empty line: `level = level + 1;`","Don't write `let` again — level already exists."],answer:"let level = 1;\n\n// add 1 to level on the line below\nlevel = level + 1;\n\nconsole.log(level);",
 tip:"Shortcut: `level++` also adds 1. And `level += 5` adds 5."},
{id:'s24',ch:'Year 1: First Spells',title:'The Unbreakable Seal',
 story:"Some things must NEVER change — like the name of our school. Wizards lock them with an unbreakable seal.",
 learn:"`let` makes a jar you can change later. `const` makes a **locked** jar that can never change:\n`const sun = \"hot\";`\nIf you try `sun = \"cold\";` later, the spell backfires! Use `const` for things that stay the same.",
 mission:"Lock the school name: make `const school = \"Spell Academy\";` and print it.",
 job:"Write `const school = \"Spell Academy\";` (use `const`, not `let`). Then `console.log(school);`",starter:"",
 tests:[["/\\bconst\\s+school\\b/.test(__code)","Use `const` (not `let`) to make `school`: `const school = \"Spell Academy\";`"],["typeof school==='string'&&school.trim().toLowerCase()==='spell academy'","`school` should hold the words \"Spell Academy\"."],["__out.some(l=>l===school)","Print it with `console.log(school);`"]],
 hints:["`const` works just like `let`, but locks the jar.","`const school = \"Spell Academy\";` then `console.log(school);`"],answer:"const school = \"Spell Academy\";\nconsole.log(school);",
 tip:"Lots of pros use `const` for everything, and only switch to `let` when a value really has to change."},
{id:'s7',ch:'Year 2: Choices',title:'True or False?',
 story:"The Sorting Hat asks one question: are you a wizard? Answer with a yes-or-no value.",
 learn:"**Booleans** are yes/no values: `true` (yes) or `false` (no).\nNo quotes! `\"true\"` with quotes is just a word.",
 mission:"Make `let isWizard = true;` and print it.",
 job:"Write `let isWizard = true;` (no quotes!). Then `console.log(isWizard);`",starter:"",
 tests:[["isWizard===true","Write `let isWizard = true;` — no quotes around true!"],["__out.some(l=>l==='true')","Print it with `console.log(isWizard);`"]],
 hints:["`let isWizard = true;`","`console.log(isWizard);`"],answer:"let isWizard = true;\nconsole.log(isWizard);",
 tip:"Booleans are named after George Boole, a maths teacher from the 1800s."},
{id:'s8',ch:'Year 2: Choices',title:'Enough Mana?',
 story:"A Lightning Spell costs 50 mana. You only have 30. Let the computer check if you have enough.",
 learn:"A comparison is a question. The answer is true or false:\n`>` bigger than · `<` smaller than\n`>=` bigger or the same · `===` exactly the same\n`10 > 3` → true",
 mission:"Make `let enough = mana > 50;` and print it.",
 job:"Ask the question: `let enough = mana > 50;` Then `console.log(enough);` (it should say false).",starter:"let mana = 30;\n\n",
 tests:[["typeof enough==='boolean'","`enough` should be true or false — ask a question: `mana > 50`"],["enough===false","Check: is mana (30) bigger than 50? Write `let enough = mana > 50;`"],["/mana\\s*>=?\\s*50/.test(__code)","Let the computer compare: `let enough = mana > 50;`"]],
 hints:["`let enough = mana > 50;`","`console.log(enough);` — it should print false."],answer:"let mana = 30;\n\nlet enough = mana > 50;\nconsole.log(enough);",
 tip:"One `=` puts something IN a jar. Three `===` ask \"are these the same?\""},
{id:'s25',ch:'Year 2: Choices',title:'Fussy or Relaxed?',
 story:"Two scrolls: one has the NUMBER 5, the other has the WORD \"5\". Are they the same? It depends how fussy you are!",
 learn:"`==` (two equals) is **relaxed**. It says `5 == \"5\"` is true.\n`===` (three equals) is **fussy**. The kind of thing must match too, so `5 === \"5\"` is false.\nWizards almost always use `===` — fewer surprises!",
 mission:"Make `let relaxed = a == b;` and `let fussy = a === b;` Then print both.",
 job:"Write `let relaxed = a == b;` and `let fussy = a === b;` Then print both with `console.log(relaxed);` and `console.log(fussy);`",starter:"let a = 5;\nlet b = \"5\";\n\n",
 tests:[["relaxed===true","`relaxed` should be `a == b` (two equals)."],["fussy===false","`fussy` should be `a === b` (three equals)."],["/a\\s*==\\s*b/.test(__code)&&/a\\s*===\\s*b/.test(__code)","Compare the scrolls yourself: `a == b` and `a === b`."],["__out.includes('true')&&__out.includes('false')","Print both: `console.log(relaxed);` and `console.log(fussy);`"]],
 hints:["Two equals: `let relaxed = a == b;`","Three equals: `let fussy = a === b;`","Then `console.log(relaxed);` and `console.log(fussy);`"],answer:"let a = 5;\nlet b = \"5\";\n\nlet relaxed = a == b;\nlet fussy = a === b;\nconsole.log(relaxed);\nconsole.log(fussy);",
 tip:"Mixing up `=` and `===` is one of the most common bugs ever. Now you know the difference!"},
{id:'s26',ch:'Year 2: Choices',title:'Two Keys',
 story:"The vault door has two locks. To OPEN it, you need the key AND the wand. To just peek through the keyhole, the key OR the wand will do.",
 learn:"`&&` means **AND**: true only if BOTH sides are true.\n`||` means **OR**: true if at least ONE side is true.\n`true && false` → false\n`true || false` → true",
 mission:"Make `let canOpen = hasKey && hasWand;` and `let canPeek = hasKey || hasWand;` Print both.",
 job:"Write `let canOpen = hasKey && hasWand;` and `let canPeek = hasKey || hasWand;` Then print both with `console.log()`.",starter:"let hasKey = true;\nlet hasWand = false;\n\n",
 tests:[["canOpen===false","`canOpen` needs BOTH: `let canOpen = hasKey && hasWand;`"],["canPeek===true","`canPeek` needs just one: `let canPeek = hasKey || hasWand;`"],["/&&/.test(__code)&&/\\|\\|/.test(__code)","Use `&&` for canOpen and `||` for canPeek."],["__out.includes('true')&&__out.includes('false')","Print both: `console.log(canOpen);` and `console.log(canPeek);`"]],
 hints:["AND is two `&` signs. OR is two `|` signs (tap the buttons).","`let canOpen = hasKey && hasWand;`","`let canPeek = hasKey || hasWand;` then print both."],answer:"let hasKey = true;\nlet hasWand = false;\n\nlet canOpen = hasKey && hasWand;\nlet canPeek = hasKey || hasWand;\nconsole.log(canOpen);\nconsole.log(canPeek);",
 tip:"On most keyboards `|` is above Enter (hold Shift). It's called a 'pipe'."},
{id:'s9',ch:'Year 2: Choices',title:'The Healing Spell',
 story:"Your health (hp) is low! Write a spell that ONLY heals when hp is below 50.",
 learn:"`if` runs code only when the question is true:\n`if (hp < 50) {`\n`  console.log(\"Heal!\");`\n`}`\nThe curly braces `{ }` are like a box: everything inside only happens if the answer is yes.",
 mission:"If `hp` is less than 50, print **Heal!**",
 job:"Write `if (hp < 50) { }` and inside the braces put `console.log(\"Heal!\");`",starter:"let hp = 20;\n\n",
 tests:[["/if\\s*\\(/.test(__code)","Use an `if`: `if (hp < 50) { ... }`"],["__out.some(l=>/heal/i.test(l))","When hp is below 50, print \"Heal!\" — put `console.log(\"Heal!\");` inside the `{ }`."]],
 hints:["`if (hp < 50) { }`","Inside the curly braces: `console.log(\"Heal!\");`"],answer:"let hp = 20;\n\nif (hp < 50) {\n  console.log(\"Heal!\");\n}",
 tip:"Change hp to 80 and cast it again. Nothing prints — the if-spell decided not to!"},
{id:'s10',ch:'Year 2: Choices',title:'Buy or Save',
 story:"A magic broom costs 10 gold. If you can pay for it, buy it. If not, save your money.",
 learn:"`else` means \"if not, do this instead\":\n`if (gold >= 10) {`\n`  console.log(\"Buy\");`\n`} else {`\n`  console.log(\"Save\");`\n`}`",
 mission:"If `gold` is 10 or more, print **Buy**. Else, print **Save**.",
 job:"Use `if (gold >= 10)` to print **Buy**, and `else` to print **Save**. You have 5 gold, so it should say Save.",starter:"let gold = 5;\n\n",
 tests:[["/else/.test(__code)","Use `if` and `else`."],["__out.some(l=>/save/i.test(l))&&!__out.some(l=>/buy/i.test(l))","With 5 gold, your spell should print \"Save\" (and not \"Buy\")."]],
 hints:["`if (gold >= 10) { ... } else { ... }`","Print \"Buy\" in the first box and \"Save\" in the else box."],answer:"let gold = 5;\n\nif (gold >= 10) {\n  console.log(\"Buy\");\n} else {\n  console.log(\"Save\");\n}",
 tip:"Change gold to 15 and cast again. The other path runs!"},
{id:'s27',ch:'Year 2: Choices',title:'Hot, Warm or Cold',
 story:"The potion cauldron must be just right. Check the temperature and say if it's Hot, Warm or Cold.",
 learn:"`else if` adds MORE choices. JavaScript checks from the top down and runs only the FIRST one that's true:\n`if (x > 30) {` … `}`\n`else if (x > 10) {` … `}`\n`else {` … `}`",
 mission:"If `temp` is more than 30, print **Hot**. Else if it's more than 10, print **Warm**. Else, print **Cold**.",
 job:"Use `if`, `else if` and `else`. More than 30 → print **Hot**. More than 10 → print **Warm**. Otherwise → print **Cold**.",starter:"let temp = 20;\n\n",
 tests:[["/else\\s+if/.test(__code)","Use `else if` for the middle choice: `} else if (temp > 10) {`"],["__out.some(l=>/warm/i.test(l))&&!__out.some(l=>/hot|cold/i.test(l))","With temp at 20, your spell should print only \"Warm\"."]],
 hints:["Start with `if (temp > 30) { console.log(\"Hot\"); }`","Then add `else if (temp > 10) { console.log(\"Warm\"); }`","Finish with `else { console.log(\"Cold\"); }`"],answer:"let temp = 20;\n\nif (temp > 30) {\n  console.log(\"Hot\");\n} else if (temp > 10) {\n  console.log(\"Warm\");\n} else {\n  console.log(\"Cold\");\n}",
 tip:"Try temp = 40 and temp = 3. Each time, only ONE message prints."},
{id:'s11',ch:'Year 3: Loops & Lists',title:'Triple Cast',
 story:"Some spells only work if you say them three times. Real wizards never copy and paste... they use loops!",
 learn:"A **for loop** repeats code, like a song chorus:\n`for (let i = 0; i < 3; i++) {`\n`  console.log(\"Hi\");`\n`}`\nIt counts 0, 1, 2 (while i is less than 3) → 3 times.",
 mission:"Print **Abracadabra** exactly 3 times using a for loop.",
 job:"Use `for (let i = 0; i < 3; i++) { }` and put `console.log(\"Abracadabra\");` inside. It should print 3 times.",starter:"",
 tests:[["__out.filter(l=>/abracadabra/i.test(l)).length===3","Print \"Abracadabra\" exactly 3 times."],["/for\\s*\\(/.test(__code)","Use a `for` loop instead of copying the line."]],
 hints:["`for (let i = 0; i < 3; i++) { }`","Inside: `console.log(\"Abracadabra\");`"],answer:"for (let i = 0; i < 3; i++) {\n  console.log(\"Abracadabra\");\n}",
 tip:"Change 3 to 100. Instant 100 spells — that's the power of loops."},
{id:'s12',ch:'Year 3: Loops & Lists',title:'Count the Stars',
 story:"The star teacher wants you to count the stars out loud: 1, 2, 3, 4, 5.",
 learn:"`i` is a jar too — you can print it!\nStart wherever you like: `let i = 1`\nStop when you like: `i <= 5` (less than OR the same as 5)",
 mission:"Print the numbers **1 to 5**, one per line (and nothing else).",
 job:"Use `for (let i = 1; i <= 5; i++)` and put `console.log(i);` inside. It prints 1, 2, 3, 4, 5.",starter:"",
 tests:[["__out.join(',')==='1,2,3,4,5'","Print 1, 2, 3, 4, 5 — one per line, nothing else. Start at 1, keep going while `i <= 5`."]],
 hints:["`for (let i = 1; i <= 5; i++) { }`","Inside: `console.log(i);`"],answer:"for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
 tip:"Programmers usually start counting from 0. Lists (coming soon!) do too."},
{id:'s28',ch:'Year 3: Loops & Lists',title:'Broom Countdown',
 story:"Broom race! The starter counts down 3, 2, 1... and this time you'll use a different loop: **while**.",
 learn:"A **while loop** keeps going as long as something is true — like \"while the bath isn't full, keep the tap on\":\n`let n = 3;`\n`while (n > 0) {`\n`  console.log(n);`\n`  n = n - 1;`\n`}`\n⚠️ Always change the jar inside, or the loop never stops!",
 mission:"Use a `while` loop to print **3**, **2**, **1** (one per line). After the loop, print **Blast off!**",
 job:"Write `while (n > 0) { }`. Inside: `console.log(n);` then `n = n - 1;` After the loop: `console.log(\"Blast off!\");`",starter:"let n = 3;\n\n",
 tests:[["/while\\s*\\(/.test(__code)","Use a `while` loop: `while (n > 0) { ... }`"],["__out.slice(0,3).join(',')==='3,2,1'","Print 3, then 2, then 1 — one per line. Inside the loop: `console.log(n);` then `n = n - 1;`"],["__out.length===4&&/blast\\s*off/i.test(__out[3])","After the loop (outside the `{ }`), print \"Blast off!\" once."]],
 hints:["`while (n > 0) { }`","Inside the braces: `console.log(n);` and `n = n - 1;`","After the closing `}`: `console.log(\"Blast off!\");`"],answer:"let n = 3;\n\nwhile (n > 0) {\n  console.log(n);\n  n = n - 1;\n}\nconsole.log(\"Blast off!\");",
 tip:"Use `for` when you know how many times. Use `while` when you just know WHEN to stop."},
{id:'s13',ch:'Year 3: Loops & Lists',title:'The Potion Shelf',
 story:"Your potion shelf has three bottles. Keep them all in ONE jar.",
 learn:"An **array** is a list in one jar, inside square brackets:\n`let snacks = [\"apple\", \"cake\", \"chips\"];`\nPut commas between the items!",
 mission:"Make `potions` a list of 3: **\"red\"**, **\"blue\"**, **\"green\"** (in that order).",
 job:"Write `let potions = [\"red\", \"blue\", \"green\"];` — the 3 colours, in that order.",starter:"",
 tests:[["Array.isArray(potions)&&potions.length===3","Make `potions` a list of 3 items: `[\"red\", \"blue\", \"green\"]`"],["potions.join()==='red,blue,green'","The potions should be \"red\", \"blue\", \"green\" in that order (small letters)."]],
 hints:["Square brackets make a list.","`let potions = [\"red\", \"blue\", \"green\"];`"],answer:"let potions = [\"red\", \"blue\", \"green\"];\nconsole.log(potions);",
 tip:"`potions.length` tells you how many items are in the list."},
{id:'s14',ch:'Year 3: Loops & Lists',title:'First on the Shelf',
 story:"Grab the first potion from the shelf — carefully!",
 learn:"Every item in a list has a spot number. Put it in square brackets. **Lists start counting at 0!**\n`potions[0]` = first · `potions[1]` = second",
 mission:"Make `first` equal to the FIRST potion, using `potions[0]`.",
 job:"Write `let first = potions[0];` Then `console.log(first);`",starter:"let potions = [\"fire\", \"ice\", \"storm\"];\n\n",
 tests:[["first==='fire'","`first` should be the FIRST potion. Lists start at 0: `potions[0]`"],["/potions\\s*\\[\\s*0\\s*\\]/.test(__code)","Take it from the list with `potions[0]` — don't type it yourself."]],
 hints:["`let first = potions[0];`","Print it: `console.log(first);`"],answer:"let potions = [\"fire\", \"ice\", \"storm\"];\n\nlet first = potions[0];\nconsole.log(first);",
 tip:"Starting at 0 trips up EVERY beginner. You'll get used to it fast."},
{id:'s15',ch:'Year 3: Loops & Lists',title:'Brew a New Potion',
 story:"You just brewed a golden potion! Put it on the end of the shelf.",
 learn:"`.push()` adds an item to the END of a list:\n`snacks.push(\"pie\");`",
 mission:"Add **\"gold\"** to the end of `potions`.",
 job:"On the empty line, write `potions.push(\"gold\");`",starter:"let potions = [\"fire\", \"ice\", \"storm\"];\n\n\nconsole.log(potions);",
 tests:[["potions.length===4&&potions[3]==='gold'","Add \"gold\" to the end: `potions.push(\"gold\");`"],["/push/.test(__code)","Use `.push()` to add it."]],
 hints:["`potions.push(\"gold\");`"],answer:"let potions = [\"fire\", \"ice\", \"storm\"];\n\npotions.push(\"gold\");\nconsole.log(potions);",
 tip:"`.pop()` does the opposite: it takes the LAST item off the shelf."},
{id:'s29',ch:'Year 3: Loops & Lists',title:'Is It on the Shelf?',
 story:"A student asks: \"Do you have an ice potion? And where is the storm potion?\" Let the shelf answer for you.",
 learn:"`.includes()` answers true or false: is it in the list?\n`snacks.includes(\"cake\")` → true\n`.indexOf()` tells you its **spot number** (counting from 0!):\n`snacks.indexOf(\"cake\")` → 1",
 mission:"Make `let hasIce = potions.includes(\"ice\");` and `let spot = potions.indexOf(\"storm\");` Print both.",
 job:"Write `let hasIce = potions.includes(\"ice\");` and `let spot = potions.indexOf(\"storm\");` Then print both with `console.log()`.",starter:"let potions = [\"fire\", \"ice\", \"storm\"];\n\n",
 tests:[["hasIce===true","`hasIce` should be `potions.includes(\"ice\")`."],["spot===2","`spot` should be `potions.indexOf(\"storm\")`."],["/\\.includes\\s*\\(/.test(__code)&&/\\.indexOf\\s*\\(/.test(__code)","Ask the shelf with `.includes()` and `.indexOf()` — don't type the answers yourself."],["__out.includes('true')&&__out.includes('2')","Print both: `console.log(hasIce);` and `console.log(spot);`"]],
 hints:["`let hasIce = potions.includes(\"ice\");`","`let spot = potions.indexOf(\"storm\");`","Then `console.log(hasIce);` and `console.log(spot);`"],answer:"let potions = [\"fire\", \"ice\", \"storm\"];\n\nlet hasIce = potions.includes(\"ice\");\nlet spot = potions.indexOf(\"storm\");\nconsole.log(hasIce);\nconsole.log(spot);",
 tip:"If something is NOT in the list, `.indexOf()` gives -1. That means 'not found'."},
{id:'s16',ch:'Year 3: Loops & Lists',title:'Read the Shelf',
 story:"The headmaster wants every potion read out loud, one by one. Imagine if the shelf had 1,000 potions... loops to the rescue!",
 learn:"`for...of` visits every item in a list, one at a time:\n`for (const p of potions) {`\n`  console.log(p);`\n`}`\n`p` becomes each potion in turn.",
 mission:"Print every potion, one per line, using a loop (and print nothing else).",
 job:"Write `for (const p of potions) { }` and put `console.log(p);` inside. It prints fire, ice, storm.",starter:"let potions = [\"fire\", \"ice\", \"storm\"];\n\n",
 tests:[["__out.join(',')==='fire,ice,storm'","Print each potion on its own line, in order — nothing else. Use `console.log(p);` inside the loop."],["/for/.test(__code)","Use a loop: `for (const p of potions) { ... }`"]],
 hints:["`for (const p of potions) { }`","Inside: `console.log(p);`"],answer:"let potions = [\"fire\", \"ice\", \"storm\"];\n\nfor (const p of potions) {\n  console.log(p);\n}",
 tip:"Shopping carts, playlists, chat messages — every app loops over lists like this."},
{id:'s17',ch:'Year 4: Functions',title:'Your Own Spell',
 story:"Real wizards invent their own spells. In JavaScript, an invented spell is called a **function**.",
 learn:"A **function** is like a recipe with a name. Write it once:\n`function cheer() {`\n`  console.log(\"Hooray!\");`\n`}`\nIt does nothing until you CALL it by name: `cheer();`",
 mission:"Make a function called `greet` that prints **Welcome!** — then call it.",
 job:"Make `function greet() { }` with `console.log(\"Welcome!\");` inside. Then call it: `greet();`",starter:"",
 tests:[["typeof greet==='function'","Make a function called `greet`: `function greet() { ... }`"],["__out.some(l=>/welcome/i.test(l))","Call it with `greet();` so it prints \"Welcome!\""]],
 hints:["`function greet() { console.log(\"Welcome!\"); }`","Don't forget to call it: `greet();`"],answer:"function greet() {\n  console.log(\"Welcome!\");\n}\n\ngreet();",
 tip:"Call it 3 times and it prints 3 times. Write once, use forever."},
{id:'s18',ch:'Year 4: Functions',title:'Double Trouble',
 story:"The Doubling Spell takes any number and gives back twice as much.",
 learn:"A function can take something IN and give something BACK — like a juice machine: fruit in, juice out!\n`function addOne(n) {`\n`  return n + 1;`\n`}`\n`addOne(4)` → 5",
 mission:"Make `function double(n)` that **returns** n times 2.",
 job:"Make `function double(n) { }` and inside write `return n * 2;`",starter:"",
 tests:[["typeof double==='function'","Make a function called `double`: `function double(n) { ... }`"],["double(4)===8&&double(10)===20&&double(0)===0","`double(n)` should give back n times 2: `return n * 2;`"]],
 hints:["`function double(n) { }`","Inside: `return n * 2;`"],answer:"function double(n) {\n  return n * 2;\n}\n\nconsole.log(double(4));",
 tip:"`return` hands the answer back. `console.log` only shows it on screen — they're different!"},
{id:'s30',ch:'Year 4: Functions',title:'Quick Spells',
 story:"Busy wizards write short spells. The arrow spell is a quick way to make a function!",
 learn:"An **arrow function** is a short way to write a function:\n`const addOne = (n) => n + 1;`\nThe arrow `=>` means \"gives back\". `addOne(4)` → 5",
 mission:"Make an arrow function `const triple = (n) => n * 3;` and print `triple(5)`.",
 job:"Write `const triple = (n) => n * 3;` Then `console.log(triple(5));` (it should say 15).",starter:"",
 tests:[["typeof triple==='function'","Make `triple` like this: `const triple = (n) => n * 3;`"],["triple(5)===15&&triple(2)===6&&triple(0)===0","`triple(n)` should give back n times 3: `(n) => n * 3`"],["/=>/.test(__code)","Use an arrow `=>` to make it."],["__out.some(l=>l==='15')","Print it with `console.log(triple(5));`"]],
 hints:["The arrow is `=` then `>`: `=>`","`const triple = (n) => n * 3;`","Then `console.log(triple(5));`"],answer:"const triple = (n) => n * 3;\nconsole.log(triple(5));",
 tip:"Arrow functions are everywhere in modern JavaScript. Now you can read them!"},
{id:'s19',ch:'Year 4: Functions',title:'Shout!',
 story:"The Shouting Spell turns any word into BIG CAPITALS with an exclamation mark.",
 learn:"Words have built-in powers:\n`\"hi\".toUpperCase()` → \"HI\"\n`\"HI\".toLowerCase()` → \"hi\"\nGlue on extra text with `+`.",
 mission:"Make `function shout(word)` that returns the word in capitals with **!** on the end (no space).",
 job:"Make `function shout(word) { }` and inside write `return word.toUpperCase() + \"!\";`",starter:"",
 tests:[["typeof shout==='function'","Make a function called `shout`: `function shout(word) { ... }`"],["shout('hi')==='HI!'&&shout('go')==='GO!'","`shout(word)` should give back CAPITALS + \"!\" (no space). Try `return word.toUpperCase() + \"!\";`"]],
 hints:["`function shout(word) { }`","Inside: `return word.toUpperCase() + \"!\";`"],answer:"function shout(word) {\n  return word.toUpperCase() + \"!\";\n}\n\nconsole.log(shout(\"hello\"));",
 tip:"Built-in powers like toUpperCase are called 'methods'. Words have dozens of them."},
{id:'s31',ch:'Year 4: Functions',title:'Measure the Word',
 story:"Wizard names are carved on wands. First count the letters, then carve a short nickname.",
 learn:"Words know how long they are: `\"cat\".length` → 3\n`.slice(start, end)` cuts out a piece. It starts at spot 0 and stops just BEFORE the end number:\n`\"Wizard\".slice(0, 3)` → \"Wiz\"",
 mission:"Make `let size = word.length;` and `let nick = word.slice(0, 4);` Print both.",
 job:"Write `let size = word.length;` and `let nick = word.slice(0, 4);` Then print both with `console.log()`.",starter:"let word = \"Dragonfly\";\n\n",
 tests:[["size===9","`size` should be `word.length` (it counts the letters)."],["nick==='Drag'","`nick` should be the first 4 letters: `word.slice(0, 4)`."],["/\\.length/.test(__code)&&/\\.slice\\s*\\(/.test(__code)","Use `.length` and `.slice()` — don't type the answers yourself."],["__out.includes('9')&&__out.some(l=>l==='Drag')","Print both: `console.log(size);` and `console.log(nick);`"]],
 hints:["`let size = word.length;` (no brackets after length!)","`let nick = word.slice(0, 4);`","Then `console.log(size);` and `console.log(nick);`"],answer:"let word = \"Dragonfly\";\n\nlet size = word.length;\nlet nick = word.slice(0, 4);\nconsole.log(size);\nconsole.log(nick);",
 tip:"Spaces count too! `\"hi there\".length` is 8."},
{id:'s20',ch:'Year 4: Functions',title:'Wizard ID Card',
 story:"Every student gets a Wizard ID card with their name and level — all in one jar.",
 learn:"An **object** is like an ID card: it keeps facts together, each with a label, inside curly braces:\n`let pet = { name: \"Owl\", age: 3 };`\nRead one fact with a dot: `pet.name` → \"Owl\"",
 mission:"Make `wizard` an object with a `name` (words in quotes) and a `level` (a number). Then print `wizard.name`.",
 job:"Write `let wizard = { name: \"Luna\", level: 5 };` (any name and number). Then `console.log(wizard.name);`",starter:"",
 tests:[["wizard&&typeof wizard==='object'&&!Array.isArray(wizard)","Make `wizard` an object with curly braces `{ }`."],["typeof wizard.name==='string'&&wizard.name.length>0","Give it a `name` (words in quotes), like `name: \"Luna\"`."],["typeof wizard.level==='number'","Give it a `level` (a number, no quotes), like `level: 5`."],["__out.some(l=>l===wizard.name)","Print the name with `console.log(wizard.name);`"]],
 hints:["`let wizard = { name: \"Luna\", level: 5 };`","`console.log(wizard.name);`"],answer:"let wizard = { name: \"Luna\", level: 5 };\nconsole.log(wizard.name);",
 tip:"Almost all data on the internet travels as objects like this (it's called JSON)."},
{id:'s21',ch:'Year 5: Final Exam',title:'The Final Exam',
 story:"Your graduation exam! Write ONE spell that decides what happens based on mana. Pass, and you graduate as a Master Wizard! 🎓",
 learn:"Mix a function, an input, if/else and return:\n• 10 mana or more → give back \"Fireball\"\n• less than 10 → give back \"Fizzle\"",
 mission:"Make `function castSpell(mana)` that returns **\"Fireball\"** if mana is 10 or more, otherwise **\"Fizzle\"**.",
 job:"Make `function castSpell(mana)`. If `mana >= 10`, `return \"Fireball\";` else `return \"Fizzle\";`",starter:"",
 tests:[["typeof castSpell==='function'","Make a function called `castSpell`: `function castSpell(mana) { ... }`"],["/^\\s*fireball\\W*$/i.test(castSpell(20))","`castSpell(20)` should give back \"Fireball\"."],["/^\\s*fizzle\\W*$/i.test(castSpell(5))","`castSpell(5)` should give back \"Fizzle\"."],["/^\\s*fireball\\W*$/i.test(castSpell(10))","`castSpell(10)` should give back \"Fireball\" — 10 counts as enough! Use `>=`."]],
 hints:["`function castSpell(mana) { }`","Inside: `if (mana >= 10) { return \"Fireball\"; } else { return \"Fizzle\"; }`"],
 answer:"function castSpell(mana) {\n  if (mana >= 10) {\n    return \"Fireball\";\n  } else {\n    return \"Fizzle\";\n  }\n}\n\nconsole.log(castSpell(20));\nconsole.log(castSpell(5));",
 tip:"You just used variables, comparisons, if/else, functions and return together. That's real programming!"}
];
function play(L,el,done){
  let hints=0,used=false,running=false;
  const S=Studio(el,{cls:'spell'});S.job(L.job||L.mission);S.el.querySelector('.jobtxt').innerHTML=mdx(L.job||L.mission);S.el.querySelector('.jobmini').innerHTML='🎯 '+mdx(L.job||L.mission);
  S.task.innerHTML=`<div class="bstory">${storyHTML('Professor Bytewood',L.story).replace(/\{BT\}/g,'&#96;')}<div class="lesson">📖 ${mdx(L.learn)}</div><div class="mission" style="margin-top:10px">🎯 ${mdx(L.mission)}</div></div>`;
  S.code.innerHTML=`<div class="pane-h">🪄 Your spell (JavaScript) <small>Ctrl + Enter = cast</small></div><textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="JavaScript code"></textarea><div class="snips cmds"></div><div class="snips"></div>`;
  S.view.innerHTML=`<div class="pane-h">🔮 Crystal ball <small>what console.log prints</small></div><div class="crystal grow"></div>`;
  S.actions.innerHTML=`<button class="btn" data-a="hint">💡 Hint</button><button class="btn" data-a="tip">✨ Tip</button><button class="btn" data-a="ans">👁 Answer</button><button class="btn ghost" data-a="reset">↺ Reset code</button><button class="btn primary big" data-a="run">✨ Cast spell</button>`;
  el=S.el;
  const ed=$('textarea.code',el),ball=$('.crystal',el),hb=S.hb;
  const fb=(t,h)=>S.fb(t,h);
  const key='code_'+L.id;ed.value=PROG.spell[key]!=null&&PROG.spell[key]!==''?PROG.spell[key]:L.starter;
  const save=()=>{PROG.spell[key]=ed.value;saveProg();};
  ball.innerHTML='<span class="muted">(nothing yet — cast your spell!)</span>';
  wireEditor(ed,save,()=>run());
  const cmds=$('.cmds',el);
  ['console.log();','let ','if () {\n  \n}','for (let i = 0; i < 3; i++) {\n  \n}','function () {\n  \n}','return '].forEach(cm=>{const b=document.createElement('button');b.className='cmd';b.type='button';b.textContent=cm.split('\n')[0].replace(/\s*\{$/,' {…}');b.onmousedown=e=>e.preventDefault();b.onclick=()=>{insertAt(ed,cm);save();};cmds.appendChild(b);});
  addSnips($('.snips:not(.cmds)',el),ed,save,['(',')','{','}','[',']',';','"','`','$','=','+','-','*','%','<','>','.','!','&','|']);
  async function run(){if(running)return;if(!ed.value.trim()){fb('bad','Write your spell first!');return;}
    running=true;fb('info','✨ Casting…');
    const r=await runSpell(ed.value,L.tests.map(t=>t[0]));running=false;TRACK.attempt(CURRENT_GAME,L.id,!r.timeout&&!r.err&&!!r.res&&r.res.every(Boolean));
    ball.innerHTML=r.out&&r.out.length?r.out.map(l=>`<div>› ${esc(l)}</div>`).join(''):'<span class="muted">(the crystal ball stayed silent — nothing was printed)</span>';
    if(r.timeout){fb('bad','⏳ Your spell never finished! A loop is probably running forever. Check your loop condition.');return;}
    if(r.err){fb('bad','💥 The spell backfired! '+friendly(r.err));return;}
    const i=r.res.findIndex(x=>!x);
    if(i>=0){fb('bad','❌ Not quite. '+mdx(L.tests[i][1])+'<br><small>Stuck? Tap 💡 Hint.</small>');return;}
    fb('good','✅ The spell works perfectly!');done(used?1:hints?2:3);}
  $('[data-a=run]',el).onclick=run;
  $('[data-a=reset]',el).onclick=()=>{ed.value=L.starter;save();fb();};
  $('[data-a=hint]',el).onclick=()=>{if(hints<L.hints.length)hints++;TRACK.hint(CURRENT_GAME,L.id,hints);el.classList.add('has-fb');hb.innerHTML=L.hints.slice(0,hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${mdx(h)}</div>`).join('')+(hints>=L.hints.length?`<div class="h" style="background:#fff;border-style:dashed">That's every hint! Still stuck? Tap 👁 Answer — totally fine.</div>`:'');};
  $('[data-a=tip]',el).onclick=()=>{showTip(hb,L.tip);el.classList.add('has-fb');};
  $('[data-a=ans]',el).onclick=()=>{used=true;TRACK.answer(CURRENT_GAME,L.id);ed.value=L.answer;save();hb.innerHTML=`<div class="h a">👁 <b>Here's one correct spell.</b> Read it line by line, then press ✨ Cast spell.<br><small>(You'll get 1 star this time — try it from memory later for more.)</small></div>`;};
}
Game({id:'spell',emoji:'🧙',title:'Spell Academy',levels:S,unit:'Lesson',winWord:'Spell mastered!',play,
 intro:`<h2>🏰 Welcome to Spell Academy</h2><p class="lesson">You've been accepted to the most famous school of magic in Code City! Here, every spell is written in <b>JavaScript</b> — the language that makes websites think and act.</p><p class="lesson">Learn variables, numbers, text, true/false, if/else, loops, lists, functions and objects. Type your spell, cast it, and watch the crystal ball. Best played after the HTML &amp; CSS games.</p>`,
 finale:"You graduated as a Master Wizard! 🎓 You now know the core of JavaScript. Next: Robot Commander uses the same skills to control a robot."});
window.__SPELL={S,runSpell,friendly};
})();
