(function(){
/* ===================== CODELING LEGENDS: LESSONS ===================== */
const LST="\n\n<style>\n  \n</style>";
const css=(o)=>Object.assign({type:'css',starter:o.html+LST,answer:o.html+"\n\n<style>\n  "+o.css.replace(/\n/g,'\n  ')+"\n</style>"},o);
const html=(o)=>Object.assign({type:'html',starter:''},o);
const js=(o)=>Object.assign({type:'js',starter:''},o);
const LI3='<ul>\n  <li>Sword</li>\n  <li>Shield</li>\n  <li>Potion</li>\n</ul>';
const LI4='<ul>\n  <li>Apple</li>\n  <li>Berry</li>\n  <li>Cherry</li>\n  <li>Date</li>\n</ul>';
const ROW3='<div class="row">\n  <div class="item">A</div>\n  <div class="item">B</div>\n  <div class="item">C</div>\n</div>';
const IT='  .item { background: gold; padding: 10px; }';
const ROWCSS=(extra)=>`.item { background: gold; padding: 10px; }\n${extra}`;
const lay=(o)=>{const base=o.base||'';return Object.assign({type:'css',starter:o.html+"\n\n<style>\n"+(base?'  '+base+'\n':'')+"  \n</style>",answer:o.html+"\n\n<style>\n"+(base?'  '+base+'\n':'')+"  "+o.css.replace(/\n/g,'\n  ')+"\n</style>"},o);};

const LEG={
/* ---------------- R1 MEANING MEADOW: semantic HTML ---------------- */
meadow:[
html({id:'m1',name:'Headra',concept:'<header>',
 learn:"Some tags have a MEANING. They tell browsers, Google and screen readers what each part of the page IS. We call them **semantic tags**.\n\n`<header>` = the top part of a page: the title, logo or menu.",
 example:"<header>\n  <h1>My Site</h1>\n</header>",mission:"Make a `<header>` with an `<h1>` inside that says **My Kingdom**.",
 job:"Make a `<header>` box. Inside it, put an `<h1>` that says **My Kingdom**.",
 hints:["Open the box: `<header>`","Put `<h1>My Kingdom</h1>` inside it.","Close it with `</header>`."],answer:"<header>\n  <h1>My Kingdom</h1>\n</header>",
 tip:"`<header>` is NOT the same as `<head>`. `<head>` holds hidden page info. `<header>` is the top of the page you can see.",
 checks:[has('header h1',"Put an `<h1>` INSIDE a `<header>`."),hasText('header h1','my kingdom',"The heading should say **My Kingdom**.")]}),
html({id:'m2',name:'Navi',concept:'<nav>',
 learn:"`<nav>` = a group of menu links. They help people move around the site.",
 example:"<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Shop</a>\n</nav>",mission:"Make a `<nav>` with **2** links: **Home** and **Map**.",
 job:"Make a `<nav>` box. Put 2 links inside it: one says **Home**, one says **Map**.",
 hints:["Open `<nav>` and close `</nav>`.","Inside: `<a href=\"#\">Home</a>` and `<a href=\"#\">Map</a>`"],answer:"<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Map</a>\n</nav>",
 tip:"Screen reader users can jump straight to the `<nav>`. Meaningful tags help everyone.",
 checks:[[a=>a.$$('nav a').length>=2,"Put 2 `<a>` links inside a `<nav>`."],[a=>{const t=a.text(a.$('nav'));return t.includes('home')&&t.includes('map');},"The links should say **Home** and **Map**."]]}),
html({id:'m3',name:'Mainly',concept:'<main>',
 learn:"`<main>` holds the MAIN part of the page — the part people came to see. Only one `<main>` on a page!",
 example:"<main>\n  <p>Today's news...</p>\n</main>",mission:"Make a `<main>` with a `<p>` inside that says **Welcome, traveller!**",
 job:"Make a `<main>` box. Inside it, put a `<p>` that says **Welcome, traveller!**",
 hints:["`<main>` … `</main>`","Inside: `<p>Welcome, traveller!</p>`"],answer:"<main>\n  <p>Welcome, traveller!</p>\n</main>",
 tip:"Header at the top, main in the middle, footer at the bottom — almost every website has this shape.",
 checks:[has('main p',"Put a `<p>` inside a `<main>`."),hasText('main p','welcome',"The paragraph should say **Welcome, traveller!**")]}),
html({id:'m4',name:'Footsy',concept:'<footer>',
 learn:"`<footer>` = the bottom of a page: contact details, copyright, small links.",
 example:"<footer>\n  <p>Made by me</p>\n</footer>",mission:"Make a `<footer>` with a `<p>` that says **© 2026**.",
 job:"Make a `<footer>` box. Inside it, put a `<p>` that says **© 2026**.",
 hints:["`<footer>` … `</footer>`","Inside: `<p>© 2026</p>` (you can copy the © symbol!)"],answer:"<footer>\n  <p>© 2026</p>\n</footer>",
 tip:"You can also type the © symbol as `&copy;` — that's an HTML 'entity'.",
 checks:[has('footer p',"Put a `<p>` inside a `<footer>`."),hasText('footer p','2026',"The footer should say **© 2026**.")]}),
html({id:'m5',name:'Sectio',concept:'<section>',
 learn:"`<section>` = one part of a page about one topic. It usually has its own heading. Like a chapter in a book.",
 example:"<section>\n  <h2>Prices</h2>\n</section>",mission:"Make a `<section>` with an `<h2>` that says **Quests**.",
 job:"Make a `<section>` box. Inside it, put an `<h2>` that says **Quests**.",
 hints:["`<section>` … `</section>`","Inside: `<h2>Quests</h2>`"],answer:"<section>\n  <h2>Quests</h2>\n</section>",
 tip:"Each section should have a heading. If it doesn't need one, a `<div>` might be better.",
 checks:[has('section h2',"Put an `<h2>` inside a `<section>`."),hasText('section h2','quests',"The heading should say **Quests**.")]}),
html({id:'m6',name:'Artie',concept:'<article>',
 learn:"`<article>` = a piece that makes sense ON ITS OWN: a story, a news report, a product card.",
 example:"<article>\n  <h2>Dragon spotted!</h2>\n  <p>A big one.</p>\n</article>",mission:"Make an `<article>` with an `<h2>` and a `<p>` inside (any words).",
 job:"Make an `<article>` box. Inside it, put an `<h2>` title and a `<p>` (any words you like).",
 hints:["`<article>` … `</article>`","Inside: an `<h2>` title and a `<p>` story, like `<h2>Dragon spotted!</h2>` and `<p>It was friendly.</p>`"],answer:"<article>\n  <h2>Dragon spotted!</h2>\n  <p>It was friendly.</p>\n</article>",
 tip:"Quick test: could you move it to another website and it still makes sense? Then it's an article.",
 checks:[has('article h2',"Put an `<h2>` inside an `<article>`."),has('article p',"Put a `<p>` inside the `<article>` too.")]}),
html({id:'m7',name:'Asido',concept:'<aside>',
 learn:"`<aside>` = extra side info. It is about the page, but it's not the main thing: tips, fun facts, ads.",
 example:"<aside>\n  <p>Fun fact: owls can't move their eyes!</p>\n</aside>",mission:"Make an `<aside>` with a `<p>` that says **Tip: drink water!**",
 job:"Make an `<aside>` box. Inside it, put a `<p>` that says **Tip: drink water!**",
 hints:["`<aside>` … `</aside>`","Inside: `<p>Tip: drink water!</p>`"],answer:"<aside>\n  <p>Tip: drink water!</p>\n</aside>",
 tip:"Websites often show asides in a side column next to the main part.",
 checks:[has('aside p',"Put a `<p>` inside an `<aside>`."),hasText('aside p','water',"The tip should say **Tip: drink water!**")]}),
html({id:'m8',name:'Figglet',concept:'<figure> & <figcaption>',
 learn:"`<figure>` wraps a picture. `<figcaption>` is its caption — the words under the picture.",
 example:"<figure>\n  <img src=\"cat.png\" alt=\"A cat\">\n  <figcaption>My cat</figcaption>\n</figure>",mission:"Make a `<figure>` with an `<img>` (src **dragon.png**, any alt words) and a `<figcaption>` that says **A friendly dragon**.",
 job:"Make a `<figure>`. Inside, put `<img src=\"dragon.png\" alt=\"Dragon\">` and a `<figcaption>` that says **A friendly dragon**.",
 hints:["`<figure>` … `</figure>`","Inside: `<img src=\"dragon.png\" alt=\"Dragon\">`","Then `<figcaption>A friendly dragon</figcaption>`"],answer:"<figure>\n  <img src=\"dragon.png\" alt=\"Dragon\">\n  <figcaption>A friendly dragon</figcaption>\n</figure>",
 tip:"The picture won't load here (there's no real file). You'll see the alt words instead. That's fine!",
 checks:[has('figure img',"Put an `<img>` inside a `<figure>`."),[a=>(a.$('figure img').getAttribute('src')||'').includes('dragon'),"The image needs `src=\"dragon.png\"`."],[a=>(a.$('figure img').getAttribute('alt')||'').trim().length>0,"Give the image some `alt` words, like `alt=\"Dragon\"`."],hasText('figure figcaption','friendly dragon',"Add `<figcaption>A friendly dragon</figcaption>` inside the figure.")]}),
html({id:'m9',name:'Quotle',concept:'<blockquote>',
 learn:"`<blockquote>` = words that someone else said. Browsers push it in from the edge for you.",
 example:"<blockquote>Be kind.</blockquote>",mission:"Make a `<blockquote>` that says **Code is magic.**",
 job:"Make a `<blockquote>` that says **Code is magic.**",
 hints:["Open with `<blockquote>` and close with `</blockquote>`.","`<blockquote>Code is magic.</blockquote>`"],answer:"<blockquote>Code is magic.</blockquote>",
 tip:"Reviews on real websites are often blockquotes.",
 checks:[hasText('blockquote','code is magic',"Make a `<blockquote>` that says **Code is magic.**")]}),
html({id:'m10',name:'Breaky',concept:'<br> & <hr>',
 learn:"Two tiny tags with NO closing tag:\n• `<br>` = jump to the next line\n• `<hr>` = a line across the page",
 example:"<p>Line one<br>Line two</p>\n<hr>",mission:"Make a `<p>` with **Roses are red** and **Violets are blue** on two lines, using `<br>` between them. Then add an `<hr>` below it.",
 job:"Make a `<p>`: **Roses are red**, then `<br>`, then **Violets are blue**. Put an `<hr>` under the paragraph.",
 hints:["`<p>Roses are red<br>Violets are blue</p>`","Then on a new line: `<hr>`"],answer:"<p>Roses are red<br>Violets are blue</p>\n<hr>",
 tip:"Only use `<br>` for lines that belong together, like poems and addresses. For a new idea, use a new `<p>`.",
 checks:[has('p br',"Put a `<br>` inside your `<p>`."),hasText('p','violets',"Your poem should say **Violets are blue** after the `<br>`."),has('hr',"Add an `<hr>` line under the paragraph.")]})
],
/* ---------------- R2 FORM FALLS: forms & tables ---------------- */
falls:[
html({id:'f1',name:'Inputle',concept:'<input>',
 learn:"`<input>` makes a box people can type in. It has NO closing tag.\n`placeholder` shows grey hint words inside it.",
 example:"<input placeholder=\"Search...\">",mission:"Make an `<input>` with placeholder **Your hero name**.",
 job:"Make a typing box with grey hint words: `<input placeholder=\"Your hero name\">`.",
 hints:["Start with `<input placeholder=\"\">` — then fill in the quotes.","`<input placeholder=\"Your hero name\">`"],answer:"<input placeholder=\"Your hero name\">",
 tip:"Type in the box in the preview — it really works!",
 checks:[[a=>(a.$('input')?.getAttribute('placeholder')||'').toLowerCase().includes('hero name'),"Make `<input placeholder=\"Your hero name\">`."]]}),
html({id:'f2',name:'Labelo',concept:'<label for>',
 learn:"A `<label>` gives a box a name. Join them with the SAME word:\n• the label gets `for=\"pet\"`\n• the input gets `id=\"pet\"`\nNow tapping the label jumps into the box.",
 example:"<label for=\"town\">Town</label>\n<input id=\"town\">",mission:"Make a `<label>` that says **Pet name** with `for=\"pet\"`, and an `<input>` with `id=\"pet\"`.",
 job:"Make `<label for=\"pet\">` that says **Pet name**. Then make `<input id=\"pet\">`.",
 hints:["`<label for=\"pet\">Pet name</label>`","`<input id=\"pet\">`"],answer:"<label for=\"pet\">Pet name</label>\n<input id=\"pet\">",
 tip:"Labels make forms easier on phones — a bigger spot to tap!",
 checks:[has('input#pet',"Add `<input id=\"pet\">`."),has('label[for="pet"]',"Add a label with `for=\"pet\"`."),hasText('label','pet name',"The label should say **Pet name**.")]}),
html({id:'f3',name:'Mailo',concept:'type="email"',
 learn:"`type` changes what an input does. `type=\"email\"` makes phones show the @ key. The browser also checks it looks like an email.",
 example:"<input type=\"email\">",mission:"Make an `<input>` with `type=\"email\"` and placeholder **you@email.com**.",
 job:"Make an email box: `<input type=\"email\">` with `placeholder=\"you@email.com\"`.",
 hints:["Two attributes go inside one `<input>` tag, with a space between them.","`<input type=\"email\" placeholder=\"you@email.com\">`"],answer:"<input type=\"email\" placeholder=\"you@email.com\">",
 tip:"Other types: `number`, `date`, `color`, `range`. Try them in the preview later!",
 checks:[has('input[type="email"]',"Make an `<input type=\"email\">`."),[a=>(a.$('input[type="email"]').getAttribute('placeholder')||'').includes('@'),"Add `placeholder=\"you@email.com\"`."]]}),
html({id:'f4',name:'Secreto',concept:'type="password"',
 learn:"`type=\"password\"` hides what you type as dots. Nobody can peek over your shoulder!",
 example:"<input type=\"password\">",mission:"Make an `<input>` with `type=\"password\"`.",
 job:"Make a secret box that hides what you type: `<input type=\"password\">`.",
 hints:["It's an `<input>` with a `type` attribute.","`<input type=\"password\">`"],answer:"<input type=\"password\" placeholder=\"Secret\">",
 tip:"Type in the preview — dots!",
 checks:[has('input[type="password"]',"Make an `<input type=\"password\">`.")]}),
html({id:'f5',name:'Scribbo',concept:'<textarea>',
 learn:"`<textarea>` is a BIG box for lots of lines. Unlike `<input>`, it has a closing tag. `rows=\"3\"` sets how tall it is.",
 example:"<textarea rows=\"4\"></textarea>",mission:"Make a `<textarea>` with `rows=\"3\"` and placeholder **Your story**.",
 job:"Make a big typing box: `<textarea>` with `rows=\"3\"` and `placeholder=\"Your story\"`. Close it with `</textarea>`.",
 hints:["Open with `<textarea rows=\"3\" placeholder=\"Your story\">` …","… and close it straight away: `<textarea rows=\"3\" placeholder=\"Your story\"></textarea>`"],answer:"<textarea rows=\"3\" placeholder=\"Your story\"></textarea>",
 tip:"Don't forget `</textarea>` — without it, everything after becomes words inside the box!",
 checks:[has('textarea',"Make a `<textarea></textarea>`."),[a=>a.$('textarea').getAttribute('rows')==='3',"Add `rows=\"3\"` inside the `<textarea>` tag."],[a=>/story/i.test(a.$('textarea').getAttribute('placeholder')||''),"Add `placeholder=\"Your story\"` inside the `<textarea>` tag."]]}),
html({id:'f6',name:'Choosy',concept:'<select>',
 learn:"A drop-down list is a `<select>` with `<option>` tags inside.",
 example:"<select>\n  <option>Red</option>\n  <option>Blue</option>\n</select>",mission:"Make a `<select>` with **3** options: **Sword**, **Bow**, **Staff**.",
 job:"Make a drop-down list with `<select>`. Put 3 `<option>` tags inside: **Sword**, **Bow** and **Staff**.",
 hints:["`<select>` … `</select>`","Three `<option>` tags inside, like `<option>Sword</option>`."],answer:"<select>\n  <option>Sword</option>\n  <option>Bow</option>\n  <option>Staff</option>\n</select>",
 tip:"Add `selected` to an option to pick it at the start.",
 checks:[[a=>a.$$('select option').length>=3,"Your `<select>` needs 3 `<option>` tags."],[a=>{const t=a.text(a.$('select'));return['sword','bow','staff'].every(w=>t.includes(w));},"The options should be **Sword**, **Bow** and **Staff**."]]}),
html({id:'f7',name:'Ticko',concept:'Checkbox',
 learn:"`<input type=\"checkbox\">` makes a tick box. Join a label to it with `id` and `for`.",
 example:"<input type=\"checkbox\" id=\"news\">\n<label for=\"news\">Send news</label>",mission:"Make a checkbox with `id=\"brave\"`, and a label with `for=\"brave\"` that says **I am brave**.",
 job:"Make a tick box: `<input type=\"checkbox\" id=\"brave\">`. Then add `<label for=\"brave\">` that says **I am brave**.",
 hints:["`<input type=\"checkbox\" id=\"brave\">`","`<label for=\"brave\">I am brave</label>`"],answer:"<input type=\"checkbox\" id=\"brave\">\n<label for=\"brave\">I am brave</label>",
 tip:"Tap the label words in the preview — the box ticks!",
 checks:[has('input[type="checkbox"]#brave',"Add `<input type=\"checkbox\" id=\"brave\">`."),has('label[for="brave"]',"Add a label with `for=\"brave\"`."),hasText('label','brave',"The label should say **I am brave**.")]}),
html({id:'f8',name:'Radi',concept:'Radio buttons',
 learn:"`<input type=\"radio\">` = pick only ONE. Radios with the SAME `name` are one group.",
 example:"<input type=\"radio\" name=\"size\"> Small\n<input type=\"radio\" name=\"size\"> Big",mission:"Make **2** radio buttons that both have `name=\"team\"`. Put the words Red team and Blue team after them.",
 job:"Make 2 round pick buttons: `<input type=\"radio\" name=\"team\">`. Both must have `name=\"team\"`.",
 hints:["`<input type=\"radio\" name=\"team\"> Red team`","Copy it for Blue team — same name!"],answer:"<input type=\"radio\" name=\"team\"> Red team\n<input type=\"radio\" name=\"team\"> Blue team",
 tip:"Click both in the preview — only one stays picked.",
 checks:[[a=>a.$$('input[type="radio"][name="team"]').length>=2,"Make 2 `<input type=\"radio\">` buttons, both with `name=\"team\"`."]]}),
html({id:'f9',name:'Submi',concept:'<form> & submit',
 learn:"`<form>` holds all the boxes. A `<button type=\"submit\">` inside it sends the form.",
 example:"<form>\n  <input>\n  <button type=\"submit\">Send</button>\n</form>",mission:"Make a `<form>` with an `<input>` and a `<button type=\"submit\">` that says **Join** inside it.",
 job:"Make a `<form>`. Inside it, put an `<input>` and a `<button type=\"submit\">` that says **Join**.",
 hints:["`<form>` … `</form>`","Inside: `<input>` and `<button type=\"submit\">Join</button>`"],answer:"<form>\n  <input placeholder=\"Name\">\n  <button type=\"submit\">Join</button>\n</form>",
 tip:"Real forms send what you typed to a server. You'll learn that part much later!",
 checks:[has('form input',"Put an `<input>` inside a `<form>`."),has('form button[type="submit"]',"Put a `<button type=\"submit\">` inside the form."),hasText('form button','join',"The button should say **Join**.")]}),
html({id:'f10',name:'Tabby',concept:'<table> <tr> <td>',
 learn:"Tables show info in rows and columns:\n• `<table>` = the whole table\n• `<tr>` = a row\n• `<td>` = one cell (one box)",
 example:"<table>\n  <tr>\n    <td>Apple</td>\n    <td>$1</td>\n  </tr>\n</table>",mission:"Make a `<table>` with ONE row (`<tr>`) and TWO cells (`<td>`): **Potion** and **10 coins**.",
 job:"Make a `<table>` with one `<tr>` row. Put 2 `<td>` cells in it: **Potion** and **10 coins**.",
 hints:["`<table>` → `<tr>` → two `<td>` cells.","Close them in reverse: `</td>`, `</tr>`, `</table>`.","`<table><tr><td>Potion</td><td>10 coins</td></tr></table>`"],answer:"<table>\n  <tr>\n    <td>Potion</td>\n    <td>10 coins</td>\n  </tr>\n</table>",
 tip:"Tables are only for table-shaped info — never for page layout.",
 checks:[[a=>a.$$('table tr td').length>=2,"Make a `<table>` with a `<tr>` holding 2 `<td>` cells."],[a=>{const t=a.text(a.$('table'));return t.includes('potion')&&t.includes('10');},"The cells should say **Potion** and **10 coins**."]]}),
html({id:'f11',name:'Heady',concept:'<th> headings',
 learn:"`<th>` = a heading cell. Browsers make it bold. Screen readers read it as the name of the column.",
 example:"<tr>\n  <th>Name</th>\n  <th>Age</th>\n</tr>",mission:"Make a table with a heading row (**Item** and **Price** in `<th>` cells) and one data row with 2 `<td>` cells (any words).",
 job:"Make a `<table>` with 2 rows. Row 1: `<th>Item</th>` and `<th>Price</th>`. Row 2: two `<td>` cells (any words).",
 hints:["You need two `<tr>` rows.","Row 1: `<th>Item</th><th>Price</th>`. Row 2: two `<td>` cells, like `<td>Shield</td><td>50</td>`."],answer:"<table>\n  <tr><th>Item</th><th>Price</th></tr>\n  <tr><td>Shield</td><td>50</td></tr>\n</table>",
 tip:"For extra-neat tables, wrap heading rows in `<thead>` and the rest in `<tbody>`.",
 checks:[[a=>a.$$('table th').length>=2,"Add a heading row with 2 `<th>` cells."],[a=>{const t=a.$$('th').map(x=>a.text(x)).join(' ');return t.includes('item')&&t.includes('price');},"The headings should say **Item** and **Price**."],[a=>a.$$('table td').length>=2,"Add a data row with 2 `<td>` cells."]]}),
html({id:'f12',name:'Needo',concept:'required',
 learn:"Put the word `required` inside an input. Now the form WON'T send until the box is filled in. No value needed — just the word.",
 example:"<input required>",mission:"Make an `<input type=\"email\">` that is `required`.",
 job:"Make an email box that must be filled in: `<input type=\"email\" required>`.",
 hints:["Start with `<input type=\"email\">`.","Add the word `required` before the `>`: `<input type=\"email\" required>`"],answer:"<input type=\"email\" required>",
 tip:"Attributes with no value, like `required` and `checked`, are called 'boolean attributes'.",
 checks:[has('input[type="email"]',"Make an `<input type=\"email\">`."),[a=>a.$('input[type="email"]').hasAttribute('required'),"Add the word `required` inside the input tag."]]})
],
/* ---------------- R3 SELECTOR CAVES ---------------- */
caves:[
css({id:'c1',name:'Typo',concept:'Type selector',html:'<p>Glow</p>\n<p>Shine</p>',css:'p { color: blue; }',
 learn:"A **selector** picks WHAT to style. The simplest one is a tag name: `p { }` styles EVERY paragraph.",example:"h1 { color: red; }",
 mission:"Make ALL the paragraphs **blue** with one rule.",
 job:"Make both paragraphs blue. Inside `<style>`, type `p { color: blue; }`.",
 hints:["The selector is just `p`.","`p { color: blue; }`"],
 tip:"Tag selectors are strong but not picky — they hit everything with that tag.",
 checks:[[a=>a.$$('p').every(x=>a.css(x,'color')===BLUE),"Make both paragraphs blue: `p { color: blue; }`"]]}),
css({id:'c2',name:'Classa',concept:'.class',html:'<p class="gem">Gem</p>\n<p>Rock</p>',css:'.gem { color: green; }',
 learn:"`.gem` (with a dot) picks only things with `class=\"gem\"`.",example:".gold { color: orange; }",
 mission:"Make ONLY the gem **green**. The rock stays normal.",
 job:"Make ONLY the gem green. Type `.gem { color: green; }` — with a dot!",
 hints:["Classes use a dot.","`.gem { color: green; }`"],
 tip:"You can put the same class on as many things as you like.",
 checks:[cssIs('.gem','color',GREEN,"Make the gem green: `.gem { color: green; }`"),[a=>a.css(a.$$('p')[1],'color')!==GREEN,"The rock turned green too! Use `.gem`, not `p`."]]}),
css({id:'c3',name:'Idra',concept:'#id',html:'<h1 id="boss">Boss</h1>\n<h1>Minion</h1>',css:'#boss { color: purple; }',
 learn:"`#boss` (with a hash) picks the ONE thing with `id=\"boss\"`.",example:"#logo { color: teal; }",
 mission:"Make ONLY the boss **purple**.",
 job:"Make ONLY the boss purple. Type `#boss { color: purple; }` — with a hash!",
 hints:["ids use a hash `#`.","`#boss { color: purple; }`"],
 tip:"Dot = class (many). Hash = id (only one).",
 checks:[cssIs('#boss','color',PURPLE,"Make the boss purple: `#boss { color: purple; }`"),[a=>a.css(a.$$('h1')[1],'color')!==PURPLE,"Only the boss should be purple. Use `#boss`, not `h1`."]]}),
css({id:'c4',name:'Groupy',concept:'Grouping a, b',html:'<h1>Title</h1>\n<h2>Subtitle</h2>\n<p>Text</p>',css:'h1, h2 { color: orange; }',
 learn:"A comma joins selectors: `h1, h2 { }` styles h1s AND h2s with one rule.",example:"h3, h4 { color: gray; }",
 mission:"Make the `h1` AND `h2` **orange** with ONE rule. The `p` stays normal.",
 job:"Make both headings orange with one rule: `h1, h2 { color: orange; }`. Leave the `p` alone.",
 hints:["Put a comma between the selectors.","`h1, h2 { color: orange; }`"],
 tip:"Joining selectors keeps your CSS short and tidy.",
 checks:[cssIs('h1','color',ORANGE,"Make the h1 orange: `h1, h2 { color: orange; }`"),cssIs('h2','color',ORANGE,"Make the h2 orange too: `h1, h2 { color: orange; }`"),[a=>a.css(a.$('p'),'color')!==ORANGE,"The `p` should stay normal. Don't put `p` in your rule."]]}),
css({id:'c5',name:'Descendo',concept:'Descendant (space)',html:'<nav>\n  <a href="#">Home</a>\n</nav>\n<a href="#">Other</a>',css:'nav a { color: red; }',
 learn:"A SPACE means 'inside': `nav a` = links that are inside a nav.",example:".menu a { color: white; }",
 mission:"Make ONLY the link inside the `<nav>` **red**.",
 job:"Make ONLY the link inside the nav red. Type `nav a { color: red; }` — with a space in the middle.",
 hints:["Parent, space, child.","`nav a { color: red; }`"],
 tip:"This is one of the most-used selectors on real websites.",
 checks:[cssIs('nav a','color',RED,"Make the nav link red: `nav a { color: red; }`"),[a=>a.css(a.$$('a')[1],'color')!==RED,"The Other link should stay normal. Use `nav a`, not just `a`."]]}),
css({id:'c6',name:'Childo',concept:'Child >',html:'<div class="box">\n  <p>Direct</p>\n  <div>\n    <p>Deep</p>\n  </div>\n</div>',css:'.box > p { font-weight: bold; }',
 learn:"`>` means DIRECT child only: `.box > p` = paragraphs sitting right inside .box, not ones hidden deeper.",example:"ul > li { color: gray; }",
 mission:"Make ONLY the **Direct** paragraph bold with `font-weight: bold`.",
 job:"Make ONLY the Direct paragraph bold. Type `.box > p { font-weight: bold; }`.",
 hints:["A space would also grab the Deep one.","`.box > p { font-weight: bold; }`"],
 tip:"Space = anywhere inside. `>` = only one step down.",
 checks:[[a=>px(a.css(a.$$('p')[0],'fontWeight'))>=700,"Make the Direct paragraph bold: `.box > p { font-weight: bold; }`"],[a=>px(a.css(a.$$('p')[1],'fontWeight'))<700,"The Deep paragraph should NOT be bold. Use `>`, not a space."]]}),
css({id:'c7',name:'Firsto',concept:':first-child',html:LI3,css:'li:first-child { color: green; }',
 learn:"`:first-child` picks a thing only if it is the FIRST one inside its parent.",example:"p:first-child { font-size: 20px; }",
 mission:"Make ONLY the first list item **green**.",
 job:"Make ONLY the first item green. Type `li:first-child { color: green; }`.",
 hints:["`li:first-child { }`","`li:first-child { color: green; }`"],
 tip:"Things that start with `:` are called pseudo-classes.",
 checks:[[a=>a.css(a.$$('li')[0],'color')===GREEN,"Make the first item green: `li:first-child { color: green; }`"],[a=>a.css(a.$$('li')[1],'color')!==GREEN,"Only the FIRST item should be green. Use `li:first-child`."]]}),
css({id:'c8',name:'Lasto',concept:':last-child',html:LI3,css:'li:last-child { color: red; }',
 learn:"`:last-child` picks the LAST one inside its parent.",example:"li:last-child { border: none; }",
 mission:"Make ONLY the last list item **red**.",
 job:"Make ONLY the last item red. Type `li:last-child { color: red; }`.",
 hints:["It's like `:first-child`, but for the end: `li:last-child { }`","`li:last-child { color: red; }`"],
 tip:"A common use: take away the line under the last item in a list.",
 checks:[[a=>a.css(a.$$('li')[2],'color')===RED,"Make the last item red: `li:last-child { color: red; }`"],[a=>a.css(a.$$('li')[0],'color')!==RED,"Only the LAST item should be red. Use `li:last-child`."]]}),
css({id:'c9',name:'Stripo',concept:':nth-child(even)',html:LI4,css:'li:nth-child(even) { background-color: lightgray; }',
 learn:"`:nth-child(even)` = items 2, 4, 6... `:nth-child(odd)` = items 1, 3, 5...",example:"tr:nth-child(odd) { background: #eee; }",
 mission:"Give the **even** list items (2 and 4) a `background-color` of **lightgray**.",
 job:"Colour items 2 and 4 grey. Type `li:nth-child(even) { background-color: lightgray; }`.",
 hints:["`li:nth-child(even) { }`","Inside: `background-color: lightgray;`"],
 tip:"Stripes make long lists and tables much easier to read.",
 checks:[[a=>{const l=a.$$('li');return a.css(l[1],'backgroundColor')!==CLEAR&&a.css(l[3],'backgroundColor')!==CLEAR;},"Give items 2 and 4 a background: `li:nth-child(even) { background-color: lightgray; }`"],[a=>a.css(a.$$('li')[0],'backgroundColor')===CLEAR,"Only the EVEN items should change. Use `li:nth-child(even)`."]]}),
css({id:'c10',name:'Attri',concept:'[attribute]',html:'<input type="email" placeholder="Email">\n<input type="text" placeholder="Name">',css:'input[type="email"] { border-color: blue; }',
 learn:"Square brackets pick by attribute: `input[type=\"email\"]` = only email inputs.",example:"a[target=\"_blank\"] { color: purple; }",
 mission:"Give ONLY the email input a **blue** `border-color`.",
 job:"Make ONLY the email box's border blue. Type `input[type=\"email\"] { border-color: blue; }`.",
 hints:["`input[type=\"email\"] { }`","Inside: `border-color: blue;`"],
 tip:"Attribute selectors are great for styling form boxes in different ways.",
 checks:[cssIs('input[type="email"]','borderTopColor',BLUE,"Make the email input's border blue: `input[type=\"email\"] { border-color: blue; }`"),[a=>a.css(a.$('input[type="text"]'),'borderTopColor')!==BLUE,"Only the EMAIL input should change. Use `input[type=\"email\"]`."]]}),
css({id:'c11',name:'Nottle',concept:':not()',html:'<ul>\n  <li class="done">Find map</li>\n  <li>Cross river</li>\n  <li>Find treasure</li>\n</ul>',css:'li:not(.done) { font-weight: bold; }',
 learn:"`:not(...)` flips a selector: `li:not(.done)` = list items WITHOUT the class done.",example:"p:not(.small) { font-size: 18px; }",
 mission:"Make the quests that are **not done** bold with `font-weight: bold`.",
 job:"Make the 2 quests that are not done bold. Type `li:not(.done) { font-weight: bold; }`.",
 hints:["`li:not(.done) { }`","Inside: `font-weight: bold;`"],
 tip:"`:not()` saves you from writing extra classes.",
 checks:[[a=>px(a.css(a.$$('li')[1],'fontWeight'))>=700&&px(a.css(a.$$('li')[2],'fontWeight'))>=700,"Make the unfinished quests bold: `li:not(.done) { font-weight: bold; }`"],[a=>px(a.css(a.$('li.done'),'fontWeight'))<700,"The done quest should NOT be bold. Use `li:not(.done)`."]]}),
css({id:'c12',name:'Nexto',concept:'Next sibling +',html:'<h2>Title</h2>\n<p>First</p>\n<p>Second</p>',css:'h2 + p { font-style: italic; }',
 learn:"`+` picks the thing RIGHT after another: `h2 + p` = the first paragraph straight after an h2.",example:"h1 + p { font-size: 20px; }",
 mission:"Make only the paragraph right after the `h2` slanted with `font-style: italic`.",
 job:"Make only the First paragraph slanted. Type `h2 + p { font-style: italic; }`.",
 hints:["`h2 + p { }`","Inside: `font-style: italic;`"],
 tip:"News sites use `h2 + p` to make the first sentence of a story stand out.",
 checks:[[a=>a.css(a.$$('p')[0],'fontStyle')==='italic',"Make the First paragraph italic: `h2 + p { font-style: italic; }`"],[a=>a.css(a.$$('p')[1],'fontStyle')!=='italic',"Only the paragraph RIGHT after the h2 should be italic. Use `h2 + p`."]]})
],
/* ---------------- R4 BOX BAY ---------------- */
bay:[
css({id:'b1',name:'Sizy',concept:'width & height',html:'<div class="box"></div>',css:'.box { width: 120px; height: 80px; background: coral; }',
 learn:"`width` and `height` set how big a box is. A box needs a background colour so you can see it!",example:".card { width: 200px; height: 100px; }",
 mission:"Make `.box` **120px** wide and **80px** tall, with a **coral** background.",
 job:"Make the box `width: 120px;` and `height: 80px;`. Give it `background: coral;` so you can see it.",
 hints:["`.box { width: 120px; height: 80px; }`","Add `background: coral;`"],
 tip:"`px` = pixels, the tiny dots on your screen.",
 checks:[cssPx('.box','width',120,"Make it 120px wide: `width: 120px;`"),cssPx('.box','height',80,"Make it 80px tall: `height: 80px;`"),cssNot('.box','backgroundColor',CLEAR,"Give it a background colour: `background: coral;`")]}),
css({id:'b2',name:'Paddo',concept:'padding',html:'<div class="box">Treasure</div>',css:'.box { padding: 16px; background: gold; }',
 learn:"**Padding** = space INSIDE a box, between its edge and the words. Like bubble wrap.",example:".card { padding: 12px; }",
 mission:"Give `.box` **16px** of padding and a **gold** background.",
 job:"Give the box room inside. Add `padding: 16px;` and `background: gold;` to `.box`.",
 hints:["Write a `.box { }` rule.","`.box { padding: 16px; background: gold; }`"],
 tip:"Padding makes words easier to read — they never touch the edges.",
 checks:[cssPx('.box','paddingTop',16,"Give `.box` `padding: 16px;`"),cssNot('.box','backgroundColor',CLEAR,"Give it a background: `background: gold;`")]}),
css({id:'b3',name:'Margo',concept:'margin',html:'<div class="box">A</div>\n<div class="box">B</div>',css:'.box { margin: 24px; background: skyblue; }',
 learn:"**Margin** = space OUTSIDE a box. It pushes other boxes away.",example:".card { margin: 10px; }",
 mission:"Give `.box` **24px** of margin. Add a background (like **skyblue**) so you can see it.",
 job:"Push the boxes apart. Add `margin: 24px;` to `.box`. Add `background: skyblue;` so you can see them.",
 hints:["Write a `.box { }` rule.","`.box { margin: 24px; background: skyblue; }`"],
 tip:"Padding = inside. Margin = outside. Say it 3 times!",
 checks:[cssPx('.box','marginTop',24,"Give `.box` `margin: 24px;`")]}),
css({id:'b4',name:'Bordy',concept:'border',html:'<div class="box">Shield</div>',css:'.box { border: 4px dashed teal; padding: 10px; }',
 learn:"`border` takes 3 things: how thick, what style, what colour. Styles: `solid`, `dashed`, `dotted`, `double`.",example:".card { border: 2px solid black; }",
 mission:"Give `.box` a **4px dashed teal** border.",
 job:"Draw a dashed line around the box. Add `border: 4px dashed teal;` to `.box`.",
 hints:["The 3 values go in order: thick, style, colour — with spaces between.","`.box { border: 4px dashed teal; }`"],
 tip:"Put spaces between the values, not commas.",
 checks:[cssPx('.box','borderTopWidth',4,"Make the border 4px thick: `border: 4px dashed teal;`"),cssIs('.box','borderTopStyle','dashed',"Make the border dashed: `border: 4px dashed teal;`")]}),
css({id:'b5',name:'Roundo',concept:'border-radius',html:'<div class="orb"></div>',css:'.orb { width: 80px; height: 80px; background: violet; border-radius: 50%; }',
 learn:"`border-radius` makes corners round. `50%` on a square makes a perfect circle!",example:".btn { border-radius: 8px; }",
 mission:"Make `.orb` a circle: `width: 80px`, `height: 80px`, a **violet** background and `border-radius: 50%`.",
 job:"Make a violet circle. Give `.orb` `width: 80px;` `height: 80px;` `background: violet;` and `border-radius: 50%;`.",
 hints:["`width: 80px; height: 80px; background: violet;`","Then `border-radius: 50%;`"],
 tip:"Small radius (6–12px) = modern buttons. 50% = circles.",
 checks:[cssPx('.orb','width',80,"Make it 80px wide: `width: 80px;`"),cssPx('.orb','height',80,"Make it 80px tall: `height: 80px;`"),[a=>{const v=a.css(a.$('.orb'),'borderTopLeftRadius');return v==='50%'||px(v)>=39;},"Make it round with `border-radius: 50%;`"]]}),
css({id:'b6',name:'Sizer',concept:'box-sizing',html:'<div class="box">Fits!</div>',css:'.box { width: 200px; padding: 20px; box-sizing: border-box; background: khaki; }',
 learn:"Normally padding makes a box WIDER: 200px + 20px padding on each side = 240px! `box-sizing: border-box;` keeps it at exactly 200px.",example:"* { box-sizing: border-box; }",
 mission:"Give `.box` `width: 200px`, `padding: 20px` and `box-sizing: border-box`.",
 job:"Give `.box` `width: 200px;` and `padding: 20px;`. Then add `box-sizing: border-box;` so it stays 200px wide.",
 hints:["`.box { width: 200px; padding: 20px; }`","Add `box-sizing: border-box;`"],
 tip:"Most pros put `* { box-sizing: border-box; }` at the top of every stylesheet.",
 checks:[cssIs('.box','boxSizing','border-box',"Add `box-sizing: border-box;`"),[a=>Math.abs(a.$('.box').getBoundingClientRect().width-200)<=1,"The box should be exactly 200px wide. Use `width: 200px;` with `box-sizing: border-box;`"]]}),
css({id:'b7',name:'Percy',concept:'% widths',html:'<div class="wrap">\n  <div class="half">Half</div>\n</div>',css:'.wrap { width: 300px; background: #eee; }\n.half { width: 50%; background: tomato; }',
 learn:"`%` sizes look at the parent box. `width: 50%` = half as wide as the parent.",example:".side { width: 25%; }",
 mission:"Make `.wrap` `width: 300px`. Make `.half` `width: 50%` (so it's 150px).",
 job:"Give `.wrap` `width: 300px;`. Give `.half` `width: 50%;` so it is half as wide.",
 hints:["`.wrap { width: 300px; }`","`.half { width: 50%; background: tomato; }`"],
 tip:"Percentages make layouts stretch to fit any screen.",
 checks:[cssPx('.wrap','width',300,"Make `.wrap` 300px wide: `width: 300px;`"),[a=>Math.abs(a.$('.half').getBoundingClientRect().width-150)<=1,"Make `.half` half as wide: `width: 50%;`"]]}),
css({id:'b8',name:'Fonty',concept:'font-family',html:'<p>Ancient scroll</p>',css:'p { font-family: Georgia, serif; }',
 learn:"`font-family` changes the letter style (the font). Always add a back-up after a comma: `Georgia, serif`.",example:"body { font-family: Arial, sans-serif; }",
 mission:"Give the `p` the font **Georgia, serif**.",
 job:"Change the font. Type `p { font-family: Georgia, serif; }`.",
 hints:["The property is `font-family`.","`p { font-family: Georgia, serif; }`"],
 tip:"serif = fonts with little feet (like in books). sans-serif = clean, no feet.",
 checks:[[a=>/georgia/i.test(a.css(a.$('p'),'fontFamily')),"Give the p `font-family: Georgia, serif;`"]]}),
css({id:'b9',name:'Boldi',concept:'bold & italic',html:'<p class="spell">Fireball!</p>',css:'.spell { font-weight: bold; font-style: italic; }',
 learn:"• `font-weight: bold;` = thick letters\n• `font-style: italic;` = slanted letters",example:".note { font-style: italic; }",
 mission:"Make `.spell` bold (`font-weight: bold`) AND slanted (`font-style: italic`).",
 job:"Make the spell thick and slanted. Add `font-weight: bold;` and `font-style: italic;` to `.spell`.",
 hints:["Two lines go in one `.spell { }` rule.","`.spell { font-weight: bold; font-style: italic; }`"],
 tip:"font-weight can also be a number: 400 normal, 700 bold, 900 extra bold.",
 checks:[[a=>px(a.css(a.$('.spell'),'fontWeight'))>=700,"Make it bold: `font-weight: bold;`"],cssIs('.spell','fontStyle','italic',"Make it italic: `font-style: italic;`")]}),
css({id:'b10',name:'Liney',concept:'line-height',html:'<p>Line one of a long story. Line two of a long story. Line three of a long story.</p>',css:'p { line-height: 1.8; }',
 learn:"`line-height` sets the space between lines of words. `1.8` = 1.8 times the letter size. Bigger = easier to read.",example:"body { line-height: 1.5; }",
 mission:"Give the `p` a `line-height` of **1.8**.",
 job:"Put more space between the lines. Type `p { line-height: 1.8; }`.",
 hints:["The property is `line-height`. No px needed!","`p { line-height: 1.8; }`"],
 tip:"Most easy-to-read websites use a line-height between 1.4 and 1.8.",
 checks:[cssPx('p','lineHeight',28.8,"Give the p `line-height: 1.8;`",0.6)]}),
css({id:'b11',name:'Shouty',concept:'text-transform',html:'<h2>level up</h2>',css:'h2 { text-transform: uppercase; letter-spacing: 3px; }',
 learn:"• `text-transform: uppercase;` shows words in CAPITALS (without typing them again)\n• `letter-spacing: 3px;` adds space between letters",example:".tag { text-transform: uppercase; }",
 mission:"Make the h2 CAPITALS with `text-transform: uppercase` and add `letter-spacing: 3px`.",
 job:"Make the heading BIG LETTERS with space between them. Add `text-transform: uppercase;` and `letter-spacing: 3px;` to `h2`.",
 hints:["`h2 { text-transform: uppercase; }`","Add `letter-spacing: 3px;`"],
 tip:"Your HTML still says 'level up' — CSS only changes the look.",
 checks:[cssIs('h2','textTransform','uppercase',"Add `text-transform: uppercase;` to `h2`."),cssPx('h2','letterSpacing',3,"Add `letter-spacing: 3px;` to `h2`.")]}),
css({id:'b12',name:'Hexie',concept:'Hex colours',html:'<p class="sun">Sunset</p>',css:'.sun { color: #ff6600; background-color: #ffe0b2; }',
 learn:"Hex colours are codes for exact shades: `#ff6600` = bright orange. A # and then 6 letters or numbers (red, green, blue).",example:".sky { color: #1e90ff; }",
 mission:"Give `.sun` the text colour **#ff6600** and the background colour **#ffe0b2**.",
 job:"Give `.sun` `color: #ff6600;` and `background-color: #ffe0b2;`.",
 hints:["`.sun { color: #ff6600; }`","Add `background-color: #ffe0b2;`"],
 tip:"There are 16 million hex colours. Search 'colour picker' to find any shade.",
 checks:[cssIs('.sun','color','rgb(255, 102, 0)',"Set `color: #ff6600;` on `.sun`."),cssIs('.sun','backgroundColor','rgb(255, 224, 178)',"Set `background-color: #ffe0b2;` on `.sun`.")]})
],
/* ---------------- R5 LAYOUT JUNGLE ---------------- */
jungle:[
lay({id:'l1',name:'Flexo',concept:'display: flex',html:ROW3,base:'.item { background: gold; padding: 10px; }',css:'.row { display: flex; }',
 learn:"Boxes normally stack like pancakes. `display: flex;` on the PARENT puts its children side by side.",example:".row { display: flex; }",
 mission:"Make `.row` a flex box with `display: flex`.",
 job:"Make A, B and C sit side by side. Add a new rule: `.row { display: flex; }`.",
 hints:["Style the parent: `.row`","`.row { display: flex; }`"],tip:"Flex always goes on the parent box.",
 checks:[cssIs('.row','display','flex',"Add `display: flex;` to `.row`.")]}),
lay({id:'l2',name:'Spreado',concept:'space-between',html:ROW3,base:'.item { background: gold; padding: 10px; }\n  .row { display: flex; }',css:'.row { justify-content: space-between; }',
 learn:"`justify-content: space-between;` pushes the first item to the left edge, the last to the right, and spreads the rest out.",example:".nav { justify-content: space-between; }",
 mission:"Spread the items out with `justify-content: space-between`.",
 job:"Spread A, B and C to the edges. Add `justify-content: space-between;` to `.row`.",
 hints:["Write a `.row { }` rule (you can have two `.row` rules).","`.row { justify-content: space-between; }`"],tip:"Perfect for menu bars: logo on the left, links on the right.",
 checks:[cssIs('.row','justifyContent','space-between',"Add `justify-content: space-between;` to `.row`.")]}),
lay({id:'l3',name:'Middy',concept:'align-items',html:ROW3,base:'.item { background: gold; padding: 10px; }\n  .row { display: flex; height: 120px; background: #eef2ff; }',css:'.row { align-items: center; }',
 learn:"`align-items: center;` puts flex items in the middle, UP-and-DOWN.",example:".bar { align-items: center; }",
 mission:"Put the items in the middle up-and-down with `align-items: center`.",
 job:"Move A, B and C to the middle, up-and-down. Add `align-items: center;` to `.row`.",
 hints:["Write a `.row { }` rule.","`.row { align-items: center; }`"],tip:"justify = along the row. align = across it.",
 checks:[cssIs('.row','alignItems','center',"Add `align-items: center;` to `.row`.")]}),
lay({id:'l4',name:'Stacky',concept:'flex-direction',html:ROW3,base:'.item { background: gold; padding: 10px; }\n  .row { display: flex; }',css:'.row { flex-direction: column; }',
 learn:"`flex-direction: column;` stacks flex items top to bottom, not side by side.",example:".menu { flex-direction: column; }",
 mission:"Stack the items in a column with `flex-direction: column`.",
 job:"Stack A, B and C from top to bottom. Add `flex-direction: column;` to `.row`.",
 hints:["Write a `.row { }` rule.","`.row { flex-direction: column; }`"],tip:"Phone menus use columns all the time.",
 checks:[cssIs('.row','flexDirection','column',"Add `flex-direction: column;` to `.row`.")]}),
lay({id:'l5',name:'Gapsy',concept:'gap',html:ROW3,base:'.item { background: gold; padding: 10px; }\n  .row { display: flex; }',css:'.row { gap: 12px; }',
 learn:"`gap` puts the same space BETWEEN flex items.",example:".row { gap: 8px; }",
 mission:"Add a **12px** gap with `gap: 12px`.",
 job:"Put space between A, B and C. Add `gap: 12px;` to `.row`.",
 hints:["Write a `.row { }` rule.","`.row { gap: 12px; }`"],tip:"gap never adds space on the outside edges. Neat!",
 checks:[gapPx('.row',12,"Add `gap: 12px;` to `.row`.")]}),
lay({id:'l6',name:'Wrappo',concept:'flex-wrap',html:'<div class="row">\n  <div class="item">1</div><div class="item">2</div><div class="item">3</div>\n  <div class="item">4</div><div class="item">5</div><div class="item">6</div>\n</div>',base:'.item { width: 110px; background: gold; padding: 10px; }\n  .row { display: flex; gap: 6px; }',css:'.row { flex-wrap: wrap; }',
 learn:"Too many items get squished. `flex-wrap: wrap;` lets them drop onto a new line.",example:".gallery { flex-wrap: wrap; }",
 mission:"Let the items wrap onto new lines with `flex-wrap: wrap`.",
 job:"Let the boxes drop onto a new line. Add `flex-wrap: wrap;` to `.row`.",
 hints:["Write a `.row { }` rule.","`.row { flex-wrap: wrap; }`"],tip:"Wrap + gap = a gallery that fits any screen.",
 checks:[cssIs('.row','flexWrap','wrap',"Add `flex-wrap: wrap;` to `.row`.")]}),
lay({id:'l7',name:'Growy',concept:'flex: 1',html:'<div class="row">\n  <div class="item">Icon</div>\n  <div class="item grow">Search bar</div>\n</div>',base:'.item { background: gold; padding: 10px; }\n  .row { display: flex; gap: 6px; }',css:'.grow { flex: 1; }',
 learn:"`flex: 1;` on a CHILD makes it grow to fill the empty space.",example:".search { flex: 1; }",
 mission:"Make `.grow` fill the rest of the row with `flex: 1`.",
 job:"Make the Search bar stretch to fill the row. Add a new rule: `.grow { flex: 1; }`.",
 hints:["This one goes on the child: `.grow`","`.grow { flex: 1; }`"],tip:"Search bars at the top of apps use this exact trick.",
 checks:[cssIs('.grow','flexGrow','1',"Add `flex: 1;` to `.grow`.")]}),
lay({id:'l8',name:'Griddo',concept:'display: grid',html:ROW3,base:'.item { background: gold; padding: 10px; }',css:'.row { display: grid; }',
 learn:"**Grid** makes rows AND columns at the same time. It starts with `display: grid;` on the parent.",example:".board { display: grid; }",
 mission:"Make `.row` a grid with `display: grid`.",
 job:"Turn the row into a grid. Add a new rule: `.row { display: grid; }`.",
 hints:["Style the parent: `.row`","`.row { display: grid; }`"],tip:"Flexbox = one direction. Grid = two directions.",
 checks:[cssIs('.row','display','grid',"Add `display: grid;` to `.row`.")]}),
lay({id:'l9',name:'Threesy',concept:'grid-template-columns',html:'<div class="grid">\n  <div class="item">1</div><div class="item">2</div><div class="item">3</div>\n  <div class="item">4</div><div class="item">5</div><div class="item">6</div>\n</div>',base:'.item { background: gold; padding: 10px; }\n  .grid { display: grid; }',css:'.grid { grid-template-columns: repeat(3, 1fr); }',
 learn:"`grid-template-columns: repeat(3, 1fr);` = 3 columns, all the same size. `fr` means 'a fair share'.",example:".gallery { grid-template-columns: repeat(4, 1fr); }",
 mission:"Make **3** equal columns with `grid-template-columns: repeat(3, 1fr)`.",
 job:"Make 3 columns that are all the same size. Add `grid-template-columns: repeat(3, 1fr);` to `.grid`.",
 hints:["Write a `.grid { }` rule.","`.grid { grid-template-columns: repeat(3, 1fr); }`"],tip:"`repeat(3, 1fr)` is a short way to write `1fr 1fr 1fr`.",
 checks:[[a=>gridCols(a,'.grid').length===3,"Make 3 columns: `grid-template-columns: repeat(3, 1fr);`"]]}),
lay({id:'l10',name:'Gridgap',concept:'grid gap',html:'<div class="grid">\n  <div class="item">1</div><div class="item">2</div>\n  <div class="item">3</div><div class="item">4</div>\n</div>',base:'.item { background: gold; padding: 10px; }\n  .grid { display: grid; grid-template-columns: 1fr 1fr; }',css:'.grid { gap: 10px; }',
 learn:"`gap` works in grids too. It adds space between rows AND columns.",example:".grid { gap: 16px; }",
 mission:"Add a **10px** gap to the grid with `gap: 10px`.",
 job:"Put space between the 4 boxes. Add `gap: 10px;` to `.grid`.",
 hints:["Write a `.grid { }` rule.","`.grid { gap: 10px; }`"],tip:"`row-gap` and `column-gap` set them one at a time.",
 checks:[gapPx('.grid',10,"Add `gap: 10px;` to `.grid`.")]}),
lay({id:'l11',name:'Spanzer',concept:'grid-column: span',html:'<div class="grid">\n  <div class="item big">Big</div>\n  <div class="item">2</div><div class="item">3</div><div class="item">4</div>\n</div>',base:'.item { background: gold; padding: 10px; }\n  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }',css:'.big { grid-column: span 2; }',
 learn:"`grid-column: span 2;` makes one item stretch across 2 columns.",example:".featured { grid-column: span 2; }",
 mission:"Make `.big` stretch across **2** columns with `grid-column: span 2`.",
 job:"Make the Big box 2 columns wide. Add a new rule: `.big { grid-column: span 2; }`.",
 hints:["This goes on the item, not the grid: `.big { }`","`.big { grid-column: span 2; }`"],tip:"Great for a big 'featured' card in a grid.",
 checks:[[a=>a.$('.big').getBoundingClientRect().width>=1.8*a.$$('.item')[1].getBoundingClientRect().width,"Make `.big` 2 columns wide: `grid-column: span 2;`"]]}),
lay({id:'l12',name:'Rowsy',concept:'grid-template-rows',html:'<div class="grid">\n  <div class="item">1</div><div class="item">2</div>\n  <div class="item">3</div><div class="item">4</div>\n</div>',base:'.item { background: gold; padding: 10px; }\n  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }',css:'.grid { grid-template-rows: 60px 100px; }',
 learn:"`grid-template-rows` sets how tall each row is: `60px 100px` = row 1 is 60px, row 2 is 100px.",example:".grid { grid-template-rows: 50px 50px; }",
 mission:"Make the rows **60px** and **100px** tall with `grid-template-rows: 60px 100px`.",
 job:"Make row 1 short and row 2 tall. Add `grid-template-rows: 60px 100px;` to `.grid`.",
 hints:["Write a `.grid { }` rule.","`.grid { grid-template-rows: 60px 100px; }`"],tip:"Columns go across ↔. Rows go down ↕.",
 checks:[[a=>{const t=gridCols(a,'.grid','gridTemplateRows');return t.length===2&&Math.abs(t[0]-60)<=1&&Math.abs(t[1]-100)<=1;},"Add `grid-template-rows: 60px 100px;` to `.grid`."]]})
],
/* ---------------- R6 EFFECT PEAKS ---------------- */
peaks:[
css({id:'e1',name:'Nudgo',concept:'position: relative',html:'<div class="nudge">Nudge me</div>',css:'.nudge { position: relative; top: 10px; background: gold; }',
 learn:"`position: relative;` lets you nudge a box away from where it normally sits. `top: 10px;` moves it DOWN 10px.",example:".icon { position: relative; top: 2px; }",
 mission:"Nudge `.nudge` down **10px** with `position: relative` and `top: 10px`. Add a background (like **gold**) so you can see it.",
 job:"Move the box down a little. Give `.nudge` `position: relative;` and `top: 10px;`. Add `background: gold;` too.",
 hints:["`.nudge { position: relative; }`","Add `top: 10px; background: gold;`"],tip:"`top` pushes from the top — so the box moves DOWN.",
 checks:[cssIs('.nudge','position','relative',"Add `position: relative;` to `.nudge`."),cssPx('.nudge','top',10,"Add `top: 10px;` to `.nudge`.")]}),
css({id:'e2',name:'Pinny',concept:'position: absolute',html:'<div class="card">\n  <div class="pin">📌</div>\n</div>',css:'.card { position: relative; width: 200px; height: 100px; background: #eee; }\n.pin { position: absolute; top: 0; right: 0; }',
 learn:"`position: absolute;` pins a box exactly where you say. It is pinned inside the nearest parent with `position: relative`.",example:".badge { position: absolute; top: 5px; left: 5px; }",
 mission:"Give `.card` `position: relative` (and `width: 200px`, `height: 100px`, background **#eee**). Pin `.pin` to its **top-right** corner with `position: absolute`, `top: 0` and `right: 0`.",
 job:"Give `.card` `position: relative;`. Pin the 📌 in the top-right corner: give `.pin` `position: absolute; top: 0; right: 0;`.",
 hints:["`.card { position: relative; width: 200px; height: 100px; background: #eee; }`","`.pin { position: absolute; top: 0; right: 0; }`"],tip:"No relative parent? The pin flies to the corner of the whole page!",
 checks:[cssIs('.card','position','relative',"Give `.card` `position: relative;`"),cssIs('.pin','position','absolute',"Give `.pin` `position: absolute;`"),[a=>{const c=a.$('.card').getBoundingClientRect(),p=a.$('.pin').getBoundingClientRect();return Math.abs(c.right-p.right)<=2&&Math.abs(c.top-p.top)<=2;},"Pin it to the top-right corner with `top: 0; right: 0;` on `.pin`."]]}),
css({id:'e3',name:'Sticko',concept:'position: sticky',html:'<div class="bar">Menu bar</div>\n<p>Scroll text...</p>',css:'.bar { position: sticky; top: 0; background: gold; }',
 learn:"`position: sticky; top: 0;` makes a bar stick to the top of the screen when you scroll down.",example:"nav { position: sticky; top: 0; }",
 mission:"Make `.bar` stick to the top with `position: sticky` and `top: 0`. Add a background (like **gold**).",
 job:"Make the menu bar stick to the top. Give `.bar` `position: sticky;` `top: 0;` and `background: gold;`.",
 hints:["`.bar { position: sticky; top: 0; }`","Add `background: gold;` so words don't show through."],tip:"Most website menus are sticky.",
 checks:[cssIs('.bar','position','sticky',"Add `position: sticky;` to `.bar`."),cssPx('.bar','top',0,"Add `top: 0;` to `.bar`.")]}),
lay({id:'e4',name:'Stackle',concept:'z-index',html:'<div class="stage">\n  <div class="a">A</div>\n  <div class="b">B</div>\n</div>',base:'.stage { position: relative; height: 120px; }\n  .a, .b { position: absolute; width: 80px; height: 80px; }\n  .a { background: gold; top: 0; left: 0; }\n  .b { background: skyblue; top: 30px; left: 30px; }',css:'.a { z-index: 2; }',
 learn:"When boxes sit on top of each other, `z-index` picks which one is in front. Bigger number = closer to you. (It needs a `position` set.)",example:".popup { z-index: 10; }",
 mission:"B covers A. Give `.a` `z-index: 2` so A comes to the front.",
 job:"Bring box A to the front. Add a new rule: `.a { z-index: 2; }`.",
 hints:["Write a new `.a { }` rule.","`.a { z-index: 2; }`"],tip:"Pop-ups and menus use big z-index numbers so nothing covers them.",
 starterCss:true,
 checks:[[a=>px(a.css(a.$('.a'),'zIndex'))>=1,"Give `.a` `z-index: 2;`"]]}),
css({id:'e5',name:'Spinny',concept:'transform: rotate',html:'<div class="card">🃏</div>',css:'.card { transform: rotate(15deg); font-size: 40px; display: inline-block; }',
 learn:"`transform: rotate(15deg);` tilts a box. `deg` = degrees. 360deg = one full spin.",example:".tilt { transform: rotate(-5deg); }",
 mission:"Tilt `.card` by **15deg** with `transform: rotate(15deg)`.",
 job:"Tilt the card. Type `.card { transform: rotate(15deg); }`.",
 hints:["The property is `transform`.","`.card { transform: rotate(15deg); }`"],tip:"Other transforms: `scale(1.5)` grows, `translateX(20px)` slides.",
 checks:[cssNot('.card','transform','none',"Add `transform: rotate(15deg);` to `.card`.")]}),
css({id:'e6',name:'Growl',concept:':hover + scale',html:'<button class="btn">Hover me</button>',css:'.btn:hover { transform: scale(1.2); }',
 learn:"Put `transform: scale(1.2);` inside a `:hover` rule. Now the button grows a bit when you point at it.",example:".card:hover { transform: scale(1.05); }",
 mission:"Make `.btn` grow when you hover. Use `.btn:hover` with `transform: scale(1.2)`.",
 job:"Make the button grow when the mouse is on it. Type `.btn:hover { transform: scale(1.2); }`.",
 hints:["Make a new rule: `.btn:hover { }`","Inside: `transform: scale(1.2);`"],tip:"Hover over it in the preview (on a computer).",
 checks:[[a=>a.rules().some(r=>r.selectorText&&r.selectorText.replace(/\s/g,'').includes('.btn:hover')&&/scale/.test(r.style.transform||'')),"Add `.btn:hover { transform: scale(1.2); }`"]]}),
css({id:'e7',name:'Smoothie',concept:'transition',html:'<button class="btn">Hover me</button>',css:'.btn { transition: transform 0.3s; }\n.btn:hover { transform: scale(1.2); }',
 learn:"`transition: transform 0.3s;` makes changes happen smoothly over 0.3 seconds. It goes on the NORMAL rule, not the hover one.",example:".card { transition: all 0.2s; }",
 mission:"Add `transition: transform 0.3s` to `.btn`. Then add the hover grow from last time: `.btn:hover` with `transform: scale(1.2)`.",
 job:"Make the grow smooth. Give `.btn` `transition: transform 0.3s;`. Then add `.btn:hover { transform: scale(1.2); }`.",
 hints:["`.btn { transition: transform 0.3s; }`","`.btn:hover { transform: scale(1.2); }`"],tip:"0.2–0.3s feels snappy. 1s feels slow.",
 checks:[[a=>a.css(a.$('.btn'),'transitionDuration').split(',').some(v=>parseFloat(v)>0),"Add `transition: transform 0.3s;` to `.btn` (the normal rule, not the hover one)."]]}),
css({id:'e8',name:'Ghosty',concept:'opacity',html:'<div class="ghost">👻 Boo</div>',css:'.ghost { opacity: 0.5; }',
 learn:"`opacity` = how see-through something is. `1` = solid, `0.5` = half see-through, `0` = invisible.",example:".faded { opacity: 0.3; }",
 mission:"Make `.ghost` half see-through with `opacity: 0.5`.",
 job:"Make the ghost half see-through. Type `.ghost { opacity: 0.5; }`.",
 hints:["The property is `opacity`. Half is 0.5.","`.ghost { opacity: 0.5; }`"],tip:"Opacity fades everything inside the box too.",
 checks:[cssIs('.ghost','opacity','0.5',"Add `opacity: 0.5;` to `.ghost`.")]}),
css({id:'e9',name:'Shadow',concept:'box-shadow',html:'<div class="card">Floating</div>',css:'.card { padding: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }',
 learn:"`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);` = left-right, up-down, blur, colour. It makes boxes look like they float.",example:".btn { box-shadow: 0 2px 4px gray; }",
 mission:"Give `.card` `padding: 16px` and a soft shadow: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2)`.",
 job:"Make the card float. Give `.card` `padding: 16px;` and `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);`.",
 hints:["`.card { padding: 16px; }`","Add `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);`"],tip:"rgba colours can be see-through — the last number is how solid it is.",
 checks:[cssNot('.card','boxShadow','none',"Add a `box-shadow` to `.card`, like `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);`")]}),
css({id:'e10',name:'Gradi',concept:'linear-gradient',html:'<div class="sky">Sunrise</div>',css:'.sky { height: 100px; background: linear-gradient(orange, pink); }',
 learn:"`background: linear-gradient(orange, pink);` blends two colours from top to bottom.",example:".banner { background: linear-gradient(90deg, gold, tomato); }",
 mission:"Give `.sky` `height: 100px` and `background: linear-gradient(orange, pink)`.",
 job:"Make a sunrise sky. Give `.sky` `height: 100px;` and `background: linear-gradient(orange, pink);`.",
 hints:["`.sky { height: 100px; }`","Add `background: linear-gradient(orange, pink);`"],tip:"Add `90deg,` at the start to blend left to right instead.",
 checks:[[a=>/gradient/.test(a.css(a.$('.sky'),'backgroundImage')),"Add `background: linear-gradient(orange, pink);` to `.sky`."]]}),
css({id:'e11',name:'Varri',concept:'CSS variables',html:'<button class="btn">Buy</button>',css:':root { --main: tomato; }\n.btn { background-color: var(--main); }',
 learn:"A CSS variable keeps a value you can use again and again:\n`:root { --main: tomato; }`\nUse it like this: `background-color: var(--main);`",example:":root { --gap: 12px; }",
 mission:"Make a `--main` variable set to **tomato** inside `:root`. Then use it for `.btn`'s background: `background-color: var(--main)`.",
 job:"Type `:root { --main: tomato; }`. Then type `.btn { background-color: var(--main); }`.",
 hints:["`:root { --main: tomato; }`","`.btn { background-color: var(--main); }`"],tip:"Change the variable once → every place that uses it changes.",
 checks:[[a=>a.win.getComputedStyle(a.doc.documentElement).getPropertyValue('--main').trim()!=='',"Make the variable: `:root { --main: tomato; }`"],[a=>a.rules().some(r=>r.cssText&&r.cssText.includes('var(--main)')),"Use it on the button with `background-color: var(--main);`"],cssIs('.btn','backgroundColor','rgb(255, 99, 71)',"The button should come out tomato. Check `--main: tomato;`")]}),
css({id:'e12',name:'Phoney',concept:'@media',html:'<h1 class="title">Big title</h1>',css:'@media (max-width: 600px) {\n  .title { font-size: 24px; }\n}',
 learn:"A **media query** uses CSS only on some screens:\n`@media (max-width: 600px) { ... }` = only on screens 600px wide or smaller (phones!).",example:"@media (max-width: 600px) {\n  .menu { flex-direction: column; }\n}",
 mission:"Add `@media (max-width: 600px)`. Inside it, give `.title` `font-size: 24px`.",
 job:"Make the title smaller on phones. Type `@media (max-width: 600px) { .title { font-size: 24px; } }`.",
 hints:["`@media (max-width: 600px) { }`","Inside: `.title { font-size: 24px; }`"],tip:"This is called responsive design — sites that fit every screen.",
 checks:[[a=>a.rules().some(r=>r.media&&/max-width/.test(r.media.mediaText)&&[...r.cssRules].some(x=>x.selectorText&&x.selectorText.includes('.title'))),"Add `@media (max-width: 600px) { .title { font-size: 24px; } }`"]]})
],
/* ---------------- R7 SCRIPT VOLCANO: JavaScript ---------------- */
volcano:[
js({id:'j1',name:'Loggo',concept:'console.log',learn:"JavaScript makes websites DO things. `console.log()` prints a message — great for testing.\nWords go in quotes: `console.log(\"Hi!\");`",example:"console.log(\"Hello!\");",
 mission:"Print **Hello, volcano!**",job:"Print a message. Type `console.log(\"Hello, volcano!\");`",tests:[["__out.some(l=>/volcano/i.test(l))","Use `console.log(\"Hello, volcano!\");`"]],hints:["Use `console.log( )` and put the words in quotes inside it.","`console.log(\"Hello, volcano!\");`"],answer:"console.log(\"Hello, volcano!\");",tip:"Coders use console.log every single day to check their code."}),
js({id:'j2',name:'Letto',concept:'let variables',learn:"A **variable** is a jar with a label: `let hero = \"Ash\";`\nPrint what's inside with `console.log(hero);` — no quotes!",example:"let pet = \"Owl\";\nconsole.log(pet);",
 mission:"Make a variable called `hero` with `let`. Put any name in it (in quotes). Then print it with `console.log(hero)`.",job:"Make a jar called `hero` with any name inside: `let hero = \"Ash\";`. Then print it: `console.log(hero);`",tests:[["typeof hero==='string'&&hero.length>0","Make `let hero = \"YourName\";`"],["__out.some(l=>l===hero)","Print it: `console.log(hero);`"]],hints:["`let hero = \"Ash\";`","`console.log(hero);`"],answer:"let hero = \"Ash\";\nconsole.log(hero);",tip:"Quotes = the actual word. No quotes = what's in the jar."}),
js({id:'j3',name:'Mathy',concept:'Numbers & maths',learn:"Numbers need no quotes. JavaScript can do maths: `+ - * /`",example:"let total = 5 + 3;",
 mission:"Make `let gold = 25 + 17;` and print it. Let JavaScript add it up!",job:"Let the computer add for you. Type `let gold = 25 + 17;` then `console.log(gold);`",tests:[["gold===42","`gold` should be `25 + 17`."],["!/=\\s*42\\b/.test(__code)","Write the maths `25 + 17` — don't type 42 yourself!"]],hints:["`let gold = 25 + 17;`","`console.log(gold);`"],answer:"let gold = 25 + 17;\nconsole.log(gold);",tip:"`*` multiplies and `/` divides."}),
js({id:'j4',name:'Joiny',concept:'Joining text',learn:"`+` joins words together: `\"Hi, \" + name` → \"Hi, Ash\".",example:"let msg = \"Go \" + \"team!\";",starter:"let name = \"Ash\";\n\n",
 mission:"Make `greeting` = `\"Hi, \"` joined with `name`, so it says **Hi, Ash**. Print it.",job:"Join words. Type `let greeting = \"Hi, \" + name;` then `console.log(greeting);`",tests:[["greeting==='Hi, Ash'","`greeting` should be \"Hi, Ash\" — join `\"Hi, \" + name`."],["/\\+\\s*name/.test(__code)","Join it with `+ name` — don't type Ash yourself."]],hints:["`let greeting = \"Hi, \" + name;`","`console.log(greeting);`"],answer:"let name = \"Ash\";\n\nlet greeting = \"Hi, \" + name;\nconsole.log(greeting);",tip:"See the space inside \"Hi, \"? Without it you'd get \"Hi,Ash\"."}),
js({id:'j5',name:'Truthy',concept:'true / false',learn:"**Booleans** are yes/no values: `true` or `false` — no quotes.",example:"let isOpen = false;",
 mission:"Make `let isBrave = true;` and print it.",job:"Make a yes value. Type `let isBrave = true;` (no quotes!) then `console.log(isBrave);`",tests:[["isBrave===true","Make `let isBrave = true;` — no quotes!"]],hints:["`let isBrave = true;` — no quote marks around true.","Then print it: `console.log(isBrave);`"],answer:"let isBrave = true;\nconsole.log(isBrave);",tip:"\"true\" with quotes is just a word. true without quotes is a real yes."}),
js({id:'j6',name:'Compy',concept:'Comparisons',learn:"Comparing gives true or false: `>` bigger, `<` smaller, `>=` bigger or the same, `===` the same.",example:"let big = 10 > 3;  // true",starter:"let lava = 80;\n\n",
 mission:"Make `let tooHot = lava > 50;` and print it.",job:"Ask: is lava bigger than 50? Type `let tooHot = lava > 50;` then `console.log(tooHot);`",tests:[["tooHot===true","`tooHot` should be true (80 is bigger than 50)."],["/lava\\s*>/.test(__code)","Let the computer compare: `lava > 50`."]],hints:["`let tooHot = lava > 50;`","Then print it: `console.log(tooHot);`"],answer:"let lava = 80;\n\nlet tooHot = lava > 50;\nconsole.log(tooHot);",tip:"One `=` stores. Three `===` compares."}),
js({id:'j7',name:'Iffy',concept:'if',learn:"`if` runs code only when something is true:\n`if (hp < 30) {`\n`  console.log(\"Run!\");`\n`}`",example:"if (gold > 100) {\n  console.log(\"Rich!\");\n}",starter:"let hp = 10;\n\n",
 mission:"Use `if (hp < 30)`. Inside it, print **Run!**",job:"If hp is less than 30, print **Run!** Use `if (hp < 30) { }` with `console.log(\"Run!\");` inside.",tests:[["/if\\s*\\(/.test(__code)","Use an `if`: `if (hp < 30) { }`"],["__out.some(l=>/run/i.test(l))","Print \"Run!\" inside the if: `console.log(\"Run!\");`"]],hints:["`if (hp < 30) { }`","Inside: `console.log(\"Run!\");`"],answer:"let hp = 10;\n\nif (hp < 30) {\n  console.log(\"Run!\");\n}",tip:"Change hp to 50 and run it — nothing prints!"}),
js({id:'j8',name:'Elsy',concept:'if / else',learn:"`else` runs when the `if` is false.",example:"if (rain) {\n  console.log(\"Umbrella\");\n} else {\n  console.log(\"Sunnies\");\n}",starter:"let coins = 3;\n\n",
 mission:"If `coins` is 5 or more (`coins >= 5`), print **Buy**. Else print **Wait**.",job:"Use `if (coins >= 5)` to print **Buy**. Add `else` to print **Wait**.",tests:[["/else/.test(__code)","Use `if` and `else`."],["__out.some(l=>/wait/i.test(l))&&!__out.some(l=>/buy/i.test(l))","With 3 coins it should print \"Wait\" (not \"Buy\")."]],hints:["`if (coins >= 5) { ... } else { ... }`","`if (coins >= 5) { console.log(\"Buy\"); } else { console.log(\"Wait\"); }`"],answer:"let coins = 3;\n\nif (coins >= 5) {\n  console.log(\"Buy\");\n} else {\n  console.log(\"Wait\");\n}",tip:"`>=` means 'bigger than OR the same as'."}),
js({id:'j9',name:'Loopo',concept:'for loops',learn:"A for loop does code again and again:\n`for (let i = 0; i < 4; i++) { ... }` runs 4 times.",example:"for (let i = 0; i < 3; i++) {\n  console.log(\"Hi\");\n}",
 mission:"Print **Boom** exactly 4 times with a `for` loop.",job:"Print **Boom** 4 times. Use `for (let i = 0; i < 4; i++) { }` with `console.log(\"Boom\");` inside.",tests:[["__out.filter(l=>/boom/i.test(l)).length===4","Print \"Boom\" exactly 4 times."],["/for\\s*\\(/.test(__code)","Use a `for` loop."]],hints:["`for (let i = 0; i < 4; i++) { }`","Inside: `console.log(\"Boom\");`"],answer:"for (let i = 0; i < 4; i++) {\n  console.log(\"Boom\");\n}",tip:"`i++` adds 1 to i each time round."}),
js({id:'j10',name:'Counto',concept:'Counting down',learn:"Loops can count DOWN: start high, keep going while `i > 0`, and use `i--` (take 1 away).",example:"for (let i = 5; i > 0; i--) {\n  console.log(i);\n}",
 mission:"Print **3**, **2**, **1** (one on each line) with a loop that uses `i--`.",job:"Count down 3, 2, 1. Use `for (let i = 3; i > 0; i--) { }` with `console.log(i);` inside.",tests:[["__out.join(',')==='3,2,1'","Print 3, then 2, then 1 — nothing else."],["/--/.test(__code)","Count down with `i--`."]],hints:["`for (let i = 3; i > 0; i--) { }`","Inside: `console.log(i);`"],answer:"for (let i = 3; i > 0; i--) {\n  console.log(i);\n}",tip:"Countdowns, timers and rocket launches all use this."}),
js({id:'j11',name:'Listy',concept:'Arrays',learn:"An **array** is a list: `let gems = [\"ruby\", \"jade\", \"opal\"];`\nGet an item by its spot — counting starts at **0**! `gems[1]` = \"jade\".",example:"let pets = [\"cat\", \"dog\"];\nconsole.log(pets[0]);",
 mission:"Make `gems` = **\"ruby\", \"jade\", \"opal\"** and print `gems[1]`.",job:"Make a list: `let gems = [\"ruby\", \"jade\", \"opal\"];`. Then print spot 1: `console.log(gems[1]);`",tests:[["Array.isArray(gems)&&gems.join()==='ruby,jade,opal'","Make `let gems = [\"ruby\", \"jade\", \"opal\"];`"],["__out.some(l=>l==='jade')","Print `gems[1]` — it should show jade."]],hints:["`let gems = [\"ruby\", \"jade\", \"opal\"];`","`console.log(gems[1]);`"],answer:"let gems = [\"ruby\", \"jade\", \"opal\"];\nconsole.log(gems[1]);",tip:"Counting from 0 is strange at first. You'll get used to it!"}),
js({id:'j12',name:'Pushy',concept:'push & length',learn:"`.push()` adds to the END of a list. `.length` tells you how many things are in it.",example:"bag.push(\"rope\");\nconsole.log(bag.length);",starter:"let bag = [\"map\"];\n\n",
 mission:"Push **\"torch\"** into `bag`, then print `bag.length`.",job:"Add a torch to the bag: `bag.push(\"torch\");`. Then print how many things: `console.log(bag.length);`",tests:[["bag.length===2&&bag[1]==='torch'","Add it with `bag.push(\"torch\");`"],["__out.some(l=>l==='2')","Print `bag.length` (it should be 2)."]],hints:["`bag.push(\"torch\");`","`console.log(bag.length);`"],answer:"let bag = [\"map\"];\n\nbag.push(\"torch\");\nconsole.log(bag.length);",tip:"`.pop()` takes the last thing off."}),
js({id:'j13',name:'Funky',concept:'Functions',learn:"A **function** is a command you make up and can use again:\n`function roar() {`\n`  console.log(\"ROAR\");`\n`}`\nIt runs when you CALL it: `roar();`",example:"function cheer() {\n  console.log(\"Yay\");\n}\ncheer();",
 mission:"Make `function roar()` that prints **ROAR**, then call it with `roar();`.",job:"Make `function roar() { }` with `console.log(\"ROAR\");` inside. Then run it: `roar();`",tests:[["typeof roar==='function'","Make a function called `roar`."],["__out.some(l=>/roar/i.test(l))","Call it with `roar();`"]],hints:["`function roar() { console.log(\"ROAR\"); }`","Then `roar();`"],answer:"function roar() {\n  console.log(\"ROAR\");\n}\n\nroar();",tip:"Write it once, use it forever."}),
js({id:'j14',name:'Returno',concept:'return',learn:"Functions can take a number in and give an answer back with `return`:\n`function double(n) { return n * 2; }`",example:"function add1(n) {\n  return n + 1;\n}",
 mission:"Make `function triple(n)` that **returns** `n * 3`.",job:"Make `function triple(n) { }`. Inside, give back 3 times the number: `return n * 3;`",tests:[["typeof triple==='function'","Make `function triple(n)`."],["triple(2)===6&&triple(5)===15&&triple(0)===0","It should RETURN `n * 3`."]],hints:["`function triple(n) { }`","Inside: `return n * 3;`"],answer:"function triple(n) {\n  return n * 3;\n}\n\nconsole.log(triple(5));",tip:"`return` hands the answer back. console.log only shows it."})
]
};

/* ---------------- GYMS ---------------- */
const LGYM={
meadow:[
html({id:'mg1',name:'Pagezilla',concept:'Page skeleton',learn:"Gym round! A whole page shape: header on top, main in the middle, footer at the bottom.",example:"<header>...</header>\n<main>...</main>\n<footer>...</footer>",
 mission:"Build: a `<header>` with an `<h1>`, a `<main>` with a `<p>`, and a `<footer>` with a `<p>` (any words).",
 job:"Make 3 boxes, top to bottom: `<header>` with an `<h1>`, `<main>` with a `<p>`, `<footer>` with a `<p>`.",
 hints:["Three big boxes, top to bottom.","`<header><h1>…</h1></header>` then `<main><p>…</p></main>` then `<footer><p>…</p></footer>`"],
 answer:"<header>\n  <h1>Marlo's Gym</h1>\n</header>\n<main>\n  <p>Welcome, challenger!</p>\n</main>\n<footer>\n  <p>© 2026</p>\n</footer>",tip:"Almost every website starts with this shape.",
 checks:[has('header h1',"Add a `<header>` with an `<h1>` inside."),has('main p',"Add a `<main>` with a `<p>` inside."),has('footer p',"Add a `<footer>` with a `<p>` inside.")]}),
html({id:'mg2',name:'Newsbeast',concept:'Articles in main',learn:"Gym round! A news page: one `<main>` holding TWO articles.",example:"<main>\n  <article>...</article>\n</main>",
 mission:"Make a `<main>` with **2** `<article>` tags inside. Each article needs an `<h2>` (any words).",
 job:"Make a `<main>` box. Put 2 `<article>` boxes inside it. Give each article an `<h2>`.",
 hints:["`<main>` … `</main>`","Two articles inside, each like `<article><h2>Title</h2></article>`"],
 answer:"<main>\n  <article>\n    <h2>Dragon found</h2>\n  </article>\n  <article>\n    <h2>Castle sale</h2>\n  </article>\n</main>",tip:"Push inside boxes in with spaces so you can see the shape.",
 checks:[[a=>a.$$('main article').filter(x=>x.querySelector('h2')).length>=2,"Put 2 `<article>` tags (each with an `<h2>`) inside `<main>`."]]}),
html({id:'mg3',name:'Menulord',concept:'Header + nav',learn:"Final round! Real sites put the menu INSIDE the header.",example:"<header>\n  <nav>...</nav>\n</header>",
 mission:"Make a `<header>` with a `<nav>` inside. Put **3** links (`<a>`) in the nav (any words).",
 job:"Make a `<header>`. Put a `<nav>` inside it. Put 3 `<a>` links inside the nav.",
 hints:["`<header>` → `<nav>` → 3 `<a href=\"#\">` links.","Close in reverse: `</nav>` then `</header>`."],
 answer:"<header>\n  <nav>\n    <a href=\"#\">Home</a>\n    <a href=\"#\">Quests</a>\n    <a href=\"#\">Shop</a>\n  </nav>\n</header>",tip:"Boxes inside boxes inside boxes — that's how all pages are built.",
 checks:[[a=>a.$$('header nav a').length>=3,"Put a `<nav>` with 3 `<a>` links inside a `<header>`."]]})
],
falls:[
html({id:'fg1',name:'Loginox',concept:'Login form',learn:"Gym round! Every app has a login form: email, password and a button — all inside a form.",example:"<form>...</form>",
 mission:"Make a `<form>` with an `<input type=\"email\">`, an `<input type=\"password\">` and a `<button type=\"submit\">`.",
 job:"Make a `<form>`. Inside, put `<input type=\"email\">`, `<input type=\"password\">` and `<button type=\"submit\">Log in</button>`.",
 hints:["`<form>` … `</form>`","Inside: `<input type=\"email\">`, `<input type=\"password\">`, `<button type=\"submit\">Log in</button>`"],
 answer:"<form>\n  <input type=\"email\" placeholder=\"Email\">\n  <input type=\"password\" placeholder=\"Password\">\n  <button type=\"submit\">Log in</button>\n</form>",tip:"Add labels for a pro touch!",
 checks:[has('form input[type="email"]',"Add an `<input type=\"email\">` inside the form."),has('form input[type="password"]',"Add an `<input type=\"password\">` inside the form."),has('form button[type="submit"]',"Add a `<button type=\"submit\">` inside the form.")]}),
html({id:'fg2',name:'Scoreboard',concept:'Score table',learn:"Gym round! A score table with headings.",example:"<tr><th>Name</th><th>Score</th></tr>",
 mission:"Make a `<table>`. Row 1 has `<th>` headings **Name** and **Score**. Then add **2** more rows, each with 2 `<td>` cells (any names and numbers).",
 job:"Make a `<table>` with 3 rows. Row 1: `<th>Name</th>` and `<th>Score</th>`. Rows 2 and 3: two `<td>` cells each.",
 hints:["3 `<tr>` rows in total.","Row 1 uses `<th>`, rows 2 and 3 use `<td>`, like `<tr><td>Ash</td><td>90</td></tr>`."],
 answer:"<table>\n  <tr><th>Name</th><th>Score</th></tr>\n  <tr><td>Ash</td><td>90</td></tr>\n  <tr><td>Mia</td><td>85</td></tr>\n</table>",tip:"Every row should have the same number of cells.",
 checks:[[a=>{const t=a.$$('th').map(x=>a.text(x)).join(' ');return t.includes('name')&&t.includes('score');},"Add `<th>` headings that say **Name** and **Score**."],[a=>a.$$('table tr').filter(r=>r.querySelectorAll('td').length>=2).length>=2,"Add 2 data rows with 2 `<td>` cells each."]]}),
html({id:'fg3',name:'Signupra',concept:'Sign-up form',learn:"Final round! A sign-up form with a joined-up label, a drop-down and a tick box.",example:"<label for=\"x\">…</label><input id=\"x\">",
 mission:"Make a `<form>` with: a `<label for=\"nm\">` joined to an `<input id=\"nm\">`, a `<select>` with 2 or more `<option>`s, and an `<input type=\"checkbox\">`.",
 job:"Make a `<form>`. Inside: `<label for=\"nm\">` and `<input id=\"nm\">`, a `<select>` with 2 `<option>`s, and `<input type=\"checkbox\">`.",
 hints:["`<label for=\"nm\">Name</label><input id=\"nm\">`","`<select>` with 2 `<option>` tags, then `<input type=\"checkbox\">`"],
 answer:"<form>\n  <label for=\"nm\">Name</label>\n  <input id=\"nm\">\n  <select>\n    <option>Warrior</option>\n    <option>Wizard</option>\n  </select>\n  <input type=\"checkbox\" id=\"ok\">\n  <label for=\"ok\">I agree</label>\n</form>",tip:"You've now used most form parts on the web!",
 checks:[[a=>a.$$('form label[for]').some(l=>a.doc.getElementById(l.getAttribute('for'))),"Inside the form, join a `<label for=\"nm\">` to an `<input id=\"nm\">` (the same word in both)."],[a=>a.$$('form select option').length>=2,"Add a `<select>` with 2 or more `<option>`s inside the form."],has('form input[type="checkbox"]',"Add an `<input type=\"checkbox\">` inside the form.")]})
],
caves:[
css({id:'cg1',name:'Menuwyrm',concept:'Combo selectors',html:'<ul class="menu">\n  <li>Home</li>\n  <li>Shop</li>\n  <li>Help</li>\n</ul>\n<ul>\n  <li>Other</li>\n</ul>',css:'.menu li { color: blue; }\n.menu li:first-child { font-weight: bold; }',
 learn:"Gym round! Mix selectors together to hit exactly what you want.",example:".menu li:last-child { color: red; }",
 mission:"Make every `.menu` item **blue**, and make the FIRST `.menu` item bold (`font-weight: bold`). The other list stays normal.",
 job:"Type `.menu li { color: blue; }`. Then make the first one bold: `.menu li:first-child { font-weight: bold; }`.",
 hints:["`.menu li { color: blue; }`","`.menu li:first-child { font-weight: bold; }`"],tip:"Read selectors right to left: 'the first li, inside .menu'.",
 checks:[[a=>a.$$('.menu li').every(x=>a.css(x,'color')===BLUE),"Make every `.menu li` blue: `.menu li { color: blue; }`"],[a=>px(a.css(a.$('.menu li'),'fontWeight'))>=700,"Make the first `.menu li` bold: `.menu li:first-child { font-weight: bold; }`"],[a=>a.css(a.$$('ul')[1].querySelector('li'),'color')!==BLUE,"The other list should stay normal. Start your selector with `.menu`."]]}),
css({id:'cg2',name:'Glowbat',concept:'Hover selector',html:'<div class="card">Treasure map</div>',css:'.card { padding: 12px; }\n.card:hover { background-color: gold; }',
 learn:"Gym round! Hover effects make sites feel alive.",example:".link:hover { color: red; }",
 mission:"Give `.card` some padding (like `padding: 12px`). Then make it turn **gold** on hover: `.card:hover` with `background-color: gold`.",
 job:"Give `.card` `padding: 12px;`. Then type `.card:hover { background-color: gold; }`.",
 hints:["`.card { padding: 12px; }`","`.card:hover { background-color: gold; }`"],tip:"Never hide important things behind hover — phones can't hover!",
 checks:[hoverRule('.card:hover',"Add `.card:hover { background-color: gold; }`"),cssMin('.card','paddingTop',1,"Give `.card` some padding, like `padding: 12px;`")]}),
css({id:'cg3',name:'Zebrock',concept:'Striped table',html:'<table>\n  <tr><td>Ruby</td></tr>\n  <tr><td>Jade</td></tr>\n  <tr><td>Opal</td></tr>\n  <tr><td>Topaz</td></tr>\n</table>',css:'tr:nth-child(odd) { background-color: lavender; }',
 learn:"Final round! Stripes with nth-child.",example:"tr:nth-child(even) { background: #eee; }",
 mission:"Give the **odd** rows (1 and 3) a `background-color` of **lavender**.",
 job:"Colour rows 1 and 3. Type `tr:nth-child(odd) { background-color: lavender; }`.",
 hints:["`tr:nth-child(odd) { }`","Inside: `background-color: lavender;`"],tip:"You just styled a real data table like a pro.",
 checks:[[a=>{const r=a.$$('tr');return a.css(r[0],'backgroundColor')!==CLEAR&&a.css(r[2],'backgroundColor')!==CLEAR&&a.css(r[1],'backgroundColor')===CLEAR;},"Colour rows 1 and 3 only: `tr:nth-child(odd) { background-color: lavender; }`"]]})
],
bay:[
css({id:'bg1',name:'Cardigan',concept:'A card',html:'<div class="card">Hero card</div>',css:'.card { width: 200px; padding: 16px; border: 2px solid navy; border-radius: 12px; }',
 learn:"Gym round! A card = a size + padding + a border + round corners.",example:".card { padding: 12px; border: 1px solid gray; }",
 mission:"Give `.card` `width: 200px`, `padding: 16px`, a border like `2px solid navy`, and `border-radius: 12px`.",
 job:"Give `.card` `width: 200px;` `padding: 16px;` `border: 2px solid navy;` and `border-radius: 12px;`.",
 hints:["`.card { width: 200px; padding: 16px; }`","Add `border: 2px solid navy; border-radius: 12px;`"],tip:"Cards are everywhere: shops, apps, social media.",
 checks:[cssPx('.card','width',200,"Make it 200px wide: `width: 200px;`"),cssPx('.card','paddingTop',16,"Give it `padding: 16px;`"),cssIs('.card','borderTopStyle','solid',"Give it a solid border: `border: 2px solid navy;`"),cssPx('.card','borderTopLeftRadius',12,"Round the corners: `border-radius: 12px;`")]}),
css({id:'bg2',name:'Pillbug',concept:'Pill badge',html:'<span class="badge">NEW</span>',css:'.badge { padding: 4px 12px; border-radius: 999px; background-color: gold; }',
 learn:"Gym round! A pill-shaped badge: padding + very round corners + a colour.",example:".tag { border-radius: 999px; }",
 mission:"Give `.badge` `padding: 4px 12px`, `border-radius: 999px` and a background colour (like **gold**).",
 job:"Make a pill shape. Give `.badge` `padding: 4px 12px;` `border-radius: 999px;` and `background-color: gold;`.",
 hints:["`.badge { padding: 4px 12px; }`","Add `border-radius: 999px; background-color: gold;`"],tip:"999px = 'as round as you can'.",
 checks:[cssPx('.badge','paddingLeft',12,"Use `padding: 4px 12px;` (4px top and bottom, 12px left and right)."),[a=>px(a.css(a.$('.badge'),'borderTopLeftRadius'))>=20,"Use `border-radius: 999px;`"],cssNot('.badge','backgroundColor',CLEAR,"Give it a background colour: `background-color: gold;`")]}),
css({id:'bg3',name:'Avatoro',concept:'Avatar',html:'<div class="avatar">🧙</div>',css:'.avatar { width: 64px; height: 64px; border-radius: 50%; border: 3px solid gold; font-size: 36px; text-align: center; }',
 learn:"Final round! A round profile picture with a golden ring.",example:".pic { border-radius: 50%; }",
 mission:"Make `.avatar` a circle: `width: 64px`, `height: 64px`, `border-radius: 50%`, and a **3px solid gold** border.",
 job:"Make a round picture. Give `.avatar` `width: 64px;` `height: 64px;` `border-radius: 50%;` and `border: 3px solid gold;`.",
 hints:["`width: 64px; height: 64px; border-radius: 50%;`","Add `border: 3px solid gold;`"],tip:"Every social app uses round avatars.",
 checks:[cssPx('.avatar','width',64,"Make it 64px wide: `width: 64px;`"),cssPx('.avatar','height',64,"Make it 64px tall: `height: 64px;`"),[a=>{const v=a.css(a.$('.avatar'),'borderTopLeftRadius');return v==='50%'||px(v)>=30;},"Make it round: `border-radius: 50%;`"],cssPx('.avatar','borderTopWidth',3,"Give it a 3px border: `border: 3px solid gold;`")]})
],
jungle:[
lay({id:'lg1',name:'Navitron',concept:'Navbar',html:'<div class="nav">\n  <b>Logo</b>\n  <span>Menu</span>\n</div>',base:'.nav { background: #e0f2fe; padding: 10px; height: 50px; }',css:'.nav { display: flex; justify-content: space-between; align-items: center; }',
 learn:"Gym round! A menu bar: logo on the left, menu on the right, both in the middle up-and-down.",example:".nav { display: flex; }",
 mission:"Give `.nav` `display: flex`, `justify-content: space-between` and `align-items: center`.",
 job:"Give `.nav` 3 lines: `display: flex;` `justify-content: space-between;` `align-items: center;`.",
 hints:["`.nav { display: flex; }`","Add `justify-content: space-between; align-items: center;`"],tip:"Almost every website header is built just like this.",
 checks:[cssIs('.nav','display','flex',"Add `display: flex;` to `.nav`."),cssIs('.nav','justifyContent','space-between',"Add `justify-content: space-between;` to `.nav`."),cssIs('.nav','alignItems','center',"Add `align-items: center;` to `.nav`.")]}),
lay({id:'lg2',name:'Gallerex',concept:'Photo grid',html:'<div class="gallery">\n  <div class="item">🌴</div><div class="item">🐒</div><div class="item">🦜</div>\n  <div class="item">🐍</div><div class="item">🌺</div><div class="item">🐆</div>\n</div>',base:'.item { background: #dcfce7; padding: 14px; font-size: 26px; text-align: center; }',css:'.gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }',
 learn:"Gym round! A photo gallery grid.",example:".gallery { display: grid; }",
 mission:"Give `.gallery` `display: grid`, **3** equal columns with `grid-template-columns: repeat(3, 1fr)`, and `gap: 8px`.",
 job:"Make a 3-column photo grid. Give `.gallery` `display: grid;` `grid-template-columns: repeat(3, 1fr);` and `gap: 8px;`.",
 hints:["`.gallery { display: grid; grid-template-columns: repeat(3, 1fr); }`","Add `gap: 8px;`"],tip:"Lots of photo apps show pictures in a 3-column grid!",
 checks:[cssIs('.gallery','display','grid',"Add `display: grid;` to `.gallery`."),[a=>gridCols(a,'.gallery').length===3,"Make 3 columns: `grid-template-columns: repeat(3, 1fr);`"],[a=>px(a.css(a.$('.gallery'),'columnGap'))>=1,"Add a gap: `gap: 8px;`"]]}),
lay({id:'lg3',name:'Centaurus',concept:'Perfect centering',html:'<div class="hero">\n  <h1>Jungle!</h1>\n</div>',base:'.hero { height: 150px; background: #fef9c3; }',css:'.hero { display: flex; justify-content: center; align-items: center; }',
 learn:"Final round! The famous 3-line trick to put something in the exact middle.",example:".box { display: flex; justify-content: center; align-items: center; }",
 mission:"Put the heading in the exact middle of `.hero` with `display: flex`, `justify-content: center` and `align-items: center`.",
 job:"Put the heading in the exact middle. Give `.hero` `display: flex;` `justify-content: center;` `align-items: center;`.",
 hints:["`display: flex;`","`justify-content: center; align-items: center;`"],tip:"Every web developer on Earth knows these 3 lines.",
 checks:[cssIs('.hero','display','flex',"Add `display: flex;` to `.hero`."),cssIs('.hero','justifyContent','center',"Add `justify-content: center;` to `.hero`."),cssIs('.hero','alignItems','center',"Add `align-items: center;` to `.hero`.")]})
],
peaks:[
css({id:'eg1',name:'Badgeon',concept:'Notification badge',html:'<div class="icon">✉️\n  <span class="count">3</span>\n</div>',css:'.icon { position: relative; width: 60px; height: 60px; background: #e0e7ff; font-size: 30px; }\n.count { position: absolute; top: 0; right: 0; background: red; color: white; }',
 learn:"Gym round! An app icon with a red number in its corner.",example:".icon { position: relative; }",
 mission:"Give `.icon` `position: relative` (and `width: 60px`, `height: 60px`). Pin `.count` to the top-right corner with `position: absolute`, `top: 0`, `right: 0` and a **red** background.",
 job:"Give `.icon` `position: relative;`. Pin the number: give `.count` `position: absolute; top: 0; right: 0; background: red;`.",
 hints:["`.icon { position: relative; width: 60px; height: 60px; }`","`.count { position: absolute; top: 0; right: 0; background: red; color: white; }`"],tip:"Every phone app badge works like this.",
 checks:[cssIs('.icon','position','relative',"Give `.icon` `position: relative;`"),cssIs('.count','position','absolute',"Give `.count` `position: absolute;`"),[a=>{const i=a.$('.icon').getBoundingClientRect(),c=a.$('.count').getBoundingClientRect();return Math.abs(i.right-c.right)<=2&&Math.abs(i.top-c.top)<=2;},"Pin `.count` to the top-right corner with `top: 0; right: 0;`"]]}),
css({id:'eg2',name:'Liftoff',concept:'Hover card',html:'<div class="card">Hover me</div>',css:'.card { padding: 20px; background: #fce7f3; transition: transform 0.2s; }\n.card:hover { transform: translateY(-6px); }',
 learn:"Gym round! A card that floats up smoothly when you hover.",example:".card:hover { transform: translateY(-4px); }",
 mission:"Give `.card` `transition: transform 0.2s`. Then lift it on hover: `.card:hover` with `transform: translateY(-6px)`.",
 job:"Give `.card` `transition: transform 0.2s;`. Then type `.card:hover { transform: translateY(-6px); }`.",
 hints:["`.card { transition: transform 0.2s; }`","`.card:hover { transform: translateY(-6px); }`"],tip:"Transition goes on the normal rule. Transform goes on the hover rule.",
 checks:[[a=>a.css(a.$('.card'),'transitionDuration').split(',').some(v=>parseFloat(v)>0),"Add `transition: transform 0.2s;` to `.card`."],[a=>a.rules().some(r=>r.selectorText&&r.selectorText.replace(/\s/g,'').includes('.card:hover')&&r.style.transform),"Add `.card:hover { transform: translateY(-6px); }`"]]}),
css({id:'eg3',name:'Themezilla',concept:'Theme variables',html:'<button class="btn">Play</button>',css:':root { --brand: tomato; }\n.btn { background-color: var(--brand); color: white; }',
 learn:"Final round! Real sites keep their main colour in a variable.",example:":root { --brand: teal; }",
 mission:"Make `--brand` = **tomato** inside `:root`. Then use it for `.btn`'s background: `background-color: var(--brand)`.",
 job:"Type `:root { --brand: tomato; }`. Then type `.btn { background-color: var(--brand); }`.",
 hints:["`:root { --brand: tomato; }`","`.btn { background-color: var(--brand); color: white; }`"],tip:"Change --brand once, and the whole site changes colour.",
 checks:[[a=>a.rules().some(r=>r.cssText&&r.cssText.includes('var(--brand)')),"Use the variable on the button: `background-color: var(--brand);`"],cssIs('.btn','backgroundColor','rgb(255, 99, 71)',"The button should come out tomato. Check `:root { --brand: tomato; }`")]})
],
volcano:[
js({id:'jg1',name:'Evenix',concept:'% remainder',learn:"Gym round! `%` gives what is LEFT OVER after dividing. `7 % 2` = 1. `8 % 2` = 0. If a number % 2 is 0, it's even!",example:"console.log(10 % 3); // 1",
 mission:"Make `function isEven(n)` that returns `true` if n is even and `false` if it is odd.",job:"Make `function isEven(n) { }`. Inside, type `return n % 2 === 0;`",tests:[["typeof isEven==='function'","Make `function isEven(n)`."],["isEven(4)===true&&isEven(10)===true&&isEven(0)===true","isEven(4) should give back true. Try `return n % 2 === 0;`"],["isEven(7)===false&&isEven(1)===false","isEven(7) should give back false."]],
 hints:["`function isEven(n) { }`","Inside: `return n % 2 === 0;`"],answer:"function isEven(n) {\n  return n % 2 === 0;\n}\n\nconsole.log(isEven(4));",tip:"`n % 2 === 0` already IS true or false — you can return it straight away."}),
js({id:'jg2',name:'Summon',concept:'Loop + total',learn:"Gym round! Add up every number in a list with a loop and a running total.",example:"let total = 0;\nfor (const n of list) {\n  total = total + n;\n}",
 mission:"Make `function sum(list)` that returns all the numbers in the list added up.",job:"Make `function sum(list) { }`. Start with `let total = 0;`, add each number in a loop, then `return total;`",tests:[["typeof sum==='function'","Make `function sum(list)`."],["sum([1,2,3])===6&&sum([10,5])===15","sum([1,2,3]) should give back 6."],["sum([])===0","sum([]) should give back 0. Start with `let total = 0;`"]],
 hints:["Start with `let total = 0;`","Loop: `for (const n of list) { total = total + n; }` then `return total;`"],answer:"function sum(list) {\n  let total = 0;\n  for (const n of list) {\n    total = total + n;\n  }\n  return total;\n}\n\nconsole.log(sum([1, 2, 3]));",tip:"Shopping carts add up prices just like this."}),
js({id:'jg3',name:'Gradeon',concept:'else if',learn:"Final round! `else if` checks one more thing:\n`if (a) { } else if (b) { } else { }`",example:"if (t > 30) {\n  return \"Hot\";\n} else if (t > 15) {\n  return \"Nice\";\n} else {\n  return \"Cold\";\n}",
 mission:"Make `function medal(score)`: 80 or more → **\"Gold\"**, 50 or more → **\"Silver\"**, otherwise **\"Bronze\"**.",job:"Make `function medal(score)`. 80 or more: return **\"Gold\"**. 50 or more: return **\"Silver\"**. Else: return **\"Bronze\"**.",tests:[["typeof medal==='function'","Make `function medal(score)`."],["medal(95)==='Gold'&&medal(80)==='Gold'","80 or more should give back \"Gold\". Use `score >= 80`."],["medal(60)==='Silver'&&medal(50)==='Silver'","50 to 79 should give back \"Silver\". Use `score >= 50`."],["medal(10)==='Bronze'","Under 50 should give back \"Bronze\"."]],
 hints:["`if (score >= 80) { return \"Gold\"; }`","`else if (score >= 50) { return \"Silver\"; } else { return \"Bronze\"; }`"],answer:"function medal(score) {\n  if (score >= 80) {\n    return \"Gold\";\n  } else if (score >= 50) {\n    return \"Silver\";\n  } else {\n    return \"Bronze\";\n  }\n}\n\nconsole.log(medal(85));",tip:"Order matters! Check the biggest number first."})
]};

const LCHAMP=[
html({id:'k1',name:'Queen Byte: Round 1',concept:'Profile card (HTML)',learn:"The Champion's first test: build a whole profile card by yourself.",example:"<article class=\"card\">…</article>",
 mission:"Make an `<article class=\"card\">`. Inside it put: an `<img>` with `alt` words, an `<h2>` name, a `<p>` about you, and a link `<a href=\"#\">`.",
 job:"Make `<article class=\"card\">`. Inside, put an `<img>` with `alt`, an `<h2>`, a `<p>`, and an `<a href=\"#\">` link.",
 hints:["`<article class=\"card\">` … `</article>`","Inside: `<img src=\"me.png\" alt=\"Me\">`, `<h2>`, `<p>`, `<a href=\"#\">Follow</a>`"],
 answer:"<article class=\"card\">\n  <img src=\"me.png\" alt=\"Me\">\n  <h2>Ash</h2>\n  <p>Codeling Legend</p>\n  <a href=\"#\">Follow</a>\n</article>",tip:"You know every one of these tags now. Legend!",
 checks:[has('article.card',"Make `<article class=\"card\">`."),[a=>!!a.$('.card img')&&(a.$('.card img').getAttribute('alt')||'').trim().length>0,"Add an `<img>` with `alt` words inside the card, like `<img src=\"me.png\" alt=\"Me\">`."],has('.card h2',"Add an `<h2>` inside the card."),has('.card p',"Add a `<p>` inside the card."),has('.card a[href]',"Add a link with `href` inside the card, like `<a href=\"#\">Follow</a>`.")]}),
lay({id:'k2',name:'Queen Byte: Round 2',concept:'Styled gallery (CSS)',html:'<div class="gallery">\n  <div class="tile">1</div><div class="tile">2</div><div class="tile">3</div>\n  <div class="tile">4</div><div class="tile">5</div><div class="tile">6</div>\n</div>',css:'.gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }\n.tile { background-color: #fde68a; padding: 20px; border-radius: 12px; text-align: center; }',
 learn:"Round 2: make a gallery like a pro — a grid AND nice-looking tiles.",example:".gallery { display: grid; }",
 mission:"Give `.gallery` `display: grid`, `grid-template-columns: repeat(3, 1fr)` and a gap (like `gap: 10px`). Give `.tile` a background colour (like **#fde68a**), padding, and round corners (like `border-radius: 12px`).",
 job:"Make `.gallery` a 3-column grid with `gap: 10px;`. Give `.tile` `background-color: #fde68a;` `padding: 20px;` and `border-radius: 12px;`.",
 hints:["`.gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }`","`.tile { background-color: #fde68a; padding: 20px; border-radius: 12px; }`"],tip:"Layout + looks = real front-end skill.",
 checks:[[a=>gridCols(a,'.gallery').length===3,"Make `.gallery` a 3-column grid: `display: grid; grid-template-columns: repeat(3, 1fr);`"],[a=>px(a.css(a.$('.gallery'),'columnGap'))>=1,"Add a gap to `.gallery`, like `gap: 10px;`"],cssNot('.tile','backgroundColor',CLEAR,"Give `.tile` a background, like `background-color: #fde68a;`"),cssMin('.tile','borderTopLeftRadius',1,"Round the tiles, like `border-radius: 12px;`")]}),
js({id:'k3',name:'Queen Byte: Round 3',concept:'Objects in a list (JS)',learn:"Round 3: a shopping cart is a list of objects. `item.price` reads each price.",example:"let cart = [{ price: 2 }, { price: 3 }];",
 mission:"Make `function totalPrice(items)` that returns every `item.price` added up.",job:"Make `function totalPrice(items)`. Start `let total = 0;`, add each `item.price` in a loop, then `return total;`",tests:[["typeof totalPrice==='function'","Make `function totalPrice(items)`."],["totalPrice([{price:2},{price:3}])===5","Prices 2 and 3 should give back 5. Add up `item.price`."],["totalPrice([])===0","An empty cart should give back 0. Start with `let total = 0;`"]],
 hints:["`let total = 0;` then loop: `for (const item of items) { }`","Inside the loop: `total = total + item.price;` — then `return total;`"],answer:"function totalPrice(items) {\n  let total = 0;\n  for (const item of items) {\n    total = total + item.price;\n  }\n  return total;\n}\n\nconsole.log(totalPrice([{ price: 2 }, { price: 3 }]));",tip:"Every online shop runs code just like this."}),
js({id:'k4',name:'Queen Byte: Final Round',concept:'Template strings (JS)',learn:"Final round! Backtick strings can drop values right in with `${ }`:\n`` `Hi ${name}!` `` → \"Hi Ash!\"",example:"let msg = `Level ${lvl}`;",
 mission:"Make `function makeTag(name, level)` that returns words like **Ash (Lv 7)**: the name, a space, then `(Lv `, the level and `)`.",job:"Make `function makeTag(name, level)` that gives back words like **Ash (Lv 7)**. Join `name` and `level` with `+` or with backticks.",tests:[["typeof makeTag==='function'","Make `function makeTag(name, level)`."],["makeTag('Ash',7)==='Ash (Lv 7)'","makeTag(\"Ash\", 7) should give back \"Ash (Lv 7)\"."],["makeTag('Mia',12)==='Mia (Lv 12)'","makeTag(\"Mia\", 12) should give back \"Mia (Lv 12)\"."]],
 hints:["You can use `+`: `name + \" (Lv \" + level + \")\"`","Or backticks: `` `${name} (Lv ${level})` ``"],answer:"function makeTag(name, level) {\n  return `${name} (Lv ${level})`;\n}\n\nconsole.log(makeTag(\"Ash\", 7));",tip:"YOU are now a Codeling Legend. 👑"})
];

/* ===================== CODELING LEGENDS: ENGINE ===================== */
const T=32;let VW=20,VH=14;
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const rng=seed=>{let s=(seed>>>0)||7;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return (s%100000)/100000;};};
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=amt<0?0:255,p=Math.abs(amt);r=Math.round((t-r)*p+r);g=Math.round((t-g)*p+g);b=Math.round((t-b)*p+b);return `rgb(${r},${g},${b})`;}

/* ---------- creature art ---------- */
const TYPES={html:{icon:'</>',name:'HTML'},form:{icon:'☑',name:'Form'},sel:{icon:'.#',name:'Selector'},box:{icon:'▢',name:'Box'},lay:{icon:'▦',name:'Layout'},fx:{icon:'✦',name:'Effect'},js:{icon:'{}',name:'Script'},boss:{icon:'★',name:'Boss'}};
let _gid=0;
function monSVG(seed,color,icon,size=120,stage=1,ghost=false){
  const r=rng(seed),id='lg'+(_gid++);const d=shade(color,-.32),l=shade(color,.45),ll=shade(color,.75);
  const body=Math.floor(r()*5),top=Math.floor(r()*8),tail=Math.floor(r()*4),pat=Math.floor(r()*4),eye=Math.floor(r()*4);
  const B=['<ellipse cx="60" cy="74" rx="38" ry="34"/>','<path d="M60 32 C88 32 94 60 92 80 C90 104 74 110 60 110 C46 110 30 104 28 80 C26 60 32 32 60 32Z"/>','<path d="M60 36 C78 36 84 52 86 64 C98 74 98 108 60 108 C22 108 22 74 34 64 C36 52 42 36 60 36Z"/>','<rect x="24" y="38" width="72" height="70" rx="26"/>','<path d="M60 28 C72 46 96 62 94 84 C92 104 76 110 60 110 C44 110 28 104 26 84 C24 62 48 46 60 28Z"/>'][body];
  const TOP=[`<path d="M32 54 L36 16 L56 42Z" fill="${d}"/><path d="M88 54 L84 16 L64 42Z" fill="${d}"/><path d="M38 46 L39 26 L50 40Z" fill="${l}"/><path d="M82 46 L81 26 L70 40Z" fill="${l}"/>`,
   `<path d="M50 40 Q44 20 34 12" stroke="${d}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="34" cy="12" r="7" fill="${ll}" stroke="${d}" stroke-width="2.5"/><path d="M70 40 Q76 20 86 12" stroke="${d}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="86" cy="12" r="7" fill="${ll}" stroke="${d}" stroke-width="2.5"/>`,
   `<path d="M28 56 L38 22 L50 42 L60 12 L70 42 L82 22 L92 56Z" fill="${d}"/>`,
   `<circle cx="32" cy="42" r="14" fill="${d}"/><circle cx="88" cy="42" r="14" fill="${d}"/><circle cx="32" cy="42" r="7" fill="${ll}"/><circle cx="88" cy="42" r="7" fill="${ll}"/>`,
   `<path d="M40 44 Q30 22 40 10 Q42 28 52 40Z" fill="${ll}" stroke="${d}" stroke-width="2"/><path d="M80 44 Q90 22 80 10 Q78 28 68 40Z" fill="${ll}" stroke="${d}" stroke-width="2"/>`,
   `<path d="M60 38 Q56 18 44 14 Q52 26 58 38Z" fill="#4ade80" stroke="#15803d" stroke-width="2"/><path d="M60 38 Q66 16 80 14 Q70 26 62 38Z" fill="#86efac" stroke="#15803d" stroke-width="2"/>`,
   `<path d="M48 42 Q46 22 56 12 Q56 26 62 30 Q66 16 74 12 Q72 30 72 42Z" fill="#fb923c" stroke="#ea580c" stroke-width="2"/>`,
   `<path d="M44 42 Q60 4 76 42Z" fill="${l}" stroke="${d}" stroke-width="2.5"/>`][top];
  const TAIL=['',`<path d="M92 92 Q116 90 110 70 Q104 58 96 70" stroke="${d}" stroke-width="7" fill="none" stroke-linecap="round"/>`,`<path d="M90 96 L104 88 L98 80 L112 70" stroke="${d}" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`,`<path d="M92 94 Q104 94 106 86" stroke="${d}" stroke-width="6" fill="none"/><circle cx="108" cy="82" r="9" fill="${ll}" stroke="${d}" stroke-width="2"/>`][tail];
  const PAT=['',`<circle cx="40" cy="58" r="5" fill="${d}" opacity=".35"/><circle cx="84" cy="64" r="4" fill="${d}" opacity=".35"/><circle cx="78" cy="50" r="3" fill="${d}" opacity=".35"/>`,`<path d="M48 40 Q60 34 72 40" stroke="${d}" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/><path d="M44 48 Q60 42 76 48" stroke="${d}" stroke-width="4" fill="none" opacity=".35" stroke-linecap="round"/>`,''][pat];
  const EYE=[`<circle cx="45" cy="66" r="10" fill="#fff"/><circle cx="75" cy="66" r="10" fill="#fff"/><circle cx="47" cy="67" r="5.5" fill="#2a2840"/><circle cx="77" cy="67" r="5.5" fill="#2a2840"/><circle cx="49.5" cy="64" r="2" fill="#fff"/><circle cx="79.5" cy="64" r="2" fill="#fff"/>`,
   `<path d="M37 67 Q45 59 53 67" stroke="#2a2840" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M67 67 Q75 59 83 67" stroke="#2a2840" stroke-width="4" fill="none" stroke-linecap="round"/>`,
   `<circle cx="45" cy="66" r="10.5" fill="#2a2840"/><circle cx="75" cy="66" r="10.5" fill="#2a2840"/><circle cx="48" cy="62" r="3.6" fill="#fff"/><circle cx="78" cy="62" r="3.6" fill="#fff"/><circle cx="42" cy="70" r="1.8" fill="#fff"/><circle cx="72" cy="70" r="1.8" fill="#fff"/>`,
   `<circle cx="45" cy="67" r="9" fill="#fff"/><circle cx="75" cy="67" r="9" fill="#fff"/><circle cx="47" cy="68" r="5" fill="#2a2840"/><circle cx="77" cy="68" r="5" fill="#2a2840"/><path d="M36 56 L54 61" stroke="#2a2840" stroke-width="4" stroke-linecap="round"/><path d="M84 56 L66 61" stroke="#2a2840" stroke-width="4" stroke-linecap="round"/>`][eye];
  const wings=stage>=2?`<path d="M30 66 Q4 40 8 72 Q14 90 34 82Z" fill="${ll}" stroke="${d}" stroke-width="2" opacity=".95"/><path d="M90 66 Q116 40 112 72 Q106 90 86 82Z" fill="${ll}" stroke="${d}" stroke-width="2" opacity=".95"/>`:'';
  const crown=stage>=3?`<path d="M44 30 L48 16 L55 26 L60 12 L65 26 L72 16 L76 30Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/><circle cx="60" cy="20" r="2.5" fill="#ef4444"/>`:'';
  const aura=stage>=3?`<circle cx="60" cy="72" r="56" fill="none" stroke="${l}" stroke-width="3" stroke-dasharray="4 8" opacity=".7"/>`:'';
  const sc=stage===1?.86:stage===2?.95:1,ty=(1-sc)*112;
  return `<svg viewBox="0 0 120 120" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" ${ghost?'style="filter:grayscale(1) brightness(1.35);opacity:.45"':''}><defs><radialGradient id="${id}" cx="38%" cy="32%" r="78%"><stop offset="0" stop-color="${ll}"/><stop offset=".5" stop-color="${color}"/><stop offset="1" stop-color="${d}"/></radialGradient></defs>
  ${aura}<g transform="translate(${(1-sc)*60} ${ty}) scale(${sc})">${wings}${TAIL}${TOP}<ellipse cx="44" cy="110" rx="12" ry="6" fill="${d}"/><ellipse cx="76" cy="110" rx="12" ry="6" fill="${d}"/>
  <g fill="url(#${id})" stroke="${d}" stroke-width="2.5">${B}</g>${PAT}<ellipse cx="60" cy="92" rx="21" ry="14" fill="${ll}" opacity=".9"/><text x="60" y="97" font-size="12" text-anchor="middle" fill="${d}" font-family="monospace" font-weight="bold">${esc(icon)}</text>
  ${EYE}<circle cx="31" cy="80" r="5.5" fill="#ff8fa3" opacity=".55"/><circle cx="89" cy="80" r="5.5" fill="#ff8fa3" opacity=".55"/><path d="M53 80 Q60 87 67 80" stroke="#2a2840" stroke-width="3" fill="none" stroke-linecap="round"/>${crown}</g></svg>`;
}
const _imgCache={};
function svgImg(key,svg){if(!_imgCache[key]){const i=new Image();i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);_imgCache[key]=i;}return _imgCache[key];}

/* ---------- regions ---------- */
const PAL={meadow:['#ff8a5b','#fb7185','#f59e0b','#f97316'],falls:['#38bdf8','#22d3ee','#60a5fa','#2dd4bf'],caves:['#a855f7','#c084fc','#818cf8','#e879f9'],bay:['#14b8a6','#f97316','#eab308','#06b6d4'],jungle:['#22c55e','#84cc16','#10b981','#65a30d'],peaks:['#60a5fa','#818cf8','#e879f9','#38bdf8'],volcano:['#f97316','#ef4444','#eab308','#fb923c'],castle:['#8b5cf6','#ec4899','#f59e0b','#6366f1']};
const L_=(skin,hair,shirt,pants,hat)=>({skin,hair,shirt,pants:pants||'#3b4a6b',hat:hat||''});
const REG=[
 {id:'meadow',name:'Meaning Meadow',theme:'meadow',type:'html',quiz:['q1','q2'],sign:["MEANING MEADOW","Codelings here know SEMANTIC HTML — tags with meaning.","Tame all 10, then beat Marlo at the Structure Gym!"],
  gym:{leader:'Marlo',title:'Structure Gym',badge:'Structure Badge',icon:'🏛️',look:L_(1,'#4a3728','#ff8a5b','#334155','cap'),intro:["Welcome to the Structure Gym! I'm Marlo.","Every great website stands on good bones: header, main, footer.","Three rounds. Show me your structure!"],win:["Solid structure, {name}! The STRUCTURE BADGE is yours.","The gate east to Form Falls is now open!"]},
  trainers:[{name:'Hiker Hal',look:L_(0,'#6b4423','#16a34a','#57534e','cap'),lines:["Hey! A new trainer! Let's quiz!"],after:["You know your HTML! Keep it up."],coins:30},{name:'Scout Sia',look:L_(2,'#2b1d14','#f59e0b','#334155','bandana'),lines:["Stop right there! Quiz battle!"],after:["Wow, you're quick!"],coins:35}],
  npc:{name:'Botanist Bea',look:L_(0,'#d9a441','#84cc16'),lines:["Semantic tags are like labels on jars.","A <div> is a plain jar. A <header> is a jar labelled HEADER. Much clearer!"]}},
 {id:'falls',name:'Form Falls',theme:'falls',type:'form',quiz:['q2','q10'],sign:["FORM FALLS","Codelings here are made of FORMS and TABLES.","Tame all 12, then beat Tabitha at the Form Gym!"],
  gym:{leader:'Tabitha',title:'Form Gym',badge:'Form Badge',icon:'📋',look:L_(3,'#1f2937','#38bdf8','#1e3a8a','headphones'),intro:["I'm Tabitha. Every login, every checkout, every sign-up is a FORM.","Get it wrong and nobody can use the site.","Three rounds. Fill in the blanks!"],win:["Flawless forms! Take the FORM BADGE.","The path east to the Selector Caves is open."]},
  trainers:[{name:'Swimmer Sam',look:L_(1,'#c0392b','#0ea5e9','#0369a1'),lines:["Splash! Quiz time!"],after:["You swim through questions like a fish!"],coins:35},{name:'Clerk Cleo',look:L_(0,'#7c3aed','#f472b6','#334155','flower'),lines:["Forms are my life. Prove you know them!"],after:["Stamped and approved! ✅"],coins:40}],
  npc:{name:'Fisher Finn',look:L_(2,'#6b4423','#22d3ee','#475569','cap'),lines:["Tip: a label's `for` must match the input's `id`.","Then tapping the label jumps into the box. Handy on phones!"]}},
 {id:'caves',name:'Selector Caves',theme:'caves',type:'sel',quiz:['q4'],sign:["SELECTOR CAVES","These crystal Codelings choose WHAT to style.","Tame all 12, then beat Seles at the Selector Gym!"],
  gym:{leader:'Seles',title:'Selector Gym',badge:'Selector Badge',icon:'🔮',look:L_(0,'#7c3aed','#a855f7','#4c1d95','wizard'),intro:["Welcome to my crystal gym. I'm Seles.","A great selector hits EXACTLY what you want — nothing more.","Three rounds. Aim carefully!"],win:["Precise as a crystal! The SELECTOR BADGE is yours.","Box Bay awaits to the east."]},
  trainers:[{name:'Miner Moe',look:L_(2,'#2b1d14','#a16207','#44403c','cap'),lines:["Dig deep! Quiz battle!"],after:["You struck gold!"],coins:40},{name:'Gem Girl Gia',look:L_(1,'#ec4899','#c084fc','#334155','crown'),lines:["Sparkly questions incoming!"],after:["Dazzling answers!"],coins:45}],
  npc:{name:'Old Miner',look:L_(1,'#e5e7eb','#78716c','#44403c'),lines:["Remember: dot for class, hash for id.",".gem picks ALL gems. #boss picks the ONE boss."]}},
 {id:'bay',name:'Box Bay',theme:'bay',type:'box',quiz:['q5','q3'],sign:["BOX BAY","Every element is a BOX. Learn size, space, borders and text.","Tame all 12, then beat Bo at the Box Gym!"],
  gym:{leader:'Bo',title:'Box Gym',badge:'Box Badge',icon:'📦',look:L_(2,'#d9a441','#14b8a6','#155e75','bandana'),intro:["Ahoy! I'm Bo, captain of the Box Gym.","Padding, margin, borders — every pixel matters.","Three rounds. Box clever!"],win:["Shipshape! Take the BOX BADGE.","Sail on east to Layout Jungle!"]},
  trainers:[{name:'Surfer Sky',look:L_(0,'#d9a441','#f97316','#0ea5e9'),lines:["Cowabunga! Quiz!"],after:["Totally gnarly answers!"],coins:45},{name:'Sailor Sal',look:L_(3,'#1f2937','#ffffff','#1e3a8a','cap'),lines:["All hands on deck — quiz battle!"],after:["Smooth sailing!"],coins:50}],
  npc:{name:'Lifeguard Lu',look:L_(1,'#c0392b','#ef4444','#334155'),lines:["Padding = space INSIDE the box. Margin = space OUTSIDE.","Think of a parcel: padding is the bubble wrap, margin is the gap between parcels."]}},
 {id:'jungle',name:'Layout Jungle',theme:'jungle',type:'lay',quiz:['q6'],sign:["LAYOUT JUNGLE","Wild Codelings that line things up: FLEXBOX and GRID.","Tame all 12, then beat Vina at the Layout Gym!"],
  gym:{leader:'Vina',title:'Layout Gym',badge:'Layout Badge',icon:'🧩',look:L_(1,'#2b1d14','#22c55e','#14532d','flower'),intro:["I'm Vina. In the jungle, everything has its place.","Flexbox for rows. Grid for rows AND columns.","Three rounds. Stay in line!"],win:["Perfectly arranged! The LAYOUT BADGE is yours.","Climb east to Effect Peaks!"]},
  trainers:[{name:'Ranger Rex',look:L_(2,'#6b4423','#65a30d','#3f6212','cap'),lines:["Halt, explorer! Quiz battle!"],after:["You'd survive the jungle!"],coins:50},{name:'Explorer Ela',look:L_(0,'#c0392b','#eab308','#713f12','bandana'),lines:["Let's see if you're organised!"],after:["Everything in its place!"],coins:55}],
  npc:{name:'Monkey Keeper',look:L_(3,'#2b1d14','#10b981','#334155'),lines:["Flex goes on the PARENT box — the one holding the others.","Most beginners put it on the children. Not you though!"]}},
 {id:'peaks',name:'Effect Peaks',theme:'peaks',type:'fx',quiz:['q5','q10'],sign:["EFFECT PEAKS","Snowy Codelings of POSITION, ANIMATION and RESPONSIVE design.","Tame all 12, then beat Pip at the Effects Gym!"],
  gym:{leader:'Pip',title:'Effects Gym',badge:'Effects Badge',icon:'✨',look:L_(0,'#ffffff','#ec4899','#831843','headphones'),intro:["Welcome to the summit! I'm Pip.","Hover glows, smooth slides, perfect pins — this is where websites feel ALIVE.","Three rounds. Make it sparkle!"],win:["Spectacular! Take the EFFECTS BADGE.","Only the Script Volcano remains. Be brave!"]},
  trainers:[{name:'Skier Skye',look:L_(1,'#d9a441','#60a5fa','#1e3a8a','bandana'),lines:["Swoosh! Quiz battle!"],after:["Smooth moves!"],coins:55},{name:'Yeti Fan Yuri',look:L_(2,'#e5e7eb','#a5b4fc','#334155','headphones'),lines:["I'm looking for a yeti. Found a quiz instead!"],after:["Abominably good!"],coins:60}],
  npc:{name:'Snow Sage',look:L_(0,'#e5e7eb','#93c5fd','#475569','wizard'),lines:["Transitions go on the normal rule. Transforms go on the hover rule.","Together they make buttons that glide."]}},
 {id:'volcano',name:'Script Volcano',theme:'volcano',type:'js',quiz:['q7','q8','q9'],sign:["SCRIPT VOLCANO","The hottest Codelings: JAVASCRIPT. They make pages THINK.","Tame all 14, then beat Ember at the Script Gym!"],
  gym:{leader:'Ember',title:'Script Gym',badge:'Script Badge',icon:'🌋',look:L_(3,'#c0392b','#f97316','#7c2d12','crown'),intro:["So you climbed my volcano. I'm Ember.","HTML builds. CSS styles. JavaScript DECIDES.","Three rounds of real logic. Don't get burned!"],win:["...You're the real deal, {name}. The SCRIPT BADGE is yours.","With 7 badges, the Code Castle opens to the east. Queen Byte awaits."]},
  trainers:[{name:'Firefighter Fay',look:L_(1,'#2b1d14','#ef4444','#1f2937','cap'),lines:["This volcano's hot — and so is this quiz!"],after:["You handled the heat!"],coins:60},{name:'Geologist Gus',look:L_(2,'#6b4423','#fb923c','#57534e'),lines:["Rocks and code — let's test you!"],after:["Rock solid!"],coins:70}],
  npc:{name:'Lava Lad',look:L_(0,'#d9a441','#eab308','#7c2d12','bandana'),lines:["Tip: JavaScript is case-sensitive. name and Name are DIFFERENT!","Most bugs here are spelling. Check every letter."]}}
];
const REGM=Object.fromEntries(REG.map(r=>[r.id,r]));
REG.forEach(r=>{r.pool=LEG[r.id];r.gym.pool=LGYM[r.id];r.pool.concat(r.gym.pool).forEach((c,i)=>{c.region=r.id;c.mtype=r.type;c.color=PAL[r.id][hash(c.id)%4];c.seed=hash('L'+c.id);});});
LCHAMP.forEach(c=>{c.region='castle';c.mtype='boss';c.color=PAL.castle[hash(c.id)%4];c.seed=hash('L'+c.id);});
const ALL=[].concat(...REG.map(r=>r.pool.concat(r.gym.pool)),LCHAMP);
ALL.forEach(c=>{if(!c.hints)c.hints=[];if(c.hints.length<2)c.hints.push(c.type==='js'?'Look at the **Example** box — copy its pattern, then change the names and values to match the mission. Check spelling and capitals carefully.':'Look at the **Example** box — your code should follow the same pattern, just with the tags, classes or values the mission asks for.');});
const ALLM=Object.fromEntries(ALL.map(c=>[c.id,c]));
const CHAMP={leader:'Queen Byte',title:'Code Castle',badge:'Legend Crown',icon:'👑',look:L_(1,'#7c3aed','#facc15','#6d28d9','crown'),intro:["Welcome to the Code Castle, {name}. I am Queen Byte.","Seven badges... impressive. But a LEGEND can build anything.","Four final rounds: HTML, CSS, and JavaScript. Begin!"],win:["...Magnificent. You are a true CODELING LEGEND, {name}!","The kingdom will tell stories about you. 👑"]};

/* ---------- themes ---------- */
const TH={
 town:{ground:'#bfe98d',g2:'#b0de7c',path:'#f2dfae',pe:'#dfc68e',tall:'#86c95f',tallD:'#4f9a3a',tree:'round',tA:'#4fa64a',tB:'#7cc96a',water:'#8fd3f7',wD:'#5fb8e6',rock:'#b9b2a6',fl:['#ff6b9a','#ffd166','#ffffff','#a78bfa'],sky:['#dff3ff','#c9eda5'],roof:'#7c5cff'},
 meadow:{ground:'#b5e57c',g2:'#a3d86a',path:'#efd9a0',pe:'#dcc184',tall:'#78c052',tallD:'#469334',tree:'round',tA:'#47a043',tB:'#72c463',water:'#8fd3f7',wD:'#5fb8e6',rock:'#b9b2a6',fl:['#ff6b9a','#ffd166','#ffffff','#fb923c'],sky:['#e0f2ff','#c6eba0'],roof:'#ff7a59'},
 falls:{ground:'#a9e2b8',g2:'#98d6a8',path:'#e9e2c4',pe:'#d4caa3',tall:'#6cc28a',tallD:'#3f9461',tree:'round',tA:'#2f9a63',tB:'#5cc488',water:'#7fd0f5',wD:'#4fb3e6',rock:'#a8b8b2',fl:['#93c5fd','#ffffff','#f0abfc','#fde68a'],sky:['#d7f0ff','#b7e8cc'],roof:'#38bdf8'},
 caves:{ground:'#ece4fb',g2:'#e1d6f6',path:'#faf6ff',pe:'#d9cbf2',tall:'#cdb8f2',tallD:'#9b7ee0',tree:'crystal',tA:'#b18cf2',tB:'#efe4ff',water:'#a5e3f5',wD:'#7fcde8',rock:'#cbbde8',fl:['#f0abfc','#93c5fd','#ffffff','#c4b5fd'],sky:['#f4efff','#e3d8fb'],roof:'#a855f7'},
 bay:{ground:'#f7e6b8',g2:'#f0dba2',path:'#fff4d8',pe:'#e8d39c',tall:'#b9d98a',tallD:'#86b35a',tree:'palm',tA:'#3fae6a',tB:'#7ad69a',water:'#7fd6f2',wD:'#4fbde6',rock:'#d6c3a0',fl:['#fb7185','#fde68a','#ffffff','#fdba74'],sky:['#dbf4ff','#ffeec2'],roof:'#14b8a6'},
 jungle:{ground:'#a2d98f',g2:'#92cc80',path:'#ead9ad',pe:'#d2bd88',tall:'#5fb460',tallD:'#33803d',tree:'jungle',tA:'#2f9a4f',tB:'#5cc070',water:'#88d4e8',wD:'#5bbcd6',rock:'#a7a58f',fl:['#f43f5e','#facc15','#fb923c','#ffffff'],sky:['#e0f7e9','#bfe6a8'],roof:'#22c55e'},
 peaks:{ground:'#f1f6fc',g2:'#e5eef8',path:'#dce7f2',pe:'#c5d5e8',tall:'#cfe1f0',tallD:'#94b8d8',tree:'pine',tA:'#4c8f6a',tB:'#f8fbff',water:'#bfe3f7',wD:'#93cdee',rock:'#c3cfdc',fl:['#ffffff','#bfdbfe','#f9a8d4','#ffffff'],sky:['#eef6ff','#dbe9f7'],roof:'#ec4899'},
 volcano:{ground:'#f6dcc3',g2:'#efcfb0',path:'#fdebd6',pe:'#e8c8a2',tall:'#e8b588',tallD:'#c4844c',tree:'boulder',tA:'#b07a5a',tB:'#d9a07a',water:'#ffb86b',wD:'#ff8f3d',lava:1,rock:'#c08c6c',fl:['#fde68a','#fdba74','#ffffff','#fca5a5'],sky:['#fff1e0','#fbd3b0'],roof:'#ef4444'},
 castle:{ground:'#efe7fb',g2:'#e5daf7',path:'#fff7e0',pe:'#ecd9a8',tall:'#d8c7f5',tallD:'#a78bdb',tree:'round',tA:'#7c9a4a',tB:'#a7c76a',water:'#a5d8f5',wD:'#78c2ec',rock:'#cbbde8',fl:['#facc15','#f0abfc','#ffffff','#fda4af'],sky:['#f5efff','#fdeec8'],roof:'#8b5cf6'}
};

/* ---------- map building ---------- */
const DEC={meadow:[['T',9,14,8,6],['T',22,1,5,2],['T',1,19,6,2],['R',17,13,1,1],['R',27,19,1,1]],
 falls:[['~',9,14,8,6],['~',22,1,5,2],['T',1,19,6,2],['R',17,13,1,1],['R',27,19,1,1],['T',30,1,4,2]],
 caves:[['T',9,14,8,6],['T',22,1,5,2],['T',1,19,6,2],['R',17,13,1,1],['R',27,19,1,1],['R',14,2,2,1]],
 bay:[['~',9,14,8,6],['T',22,1,5,2],['~',1,19,6,2],['R',17,13,1,1],['T',30,1,4,2]],
 jungle:[['T',9,14,8,6],['T',22,1,5,2],['T',1,19,6,2],['T',30,1,4,2],['R',17,13,1,1],['T',33,19,2,2]],
 peaks:[['T',9,14,8,6],['R',22,1,5,2],['T',1,19,6,2],['R',17,13,1,1],['R',27,19,1,1],['T',30,1,4,2]],
 volcano:[['~',9,14,8,6],['R',22,1,5,2],['R',1,19,6,2],['R',17,13,1,1],['R',27,19,1,1],['~',30,1,4,2]]};
function regionDef(R,i){
  const prev=i===0?{to:'town',sx:24,sy:6}:{to:REG[i-1].id,sx:34,sy:10},next=i<REG.length-1?{to:REG[i+1].id,sx:1,sy:10}:{to:'castle',sx:1,sy:8};
  const tr=R.trainers;
  return {id:R.id,name:R.name.toUpperCase(),theme:R.theme,W:36,H:22,region:R.id,seed:hash(R.id),flowers:.05,
    rects:[...DEC[R.id],['w',2,13,5,5],['w',10,7,6,6],['w',22,7,5,6],['w',31,13,4,5]],
    paths:[[[0,10],[7,10],[7,4],[19,4],[19,15],[29,15],[29,10],[35,10]],[[32,9],[32,9]]],
    exits:[{x:0,y:10,...prev},{x:0,y:11,...prev},{x:35,y:10,...next,need:R.id},{x:35,y:11,...next,need:R.id}],
    buildings:[{x:29,y:4,w:6,h:5,kind:'gym',label:'GYM'}],
    objects:[{x:3,y:8,kind:'fountain'},{x:5,y:8,kind:'sign',text:R.sign},
      {x:13,y:3,kind:'trainer',dir:'down',range:3,tid:R.id+':0',...tr[0]},{x:21,y:13,kind:'trainer',dir:'left',range:3,tid:R.id+':1',...tr[1]},
      {x:24,y:14,kind:'npc',...R.npc},
      {x:2,y:3,kind:'chest',cid:R.id+':a',coins:30+i*10},{x:17,y:9,kind:'chest',cid:R.id+':b',item:i%2?'scroll':'potion'},{x:25,y:19,kind:'chest',cid:R.id+':c',coins:50+i*10}],
    heal:[3,9]};
}
const MAPDEFS={
 town:{id:'town',name:'HARBOR TOWN',theme:'town',W:26,H:17,seed:7,flowers:.06,
  rects:[['~',2,10,6,4],['T',20,12,4,3],['T',1,15,24,1]],
  paths:[[[1,6],[24,6]],[[12,6],[12,13]]],
  exits:[{x:25,y:6,to:'meadow',sx:1,sy:10},{x:25,y:7,to:'meadow',sx:1,sy:10}],
  buildings:[{x:2,y:2,w:5,h:4,kind:'home',label:'HOME'},{x:9,y:2,w:6,h:4,kind:'center',label:'CODE CENTER'},{x:17,y:2,w:5,h:4,kind:'shop',label:'SHOP'}],
  objects:[{x:10,y:8,kind:'sign',text:["HARBOR TOWN","Where every Codeling Legend begins.","→ East: Meaning Meadow"]},
   {x:15,y:9,kind:'npc',name:'Professor Lumen',look:L_(0,'#e5e7eb','#ffffff','#475569'),prof:true},
   {x:19,y:10,kind:'npc',name:'Kid Kiko',look:L_(2,'#2b1d14','#facc15','#1d4ed8','cap'),lines:["Did you know your partner EVOLVES when it levels up?","Mine is still a baby. One day it'll have wings!"]},
   {x:8,y:14,kind:'npc',name:'Sailor Nell',look:L_(3,'#c0392b','#ffffff','#1e3a8a','cap'),lines:["The shop sells Hint Scrolls. They give a free hint without losing stars!","And hats. Very important hats."]},
   {x:16,y:12,kind:'fountain'}],
  heal:[12,6]},
 castle:{id:'castle',name:'CODE CASTLE',theme:'castle',W:22,H:16,seed:9,flowers:.08,
  rects:[['T',18,10,3,4],['T',1,12,6,3]],
  paths:[[[0,8],[12,8]]],
  exits:[{x:0,y:8,to:'volcano',sx:34,sy:10},{x:0,y:9,to:'volcano',sx:34,sy:10}],
  buildings:[{x:8,y:2,w:9,h:6,kind:'castle',label:'CODE CASTLE'}],
  objects:[{x:4,y:6,kind:'fountain'},{x:6,y:6,kind:'sign',text:["THE CODE CASTLE","Only trainers with ALL 7 badges may challenge Queen Byte."]},
   {x:15,y:10,kind:'npc',name:'Royal Guard',look:L_(1,'#2b1d14','#6d28d9','#1f2937','crown'),lines:["The Queen tests HTML, CSS AND JavaScript.","Heal at the fountain before you enter!"]}],
  heal:[4,7]}
};
REG.forEach((R,i)=>MAPDEFS[R.id]=regionDef(R,i));
const WALK=new Set(['.',',','w','F','=']);
function buildMap(d){
  const W=d.W,H=d.H,g=[];for(let y=0;y<H;y++)g.push(Array(W).fill('.'));
  const set=(x,y,c)=>{if(x>=0&&y>=0&&x<W&&y<H)g[y][x]=c;};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(!x||!y||x===W-1||y===H-1)g[y][x]='T';
  (d.rects||[]).forEach(([c,x,y,w,h])=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)set(i,j,c);});
  const carve=(x,y)=>{if(x<0||y<0||x>=W||y>=H)return;g[y][x]=g[y][x]==='~'?'=':',';};
  (d.paths||[]).forEach(pl=>{for(let k=0;k<pl.length-1;k++){const[a,b]=pl[k],[c,e]=pl[k+1];
    if(b===e){for(let x=Math.min(a,c);x<=Math.max(a,c)+1;x++){carve(x,b);carve(x,b+1);}}
    else{for(let y=Math.min(b,e);y<=Math.max(b,e)+1;y++){carve(a,y);carve(a+1,y);}}}});
  d.exits.forEach(e=>carve(e.x,e.y));
  const r=rng(d.seed);for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(g[y][x]==='.'&&r()<(d.flowers||0))g[y][x]='F';
  const solid=new Set(),doors={},bmap={};
  (d.buildings||[]).forEach(b=>{for(let j=b.y;j<b.y+b.h;j++)for(let i=b.x;i<b.x+b.w;i++){solid.add(i+','+j);g[j][i]='.';}
    b.door=[b.x+Math.floor(b.w/2),b.y+b.h-1];solid.delete(b.door.join(','));doors[b.door.join(',')]=b;});
  const objs={};(d.objects||[]).forEach(o=>{objs[o.x+','+o.y]=o;if(g[o.y][o.x]!=='.'&&g[o.y][o.x]!=='F')g[o.y][o.x]='.';if(o.kind==='trainer'){o.hx=o.x;o.hy=o.y;o.hdir=o.dir;}});
  const exits={};d.exits.forEach(e=>exits[e.x+','+e.y]=e);
  return Object.assign({},d,{g,solid,doors,objs,exits});
}
const MAPS={};for(const k in MAPDEFS)MAPS[k]=buildMap(MAPDEFS[k]);

/* ---------- people ---------- */
const SKINS=['#ffdbb5','#f1c27d','#c68642','#8d5524'];
const HAIRS=['#2b1d14','#6b4423','#d9a441','#c0392b','#7c3aed','#1f2937','#e5e7eb'];
const SHIRTS=['#ff7a59','#4f8cff','#22c55e','#f5b301','#ec4899','#8b5cf6','#14b8a6','#ef4444'];
const HATS={cap:{n:'Cap',c:60},bandana:{n:'Bandana',c:70},flower:{n:'Flower crown',c:90},headphones:{n:'Headphones',c:120},wizard:{n:'Wizard hat',c:180},crown:{n:'Golden crown',c:300}};
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h);c.fill();}
function circ(c,x,y,r){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
function drawHuman(c,x,y,look,dir,frame,bob){
  const skin=typeof look.skin==='number'?SKINS[look.skin]:look.skin,cx=x+16,yy=y+bob,sw=[0,1,0,-1][frame||0],side=dir==='left'||dir==='right';
  c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(cx,y+29,9,3.2,0,0,7);c.fill();
  c.fillStyle=look.pants||'#3b4a6b';
  if(side){rr(c,cx-4+sw*2,yy+21,4,7,1.5);rr(c,cx+0-sw*2,yy+21,4,7,1.5);}else{rr(c,cx-5,yy+21-(sw>0?1:0),4,7,1.5);rr(c,cx+1,yy+21-(sw<0?1:0),4,7,1.5);}
  c.fillStyle='#2a2840';if(side){c.fillRect(cx-4+sw*2,yy+27,4,1.5);c.fillRect(cx-sw*2,yy+27,4,1.5);}else{c.fillRect(cx-5,yy+27-(sw>0?1:0),4,1.5);c.fillRect(cx+1,yy+27-(sw<0?1:0),4,1.5);}
  c.fillStyle=look.shirt;if(side){rr(c,cx-5,yy+13,10,10,4);}else{rr(c,cx-7,yy+13,14,10,4);}
  c.fillStyle=shade(look.shirt,-.18);if(side){rr(c,cx-1+sw*2.5,yy+14,3.5,8,1.5);}else{rr(c,cx-9,yy+14+sw,3,7,1.5);rr(c,cx+6,yy+14-sw,3,7,1.5);}
  c.fillStyle=skin;if(side){circ(c,cx+.5+sw*2.5,yy+22.5,1.6);}else{circ(c,cx-7.5,yy+21.5+sw,1.6);circ(c,cx+7.5,yy+21.5-sw,1.6);}
  c.fillStyle=skin;circ(c,cx,yy+9,7.5);
  c.fillStyle=look.hair;
  if(dir==='up'){circ(c,cx,yy+8.5,8);}
  else{c.beginPath();c.arc(cx,yy+8,8,Math.PI,0);c.fill();
    if(dir==='down'){c.fillRect(cx-8,yy+7,2.5,5);c.fillRect(cx+5.5,yy+7,2.5,5);c.beginPath();c.moveTo(cx-6,yy+6);c.lineTo(cx-1,yy+9);c.lineTo(cx+4,yy+6);c.fill();}
    else if(dir==='left'){c.fillRect(cx+2,yy+6,6,7);}else{c.fillRect(cx-8,yy+6,6,7);}}
  c.fillStyle='#2a2840';
  if(dir==='down'){circ(c,cx-3,yy+10,1.3);circ(c,cx+3,yy+10,1.3);c.fillStyle='rgba(255,120,140,.45)';circ(c,cx-4.5,yy+12.5,1.4);circ(c,cx+4.5,yy+12.5,1.4);}
  else if(dir==='left')circ(c,cx-3.5,yy+10,1.3);else if(dir==='right')circ(c,cx+3.5,yy+10,1.3);
  const h=look.hat;
  if(h==='cap'){c.fillStyle=look.hatC||'#ef4444';c.beginPath();c.arc(cx,yy+6.5,8,Math.PI,0);c.fill();if(dir==='down')c.fillRect(cx-8,yy+5,16,2.5);else if(dir==='left')c.fillRect(cx-12,yy+5,8,2.5);else if(dir==='right')c.fillRect(cx+4,yy+5,8,2.5);}
  else if(h==='bandana'){c.fillStyle='#ef4444';c.fillRect(cx-8,yy+3.5,16,3.5);c.fillStyle='#fff';c.fillRect(cx-5,yy+4.5,1.5,1.5);c.fillRect(cx+2,yy+4.5,1.5,1.5);}
  else if(h==='flower'){c.fillStyle='#22c55e';c.fillRect(cx-8,yy+2.5,16,2);[['#f472b6',-6],['#facc15',0],['#a78bfa',6]].forEach(([col,o])=>{c.fillStyle=col;circ(c,cx+o,yy+2.5,2.4);});}
  else if(h==='headphones'){c.strokeStyle='#1f2937';c.lineWidth=2;c.beginPath();c.arc(cx,yy+8,9,Math.PI*1.05,Math.PI*1.95);c.stroke();c.fillStyle='#ec4899';if(dir!=='right')rr(c,cx-10.5,yy+7,4,6,1.5);if(dir!=='left')rr(c,cx+6.5,yy+7,4,6,1.5);}
  else if(h==='wizard'){c.fillStyle='#7c3aed';c.beginPath();c.moveTo(cx-10,yy+4);c.lineTo(cx+10,yy+4);c.lineTo(cx+2,yy-12);c.closePath();c.fill();c.fillStyle='#facc15';circ(c,cx+1,yy-3,1.6);c.fillRect(cx-10,yy+3,20,2);}
  else if(h==='crown'){c.fillStyle='#facc15';c.beginPath();c.moveTo(cx-7,yy+3);c.lineTo(cx-7,yy-3);c.lineTo(cx-3.5,yy+0);c.lineTo(cx,yy-5);c.lineTo(cx+3.5,yy+0);c.lineTo(cx+7,yy-3);c.lineTo(cx+7,yy+3);c.closePath();c.fill();c.fillStyle='#ef4444';circ(c,cx,yy-1,1.2);}
}

/* ---------- state ---------- */
const STARTERS=[{n:['Tagpup','Tagwolf','Tagnarok'],color:'#ff8a5b',type:'html',seed:101,d:'Loves HTML tags'},{n:['Stylefin','Styleray','Stylethian'],color:'#4f8cff',type:'sel',seed:202,d:'Loves CSS styling'},{n:['Scriptail','Scriptazard','Scriptagon'],color:'#22c55e',type:'js',seed:303,d:'Loves JavaScript'}];
const fresh=()=>({started:false,name:'',look:{skin:0,hair:'#2b1d14',shirt:'#4f8cff',hat:''},partner:0,map:'town',x:12,y:8,dir:'down',hp:70,xp:0,coins:50,caught:{},badges:{},trainers:{},chests:{},gym:{},bag:{potion:2,scroll:1},hats:{},visited:{town:1},heal:{map:'town',x:12,y:6},champion:false});
let S=fresh();
const load=()=>{const o=store.get(Q2KEY,null);if(!o||!o.started)return null;const f=fresh();const s=Object.assign(f,o);['caught','badges','trainers','chests','gym','bag','hats','visited','look','heal'].forEach(k=>{if(!s[k]||typeof s[k]!=='object')s[k]=f[k];});if(!MAPS[s.map]){s.map='town';s.x=12;s.y=8;}return s;};
const save=()=>store.set(Q2KEY,S);
const lvl=()=>1+Math.floor(Math.sqrt(S.xp/15));
const maxHP=()=>60+lvl()*8;
const stage=()=>lvl()>=12?3:lvl()>=6?2:1;
const pName=()=>STARTERS[S.partner].n[stage()-1];
const badgeCount=()=>REG.filter(r=>S.badges[r.id]).length;
const tamed=pool=>pool.filter(c=>S.caught[c.id]).length;
const fill=s=>s.replace(/\{name\}/g,S.name||'Trainer');
const partnerSVG=(size=120,st=stage())=>monSVG(STARTERS[S.partner].seed,STARTERS[S.partner].color,TYPES[STARTERS[S.partner].type].icon,size,st);
const monFor=(c,size=120)=>monSVG(c.seed,c.color,(TYPES[c.mtype]||TYPES.html).icon,size,c.mtype==='boss'?3:1);

/* ---------- canvas & static layer ---------- */
const cv=$('#lgCv'),ctx=cv.getContext('2d');ctx.scale(2,2);ctx.imageSmoothingEnabled=true;
function fit(){const small=innerWidth<600,nw=small?12:20,nh=small?12:14;if(nw!==VW||nh!==VH){VW=nw;VH=nh;cv.width=VW*T*2;cv.height=VH*T*2;ctx.setTransform(2,0,0,2,0,0);}}
addEventListener('resize',()=>{if(CURRENT==='quest2')fit();});
let CUR=MAPS.town,STATIC=null;
function treeAt(c,x,y,th,style,seed){
  const px=x*T,py=y*T,r=rng(seed);
  if(style==='crystal'){c.fillStyle='rgba(80,40,140,.12)';c.beginPath();c.ellipse(px+16,py+28,12,4,0,0,7);c.fill();
    [[16,4,8,26],[8,12,6,18],[24,10,6,20]].forEach(([cx,top,w,h],i)=>{c.fillStyle=i?th.tA:shade(th.tA,-.1);c.beginPath();c.moveTo(px+cx,py+top);c.lineTo(px+cx+w/2,py+top+h*0.3);c.lineTo(px+cx+w/2-1,py+top+h);c.lineTo(px+cx-w/2+1,py+top+h);c.lineTo(px+cx-w/2,py+top+h*0.3);c.closePath();c.fill();c.fillStyle=th.tB;c.globalAlpha=.7;c.fillRect(px+cx-1,py+top+4,2,h*0.5);c.globalAlpha=1;});return;}
  if(style==='palm'){c.fillStyle='rgba(0,0,0,.12)';c.beginPath();c.ellipse(px+16,py+29,10,3.5,0,0,7);c.fill();c.strokeStyle='#a16207';c.lineWidth=4;c.beginPath();c.moveTo(px+16,py+29);c.quadraticCurveTo(px+20,py+18,px+15,py+8);c.stroke();
    c.fillStyle=th.tA;for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*0.7;c.beginPath();c.ellipse(px+15+Math.cos(a)*8,py+8+Math.sin(a)*5,9,3.5,a,0,7);c.fill();}c.fillStyle='#92400e';circ(c,px+14,py+10,2);circ(c,px+18,py+10,2);return;}
  if(style==='pine'){c.fillStyle='rgba(0,0,0,.12)';c.beginPath();c.ellipse(px+16,py+29,10,3.5,0,0,7);c.fill();c.fillStyle='#7c5a3a';c.fillRect(px+14,py+23,4,6);
    [[2,24,12],[6,18,10],[10,12,8]].forEach(([top,w,h])=>{c.fillStyle=th.tA;c.beginPath();c.moveTo(px+16,py+top);c.lineTo(px+16+w/2+2,py+top+h+6);c.lineTo(px+16-w/2-2,py+top+h+6);c.closePath();c.fill();c.fillStyle=th.tB;c.beginPath();c.moveTo(px+16,py+top);c.lineTo(px+16+4,py+top+5);c.lineTo(px+16-4,py+top+5);c.closePath();c.fill();});return;}
  if(style==='boulder'){c.fillStyle='rgba(0,0,0,.14)';c.beginPath();c.ellipse(px+16,py+28,13,4,0,0,7);c.fill();c.fillStyle=th.tA;c.beginPath();c.ellipse(px+16,py+18,13,11,0,0,7);c.fill();c.fillStyle=th.tB;c.beginPath();c.ellipse(px+12,py+14,6,4,-.4,0,7);c.fill();c.strokeStyle=shade(th.tA,-.25);c.lineWidth=1.2;c.beginPath();c.moveTo(px+18,py+10);c.lineTo(px+21,py+18);c.lineTo(px+17,py+24);c.stroke();return;}
  c.fillStyle='rgba(0,0,0,.13)';c.beginPath();c.ellipse(px+16,py+29,12,4,0,0,7);c.fill();c.fillStyle='#8b5a2b';c.fillRect(px+13,py+19,6,10);
  const big=style==='jungle';c.fillStyle=shade(th.tA,-.12);circ(c,px+16,py+15,big?15:13.5);c.fillStyle=th.tA;circ(c,px+15,py+13,big?13:12);c.fillStyle=th.tB;circ(c,px+11,py+9,big?6:5);circ(c,px+20,py+12,big?3.5:3);
  if(big){c.strokeStyle='#15803d';c.lineWidth=1.5;c.beginPath();c.moveTo(px+6,py+18);c.quadraticCurveTo(px+4,py+26,px+8,py+30);c.stroke();}
}
function bldg(c,b,th){
  const x=b.x*T,y=b.y*T,w=b.w*T,h=b.h*T;
  const roofs={home:'#e5484d',center:'#ff6b9a',shop:'#4f8cff',gym:th.roof,castle:'#8b5cf6',house:'#f59e0b'};const roof=roofs[b.kind]||'#f59e0b';
  c.fillStyle='rgba(0,0,0,.15)';rr(c,x+4,y+h-6,w-4,8,4);
  if(b.kind==='castle'){c.fillStyle='#f1ecfb';c.fillRect(x+8,y+28,w-16,h-28);c.fillStyle='#e2d9f5';[x+2,x+w-30].forEach(tx=>{c.fillRect(tx,y+10,28,h-10);for(let k=0;k<3;k++)c.fillRect(tx+k*10,y+4,7,8);});
    c.fillStyle=roof;[x+16,x+w-16].forEach(tx=>{c.beginPath();c.moveTo(tx-16,y+12);c.lineTo(tx,y-14);c.lineTo(tx+16,y+12);c.fill();});c.fillStyle='#facc15';c.fillRect(x+w/2-1,y-8,2,26);c.beginPath();c.moveTo(x+w/2+1,y-8);c.lineTo(x+w/2+14,y-3);c.lineTo(x+w/2+1,y+2);c.fill();
    c.fillStyle='#cbbde8';for(let k=0;k<6;k++)c.fillRect(x+40+k*((w-80)/5),y+20,8,8);c.fillStyle='#bfe6ff';[[x+44,y+50],[x+w-62,y+50]].forEach(([wx,wy])=>{rr(c,wx,wy,18,22,8);});}
  else{c.fillStyle='#fffaf0';c.fillRect(x+2,y+h*0.42,w-4,h*0.58);c.fillStyle='rgba(0,0,0,.06)';c.fillRect(x+2,y+h-5,w-4,5);
    c.fillStyle=roof;c.beginPath();c.moveTo(x-4,y+h*0.46);c.lineTo(x+10,y+4);c.lineTo(x+w-10,y+4);c.lineTo(x+w+4,y+h*0.46);c.closePath();c.fill();
    c.fillStyle='rgba(255,255,255,.22)';for(let k=x+14;k<x+w-14;k+=12)c.fillRect(k,y+10,5,h*0.32);c.fillStyle=shade(roof,-.2);c.fillRect(x-4,y+h*0.44,w+8,4);
    c.fillStyle='#2a2840';for(let k=0;k<b.w;k++){const wx=x+k*T+8;if(k===Math.floor(b.w/2))continue;c.fillStyle='#2a2840';rr(c,wx,y+h*0.55,16,13,3);c.fillStyle='#bfe6ff';rr(c,wx+2,y+h*0.55+2,12,9,2);c.fillStyle='#fff';c.fillRect(wx+3,y+h*0.55+3,3,2);}}
  const dx=b.door[0]*T,dy=b.door[1]*T;c.fillStyle='#7a4a2a';rr(c,dx+7,dy+6,18,26,5);c.fillStyle='#5b351c';rr(c,dx+9,dy+8,14,24,4);c.fillStyle='#f5b301';circ(c,dx+20,dy+21,1.8);
  if(b.label){c.font='bold 9px Nunito, sans-serif';const tw=c.measureText(b.label).width+12;c.fillStyle='#2a2840';rr(c,x+w/2-tw/2,y+h*0.25-7,tw,14,4);c.fillStyle='#fff';c.textAlign='center';c.fillText(b.label,x+w/2,y+h*0.25+3);}
  if(b.kind==='gym'){c.fillStyle='#facc15';c.beginPath();c.arc(x+w/2,y+h*0.25-16,6,0,7);c.fill();c.fillStyle='#fff';c.font='bold 8px sans-serif';c.textAlign='center';c.fillText('★',x+w/2,y+h*0.25-13);}
}
function buildStatic(M){
  const th=TH[M.theme],cn=document.createElement('canvas');cn.width=M.W*T*2;cn.height=M.H*T*2;const c=cn.getContext('2d');c.scale(2,2);
  const at=(x,y)=>(M.g[y]&&M.g[y][x])||'T';
  for(let y=0;y<M.H;y++)for(let x=0;x<M.W;x++){const px=x*T,py=y*T,t=at(x,y),r=rng(hash(M.id+x+':'+y));
    c.fillStyle=th.ground;c.fillRect(px,py,T,T);
    for(let k=0;k<3;k++){c.fillStyle=th.g2;c.fillRect(px+Math.floor(r()*28),py+Math.floor(r()*28),3,2);}
    if(t===','||t==='='){if(t===','){c.fillStyle=th.path;c.fillRect(px,py,T,T);c.fillStyle=th.pe;
        const isP=(a,b)=>{const q=at(a,b);return q===','||q==='=';};
        if(!isP(x,y-1))c.fillRect(px,py,T,2);if(!isP(x,y+1))c.fillRect(px,py+T-2,T,2);if(!isP(x-1,y))c.fillRect(px,py,2,T);if(!isP(x+1,y))c.fillRect(px+T-2,py,2,T);
        c.fillStyle='rgba(120,90,40,.10)';if(r()<.5)rr(c,px+6+r()*16,py+6+r()*16,4,3,1.5);}
      else{c.fillStyle=th.water;c.fillRect(px,py,T,T);c.fillStyle='#b07a4a';c.fillRect(px,py+3,T,T-6);c.fillStyle='#8a5a32';for(let k=0;k<T;k+=8)c.fillRect(px+k,py+3,1.5,T-6);c.fillStyle='#6b4423';c.fillRect(px,py+3,T,2);c.fillRect(px,py+T-5,T,2);}}
    else if(t==='~'){c.fillStyle=th.water;c.fillRect(px,py,T,T);c.fillStyle=th.wD;const W2=(a,b)=>{const q=at(a,b);return q==='~'||q==='=';};
      if(!W2(x,y-1))c.fillRect(px,py,T,3);if(!W2(x-1,y))c.fillRect(px,py,3,T);if(!W2(x+1,y))c.fillRect(px+T-3,py,3,T);if(!W2(x,y+1))c.fillRect(px,py+T-3,T,3);}
    else if(t==='w'){c.fillStyle=th.tall;rr(c,px+1,py+1,T-2,T-2,6);}
    else if(t==='F'){th.fl.forEach((col,i)=>{if(r()<.75){const fx=px+5+r()*22,fy=py+5+r()*22;c.fillStyle=col;circ(c,fx,fy,2.6);c.fillStyle='#f59e0b';circ(c,fx,fy,1);}});}
    else if(t==='R'){c.fillStyle='rgba(0,0,0,.12)';c.beginPath();c.ellipse(px+16,py+26,11,4,0,0,7);c.fill();c.fillStyle=th.rock;c.beginPath();c.ellipse(px+16,py+18,12,10,0,0,7);c.fill();c.fillStyle=shade(th.rock,.35);c.beginPath();c.ellipse(px+12,py+14,5,3.5,-.4,0,7);c.fill();}
  }
  for(let y=0;y<M.H;y++)for(let x=0;x<M.W;x++)if(at(x,y)==='T')treeAt(c,x,y,th,th.tree,hash(M.id+'t'+x+':'+y));
  (M.buildings||[]).forEach(b=>bldg(c,b,th));
  Object.values(M.objs).forEach(o=>{const px=o.x*T,py=o.y*T;
    if(o.kind==='sign'){c.fillStyle='#8b5a2b';c.fillRect(px+14,py+16,4,13);c.fillStyle='#d9a066';rr(c,px+4,py+5,24,14,3);c.fillStyle='#8b5a2b';c.fillRect(px+8,py+9,16,2);c.fillRect(px+8,py+13,11,2);}
    if(o.kind==='fountain'){c.fillStyle='rgba(0,0,0,.12)';c.beginPath();c.ellipse(px+16,py+27,14,4,0,0,7);c.fill();c.fillStyle='#cbd5e1';c.beginPath();c.ellipse(px+16,py+22,14,7,0,0,7);c.fill();c.fillStyle='#93d5f5';c.beginPath();c.ellipse(px+16,py+21,11,4.5,0,0,7);c.fill();c.fillStyle='#e2e8f0';c.fillRect(px+14,py+8,4,13);}
  });
  return cn;
}

/* ---------- world runtime ---------- */
const P={vx:12,vy:8},FOL={x:12,y:9,vx:12,vy:9,dir:'down'};let mv=null,held=null,mode='title',steps=0,parts=[],walkT=0,exclaim=null,lastPos=null;
const tileAt=(x,y)=>(CUR.g[y]&&CUR.g[y][x])||'T';
const objAt=(x,y)=>{const o=CUR.objs[x+','+y];if(o)return o;return Object.values(CUR.objs).find(q=>q.kind==='trainer'&&q.x===x&&q.y===y&&(q.hx!==x||q.hy!==y))||null;};
const trainerObj=()=>Object.values(CUR.objs).filter(o=>o.kind==='trainer');
function blocked(x,y){if(x<0||y<0||x>=CUR.W||y>=CUR.H)return true;const k=x+','+y;if(CUR.solid.has(k))return true;if(!WALK.has(tileAt(x,y))&&!CUR.doors[k])return true;
  const o=CUR.objs[k];if(o&&!(o.kind==='trainer'&&(o.x!==x||o.y!==y)))return true;if(trainerObj().some(t=>t.x===x&&t.y===y))return true;return false;}
function goMap(id,x,y){CUR=MAPS[id];S.map=id;S.x=x;S.y=y;P.vx=x;P.vy=y;FOL.x=FOL.vx=x;FOL.y=FOL.vy=y;{const b=[[0,1],[-1,0],[1,0],[0,-1]].find(([dx,dy])=>!blocked(x+dx,y+dy)&&!CUR.exits[(x+dx)+','+(y+dy)]&&!CUR.doors[(x+dx)+','+(y+dy)]);if(b){FOL.x=FOL.vx=x+b[0];FOL.y=FOL.vy=y+b[1];}}mv=null;S.visited[id]=1;
  trainerObj().forEach(t=>{t.x=t.hx;t.y=t.hy;t.dir=t.hdir;t.anim=null;});STATIC=buildStatic(CUR);save();banner(CUR.name);hud();}
function fade(fn){const f=$('#lgFlash');f.className='';void f.offsetWidth;f.className='fade';mode='busy';setTimeout(fn,220);setTimeout(()=>{if(mode==='busy')mode='walk';},460);}
let bT;function banner(t){const b=$('#lgBanner');b.textContent=t;b.classList.add('show');clearTimeout(bT);bT=setTimeout(()=>b.classList.remove('show'),1800);}
const DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
function step(dir){S.dir=dir;const[dx,dy]=DIRS[dir],nx=S.x+dx,ny=S.y+dy;if(blocked(nx,ny))return;lastPos=[S.x,S.y];mv={sx:S.x,sy:S.y,p:0};FOL.tx=S.x;FOL.ty=S.y;FOL.sx=FOL.x;FOL.sy=FOL.y;S.x=nx;S.y=ny;}
function stepBack(){if(!lastPos)return;S.x=lastPos[0];S.y=lastPos[1];P.vx=S.x;P.vy=S.y;}
function arrive(){
  const k=S.x+','+S.y,ex=CUR.exits[k];
  if(ex){held=null;if(ex.need&&!S.badges[ex.need]){const R=REGM[ex.need];stepBack();say([`🚧 The gate is locked!`,`Beat ${R.gym.leader} at the ${R.gym.title} to open it.`,R.pool.length>tamed(R.pool)?`First, tame all the Codelings here (${tamed(R.pool)}/${R.pool.length}).`:`You've tamed everyone here — the gym is the big building!`],null,'Gate');return;}
    fade(()=>goMap(ex.to,ex.sx,ex.sy));return;}
  const b=CUR.doors[k];if(b){held=null;S.y+=1;P.vy=S.y;enter(b);return;}
  if(checkTrainers())return;
  const t=tileAt(S.x,S.y);
  if(t==='w'){steps++;for(let i=0;i<4;i++)parts.push({x:S.x*T+16,y:S.y*T+22,vx:(Math.random()-.5)*1.2,vy:-Math.random()*1.4,life:24,col:TH[CUR.theme].tallD,s:2.2});
    if(CUR.region&&steps>=3&&Math.random()<.2){held=null;steps=0;encounter();}}
  else if(Math.random()<.35)parts.push({x:S.x*T+16,y:S.y*T+28,vx:(Math.random()-.5)*.6,vy:-.3,life:14,col:'rgba(160,140,110,.5)',s:2});
}
function update(dt){
  if(mv){mv.p+=dt/150;walkT+=dt;if(mv.p>=1){mv=null;P.vx=S.x;P.vy=S.y;FOL.x=FOL.tx;FOL.y=FOL.ty;FOL.vx=FOL.x;FOL.vy=FOL.y;FOL.dir=S.dir;arrive();}
    else{P.vx=mv.sx+(S.x-mv.sx)*mv.p;P.vy=mv.sy+(S.y-mv.sy)*mv.p;FOL.vx=FOL.sx+(FOL.tx-FOL.sx)*mv.p;FOL.vy=FOL.sy+(FOL.ty-FOL.sy)*mv.p;}}
  if(!mv&&mode==='walk'&&held)step(held);
  trainerObj().forEach(t=>{if(t.anim){t.anim.p+=dt/170;if(t.anim.p>=1){t.x=t.anim.tx;t.y=t.anim.ty;const nx=t.anim;t.anim=null;nx.done&&nx.done();}}});
  parts=parts.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.05;return --p.life>0;});
}
function draw(t){
  const th=TH[CUR.theme],W=CUR.W*T,H=CUR.H*T;
  let cx=P.vx*T+16-VW*T/2,cy=P.vy*T+16-VH*T/2;cx=Math.max(0,Math.min(W-VW*T,cx));cy=Math.max(0,Math.min(H-VH*T,cy));
  if(W<VW*T)cx=(W-VW*T)/2;if(H<VH*T)cy=(H-VH*T)/2;cx=Math.round(cx);cy=Math.round(cy);
  ctx.fillStyle=th.tA;ctx.fillRect(0,0,VW*T,VH*T);
  if(STATIC)ctx.drawImage(STATIC,cx*2,cy*2,VW*T*2,VH*T*2,0,0,VW*T,VH*T);
  ctx.save();ctx.translate(-cx,-cy);
  const x0=Math.max(0,Math.floor(cx/T)),y0=Math.max(0,Math.floor(cy/T)),x1=Math.min(CUR.W-1,x0+VW+1),y1=Math.min(CUR.H-1,y0+VH+1);
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const c=tileAt(x,y),px=x*T,py=y*T;
    if(c==='~'){ctx.strokeStyle=th.lava?'rgba(255,240,200,.7)':'rgba(255,255,255,.7)';ctx.lineWidth=1.6;const o=(t/320+x*.7+y*1.3)%6;
      ctx.beginPath();ctx.moveTo(px+5,py+12+o*.4);ctx.quadraticCurveTo(px+10,py+9+o*.4,px+15,py+12+o*.4);ctx.stroke();ctx.beginPath();ctx.moveTo(px+17,py+23-o*.4);ctx.quadraticCurveTo(px+22,py+20-o*.4,px+27,py+23-o*.4);ctx.stroke();
      if(th.lava&&((x*7+y*3+Math.floor(t/600))%11===0)){ctx.fillStyle='rgba(255,220,120,.8)';circ(ctx,px+16,py+16,2.5);}}
    else if(c==='w'){const sw=Math.sin(t/420+x*.9+y*.6)*1.6;const near=Math.abs(x-P.vx)<1.2&&Math.abs(y-P.vy)<1.2;ctx.fillStyle=th.tallD;
      for(const[ox,oy]of[[4,12],[13,5],[22,13],[8,23],[19,24]]){const s2=sw+(near?Math.sin(t/60)*1.2:0);ctx.beginPath();ctx.moveTo(px+ox,py+oy+7);ctx.lineTo(px+ox+3+s2,py+oy-4);ctx.lineTo(px+ox+6.5,py+oy+7);ctx.fill();}}}
  // exit gates
  Object.values(CUR.exits).forEach(e=>{if(e.need&&!S.badges[e.need]){const px=e.x*T,py=e.y*T;ctx.fillStyle='#8b5a2b';ctx.fillRect(px+4,py+4,4,26);ctx.fillRect(px+24,py+4,4,26);ctx.fillStyle='#d9a066';ctx.fillRect(px+2,py+9,28,5);ctx.fillRect(px+2,py+19,28,5);}});
  // sprites sorted by y
  const L=[];
  Object.values(CUR.objs).forEach(o=>{
    if(o.kind==='chest'){L.push({y:o.y,f:()=>{const px=o.x*T,py=o.y*T,open=!!S.chests[o.cid];ctx.fillStyle='rgba(0,0,0,.15)';ctx.beginPath();ctx.ellipse(px+16,py+28,11,3.5,0,0,7);ctx.fill();
      ctx.fillStyle='#b45309';rr(ctx,px+6,py+14,20,13,3);ctx.fillStyle=open?'#78350f':'#d97706';rr(ctx,px+6,py+(open?8:10),20,open?6:8,3);ctx.fillStyle='#facc15';ctx.fillRect(px+14,py+15,4,5);
      if(!open&&Math.sin(t/300+o.x)>0.6){ctx.fillStyle='#fff';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('✦',px+27,py+9);}}});}
    if(o.kind==='fountain'){L.push({y:o.y,f:()=>{const px=o.x*T,py=o.y*T;for(let k=0;k<4;k++){const a=(t/500+k*1.6)%1;ctx.fillStyle=`rgba(147,213,245,${1-a})`;circ(ctx,px+16+Math.sin(k*2)*6*a,py+8-6*Math.sin(a*Math.PI)+a*10,1.8);}ctx.fillStyle='#fff';ctx.font='9px sans-serif';ctx.textAlign='center';if(Math.sin(t/400)>.7)ctx.fillText('💗',px+16,py+2);}});}
    if(o.kind==='npc'){L.push({y:o.y,f:()=>{drawHuman(ctx,o.x*T,o.y*T,o.look,o.face||'down',0,Math.sin(t/500+o.x)>0.92?-1:0);if(o.prof&&!S.visited.meadow){ctx.fillStyle='#ff7a59';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillText('!',o.x*T+16,o.y*T-3+Math.sin(t/200)*2);}}});}
  });
  trainerObj().forEach(o=>{let x=o.x,y=o.y;if(o.anim){x=o.anim.sx+(o.anim.tx-o.anim.sx)*o.anim.p;y=o.anim.sy+(o.anim.ty-o.anim.sy)*o.anim.p;}
    L.push({y,f:()=>{drawHuman(ctx,x*T,y*T,o.look,o.dir,o.anim?Math.floor(o.anim.p*4)%4:0,0);
      if(!S.trainers[o.tid]){ctx.fillStyle='rgba(255,122,89,.9)';ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.fillText('⚔',x*T+16,y*T-2);}
      if(exclaim&&exclaim.o===o){ctx.fillStyle='#fff';rr(ctx,x*T+9,y*T-20,14,16,4);ctx.fillStyle='#e5484d';ctx.font='bold 13px sans-serif';ctx.fillText('!',x*T+16,y*T-7);}}});});
  const look=Object.assign({pants:'#3b4a6b'},S.look);const fr=mv?Math.floor(walkT/80)%4:0;
  const fimg=svgImg('p'+S.partner+'s'+stage(),partnerSVG(64));
  L.push({y:FOL.vy-.01,f:()=>{const bob=mv?Math.abs(Math.sin(walkT/90))*-2:Math.sin(t/400)*-1;ctx.fillStyle='rgba(0,0,0,.16)';ctx.beginPath();ctx.ellipse(FOL.vx*T+16,FOL.vy*T+28,8,3,0,0,7);ctx.fill();if(fimg.complete)ctx.drawImage(fimg,FOL.vx*T+1,FOL.vy*T+bob,30,30);}});
  L.push({y:P.vy,f:()=>{drawHuman(ctx,P.vx*T,P.vy*T,look,S.dir,fr,mv&&fr%2?-1:0);
    if(tileAt(Math.round(P.vx),Math.round(P.vy))==='w'){ctx.fillStyle=th.tall;const px=Math.round(P.vx)*T,py=Math.round(P.vy)*T;rr(ctx,px+4,py+22,24,9,4);ctx.fillStyle=th.tallD;for(const ox of[6,12,18,24]){ctx.beginPath();ctx.moveTo(px+ox-2,py+30);ctx.lineTo(px+ox,py+20);ctx.lineTo(px+ox+2,py+30);ctx.fill();}}}});
  L.sort((a,b)=>a.y-b.y).forEach(s=>s.f());
  parts.forEach(p=>{ctx.globalAlpha=Math.min(1,p.life/12);ctx.fillStyle=p.col;ctx.fillRect(p.x,p.y,p.s,p.s);ctx.globalAlpha=1;});
  ctx.restore();
}
let lastT=performance.now();
function loop(t){const dt=Math.min(50,t-lastT);lastT=t;if(CURRENT==='quest2'){update(dt);draw(t);}requestAnimationFrame(loop);}

/* ---------- dialog ---------- */
let dlg=null;
function say(lines,done,who=''){mode='dialog';held=null;dlg={lines:lines.map(fill),i:0,done,typing:false,timer:null};$('#lgWho').textContent=who;$('#lgWho').style.display=who?'':'none';$('#lgDialog').classList.remove('hidden');typeLine();}
function typeLine(){const el=$('#lgText'),s=dlg.lines[dlg.i];let n=0;dlg.typing=true;el.textContent='';clearInterval(dlg.timer);dlg.timer=setInterval(()=>{n+=2;el.textContent=s.slice(0,n);if(n>=s.length){clearInterval(dlg.timer);dlg.typing=false;}},16);}
function advance(){if(!dlg)return;if(dlg.typing){clearInterval(dlg.timer);$('#lgText').textContent=dlg.lines[dlg.i];dlg.typing=false;return;}
  dlg.i++;if(dlg.i<dlg.lines.length){typeLine();return;}const d=dlg.done;dlg=null;$('#lgDialog').classList.add('hidden');mode='walk';if(d)d();}

/* ---------- interaction ---------- */
function interact(){
  if(mode==='dialog'){advance();return;}if(mode!=='walk'||mv)return;
  const[dx,dy]=DIRS[S.dir],fx=S.x+dx,fy=S.y+dy;const o=objAt(fx,fy);if(!o)return;
  if(o.kind==='npc'){o.face={up:'down',down:'up',left:'right',right:'left'}[S.dir];if(o.prof){profTalk();return;}say(o.lines,()=>{o.face=null;},o.name);return;}
  if(o.kind==='sign'){say(o.text,null,'Sign');return;}
  if(o.kind==='fountain'){S.hp=maxHP();S.heal={map:CUR.id,x:S.x,y:S.y};save();hud();say(["💗 You drink from the healing fountain.",`${pName()} is fully healed! (Game saved.)`]);return;}
  if(o.kind==='chest'){if(S.chests[o.cid]){say(["The chest is empty."]);return;}S.chests[o.cid]=1;
    if(o.coins){S.coins+=o.coins;for(let i=0;i<10;i++)parts.push({x:fx*T+16,y:fy*T+12,vx:(Math.random()-.5)*2,vy:-Math.random()*2.2,life:30,col:'#facc15',s:3});save();hud();say([`✨ You found ${o.coins} coins!`]);}
    else{S.bag[o.item]=(S.bag[o.item]||0)+1;save();hud();say([`✨ You found a ${o.item==='potion'?'🧪 Potion':'📜 Hint Scroll'}!`]);}return;}
  if(o.kind==='trainer'){if(S.trainers[o.tid]){say(o.after,null,o.name);return;}o.dir={up:'down',down:'up',left:'right',right:'left'}[S.dir];startTrainer(o);}
}
function profTalk(){
  const b=badgeCount();
  if(S.champion)return say(["A true Codeling LEGEND! I'm so proud, {name}.","Keep training — rematch wild Codelings in any tall grass to keep your skills sharp."],null,'Professor Lumen');
  if(!S.visited.meadow)return say(["Ah, {name}! Ready for your adventure?",`Head EAST to Meaning Meadow. Walk through the tall grass to meet wild Codelings.`,"You tame them by writing real code. Use Hints when you're stuck — that's what they're for!"],null,'Professor Lumen');
  const next=REG.find(r=>!S.badges[r.id]);
  say([`${b} badge${b===1?'':'s'} already! Wonderful.`,next?`Your next challenge: ${next.name}. Tame its Codelings, then beat ${next.gym.leader}.`:"All 7 badges! The Code Castle waits beyond Script Volcano."],null,'Professor Lumen');
}
function enter(b){
  if(b.kind==='home'||b.kind==='center'){S.hp=maxHP();S.heal={map:CUR.id,x:S.x,y:S.y};save();hud();say(b.kind==='home'?["🏠 Home sweet home. You take a nap...",`${pName()} is fully healed! (Game saved.)`]:["💗 Welcome to the Code Center!",`${pName()} is fully healed and your game is saved.`],null,b.kind==='home'?'Home':'Nurse Pixel');return;}
  if(b.kind==='shop'){openShop();return;}
  if(b.kind==='gym'){tryGym(REGM[CUR.region]);return;}
  if(b.kind==='castle'){tryChampion();return;}
}
function checkTrainers(){
  for(const o of trainerObj()){if(S.trainers[o.tid]||o.anim)continue;const[dx,dy]=DIRS[o.dir];
    for(let k=1;k<=o.range;k++){const x=o.x+dx*k,y=o.y+dy*k;if(x===S.x&&y===S.y){spotted(o,k);return true;}if(blocked(x,y)&&!(x===S.x&&y===S.y))break;}}
  return false;}
function spotted(o,dist){held=null;mode='busy';exclaim={o};
  setTimeout(()=>{exclaim=null;const[dx,dy]=DIRS[o.dir];const walk=(n)=>{if(n<=1){S.dir={up:'down',down:'up',left:'right',right:'left'}[o.dir];startTrainer(o);return;}o.anim={sx:o.x,sy:o.y,tx:o.x+dx,ty:o.y+dy,p:0,done:()=>walk(n-1)};};walk(dist);},700);}
function startTrainer(o){mode='busy';say(o.lines,()=>openBattle({kind:'trainer',trainer:o,region:CUR.region}),o.name);}
function encounter(){const R=REGM[CUR.region],un=R.pool.filter(c=>!S.caught[c.id]);const review=!un.length;const c=review?R.pool[Math.floor(Math.random()*R.pool.length)]:un[0];
  const f=$('#lgFlash');f.className='';void f.offsetWidth;f.className='go';mode='busy';$('#lgStage').classList.add('shake');setTimeout(()=>$('#lgStage').classList.remove('shake'),400);
  setTimeout(()=>openBattle({kind:'wild',ids:[c.id],review,region:R.id}),650);}
function tryGym(R){const g=R.gym;
  if(S.badges[R.id])return say([`You already have the ${g.badge}, {name}!`,"Want a rematch? Wild Codelings in the grass are great practice."],null,g.leader);
  const n=tamed(R.pool);if(n<R.pool.length)return say([`Not so fast! Tame every Codeling in ${R.name} first.`,`You've tamed ${n} of ${R.pool.length}. Explore the tall grass!`],null,g.leader);
  say(g.intro,()=>openBattle({kind:'gym',region:R.id,ids:g.pool.map(c=>c.id),start:S.gym[R.id]||0}),g.leader);}
function tryChampion(){if(badgeCount()<7)return say([`The castle doors are sealed.`,`You need all 7 badges. You have ${badgeCount()}.`],null,'Royal Guard');
  if(S.champion)return say(["Queen Byte salutes you, Legend!","(You can rematch the Queen any time — come back inside.)"],()=>say(CHAMP.intro,()=>openBattle({kind:'champ',region:'castle',ids:LCHAMP.map(c=>c.id),start:0}),CHAMP.leader),'Royal Guard');
  say(CHAMP.intro,()=>openBattle({kind:'champ',region:'castle',ids:LCHAMP.map(c=>c.id),start:S.gym.castle||0}),CHAMP.leader);}

/* ---------- HUD & goal ---------- */
function goalText(){
  if(S.champion)return '👑 You are a Codeling LEGEND! Find every chest, beat every trainer and collect all the hats.';
  if(CUR.id==='town'||CUR.id==='castle'){const next=REG.find(r=>!S.badges[r.id]);if(!next)return CUR.id==='castle'?'👑 Enter the Code Castle and challenge Queen Byte!':'👑 Travel east through every region to the Code Castle!';return `🎯 Head east to ${next.name}.`;}
  const R=REGM[CUR.region],n=tamed(R.pool);
  if(n<R.pool.length)return `🎯 Tame Codelings in the tall grass 🌿 — ${n}/${R.pool.length} tamed`;
  if(!S.badges[R.id])return `🏟️ Enter the GYM (big building) and beat ${R.gym.leader}!`;
  const i=REG.indexOf(R);return i<REG.length-1?`✅ Badge won! Head east to ${REG[i+1].name}.`:'✅ Head east to the Code Castle!';
}
function hud(){if(!S.started)return;S.hp=Math.min(S.hp,maxHP());
  $('#lgName').textContent='🧑 '+S.name;$('#lgLv').textContent=`${pName()} · Lv ${lvl()}`;$('#lgHp').style.width=(S.hp/maxHP()*100)+'%';$('#lgHp').style.background=S.hp/maxHP()<.3?'var(--bad)':'var(--good)';
  $('#lgCoins').textContent=`🪙 ${S.coins}`;$('#lgBadges').textContent=`🏅 ${badgeCount()}/7`;$('#lgGoal').textContent=goalText();}

/* ---------- battle ---------- */
let BT=null;
const bx=$('#lgBattle');
function bmsg(t){$('.bmsg',bx).textContent=t;}
function setHP(){const m=maxHP();$('.lgb-card.me .hp i',bx).style.width=(S.hp/m*100)+'%';$('.lgb-card.me .hp i',bx).style.background=S.hp/m<.3?'var(--bad)':S.hp/m<.6?'var(--gold)':'var(--good)';$('.lgb-card.me .hpt',bx).textContent=`${S.hp} / ${m} HP`;
  const f=BT.foeHP/BT.foeMax;$('.lgb-card.foe .hp i',bx).style.width=(f*100)+'%';$('.lgb-card.foe .hp i',bx).style.background=f<.34?'var(--bad)':f<.67?'var(--gold)':'var(--good)';tools();hud();}
function tools(){$('[data-t=potion]',bx).textContent=`🧪 Potion ×${S.bag.potion||0}`;$('[data-t=scroll]',bx).textContent=`📜 Hint Scroll ×${S.bag.scroll||0}`;$('[data-t=potion]',bx).disabled=!(S.bag.potion>0);$('[data-t=scroll]',bx).disabled=!(S.bag.scroll>0);}
function fx(fromMe,emoji,cb){const ar=$('.lgb-arena',bx).getBoundingClientRect(),a=$(fromMe?'.lgb-mon.me':'.lgb-mon.foe',bx).getBoundingClientRect(),b=$(fromMe?'.lgb-mon.foe':'.lgb-mon.me',bx).getBoundingClientRect();
  const s=document.createElement('div');s.className='lgb-proj';s.textContent=emoji;$('.lgb-fx',bx).appendChild(s);
  const x0=a.left+a.width/2-ar.left,y0=a.top+a.height/2-ar.top,x1=b.left+b.width/2-ar.left,y1=b.top+b.height/2-ar.top;
  const an=s.animate([{transform:`translate(${x0}px,${y0}px) scale(.6)`,opacity:1},{transform:`translate(${(x0+x1)/2}px,${Math.min(y0,y1)-40}px) scale(1.3)`,opacity:1},{transform:`translate(${x1}px,${y1}px) scale(1)`,opacity:.9}],{duration:520,easing:'ease-in'});
  an.onfinish=()=>{s.remove();const tgt=$(fromMe?'.lgb-mon.foe':'.lgb-mon.me',bx);tgt.classList.remove('hit');void tgt.offsetWidth;tgt.classList.add('hit');$('.lgb-arena',bx).classList.remove('shake');void bx.offsetWidth;$('.lgb-arena',bx).classList.add('shake');cb&&cb(x1,y1);};}
function dmgNum(x,y,txt,col){const d=document.createElement('div');d.className='lgb-dmg';d.textContent=txt;d.style.color=col;d.style.left=x+'px';d.style.top=y+'px';$('.lgb-fx',bx).appendChild(d);setTimeout(()=>d.remove(),900);}
const MOVES={html:['Tag Tackle','Markup Blast','Header Bash'],form:['Form Fling','Input Impact','Submit Strike'],sel:['Selector Snipe','Class Crush','Crystal Pick'],box:['Box Bump','Padding Pound','Border Bash'],lay:['Flex Flurry','Grid Lock','Align Assault'],fx:['Hover Hex','Glow Gust','Transform Twister'],js:['Script Strike','Loop Lash','Function Fury'],boss:['Royal Decree','Crown Crash','Legend Beam']};
const FOEMOVES=['Syntax Error','Missing Bracket','Typo Tackle','Bug Bite','Null Slam','Undefined Uppercut','Unclosed Tag Twister','Infinite Loop'];
function openBattle(o){
  mode='battle';held=null;BT=Object.assign({round:o.start||0,stars:[],scrolls:0},o);
  const theme=TH[o.region==='castle'?'castle':(MAPS[o.region]||CUR).theme]||TH.town;
  $('.lgb-arena',bx).style.background=`radial-gradient(ellipse 70px 18px at 18% 18%, rgba(255,255,255,.9) 98%, transparent),radial-gradient(ellipse 50px 14px at 26% 13%, rgba(255,255,255,.9) 98%, transparent),radial-gradient(ellipse 60px 15px at 62% 24%, rgba(255,255,255,.8) 98%, transparent),linear-gradient(${theme.sky[0]} 0 55%, ${shade(theme.ground,-.04)} 55%)`;
  $('.lgb-mon.me .spr',bx).innerHTML=partnerSVG(120);$('.lgb-card.me .nm',bx).textContent=pName();$('.lgb-card.me .tg',bx).textContent=`Lv ${lvl()} · ${S.name}'s partner`;
  $('[data-t=run]',bx).textContent=o.kind==='wild'?'🏃 Run away':o.kind==='trainer'?'🚫 Can\'t run':'🚪 Leave';$('[data-t=run]',bx).disabled=o.kind==='trainer';
  bx.classList.remove('hidden');document.body.style.overflow='hidden';bx.scrollTop=0;
  if(o.kind==='trainer')trainerRound();else codeRound();
}
function foeSetup(c,tag,maxHPv){BT.c=c;BT.foeMax=maxHPv;BT.foeHP=BT.foeHP==null||BT.newFoe?maxHPv:BT.foeHP;
  const sp=$('.lgb-mon.foe .spr',bx);sp.parentElement.className='lgb-mon foe appear';sp.innerHTML=monFor(c,130);$('.lgb-card.foe .nm',bx).textContent=c.name;$('.lgb-card.foe .tg',bx).textContent=tag;setHP();}
function codeRound(){
  const ids=BT.ids,c=ALLM[ids[BT.round]];BT.newFoe=true;BT.foeHP=null;const R=REGM[c.region];
  const tag=BT.kind==='gym'?`${R.gym.leader}'s Codeling · Round ${BT.round+1}/${ids.length}`:BT.kind==='champ'?`Queen Byte · Round ${BT.round+1}/${ids.length}`:`${BT.review?'Rematch':'Wild'} · ${(TYPES[c.mtype]||{}).name} type`;
  foeSetup(c,tag,100);
  bmsg(BT.kind==='gym'?`${R.gym.leader} sent out ${c.name}!`:BT.kind==='champ'?`Queen Byte summons ${c.name}!`:BT.review?`A wild ${c.name} wants a rematch! (Easy XP)`:`A wild ${c.name} appeared! Tame it with code.`);
  $('.lgb-scroll',bx).classList.add('hidden');
  const panel=$('.lgb-panel',bx);
  const story=`<div class="lgb-lesson"><span class="lgb-type">${esc((TYPES[c.mtype]||{}).name||'')} · ${esc(c.concept)}</span><div class="lesson">${md(c.learn)}</div><div class="exl">Example</div><pre class="ex">${esc(c.example)}</pre><div class="mission" style="margin-top:10px">🎯 <b>Mission:</b> ${md(c.mission)}</div></div>`;
  CURRENT_GAME='quest2';
  if(c.type==='js'){c.storyHTML=story;const b=JSBench(panel,{game:'quest2',checkLabel:'⚔️ ATTACK! (run my code)',winText:'Super effective!',onPass:s=>roundWon(s),onFail:()=>roundLost()});b.load(c);}
  else{const b=Bench(panel,{game:'quest2',checkLabel:'⚔️ ATTACK! (check my code)',winText:'Super effective!',onPass:s=>roundWon(s),onFail:r=>roundLost()});c.storyHTML=story;b.load(c);}
}
function jsPanel(root,c,story){
  let hints=0,used=false,busy=false;
  root.innerHTML=`<div class="work"><div class="box"><div class="bstory">${story}</div></div><div class="box">
    <div class="edhead" style="margin-top:0">🪄 Your JavaScript <small>Ctrl + Enter = attack</small></div>
    <textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="JavaScript code" style="min-height:170px"></textarea><div class="snips"></div>
    <div class="edhead">🔮 Output <small>what console.log prints</small></div><div class="crystal"><span class="muted">(run your code to see output)</span></div>
    <div class="actions"><button class="btn primary big wide" data-a="go">⚔️ ATTACK! (run my code)</button><button class="btn" data-a="hint">💡 Hint</button><button class="btn" data-a="tip">✨ Tip</button><button class="btn" data-a="ans">👁 Answer</button><button class="btn ghost wide" data-a="reset">↺ Reset code</button></div>
    <div class="feedback"></div><div class="hintbox"></div></div></div>`;
  const ed=$('textarea',root),ball=$('.crystal',root),fbEl=$('.feedback',root),hb=$('.hintbox',root);const fb=(t,h)=>{fbEl.className='feedback '+(t||'');fbEl.innerHTML=h||'';};
  ed.value=c.starter;TRACK.open('quest2',c.id);
  const run=async()=>{if(busy)return;if(!ed.value.trim()){fb('bad','Write your code first!');return;}busy=true;fb('info','✨ Running…');
    const r=await window.__SPELL.runSpell(ed.value,c.tests.map(t=>t[0]));busy=false;
    ball.innerHTML=r.out&&r.out.length?r.out.map(l=>`<div>› ${esc(l)}</div>`).join(''):'<span class="muted">(nothing was printed)</span>';
    let ok=false,msg='';if(r.timeout)msg='⏳ Your code never finished — a loop is probably running forever.';else if(r.err)msg='💥 '+window.__SPELL.friendly(r.err);else{const i=r.res.findIndex(x=>!x);if(i>=0)msg='❌ Not quite. '+md(c.tests[i][1]);else ok=true;}
    TRACK.attempt('quest2',c.id,ok);
    if(ok){fb('good','✅ It works! Super effective!');roundWon(used?1:hints?2:3);}else{fb('bad',msg+'<br><small>Stuck? Tap 💡 Hint.</small>');roundLost();}};
  wireEditor(ed,()=>{},run);addSnips($('.snips',root),ed,()=>{},['(',')','{','}','[',']',';','"','=','+','<','>','.','!','`','$']);
  $('[data-a=go]',root).onclick=run;$('[data-a=reset]',root).onclick=()=>{ed.value=c.starter;fb();};
  $('[data-a=hint]',root).onclick=()=>{if(hints<c.hints.length)hints++;TRACK.hint('quest2',c.id,hints);hb.innerHTML=c.hints.slice(0,hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('')+(hints>=c.hints.length?`<div class="h" style="background:#fff;border-style:dashed">That's every hint! Still stuck? Tap 👁 Answer.</div>`:'');};
  $('[data-a=tip]',root).onclick=()=>showTip(hb,c.tip);
  $('[data-a=ans]',root).onclick=()=>{used=true;TRACK.answer('quest2',c.id);ed.value=c.answer;hb.innerHTML=`<div class="h a">👁 <b>Here's one correct answer.</b> Read it line by line, then press ⚔️ ATTACK.</div>`;};
}
function roundLost(){
  const c=BT.c,dmg=10+Math.floor(Math.random()*9);
  bmsg(`${c.name} used ${FOEMOVES[Math.floor(Math.random()*FOEMOVES.length)]}!`);
  fx(false,'💥',(x,y)=>{S.hp=Math.max(0,S.hp-dmg);dmgNum(x,y,'−'+dmg,'#e5484d');setHP();save();
    if(S.hp<=0)setTimeout(()=>modal(`<div class="center"><div style="font-size:54px">😵‍💫</div><h2>${esc(pName())} is worn out!</h2><p>You rush to the nearest healing spot. Nothing you learned is lost — and your partner keeps all its XP.</p></div>`,[['Heal up',blackout,'primary']]),500);});
}
function roundWon(stars){
  const c=BT.c,type=STARTERS[S.partner].type,mv2=MOVES[type][Math.floor(Math.random()*3)];BT.stars.push(stars);
  const prev=S.caught[c.id]||0;S.caught[c.id]=Math.max(prev,stars);
  bmsg(`${pName()} used ${mv2}! It's super effective!`);
  fx(true,['✨','⚡','🔥','💫'][Math.floor(Math.random()*4)],(x,y)=>{BT.foeHP=0;dmgNum(x,y,'★'.repeat(stars),'#f5b301');setHP();
    setTimeout(()=>{$('.lgb-mon.foe',bx).classList.add('faint');bmsg(`${c.name} fainted!`);},400);
    setTimeout(()=>afterRound(c,stars,!prev),1500);});
  save();
}
function gainXP(n){const before=stage(),lv0=lvl();S.xp+=n;const up=lvl()>lv0;if(up)S.hp=maxHP();return{up,evolve:stage()>before};}
function afterRound(c,stars,isNew){
  if(BT.kind==='wild'){const xp=BT.review?10+stars*2:20+stars*5,coins=BT.review?4:8+stars*2;S.coins+=coins;const g=gainXP(xp);save();
    const R=REGM[c.region],n=tamed(R.pool);
    closeBattle();modal(`<div class="center">${monFor(c,110)}<h2>${isNew?'You tamed '+esc(c.name)+'!':'Rematch won!'}</h2><div style="font-size:26px">${starsHTML(stars)}</div><p><b>+${xp} XP · +${coins} 🪙</b>${g.up?` · 🎉 Level up! Lv ${lvl()}`:''}</p>${isNew?`<p>📘 New Codedex page: <b>${esc(c.concept)}</b></p>`:''}<p class="muted">${n<R.pool.length?`${n}/${R.pool.length} Codelings tamed in ${esc(R.name)}.`:`All Codelings tamed here! The GYM is ready for you. 🏟️`}</p></div>`,[['Continue',()=>{if(g.evolve)evolve();},'primary']]);return;}
  // gym / champion rounds
  const xp=40+stars*10;const g=gainXP(xp);BT.round++;
  if(BT.kind==='gym')S.gym[BT.region]=BT.round;else S.gym.castle=BT.round;save();
  if(BT.round<BT.ids.length){bmsg(`+${xp} XP${g.up?' · LEVEL UP!':''} — next round!`);setTimeout(()=>{$('.lgb-mon.foe',bx).classList.remove('faint');codeRound();},900);BT.pendingEvolve=BT.pendingEvolve||g.evolve;return;}
  const evo=BT.pendingEvolve||g.evolve;
  if(BT.kind==='gym'){const R=REGM[BT.region];S.badges[R.id]=1;S.gym[R.id]=0;S.coins+=100;save();closeBattle();
    modal(`<div class="center"><div style="font-size:64px">${R.gym.icon}</div><h2>You earned the ${esc(R.gym.badge)}!</h2><p><b>+100 🪙</b> · Badges: <b>${badgeCount()}/7</b></p></div>`,[['Continue',()=>say(R.gym.win,()=>{if(evo)evolve();},R.gym.leader),'primary']]);return;}
  S.champion=true;S.gym.castle=0;S.coins+=300;S.hats.crown=1;save();closeBattle();
  modal(`<div class="center"><div style="font-size:64px">👑</div><h2 class="pix" style="font-size:15px;line-height:1.7;color:var(--accent)">CODELING LEGEND</h2><p>You beat Queen Byte, {name}!</p><p><b>+300 🪙 · You unlocked the 👑 Golden Crown hat!</b></p><p>You've mastered semantic HTML, forms, selectors, the box model, Flexbox, Grid, effects and JavaScript. That's real web-developer skill.</p></div>`.replace('{name}',esc(S.name)),[['Continue',()=>say(CHAMP.win,()=>{if(evo)evolve();},CHAMP.leader),'primary']]);
}
function evolve(){const n0=STARTERS[S.partner].n[stage()-2],n1=pName();
  modal(`<div class="center"><p class="muted">What? ${esc(n0)} is evolving!</p><div class="evo">${partnerSVG(150)}</div><h2>${esc(n0)} evolved into ${esc(n1)}!</h2><p>${stage()===2?'It grew wings! 🪽':'It wears the crown of a legend! 👑'}</p></div>`,[['Amazing!',null,'primary']]);hud();}
function blackout(){closeBattle();S.hp=maxHP();const h=S.heal||{map:'town',x:12,y:6};goMap(h.map,h.x,h.y);save();say(["All healed up! 💗","Every developer sees errors every day. Errors are how we learn.","Tip: use 💡 Hints or a 📜 Hint Scroll when you're stuck."],null,'Nurse Pixel');}
function closeBattle(){bx.classList.add('hidden');document.body.style.overflow='';$('.lgb-panel',bx).innerHTML='';$('.lgb-mon.foe',bx).className='lgb-mon foe';BT=null;mode='walk';save();hud();}

/* trainer quiz battles */
function trainerRound(){
  const o=BT.trainer,R=REGM[BT.region],bank=[].concat(...R.quiz.map(id=>((window.__QUIZ||[]).find(q=>q.id===id)||{qs:[]}).qs));
  BT.qs=bank.slice().sort(()=>Math.random()-.5).slice(0,Math.min(5,bank.length));BT.qi=0;BT.right=0;BT.miss=0;
  const c={name:o.name.split(' ').pop()+"'s Codeling",seed:hash(o.tid),color:PAL[R.id][hash(o.tid)%4],mtype:R.type,id:'t'};BT.newFoe=true;BT.foeHP=null;foeSetup(c,`${o.name}'s partner · Quiz battle`,3);
  bmsg(`${o.name} wants to battle! Answer 3 questions right to win.`);quizQ();}
function quizQ(){
  const q=BT.qs[BT.qi%BT.qs.length],opts=q[2].map((t,k)=>({t,ok:k===0})).sort(()=>Math.random()-.5);BT.cur={q,opts};
  $('.lgb-scroll',bx).classList.add('hidden');
  const p=$('.lgb-panel',bx);p.innerHTML=`<div class="box"><div class="rstat"><span class="chip">✅ ${BT.right}/3 correct</span><span class="chip">📜 Hint Scroll here = 50/50</span></div><div class="qtext">${md(q[0])}</div>${q[1]?`<pre class="ex">${esc(q[1])}</pre>`:''}<div class="opts">${opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o.t)}</button>`).join('')}</div><div class="feedback"></div><div class="qnext"></div></div>`;
  $$('.opt',p).forEach(b=>b.onclick=()=>{const k=+b.dataset.k,btns=$$('.opt',p);btns.forEach(x=>x.disabled=true);btns[opts.findIndex(x=>x.ok)].classList.add('right');const fb=$('.feedback',p);
    if(opts[k].ok){BT.right++;fb.className='feedback good';fb.textContent='✅ Correct! '+q[3];bmsg(`${pName()} used ${MOVES[STARTERS[S.partner].type][BT.right%3]}!`);fx(true,'⚡',(x,y)=>{BT.foeHP=Math.max(0,3-BT.right);dmgNum(x,y,'−1','#f5b301');setHP();});}
    else{b.classList.add('wrong');BT.miss++;fb.className='feedback bad';fb.textContent='❌ Not quite. '+q[3];roundLost();}
    $('.qnext',p).innerHTML=`<div class="actions"><button class="btn primary big wide">${BT.right>=3?'Finish battle 🏁':'Next question →'}</button></div>`;
    $('.qnext button',p).onclick=()=>{if(S.hp<=0)return;if(BT.right>=3)trainerWon();else{BT.qi++;quizQ();}};});}
function trainerWon(){const o=BT.trainer;S.trainers[o.tid]=1;S.coins+=o.coins;const xp=30-Math.min(15,BT.miss*5);const g=gainXP(xp);save();
  TRACK.attempt('quest2','trainer:'+o.tid,BT.miss===0);
  $('.lgb-mon.foe',bx).classList.add('faint');bmsg(`${o.name} is out of questions!`);
  setTimeout(()=>{closeBattle();modal(`<div class="center"><div style="font-size:52px">🏆</div><h2>You beat ${esc(o.name)}!</h2><p><b>+${xp} XP · +${o.coins} 🪙</b>${g.up?` · 🎉 Level up! Lv ${lvl()}`:''}</p></div>`,[['Continue',()=>say(o.after,()=>{if(g.evolve)evolve();},o.name),'primary']]);},1200);}

/* battle buttons */
$('[data-t=potion]',bx).onclick=()=>{if(!(S.bag.potion>0))return;if(S.hp>=maxHP()){bmsg(`${pName()} is already at full HP!`);return;}S.bag.potion--;const h=Math.min(50,maxHP()-S.hp);S.hp+=h;bmsg(`🧪 You used a Potion! +${h} HP`);setHP();save();};
$('[data-t=scroll]',bx).onclick=()=>{if(!(S.bag.scroll>0)||!BT)return;
  if(BT.kind==='trainer'){const p=$('.lgb-panel',bx),btns=$$('.opt:not(:disabled)',p);if(btns.length<4)return bmsg('Use the scroll before answering!');S.bag.scroll--;BT.cur.opts.map((o,k)=>k).filter(k=>!BT.cur.opts[k].ok).sort(()=>Math.random()-.5).slice(0,2).forEach(k=>{btns[k].disabled=true;btns[k].classList.add('gone');});tools();save();return;}
  const c=BT.c;if(BT.scrolls>=c.hints.length)return bmsg('No more hints left for this one!');S.bag.scroll--;BT.scrolls++;const box=$('.lgb-scroll',bx);box.classList.remove('hidden');
  box.innerHTML=`📜 <b>Hint Scroll</b> <small>(free — no star lost)</small>${c.hints.slice(0,BT.scrolls).map(h=>`<div>💡 ${md(h)}</div>`).join('')}`;tools();save();};
$('[data-t=run]',bx).onclick=()=>{if(!BT)return;if(BT.kind==='wild'){closeBattle();say(["You got away safely!","(That Codeling is still out there.)"]);return;}
  if(BT.kind==='gym'||BT.kind==='champ'){const k=BT.kind,R=REGM[BT.region];modal(`<h3>Leave the battle?</h3><p>Rounds you've won are saved. Come back any time.</p>`,[['Stay',null],['Leave',()=>{closeBattle();say(["Come back when you're ready, {name}!"],null,k==='gym'?R.gym.leader:CHAMP.leader);},'primary']]);}};

/* ---------- menus ---------- */
function openShop(){mode='busy';
  const items=[['potion','🧪 Potion','Heals 50 HP (use in battle or from your Bag)',25],['scroll','📜 Hint Scroll','A free hint in battle — no star lost!',30]];
  const html=`<h2>🛍️ Code Shop</h2><p class="muted">You have <b>🪙 ${S.coins}</b> coins.</p><div class="shop">${items.map(([k,n,d,c])=>`<button data-buy="${k}"><span class="e">${n.split(' ')[0]}</span>${n.slice(3)}<br><small>${d}</small><br><b>🪙 ${c}</b> · own ${S.bag[k]||0}</button>`).join('')}</div>
    <h3 style="margin-top:14px">🎩 Hats</h3><div class="shop">${Object.entries(HATS).filter(([k])=>k!=='crown').map(([k,h])=>`<button data-hat="${k}" class="${S.hats[k]?'own':''}" ${S.hats[k]?'disabled':''}><canvas width="96" height="96" data-hatprev="${k}" style="width:48px;height:48px"></canvas><br>${h.n}<br><small>${S.hats[k]?'✓ Owned':'🪙 '+h.c}</small></button>`).join('')}</div>`;
  modal(html,[['Done',()=>{mode='walk';hud();},'primary']]);
  $$('[data-hatprev]').forEach(cn=>{const c=cn.getContext('2d');c.scale(3,3);drawHuman(c,0,0,Object.assign({},S.look,{hat:cn.dataset.hatprev,pants:'#3b4a6b'}),'down',0,0);});
  $$('[data-buy]').forEach(b=>b.onclick=()=>{const it=items.find(i=>i[0]===b.dataset.buy);if(S.coins<it[3]){b.insertAdjacentHTML('beforeend','<br><small style="color:var(--bad)">Not enough coins!</small>');return;}S.coins-=it[3];S.bag[it[0]]=(S.bag[it[0]]||0)+1;save();closeModal();openShop();});
  $$('[data-hat]').forEach(b=>b.onclick=()=>{const k=b.dataset.hat,h=HATS[k];if(S.coins<h.c){b.insertAdjacentHTML('beforeend','<br><small style="color:var(--bad)">Not enough coins!</small>');return;}S.coins-=h.c;S.hats[k]=1;S.look.hat=k;save();closeModal();openShop();});}
function openBag(){if(mode!=='walk')return;
  const hats=Object.keys(S.hats).filter(k=>S.hats[k]);
  modal(`<h2>🎒 Bag</h2><p><b>🪙 ${S.coins}</b> coins · <b>❤️ ${S.hp}/${maxHP()}</b> HP</p>
   <div class="shop"><button data-use="potion" ${S.bag.potion>0&&S.hp<maxHP()?'':'disabled'}><span class="e">🧪</span>Potion ×${S.bag.potion||0}<br><small>Tap to heal 50 HP</small></button><button disabled><span class="e">📜</span>Hint Scroll ×${S.bag.scroll||0}<br><small>Use during battles</small></button></div>
   <h3 style="margin-top:14px">🎩 Hats</h3>${hats.length?`<div class="shop">${['',...hats].map(k=>`<button data-wear="${k}" class="${(S.look.hat||'')===k?'own':''}">${k?HATS[k].n:'No hat'}${(S.look.hat||'')===k?'<br><small>✓ Wearing</small>':''}</button>`).join('')}</div>`:'<p class="muted">No hats yet — visit the Shop in Harbor Town!</p>'}
   <h3 style="margin-top:14px">🏅 Badges</h3><div class="badges">${REG.map(r=>`<span class="badge ${S.badges[r.id]?'on':''}">${r.gym.icon} ${esc(r.gym.badge)}</span>`).join('')}<span class="badge ${S.champion?'on':''}">👑 Legend Crown</span></div>`,[['Close',null,'primary']]);
  const u=$('[data-use]');if(u)u.onclick=()=>{S.bag.potion--;S.hp=Math.min(maxHP(),S.hp+50);save();hud();closeModal();openBag();};
  $$('[data-wear]').forEach(b=>b.onclick=()=>{S.look.hat=b.dataset.wear;save();closeModal();openBag();});}
function openDex(){if(mode!=='walk'&&mode!=='dialog')return;
  const sec=(title,list)=>`<div class="cxsec">${title}</div><div class="cxgrid">${list.map(c=>S.caught[c.id]?`<div class="cx" data-id="${c.id}">${monFor(c,64)}<div>${esc(c.name)}</div><small>${esc(c.concept)}</small><span class="stars" style="font-size:11px">${'★'.repeat(S.caught[c.id])}</span></div>`:`<div class="cx lock">${monSVG(c.seed,'#bbbbbb','?',64,1,true)}<div>???</div><small>Not tamed yet</small></div>`).join('')}</div>`;
  const total=ALL.length,got=ALL.filter(c=>S.caught[c.id]).length;
  modal(`<h2>📘 Codedex <small class="muted">${got}/${total}</small></h2><p class="muted" style="margin-top:0">Tap any Codeling you've beaten to re-read its lesson.</p>${REG.map(r=>sec(r.name,r.pool)+sec(r.gym.title,r.gym.pool)).join('')}${sec('Code Castle',LCHAMP)}`,[['Close',null,'primary']]);
  $$('#modalCard .cx[data-id]').forEach(el=>el.onclick=()=>{const c=ALLM[el.dataset.id];modal(`<div class="center">${monFor(c,90)}</div><h2>${esc(c.name)} · ${esc(c.concept)}</h2><div class="lesson">${md(c.learn)}</div><div class="exl">Example</div><pre class="ex">${esc(c.example)}</pre><div class="exl">Pro tip</div><div class="lesson">${md(c.tip)}</div>`,[['← Back',openDex],['Close',null,'primary']]);});}
function openMap(){if(mode!=='walk')return;
  const spots=[['town','⚓ Harbor Town',12,8]].concat(REG.map(r=>[r.id,`${r.gym.icon} ${r.name}`,2,10]),[['castle','👑 Code Castle',2,8]]);
  modal(`<h2>🗺️ Fly to…</h2><p class="muted">Travel instantly to any place you've visited.</p><div class="shop">${spots.map(([id,n])=>`<button data-fly="${id}" ${S.visited[id]?'':'disabled'} class="${CUR.id===id?'own':''}">${n}<br><small>${S.visited[id]?(REGM[id]?`${tamed(REGM[id].pool)}/${REGM[id].pool.length} tamed${S.badges[id]?' · 🏅':''}`:'Visited'):'🔒 Not visited'}</small></button>`).join('')}</div>`,[['Close',null,'primary']]);
  $$('[data-fly]').forEach(b=>b.onclick=()=>{const s=spots.find(x=>x[0]===b.dataset.fly);closeModal();fade(()=>goMap(s[0],s[2],s[3]));});}
function help(){modal(`<h2>How to play</h2><p>🕹️ <b>Move</b> with arrow keys / WASD or the D-pad. Press <b>Space</b> or <b>A</b> to talk, read signs and open chests (face them first).</p><p>🌿 <b>Tall grass</b> hides wild Codelings. Beat them by writing real code — each one teaches a new skill.</p><p>⚔️ <b>Trainers</b> (with ⚔ over their heads) challenge you to quiz battles when they spot you.</p><p>🏟️ Tame every Codeling in a region to unlock its <b>Gym</b>. Win the badge to open the gate east.</p><p>💗 Heal at <b>fountains</b>, the <b>Code Center</b> or <b>Home</b>. 🛍️ Buy Potions, Hint Scrolls and hats at the <b>Shop</b>.</p><p>⭐ Your partner gains XP and <b>evolves</b> at Lv 6 and Lv 12!</p>`,[['Let\'s go!',null,'primary']]);}
function menu(){if(mode!=='walk')return;modal(`<h2>Menu</h2><p>Trainer <b>${esc(S.name)}</b> · ${esc(pName())} Lv ${lvl()} · ${S.xp} XP</p><p>Codelings beaten: <b>${ALL.filter(c=>S.caught[c.id]).length}/${ALL.length}</b> · Badges <b>${badgeCount()}/7</b> · Trainers beaten <b>${Object.keys(S.trainers).length}/14</b></p>`,
  [['How to play',help],['Start over',()=>modal(`<h3>Start Codeling Legends over?</h3><p>This deletes this adventure's progress for ${esc(ME.name)}. It can't be undone.</p>`,[['Cancel',null],['Yes, start over',()=>{try{localStorage.removeItem(Q2KEY);}catch(e){}S=fresh();mode='title';title();$('#lgTitle').classList.remove('hidden');},'primary']])],['Save',()=>{save();say(["Game saved! 💾"]);}],['Close',null,'primary']]);}

/* ---------- title / avatar creator ---------- */
function title(){
  const saved=load();const draft={name:(saved&&saved.name)||ME.name||'',look:{skin:0,hair:HAIRS[1],shirt:SHIRTS[1],hat:''},partner:0};
  const sw=(arr,key,isIdx)=>arr.map((c,i)=>`<button class="sw" data-k="${key}" data-v="${isIdx?i:c}" style="background:${isIdx?SKINS[i]:c}" aria-label="${key} ${i+1}"></button>`).join('');
  $('#lgTitle').innerHTML=`<div class="tcard"><div style="text-align:left"><button class="btn sm" id="lgTBack">← Arcade</button></div>
   <div class="tlogo pix" style="font-size:20px">CODELING<br>LEGENDS</div><p class="tsub">A huge adventure across 7 regions. 100+ coding battles. Your partner evolves as you learn.</p>
   ${saved?`<div class="tbox center"><p style="margin-top:0"><b>Welcome back, ${esc(saved.name)}!</b><br>${Object.keys(saved.caught).length} beaten · ${REG.filter(r=>saved.badges[r.id]).length} badges</p><button class="btn primary big" id="lgCont" style="width:100%">▶ Continue</button></div><p class="tsub" style="margin:4px 0 12px">— or start a new adventure —</p>`:''}
   <div class="tbox"><label for="lgTName">Trainer name</label><input id="lgTName" maxlength="14" placeholder="Type your name" autocomplete="off" value="${esc(draft.name)}"></div>
   <div class="tbox"><label>Make your character</label><div class="creator"><canvas id="lgAv" width="192" height="192"></canvas><div>
     <div class="swrow"><small>Skin</small>${sw(SKINS,'skin',true)}</div><div class="swrow"><small>Hair</small>${sw(HAIRS,'hair')}</div><div class="swrow"><small>Outfit</small>${sw(SHIRTS,'shirt')}</div></div></div></div>
   <div class="tbox"><label>Choose your partner</label><div class="starters">${STARTERS.map((s,i)=>`<div class="starter ${i===0?'on':''}" data-i="${i}">${monSVG(s.seed,s.color,TYPES[s.type].icon,90,1)}<b>${s.n[0]}</b><small>${s.d}</small></div>`).join('')}</div></div>
   <button class="btn primary big" id="lgNew" style="width:100%">${saved?'Start new adventure':'Begin adventure →'}</button></div>`;
  const av=()=>{const c=$('#lgAv').getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,192,192);c.scale(6,6);drawHuman(c,0,0,Object.assign({pants:'#3b4a6b'},draft.look),'down',0,0);};av();
  $$('#lgTitle .sw').forEach(b=>b.onclick=()=>{draft.look[b.dataset.k]=b.dataset.k==='skin'?+b.dataset.v:b.dataset.v;$$(`#lgTitle .sw[data-k=${b.dataset.k}]`).forEach(x=>x.classList.toggle('on',x===b));av();});
  $$('#lgTitle .starter').forEach(el=>el.onclick=()=>{draft.partner=+el.dataset.i;$$('#lgTitle .starter').forEach(x=>x.classList.toggle('on',x===el));});
  $('#lgTBack').onclick=()=>APP.show('hub');
  if(saved)$('#lgCont').onclick=()=>{S=saved;start(false);};
  $('#lgNew').onclick=()=>{const n=$('#lgTName').value.trim();if(!n){$('#lgTName').focus();$('#lgTName').style.borderColor='var(--bad)';return;}
    const go=()=>{S=fresh();S.name=n;S.look=Object.assign({},draft.look);S.partner=draft.partner;S.started=true;S.hp=maxHP();save();start(true);};
    if(saved)modal(`<h3>Start over?</h3><p>Your old adventure (${esc(saved.name)}) will be replaced.</p>`,[['Cancel',null],['Start new',go,'primary']]);else go();};
}
function start(isNew){$('#lgTitle').classList.add('hidden');CUR=MAPS[S.map]||MAPS.town;goMap(CUR.id,S.x,S.y);mode='walk';hud();
  if(isNew)say(["Welcome to the Code Kingdom, {name}! I'm Professor Lumen.",`${pName()} chose YOU as its partner. Look — it's following you!`,"Codelings are creatures made of code. You beat them by WRITING code.","There are 7 regions, each with a Gym. Collect all 7 badges to face Queen Byte at the Code Castle.","Head EAST to Meaning Meadow. Good luck!"],help,'Professor Lumen');}

/* ---------- input ---------- */
const KEYDIR={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right'};
document.addEventListener('keydown',e=>{if(CURRENT!=='quest2')return;const tg=(e.target.tagName||'').toLowerCase();if(tg==='textarea'||tg==='input')return;
  if(mode==='battle'||mode==='title')return;
  if(!$('#modal').classList.contains('hidden')){if(e.key==='Enter'||e.key==='Escape'){const b=$('#modalCard .row .btn.primary')||$('#modalCard .row .btn');if(b){e.preventDefault();b.click();}}return;}
  if(KEYDIR[e.key]){e.preventDefault();held=KEYDIR[e.key];if(mode==='walk'&&!mv)step(held);}else if(e.key===' '||e.key==='Enter'||e.key==='z'){e.preventDefault();interact();}});
document.addEventListener('keyup',e=>{if(KEYDIR[e.key]&&held===KEYDIR[e.key])held=null;});
$$('#lgDpad button').forEach(b=>{const on=e=>{e.preventDefault();held=b.dataset.d;b.classList.add('on');if(mode==='walk'&&!mv)step(held);};const off=()=>{if(held===b.dataset.d)held=null;b.classList.remove('on');};
  b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);});
$('#lgA').addEventListener('click',interact);$('#lgDialog').addEventListener('click',advance);
$('#lgBack').onclick=()=>{if(mode==='dialog'){if(dlg)clearInterval(dlg.timer);dlg=null;$('#lgDialog').classList.add('hidden');mode='walk';}if(mode==='walk'||mode==='title')APP.show('hub');};
$('#lgDexBtn').onclick=openDex;$('#lgBagBtn').onclick=openBag;$('#lgMapBtn').onclick=openMap;$('#lgMenuBtn').onclick=menu;

window.QUEST2={
  enter(){fit();if(mode==='title'){title();$('#lgTitle').classList.remove('hidden');}else{hud();}},
  leave(){$('#lgTitle').classList.add('hidden');held=null;},
  progress(){const s=load();const n=s?ALL.filter(c=>s.caught[c.id]).length:0;return{done:n,total:ALL.length,badges:s?REG.filter(r=>s.badges[r.id]).length:0};},
  levels(){const s=load()||fresh();return ALL.map(c=>({id:c.id,title:c.name+' — '+c.concept,region:c.region,stars:s.caught[c.id]||0}));},
  _test:{ALL,MAPS,REG,WALK,LCHAMP,monSVG,state:()=>S,go:(m,x,y)=>goMap(m,x,y),wild:()=>encounter(),gym:id=>tryGym(REGM[id]),champ:()=>tryChampion(),mode:()=>mode,save,hud,interact,blocked:(m,x,y)=>{const keep=CUR;CUR=MAPS[m];const r=blocked(x,y);CUR=keep;return r;}}
};
WORLDS.quest2=window.QUEST2;
requestAnimationFrame(loop);

})();
