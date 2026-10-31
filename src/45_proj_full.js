/* =====================================================================
   PROJECTS · FULL ("full") — build HTML, then CSS, then JavaScript, from a blank page
   ===================================================================== */
(()=>{
const {H,C,J,W_HTML,W_CSS,W_JS,nonDefaultFont,labelLinked,anyHover,hasMedia,grad,transOn,clickThen,noErrors}=PK;
/* D`...` = a code snippet written with nice indentation in this file; the shared indent is removed */
const D=(s,...v)=>{const t=s.reduce((o,x,i)=>o+x+(i<v.length?v[i]:''),'').replace(/^\n/,'').replace(/\s+$/,'');
  const n=Math.min(...t.split('\n').filter(l=>l.trim()).map(l=>l.match(/^ */)[0].length));return t.split('\n').map(l=>l.slice(n)).join('\n');};
/* edit steps: put `add` on new lines right after `line` (same indent, or one level deeper with inside:true); tail = extra code for the end of <script> */
const padOf=(c,i)=>{const ls=c.lastIndexOf('\n',i)+1;return (c.slice(ls,i).match(/^[ \t]*/)||[''])[0];};
/* `line` may be a string or a RegExp; the tail is added with a function replacer so `$` signs in code stay intact */
const tailJS=(c,js)=>/<\/script>/i.test(c)?c.replace(/\s*<\/script>(?![\s\S]*<\/script>)/i,()=>'\n\n  '+js.replace(/\n/g,'\n  ')+'\n</script>'):PK.insJS(c,js);
const addAfter=(line,add,o={})=>c=>{let i,len;if(line instanceof RegExp){const m=line.exec(c);if(!m)return c;i=m.index;len=m[0].length;}else{i=c.indexOf(line);len=line.length;}if(i<0)return c;
  const pad=padOf(c,i)+(o.inside?'  ':'');const e=i+len;
  let out=c.slice(0,e)+'\n'+add.split('\n').map(l=>l.trim()?pad+l:'').join('\n')+c.slice(e);if(o.tail)out=tailJS(out,o.tail);return out;};
const E=(id,title,o)=>J(id,title,Object.assign({kind:'edit'},o));
/* small check helpers */
const T=(a,s)=>a.text(typeof s==='string'?a.$(s):s);
const rule=(re,prop,m)=>[anyHover(re,prop),m];
const clicks=(a,s,n)=>{for(let i=0;i<n;i++)a.click(s);};
const G=(a,expr)=>{try{return a.win.eval(expr);}catch(e){return undefined;}};
const noDash=s=>s.replace(/️/g,'');
const hexRgb=h=>{const m=/^#?([0-9a-f]{6})$/i.exec(h||'');if(!m)return '';const n=parseInt(m[1],16);return `rgb(${n>>16&255}, ${n>>8&255}, ${n&255})`;};
const BODY_LEARN="`min-height: 100vh;` means \"at least as tall as the whole screen\", so your background colour fills everything. `box-sizing: border-box;` keeps the padding inside that height.";

PK.PROJECTS.push(
/* ================================================================== 1. TASBIH */
{id:'pf_tasbih',cat:'full',emoji:'📿',title:'Tasbih Counter',mentor:'Aunty Maryam',
 blurb:'A digital dhikr counter: a big tap button, a progress bar and a gentle "MashaAllah" at 33.',
 intro:"After salah, many Muslims remember Allah by saying **SubhanAllah**, **Alhamdulillah** and **Allahu Akbar** 33 times each. People often count on prayer beads called a **tasbih**. Aunty Maryam would love a digital one! You'll build the page, make it calm and beautiful, then make it count.",
 steps:[
 H('t1','The title',{why:"Every app needs a name at the top — and the words we are saying right now.",
  todo:"Make a `<header>` with an `<h1>` (your counter's name) and a `<p class=\"phrase\">` that says **SubhanAllah**.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>`. Inside it, put an `<h1>` with a name, and a `<p class=\"phrase\">` that says **SubhanAllah**.",
  snippet:D`
   <header>
     <h1>📿 My Tasbih</h1>
     <p class="phrase">SubhanAllah</p>
   </header>`,
  hints:["Open with `<header>` and close with `</header>`.","Inside: `<h1>📿 My Tasbih</h1>` then `<p class=\"phrase\">SubhanAllah</p>`."],
  tip:"SubhanAllah means \"Glory be to Allah\". You can give your `<h1>` any name you like.",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),hasText('header p.phrase','subhanallah',"Add `<p class=\"phrase\">SubhanAllah</p>` inside the header.")]}),
 H('t2','The counting card',{why:"We need a place to show the number, the target, and how close we are.",
  learn:"An empty `<div>` can become anything with CSS. This one, `<div class=\"bar\">`, will turn into a progress bar, and the `<div id=\"fill\">` inside it will grow as you count.",
  todo:"Add a `<main class=\"card\">` holding: `<div id=\"count\">0</div>`, `<p id=\"goal\">Target: 33</p>`, and `<div class=\"bar\"><div id=\"fill\"></div></div>`.",
  job:"Make a `<main class=\"card\">`. Put inside: `<div id=\"count\">0</div>`, a `<p id=\"goal\">` saying **Target: 33**, and `<div class=\"bar\"><div id=\"fill\"></div></div>`.",
  snippet:D`
   <main class="card">
     <div id="count">0</div>
     <p id="goal">Target: 33</p>
     <div class="bar"><div id="fill"></div></div>
   </main>`,
  hints:["Start with `<main class=\"card\">` and end with `</main>`.","Inside: `<div id=\"count\">0</div>` and `<p id=\"goal\">Target: 33</p>`.","Last line inside: `<div class=\"bar\"><div id=\"fill\"></div></div>` — one box inside another."],
  tip:"An `id` is like a name tag. JavaScript will use `#count` to find this exact box later.",
  checks:[has('main.card',"Add a `<main class=\"card\">`."),[a=>T(a,'.card #count')==='0',"Inside the card, add `<div id=\"count\">0</div>` with the number **0** in it."],hasText('#goal','33',"Add `<p id=\"goal\">Target: 33</p>`."),has('.bar #fill',"Add `<div class=\"bar\"><div id=\"fill\"></div></div>` inside the card.")]}),
 H('t3','Tap and reset buttons',{why:"The big button is the bead you tap. Reset lets you start again.",
  todo:"Under the card, add `<button id=\"tap\">Tap</button>`, then an empty `<p id=\"msg\"></p>`, then `<button id=\"reset\">↺ Reset</button>`.",
  job:"Under the card, add a `<button id=\"tap\">`, an empty `<p id=\"msg\"></p>`, and a `<button id=\"reset\">`.",
  snippet:D`
   <button id="tap">Tap</button>
   <p id="msg"></p>
   <button id="reset">↺ Reset</button>`,
  hints:["Three lines: a button, an empty paragraph, another button.","`<button id=\"tap\">Tap</button>` · `<p id=\"msg\"></p>` · `<button id=\"reset\">↺ Reset</button>`"],
  tip:"The empty `<p id=\"msg\">` is a secret message box. JavaScript will fill it when you reach 33.",
  checks:[has('button#tap',"Add `<button id=\"tap\">Tap</button>`."),has('p#msg',"Add an empty `<p id=\"msg\"></p>`."),has('button#reset',"Add `<button id=\"reset\">↺ Reset</button>`.")]}),
 H('t4','Choose your dhikr',{why:"After salah we say three different phrases. Let's add a button for each one.",
  todo:"Add a `<div class=\"phrases\">` with three buttons: **SubhanAllah**, **Alhamdulillah**, **Allahu Akbar**.",
  job:"Make a `<div class=\"phrases\">` with 3 `<button>`s inside. Their words: **SubhanAllah**, **Alhamdulillah**, **Allahu Akbar**.",
  snippet:D`
   <div class="phrases">
     <button>SubhanAllah</button>
     <button>Alhamdulillah</button>
     <button>Allahu Akbar</button>
   </div>`,
  hints:["`<div class=\"phrases\">` … `</div>` with three buttons inside.","Like this: `<button>Alhamdulillah</button>` — one line for each phrase."],
  tip:"Alhamdulillah means \"All praise is for Allah\". Allahu Akbar means \"Allah is the Greatest\".",
  checks:[[a=>a.$$('.phrases button').length>=3,"Put 3 `<button>`s inside `<div class=\"phrases\">`."],[a=>a.$$('.phrases button').some(b=>T(a,b).includes('alhamdulillah')),"One button should say **Alhamdulillah**."],[a=>a.$$('.phrases button').some(b=>T(a,b).includes('allahu akbar')),"One button should say **Allahu Akbar**."]]}),
 C('t5','A calm page',{why:"Dhikr should feel peaceful. Soft colours and centered text help.",
  learn:"`linear-gradient(#e6fffa, #fef9e7)` blends one colour into another, top to bottom. "+BODY_LEARN,
  todo:"Style `body`: no margin, some padding, a `font-family`, `text-align: center`, a dark teal `color`, and a gradient background.",
  job:"In `body { }` add `text-align: center;`, a `font-family`, and `background: linear-gradient(#e6fffa, #fef9e7);` (any two light colours are fine).",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: 'Trebuchet MS', sans-serif;
     text-align: center;
     color: #134e4a;
     background: linear-gradient(#e6fffa, #fef9e7);
   }`,
  hints:["Start your CSS with `<style>` under the HTML, then `body { }`, then `</style>`.","Inside `body { }`: `font-family: 'Trebuchet MS', sans-serif; text-align: center;`","And: `background: linear-gradient(#e6fffa, #fef9e7);`"],
  tip:"Pick colours that feel calm to you. Light greens and creams are gentle on the eyes.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],cssIs('body','textAlign','center',"Add `text-align: center;` to `body`."),grad('body',"Give `body` a gradient: `background: linear-gradient(#e6fffa, #fef9e7);`")]}),
 C('t6','The counting card',{why:"The number is the star of the show. Make it huge, inside a soft white card.",
  todo:"Style `.card` (white background, rounded corners, a shadow, centered with `margin: 16px auto`) and make `#count` at least 60px big. Give `#msg` some style too.",
  job:"Make `#count` big: `font-size: 72px;` (60px or more). Give `.card` a white background, a `border-radius`, and a `box-shadow`.",
  snippet:D`
   .card {
     background: white;
     max-width: 300px;
     margin: 16px auto;
     padding: 20px;
     border-radius: 24px;
     box-shadow: 0 8px 24px rgba(19, 78, 74, 0.12);
   }
   #count {
     font-size: 72px;
     font-weight: bold;
     color: #0d9488;
   }
   #msg {
     min-height: 28px;
     font-size: 20px;
     font-weight: bold;
     color: #ca8a04;
   }`,
  hints:["`#count { font-size: 72px; font-weight: bold; }`","`.card { background: white; border-radius: 24px; box-shadow: 0 8px 24px rgba(19, 78, 74, 0.12); }`","Add `max-width: 300px; margin: 16px auto; padding: 20px;` to `.card` so it sits in the middle."],
  tip:"`margin: 16px auto` = 16px above and below, and \"share the space\" left and right. That centers a box!",
  checks:[cssMin('#count','fontSize',60,"Make `#count` at least 60px: `font-size: 72px;`"),cssMin('.card','borderTopLeftRadius',1,"Round the card: `border-radius: 24px;`"),cssNot('.card','boxShadow','none',"Give `.card` a `box-shadow`.")]}),
 C('t7','The progress bar',{why:"A bar that fills up shows how close you are to 33, without counting in your head.",
  learn:"`overflow: hidden;` hides anything that pokes outside a box, so the fill keeps the round ends. `transition: width 0.3s;` makes the fill slide smoothly instead of jumping.",
  todo:"Give `.bar` a height (at least 8px), a light background and round ends. Give `#fill` `height: 100%`, `width: 0%`, a colour, and `transition: width 0.3s`.",
  job:"Give `.bar` `height: 14px;` (8px or more). Give `#fill` `height: 100%;`, `width: 0%;`, a colour, and `transition: width 0.3s;`.",
  snippet:D`
   .bar {
     height: 14px;
     margin-top: 8px;
     background: #ccfbf1;
     border-radius: 99px;
     overflow: hidden;
   }
   #fill {
     height: 100%;
     width: 0%;
     background: linear-gradient(90deg, #2dd4bf, #facc15);
     transition: width 0.3s;
   }`,
  hints:["`.bar { height: 14px; background: #ccfbf1; border-radius: 99px; overflow: hidden; }`","`#fill { height: 100%; width: 0%; background: #2dd4bf; transition: width 0.3s; }`"],
  tip:"You can't see the fill yet because its width is 0%. JavaScript will make it grow!",
  checks:[cssMin('.bar','height',8,"Give `.bar` a height of at least 8px: `height: 14px;`"),transOn('#fill',"Give `#fill` a transition: `transition: width 0.3s;`")]}),
 C('t8','A big round tap button',{why:"The tap button should be big and easy to press, like a real bead under your thumb.",
  learn:"`border-radius: 50%;` turns a square into a circle. `:active` means \"while it is being pressed\" — `transform: scale(0.94);` squishes it a tiny bit, so it feels like a real button.",
  todo:"Make `#tap` 160px wide and tall, round, coloured, with `cursor: pointer`. Add `#tap:active { transform: scale(0.94); }`. Style `#reset` and `.phrases button` as soft pills.",
  job:"Give `#tap` `width: 160px;` and `height: 160px;` (140px or more) and `border-radius: 50%;`. Add `#tap:active { transform: scale(0.94); }`. Give `#reset` `cursor: pointer;`.",
  snippet:D`
   #tap {
     width: 160px;
     height: 160px;
     border: none;
     border-radius: 50%;
     font-size: 28px;
     color: white;
     background: radial-gradient(circle at 30% 30%, #5eead4, #0f766e);
     box-shadow: 0 10px 20px rgba(15, 118, 110, 0.3);
     cursor: pointer;
   }
   #tap:active {
     transform: scale(0.94);
   }
   #reset, .phrases button {
     margin: 6px;
     padding: 8px 16px;
     border: 2px solid #99f6e4;
     border-radius: 99px;
     background: white;
     color: #0f766e;
     font-size: 15px;
     cursor: pointer;
   }`,
  hints:["`#tap { width: 160px; height: 160px; border-radius: 50%; border: none; cursor: pointer; }` plus a background colour.","`#tap:active { transform: scale(0.94); }`","`#reset, .phrases button { padding: 8px 16px; border-radius: 99px; background: white; cursor: pointer; }`"],
  tip:"`radial-gradient(circle at 30% 30%, …)` puts a light spot near the top-left, so the button looks shiny and round like a bead.",
  checks:[cssMin('#tap','width',140,"Make `#tap` at least 140px wide: `width: 160px;`"),cssMin('#tap','height',140,"Make `#tap` at least 140px tall: `height: 160px;`"),[anyHover(/#tap:active/,'transform'),"Add `#tap:active { transform: scale(0.94); }`"],cssIs('#reset','cursor','pointer',"Give `#reset` `cursor: pointer;`")]}),
 J('t9','Count every tap',{why:"Now the magic! Every tap should add one to the number.",
  learn:"• `let count = 0;` makes a **variable** — a box that remembers a number.\n• `document.querySelector('#count')` finds an element on the page.\n• `addEventListener('click', () => { … })` runs the code inside every time the button is clicked.",
  todo:"Make a `count` variable starting at 0. When `#tap` is clicked, add 1 and show it in `#count`.",
  job:"Make `let count = 0;`. When `#tap` is clicked, add 1 to `count` and put it in `#count` with `textContent`.",
  snippet:D`
   let count = 0;
   const countEl = document.querySelector('#count');
   const tap = document.querySelector('#tap');

   tap.addEventListener('click', () => {
     count = count + 1;
     countEl.textContent = count;
   });`,
  hints:["Start your script: `<script>` at the very bottom, then `let count = 0;`.","`const tap = document.querySelector('#tap');` then `tap.addEventListener('click', () => { … });`","Inside the curly brackets: `count = count + 1;` and `countEl.textContent = count;`"],
  tip:"`textContent` is the words inside an element. Change it, and the page changes instantly.",
  checks:[[a=>{a.click('#tap');a.click('#tap');return T(a,'#count')==='2';},"Clicking **Tap** twice should make `#count` show **2**."]]}),
 J('t10','MashaAllah at 33',{why:"When you reach the target, the page should gently cheer you on.",
  learn:"`if (count === 33) { … }` only runs the code inside when count is exactly 33. Three equals signs `===` means \"is exactly the same as\".",
  todo:"Add another click listener to `tap`. If `count === 33`, put **MashaAllah, 33!** into `#msg`.",
  job:"Add another click listener to `tap`. When `count === 33`, make `#msg` say **MashaAllah, 33! 🌟**",
  snippet:D`
   const msg = document.querySelector('#msg');

   tap.addEventListener('click', () => {
     if (count === 33) {
       msg.textContent = 'MashaAllah, 33! 🌟';
     }
   });`,
  hints:["A button can have two click listeners. They run one after the other.","`if (count === 33) { msg.textContent = 'MashaAllah, 33! 🌟'; }`"],
  tip:"MashaAllah means \"what Allah has willed\" — a lovely thing to say when something good happens.",
  checks:[[a=>{clicks(a,'#tap',32);if(/masha/.test(T(a,'#msg')))return false;a.click('#tap');const m=T(a,'#msg');return /masha\W*allah/.test(m)&&m.includes('33');},"Tap 33 times: `#msg` should say **MashaAllah, 33!** (and stay empty before 33)."]]}),
 J('t11','Reset button',{why:"Ready for the next phrase? Reset takes you back to zero.",
  todo:"When `#reset` is clicked, set `count` back to 0, show it, and empty `#msg`.",
  job:"When `#reset` is clicked: `count = 0;`, show it in `#count`, and make `#msg` empty with `msg.textContent = '';`.",
  snippet:D`
   document.querySelector('#reset').addEventListener('click', () => {
     count = 0;
     countEl.textContent = count;
     msg.textContent = '';
   });`,
  hints:["`document.querySelector('#reset').addEventListener('click', () => { … });`","Inside: `count = 0; countEl.textContent = count; msg.textContent = '';`"],
  tip:"`''` (two quotes with nothing between) is an empty string — no words at all.",
  checks:[[a=>{clicks(a,'#tap',3);a.click('#reset');return T(a,'#count')==='0';},"Tap 3 times, then Reset: `#count` should go back to **0**."],[a=>{clicks(a,'#tap',33);a.click('#reset');return T(a,'#msg')==='';},"Reset should also empty `#msg`: `msg.textContent = '';`"]]}),
 J('t12','Fill the bar',{why:"Let the bar grow as you count, so you can see how far you've come.",
  learn:"• `count / 33 * 100` turns the count into a percent (11 taps = 33%).\n• `Math.min(count, 33)` stops the bar going past 100%.\n• Listening on `document` means \"after ANY click on the page\" — so the bar also updates after Reset.",
  todo:"Add a click listener to `document` that sets `#fill`'s `style.width` to the percent.",
  job:"Add `document.addEventListener('click', …)`. Inside, work out `Math.min(count, 33) / 33 * 100` and set `#fill`'s `style.width` to that number + `'%'`.",
  snippet:D`
   document.addEventListener('click', () => {
     const percent = Math.min(count, 33) / 33 * 100;
     document.querySelector('#fill').style.width = percent + '%';
   });`,
  hints:["`const percent = Math.min(count, 33) / 33 * 100;`","`document.querySelector('#fill').style.width = percent + '%';`"],
  tip:"`style.width` changes the CSS from JavaScript. The `transition` you added makes it slide smoothly.",
  checks:[[a=>{clicks(a,'#tap',11);const w=parseFloat(a.$('#fill').style.width);return w>30&&w<37;},"After 11 taps, `#fill`'s width should be about **33%**."],[a=>{a.click('#reset');return parseFloat(a.$('#fill').style.width)===0;},"After Reset, the bar should be empty (0%)."]]}),
 J('t13','Switch the phrase',{why:"Finished SubhanAllah? Tap the next phrase to start a fresh count.",
  learn:"`document.querySelectorAll('.phrases button')` finds ALL the phrase buttons. `.forEach(btn => { … })` runs the same code for each one.",
  todo:"Give every `.phrases button` a click listener that puts its words into `.phrase`, sets `count` to 0, shows it, and empties `#msg`.",
  job:"For each `.phrases button`: on click, put its `textContent` into `.phrase`, set `count = 0;`, show it in `#count`, and empty `#msg`.",
  snippet:D`
   const phraseEl = document.querySelector('.phrase');

   document.querySelectorAll('.phrases button').forEach(btn => {
     btn.addEventListener('click', () => {
       phraseEl.textContent = btn.textContent;
       count = 0;
       countEl.textContent = count;
       msg.textContent = '';
     });
   });`,
  hints:["`document.querySelectorAll('.phrases button').forEach(btn => { … });`","Inside: `btn.addEventListener('click', () => { phraseEl.textContent = btn.textContent; … });`","Then reset: `count = 0; countEl.textContent = count; msg.textContent = '';`"],
  tip:"Your counter is complete, alhamdulillah! Download it and put it on your phone's home screen.",
  checks:[[a=>{clicks(a,'#tap',2);const b=a.$$('.phrases button').find(x=>T(a,x).includes('alhamdulillah'));if(!b)return false;a.click(b);return T(a,'.phrase').includes('alhamdulillah');},"Clicking **Alhamdulillah** should put that word into `.phrase`."],[a=>T(a,'#count')==='0',"Switching phrase should set `#count` back to **0**."]]})
 ]},

/* ================================================================== 2. FLASHCARDS */
{id:'pf_flash',cat:'full',emoji:'🃏',title:'Flashcard Study App',mentor:'Ms Kim, teacher',
 blurb:'Flip cards with a real 3D turn, step through a deck and track what you know.',
 intro:"Ms Kim's class has a big quiz coming up. You'll build a flashcard app: a card that **flips over in 3D** to show the answer, a Next button, and buttons to mark \"I knew it\" or \"Still learning\". Cards you're still learning come back again later — just like real study apps!",
 steps:[
 H('f1','The title',{why:"Tell students what the app is and how to use it.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>` that tells people to tap the card.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (the app name) and a `<p>` (how to use it) inside.",
  snippet:D`
   <header>
     <h1>🃏 Flash Cards</h1>
     <p>Tap the card to see the answer!</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>🃏 Flash Cards</h1>` and `<p>Tap the card to see the answer!</p>`"],
  tip:"Any words are fine — the checker only looks at the tags.",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header too.")]}),
 H('f2','The card',{why:"A flashcard has two sides: a question on the front and the answer on the back.",
  learn:"The card is three boxes inside each other: a `.scene` (the table), the `#card` (the card that turns), and two `.face` boxes (front and back).",
  todo:"Add `<div class=\"scene\">` holding `<div id=\"card\" class=\"card\">`, which holds a `.face.front` (id `front`) and a `.face.back` (id `back`). Under it, add `<p id=\"counter\">Card 1</p>`.",
  job:"Make `<div class=\"scene\">` → `<div id=\"card\" class=\"card\">` → two faces: `<div class=\"face front\" id=\"front\">` and `<div class=\"face back\" id=\"back\">`. Then add `<p id=\"counter\">Card 1</p>`.",
  snippet:D`
   <div class="scene">
     <div id="card" class="card">
       <div class="face front" id="front">Question goes here</div>
       <div class="face back" id="back">Answer goes here</div>
     </div>
   </div>
   <p id="counter">Card 1</p>`,
  hints:["Outside box: `<div class=\"scene\">`. Middle box: `<div id=\"card\" class=\"card\">`.","Inside the card: `<div class=\"face front\" id=\"front\">Question goes here</div>` and the same for `back`.","After the scene closes: `<p id=\"counter\">Card 1</p>`."],
  tip:"`class=\"face front\"` gives one element TWO classes. It gets the styles of both!",
  checks:[has('.scene #card.card',"Put `<div id=\"card\" class=\"card\">` inside `<div class=\"scene\">`."),has('#card .face.front#front',"Add `<div class=\"face front\" id=\"front\">` inside the card."),has('#card .face.back#back',"Add `<div class=\"face back\" id=\"back\">` inside the card."),has('p#counter',"Add `<p id=\"counter\">Card 1</p>` under the card.")]}),
 H('f3','Flip and Next',{why:"Students need a button to flip the card and one to go to the next card.",
  todo:"Add a `<div class=\"controls\">` with `<button id=\"flip\">🔄 Flip</button>` and `<button id=\"next\">Next ➡️</button>`.",
  job:"Make a `<div class=\"controls\">` with two buttons: `<button id=\"flip\">` and `<button id=\"next\">`.",
  snippet:D`
   <div class="controls">
     <button id="flip">🔄 Flip</button>
     <button id="next">Next ➡️</button>
   </div>`,
  hints:["`<div class=\"controls\">` … `</div>`","Inside: `<button id=\"flip\">🔄 Flip</button>` and `<button id=\"next\">Next ➡️</button>`"],
  tip:"Emoji make buttons easy to understand, even for little kids who can't read yet.",
  checks:[has('.controls button#flip',"Add `<button id=\"flip\">` inside `<div class=\"controls\">`."),has('.controls button#next',"Add `<button id=\"next\">` inside `<div class=\"controls\">`.")]}),
 H('f4','Did you know it?',{why:"Being honest about what you know is the secret to studying well.",
  todo:"Add a `<div class=\"marks\">` with `<button id=\"know\">✅ I knew it!</button>` and `<button id=\"dunno\">🤔 Still learning</button>`, then `<p id=\"score\">Known: 0 · Learning: 0</p>`.",
  job:"Make `<div class=\"marks\">` with `<button id=\"know\">` and `<button id=\"dunno\">`. Under it add `<p id=\"score\">Known: 0 · Learning: 0</p>`.",
  snippet:D`
   <div class="marks">
     <button id="know">✅ I knew it!</button>
     <button id="dunno">🤔 Still learning</button>
   </div>
   <p id="score">Known: 0 · Learning: 0</p>`,
  hints:["`<div class=\"marks\">` with two buttons: ids `know` and `dunno`.","Then `<p id=\"score\">Known: 0 · Learning: 0</p>`"],
  tip:"The dot `·` is called a middle dot. You can use a dash `-` instead if it's easier to type.",
  checks:[has('.marks #know',"Add `<button id=\"know\">` inside `<div class=\"marks\">`."),has('.marks #dunno',"Add `<button id=\"dunno\">` inside `<div class=\"marks\">`."),hasText('#score','known',"Add `<p id=\"score\">Known: 0 · Learning: 0</p>`.")]}),
 C('f5','A friendly page',{why:"A happy page makes studying feel less like homework.",
  learn:BODY_LEARN,
  todo:"Style `body`: a font, centered text, padding, and a gradient background.",
  job:"In `body { }` add a `font-family`, `text-align: center;`, and `background: linear-gradient(135deg, #ede9fe, #fce7f3);` (any light colours).",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: Verdana, sans-serif;
     text-align: center;
     color: #3b0764;
     background: linear-gradient(135deg, #ede9fe, #fce7f3);
   }`,
  hints:["Start with `<style>`, then `body { }`, then `</style>`.","`font-family: Verdana, sans-serif; text-align: center; background: linear-gradient(135deg, #ede9fe, #fce7f3);`"],
  tip:"`135deg` makes the gradient go diagonally, from top-left to bottom-right.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],cssIs('body','textAlign','center',"Add `text-align: center;` to `body`."),grad('body',"Give `body` a gradient background.")]}),
 C('f6','The card shape',{why:"Give the card a real size and get it ready to spin in 3D.",
  learn:"• `perspective: 800px;` on the parent makes things look 3D, like you're looking at a real table.\n• `transform-style: preserve-3d;` keeps the two faces 3D while the card turns.\n• `position: relative;` lets the faces sit exactly on top of the card.",
  todo:"Give `.scene` `perspective: 800px`. Give `.card` `position: relative`, a width, a height (at least 120px), `margin: 12px auto`, `transition: transform 0.6s` and `transform-style: preserve-3d`.",
  job:"`.scene { perspective: 800px; }`. In `.card { }`: `position: relative;`, `height: 170px;` (120px or more), `transition: transform 0.6s;`, `transform-style: preserve-3d;`.",
  snippet:D`
   .scene {
     perspective: 800px;
   }
   .card {
     position: relative;
     width: 260px;
     max-width: 100%;
     height: 170px;
     margin: 12px auto;
     transition: transform 0.6s;
     transform-style: preserve-3d;
     cursor: pointer;
   }`,
  hints:["`.scene { perspective: 800px; }`","`.card { position: relative; width: 260px; height: 170px; margin: 12px auto; }`","Add to `.card`: `transition: transform 0.6s; transform-style: preserve-3d;`"],
  tip:"Smaller perspective numbers = a more dramatic 3D effect. Try `300px` later for fun!",
  checks:[cssNot('.scene','perspective','none',"Give `.scene` `perspective: 800px;`"),cssIs('.card','position','relative',"Give `.card` `position: relative;`"),cssMin('.card','height',120,"Give `.card` a height of at least 120px: `height: 170px;`"),transOn('.card',"Give `.card` `transition: transform 0.6s;`")]}),
 C('f7','Front and back faces',{why:"Stack the two faces on top of each other, with the back one turned around.",
  learn:"• `position: absolute; inset: 0;` makes a face fill the whole card.\n• `backface-visibility: hidden;` hides a face when it's turned away from you.\n• `transform: rotateY(180deg);` spins the back face around, so it starts face-down.",
  todo:"Give `.face` `position: absolute`, `inset: 0`, flex centering, rounded corners and `backface-visibility: hidden`. Colour `.front` and `.back`, and give `.back` `transform: rotateY(180deg)`.",
  job:"In `.face { }`: `position: absolute;`, `inset: 0;`, `backface-visibility: hidden;`. In `.back { }`: `transform: rotateY(180deg);`. Give both faces a background colour.",
  snippet:D`
   .face {
     position: absolute;
     inset: 0;
     display: flex;
     align-items: center;
     justify-content: center;
     padding: 16px;
     border-radius: 20px;
     font-size: 22px;
     font-weight: bold;
     backface-visibility: hidden;
     box-shadow: 0 8px 20px rgba(59, 7, 100, 0.15);
   }
   .front {
     background: white;
   }
   .back {
     background: #fde68a;
     transform: rotateY(180deg);
   }`,
  hints:["`.face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 20px; }`","Center the words: `display: flex; align-items: center; justify-content: center;`","`.front { background: white; }` and `.back { background: #fde68a; transform: rotateY(180deg); }`"],
  tip:"Now you only see the question. The answer is hiding on the back, face-down!",
  checks:[cssIs('.front','position','absolute',"Give `.face` `position: absolute;`"),cssIs('.back','backfaceVisibility','hidden',"Give `.face` `backface-visibility: hidden;`"),cssNot('.back','transform','none',"Give `.back` `transform: rotateY(180deg);`")]}),
 C('f8','The flip move and buttons',{why:"When the card gets a `flipped` class, it should spin around. And the buttons need some style.",
  learn:"`.card.flipped` (no space!) means \"a card that ALSO has the class flipped\". JavaScript will add and remove that class.",
  todo:"Add `.card.flipped { transform: rotateY(180deg); }`. Style `button` with padding, rounded corners and `cursor: pointer`. Colour `#know` and `#dunno`.",
  job:"Add `.card.flipped { transform: rotateY(180deg); }`. Give `button` a `border-radius` and `cursor: pointer;`.",
  snippet:D`
   .card.flipped {
     transform: rotateY(180deg);
   }
   button {
     margin: 6px;
     padding: 10px 18px;
     border: none;
     border-radius: 99px;
     font-size: 16px;
     background: white;
     box-shadow: 0 3px 8px rgba(59, 7, 100, 0.12);
     cursor: pointer;
   }
   #know {
     background: #bbf7d0;
   }
   #dunno {
     background: #fed7aa;
   }`,
  hints:["`.card.flipped { transform: rotateY(180deg); }` — no space between `.card` and `.flipped`.","`button { padding: 10px 18px; border: none; border-radius: 99px; cursor: pointer; }`"],
  tip:"Nothing flips yet — the class isn't on the card. That's JavaScript's job next!",
  checks:[[anyHover(/\.card\.flipped/,'transform'),"Add `.card.flipped { transform: rotateY(180deg); }`"],cssMin('button','borderTopLeftRadius',1,"Round the buttons: `border-radius: 99px;`"),cssIs('button','cursor','pointer',"Give `button` `cursor: pointer;`")]}),
 J('f9','Flip the card',{why:"Tap the card (or the Flip button) to turn it over.",
  learn:"`card.classList.toggle('flipped')` adds the class if it's missing, and removes it if it's there. Like a light switch!",
  todo:"Make a `flip()` function that toggles `flipped` on `#card`. Run it when `#card` or `#flip` is clicked.",
  job:"Write `function flip() { card.classList.toggle('flipped'); }`. Run it when `#card` is clicked AND when `#flip` is clicked.",
  snippet:D`
   const card = document.querySelector('#card');

   function flip() {
     card.classList.toggle('flipped');
   }

   card.addEventListener('click', flip);
   document.querySelector('#flip').addEventListener('click', flip);`,
  hints:["Start your script: `<script>` at the very bottom, then `const card = document.querySelector('#card');`","`function flip() { card.classList.toggle('flipped'); }`","`card.addEventListener('click', flip);` and the same for `#flip`."],
  tip:"Notice: `flip` without `()` means \"here's the function, run it later\". With `()` it would run right now.",
  checks:[clickThen('#flip',a=>a.$('#card').classList.contains('flipped'),"Clicking **Flip** should add the class `flipped` to `#card`."),clickThen('#card',a=>!a.$('#card').classList.contains('flipped'),"Clicking the card should flip it back (remove `flipped`).")]}),
 J('f10','The deck of cards',{why:"A study app needs lots of cards. Let's store them in a list.",
  learn:"• `[ … ]` is an **array** — a list.\n• `{ q: '…', a: '…' }` is an **object** — one card with a question `q` and an answer `a`.\n• `cards[0]` is the first card. `cards.length` is how many there are.",
  todo:"Make a `cards` array with at least 3 `{ q, a }` cards and `let index = 0;`. Write `showCard()` to put the question in `#front`, the answer in `#back`, and **Card 1 of 5** in `#counter`. Call it once.",
  job:"Make a `cards` list with at least 3 cards like `{ q: 'Biggest planet?', a: 'Jupiter' }`. Write `showCard()` to fill `#front`, `#back`, and `#counter` (**Card 1 of 5**). Then call `showCard();`.",
  snippet:D`
   const cards = [
     { q: 'What is 7 × 8?', a: '56' },
     { q: 'Capital city of Japan?', a: 'Tokyo' },
     { q: 'How many legs does a spider have?', a: '8' },
     { q: 'What do bees make?', a: 'Honey 🍯' },
     { q: 'Biggest planet?', a: 'Jupiter 🪐' }
   ];
   let index = 0;

   function showCard() {
     document.querySelector('#front').textContent = cards[index].q;
     document.querySelector('#back').textContent = cards[index].a;
     document.querySelector('#counter').textContent = 'Card ' + (index + 1) + ' of ' + cards.length;
   }

   showCard();`,
  hints:["`const cards = [ { q: 'Biggest planet?', a: 'Jupiter' }, … ];` — commas between cards.","`let index = 0;` then `function showCard() { … }`","Inside showCard: `document.querySelector('#front').textContent = cards[index].q;` (and `.a` for `#back`), then `'Card ' + (index + 1) + ' of ' + cards.length`."],
  tip:"Use your own questions! Spelling words, times tables, capital cities — anything you're learning.",
  checks:[[a=>T(a,'#front')&&T(a,'#front')!=='question goes here',"`showCard()` should put the first question into `#front`."],[a=>T(a,'#back')&&T(a,'#back')!=='answer goes here',"`showCard()` should put the first answer into `#back`."],[a=>{const m=/card 1 of (\d+)/.exec(T(a,'#counter'));return !!m&&+m[1]>=3;},"`#counter` should say **Card 1 of 5** (or however many cards — at least 3)."]]}),
 J('f11','Next card',{why:"After each card, move on to the next one — and go back to the start at the end.",
  learn:"`%` gives the **remainder**. With 5 cards, `(4 + 1) % 5` is 0, so after the last card you go back to the first. Round and round!",
  todo:"When `#next` is clicked: `index = (index + 1) % cards.length;`, remove `flipped` from the card, and call `showCard()`.",
  job:"When `#next` is clicked: `index = (index + 1) % cards.length;`, then `card.classList.remove('flipped');`, then `showCard();`.",
  snippet:D`
   document.querySelector('#next').addEventListener('click', () => {
     index = (index + 1) % cards.length;
     card.classList.remove('flipped');
     showCard();
   });`,
  hints:["`document.querySelector('#next').addEventListener('click', () => { … });`","Inside: `index = (index + 1) % cards.length; card.classList.remove('flipped'); showCard();`"],
  tip:"Removing `flipped` means the next card always starts question-side up. No peeking!",
  checks:[[a=>{const q=T(a,'#front');a.click('#next');return T(a,'#front')!==q&&T(a,'#counter').startsWith('card 2');},"Clicking **Next** should show a new question and **Card 2** in `#counter`."],[a=>{a.click('#flip');a.click('#next');return !a.$('#card').classList.contains('flipped');},"**Next** should turn the card back to the question side (remove `flipped`)."],[a=>{const n=+(/of (\d+)/.exec(T(a,'#counter'))||[])[1];if(!n)return false;clicks(a,'#next',n-2);return T(a,'#counter').startsWith('card 1');},"After the last card, **Next** should go back to **Card 1**. Use `% cards.length`."]]}),
 J('f12','I knew it!',{why:"Count the cards you know — it feels great to watch the number grow.",
  todo:"Make `let known = 0;` and `let learning = 0;`, and `showScore()` that writes **Known: 1 · Learning: 0** into `#score`. When `#know` is clicked: add 1 to `known`, show the score, and go to the next card.",
  job:"Make `known` and `learning` (both 0) and a `showScore()` function. When `#know` is clicked: `known = known + 1;`, `showScore();`, then click Next for them.",
  learn:"`document.querySelector('#next').click();` presses the Next button with code — so you don't have to write the next-card code twice!",
  snippet:D`
   let known = 0;
   let learning = 0;

   function showScore() {
     document.querySelector('#score').textContent = 'Known: ' + known + ' · Learning: ' + learning;
   }

   document.querySelector('#know').addEventListener('click', () => {
     known = known + 1;
     showScore();
     document.querySelector('#next').click();
   });`,
  hints:["`let known = 0;` and `let learning = 0;`","`function showScore() { document.querySelector('#score').textContent = 'Known: ' + known + ' · Learning: ' + learning; }`","In the `#know` click: `known = known + 1; showScore(); document.querySelector('#next').click();`"],
  tip:"Calling `.click()` from code is a neat trick to reuse a button's job.",
  checks:[clickThen('#know',a=>T(a,'#score').includes('known: 1'),"Clicking **I knew it!** should make `#score` say **Known: 1**."),[a=>T(a,'#counter').startsWith('card 2'),"After **I knew it!**, the next card (**Card 2**) should show."]]}),
 J('f13','Still learning',{why:"Cards you don't know yet should come back again later. That's how your brain learns!",
  learn:"`cards.push(cards[index])` adds a copy of the current card to the END of the list. The deck gets one card longer.",
  todo:"When `#dunno` is clicked: add 1 to `learning`, show the score, push the current card to the end of `cards`, and go to the next card.",
  job:"When `#dunno` is clicked: `learning = learning + 1;`, `showScore();`, `cards.push(cards[index]);`, then click Next.",
  snippet:D`
   document.querySelector('#dunno').addEventListener('click', () => {
     learning = learning + 1;
     showScore();
     cards.push(cards[index]);
     document.querySelector('#next').click();
   });`,
  hints:["Copy your `#know` listener and change it for `#dunno`.","Inside: `learning = learning + 1; showScore(); cards.push(cards[index]); document.querySelector('#next').click();`"],
  tip:"This idea is called **spaced repetition**. Real study apps use it to help you remember things for years!",
  checks:[[a=>{const n=+(/of (\d+)/.exec(T(a,'#counter'))||[])[1];a.click('#dunno');const m=+(/of (\d+)/.exec(T(a,'#counter'))||[])[1];return T(a,'#score').includes('learning: 1')&&m===n+1;},"Clicking **Still learning** should make `#score` say **Learning: 1** and the deck one card longer (**of 6**)."]]})
 ]},

/* ================================================================== 3. PIZZA */
{id:'pf_pizza',cat:'full',emoji:'🍕',title:'Pizza Order Builder',mentor:'Luigi, pizza chef',
 blurb:'Pick a size and toppings, watch your pizza grow and the price add up live.',
 intro:"Luigi's pizza shop wants online orders! You'll build a pizza builder: **radio buttons** for the size, **checkboxes** for toppings, a pizza picture that fills with topping emoji, and a price that adds itself up as you click.",
 steps:[
 H('z1','The shop sign',{why:"Every shop needs a sign out the front.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (your shop name) and a `<p>` (a fun slogan) inside.",
  snippet:D`
   <header>
     <h1>🍕 Luigi's Pizza Builder</h1>
     <p>Make your dream pizza and see the price!</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>🍕 Luigi's Pizza Builder</h1>` and a `<p>` slogan."],
  tip:"Name the shop after yourself if you like — it's your pizzeria now!",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('z2','Pick a size',{why:"You can only have ONE size, so we use radio buttons — choosing one un-chooses the others.",
  learn:"Radio buttons with the same `name` are a team: only one can be picked. The `value` holds the price, so JavaScript can add it up. `checked` picks one at the start.",
  todo:"Add `<fieldset id=\"sizes\">` with a `<legend>` and three `<label>`s, each with `<input type=\"radio\" name=\"size\">`. Values: `8`, `11`, `14`. Add `checked` to the first one.",
  job:"Make `<fieldset id=\"sizes\">` with 3 radio buttons, all `name=\"size\"`, with `value=\"8\"`, `value=\"11\"` and `value=\"14\"`. Put `checked` on the first.",
  snippet:D`
   <fieldset id="sizes">
     <legend>1. Pick a size</legend>
     <label><input type="radio" name="size" value="8" checked> Small — $8</label>
     <label><input type="radio" name="size" value="11"> Medium — $11</label>
     <label><input type="radio" name="size" value="14"> Large — $14</label>
   </fieldset>`,
  hints:["`<fieldset id=\"sizes\">` and `<legend>1. Pick a size</legend>`","One option: `<label><input type=\"radio\" name=\"size\" value=\"8\" checked> Small — $8</label>`","Copy it twice for Medium (`11`) and Large (`14`), without `checked`."],
  tip:"Putting the `<input>` INSIDE its `<label>` means you can click the words too, not just the tiny circle.",
  checks:[[a=>a.$$('#sizes input[type="radio"][name="size"]').length>=3,"Add 3 `<input type=\"radio\" name=\"size\">` inside `<fieldset id=\"sizes\">`."],[a=>a.$$('#sizes input[type="radio"]').every(r=>Number(r.value)>0),"Give every size a price `value`, like `value=\"8\"`."],has('#sizes input[type="radio"]:checked',"Add `checked` to the first size.")]}),
 H('z3','Pick toppings',{why:"You can have LOTS of toppings, so these are checkboxes.",
  learn:"You can invent your own attributes that start with `data-`. Here `data-emoji=\"🍄\"` stores the picture for each topping, so JavaScript can put it on the pizza!",
  todo:"Add `<fieldset id=\"toppings\">` with a `<legend>` and at least 4 labels, each with `<input type=\"checkbox\">`, a price `value` and a `data-emoji`.",
  job:"Make `<fieldset id=\"toppings\">` with at least 4 checkboxes. Each needs a price `value` (like `value=\"2\"`) and a `data-emoji` (like `data-emoji=\"🍄\"`).",
  snippet:D`
   <fieldset id="toppings">
     <legend>2. Add toppings</legend>
     <label><input type="checkbox" value="2" data-emoji="🍖"> Pepperoni — $2</label>
     <label><input type="checkbox" value="1" data-emoji="🍄"> Mushrooms — $1</label>
     <label><input type="checkbox" value="1.5" data-emoji="🧀"> Extra cheese — $1.50</label>
     <label><input type="checkbox" value="1" data-emoji="🍍"> Pineapple — $1</label>
     <label><input type="checkbox" value="1" data-emoji="🌽"> Corn — $1</label>
   </fieldset>`,
  hints:["`<fieldset id=\"toppings\">` and `<legend>2. Add toppings</legend>`","One topping: `<label><input type=\"checkbox\" value=\"2\" data-emoji=\"🍖\"> Pepperoni — $2</label>`"],
  tip:"Pineapple on pizza? Luigi says every customer is right. 🍍",
  checks:[[a=>a.$$('#toppings input[type="checkbox"]').length>=4,"Add at least 4 `<input type=\"checkbox\">` inside `<fieldset id=\"toppings\">`."],[a=>{const b=a.$$('#toppings input[type="checkbox"]');return b.length&&b.every(x=>Number(x.value)>0);},"Give every topping a price `value`, like `value=\"2\"`."],[a=>{const b=a.$$('#toppings input[type="checkbox"]');return b.length&&b.every(x=>x.dataset.emoji);},"Give every topping a `data-emoji`, like `data-emoji=\"🍄\"`."]]}),
 H('z4','The order box',{why:"Show the pizza, the total price, and a big button to order.",
  todo:"Add `<section class=\"order\">` with an empty `<div id=\"pizza\"></div>`, `<p id=\"total\">Total: $8.00</p>`, `<button id=\"order\">Place my order</button>` and an empty `<p id=\"msg\"></p>`.",
  job:"Make `<section class=\"order\">` with: an empty `<div id=\"pizza\">`, `<p id=\"total\">Total: $8.00</p>`, a `<button id=\"order\">`, and an empty `<p id=\"msg\">`.",
  snippet:D`
   <section class="order">
     <div id="pizza"></div>
     <p id="total">Total: $8.00</p>
     <button id="order">Place my order</button>
     <p id="msg"></p>
   </section>`,
  hints:["`<section class=\"order\">` … `</section>`","Inside: `<div id=\"pizza\"></div>`, `<p id=\"total\">Total: $8.00</p>`, `<button id=\"order\">Place my order</button>`, `<p id=\"msg\"></p>`"],
  tip:"The pizza box is empty now. CSS will make it a pizza, and JavaScript will add the toppings.",
  checks:[has('.order #pizza',"Add `<div id=\"pizza\"></div>` inside `<section class=\"order\">`."),hasText('#total','total',"Add `<p id=\"total\">Total: $8.00</p>`."),has('button#order',"Add `<button id=\"order\">Place my order</button>`."),has('p#msg',"Add an empty `<p id=\"msg\"></p>`.")]}),
 C('z5','Shop colours',{why:"Warm colours make people hungry! Let's style the page and the boxes.",
  todo:"Style `body` (font, warm background, padding). Make each `fieldset` a white rounded card with no border.",
  job:"Give `body` a `font-family` and a `background-color`. Give `fieldset` `border: none;`, a white background and a `border-radius`.",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     font-family: 'Trebuchet MS', sans-serif;
     background-color: #fff7ed;
     color: #7c2d12;
   }
   fieldset {
     margin: 0 0 14px;
     padding: 12px 16px;
     border: none;
     border-radius: 16px;
     background: white;
     box-shadow: 0 4px 14px rgba(124, 45, 18, 0.08);
   }
   legend {
     font-weight: bold;
     color: #ea580c;
   }`,
  hints:["`body { font-family: 'Trebuchet MS', sans-serif; background-color: #fff7ed; color: #7c2d12; padding: 16px; }`","`fieldset { border: none; border-radius: 16px; background: white; padding: 12px 16px; }`"],
  tip:"Orange and red are \"hungry colours\" — that's why so many food shops use them!",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],cssNot('body','backgroundColor',[CLEAR,WHITE],"Give `body` a `background-color` (not white)."),cssIs('fieldset','borderTopStyle','none',"Remove the fieldset border: `border: none;`"),cssMin('fieldset','borderTopLeftRadius',1,"Round the fieldsets: `border-radius: 16px;`")]}),
 C('z6','Easy-tap choices',{why:"Each choice should be its own row that lights up when you point at it.",
  todo:"Make `label` `display: block` with padding, rounded corners and `cursor: pointer`, and add a `label:hover` background colour.",
  job:"Give `label` `display: block;` and `cursor: pointer;`. Add `label:hover { background: #ffedd5; }` (any light colour).",
  snippet:D`
   label {
     display: block;
     padding: 8px 10px;
     border-radius: 10px;
     cursor: pointer;
   }
   label:hover {
     background: #ffedd5;
   }
   input {
     accent-color: #ea580c;
     margin-right: 8px;
   }`,
  hints:["`label { display: block; padding: 8px 10px; border-radius: 10px; cursor: pointer; }`","`label:hover { background: #ffedd5; }`"],
  tip:"`accent-color` changes the colour of checkboxes and radio buttons. One line, big difference!",
  checks:[cssIs('label','display','block',"Give `label` `display: block;`"),cssIs('label','cursor','pointer',"Give `label` `cursor: pointer;`"),[anyHover(/label:hover/,'backgroundColor'),"Add `label:hover { background: #ffedd5; }`"]]}),
 C('z7','Draw the pizza',{why:"Turn the empty box into a cheesy pizza with a crust!",
  learn:"`radial-gradient(circle, #fcd34d 58%, #d97706 60%)` paints cheese in the middle and a crust ring at the edge. `flex-wrap: wrap;` lets the topping emoji fill up in rows.",
  todo:"Make `#pizza` 180px wide and tall (150px or more), round, with a radial-gradient background, flex centering with wrap, and `transition: transform 0.3s`.",
  job:"Give `#pizza` `width: 180px;` (150px or more), `height: 180px;`, `border-radius: 50%;`, `background: radial-gradient(circle, #fcd34d 58%, #d97706 60%);` and `transition: transform 0.3s;`.",
  snippet:D`
   #pizza {
     width: 180px;
     height: 180px;
     margin: 10px auto;
     padding: 30px;
     box-sizing: border-box;
     border-radius: 50%;
     background: radial-gradient(circle, #fcd34d 58%, #d97706 60%);
     display: flex;
     flex-wrap: wrap;
     align-content: center;
     justify-content: center;
     font-size: 26px;
     transition: transform 0.3s;
   }`,
  hints:["`#pizza { width: 180px; height: 180px; border-radius: 50%; margin: 10px auto; }`","`background: radial-gradient(circle, #fcd34d 58%, #d97706 60%);`","`display: flex; flex-wrap: wrap; align-content: center; justify-content: center; transition: transform 0.3s;`"],
  tip:"Change the two colours to make a tomato pizza or a chocolate dessert pizza!",
  checks:[cssMin('#pizza','width',150,"Make `#pizza` at least 150px wide: `width: 180px;`"),cssMin('#pizza','height',150,"Make `#pizza` at least 150px tall: `height: 180px;`"),grad('#pizza',"Give `#pizza` a `radial-gradient` background."),transOn('#pizza',"Give `#pizza` `transition: transform 0.3s;`")]}),
 C('z8','Price and order button',{why:"The price should be big and bold, and the order button should look tasty.",
  todo:"Center `.order`. Make `#total` at least 24px and bold. Style `#order` (red background, white text, no border, rounded, `cursor: pointer`) plus an `#order:hover` colour.",
  job:"Give `#total` `font-size: 28px;` (24px or more). Give `#order` `cursor: pointer;` and add `#order:hover { background: #dc2626; }`.",
  snippet:D`
   .order {
     text-align: center;
   }
   #total {
     font-size: 28px;
     font-weight: bold;
   }
   #order {
     padding: 12px 24px;
     border: none;
     border-radius: 99px;
     background: #ef4444;
     color: white;
     font-size: 18px;
     cursor: pointer;
   }
   #order:hover {
     background: #dc2626;
   }`,
  hints:["`.order { text-align: center; }` and `#total { font-size: 28px; font-weight: bold; }`","`#order { background: #ef4444; color: white; border: none; border-radius: 99px; padding: 12px 24px; cursor: pointer; }`","`#order:hover { background: #dc2626; }`"],
  tip:"A slightly darker colour on hover tells people \"yes, you can press me\".",
  checks:[cssMin('#total','fontSize',24,"Make `#total` at least 24px: `font-size: 28px;`"),cssIs('#order','cursor','pointer',"Give `#order` `cursor: pointer;`"),[anyHover(/#order:hover/,'backgroundColor'),"Add `#order:hover { background: #dc2626; }`"]]}),
 J('z9','Price for the size',{why:"When you pick a size, the total should change straight away.",
  learn:"• `input[name=\"size\"]:checked` finds the radio button that is picked.\n• Its `.value` is text like `\"14\"`. `Number(…)` turns it into a real number we can add.\n• `total.toFixed(2)` shows 2 decimal places: `14.00`.",
  todo:"Write `updateTotal()`: read the checked size's value as a number, and show `'Total: $' + total.toFixed(2)` in `#total`. Run it when `#sizes` changes.",
  job:"Write `function updateTotal()`. Get the checked size with `Number(…value)`, then put `'Total: $' + total.toFixed(2)` in `#total`. Run it on the `change` event of `#sizes`.",
  snippet:D`
   function updateTotal() {
     let total = Number(document.querySelector('input[name="size"]:checked').value);
     document.querySelector('#total').textContent = 'Total: $' + total.toFixed(2);
   }

   document.querySelector('#sizes').addEventListener('change', updateTotal);`,
  hints:["Start your script: `<script>` at the very bottom, then `function updateTotal() { … }`.","`let total = Number(document.querySelector('input[name=\"size\"]:checked').value);`","`document.querySelector('#total').textContent = 'Total: $' + total.toFixed(2);` and then `document.querySelector('#sizes').addEventListener('change', updateTotal);`"],
  tip:"The `change` event fires when you pick a different option. One listener on the fieldset hears all three radios!",
  checks:[[a=>{const r=a.$$('#sizes input[type="radio"]');if(r.length<3)return false;a.click(r[2]);return T(a,'#total').includes(Number(r[2].value).toFixed(2));},"Picking **Large** should change `#total` to **Total: $14.00**."]]}),
 E('z10','Add the toppings',{why:"Each topping costs extra. Let's add them to the total.",
  learn:"`querySelectorAll('#toppings input:checked')` finds every ticked topping. `forEach` adds each one's price to `total`.",
  todo:"Inside `updateTotal()`, right under the `let total = …` line, loop over the checked toppings and add their values. Then also run `updateTotal` when `#toppings` changes.",
  job:"In `updateTotal()`, under `let total = …`, add each ticked topping: `total = total + Number(box.value);`. Then run `updateTotal` on `change` of `#toppings` too.",
  where:"Inside your `updateTotal()` function, on a new line under `let total = …`. The last line goes at the very bottom of your script.",
  snippet:D`
   function updateTotal() {
     let total = Number(document.querySelector('input[name="size"]:checked').value);
     document.querySelectorAll('#toppings input:checked').forEach(box => {
       total = total + Number(box.value);
     });
     document.querySelector('#total').textContent = 'Total: $' + total.toFixed(2);
   }

   document.querySelector('#toppings').addEventListener('change', updateTotal);`,
  apply:addAfter("let total = Number(document.querySelector('input[name=\"size\"]:checked').value);",D`
   document.querySelectorAll('#toppings input:checked').forEach(box => {
     total = total + Number(box.value);
   });`,{tail:"document.querySelector('#toppings').addEventListener('change', updateTotal);"}),
  hints:["Under the `let total` line: `document.querySelectorAll('#toppings input:checked').forEach(box => { … });`","Inside the forEach: `total = total + Number(box.value);`","At the bottom: `document.querySelector('#toppings').addEventListener('change', updateTotal);`"],
  tip:"That's the power of functions: you changed ONE place, and both sizes and toppings use it.",
  checks:[[a=>{const b=a.$$('#toppings input[type="checkbox"]'),r=a.$('#sizes input:checked');if(!b.length||!r)return false;a.click(b[0]);return T(a,'#total').includes((Number(r.value)+Number(b[0].value)).toFixed(2));},"Ticking a topping should add its price to `#total` (Small + Pepperoni = **$10.00**)."],[a=>{const b=a.$$('#toppings input[type="checkbox"]');a.click(b[1]);a.click(b[0]);const r=a.$('#sizes input:checked');return T(a,'#total').includes((Number(r.value)+Number(b[1].value)).toFixed(2));},"Un-ticking a topping should take its price away again."]]}),
 J('z11','Toppings on the pizza',{why:"Customers love SEEING their pizza. Let's put the topping emoji on it.",
  learn:"`box.dataset.emoji` reads the `data-emoji` you wrote in the HTML. We join all the emoji into one string and put it on the pizza.",
  todo:"Write `drawPizza()`: start with `let toppings = '';`, add `box.dataset.emoji` for every checked topping, and put the result in `#pizza`. Run it when `#toppings` changes.",
  job:"Write `function drawPizza()`. For each ticked topping, add `box.dataset.emoji` to a string, then put it in `#pizza`. Run it on `change` of `#toppings`.",
  snippet:D`
   function drawPizza() {
     let toppings = '';
     document.querySelectorAll('#toppings input:checked').forEach(box => {
       toppings = toppings + box.dataset.emoji;
     });
     document.querySelector('#pizza').textContent = toppings;
   }

   document.querySelector('#toppings').addEventListener('change', drawPizza);`,
  hints:["`function drawPizza() { let toppings = ''; … }`","`document.querySelectorAll('#toppings input:checked').forEach(box => { toppings = toppings + box.dataset.emoji; });`","Then `document.querySelector('#pizza').textContent = toppings;` and the `change` listener."],
  tip:"Want more toppings on the picture? Use `box.dataset.emoji.repeat(3)` to show each one 3 times!",
  checks:[[a=>{const b=a.$$('#toppings input[type="checkbox"]');if(!b.length)return false;a.click(b[1]);return a.$('#pizza').textContent.includes(b[1].dataset.emoji);},"Ticking a topping should put its emoji on `#pizza`."],[a=>{const b=a.$$('#toppings input[type="checkbox"]');a.click(b[1]);return !a.$('#pizza').textContent.includes(b[1].dataset.emoji);},"Un-ticking it should take the emoji off again."]]}),
 J('z12','Bigger pizza, bigger picture',{why:"A large pizza should LOOK bigger than a small one.",
  learn:"`style.transform = 'scale(0.5)'` shrinks something to half size. Small (8 ÷ 14) is about 0.57, Large (14 ÷ 14) is 1 — full size!",
  todo:"Add another `change` listener on `#sizes` that reads the size number and sets `#pizza`'s `style.transform` to `'scale(' + size / 14 + ')'`.",
  job:"Add a `change` listener on `#sizes`. Read the checked size as a number, then set `#pizza`'s `style.transform` to `'scale(' + size / 14 + ')'`.",
  snippet:D`
   document.querySelector('#sizes').addEventListener('change', () => {
     const size = Number(document.querySelector('input[name="size"]:checked').value);
     document.querySelector('#pizza').style.transform = 'scale(' + size / 14 + ')';
   });`,
  hints:["`document.querySelector('#sizes').addEventListener('change', () => { … });`","`const size = Number(document.querySelector('input[name=\"size\"]:checked').value);`","`document.querySelector('#pizza').style.transform = 'scale(' + size / 14 + ')';`"],
  tip:"Your CSS `transition` makes the pizza grow and shrink smoothly. Try clicking the sizes quickly!",
  checks:[[a=>{const r=a.$$('#sizes input[type="radio"]');if(!r.length)return false;a.click(r[r.length-1]);a.click(r[0]);const m=/scale\(([\d.]+)\)/.exec(a.$('#pizza').style.transform);return !!m&&+m[1]<1;},"Picking **Small** should shrink `#pizza` with `style.transform = 'scale(…)'`."]]}),
 J('z13','Place the order',{why:"Last step! Pressing the button should confirm the order — or remind you to pick a topping.",
  learn:"`if … else` chooses between two things. `.length === 0` means \"there are none\".",
  todo:"When `#order` is clicked: count the checked toppings. If there are 0, show **Pick at least one topping first!** in `#msg`. Otherwise show **🎉 Order placed!** plus the total.",
  job:"On `#order` click: if no toppings are ticked, `#msg` says **Pick at least one topping first!** Else it says **🎉 Order placed!** and the total.",
  snippet:D`
   document.querySelector('#order').addEventListener('click', () => {
     const msg = document.querySelector('#msg');
     const picked = document.querySelectorAll('#toppings input:checked').length;
     if (picked === 0) {
       msg.textContent = 'Pick at least one topping first! 🍅';
     } else {
       msg.textContent = '🎉 Order placed! ' + document.querySelector('#total').textContent + ' — the chef is cooking!';
     }
   });`,
  hints:["`const picked = document.querySelectorAll('#toppings input:checked').length;`","`if (picked === 0) { msg.textContent = 'Pick at least one topping first! 🍅'; } else { … }`","In the else: `msg.textContent = '🎉 Order placed! ' + document.querySelector('#total').textContent;`"],
  tip:"Your pizza shop works! Download it and take orders from your family tonight. 🍕",
  checks:[clickThen('#order',a=>T(a,'#msg').includes('pick at least one topping'),"With no toppings, clicking **Place my order** should say **Pick at least one topping first!**"),[a=>{const b=a.$('#toppings input[type="checkbox"]');if(!b)return false;a.click(b);a.click('#order');return T(a,'#msg').includes('order placed')&&T(a,'#msg').includes('$');},"With a topping ticked, `#msg` should say **🎉 Order placed!** and the total."]]})
 ]},

/* ================================================================== 4. ROCK PAPER SCISSORS */
{id:'pf_rps',cat:'full',emoji:'✊',title:'Rock Paper Scissors',mentor:'Robo-Rex, game robot',
 blurb:'Battle a robot: random moves, real winner logic and a live scoreboard.',
 intro:"Robo-Rex the robot wants a rematch! You'll build the game from nothing: three move buttons, a battle arena with two big hands, a result message and a scoreboard. Then you'll teach the robot to pick moves and work out who wins.",
 steps:[
 H('r1','The title',{why:"Big title, big challenge.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (the game name) and a `<p>` (a challenge) inside.",
  snippet:D`
   <header>
     <h1>✊ ✋ ✌️ Rock Paper Scissors</h1>
     <p>Can you beat Robo-Rex?</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>✊ ✋ ✌️ Rock Paper Scissors</h1>` and `<p>Can you beat Robo-Rex?</p>`"],
  tip:"On a phone, the emoji keyboard has all three hands.",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('r2','Your move buttons',{why:"Three buttons — one for each move.",
  learn:"Each button's `id` is the name of the move. JavaScript will read `btn.id` to know which one you picked.",
  todo:"Add `<div class=\"choices\">` with three buttons: `id=\"rock\"`, `id=\"paper\"`, `id=\"scissors\"`.",
  job:"Make `<div class=\"choices\">` with 3 buttons: `<button id=\"rock\">`, `<button id=\"paper\">` and `<button id=\"scissors\">`.",
  snippet:D`
   <div class="choices">
     <button id="rock">✊ Rock</button>
     <button id="paper">✋ Paper</button>
     <button id="scissors">✌️ Scissors</button>
   </div>`,
  hints:["`<div class=\"choices\">` … `</div>`","`<button id=\"rock\">✊ Rock</button>` — then paper and scissors the same way."],
  tip:"ids must be lowercase here, because JavaScript will match them exactly.",
  checks:[has('.choices #rock',"Add `<button id=\"rock\">` inside `<div class=\"choices\">`."),has('.choices #paper',"Add `<button id=\"paper\">`."),has('.choices #scissors',"Add `<button id=\"scissors\">`.")]}),
 H('r3','The battle arena',{why:"Show both hands side by side, and who won.",
  todo:"Add `<div class=\"arena\">` with `<div class=\"hand\" id=\"you\">❔</div>`, `<span class=\"vs\">VS</span>`, `<div class=\"hand\" id=\"cpu\">❔</div>`. Under it: `<p id=\"result\">Make your move!</p>`.",
  job:"Make `<div class=\"arena\">` with two `.hand` boxes: `id=\"you\"` and `id=\"cpu\"` (both say ❔), and a `VS` between. Under it: `<p id=\"result\">Make your move!</p>`.",
  snippet:D`
   <div class="arena">
     <div class="hand" id="you">❔</div>
     <span class="vs">VS</span>
     <div class="hand" id="cpu">❔</div>
   </div>
   <p id="result">Make your move!</p>`,
  hints:["`<div class=\"arena\">` holds 3 things: a hand, `<span class=\"vs\">VS</span>`, another hand.","`<div class=\"hand\" id=\"you\">❔</div>` and `<div class=\"hand\" id=\"cpu\">❔</div>`","After the arena: `<p id=\"result\">Make your move!</p>`"],
  tip:"`cpu` is short for \"computer\". Programmers love short names!",
  checks:[has('.arena .hand#you',"Add `<div class=\"hand\" id=\"you\">` inside the arena."),has('.arena .hand#cpu',"Add `<div class=\"hand\" id=\"cpu\">` inside the arena."),hasText('#result','make your move',"Add `<p id=\"result\">Make your move!</p>`.")]}),
 H('r4','The scoreboard',{why:"Keep score so you can brag about it later.",
  todo:"Add `<div class=\"score\">` with three `<p>`s holding `<b id=\"win\">0</b>`, `<b id=\"draw\">0</b>` and `<b id=\"lose\">0</b>`. Then `<button id=\"again\">🔄 New game</button>`.",
  job:"Make `<div class=\"score\">` with 3 numbers: `<b id=\"win\">0</b>`, `<b id=\"draw\">0</b>`, `<b id=\"lose\">0</b>`. Then add `<button id=\"again\">`.",
  snippet:D`
   <div class="score">
     <p>You<br><b id="win">0</b></p>
     <p>Draws<br><b id="draw">0</b></p>
     <p>Robot<br><b id="lose">0</b></p>
   </div>
   <button id="again">🔄 New game</button>`,
  hints:["`<div class=\"score\">` with 3 paragraphs inside.","One of them: `<p>You<br><b id=\"win\">0</b></p>`","After the div: `<button id=\"again\">🔄 New game</button>`"],
  tip:"`<br>` is a line break — it puts the number under the word.",
  checks:[[a=>['win','draw','lose'].every(i=>T(a,'.score #'+i)==='0'),"Inside `<div class=\"score\">`, add `<b id=\"win\">0</b>`, `<b id=\"draw\">0</b>` and `<b id=\"lose\">0</b>`."],has('button#again',"Add `<button id=\"again\">🔄 New game</button>`.")]}),
 C('r5','Game colours',{why:"Games should look exciting! Bright gradient, fun font.",
  learn:BODY_LEARN,
  todo:"Style `body`: a font, centered text, padding and a gradient background.",
  job:"In `body { }` add a `font-family`, `text-align: center;`, and `background: linear-gradient(135deg, #e0f2fe, #fae8ff);` (any light colours).",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: 'Trebuchet MS', sans-serif;
     text-align: center;
     color: #312e81;
     background: linear-gradient(135deg, #e0f2fe, #fae8ff);
   }`,
  hints:["`<style>` then `body { }` then `</style>`.","`font-family: 'Trebuchet MS', sans-serif; text-align: center; background: linear-gradient(135deg, #e0f2fe, #fae8ff);`"],
  tip:"Light blue + light pink = a bright, friendly game feel.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],cssIs('body','textAlign','center',"Add `text-align: center;` to `body`."),grad('body',"Give `body` a gradient background.")]}),
 C('r6','Chunky move buttons',{why:"Buttons in a game should be big and bouncy.",
  todo:"Make `.choices` a flex row, centered, with a `gap`. Style `.choices button` (big font, padding, rounded, `cursor: pointer`, a transition) and add a `.choices button:hover` that lifts it with `transform`.",
  job:"Give `.choices` `display: flex;` and `gap: 10px;`. Add `.choices button:hover { transform: translateY(-4px); }`.",
  snippet:D`
   .choices {
     display: flex;
     justify-content: center;
     flex-wrap: wrap;
     gap: 10px;
   }
   .choices button {
     font-size: 20px;
     padding: 12px 16px;
     border: none;
     border-radius: 16px;
     background: white;
     box-shadow: 0 4px 0 #c7d2fe;
     cursor: pointer;
     transition: transform 0.15s;
   }
   .choices button:hover {
     transform: translateY(-4px);
   }`,
  hints:["`.choices { display: flex; justify-content: center; gap: 10px; }`","`.choices button { font-size: 20px; padding: 12px 16px; border: none; border-radius: 16px; cursor: pointer; transition: transform 0.15s; }`","`.choices button:hover { transform: translateY(-4px); }`"],
  tip:"`translateY(-4px)` moves it UP 4px. Negative = up, positive = down.",
  checks:[cssIs('.choices','display','flex',"Give `.choices` `display: flex;`"),[a=>px(a.css(a.$('.choices'),'columnGap'))>=4,"Give `.choices` a `gap` (at least 4px), like `gap: 10px;`"],[anyHover(/\.choices button:hover/,'transform'),"Add `.choices button:hover { transform: translateY(-4px); }`"]]}),
 C('r7','The arena',{why:"Two big round hands facing off — this is where the action happens!",
  todo:"Make `.arena` a centered flex row with a gap. Make `.hand` a 100px white circle with a big emoji (at least 40px), centered with flex. Make `#result` at least 22px and bold.",
  job:"Give `.arena` `display: flex;`. Give `.hand` `font-size: 56px;` (40px or more) and `border-radius: 50%;`. Give `#result` `font-size: 24px;` (22px or more).",
  snippet:D`
   .arena {
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 16px;
     margin: 20px 0 8px;
   }
   .hand {
     width: 100px;
     height: 100px;
     border-radius: 50%;
     background: white;
     font-size: 56px;
     display: flex;
     align-items: center;
     justify-content: center;
     box-shadow: 0 6px 16px rgba(49, 46, 129, 0.15);
   }
   .vs {
     font-weight: bold;
     color: #a855f7;
   }
   #result {
     min-height: 32px;
     font-size: 24px;
     font-weight: bold;
   }`,
  hints:["`.arena { display: flex; align-items: center; justify-content: center; gap: 16px; }`","`.hand { width: 100px; height: 100px; border-radius: 50%; background: white; font-size: 56px; }`","Center the emoji in the hand with `display: flex; align-items: center; justify-content: center;` — and `#result { font-size: 24px; font-weight: bold; }`."],
  tip:"`min-height` on `#result` stops the page jumping when the message changes.",
  checks:[cssIs('.arena','display','flex',"Give `.arena` `display: flex;`"),cssMin('.hand','fontSize',40,"Make `.hand` at least 40px: `font-size: 56px;`"),cssMin('.hand','borderTopLeftRadius',1,"Make `.hand` round: `border-radius: 50%;`"),cssMin('#result','fontSize',22,"Make `#result` at least 22px: `font-size: 24px;`")]}),
 C('r8','Scoreboard style',{why:"Scores in little white cards look like a real game screen.",
  todo:"Make `.score` a centered flex row with a gap. Give `.score p` a white background, rounded corners and padding. Style `.score b` big and `#again` as a purple button with `cursor: pointer`.",
  job:"Give `.score` `display: flex;`. Give `.score p` `background: white;` and a `border-radius`. Give `#again` `cursor: pointer;`.",
  snippet:D`
   .score {
     display: flex;
     justify-content: center;
     gap: 12px;
   }
   .score p {
     margin: 0;
     min-width: 64px;
     padding: 8px 14px;
     border-radius: 14px;
     background: white;
   }
   .score b {
     font-size: 26px;
     color: #7c3aed;
   }
   #again {
     margin-top: 16px;
     padding: 10px 20px;
     border: none;
     border-radius: 99px;
     background: #a855f7;
     color: white;
     font-size: 16px;
     cursor: pointer;
   }`,
  hints:["`.score { display: flex; justify-content: center; gap: 12px; }`","`.score p { background: white; border-radius: 14px; padding: 8px 14px; margin: 0; }`","`#again { background: #a855f7; color: white; border: none; border-radius: 99px; padding: 10px 20px; cursor: pointer; }`"],
  tip:"Same corner roundness everywhere makes a design look \"together\".",
  checks:[cssIs('.score','display','flex',"Give `.score` `display: flex;`"),cssNot('.score p','backgroundColor',CLEAR,"Give `.score p` `background: white;`"),cssMin('.score p','borderTopLeftRadius',1,"Round `.score p` with `border-radius`."),cssIs('#again','cursor','pointer',"Give `#again` `cursor: pointer;`")]}),
 J('r9','Show your move',{why:"Click a move and your hand appears in the arena.",
  learn:"`emoji[you]` looks up a word in the `emoji` object. If `you` is `'rock'`, you get `'✊'`. The `play(you)` function gets the move name as an **input**.",
  todo:"Make an `emoji` object for the three moves. Write `play(you)` that puts `emoji[you]` into `#you`. Give every `.choices button` a click listener that calls `play(btn.id)`.",
  job:"Make `const emoji = { rock: '✊', paper: '✋', scissors: '✌️' };`. Write `play(you)` to put `emoji[you]` in `#you`. Each `.choices button` click runs `play(btn.id)`.",
  snippet:D`
   const emoji = { rock: '✊', paper: '✋', scissors: '✌️' };

   function play(you) {
     document.querySelector('#you').textContent = emoji[you];
   }

   document.querySelectorAll('.choices button').forEach(btn => {
     btn.addEventListener('click', () => play(btn.id));
   });`,
  hints:["Start your script: `<script>` at the very bottom, then the `emoji` object.","`function play(you) { document.querySelector('#you').textContent = emoji[you]; }`","`document.querySelectorAll('.choices button').forEach(btn => { btn.addEventListener('click', () => play(btn.id)); });`"],
  tip:"One function, three buttons. Writing code once and reusing it is what pros do.",
  checks:[clickThen('#paper',a=>a.$('#you').textContent.includes('✋'),"Clicking **Paper** should show ✋ in `#you`."),clickThen('#rock',a=>a.$('#you').textContent.includes('✊'),"Clicking **Rock** should show ✊ in `#you`.")]}),
 E('r10','The robot picks',{why:"Robo-Rex needs to choose a move too — randomly, so it's fair.",
  learn:"`Math.random()` gives a random number from 0 up to (not including) 1. Times 3 and `Math.floor` gives 0, 1 or 2 — a random spot in the `moves` list.",
  todo:"Inside `play()`, under the `#you` line, pick a random move from `['rock', 'paper', 'scissors']` and show its emoji in `#cpu`.",
  job:"Inside `play()`, under the `#you` line: `const moves = ['rock', 'paper', 'scissors'];`, pick `moves[Math.floor(Math.random() * 3)]`, and show its emoji in `#cpu`.",
  where:"Inside your `play()` function, on new lines under `document.querySelector('#you').textContent = emoji[you];`.",
  snippet:D`
   function play(you) {
     document.querySelector('#you').textContent = emoji[you];
     const moves = ['rock', 'paper', 'scissors'];
     const cpu = moves[Math.floor(Math.random() * 3)];
     document.querySelector('#cpu').textContent = emoji[cpu];
   }`,
  apply:addAfter("document.querySelector('#you').textContent = emoji[you];",D`
   const moves = ['rock', 'paper', 'scissors'];
   const cpu = moves[Math.floor(Math.random() * 3)];
   document.querySelector('#cpu').textContent = emoji[cpu];`),
  hints:["`const moves = ['rock', 'paper', 'scissors'];`","`const cpu = moves[Math.floor(Math.random() * 3)];`","`document.querySelector('#cpu').textContent = emoji[cpu];`"],
  tip:"Computers can't really be random — they use clever maths that LOOKS random. It's called pseudo-random.",
  checks:[[a=>{const seen=new Set();for(let i=0;i<24;i++){a.click('#rock');const c=noDash(a.$('#cpu').textContent);if(!['✊','✋','✌'].includes(c.trim()))return false;seen.add(c);}return seen.size>=2;},"After each move, `#cpu` should show a random hand: ✊, ✋ or ✌️."]]}),
 E('r11','Who wins?',{why:"Now the big question: who won the round?",
  learn:"`beats` says what each move beats: rock beats scissors. So if `beats[you] === cpu`, you win! Same move = draw. Anything else = the robot wins.",
  todo:"Add `const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };` at the bottom. Inside `play()`, under the `#cpu` line, work out `outcome` (`'win'`, `'lose'` or `'draw'`) and show a message in `#result`.",
  job:"Work out `outcome`: same move = `'draw'`, `beats[you] === cpu` = `'win'`, else `'lose'`. Show **You win!**, **Robot wins!** or **It's a draw!** in `#result`.",
  where:"Inside `play()`, under `document.querySelector('#cpu').textContent = emoji[cpu];`. The `beats` line goes at the very bottom of your script.",
  snippet:D`
   function play(you) {
     document.querySelector('#you').textContent = emoji[you];
     const moves = ['rock', 'paper', 'scissors'];
     const cpu = moves[Math.floor(Math.random() * 3)];
     document.querySelector('#cpu').textContent = emoji[cpu];
     let outcome = 'lose';
     if (you === cpu) {
       outcome = 'draw';
     } else if (beats[you] === cpu) {
       outcome = 'win';
     }
     const messages = { win: 'You win! 🎉', lose: 'Robot wins! 🤖', draw: "It's a draw! 🤝" };
     document.querySelector('#result').textContent = messages[outcome];
   }

   const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };`,
  apply:addAfter("document.querySelector('#cpu').textContent = emoji[cpu];",D`
   let outcome = 'lose';
   if (you === cpu) {
     outcome = 'draw';
   } else if (beats[you] === cpu) {
     outcome = 'win';
   }
   const messages = { win: 'You win! 🎉', lose: 'Robot wins! 🤖', draw: "It's a draw! 🤝" };
   document.querySelector('#result').textContent = messages[outcome];`,{tail:"const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };"}),
  hints:["Start with `let outcome = 'lose';` — then change it if it's a draw or a win.","`if (you === cpu) { outcome = 'draw'; } else if (beats[you] === cpu) { outcome = 'win'; }`","`const messages = { win: 'You win! 🎉', lose: 'Robot wins! 🤖', draw: \"It's a draw! 🤝\" };` then put `messages[outcome]` in `#result`."],
  tip:"`\"It's a draw!\"` uses double quotes because the words have an apostrophe `'` inside.",
  checks:[[a=>{const beat={'✊':'✌','✋':'✊','✌':'✋'};for(let i=0;i<15;i++){a.click('#'+['rock','paper','scissors'][i%3]);const y=noDash(a.$('#you').textContent).trim(),c=noDash(a.$('#cpu').textContent).trim(),r=T(a,'#result');const exp=y===c?'draw':beat[y]===c?'you win':'robot wins';if(!r.includes(exp))return false;}return true;},"`#result` should say **You win!**, **Robot wins!** or **It's a draw!** — and be right every time."]]}),
 E('r12','Keep score',{why:"Every round should add a point to the right score.",
  learn:"`score[outcome]` picks the right number: `score.win`, `score.lose` or `score.draw`. And the ids `#win`, `#lose`, `#draw` match the outcome words — so `'#' + outcome` finds the right box!",
  todo:"Add `const score = { win: 0, lose: 0, draw: 0 };` at the bottom. Inside `play()`, under the `#result` line, add 1 to `score[outcome]` and show it in `'#' + outcome`.",
  job:"Add `const score = { win: 0, lose: 0, draw: 0 };` at the bottom. At the end of `play()`, add 1 to `score[outcome]` and show it in `document.querySelector('#' + outcome)`.",
  where:"Inside `play()`, under `document.querySelector('#result').textContent = messages[outcome];`. The `score` line goes at the very bottom of your script.",
  snippet:D`
   // inside play(), at the end:
     score[outcome] = score[outcome] + 1;
     document.querySelector('#' + outcome).textContent = score[outcome];

   // at the very bottom:
   const score = { win: 0, lose: 0, draw: 0 };`,
  apply:addAfter("document.querySelector('#result').textContent = messages[outcome];",D`
   score[outcome] = score[outcome] + 1;
   document.querySelector('#' + outcome).textContent = score[outcome];`,{tail:"const score = { win: 0, lose: 0, draw: 0 };"}),
  hints:["At the bottom: `const score = { win: 0, lose: 0, draw: 0 };`","Inside play, last lines: `score[outcome] = score[outcome] + 1;`","Then: `document.querySelector('#' + outcome).textContent = score[outcome];`"],
  tip:"Naming the ids the same as the outcomes saved us writing three `if`s. Good names = less code!",
  checks:[[a=>{const n={win:0,lose:0,draw:0};for(let i=0;i<12;i++){a.click('#'+['rock','paper','scissors'][i%3]);const r=T(a,'#result');n[r.includes('you win')?'win':r.includes('robot')?'lose':'draw']++;}return ['win','lose','draw'].every(k=>T(a,'#'+k)===String(n[k]));},"Each round should add 1 to the right score: `#win`, `#lose` or `#draw`."]]}),
 J('r13','New game',{why:"Lost badly? Wipe the scoreboard and start fresh.",
  todo:"When `#again` is clicked: set all three scores to 0 and show them, put ❔ back in both hands, and put **Make your move!** back in `#result`.",
  job:"On `#again` click: set `score.win`, `score.lose`, `score.draw` to 0 and show them. Put **❔** in `#you` and `#cpu`, and **Make your move!** in `#result`.",
  snippet:D`
   document.querySelector('#again').addEventListener('click', () => {
     for (const key in score) {
       score[key] = 0;
       document.querySelector('#' + key).textContent = 0;
     }
     document.querySelector('#you').textContent = '❔';
     document.querySelector('#cpu').textContent = '❔';
     document.querySelector('#result').textContent = 'Make your move!';
   });`,
  learn:"`for (const key in score)` visits every name in the object: `'win'`, then `'lose'`, then `'draw'`.",
  hints:["`document.querySelector('#again').addEventListener('click', () => { … });`","`for (const key in score) { score[key] = 0; document.querySelector('#' + key).textContent = 0; }`","Then put `'❔'` in `#you` and `#cpu`, and `'Make your move!'` in `#result`."],
  tip:"Challenge: make it \"first to 5 wins\" and show a big trophy 🏆!",
  checks:[[a=>{clicks(a,'#rock',4);a.click('#again');return ['win','lose','draw'].every(k=>T(a,'#'+k)==='0');},"**New game** should set all three scores back to **0**."],[a=>T(a,'#result').includes('make your move')&&a.$('#you').textContent.includes('❔'),"**New game** should put **❔** back in the hands and **Make your move!** in `#result`."]]})
 ]},

/* ================================================================== 5. HABIT TRACKER */
{id:'pf_habits',cat:'full',emoji:'🌱',title:'Habit Tracker',mentor:'Coach Zara',
 blurb:'A 7-day tick grid for your habits, with 🔥 streaks and gold rows for perfect weeks.',
 intro:"Coach Zara says tiny habits done every day make you a superstar. You'll build a weekly habit tracker: add your own habits, tick a box each day, and watch your 🔥 streak grow. JavaScript will **build the whole grid for you** with a loop!",
 steps:[
 H('h1','The title',{why:"Name your tracker and say what it does.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (the name) and a `<p>` (what it does) inside.",
  snippet:D`
   <header>
     <h1>🌱 My Habit Tracker</h1>
     <p>Tick a box every day you do your habit. Keep the 🔥 streak going!</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>🌱 My Habit Tracker</h1>` and a `<p>`."],
  tip:"Good habits for kids: reading, drinking water, tidying up, being kind, brushing teeth!",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('h2','Add-a-habit box',{why:"Everyone has different habits, so let people type their own.",
  todo:"Add `<div class=\"add\">` with `<input id=\"habitName\">` (with a placeholder) and `<button id=\"addBtn\">➕ Add</button>`.",
  job:"Make `<div class=\"add\">` with an `<input id=\"habitName\">` and a `<button id=\"addBtn\">`.",
  snippet:D`
   <div class="add">
     <input id="habitName" placeholder="New habit, like 🦷 Brush teeth">
     <button id="addBtn">➕ Add</button>
   </div>`,
  hints:["`<div class=\"add\">` … `</div>`","Inside: `<input id=\"habitName\" placeholder=\"New habit\">` and `<button id=\"addBtn\">➕ Add</button>`"],
  tip:"A `placeholder` is grey hint text that disappears when you start typing.",
  checks:[has('.add input#habitName',"Add `<input id=\"habitName\">` inside `<div class=\"add\">`."),has('.add button#addBtn',"Add `<button id=\"addBtn\">` inside `<div class=\"add\">`.")]}),
 H('h3','The week header',{why:"The grid needs labels: the habit name, the 7 days, and the streak.",
  learn:"We only write the TOP row by hand. The habit rows will go in the empty `<div id=\"habits\">` — JavaScript will build them!",
  todo:"Add `<div class=\"days\">` with 9 `<span>`s: **Habit**, **M T W T F S S**, and **🔥**. Then an empty `<div id=\"habits\"></div>`.",
  job:"Make `<div class=\"days\">` with 9 `<span>`s: `Habit`, then `M`, `T`, `W`, `T`, `F`, `S`, `S`, then `🔥`. Under it add an empty `<div id=\"habits\"></div>`.",
  snippet:D`
   <div class="days">
     <span>Habit</span>
     <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
     <span>🔥</span>
   </div>
   <div id="habits"></div>`,
  hints:["`<div class=\"days\">` … `</div>` with spans inside.","`<span>Habit</span>` then one `<span>` per day: `<span>M</span><span>T</span>` … then `<span>🔥</span>`.","After it: `<div id=\"habits\"></div>`"],
  tip:"You can put several tags on one line. HTML doesn't mind!",
  checks:[[a=>a.$$('.days span').length===9,"Put exactly 9 `<span>`s inside `<div class=\"days\">`: Habit, 7 days, 🔥."],has('div#habits',"Add an empty `<div id=\"habits\"></div>` under the days.")]}),
 H('h4','Weekly summary',{why:"A little message at the bottom cheers you on.",
  todo:"Add `<p id=\"summary\">Tick a box to start!</p>` and `<button id=\"clear\">🧽 Start a new week</button>`.",
  job:"Add `<p id=\"summary\">Tick a box to start!</p>` and a `<button id=\"clear\">`.",
  snippet:D`
   <p id="summary">Tick a box to start!</p>
   <button id="clear">🧽 Start a new week</button>`,
  hints:["Two lines: a paragraph and a button.","`<p id=\"summary\">Tick a box to start!</p>` and `<button id=\"clear\">🧽 Start a new week</button>`"],
  tip:"Encouraging words really do help people keep going. Be your own coach!",
  checks:[hasText('#summary','tick a box',"Add `<p id=\"summary\">Tick a box to start!</p>`."),has('button#clear',"Add `<button id=\"clear\">`.")]}),
 C('h5','Fresh colours',{why:"Green means growing. Let's make it feel fresh and healthy.",
  learn:BODY_LEARN,
  todo:"Style `body`: a font, padding, a dark green text colour and a gradient background.",
  job:"In `body { }` add a `font-family` and `background: linear-gradient(160deg, #ecfccb, #e0f2fe);` (any light colours).",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: Verdana, sans-serif;
     color: #14532d;
     background: linear-gradient(160deg, #ecfccb, #e0f2fe);
   }`,
  hints:["`<style>` then `body { }` then `</style>`.","`font-family: Verdana, sans-serif; color: #14532d; background: linear-gradient(160deg, #ecfccb, #e0f2fe);`"],
  tip:"`160deg` tilts the gradient a little. Try `90deg` for left-to-right.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],grad('body',"Give `body` a gradient background.")]}),
 C('h6','The add box',{why:"Make the add box look like a neat search bar.",
  todo:"Make `.add` a flex row with a `gap`. Give `.add input` `flex: 1`, padding, a border and rounded corners. Style `button` green with `cursor: pointer`.",
  job:"Give `.add` `display: flex;` and `gap: 8px;`. Give `.add input` a `border-radius`. Give `button` `cursor: pointer;`.",
  snippet:D`
   .add {
     display: flex;
     gap: 8px;
     margin: 12px 0;
   }
   .add input {
     flex: 1;
     padding: 10px;
     border: 2px solid #bbf7d0;
     border-radius: 12px;
     font-size: 16px;
   }
   button {
     padding: 10px 14px;
     border: none;
     border-radius: 12px;
     background: #22c55e;
     color: white;
     font-weight: bold;
     cursor: pointer;
   }`,
  hints:["`.add { display: flex; gap: 8px; }`","`.add input { flex: 1; padding: 10px; border: 2px solid #bbf7d0; border-radius: 12px; }`","`button { background: #22c55e; color: white; border: none; border-radius: 12px; padding: 10px 14px; cursor: pointer; }`"],
  tip:"`flex: 1;` means \"take all the spare space\". The input stretches, the button stays small.",
  checks:[cssIs('.add','display','flex',"Give `.add` `display: flex;`"),cssMin('.add input','borderTopLeftRadius',1,"Round the input: `border-radius: 12px;`"),cssIs('button','cursor','pointer',"Give `button` `cursor: pointer;`")]}),
 C('h7','The grid columns',{why:"The header and every habit row must line up in the same 9 columns.",
  learn:"`minmax(80px, 1fr)` = \"at least 80px, but grow to fill space\" (for the habit name). `repeat(7, 26px)` = seven 26px columns for the days. Then one 34px column for 🔥.",
  todo:"Give `.days, .habit` `display: grid` with `grid-template-columns: minmax(80px, 1fr) repeat(7, 26px) 34px;`, a small gap and centered text. Make `.days` bold.",
  job:"Give `.days, .habit` `display: grid;` and `grid-template-columns: minmax(80px, 1fr) repeat(7, 26px) 34px;` (9 columns).",
  snippet:D`
   .days, .habit {
     display: grid;
     grid-template-columns: minmax(80px, 1fr) repeat(7, 26px) 34px;
     gap: 4px;
     align-items: center;
     text-align: center;
     padding: 6px 8px;
   }
   .days {
     font-weight: bold;
     color: #15803d;
   }
   .days span:first-child, .habit span {
     text-align: left;
   }`,
  hints:["The comma in `.days, .habit` styles both at once.","`.days, .habit { display: grid; grid-template-columns: minmax(80px, 1fr) repeat(7, 26px) 34px; gap: 4px; }`"],
  tip:"Habit rows don't exist yet, but this rule is ready and waiting for them!",
  checks:[cssIs('.days','display','grid',"Give `.days, .habit` `display: grid;`"),[a=>gridCols(a,'.days').length===9,"Use `grid-template-columns: minmax(80px, 1fr) repeat(7, 26px) 34px;` — that makes 9 columns."]]}),
 C('h8','Habit rows',{why:"Each habit row should be a white card, with chunky green tick boxes.",
  learn:"`accent-color` changes the colour of checkboxes. `.habit.done` will be a gold row when you tick all 7 days!",
  todo:"Give `.habit` a white background, rounded corners, margin and a shadow. Give `.habit input` a size and an `accent-color`. Colour `.streak`, and give `.habit.done` a gold background.",
  job:"Give `.habit` `background: white;`. Give `.habit input` `accent-color: #22c55e;`. Give `.habit.done` `background: #fef9c3;` (any gold colour).",
  snippet:D`
   .habit {
     margin: 6px 0;
     border-radius: 14px;
     background: white;
     box-shadow: 0 2px 8px rgba(20, 83, 45, 0.08);
   }
   .habit input {
     width: 20px;
     height: 20px;
     margin: auto;
     accent-color: #22c55e;
   }
   .streak {
     color: #f97316;
   }
   .habit.done {
     background: #fef9c3;
   }`,
  hints:["`.habit { background: white; border-radius: 14px; margin: 6px 0; }`","`.habit input { width: 20px; height: 20px; accent-color: #22c55e; }`","`.streak { color: #f97316; }` and `.habit.done { background: #fef9c3; }`"],
  tip:"You still won't see rows — JavaScript builds them in the next step. Get ready!",
  checks:[[anyHover(/^\.habit$/,'backgroundColor'),"Add a `.habit { background: white; }` rule."],[anyHover(/\.habit input/,'accentColor'),"Add `.habit input { accent-color: #22c55e; }`"],[anyHover(/\.habit\.done/,'backgroundColor'),"Add `.habit.done { background: #fef9c3; }`"]]}),
 J('h9','Build the rows with a loop',{why:"Typing 21 checkboxes by hand is boring. Let a loop do it!",
  learn:"• `for (let day = 1; day <= 7; day++) { … }` runs the code 7 times.\n• `document.createElement('div')` makes a brand-new element.\n• `list.appendChild(row)` puts it on the page.",
  todo:"Make a `habits` list with 3 habits. Write `addRow(name)` that makes a `div.habit` with a `<span>` name, 7 checkboxes (using a loop) and `<b class=\"streak\">0</b>`. Run it for every habit.",
  job:"Make a `habits` list with 3 habits. Write `addRow(name)`: a `div` with class `habit`, holding the name, 7 checkboxes from a `for` loop, and `<b class=\"streak\">0</b>`.",
  snippet:D`
   const habits = ['📚 Read', '💧 Drink water', '🧹 Tidy my room'];
   const list = document.querySelector('#habits');

   function addRow(name) {
     const row = document.createElement('div');
     row.className = 'habit';
     let html = '<span>' + name + '</span>';
     for (let day = 1; day <= 7; day++) {
       html = html + '<input type="checkbox">';
     }
     html = html + '<b class="streak">0</b>';
     row.innerHTML = html;
     list.appendChild(row);
   }

   habits.forEach(addRow);`,
  hints:["Start your script: `<script>` at the very bottom. Then `const habits = ['📚 Read', '💧 Drink water', '🧹 Tidy my room'];`","In `addRow`: `const row = document.createElement('div'); row.className = 'habit';`","The loop: `for (let day = 1; day <= 7; day++) { html = html + '<input type=\"checkbox\">'; }` — then `row.innerHTML = html; list.appendChild(row);`"],
  tip:"Change `7` to `30` and you'd have a whole month. That's why loops are so powerful!",
  checks:[[a=>a.$$('#habits .habit').length>=3,"Make at least 3 `.habit` rows inside `#habits`."],[a=>{const r=a.$$('#habits .habit');return r.length&&r.every(x=>x.querySelectorAll('input[type="checkbox"]').length===7);},"Each row needs exactly 7 checkboxes — use a `for` loop."],[a=>{const r=a.$$('#habits .habit');return r.length&&r.every(x=>x.querySelector('.streak'));},"End each row with `<b class=\"streak\">0</b>`."]]}),
 J('h10','Add your own habit',{why:"Now people can add any habit they like.",
  learn:"`input.value` is what's typed in the box. `.trim()` cuts off spaces at the ends. `return` stops the function early if the box is empty.",
  todo:"When `#addBtn` is clicked: if `#habitName` is empty, stop. Otherwise call `addRow()` with what was typed, then empty the box.",
  job:"On `#addBtn` click: if `#habitName` is empty, `return;`. Else run `addRow(input.value)` and set `input.value = '';`.",
  snippet:D`
   document.querySelector('#addBtn').addEventListener('click', () => {
     const input = document.querySelector('#habitName');
     if (input.value.trim() === '') return;
     addRow(input.value);
     input.value = '';
   });`,
  hints:["`document.querySelector('#addBtn').addEventListener('click', () => { … });`","`const input = document.querySelector('#habitName'); if (input.value.trim() === '') return;`","`addRow(input.value); input.value = '';`"],
  tip:"See how `addRow` gets used twice — once for the starting habits and once for new ones? Functions are reusable!",
  checks:[[a=>{a.type('#habitName','🧘 Stretch');a.click('#addBtn');return a.$$('#habits .habit').some(r=>T(a,r).includes('stretch'));},"Type a habit and click **Add**: a new row with that name should appear."],[a=>a.$('#habitName').value==='',"After adding, empty the box: `input.value = '';`"],[a=>{const n=a.$$('#habits .habit').length;a.click('#addBtn');return a.$$('#habits .habit').length===n;},"Clicking **Add** with an empty box should NOT add a row."]]}),
 J('h11','Count the streak',{why:"A streak is how many days IN A ROW you did it. That's the 🔥 number!",
  learn:"• Walk along the boxes: ticked → `run` goes up. Not ticked → `run` goes back to 0.\n• `best = Math.max(best, run)` remembers the longest run.\n• One `change` listener on `#habits` hears EVERY checkbox, even in rows added later.",
  todo:"Write `countStreak(row)` that finds the longest run of ticked boxes and shows it in `.streak`. Listen for `change` on `list` and call it for the row that changed.",
  job:"Write `countStreak(row)`: count ticked boxes in a row (`run`), reset to 0 on an empty box, keep the biggest in `best`. Show `best` in `.streak`. Run it on `change` of `list`.",
  snippet:D`
   function countStreak(row) {
     let run = 0;
     let best = 0;
     row.querySelectorAll('input').forEach(box => {
       if (box.checked) {
         run = run + 1;
       } else {
         run = 0;
       }
       best = Math.max(best, run);
     });
     row.querySelector('.streak').textContent = best;
   }

   list.addEventListener('change', e => {
     countStreak(e.target.closest('.habit'));
   });`,
  hints:["`function countStreak(row) { let run = 0; let best = 0; … }`","`row.querySelectorAll('input').forEach(box => { if (box.checked) { run = run + 1; } else { run = 0; } best = Math.max(best, run); });`","`list.addEventListener('change', e => { countStreak(e.target.closest('.habit')); });`"],
  tip:"`e.target` is the box that was clicked. `.closest('.habit')` walks up to find its row.",
  checks:[[a=>{const b=a.$$('#habits .habit')[0].querySelectorAll('input');[0,1,2].forEach(i=>a.click(b[i]));return T(a,a.$$('#habits .habit .streak')[0])==='3';},"Tick Monday, Tuesday and Wednesday: the 🔥 streak should show **3**."],[a=>{const b=a.$$('#habits .habit')[0].querySelectorAll('input');a.click(b[4]);a.click(b[1]);return T(a,a.$$('#habits .habit .streak')[0])==='1';},"Un-tick Tuesday: the streak should drop to **1** (the boxes aren't in a row any more)."]]}),
 J('h12','Perfect week gold',{why:"All 7 days ticked? That row deserves to shine gold!",
  learn:"`classList.toggle('done', ticked === 7)` adds `done` when the test is true, and removes it when it's false.",
  todo:"Add another `change` listener on `list`: count the ticked boxes in the row, and toggle the `done` class when there are 7.",
  job:"Add another `change` listener on `list`. Count the row's ticked boxes with `querySelectorAll('input:checked').length`. Use `row.classList.toggle('done', ticked === 7);`.",
  snippet:D`
   list.addEventListener('change', e => {
     const row = e.target.closest('.habit');
     const ticked = row.querySelectorAll('input:checked').length;
     row.classList.toggle('done', ticked === 7);
   });`,
  hints:["`const row = e.target.closest('.habit');`","`const ticked = row.querySelectorAll('input:checked').length;`","`row.classList.toggle('done', ticked === 7);`"],
  tip:"Your CSS `.habit.done` rule from earlier finally gets used!",
  checks:[[a=>{const r=a.$$('#habits .habit')[0];r.querySelectorAll('input').forEach(b=>a.click(b));return r.classList.contains('done');},"Tick all 7 boxes in a row: it should get the class `done`."],[a=>{const r=a.$$('#habits .habit')[0];a.click(r.querySelector('input'));return !r.classList.contains('done');},"Un-tick one box: `done` should come off again."]]}),
 J('h13','Weekly summary',{why:"Tell people how many boxes they've ticked this week. Every tick counts!",
  todo:"Add one more `change` listener on `list` that counts ALL ticked boxes in `#habits` and writes **You ticked 5 boxes this week! ⭐** into `#summary`.",
  job:"Add a `change` listener on `list`. Count `#habits input:checked`, then make `#summary` say **You ticked 5 boxes this week! ⭐** (with the real number).",
  snippet:D`
   list.addEventListener('change', () => {
     const total = document.querySelectorAll('#habits input:checked').length;
     document.querySelector('#summary').textContent = 'You ticked ' + total + ' boxes this week! ⭐';
   });`,
  hints:["`const total = document.querySelectorAll('#habits input:checked').length;`","`document.querySelector('#summary').textContent = 'You ticked ' + total + ' boxes this week! ⭐';`"],
  tip:"Try a different message when `total` is big — like \"Habit hero! 🦸\" for 15 or more.",
  checks:[[a=>{const b=a.$$('#habits input');a.click(b[0]);a.click(b[8]);return T(a,'#summary').includes('you ticked 2');},"Tick 2 boxes: `#summary` should say **You ticked 2 boxes this week! ⭐**"]]}),
 J('h14','Start a new week',{why:"Monday again! Clear the ticks but keep your habits.",
  todo:"When `#clear` is clicked: untick every box, run `countStreak()` on every row and remove `done`, and set `#summary` to **New week, new streaks! 💪**.",
  job:"On `#clear` click: set every `#habits input` to `checked = false`. For each `.habit`: `countStreak(row)` and remove `done`. `#summary` says **New week, new streaks! 💪**",
  snippet:D`
   document.querySelector('#clear').addEventListener('click', () => {
     document.querySelectorAll('#habits input').forEach(box => {
       box.checked = false;
     });
     document.querySelectorAll('.habit').forEach(row => {
       countStreak(row);
       row.classList.remove('done');
     });
     document.querySelector('#summary').textContent = 'New week, new streaks! 💪';
   });`,
  hints:["`document.querySelectorAll('#habits input').forEach(box => { box.checked = false; });`","`document.querySelectorAll('.habit').forEach(row => { countStreak(row); row.classList.remove('done'); });`","Then set `#summary`'s `textContent` to `'New week, new streaks! 💪'`."],
  tip:"Challenge: save the ticks with `localStorage` so they're still there tomorrow!",
  checks:[[a=>{const b=a.$$('#habits input');[0,1,2].forEach(i=>a.click(b[i]));a.click('#clear');return a.$$('#habits input:checked').length===0;},"**Start a new week** should untick every box."],[a=>a.$$('#habits .streak').every(s=>T(a,s)==='0'),"After clearing, every 🔥 streak should show **0** — run `countStreak(row)` on each row."],[a=>T(a,'#summary').includes('new week'),"`#summary` should say **New week, new streaks! 💪**"]]})
 ]},

/* ================================================================== 6. MEMORY MATCH */
{id:'pf_memory',cat:'full',emoji:'🧠',title:'Memory Match',mentor:'Captain Kiko, puzzle pirate',
 blurb:'Shuffle 12 emoji cards, flip two at a time, find every pair in as few moves as you can.',
 intro:"Captain Kiko hid 6 pairs of animal cards face-down. Can you find them all? You'll build a memory game: JavaScript **shuffles** the cards, flips them when clicked, checks for pairs, counts your moves and cheers when you win.",
 steps:[
 H('m1','The title',{why:"Every game starts with a title screen.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (the game name) and a `<p>` (how to play) inside.",
  snippet:D`
   <header>
     <h1>🧠 Memory Match</h1>
     <p>Flip two cards. Same animal? It's a pair! Find all 6.</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>🧠 Memory Match</h1>` and a `<p>`."],
  tip:"Short instructions are best. Players want to play, not read!",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('m2','Moves and pairs',{why:"Players want to know how they're doing.",
  todo:"Add `<div class=\"stats\">` with `<p>Moves: <b id=\"moves\">0</b></p>` and `<p>Pairs: <b id=\"pairs\">0</b> / 6</p>`.",
  job:"Make `<div class=\"stats\">` with two `<p>`s: one holds `<b id=\"moves\">0</b>`, the other `<b id=\"pairs\">0</b>`.",
  snippet:D`
   <div class="stats">
     <p>Moves: <b id="moves">0</b></p>
     <p>Pairs: <b id="pairs">0</b> / 6</p>
   </div>`,
  hints:["`<div class=\"stats\">` … `</div>`","`<p>Moves: <b id=\"moves\">0</b></p>` and `<p>Pairs: <b id=\"pairs\">0</b> / 6</p>`"],
  tip:"`<b>` makes text bold, and the id lets JavaScript change just the number.",
  checks:[[a=>T(a,'.stats #moves')==='0',"Add `<b id=\"moves\">0</b>` inside `<div class=\"stats\">`."],[a=>T(a,'.stats #pairs')==='0',"Add `<b id=\"pairs\">0</b>` inside `<div class=\"stats\">`."]]}),
 H('m3','The board',{why:"An empty board for the cards — JavaScript will deal them!",
  todo:"Add an empty `<div id=\"board\"></div>`, an empty `<p id=\"msg\"></p>` and `<button id=\"restart\">🔄 New game</button>`.",
  job:"Add an empty `<div id=\"board\"></div>`, an empty `<p id=\"msg\"></p>`, and a `<button id=\"restart\">`.",
  snippet:D`
   <div id="board"></div>
   <p id="msg"></p>
   <button id="restart">🔄 New game</button>`,
  hints:["Three lines: a div, a paragraph, a button.","`<div id=\"board\"></div>` · `<p id=\"msg\"></p>` · `<button id=\"restart\">🔄 New game</button>`"],
  tip:"Why not write the 12 cards in HTML? Because they need to be in a NEW random order every game.",
  checks:[has('div#board',"Add `<div id=\"board\"></div>`."),has('p#msg',"Add `<p id=\"msg\"></p>`."),has('button#restart',"Add `<button id=\"restart\">`.")]}),
 C('m4','Page style',{why:"A colourful, playful page for a playful game.",
  learn:BODY_LEARN,
  todo:"Style `body` (font, centered text, padding, gradient). Make `.stats` a centered flex row with a gap.",
  job:"Give `body` a `font-family`, `text-align: center;` and a `linear-gradient` background. Give `.stats` `display: flex;` and `justify-content: center;`.",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: 'Trebuchet MS', sans-serif;
     text-align: center;
     color: #4c1d95;
     background: linear-gradient(135deg, #fdf2f8, #ede9fe);
   }
   .stats {
     display: flex;
     justify-content: center;
     gap: 16px;
     font-size: 18px;
   }`,
  hints:["`body { font-family: 'Trebuchet MS', sans-serif; text-align: center; background: linear-gradient(135deg, #fdf2f8, #ede9fe); }`","`.stats { display: flex; justify-content: center; gap: 16px; }`"],
  tip:"Pastel colours (soft pinks and purples) feel calm — good for a thinking game.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],grad('body',"Give `body` a gradient background."),cssIs('.stats','display','flex',"Give `.stats` `display: flex;`"),cssIs('.stats','justifyContent','center',"Give `.stats` `justify-content: center;`")]}),
 C('m5','A 4-column board',{why:"12 cards fit perfectly in 4 columns and 3 rows.",
  todo:"Make `#board` a grid with `grid-template-columns: repeat(4, 60px);`, a `gap`, and `justify-content: center`.",
  job:"Give `#board` `display: grid;`, `grid-template-columns: repeat(4, 60px);` (4 columns), `gap: 8px;` and `justify-content: center;`.",
  snippet:D`
   #board {
     display: grid;
     grid-template-columns: repeat(4, 60px);
     gap: 8px;
     justify-content: center;
     margin: 16px 0;
   }`,
  hints:["`#board { display: grid; }`","Add `grid-template-columns: repeat(4, 60px); gap: 8px; justify-content: center;`"],
  tip:"`repeat(4, 60px)` is a short way to write `60px 60px 60px 60px`.",
  checks:[cssIs('#board','display','grid',"Give `#board` `display: grid;`"),[a=>gridCols(a,'#board').length===4,"Make 4 columns: `grid-template-columns: repeat(4, 60px);`"],[a=>px(a.css(a.$('#board'),'columnGap'))>=4,"Give `#board` a `gap` (at least 4px), like `gap: 8px;`"]]}),
 C('m6','Card backs and faces',{why:"Face-down cards get a cool pattern. Open cards turn white. Matched cards turn green!",
  learn:"The cards don't exist yet, so you can't see this — but the rules will be ready. `.card.open` means a card that also has the class `open`.",
  todo:"Style `.card`: height 60px, no border, rounded, big font, `cursor: pointer`, a gradient background and a transition. Add `.card:hover` (lift), `.card.open` (white) and `.card.matched` (light green).",
  job:"Give `.card` `background: linear-gradient(135deg, #c084fc, #60a5fa);`. Add `.card.open { background: white; }` and `.card.matched { background: #bbf7d0; }`.",
  snippet:D`
   .card {
     height: 60px;
     border: none;
     border-radius: 12px;
     font-size: 30px;
     cursor: pointer;
     background: linear-gradient(135deg, #c084fc, #60a5fa);
     box-shadow: 0 4px 0 rgba(76, 29, 149, 0.15);
     transition: transform 0.2s;
   }
   .card:hover {
     transform: translateY(-3px);
   }
   .card.open {
     background: white;
   }
   .card.matched {
     background: #bbf7d0;
   }`,
  hints:["`.card { height: 60px; border: none; border-radius: 12px; font-size: 30px; cursor: pointer; }`","Add `background: linear-gradient(135deg, #c084fc, #60a5fa); transition: transform 0.2s;` to `.card`.","`.card.open { background: white; }` and `.card.matched { background: #bbf7d0; }`"],
  tip:"Green for matched is a clear signal: \"you're done with these two\".",
  checks:[[anyHover(/^\.card$/,'backgroundImage'),"Give `.card` a gradient: `background: linear-gradient(135deg, #c084fc, #60a5fa);`"],[anyHover(/\.card\.open/,'backgroundColor'),"Add `.card.open { background: white; }`"],[anyHover(/\.card\.matched/,'backgroundColor'),"Add `.card.matched { background: #bbf7d0; }`"]]}),
 C('m7','Message and button',{why:"The win message should be big and the New game button easy to press.",
  todo:"Make `#msg` at least 20px and bold with a `min-height`. Style `#restart` with padding, rounded corners, a colour and `cursor: pointer`.",
  job:"Give `#msg` `font-size: 22px;` (20px or more). Give `#restart` a `border-radius` and `cursor: pointer;`.",
  snippet:D`
   #msg {
     min-height: 30px;
     font-size: 22px;
     font-weight: bold;
     color: #7c3aed;
   }
   #restart {
     padding: 10px 20px;
     border: none;
     border-radius: 99px;
     background: #8b5cf6;
     color: white;
     font-size: 16px;
     cursor: pointer;
   }`,
  hints:["`#msg { min-height: 30px; font-size: 22px; font-weight: bold; }`","`#restart { padding: 10px 20px; border: none; border-radius: 99px; background: #8b5cf6; color: white; cursor: pointer; }`"],
  tip:"`border-radius: 99px` is a trick for perfect pill-shaped buttons.",
  checks:[cssMin('#msg','fontSize',20,"Make `#msg` at least 20px: `font-size: 22px;`"),cssMin('#restart','borderTopLeftRadius',1,"Round `#restart` with `border-radius`."),cssIs('#restart','cursor','pointer',"Give `#restart` `cursor: pointer;`")]}),
 J('m8','Shuffle and deal',{why:"Time to deal the cards — 6 animals, each twice, in a random order.",
  learn:"• `[...emojis, ...emojis]` makes a new list with the animals TWICE (the `...` spreads a list out).\n• `deck.sort(() => Math.random() - 0.5)` is a quick trick to shuffle.\n• `card.dataset.emoji = emoji` hides the animal inside the card for later.",
  todo:"Make an `emojis` list of 6 animals. Write `newGame()`: empty the board, make a doubled and shuffled `deck`, and add a `<button class=\"card\">` for each one with `dataset.emoji` set. Call `newGame()`.",
  job:"Make a list of **6** animal emoji. In `newGame()`, double it with `[...emojis, ...emojis]`, shuffle it, and add a `button` with class `card` and `dataset.emoji` for each.",
  snippet:D`
   const emojis = ['🐶', '🐱', '🦊', '🐸', '🐵', '🦄'];
   const board = document.querySelector('#board');

   function newGame() {
     board.innerHTML = '';
     const deck = [...emojis, ...emojis];
     deck.sort(() => Math.random() - 0.5);
     deck.forEach(emoji => {
       const card = document.createElement('button');
       card.className = 'card';
       card.dataset.emoji = emoji;
       board.appendChild(card);
     });
   }

   newGame();`,
  hints:["Start your script: `<script>` at the very bottom. Then `const emojis = ['🐶', '🐱', '🦊', '🐸', '🐵', '🦄'];`","In `newGame()`: `board.innerHTML = ''; const deck = [...emojis, ...emojis]; deck.sort(() => Math.random() - 0.5);`","`deck.forEach(emoji => { const card = document.createElement('button'); card.className = 'card'; card.dataset.emoji = emoji; board.appendChild(card); });`"],
  tip:"The cards are blank on purpose — the animal is hidden in `data-emoji`. No cheating!",
  checks:[[a=>a.$$('#board .card').length===12,"Deal exactly 12 cards (6 animals × 2) into `#board`."],[a=>{const c={};a.$$('#board .card').forEach(x=>c[x.dataset.emoji]=(c[x.dataset.emoji]||0)+1);const v=Object.values(c);return v.length===6&&v.every(n=>n===2);},"Each of the 6 animals should be on exactly 2 cards (use `[...emojis, ...emojis]` and `dataset.emoji`)."]]}),
 J('m9','Flip a card',{why:"Click a card to turn it over and see the animal.",
  learn:"`e.target.closest('.card')` finds the card you clicked. One listener on the whole `board` handles all 12 cards!",
  todo:"Make `let open = [];`. Listen for clicks on `board`: if it's a card that isn't open yet, add the `open` class, show its emoji, and push it into `open`.",
  job:"Make `let open = [];`. On a `board` click: find the card, stop if it already has `open`. Else add class `open`, show `card.dataset.emoji`, and `open.push(card);`.",
  snippet:D`
   let open = [];

   board.addEventListener('click', e => {
     const card = e.target.closest('.card');
     if (!card || card.classList.contains('open')) return;
     card.classList.add('open');
     card.textContent = card.dataset.emoji;
     open.push(card);
   });`,
  hints:["`let open = [];` then `board.addEventListener('click', e => { … });`","`const card = e.target.closest('.card'); if (!card || card.classList.contains('open')) return;`","`card.classList.add('open'); card.textContent = card.dataset.emoji; open.push(card);`"],
  tip:"`!card` means \"there's no card\" — like if you click the gap between cards.",
  checks:[[a=>{const c=a.$('#board .card');if(!c)return false;a.click(c);return c.classList.contains('open')&&c.textContent===c.dataset.emoji;},"Clicking a card should add the class `open` and show its emoji."]]}),
 J('m10','Pair or not?',{why:"When two cards are open, check if they match. If not, flip them back after a moment.",
  learn:"• `const [first, second] = open;` takes the two cards out of the list.\n• `setTimeout(() => { … }, 800)` waits 800 milliseconds (almost 1 second), then runs the code — so you can see the cards before they hide.",
  todo:"Make `let pairs = 0;`. Add another `board` click listener: when `open` has 2 cards, take them out and empty `open`. If their emoji match, add `matched` to both and update `#pairs`. If not, flip them back after 800ms.",
  job:"Add another `board` click listener. When `open.length` is 2: same `dataset.emoji` → add class `matched`, add 1 to `pairs`, show it in `#pairs`. Different → after 800ms remove `open` and the emoji.",
  snippet:D`
   let pairs = 0;

   board.addEventListener('click', () => {
     if (open.length < 2) return;
     const [first, second] = open;
     open = [];
     if (first.dataset.emoji === second.dataset.emoji) {
       first.classList.add('matched');
       second.classList.add('matched');
       pairs = pairs + 1;
       document.querySelector('#pairs').textContent = pairs;
     } else {
       setTimeout(() => {
         first.classList.remove('open');
         second.classList.remove('open');
         first.textContent = '';
         second.textContent = '';
       }, 800);
     }
   });`,
  hints:["`if (open.length < 2) return;` then `const [first, second] = open; open = [];`","Match: `if (first.dataset.emoji === second.dataset.emoji) { first.classList.add('matched'); … pairs = pairs + 1; }`","No match: `else { setTimeout(() => { first.classList.remove('open'); … first.textContent = ''; … }, 800); }`"],
  tip:"Matched cards keep their `open` class, so clicking them again does nothing. Clever!",
  checks:[[a=>{const cs=a.$$('#board .card');const f=cs[0],s=cs.slice(1).find(x=>x.dataset.emoji===f.dataset.emoji);if(!f||!s)return false;a.click(f);a.click(s);return f.classList.contains('matched')&&s.classList.contains('matched');},"Clicking two cards with the same animal should give both the class `matched`."],[a=>T(a,'#pairs')==='1',"After a match, `#pairs` should show **1**."],[a=>{const cs=a.$$('#board .card:not(.matched)');const f=cs[0],s=cs.find(x=>x.dataset.emoji!==f.dataset.emoji);a.click(f);a.click(s);return !f.classList.contains('matched')&&T(a,'#pairs')==='1';},"Two DIFFERENT animals should not get `matched`."]]}),
 E('m11','Count the moves',{why:"Every time you turn over two cards, that's one move. Fewer moves = better memory!",
  todo:"Add `let moves = 0;` at the bottom of your script. In your pair-check listener, right under `open = [];`, add 1 to `moves` and show it in `#moves`.",
  job:"Add `let moves = 0;` at the bottom. In the pair listener, under `open = [];`, add `moves = moves + 1;` and show `moves` in `#moves`.",
  where:"Inside your second `board` listener, on new lines under `open = [];`. The `let moves = 0;` line goes at the very bottom of your script.",
  snippet:D`
   // under open = []; in the pair listener:
     moves = moves + 1;
     document.querySelector('#moves').textContent = moves;

   // at the very bottom:
   let moves = 0;`,
  apply:addAfter(/(?<=^[ \t]*)open = \[\];/m,D`
   moves = moves + 1;
   document.querySelector('#moves').textContent = moves;`,{tail:"let moves = 0;"}),
  hints:["At the bottom of your script: `let moves = 0;`","Under `open = [];`: `moves = moves + 1;`","Then: `document.querySelector('#moves').textContent = moves;`"],
  tip:"A perfect game is 6 moves — but that needs a LOT of luck!",
  checks:[[a=>{const cs=a.$$('#board .card');a.click(cs[0]);a.click(cs[1]);return T(a,'#moves')==='1';},"Turning over 2 cards should make `#moves` show **1**."],[a=>{const cs=a.$$('#board .card:not(.open)');a.click(cs[0]);a.click(cs[1]);return T(a,'#moves')==='2';},"Two more cards should make it **2**."]]}),
 J('m12','You won!',{why:"Find all 6 pairs and the game should celebrate!",
  todo:"Add one more `board` click listener: if `pairs === emojis.length`, put **🎉 You won in 12 moves!** (with the real number) into `#msg`.",
  job:"Add another `board` click listener. If `pairs === emojis.length`, make `#msg` say **🎉 You won in 12 moves!** using the real `moves` number.",
  snippet:D`
   board.addEventListener('click', () => {
     if (pairs === emojis.length) {
       document.querySelector('#msg').textContent = '🎉 You won in ' + moves + ' moves!';
     }
   });`,
  hints:["`board.addEventListener('click', () => { … });`","`if (pairs === emojis.length) { document.querySelector('#msg').textContent = '🎉 You won in ' + moves + ' moves!'; }`"],
  tip:"Using `emojis.length` instead of `6` means it still works if you add more animals later.",
  checks:[[a=>{const cs=a.$$('#board .card');const done=new Set();cs.forEach(f=>{if(done.has(f))return;const s=cs.find(x=>x!==f&&x.dataset.emoji===f.dataset.emoji);done.add(f);done.add(s);a.click(f);a.click(s);});return /you won/.test(T(a,'#msg'))&&T(a,'#msg').includes('6');},"Find all 6 pairs: `#msg` should say **🎉 You won in 6 moves!** (with the real number)."]]}),
 J('m13','New game',{why:"Play again! Deal a new shuffled board and reset everything.",
  todo:"When `#restart` is clicked: call `newGame()`, empty `open`, set `pairs` and `moves` to 0, show them, and empty `#msg`.",
  job:"On `#restart` click: `newGame();`, `open = [];`, `pairs = 0;`, `moves = 0;`. Show 0 in `#pairs` and `#moves`, and empty `#msg`.",
  snippet:D`
   document.querySelector('#restart').addEventListener('click', () => {
     newGame();
     open = [];
     pairs = 0;
     moves = 0;
     document.querySelector('#pairs').textContent = 0;
     document.querySelector('#moves').textContent = 0;
     document.querySelector('#msg').textContent = '';
   });`,
  hints:["`document.querySelector('#restart').addEventListener('click', () => { … });`","Inside: `newGame(); open = []; pairs = 0; moves = 0;`","Then show the zeros in `#pairs` and `#moves`, and set `#msg` to `''`."],
  tip:"Challenge your family! Whoever wins in the fewest moves is the Memory Master. 🏆",
  checks:[[a=>{const cs=a.$$('#board .card');const f=cs[0],s=cs.slice(1).find(x=>x.dataset.emoji===f.dataset.emoji);a.click(f);a.click(s);a.click('#restart');return T(a,'#pairs')==='0'&&T(a,'#moves')==='0';},"**New game** should set `#pairs` and `#moves` back to **0**."],[a=>a.$$('#board .card').length===12&&!a.$('#board .card.open'),"**New game** should deal 12 fresh face-down cards (call `newGame()`)."]]})
 ]},

/* ================================================================== 7. BALLOON WORD GUESS */
{id:'pf_balloon',cat:'full',emoji:'🎈',title:'Balloon Word Guess',mentor:'Benny, balloon seller',
 blurb:'Guess the secret word letter by letter before the balloon runs out of air.',
 intro:"Benny's balloon has a slow leak! Every wrong letter lets out a puff of air. You'll build a word-guessing game: a big balloon that **shrinks**, a hidden word made of blanks, 26 letter buttons made by a loop, and a happy (or whooshy) ending.",
 steps:[
 H('w1','The title',{why:"Set the scene for your game.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (the game name) and a `<p>` (the goal) inside.",
  snippet:D`
   <header>
     <h1>🎈 Balloon Word Guess</h1>
     <p>Guess the word before the balloon runs out of air!</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>🎈 Balloon Word Guess</h1>` and a `<p>`."],
  tip:"A clear goal in one sentence helps players start fast.",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('w2','The balloon',{why:"The star of the game: a balloon, and how much air is left.",
  todo:"Add `<div id=\"balloon\">🎈</div>` and `<p class=\"air\">Air left: <b id=\"lives\">6</b></p>`.",
  job:"Add `<div id=\"balloon\">🎈</div>`. Under it add a `<p>` with `<b id=\"lives\">6</b>` inside.",
  snippet:D`
   <div id="balloon">🎈</div>
   <p class="air">Air left: <b id="lives">6</b></p>`,
  hints:["`<div id=\"balloon\">🎈</div>`","`<p class=\"air\">Air left: <b id=\"lives\">6</b></p>`"],
  tip:"6 lives is a fair number for kids. You could make it 8 for easier, or 4 for harder.",
  checks:[has('#balloon',"Add `<div id=\"balloon\">🎈</div>`."),[a=>T(a,'#lives')==='6',"Add `<b id=\"lives\">6</b>` with the number **6**."]]}),
 H('w3','The secret word',{why:"A hint, and a place for the blanks: _ _ _ _ _",
  todo:"Add `<p id=\"hint\">Hint: ???</p>` and an empty `<div id=\"word\"></div>`.",
  job:"Add `<p id=\"hint\">Hint: ???</p>` and an empty `<div id=\"word\"></div>`.",
  snippet:D`
   <p id="hint">Hint: ???</p>
   <div id="word"></div>`,
  hints:["Two lines.","`<p id=\"hint\">Hint: ???</p>` and `<div id=\"word\"></div>`"],
  tip:"The word box is empty because JavaScript picks a secret word each game.",
  checks:[has('p#hint',"Add `<p id=\"hint\">Hint: ???</p>`."),has('div#word',"Add `<div id=\"word\"></div>`.")]}),
 H('w4','Letters and ending',{why:"A place for the letter buttons, a message, and a button for a new word.",
  todo:"Add an empty `<div id=\"letters\"></div>`, an empty `<p id=\"msg\"></p>` and `<button id=\"newWord\">🎈 New word</button>`.",
  job:"Add an empty `<div id=\"letters\"></div>`, an empty `<p id=\"msg\"></p>`, and a `<button id=\"newWord\">`.",
  snippet:D`
   <div id="letters"></div>
   <p id="msg"></p>
   <button id="newWord">🎈 New word</button>`,
  hints:["Three lines: a div, a paragraph, a button.","`<div id=\"letters\"></div>` · `<p id=\"msg\"></p>` · `<button id=\"newWord\">🎈 New word</button>`"],
  tip:"26 letter buttons by hand? No way. A loop will make them in 5 lines!",
  checks:[has('div#letters',"Add `<div id=\"letters\"></div>`."),has('p#msg',"Add `<p id=\"msg\"></p>`."),has('button#newWord',"Add `<button id=\"newWord\">`.")]}),
 C('w5','Sky colours',{why:"A balloon belongs in a sunny sky!",
  learn:BODY_LEARN,
  todo:"Style `body`: a font, centered text, padding and a sky gradient.",
  job:"Give `body` a `font-family`, `text-align: center;` and `background: linear-gradient(#bae6fd, #fef3c7);` (sky to sunshine — any light colours).",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: 'Trebuchet MS', sans-serif;
     text-align: center;
     color: #1e3a8a;
     background: linear-gradient(#bae6fd, #fef3c7);
   }`,
  hints:["`<style>` then `body { }` then `</style>`.","`font-family: 'Trebuchet MS', sans-serif; text-align: center; background: linear-gradient(#bae6fd, #fef3c7);`"],
  tip:"Blue at the top, yellow at the bottom — like the sky over a sunny beach.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],cssIs('body','textAlign','center',"Add `text-align: center;` to `body`."),grad('body',"Give `body` a gradient background.")]}),
 C('w6','A big balloon',{why:"Make the balloon HUGE, and get it ready to shrink smoothly.",
  todo:"Give `#balloon` a font size of at least 80px and `transition: transform 0.4s`. Make `#lives` red and bigger.",
  job:"Give `#balloon` `font-size: 110px;` (80px or more) and `transition: transform 0.4s;`.",
  snippet:D`
   #balloon {
     font-size: 110px;
     transition: transform 0.4s;
   }
   #lives {
     font-size: 22px;
     color: #e11d48;
   }`,
  hints:["`#balloon { font-size: 110px; }`","Add `transition: transform 0.4s;` to `#balloon`. And `#lives { font-size: 22px; color: #e11d48; }`"],
  tip:"Emoji are text, so `font-size` makes them bigger — no picture files needed!",
  checks:[cssMin('#balloon','fontSize',80,"Make `#balloon` at least 80px: `font-size: 110px;`"),transOn('#balloon',"Give `#balloon` `transition: transform 0.4s;`")]}),
 C('w7','The blanks',{why:"Spread the letters out so you can count the blanks.",
  learn:"`letter-spacing` adds space between letters. A **monospace** font makes every letter the same width — perfect for blanks!",
  todo:"Give `#word` a big font (at least 28px), bold, a monospace font and `letter-spacing` of at least 4px. Make `#hint` grey and italic.",
  job:"Give `#word` `font-size: 36px;` (28px or more), `letter-spacing: 8px;` (4px or more) and `font-family: 'Courier New', monospace;`.",
  snippet:D`
   #word {
     margin: 10px 0;
     font-size: 36px;
     font-weight: bold;
     font-family: 'Courier New', monospace;
     letter-spacing: 8px;
   }
   #hint {
     color: #64748b;
     font-style: italic;
   }`,
  hints:["`#word { font-size: 36px; font-weight: bold; letter-spacing: 8px; }`","Add `font-family: 'Courier New', monospace;`. And `#hint { color: #64748b; font-style: italic; }`"],
  tip:"Typewriters used monospace letters. That's where Courier comes from!",
  checks:[cssMin('#word','fontSize',28,"Make `#word` at least 28px: `font-size: 36px;`"),cssMin('#word','letterSpacing',4,"Give `#word` `letter-spacing: 8px;` (at least 4px).")]}),
 C('w8','Letter buttons',{why:"The letter keys should be neat squares in rows, and fade out once used.",
  learn:"`flex-wrap: wrap;` lets the buttons flow onto the next row, like words in a book. `:disabled` styles a button that can't be pressed any more.",
  todo:"Make `#letters` a flex box with `flex-wrap: wrap`, centered, with a gap and a `max-width`. Style `#letters button` as 36px rounded squares. Add `#letters button:disabled { opacity: 0.3; }`.",
  job:"Give `#letters` `display: flex;` and `flex-wrap: wrap;`. Give `#letters button` `width: 36px;` and `height: 36px;`. Add `#letters button:disabled { opacity: 0.3; }`.",
  snippet:D`
   #letters {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     gap: 6px;
     max-width: 380px;
     margin: 0 auto;
   }
   #letters button {
     width: 36px;
     height: 36px;
     border: none;
     border-radius: 10px;
     background: white;
     color: #1e3a8a;
     font-weight: bold;
     box-shadow: 0 3px 0 #93c5fd;
     cursor: pointer;
   }
   #letters button:disabled {
     opacity: 0.3;
     cursor: default;
   }
   #msg {
     font-size: 20px;
     font-weight: bold;
   }`,
  hints:["`#letters { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; max-width: 380px; margin: 0 auto; }`","`#letters button { width: 36px; height: 36px; border: none; border-radius: 10px; background: white; cursor: pointer; }`","`#letters button:disabled { opacity: 0.3; }`"],
  tip:"`opacity: 0.3` = 30% visible. Used letters fade, so you know not to pick them again.",
  checks:[cssIs('#letters','display','flex',"Give `#letters` `display: flex;`"),cssIs('#letters','flexWrap','wrap',"Give `#letters` `flex-wrap: wrap;`"),[anyHover(/#letters button$/,'width'),"Add `#letters button { width: 36px; height: 36px; }`"],[anyHover(/#letters button:disabled/,'opacity'),"Add `#letters button:disabled { opacity: 0.3; }`"]]}),
 J('w9','Pick a secret word',{why:"The computer picks a secret word and shows one blank for each letter.",
  learn:"• `for (const letter of secret)` visits each letter of the word.\n• `guessed.includes(letter) ? letter : '_'` means \"if we guessed it, show it — otherwise show a blank\".",
  todo:"Make a `words` list of `{ word, hint }` objects (CAPITAL letters!), plus `secret`, `guessed` and `lives`. Write `showWord()` and `newRound()`, then call `newRound();`.",
  job:"Make a `words` list like `{ word: 'TIGER', hint: 'a stripy animal' }` (CAPITALS). Write `showWord()` to show blanks, and `newRound()` to pick a word. Call `newRound();`.",
  snippet:D`
   const words = [
     { word: 'TIGER', hint: 'a stripy animal' },
     { word: 'PIZZA', hint: 'a yummy food' },
     { word: 'ROCKET', hint: 'it flies to space' },
     { word: 'RAINBOW', hint: 'colours in the sky' },
     { word: 'PENGUIN', hint: 'a bird that cannot fly' }
   ];
   let secret = '';
   let guessed = [];
   let lives = 6;

   function showWord() {
     let shown = '';
     for (const letter of secret) {
       shown = shown + (guessed.includes(letter) ? letter : '_');
     }
     document.querySelector('#word').textContent = shown;
   }

   function newRound() {
     const pick = words[Math.floor(Math.random() * words.length)];
     secret = pick.word;
     guessed = [];
     lives = 6;
     document.querySelector('#hint').textContent = 'Hint: ' + pick.hint;
     document.querySelector('#lives').textContent = lives;
     document.querySelector('#msg').textContent = '';
     showWord();
   }

   newRound();`,
  hints:["Start your script: `<script>` at the very bottom, then the `words` list and `let secret = ''; let guessed = []; let lives = 6;`.","`showWord()`: loop `for (const letter of secret)` and add `guessed.includes(letter) ? letter : '_'` to `shown`.","`newRound()`: pick a random word, set `secret`, `guessed = []`, `lives = 6`, show the hint, then `showWord();`."],
  tip:"Use words your little brother or sister knows, so the whole family can play!",
  checks:[[a=>/^_{3,12}$/.test(a.$('#word').textContent.replace(/\s/g,'')),"`#word` should show one `_` for each letter of the secret word."],[a=>T(a,'#hint').startsWith('hint:')&&!T(a,'#hint').includes('???'),"`#hint` should show the word's hint, like **Hint: a stripy animal**."]]}),
 J('w10','Make 26 letter buttons',{why:"A whole alphabet of buttons — made by a loop in 5 lines!",
  todo:"Loop over `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`. For each letter, make a `<button>`, set its text, and add it to `#letters`.",
  job:"Loop `for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')`. Make a `button` for each with `textContent = letter`, and add it to `#letters` with `appendChild`.",
  snippet:D`
   const letters = document.querySelector('#letters');

   for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
     const btn = document.createElement('button');
     btn.textContent = letter;
     letters.appendChild(btn);
   }`,
  hints:["`const letters = document.querySelector('#letters');`","`for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') { … }`","Inside: `const btn = document.createElement('button'); btn.textContent = letter; letters.appendChild(btn);`"],
  tip:"A string is like a list of letters, so `for … of` works on it too.",
  checks:[[a=>a.$$('#letters button').length===26,"Make exactly 26 buttons inside `#letters`, one for each letter A–Z."],[a=>{const b=a.$$('#letters button');return b.length===26&&b[0].textContent.trim()==='A'&&b[25].textContent.trim()==='Z';},"The buttons should say **A** to **Z** in order."]]}),
 J('w11','Guess a letter',{why:"Click a letter: if it's in the word, it appears. If not, the balloon loses air!",
  learn:"`secret.includes('T')` is `true` if the word has a T in it. `!` flips it: `!secret.includes(…)` means \"the word does NOT have it\".",
  todo:"Listen for clicks on `letters`. If a button was clicked (and lives are left): disable it, push its letter into `guessed`, take 1 life if the word doesn't have it, then `showWord()`.",
  job:"On `letters` click: stop unless a `BUTTON` was clicked and `lives` is more than 0. Disable it, `guessed.push(…)`, lose 1 life if `secret` doesn't include it, then `showWord();`.",
  snippet:D`
   letters.addEventListener('click', e => {
     const btn = e.target;
     if (btn.tagName !== 'BUTTON' || lives === 0) return;
     btn.disabled = true;
     guessed.push(btn.textContent);
     if (!secret.includes(btn.textContent)) {
       lives = lives - 1;
       document.querySelector('#lives').textContent = lives;
     }
     showWord();
   });`,
  hints:["`letters.addEventListener('click', e => { const btn = e.target; … });`","`if (btn.tagName !== 'BUTTON' || lives === 0) return; btn.disabled = true; guessed.push(btn.textContent);`","`if (!secret.includes(btn.textContent)) { lives = lives - 1; document.querySelector('#lives').textContent = lives; }` then `showWord();`"],
  tip:"`btn.disabled = true` greys the button out — and your CSS fades it too!",
  checks:[[a=>{const s=G(a,'secret');if(!s)return false;const b=a.$$('#letters button').find(x=>x.textContent.trim()===s[0]);if(!b)return false;a.click(b);return a.$('#word').textContent.includes(s[0])&&b.disabled;},"Clicking a letter that IS in the word should show it in `#word` and disable the button."],[a=>{const s=G(a,'secret')||'';const b=a.$$('#letters button').find(x=>!s.includes(x.textContent.trim()));a.click(b);return T(a,'#lives')==='5';},"Clicking a letter that is NOT in the word should take 1 life: `#lives` shows **5**."]]}),
 J('w12','The balloon shrinks',{why:"Make it exciting: every wrong guess, the balloon gets smaller!",
  learn:"`scale(1)` is full size. With 6 lives, `0.4 + lives / 10` is `1.0`. With 0 lives it's `0.4` — a sad little balloon.",
  todo:"Add another `letters` click listener that sets the balloon's `style.transform` to `'scale(' + (0.4 + lives / 10) + ')'`.",
  job:"Make `const balloon = document.querySelector('#balloon');`. Add another `letters` click listener that sets `balloon.style.transform` to `'scale(' + (0.4 + lives / 10) + ')'`.",
  snippet:D`
   const balloon = document.querySelector('#balloon');

   letters.addEventListener('click', () => {
     balloon.style.transform = 'scale(' + (0.4 + lives / 10) + ')';
   });`,
  hints:["`const balloon = document.querySelector('#balloon');`","`letters.addEventListener('click', () => { … });`","`balloon.style.transform = 'scale(' + (0.4 + lives / 10) + ')';`"],
  tip:"The `transition` from your CSS makes the balloon shrink smoothly, like air whooshing out.",
  checks:[[a=>{const s=G(a,'secret')||'';const b=a.$$('#letters button').find(x=>!s.includes(x.textContent.trim()));if(!b)return false;a.click(b);const m=/scale\(([\d.]+)\)/.exec(a.$('#balloon').style.transform);return !!m&&+m[1]<1;},"A wrong letter should shrink `#balloon` with `style.transform = 'scale(…)'`."]]}),
 J('w13','Win or lose',{why:"Every game needs an ending — a happy one or a whooshy one!",
  learn:"If `#word` has no `_` left, every letter was found. `includes('_')` checks for blanks.",
  todo:"Add another `letters` click listener. If there are no `_` left, show **🎉 You saved the balloon!** If `lives === 0`, show **💨 Out of air!** and change the balloon to 💨. Either way, disable all letters.",
  job:"Add a `letters` click listener. No `_` left → `#msg` says **🎉 You saved the balloon!** Lives 0 → **💨 Out of air!** and balloon becomes 💨. Game over → disable all letter buttons.",
  snippet:D`
   letters.addEventListener('click', () => {
     const msg = document.querySelector('#msg');
     const won = !document.querySelector('#word').textContent.includes('_');
     if (won) {
       msg.textContent = '🎉 You saved the balloon! The word was ' + secret + '.';
     } else if (lives === 0) {
       msg.textContent = '💨 Out of air! The word was ' + secret + '.';
       balloon.textContent = '💨';
     }
     if (won || lives === 0) {
       letters.querySelectorAll('button').forEach(b => b.disabled = true);
     }
   });`,
  hints:["`const won = !document.querySelector('#word').textContent.includes('_');`","`if (won) { msg.textContent = '🎉 You saved the balloon! …'; } else if (lives === 0) { msg.textContent = '💨 Out of air! …'; balloon.textContent = '💨'; }`","`if (won || lives === 0) { letters.querySelectorAll('button').forEach(b => b.disabled = true); }`"],
  tip:"`||` means OR. The game is over if you won OR you ran out of lives.",
  checks:[[a=>{const s=G(a,'secret')||'';const wrong=a.$$('#letters button').filter(x=>!s.includes(x.textContent.trim())).slice(0,6);if(wrong.length<6)return false;wrong.forEach(b=>a.click(b));return T(a,'#msg').includes('out of air');},"Run out of lives: `#msg` should say **💨 Out of air!**"],[a=>{G(a,'newRound()');a.$$('#letters button').forEach(b=>b.disabled=false);const s=G(a,'secret')||'';if(!s)return false;[...new Set(s)].forEach(L=>a.click(a.$$('#letters button').find(x=>x.textContent.trim()===L)));return T(a,'#msg').includes('you saved the balloon');},"Find every letter: `#msg` should say **🎉 You saved the balloon!**"],[a=>a.$$('#letters button').every(b=>b.disabled),"When the game ends, disable all the letter buttons."]]}),
 J('w14','New word',{why:"Play again with a brand-new word and a fresh balloon.",
  todo:"When `#newWord` is clicked: call `newRound()`, put 🎈 back, set the balloon to `scale(1)`, and enable all letter buttons again.",
  job:"On `#newWord` click: `newRound();`, `balloon.textContent = '🎈';`, `balloon.style.transform = 'scale(1)';`, and set every letter button's `disabled` to `false`.",
  snippet:D`
   document.querySelector('#newWord').addEventListener('click', () => {
     newRound();
     balloon.textContent = '🎈';
     balloon.style.transform = 'scale(1)';
     letters.querySelectorAll('button').forEach(b => b.disabled = false);
   });`,
  hints:["`document.querySelector('#newWord').addEventListener('click', () => { … });`","`newRound(); balloon.textContent = '🎈'; balloon.style.transform = 'scale(1)';`","`letters.querySelectorAll('button').forEach(b => b.disabled = false);`"],
  tip:"Add your own words to the list — your pet's name, your street, your favourite food!",
  checks:[[a=>{const s=G(a,'secret')||'';const b=a.$$('#letters button').find(x=>!s.includes(x.textContent.trim()));if(!b)return false;a.click(b);a.click('#newWord');return T(a,'#lives')==='6'&&a.$$('#letters button').every(x=>!x.disabled);},"**New word** should give 6 lives again and enable all the letter buttons."],[a=>a.$('#balloon').textContent.includes('🎈')&&/^_+$/.test(a.$('#word').textContent.trim()),"**New word** should show 🎈 and a fresh row of blanks."]]})
 ]},

/* ================================================================== 8. SHOPPING LIST */
{id:'pf_shop',cat:'full',emoji:'🛒',title:'Shopping List',mentor:'Grandpa Joe',
 blurb:'Add items with prices, remove them, and watch the total add itself up.',
 intro:"Grandpa Joe always forgets the milk — and how much he spent! You'll build a shopping list app: type an item and its price, press **Add** (or Enter), remove things you don't need, and see the number of items and the total price update by themselves.",
 steps:[
 H('s1','The title',{why:"A clear title so Grandpa knows what this page is for.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (the name) and a `<p>` (what it does) inside.",
  snippet:D`
   <header>
     <h1>🛒 Shopping List</h1>
     <p>Add what you need and watch the total grow.</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>🛒 Shopping List</h1>` and a `<p>`."],
  tip:"You could call it \"Grandpa's Groceries\" — any name works.",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('s2','The add box',{why:"Two boxes — what to buy and how much — and an Add button.",
  learn:"`<input type=\"number\">` only lets people type numbers. `step=\"0.01\"` allows cents. A `<label for=\"item\">` is linked to the input with `id=\"item\"`.",
  todo:"Add `<div class=\"add\">` with a label + `<input id=\"item\">`, a label + `<input id=\"price\" type=\"number\">`, and `<button id=\"addBtn\">➕ Add</button>`.",
  job:"Make `<div class=\"add\">` with `<input id=\"item\">`, `<input id=\"price\" type=\"number\">` and `<button id=\"addBtn\">`. Give each input a `<label for=\"…\">`.",
  snippet:D`
   <div class="add">
     <label for="item">Item</label>
     <input id="item" placeholder="e.g. Apples">
     <label for="price">Price $</label>
     <input id="price" type="number" min="0" step="0.01" placeholder="2.50">
     <button id="addBtn">➕ Add</button>
   </div>`,
  hints:["`<div class=\"add\">` … `</div>`","`<label for=\"item\">Item</label>` then `<input id=\"item\" placeholder=\"e.g. Apples\">`","`<label for=\"price\">Price $</label>` + `<input id=\"price\" type=\"number\" min=\"0\" step=\"0.01\">` + `<button id=\"addBtn\">➕ Add</button>`"],
  tip:"On a phone, `type=\"number\"` opens the number keyboard. Handy!",
  checks:[has('.add input#item',"Add `<input id=\"item\">` inside `<div class=\"add\">`."),has('.add input#price[type="number"]',"Add `<input id=\"price\" type=\"number\">`."),has('.add button#addBtn',"Add `<button id=\"addBtn\">`."),[a=>labelLinked(a,'.add'),"Link a label to its input: `<label for=\"item\">` and `id=\"item\"`."]]}),
 H('s3','The list',{why:"An empty list, and a friendly message for when there's nothing in it.",
  todo:"Add an empty `<ul id=\"list\"></ul>` and `<p id=\"empty\">Your list is empty. Add something yummy! 🥕</p>`.",
  job:"Add an empty `<ul id=\"list\"></ul>`. Under it add `<p id=\"empty\">` that says **Your list is empty**.",
  snippet:D`
   <ul id="list"></ul>
   <p id="empty">Your list is empty. Add something yummy! 🥕</p>`,
  hints:["`<ul id=\"list\"></ul>` — `ul` is a list with bullet points.","`<p id=\"empty\">Your list is empty. Add something yummy! 🥕</p>`"],
  tip:"Good apps always say something nice when there's nothing to show. It's called an **empty state**.",
  checks:[has('ul#list',"Add `<ul id=\"list\"></ul>`."),hasText('#empty','your list is empty',"Add `<p id=\"empty\">Your list is empty…</p>`.")]}),
 H('s4','Totals',{why:"How many things, and how much money? That's what Grandpa really wants to know.",
  todo:"Add `<div class=\"totals\">` with `<p>Items: <b id=\"count\">0</b></p>` and `<p>Total: <b id=\"total\">$0.00</b></p>`. Then `<button id=\"clearAll\">🧹 Clear list</button>`.",
  job:"Make `<div class=\"totals\">` with `<b id=\"count\">0</b>` and `<b id=\"total\">$0.00</b>`. Then add `<button id=\"clearAll\">`.",
  snippet:D`
   <div class="totals">
     <p>Items: <b id="count">0</b></p>
     <p>Total: <b id="total">$0.00</b></p>
   </div>
   <button id="clearAll">🧹 Clear list</button>`,
  hints:["`<div class=\"totals\">` with two paragraphs.","`<p>Items: <b id=\"count\">0</b></p>` and `<p>Total: <b id=\"total\">$0.00</b></p>`, then `<button id=\"clearAll\">🧹 Clear list</button>`"],
  tip:"Starting the total at `$0.00` shows people what the number will look like.",
  checks:[[a=>T(a,'.totals #count')==='0',"Add `<b id=\"count\">0</b>` inside `<div class=\"totals\">`."],hasText('.totals #total','$0.00',"Add `<b id=\"total\">$0.00</b>` inside `<div class=\"totals\">`."),has('button#clearAll',"Add `<button id=\"clearAll\">`.")]}),
 C('s5','A neat page',{why:"A narrow, centered page looks like a real phone app — even on a big screen.",
  learn:"`max-width: 480px; margin: 0 auto;` stops the page getting too wide and keeps it in the middle.",
  todo:"Style `body`: a font, `max-width: 480px`, `margin: 0 auto`, padding and a gradient background.",
  job:"Give `body` a `font-family`, `max-width: 480px;`, `margin: 0 auto;` and `background: linear-gradient(160deg, #ecfeff, #fef9c3);` (any light colours).",
  snippet:D`
   body {
     max-width: 480px;
     margin: 0 auto;
     padding: 16px;
     font-family: Verdana, sans-serif;
     color: #164e63;
     background: linear-gradient(160deg, #ecfeff, #fef9c3);
   }`,
  hints:["`<style>` then `body { }` then `</style>`.","`max-width: 480px; margin: 0 auto; padding: 16px; font-family: Verdana, sans-serif;`","`background: linear-gradient(160deg, #ecfeff, #fef9c3);`"],
  tip:"The page background still fills the whole screen, even though the body is only 480px wide. CSS magic!",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],cssPx('body','maxWidth',480,"Give `body` `max-width: 480px;`"),grad('body',"Give `body` a gradient background.")]}),
 C('s6','The add box',{why:"Make the inputs and button big and friendly to tap.",
  todo:"Make `.add` a flex box (with wrap and a gap) on a white rounded card. Style `input` (padding, border, rounded) and `button` (colour, no border, rounded, `cursor: pointer`).",
  job:"Give `.add` `display: flex;` and `gap: 8px;`. Give `input` a `border-radius`. Give `button` `cursor: pointer;`.",
  snippet:D`
   .add {
     display: flex;
     flex-wrap: wrap;
     align-items: center;
     gap: 8px;
     padding: 12px;
     border-radius: 16px;
     background: white;
   }
   input {
     flex: 1;
     min-width: 90px;
     padding: 10px;
     border: 2px solid #a5f3fc;
     border-radius: 10px;
     font-size: 16px;
   }
   button {
     padding: 10px 16px;
     border: none;
     border-radius: 10px;
     background: #06b6d4;
     color: white;
     font-weight: bold;
     cursor: pointer;
   }`,
  hints:["`.add { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; background: white; padding: 12px; border-radius: 16px; }`","`input { flex: 1; padding: 10px; border: 2px solid #a5f3fc; border-radius: 10px; }`","`button { background: #06b6d4; color: white; border: none; border-radius: 10px; padding: 10px 16px; cursor: pointer; }`"],
  tip:"`font-size: 16px` on inputs stops iPhones from zooming in when you tap them.",
  checks:[cssIs('.add','display','flex',"Give `.add` `display: flex;`"),cssMin('input','borderTopLeftRadius',1,"Round the inputs: `border-radius: 10px;`"),cssIs('button','cursor','pointer',"Give `button` `cursor: pointer;`")]}),
 C('s7','List items',{why:"Each item should be a white card: name on the left, price and ✖ on the right.",
  learn:"`justify-content: space-between;` pushes things to the two ends of a row. Items don't exist yet — these rules wait for them.",
  todo:"Give `#list` `list-style: none` and `padding: 0`. Make `#list li` a flex row with `justify-content: space-between`, a white background, padding and rounded corners. Style `.remove` pink. Make `#empty` grey and centered.",
  job:"Give `#list` `list-style: none;`. Give `#list li` `display: flex;` and `justify-content: space-between;`. Give `.remove` `background: #fee2e2;`.",
  snippet:D`
   #list {
     list-style: none;
     padding: 0;
   }
   #list li {
     display: flex;
     justify-content: space-between;
     align-items: center;
     gap: 10px;
     margin-bottom: 8px;
     padding: 10px 14px;
     border-radius: 12px;
     background: white;
     box-shadow: 0 2px 6px rgba(22, 78, 99, 0.08);
   }
   #list li span {
     flex: 1;
   }
   .remove {
     padding: 4px 10px;
     background: #fee2e2;
     color: #b91c1c;
   }
   #empty {
     color: #64748b;
     text-align: center;
   }`,
  hints:["`#list { list-style: none; padding: 0; }`","`#list li { display: flex; justify-content: space-between; align-items: center; background: white; padding: 10px 14px; border-radius: 12px; }`","`.remove { background: #fee2e2; color: #b91c1c; }`"],
  tip:"`list-style: none` removes the bullet dots — we want cards, not bullet points.",
  checks:[cssIs('#list','listStyleType','none',"Give `#list` `list-style: none;`"),[anyHover(/#list li$/,'justifyContent'),"Add `#list li { display: flex; justify-content: space-between; }`"],[anyHover(/\.remove/,'backgroundColor'),"Add `.remove { background: #fee2e2; }`"]]}),
 C('s8','The totals bar',{why:"The total should stand out — like the bottom of a receipt.",
  todo:"Make `.totals` a flex row with `justify-content: space-between`, a yellow background, rounded corners, padding and a font size of at least 18px. Give `#clearAll` a red background and some top margin.",
  job:"Give `.totals` `display: flex;`, `justify-content: space-between;`, `background: #fef08a;` (any colour) and `font-size: 20px;` (18px or more).",
  snippet:D`
   .totals {
     display: flex;
     justify-content: space-between;
     padding: 4px 16px;
     border-radius: 16px;
     background: #fef08a;
     font-size: 20px;
   }
   #clearAll {
     margin-top: 10px;
     background: #f87171;
   }`,
  hints:["`.totals { display: flex; justify-content: space-between; }`","Add `background: #fef08a; border-radius: 16px; padding: 4px 16px; font-size: 20px;`","`#clearAll { margin-top: 10px; background: #f87171; }`"],
  tip:"Yellow is great for totals — it's the colour of a highlighter pen.",
  checks:[cssIs('.totals','display','flex',"Give `.totals` `display: flex;`"),cssNot('.totals','backgroundColor',CLEAR,"Give `.totals` a background colour."),cssMin('.totals','fontSize',18,"Make `.totals` at least 18px: `font-size: 20px;`")]}),
 J('s9','Add an item',{why:"Type an item and price, press Add — it appears on the list!",
  learn:"• `Number('2.5')` turns text into the number 2.5.\n• `li.dataset.price = price` hides the price inside the list item, so we can add it up later.\n• `price.toFixed(2)` shows money nicely: `2.50`.",
  todo:"Write `addItem()`: read the item name and price, stop if the name is empty, make an `<li>` with the name, the price and a `<button class=\"remove\">✖</button>`, add it to `#list`, then empty both boxes. Run it when `#addBtn` is clicked.",
  job:"Write `addItem()`. If the name is empty, `return;`. Else make an `li` with `dataset.price`, the name, `$` + price, and a `<button class=\"remove\">✖</button>`. Empty both boxes. Run it on `#addBtn` click.",
  snippet:D`
   const list = document.querySelector('#list');

   function addItem() {
     const nameBox = document.querySelector('#item');
     const priceBox = document.querySelector('#price');
     const name = nameBox.value.trim();
     const price = Number(priceBox.value);
     if (name === '') return;

     const li = document.createElement('li');
     li.dataset.price = price;
     li.innerHTML = '<span>' + name + '</span><b>$' + price.toFixed(2) + '</b><button class="remove">✖</button>';
     list.appendChild(li);

     nameBox.value = '';
     priceBox.value = '';
   }

   document.querySelector('#addBtn').addEventListener('click', addItem);`,
  hints:["Start your script: `<script>` at the very bottom. Then `const list = document.querySelector('#list');` and `function addItem() { … }`.","Read the boxes: `const name = nameBox.value.trim(); const price = Number(priceBox.value); if (name === '') return;`","`const li = document.createElement('li'); li.dataset.price = price; li.innerHTML = '<span>' + name + '</span><b>$' + price.toFixed(2) + '</b><button class=\"remove\">✖</button>'; list.appendChild(li);`"],
  tip:"The ✖ buttons don't work yet. That's coming soon!",
  checks:[[a=>{a.type('#item','Apples');a.type('#price','2.5');a.click('#addBtn');const li=a.$('#list li');return !!li&&T(a,li).includes('apples')&&T(a,li).includes('2.50');},"Type **Apples** and **2.5**, click **Add**: a list item should show **Apples** and **$2.50**."],[a=>a.$('#item').value===''&&a.$('#price').value==='',"After adding, empty both boxes."],[a=>{const n=a.$$('#list li').length;a.click('#addBtn');return a.$$('#list li').length===n;},"Clicking **Add** with no item name should NOT add anything."]]}),
 E('s10','Add up the total',{why:"Now the clever bit: count the items and add up all the prices, every time the list changes.",
  learn:"`updateTotals()` looks at every `<li>`, adds up their `dataset.price`, and also hides the empty message when the list has items.",
  todo:"Write `updateTotals()` at the bottom of your script. Then, inside `addItem()`, right under `list.appendChild(li);`, call `updateTotals();`.",
  job:"Write `updateTotals()`: add up every `li`'s `dataset.price`, show the count in `#count` and `'$' + total.toFixed(2)` in `#total`, and hide `#empty` when there are items. Call it in `addItem()`.",
  where:"Put `updateTotals();` inside `addItem()`, under `list.appendChild(li);`. The new function goes at the very bottom of your script.",
  snippet:D`
   // inside addItem(), under list.appendChild(li);
     updateTotals();

   // at the very bottom:
   function updateTotals() {
     const items = list.querySelectorAll('li');
     let total = 0;
     items.forEach(li => {
       total = total + Number(li.dataset.price);
     });
     document.querySelector('#count').textContent = items.length;
     document.querySelector('#total').textContent = '$' + total.toFixed(2);
     document.querySelector('#empty').style.display = items.length === 0 ? 'block' : 'none';
   }`,
  apply:addAfter("list.appendChild(li);","updateTotals();",{tail:D`
   function updateTotals() {
     const items = list.querySelectorAll('li');
     let total = 0;
     items.forEach(li => {
       total = total + Number(li.dataset.price);
     });
     document.querySelector('#count').textContent = items.length;
     document.querySelector('#total').textContent = '$' + total.toFixed(2);
     document.querySelector('#empty').style.display = items.length === 0 ? 'block' : 'none';
   }`}),
  hints:["At the bottom: `function updateTotals() { const items = list.querySelectorAll('li'); let total = 0; … }`","`items.forEach(li => { total = total + Number(li.dataset.price); });` then show `items.length` and `'$' + total.toFixed(2)`.","`document.querySelector('#empty').style.display = items.length === 0 ? 'block' : 'none';` — and call `updateTotals();` under `list.appendChild(li);`."],
  tip:"`? :` is a mini if/else on one line: \"is it 0? then 'block', otherwise 'none'\".",
  checks:[[a=>{a.type('#item','Milk');a.type('#price','2.50');a.click('#addBtn');a.type('#item','Bread');a.type('#price','1.25');a.click('#addBtn');return T(a,'#total')==='$3.75'&&T(a,'#count')==='2';},"Add Milk $2.50 and Bread $1.25: `#count` should show **2** and `#total` **$3.75**."],[a=>a.css(a.$('#empty'),'display')==='none',"When the list has items, hide `#empty` with `style.display = 'none'`."]]}),
 J('s11','Remove an item',{why:"Changed your mind? Tap ✖ to take it off the list.",
  learn:"One click listener on the whole `list` hears every ✖ button — even ones added later. `e.target.closest('li').remove()` deletes that item.",
  todo:"Listen for clicks on `list`. If the thing clicked has the class `remove`, remove its `<li>` and call `updateTotals()`.",
  job:"On `list` click: if `e.target.classList.contains('remove')`, do `e.target.closest('li').remove();` and then `updateTotals();`.",
  snippet:D`
   list.addEventListener('click', e => {
     if (e.target.classList.contains('remove')) {
       e.target.closest('li').remove();
       updateTotals();
     }
   });`,
  hints:["`list.addEventListener('click', e => { … });`","`if (e.target.classList.contains('remove')) { … }`","Inside: `e.target.closest('li').remove(); updateTotals();`"],
  tip:"Remove everything and the empty message comes back by itself. That's `updateTotals()` doing its job!",
  checks:[[a=>{a.type('#item','Eggs');a.type('#price','2');a.click('#addBtn');a.type('#item','Juice');a.type('#price','3');a.click('#addBtn');a.click('#list li .remove');return a.$$('#list li').length===1&&T(a,'#total')==='$3.00';},"Clicking ✖ should remove that item and update `#total` (Juice left = **$3.00**)."],[a=>{a.click('#list li .remove');return a.$$('#list li').length===0&&a.css(a.$('#empty'),'display')!=='none';},"Remove the last item: `#empty` should show again."]]}),
 J('s12','Press Enter to add',{why:"Grown-ups love pressing Enter instead of clicking. Let's make that work.",
  learn:"The `keydown` event happens when a key is pressed. `e.key` tells you which one: `'Enter'`, `'a'`, `'ArrowUp'`…",
  todo:"Give every `.add input` a `keydown` listener: if `e.key === 'Enter'`, call `addItem()`.",
  job:"For each `.add input`, add a `keydown` listener. If `e.key === 'Enter'`, run `addItem();`.",
  snippet:D`
   document.querySelectorAll('.add input').forEach(box => {
     box.addEventListener('keydown', e => {
       if (e.key === 'Enter') addItem();
     });
   });`,
  hints:["`document.querySelectorAll('.add input').forEach(box => { … });`","Inside: `box.addEventListener('keydown', e => { if (e.key === 'Enter') addItem(); });`"],
  tip:"Little touches like this are what make an app feel professional.",
  checks:[[a=>{a.type('#item','Cheese');a.type('#price','4');a.key('#price','Enter');return a.$$('#list li').some(li=>T(a,li).includes('cheese'));},"Type an item and price, then press **Enter**: it should be added to the list."]]}),
 J('s13','Clear the list',{why:"Done shopping? Clear everything in one tap.",
  todo:"When `#clearAll` is clicked, empty the list with `list.innerHTML = '';` and call `updateTotals()`.",
  job:"On `#clearAll` click: `list.innerHTML = '';` then `updateTotals();`.",
  snippet:D`
   document.querySelector('#clearAll').addEventListener('click', () => {
     list.innerHTML = '';
     updateTotals();
   });`,
  hints:["`document.querySelector('#clearAll').addEventListener('click', () => { … });`","Inside: `list.innerHTML = ''; updateTotals();`"],
  tip:"Challenge: save the list with `localStorage`, so it's still there when Grandpa opens the page tomorrow.",
  checks:[[a=>{a.type('#item','Rice');a.type('#price','3');a.click('#addBtn');a.type('#item','Tea');a.type('#price','5');a.click('#addBtn');a.click('#clearAll');return a.$$('#list li').length===0&&T(a,'#total')==='$0.00'&&T(a,'#count')==='0';},"**Clear list** should remove every item and set the totals to **0** and **$0.00**."],[a=>a.css(a.$('#empty'),'display')!=='none',"After clearing, `#empty` should show again."]]})
 ]},

/* ================================================================== 9. STORY BUILDER */
{id:'pf_story',cat:'full',emoji:'📖',title:'Silly Story Machine',mentor:'Aunt Pip, storyteller',
 blurb:'Type silly words, press a button, get a crazy story — it can even read it out loud!',
 intro:"Aunt Pip tells the funniest stories, and now she wants a machine that makes them! You'll build a word game: fill in a name, an animal, a food and more, and the machine mixes them into a silly story. Then add a **Surprise me** button, a voice that **reads it aloud**, and a story book to save your favourites.",
 steps:[
 H('b1','The title',{why:"A fun title gets people excited to play.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (the name) and a `<p>` (how to play) inside.",
  snippet:D`
   <header>
     <h1>📖 Silly Story Machine</h1>
     <p>Type some words, press the button, and get a crazy story!</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>📖 Silly Story Machine</h1>` and a `<p>`."],
  tip:"Word games like this are sometimes called \"Mad Libs\".",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('b2','The word boxes',{why:"Six boxes, six silly words. Each box needs a label so people know what to type.",
  learn:"Each label is linked to its box: `<label for=\"hero\">` goes with `<input id=\"hero\">`. Tapping the label jumps into the box!",
  todo:"Add `<div class=\"words\">` with 6 little `<div>`s, each with a `<label>` and an `<input>`. Use the ids `hero`, `describe`, `animal`, `food`, `place`, `sound`.",
  job:"Make `<div class=\"words\">` with 6 inputs: `id=\"hero\"`, `id=\"describe\"`, `id=\"animal\"`, `id=\"food\"`, `id=\"place\"`, `id=\"sound\"`. Give each a `<label for=\"…\">`.",
  snippet:D`
   <div class="words">
     <div><label for="hero">A name</label><input id="hero" placeholder="Captain Noodle"></div>
     <div><label for="describe">A describing word</label><input id="describe" placeholder="sparkly"></div>
     <div><label for="animal">An animal</label><input id="animal" placeholder="llama"></div>
     <div><label for="food">A food</label><input id="food" placeholder="spaghetti"></div>
     <div><label for="place">A place</label><input id="place" placeholder="the moon"></div>
     <div><label for="sound">A funny sound</label><input id="sound" placeholder="BOING"></div>
   </div>`,
  hints:["`<div class=\"words\">` … `</div>` with 6 small divs inside.","One of them: `<div><label for=\"hero\">A name</label><input id=\"hero\" placeholder=\"Captain Noodle\"></div>`","Copy it 5 times and change the ids: `describe`, `animal`, `food`, `place`, `sound`."],
  tip:"Write ONE box, check it in the preview, then copy and paste. That's how pros work!",
  checks:[[a=>['hero','describe','animal','food','place','sound'].every(i=>a.$('.words input#'+i)),"Add 6 inputs inside `<div class=\"words\">` with ids `hero`, `describe`, `animal`, `food`, `place`, `sound`."],[a=>labelLinked(a,'.words'),"Link each label to its box: `<label for=\"hero\">` + `<input id=\"hero\">`."]]}),
 H('b3','The magic buttons',{why:"One button makes your story. The other one picks random words for you!",
  todo:"Add `<div class=\"buttons\">` with `<button id=\"make\">✨ Make my story</button>` and `<button id=\"random\">🎲 Surprise me</button>`.",
  job:"Make `<div class=\"buttons\">` with `<button id=\"make\">` and `<button id=\"random\">`.",
  snippet:D`
   <div class="buttons">
     <button id="make">✨ Make my story</button>
     <button id="random">🎲 Surprise me</button>
   </div>`,
  hints:["`<div class=\"buttons\">` … `</div>`","`<button id=\"make\">✨ Make my story</button>` and `<button id=\"random\">🎲 Surprise me</button>`"],
  tip:"Emoji on buttons make them fun — and easy to spot.",
  checks:[has('.buttons #make',"Add `<button id=\"make\">` inside `<div class=\"buttons\">`."),has('.buttons #random',"Add `<button id=\"random\">` inside `<div class=\"buttons\">`.")]}),
 H('b4','The story box',{why:"A box for the story, buttons to read it out and save it, and a story book.",
  todo:"Add `<div id=\"story\" class=\"story\">Your story will appear here…</div>`, then another `<div class=\"buttons\">` with `<button id=\"speak\">` and `<button id=\"save\">`. Then `<h2>📚 My Story Book</h2>` and an empty `<ol id=\"book\"></ol>`.",
  job:"Add `<div id=\"story\" class=\"story\">`. Then a `<div class=\"buttons\">` with `<button id=\"speak\">` and `<button id=\"save\">`. Then an `<h2>` and an empty `<ol id=\"book\"></ol>`.",
  snippet:D`
   <div id="story" class="story">Your story will appear here…</div>
   <div class="buttons">
     <button id="speak">🔊 Read it to me</button>
     <button id="save">💾 Save to my book</button>
   </div>
   <h2>📚 My Story Book</h2>
   <ol id="book"></ol>`,
  hints:["`<div id=\"story\" class=\"story\">Your story will appear here…</div>`","`<div class=\"buttons\">` with `<button id=\"speak\">🔊 Read it to me</button>` and `<button id=\"save\">💾 Save to my book</button>`","`<h2>📚 My Story Book</h2>` and `<ol id=\"book\"></ol>` — `ol` is a numbered list."],
  tip:"`<ol>` numbers its items 1, 2, 3… by itself. Perfect for a book of stories!",
  checks:[has('#story.story',"Add `<div id=\"story\" class=\"story\">`."),has('#speak',"Add `<button id=\"speak\">`."),has('#save',"Add `<button id=\"save\">`."),has('ol#book',"Add an empty `<ol id=\"book\"></ol>`.")]}),
 C('b5','A storybook page',{why:"Stories deserve a cosy, playful page.",
  learn:BODY_LEARN,
  todo:"Style `body`: a fun font, `max-width: 560px` with `margin: 0 auto`, padding and a warm gradient.",
  job:"Give `body` a `font-family` and `background: linear-gradient(160deg, #fff1f2, #fef3c7);` (any light colours). Add `max-width: 560px;` and `margin: 0 auto;`.",
  snippet:D`
   body {
     max-width: 560px;
     margin: 0 auto;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: 'Comic Sans MS', 'Chalkboard SE', cursive;
     color: #4a044e;
     background: linear-gradient(160deg, #fff1f2, #fef3c7);
   }`,
  hints:["`<style>` then `body { }` then `</style>`.","`font-family: 'Comic Sans MS', 'Chalkboard SE', cursive; max-width: 560px; margin: 0 auto; padding: 16px;`","`background: linear-gradient(160deg, #fff1f2, #fef3c7);`"],
  tip:"Comic Sans is often used in kids' books because the letters are round and friendly.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],grad('body',"Give `body` a gradient background.")]}),
 C('b6','Two columns of words',{why:"Six boxes fit nicely in 2 columns.",
  todo:"Make `.words` a grid with `grid-template-columns: 1fr 1fr` and a gap. Make `label` `display: block` and bold. Make `input` full width with padding, a border and rounded corners.",
  job:"Give `.words` `display: grid;`, `grid-template-columns: 1fr 1fr;` and `gap: 12px;`. Give `input` `width: 100%;` and a `border-radius`.",
  snippet:D`
   .words {
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 12px;
   }
   label {
     display: block;
     margin-bottom: 4px;
     font-size: 14px;
     font-weight: bold;
   }
   input {
     width: 100%;
     box-sizing: border-box;
     padding: 10px;
     border: 2px solid #fbcfe8;
     border-radius: 12px;
     font-size: 16px;
   }`,
  hints:["`.words { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }`","`label { display: block; font-weight: bold; }`","`input { width: 100%; box-sizing: border-box; padding: 10px; border: 2px solid #fbcfe8; border-radius: 12px; }`"],
  tip:"`1fr 1fr` = two columns, each getting one equal share of the space.",
  checks:[cssIs('.words','display','grid',"Give `.words` `display: grid;`"),[a=>gridCols(a,'.words').length===2,"Make 2 columns: `grid-template-columns: 1fr 1fr;`"],cssMin('input','borderTopLeftRadius',1,"Round the inputs: `border-radius: 12px;`")]}),
 C('b7','The story box',{why:"Make the story look like a page torn from a notebook, with the silly words highlighted.",
  todo:"Give `.story` a white background, `border: 3px dashed #f472b6`, rounded corners, padding, a big font and `line-height: 1.6`. Add a `.story b` rule with a pink background.",
  job:"Give `.story` `border: 3px dashed #f472b6;`, `padding: 20px;` and `background: white;`. Add `.story b { background: #fce7f3; }`.",
  snippet:D`
   .story {
     margin: 16px 0 0;
     padding: 20px;
     border: 3px dashed #f472b6;
     border-radius: 18px;
     background: white;
     font-size: 20px;
     line-height: 1.6;
   }
   .story b {
     padding: 0 6px;
     border-radius: 8px;
     background: #fce7f3;
     color: #be185d;
   }`,
  hints:["`.story { background: white; border: 3px dashed #f472b6; border-radius: 18px; padding: 20px; }`","Add `font-size: 20px; line-height: 1.6;`","`.story b { background: #fce7f3; color: #be185d; padding: 0 6px; border-radius: 8px; }`"],
  tip:"`dashed` makes a border of little lines. Try `dotted` too!",
  checks:[cssIs('.story','borderTopStyle','dashed',"Give `.story` `border: 3px dashed #f472b6;`"),cssMin('.story','paddingTop',10,"Give `.story` `padding: 20px;` (at least 10px)."),[anyHover(/\.story b/,'backgroundColor'),"Add `.story b { background: #fce7f3; }`"]]}),
 C('b8','Bouncy buttons',{why:"Bright pink pill buttons, in a centered row.",
  todo:"Make `.buttons` a centered flex row with a gap and wrap. Style `button` (pink, white text, no border, rounded, `cursor: pointer`) and add a `button:hover` colour.",
  job:"Give `.buttons` `display: flex;` and `gap: 10px;`. Give `button` `cursor: pointer;`. Add `button:hover { background: #db2777; }`.",
  snippet:D`
   .buttons {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     gap: 10px;
     margin-top: 14px;
   }
   button {
     padding: 12px 18px;
     border: none;
     border-radius: 99px;
     background: #ec4899;
     color: white;
     font-family: inherit;
     font-size: 16px;
     font-weight: bold;
     cursor: pointer;
   }
   button:hover {
     background: #db2777;
   }`,
  hints:["`.buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }`","`button { background: #ec4899; color: white; border: none; border-radius: 99px; padding: 12px 18px; cursor: pointer; }`","`button:hover { background: #db2777; }`"],
  tip:"`font-family: inherit;` makes buttons use the page's font. Buttons don't do that by themselves!",
  checks:[cssIs('.buttons','display','flex',"Give `.buttons` `display: flex;`"),cssIs('button','cursor','pointer',"Give `button` `cursor: pointer;`"),[anyHover(/^button:hover$/,'backgroundColor'),"Add `button:hover { background: #db2777; }`"]]}),
 J('b9','Make the story',{why:"Press the button and the words jump into a story!",
  learn:"A **template literal** uses backticks `` ` `` instead of quotes. Inside it, `${hero}` drops in the value of `hero`. Using `innerHTML` lets us wrap words in `<b>` to highlight them.",
  todo:"Write `makeStory()`: read all 6 boxes, then put a story into `#story` with `innerHTML`, using a template literal and `<b>${…}</b>` around the words. Run it when `#make` is clicked.",
  job:"Write `makeStory()`. Read all 6 boxes with `.value`. Put a story in `#story` with `innerHTML`, wrapping each word like `<b>${hero}</b>`. Run it on `#make` click.",
  snippet:D`
   function makeStory() {
     const hero = document.querySelector('#hero').value;
     const describe = document.querySelector('#describe').value;
     const animal = document.querySelector('#animal').value;
     const food = document.querySelector('#food').value;
     const place = document.querySelector('#place').value;
     const sound = document.querySelector('#sound').value;

     document.querySelector('#story').innerHTML =
       \`Once upon a time, <b>\${hero}</b> met a <b>\${describe}</b> <b>\${animal}</b> in <b>\${place}</b>. \` +
       \`"<b>\${sound}</b>!" said the \${animal}, and they ate a mountain of <b>\${food}</b>. The end! 🌙\`;
   }

   document.querySelector('#make').addEventListener('click', makeStory);`,
  hints:["Start your script: `<script>` at the very bottom. Then `function makeStory() { … }`.","Read each box: `const hero = document.querySelector('#hero').value;` (and the same for the other 5).","`document.querySelector('#story').innerHTML = \\`Once upon a time, <b>${hero}</b> met a …\\`;` — then the `#make` click listener."],
  tip:"Write your OWN story! Change the sentences however you like — just keep the `${…}` bits.",
  checks:[[a=>{const w={hero:'Zog',describe:'wobbly',animal:'yak',food:'jelly',place:'Mars',sound:'ZOOP'};for(const k in w)a.type('#'+k,w[k]);a.click('#make');const s=T(a,'#story');return Object.values(w).every(v=>s.includes(v.toLowerCase()));},"Fill in the boxes and click **Make my story**: `#story` should use ALL 6 words."],[a=>a.$$('#story b').length>=3,"Wrap the words in `<b>` tags, like `<b>${hero}</b>`, and use `innerHTML`."]]}),
 E('b10','Empty box? Oops!',{why:"If someone leaves a box empty, the story has holes. Let's stop that.",
  learn:"`return;` stops a function early. Putting a check at the TOP of a function is called a **guard** — it guards the rest of the code.",
  todo:"At the very top of `makeStory()`, loop over all `.words input` boxes. If any is empty, put **Oops! Fill in every box first (or press Surprise me). 🙈** into `#story` and `return;`.",
  job:"At the top of `makeStory()`, check every `.words input`. If one is empty, `#story` says **Oops! Fill in every box first** and you `return;`.",
  where:"Inside `makeStory()`, on new lines right under `function makeStory() {`.",
  snippet:D`
   function makeStory() {
     for (const box of document.querySelectorAll('.words input')) {
       if (box.value.trim() === '') {
         document.querySelector('#story').textContent = 'Oops! Fill in every box first (or press Surprise me). 🙈';
         return;
       }
     }
     const hero = document.querySelector('#hero').value;
     // … the rest stays the same
   }`,
  apply:addAfter("function makeStory() {",D`
   for (const box of document.querySelectorAll('.words input')) {
     if (box.value.trim() === '') {
       document.querySelector('#story').textContent = 'Oops! Fill in every box first (or press Surprise me). 🙈';
       return;
     }
   }`,{inside:true}),
  hints:["Right under `function makeStory() {`: `for (const box of document.querySelectorAll('.words input')) { … }`","Inside the loop: `if (box.value.trim() === '') { … return; }`","Before `return;`: `document.querySelector('#story').textContent = 'Oops! Fill in every box first (or press Surprise me). 🙈';`"],
  tip:"Checking what people type is called **validation**. Every real app does it.",
  checks:[[a=>{['hero','describe','animal','food','place'].forEach(k=>a.type('#'+k,'x'));a.type('#sound','');a.click('#make');return T(a,'#story').includes('fill in every box');},"With an empty box, **Make my story** should say **Oops! Fill in every box first**."],[a=>{a.type('#sound','POP');a.click('#make');return T(a,'#story').includes('pop')&&!T(a,'#story').includes('fill in');},"With every box filled, it should make the story again."]]}),
 J('b11','Surprise me!',{why:"Can't think of words? Let the machine pick funny ones for you.",
  learn:"The `ideas` object has a list of words for each box id. `pick(list)` grabs a random one. `for (const id in ideas)` visits every box.",
  todo:"Make an `ideas` object with a word list for each of the 6 ids, and a `pick(list)` function. When `#random` is clicked: fill every box with a random word, then call `makeStory()`.",
  job:"Make `ideas` with a word list for each box id, and `pick(list)`. On `#random` click: put `pick(ideas[id])` in every box, then run `makeStory();`.",
  snippet:D`
   const ideas = {
     hero: ['Captain Noodle', 'Princess Pickle', 'Super Sam', 'Grandma Rocket'],
     describe: ['sparkly', 'grumpy', 'tiny', 'enormous', 'wobbly'],
     animal: ['llama', 'penguin', 'dragon', 'hamster', 'octopus'],
     food: ['spaghetti', 'jelly beans', 'pancakes', 'broccoli'],
     place: ['the moon', 'a bouncy castle', 'the bathtub', 'a volcano'],
     sound: ['BOING', 'SPLAT', 'WHEEE', 'KABOOM']
   };

   function pick(list) {
     return list[Math.floor(Math.random() * list.length)];
   }

   document.querySelector('#random').addEventListener('click', () => {
     for (const id in ideas) {
       document.querySelector('#' + id).value = pick(ideas[id]);
     }
     makeStory();
   });`,
  hints:["`const ideas = { hero: ['Captain Noodle', 'Super Sam'], describe: [...], … };` — one list per box id.","`function pick(list) { return list[Math.floor(Math.random() * list.length)]; }`","On `#random` click: `for (const id in ideas) { document.querySelector('#' + id).value = pick(ideas[id]); }` then `makeStory();`"],
  tip:"Add LOTS of words to each list. More words = more surprising stories!",
  checks:[[a=>{['hero','describe','animal','food','place','sound'].forEach(k=>a.type('#'+k,''));a.click('#random');return ['hero','describe','animal','food','place','sound'].every(k=>a.$('#'+k).value.trim());},"**Surprise me** should fill every box with a word."],[a=>{const h=a.$('#hero').value.toLowerCase();return !!h&&T(a,'#story').includes(h)&&!T(a,'#story').includes('fill in');},"**Surprise me** should also make the story (call `makeStory()`)."]]}),
 J('b12','Read it aloud',{why:"The computer can TALK! Let it read your story in a funny voice.",
  learn:"`new SpeechSynthesisUtterance(words)` gets some words ready to speak. `speechSynthesis.speak(…)` says them out loud. Turn your sound on!",
  todo:"When `#speak` is clicked: make a `SpeechSynthesisUtterance` from the story's `textContent`, set `rate` to 0.9, and call `speechSynthesis.speak()`.",
  job:"On `#speak` click: `const voice = new SpeechSynthesisUtterance(…)` with the story's `textContent`. Then `speechSynthesis.speak(voice);`.",
  snippet:D`
   document.querySelector('#speak').addEventListener('click', () => {
     const words = document.querySelector('#story').textContent;
     const voice = new SpeechSynthesisUtterance(words);
     voice.rate = 0.9;
     speechSynthesis.speak(voice);
   });`,
  hints:["`document.querySelector('#speak').addEventListener('click', () => { … });`","`const voice = new SpeechSynthesisUtterance(document.querySelector('#story').textContent);`","`voice.rate = 0.9; speechSynthesis.speak(voice);`"],
  tip:"Try `voice.pitch = 2;` for a squeaky chipmunk voice, or `0.5` for a deep giant voice!",
  checks:[[a=>{const w=a.win;w.__said=null;if(!w.SpeechSynthesisUtterance)w.SpeechSynthesisUtterance=function(t){this.text=t;};try{Object.defineProperty(w,'speechSynthesis',{value:{speak:u=>{w.__said=u.text;},cancel(){}},configurable:true});}catch(e){return false;}a.click('#random');a.click('#speak');return !!w.__said&&w.__said.includes(a.$('#hero').value);},"Clicking **Read it to me** should call `speechSynthesis.speak()` with the story's words."]]}),
 J('b13','Save to my book',{why:"Keep your favourite stories in a numbered story book.",
  todo:"When `#save` is clicked: if the story has no `<b>` in it (no real story yet), stop. Otherwise make an `<li>`, copy the story's `innerHTML` into it, and add it to `#book`.",
  job:"On `#save` click: if `story.querySelector('b')` is `null`, `return;`. Else make an `li`, copy the story's `innerHTML`, and add it to `#book`.",
  snippet:D`
   document.querySelector('#save').addEventListener('click', () => {
     const story = document.querySelector('#story');
     if (story.querySelector('b') === null) return;
     const li = document.createElement('li');
     li.innerHTML = story.innerHTML;
     document.querySelector('#book').appendChild(li);
   });`,
  hints:["`const story = document.querySelector('#story'); if (story.querySelector('b') === null) return;`","`const li = document.createElement('li'); li.innerHTML = story.innerHTML;`","`document.querySelector('#book').appendChild(li);`"],
  tip:"Make 5 stories, save them all, and read your book to your family at dinner!",
  checks:[[a=>{a.click('#save');return a.$$('#book li').length===0;},"Don't save when there's no story yet (the story has no `<b>`)."],[a=>{a.click('#random');a.click('#save');const li=a.$('#book li');return !!li&&T(a,li).includes(a.$('#hero').value.toLowerCase());},"After making a story, **Save** should add it as an `<li>` in `#book`."]]})
 ]},

/* ================================================================== 10. VIRTUAL PET */
{id:'pf_pet',cat:'full',emoji:'🐣',title:'Virtual Pet',mentor:'Dr Paws, pet vet',
 blurb:'Feed it, play with it, watch its mood change — and don\'t forget it gets hungry over time!',
 intro:"Dr Paws has a new pet that needs a loving owner — you! You'll build a virtual pet with **Food** and **Fun** bars, Feed and Play buttons, and a face that changes with its mood. Time passes too: every few seconds your pet gets a little hungrier and a little more bored.",
 steps:[
 H('v1','The title',{why:"Give your pet's home a name.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (your pet's name) and a `<p>` (what to do) inside.",
  snippet:D`
   <header>
     <h1>🐣 Bubbles the Pet</h1>
     <p>Keep Bubbles fed and happy!</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>🐣 Bubbles the Pet</h1>` and a `<p>`."],
  tip:"Name your pet anything you like!",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('v2','The pet',{why:"Here's your pet, and a speech bubble for what it's saying.",
  todo:"Add `<div id=\"pet\">😊</div>` and `<p id=\"status\">Hello! I am your new pet.</p>`.",
  job:"Add `<div id=\"pet\">😊</div>` and a `<p id=\"status\">` with a hello message.",
  snippet:D`
   <div id="pet">😊</div>
   <p id="status">Hello! I am your new pet.</p>`,
  hints:["Two lines.","`<div id=\"pet\">😊</div>` and `<p id=\"status\">Hello! I am your new pet.</p>`"],
  tip:"The pet is just an emoji, so JavaScript can change its face by changing the text.",
  checks:[has('#pet',"Add `<div id=\"pet\">😊</div>`."),has('p#status',"Add `<p id=\"status\">`.")]}),
 H('v3','Food and Fun bars',{why:"Two bars show how full and how happy your pet is.",
  todo:"Add `<div class=\"stats\">` with two `<div class=\"stat\">` rows. Each has a `<span>` label and a `<div class=\"bar\">` holding a `<div class=\"fill\">` — with ids `food` and `fun`.",
  job:"Make `<div class=\"stats\">` with 2 `.stat` rows. Each has a `<span>` and a `<div class=\"bar\">` with a `.fill` inside: `id=\"food\"` and `id=\"fun\"`.",
  snippet:D`
   <div class="stats">
     <div class="stat">
       <span>🍎 Food</span>
       <div class="bar"><div class="fill" id="food"></div></div>
     </div>
     <div class="stat">
       <span>🎾 Fun</span>
       <div class="bar"><div class="fill" id="fun"></div></div>
     </div>
   </div>`,
  hints:["`<div class=\"stats\">` holds two `<div class=\"stat\">` boxes.","Each stat: `<span>🍎 Food</span>` then `<div class=\"bar\"><div class=\"fill\" id=\"food\"></div></div>`","The second one uses `🎾 Fun` and `id=\"fun\"`."],
  tip:"Each `.fill` lives inside a `.bar`, like water inside a glass.",
  checks:[has('.stats .stat .bar .fill#food',"Add a `.stat` row with `<div class=\"bar\"><div class=\"fill\" id=\"food\"></div></div>`."),has('.stats .stat .bar .fill#fun',"Add a second `.stat` row with `id=\"fun\"`.")]}),
 H('v4','Care buttons',{why:"Buttons to look after your pet — and one to make time go faster.",
  todo:"Add `<div class=\"buttons\">` with `<button id=\"feed\">🍎 Feed</button>`, `<button id=\"play\">🎾 Play</button>` and `<button id=\"skip\">⏩ Skip time</button>`.",
  job:"Make `<div class=\"buttons\">` with 3 buttons: `id=\"feed\"`, `id=\"play\"` and `id=\"skip\"`.",
  snippet:D`
   <div class="buttons">
     <button id="feed">🍎 Feed</button>
     <button id="play">🎾 Play</button>
     <button id="skip">⏩ Skip time</button>
   </div>`,
  hints:["`<div class=\"buttons\">` … `</div>`","`<button id=\"feed\">🍎 Feed</button>`, `<button id=\"play\">🎾 Play</button>`, `<button id=\"skip\">⏩ Skip time</button>`"],
  tip:"\"Skip time\" lets you test your pet without waiting. Game makers do this all the time!",
  checks:[has('.buttons #feed',"Add `<button id=\"feed\">` inside `<div class=\"buttons\">`."),has('.buttons #play',"Add `<button id=\"play\">`."),has('.buttons #skip',"Add `<button id=\"skip\">`.")]}),
 C('v5','A sunny garden',{why:"Your pet lives somewhere bright and happy.",
  learn:BODY_LEARN,
  todo:"Style `body`: a font, centered text, padding and a gradient background.",
  job:"Give `body` a `font-family`, `text-align: center;` and `background: linear-gradient(#fefce8, #dcfce7);` (any light colours).",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: 'Trebuchet MS', sans-serif;
     text-align: center;
     color: #166534;
     background: linear-gradient(#fefce8, #dcfce7);
   }`,
  hints:["`<style>` then `body { }` then `</style>`.","`font-family: 'Trebuchet MS', sans-serif; text-align: center; background: linear-gradient(#fefce8, #dcfce7);`"],
  tip:"Yellow sky, green grass — a happy garden for your pet.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],cssIs('body','textAlign','center',"Add `text-align: center;` to `body`."),grad('body',"Give `body` a gradient background.")]}),
 C('v6','A bouncy pet',{why:"A big pet that wiggles when you point at it, and bounces when you feed it!",
  learn:"`@keyframes bounce { … }` is an animation recipe: at 50% of the way, move up 30px. The `.bounce` class plays it once, using `animation: bounce 0.4s;`.",
  todo:"Make `#pet` at least 80px with a transition, and add `#pet:hover`. Write `@keyframes bounce` that moves up at 50%, and a `.bounce` class with `animation: bounce 0.4s`. Make `#status` bigger and bold.",
  job:"Give `#pet` `font-size: 100px;` (80px or more). Write `@keyframes bounce { 50% { transform: translateY(-30px); } }` and `.bounce { animation: bounce 0.4s; }`.",
  snippet:D`
   #pet {
     font-size: 100px;
     transition: transform 0.3s;
   }
   #pet:hover {
     transform: scale(1.1) rotate(-5deg);
   }
   @keyframes bounce {
     50% {
       transform: translateY(-30px);
     }
   }
   .bounce {
     animation: bounce 0.4s;
   }
   #status {
     font-size: 20px;
     font-weight: bold;
   }`,
  hints:["`#pet { font-size: 100px; transition: transform 0.3s; }` and `#pet:hover { transform: scale(1.1) rotate(-5deg); }`","`@keyframes bounce { 50% { transform: translateY(-30px); } }`","`.bounce { animation: bounce 0.4s; }` and `#status { font-size: 20px; font-weight: bold; }`"],
  tip:"Hover over your pet in the preview — it wiggles! The bounce comes later with JavaScript.",
  checks:[cssMin('#pet','fontSize',80,"Make `#pet` at least 80px: `font-size: 100px;`"),[a=>a.rules().some(r=>r.type===7&&r.name==='bounce'),"Write `@keyframes bounce { 50% { transform: translateY(-30px); } }`"],[anyHover(/\.bounce/,'animationName'),"Add `.bounce { animation: bounce 0.4s; }`"]]}),
 C('v7','The bars',{why:"Grey bars with coloured fills — green for food, pink for fun.",
  todo:"Make `.stat` a centered flex row with a gap. Give `.bar` a width, a height of at least 10px, a grey background, round ends and `overflow: hidden`. Give `.fill` `height: 100%`, a colour and `transition: width 0.4s`. Colour `#fun` pink.",
  job:"Give `.bar` `height: 18px;` (10px or more) and `overflow: hidden;`. Give `.fill` `height: 100%;`, a `background` and `transition: width 0.4s;`.",
  snippet:D`
   .stat {
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 10px;
     margin: 8px 0;
   }
   .stat span {
     width: 80px;
     text-align: left;
   }
   .bar {
     width: 200px;
     height: 18px;
     border-radius: 99px;
     background: #e5e7eb;
     overflow: hidden;
   }
   .fill {
     height: 100%;
     width: 100%;
     background: #4ade80;
     transition: width 0.4s;
   }
   #fun {
     background: #f472b6;
   }`,
  hints:["`.stat { display: flex; align-items: center; justify-content: center; gap: 10px; }`","`.bar { width: 200px; height: 18px; border-radius: 99px; background: #e5e7eb; overflow: hidden; }`","`.fill { height: 100%; width: 100%; background: #4ade80; transition: width 0.4s; }` and `#fun { background: #f472b6; }`"],
  tip:"The `transition` makes the bars slide down slowly — much nicer than jumping.",
  checks:[cssIs('.stat','display','flex',"Give `.stat` `display: flex;`"),cssMin('.bar','height',10,"Give `.bar` a height of at least 10px: `height: 18px;`"),transOn('.fill',"Give `.fill` `transition: width 0.4s;`")]}),
 C('v8','Care buttons',{why:"Chunky buttons that squish when you press them.",
  todo:"Make `.buttons` a centered flex row with a gap. Style `button` (big font, padding, rounded, white, a shadow, `cursor: pointer`) and add `button:active` that moves it down a little.",
  job:"Give `.buttons` `display: flex;`. Give `button` a `border-radius` and `cursor: pointer;`. Add `button:active { transform: translateY(3px); }`.",
  snippet:D`
   .buttons {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     gap: 10px;
     margin-top: 16px;
   }
   button {
     padding: 12px 18px;
     border: none;
     border-radius: 16px;
     background: white;
     font-size: 18px;
     box-shadow: 0 4px 0 #bbf7d0;
     cursor: pointer;
   }
   button:active {
     transform: translateY(3px);
   }`,
  hints:["`.buttons { display: flex; justify-content: center; gap: 10px; }`","`button { font-size: 18px; padding: 12px 18px; border: none; border-radius: 16px; background: white; cursor: pointer; }`","`button:active { transform: translateY(3px); }`"],
  tip:"The shadow + moving down 3px makes it feel like a real button being pushed in.",
  checks:[cssIs('.buttons','display','flex',"Give `.buttons` `display: flex;`"),cssMin('button','borderTopLeftRadius',1,"Round the buttons: `border-radius: 16px;`"),cssIs('button','cursor','pointer',"Give `button` `cursor: pointer;`"),[anyHover(/button:active/,'transform'),"Add `button:active { transform: translateY(3px); }`"]]}),
 J('v9','Food and fun numbers',{why:"Your pet needs numbers for how full and how happy it is — and the bars should show them.",
  learn:"`food + '%'` turns `80` into `'80%'`. Setting `style.width` to that makes the bar 80% full.",
  todo:"Make `let food = 80;` and `let fun = 80;`. Write `draw()` that sets the width of `#food` and `#fun` to their numbers + `'%'`. Call `draw();`.",
  job:"Make `let food = 80;` and `let fun = 80;`. Write `draw()` to set `#food` and `#fun`'s `style.width` to the number + `'%'`. Then call `draw();`.",
  snippet:D`
   let food = 80;
   let fun = 80;

   function draw() {
     document.querySelector('#food').style.width = food + '%';
     document.querySelector('#fun').style.width = fun + '%';
   }

   draw();`,
  hints:["Start your script: `<script>` at the very bottom. Then `let food = 80;` and `let fun = 80;`.","`function draw() { document.querySelector('#food').style.width = food + '%'; … }`","Do the same for `#fun`, then call `draw();` on the last line."],
  tip:"Whenever the numbers change, we'll just call `draw()` again. One function updates everything!",
  checks:[[a=>/^\d+(\.\d+)?%$/.test(a.$('#food').style.width)&&parseFloat(a.$('#food').style.width)>0,"`draw()` should set `#food`'s `style.width`, like `'80%'`."],[a=>/^\d+(\.\d+)?%$/.test(a.$('#fun').style.width)&&parseFloat(a.$('#fun').style.width)>0,"`draw()` should set `#fun`'s `style.width` too."]]}),
 J('v10','Feed and play',{why:"Feeding fills the food bar, playing fills the fun bar!",
  learn:"`Math.min(100, food + 15)` adds 15 but never goes above 100. A pet can't be 120% full!",
  todo:"When `#feed` is clicked: `food = Math.min(100, food + 15);` then `draw()`. Do the same for `#play` with `fun`.",
  job:"On `#feed` click: `food = Math.min(100, food + 15);` then `draw();`. On `#play` click: the same for `fun`.",
  snippet:D`
   document.querySelector('#feed').addEventListener('click', () => {
     food = Math.min(100, food + 15);
     draw();
   });

   document.querySelector('#play').addEventListener('click', () => {
     fun = Math.min(100, fun + 15);
     draw();
   });`,
  hints:["`document.querySelector('#feed').addEventListener('click', () => { … });`","Inside: `food = Math.min(100, food + 15); draw();`","Copy it for `#play` and change `food` to `fun`."],
  tip:"Try changing 15 to 5 — now your pet needs LOTS of snacks!",
  checks:[clickThen('#feed',a=>parseFloat(a.$('#food').style.width)>80,"Clicking **Feed** should make the food bar bigger."),[a=>{clicks(a,'#feed',6);return parseFloat(a.$('#food').style.width)===100;},"Food should stop at **100%** — use `Math.min(100, food + 15)`."],clickThen('#play',a=>parseFloat(a.$('#fun').style.width)>80,"Clicking **Play** should make the fun bar bigger.")]}),
 J('v11','Time passes',{why:"Real pets get hungry and bored over time. Yours will too!",
  learn:"`setInterval(tick, 3000)` runs `tick` every 3000 milliseconds (3 seconds), forever. `Math.max(0, food - 10)` takes 10 away but never goes below 0.",
  todo:"Write `tick()` that takes 10 from `food` and `fun` (never below 0) and calls `draw()`. Run it every 3 seconds with `setInterval`, and when `#skip` is clicked.",
  job:"Write `tick()`: `food = Math.max(0, food - 10);`, the same for `fun`, then `draw();`. Add `setInterval(tick, 3000);` and run `tick` on `#skip` click.",
  snippet:D`
   function tick() {
     food = Math.max(0, food - 10);
     fun = Math.max(0, fun - 10);
     draw();
   }

   setInterval(tick, 3000);
   document.querySelector('#skip').addEventListener('click', tick);`,
  hints:["`function tick() { food = Math.max(0, food - 10); fun = Math.max(0, fun - 10); draw(); }`","`setInterval(tick, 3000);`","`document.querySelector('#skip').addEventListener('click', tick);`"],
  tip:"Watch the preview for a few seconds — the bars go down all by themselves!",
  checks:[[a=>{const f=parseFloat(a.$('#food').style.width),g=parseFloat(a.$('#fun').style.width);a.click('#skip');return parseFloat(a.$('#food').style.width)<f&&parseFloat(a.$('#fun').style.width)<g;},"Clicking **Skip time** should make BOTH bars go down."],[a=>{clicks(a,'#skip',12);return parseFloat(a.$('#food').style.width)===0;},"The bars should stop at **0%** — use `Math.max(0, food - 10)`."]]}),
 E('v12','Moods',{why:"Your pet should SHOW how it feels — hungry, bored or happy.",
  learn:"`if … else if … else` checks things in order. Hunger is checked first, because food matters most!",
  todo:"Inside `draw()`, under the `#fun` line: if `food < 30` show 😫 and **I am SO hungry!**, else if `fun < 30` show 😢 and **I am bored. Play with me!**, else show 😊 and **I feel great!**",
  job:"In `draw()`: if `food < 30` → 😫 and **I am SO hungry!** Else if `fun < 30` → 😢 and **I am bored. Play with me!** Else → 😊 and **I feel great!**",
  where:"Inside your `draw()` function, on new lines under `document.querySelector('#fun').style.width = fun + '%';`.",
  snippet:D`
   function draw() {
     document.querySelector('#food').style.width = food + '%';
     document.querySelector('#fun').style.width = fun + '%';
     const petEl = document.querySelector('#pet');
     const statusEl = document.querySelector('#status');
     if (food < 30) {
       petEl.textContent = '😫';
       statusEl.textContent = 'I am SO hungry!';
     } else if (fun < 30) {
       petEl.textContent = '😢';
       statusEl.textContent = 'I am bored. Play with me!';
     } else {
       petEl.textContent = '😊';
       statusEl.textContent = 'I feel great!';
     }
   }`,
  apply:addAfter("document.querySelector('#fun').style.width = fun + '%';",D`
   const petEl = document.querySelector('#pet');
   const statusEl = document.querySelector('#status');
   if (food < 30) {
     petEl.textContent = '😫';
     statusEl.textContent = 'I am SO hungry!';
   } else if (fun < 30) {
     petEl.textContent = '😢';
     statusEl.textContent = 'I am bored. Play with me!';
   } else {
     petEl.textContent = '😊';
     statusEl.textContent = 'I feel great!';
   }`),
  hints:["`const petEl = document.querySelector('#pet'); const statusEl = document.querySelector('#status');`","`if (food < 30) { petEl.textContent = '😫'; statusEl.textContent = 'I am SO hungry!'; }`","Then `else if (fun < 30) { … '😢' … }` and `else { … '😊' … 'I feel great!' }`"],
  tip:"Add more moods! Maybe 😴 when both bars are full, or 🤩 when both are over 90.",
  checks:[[a=>{clicks(a,'#skip',10);return a.$('#pet').textContent.includes('😫')&&T(a,'#status').includes('hungry');},"When food is below 30, show 😫 and **I am SO hungry!**"],[a=>{clicks(a,'#feed',7);return a.$('#pet').textContent.includes('😢')&&T(a,'#status').includes('bored');},"When food is OK but fun is below 30, show 😢 and **I am bored. Play with me!**"],[a=>{clicks(a,'#play',7);return a.$('#pet').textContent.includes('😊')&&T(a,'#status').includes('great');},"When both are 30 or more, show 😊 and **I feel great!**"]]}),
 J('v13','Happy bounce',{why:"When you feed or play with your pet, it should jump for joy!",
  learn:"`classList.add('bounce')` starts your CSS animation. `setTimeout(…, 400)` removes the class after it finishes, so it can bounce again next time.",
  todo:"Write `bounce()` that adds the `bounce` class to `#pet` and removes it after 400ms. Run it when `#feed` or `#play` is clicked.",
  job:"Write `bounce()`: add class `bounce` to `#pet`, then `setTimeout(() => pet.classList.remove('bounce'), 400);`. Run it on `#feed` and `#play` clicks.",
  snippet:D`
   function bounce() {
     const pet = document.querySelector('#pet');
     pet.classList.add('bounce');
     setTimeout(() => pet.classList.remove('bounce'), 400);
   }

   document.querySelector('#feed').addEventListener('click', bounce);
   document.querySelector('#play').addEventListener('click', bounce);`,
  hints:["`function bounce() { const pet = document.querySelector('#pet'); pet.classList.add('bounce'); … }`","`setTimeout(() => pet.classList.remove('bounce'), 400);`","`document.querySelector('#feed').addEventListener('click', bounce);` and the same for `#play`."],
  tip:"Your pet is alive! Leave the page open and see how long you can keep it happy. 🐣",
  checks:[clickThen('#feed',a=>a.$('#pet').classList.contains('bounce'),"Clicking **Feed** should add the class `bounce` to `#pet`."),[async a=>{await a.wait(450);a.click('#play');await a.wait(20);return a.$('#pet').classList.contains('bounce');},"Clicking **Play** should make the pet bounce too."]]})
 ]},

/* ================================================================== 11. PIXEL PAINTER */
{id:'pf_pixel',cat:'full',emoji:'🎨',title:'Pixel Painter',mentor:'Pixel Pete, game artist',
 blurb:'A 12 × 12 grid you can paint, click by click or by dragging, with a colour palette and eraser.',
 intro:"Pixel Pete draws characters for video games, one tiny square at a time. You'll build his drawing tool: a grid of **144 squares** made by a loop, a colour picker and palette, click-to-paint AND drag-to-paint, plus an eraser and a clear button. Then draw a heart, a robot or a cat!",
 steps:[
 H('p1','The title',{why:"Every art app needs a name.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",where:"Your code box is empty — type it right at the top.",
  job:"Make a `<header>` with an `<h1>` (the app name) and a `<p>` (how to use it) inside.",
  snippet:D`
   <header>
     <h1>🎨 Pixel Painter</h1>
     <p>Pick a colour, then click the squares. Hold the mouse down to draw!</p>
   </header>`,
  hints:["`<header>` … `</header>`","Inside: `<h1>🎨 Pixel Painter</h1>` and a `<p>`."],
  tip:"Old video games like the first Mario were drawn with pixels just like this.",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Put a `<p>` inside the header.")]}),
 H('p2','Colour tools',{why:"A colour picker for any colour, and a palette for quick favourites.",
  learn:"`<input type=\"color\">` opens a colour picker! Its `value` is a hex colour like `#ff6b6b`.",
  todo:"Add `<div class=\"tools\">` with `<input type=\"color\" id=\"picker\" value=\"#ff6b6b\">` and an empty `<div id=\"palette\"></div>`.",
  job:"Make `<div class=\"tools\">` with `<input type=\"color\" id=\"picker\" value=\"#ff6b6b\">` and an empty `<div id=\"palette\"></div>`.",
  snippet:D`
   <div class="tools">
     <input type="color" id="picker" value="#ff6b6b">
     <div id="palette"></div>
   </div>`,
  hints:["`<div class=\"tools\">` … `</div>`","`<input type=\"color\" id=\"picker\" value=\"#ff6b6b\">` and `<div id=\"palette\"></div>`"],
  tip:"Click the colour box in the preview — your computer's colour picker pops up!",
  checks:[has('.tools input[type="color"]#picker',"Add `<input type=\"color\" id=\"picker\">` inside `<div class=\"tools\">`."),has('.tools #palette',"Add an empty `<div id=\"palette\"></div>` inside `.tools`.")]}),
 H('p3','The canvas',{why:"An empty box for the grid — a loop will fill it with 144 squares.",
  todo:"Add an empty `<div id=\"grid\"></div>`.",
  job:"Add an empty `<div id=\"grid\"></div>`.",
  snippet:D`
   <div id="grid"></div>`,
  hints:["Just one line.","`<div id=\"grid\"></div>`"],
  tip:"144 squares by hand would take ages. A loop does it in a blink!",
  checks:[has('div#grid',"Add `<div id=\"grid\"></div>`.")]}),
 H('p4','Eraser and clear',{why:"Every artist makes mistakes — that's what erasers are for!",
  todo:"Add `<div class=\"buttons\">` with `<button id=\"eraser\">🧽 Eraser</button>` and `<button id=\"clear\">🗑️ Clear all</button>`.",
  job:"Make `<div class=\"buttons\">` with `<button id=\"eraser\">` and `<button id=\"clear\">`.",
  snippet:D`
   <div class="buttons">
     <button id="eraser">🧽 Eraser</button>
     <button id="clear">🗑️ Clear all</button>
   </div>`,
  hints:["`<div class=\"buttons\">` … `</div>`","`<button id=\"eraser\">🧽 Eraser</button>` and `<button id=\"clear\">🗑️ Clear all</button>`"],
  tip:"Bob Ross, a famous painter, said: \"We don't make mistakes, just happy accidents.\"",
  checks:[has('.buttons #eraser',"Add `<button id=\"eraser\">` inside `<div class=\"buttons\">`."),has('.buttons #clear',"Add `<button id=\"clear\">` inside `<div class=\"buttons\">`.")]}),
 C('p5','Studio style',{why:"A bright, clean studio to make art in.",
  learn:BODY_LEARN,
  todo:"Style `body` (font, centered text, padding, gradient). Make `.tools` a centered flex row with a gap.",
  job:"Give `body` a `font-family`, `text-align: center;` and a `linear-gradient` background. Give `.tools` `display: flex;` and `justify-content: center;`.",
  snippet:D`
   body {
     margin: 0;
     padding: 16px;
     min-height: 100vh;
     box-sizing: border-box;
     font-family: Verdana, sans-serif;
     text-align: center;
     color: #334155;
     background: linear-gradient(135deg, #fdf4ff, #ecfeff);
   }
   .tools {
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 12px;
     margin: 12px 0;
   }
   #picker {
     width: 48px;
     height: 40px;
     border: none;
     background: none;
     cursor: pointer;
   }`,
  hints:["`body { font-family: Verdana, sans-serif; text-align: center; background: linear-gradient(135deg, #fdf4ff, #ecfeff); }`","`.tools { display: flex; justify-content: center; align-items: center; gap: 12px; }`","`#picker { width: 48px; height: 40px; border: none; cursor: pointer; }`"],
  tip:"A light background helps your colours look bright and true.",
  checks:[[nonDefaultFont,"Give `body` a `font-family`."],grad('body',"Give `body` a gradient background."),cssIs('.tools','display','flex',"Give `.tools` `display: flex;`"),cssIs('.tools','justifyContent','center',"Give `.tools` `justify-content: center;`")]}),
 C('p6','The 12 × 12 grid',{why:"Set up 12 columns of tiny squares with thin gaps — like graph paper.",
  learn:"`width: max-content;` makes the grid box only as wide as the squares, so `margin: 0 auto;` can center it. `user-select: none;` stops the page selecting text while you drag.",
  todo:"Make `#grid` a grid with `grid-template-columns: repeat(12, 20px);`, `gap: 2px`, a grey background, padding, rounded corners, `width: max-content`, `margin: 0 auto` and `user-select: none`.",
  job:"Give `#grid` `display: grid;`, `grid-template-columns: repeat(12, 20px);` (12 columns) and `gap: 2px;`. Add `width: max-content;` and `margin: 0 auto;`.",
  snippet:D`
   #grid {
     display: grid;
     grid-template-columns: repeat(12, 20px);
     gap: 2px;
     width: max-content;
     margin: 0 auto;
     padding: 8px;
     border-radius: 12px;
     background: #cbd5e1;
     user-select: none;
   }`,
  hints:["`#grid { display: grid; grid-template-columns: repeat(12, 20px); gap: 2px; }`","Add `width: max-content; margin: 0 auto; padding: 8px; border-radius: 12px; background: #cbd5e1; user-select: none;`"],
  tip:"The grey shows through the gaps, making lines between the squares.",
  checks:[cssIs('#grid','display','grid',"Give `#grid` `display: grid;`"),[a=>gridCols(a,'#grid').length===12,"Make 12 columns: `grid-template-columns: repeat(12, 20px);`"],[a=>px(a.css(a.$('#grid'),'columnGap'))>=1,"Give `#grid` a `gap`, like `gap: 2px;`"]]}),
 C('p7','The squares',{why:"Each square starts white, and shows an outline when you point at it.",
  learn:"The squares don't exist yet — JavaScript makes them soon. These rules will be waiting!",
  todo:"Give `.cell` a 20px width and height, a white background, small rounded corners and `cursor: pointer`. Add `.cell:hover` with an `outline`.",
  job:"Give `.cell` `width: 20px;`, `height: 20px;` and `background: white;`. Add `.cell:hover { outline: 2px solid #64748b; }`.",
  snippet:D`
   .cell {
     width: 20px;
     height: 20px;
     border-radius: 3px;
     background: white;
     cursor: pointer;
   }
   .cell:hover {
     outline: 2px solid #64748b;
   }`,
  hints:["`.cell { width: 20px; height: 20px; background: white; border-radius: 3px; cursor: pointer; }`","`.cell:hover { outline: 2px solid #64748b; }`"],
  tip:"`outline` is like a border, but it doesn't make the square bigger. Perfect for hover!",
  checks:[[anyHover(/^\.cell$/,'height'),"Add `.cell { width: 20px; height: 20px; }`"],[anyHover(/^\.cell$/,'backgroundColor'),"Give `.cell` `background: white;`"],[anyHover(/\.cell:hover/,'outlineStyle'),"Add `.cell:hover { outline: 2px solid #64748b; }`"]]}),
 C('p8','Swatches and buttons',{why:"Round paint blobs for the palette, and friendly buttons.",
  todo:"Give `.swatch` a 30px size, `border-radius: 50%`, a white border, a shadow, `cursor: pointer` and a little margin. Make `.buttons button` rounded with `cursor: pointer`.",
  job:"Give `.swatch` `width: 30px;`, `height: 30px;` and `border-radius: 50%;`. Give `.buttons button` a `border-radius` and `cursor: pointer;`.",
  snippet:D`
   .swatch {
     width: 30px;
     height: 30px;
     margin: 0 3px;
     border: 3px solid white;
     border-radius: 50%;
     box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
     cursor: pointer;
   }
   .buttons {
     margin-top: 14px;
   }
   .buttons button {
     margin: 4px;
     padding: 10px 16px;
     border: none;
     border-radius: 99px;
     background: white;
     font-size: 15px;
     box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
     cursor: pointer;
   }`,
  hints:["`.swatch { width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; cursor: pointer; }`","`.buttons button { padding: 10px 16px; border: none; border-radius: 99px; background: white; cursor: pointer; }`"],
  tip:"A white border around each blob makes the colours pop, even dark ones.",
  checks:[[anyHover(/\.swatch/,'borderTopLeftRadius'),"Add `.swatch { border-radius: 50%; }` (and 30px width and height)."],cssMin('.buttons button','borderTopLeftRadius',1,"Round the buttons: `border-radius: 99px;`"),cssIs('.buttons button','cursor','pointer',"Give `.buttons button` `cursor: pointer;`")]}),
 J('p9','Make 144 squares',{why:"A loop makes all the squares for you — 12 rows of 12.",
  learn:"`for (let i = 0; i < 144; i++)` counts from 0 to 143 — that's 144 times! Each time, we make one square.",
  todo:"Loop 144 times. Each time, make a `div` with the class `cell` and add it to `#grid`.",
  job:"Write `for (let i = 0; i < 144; i++) { … }`. Inside, make a `div`, give it `className = 'cell'`, and `appendChild` it to `#grid`.",
  snippet:D`
   const grid = document.querySelector('#grid');

   for (let i = 0; i < 144; i++) {
     const cell = document.createElement('div');
     cell.className = 'cell';
     grid.appendChild(cell);
   }`,
  hints:["Start your script: `<script>` at the very bottom. Then `const grid = document.querySelector('#grid');`","`for (let i = 0; i < 144; i++) { … }`","Inside: `const cell = document.createElement('div'); cell.className = 'cell'; grid.appendChild(cell);`"],
  tip:"12 × 12 = 144. Want a bigger canvas? 16 × 16 = 256 — change the loop AND the CSS columns!",
  checks:[[a=>a.$$('#grid .cell').length===144,"Make exactly **144** `.cell` squares inside `#grid`."]]}),
 J('p10','Click to paint',{why:"Click a square and it fills with your colour!",
  learn:"• `color` remembers the current colour. The picker's `input` event updates it when you choose a new one.\n• One `click` listener on the whole `grid` works for all 144 squares — `e.target` is the square you clicked.",
  todo:"Make `let color` from `#picker`'s value. Update it on the picker's `input` event. When `grid` is clicked on a `.cell`, set its `style.background` to `color`.",
  job:"Make `let color = picker.value;`. On the picker's `input` event, update `color`. On `grid` click: if `e.target` has class `cell`, set its `style.background = color;`.",
  snippet:D`
   const picker = document.querySelector('#picker');
   let color = picker.value;

   picker.addEventListener('input', () => {
     color = picker.value;
   });

   grid.addEventListener('click', e => {
     if (e.target.classList.contains('cell')) {
       e.target.style.background = color;
     }
   });`,
  hints:["`const picker = document.querySelector('#picker'); let color = picker.value;`","`picker.addEventListener('input', () => { color = picker.value; });`","`grid.addEventListener('click', e => { if (e.target.classList.contains('cell')) { e.target.style.background = color; } });`"],
  tip:"Try painting a smiley face in the preview!",
  checks:[[a=>{const c=a.$$('#grid .cell')[0];if(!c)return false;a.click(c);return a.css(c,'backgroundColor')===hexRgb(a.$('#picker').value);},"Clicking a square should paint it with the picker's colour."],[a=>{a.type('#picker','#00aa00');const c=a.$$('#grid .cell')[1];a.click(c);return a.css(c,'backgroundColor')==='rgb(0, 170, 0)';},"Choosing a new colour in the picker should paint with the new colour."]]}),
 J('p11','The palette',{why:"Quick colour blobs, so you don't have to open the picker every time.",
  todo:"Make a `colors` list of at least 4 hex colours. For each one, make a `<button class=\"swatch\">` with that background. Clicking it sets `color` (and the picker) to that colour. Add each to `#palette`.",
  job:"Make a `colors` list (4 or more hex colours). For each, make a `button` with class `swatch` and that background. On click: `color = c;` and `picker.value = c;`.",
  snippet:D`
   const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#b983ff', '#222222'];
   const palette = document.querySelector('#palette');

   colors.forEach(c => {
     const swatch = document.createElement('button');
     swatch.className = 'swatch';
     swatch.style.background = c;
     swatch.addEventListener('click', () => {
       color = c;
       picker.value = c;
     });
     palette.appendChild(swatch);
   });`,
  hints:["`const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'];` and `const palette = document.querySelector('#palette');`","`colors.forEach(c => { const swatch = document.createElement('button'); swatch.className = 'swatch'; swatch.style.background = c; … });`","Inside too: `swatch.addEventListener('click', () => { color = c; picker.value = c; }); palette.appendChild(swatch);`"],
  tip:"Use only 4–6 colours for a real retro video-game look!",
  checks:[[a=>a.$$('#palette .swatch').length>=4,"Make at least 4 `.swatch` buttons inside `#palette`."],[a=>{const s=a.$$('#palette .swatch')[2];if(!s)return false;a.click(s);const c=a.$$('#grid .cell')[5];a.click(c);return a.css(c,'backgroundColor')===a.css(s,'backgroundColor');},"Click a swatch, then a square: the square should get the swatch's colour."]]}),
 J('p12','Drag to draw',{why:"Clicking every square is slow. Hold the mouse down and drag to draw lines!",
  learn:"• `mousedown` = the mouse button goes down. `mouseup` = it comes back up.\n• `mouseover` happens when the mouse moves onto a square.\n• `drawing` remembers if the button is held down. Only paint when it's `true`.",
  todo:"Make `let drawing = false;`. On `grid` `mousedown`, set it to true (and `e.preventDefault()`). On `document` `mouseup`, set it to false. On `grid` `mouseover`, paint the `.cell` if `drawing` is true.",
  job:"Make `let drawing = false;`. `mousedown` on `grid` → `true`. `mouseup` on `document` → `false`. `mouseover` on `grid`: if `drawing` and it's a `.cell`, paint it with `color`.",
  snippet:D`
   let drawing = false;

   grid.addEventListener('mousedown', e => {
     drawing = true;
     e.preventDefault();
   });

   document.addEventListener('mouseup', () => {
     drawing = false;
   });

   grid.addEventListener('mouseover', e => {
     if (drawing && e.target.classList.contains('cell')) {
       e.target.style.background = color;
     }
   });`,
  hints:["`let drawing = false;` then `grid.addEventListener('mousedown', e => { drawing = true; e.preventDefault(); });`","`document.addEventListener('mouseup', () => { drawing = false; });`","`grid.addEventListener('mouseover', e => { if (drawing && e.target.classList.contains('cell')) { e.target.style.background = color; } });`"],
  tip:"`&&` means AND: only paint if the mouse is down AND you're over a square.",
  checks:[[a=>{const cs=a.$$('#grid .cell'),M=(el,t)=>el.dispatchEvent(new a.win.MouseEvent(t,{bubbles:true}));if(cs.length<40)return false;M(cs[20],'mousedown');M(cs[21],'mouseover');M(cs[22],'mouseover');return [21,22].every(i=>a.css(cs[i],'backgroundColor')!==WHITE);},"Hold the mouse down and move over squares: they should get painted."],[a=>{const cs=a.$$('#grid .cell'),M=(el,t)=>el.dispatchEvent(new a.win.MouseEvent(t,{bubbles:true}));M(cs[22],'mouseup');M(cs[30],'mouseover');return a.css(cs[30],'backgroundColor')===WHITE;},"After letting go (`mouseup`), moving over squares should NOT paint them."]]}),
 J('p13','Clear all',{why:"Start a brand-new drawing with one click.",
  learn:"Setting `style.background = ''` removes the colour you painted, so the square goes back to its CSS colour (white).",
  todo:"When `#clear` is clicked, go through every `.cell` and set its `style.background` to `''`.",
  job:"On `#clear` click: `grid.querySelectorAll('.cell').forEach(…)` and set each cell's `style.background = '';`.",
  snippet:D`
   document.querySelector('#clear').addEventListener('click', () => {
     grid.querySelectorAll('.cell').forEach(cell => {
       cell.style.background = '';
     });
   });`,
  hints:["`document.querySelector('#clear').addEventListener('click', () => { … });`","Inside: `grid.querySelectorAll('.cell').forEach(cell => { cell.style.background = ''; });`"],
  tip:"Before you clear, take a screenshot of your art to keep it!",
  checks:[[a=>{const cs=a.$$('#grid .cell');a.click(cs[0]);a.click(cs[1]);a.click('#clear');return a.$$('#grid .cell').every(c=>a.css(c,'backgroundColor')===WHITE);},"**Clear all** should turn every square back to white."]]}),
 J('p14','The eraser',{why:"Fix one square without clearing everything.",
  todo:"When `#eraser` is clicked, set `color` to `'white'`.",
  job:"On `#eraser` click: `color = 'white';`. Then clicking squares paints them white.",
  snippet:D`
   document.querySelector('#eraser').addEventListener('click', () => {
     color = 'white';
   });`,
  hints:["`document.querySelector('#eraser').addEventListener('click', () => { … });`","Inside: `color = 'white';`"],
  tip:"Your art studio is done! Draw a pixel portrait of your family and show them. 🎨",
  checks:[[a=>{const c=a.$$('#grid .cell')[3];a.click(c);if(a.css(c,'backgroundColor')===WHITE)return false;a.click('#eraser');a.click(c);return a.css(c,'backgroundColor')===WHITE;},"Click **Eraser**, then a painted square: it should turn white."],[a=>{const s=a.$('#palette .swatch');a.click(s);const c=a.$$('#grid .cell')[4];a.click(c);return a.css(c,'backgroundColor')!==WHITE;},"Picking a swatch after the eraser should paint with colour again."]]})
 ]}
);
})();
