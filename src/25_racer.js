(()=>{
const h=(q,ans,checks)=>({q,ans,checks});
const c=(q,html,ans,checks)=>({q,html,ans,checks,css:true});
const GRID='<div class="grid"><div>A</div><div>B</div><div>C</div></div>';
const ROW='<div class="row"><div>A</div><div>B</div><div>C</div></div>';
const L3='<ul><li>A</li><li>B</li><li>C</li></ul>';
const attr=(a,sel,name)=>((a.$(sel)||{getAttribute:()=>''}).getAttribute(name)||'').trim().toLowerCase();
const RACES=[
{id:'t1',ch:'Rookie League',title:'Rookie Rally',limit:110,rival:'Rusty the Rookie',
 job:"Type a whole tag: opening tag, the words, closing tag. Like `<h1>Go</h1>`.",
 story:"Welcome to Turbo Tags! Your first race is against Rusty. Every correct line of code is a turbo boost. Type fast — but type right!",
 prompts:[h("Make an `<h1>` that says **Go**","<h1>Go</h1>",[hasText('h1','go',"Type `<h1>Go</h1>`.")]),
  h("Make a `<p>` that says **Vroom**","<p>Vroom</p>",[hasText('p','vroom',"Type `<p>Vroom</p>`.")]),
  h("Make an `<h2>` that says **Lap 2**","<h2>Lap 2</h2>",[hasText('h2','lap 2',"Type `<h2>Lap 2</h2>`.")]),
  h("Make a `<button>` that says **Start**","<button>Start</button>",[hasText('button','start',"Type `<button>Start</button>`.")]),
  h("Make an `<h3>` that says **Pit stop**","<h3>Pit stop</h3>",[hasText('h3','pit stop',"Type `<h3>Pit stop</h3>`.")]),
  h("Make a `<p>`. Inside it, put `<strong>` around the word **fast**","<p><strong>fast</strong></p>",[[a=>a.text(a.$('p strong')).replace(/[^a-z]/g,'')==='fast',"Type `<p><strong>fast</strong></p>`."]])]},
{id:'t2',ch:'Rookie League',title:'Attribute Avenue',limit:130,rival:'Penny Placeholder',
 job:"Add extra info inside the opening tag, like `href=\"#\"`. Use the exact words from each prompt.",
 story:"Attribute Avenue! Penny knows every attribute by heart. Remember: attributes go inside the opening tag, like `name=\"value\"`.",
 prompts:[h("Make a link `<a>` with href **https://race.com** that says **Track**","<a href=\"https://race.com\">Track</a>",[[a=>attr(a,'a','href').includes('race.com'),"The link needs `href=\"https://race.com\"`."],hasText('a','track',"The link should say Track: `<a href=\"https://race.com\">Track</a>`.")]),
  h("Make an `<img>` with src **car.png** and alt **Red car**","<img src=\"car.png\" alt=\"Red car\">",[[a=>attr(a,'img','src').includes('car.png'),"The image needs `src=\"car.png\"`."],[a=>attr(a,'img','alt').includes('red car'),"The image needs `alt=\"Red car\"`."]]),
  h("Make an `<input>` with placeholder **Driver**","<input placeholder=\"Driver\">",[[a=>attr(a,'input','placeholder').includes('driver'),"Type `<input placeholder=\"Driver\">`."]]),
  h("Make a link `<a>` with href **#** that says **Home**","<a href=\"#\">Home</a>",[[a=>attr(a,'a','href')==='#',"The link needs `href=\"#\"`."],hasText('a','home',"The link should say Home: `<a href=\"#\">Home</a>`.")]),
  h("Make an `<img>` with src **flag.png** and alt **Flag**","<img src=\"flag.png\" alt=\"Flag\">",[[a=>attr(a,'img','src').includes('flag.png'),"The image needs `src=\"flag.png\"`."],[a=>attr(a,'img','alt').includes('flag'),"The image needs `alt=\"Flag\"`."]]),
  h("Make a `<p>` with id **speed** that says **200**","<p id=\"speed\">200</p>",[has('p#speed',"The `<p>` needs `id=\"speed\"`."),hasText('p#speed','200',"The `<p>` should say 200: `<p id=\"speed\">200</p>`.")])]},
{id:'t3',ch:'Pro League',title:'Nesting Highway',limit:150,rival:'Nestor the Nester',
 job:"Put tags INSIDE other tags. Close the inside tag first, then the outside one.",
 story:"Nesting Highway is full of tunnels — boxes inside boxes. Open them and close them in the right order!",
 prompts:[h("Make a `<ul>` with **2** `<li>` items inside (any words)","<ul><li>Tyres</li><li>Fuel</li></ul>",[[a=>a.$$('ul li').length>=2,"Put 2 `<li>` inside a `<ul>`: `<ul><li>A</li><li>B</li></ul>`."]]),
  h("Make an `<ol>` with **3** `<li>` items inside (any words)","<ol><li>1st</li><li>2nd</li><li>3rd</li></ol>",[[a=>a.$$('ol li').length>=3,"Put 3 `<li>` inside an `<ol>`."]]),
  h("Make a `<div>` with an `<h2>` inside (any words)","<div><h2>Garage</h2></div>",[has('div h2',"Put the `<h2>` INSIDE the `<div>`: `<div><h2>Hi</h2></div>`.")]),
  h("Make a `<p>`. Inside it, put `<em>` around the word **zoom**","<p><em>zoom</em></p>",[[a=>a.text(a.$('p em')).replace(/[^a-z]/g,'')==='zoom',"Type `<p><em>zoom</em></p>`."]]),
  h("Make a `<div>` with a `<button>` inside (any words)","<div><button>Boost</button></div>",[has('div button',"Put the `<button>` INSIDE the `<div>`.")]),
  h("Make a `<ul>` with one `<li>`. Inside the `<li>`, put a link `<a href=\"#\">` (any words)","<ul><li><a href=\"#\">Home</a></li></ul>",[has('ul li a',"Type `<ul><li><a href=\"#\">Home</a></li></ul>`.")])]},
{id:'t4',ch:'Pro League',title:'CSS Canyon',limit:120,rival:'Stella Stylesheet',
 job:"The HTML is ready. Type only the CSS rule, like `h1 { color: red; }`.",
 story:"CSS Canyon! The HTML is already built. You just type the CSS rule — no `<style>` tags needed, the pit crew adds them.",
 prompts:[c("Make the `h1` text **red**","<h1>Canyon</h1>","h1 { color: red; }",[cssIs('h1','color',RED,"Type `h1 { color: red; }`")]),
  c("Make the `p` text **blue**","<p>Dust</p>","p { color: blue; }",[cssIs('p','color',BLUE,"Type `p { color: blue; }`")]),
  c("Give the `body` a **yellow** background (`background-color`)","<h1>Sun</h1>","body { background-color: yellow; }",[cssIs('body','backgroundColor',YELLOW,"Type `body { background-color: yellow; }`")]),
  c("Make the `h1` font size **40px**","<h1>Big</h1>","h1 { font-size: 40px; }",[cssPx('h1','fontSize',40,"Type `h1 { font-size: 40px; }`")]),
  c("Center the `p` text (`text-align: center`)","<p>Middle</p>","p { text-align: center; }",[cssIs('p','textAlign','center',"Type `p { text-align: center; }`")]),
  c("Give the `div` a **2px solid black** border","<div>Crate</div>","div { border: 2px solid black; }",[cssPx('div','borderTopWidth',2,"The border should be 2px: `div { border: 2px solid black; }`"),cssIs('div','borderTopStyle','solid',"The border should be solid: `div { border: 2px solid black; }`"),cssIs('div','borderTopColor','rgb(0, 0, 0)',"The border should be black: `div { border: 2px solid black; }`")])]},
{id:'t5',ch:'Champion League',title:'Neon Selectors',limit:120,rival:'Dot & Hash',
 job:"Pick things by class or id. A class starts with a dot `.fast`. An id starts with a hash `#car`.",
 story:"Night race in Neon City! The twins Dot and Hash race as one. Classes use `.` and ids use `#` — mix them up and you'll spin out.",
 prompts:[c("Make `.fast` text **green**","<p class=\"fast\">Zoom</p>",".fast { color: green; }",[cssIs('.fast','color',GREEN,"Type `.fast { color: green; }`")]),
  c("Make `#car` text **purple**","<h1 id=\"car\">Car</h1>","#car { color: purple; }",[cssIs('#car','color',PURPLE,"Type `#car { color: purple; }`")]),
  c("Give `.box` **10px** padding","<div class=\"box\">Box</div>",".box { padding: 10px; }",[cssPx('.box','paddingTop',10,"Type `.box { padding: 10px; }`")]),
  c("Make `.tire` round with `border-radius: 50%`","<div class=\"tire\" style=\"width:40px;height:40px;background:#333\"></div>",".tire { border-radius: 50%; }",[[a=>{const v=a.css(a.$('.tire'),'borderTopLeftRadius');return v==='50%'||px(v)>=19;},"Type `.tire { border-radius: 50%; }`"]]),
  c("Give `.hot` an **orange** background (`background-color`)","<p class=\"hot\">Hot</p>",".hot { background-color: orange; }",[cssIs('.hot','backgroundColor',ORANGE,"Type `.hot { background-color: orange; }`")]),
  c("Make the `#flag` font size **30px**","<h2 id=\"flag\">Flag</h2>","#flag { font-size: 30px; }",[cssPx('#flag','fontSize',30,"Type `#flag { font-size: 30px; }`")])]},
{id:'t6',ch:'Champion League',title:'Flex Grand Prix',limit:150,rival:'Felix Flexbox',
 job:"Every prompt styles the same `.grid` box. Always start with `display: flex;`, then add the extra line the prompt asks for.",
 story:"The Grand Prix! Felix Flexbox is the reigning champion. Every prompt styles the same `.grid` box. Win this to unlock the Street League!",
 prompts:[c("Make `.grid` a flex box with `display: flex`",GRID,".grid { display: flex; }",[cssIs('.grid','display','flex',"Type `.grid { display: flex; }`")]),
  c("Make `.grid` flex AND add `justify-content: center`",GRID,".grid { display: flex; justify-content: center; }",[cssIs('.grid','display','flex',"Add `display: flex;` inside `.grid { }`."),cssIs('.grid','justifyContent','center',"Add `justify-content: center;` inside `.grid { }`.")]),
  c("Make `.grid` flex AND add `gap: 10px`",GRID,".grid { display: flex; gap: 10px; }",[cssIs('.grid','display','flex',"Add `display: flex;` inside `.grid { }`."),gapPx('.grid',10,"Add `gap: 10px;` inside `.grid { }`.")]),
  c("Make `.grid` flex AND add `flex-direction: column`",GRID,".grid { display: flex; flex-direction: column; }",[cssIs('.grid','display','flex',"Add `display: flex;` inside `.grid { }`."),cssIs('.grid','flexDirection','column',"Add `flex-direction: column;` inside `.grid { }`.")]),
  c("Make `.grid` flex AND add `align-items: center`",GRID,".grid { display: flex; align-items: center; }",[cssIs('.grid','display','flex',"Add `display: flex;` inside `.grid { }`."),cssIs('.grid','alignItems','center',"Add `align-items: center;` inside `.grid { }`.")]),
  c("Make `.grid` flex AND add `flex-wrap: wrap`",GRID,".grid { display: flex; flex-wrap: wrap; }",[cssIs('.grid','display','flex',"Add `display: flex;` inside `.grid { }`."),cssIs('.grid','flexWrap','wrap',"Add `flex-wrap: wrap;` inside `.grid { }`.")])]},
{id:'t7',ch:'Street League (HTML)',title:'Semantic Speedway',limit:130,rival:'Sam Antic',
 job:"Use tags that say what a part of the page IS: `<header>`, `<nav>`, `<main>`, `<footer>`. Put the second tag inside the first.",
 story:"Welcome to the Street League! Sam Antic only uses tags with MEANING — header, nav, main, footer. They tell browsers what each part of a page IS.",
 prompts:[h("Make a `<header>` with an `<h1>` inside (any words)","<header><h1>Race</h1></header>",[has('header h1',"Put an `<h1>` inside a `<header>`: `<header><h1>Race</h1></header>`.")]),
  h("Make a `<nav>` with a link `<a href=\"#\">` inside (any words)","<nav><a href=\"#\">Home</a></nav>",[has('nav a',"Put an `<a>` inside a `<nav>`: `<nav><a href=\"#\">Home</a></nav>`.")]),
  h("Make a `<main>` with a `<p>` inside (any words)","<main><p>Go!</p></main>",[has('main p',"Put a `<p>` inside a `<main>`.")]),
  h("Make a `<footer>` with a `<p>` inside (any words)","<footer><p>© 2026</p></footer>",[has('footer p',"Put a `<p>` inside a `<footer>`.")]),
  h("Make a `<section>` with an `<h2>` inside (any words)","<section><h2>Results</h2></section>",[has('section h2',"Put an `<h2>` inside a `<section>`.")]),
  h("Make an `<article>` with an `<h2>` AND a `<p>` inside (any words)","<article><h2>News</h2><p>We won!</p></article>",[has('article h2',"Put an `<h2>` inside the `<article>`."),has('article p',"Put a `<p>` inside the `<article>` too.")])]},
{id:'t8',ch:'Street League (HTML)',title:'Form Freeway',limit:140,rival:'Inga Input',
 job:"Make boxes people can type or click in. Change the `type` to the word in each prompt. `<input>` has no closing tag.",
 story:"Form Freeway is lined with input boxes! Inga Input knows every type. Remember: `<input>` has no closing tag.",
 prompts:[h("Make an `<input>` with type **email**","<input type=\"email\">",[[a=>attr(a,'input','type')==='email',"Type `<input type=\"email\">`."]]),
  h("Make an `<input>` with type **password**","<input type=\"password\">",[[a=>attr(a,'input','type')==='password',"Type `<input type=\"password\">`."]]),
  h("Make an `<input>` with type **checkbox**","<input type=\"checkbox\">",[[a=>attr(a,'input','type')==='checkbox',"Type `<input type=\"checkbox\">`."]]),
  h("Make a `<textarea>` (any words inside)","<textarea>Hi</textarea>",[has('textarea',"Type `<textarea>Hi</textarea>`.")]),
  h("Make a `<select>` with **2** `<option>` tags inside (any words)","<select><option>Red</option><option>Blue</option></select>",[[a=>a.$$('select option').length>=2,"Put 2 `<option>` inside a `<select>`: `<select><option>Red</option><option>Blue</option></select>`."]]),
  h("Make a `<label>` that says **Name**","<label>Name</label>",[hasText('label','name',"Type `<label>Name</label>`.")])]},
{id:'t9',ch:'Street League (HTML)',title:'Table Turnpike',limit:150,rival:'Tabby Tables',
 job:"Build tables. A `<table>` holds rows `<tr>`. A row holds cells `<td>` (or heading cells `<th>`).",
 story:"Table Turnpike! Tables are rows (`<tr>`) of cells (`<td>`). Tabby has raced here for years — show her what you've got.",
 prompts:[h("Make a `<table>` with one `<tr>` and one `<td>` (any words)","<table><tr><td>1st</td></tr></table>",[has('table tr td',"Type `<table><tr><td>1st</td></tr></table>`.")]),
  h("Make a `<table>` with one `<tr>` that holds **2** `<td>` cells","<table><tr><td>A</td><td>B</td></tr></table>",[[a=>a.$$('table tr td').length>=2,"Put 2 `<td>` in one `<tr>`, inside a `<table>`."]]),
  h("Make a `<table>` with a `<tr>` that holds a `<th>` heading cell (any words)","<table><tr><th>Name</th></tr></table>",[has('table th',"Type `<table><tr><th>Name</th></tr></table>`.")]),
  h("Make a `<table>` with **2** rows (`<tr>`), each with a `<td>`","<table><tr><td>1</td></tr><tr><td>2</td></tr></table>",[[a=>a.$$('table tr').length>=2,"Put 2 `<tr>` rows inside the `<table>`."]]),
  h("Make a `<table>` with a `<td>` that says **Gold**","<table><tr><td>Gold</td></tr></table>",[hasText('td','gold',"Type `<table><tr><td>Gold</td></tr></table>`.")]),
  h("Make a `<table>` row with `<th>` **Time** and `<td>` **12s**","<table><tr><th>Time</th><td>12s</td></tr></table>",[hasText('th','time',"You need `<th>Time</th>`."),hasText('td','12s',"You need `<td>12s</td>`.")])]},
{id:'t10',ch:'Turbo League (CSS)',title:'Box Model Bridge',limit:130,rival:'Paddy Margin',
 job:"Style the `div` box. Type only the CSS rule, like `div { margin: 20px; }`.",
 story:"Turbo League! The HTML is built for you — type only the CSS rule. Paddy Margin is the box model king.",
 prompts:[c("Give the `div` **20px** margin","<div>Box</div>","div { margin: 20px; }",[cssPx('div','marginTop',20,"Type `div { margin: 20px; }`")]),
  c("Give the `div` **15px** padding","<div>Box</div>","div { padding: 15px; }",[cssPx('div','paddingTop',15,"Type `div { padding: 15px; }`")]),
  c("Make the `div` **100px** wide (`width`)","<div>Box</div>","div { width: 100px; }",[cssPx('div','width',100,"Type `div { width: 100px; }`")]),
  c("Make the `div` **50px** tall (`height`)","<div>Box</div>","div { height: 50px; }",[cssPx('div','height',50,"Type `div { height: 50px; }`")]),
  c("Give the `div` a **3px dashed red** border","<div>Box</div>","div { border: 3px dashed red; }",[cssPx('div','borderTopWidth',3,"The border should be 3px: `div { border: 3px dashed red; }`"),cssIs('div','borderTopStyle','dashed',"The border should be dashed: `div { border: 3px dashed red; }`"),cssIs('div','borderTopColor',RED,"The border should be red: `div { border: 3px dashed red; }`")]),
  c("Round the `div` corners by **10px** (`border-radius`)","<div>Box</div>","div { border-radius: 10px; }",[cssPx('div','borderTopLeftRadius',10,"Type `div { border-radius: 10px; }`")])]},
{id:'t11',ch:'Turbo League (CSS)',title:'Pseudo Pass',limit:140,rival:'Hover Harriet',
 job:"Style things only at special times or places, like `:hover` (mouse on top) or `:first-child` (the first one).",
 story:"Pseudo Pass is full of tricky bends — `:hover`, `:first-child`, `:nth-child`. Hover Harriet takes every corner perfectly.",
 prompts:[c("Make the link text **red** on hover: `a:hover`","<a href=\"#\">Hi</a>","a:hover { color: red; }",[[a=>a.rules().some(r=>r.selectorText&&r.selectorText.replace(/\s/g,'')==='a:hover'&&r.style.color),"Type `a:hover { color: red; }`"]]),
  c("Make the **first** `li` green: `li:first-child`",L3,"li:first-child { color: green; }",[[a=>a.css(a.$$('li')[0],'color')===GREEN&&a.css(a.$$('li')[1],'color')!==GREEN,"Type `li:first-child { color: green; }`"]]),
  c("Make the **last** `li` blue: `li:last-child`",L3,"li:last-child { color: blue; }",[[a=>a.css(a.$$('li')[2],'color')===BLUE&&a.css(a.$$('li')[0],'color')!==BLUE,"Type `li:last-child { color: blue; }`"]]),
  c("Make the **2nd** `li` purple: `li:nth-child(2)`",L3,"li:nth-child(2) { color: purple; }",[[a=>a.css(a.$$('li')[1],'color')===PURPLE&&a.css(a.$$('li')[0],'color')!==PURPLE,"Type `li:nth-child(2) { color: purple; }`"]]),
  c("Give the button a **yellow** background on hover: `button:hover`","<button>Go</button>","button:hover { background-color: yellow; }",[hoverRule('button:hover',"Type `button:hover { background-color: yellow; }`")]),
  c("Make every **odd** `li` orange: `li:nth-child(odd)`",L3,"li:nth-child(odd) { color: orange; }",[[a=>{const l=a.$$('li');return a.css(l[0],'color')===ORANGE&&a.css(l[2],'color')===ORANGE&&a.css(l[1],'color')!==ORANGE;},"Type `li:nth-child(odd) { color: orange; }`"]])]},
{id:'t12',ch:'Turbo League (CSS)',title:'Grid Grand Prix',limit:150,rival:'Gridley the Great',
 job:"Every prompt styles the same `.grid` box. Always start with `display: grid;`, then add the extra line the prompt asks for.",
 story:"The Grid Grand Prix! Every prompt styles the same `.grid` box. Win this and you're a Turbo Tags star — then the Legend League opens!",
 prompts:[c("Make `.grid` a grid with `display: grid`",GRID,".grid { display: grid; }",[cssIs('.grid','display','grid',"Type `.grid { display: grid; }`")]),
  c("Make `.grid` a grid AND add `grid-template-columns: 1fr 1fr`",GRID,".grid { display: grid; grid-template-columns: 1fr 1fr; }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),[a=>gridCols(a,'.grid').length===2,"Add `grid-template-columns: 1fr 1fr;` inside `.grid { }`."]]),
  c("Make `.grid` a grid AND add `grid-template-columns: repeat(3, 1fr)`",GRID,".grid { display: grid; grid-template-columns: repeat(3, 1fr); }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),[a=>gridCols(a,'.grid').length===3,"Add `grid-template-columns: repeat(3, 1fr);` inside `.grid { }`."]]),
  c("Make `.grid` a grid AND add `gap: 10px`",GRID,".grid { display: grid; gap: 10px; }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),gapPx('.grid',10,"Add `gap: 10px;` inside `.grid { }`.")]),
  c("Make `.grid` a grid AND add `grid-template-columns: 100px 200px`",GRID,".grid { display: grid; grid-template-columns: 100px 200px; }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),[a=>{const t=gridCols(a,'.grid');return t.length===2&&Math.abs(t[0]-100)<=1&&Math.abs(t[1]-200)<=1;},"Add `grid-template-columns: 100px 200px;` inside `.grid { }`."]]),
  c("Make `.grid` a grid AND add `justify-items: center`",GRID,".grid { display: grid; justify-items: center; }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),cssIs('.grid','justifyItems','center',"Add `justify-items: center;` inside `.grid { }`.")])]},
{id:'t13',ch:'Legend League',title:'Form Factory',limit:160,rival:'Fenna Fieldset',
 job:"Build smarter form parts: labels that point at boxes, boxes that must be filled, and number boxes. Use the exact words in each prompt.",
 story:"Welcome to the Legend League! First stop: the Form Factory, where Fenna builds forms that everyone can use. Every attribute counts here!",
 prompts:[h("Make a `<label>` with for **name** (any words), then an `<input>` with id **name**","<label for=\"name\">Name</label><input id=\"name\">",[[a=>attr(a,'label','for')==='name',"The label needs `for=\"name\"`: `<label for=\"name\">Name</label>`."],has('input#name',"The input needs `id=\"name\"`: `<input id=\"name\">`.")]),
  h("Make an `<input>` with the word **required** inside its tag","<input required>",[[a=>!!a.$('input[required]'),"Type `<input required>`."]]),
  h("Make a `<button>` with type **submit** that says **Send**","<button type=\"submit\">Send</button>",[[a=>attr(a,'button','type')==='submit',"The button needs `type=\"submit\"`."],hasText('button','send',"The button should say Send: `<button type=\"submit\">Send</button>`.")]),
  h("Make an `<input>` with type **number**, min **1** and max **10**","<input type=\"number\" min=\"1\" max=\"10\">",[[a=>attr(a,'input','type')==='number',"The input needs `type=\"number\"`."],[a=>attr(a,'input','min')==='1',"The input needs `min=\"1\"`."],[a=>attr(a,'input','max')==='10',"The input needs `max=\"10\"`."]]),
  h("Make **2** `<input>` tags with type **radio** and name **size**","<input type=\"radio\" name=\"size\"><input type=\"radio\" name=\"size\">",[[a=>a.$$('input').filter(e=>(e.getAttribute('type')||'').toLowerCase()==='radio'&&(e.getAttribute('name')||'').trim().toLowerCase()==='size').length>=2,"Type `<input type=\"radio\" name=\"size\">` two times."]]),
  h("Make a `<fieldset>` with a `<legend>` inside that says **Driver**","<fieldset><legend>Driver</legend></fieldset>",[has('fieldset legend',"Put a `<legend>` inside a `<fieldset>`."),hasText('fieldset legend','driver',"The legend should say Driver: `<fieldset><legend>Driver</legend></fieldset>`.")])]},
{id:'t14',ch:'Legend League',title:'Flex Freestyle',limit:150,rival:'Felix Flexbox Jr.',
 job:"Style the `.row` box (and the `.big` box). Type the exact lines in each prompt, like `.row { display: flex; justify-content: space-between; }`.",
 story:"Felix's little brother wants revenge! Flex Freestyle uses new flex tricks: spreading items out, pushing them to the end, and growing boxes.",
 prompts:[c("Make `.row` flex AND add `justify-content: space-between`",ROW,".row { display: flex; justify-content: space-between; }",[cssIs('.row','display','flex',"Add `display: flex;` inside `.row { }`."),cssIs('.row','justifyContent','space-between',"Add `justify-content: space-between;` inside `.row { }`.")]),
  c("Make `.row` flex AND push the items to the right with `justify-content: flex-end`",ROW,".row { display: flex; justify-content: flex-end; }",[cssIs('.row','display','flex',"Add `display: flex;` inside `.row { }`."),cssIs('.row','justifyContent','flex-end',"Add `justify-content: flex-end;` inside `.row { }`.")]),
  c("Make `.row` flex AND add `justify-content: space-around`",ROW,".row { display: flex; justify-content: space-around; }",[cssIs('.row','display','flex',"Add `display: flex;` inside `.row { }`."),cssIs('.row','justifyContent','space-around',"Add `justify-content: space-around;` inside `.row { }`.")]),
  c("Make `.row` flex AND flip the order with `flex-direction: row-reverse`",ROW,".row { display: flex; flex-direction: row-reverse; }",[cssIs('.row','display','flex',"Add `display: flex;` inside `.row { }`."),cssIs('.row','flexDirection','row-reverse',"Add `flex-direction: row-reverse;` inside `.row { }`.")]),
  c("The row is already flex. Make `.big` fill the empty space with `flex-grow: 1`","<div class=\"row\" style=\"display:flex\"><div class=\"big\">A</div><div>B</div></div>",".big { flex-grow: 1; }",[[a=>parseFloat(a.css(a.$('.big'),'flexGrow'))>=1,"Type `.big { flex-grow: 1; }`"]]),
  c("Make `.row` flex AND push the items to the bottom with `align-items: flex-end`","<div class=\"row\" style=\"height:80px\"><div>A</div><div>B</div><div>C</div></div>",".row { display: flex; align-items: flex-end; }",[cssIs('.row','display','flex',"Add `display: flex;` inside `.row { }`."),[a=>['flex-end','end'].includes(a.css(a.$('.row'),'alignItems')),"Add `align-items: flex-end;` inside `.row { }`."]])]},
{id:'t15',ch:'Legend League',title:'Grid Masters',limit:160,rival:'Gridley the Greater',
 job:"Style the `.grid` box (and the `.wide` box). Type the exact lines in each prompt, like `.grid { display: grid; row-gap: 15px; }`.",
 story:"Gridley is back, and he's been training! Grid Masters adds rows, separate gaps, uneven columns and boxes that stretch across two columns.",
 prompts:[c("Make `.grid` a grid AND add `grid-template-rows: 50px 50px`",GRID,".grid { display: grid; grid-template-rows: 50px 50px; }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),[a=>{const t=gridCols(a,'.grid','gridTemplateRows');return t.length>=2&&Math.abs(t[0]-50)<=1&&Math.abs(t[1]-50)<=1;},"Add `grid-template-rows: 50px 50px;` inside `.grid { }`."]]),
  c("Make `.grid` a grid AND add `grid-template-columns: 1fr 1fr` AND `column-gap: 20px`",GRID,".grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 20px; }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),[a=>gridCols(a,'.grid').length===2,"Add `grid-template-columns: 1fr 1fr;` inside `.grid { }`."],cssPx('.grid','columnGap',20,"Add `column-gap: 20px;` inside `.grid { }`.")]),
  c("Make `.grid` a grid AND add `row-gap: 15px`",GRID,".grid { display: grid; row-gap: 15px; }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),cssPx('.grid','rowGap',15,"Add `row-gap: 15px;` inside `.grid { }`.")]),
  c("Make `.grid` a grid AND add `grid-template-columns: 2fr 1fr` (first column twice as wide)",GRID,".grid { display: grid; grid-template-columns: 2fr 1fr; }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),[a=>{const t=gridCols(a,'.grid');return t.length===2&&Math.abs(t[0]-2*t[1])<=2;},"Add `grid-template-columns: 2fr 1fr;` inside `.grid { }`."]]),
  c("Make `.grid` a grid AND add `grid-template-columns: repeat(2, 80px)`",GRID,".grid { display: grid; grid-template-columns: repeat(2, 80px); }",[cssIs('.grid','display','grid',"Add `display: grid;` inside `.grid { }`."),[a=>{const t=gridCols(a,'.grid');return t.length===2&&t.every(v=>Math.abs(v-80)<=1);},"Add `grid-template-columns: repeat(2, 80px);` inside `.grid { }`."]]),
  c("The grid already has 2 columns. Make `.wide` stretch across both with `grid-column: span 2`","<div class=\"grid\" style=\"display:grid;grid-template-columns:1fr 1fr\"><div class=\"wide\">A</div><div>B</div><div>C</div></div>",".wide { grid-column: span 2; }",[[a=>{const w=a.$('.wide'),g=a.$('.grid');return !!w&&!!g&&w.getBoundingClientRect().width>g.getBoundingClientRect().width*0.9;},"Type `.wide { grid-column: span 2; }`"]])]},
{id:'t16',ch:'Legend League',title:'Selector Showdown',limit:160,rival:'Sir Select',
 job:"Pick ONLY the right things. Each prompt shows the exact selector to type, like `.menu p`. Then add the colour, like `{ color: red; }`.",
 story:"The final showdown! Sir Select can hit any element on the page with one rule. Pick exactly the right ones — not one more, not one less.",
 prompts:[c("Make only the `p` inside `.menu` **red**: `.menu p`","<div class=\"menu\"><p>In</p></div><p>Out</p>",".menu p { color: red; }",[[a=>{const p=a.$$('p');return a.css(p[0],'color')===RED&&a.css(p[1],'color')!==RED;},"Type `.menu p { color: red; }`"]]),
  c("Make the `h1` AND the `h2` **blue** with one rule: `h1, h2`","<h1>Hi</h1><h2>Yo</h2><p>Not me</p>","h1, h2 { color: blue; }",[[a=>a.css(a.$('h1'),'color')===BLUE&&a.css(a.$('h2'),'color')===BLUE&&a.css(a.$('p'),'color')!==BLUE,"Type `h1, h2 { color: blue; }`"]]),
  c("Give only the text box a **yellow** background (`background-color`): `input[type=\"text\"]`","<input type=\"text\"> <input type=\"checkbox\">","input[type=\"text\"] { background-color: yellow; }",[[a=>{const i=a.$$('input');return a.css(i[0],'backgroundColor')===YELLOW&&a.css(i[1],'backgroundColor')!==YELLOW;},"Type `input[type=\"text\"] { background-color: yellow; }`"]]),
  c("Make only the `p` right after the `h2` **green**: `h2 + p`","<h2>Lap</h2><p>First</p><p>Second</p>","h2 + p { color: green; }",[[a=>{const p=a.$$('p');return a.css(p[0],'color')===GREEN&&a.css(p[1],'color')!==GREEN;},"Type `h2 + p { color: green; }`"]]),
  c("Make every `p` that is NOT `.done` **purple**: `p:not(.done)`","<p class=\"done\">Done</p><p>To do</p>","p:not(.done) { color: purple; }",[[a=>{const p=a.$$('p');return a.css(p[0],'color')!==PURPLE&&a.css(p[1],'color')===PURPLE;},"Type `p:not(.done) { color: purple; }`"]]),
  c("Make only the `p` that sits DIRECTLY inside `.menu` **orange**: `.menu > p`","<div class=\"menu\"><p>Top</p><div><p>Deep</p></div></div>",".menu > p { color: orange; }",[[a=>{const p=a.$$('p');return a.css(p[0],'color')===ORANGE&&a.css(p[1],'color')!==ORANGE;},"Type `.menu > p { color: orange; }` — the `>` means \"only the ones directly inside\"."]])]}
];
const wrap=(p,input)=>p.css?`${p.html}<style>${input}</style>`:input;
let timer=null,raf=null,cdT=null;
function cleanup(){clearInterval(timer);clearInterval(cdT);cancelAnimationFrame(raf);timer=null;raf=null;cdT=null;}
function play(L,el,done){
  cleanup();
  const order=L.prompts.map((p,i)=>i).sort(()=>Math.random()-.5);
  let idx=0,skips=0,running=false,t0=0,stall=0,shown=false;
  el.innerHTML=`<div class="box"><div class="bstory">${storyHTML('Race announcer',L.story)}</div>
   ${L.job?`<div class="mission job"><b>🧭 Your job:</b> ${md(L.job)}</div>`:''}
   <div class="track"><div class="lane"><span class="lbl">YOU</span><span class="car me">🏎️</span></div><div class="lane"><span class="lbl">${esc(L.rival)}</span><span class="car rival">🚙</span></div><div class="finish"></div>
     <div class="countdown">Ready?</div></div>
   <div class="rstat"><span class="chip">⏱ <b class="time">${L.limit}</b>s left</span><span class="chip">🏁 Prompt <b class="pn">1</b>/${L.prompts.length}</span><span class="chip">🔧 Pit stops: <b class="sk">0</b></span></div>
   <div class="mission prompt" style="font-size:18px;font-weight:800"></div>
   <div class="rctx"></div>
   <div class="edhead">⌨️ Type your code <small>Enter = boost</small></div>
   <input class="code1 rin" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Your code" disabled>
   <div class="snips"></div>
   <div class="actions"><button class="btn primary big wide" data-a="go" disabled>🔥 Boost! (check)</button><button class="btn wide" data-a="skip" disabled>🔧 Pit stop — show me the answer</button></div>
   <div class="feedback"></div>
   <div class="edhead">👀 What you typed looks like:</div><iframe class="prev mini" sandbox="allow-same-origin" title="Preview"></iframe></div>`;
  const inp=$('.rin',el),me=$('.car.me',el),riv=$('.car.rival',el),fbEl=$('.feedback',el),fr=$('iframe.prev',el),cd=$('.countdown',el);
  const fb=(t,h)=>{fbEl.className='feedback '+(t||'');fbEl.innerHTML=h||'';};
  const P=()=>L.prompts[order[Math.min(idx,order.length-1)]];
  const live=debounce(()=>renderInto(fr,wrap(P(),inp.value)),200);
  inp.addEventListener('input',live);inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}});
  addSnips($('.snips',el),inp,live);
  const pos=(car,f)=>{car.style.left=`calc(${f} * (100% - 90px))`;};
  pos(me,0);pos(riv,0);
  function showPrompt(){const p=P();shown=false;$('.prompt',el).innerHTML='🎯 '+md(p.q);
    $('.rctx',el).innerHTML=p.css?`<div class="exl">The HTML (already built) — type only the CSS rule</div><pre class="ex">${esc(p.html)}</pre>`:'';
    $('.pn',el).textContent=idx+1;inp.value='';live();inp.focus();}
  let n=3;const tick=()=>{if(n>0){cd.textContent=n;n--;}else{clearInterval(cdT);cd.textContent='GO!';setTimeout(()=>cd.remove(),500);start();}};
  cdT=setInterval(tick,700);tick();
  function start(){running=true;t0=performance.now();inp.disabled=false;$$('[data-a]',el).forEach(b=>b.disabled=false);showPrompt();
    timer=setInterval(()=>{const left=Math.max(0,L.limit-(performance.now()-t0)/1000);$('.time',el).textContent=Math.ceil(left);if(left<=0)lose();},250);
    const loop=()=>{if(!running)return;const f=Math.min(1,(performance.now()-t0)/1000/L.limit);pos(riv,f);raf=requestAnimationFrame(loop);};loop();}
  async function go(){if(!running||performance.now()<stall)return;const v=inp.value.trim();if(!v){fb('bad','Type some code first!');return;}
    const r=await runChecksCode(fr,wrap(P(),v),P().checks);if(!running)return;
    if(r.ok){idx++;pos(me,idx/L.prompts.length);fb('good','🔥 BOOST! Correct!');
      if(idx>=L.prompts.length){finish();return;}showPrompt();}
    else{TRACK.miss(CURRENT_GAME,L.id);stall=performance.now()+900;me.classList.remove('spin');void me.offsetWidth;me.classList.add('spin');fb('bad',`🌀 Spin out! ${md(r.msg)}`);}}
  function finish(){running=false;cleanup();inp.disabled=true;const left=L.limit-(performance.now()-t0)/1000;
    TRACK.attempt(CURRENT_GAME,L.id,true);const stars=skips?1:left>=L.limit*.3?3:2;fb('good',`🏁 You WON with ${Math.ceil(left)} seconds to spare!`);done(stars);}
  function lose(){if(!running)return;TRACK.attempt(CURRENT_GAME,L.id,false);running=false;cleanup();pos(riv,1);inp.disabled=true;$$('[data-a]',el).forEach(b=>b.disabled=true);
    modal(`<div class="center"><div style="font-size:52px">🚙💨</div><h2>${esc(L.rival)} won this time!</h2><p>You finished ${idx} of ${L.prompts.length} prompts. Every race makes your fingers faster — try again!</p></div>`,[['Level list',()=>GAMES.racer.levels()],['Race again',()=>GAMES.racer.open(GAMES.racer.cur),'primary']]);}
  $('[data-a=go]',el).onclick=go;
  $('[data-a=skip]',el).onclick=()=>{if(!running||shown)return;skips++;TRACK.hint(CURRENT_GAME,L.id,skips);shown=true;$('.sk',el).textContent=skips;stall=performance.now()+2000;
    fb('info',`🔧 Pit crew says: <code>${esc(P().ans)}</code><br>Now type it in yourself to boost! (Pit stops cost 2 seconds.)`);};
}
Game({id:'racer',emoji:'🏎️',title:'Tag Racer',unit:'Race',winWord:'You won the race!',levels:RACES,play,cleanup,
 intro:`<h2>🏁 Turbo Tags League</h2><p class="lesson">Welcome to the fastest league in Code City! Each race has 6 prompts. Every correct line of code boosts your car forward. Wrong code = spin out. Beat your rival to the finish line!</p><p class="lesson">This game trains <b>muscle memory</b> — so tags and CSS rules come out of your fingers without thinking. That's how pros code fast.</p>`,
 finale:"You're the Turbo Tags LEGEND! Your fingers now know HTML, forms, tables, the box model, pseudo-classes, flexbox, grid and clever selectors by heart."});
window.__RACES={RACES,wrap};
})();
