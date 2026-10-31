/* =====================================================================
   PROJECTS · CSS only ("css") — the HTML is GIVEN in `base`; the player only styles it.
   Every step is a CSS step. Ids prefixed pc_.
   ===================================================================== */
(()=>{
const {H,C,J,W_HTML,W_CSS,W_JS,nonDefaultFont,labelLinked,anyHover,hasMedia,grad,transOn,clickThen,noErrors}=PK;

/* ---- local helpers ---- */
const CH='Style it (CSS)';
const W_IN='Inside the `<style>` section, just before `</style>`.';
const S=(id,title,o)=>C(id,title,Object.assign({ch:CH,where:W_IN},o));
const rx=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
/* add property lines to the END of an existing rule, e.g. addTo('.card',['box-shadow: ...;']) */
const addTo=(sel,lines)=>c=>{
  const re=new RegExp('((?:^|\\n)[ \\t]*'+rx(sel)+'\\s*\\{)([^}]*?)(\\n?[ \\t]*\\})');
  const m=re.exec(c);if(!m)return c;
  const ind=(/\n([ \t]+)\S/.exec(m[2])||[0,'    '])[1];
  let body=m[2].replace(/\s+$/,'');if(body.trim()&&!/;$/.test(body))body+=';';
  return c.slice(0,m.index)+m[1]+body+lines.map(l=>'\n'+ind+l).join('')+m[3]+c.slice(m.index+m[0].length);};
const inRule=sel=>"Inside your `"+sel+" { }` rule, just before its closing `}`.";
const bg=(s,m)=>cssNot(s,'backgroundColor',[CLEAR],m);
const bgWhite=(s,m)=>cssIs(s,'backgroundColor',WHITE,m);
const bgOrGrad=(s,m)=>[a=>{const e=a.$(s);return !!e&&(a.css(e,'backgroundColor')!==CLEAR||/gradient/.test(a.css(e,'backgroundImage')));},m];
const notInk=(s,m)=>cssNot(s,'color',[INK,'rgb(0, 0, 0)'],m);
const round=(s,n,m)=>cssMin(s,'borderTopLeftRadius',n,m);
const circle=(s,m)=>cssIs(s,'borderTopLeftRadius','50%',m);
const maxPx=(s,p,n,m)=>[a=>{const e=a.$(s);return !!e&&px(a.css(e,p))<=n;},m];
const kf=(name,m)=>[a=>a.rules().some(r=>r.type===7&&r.name===name),m];
const anim=(s,name,m)=>[a=>{const e=a.$(s);return !!e&&a.css(e,'animationName').split(',').map(x=>x.trim()).includes(name);},m];
const box=(a,s)=>{const e=a.$(s);return e?e.getBoundingClientRect():null;};
const sameRow=(s1,s2,m)=>[a=>{const p=box(a,s1),q=box(a,s2);return !!p&&!!q&&Math.abs(p.top-q.top)<=2&&Math.abs(p.left-q.left)>10;},m];
const fontDiff=(s,m)=>[a=>{const e=a.$(s);return !!e&&a.css(e,'fontFamily')!==a.css(a.doc.body,'fontFamily');},m];
const fontCheck=[nonDefaultFont,"Give `body` a `font-family` (any font name works)."];

PK.PROJECTS.push(
/* ------------------------------------------------------------------ 1 */
{id:'pc_planet',cat:'css',emoji:'🪐',title:'Planet Poster',mentor:'Nova, space explorer',
 blurb:'Turn a plain page about Saturn into a glowing space poster.',
 intro:"Nova is giving a talk about Saturn and needs a poster. The words are already written — your job is to make it **look amazing** with colours, fonts and a space-sky gradient.",
 base:`<div class="poster">
  <h1 class="title">Planet Saturn</h1>
  <p class="tagline">The jewel of our solar system</p>
  <div class="planet">🪐</div>
  <ul class="facts">
    <li>Saturn has more than 140 moons</li>
    <li>Its rings are made of ice and rock</li>
    <li>It is so light it could float in a giant bathtub!</li>
  </ul>
  <p class="credit">Poster made by a Code Arcade space cadet</p>
</div>

<style>

</style>`,
 steps:[
 S('p1','A space-age font',{why:"Posters need a fun font. Plain old default letters are SO boring.",
  learn:"`body { }` styles the whole page. `font-family` picks the letters. `margin: 0;` removes the white gap around the edge.",
  todo:"Make a `body { }` rule with `margin: 0;` and `font-family: 'Trebuchet MS', sans-serif;`. (Any font name works!)",
  job:"Change the font. Inside `body { }` put `margin: 0;` and `font-family: 'Trebuchet MS', sans-serif;`.",
  snippet:`body {
  margin: 0;
  font-family: 'Trebuchet MS', sans-serif;
}`,
  hints:["Start with `body {` and finish with `}`.","Inside: `margin: 0;` then `font-family: 'Trebuchet MS', sans-serif;`"],
  tip:"The second font (`sans-serif`) is a backup, in case the computer doesn't have the first one.",
  checks:[fontCheck,cssPx('body','marginTop',0,"Add `margin: 0;` inside `body { }`.")]}),
 S('p2','A sky of colour',{why:"Space isn't white! Let's paint a soft sky that fades from blue to pink.",
  learn:"`linear-gradient(#cfe8ff, #ffe3f1)` fades from the first colour (top) to the second (bottom). It goes in `background`.\n`text-align: center;` puts all the words in the middle.",
  todo:"Style `.poster` with `background: linear-gradient(#cfe8ff, #ffe3f1);`, `padding: 30px;` and `text-align: center;`.",
  job:"Paint the poster. Inside `.poster { }` put `background: linear-gradient(#cfe8ff, #ffe3f1);`, `padding: 30px;` and `text-align: center;`.",
  snippet:`.poster {
  background: linear-gradient(#cfe8ff, #ffe3f1);
  padding: 30px;
  text-align: center;
}`,
  hints:["The class is `poster`, so the rule starts with a dot: `.poster { }`.","`background: linear-gradient(#cfe8ff, #ffe3f1); padding: 30px; text-align: center;`"],
  tip:"Try three colours: `linear-gradient(#cfe8ff, #e5d4ff, #ffe3f1)`.",
  checks:[grad('.poster',"Give `.poster` a `background: linear-gradient(...)`."),cssMin('.poster','paddingTop',10,"Add `padding: 30px;` to `.poster`."),cssIs('.poster','textAlign','center',"Add `text-align: center;` to `.poster`.")]}),
 S('p3','A big bold title',{why:"The planet's name should be the first thing everyone sees.",
  todo:"Style `.title` with `color: #6a4cff;`, `font-size: 48px;` and `margin: 0;`.",
  job:"Make the title big and purple. Inside `.title { }` put `color: #6a4cff;`, `font-size: 48px;` and `margin: 0;`.",
  snippet:`.title {
  color: #6a4cff;
  font-size: 48px;
  margin: 0;
}`,
  hints:["New rule: `.title { }`.","`color: #6a4cff; font-size: 48px; margin: 0;`"],
  tip:"`#6a4cff` is a hex colour. Any colour you like works here!",
  checks:[notInk('.title',"Give `.title` a `color`, like `color: #6a4cff;`."),cssMin('.title','fontSize',40,"Make `.title` big: `font-size: 48px;`."),cssPx('.title','marginTop',0,"Add `margin: 0;` to `.title`.")]}),
 S('p4','A fancy tagline',{why:"A slanted, pink tagline looks like a movie poster.",
  learn:"`font-style: italic;` makes letters lean over, *like this*.",
  todo:"Style `.tagline` with `color: #ff5fa2;`, `font-style: italic;` and `font-size: 20px;`.",
  job:"Make the small line pink and slanted. Inside `.tagline { }` put `color: #ff5fa2;`, `font-style: italic;` and `font-size: 20px;`.",
  snippet:`.tagline {
  color: #ff5fa2;
  font-style: italic;
  font-size: 20px;
}`,
  hints:["New rule: `.tagline { }`.","`color: #ff5fa2; font-style: italic; font-size: 20px;`"],
  tip:"Italic is great for short lines. Long italic paragraphs are hard to read.",
  checks:[cssIs('.tagline','fontStyle','italic',"Add `font-style: italic;` to `.tagline`."),notInk('.tagline',"Give `.tagline` a `color`, like `color: #ff5fa2;`.")]}),
 S('p5','A giant planet',{why:"The emoji is tiny. Emojis are letters, so we can make them HUGE with font-size.",
  todo:"Style `.planet` with `font-size: 120px;`.",
  job:"Make the planet giant. Inside `.planet { }` put `font-size: 120px;`.",
  snippet:`.planet {
  font-size: 120px;
}`,
  hints:["New rule: `.planet { }`.","`.planet { font-size: 120px; }`"],
  tip:"Emojis are free pictures — no image files needed!",
  checks:[cssMin('.planet','fontSize',100,"Make `.planet` huge: `font-size: 120px;`.")]}),
 S('p6','Tidy the fact list',{why:"The dots and the gap on the left look messy on a poster.",
  learn:"`list-style: none;` removes the dots. `padding: 0;` removes the gap a list has on its left side.",
  todo:"Style `.facts` with `list-style: none;` and `padding: 0;`.",
  job:"Take the dots off the list. Inside `.facts { }` put `list-style: none;` and `padding: 0;`.",
  snippet:`.facts {
  list-style: none;
  padding: 0;
}`,
  hints:["New rule: `.facts { }`.","`list-style: none; padding: 0;`"],
  tip:"Almost every menu on the internet is a list with `list-style: none;`!",
  checks:[cssIs('.facts','listStyleType','none',"Add `list-style: none;` to `.facts`."),cssPx('.facts','paddingLeft',0,"Add `padding: 0;` to `.facts`.")]}),
 S('p7','Fact bubbles',{why:"Each fact in its own white bubble is much easier to read.",
  learn:"`.facts li` means: every `<li>` INSIDE `.facts`. `margin: 10px auto;` = 10px gap on top and bottom, and centred left-to-right.",
  todo:"Style `.facts li` with `background-color: white;`, `margin: 10px auto;`, `padding: 10px;`, `max-width: 320px;` and `border-radius: 20px;`.",
  job:"Put each fact in a white bubble. Inside `.facts li { }` put `background-color: white;`, `margin: 10px auto;`, `padding: 10px;`, `max-width: 320px;` and `border-radius: 20px;`.",
  snippet:`.facts li {
  background-color: white;
  margin: 10px auto;
  padding: 10px;
  max-width: 320px;
  border-radius: 20px;
}`,
  hints:["The rule is `.facts li { }` — a space between them.","`background-color: white; margin: 10px auto; padding: 10px; max-width: 320px; border-radius: 20px;`"],
  tip:"Big `border-radius` turns boxes into pills.",
  checks:[bgWhite('.facts li',"Give `.facts li` `background-color: white;`."),round('.facts li',10,"Round the bubbles: `border-radius: 20px;`."),cssMin('.facts li','paddingTop',5,"Add `padding: 10px;` to `.facts li`.")]}),
 S('p8','The small print',{why:"The credit line should be small and soft, so it doesn't steal attention.",
  learn:"`opacity` makes things see-through. `1` = solid, `0.5` = half see-through, `0` = invisible.",
  todo:"Style `.credit` with `font-size: 13px;` and `opacity: 0.7;`.",
  job:"Make the last line small and soft. Inside `.credit { }` put `font-size: 13px;` and `opacity: 0.7;`.",
  snippet:`.credit {
  font-size: 13px;
  opacity: 0.7;
}`,
  hints:["New rule: `.credit { }`.","`font-size: 13px; opacity: 0.7;`"],
  tip:"Your poster is done! Press Full preview and show it off. 🚀",
  checks:[maxPx('.credit','fontSize',14,"Make `.credit` small: `font-size: 13px;`."),[a=>parseFloat(a.css(a.$('.credit'),'opacity'))<1,"Add `opacity: 0.7;` to `.credit`."]]})
 ]},
/* ------------------------------------------------------------------ 2 */
{id:'pc_candy',cat:'css',emoji:'🍭',title:'Candy Arcade Scoreboard',mentor:'Taffy, arcade owner',
 blurb:'Style a high-score table with candy colours, stripes and a gold winner row.',
 intro:"Taffy's candy arcade has a high-score table, but it looks like homework. Make it sweet! You'll learn how to style **tables**: borders, stripes and a special row for the champion.",
 base:`<div class="board">
  <h1>🍭 Candy Arcade High Scores</h1>
  <table class="scores">
    <thead>
      <tr><th>Rank</th><th>Player</th><th>Game</th><th>Score</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Lolli</td><td>Gumball Dash</td><td class="score">98,450</td></tr>
      <tr><td>2</td><td>Jelly Jo</td><td>Sugar Rush</td><td class="score">87,200</td></tr>
      <tr><td>3</td><td>Mintz</td><td>Lollipop Ladder</td><td class="score">76,930</td></tr>
      <tr><td>4</td><td>Coco</td><td>Gumball Dash</td><td class="score">64,115</td></tr>
      <tr><td>5</td><td>Fizz</td><td>Choc Blaster</td><td class="score">59,870</td></tr>
      <tr><td>6</td><td>Taffy Jr</td><td>Sugar Rush</td><td class="score">41,300</td></tr>
    </tbody>
  </table>
  <p class="note">Got a new high score? Tell Taffy at the front desk!</p>
</div>

<style>

</style>`,
 steps:[
 S('s1','Candy pink page',{why:"An arcade should look sweet from the very first second.",
  todo:"Style `body` with `background-color: #fff0f6;` and `font-family: Verdana, sans-serif;`.",
  job:"Make the page candy pink. Inside `body { }` put `background-color: #fff0f6;` and `font-family: Verdana, sans-serif;`.",
  snippet:`body {
  background-color: #fff0f6;
  font-family: Verdana, sans-serif;
}`,
  hints:["Start with `body { }`.","`background-color: #fff0f6; font-family: Verdana, sans-serif;`"],
  tip:"Verdana is wide and clear — great for numbers on a scoreboard.",
  checks:[cssNot('body','backgroundColor',[CLEAR,WHITE],"Give `body` a `background-color`, like `#fff0f6`."),fontCheck]}),
 S('s2','The score board',{why:"Put everything on a white board with a candy-pink frame.",
  learn:"`border: 4px solid #ffc2dc;` = a line 4px thick, solid, pink. `margin: 0 auto;` centres a box that has a `max-width`.",
  todo:"Style `.board` with `max-width: 600px;`, `margin: 0 auto;`, `background-color: white;`, `border: 4px solid #ffc2dc;`, `border-radius: 20px;` and `padding: 16px;`.",
  job:"Make a white board with a pink frame. Inside `.board { }` put `max-width: 600px;`, `margin: 0 auto;`, `background-color: white;`, `border: 4px solid #ffc2dc;`, `border-radius: 20px;`, `padding: 16px;`.",
  snippet:`.board {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  border: 4px solid #ffc2dc;
  border-radius: 20px;
  padding: 16px;
}`,
  hints:["New rule: `.board { }`.","`max-width: 600px; margin: 0 auto; background-color: white;`","Then `border: 4px solid #ffc2dc; border-radius: 20px; padding: 16px;`"],
  tip:"Border needs three things: thickness, style (solid, dotted, dashed) and colour.",
  checks:[bgWhite('.board',"Give `.board` `background-color: white;`."),cssPx('.board','borderTopWidth',4,"Give `.board` `border: 4px solid #ffc2dc;`."),round('.board',5,"Round the board: `border-radius: 20px;`.")]}),
 S('s3','Sweet heading',{why:"The heading should be pink and right in the middle.",
  todo:"Style `h1` with `text-align: center;`, `color: #ff5fa2;` and `font-size: 28px;`.",
  job:"Make the heading pink and centred. Inside `h1 { }` put `text-align: center;`, `color: #ff5fa2;` and `font-size: 28px;`.",
  snippet:`h1 {
  text-align: center;
  color: #ff5fa2;
  font-size: 28px;
}`,
  hints:["`h1` is a tag, so no dot: `h1 { }`.","`text-align: center; color: #ff5fa2; font-size: 28px;`"],
  tip:"No dot = a tag (`h1`). A dot = a class (`.board`).",
  checks:[cssIs('h1','textAlign','center',"Add `text-align: center;` to `h1`."),notInk('h1',"Give `h1` a `color`, like `#ff5fa2`.")]}),
 S('s4','A full-width table',{why:"Tables start squashed with double lines. Let's fix both.",
  learn:"`border-collapse: collapse;` squashes the double lines between cells into ONE line. `width: 100%;` stretches the table across the board.",
  todo:"Style `.scores` with `width: 100%;` and `border-collapse: collapse;`.",
  job:"Stretch the table. Inside `.scores { }` put `width: 100%;` and `border-collapse: collapse;`.",
  snippet:`.scores {
  width: 100%;
  border-collapse: collapse;
}`,
  hints:["New rule: `.scores { }`.","`width: 100%; border-collapse: collapse;`"],
  tip:"You won't see the collapse yet — the lines come next step!",
  checks:[cssIs('.scores','borderCollapse','collapse',"Add `border-collapse: collapse;` to `.scores`."),[a=>{const t=a.$('.scores'),b=a.$('.board');return !!t&&!!b&&t.getBoundingClientRect().width>=b.clientWidth-px(a.css(b,'paddingLeft'))*2-2;},"Add `width: 100%;` to `.scores`."]]}),
 S('s5','Cell borders',{why:"Now every cell gets padding and a pink line around it.",
  learn:"A comma means 'both of these': `.scores th, .scores td { }` styles header cells AND normal cells.",
  todo:"Style `.scores th, .scores td` with `padding: 10px;` and `border: 2px solid #ffd6e8;`.",
  job:"Give every cell room and a pink line. Inside `.scores th, .scores td { }` put `padding: 10px;` and `border: 2px solid #ffd6e8;`.",
  snippet:`.scores th,
.scores td {
  padding: 10px;
  border: 2px solid #ffd6e8;
}`,
  hints:["The selector is `.scores th, .scores td { }`.","`padding: 10px; border: 2px solid #ffd6e8;`"],
  tip:"`th` = table heading cell. `td` = table data cell.",
  checks:[cssIs('.scores td','borderTopStyle','solid',"Give the cells `border: 2px solid #ffd6e8;`."),cssMin('.scores td','paddingTop',6,"Give the cells `padding: 10px;`.")]}),
 S('s6','Minty headings',{why:"The top row should look different, so people know it's the labels.",
  todo:"Style `.scores th` with `background-color: #b8f2e6;` and `color: #26735f;`.",
  job:"Make the top row minty green. Inside `.scores th { }` put `background-color: #b8f2e6;` and `color: #26735f;`.",
  snippet:`.scores th {
  background-color: #b8f2e6;
  color: #26735f;
}`,
  hints:["New rule: `.scores th { }`.","`background-color: #b8f2e6; color: #26735f;`"],
  tip:"Mint and pink are 'pastel' colours — soft and happy.",
  checks:[bg('.scores th',"Give `.scores th` a `background-color`, like `#b8f2e6`.")]}),
 S('s7','Candy stripes',{why:"Stripes help your eyes follow a row from left to right.",
  learn:"`tr:nth-child(even)` picks rows 2, 4, 6… (`odd` picks 1, 3, 5…). One rule, every other row!",
  todo:"Style `.scores tbody tr:nth-child(even)` with `background-color: #fff7cc;`.",
  job:"Colour every 2nd row lemon yellow. Inside `.scores tbody tr:nth-child(even) { }` put `background-color: #fff7cc;`.",
  snippet:`.scores tbody tr:nth-child(even) {
  background-color: #fff7cc;
}`,
  hints:["The selector is long: `.scores tbody tr:nth-child(even)`.","`.scores tbody tr:nth-child(even) { background-color: #fff7cc; }`"],
  tip:"Try `nth-child(3n)` — it colours every 3rd row!",
  checks:[[a=>{const r=a.$$('.scores tbody tr');return r.length>2&&a.css(r[1],'backgroundColor')!==CLEAR&&a.css(r[2],'backgroundColor')===CLEAR;},"Use `.scores tbody tr:nth-child(even) { background-color: #fff7cc; }` so only rows 2, 4, 6 get colour."]]}),
 S('s8','The gold champion',{why:"The number 1 player deserves a gold row!",
  learn:"`:first-child` picks only the FIRST one.",
  todo:"Style `.scores tbody tr:first-child` with `background-color: #ffe08a;` and `font-weight: bold;`.",
  job:"Make row 1 gold and bold. Inside `.scores tbody tr:first-child { }` put `background-color: #ffe08a;` and `font-weight: bold;`.",
  snippet:`.scores tbody tr:first-child {
  background-color: #ffe08a;
  font-weight: bold;
}`,
  hints:["The selector: `.scores tbody tr:first-child`.","`background-color: #ffe08a; font-weight: bold;`"],
  tip:"There's also `:last-child` — for the last one.",
  checks:[bg('.scores tbody tr:first-child',"Give `.scores tbody tr:first-child` `background-color: #ffe08a;`."),cssIs('.scores tbody tr:first-child','fontWeight','700',"Add `font-weight: bold;` to the first row.")]}),
 S('s9','Score numbers',{why:"Numbers line up best on the right, in a computer-style font.",
  todo:"Style `.score` with `text-align: right;`, `font-family: 'Courier New', monospace;` and `color: #e0457b;`.",
  job:"Push the scores to the right. Inside `.score { }` put `text-align: right;`, `font-family: 'Courier New', monospace;` and `color: #e0457b;`.",
  snippet:`.score {
  text-align: right;
  font-family: 'Courier New', monospace;
  color: #e0457b;
}`,
  hints:["The score cells have `class=\"score\"`, so: `.score { }`.","`text-align: right; font-family: 'Courier New', monospace; color: #e0457b;`"],
  tip:"In a 'monospace' font every letter is the same width — so numbers line up perfectly.",
  checks:[cssIs('.score','textAlign','right',"Add `text-align: right;` to `.score`."),notInk('.score',"Give `.score` a `color`, like `#e0457b`.")]}),
 S('s10','Hover glow',{why:"When you point at a row, it should light up — like a real arcade screen.",
  learn:"`:hover` styles only work while the mouse is over the thing.",
  todo:"Style `.scores tbody tr:hover` with `background-color: #d7f0ff;`.",
  job:"Make rows glow blue when you point at them. Inside `.scores tbody tr:hover { }` put `background-color: #d7f0ff;`.",
  snippet:`.scores tbody tr:hover {
  background-color: #d7f0ff;
}`,
  hints:["Selector: `.scores tbody tr:hover`.","`.scores tbody tr:hover { background-color: #d7f0ff; }`"],
  tip:"Move your mouse over the preview rows to test it. Game over — you win! 🏆",
  checks:[hoverRule('tr:hover',"Add `.scores tbody tr:hover { background-color: #d7f0ff; }`.")]})
 ]},
/* ------------------------------------------------------------------ 3 */
{id:'pc_weather',cat:'css',emoji:'⛅',title:'Weather Card',mentor:'Sunny, weather reporter',
 blurb:'A sleek weather app card, centred on the screen with flexbox and a soft shadow.',
 intro:"Sunny reads the weather on TV and wants a weather card like the ones on phones. You'll learn the famous **flexbox centring** trick, rounded cards and soft shadows.",
 base:`<div class="screen">
  <div class="card">
    <div class="icon">⛅</div>
    <h1 class="temp">23°</h1>
    <p class="city">Sydney</p>
    <p class="desc">Partly cloudy</p>
    <div class="details">
      <div class="detail">💧<b>60%</b>Humidity</div>
      <div class="detail">💨<b>12 km/h</b>Wind</div>
      <div class="detail">☀️<b>UV 6</b>High</div>
    </div>
  </div>
</div>

<style>

</style>`,
 steps:[
 S('w1','Sky-blue page',{why:"A weather app should feel light and airy.",
  todo:"Style `body` with `margin: 0;`, `font-family: 'Segoe UI', sans-serif;` and `background-color: #e6f4ff;`.",
  job:"Make the page sky blue. Inside `body { }` put `margin: 0;`, `font-family: 'Segoe UI', sans-serif;` and `background-color: #e6f4ff;`.",
  snippet:`body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #e6f4ff;
}`,
  hints:["Start with `body { }`.","`margin: 0; font-family: 'Segoe UI', sans-serif; background-color: #e6f4ff;`"],
  tip:"Phone apps love clean fonts like Segoe UI, Roboto and Helvetica.",
  checks:[cssPx('body','marginTop',0,"Add `margin: 0;` to `body`."),fontCheck,bg('body',"Give `body` `background-color: #e6f4ff;`.")]}),
 S('w2','Centre it with flexbox',{why:"Putting something in the EXACT middle of the screen used to be really hard. Flexbox makes it easy!",
  learn:"Three magic lines on the parent box:\n`display: flex;` turns on flexbox.\n`justify-content: center;` centres left-to-right.\n`align-items: center;` centres top-to-bottom.\n`min-height: 100vh;` makes the box as tall as the screen.",
  todo:"Style `.screen` with `display: flex;`, `justify-content: center;`, `align-items: center;` and `min-height: 100vh;`.",
  job:"Put the card in the middle of the screen. Inside `.screen { }` put `display: flex;`, `justify-content: center;`, `align-items: center;` and `min-height: 100vh;`.",
  snippet:`.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
  hints:["New rule: `.screen { }` — the box AROUND the card.","`display: flex; justify-content: center; align-items: center; min-height: 100vh;`"],
  tip:"`vh` means 'viewport height'. `100vh` = the whole height of the screen.",
  checks:[cssIs('.screen','display','flex',"Add `display: flex;` to `.screen`."),cssIs('.screen','justifyContent','center',"Add `justify-content: center;` to `.screen`."),cssIs('.screen','alignItems','center',"Add `align-items: center;` to `.screen`.")]}),
 S('w3','The card',{why:"Now make the card itself: white, rounded and a fixed size, like a phone widget.",
  todo:"Style `.card` with `background-color: white;`, `width: 260px;`, `padding: 24px;`, `text-align: center;` and `border-radius: 24px;`.",
  job:"Make a white rounded card. Inside `.card { }` put `background-color: white;`, `width: 260px;`, `padding: 24px;`, `text-align: center;` and `border-radius: 24px;`.",
  snippet:`.card {
  background-color: white;
  width: 260px;
  padding: 24px;
  text-align: center;
  border-radius: 24px;
}`,
  hints:["New rule: `.card { }`.","`background-color: white; width: 260px; padding: 24px;`","Then `text-align: center; border-radius: 24px;`"],
  tip:"Still in the middle? Yes! The flexbox from last step keeps it centred.",
  checks:[bgWhite('.card',"Give `.card` `background-color: white;`."),cssPx('.card','width',260,"Give `.card` `width: 260px;`."),cssIs('.card','textAlign','center',"Add `text-align: center;` to `.card`."),round('.card',10,"Round the card: `border-radius: 24px;`.")]}),
 S('w4','A soft shadow',{why:"A shadow makes the card look like it's floating above the page.",
  learn:"`box-shadow: 0 10px 30px rgba(0, 120, 255, 0.15);`\n`0` = left/right shift · `10px` = down shift · `30px` = blur · the colour is a see-through blue.",
  todo:"Add `box-shadow: 0 10px 30px rgba(0, 120, 255, 0.15);` to your `.card` rule.",
  job:"Make the card float. Add `box-shadow: 0 10px 30px rgba(0, 120, 255, 0.15);` inside your `.card { }` rule.",
  where:inRule('.card'),kind:'edit',apply:addTo('.card',['box-shadow: 0 10px 30px rgba(0, 120, 255, 0.15);']),
  snippet:`.card {
  background-color: white;
  width: 260px;
  padding: 24px;
  text-align: center;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 120, 255, 0.15);
}`,
  hints:["Don't make a new rule — add one line to `.card { }`.","Add `box-shadow: 0 10px 30px rgba(0, 120, 255, 0.15);` before the `}`."],
  tip:"`rgba` = red, green, blue + alpha (see-through). `0.15` is very see-through.",
  checks:[cssNot('.card','boxShadow','none',"Add a `box-shadow` to `.card`.")]}),
 S('w5','Big weather icon',{why:"You should see the weather from across the room!",
  todo:"Style `.icon` with `font-size: 90px;` and `line-height: 1;`.",
  job:"Make the cloud big. Inside `.icon { }` put `font-size: 90px;` and `line-height: 1;`.",
  snippet:`.icon {
  font-size: 90px;
  line-height: 1;
}`,
  hints:["New rule: `.icon { }`.","`font-size: 90px; line-height: 1;`"],
  tip:"`line-height: 1;` stops big emojis from adding extra space above and below.",
  checks:[cssMin('.icon','fontSize',70,"Make `.icon` big: `font-size: 90px;`.")]}),
 S('w6','The temperature',{why:"The temperature is the most important number. Make it big and warm orange.",
  todo:"Style `.temp` with `font-size: 56px;`, `margin: 0;` and `color: #ff8a3d;`.",
  job:"Make the temperature big and orange. Inside `.temp { }` put `font-size: 56px;`, `margin: 0;` and `color: #ff8a3d;`.",
  snippet:`.temp {
  font-size: 56px;
  margin: 0;
  color: #ff8a3d;
}`,
  hints:["New rule: `.temp { }`.","`font-size: 56px; margin: 0; color: #ff8a3d;`"],
  tip:"Weather apps often use blue for cold and orange for warm.",
  checks:[cssMin('.temp','fontSize',48,"Make `.temp` `font-size: 56px;`."),cssPx('.temp','marginTop',0,"Add `margin: 0;` to `.temp`."),notInk('.temp',"Give `.temp` `color: #ff8a3d;`.")]}),
 S('w7','City and sky words',{why:"The city name should be bold. The sky words should be softer.",
  todo:"Style `.city` with `font-size: 22px;`, `font-weight: bold;`, `margin: 0;`. Style `.desc` with `color: #6b7a99;` and `margin-top: 4px;`.",
  job:"Make `.city` bold: `font-size: 22px;`, `font-weight: bold;`, `margin: 0;`. Make `.desc` grey-blue: `color: #6b7a99;`, `margin-top: 4px;`.",
  snippet:`.city {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}
.desc {
  color: #6b7a99;
  margin-top: 4px;
}`,
  hints:["Two rules: `.city { }` and `.desc { }`.","`.city { font-size: 22px; font-weight: bold; margin: 0; }`","`.desc { color: #6b7a99; margin-top: 4px; }`"],
  tip:"Bold for the important word, soft colour for the extra info. That's called 'hierarchy'.",
  checks:[cssIs('.city','fontWeight','700',"Add `font-weight: bold;` to `.city`."),notInk('.desc',"Give `.desc` `color: #6b7a99;`.")]}),
 S('w8','Details in a row',{why:"Humidity, wind and UV should sit side by side, not stacked.",
  learn:"`display: flex;` puts the children in a row. `gap` adds space between them.",
  todo:"Style `.details` with `display: flex;`, `gap: 8px;` and `margin-top: 20px;`.",
  job:"Put the 3 little boxes in a row. Inside `.details { }` put `display: flex;`, `gap: 8px;` and `margin-top: 20px;`.",
  snippet:`.details {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}`,
  hints:["New rule: `.details { }`.","`display: flex; gap: 8px; margin-top: 20px;`"],
  tip:"`gap` only works on flex and grid boxes.",
  checks:[cssIs('.details','display','flex',"Add `display: flex;` to `.details`."),[a=>px(a.css(a.$('.details'),'columnGap'))>=4,"Add `gap: 8px;` to `.details`."]]}),
 S('w9','Little detail tiles',{why:"Each detail becomes a tiny pale-blue tile, all the same size.",
  learn:"`flex: 1;` means 'grow to share the space equally'. `display: block;` on `b` puts the number on its own line.",
  todo:"Style `.detail` with `flex: 1;`, `background-color: #eef7ff;`, `border-radius: 12px;`, `padding: 8px;`, `font-size: 13px;`. Then `.detail b { display: block; }`.",
  job:"Make 3 equal tiles. Inside `.detail { }` put `flex: 1;`, `background-color: #eef7ff;`, `border-radius: 12px;`, `padding: 8px;`, `font-size: 13px;`. Add `.detail b { display: block; }`.",
  snippet:`.detail {
  flex: 1;
  background-color: #eef7ff;
  border-radius: 12px;
  padding: 8px;
  font-size: 13px;
}
.detail b {
  display: block;
}`,
  hints:["Two rules: `.detail { }` and `.detail b { }`.","`.detail { flex: 1; background-color: #eef7ff; border-radius: 12px; padding: 8px; font-size: 13px; }`","`.detail b { display: block; }`"],
  tip:"Change the emoji and words in your head — this card works for any city!",
  checks:[cssIs('.detail','flexGrow','1',"Add `flex: 1;` to `.detail`."),bg('.detail',"Give `.detail` `background-color: #eef7ff;`."),round('.detail',1,"Round the tiles: `border-radius: 12px;`."),cssIs('.detail b','display','block',"Add `.detail b { display: block; }`.")]})
 ]},
/* ------------------------------------------------------------------ 4 */
{id:'pc_pricing',cat:'css',emoji:'💎',title:'Pricing Table',mentor:'Max, app maker',
 blurb:'Three price plans side by side, with a "Best value" plan that pops out.',
 intro:"Max made a drawing app called Doodle Pad and needs a pricing page. You'll put **3 plans side by side** with flexbox, then make the best plan bigger with `transform: scale()` so everyone notices it.",
 base:`<h1 class="heading">Pick your Doodle Pad plan</h1>
<p class="sub">Draw, paint and share. Stop any time.</p>

<div class="plans">
  <div class="plan">
    <h2>Starter</h2>
    <p class="price">$0<span>/month</span></p>
    <ul>
      <li>5 drawings</li>
      <li>Basic brushes</li>
      <li>Save as a picture</li>
    </ul>
    <button class="choose">Choose Starter</button>
  </div>
  <div class="plan best">
    <p class="badge">Best value</p>
    <h2>Artist</h2>
    <p class="price">$4<span>/month</span></p>
    <ul>
      <li>Unlimited drawings</li>
      <li>50 magic brushes</li>
      <li>Share with friends</li>
    </ul>
    <button class="choose">Choose Artist</button>
  </div>
  <div class="plan">
    <h2>Studio</h2>
    <p class="price">$9<span>/month</span></p>
    <ul>
      <li>Everything in Artist</li>
      <li>Animation tools</li>
      <li>Print posters</li>
    </ul>
    <button class="choose">Choose Studio</button>
  </div>
</div>

<style>

</style>`,
 steps:[
 S('pr1','Page basics',{why:"A soft lilac page, a clean font, and everything centred.",
  todo:"Style `body` with `font-family: Verdana, sans-serif;`, `background-color: #f6f3ff;` and `text-align: center;`.",
  job:"Inside `body { }` put `font-family: Verdana, sans-serif;`, `background-color: #f6f3ff;` and `text-align: center;`.",
  snippet:`body {
  font-family: Verdana, sans-serif;
  background-color: #f6f3ff;
  text-align: center;
}`,
  hints:["Start with `body { }`.","`font-family: Verdana, sans-serif; background-color: #f6f3ff; text-align: center;`"],
  tip:"`text-align` is passed down to everything inside the body.",
  checks:[fontCheck,bg('body',"Give `body` `background-color: #f6f3ff;`."),cssIs('body','textAlign','center',"Add `text-align: center;` to `body`.")]}),
 S('pr2','Side by side',{why:"People compare prices best when the plans sit next to each other.",
  learn:"`display: flex;` on the parent puts the 3 plans in a row. `align-items: center;` lines them up through their middles.",
  todo:"Style `.plans` with `display: flex;`, `justify-content: center;`, `align-items: center;`, `gap: 16px;` and `padding: 20px 0;`.",
  job:"Put the 3 plans in a row. Inside `.plans { }` put `display: flex;`, `justify-content: center;`, `align-items: center;`, `gap: 16px;` and `padding: 20px 0;`.",
  snippet:`.plans {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
}`,
  hints:["New rule: `.plans { }` — the box around all 3 plans.","`display: flex; justify-content: center; align-items: center; gap: 16px; padding: 20px 0;`"],
  tip:"Flexbox works on the CHILDREN of the box you put it on.",
  checks:[cssIs('.plans','display','flex',"Add `display: flex;` to `.plans`."),[a=>px(a.css(a.$('.plans'),'columnGap'))>=8,"Add `gap: 16px;` to `.plans`."],cssIs('.plans','alignItems','center',"Add `align-items: center;` to `.plans`.")]}),
 S('pr3','Plan cards',{why:"Each plan becomes a white card, all the same width.",
  todo:"Style `.plan` with `flex: 1;`, `max-width: 200px;`, `background-color: white;`, `padding: 16px;` and `border-radius: 16px;`.",
  job:"Make white cards. Inside `.plan { }` put `flex: 1;`, `max-width: 200px;`, `background-color: white;`, `padding: 16px;` and `border-radius: 16px;`.",
  snippet:`.plan {
  flex: 1;
  max-width: 200px;
  background-color: white;
  padding: 16px;
  border-radius: 16px;
}`,
  hints:["New rule: `.plan { }` (no s!).","`flex: 1; max-width: 200px; background-color: white; padding: 16px; border-radius: 16px;`"],
  tip:"`flex: 1;` on all 3 = they share the space equally.",
  checks:[cssIs('.plan','flexGrow','1',"Add `flex: 1;` to `.plan`."),bgWhite('.plan',"Give `.plan` `background-color: white;`."),round('.plan',1,"Round the cards: `border-radius: 16px;`.")]}),
 S('pr4','Clean feature lists',{why:"Dots look messy. Thin lines between features look pro.",
  todo:"Style `.plan ul` with `list-style: none;` and `padding: 0;`. Style `.plan li` with `padding: 6px 0;` and `border-bottom: 1px solid #eeeeee;`.",
  job:"Inside `.plan ul { }` put `list-style: none;` and `padding: 0;`. Inside `.plan li { }` put `padding: 6px 0;` and `border-bottom: 1px solid #eeeeee;`.",
  snippet:`.plan ul {
  list-style: none;
  padding: 0;
}
.plan li {
  padding: 6px 0;
  border-bottom: 1px solid #eeeeee;
}`,
  hints:["Two rules: `.plan ul { }` and `.plan li { }`.","`.plan ul { list-style: none; padding: 0; }`","`.plan li { padding: 6px 0; border-bottom: 1px solid #eeeeee; }`"],
  tip:"`border-bottom` draws a line only on the bottom side.",
  checks:[cssIs('.plan ul','listStyleType','none',"Add `list-style: none;` to `.plan ul`."),cssIs('.plan li','borderBottomStyle','solid',"Add `border-bottom: 1px solid #eeeeee;` to `.plan li`.")]}),
 S('pr5','Big prices',{why:"The price is what people look for first. Make it BIG.",
  learn:"`.price span` styles only the `<span>` inside the price — the little '/month' part.",
  todo:"Style `.price` with `font-size: 32px;`, `font-weight: bold;`, `color: #7b5cff;`, `margin: 8px 0;`. Style `.price span` with `font-size: 14px;` and `color: #999999;`.",
  job:"Inside `.price { }` put `font-size: 32px;`, `font-weight: bold;`, `color: #7b5cff;`, `margin: 8px 0;`. Inside `.price span { }` put `font-size: 14px;` and `color: #999999;`.",
  snippet:`.price {
  font-size: 32px;
  font-weight: bold;
  color: #7b5cff;
  margin: 8px 0;
}
.price span {
  font-size: 14px;
  color: #999999;
}`,
  hints:["Two rules: `.price { }` and `.price span { }`.","`.price { font-size: 32px; font-weight: bold; color: #7b5cff; margin: 8px 0; }`","`.price span { font-size: 14px; color: #999999; }`"],
  tip:"Big number + small '/month' is how almost every app shows its price.",
  checks:[cssMin('.price','fontSize',28,"Make `.price` `font-size: 32px;`."),maxPx('.price span','fontSize',16,"Make `.price span` small: `font-size: 14px;`.")]}),
 S('pr6','Best value pops out',{why:"Max wants everyone to notice the Artist plan. Let's make it bigger!",
  learn:"`transform: scale(1.1);` makes a box 10% bigger, without pushing the other boxes away. `scale(2)` = double size!",
  todo:"Style `.best` with `transform: scale(1.1);` and `border: 3px solid #ffb703;`.",
  job:"Make the best plan bigger with a gold line. Inside `.best { }` put `transform: scale(1.1);` and `border: 3px solid #ffb703;`.",
  snippet:`.best {
  transform: scale(1.1);
  border: 3px solid #ffb703;
}`,
  hints:["The middle plan has TWO classes: `plan best`. Style the second one: `.best { }`.","`transform: scale(1.1); border: 3px solid #ffb703;`"],
  tip:"A box can have many classes, split by spaces: `class=\"plan best\"`.",
  checks:[cssNot('.best','transform','none',"Add `transform: scale(1.1);` to `.best`."),cssIs('.best','borderTopStyle','solid',"Add `border: 3px solid #ffb703;` to `.best`.")]}),
 S('pr7','The badge',{why:"A little gold badge shouts 'Best value!'",
  learn:"`display: inline-block;` makes the badge only as wide as its words, but still lets it have padding.",
  todo:"Style `.badge` with `display: inline-block;`, `background-color: #ffb703;`, `color: white;`, `font-size: 12px;`, `font-weight: bold;`, `padding: 4px 10px;`, `border-radius: 20px;`, `margin: 0;`.",
  job:"Make a gold pill badge. Inside `.badge { }` put `display: inline-block;`, `background-color: #ffb703;`, `color: white;`, `font-size: 12px;`, `font-weight: bold;`, `padding: 4px 10px;`, `border-radius: 20px;`, `margin: 0;`.",
  snippet:`.badge {
  display: inline-block;
  background-color: #ffb703;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 20px;
  margin: 0;
}`,
  hints:["New rule: `.badge { }`.","`display: inline-block; background-color: #ffb703; color: white;`","`font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px; margin: 0;`"],
  tip:"Badges like this are called 'pills' because of their shape. 💊",
  checks:[cssIs('.badge','display','inline-block',"Add `display: inline-block;` to `.badge`."),bg('.badge',"Give `.badge` `background-color: #ffb703;`.")]}),
 S('pr8','Choose buttons',{why:"Grey buttons don't make anyone want to click. Purple ones do!",
  todo:"Style `.choose` with `width: 100%;`, `background-color: #7b5cff;`, `color: white;`, `border: none;`, `padding: 10px;`, `border-radius: 10px;` and `cursor: pointer;`.",
  job:"Inside `.choose { }` put `width: 100%;`, `background-color: #7b5cff;`, `color: white;`, `border: none;`, `padding: 10px;`, `border-radius: 10px;`, `cursor: pointer;`.",
  snippet:`.choose {
  width: 100%;
  background-color: #7b5cff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}`,
  hints:["New rule: `.choose { }`.","`width: 100%; background-color: #7b5cff; color: white; border: none;`","`padding: 10px; border-radius: 10px; cursor: pointer;`"],
  tip:"`cursor: pointer;` shows the little hand 👆 that says 'click me'.",
  checks:[cssIs('.choose','cursor','pointer',"Add `cursor: pointer;` to `.choose`."),cssIs('.choose','borderTopStyle','none',"Add `border: none;` to `.choose`."),round('.choose',1,"Round the buttons: `border-radius: 10px;`.")]}),
 S('pr9','Hover colour',{why:"Buttons should react when your mouse is on them.",
  todo:"Style `.choose:hover` with `background-color: #5a3ee0;`.",
  job:"Make buttons darker when you point at them. Inside `.choose:hover { }` put `background-color: #5a3ee0;`.",
  snippet:`.choose:hover {
  background-color: #5a3ee0;
}`,
  hints:["Selector: `.choose:hover` — no space before the colon.","`.choose:hover { background-color: #5a3ee0; }`"],
  tip:"Real companies test different button colours to see which gets more clicks!",
  checks:[hoverRule('.choose:hover',"Add `.choose:hover { background-color: #5a3ee0; }`.")]})
 ]},
/* ------------------------------------------------------------------ 5 */
{id:'pc_music',cat:'css',emoji:'🎧',title:'Music Player',mentor:'DJ Pip, music maker',
 blurb:'A cute music player with round buttons and a progress bar made from boxes.',
 intro:"DJ Pip wants a music player screen for a new song. You'll build a **progress bar from two boxes**, turn square buttons into **perfect circles**, and make them grow when you point at them.",
 base:`<div class="player">
  <div class="cover">🎵</div>
  <h1 class="song">Sunny Side Up</h1>
  <p class="artist">The Happy Bees</p>
  <div class="progress">
    <div class="fill"></div>
  </div>
  <div class="times">
    <span>1:12</span>
    <span>3:05</span>
  </div>
  <div class="controls">
    <button class="btn">⏮</button>
    <button class="btn play">▶</button>
    <button class="btn">⏭</button>
  </div>
</div>

<style>

</style>`,
 steps:[
 S('m1','Cream page',{why:"A warm, cream background makes the player feel cosy.",
  todo:"Style `body` with `background-color: #fef6e4;` and `font-family: 'Trebuchet MS', sans-serif;`.",
  job:"Inside `body { }` put `background-color: #fef6e4;` and `font-family: 'Trebuchet MS', sans-serif;`.",
  snippet:`body {
  background-color: #fef6e4;
  font-family: 'Trebuchet MS', sans-serif;
}`,
  hints:["Start with `body { }`.","`background-color: #fef6e4; font-family: 'Trebuchet MS', sans-serif;`"],
  tip:"Cream is a 'warm white' — it's softer on your eyes than pure white.",
  checks:[bg('body',"Give `body` `background-color: #fef6e4;`."),fontCheck]}),
 S('m2','The player box',{why:"The player needs its own colourful, rounded box in the middle.",
  todo:"Style `.player` with `max-width: 300px;`, `margin: 20px auto;`, `padding: 24px;`, `text-align: center;`, `border-radius: 28px;` and `background: linear-gradient(#ffd6e8, #d6e4ff);`.",
  job:"Inside `.player { }` put `max-width: 300px;`, `margin: 20px auto;`, `padding: 24px;`, `text-align: center;`, `border-radius: 28px;`, `background: linear-gradient(#ffd6e8, #d6e4ff);`.",
  snippet:`.player {
  max-width: 300px;
  margin: 20px auto;
  padding: 24px;
  text-align: center;
  border-radius: 28px;
  background: linear-gradient(#ffd6e8, #d6e4ff);
}`,
  hints:["New rule: `.player { }`.","`max-width: 300px; margin: 20px auto; padding: 24px; text-align: center;`","`border-radius: 28px; background: linear-gradient(#ffd6e8, #d6e4ff);`"],
  tip:"`margin: 20px auto;` = 20px on top and bottom, and centred left-to-right.",
  checks:[cssIs('.player','textAlign','center',"Add `text-align: center;` to `.player`."),round('.player',10,"Round the player: `border-radius: 28px;`."),bgOrGrad('.player',"Give `.player` `background: linear-gradient(#ffd6e8, #d6e4ff);`.")]}),
 S('m3','Album cover',{why:"Every song needs a square cover picture.",
  learn:"`line-height: 160px;` (the same as the height) puts one line of text in the middle, top-to-bottom.",
  todo:"Style `.cover` with `width: 160px;`, `height: 160px;`, `margin: 0 auto;`, `background-color: white;`, `border-radius: 20px;`, `font-size: 80px;` and `line-height: 160px;`.",
  job:"Make a square cover. Inside `.cover { }` put `width: 160px;`, `height: 160px;`, `margin: 0 auto;`, `background-color: white;`, `border-radius: 20px;`, `font-size: 80px;`, `line-height: 160px;`.",
  snippet:`.cover {
  width: 160px;
  height: 160px;
  margin: 0 auto;
  background-color: white;
  border-radius: 20px;
  font-size: 80px;
  line-height: 160px;
}`,
  hints:["New rule: `.cover { }`.","`width: 160px; height: 160px; margin: 0 auto; background-color: white;`","`border-radius: 20px; font-size: 80px; line-height: 160px;`"],
  tip:"Same width and height = a perfect square.",
  checks:[cssPx('.cover','width',160,"Give `.cover` `width: 160px;`."),cssPx('.cover','height',160,"Give `.cover` `height: 160px;`."),cssMin('.cover','fontSize',60,"Make the note big: `font-size: 80px;`.")]}),
 S('m4','The progress track',{why:"A progress bar is just two boxes: a long track, and a coloured fill inside it. First, the track.",
  learn:"`overflow: hidden;` hides anything that sticks out of the box — so the fill keeps the track's round ends.",
  todo:"Style `.progress` with `height: 8px;`, `background-color: white;`, `border-radius: 4px;`, `margin-top: 20px;` and `overflow: hidden;`.",
  job:"Make the white track. Inside `.progress { }` put `height: 8px;`, `background-color: white;`, `border-radius: 4px;`, `margin-top: 20px;`, `overflow: hidden;`.",
  snippet:`.progress {
  height: 8px;
  background-color: white;
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
}`,
  hints:["New rule: `.progress { }`.","`height: 8px; background-color: white; border-radius: 4px; margin-top: 20px; overflow: hidden;`"],
  tip:"Loading bars, health bars in games, battery bars — all made like this!",
  checks:[cssPx('.progress','height',8,"Give `.progress` `height: 8px;`."),bgWhite('.progress',"Give `.progress` `background-color: white;`.")]}),
 S('m5','The pink fill',{why:"Now the fill: it shows how much of the song has played.",
  learn:"`width: 40%;` = 40% as wide as the box it's inside. `height: 100%;` = as tall as the track.",
  todo:"Style `.fill` with `width: 40%;`, `height: 100%;` and `background-color: #ff7eb6;`.",
  job:"Fill the track 40% pink. Inside `.fill { }` put `width: 40%;`, `height: 100%;` and `background-color: #ff7eb6;`.",
  snippet:`.fill {
  width: 40%;
  height: 100%;
  background-color: #ff7eb6;
}`,
  hints:["New rule: `.fill { }`.","`width: 40%; height: 100%; background-color: #ff7eb6;`"],
  tip:"Later, JavaScript can change that 40% while the song plays!",
  checks:[[a=>{const f=box(a,'.fill'),p=box(a,'.progress');return !!f&&!!p&&p.width>0&&Math.abs(f.width/p.width-0.4)<=0.03;},"Give `.fill` `width: 40%;`."],cssPx('.fill','height',8,"Give `.fill` `height: 100%;`."),bg('.fill',"Give `.fill` `background-color: #ff7eb6;`.")]}),
 S('m6','Times at each end',{why:"The time played goes on the left, the song length on the right.",
  learn:"`justify-content: space-between;` pushes the first child to the left edge and the last child to the right edge.",
  todo:"Style `.times` with `display: flex;`, `justify-content: space-between;`, `font-size: 12px;`, `color: #8a7aa8;` and `margin-top: 6px;`.",
  job:"Push the times to the two ends. Inside `.times { }` put `display: flex;`, `justify-content: space-between;`, `font-size: 12px;`, `color: #8a7aa8;`, `margin-top: 6px;`.",
  snippet:`.times {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #8a7aa8;
  margin-top: 6px;
}`,
  hints:["New rule: `.times { }`.","`display: flex; justify-content: space-between; font-size: 12px; color: #8a7aa8; margin-top: 6px;`"],
  tip:"`space-between` is great for 'left thing … right thing' layouts.",
  checks:[cssIs('.times','display','flex',"Add `display: flex;` to `.times`."),cssIs('.times','justifyContent','space-between',"Add `justify-content: space-between;` to `.times`.")]}),
 S('m7','Button row',{why:"The 3 buttons should sit in a centred row.",
  todo:"Style `.controls` with `display: flex;`, `justify-content: center;`, `align-items: center;`, `gap: 14px;` and `margin-top: 16px;`.",
  job:"Inside `.controls { }` put `display: flex;`, `justify-content: center;`, `align-items: center;`, `gap: 14px;` and `margin-top: 16px;`.",
  snippet:`.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 16px;
}`,
  hints:["New rule: `.controls { }`.","`display: flex; justify-content: center; align-items: center; gap: 14px; margin-top: 16px;`"],
  tip:"`align-items: center;` matters next — the play button will be taller than the others.",
  checks:[cssIs('.controls','display','flex',"Add `display: flex;` to `.controls`."),cssIs('.controls','justifyContent','center',"Add `justify-content: center;` to `.controls`."),[a=>px(a.css(a.$('.controls'),'columnGap'))>=6,"Add `gap: 14px;` to `.controls`."]]}),
 S('m8','Circle buttons',{why:"Music buttons are round! Here's the trick to make a perfect circle.",
  learn:"A square box + `border-radius: 50%;` = a perfect circle. ⭕",
  todo:"Style `.btn` with `width: 48px;`, `height: 48px;`, `border-radius: 50%;`, `border: none;`, `background-color: white;`, `font-size: 18px;` and `cursor: pointer;`.",
  job:"Make round buttons. Inside `.btn { }` put `width: 48px;`, `height: 48px;`, `border-radius: 50%;`, `border: none;`, `background-color: white;`, `font-size: 18px;`, `cursor: pointer;`.",
  snippet:`.btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: white;
  font-size: 18px;
  cursor: pointer;
}`,
  hints:["New rule: `.btn { }`.","`width: 48px; height: 48px; border-radius: 50%; border: none;`","`background-color: white; font-size: 18px; cursor: pointer;`"],
  tip:"If width and height are different, 50% gives you an oval instead.",
  checks:[cssPx('.btn','width',48,"Give `.btn` `width: 48px;` and `height: 48px;`."),circle('.btn',"Make `.btn` round: `border-radius: 50%;`."),cssIs('.btn','cursor','pointer',"Add `cursor: pointer;` to `.btn`.")]}),
 S('m9','A big play button',{why:"Play is the main button, so it should be bigger and pink.",
  learn:"The play button has two classes: `btn play`. A `.play` rule written AFTER `.btn` wins.",
  todo:"Style `.play` with `width: 64px;`, `height: 64px;`, `background-color: #ff7eb6;`, `color: white;` and `font-size: 24px;`.",
  job:"Make the play button big and pink. Inside `.play { }` put `width: 64px;`, `height: 64px;`, `background-color: #ff7eb6;`, `color: white;`, `font-size: 24px;`.",
  snippet:`.play {
  width: 64px;
  height: 64px;
  background-color: #ff7eb6;
  color: white;
  font-size: 24px;
}`,
  hints:["New rule: `.play { }` — put it BELOW `.btn`.","`width: 64px; height: 64px; background-color: #ff7eb6; color: white; font-size: 24px;`"],
  tip:"When two rules fight, the one lower down usually wins.",
  checks:[cssPx('.play','width',64,"Give `.play` `width: 64px;` and `height: 64px;`."),cssNot('.play','backgroundColor',[WHITE,CLEAR],"Give `.play` `background-color: #ff7eb6;`.")]}),
 S('m10','Bouncy hover',{why:"Buttons should grow a little when you point at them. So satisfying!",
  todo:"Style `.btn:hover` with `transform: scale(1.1);`.",
  job:"Make buttons grow when you point at them. Inside `.btn:hover { }` put `transform: scale(1.1);`.",
  snippet:`.btn:hover {
  transform: scale(1.1);
}`,
  hints:["Selector: `.btn:hover`.","`.btn:hover { transform: scale(1.1); }`"],
  tip:"Add `transition: transform 0.2s;` to `.btn` to make the grow smooth.",
  checks:[[anyHover(/\.btn:hover/,'transform'),"Add `.btn:hover { transform: scale(1.1); }`."]]})
 ]},
/* ------------------------------------------------------------------ 6 */
{id:'pc_chat',cat:'css',emoji:'💬',title:'Chat Bubbles',mentor:'Bea, app designer',
 blurb:'A phone chat screen with bubbles on the left and right, just like real messaging apps.',
 intro:"Bea is designing a chat app where you can text your dog. 🐶 The messages are written — you make them look like a real chat: **their bubbles on the left, yours on the right**.",
 base:`<div class="phone">
  <div class="top-bar">🐶 Biscuit the Dog</div>
  <div class="chat">
    <p class="msg them">Woof! Are we going to the park? 🎾</p>
    <p class="msg me">Yes! After lunch 🥪</p>
    <p class="msg them">Can we bring the red ball?</p>
    <p class="msg me">Of course. And snacks!</p>
    <p class="msg them">Best. Day. Ever. 🐾</p>
  </div>
  <div class="typing">
    <input class="box" placeholder="Type a message...">
    <button class="send">Send</button>
  </div>
</div>

<style>

</style>`,
 steps:[
 S('ch1','Light blue page',{why:"First, a soft background so the phone stands out.",
  todo:"Style `body` with `background-color: #eaf6ff;` and `font-family: Verdana, sans-serif;`.",
  job:"Inside `body { }` put `background-color: #eaf6ff;` and `font-family: Verdana, sans-serif;`.",
  snippet:`body {
  background-color: #eaf6ff;
  font-family: Verdana, sans-serif;
}`,
  hints:["Start with `body { }`.","`background-color: #eaf6ff; font-family: Verdana, sans-serif;`"],
  tip:"Most chat apps use blue — it feels calm and friendly.",
  checks:[bg('body',"Give `body` `background-color: #eaf6ff;`."),fontCheck]}),
 S('ch2','The phone',{why:"Let's shape the screen like a phone.",
  learn:"`overflow: hidden;` cuts off the corners of anything inside, so the top bar gets rounded corners too.",
  todo:"Style `.phone` with `max-width: 320px;`, `margin: 0 auto;`, `background-color: white;`, `border: 3px solid #cde3f7;`, `border-radius: 24px;` and `overflow: hidden;`.",
  job:"Inside `.phone { }` put `max-width: 320px;`, `margin: 0 auto;`, `background-color: white;`, `border: 3px solid #cde3f7;`, `border-radius: 24px;`, `overflow: hidden;`.",
  snippet:`.phone {
  max-width: 320px;
  margin: 0 auto;
  background-color: white;
  border: 3px solid #cde3f7;
  border-radius: 24px;
  overflow: hidden;
}`,
  hints:["New rule: `.phone { }`.","`max-width: 320px; margin: 0 auto; background-color: white;`","`border: 3px solid #cde3f7; border-radius: 24px; overflow: hidden;`"],
  tip:"Phones are about 320–430px wide. That's why `max-width: 320px` looks right.",
  checks:[bgWhite('.phone',"Give `.phone` `background-color: white;`."),round('.phone',10,"Round the phone: `border-radius: 24px;`."),cssIs('.phone','overflowX','hidden',"Add `overflow: hidden;` to `.phone`.")]}),
 S('ch3','The top bar',{why:"The top bar shows who you're talking to.",
  todo:"Style `.top-bar` with `background-color: #7cc6fe;`, `color: white;`, `padding: 14px;`, `font-weight: bold;` and `text-align: center;`.",
  job:"Inside `.top-bar { }` put `background-color: #7cc6fe;`, `color: white;`, `padding: 14px;`, `font-weight: bold;`, `text-align: center;`.",
  snippet:`.top-bar {
  background-color: #7cc6fe;
  color: white;
  padding: 14px;
  font-weight: bold;
  text-align: center;
}`,
  hints:["New rule: `.top-bar { }`.","`background-color: #7cc6fe; color: white; padding: 14px; font-weight: bold; text-align: center;`"],
  tip:"Class names can have dashes: `top-bar`. They can't have spaces.",
  checks:[bg('.top-bar',"Give `.top-bar` `background-color: #7cc6fe;`."),cssIs('.top-bar','textAlign','center',"Add `text-align: center;` to `.top-bar`.")]}),
 S('ch4','A flex column',{why:"Messages go top to bottom. A flex COLUMN lets each bubble choose left or right.",
  learn:"`flex-direction: column;` stacks the children top-to-bottom instead of in a row.",
  todo:"Style `.chat` with `display: flex;`, `flex-direction: column;`, `gap: 8px;` and `padding: 12px;`.",
  job:"Stack the messages. Inside `.chat { }` put `display: flex;`, `flex-direction: column;`, `gap: 8px;` and `padding: 12px;`.",
  snippet:`.chat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
}`,
  hints:["New rule: `.chat { }`.","`display: flex; flex-direction: column; gap: 8px; padding: 12px;`"],
  tip:"Nothing seems to move yet — the magic happens in 2 steps!",
  checks:[cssIs('.chat','display','flex',"Add `display: flex;` to `.chat`."),cssIs('.chat','flexDirection','column',"Add `flex-direction: column;` to `.chat`.")]}),
 S('ch5','Bubble shape',{why:"Every message becomes a rounded bubble.",
  learn:"`max-width: 70%;` stops a bubble from getting wider than 70% of the chat.",
  todo:"Style `.msg` with `margin: 0;`, `padding: 10px 14px;`, `border-radius: 18px;` and `max-width: 70%;`.",
  job:"Make bubbles. Inside `.msg { }` put `margin: 0;`, `padding: 10px 14px;`, `border-radius: 18px;` and `max-width: 70%;`.",
  snippet:`.msg {
  margin: 0;
  padding: 10px 14px;
  border-radius: 18px;
  max-width: 70%;
}`,
  hints:["New rule: `.msg { }`.","`margin: 0; padding: 10px 14px; border-radius: 18px; max-width: 70%;`"],
  tip:"Every message has the class `msg` PLUS `them` or `me`.",
  checks:[cssPx('.msg','marginTop',0,"Add `margin: 0;` to `.msg`."),round('.msg',10,"Round the bubbles: `border-radius: 18px;`.")]}),
 S('ch6','Their bubbles: left',{why:"Messages from Biscuit go on the LEFT in grey.",
  learn:"`align-self: flex-start;` moves ONE item to the start (left) of a flex column.",
  todo:"Style `.them` with `background-color: #f0f0f5;` and `align-self: flex-start;`.",
  job:"Put Biscuit's bubbles on the left. Inside `.them { }` put `background-color: #f0f0f5;` and `align-self: flex-start;`.",
  snippet:`.them {
  background-color: #f0f0f5;
  align-self: flex-start;
}`,
  hints:["New rule: `.them { }`.","`background-color: #f0f0f5; align-self: flex-start;`"],
  tip:"`align-self` is like `align-items`, but for just one child.",
  checks:[cssIs('.them','alignSelf','flex-start',"Add `align-self: flex-start;` to `.them`."),bg('.them',"Give `.them` `background-color: #f0f0f5;`.")]}),
 S('ch7','My bubbles: right',{why:"YOUR messages go on the RIGHT in blue — just like a real phone.",
  todo:"Style `.me` with `background-color: #7cc6fe;`, `color: white;` and `align-self: flex-end;`.",
  job:"Put your bubbles on the right. Inside `.me { }` put `background-color: #7cc6fe;`, `color: white;` and `align-self: flex-end;`.",
  snippet:`.me {
  background-color: #7cc6fe;
  color: white;
  align-self: flex-end;
}`,
  hints:["New rule: `.me { }`.","`background-color: #7cc6fe; color: white; align-self: flex-end;`"],
  tip:"Another way to push something right: `margin-left: auto;`.",
  checks:[cssIs('.me','alignSelf','flex-end',"Add `align-self: flex-end;` to `.me`."),bg('.me',"Give `.me` `background-color: #7cc6fe;`.")]}),
 S('ch8','Bubble tails',{why:"Real chat bubbles have one pointy corner, like a little tail pointing to the speaker.",
  learn:"You can round each corner on its own: `border-bottom-left-radius: 4px;` makes only the bottom-left corner sharp.",
  todo:"Add `border-bottom-left-radius: 4px;` to `.them`, and `border-bottom-right-radius: 4px;` to `.me`.",
  job:"Add a pointy tail. Put `border-bottom-left-radius: 4px;` in `.them { }` and `border-bottom-right-radius: 4px;` in `.me { }`.",
  where:"Inside your `.them { }` and `.me { }` rules, just before each closing `}`.",kind:'edit',
  apply:c=>addTo('.me',['border-bottom-right-radius: 4px;'])(addTo('.them',['border-bottom-left-radius: 4px;'])(c)),
  snippet:`.them {
  background-color: #f0f0f5;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}
.me {
  background-color: #7cc6fe;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}`,
  hints:["Don't make new rules — add one line to `.them` and one line to `.me`.","`.them` gets `border-bottom-left-radius: 4px;`. `.me` gets `border-bottom-right-radius: 4px;`."],
  tip:"The sharp corner is on the speaker's side — left for them, right for you.",
  checks:[cssPx('.them','borderBottomLeftRadius',4,"Add `border-bottom-left-radius: 4px;` to `.them`."),cssPx('.me','borderBottomRightRadius',4,"Add `border-bottom-right-radius: 4px;` to `.me`.")]}),
 S('ch9','The typing bar',{why:"The message box should stretch to fill the space next to the Send button.",
  learn:"`flex: 1;` on the input means 'take all the space left over'.",
  todo:"Style `.typing` with `display: flex;`, `gap: 8px;`, `padding: 10px;`, `border-top: 2px solid #eaf6ff;`. Style `.box` with `flex: 1;`, `padding: 10px;`, `border: 2px solid #cde3f7;`, `border-radius: 20px;`.",
  job:"Inside `.typing { }` put `display: flex;`, `gap: 8px;`, `padding: 10px;`, `border-top: 2px solid #eaf6ff;`. Inside `.box { }` put `flex: 1;`, `padding: 10px;`, `border: 2px solid #cde3f7;`, `border-radius: 20px;`.",
  snippet:`.typing {
  display: flex;
  gap: 8px;
  padding: 10px;
  border-top: 2px solid #eaf6ff;
}
.box {
  flex: 1;
  padding: 10px;
  border: 2px solid #cde3f7;
  border-radius: 20px;
}`,
  hints:["Two rules: `.typing { }` and `.box { }`.","`.typing { display: flex; gap: 8px; padding: 10px; border-top: 2px solid #eaf6ff; }`","`.box { flex: 1; padding: 10px; border: 2px solid #cde3f7; border-radius: 20px; }`"],
  tip:"Click in the box in the preview — you can really type!",
  checks:[cssIs('.typing','display','flex',"Add `display: flex;` to `.typing`."),cssIs('.box','flexGrow','1',"Add `flex: 1;` to `.box`.")]}),
 S('ch10','Send button',{why:"Finally, a happy orange Send button that reacts when you point at it.",
  todo:"Style `.send` with `background-color: #ffb86b;`, `color: white;`, `border: none;`, `border-radius: 12px;`, `padding: 0 16px;`, `cursor: pointer;`. Then `.send:hover` with `background-color: #ff9a3c;`.",
  job:"Inside `.send { }` put `background-color: #ffb86b;`, `color: white;`, `border: none;`, `border-radius: 12px;`, `padding: 0 16px;`, `cursor: pointer;`. Add `.send:hover { background-color: #ff9a3c; }`.",
  snippet:`.send {
  background-color: #ffb86b;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0 16px;
  cursor: pointer;
}
.send:hover {
  background-color: #ff9a3c;
}`,
  hints:["Two rules: `.send { }` and `.send:hover { }`.","`.send { background-color: #ffb86b; color: white; border: none; border-radius: 12px; padding: 0 16px; cursor: pointer; }`","`.send:hover { background-color: #ff9a3c; }`"],
  tip:"Woof! Your chat app looks real. 🐾",
  checks:[cssIs('.send','cursor','pointer',"Add `cursor: pointer;` to `.send`."),hoverRule('.send:hover',"Add `.send:hover { background-color: #ff9a3c; }`.")]})
 ]},
/* ------------------------------------------------------------------ 7 */
{id:'pc_kanban',cat:'css',emoji:'📋',title:'Kanban Board',mentor:'Kit, treehouse team leader',
 blurb:'A To Do / Doing / Done task board with flex columns, cards and a scrolling column.',
 intro:"Kit's friends are building a treehouse and need to keep track of jobs. A **Kanban board** has columns: To Do, Doing, Done. You'll make flex columns, task cards, and a column that **scrolls** when it gets too full.",
 base:`<h1 class="board-title">📋 Treehouse Build Board</h1>

<div class="board">
  <div class="column todo">
    <h2>To Do</h2>
    <div class="card">Draw the plan ✏️</div>
    <div class="card">Buy nails 🔩</div>
    <div class="card">Paint the sign 🎨</div>
    <div class="card">Find a ladder 🪜</div>
    <div class="card">Make a rope swing 🪢</div>
  </div>
  <div class="column doing">
    <h2>Doing</h2>
    <div class="card">Cut the planks 🪚</div>
    <div class="card">Ask Grandpa for help 👴</div>
  </div>
  <div class="column done">
    <h2>Done</h2>
    <div class="card">Pick the tree 🌳</div>
  </div>
</div>

<style>

</style>`,
 steps:[
 S('k1','Page and title',{why:"A fresh green page for a tree project, with the title in the middle.",
  todo:"Style `body` with `margin: 0;`, `padding: 16px;`, `font-family: Verdana, sans-serif;`, `background-color: #f4fbf2;`. Style `.board-title` with `text-align: center;` and `color: #2f7d5b;`.",
  job:"Inside `body { }` put `margin: 0;`, `padding: 16px;`, `font-family: Verdana, sans-serif;`, `background-color: #f4fbf2;`. Inside `.board-title { }` put `text-align: center;` and `color: #2f7d5b;`.",
  snippet:`body {
  margin: 0;
  padding: 16px;
  font-family: Verdana, sans-serif;
  background-color: #f4fbf2;
}
.board-title {
  text-align: center;
  color: #2f7d5b;
}`,
  hints:["Two rules: `body { }` and `.board-title { }`.","`body { margin: 0; padding: 16px; font-family: Verdana, sans-serif; background-color: #f4fbf2; }`","`.board-title { text-align: center; color: #2f7d5b; }`"],
  tip:"'Kanban' is a Japanese word. It means 'sign board'.",
  checks:[fontCheck,cssIs('.board-title','textAlign','center',"Add `text-align: center;` to `.board-title`.")]}),
 S('k2','Columns side by side',{why:"The three columns need to sit next to each other.",
  learn:"`align-items: flex-start;` lets each column be only as tall as its own cards. Without it, they all stretch to the tallest one.",
  todo:"Style `.board` with `display: flex;`, `gap: 12px;` and `align-items: flex-start;`.",
  job:"Put the columns in a row. Inside `.board { }` put `display: flex;`, `gap: 12px;` and `align-items: flex-start;`.",
  snippet:`.board {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}`,
  hints:["New rule: `.board { }`.","`display: flex; gap: 12px; align-items: flex-start;`"],
  tip:"Try removing `align-items` later and see what changes.",
  checks:[cssIs('.board','display','flex',"Add `display: flex;` to `.board`."),[a=>px(a.css(a.$('.board'),'columnGap'))>=6,"Add `gap: 12px;` to `.board`."],cssIs('.board','alignItems','flex-start',"Add `align-items: flex-start;` to `.board`.")]}),
 S('k3','White columns',{why:"Each column gets a white background and equal width.",
  todo:"Style `.column` with `flex: 1;`, `background-color: white;`, `border-radius: 14px;` and `padding: 10px;`.",
  job:"Inside `.column { }` put `flex: 1;`, `background-color: white;`, `border-radius: 14px;` and `padding: 10px;`.",
  snippet:`.column {
  flex: 1;
  background-color: white;
  border-radius: 14px;
  padding: 10px;
}`,
  hints:["New rule: `.column { }`.","`flex: 1; background-color: white; border-radius: 14px; padding: 10px;`"],
  tip:"`flex: 1;` on all 3 columns = 3 equal columns.",
  checks:[cssIs('.column','flexGrow','1',"Add `flex: 1;` to `.column`."),bgWhite('.column',"Give `.column` `background-color: white;`.")]}),
 S('k4','Colour-coded tops',{why:"A coloured stripe on top tells you which column is which at a glance.",
  todo:"Give `.todo` `border-top: 6px solid #ffb4a2;`, `.doing` `border-top: 6px solid #ffd166;` and `.done` `border-top: 6px solid #95d5b2;`.",
  job:"Add a coloured top line. `.todo { border-top: 6px solid #ffb4a2; }`, `.doing { border-top: 6px solid #ffd166; }`, `.done { border-top: 6px solid #95d5b2; }`.",
  snippet:`.todo {
  border-top: 6px solid #ffb4a2;
}
.doing {
  border-top: 6px solid #ffd166;
}
.done {
  border-top: 6px solid #95d5b2;
}`,
  hints:["Three small rules: `.todo`, `.doing`, `.done`.","Each one gets `border-top: 6px solid` + its colour."],
  tip:"Peach = waiting, yellow = busy, green = finished. Like traffic lights!",
  checks:[cssPx('.todo','borderTopWidth',6,"Add `border-top: 6px solid #ffb4a2;` to `.todo`."),cssPx('.doing','borderTopWidth',6,"Add `border-top: 6px solid #ffd166;` to `.doing`."),cssPx('.done','borderTopWidth',6,"Add `border-top: 6px solid #95d5b2;` to `.done`.")]}),
 S('k5','Column headings',{why:"The headings are too big for little columns.",
  todo:"Style `.column h2` with `font-size: 16px;` and `margin: 0 0 10px;`.",
  job:"Make headings smaller. Inside `.column h2 { }` put `font-size: 16px;` and `margin: 0 0 10px;`.",
  snippet:`.column h2 {
  font-size: 16px;
  margin: 0 0 10px;
}`,
  hints:["Selector: `.column h2` (the h2 inside a column).","`font-size: 16px; margin: 0 0 10px;`"],
  tip:"`margin: 0 0 10px;` = top 0, right 0, bottom 10px (left copies right).",
  checks:[cssPx('.column h2','fontSize',16,"Give `.column h2` `font-size: 16px;`."),cssPx('.column h2','marginTop',0,"Give `.column h2` `margin: 0 0 10px;`.")]}),
 S('k6','Task cards',{why:"Each job becomes a little sticky-note card.",
  todo:"Style `.card` with `background-color: #fffdf5;`, `padding: 10px;`, `margin-bottom: 8px;`, `border-radius: 8px;`, `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);` and `font-size: 14px;`.",
  job:"Inside `.card { }` put `background-color: #fffdf5;`, `padding: 10px;`, `margin-bottom: 8px;`, `border-radius: 8px;`, `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);`, `font-size: 14px;`.",
  snippet:`.card {
  background-color: #fffdf5;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  font-size: 14px;
}`,
  hints:["New rule: `.card { }`.","`background-color: #fffdf5; padding: 10px; margin-bottom: 8px; border-radius: 8px;`","`box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15); font-size: 14px;`"],
  tip:"A tiny shadow makes flat boxes look like paper.",
  checks:[cssNot('.card','boxShadow','none',"Add a `box-shadow` to `.card`."),round('.card',1,"Round the cards: `border-radius: 8px;`."),cssMin('.card','marginBottom',4,"Add `margin-bottom: 8px;` to `.card`.")]}),
 S('k7','A scrolling column',{why:"The To Do column is getting LONG. Let's give it a max height and let it scroll.",
  learn:"`max-height: 180px;` = never taller than 180px. `overflow-y: auto;` = if there's too much, show a scroll bar.",
  todo:"Add `max-height: 180px;` and `overflow-y: auto;` to your `.todo` rule.",
  job:"Make To Do scroll. Add `max-height: 180px;` and `overflow-y: auto;` inside your `.todo { }` rule.",
  where:inRule('.todo'),kind:'edit',apply:addTo('.todo',['max-height: 180px;','overflow-y: auto;']),
  snippet:`.todo {
  border-top: 6px solid #ffb4a2;
  max-height: 180px;
  overflow-y: auto;
}`,
  hints:["Don't make a new rule — add two lines to `.todo { }`.","Add `max-height: 180px;` and `overflow-y: auto;`."],
  tip:"Scroll inside the To Do column in the preview — the other columns stay still!",
  checks:[cssPx('.todo','maxHeight',180,"Add `max-height: 180px;` to `.todo`."),[a=>/auto|scroll/.test(a.css(a.$('.todo'),'overflowY')),"Add `overflow-y: auto;` to `.todo`."]]}),
 S('k8','Wiggle on hover',{why:"When you point at a card, it tilts — like you're picking it up.",
  learn:"`transform: rotate(-2deg);` tilts something a tiny bit. `deg` means degrees.",
  todo:"Style `.card:hover` with `transform: rotate(-2deg);` and `cursor: grab;`.",
  job:"Tilt cards when you point at them. Inside `.card:hover { }` put `transform: rotate(-2deg);` and `cursor: grab;`.",
  snippet:`.card:hover {
  transform: rotate(-2deg);
  cursor: grab;
}`,
  hints:["Selector: `.card:hover`.","`transform: rotate(-2deg); cursor: grab;`"],
  tip:"`cursor: grab;` shows a little hand ✋ — it says 'you can move me'.",
  checks:[[anyHover(/\.card:hover/,'transform'),"Add `.card:hover { transform: rotate(-2deg); }`."]]}),
 S('k9','Cross off done jobs',{why:"Finished jobs get a line through them. So satisfying! ✅",
  learn:"`.done .card` means: only cards INSIDE the Done column.",
  todo:"Style `.done .card` with `text-decoration: line-through;` and `color: #8aa89a;`.",
  job:"Cross out finished jobs. Inside `.done .card { }` put `text-decoration: line-through;` and `color: #8aa89a;`.",
  snippet:`.done .card {
  text-decoration: line-through;
  color: #8aa89a;
}`,
  hints:["Selector: `.done .card` — with a space.","`text-decoration: line-through; color: #8aa89a;`"],
  tip:"Teams at big companies use boards just like this one every day!",
  checks:[[a=>/line-through/.test(a.css(a.$('.done .card'),'textDecorationLine')),"Add `text-decoration: line-through;` to `.done .card`."]]})
 ]},
/* ------------------------------------------------------------------ 8 */
{id:'pc_gallery',cat:'css',emoji:'🖼️',title:'Photo Gallery',mentor:'Luna, nature photographer',
 blurb:'A grid of nature "photos" that fits any screen and zooms when you point at it.',
 intro:"Luna takes nature photos and wants a gallery page. You'll use **CSS grid**, a clever trick that fits as many columns as the screen allows, perfect square boxes with `aspect-ratio`, and a smooth zoom.",
 base:`<h1 class="title">🌿 My Nature Photos</h1>
<p class="intro">Point at a photo to look closer</p>

<div class="gallery">
  <figure class="photo"><div class="pic">🦋</div><figcaption>Butterfly</figcaption></figure>
  <figure class="photo"><div class="pic">🌻</div><figcaption>Sunflower</figcaption></figure>
  <figure class="photo"><div class="pic">🐞</div><figcaption>Ladybug</figcaption></figure>
  <figure class="photo"><div class="pic">🍄</div><figcaption>Mushroom</figcaption></figure>
  <figure class="photo"><div class="pic">🌈</div><figcaption>Rainbow</figcaption></figure>
  <figure class="photo"><div class="pic">🐢</div><figcaption>Turtle</figcaption></figure>
  <figure class="photo"><div class="pic">🌸</div><figcaption>Blossom</figcaption></figure>
  <figure class="photo"><div class="pic">🐝</div><figcaption>Bee</figcaption></figure>
</div>

<style>

</style>`,
 steps:[
 S('g1','Page style',{why:"A warm, light page lets the photos shine.",
  todo:"Style `body` with `font-family: Verdana, sans-serif;`, `background-color: #fffaf0;` and `text-align: center;`.",
  job:"Inside `body { }` put `font-family: Verdana, sans-serif;`, `background-color: #fffaf0;` and `text-align: center;`.",
  snippet:`body {
  font-family: Verdana, sans-serif;
  background-color: #fffaf0;
  text-align: center;
}`,
  hints:["Start with `body { }`.","`font-family: Verdana, sans-serif; background-color: #fffaf0; text-align: center;`"],
  tip:"Galleries use plain backgrounds so the pictures stand out.",
  checks:[fontCheck,cssIs('body','textAlign','center',"Add `text-align: center;` to `body`.")]}),
 S('g2','A simple grid',{why:"A grid lines photos up in neat rows AND columns.",
  learn:"`display: grid;` turns on grid. `grid-template-columns: 1fr 1fr;` makes 2 equal columns (`fr` = one share of the space).",
  todo:"Style `.gallery` with `display: grid;`, `grid-template-columns: 1fr 1fr;` and `gap: 12px;`.",
  job:"Make 2 columns. Inside `.gallery { }` put `display: grid;`, `grid-template-columns: 1fr 1fr;` and `gap: 12px;`.",
  snippet:`.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}`,
  hints:["New rule: `.gallery { }`.","`display: grid; grid-template-columns: 1fr 1fr; gap: 12px;`"],
  tip:"Three columns would be `1fr 1fr 1fr`.",
  checks:[cssIs('.gallery','display','grid',"Add `display: grid;` to `.gallery`."),[a=>gridCols(a,'.gallery').length===2,"Use `grid-template-columns: 1fr 1fr;` for 2 columns."],[a=>px(a.css(a.$('.gallery'),'columnGap'))>=8,"Add `gap: 12px;` to `.gallery`."]]}),
 S('g3','Fit any screen',{why:"2 columns is too few on a big screen. Let the browser decide how many fit!",
  learn:"`repeat(auto-fit, minmax(120px, 1fr))` means: 'Fit as many columns as you can. Each one at least 120px wide.' Phones get fewer, big screens get more.",
  todo:"In your `.gallery` rule, change `grid-template-columns` to `repeat(auto-fit, minmax(120px, 1fr));`.",
  job:"Change one line in `.gallery { }` to `grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));`.",
  where:"Inside your `.gallery { }` rule — change the `grid-template-columns` line.",kind:'edit',
  apply:c=>/(\.gallery\s*\{[^}]*?grid-template-columns\s*:)[^;}]*/.test(c)?c.replace(/(\.gallery\s*\{[^}]*?grid-template-columns\s*:)[^;}]*/,'$1 repeat(auto-fit, minmax(120px, 1fr))'):addTo('.gallery',['grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));'])(c),
  snippet:`.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}`,
  hints:["Find `grid-template-columns: 1fr 1fr;` and replace the `1fr 1fr` part.","`grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));`"],
  tip:"Make the preview wider or thinner and watch the columns change by themselves!",
  checks:[[a=>a.rules().some(r=>r.style&&/auto-(fit|fill)/.test(r.style.gridTemplateColumns||'')),"Use `grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));`."],[a=>{const c=gridCols(a,'.gallery');return c.length>=2&&c.every(w=>w>=119);},"Each column should be at least `120px` — check `minmax(120px, 1fr)`."]]}),
 S('g4','Photo frames',{why:"Each photo gets a white frame, like a real printed photo.",
  learn:"`<figure>` has a big margin on the left and right by default. `margin: 0;` removes it.",
  todo:"Style `.photo` with `margin: 0;`, `background-color: white;`, `padding: 8px;`, `border-radius: 12px;` and `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);`.",
  job:"Inside `.photo { }` put `margin: 0;`, `background-color: white;`, `padding: 8px;`, `border-radius: 12px;`, `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);`.",
  snippet:`.photo {
  margin: 0;
  background-color: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}`,
  hints:["New rule: `.photo { }`.","`margin: 0; background-color: white; padding: 8px;`","`border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);`"],
  tip:"`<figure>` and `<figcaption>` are the proper tags for a picture with a caption.",
  checks:[cssPx('.photo','marginLeft',0,"Add `margin: 0;` to `.photo`."),bgWhite('.photo',"Give `.photo` `background-color: white;`.")]}),
 S('g5','Square pictures',{why:"Photos look best when every picture is the same shape.",
  learn:"`aspect-ratio: 1 / 1;` keeps a box square, however wide it is. (`16 / 9` = TV shape!)",
  todo:"Style `.pic` with `aspect-ratio: 1 / 1;`, `display: flex;`, `align-items: center;`, `justify-content: center;`, `font-size: 48px;`, `background-color: #e8f5e9;` and `border-radius: 8px;`.",
  job:"Make square pictures. Inside `.pic { }` put `aspect-ratio: 1 / 1;`, `display: flex;`, `align-items: center;`, `justify-content: center;`, `font-size: 48px;`, `background-color: #e8f5e9;`, `border-radius: 8px;`.",
  snippet:`.pic {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background-color: #e8f5e9;
  border-radius: 8px;
}`,
  hints:["New rule: `.pic { }`.","`aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center;`","`font-size: 48px; background-color: #e8f5e9; border-radius: 8px;`"],
  tip:"The flex lines put the emoji right in the middle of its square.",
  checks:[cssNot('.pic','aspectRatio',['auto'],"Add `aspect-ratio: 1 / 1;` to `.pic`."),[a=>{const r=box(a,'.pic');return !!r&&r.width>20&&Math.abs(r.width-r.height)<=2;},"`.pic` should be square — check `aspect-ratio: 1 / 1;`."],cssIs('.pic','display','flex',"Add `display: flex;` to `.pic`.")]}),
 S('g6','Zoom on hover',{why:"Pointing at a photo should make it pop up bigger.",
  todo:"Style `.photo:hover` with `transform: scale(1.08);`.",
  job:"Make photos grow when you point at them. Inside `.photo:hover { }` put `transform: scale(1.08);`.",
  snippet:`.photo:hover {
  transform: scale(1.08);
}`,
  hints:["Selector: `.photo:hover`.","`.photo:hover { transform: scale(1.08); }`"],
  tip:"It jumps right now. Next step makes it smooth!",
  checks:[[anyHover(/\.photo:hover/,'transform'),"Add `.photo:hover { transform: scale(1.08); }`."]]}),
 S('g7','Make it smooth',{why:"A zoom that slides instead of jumping feels expensive.",
  learn:"`transition: transform 0.3s;` means 'when transform changes, take 0.3 seconds to do it'.",
  todo:"Add `transition: transform 0.3s;` to your `.photo` rule.",
  job:"Make the zoom smooth. Add `transition: transform 0.3s;` inside your `.photo { }` rule.",
  where:inRule('.photo'),kind:'edit',apply:addTo('.photo',['transition: transform 0.3s;']),
  snippet:`.photo {
  margin: 0;
  background-color: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
}`,
  hints:["Put it in `.photo { }`, NOT in `.photo:hover`.","Add `transition: transform 0.3s;` before the `}`."],
  tip:"The transition goes on the normal rule, so it's smooth going in AND coming back out.",
  checks:[transOn('.photo',"Add `transition: transform 0.3s;` to `.photo`.")]}),
 S('g8','Captions',{why:"Captions should be small and leafy green.",
  todo:"Style `figcaption` with `margin-top: 6px;`, `font-size: 14px;` and `color: #6d8a6d;`.",
  job:"Inside `figcaption { }` put `margin-top: 6px;`, `font-size: 14px;` and `color: #6d8a6d;`.",
  snippet:`figcaption {
  margin-top: 6px;
  font-size: 14px;
  color: #6d8a6d;
}`,
  hints:["`figcaption` is a tag — no dot.","`margin-top: 6px; font-size: 14px; color: #6d8a6d;`"],
  tip:"Screen readers read the caption out loud for people who can't see the picture.",
  checks:[cssPx('figcaption','fontSize',14,"Give `figcaption` `font-size: 14px;`."),notInk('figcaption',"Give `figcaption` `color: #6d8a6d;`.")]}),
 S('g9','A star photo',{why:"Luna's favourite photo should be twice as wide as the others.",
  learn:"`grid-column: span 2;` makes one box stretch across 2 columns.",
  todo:"Style `.photo:first-child` with `grid-column: span 2;`.",
  job:"Make the first photo 2 columns wide. Inside `.photo:first-child { }` put `grid-column: span 2;`.",
  snippet:`.photo:first-child {
  grid-column: span 2;
}`,
  hints:["Selector: `.photo:first-child` — the first photo only.","`.photo:first-child { grid-column: span 2; }`"],
  tip:"Try `grid-row: span 2;` too, for a tall photo!",
  checks:[[a=>{const p=a.$$('.photo');if(p.length<2)return false;return p[0].getBoundingClientRect().width>p[1].getBoundingClientRect().width*1.5;},"Add `.photo:first-child { grid-column: span 2; }`."]]})
 ]},
/* ------------------------------------------------------------------ 9 */
{id:'pc_profile',cat:'css',emoji:'🦊',title:'Profile Card',mentor:'Priya, young inventor',
 blurb:'A social-style profile card with a round avatar, badges and stats.',
 intro:"Priya is an inventor and wants a profile card to show off. You'll make a **round avatar** that sits on top of a colourful cover, pill-shaped **badges**, and a row of stats.",
 base:`<div class="card">
  <div class="cover"></div>
  <div class="avatar">🦊</div>
  <h1 class="name">Priya Patel</h1>
  <p class="handle">@priya_invents</p>
  <p class="bio">Young inventor. I build robots out of cardboard and big dreams. 🤖</p>
  <div class="badges">
    <span class="badge">🏆 Science Fair Winner</span>
    <span class="badge">🧩 Puzzle Pro</span>
    <span class="badge">🚲 Bike Fixer</span>
  </div>
  <div class="stats">
    <div><b>12</b>Robots</div>
    <div><b>340</b>Fans</div>
    <div><b>5</b>Awards</div>
  </div>
  <button class="follow">Follow</button>
</div>

<style>

</style>`,
 steps:[
 S('pf1','Lavender page',{why:"A soft lavender page for a friendly profile.",
  todo:"Style `body` with `background-color: #fdf2ff;` and `font-family: 'Trebuchet MS', sans-serif;`.",
  job:"Inside `body { }` put `background-color: #fdf2ff;` and `font-family: 'Trebuchet MS', sans-serif;`.",
  snippet:`body {
  background-color: #fdf2ff;
  font-family: 'Trebuchet MS', sans-serif;
}`,
  hints:["Start with `body { }`.","`background-color: #fdf2ff; font-family: 'Trebuchet MS', sans-serif;`"],
  tip:"Swap Priya's name and badges for your own later!",
  checks:[bg('body',"Give `body` `background-color: #fdf2ff;`."),fontCheck]}),
 S('pf2','The card',{why:"Everything sits on one white card in the middle of the page.",
  todo:"Style `.card` with `max-width: 300px;`, `margin: 20px auto;`, `background-color: white;`, `border-radius: 20px;`, `overflow: hidden;`, `text-align: center;` and `padding-bottom: 20px;`.",
  job:"Inside `.card { }` put `max-width: 300px;`, `margin: 20px auto;`, `background-color: white;`, `border-radius: 20px;`, `overflow: hidden;`, `text-align: center;`, `padding-bottom: 20px;`.",
  snippet:`.card {
  max-width: 300px;
  margin: 20px auto;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  text-align: center;
  padding-bottom: 20px;
}`,
  hints:["New rule: `.card { }`.","`max-width: 300px; margin: 20px auto; background-color: white; border-radius: 20px;`","`overflow: hidden; text-align: center; padding-bottom: 20px;`"],
  tip:"`overflow: hidden;` will give the cover picture rounded top corners.",
  checks:[bgWhite('.card',"Give `.card` `background-color: white;`."),cssIs('.card','textAlign','center',"Add `text-align: center;` to `.card`."),[a=>{const r=box(a,'.card');return !!r&&r.width<=302;},"Give `.card` `max-width: 300px;`."],cssIs('.card','overflowX','hidden',"Add `overflow: hidden;` to `.card`.")]}),
 S('pf3','Colourful cover',{why:"The cover is a strip of colour across the top of the card.",
  learn:"`linear-gradient(90deg, ...)` fades from LEFT to RIGHT (90 degrees) instead of top to bottom.",
  todo:"Style `.cover` with `height: 90px;` and `background: linear-gradient(90deg, #ffb3c6, #bde0fe);`.",
  job:"Inside `.cover { }` put `height: 90px;` and `background: linear-gradient(90deg, #ffb3c6, #bde0fe);`.",
  snippet:`.cover {
  height: 90px;
  background: linear-gradient(90deg, #ffb3c6, #bde0fe);
}`,
  hints:["New rule: `.cover { }` — it's an empty box, so it needs a height.","`height: 90px; background: linear-gradient(90deg, #ffb3c6, #bde0fe);`"],
  tip:"An empty box is 0px tall. Give it a height and it appears!",
  checks:[cssPx('.cover','height',90,"Give `.cover` `height: 90px;`."),grad('.cover',"Give `.cover` `background: linear-gradient(90deg, #ffb3c6, #bde0fe);`.")]}),
 S('pf4','Round avatar',{why:"Profile pictures are almost always circles.",
  learn:"Same width and height + `border-radius: 50%;` = a perfect circle.",
  todo:"Style `.avatar` with `width: 100px;`, `height: 100px;`, `border-radius: 50%;`, `background-color: #fff3c4;`, `font-size: 56px;` and `line-height: 100px;`.",
  job:"Make a round avatar. Inside `.avatar { }` put `width: 100px;`, `height: 100px;`, `border-radius: 50%;`, `background-color: #fff3c4;`, `font-size: 56px;`, `line-height: 100px;`.",
  snippet:`.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff3c4;
  font-size: 56px;
  line-height: 100px;
}`,
  hints:["New rule: `.avatar { }`.","`width: 100px; height: 100px; border-radius: 50%;`","`background-color: #fff3c4; font-size: 56px; line-height: 100px;`"],
  tip:"It's stuck on the left for now. Next step we'll move it.",
  checks:[circle('.avatar',"Make `.avatar` round: `border-radius: 50%;`."),cssPx('.avatar','width',100,"Give `.avatar` `width: 100px;` and `height: 100px;`.")]}),
 S('pf5','Pull it up',{why:"Cool profile cards have the avatar half on the cover, half off.",
  learn:"A NEGATIVE margin pulls a box the other way. `margin: -50px auto 0;` pulls it UP 50px and centres it.",
  todo:"Add `margin: -50px auto 0;` and `border: 4px solid white;` to your `.avatar` rule.",
  job:"Pull the avatar up onto the cover. Add `margin: -50px auto 0;` and `border: 4px solid white;` inside your `.avatar { }` rule.",
  where:inRule('.avatar'),kind:'edit',apply:addTo('.avatar',['margin: -50px auto 0;','border: 4px solid white;']),
  snippet:`.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff3c4;
  font-size: 56px;
  line-height: 100px;
  margin: -50px auto 0;
  border: 4px solid white;
}`,
  hints:["Don't make a new rule — add two lines to `.avatar { }`.","Add `margin: -50px auto 0;` and `border: 4px solid white;`."],
  tip:"The white border makes it look like a sticker on the cover.",
  checks:[cssPx('.avatar','marginTop',-50,"Add `margin: -50px auto 0;` to `.avatar`."),cssPx('.avatar','borderTopWidth',4,"Add `border: 4px solid white;` to `.avatar`.")]}),
 S('pf6','Name and handle',{why:"Tidy up the name and make the @handle purple.",
  todo:"Style `.name` with `margin: 10px 0 0;` and `font-size: 24px;`. Style `.handle` with `margin: 0;` and `color: #a06cd5;`.",
  job:"Inside `.name { }` put `margin: 10px 0 0;` and `font-size: 24px;`. Inside `.handle { }` put `margin: 0;` and `color: #a06cd5;`.",
  snippet:`.name {
  margin: 10px 0 0;
  font-size: 24px;
}
.handle {
  margin: 0;
  color: #a06cd5;
}`,
  hints:["Two rules: `.name { }` and `.handle { }`.","`.name { margin: 10px 0 0; font-size: 24px; }`","`.handle { margin: 0; color: #a06cd5; }`"],
  tip:"An @handle is your username on social apps.",
  checks:[cssPx('.name','fontSize',24,"Give `.name` `font-size: 24px;`."),cssPx('.handle','marginTop',0,"Add `margin: 0;` to `.handle`.")]}),
 S('pf7','Pill badges',{why:"Badges show what Priya is proud of. Pill shapes look great.",
  todo:"Style `.badge` with `background-color: #e7f6ff;`, `color: #2b6cb0;`, `padding: 4px 10px;`, `border-radius: 999px;` and `font-size: 12px;`.",
  job:"Inside `.badge { }` put `background-color: #e7f6ff;`, `color: #2b6cb0;`, `padding: 4px 10px;`, `border-radius: 999px;`, `font-size: 12px;`.",
  snippet:`.badge {
  background-color: #e7f6ff;
  color: #2b6cb0;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
}`,
  hints:["New rule: `.badge { }`.","`background-color: #e7f6ff; color: #2b6cb0; padding: 4px 10px; border-radius: 999px; font-size: 12px;`"],
  tip:"`border-radius: 999px;` = 'as round as possible'. It always makes a pill.",
  checks:[bg('.badge',"Give `.badge` `background-color: #e7f6ff;`."),round('.badge',10,"Make pills: `border-radius: 999px;`.")]}),
 S('pf8','Badges that wrap',{why:"The badges bump into each other. Let them wrap onto new lines neatly.",
  learn:"`flex-wrap: wrap;` lets flex items move to the next line when there's no more room.",
  todo:"Style `.badges` with `display: flex;`, `flex-wrap: wrap;`, `justify-content: center;`, `gap: 6px;` and `padding: 0 16px;`.",
  job:"Inside `.badges { }` put `display: flex;`, `flex-wrap: wrap;`, `justify-content: center;`, `gap: 6px;` and `padding: 0 16px;`.",
  snippet:`.badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  padding: 0 16px;
}`,
  hints:["New rule: `.badges { }` — with an s! It's the box around the badges.","`display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; padding: 0 16px;`"],
  tip:"`.badge` = one badge. `.badges` = the box holding them all.",
  checks:[cssIs('.badges','display','flex',"Add `display: flex;` to `.badges`."),cssIs('.badges','flexWrap','wrap',"Add `flex-wrap: wrap;` to `.badges`.")]}),
 S('pf9','Stats row',{why:"Numbers in a row, with the big number on top of its word.",
  learn:"`justify-content: space-around;` spreads items out with equal space around each one.",
  todo:"Style `.stats` with `display: flex;`, `justify-content: space-around;`, `margin: 16px 0;`. Style `.stats b` with `display: block;`, `font-size: 20px;`, `color: #a06cd5;`.",
  job:"Inside `.stats { }` put `display: flex;`, `justify-content: space-around;`, `margin: 16px 0;`. Inside `.stats b { }` put `display: block;`, `font-size: 20px;`, `color: #a06cd5;`.",
  snippet:`.stats {
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
}
.stats b {
  display: block;
  font-size: 20px;
  color: #a06cd5;
}`,
  hints:["Two rules: `.stats { }` and `.stats b { }`.","`.stats { display: flex; justify-content: space-around; margin: 16px 0; }`","`.stats b { display: block; font-size: 20px; color: #a06cd5; }`"],
  tip:"`display: block;` makes the number take its own line.",
  checks:[cssIs('.stats','display','flex',"Add `display: flex;` to `.stats`."),cssIs('.stats b','display','block',"Add `display: block;` to `.stats b`.")]}),
 S('pf10','Follow button',{why:"Last thing: a big purple Follow button!",
  todo:"Style `.follow` with `background-color: #a06cd5;`, `color: white;`, `border: none;`, `padding: 10px 30px;`, `border-radius: 999px;`, `font-size: 16px;`, `cursor: pointer;`. Then `.follow:hover` with `background-color: #8a4fc4;`.",
  job:"Inside `.follow { }` put `background-color: #a06cd5;`, `color: white;`, `border: none;`, `padding: 10px 30px;`, `border-radius: 999px;`, `font-size: 16px;`, `cursor: pointer;`. Add `.follow:hover { background-color: #8a4fc4; }`.",
  snippet:`.follow {
  background-color: #a06cd5;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 999px;
  font-size: 16px;
  cursor: pointer;
}
.follow:hover {
  background-color: #8a4fc4;
}`,
  hints:["Two rules: `.follow { }` and `.follow:hover { }`.","`.follow { background-color: #a06cd5; color: white; border: none; padding: 10px 30px; border-radius: 999px; font-size: 16px; cursor: pointer; }`","`.follow:hover { background-color: #8a4fc4; }`"],
  tip:"Your profile card is ready to share! 🦊",
  checks:[cssIs('.follow','cursor','pointer',"Add `cursor: pointer;` to `.follow`."),hoverRule('.follow:hover',"Add `.follow:hover { background-color: #8a4fc4; }`.")]})
 ]},
/* ------------------------------------------------------------------ 10 */
{id:'pc_bakery',cat:'css',emoji:'🥐',title:'Bakery Menu Board',mentor:'Mr Crumb, baker',
 blurb:'A bakery menu laid out with grid areas, fancy fonts and dotted price lines.',
 intro:"Mr Crumb's bakery needs a menu board for the shop window. You'll draw the layout like a map with **grid-template-areas**, use a curly sign font, and make those classic **dotted lines** between food and price.",
 base:`<div class="menu">
  <header class="sign">
    <h1>The Sweet Crumb</h1>
    <p>🥐 Baked fresh every morning 🥖</p>
  </header>
  <section class="breads">
    <h2>Breads</h2>
    <p class="item"><span class="name">Sourdough loaf</span><span class="dots"></span><span class="price">$7</span></p>
    <p class="item"><span class="name">Fruit bun</span><span class="dots"></span><span class="price">$3</span></p>
    <p class="item"><span class="name">Cheesy roll</span><span class="dots"></span><span class="price">$4</span></p>
  </section>
  <section class="cakes">
    <h2>Cakes</h2>
    <p class="item"><span class="name">Lemon slice</span><span class="dots"></span><span class="price">$5</span></p>
    <p class="item"><span class="name">Brownie</span><span class="dots"></span><span class="price">$4</span></p>
    <p class="item"><span class="name">Carrot cake</span><span class="dots"></span><span class="price">$6</span></p>
  </section>
  <section class="drinks">
    <h2>Drinks</h2>
    <p class="item"><span class="name">Hot chocolate</span><span class="dots"></span><span class="price">$5</span></p>
    <p class="item"><span class="name">Orange juice</span><span class="dots"></span><span class="price">$4</span></p>
    <p class="item"><span class="name">Strawberry milkshake</span><span class="dots"></span><span class="price">$6</span></p>
  </section>
  <footer class="special">⭐ Today's special: Strawberry tart $5 ⭐</footer>
</div>

<style>

</style>`,
 steps:[
 S('b1','Warm bakery colours',{why:"A bakery should feel warm, like fresh bread.",
  todo:"Style `body` with `background-color: #fff8ee;`, `font-family: Georgia, serif;` and `color: #5b3a1e;`.",
  job:"Inside `body { }` put `background-color: #fff8ee;`, `font-family: Georgia, serif;` and `color: #5b3a1e;`.",
  snippet:`body {
  background-color: #fff8ee;
  font-family: Georgia, serif;
  color: #5b3a1e;
}`,
  hints:["Start with `body { }`.","`background-color: #fff8ee; font-family: Georgia, serif; color: #5b3a1e;`"],
  tip:"'Serif' fonts have little feet on the letters. They feel old-fashioned and cosy.",
  checks:[fontCheck,notInk('body',"Give `body` `color: #5b3a1e;`.")]}),
 S('b2','A 2-column grid',{why:"The menu needs columns, like a real board.",
  todo:"Style `.menu` with `max-width: 640px;`, `margin: 0 auto;`, `display: grid;`, `grid-template-columns: 1fr 1fr;` and `gap: 16px;`.",
  job:"Inside `.menu { }` put `max-width: 640px;`, `margin: 0 auto;`, `display: grid;`, `grid-template-columns: 1fr 1fr;` and `gap: 16px;`.",
  snippet:`.menu {
  max-width: 640px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}`,
  hints:["New rule: `.menu { }`.","`max-width: 640px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;`"],
  tip:"It looks a bit jumbled now. Next step we draw a map to fix it!",
  checks:[cssIs('.menu','display','grid',"Add `display: grid;` to `.menu`."),[a=>gridCols(a,'.menu').length===2,"Use `grid-template-columns: 1fr 1fr;`."]]}),
 S('b3','Draw the map',{why:"Grid areas let you DRAW your layout with words. Each word in quotes is one cell.",
  learn:"Each line in quotes is one row. Write a name twice to make it fill 2 cells:\n`\"sign sign\"` = the sign goes all the way across.\n`\"breads cakes\"` = breads on the left, cakes on the right.",
  todo:"Add `grid-template-areas: \"sign sign\" \"breads cakes\" \"drinks drinks\" \"special special\";` to your `.menu` rule.",
  job:"Add the map to `.menu { }`: `grid-template-areas: \"sign sign\" \"breads cakes\" \"drinks drinks\" \"special special\";`.",
  where:inRule('.menu'),kind:'edit',apply:addTo('.menu',['grid-template-areas:','  "sign sign"','  "breads cakes"','  "drinks drinks"','  "special special";']),
  snippet:`.menu {
  max-width: 640px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  grid-template-areas:
    "sign sign"
    "breads cakes"
    "drinks drinks"
    "special special";
}`,
  hints:["Add it inside `.menu { }`. Each row goes in its own \"quotes\".","`grid-template-areas: \"sign sign\" \"breads cakes\" \"drinks drinks\" \"special special\";` (one line or many lines both work)"],
  tip:"Nothing moves yet — we've drawn the map, but haven't told each part where to go.",
  checks:[cssNot('.menu','gridTemplateAreas',['none'],"Add `grid-template-areas: ...` to `.menu`.")]}),
 S('b4','Everything in its place',{why:"Now tell each part which area of the map it lives in.",
  learn:"`grid-area: sign;` says 'put me where the map says sign'.",
  todo:"Give `.sign` `grid-area: sign;`, `.breads` `grid-area: breads;`, `.cakes` `grid-area: cakes;`, `.drinks` `grid-area: drinks;` and `.special` `grid-area: special;`.",
  job:"Make 5 rules: `.sign { grid-area: sign; }`, `.breads { grid-area: breads; }`, `.cakes { grid-area: cakes; }`, `.drinks { grid-area: drinks; }`, `.special { grid-area: special; }`.",
  snippet:`.sign {
  grid-area: sign;
}
.breads {
  grid-area: breads;
}
.cakes {
  grid-area: cakes;
}
.drinks {
  grid-area: drinks;
}
.special {
  grid-area: special;
}`,
  hints:["Five tiny rules, one for each part.","`.sign { grid-area: sign; }` … then the same for breads, cakes, drinks and special."],
  tip:"Want drinks on top? Just change the map — no HTML changes needed!",
  checks:[[a=>{const s=box(a,'.sign'),m=box(a,'.menu');return !!s&&!!m&&s.width>=m.width-2;},"Add `.sign { grid-area: sign; }` so the sign goes all the way across."],sameRow('.breads','.cakes',"Add `.breads { grid-area: breads; }` and `.cakes { grid-area: cakes; }`."),[a=>{const s=box(a,'.drinks'),m=box(a,'.menu');return !!s&&!!m&&s.width>=m.width-2;},"Add `.drinks { grid-area: drinks; }`."],[a=>{const s=box(a,'.special'),m=box(a,'.menu');return !!s&&!!m&&s.width>=m.width-2;},"Add `.special { grid-area: special; }`."]]}),
 S('b5','The shop sign',{why:"The sign at the top should be a big pink banner.",
  todo:"Add `text-align: center;`, `background-color: #f7c8d0;`, `border-radius: 16px;` and `padding: 14px;` to your `.sign` rule.",
  job:"Add to your `.sign { }` rule: `text-align: center;`, `background-color: #f7c8d0;`, `border-radius: 16px;` and `padding: 14px;`.",
  where:inRule('.sign'),kind:'edit',apply:addTo('.sign',['text-align: center;','background-color: #f7c8d0;','border-radius: 16px;','padding: 14px;']),
  snippet:`.sign {
  grid-area: sign;
  text-align: center;
  background-color: #f7c8d0;
  border-radius: 16px;
  padding: 14px;
}`,
  hints:["Add 4 lines inside `.sign { }`, after `grid-area: sign;`.","`text-align: center; background-color: #f7c8d0; border-radius: 16px; padding: 14px;`"],
  tip:"One rule can do layout (`grid-area`) AND looks (colours) at the same time.",
  checks:[cssIs('.sign','textAlign','center',"Add `text-align: center;` to `.sign`."),bg('.sign',"Give `.sign` `background-color: #f7c8d0;`.")]}),
 S('b6','A curly sign font',{why:"Bakery signs use fancy, hand-written letters.",
  todo:"Style `.sign h1` with `font-family: 'Brush Script MT', cursive;`, `font-size: 48px;`, `color: #b5466b;` and `margin: 0;`.",
  job:"Inside `.sign h1 { }` put `font-family: 'Brush Script MT', cursive;`, `font-size: 48px;`, `color: #b5466b;` and `margin: 0;`.",
  snippet:`.sign h1 {
  font-family: 'Brush Script MT', cursive;
  font-size: 48px;
  color: #b5466b;
  margin: 0;
}`,
  hints:["Selector: `.sign h1`.","`font-family: 'Brush Script MT', cursive; font-size: 48px; color: #b5466b; margin: 0;`"],
  tip:"`cursive` is the backup: any joined-up handwriting font the computer has.",
  checks:[fontDiff('.sign h1',"Give `.sign h1` a different `font-family`, like `'Brush Script MT', cursive`."),cssMin('.sign h1','fontSize',36,"Make `.sign h1` `font-size: 48px;`.")]}),
 S('b7','Menu panels',{why:"Each food group gets its own white panel.",
  todo:"Style `section` with `background-color: white;`, `border-radius: 14px;`, `padding: 12px 16px;`. Style `h2` with `margin-top: 0;` and `border-bottom: 2px solid #f7c8d0;`.",
  job:"Inside `section { }` put `background-color: white;`, `border-radius: 14px;`, `padding: 12px 16px;`. Inside `h2 { }` put `margin-top: 0;` and `border-bottom: 2px solid #f7c8d0;`.",
  snippet:`section {
  background-color: white;
  border-radius: 14px;
  padding: 12px 16px;
}
h2 {
  margin-top: 0;
  border-bottom: 2px solid #f7c8d0;
}`,
  hints:["Two rules: `section { }` and `h2 { }` (tags — no dots).","`section { background-color: white; border-radius: 14px; padding: 12px 16px; }`","`h2 { margin-top: 0; border-bottom: 2px solid #f7c8d0; }`"],
  tip:"Styling the tag `section` changes ALL three sections at once.",
  checks:[bgWhite('section',"Give `section` `background-color: white;`."),cssPx('h2','marginTop',0,"Add `margin-top: 0;` to `h2`.")]}),
 S('b8','Food rows',{why:"Each food and its price go in one row.",
  todo:"Style `.item` with `display: flex;`, `align-items: baseline;`, `gap: 6px;`, `margin: 8px 0;`. Style `.price` with `font-weight: bold;` and `color: #b5466b;`.",
  job:"Inside `.item { }` put `display: flex;`, `align-items: baseline;`, `gap: 6px;`, `margin: 8px 0;`. Inside `.price { }` put `font-weight: bold;` and `color: #b5466b;`.",
  snippet:`.item {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 8px 0;
}
.price {
  font-weight: bold;
  color: #b5466b;
}`,
  hints:["Two rules: `.item { }` and `.price { }`.","`.item { display: flex; align-items: baseline; gap: 6px; margin: 8px 0; }`","`.price { font-weight: bold; color: #b5466b; }`"],
  tip:"`baseline` lines words up along the bottom of the letters.",
  checks:[cssIs('.item','display','flex',"Add `display: flex;` to `.item`."),cssIs('.price','fontWeight','700',"Add `font-weight: bold;` to `.price`.")]}),
 S('b9','Dotted lines',{why:"The classic menu look: dots that lead your eye from the food to its price.",
  learn:"Each row has an empty `<span class=\"dots\">` in the middle. `flex: 1;` stretches it to fill the gap, and `border-bottom: 2px dotted ...;` draws dots along it.",
  todo:"Style `.dots` with `flex: 1;` and `border-bottom: 2px dotted #d4a373;`.",
  job:"Draw dots to the price. Inside `.dots { }` put `flex: 1;` and `border-bottom: 2px dotted #d4a373;`.",
  snippet:`.dots {
  flex: 1;
  border-bottom: 2px dotted #d4a373;
}`,
  hints:["New rule: `.dots { }`.","`flex: 1; border-bottom: 2px dotted #d4a373;`"],
  tip:"These dots are called 'leaders' because they lead your eye along.",
  checks:[cssIs('.dots','borderBottomStyle','dotted',"Add `border-bottom: 2px dotted #d4a373;` to `.dots`."),cssIs('.dots','flexGrow','1',"Add `flex: 1;` to `.dots`.")]}),
 S('b10',"Today's special",{why:"The special should shine at the bottom of the board!",
  todo:"Add `text-align: center;`, `background-color: #fff1a8;`, `padding: 10px;`, `border-radius: 12px;` and `font-style: italic;` to your `.special` rule.",
  job:"Add to your `.special { }` rule: `text-align: center;`, `background-color: #fff1a8;`, `padding: 10px;`, `border-radius: 12px;`, `font-style: italic;`.",
  where:inRule('.special'),kind:'edit',apply:addTo('.special',['text-align: center;','background-color: #fff1a8;','padding: 10px;','border-radius: 12px;','font-style: italic;']),
  snippet:`.special {
  grid-area: special;
  text-align: center;
  background-color: #fff1a8;
  padding: 10px;
  border-radius: 12px;
  font-style: italic;
}`,
  hints:["Add 5 lines inside `.special { }`, after `grid-area: special;`.","`text-align: center; background-color: #fff1a8; padding: 10px; border-radius: 12px; font-style: italic;`"],
  tip:"Mr Crumb is printing it for the window right now. 🥐",
  checks:[cssIs('.special','textAlign','center',"Add `text-align: center;` to `.special`."),bg('.special',"Give `.special` `background-color: #fff1a8;`.")]})
 ]},
/* ------------------------------------------------------------------ 11 */
{id:'pc_ticket',cat:'css',emoji:'🎟️',title:'Event Ticket',mentor:'Rosa, circus ringmaster',
 blurb:'A circus ticket with a tear-off stub, a dashed tear line and spaced-out capital letters.',
 intro:"Roll up, roll up! Rosa's Rainbow Circus needs tickets. You'll pin a **stub** to the side with `position: absolute`, draw a **dashed tear line**, and use `letter-spacing` and `uppercase` to make words look like a real ticket.",
 base:`<div class="ticket">
  <div class="main">
    <p class="label">Admit one</p>
    <h1 class="event">Rainbow Circus</h1>
    <p class="info">Saturday 14 June · 2:00 PM</p>
    <p class="info">Big Top Tent · Sunny Park</p>
    <div class="seat">
      <div><span>Row</span><b>C</b></div>
      <div><span>Seat</span><b>12</b></div>
      <div><span>Gate</span><b>3</b></div>
    </div>
  </div>
  <div class="stub">
    <p class="stub-text">No. 004217</p>
    <div class="emoji">🎪</div>
  </div>
</div>

<style>

</style>`,
 steps:[
 S('t1','Circus page',{why:"A light peach page, like a sunny circus day.",
  todo:"Style `body` with `background-color: #fff4e6;`, `font-family: Verdana, sans-serif;` and `padding: 20px;`.",
  job:"Inside `body { }` put `background-color: #fff4e6;`, `font-family: Verdana, sans-serif;` and `padding: 20px;`.",
  snippet:`body {
  background-color: #fff4e6;
  font-family: Verdana, sans-serif;
  padding: 20px;
}`,
  hints:["Start with `body { }`.","`background-color: #fff4e6; font-family: Verdana, sans-serif; padding: 20px;`"],
  tip:"Peach, yellow and pink are perfect circus colours. 🎪",
  checks:[bg('body',"Give `body` `background-color: #fff4e6;`."),fontCheck]}),
 S('t2','The ticket',{why:"A yellow ticket shape. `position: relative` gets it ready for the stub.",
  learn:"`position: relative;` on the ticket makes it the 'home base'. Anything inside with `position: absolute;` is placed from the ticket's edges.",
  todo:"Style `.ticket` with `position: relative;`, `max-width: 460px;`, `margin: 0 auto;`, `background-color: #ffe066;`, `border-radius: 16px;` and `overflow: hidden;`.",
  job:"Inside `.ticket { }` put `position: relative;`, `max-width: 460px;`, `margin: 0 auto;`, `background-color: #ffe066;`, `border-radius: 16px;`, `overflow: hidden;`.",
  snippet:`.ticket {
  position: relative;
  max-width: 460px;
  margin: 0 auto;
  background-color: #ffe066;
  border-radius: 16px;
  overflow: hidden;
}`,
  hints:["New rule: `.ticket { }`.","`position: relative; max-width: 460px; margin: 0 auto;`","`background-color: #ffe066; border-radius: 16px; overflow: hidden;`"],
  tip:"`relative` doesn't move anything on its own — it's a 'home base' for later.",
  checks:[cssIs('.ticket','position','relative',"Add `position: relative;` to `.ticket`."),bg('.ticket',"Give `.ticket` `background-color: #ffe066;`.")]}),
 S('t3','Pin the stub',{why:"The stub is the part that gets torn off. It should stick to the right side of the ticket.",
  learn:"`position: absolute;` takes a box out of the normal flow. `top: 0; right: 0; bottom: 0;` glues it to the top, right and bottom edges of the ticket.",
  todo:"Style `.stub` with `position: absolute;`, `top: 0;`, `right: 0;`, `bottom: 0;`, `width: 100px;`, `background-color: #ff8fab;`, `text-align: center;` and `padding-top: 24px;`.",
  job:"Inside `.stub { }` put `position: absolute;`, `top: 0;`, `right: 0;`, `bottom: 0;`, `width: 100px;`, `background-color: #ff8fab;`, `text-align: center;`, `padding-top: 24px;`.",
  snippet:`.stub {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100px;
  background-color: #ff8fab;
  text-align: center;
  padding-top: 24px;
}`,
  hints:["New rule: `.stub { }`.","`position: absolute; top: 0; right: 0; bottom: 0; width: 100px;`","`background-color: #ff8fab; text-align: center; padding-top: 24px;`"],
  tip:"Oops — the stub covers some words! We fix that next.",
  checks:[cssIs('.stub','position','absolute',"Add `position: absolute;` to `.stub`."),[a=>{const s=box(a,'.stub'),t=box(a,'.ticket');return !!s&&!!t&&Math.abs(s.right-t.right)<=1&&Math.abs(s.top-t.top)<=1&&Math.abs(s.bottom-t.bottom)<=1;},"Glue the stub to the edges: `top: 0; right: 0; bottom: 0;`."],cssPx('.stub','width',100,"Give `.stub` `width: 100px;`.")]}),
 S('t4','Make room',{why:"The words are hiding under the stub. Padding on the right makes room for it.",
  learn:"`padding: 20px 120px 20px 24px;` goes clockwise: top, right, bottom, left. 120px on the right is more than the 100px stub.",
  todo:"Style `.main` with `padding: 20px 120px 20px 24px;`.",
  job:"Move the words away from the stub. Inside `.main { }` put `padding: 20px 120px 20px 24px;`.",
  snippet:`.main {
  padding: 20px 120px 20px 24px;
}`,
  hints:["New rule: `.main { }`.","`.main { padding: 20px 120px 20px 24px; }`"],
  tip:"Remember the order like a clock: top (12), right (3), bottom (6), left (9). 🕛",
  checks:[cssMin('.main','paddingRight',100,"Give `.main` `padding: 20px 120px 20px 24px;` — the right side must be bigger than the stub."),cssMin('.main','paddingLeft',10,"Give `.main` `padding: 20px 120px 20px 24px;`.")]}),
 S('t5','The tear line',{why:"A dashed line shows where to tear the stub off. ✂️",
  learn:"`border-left: 3px dashed white;` draws a line on ONLY the left side, made of little dashes.",
  todo:"Add `border-left: 3px dashed white;` to your `.stub` rule.",
  job:"Draw a tear line. Add `border-left: 3px dashed white;` inside your `.stub { }` rule.",
  where:inRule('.stub'),kind:'edit',apply:addTo('.stub',['border-left: 3px dashed white;']),
  snippet:`.stub {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100px;
  background-color: #ff8fab;
  text-align: center;
  padding-top: 24px;
  border-left: 3px dashed white;
}`,
  hints:["Add one line inside `.stub { }`.","`border-left: 3px dashed white;`"],
  tip:"Border styles: `solid`, `dashed`, `dotted`, `double`. Try them all!",
  checks:[cssIs('.stub','borderLeftStyle','dashed',"Add `border-left: 3px dashed white;` to `.stub`.")]}),
 S('t6','Ticket letters',{why:"Real tickets use small CAPITAL letters with space between them.",
  learn:"`text-transform: uppercase;` turns letters into CAPITALS. `letter-spacing: 4px;` adds space between every letter.",
  todo:"Style `.label` with `margin: 0;`, `font-size: 12px;`, `text-transform: uppercase;`, `letter-spacing: 4px;` and `color: #c9184a;`.",
  job:"Inside `.label { }` put `margin: 0;`, `font-size: 12px;`, `text-transform: uppercase;`, `letter-spacing: 4px;` and `color: #c9184a;`.",
  snippet:`.label {
  margin: 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #c9184a;
}`,
  hints:["New rule: `.label { }`.","`margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 4px; color: #c9184a;`"],
  tip:"The HTML still says 'Admit one' — CSS only changes how it LOOKS.",
  checks:[cssIs('.label','textTransform','uppercase',"Add `text-transform: uppercase;` to `.label`."),cssPx('.label','letterSpacing',4,"Add `letter-spacing: 4px;` to `.label`.")]}),
 S('t7','Circus title',{why:"The show's name needs a big, bold poster font.",
  todo:"Style `.event` with `font-family: Impact, 'Arial Black', sans-serif;`, `font-size: 36px;`, `color: #e5383b;` and `margin: 4px 0 10px;`.",
  job:"Inside `.event { }` put `font-family: Impact, 'Arial Black', sans-serif;`, `font-size: 36px;`, `color: #e5383b;`, `margin: 4px 0 10px;`.",
  snippet:`.event {
  font-family: Impact, 'Arial Black', sans-serif;
  font-size: 36px;
  color: #e5383b;
  margin: 4px 0 10px;
}`,
  hints:["New rule: `.event { }`.","`font-family: Impact, 'Arial Black', sans-serif; font-size: 36px; color: #e5383b; margin: 4px 0 10px;`"],
  tip:"Impact is a classic poster font — tall, thick and loud!",
  checks:[fontDiff('.event',"Give `.event` its own `font-family`, like `Impact, 'Arial Black', sans-serif`."),cssMin('.event','fontSize',30,"Make `.event` `font-size: 36px;`.")]}),
 S('t8','Seat boxes',{why:"Row, seat and gate go in little white boxes so you find your seat fast.",
  todo:"Style `.seat` with `display: flex;`, `gap: 10px;`, `margin-top: 14px;`. Style `.seat div` with `background-color: white;`, `border-radius: 8px;`, `padding: 6px 12px;`, `text-align: center;`.",
  job:"Inside `.seat { }` put `display: flex;`, `gap: 10px;`, `margin-top: 14px;`. Inside `.seat div { }` put `background-color: white;`, `border-radius: 8px;`, `padding: 6px 12px;`, `text-align: center;`.",
  snippet:`.seat {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.seat div {
  background-color: white;
  border-radius: 8px;
  padding: 6px 12px;
  text-align: center;
}`,
  hints:["Two rules: `.seat { }` and `.seat div { }`.","`.seat { display: flex; gap: 10px; margin-top: 14px; }`","`.seat div { background-color: white; border-radius: 8px; padding: 6px 12px; text-align: center; }`"],
  tip:"`.seat div` = every `<div>` inside `.seat`.",
  checks:[cssIs('.seat','display','flex',"Add `display: flex;` to `.seat`."),bgWhite('.seat div',"Give `.seat div` `background-color: white;`.")]}),
 S('t9','Tiny labels',{why:"The words 'Row', 'Seat' and 'Gate' should be tiny capitals on top of the big letter.",
  todo:"Style `.seat span` with `display: block;`, `font-size: 10px;`, `text-transform: uppercase;` and `letter-spacing: 2px;`.",
  job:"Inside `.seat span { }` put `display: block;`, `font-size: 10px;`, `text-transform: uppercase;` and `letter-spacing: 2px;`.",
  snippet:`.seat span {
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
}`,
  hints:["Selector: `.seat span`.","`display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;`"],
  tip:"`display: block;` pushes the big letter onto the next line.",
  checks:[cssIs('.seat span','display','block',"Add `display: block;` to `.seat span`."),cssPx('.seat span','letterSpacing',2,"Add `letter-spacing: 2px;` to `.seat span`.")]}),
 S('t10','Stub details',{why:"Finish the stub: a white ticket number and a big circus tent.",
  todo:"Style `.stub-text` with `margin: 0 0 8px;`, `font-size: 11px;`, `font-weight: bold;`, `color: white;`. Style `.emoji` with `font-size: 40px;`.",
  job:"Inside `.stub-text { }` put `margin: 0 0 8px;`, `font-size: 11px;`, `font-weight: bold;`, `color: white;`. Inside `.emoji { }` put `font-size: 40px;`.",
  snippet:`.stub-text {
  margin: 0 0 8px;
  font-size: 11px;
  font-weight: bold;
  color: white;
}
.emoji {
  font-size: 40px;
}`,
  hints:["Two rules: `.stub-text { }` and `.emoji { }`.","`.stub-text { margin: 0 0 8px; font-size: 11px; font-weight: bold; color: white; }`","`.emoji { font-size: 40px; }`"],
  tip:"Print it out, cut along the dashes — you've got a real ticket! 🎟️",
  checks:[cssIs('.stub-text','color',WHITE,"Give `.stub-text` `color: white;`."),cssMin('.emoji','fontSize',36,"Make `.emoji` `font-size: 40px;`.")]})
 ]},
/* ------------------------------------------------------------------ 12 */
{id:'pc_loading',cat:'css',emoji:'⏳',title:'Animated Loading Screen',mentor:'Bolt, game developer',
 blurb:'A game loading screen with a spinning ring, bouncing dots and a filling bar — all CSS!',
 intro:"Bolt's game takes a few seconds to load and needs a fun loading screen. You'll learn **@keyframes animations**: a spinning ring, dots that bounce one after another with `animation-delay`, and a bar that fills up. No JavaScript at all!",
 base:`<div class="loading-screen">
  <h1 class="game-name">Bubble Quest</h1>
  <div class="ring"></div>
  <div class="dots">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <p class="status">Loading your adventure...</p>
  <div class="bar">
    <div class="bar-fill"></div>
  </div>
  <p class="hint">Tip: pop the gold bubbles for extra points!</p>
</div>

<style>

</style>`,
 steps:[
 S('l1','A clean start',{why:"Loading screens fill the whole screen, so we remove the edge gap first.",
  todo:"Style `body` with `margin: 0;` and `font-family: 'Trebuchet MS', sans-serif;`.",
  job:"Inside `body { }` put `margin: 0;` and `font-family: 'Trebuchet MS', sans-serif;`.",
  snippet:`body {
  margin: 0;
  font-family: 'Trebuchet MS', sans-serif;
}`,
  hints:["Start with `body { }`.","`margin: 0; font-family: 'Trebuchet MS', sans-serif;`"],
  tip:"Games show loading screens while pictures and sounds download.",
  checks:[cssPx('body','marginTop',0,"Add `margin: 0;` to `body`."),fontCheck]}),
 S('l2','Full-screen centre',{why:"Everything should stack in the middle of a dreamy bubble-coloured screen.",
  learn:"`flex-direction: column;` + `align-items: center;` + `justify-content: center;` = a centred stack.",
  todo:"Style `.loading-screen` with `min-height: 100vh;`, `display: flex;`, `flex-direction: column;`, `align-items: center;`, `justify-content: center;`, `background: linear-gradient(#e0f7ff, #fce4ff);` and `color: #5b4bdb;`.",
  job:"Inside `.loading-screen { }` put `min-height: 100vh;`, `display: flex;`, `flex-direction: column;`, `align-items: center;`, `justify-content: center;`, `background: linear-gradient(#e0f7ff, #fce4ff);`, `color: #5b4bdb;`.",
  snippet:`.loading-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#e0f7ff, #fce4ff);
  color: #5b4bdb;
}`,
  hints:["New rule: `.loading-screen { }`.","`min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;`","`background: linear-gradient(#e0f7ff, #fce4ff); color: #5b4bdb;`"],
  tip:"You used this centring trick before — now it's in a column!",
  checks:[cssIs('.loading-screen','flexDirection','column',"Add `display: flex;` and `flex-direction: column;` to `.loading-screen`."),cssIs('.loading-screen','alignItems','center',"Add `align-items: center;` to `.loading-screen`."),grad('.loading-screen',"Give `.loading-screen` `background: linear-gradient(#e0f7ff, #fce4ff);`.")]}),
 S('l3','The ring',{why:"A spinner is just a circle with ONE coloured side. When it spins, it looks like it's chasing itself.",
  learn:"`border: 8px solid #d6e9ff;` colours all 4 sides pale. Then `border-top-color: #4dabf7;` colours only the top side blue.",
  todo:"Style `.ring` with `width: 60px;`, `height: 60px;`, `border: 8px solid #d6e9ff;`, `border-top-color: #4dabf7;` and `border-radius: 50%;`.",
  job:"Make a ring. Inside `.ring { }` put `width: 60px;`, `height: 60px;`, `border: 8px solid #d6e9ff;`, `border-top-color: #4dabf7;`, `border-radius: 50%;`.",
  snippet:`.ring {
  width: 60px;
  height: 60px;
  border: 8px solid #d6e9ff;
  border-top-color: #4dabf7;
  border-radius: 50%;
}`,
  hints:["New rule: `.ring { }`.","`width: 60px; height: 60px; border: 8px solid #d6e9ff;`","`border-top-color: #4dabf7; border-radius: 50%;` — the top-colour line must come AFTER `border`."],
  tip:"Put `border-top-color` after `border`, or `border` will paint over it!",
  checks:[circle('.ring',"Make `.ring` round: `border-radius: 50%;`."),cssPx('.ring','width',60,"Give `.ring` `width: 60px;` and `height: 60px;`."),[a=>{const e=a.$('.ring');return !!e&&a.css(e,'borderTopStyle')==='solid'&&a.css(e,'borderTopColor')!==a.css(e,'borderRightColor');},"Give `.ring` `border: 8px solid #d6e9ff;` and then `border-top-color: #4dabf7;`."]]}),
 S('l4','Make it spin',{why:"Time for animation! We describe the move once, then tell the ring to do it forever.",
  learn:"`@keyframes spin { to { transform: rotate(360deg); } }` describes a move called **spin**: turn all the way round.\n`animation: spin 1s linear infinite;` = do **spin**, take 1 second, same speed all the way, forever.",
  todo:"Add `@keyframes spin { to { transform: rotate(360deg); } }` at the bottom of your style. Then add `animation: spin 1s linear infinite;` to your `.ring` rule.",
  job:"Write `@keyframes spin { to { transform: rotate(360deg); } }`. Then add `animation: spin 1s linear infinite;` inside `.ring { }`.",
  where:"Add the `animation` line inside your `.ring { }` rule. Put the `@keyframes spin` block just before `</style>`.",kind:'edit',
  apply:c=>addTo('.ring',['animation: spin 1s linear infinite;'])(PK.insCSS(c,"@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}")),
  snippet:`.ring {
  width: 60px;
  height: 60px;
  border: 8px solid #d6e9ff;
  border-top-color: #4dabf7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}`,
  hints:["Two parts: the `@keyframes spin { ... }` block, and one `animation` line in `.ring`.","`@keyframes spin { to { transform: rotate(360deg); } }`","Inside `.ring { }` add `animation: spin 1s linear infinite;`"],
  tip:"The name in `animation:` must match the name after `@keyframes` exactly.",
  checks:[kf('spin',"Write `@keyframes spin { to { transform: rotate(360deg); } }`."),anim('.ring','spin',"Add `animation: spin 1s linear infinite;` to `.ring`."),cssIs('.ring','animationIterationCount','infinite',"Add the word `infinite` so it never stops: `animation: spin 1s linear infinite;`.")]}),
 S('l5','Three dots',{why:"Next: three little dots that will bounce. First, make them.",
  todo:"Style `.dots` with `display: flex;`, `gap: 8px;`, `margin: 24px 0;`. Style `.dot` with `width: 14px;`, `height: 14px;`, `border-radius: 50%;`, `background-color: #ff8cc6;`.",
  job:"Inside `.dots { }` put `display: flex;`, `gap: 8px;`, `margin: 24px 0;`. Inside `.dot { }` put `width: 14px;`, `height: 14px;`, `border-radius: 50%;`, `background-color: #ff8cc6;`.",
  snippet:`.dots {
  display: flex;
  gap: 8px;
  margin: 24px 0;
}
.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #ff8cc6;
}`,
  hints:["Two rules: `.dots { }` (the box) and `.dot { }` (each dot).","`.dots { display: flex; gap: 8px; margin: 24px 0; }`","`.dot { width: 14px; height: 14px; border-radius: 50%; background-color: #ff8cc6; }`"],
  tip:"The dots are empty `<span>`s — CSS gives them size and colour.",
  checks:[cssIs('.dots','display','flex',"Add `display: flex;` to `.dots`."),cssPx('.dot','width',14,"Give `.dot` `width: 14px;` and `height: 14px;`."),bg('.dot',"Give `.dot` `background-color: #ff8cc6;`.")]}),
 S('l6','Bounce!',{why:"Now make the dots jump up and down.",
  learn:"Keyframes can have steps in %:\n`0%, 100%` = start and end (on the ground).\n`50%` = halfway (up in the air). `translateY(-14px)` moves UP 14px.",
  todo:"Write `@keyframes bounce` with `0%, 100% { transform: translateY(0); }` and `50% { transform: translateY(-14px); }`. Then add `animation: bounce 0.6s ease-in-out infinite;` to your `.dot` rule.",
  job:"Write `@keyframes bounce` (see the hint). Add `animation: bounce 0.6s ease-in-out infinite;` inside `.dot { }`.",
  where:"Add the `animation` line inside your `.dot { }` rule. Put the `@keyframes bounce` block just before `</style>`.",kind:'edit',
  apply:c=>addTo('.dot',['animation: bounce 0.6s ease-in-out infinite;'])(PK.insCSS(c,"@keyframes bounce {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-14px);\n  }\n}")),
  snippet:`.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #ff8cc6;
  animation: bounce 0.6s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}`,
  hints:["Two parts again: a `@keyframes bounce { }` block, and one `animation` line in `.dot`.","`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }`","Inside `.dot { }` add `animation: bounce 0.6s ease-in-out infinite;`"],
  tip:"`ease-in-out` = start slow, speed up, slow down. Like a real ball!",
  checks:[kf('bounce',"Write a `@keyframes bounce { ... }` block."),anim('.dot','bounce',"Add `animation: bounce 0.6s ease-in-out infinite;` to `.dot`.")]}),
 S('l7','One after another',{why:"All 3 dots jump together. It looks cooler as a wave: one, two, three!",
  learn:"`animation-delay: 0.15s;` makes a box wait a little before it starts. Different delays = a wave.\n`:nth-child(2)` picks the 2nd dot.",
  todo:"Style `.dot:nth-child(2)` with `animation-delay: 0.15s;` and `.dot:nth-child(3)` with `animation-delay: 0.3s;`.",
  job:"Make a wave. `.dot:nth-child(2) { animation-delay: 0.15s; }` and `.dot:nth-child(3) { animation-delay: 0.3s; }`. Dot 3 must wait longer than dot 2.",
  snippet:`.dot:nth-child(2) {
  animation-delay: 0.15s;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
}`,
  hints:["Two rules: `.dot:nth-child(2)` and `.dot:nth-child(3)`.","`.dot:nth-child(2) { animation-delay: 0.15s; }` and `.dot:nth-child(3) { animation-delay: 0.3s; }`"],
  tip:"Put these BELOW the `.dot` rule, so the `animation` line doesn't reset the delay.",
  checks:[[a=>{const d=a.$$('.dot');return d.length>2&&parseFloat(a.css(d[1],'animationDelay'))>0;},"Give `.dot:nth-child(2)` `animation-delay: 0.15s;`."],[a=>{const d=a.$$('.dot');return d.length>2&&parseFloat(a.css(d[2],'animationDelay'))>parseFloat(a.css(d[1],'animationDelay'));},"Give `.dot:nth-child(3)` a bigger delay: `animation-delay: 0.3s;`."]]}),
 S('l8','The loading bar',{why:"A bar shows HOW MUCH has loaded. It's a track with a fill inside.",
  todo:"Style `.bar` with `width: 220px;`, `height: 12px;`, `margin-top: 16px;`, `background-color: white;`, `border-radius: 6px;`, `overflow: hidden;`. Style `.bar-fill` with `width: 30%;`, `height: 100%;`, `background: linear-gradient(90deg, #4dabf7, #ff8cc6);`.",
  job:"Inside `.bar { }` put `width: 220px;`, `height: 12px;`, `margin-top: 16px;`, `background-color: white;`, `border-radius: 6px;`, `overflow: hidden;`. Inside `.bar-fill { }` put `width: 30%;`, `height: 100%;`, `background: linear-gradient(90deg, #4dabf7, #ff8cc6);`.",
  snippet:`.bar {
  width: 220px;
  height: 12px;
  margin-top: 16px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
}
.bar-fill {
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, #4dabf7, #ff8cc6);
}`,
  hints:["Two rules: `.bar { }` and `.bar-fill { }`.","`.bar { width: 220px; height: 12px; margin-top: 16px; background-color: white; border-radius: 6px; overflow: hidden; }`","`.bar-fill { width: 30%; height: 100%; background: linear-gradient(90deg, #4dabf7, #ff8cc6); }`"],
  tip:"It's stuck at 30% for now. Next step it fills up by itself!",
  checks:[cssPx('.bar','width',220,"Give `.bar` `width: 220px;`."),cssPx('.bar','height',12,"Give `.bar` `height: 12px;`."),grad('.bar-fill',"Give `.bar-fill` `background: linear-gradient(90deg, #4dabf7, #ff8cc6);`.")]}),
 S('l9','Fill it up',{why:"Make the bar grow from empty to full, again and again.",
  learn:"`from` = the start, `to` = the end. `@keyframes fill { from { width: 0%; } to { width: 100%; } }` grows the bar.",
  todo:"Write `@keyframes fill { from { width: 0%; } to { width: 100%; } }`. Then add `animation: fill 3s ease-in-out infinite;` to your `.bar-fill` rule.",
  job:"Write `@keyframes fill { from { width: 0%; } to { width: 100%; } }`. Add `animation: fill 3s ease-in-out infinite;` inside `.bar-fill { }`.",
  where:"Add the `animation` line inside your `.bar-fill { }` rule. Put the `@keyframes fill` block just before `</style>`.",kind:'edit',
  apply:c=>addTo('.bar-fill',['animation: fill 3s ease-in-out infinite;'])(PK.insCSS(c,"@keyframes fill {\n  from {\n    width: 0%;\n  }\n  to {\n    width: 100%;\n  }\n}")),
  snippet:`.bar-fill {
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, #4dabf7, #ff8cc6);
  animation: fill 3s ease-in-out infinite;
}

@keyframes fill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}`,
  hints:["A `@keyframes fill { }` block, plus one `animation` line in `.bar-fill`.","`@keyframes fill { from { width: 0%; } to { width: 100%; } }`","Inside `.bar-fill { }` add `animation: fill 3s ease-in-out infinite;`"],
  tip:"Real loading bars use JavaScript to show the true amount. This one is just for fun!",
  checks:[kf('fill',"Write `@keyframes fill { from { width: 0%; } to { width: 100%; } }`."),anim('.bar-fill','fill',"Add `animation: fill 3s ease-in-out infinite;` to `.bar-fill`.")]}),
 S('l10','Pulsing words',{why:"Last touch: the 'Loading…' words gently fade in and out.",
  learn:"You can write just ONE step: `50% { opacity: 0.4; }`. The browser fills in the start and end for you.",
  todo:"Write `@keyframes pulse { 50% { opacity: 0.4; } }`. Style `.status` with `font-weight: bold;` and `animation: pulse 1.5s ease-in-out infinite;`.",
  job:"Write `@keyframes pulse { 50% { opacity: 0.4; } }`. Inside `.status { }` put `font-weight: bold;` and `animation: pulse 1.5s ease-in-out infinite;`.",
  snippet:`@keyframes pulse {
  50% {
    opacity: 0.4;
  }
}
.status {
  font-weight: bold;
  animation: pulse 1.5s ease-in-out infinite;
}`,
  hints:["A `@keyframes pulse { }` block and a new `.status { }` rule.","`@keyframes pulse { 50% { opacity: 0.4; } }`","`.status { font-weight: bold; animation: pulse 1.5s ease-in-out infinite; }`"],
  tip:"Some people feel sick from motion. Pros add `@media (prefers-reduced-motion: reduce)` to turn animations off for them.",
  checks:[kf('pulse',"Write `@keyframes pulse { 50% { opacity: 0.4; } }`."),anim('.status','pulse',"Add `animation: pulse 1.5s ease-in-out infinite;` to `.status`.")]})
 ]}
);
})();
