(()=>{
'use strict';
const STYLE_START="\n\n<style>\n  \n</style>";
const CH=[
{id:'h1',g:'r1',name:'Hedlet',color:'#f59e0b',concept:'Headings <h1>',
 learn:"Web pages are made of **tags**. A tag is like a box with a label. It tells the browser what is inside.\n\n`<h1>` means **the biggest heading**. Open the box with `<h1>`, put your words in, then close it with `</h1>`.\n\nThe closing tag has a slash `/`. No slash means the box never closes!",
 example:"<h1>My Adventure</h1>",mission:"Make a big heading (`<h1>`) that says **Hello World**.",starter:"",
 job:"Make a big heading that says **Hello World**. Start with `<h1>` and end with `</h1>`.",
 hints:["Type the opening tag first: `<h1>`","Now type the words Hello World.","Close the box with `</h1>` — don't forget the slash!"],answer:"<h1>Hello World</h1>",
 tip:"We write tags in small letters. `<h1>` not `<H1>`. Good habit from day one!",
 checks:[has('h1',"I can't see an `<h1>` tag yet. Type `<h1>`: less-than sign, h, 1, greater-than sign."),hasText('h1','hello world',"Your `<h1>` is there! Now the words inside should be **Hello World**.")]},
{id:'p',g:'r1',name:'Parabug',color:'#84cc16',concept:'Paragraphs <p>',
 learn:"Headings are titles. For normal sentences we use `<p>`. It is short for **paragraph**.\n\nSame rule as before: open with `<p>`, close with `</p>`.",
 example:"<h1>Day 1</h1>\n<p>I left my village today.</p>",mission:"Write a paragraph (`<p>`) that says **I am learning HTML**.",starter:"",
 job:"Make a paragraph that says **I am learning HTML**. Start with `<p>` and end with `</p>`.",
 hints:["The paragraph tag is just the letter p: `<p>`","Words go in the middle.","Close it with `</p>`"],answer:"<p>I am learning HTML</p>",
 tip:"The browser ignores extra spaces and Enter presses in your code. To start a new paragraph, you need a new `<p>` tag.",
 checks:[has('p',"I can't find a `<p>` tag. It's just: less-than, p, greater-than."),hasText('p','i am learning html',"The paragraph should say **I am learning HTML**.")]},
{id:'hx',g:'r1',name:'Sizlet',color:'#06b6d4',concept:'Heading sizes h1–h6',
 learn:"There are **6 heading sizes**. `<h1>` is the biggest boss. `<h6>` is the tiniest.\n\nThink of a book: `<h1>` is the book title, `<h2>` is a chapter, `<h3>` is a part of a chapter.",
 example:"<h1>Book</h1>\n<h2>Chapter</h2>\n<h3>Section</h3>",mission:"Make an `<h2>` that says **Level 2** and an `<h3>` that says **Level 3**.",starter:"",
 job:"Make two headings. An `<h2>` that says **Level 2**, and an `<h3>` that says **Level 3**.",
 hints:["You need TWO lines — one for each tag.","Line 1: `<h2>Level 2</h2>`","Line 2 is the same idea, but with h3: `<h3>Level 3</h3>`"],answer:"<h2>Level 2</h2>\n<h3>Level 3</h3>",
 tip:"Use only ONE `<h1>` on a page — it's the main title. Google uses it to understand your page.",
 checks:[has('h2',"I can't find the `<h2>` tag."),hasText('h2','level 2',"Your `<h2>` should say **Level 2**."),has('h3',"I can't find the `<h3>` tag."),hasText('h3','level 3',"Your `<h3>` should say **Level 3**.")]},
{id:'strong',g:'r1',name:'Boldra',color:'#ef4444',concept:'Bold text <strong>',
 learn:"You can put a tag **inside** another tag — like a small box inside a big box.\n\n`<strong>` makes words bold. It means: this is important!\n`<em>` makes words slanted (italic). It means: say this with feeling.",
 example:"<p>I found a <strong>golden</strong> key!</p>",mission:"Make a paragraph that says **I am brave**. Put ONLY the word **brave** inside `<strong>` tags.",starter:"",
 job:"Make a `<p>` that says **I am brave**. Wrap ONLY the word **brave** in `<strong>` and `</strong>`.",
 hints:["Start the paragraph: `<p>I am `","Now wrap just one word: `<strong>brave</strong>`","Close the paragraph with `</p>` at the very end: `<p>I am <strong>brave</strong></p>`"],answer:"<p>I am <strong>brave</strong></p>",
 tip:"Close boxes in reverse order. Open p → open strong → close strong → close p.",
 checks:[has('p',"Start with a `<p>` paragraph."),has('p strong',"Put a `<strong>` tag INSIDE your `<p>` tag."),[a=>a.text(a.$('p strong')).replace(/[^a-z]/g,'')==='brave',"Only the word **brave** should be inside `<strong>`."],hasText('p','i am brave',"The whole paragraph should say **I am brave**.")]},
{id:'a',g:'r1',name:'Linkoo',color:'#8b5cf6',concept:'Links <a href>',
 learn:"Links use the `<a>` tag. But a link must know WHERE to go.\n\nWe tell it with an **attribute**. That is extra info written INSIDE the opening tag.\n\n`href` holds the web address. It looks like this: `href=\"address\"`",
 example:"<a href=\"https://example.com\">Click me</a>",mission:"Make a link to **https://example.com** that says **Visit**.",starter:"",
 job:"Make a link that says **Visit**. It goes to `https://example.com`. Use `<a href=\"https://example.com\">`.",
 hints:["Attributes go inside the opening tag: `<a href=\"\">`","Put the address between the two quote marks: `<a href=\"https://example.com\">`","The word Visit goes between `<a ...>` and `</a>`."],answer:"<a href=\"https://example.com\">Visit</a>",
 tip:"Attributes always look like name=\"value\": the name, an equals sign, then the value in quotes.",
 checks:[has('a',"I can't find an `<a>` tag."),[a=>(a.$('a').getAttribute('href')||'').includes('example.com'),"Put `href=\"https://example.com\"` inside the opening `<a>` tag."],hasText('a','visit',"The link words should say **Visit**.")]},
{id:'img',g:'r1',name:'Pixipic',color:'#ec4899',concept:'Images <img>',
 learn:"Pictures use `<img>`. It is special: it has **no closing tag**, because nothing goes inside it.\n\nIt needs two attributes:\n• `src` = which picture file to show\n• `alt` = words that describe the picture, for people who can't see it",
 example:"<img src=\"dragon.png\" alt=\"A red dragon\">",mission:"Add an image with src **cat.png** and alt **A cute cat**.\n\n(There's no real cat.png here, so the picture can't load. You'll see the alt words instead. That's alt doing its job!)",starter:"",
 job:"Add a picture. Use `<img>` with `src=\"cat.png\"` and `alt=\"A cute cat\"`. No closing tag needed!",
 hints:["Start with `<img`","Add `src=\"cat.png\"`, then a space, then `alt=\"A cute cat\"`","Finish with `>` — no closing tag needed!"],answer:"<img src=\"cat.png\" alt=\"A cute cat\">",
 tip:"Always write alt words. Screen readers read them out loud for blind users. It's kind AND it helps Google.",
 checks:[has('img',"I can't find an `<img>` tag."),[a=>(a.$('img').getAttribute('src')||'').includes('cat.png'),"Your image needs `src=\"cat.png\"` inside the tag."],[a=>(a.$('img').getAttribute('alt')||'').toLowerCase().includes('cute cat'),"Your image needs `alt=\"A cute cat\"` inside the tag."]]},
{id:'ul',g:'r1',name:'Listra',color:'#14b8a6',concept:'Lists <ul> <li>',
 learn:"A bullet list needs two kinds of tags:\n• `<ul>` = the list box\n• `<li>` = each thing in the list\n\nEvery `<li>` goes INSIDE the `<ul>`.",
 example:"<ul>\n  <li>Map</li>\n  <li>Torch</li>\n</ul>",mission:"Make a bullet list with 3 items: **Sword**, **Shield**, **Potion**.",starter:"",
 job:"Make a bullet list with `<ul>`. Put 3 `<li>` items inside: **Sword**, **Shield** and **Potion**.",
 hints:["Open the list box: `<ul>`","Each item looks like `<li>Sword</li>` — make 3 of these.","Close the list at the end: `</ul>`"],answer:"<ul>\n  <li>Sword</li>\n  <li>Shield</li>\n  <li>Potion</li>\n</ul>",
 tip:"The spaces before each `<li>` are optional. They just make your code easier to read.",
 checks:[has('ul',"I can't find a `<ul>` list box."),[a=>a.$$('ul li').length>=3,"Your `<ul>` needs 3 `<li>` items inside it."],[a=>{const t=a.text(a.$('ul'));return['sword','shield','potion'].every(w=>t.includes(w));},"The 3 items should be **Sword**, **Shield** and **Potion**."]]},
{id:'button',g:'r1',name:'Clicko',color:'#f97316',concept:'Buttons <button>',
 learn:"`<button>` makes a button you can click.\n\nLater, JavaScript will make buttons DO things. For now, let's make one appear!",
 example:"<button>Start</button>",mission:"Make a button that says **Fight!**",starter:"",
 job:"Make a button that says **Fight!** Use `<button>` and `</button>`.",
 hints:["The tag name is the word button.","`<button>` … words … `</button>`","`<button>Fight!</button>`"],answer:"<button>Fight!</button>",
 tip:"The browser draws the button shape for you. CSS can make it look like anything later.",
 checks:[has('button',"I can't find a `<button>` tag."),hasText('button','fight',"Your button should say **Fight!**")]},
{id:'ol',g:'g1',name:'Numbro',color:'#6366f1',concept:'Numbered lists <ol>',
 learn:"`<ol>` makes a **numbered list**. It works just like `<ul>`, but the browser numbers the items 1, 2, 3 for you.\n\nGreat for steps!",
 example:"<ol>\n  <li>Wake up</li>\n  <li>Eat</li>\n</ol>",mission:"Make a numbered list with 3 steps: **Wake up**, **Code**, **Sleep**.",starter:"",
 job:"Make a numbered list with `<ol>`. Put 3 `<li>` items inside: **Wake up**, **Code** and **Sleep**.",
 hints:["Same as a bullet list, but the box is `<ol>` instead of `<ul>`.","Three `<li>` items go inside.","`<ol><li>Wake up</li><li>Code</li><li>Sleep</li></ol>`"],answer:"<ol>\n  <li>Wake up</li>\n  <li>Code</li>\n  <li>Sleep</li>\n</ol>",
 tip:"ul = bullets. ol = numbers. That's the whole difference!",
 checks:[has('ol',"I need an `<ol>` (numbered list) box."),[a=>a.$$('ol li').length>=3,"Your `<ol>` needs 3 `<li>` items inside it."],[a=>{const t=a.text(a.$('ol'));return['wake up','code','sleep'].every(w=>t.includes(w));},"The steps should be **Wake up**, **Code** and **Sleep**."]]},
{id:'div',g:'g1',name:'Boxxy',color:'#0ea5e9',concept:'Boxes <div>',
 learn:"`<div>` is an **invisible box**. We use it to keep things together.\n\nOn its own you can't see it. Later, CSS turns divs into cards, menus and whole pages!",
 example:"<div>\n  <h2>Shop</h2>\n  <p>Open now</p>\n</div>",mission:"Make a `<div>` that holds an `<h2>` saying **Hero** and a `<p>` saying **Level 5**.",starter:"",
 job:"Make a `<div>` box. Inside it, put an `<h2>` that says **Hero** and a `<p>` that says **Level 5**.",
 hints:["Open the box: `<div>`","Inside it, put `<h2>Hero</h2>` and `<p>Level 5</p>`","Close the box at the end: `</div>`"],answer:"<div>\n  <h2>Hero</h2>\n  <p>Level 5</p>\n</div>",
 tip:"Push the inside lines in with spaces. Then you can see what is inside what.",
 checks:[has('div',"I can't find a `<div>`."),has('div h2',"The `<h2>` must be INSIDE the `<div>`."),hasText('div h2','hero',"The `<h2>` should say **Hero**."),has('div p',"The `<p>` must be INSIDE the `<div>`."),hasText('div p','level 5',"The `<p>` should say **Level 5**.")]},
{id:'input',g:'g1',name:'Inputa',color:'#a855f7',concept:'Text boxes <input>',
 learn:"`<input>` makes a box you can type in. Like `<img>`, it has **no closing tag**.\n\n`placeholder` shows grey hint words in the box before you type.",
 example:"<input placeholder=\"Search...\">\n<button>Go</button>",mission:"Make an `<input>` with placeholder **Your name**, and a `<button>` that says **Go**.",starter:"",
 job:"Make a typing box: `<input placeholder=\"Your name\">`. Then make a `<button>` that says **Go**.",
 hints:["`<input placeholder=\"\">` — fill in the quotes with Your name.","Then on the next line, make a button that says Go.","`<input placeholder=\"Your name\">` and `<button>Go</button>`"],answer:"<input placeholder=\"Your name\">\n<button>Go</button>",
 tip:"Try typing in your box in the preview — it really works!",
 checks:[has('input',"I can't find an `<input>` tag."),[a=>(a.$('input').getAttribute('placeholder')||'').toLowerCase().includes('your name'),"Your input needs `placeholder=\"Your name\"` inside the tag."],has('button',"Don't forget the `<button>`."),hasText('button','go',"The button should say **Go**.")]},
{id:'color',g:'r2',name:'Painto',color:'#e11d48',concept:'CSS colour',
 learn:"HTML builds the page. **CSS** is the paint and the clothes!\n\nCSS goes inside a `<style>` tag. A CSS rule looks like this:\n`h1 { color: red; }`\n\n• `h1` = WHO to paint\n• `color` = WHAT to change\n• `red` = the new look\n\nCurly braces `{ }` hold the rule. A colon `:` goes in the middle. A semicolon `;` goes at the end.",
 example:"<h1>Hi</h1>\n\n<style>\n  h1 { color: blue; }\n</style>",mission:"Inside the `<style>` tag, make the `<h1>` text **red**.",starter:"<h1>Paint me!</h1>"+STYLE_START,
 job:"Make the heading red. Inside the `<style>` box, type `h1 { color: red; }`.",
 hints:["Click on the empty line inside `<style>` and write `h1 { }`","Inside the curly braces write: `color: red;`","Full rule: `h1 { color: red; }`"],answer:"<h1>Paint me!</h1>\n\n<style>\n  h1 { color: red; }\n</style>",
 tip:"Sneaky trap: CSS only knows the American spelling `color`. Writing colour won't work!",
 checks:[has('h1',"Keep the `<h1>` — we need something to paint!"),cssIs('h1','color',RED,"The heading isn't red yet. Inside `<style>` write `h1 { color: red; }` — curly braces, colon, semicolon.")]},
{id:'bg',g:'r2',name:'Skyla',color:'#38bdf8',concept:'Background colour',
 learn:"`background-color` paints the space BEHIND things.\n\nWant to paint the whole page? Use `body`. It is the box that holds everything you see.\n\nCSS knows lots of colour names, like `lightblue`, `gold`, `tomato` and `hotpink`!",
 example:"body { background-color: gold; }",mission:"Give the **body** a `background-color` of **lightblue**.",starter:"<h1>Sky Level</h1>"+STYLE_START,
 job:"Paint the whole page light blue. Inside `<style>`, type `body { background-color: lightblue; }`.",
 hints:["The selector is `body`","The property has a dash in the middle: `background-color`","`body { background-color: lightblue; }`"],answer:"<h1>Sky Level</h1>\n\n<style>\n  body { background-color: lightblue; }\n</style>",
 tip:"CSS names with two words use a dash: background-color, font-size, text-align.",
 checks:[cssIs('body','backgroundColor',LIGHTBLUE,"The page isn't light blue yet. Write `body { background-color: lightblue; }` (lightblue is one word).")]},
{id:'fontsize',g:'r2',name:'Fonto',color:'#65a30d',concept:'Text size',
 learn:"`font-size` changes how big text is.\n\n`px` means **pixels**. Pixels are the tiny dots on your screen. `16px` is normal text. `40px` is huge!",
 example:"p { font-size: 24px; }",mission:"Make the `<p>` text **30px** big.",starter:"<p>Grow!</p>"+STYLE_START,
 job:"Make the words bigger. Inside `<style>`, type `p { font-size: 30px; }`.",
 hints:["The selector is `p`","The property is `font-size`","`p { font-size: 30px; }`"],answer:"<p>Grow!</p>\n\n<style>\n  p { font-size: 30px; }\n</style>",
 tip:"No space between the number and px: 30px ✅   30 px ❌",
 checks:[cssPx('p','fontSize',30,"The paragraph isn't 30px yet. Write `p { font-size: 30px; }` — no space between 30 and px.")]},
{id:'class',g:'r2',name:'Classie',color:'#16a34a',concept:'Classes .name',
 learn:"What if you only want to paint SOME things? Give them a **class**. A class is like a name tag.\n\nIn HTML: `<p class=\"hero\">`\nIn CSS, use a **dot** and the name: `.hero { }`\n\nNow only things with that name tag get painted.",
 example:"<p class=\"gold\">Rare item</p>\n\n<style>\n  .gold { color: orange; }\n</style>",mission:"Use `.hero` to make ONLY the hero paragraph **green**. The villager must stay normal!",
 starter:"<p class=\"hero\">I am the hero</p>\n<p>I am a villager</p>"+STYLE_START,
 job:"Make ONLY the hero green. Inside `<style>`, type `.hero { color: green; }`. Don't forget the dot!",
 hints:["Don't use `p` — that would paint BOTH paragraphs.","Use a dot and the class name: `.hero { }`","`.hero { color: green; }`"],answer:"<p class=\"hero\">I am the hero</p>\n<p>I am a villager</p>\n\n<style>\n  .hero { color: green; }\n</style>",
 tip:"Lots of things can share one class. Style the class once, and they ALL change. That's the superpower.",
 checks:[has('p.hero',"Keep the hero paragraph with `class=\"hero\"`."),cssIs('p.hero','color',GREEN,"The hero isn't green yet. Write `.hero { color: green; }`"),[a=>{const v=a.$('p:not(.hero)');return !v||a.css(v,'color')!==GREEN;},"Oops — the villager turned green too! Use `.hero` (with a dot), not `p`."]]},
{id:'border',g:'r2',name:'Bordo',color:'#78716c',concept:'Borders',
 learn:"`border` draws a line around a box. It takes **3 things**: how thick, what style, what colour.\n\n`border: 2px solid black;`\n\nStyles include `solid`, `dashed` and `dotted`.",
 example:".card { border: 4px dashed hotpink; }",mission:"Give `.box` a border of **3px solid black**.",starter:"<div class=\"box\">Treasure</div>"+STYLE_START,
 job:"Draw a line around the box. Inside `<style>`, type `.box { border: 3px solid black; }`.",
 hints:["The selector is `.box`","Inside it: `border: 3px solid black;`","`.box { border: 3px solid black; }`"],answer:"<div class=\"box\">Treasure</div>\n\n<style>\n  .box { border: 3px solid black; }\n</style>",
 tip:"When a property takes many values, put spaces between them — not commas.",
 checks:[has('.box',"Keep the `<div class=\"box\">`."),cssPx('.box','borderTopWidth',3,"The border should be `3px` thick: `border: 3px solid black;`"),cssIs('.box','borderTopStyle','solid',"The border style should be `solid`: `border: 3px solid black;`")]},
{id:'padding',g:'r2',name:'Paddo',color:'#f472b6',concept:'Padding & margin',
 learn:"Every thing on a page is a **box**.\n\n• **Padding** = space INSIDE the box (between the edge and the words)\n• **Margin** = space OUTSIDE the box (it pushes other boxes away)\n\nThink of a parcel. Padding is the bubble wrap inside. Margin is the gap between parcels on a shelf.",
 example:".card { padding: 12px; margin: 20px; }",mission:"Give `.box` **20px** of padding so the word has room to breathe.",
 starter:"<div class=\"box\">Loot</div>\n\n<style>\n  .box { border: 2px solid black; }\n  \n</style>",
 job:"Give the word room inside its box. Add `padding: 20px;` to `.box`.",
 hints:["You can add it inside the `.box` rule that is already there, or write a new `.box { }` rule.","The line to add is `padding: 20px;`","`.box { border: 2px solid black; padding: 20px; }`"],answer:"<div class=\"box\">Loot</div>\n\n<style>\n  .box { border: 2px solid black; padding: 20px; }\n</style>",
 tip:"One rule can hold many properties. Just keep adding them. Each one ends with a semicolon.",
 checks:[cssPx('.box','paddingTop',20,"`.box` needs `padding: 20px;`")]},
{id:'radius',g:'r2',name:'Coinz',color:'#eab308',concept:'Round corners',
 learn:"`border-radius` makes the corners of a box round.\n\nSmall numbers like `8px` = a little bit round.\n`50%` on a square = a perfect circle!",
 example:".avatar { border-radius: 50%; }",mission:"Turn the `.coin` into a circle with `border-radius: 50%`.",
 starter:"<div class=\"coin\"></div>\n\n<style>\n  .coin { width: 80px; height: 80px; background: gold; }\n  \n</style>",
 job:"Turn the square coin into a circle. Add `border-radius: 50%;` to `.coin`.",
 hints:["Add it to the `.coin` rule (or write a new `.coin { }` rule).","The line to add is `border-radius: 50%;`","`.coin { width: 80px; height: 80px; background: gold; border-radius: 50%; }`"],answer:"<div class=\"coin\"></div>\n\n<style>\n  .coin { width: 80px; height: 80px; background: gold; border-radius: 50%; }\n</style>",
 tip:"Most buttons and cards today have a little border-radius. Sharp corners look old.",
 checks:[[a=>{const v=a.css(a.$('.coin'),'borderTopLeftRadius');return v==='50%'||px(v)>=39;},"The coin isn't round yet. Add `border-radius: 50%;` to `.coin`."]]},
{id:'id',g:'g2',name:'Idol',color:'#9333ea',concept:'IDs #name',
 learn:"An **id** is like a class, but for ONE thing only — like your own secret number. No two things share an id.\n\nIn HTML: `id=\"boss\"`\nIn CSS, use a **hash**: `#boss { }`",
 example:"<h1 id=\"logo\">Shop</h1>\n\n<style>\n  #logo { color: teal; }\n</style>",mission:"Use `#boss` to make the text **purple**.",starter:"<h1 id=\"boss\">Final Boss</h1>"+STYLE_START,
 job:"Make the boss purple. Inside `<style>`, type `#boss { color: purple; }`.",
 hints:["A class uses a dot. An id uses a hash `#`.","Start the rule with `#boss { }`","`#boss { color: purple; }`"],answer:"<h1 id=\"boss\">Final Boss</h1>\n\n<style>\n  #boss { color: purple; }\n</style>",
 tip:"Memory trick: class = dot (.) because there can be lots, like dots. id = hash (#), like a special number.",
 checks:[cssIs('#boss','color',PURPLE,"The boss isn't purple yet. Write `#boss { color: purple; }`")]},
{id:'center',g:'g2',name:'Centra',color:'#0891b2',concept:'Centering text',
 learn:"`text-align` moves words to the left, the right, or the middle of their box.\n\n`text-align: center;` is the one we use most!",
 example:"h2 { text-align: right; }",mission:"Put the `<h1>` text in the middle with `text-align: center`.",starter:"<h1>Arena</h1>"+STYLE_START,
 job:"Put the heading in the middle. Inside `<style>`, type `h1 { text-align: center; }`.",
 hints:["The selector is `h1`","Inside it: `text-align: center;`","`h1 { text-align: center; }`"],answer:"<h1>Arena</h1>\n\n<style>\n  h1 { text-align: center; }\n</style>",
 tip:"text-align moves TEXT inside a box. To move whole boxes, you'll use Flexbox — coming soon in Flex Peaks!",
 checks:[cssIs('h1','textAlign','center',"The heading isn't in the middle yet. Write `h1 { text-align: center; }`")]},
{id:'hover',g:'g2',name:'Hovera',color:'#f97316',concept:'Hover effects :hover',
 learn:"Add `:hover` to a selector. Now the style ONLY shows when the mouse is on top of it.\n\n`.btn:hover { }`\n\nThis is how buttons light up when you point at them!",
 example:".link:hover { color: red; }",mission:"Make `.btn` get an **orange** `background-color` when you hover over it.\n\n(Then move your mouse over the button in the preview to test it!)",
 starter:"<button class=\"btn\">Hover me</button>\n\n<style>\n  .btn { padding: 10px 20px; }\n  \n</style>",
 job:"Make the button turn orange when the mouse is on it. Add a new rule: `.btn:hover { background-color: orange; }`.",
 hints:["Write a NEW rule that starts with `.btn:hover`","No space between `.btn` and `:hover`","`.btn:hover { background-color: orange; }`"],answer:"<button class=\"btn\">Hover me</button>\n\n<style>\n  .btn { padding: 10px 20px; }\n  .btn:hover { background-color: orange; }\n</style>",
 tip:"Phones have no mouse, so hover is just a bonus. Never hide important things behind hover.",
 checks:[hoverRule('.btn:hover',"Add a new rule: `.btn:hover { background-color: orange; }` (no space before `:hover`).")]},
{id:'flex',g:'r3',name:'Flexo',color:'#10b981',concept:'Flexbox: display flex',
 learn:"Boxes normally stack on top of each other, like pancakes 🥞.\n\n**Flexbox** puts them side by side, like train carriages 🚃.\n\nPut `display: flex;` on the **parent** box (the box that holds the others). Its children line up in a row.",
 example:".row { display: flex; }",mission:"Make `.row` a flex box with `display: flex` so A, B and C sit side by side.",
 starter:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n  <div class=\"item\">C</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; margin: 4px; }\n  \n</style>",
 job:"Make A, B and C sit side by side. Add a new rule: `.row { display: flex; }`.",
 hints:["The parent is `.row` — style that, not `.item`.","The line you need is `display: flex;`","`.row { display: flex; }`"],
 answer:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n  <div class=\"item\">C</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; margin: 4px; }\n  .row { display: flex; }\n</style>",
 tip:"Flex goes on the PARENT, not the children. The parent is the box holding the others. Lots of beginners mix this up!",
 checks:[cssIs('.row','display','flex',"`.row` isn't flex yet. Flex goes on the parent: `.row { display: flex; }`")]},
{id:'justify',g:'r3',name:'Centrix',color:'#3b82f6',concept:'justify-content',
 learn:"When a box is flex, `justify-content` says WHERE its children sit in the row:\n\n• `flex-start` = left\n• `center` = middle\n• `flex-end` = right\n• `space-between` = spread out to the edges",
 example:".row { display: flex; justify-content: flex-end; }",mission:"Move A, B and C to the **center** of the row with `justify-content: center`.",
 starter:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n  <div class=\"item\">C</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; margin: 4px; }\n  .row { display: flex; }\n  \n</style>",
 job:"Move A, B and C to the middle. Add `justify-content: center;` to `.row`.",
 hints:["Add it to the `.row` rule.","The line you need is `justify-content: center;`","`.row { display: flex; justify-content: center; }`"],
 answer:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n  <div class=\"item\">C</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; margin: 4px; }\n  .row { display: flex; justify-content: center; }\n</style>",
 tip:"Try flex-end, then space-between, and watch the preview. Playing is the fastest way to learn!",
 checks:[cssIs('.row','display','flex',"Keep `display: flex;` on `.row`."),cssIs('.row','justifyContent','center',"Add `justify-content: center;` to `.row`.")]},
{id:'gap',g:'r3',name:'Gapper',color:'#f59e0b',concept:'gap',
 learn:"`gap` puts the same space BETWEEN flex children. No maths needed!",
 example:".row { display: flex; gap: 8px; }",mission:"Add a **20px** gap between the items with `gap: 20px`.",
 starter:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n  <div class=\"item\">C</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; }\n  .row { display: flex; }\n  \n</style>",
 job:"Put space between A, B and C. Add `gap: 20px;` to `.row`.",
 hints:["Add it to the `.row` rule.","The line you need is `gap: 20px;`","`.row { display: flex; gap: 20px; }`"],
 answer:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n  <div class=\"item\">C</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; }\n  .row { display: flex; gap: 20px; }\n</style>",
 tip:"gap only adds space BETWEEN items, never on the outside edges. Super neat.",
 checks:[cssIs('.row','display','flex',"Keep `display: flex;` on `.row`."),gapPx('.row',20,"Add `gap: 20px;` to `.row`.")]},
{id:'column',g:'r3',name:'Stacko',color:'#8b5cf6',concept:'flex-direction',
 learn:"`flex-direction` picks which way the train goes:\n\n• `row` = side by side (this is normal)\n• `column` = top to bottom\n\nPhone apps use columns ALL the time.",
 example:".menu { display: flex; flex-direction: column; }",mission:"Stack the items in a **column** with `flex-direction: column`.",
 starter:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n  <div class=\"item\">C</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; }\n  .row { display: flex; gap: 8px; }\n  \n</style>",
 job:"Stack A, B and C from top to bottom. Add `flex-direction: column;` to `.row`.",
 hints:["Add it to the `.row` rule.","The line you need is `flex-direction: column;`","`.row { display: flex; gap: 8px; flex-direction: column; }`"],
 answer:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n  <div class=\"item\">C</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; }\n  .row { display: flex; gap: 8px; flex-direction: column; }\n</style>",
 tip:"gap still works in a column — now it adds space up and down.",
 checks:[cssIs('.row','display','flex',"Keep `display: flex;` on `.row`."),cssIs('.row','flexDirection','column',"Add `flex-direction: column;` to `.row`.")]},
{id:'align',g:'r3',name:'Alignis',color:'#ec4899',concept:'align-items',
 learn:"Two ways to move, two controls:\n\n• `justify-content` → along the row (left ↔ right)\n• `align-items` → up and down (↕)\n\n`align-items: center;` puts things in the middle, up-and-down.",
 example:".bar { display: flex; height: 60px; align-items: center; }",mission:"Put the items in the middle **up-and-down** with `align-items: center`.",
 starter:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; }\n  .row { display: flex; gap: 8px; height: 180px; background: #eef2ff; }\n  \n</style>",
 job:"Move A and B to the middle, up-and-down. Add `align-items: center;` to `.row`.",
 hints:["Add it to the `.row` rule.","The line you need is `align-items: center;`","`.row { display: flex; gap: 8px; height: 180px; background: #eef2ff; align-items: center; }`"],
 answer:"<div class=\"row\">\n  <div class=\"item\">A</div>\n  <div class=\"item\">B</div>\n</div>\n\n<style>\n  .item { background: gold; padding: 10px; }\n  .row { display: flex; gap: 8px; height: 180px; background: #eef2ff; align-items: center; }\n</style>",
 tip:"Memory trick: justify = a journey along the road. align = altitude (how high up).",
 checks:[cssIs('.row','display','flex',"Keep `display: flex;` on `.row`."),cssIs('.row','alignItems','center',"Add `align-items: center;` to `.row`.")]},
{id:'perfect',g:'g3',name:'Perfecto',color:'#22c55e',concept:'Perfect centering',
 learn:"The most famous trick in web design — put something in the exact middle:\n\n`display: flex;`\n`justify-content: center;`\n`align-items: center;`\n\nThree lines. Every web developer knows them!",
 example:".stage {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",mission:"Put the ⭐ in the exact middle of `.stage`. Add `display: flex`, `justify-content: center` and `align-items: center` to `.stage`.",
 starter:"<div class=\"stage\">\n  <div class=\"hero\">⭐</div>\n</div>\n\n<style>\n  .stage { height: 200px; background: #eef2ff; }\n  .hero { font-size: 40px; }\n  \n</style>",
 job:"Put the star in the exact middle. Add 3 lines to `.stage`: `display: flex;` `justify-content: center;` `align-items: center;`",
 hints:["All three lines go on the parent: `.stage`","You need `display: flex;`, `justify-content: center;` AND `align-items: center;`","`.stage { height: 200px; background: #eef2ff; display: flex; justify-content: center; align-items: center; }`"],
 answer:"<div class=\"stage\">\n  <div class=\"hero\">⭐</div>\n</div>\n\n<style>\n  .stage { height: 200px; background: #eef2ff; display: flex; justify-content: center; align-items: center; }\n  .hero { font-size: 40px; }\n</style>",
 tip:"Remember this trio. You'll use it forever as a developer!",
 checks:[cssIs('.stage','display','flex',"`.stage` needs `display: flex;`"),cssIs('.stage','justifyContent','center',"`.stage` needs `justify-content: center;`"),cssIs('.stage','alignItems','center',"`.stage` needs `align-items: center;`")]},
{id:'nav',g:'g3',name:'Navvy',color:'#0ea5e9',concept:'Navigation bars',
 learn:"Almost every website has a menu bar at the top. It's just a flex box!\n\n`justify-content: space-between;` pushes the first link to the left edge, the last to the right edge, and spreads the rest out.",
 example:".nav { display: flex; justify-content: space-between; }",mission:"Make `.nav` a flex box (`display: flex`) and spread the links out with `justify-content: space-between`.",
 starter:"<div class=\"nav\">\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Shop</a>\n  <a href=\"#\">Contact</a>\n</div>\n\n<style>\n  .nav { background: #fff1ea; padding: 12px; }\n  \n</style>",
 job:"Spread the menu links across the bar. Add `display: flex;` and `justify-content: space-between;` to `.nav`.",
 hints:["Two new lines go on `.nav`.","`display: flex;` and `justify-content: space-between;`","`.nav { background: #fff1ea; padding: 12px; display: flex; justify-content: space-between; }`"],
 answer:"<div class=\"nav\">\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Shop</a>\n  <a href=\"#\">Contact</a>\n</div>\n\n<style>\n  .nav { background: #fff1ea; padding: 12px; display: flex; justify-content: space-between; }\n</style>",
 tip:"`href=\"#\"` is a pretend link that goes nowhere — handy while you're still building.",
 checks:[cssIs('.nav','display','flex',"`.nav` needs `display: flex;`"),cssIs('.nav','justifyContent','space-between',"`.nav` needs `justify-content: space-between;`")]},
{id:'wrap',g:'g3',name:'Wrapper',color:'#a855f7',concept:'flex-wrap',
 learn:"Too many things for one row? Flex squishes them all to fit.\n\n`flex-wrap: wrap;` lets them drop onto a new line instead — just like words in a sentence. Photo galleries work like this!",
 example:".gallery { display: flex; flex-wrap: wrap; }",mission:"Let the items in `.grid` wrap onto new lines with `flex-wrap: wrap`.",
 starter:"<div class=\"grid\">\n  <div class=\"item\">1</div><div class=\"item\">2</div><div class=\"item\">3</div>\n  <div class=\"item\">4</div><div class=\"item\">5</div><div class=\"item\">6</div>\n</div>\n\n<style>\n  .item { width: 120px; background: gold; padding: 14px; }\n  .grid { display: flex; gap: 8px; }\n  \n</style>",
 job:"Let the boxes drop onto a new line when the row is full. Add `flex-wrap: wrap;` to `.grid`.",
 hints:["Add it to the `.grid` rule.","The line you need is `flex-wrap: wrap;`","`.grid { display: flex; gap: 8px; flex-wrap: wrap; }`"],
 answer:"<div class=\"grid\">\n  <div class=\"item\">1</div><div class=\"item\">2</div><div class=\"item\">3</div>\n  <div class=\"item\">4</div><div class=\"item\">5</div><div class=\"item\">6</div>\n</div>\n\n<style>\n  .item { width: 120px; background: gold; padding: 14px; }\n  .grid { display: flex; gap: 8px; flex-wrap: wrap; }\n</style>",
 tip:"Wrap + gap = a gallery that fits phones AND big screens.",
 checks:[cssIs('.grid','display','flex',"Keep `display: flex;` on `.grid`."),cssIs('.grid','flexWrap','wrap',"Add `flex-wrap: wrap;` to `.grid`.")]},
{id:'card',g:'ch',name:'Cardinal',color:'#dc2626',concept:'Build a card',
 learn:"Final test, champ! Real websites are just small skills stacked together.\n\nA **card** = a div box + a heading + some words + a border + padding. You've done every piece already!",
 example:"<div class=\"card\">\n  <h2>Title</h2>\n  <p>Text</p>\n</div>\n\n<style>\n  .card { border: 2px solid black; padding: 16px; }\n</style>",
 mission:"Make a `<div class=\"card\">` with an `<h2>` (any name) and a `<p>` (any words) inside.\nThen in CSS, give `.card` a **border** (like `2px solid black`) and `padding: 16px`.",starter:"<!-- build your card here -->\n"+STYLE_START,
 job:"Make `<div class=\"card\">` with an `<h2>` and a `<p>` inside. In `<style>`, give `.card` a border (like `border: 2px solid black;`) and `padding: 16px;`.",
 hints:["HTML first: `<div class=\"card\">` with an `<h2>` and a `<p>` inside, then `</div>`.","CSS next: write a `.card { }` rule inside `<style>`.","Inside it: `border: 2px solid black; padding: 16px;`"],
 answer:"<div class=\"card\">\n  <h2>Flexo</h2>\n  <p>A friendly layout Codeling.</p>\n</div>\n\n<style>\n  .card { border: 2px solid black; padding: 16px; }\n</style>",
 tip:"Add `border-radius: 12px;` too, for style points. Real cards almost always have it.",
 checks:[has('div.card',"I need a `<div class=\"card\">`."),has('.card h2',"Put an `<h2>` inside the card."),has('.card p',"Put a `<p>` inside the card."),cssNot('.card','borderTopStyle','none',"Give `.card` a border, like `border: 2px solid black;`"),cssPx('.card','paddingTop',16,"Give `.card` `padding: 16px;`")]},
{id:'menu',g:'ch',name:'Menuet',color:'#2563eb',concept:'Build a menu',
 learn:"Menus are usually lists turned sideways with flexbox. HTML says what it is (a list of links). CSS makes it look good.",
 example:"<ul class=\"menu\">\n  <li>Home</li>\n</ul>",mission:"Make a `<ul class=\"menu\">` with **3** `<li>` items (any words).\nThen give `.menu` `display: flex` and `gap: 10px`.",starter:"<!-- your menu here -->\n"+STYLE_START,
 job:"Make `<ul class=\"menu\">` with 3 `<li>` items (any words). In `<style>`, give `.menu` `display: flex;` and `gap: 10px;`.",
 hints:["HTML: `<ul class=\"menu\">`, then 3 `<li>` items, then `</ul>`","CSS: write a `.menu { }` rule inside `<style>`.","`.menu { display: flex; gap: 10px; }`"],
 answer:"<ul class=\"menu\">\n  <li>Home</li>\n  <li>Games</li>\n  <li>About</li>\n</ul>\n\n<style>\n  .menu { display: flex; gap: 10px; }\n</style>",
 tip:"Want to remove the bullet dots? Add `list-style: none;` to `.menu`.",
 checks:[has('ul.menu',"I need a `<ul class=\"menu\">`."),[a=>a.$$('ul.menu li').length>=3,"Your menu needs 3 `<li>` items inside it."],cssIs('.menu','display','flex',"`.menu` needs `display: flex;`"),gapPx('.menu',10,"`.menu` needs `gap: 10px;`")]},
{id:'banner',g:'ch',name:'Bannerox',color:'#f5b301',concept:'Build a banner',
 learn:"The big coloured strip at the top of a website is called a **hero banner**. A coloured background and a big heading in the middle. You have every skill you need. Finish this, and the crown is yours!",
 example:".banner { background-color: tomato; text-align: center; }",
 mission:"Make a `<div class=\"banner\">` with an `<h1>` inside (any words).\nGive `.banner` a `background-color` (any colour, like `gold`) and `text-align: center`.",starter:"<!-- your banner here -->\n"+STYLE_START,
 job:"Make `<div class=\"banner\">` with an `<h1>` inside. In `<style>`, give `.banner` a `background-color` (like `gold`) and `text-align: center;`.",
 hints:["HTML: `<div class=\"banner\">` with an `<h1>` inside.","CSS on `.banner`: `background-color: gold;`","…and `text-align: center;` — the words inside the banner move to the middle."],
 answer:"<div class=\"banner\">\n  <h1>Welcome, Champion!</h1>\n</div>\n\n<style>\n  .banner { background-color: gold; text-align: center; padding: 30px; }\n</style>",
 tip:"text-align on a parent flows down to the words inside it. Styles flow from parent to children — that's the 'Cascading' in Cascading Style Sheets.",
 checks:[has('div.banner',"I need a `<div class=\"banner\">`."),has('.banner h1',"Put an `<h1>` inside the banner."),cssNot('.banner','backgroundColor',CLEAR,"Give `.banner` a `background-color`, like `background-color: gold;`"),cssIs('.banner h1','textAlign','center',"Put the heading in the middle: add `text-align: center;` to `.banner`.")]}
];
const CHM=Object.fromEntries(CH.map((c,i)=>[c.id,Object.assign(c,{v:i})]));
const POOL=g=>CH.filter(c=>c.g===g).map(c=>c.id);
const GYMS={
 tag:{leader:'Marka',title:'Tag Gym',badge:'Tag Badge',icon:'🏷️',need:'r1',pool:POOL('g1'),
   intro:["Welcome to the Tag Gym! I'm Marka, the leader.","I've been building web pages since before you could spell <html>!","Three rounds. Show me you can structure a page. Ready? Let's go!"],
   win:["Incredible! You really know your tags, {name}.","Take the TAG BADGE. The guard to the east will now let you into Style Forest!"]},
 style:{leader:'Hue',title:'Style Gym',badge:'Style Badge',icon:'🎨',need:'r2',pool:POOL('g2'),
   intro:["Ah, a new challenger. I'm Hue.","Anyone can build a page. Making it BEAUTIFUL? That's an art.","Three rounds. Dazzle me!"],
   win:["Stunning work! You have real style, {name}.","The STYLE BADGE is yours. The path north to Flex Peaks is now open!"]},
 flex:{leader:'Flexa',title:'Flex Gym',badge:'Flex Badge',icon:'🧩',need:'r3',pool:POOL('g3'),
   intro:["I'm Flexa. I can bend any layout to my will.","Layouts are where most beginners give up. Let's see if you're different.","Three rounds. Stay flexible!"],
   win:["You... you actually did it! Flawless layouts.","Take the FLEX BADGE. The Champion awaits you in the golden tower."]},
 champ:{leader:'Champion Kode',title:'Champion Tower',badge:'Champion Crown',icon:'👑',pool:POOL('ch'),
   intro:["So. You're the one everyone's talking about.","I'm Kode, the Champion. I don't test single skills. I test if you can BUILD.","Three real builds. Win, and the crown is yours."],
   win:["...Remarkable. You didn't just learn tags and styles. You learned to build.","From today, you are the CODE CHAMPION, {name}!"]}
};
window.__Q1ART=(c,v,sz)=>creatureSVG(c,v,sz);
const STARTERS=[{name:'Tagglet',color:'#ff7a59',v:3,desc:'Fiery & loves HTML tags'},{name:'Stylo',color:'#4f8cff',v:9,desc:'Cool & stylish with CSS'},{name:'Flexi',color:'#22c55e',v:14,desc:'Bends into any layout'}];

function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=amt<0?0:255,p=Math.abs(amt);r=Math.round((t-r)*p+r);g=Math.round((t-g)*p+g);b=Math.round((t-b)*p+b);return `rgb(${r},${g},${b})`;}
function creatureSVG(col,v=0,size=120,ghost=false){
 const d=shade(col,-.28),l=shade(col,.5),ears=v%4,body=Math.floor(v/4)%3,face=v%3;
 const tops=[`<path d="M30 50 L34 12 L56 40Z" fill="${d}"/><path d="M90 50 L86 12 L64 40Z" fill="${d}"/><path d="M36 42 L37 22 L48 38Z" fill="${l}"/><path d="M84 42 L83 22 L72 38Z" fill="${l}"/>`,
  `<path d="M50 40 Q44 20 34 12" stroke="${d}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="34" cy="12" r="7" fill="${l}" stroke="${d}" stroke-width="2.5"/><path d="M70 40 Q76 20 86 12" stroke="${d}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="86" cy="12" r="7" fill="${l}" stroke="${d}" stroke-width="2.5"/>`,
  `<path d="M28 52 L36 20 L48 40 L60 12 L72 40 L84 20 L92 52Z" fill="${d}"/>`,
  `<circle cx="32" cy="40" r="14" fill="${d}"/><circle cx="88" cy="40" r="14" fill="${d}"/><circle cx="32" cy="40" r="7" fill="${l}"/><circle cx="88" cy="40" r="7" fill="${l}"/>`];
 const bodies=[`<ellipse cx="60" cy="74" rx="40" ry="36" fill="${col}"/>`,`<rect x="22" y="38" width="76" height="72" rx="28" fill="${col}"/>`,`<path d="M18 82 Q14 38 60 36 Q106 38 102 82 Q100 112 60 112 Q20 112 18 82Z" fill="${col}"/>`];
 const brows=face===1?`<path d="M38 52 L54 57" stroke="#2a2840" stroke-width="3.5" stroke-linecap="round"/><path d="M82 52 L66 57" stroke="#2a2840" stroke-width="3.5" stroke-linecap="round"/>`:'';
 const mouth=face===2?`<path d="M52 80 Q60 88 68 80" stroke="#2a2840" stroke-width="3" fill="#fff" stroke-linecap="round"/><path d="M55 81 L57 86 L59 81" fill="#fff"/>`:`<path d="M52 79 Q60 87 68 79" stroke="#2a2840" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 const svg=`${tops[ears]}<ellipse cx="42" cy="110" rx="12" ry="6" fill="${d}"/><ellipse cx="78" cy="110" rx="12" ry="6" fill="${d}"/>${bodies[body]}
 <ellipse cx="60" cy="92" rx="22" ry="15" fill="${l}"/><text x="60" y="97" font-size="12" text-anchor="middle" fill="${d}" font-family="monospace" font-weight="bold">&lt;/&gt;</text>
 <circle cx="45" cy="66" r="9.5" fill="#fff"/><circle cx="75" cy="66" r="9.5" fill="#fff"/><circle cx="47" cy="67" r="5.2" fill="#2a2840"/><circle cx="77" cy="67" r="5.2" fill="#2a2840"/>
 <circle cx="49" cy="64.5" r="1.9" fill="#fff"/><circle cx="79" cy="64.5" r="1.9" fill="#fff"/>${brows}
 <circle cx="31" cy="80" r="5.5" fill="#ff8fa3" opacity=".55"/><circle cx="89" cy="80" r="5.5" fill="#ff8fa3" opacity=".55"/>${mouth}`;
 return `<svg viewBox="0 0 120 120" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" ${ghost?'style="filter:grayscale(1) brightness(1.4);opacity:.45"':''}>${svg}</svg>`;
}

const fresh=()=>({name:'',starter:0,map:'town',x:10,y:7,dir:'down',hp:100,xp:0,caught:{},seen:{},badges:{},started:false,champion:false});
let S=fresh();
function save(){store.set(QKEY,S);}
function load(){const o=store.get(QKEY,null);return o&&o.started?Object.assign(fresh(),o):null;}
const lvl=()=>1+Math.floor(S.xp/100);
const maxHP=()=>80+lvl()*20;
const caughtCount=()=>CH.filter(c=>S.caught[c.id]).length;
const badgeCount=()=>Object.keys(GYMS).filter(k=>S.badges[k]).length;
const fill=s=>s.replace(/\{name\}/g,S.name||'Coder');

const TW=20,TH=15,T=32;
const THEMES={
 town:{grass:'#b5e57c',speck:'#9fd466',path:'#f1dca7',tall:'#7cc35a',tallDark:'#4f9a3a',tree:'#4fa64a',treeHi:'#7cc96a'},
 r1:{grass:'#a9e173',speck:'#93cf5c',path:'#ecd59b',tall:'#74be52',tallDark:'#469334',tree:'#47a043',treeHi:'#72c463'},
 r2:{grass:'#98d68a',speck:'#82c274',path:'#e6d2a6',tall:'#5fae62',tallDark:'#3a8443',tree:'#2f8a4a',treeHi:'#5bb06c'},
 r3:{grass:'#c4e19a',speck:'#aed083',path:'#e9d8b4',tall:'#8fbf63',tallDark:'#5f9440',tree:'#5a9b58',treeHi:'#85bf77'}};
const MAPS={
 town:{name:'PIXEL TOWN',theme:'town',rows:["TTTTTTTTTEETTTTTTTTT","T....F...,,...F....T","T.HHHH...,,...CCCC.T","T.HHHH...,,...CCCC.T","T.HHDH...,,...CCcC.T","T...,....,,.....,..T","T...,,,,,,,,,,,,,..T","T.S.......,.....F..T","T..F...............T","T~~~~..........F...T","T~~~~..............T","T~~~~.....F........T","T..F...........F...T","T..................T","TTTTTTTTTTTTTTTTTTTT"],
  exits:{'9,0':['route1',9,13],'10,0':['route1',10,13]},signs:{'2,7':["PIXEL TOWN — where every coder's journey begins.","↑ North: HTML Meadow"]},
  npcs:[{x:12,y:7,name:'Prof. Byte',shirt:'#ffffff',cap:'#8b7cff',lines:()=>{const b=badgeCount();
     if(S.champion)return["{name}! The Code Champion! I'm so proud.","Keep training in the grass anytime. Every review makes the skills stick."];
     if(b===0)return["Head north to HTML Meadow, {name}!","Walk through the tall grass — wild Codelings hide there.","You win battles by WRITING the code they ask for. Stuck? Use Hint, Tip or Answer. No shame in learning!"];
     return[`${b} badge${b>1?'s':''} already! You're a natural, {name}.`,"Open your Codedex (top of the screen) any time — it's your personal cheat sheet of everything you've learned."];}},
   {x:6,y:11,name:'Kid',shirt:'#ffd166',cap:'#ef476f',lines:()=>["Did you know? Every website you've EVER visited is made of HTML!","Even video sites. Even games in your browser. Wild, right?"]},
   {x:14,y:12,name:'Nurse Joy-Code',shirt:'#ffb3c7',cap:'#ff6b9a',lines:()=>["Hurt after a battle? Step into the Code Center (pink roof) to heal and save your game.","Your home (red roof) works too!"]}]},
 route1:{name:'HTML MEADOW',theme:'r1',pool:'r1',gymDoor:'tag',rows:["TTTTTTTTTTTTTTTTTTTT","T.....GGGGGG.......T","T.....GGGGGG.......T","T.....GGGgGG.......T","T........,.........T","T.wwwww..,..wwwwww.T","T.wwwww..,..wwwwww.T","T.wwwww..,,,,,,,,,,E","T.wwwww..,..wwwwww.T","T........,.........T","T..wwww..,...wwww..T","T..wwww..,...wwww..T","T..S.....,.........T","T........,,........T","TTTTTTTTTEETTTTTTTTT"],
  exits:{'9,14':['town',9,1],'10,14':['town',10,1],'19,7':['route2',1,7]},signs:{'3,12':["HTML MEADOW","HTML-type Codelings live in the tall grass.","Tame all 8, then challenge the Tag Gym up north!"]},
  npcs:[{x:18,y:7,name:'Gate Guard',shirt:'#4f8cff',cap:'#2a2840',show:()=>!S.badges.tag,lines:()=>["Halt! Style Forest lies beyond this gate.","Only trainers with the TAG BADGE may pass.","The Tag Gym is just north of here."]},
   {x:15,y:12,name:'Old Hiker',shirt:'#c98f4f',cap:'#6b4423',lines:()=>["Tip from an old hiker: when your code doesn't work, check for typos first.","Most bugs are a missing < or > or a misspelled word. Even for pros!"]}]},
 route2:{name:'STYLE FOREST',theme:'r2',pool:'r2',gymDoor:'style',rows:["TTTTTTTTTETTTTTTTTTT","TwwwT....,....GGGGGT","TwwwT....,....GGGGGT","TwwwT....,....GGgGGT","Twww.....,,,,,,,,..T","T........,....TT...T","T.TT.....,....wwww.T","E,,,,,,,,,....wwww.T","T.TT.www......wwww.T","T....www..TT.......T","T.ww.www......TTwwwT","T.ww.....ww...TTwwwT","T.ww..S..ww........T","T.........ww......TT","TTTTTTTTTTTTTTTTTTTT"],
  exits:{'0,7':['route1',18,7],'9,0':['route3',9,13]},signs:{'6,12':["STYLE FOREST","CSS-type Codelings live here. They teach you to paint pages.","Tame all 7, then face Hue at the Style Gym!"]},
  npcs:[{x:9,y:1,name:'Gate Guard',shirt:'#4f8cff',cap:'#2a2840',show:()=>!S.badges.style,lines:()=>["The mountain path to Flex Peaks is dangerous.","Come back with the STYLE BADGE from Hue's gym."]},
   {x:12,y:11,name:'Painter',shirt:'#f472b6',cap:'#facc15',lines:()=>["HTML is WHAT things are. CSS is how they LOOK.","Like a house: HTML is the bricks and walls. CSS is the paint and the furniture."]}]},
 route3:{name:'FLEX PEAKS',theme:'r3',pool:'r3',gymDoor:'flex',rows:["TTTTTTTTTTTTTTTTTTTT","T..KKKKK.....GGGGG.T","T..KKKKK.....GGGGG.T","T..KKkKK.....GGgGG.T","T....,.........,...T","T....,,,,,,,,,,,...T","T.wwww...,....www..T","T.wwww...,....www..T","T.wwww...,....www..T","T........,.........T","T..www...,...wwww..T","T..www...,...wwww..T","T......S.,.........T","T........,.........T","TTTTTTTTTETTTTTTTTTT"],
  exits:{'9,14':['route2',9,1]},signs:{'7,12':["FLEX PEAKS","Layout-type Codelings roam these slopes.","Tame all 5, beat Flexa, then climb the golden Champion Tower!"]},
  npcs:[{x:5,y:4,name:'Tower Guard',shirt:'#f5b301',cap:'#2a2840',show:()=>!S.badges.flex,lines:()=>["This is the Champion Tower.","Only those holding the FLEX BADGE may challenge Champion Kode."]},
   {x:16,y:12,name:'Mountaineer',shirt:'#10b981',cap:'#065f46',lines:()=>["Before Flexbox existed, centering a box was a NIGHTMARE. People wrote hacks for years!","Now it's three lines. You'll see."]}]}};
for(const m of Object.values(MAPS)){
 m.rows=m.rows.map(r=>r.length===TW?r:r.length<TW?r.slice(0,-1).padEnd(TW-1,'.')+r.slice(-1):r.slice(0,TW-1)+r.slice(-1));
 m.doors=[];m.rows.forEach((r,y)=>[...r].forEach((c,x)=>{if('Dcgk'.includes(c))m.doors.push({x,y,c});}));}
let CUR=MAPS.town;
const WALK='.,wFEDcgk';
const BLD={H:{wall:'#f8ead0',roof:'#e5484d'},C:{wall:'#ffffff',roof:'#ff6b9a'},G:{wall:'#f1ecff',roof:'#7c5cff'},K:{wall:'#fff6d6',roof:'#f5b301'}};
const DOOR2B={D:'H',c:'C',g:'G',k:'K'};
const grp=c=>BLD[c]?c:DOOR2B[c]||null;
const tileAt=(x,y)=>(CUR.rows[y]||'')[x]||'T';
const npcAt=(x,y)=>CUR.npcs.find(n=>n.x===x&&n.y===y&&(!n.show||n.show()));

const cv=$('#cv'),ctx=cv.getContext('2d');ctx.scale(2,2);
function rr(x,y,w,h,r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);ctx.fill();}
function circ(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
function drawTile(c,x,y,t){
 const th=THEMES[CUR.theme],px=x*T,py=y*T;
 ctx.fillStyle=th.grass;ctx.fillRect(px,py,T,T);
 if((x*7+y*13)%5===0&&'.FST'.includes(c)){ctx.fillStyle=th.speck;ctx.fillRect(px+7,py+9,3,3);ctx.fillRect(px+21,py+21,3,3);}
 if(c===','||c==='E'){ctx.fillStyle=th.path;ctx.fillRect(px,py,T,T);ctx.fillStyle='rgba(120,90,40,.10)';if((x+y)%3===0)ctx.fillRect(px+6,py+7,4,3);if((x*3+y)%4===0)ctx.fillRect(px+20,py+20,3,3);return;}
 if(c==='w'){ctx.fillStyle=th.tall;ctx.fillRect(px,py,T,T);const s=Math.sin(t/450+x*.9+y*.6)*1.8;ctx.fillStyle=th.tallDark;
  for(const[ox,oy]of[[3,12],[13,6],[22,14],[7,24],[18,26]]){ctx.beginPath();ctx.moveTo(px+ox,py+oy+7);ctx.lineTo(px+ox+3+s,py+oy-3);ctx.lineTo(px+ox+7,py+oy+7);ctx.fill();}return;}
 if(c==='T'){ctx.fillStyle='rgba(0,0,0,.12)';ctx.beginPath();ctx.ellipse(px+16,py+28,11,4,0,0,7);ctx.fill();ctx.fillStyle='#8b5a2b';ctx.fillRect(px+13,py+19,6,10);
  ctx.fillStyle=th.tree;circ(px+16,py+14,13);ctx.fillStyle=th.treeHi;circ(px+11,py+10,5);return;}
 if(c==='~'){ctx.fillStyle='#86cdf5';ctx.fillRect(px,py,T,T);ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2;const o=(t/300+x+y)%6;
  ctx.beginPath();ctx.moveTo(px+4,py+12+o*.3);ctx.quadraticCurveTo(px+10,py+8+o*.3,px+16,py+12+o*.3);ctx.stroke();ctx.beginPath();ctx.moveTo(px+16,py+24-o*.3);ctx.quadraticCurveTo(px+22,py+20-o*.3,px+28,py+24-o*.3);ctx.stroke();return;}
 if(c==='F'){const cols=['#ff6b9a','#ffd166','#ffffff','#a78bfa'];for(const[i,[ox,oy]]of[[6,8],[20,12],[12,22],[24,25]].entries()){ctx.fillStyle=cols[(i+x+y)%4];circ(px+ox,py+oy,3.2);ctx.fillStyle='#f59e0b';circ(px+ox,py+oy,1.2);}return;}
 if(c==='S'){ctx.fillStyle='#8b5a2b';ctx.fillRect(px+14,py+16,4,13);ctx.fillStyle='#d9a066';rr(px+5,py+6,22,13,3);ctx.fillStyle='#8b5a2b';ctx.fillRect(px+9,py+10,14,2);ctx.fillRect(px+9,py+14,10,2);return;}
 const g=grp(c);if(!g)return;const b=BLD[g];const top=grp(tileAt(x,y-1))!==g;
 if(top){ctx.fillStyle=b.roof;ctx.fillRect(px,py,T,T);ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(px,py+T-6,T,6);ctx.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<T;i+=8)ctx.fillRect(px+i,py+4,4,T-12);}
 else{ctx.fillStyle=b.wall;ctx.fillRect(px,py,T,T);ctx.fillStyle='rgba(0,0,0,.07)';ctx.fillRect(px,py+T-3,T,3);
  if(DOOR2B[c]){ctx.fillStyle='#7a4a2a';rr(px+8,py+6,16,26,4);ctx.fillStyle='#f5b301';circ(px+20,py+20,1.8);}
  else if(x%2===0){ctx.fillStyle='#2a2840';ctx.fillRect(px+7,py+8,18,14);ctx.fillStyle='#bfe6ff';ctx.fillRect(px+9,py+10,14,10);ctx.fillStyle='#fff';ctx.fillRect(px+10,py+11,4,3);}}
}
const LABEL={D:'HOME',c:'HEAL',g:'GYM',k:'CHAMP'};
function drawPerson(px,py,dir,shirt,cap,bob){
 const cx=px+16,y=py+bob;
 ctx.fillStyle='rgba(0,0,0,.18)';ctx.beginPath();ctx.ellipse(cx,py+29,10,4,0,0,7);ctx.fill();
 ctx.fillStyle=shirt;rr(cx-8,y+16,16,12,5);ctx.strokeStyle='#2a2840';ctx.lineWidth=1.5;ctx.strokeRect(cx-8,y+16,16,12);
 ctx.fillStyle='#ffd9b3';circ(cx,y+12,8);
 ctx.fillStyle=cap;ctx.beginPath();ctx.arc(cx,y+10,8.6,Math.PI,0);ctx.fill();
 if(dir==='down')ctx.fillRect(cx-8,y+8,16,3);else if(dir==='left')ctx.fillRect(cx-12,y+8,9,3);else if(dir==='right')ctx.fillRect(cx+3,y+8,9,3);else{circ(cx,y+11,8);}
 ctx.fillStyle='#2a2840';
 if(dir==='down'){circ(cx-3,y+14,1.5);circ(cx+3,y+14,1.5);}else if(dir==='left')circ(cx-4,y+14,1.5);else if(dir==='right')circ(cx+4,y+14,1.5);
}
let P={vx:10,vy:7};
function draw(t){
 ctx.clearRect(0,0,640,480);
 for(let y=0;y<TH;y++)for(let x=0;x<TW;x++)drawTile(tileAt(x,y),x,y,t);
 ctx.font='bold 8px Nunito, sans-serif';ctx.textAlign='center';
 for(const d of CUR.doors){const lx=d.x*T+16,ly=(d.y-1)*T+6;ctx.fillStyle='#2a2840';rr(lx-15,ly-1,30,11,3);ctx.fillStyle='#fff';ctx.fillText(LABEL[d.c],lx,ly+7);}
 const people=CUR.npcs.filter(n=>!n.show||n.show()).map(n=>({y:n.y,f:()=>{drawPerson(n.x*T,n.y*T,'down',n.shirt,n.cap,0);
   if(n.name.includes('Guard')){ctx.fillStyle='#2a2840';ctx.font='bold 10px Nunito';ctx.fillText('!',n.x*T+16,n.y*T-2);}}}));
 const st=STARTERS[S.starter];
 people.push({y:P.vy,f:()=>drawPerson(P.vx*T,P.vy*T,S.dir,st?st.color:'#ff7a59','#e5484d',mv?Math.abs(Math.sin(mv.p*Math.PI))*-2:0)});
 people.sort((a,b)=>a.y-b.y).forEach(p=>p.f());
}

const DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
let mode='title',held=null,mv=null,stepsSince=0;
const MOVE_MS=165;
function step(dir){
 S.dir=dir;const[dx,dy]=DIRS[dir],nx=S.x+dx,ny=S.y+dy;
 if(nx<0||ny<0||nx>=TW||ny>=TH)return;
 const c=tileAt(nx,ny);if(!WALK.includes(c)||npcAt(nx,ny))return;
 mv={sx:S.x,sy:S.y,p:0};S.x=nx;S.y=ny;
}
function arrive(){
 const ex=CUR.exits[`${S.x},${S.y}`];
 if(ex){held=null;fade(()=>goMap(ex[0],ex[1],ex[2]));return;}
 const c=tileAt(S.x,S.y);
 if(c==='D'||c==='c'){held=null;S.y+=1;P.vy=S.y;S.hp=maxHP();save();hud();
  say(c==='D'?["Home sweet home. You take a quick nap...","Your Codeling is fully healed! (Game saved.)"]:["Welcome to the Code Center!","Your Codeling is fully healed, and your game is saved. 💗"],null,c==='D'?'Home':'Nurse Joy-Code');return;}
 if(c==='g'||c==='k'){held=null;S.y+=1;P.vy=S.y;tryGym(c==='k'?'champ':CUR.gymDoor);return;}
 stepsSince++;
 if(c==='w'&&CUR.pool&&stepsSince>=3&&Math.random()<.22){held=null;stepsSince=0;encounter();}
}
function update(dt){
 if(mv){mv.p+=dt/MOVE_MS;if(mv.p>=1){mv=null;P.vx=S.x;P.vy=S.y;arrive();}else{P.vx=mv.sx+(S.x-mv.sx)*mv.p;P.vy=mv.sy+(S.y-mv.sy)*mv.p;}}
 if(!mv&&mode==='walk'&&held)step(held);
}
let last=performance.now();
function loop(t){const dt=Math.min(50,t-last);last=t;if(CURRENT==='quest'){update(dt);draw(t);}requestAnimationFrame(loop);}
function goMap(id,x,y){CUR=MAPS[id];S.map=id;S.x=x;S.y=y;P.vx=x;P.vy=y;mv=null;save();showBanner(CUR.name);}
function fade(fn){const f=$('#flash');f.className='';void f.offsetWidth;f.className='fade';mode='busy';setTimeout(()=>{fn();},220);setTimeout(()=>{if(mode==='busy')mode='walk';},450);}
let bannerT;function showBanner(t){const b=$('#banner');b.textContent=t;b.classList.add('show');clearTimeout(bannerT);bannerT=setTimeout(()=>b.classList.remove('show'),1800);}
function interact(){
 if(mode==='dialog'){advance();return;}
 if(mode!=='walk'||mv)return;
 const[dx,dy]=DIRS[S.dir],fx=S.x+dx,fy=S.y+dy;
 const n=npcAt(fx,fy);if(n){say(n.lines(),null,n.name);return;}
 const sg=CUR.signs&&CUR.signs[`${fx},${fy}`];if(sg)say(sg,null,'Sign');
}
const KEYDIR={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right'};
document.addEventListener('keydown',e=>{
 if(CURRENT!=='quest')return;
 const tag=(e.target.tagName||'').toLowerCase();if(tag==='textarea'||tag==='input')return;
 if(mode==='battle'||mode==='title')return;
 if(!$('#modal').classList.contains('hidden')){if(e.key==='Enter'||e.key==='Escape'){const b=$('#modalCard .row .btn.primary')||$('#modalCard .row .btn');if(b){e.preventDefault();b.click();}}return;}
 if(KEYDIR[e.key]){e.preventDefault();held=KEYDIR[e.key];if(mode==='walk'&&!mv)step(held);}
 else if(e.key===' '||e.key==='Enter'||e.key==='z'){e.preventDefault();interact();}
});
document.addEventListener('keyup',e=>{if(KEYDIR[e.key]&&held===KEYDIR[e.key])held=null;});
$$('#dpad button').forEach(b=>{
 const on=e=>{e.preventDefault();held=b.dataset.d;b.classList.add('on');if(mode==='dialog')return;if(mode==='walk'&&!mv)step(held);};
 const off=()=>{if(held===b.dataset.d)held=null;b.classList.remove('on');};
 b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);
});
$('#aBtn').addEventListener('click',interact);
$('#dialog').addEventListener('click',advance);

let dlg=null;
function say(lines,done,who=''){mode='dialog';held=null;dlg={lines:lines.map(fill),i:0,done,typing:false,timer:null};$('#dWho').textContent=who;$('#dWho').style.display=who?'':'none';$('#dialog').classList.remove('hidden');typeLine();}
function typeLine(){const el=$('#dText'),s=dlg.lines[dlg.i];let n=0;dlg.typing=true;el.textContent='';clearInterval(dlg.timer);
 dlg.timer=setInterval(()=>{n+=2;el.textContent=s.slice(0,n);if(n>=s.length){clearInterval(dlg.timer);dlg.typing=false;}},18);}
function advance(){if(!dlg)return;if(dlg.typing){clearInterval(dlg.timer);$('#dText').textContent=dlg.lines[dlg.i];dlg.typing=false;return;}
 dlg.i++;if(dlg.i<dlg.lines.length){typeLine();return;}
 const d=dlg.done;dlg=null;$('#dialog').classList.add('hidden');mode='walk';if(d)d();}

function hud(){
 $('#hudName').textContent='🧑 '+(S.name||'—');$('#hudLv').textContent='Lv '+lvl();
 S.hp=Math.min(S.hp,maxHP());$('#hudHp').style.width=(S.hp/maxHP()*100)+'%';$('#hudHp').style.background=S.hp/maxHP()<.3?'var(--bad)':'var(--good)';
 $('#hudBadges').textContent=`🏅 ${badgeCount()}/4`;$('#btnCodex').textContent=`📘 ${caughtCount()}/${CH.length}`;
}

function encounter(){
 const pool=POOL(CUR.pool),un=pool.filter(id=>!S.caught[id]);
 const review=!un.length,id=review?pool[Math.floor(Math.random()*pool.length)]:un[0];
 const f=$('#flash');f.className='';void f.offsetWidth;f.className='go';mode='busy';
 setTimeout(()=>openBattle({type:'wild',ids:[id],review}),650);
}
function tryGym(gid){
 const g=GYMS[gid];
 if(S.badges[gid]){say([`You already hold the ${g.badge}, {name}!`,"Keep your skills sharp by training in the tall grass."],null,g.leader);return;}
 if(g.need){const pool=POOL(g.need),n=pool.filter(id=>S.caught[id]).length;
  if(n<pool.length){say([`Hold on! Come back when you've tamed every Codeling on this route.`,`You've tamed ${n} of ${pool.length}. Walk through the tall grass to find the rest!`],null,g.leader);return;}}
 say(g.intro,()=>{const ids=g.pool.filter(id=>!S.caught[id]);openBattle({type:'gym',gid,ids:ids.length?ids:g.pool.slice()});},g.leader);
}

let B=null;
/* move the battle workspace into the shared no-scroll Studio layout */
const Q1S=(()=>{const work=$('#battle .work'),q=x=>work.querySelector(x)||document.querySelector(x);const host=document.createElement('div');work.replaceWith(host);const Sq=Studio(host,{cls:'q1'});
  q('.tabs')&&q('.tabs').remove();
  Sq.task.append(q('#tabLesson'),q('#tabMission'));
  Sq.code.innerHTML='<div class="pane-h">✍️ Your code <small>Ctrl + Enter = Attack</small></div>';Sq.code.append(q('#editor'),q('#snips'));q('#editor').classList.add('code');
  Sq.view.innerHTML='<div class="pane-h">👀 Live preview <small>updates as you type</small></div>';const fw=document.createElement('div');fw.className='framewrap grow';q('#preview').classList.add('prev');fw.append(q('#preview'));Sq.view.append(fw);
  q('#bAttack').classList.remove('wide');q('#bAttack').innerHTML='⚔️ ATTACK!';Sq.actions.append(q('#bHint'),q('#bTip'),q('#bAnswer'),q('#bReset'),q('#bAttack'));
  Sq.fbEl.replaceWith(q('#feedback'));Sq.hb.replaceWith(q('#hintBox'));
  const bar=document.createElement('div');bar.className='sgb-bar';const bm=$('#bmsg'),br=q('#bRun');bm.replaceWith(bar);bar.append(bm,br);br.className='btn sm ghost';
  return Sq;})();
const editor=$('#editor'),preview=$('#preview');
const ATTACKS=['Syntax Error','Missing Bracket','Typo Tackle','Bug Bite','Null Slam','Undefined Uppercut','Unclosed Tag Twister'];
function openBattle(o){
 mode='battle';held=null;B=Object.assign({idx:0},o);B.total=B.type==='gym'?GYMS[B.gid].pool.length:1;B.doneBefore=B.type==='gym'?B.total-B.ids.length:0;
 $('#battle').classList.remove('hidden');document.body.style.overflow='hidden';$('#battle').scrollTop=0;
 const st=STARTERS[S.starter];$('#meSprite').innerHTML=creatureSVG(st.color,st.v,110);$('#meName').textContent=st.name;
 $('#bRun').textContent=B.type==='gym'?'🚪 Leave gym':'🏃 Run away';
 loadRound();
}
function setFoeHP(){const rem=B.type==='gym'?(B.total-B.doneBefore-B.idx)/B.total:1;const e=$('#foeHp');e.style.width=(rem*100)+'%';e.style.background=rem<.34?'var(--bad)':rem<.67?'var(--gold)':'var(--good)';}
function setMeHP(){const m=maxHP(),r=S.hp/m,e=$('#meHp');e.style.width=(r*100)+'%';e.style.background=r<.3?'var(--bad)':r<.6?'var(--gold)':'var(--good)';
 $('#meHpTxt').textContent=`${S.hp} / ${m} HP`;$('#meTag').textContent=`Lv ${lvl()} · ${S.name}'s partner`;hud();}
function loadRound(){
 const ch=CHM[B.ids[B.idx]];B.ch=ch;B.hints=0;B.usedAnswer=false;B.locked=false;TRACK.open('quest',ch.id);
 const fs=$('#foeSprite');fs.className='sprite appear';fs.innerHTML=creatureSVG(ch.color,ch.v,120);
 $('#foeName').textContent=ch.name;
 $('#foeTag').textContent=B.type==='gym'?`${GYMS[B.gid].leader}'s Codeling · Round ${B.doneBefore+B.idx+1}/${B.total}`:(B.review?'Review battle':'Wild')+` · ${ch.concept} type`;
 setFoeHP();setMeHP();
 bmsg(B.type==='gym'?`${GYMS[B.gid].leader} sent out ${ch.name}!`:B.review?`A wild ${ch.name} wants a rematch! (Review = easy XP)`:`A wild ${ch.name} appeared! Defeat it with code.`);
 editor.value=ch.starter;livePreview();
 $('#feedback').className='feedback';$('#feedback').innerHTML='';$('#hintBox').innerHTML='';
 $('#tabLesson').innerHTML=`<h3>📖 ${esc(ch.concept)}</h3><div class="lesson">${md(ch.learn)}</div><div class="exl">Example</div><pre class="ex">${esc(ch.example)}</pre><div style="margin-top:12px" class="q1go"><button class="btn primary" id="toMission">✍️ Start coding →</button></div>`;
 $('#tabMission').innerHTML=`<h3>🎯 Mission</h3><div class="mission">${md(ch.mission)}</div><p style="color:var(--muted);font-weight:700;font-size:14px;margin-bottom:0">Type your code below. Watch the preview. Then hit ⚔️ ATTACK!</p>`;
 $('#toMission').onclick=()=>{Q1S.tab('code');};
 S.seen[ch.id]=true;Q1S.job(ch.job||'');Q1S.tab(window.innerWidth<700?'task':'code');setTimeout(Q1S.fit,50);
 hintLabel();
}
function tab(){}
function bmsg(s){$('#bmsg').textContent=s;}
function hintLabel(){$('#bHint').textContent=`💡 Hint ${Math.min(B.hints,B.ch.hints.length)}/${B.ch.hints.length}`;}
function anim(el,cls){el.classList.remove('hit','lungeF','lungeM','appear');void el.offsetWidth;el.classList.add(cls);}
const livePreview=debounce(()=>renderInto(preview,editor.value),250);
wireEditor(editor,livePreview,()=>attack());
addSnips($('#snips'),editor,livePreview);
async function attack(){
 if(!B||B.locked)return;
 if(!editor.value.trim()){fb('bad',"Your code box is empty! Type your code first, then attack.");return;}
 B.locked=true;livePreview.cancel();$('#bAttack').disabled=true;
 const r=await runChecksCode(preview,editor.value,B.ch.checks);
 TRACK.attempt('quest',B.ch.id,!!r.ok);
 if(r.ok)win();else lose(r.msg);
}
function fb(type,html){const f=$('#feedback');f.className='feedback '+type;f.innerHTML=html;}
function xpFor(){if(B.usedAnswer)return 5;const base=B.review?10:B.type==='gym'?50:30;return Math.max(B.review?5:10,base-B.hints*5);}
function win(){
 const ch=B.ch,xp=xpFor(),before=lvl();
 anim($('#meSprite'),'lungeM');setTimeout(()=>anim($('#foeSprite'),'hit'),200);
 const newCatch=!S.caught[ch.id];S.caught[ch.id]=true;S.xp+=xp;const up=lvl()>before;if(up)S.hp=maxHP();
 fb('good',`✅ It worked! Your code is correct. <b>+${xp} XP</b>${up?` · 🎉 LEVEL UP! You're now Lv ${lvl()}!`:''}`);
 bmsg(`${STARTERS[S.starter].name} used CLEAN CODE! It's super effective!`);
 setTimeout(()=>{B.idx++;setFoeHP();$('#foeSprite').classList.add('faint');bmsg(`${ch.name} fainted!`);setMeHP();save();},700);
 setTimeout(()=>{
  $('#bAttack').disabled=false;
  if(B.type==='gym'&&B.idx<B.ids.length){loadRound();return;}
  if(B.type==='gym'){finishGym();return;}
  modal(`<div class="center">${creatureSVG(ch.color,ch.v,110)}<h2>${newCatch?'You tamed '+esc(ch.name)+'!':'Review complete!'}</h2>
   <p><b>+${xp} XP</b>${up?` · 🎉 Level up! Now Lv ${lvl()}`:''}</p>${newCatch?`<p>📘 New Codedex page: <b>${esc(ch.concept)}</b></p>`:''}
   <p style="color:var(--muted);font-weight:700">${routeProgress()}</p></div>`,[['Continue',closeBattle,'primary']]);
 },1900);
}
function routeProgress(){if(!CUR.pool)return'';const p=POOL(CUR.pool),n=p.filter(id=>S.caught[id]).length;
 return n<p.length?`${n}/${p.length} Codelings tamed on this route.`:`Route complete! Head to the gym when you're ready. 🏟️`;}
function lose(msg){
 const ch=B.ch,dmg=14+Math.floor(Math.random()*10);
 anim($('#foeSprite'),'lungeF');setTimeout(()=>anim($('#meSprite'),'hit'),200);
 S.hp=Math.max(0,S.hp-dmg);
 bmsg(`${ch.name} used ${ATTACKS[Math.floor(Math.random()*ATTACKS.length)]}! −${dmg} HP`);
 const ph=placementHint(editor.value);fb('bad',`❌ Not quite. ${md(msg)}${ph?`<span class="placehint">🧭 ${ph}</span>`:''}<small style="font-weight:700;display:block;margin-top:6px">Fix it, then attack again. Stuck? Tap 💡 Hint. You've got this.</small>`);
 setTimeout(()=>{setMeHP();save();B.locked=false;$('#bAttack').disabled=false;
  if(S.hp<=0){B.locked=true;modal(`<div class="center"><div style="font-size:54px">😵‍💫</div><h2>Your Codeling is worn out!</h2><p>You rush back to the Code Center in Pixel Town. Nothing you learned is lost.</p></div>`,[['Back to town',blackout,'primary']]);}
 },600);
}
function blackout(){closeBattle();S.hp=maxHP();goMap('town',16,5);hud();save();
 say(["There we go — all healed up!","Don't worry. Every developer sees errors every single day. Errors are how you learn.","Use the 💡 Hint button when you're stuck. Go get 'em!"],null,'Nurse Joy-Code');}
function finishGym(){
 const g=GYMS[B.gid],gid=B.gid;S.badges[gid]=true;if(gid==='champ')S.champion=true;save();
 modal(`<div class="center"><div style="font-size:60px">${g.icon}</div><h2>You earned the ${esc(g.badge)}!</h2><p>${esc(g.leader)} has been defeated.</p><p><b>Badges: ${badgeCount()}/4</b></p></div>`,
  [['Continue',()=>{closeBattle();say(g.win,gid==='champ'?ending:null,g.leader);},'primary']]);
}
function closeBattle(){$('#battle').classList.add('hidden');document.body.style.overflow='';B=null;mode='walk';save();hud();}
$('#bAttack').onclick=attack;
$('#bHint').onclick=()=>{const ch=B.ch;if(B.hints<ch.hints.length)B.hints++;hintLabel();TRACK.hint('quest',ch.id,B.hints);
 $('#hintBox').innerHTML=ch.hints.slice(0,B.hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('')+(B.hints>=ch.hints.length?`<div class="h" style="background:#fff;border-style:dashed">That's every hint! Still stuck? Tap 👁 Answer — totally fine.</div>`:'');};
$('#bTip').onclick=()=>{showTip($('#hintBox'),B.ch.tip);};
$('#bAnswer').onclick=()=>{B.usedAnswer=true;TRACK.answer('quest',B.ch.id);editor.value=B.ch.answer;livePreview();
 $('#hintBox').innerHTML=`<div class="h a">👁 <b>Here's a correct answer.</b> Read it line by line and compare it to yours — spot the difference. Then press ⚔️ ATTACK.<br><small>(You'll earn fewer XP this time. Learning is the real win.)</small></div>`;};
$('#bReset').onclick=()=>{editor.value=B.ch.starter;livePreview();editor.focus();};
$('#bRun').onclick=()=>{
 if(B.type==='gym'){const leader=GYMS[B.gid].leader;modal(`<h3>Leave the gym?</h3><p>Rounds you've already won are saved. You can come back any time.</p>`,[['Stay',null],['Leave',()=>{closeBattle();say(["Come back when you're ready, {name}!"],null,leader);},'primary']]);}
 else{closeBattle();say(["You got away safely!","(That Codeling is still out there. Come back when you're ready.)"]);}
};

const SECTIONS=[['r1','HTML Meadow'],['g1','Tag Gym'],['r2','Style Forest'],['g2','Style Gym'],['r3','Flex Peaks'],['g3','Flex Gym'],['ch','Champion Tower']];
function openCodex(){
 const html=`<h2>📘 Codedex <small style="color:var(--muted)">${caughtCount()}/${CH.length}</small></h2>
  <p style="margin-top:0;color:var(--muted);font-weight:700">Your personal cheat sheet. Tap any Codeling you've tamed to re-read its lesson.</p>
  <div class="badges">${Object.entries(GYMS).map(([k,g])=>`<span class="badge ${S.badges[k]?'on':''}">${g.icon} ${esc(g.badge)}</span>`).join('')}</div>
  ${SECTIONS.map(([g,label])=>`<div class="cxsec">${label}</div><div class="cxgrid">${CH.filter(c=>c.g===g).map(c=>S.caught[c.id]
   ?`<div class="cx" data-id="${c.id}">${creatureSVG(c.color,c.v,64)}<div>${esc(c.name)}</div><small>${esc(c.concept)}</small></div>`
   :`<div class="cx lock">${creatureSVG('#bbbbbb',c.v,64,true)}<div>???</div><small>Not tamed yet</small></div>`).join('')}</div>`).join('')}`;
 modal(html,[['Close',null,'primary']]);
 $$('#modalCard .cx[data-id]').forEach(el=>el.onclick=()=>{const c=CHM[el.dataset.id];
  modal(`<div class="codex"><div class="center">${creatureSVG(c.color,c.v,90)}</div><h2>${esc(c.name)} · ${esc(c.concept)}</h2><div class="lesson">${md(c.learn)}</div><div class="exl">Example</div><pre class="ex">${esc(c.example)}</pre><div class="exl">Pro tip</div><div class="lesson">${md(c.tip)}</div></div>`,[['← Back',openCodex],['Close',null,'primary']]);});
}
$('#btnCodex').onclick=()=>{if(mode==='walk'||mode==='dialog')openCodex();};
function help(){modal(`<h2>How to play</h2>
 <p>🕹️ <b>Move</b> with arrow keys / WASD, or the D-pad. <b>Talk</b> to people and read signs with Space or <b>A</b> while facing them.</p>
 <p>🌿 <b>Tall grass</b> hides wild Codelings. Each one teaches you ONE new HTML or CSS skill.</p>
 <p>⚔️ <b>Battles</b>: read the 📖 Lesson, then do the 🎯 Mission by typing real code. Watch the live preview, then hit <b>ATTACK</b> to check it. Wrong code = you take damage. Right code = you tame it!</p>
 <p>💡 <b>Hint</b> gives clues one at a time · ✨ <b>Tip</b> gives pro advice · 👁 <b>Answer</b> shows a solution (fewer XP).</p>
 <p>🏟️ Tame every Codeling on a route to unlock its <b>Gym</b>. Win 3 badges, then beat the <b>Champion</b>!</p>
 <p>💗 Heal and save at the <b>Code Center</b> or your <b>Home</b>. The game also auto-saves on this device.</p>`,[['Let\'s go!',null,'primary']]);}
$('#btnMenu').onclick=()=>{if(mode!=='walk')return;modal(`<h2>Menu</h2><p>Trainer: <b>${esc(S.name)}</b> · Lv ${lvl()} · ${S.xp} XP total</p><p>Codelings tamed: <b>${caughtCount()}/${CH.length}</b> · Badges: <b>${badgeCount()}/4</b></p>`,
 [['How to play',help],['Start over',()=>modal(`<h3>Start a brand new Codeling Quest?</h3><p>This deletes your Quest progress on this device. This can't be undone.</p>`,[['Cancel',null],['Yes, delete',()=>{try{localStorage.removeItem(QKEY);}catch(e){}S=fresh();mode='title';titleScreen();$('#title').classList.remove('hidden');},'primary']])],['Save',()=>{save();say(["Game saved! 💾"]);}],['Close',null,'primary']]);};
function ending(){modal(`<div class="center"><div style="font-size:64px">🏆</div><h2 class="pix" style="font-size:16px;line-height:1.7;color:var(--accent)">CODE CHAMPION</h2>
 <p>${esc(S.name)}, you beat all three gyms and the Champion!</p><p>You learned <b>${caughtCount()} real web skills</b> — the same ones professional developers use every day.</p></div>
 <h3>What's next?</h3><ul style="line-height:1.6"><li>Open the 📘 Codedex and re-read anything that felt shaky.</li><li>Try 🐞 Bug Hunter in the Arcade — fixing broken code is what real developers do most.</li><li>Then 🤖 Robot Commander to start JavaScript.</li></ul>`,[['Keep exploring',null,'primary']]);}
function titleScreen(){
 const saved=load();let pick=0;
 $('#title').innerHTML=`<div class="tcard">
  <div style="text-align:left"><button class="btn sm" id="tBack">← Arcade</button></div>
  <div class="tlogo pix">CODELING<br>QUEST</div>
  <p class="tsub">Tame wild creatures by writing real HTML & CSS.</p>
  ${saved?`<div class="tbox center"><p style="margin-top:0"><b>Welcome back, ${esc(saved.name)}!</b><br>Lv ${1+Math.floor(saved.xp/100)} · ${Object.keys(saved.caught).length} Codelings · ${Object.keys(saved.badges).length} badges</p><button class="btn primary big" id="tCont" style="width:100%">▶ Continue</button></div><p class="tsub" style="margin:4px 0 12px">— or start a new adventure —</p>`:''}
  <div class="tbox"><label for="tName">What's your trainer name?</label><input id="tName" maxlength="14" placeholder="Type your name" autocomplete="off"></div>
  <div class="tbox"><label>Choose your partner Codeling</label><div class="starters">${STARTERS.map((s,i)=>`<div class="starter ${i===0?'on':''}" data-i="${i}">${creatureSVG(s.color,s.v,90)}<b>${s.name}</b><small>${s.desc}</small></div>`).join('')}</div></div>
  <button class="btn primary big" id="tNew" style="width:100%">${saved?'Start new game':'Begin adventure →'}</button>
 </div>`;
 $('#tBack').onclick=()=>APP.show('hub');
 $$('.starter').forEach(el=>el.onclick=()=>{pick=+el.dataset.i;$$('.starter').forEach(x=>x.classList.toggle('on',x===el));});
 if(saved)$('#tCont').onclick=()=>{S=saved;startWorld(false);};
 $('#tNew').onclick=()=>{
  const n=$('#tName').value.trim();if(!n){$('#tName').focus();$('#tName').style.borderColor='var(--bad)';$('#tName').placeholder='Please type a name first';return;}
  const go=()=>{S=fresh();S.name=n;S.starter=pick;S.started=true;S.hp=maxHP();save();startWorld(true);};
  if(saved)modal(`<h3>Start over?</h3><p>Your old save (${esc(saved.name)}) will be replaced.</p>`,[['Cancel',null],['Start new',go,'primary']]);else go();
 };
}
function startWorld(isNew){
 $('#title').classList.add('hidden');CUR=MAPS[S.map]||MAPS.town;P.vx=S.x;P.vy=S.y;mode='walk';hud();showBanner(CUR.name);
 if(isNew){const st=STARTERS[S.starter];
  say(["Welcome, {name}! I'm Professor Byte.",`I see you've chosen ${st.name} as your partner. Great pick!`,"In this world, creatures called Codelings are made of code. You tame them by WRITING code.",
   "Head north to HTML Meadow and walk through the tall grass 🌿 to find them.","Move with the arrow keys or D-pad. Press A or Space to talk. Good luck!"],help,'Prof. Byte');}
}
$('#qBack').onclick=()=>{if(mode==='dialog'){if(dlg)clearInterval(dlg.timer);dlg=null;$('#dialog').classList.add('hidden');mode='walk';}if(mode==='walk'||mode==='title')APP.show('hub');};
window.QUEST={
 enter(){if(mode==='title'){titleScreen();$('#title').classList.remove('hidden');}else hud();},
 leave(){$('#title').classList.add('hidden');held=null;},
 progress(){const s=load();const n=s?CH.filter(c=>s.caught[c.id]).length:0;return{done:n,total:CH.length,badges:s?Object.keys(s.badges).length:0};},
 _test:{CH,runChecksCode,wild:id=>openBattle({type:'wild',ids:[id],review:false}),start:n=>{S=fresh();S.name=n||'Ali';S.started=true;save();mode='walk';$('#title').classList.add('hidden');},mode:()=>mode},
 levels(){const s=load();return CH.map(c=>({id:c.id,title:c.name+' — '+c.concept,ch:c.g,done:!!(s&&s.caught[c.id])}));},
 art:(c,v,sz)=>creatureSVG(c,v,sz)
};
WORLDS.quest=window.QUEST;
requestAnimationFrame(loop);
})();
