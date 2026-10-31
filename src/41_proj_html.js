/* =====================================================================
   PROJECTS · HTML only ("html") — real pages built from meaningful tags.
   No CSS, no JavaScript: the pages look plain on purpose. The lesson is
   STRUCTURE — the right tag for the right job (screen readers, Google…).
   ===================================================================== */
(()=>{
const {H,C,J,W_HTML,W_CSS,W_JS,nonDefaultFont,labelLinked,anyHover,hasMedia,grad,transOn,clickThen,noErrors}=PK;
/* ---- small helpers for this file ---- */
const TOP="Your code box is empty — type it right at the top.";
const pad=(s,n)=>s.split('\n').map(l=>l?' '.repeat(n)+l:l).join('\n');
/* insert snip on the line before the first `close` tag (indented one level deeper than that tag) */
const before=(close,snip)=>c=>{const i=c.indexOf(close);if(i<0)return c;const ls=c.lastIndexOf('\n',i-1)+1;const lead=c.slice(ls,i);
  if(/^[ \t]*$/.test(lead))return c.slice(0,ls)+pad(snip,lead.length+2)+'\n'+c.slice(ls);
  return c.slice(0,i)+'\n'+pad(snip,2)+'\n'+c.slice(i);};
const cnt=(sel,n,m)=>[a=>a.$$(sel).length>=n,m];
const h2Is=(re,m)=>[a=>a.$$('h2').some(h=>re.test(a.text(h))),m];
const secH2=(re,sel,m)=>[a=>a.$$('section').some(s=>{const h=s.querySelector('h2');return !!h&&re.test(a.text(h))&&(!sel||!!s.querySelector(sel));}),m];
const isoDate=(sel,m)=>[a=>{const t=a.$(sel);return !!t&&/^\d{4}-\d{2}-\d{2}/.test(t.getAttribute('datetime')||'');},m];
const hrefs=(scope,list,m)=>[a=>list.every(h=>a.$(scope+' a[href="'+h+'"]')),m];
const linkedTo=(sel,m)=>[a=>{const e=a.$(sel);return !!e&&(!!e.closest('label')||(!!e.id&&!!a.$('label[for="'+e.id+'"]')));},m];
const words=s=>(s||'').trim().split(/\s+/).filter(Boolean).length;

PK.PROJECTS.push(
/* ------------------------------------------------------------------ */
{id:'ph_pet',cat:'html',emoji:'🐶',title:"My Pet's Profile",mentor:'Biscuit, a very good dog',uses:'Codeling Quest, Bug Hunter',
 blurb:'A profile page all about your pet: photo, fast facts, favourite toys and treats.',
 intro:"Woof! I'm Biscuit, and I want my very own web page. You'll build a profile page for a pet — yours, a friend's, or a made-up one. It's pure HTML, so it looks plain, but every tag will have a real job.",
 steps:[
 H('p1',"Your pet's name",{why:"Every page needs one big title. Mine should say my name, of course!",
  learn:"`<h1>` is the **main heading** — the title of the whole page. Use only ONE `<h1>` per page. Google reads it to learn what your page is about.",
  todo:"Write your pet's name inside an `<h1>`.",job:"Type your pet's name between `<h1>` and `</h1>`.",where:TOP,
  snippet:`<h1>Biscuit the Beagle</h1>`,
  hints:["Open the heading with `<h1>` and close it with `</h1>`.","`<h1>Biscuit the Beagle</h1>` — but use your own pet's name!"],
  tip:"Headings go from `<h1>` (biggest) down to `<h6>` (smallest). Think of them like chapter titles in a book.",
  checks:[has('h1',"Add an `<h1>` with your pet's name inside.")]}),
 H('p2','Say hello',{why:"Visitors want to know a bit about me before they scroll.",
  learn:"`<p>` means **paragraph**. Any normal sentence of text goes inside a `<p>`.",
  todo:"Under the `<h1>`, add a `<p>` with one or two sentences about your pet.",job:"Under the name, write a sentence about your pet inside `<p>` and `</p>`.",
  snippet:`<p>Hi! I'm Biscuit. I'm 3 years old and I love naps, sticks and belly rubs.</p>`,
  hints:["A paragraph starts with `<p>` and ends with `</p>`.","`<p>Hi! I'm Biscuit. I love naps and belly rubs.</p>`"],
  tip:"Pressing Enter inside your code does NOT make a new line on the page. Each new paragraph needs its own `<p>`.",
  checks:[has('h1 ~ p',"Add a `<p>` paragraph under your `<h1>`.")]}),
 H('p3','A picture of your pet',{why:"A profile needs a photo! We'll use an emoji, and describe it for people who can't see it.",
  learn:"`<figure>` holds a picture, and `<figcaption>` is the little caption under it.\n`role=\"img\"` + `aria-label=\"...\"` tell a **screen reader** (a computer voice that reads pages to blind people) what the emoji picture shows.",
  todo:"Add a `<figure>`. Inside it put a `<p role=\"img\" aria-label=\"...\">` holding an emoji (describe your pet in the `aria-label`), then a `<figcaption>`.",
  job:"Make a `<figure>`. Put an emoji in a `<p role=\"img\" aria-label=\"...\">` and describe your pet in the label. Add a `<figcaption>` under it.",
  snippet:`<figure>
  <p role="img" aria-label="A happy brown and white beagle">🐶</p>
  <figcaption>Biscuit after his bath</figcaption>
</figure>`,
  hints:["Start with `<figure>` and end with `</figure>`. Everything else goes between.","The picture: `<p role=\"img\" aria-label=\"A happy brown and white beagle\">🐶</p>`","The caption: `<figcaption>Biscuit after his bath</figcaption>` — just before `</figure>`."],
  tip:"Later you can swap the emoji for a real photo with `<img src=\"biscuit.jpg\" alt=\"...\">`. The idea is the same: always describe the picture.",
  checks:[[a=>{const e=a.$('figure [role="img"]');return !!e&&(e.getAttribute('aria-label')||'').trim().length>2;},"Inside a `<figure>`, add `<p role=\"img\" aria-label=\"...\">` and describe your pet in the `aria-label`."],has('figure figcaption',"Add a `<figcaption>` inside the `<figure>`.")]}),
 H('p4','Fast facts',{why:"People always ask: what kind of dog? How old? Let's answer in a neat list.",
  learn:"`<h2>` is a smaller heading for one part of the page.\n`<ul>` is a list with dots, and each `<li>` is one item.\n`<strong>` means **important** — it shows as bold.",
  todo:"Add `<h2>Fast Facts</h2>` and a `<ul>` with at least **3** `<li>` items. Start each item with a `<strong>` label like `<strong>Age:</strong>`.",
  job:"Add the heading `<h2>Fast Facts</h2>`. Then make a `<ul>` list with 3 `<li>` facts. Start each one with a `<strong>` word, like `<strong>Age:</strong>`.",
  snippet:`<h2>Fast Facts</h2>
<ul>
  <li><strong>Type:</strong> Beagle</li>
  <li><strong>Age:</strong> 3 years</li>
  <li><strong>Colour:</strong> Brown and white</li>
</ul>`,
  hints:["Heading first: `<h2>Fast Facts</h2>`. Then `<ul>` … `</ul>`.","One item looks like this: `<li><strong>Age:</strong> 3 years</li>`. Make 3 of them."],
  tip:"Write one `<li>`, then copy and paste it and change the words. That's how pros work!",
  checks:[h2Is(/fast facts/,"Add the heading `<h2>Fast Facts</h2>`."),cnt('ul li',3,"Add a `<ul>` with at least 3 `<li>` items."),cnt('li strong',3,"Start each fact with a `<strong>` label, like `<strong>Age:</strong>`.")]}),
 H('p5','Favourite toys',{why:"My toys are VERY important. They need their own list.",
  todo:"Add `<h2>Favourite Toys</h2>` and another `<ul>` with at least **3** toys.",
  job:"Add `<h2>Favourite Toys</h2>`. Under it, make a new `<ul>` with 3 `<li>` toys.",
  snippet:`<h2>Favourite Toys</h2>
<ul>
  <li>Squeaky duck</li>
  <li>Old tennis ball</li>
  <li>Dad's left sock</li>
</ul>`,
  hints:["Same pattern as before: `<h2>`, then `<ul>`, then `<li>` items.","`<li>Squeaky duck</li>` — make 3 of them inside the new `<ul>`."],
  tip:"Use dots (`<ul>`) when the order doesn't matter. Duck or ball first? Who cares — I love them all!",
  checks:[h2Is(/favou?rite toys/,"Add the heading `<h2>Favourite Toys</h2>`."),cnt('ul',2,"Make a NEW `<ul>` list for the toys (you should have 2 `<ul>` lists now)."),[a=>a.$$('ul').length>=2&&a.$$('ul')[1].querySelectorAll('li').length>=3,"Put at least 3 `<li>` toys in the new list."]]}),
 H('p6','Top 3 treats',{why:"My treats are ranked. Number 1 is the BEST. Order matters!",
  learn:"`<ol>` is an **ordered list** — the browser numbers the items 1, 2, 3 for you. Use it when the order matters, like a ranking or steps.",
  todo:"Add `<h2>Top 3 Treats</h2>` and an `<ol>` with **3** `<li>` treats, best one first.",
  job:"Add `<h2>Top 3 Treats</h2>`. Then make an `<ol>` (a numbered list) with 3 `<li>` treats. Best one first!",
  snippet:`<h2>Top 3 Treats</h2>
<ol>
  <li>Chicken bites</li>
  <li>Peanut butter biscuits</li>
  <li>A tiny piece of cheese</li>
</ol>`,
  hints:["`<ol>` instead of `<ul>` — the o is for 'ordered'.","`<ol>` then three `<li>…</li>` items, then `</ol>`."],
  tip:"You never type the numbers yourself. Move an item up and the browser renumbers everything!",
  checks:[h2Is(/top 3 treats|top three treats/,"Add the heading `<h2>Top 3 Treats</h2>`."),cnt('ol li',3,"Add an `<ol>` with 3 `<li>` treats inside.")]}),
 H('p7','A funny story',{why:"Every pet has one funny story. Tell mine — and make the funniest word stand out.",
  learn:"`<em>` means **say it with feeling** (emphasis). It shows as *slanted* text, and screen readers say it a bit differently.",
  todo:"Add `<h2>Funny Story</h2>` and a `<p>` with your story. Wrap the funniest word or words in `<em>`.",
  job:"Add `<h2>Funny Story</h2>` and a `<p>` story. Put the funniest words inside `<em>` and `</em>`.",
  snippet:`<h2>Funny Story</h2>
<p>Once I found a whole pizza on the table. I did not eat it. I just <em>licked every single slice</em>.</p>`,
  hints:["`<h2>Funny Story</h2>`, then a `<p>` … `</p>` with your story.","Inside the paragraph: `<em>licked every slice</em>`."],
  tip:"`<strong>` = important. `<em>` = say it with feeling. They look different AND mean different things.",
  checks:[h2Is(/funny story/,"Add the heading `<h2>Funny Story</h2>`."),has('p em',"Inside your story `<p>`, wrap some words in `<em>` … `</em>`.")]}),
 H('p8',"If I'm lost",{why:"If I ever run off, a phone link lets someone call my family with one tap.",
  learn:"A link with `href=\"tel:...\"` opens the phone app on a mobile, ready to call that number.",
  todo:"Add a heading like `<h2>If I'm Lost</h2>` and a `<p>` with a link whose `href` starts with `tel:`.",
  job:"Add a phone link: `<a href=\"tel:0400000000\">`. Put any phone number after `tel:`.",
  snippet:`<h2>If I'm Lost</h2>
<p>Please call my family: <a href="tel:0400000000">0400 000 000</a></p>`,
  hints:["A link is `<a href=\"...\">words</a>`.","`<a href=\"tel:0400000000\">0400 000 000</a>` inside a `<p>`."],
  tip:"Never put your REAL phone number on a public website. Use a pretend one like 0400 000 000.",
  checks:[has('a[href^="tel:"]',"Add a link with `href=\"tel:...\"` — for example `<a href=\"tel:0400000000\">`.")]}),
 H('p9','Sign it',{why:"Every great page ends with a footer that says who made it.",
  learn:"`<footer>` is the bottom part of a page: who made it, the year, contact info.",
  todo:"Add a `<footer>` with a `<p>` inside saying who made the page.",job:"At the bottom, add a `<footer>` with a `<p>` inside. Say who made the page.",
  snippet:`<footer>
  <p>Page made with love by Biscuit's best friend, Sam.</p>
</footer>`,
  hints:["`<footer>` … `</footer>`.","Put a `<p>` inside: `<footer><p>Made by Sam</p></footer>`."],
  tip:"Look at your page: plain, but every part has a meaning. That's what good HTML is!",
  checks:[has('footer p',"Add a `<footer>` with a `<p>` inside.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_news',cat:'html',emoji:'📰',title:'School Newsletter',mentor:'Ms Patel, newsletter editor',uses:'Codeling Quest, Dungeon Escape',
 blurb:'A school newsletter with sections, dated articles and a menu that jumps around the page.',
 intro:"Ms Patel needs this week's school newsletter online. You'll build it with sections, articles and real dates — plus a menu that jumps straight to each part of the page.",
 steps:[
 H('n1','The masthead',{why:"A newspaper's name at the top is called the masthead. It tells readers what they're reading.",
  learn:"`<header>` is the top part of a page. It usually holds the title.",
  todo:"Make a `<header>` with an `<h1>` (the newsletter's name) and a `<p>` (a short line about it).",
  job:"Make a `<header>`. Inside it, put an `<h1>` with the newsletter name and a `<p>` under it.",where:TOP,
  snippet:`<header>
  <h1>The Greenhill Gazette</h1>
  <p>News from Greenhill Primary School</p>
</header>`,
  hints:["`<header>` … `</header>` wraps everything.","Inside: `<h1>The Greenhill Gazette</h1>` and `<p>News from our school</p>`."],
  tip:"Make up a fun name for your school's paper!",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Add a `<p>` inside the `<header>` too.")]}),
 H('n2','The issue date',{why:"Readers need to know which week this news is from.",
  learn:"`<time>` wraps a date. Its `datetime` attribute writes the date in computer style — **year-month-day**, like `2026-11-06`. Calendars and Google can read it!",
  todo:"Inside the `<header>`, add `<p>Issue 7 · <time datetime=\"2026-11-06\">Friday 6 November 2026</time></p>`. Any date is fine, but the `datetime` must look like `2026-11-06`.",
  job:"Inside the `<header>`, add a `<p>` with a `<time>` date. Write the `datetime` like `2026-11-06` (year-month-day).",
  where:"Inside your `<header>`, just before `</header>`.",
  snippet:`<p>Issue 7 · <time datetime="2026-11-06">Friday 6 November 2026</time></p>`,apply:before('</header>',`<p>Issue 7 · <time datetime="2026-11-06">Friday 6 November 2026</time></p>`),
  hints:["Put the new line just ABOVE `</header>` so it stays inside the header.","`<p>Issue 7 · <time datetime=\"2026-11-06\">Friday 6 November 2026</time></p>`"],
  tip:"People read 'Friday 6 November'. Computers read `2026-11-06`. `<time>` gives both what they need.",
  checks:[has('header time',"Add a `<time>` inside your `<header>`."),isoDate('header time',"Give the `<time>` a `datetime` like `datetime=\"2026-11-06\"` (year-month-day).")]}),
 H('n3','The jump menu',{why:"A newsletter is long. A menu lets readers jump straight to the part they want.",
  learn:"`<nav>` holds the main links of a page.\nA link with `href=\"#news\"` jumps to the part of the page with `id=\"news\"`. We'll make those parts next!",
  todo:"Add a `<nav>` with **3** links: `href=\"#news\"`, `href=\"#sport\"` and `href=\"#events\"`.",
  job:"Make a `<nav>` with 3 links. Use `href=\"#news\"`, `href=\"#sport\"` and `href=\"#events\"`.",
  snippet:`<nav>
  <a href="#news">News</a> |
  <a href="#sport">Sport</a> |
  <a href="#events">Events</a>
</nav>`,
  hints:["`<nav>` … `</nav>` with 3 `<a>` links inside.","One link: `<a href=\"#news\">News</a>`. Then `#sport` and `#events`."],
  tip:"The `#` means 'somewhere on THIS page'. Without it, the browser looks for a different page.",
  checks:[hrefs('nav',['#news','#sport','#events'],"Your `<nav>` needs 3 links: `href=\"#news\"`, `href=\"#sport\"` and `href=\"#events\"`.")]}),
 H('n4','School news',{why:"The big story goes first. Each story is an article with its own date.",
  learn:"`<section>` is one part of the page.\n`<article>` is a piece that makes sense on its own — like a news story.\nThe `id=\"news\"` is the target for your menu link.",
  todo:"Add `<section id=\"news\">` with an `<h2>`, and an `<article>` inside it with an `<h3>` title, a `<time datetime=\"...\">` date and a `<p>` story.",
  job:"Make `<section id=\"news\">` with an `<h2>`. Inside it, add an `<article>` with an `<h3>`, a `<time>` date (like `2026-11-03`) and a `<p>`.",
  snippet:`<section id="news">
  <h2>School News</h2>
  <article>
    <h3>New Vegie Garden Opens</h3>
    <p><time datetime="2026-11-03">3 November</time></p>
    <p>Year 3 planted tomatoes, carrots and sunflowers. Come and see them grow!</p>
  </article>
</section>`,
  hints:["Outside box: `<section id=\"news\">` + `<h2>School News</h2>`.","Inside it: `<article>` with `<h3>`, then `<p><time datetime=\"2026-11-03\">3 November</time></p>`, then a `<p>` story."],
  tip:"Now click 'News' in your menu in the preview — it jumps here!",
  checks:[has('section#news h2',"Add `<section id=\"news\">` with an `<h2>` inside."),has('section#news article h3',"Add an `<article>` with an `<h3>` inside the news section."),isoDate('section#news article time',"Add a `<time datetime=\"2026-11-03\">` inside the article (year-month-day).")]}),
 H('n5','Sport results',{why:"Two big games this week — that's two separate stories.",
  todo:"Add `<section id=\"sport\">` with an `<h2>` and **2** `<article>`s. Each article needs an `<h3>` and a `<p>`.",
  job:"Make `<section id=\"sport\">` with an `<h2>`. Put 2 `<article>`s inside. Each one gets an `<h3>` and a `<p>`.",
  snippet:`<section id="sport">
  <h2>Sport</h2>
  <article>
    <h3>Netball Team Wins Again</h3>
    <p>Our Year 6 team beat Hillside 12 to 9. Go Greenhill!</p>
  </article>
  <article>
    <h3>Cross-Country Day</h3>
    <p>Over 200 students ran the 2 km track. Well done, everyone!</p>
  </article>
</section>`,
  hints:["`<section id=\"sport\">` + `<h2>Sport</h2>`.","Then two of these: `<article><h3>Title</h3><p>Story</p></article>`."],
  tip:"Each `<article>` could be cut out and shared on its own. That's the test for using `<article>`.",
  checks:[has('section#sport h2',"Add `<section id=\"sport\">` with an `<h2>` inside."),cnt('section#sport article h3',2,"Put 2 `<article>`s (each with an `<h3>`) inside the sport section.")]}),
 H('n6','Coming up',{why:"Parents need the dates of upcoming events. Each date gets a `<time>`.",
  todo:"Add `<section id=\"events\">` with an `<h2>` and a `<ul>` of at least **3** events. Each `<li>` needs a `<time datetime=\"...\">`.",
  job:"Make `<section id=\"events\">` with an `<h2>` and a `<ul>`. Add 3 `<li>` events. Each one needs a `<time>` with a `datetime`.",
  snippet:`<section id="events">
  <h2>Coming Up</h2>
  <ul>
    <li><time datetime="2026-11-10">10 Nov</time> – Book Fair</li>
    <li><time datetime="2026-11-18">18 Nov</time> – Science Show</li>
    <li><time datetime="2026-12-04">4 Dec</time> – Christmas Concert</li>
  </ul>
</section>`,
  hints:["`<section id=\"events\">` + `<h2>Coming Up</h2>` + `<ul>`.","One event: `<li><time datetime=\"2026-11-10\">10 Nov</time> – Book Fair</li>`. Make 3."],
  tip:"Write the month with 2 digits in `datetime`: November is `11`, March is `03`.",
  checks:[has('section#events h2',"Add `<section id=\"events\">` with an `<h2>` inside."),[a=>a.$$('section#events li time[datetime]').length>=3,"Add 3 `<li>` events, each with a `<time datetime=\"...\">` inside."]]}),
 H('n7','Star students',{why:"Let's celebrate the kids who did something amazing this week.",
  todo:"Add `<section id=\"awards\">` with an `<h2>` and a `<ul>` of at least **2** students. Put each name in `<strong>`.",
  job:"Make `<section id=\"awards\">` with an `<h2>`. Add a `<ul>` with 2 `<li>` students. Put each name in `<strong>`.",
  snippet:`<section id="awards">
  <h2>Star Students</h2>
  <ul>
    <li><strong>Aisha K.</strong> for helping a new student find her way</li>
    <li><strong>Leo M.</strong> for reading 20 books this term</li>
  </ul>
</section>`,
  hints:["`<section id=\"awards\">` + `<h2>Star Students</h2>` + `<ul>`.","One item: `<li><strong>Aisha K.</strong> for being kind</li>`."],
  tip:"The menu doesn't know about this section yet. You'll fix that in the next step!",
  checks:[has('section#awards h2',"Add `<section id=\"awards\">` with an `<h2>` inside."),[a=>a.$$('section#awards li').filter(l=>l.querySelector('strong')).length>=2,"Add 2 `<li>` students in the awards list, each name inside `<strong>`."]]}),
 H('n8','Update the menu',{why:"Our new Star Students section needs a menu link too.",
  learn:"Websites change all the time. Adding to code you already wrote is a big part of a coder's job!",
  todo:"Inside your `<nav>`, add a 4th link: `<a href=\"#awards\">Awards</a>`.",
  job:"Go back up to your `<nav>`. Add one more link: `<a href=\"#awards\">Awards</a>`.",
  where:"Inside your `<nav>`, just before `</nav>`.",
  snippet:`<a href="#awards">Awards</a>`,apply:before('</nav>',`<a href="#awards">Awards</a>`),
  hints:["Scroll up to the `<nav>` near the top of your code.","Just above `</nav>`, add `<a href=\"#awards\">Awards</a>`."],
  tip:"The `href=\"#awards\"` and the `id=\"awards\"` must match exactly — same letters, no capitals.",
  checks:[has('nav a[href="#awards"]',"Add `<a href=\"#awards\">Awards</a>` inside your `<nav>`.")]}),
 H('n9','Contact the editor',{why:"Readers might want to send in their own news. Tell them how.",
  learn:"`<address>` holds contact details for the page. A link with `href=\"mailto:...\"` opens an email app.",
  todo:"Add a `<footer>` with an `<address>` inside. In the address, put a link with `href=\"mailto:...\"`.",
  job:"Make a `<footer>`. Inside it, add an `<address>` with an email link: `<a href=\"mailto:news@greenhill.school\">`.",
  snippet:`<footer>
  <address>
    Got news? Email <a href="mailto:news@greenhill.school">news@greenhill.school</a>
  </address>
</footer>`,
  hints:["`<footer>` on the outside, `<address>` inside it.","Inside the address: `<a href=\"mailto:news@greenhill.school\">news@greenhill.school</a>`."],
  tip:"`<address>` is for contact info only — not for any old street address in a story.",
  checks:[has('footer address',"Add an `<address>` inside a `<footer>`."),has('footer address a[href^="mailto:"]',"Put a `mailto:` email link inside the `<address>`.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_book',cat:'html',emoji:'📚',title:'Book Report',mentor:'Mrs Lin, school librarian',uses:'Codeling Quest, Bug Hunter',
 blurb:'A book report with the plot in order, a favourite quote, new words and a star rating.',
 intro:"Mrs Lin wants book reports on the school website this year! Pick a book you love. You'll show the story in order, quote your favourite line and give it a star rating — using the RIGHT tag for each job.",
 steps:[
 H('b1','The title',{why:"Start with a big title so everyone knows this is a book report.",
  todo:"Add an `<h1>` like `My Book Report`.",job:"Type `<h1>My Book Report</h1>`. You can change the words.",where:TOP,
  snippet:`<h1>My Book Report</h1>`,
  hints:["A main heading is `<h1>` … `</h1>`.","`<h1>My Book Report</h1>`"],
  tip:"Only ONE `<h1>` per page — it's the title of the whole thing.",
  checks:[has('h1',"Add an `<h1>` title.")]}),
 H('b2','Which book?',{why:"Name the book and the author. Book titles have their own special tag!",
  learn:"`<cite>` is for the **title of a creative work** — a book, film, song or game. It shows in slanted letters.",
  todo:"Add a `<p>` saying which book you read. Put the book's title inside `<cite>`.",
  job:"Write a `<p>` about your book. Put the book's title inside `<cite>` and `</cite>`.",
  snippet:`<p>I read <cite>Charlotte's Web</cite> by E. B. White.</p>`,
  hints:["A sentence in a `<p>`: `<p>I read ... by ...</p>`.","`<p>I read <cite>Charlotte's Web</cite> by E. B. White.</p>`"],
  tip:"The author's name doesn't go in `<cite>` — only the title of the book.",
  checks:[has('p cite',"Inside a `<p>`, put the book title in `<cite>` … `</cite>`.")]}),
 H('b3','Main characters',{why:"Who's in the story? A list keeps it tidy.",
  todo:"Add `<h2>Main Characters</h2>` and a `<ul>` with at least **2** characters. Put each name in `<strong>`.",
  job:"Add `<h2>Main Characters</h2>`. Make a `<ul>` with 2 `<li>` characters. Put each name in `<strong>`.",
  snippet:`<h2>Main Characters</h2>
<ul>
  <li><strong>Wilbur</strong> – a friendly, worried pig</li>
  <li><strong>Charlotte</strong> – a clever spider who writes words in her web</li>
  <li><strong>Fern</strong> – the girl who saves Wilbur</li>
</ul>`,
  hints:["`<h2>Main Characters</h2>`, then `<ul>` … `</ul>`.","One character: `<li><strong>Wilbur</strong> – a friendly pig</li>`."],
  tip:"`<strong>` means 'this is important'. Character names are the key info here.",
  checks:[h2Is(/main characters/,"Add the heading `<h2>Main Characters</h2>`."),[a=>a.$$('ul li').filter(l=>l.querySelector('strong')).length>=2,"Add 2 `<li>` characters in a `<ul>`, each name in `<strong>`."]]}),
 H('b4','What happens',{why:"A story happens in order. Mix it up and it makes no sense!",
  learn:"`<ol>` is a **numbered** list. Use it when order matters — like the events of a story.",
  todo:"Add `<h2>What Happens</h2>` and an `<ol>` with at least **4** `<li>` events, in order.",
  job:"Add `<h2>What Happens</h2>`. Make an `<ol>` with 4 `<li>` events from the story, in order.",
  snippet:`<h2>What Happens</h2>
<ol>
  <li>Fern saves a tiny pig called Wilbur.</li>
  <li>Wilbur moves to a barn and feels lonely.</li>
  <li>Charlotte the spider becomes his friend.</li>
  <li>Charlotte writes words in her web to save him.</li>
</ol>`,
  hints:["`<h2>What Happens</h2>`, then `<ol>` (o for ordered).","Four `<li>` items inside the `<ol>`, from beginning to end."],
  tip:"Don't give away the ending! A good report makes people WANT to read the book.",
  checks:[h2Is(/what happens/,"Add the heading `<h2>What Happens</h2>`."),cnt('ol li',4,"Add an `<ol>` with at least 4 `<li>` events.")]}),
 H('b5','Best quote',{why:"Your favourite line from the book deserves to stand out on its own.",
  learn:"`<blockquote>` is for a quote copied from somewhere else. The browser pushes it in from the side.\nUnder it, say who said it — and put the book title in `<cite>` again.",
  todo:"Add `<h2>Best Quote</h2>`, a `<blockquote>` with a `<p>` inside, and right after it a `<p>` saying who said it, with the book title in `<cite>`.",
  job:"Add `<h2>Best Quote</h2>`. Put your quote in a `<p>` inside `<blockquote>`. Right under it, add a `<p>` with who said it and the `<cite>` title.",
  snippet:`<h2>Best Quote</h2>
<blockquote>
  <p>"Salutations!" said the voice.</p>
</blockquote>
<p>— Charlotte, in <cite>Charlotte's Web</cite></p>`,
  hints:["`<blockquote><p>your quote</p></blockquote>`","Right after `</blockquote>`: `<p>— Charlotte, in <cite>Charlotte's Web</cite></p>`."],
  tip:"Copy the words EXACTLY from the book when you quote. Changing them isn't fair to the author.",
  checks:[has('blockquote p',"Add a `<blockquote>` with a `<p>` quote inside."),has('blockquote + p cite',"Right after `</blockquote>`, add a `<p>` with the book title in `<cite>`.")]}),
 H('b6','New words',{why:"Good books teach us new words. Show off the ones you learned!",
  learn:"`<dfn>` marks the word you are **defining** (explaining). It shows slanted, and tells Google 'this sentence explains this word'.",
  todo:"Add `<h2>New Words I Learned</h2>` and at least **2** `<p>` lines. In each, put the new word in `<dfn>`, then say what it means.",
  job:"Add `<h2>New Words I Learned</h2>`. Write 2 `<p>` lines. Put each new word in `<dfn>`, then say what it means.",
  snippet:`<h2>New Words I Learned</h2>
<p><dfn>Salutations</dfn> is a fancy way to say hello.</p>
<p><dfn>Radiant</dfn> means shining brightly.</p>`,
  hints:["Two paragraphs, each starting with a `<dfn>` word.","`<p><dfn>Radiant</dfn> means shining brightly.</p>`"],
  tip:"Look up a word you didn't know in a dictionary, then teach it here. You'll remember it forever.",
  checks:[h2Is(/new words/,"Add the heading `<h2>New Words I Learned</h2>`."),cnt('p dfn',2,"Add 2 `<p>` lines, each with a word inside `<dfn>`.")]}),
 H('b7','What I thought',{why:"Now your opinion! Did you love it? Use tags to show which words matter most.",
  learn:"`<strong>` = **important**. `<em>` = *say it with feeling*. Use both in one sentence and hear how a screen reader changes its voice.",
  todo:"Add `<h2>What I Thought</h2>` and a `<p>` with your opinion. Use `<em>` on one word and `<strong>` on another part.",
  job:"Add `<h2>What I Thought</h2>` and a `<p>`. Put one word in `<em>` and another part in `<strong>`.",
  snippet:`<h2>What I Thought</h2>
<p>I <em>loved</em> this book! The ending made me cry, but it was <strong>the best part</strong>.</p>`,
  hints:["`<h2>What I Thought</h2>`, then a `<p>` with your opinion.","Inside: `I <em>loved</em> it` and `<strong>the best part</strong>`."],
  tip:"Don't make everything bold. If everything is important, nothing is!",
  checks:[h2Is(/what i thought/,"Add the heading `<h2>What I Thought</h2>`."),has('p em',"Put one word of your opinion inside `<em>`."),has('p strong',"Put another part of your opinion inside `<strong>`.")]}),
 H('b8','Star rating',{why:"Give it a score! Stars are fun, but we'll also write the score in words.",
  learn:"Screen readers read ⭐⭐⭐⭐ as 'star star star star' — confusing! So we ALSO write the score in words, like **4 out of 5 stars**.",
  todo:"Add `<h2>My Rating</h2>` and a `<p>` with star emoji AND the words `out of 5` (like `4 out of 5 stars`).",
  job:"Add `<h2>My Rating</h2>`. Write a `<p>` with stars and the words `out of 5`, like `4 out of 5 stars`.",
  snippet:`<h2>My Rating</h2>
<p>⭐⭐⭐⭐☆ <strong>4 out of 5 stars</strong></p>`,
  hints:["`<h2>My Rating</h2>`, then a `<p>`.","`<p>⭐⭐⭐⭐☆ <strong>4 out of 5 stars</strong></p>`"],
  tip:"Writing things in words AND pictures helps everyone: blind readers, Google, and people whose emoji don't load.",
  checks:[h2Is(/my rating/,"Add the heading `<h2>My Rating</h2>`."),[a=>a.$$('p').some(p=>/out of 5|out of five/.test(a.text(p))),"Write your score in a `<p>` with the words `out of 5`, like `4 out of 5 stars`."]]}),
 H('b9','Sign your report',{why:"Put your name on your work — you earned it!",
  todo:"Add a `<footer>` with a `<p>` saying who wrote the report.",job:"Add a `<footer>` with a `<p>` inside. Write your name and class.",
  snippet:`<footer>
  <p>Report by Sam, Class 4B</p>
</footer>`,
  hints:["`<footer>` … `</footer>`.","`<footer><p>Report by Sam, Class 4B</p></footer>`"],
  tip:"Download it and send it to your teacher — or start a whole website of book reports!",
  checks:[has('footer p',"Add a `<footer>` with a `<p>` inside.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_hero',cat:'html',emoji:'🦸',title:'Superhero ID Card',mentor:'Agent Nova, Hero HQ',uses:'Codeling Quest, Form Forge',
 blurb:'An official hero ID card with details, powers, power-level bars and top-secret info.',
 intro:"Welcome, recruit! Every hero at Hero HQ needs an official ID card. Invent your own superhero and build their card — with a details list, power bars and top-secret notes.",
 steps:[
 H('x1','Hero name',{why:"Every ID card starts with the hero's name in big letters.",
  todo:"Write your superhero's name in an `<h1>`.",job:"Type your hero's name between `<h1>` and `</h1>`.",where:TOP,
  snippet:`<h1>Captain Comet</h1>`,
  hints:["`<h1>` … `</h1>`","`<h1>Captain Comet</h1>` — invent your own hero name!"],
  tip:"Great hero names often use two words that start with the same letter: Captain Comet, Mega Mia, Turbo Tom!",
  checks:[has('h1',"Add an `<h1>` with your hero's name.")]}),
 H('x2','The slogan',{why:"Heroes need a cool slogan, said with feeling!",
  learn:"`<em>` means **emphasis** — say it with feeling. It looks *slanted*.",
  todo:"Add a `<p>` with your hero's slogan. Wrap the slogan in `<em>`.",job:"Write a `<p>` with your hero's slogan. Put the slogan inside `<em>` and `</em>`.",
  snippet:`<p><em>Faster than a falling star!</em></p>`,
  hints:["A `<p>` with an `<em>` inside it.","`<p><em>Faster than a falling star!</em></p>`"],
  tip:"`<em>` and `<i>` both look slanted, but `<em>` MEANS something: 'stress this'. Use `<em>`.",
  checks:[has('p em',"Add a `<p>` with your slogan inside `<em>`.")]}),
 H('x3','Hero details',{why:"An ID card is a list of labels and answers: Name, Base, Age…",
  learn:"`<dl>` is a **description list**. Each `<dt>` is a label (the term), and the `<dd>` after it is the answer (the description).\n`<dl>`\n  `<dt>Age</dt>`\n  `<dd>10</dd>`\n`</dl>`",
  todo:"Add `<h2>Hero Details</h2>` and a `<dl>` with at least **3** `<dt>` labels, each followed by a `<dd>` answer.",
  job:"Add `<h2>Hero Details</h2>`. Make a `<dl>`. Add 3 `<dt>` labels, each with a `<dd>` answer under it.",
  snippet:`<h2>Hero Details</h2>
<dl>
  <dt>Real name</dt>
  <dd>Sam Rivers</dd>
  <dt>Home base</dt>
  <dd>Moon Base 3</dd>
  <dt>Age</dt>
  <dd>10 and a half</dd>
</dl>`,
  hints:["`<dl>` … `</dl>` holds all the pairs.","One pair: `<dt>Home base</dt>` then `<dd>Moon Base 3</dd>`. Make 3 pairs."],
  tip:"Use `<dl>` whenever you have labels and answers — like a passport, a menu, or a dictionary.",
  checks:[cnt('dl dt',3,"Add a `<dl>` with at least 3 `<dt>` labels."),cnt('dl dd',3,"Give each `<dt>` a `<dd>` answer (3 in total).")]}),
 H('x4','Top-secret team name',{why:"Your hero belongs to a team with a short name. Explain what the letters stand for!",
  learn:"`<abbr>` marks a short form, like `NASA`. Its `title` says the full words. Point your mouse at it to see!",
  todo:"Inside your `<dl>`, add a new pair: `<dt>Team</dt>` and a `<dd>` with an `<abbr title=\"...\">`. Write the full words in `title`.",
  job:"Inside your `<dl>`, add `<dt>Team</dt>`. Then add a `<dd>` with `<abbr title=\"Galaxy Defence League\">GDL</abbr>`.",
  where:"Inside your `<dl>`, just before `</dl>`.",
  snippet:`<dt>Team</dt>
<dd><abbr title="Galaxy Defence League">GDL</abbr></dd>`,apply:before('</dl>',`<dt>Team</dt>
<dd><abbr title="Galaxy Defence League">GDL</abbr></dd>`),
  hints:["Find `</dl>` and add the new lines just above it.","`<dt>Team</dt>` then `<dd><abbr title=\"Galaxy Defence League\">GDL</abbr></dd>`."],
  tip:"Hover your mouse over GDL in the preview. A little box pops up with the full name!",
  checks:[[a=>{const e=a.$('dl abbr[title]');return !!e&&e.getAttribute('title').trim().length>2;},"Inside your `<dl>`, add an `<abbr>` with a `title`, like `<abbr title=\"Galaxy Defence League\">GDL</abbr>`."]]}),
 H('x5','Superpowers',{why:"The best part: what can your hero DO?",
  todo:"Add `<h2>Superpowers</h2>` and a `<ul>` with at least **2** powers. Put each power's name in `<strong>`.",
  job:"Add `<h2>Superpowers</h2>`. Make a `<ul>` with 2 `<li>` powers. Put each power name in `<strong>`.",
  snippet:`<h2>Superpowers</h2>
<ul>
  <li><strong>Super speed</strong> – runs at 1000 km/h</li>
  <li><strong>Star beam</strong> – shoots glittery light</li>
</ul>`,
  hints:["`<h2>Superpowers</h2>` then `<ul>` … `</ul>`.","`<li><strong>Super speed</strong> – runs at 1000 km/h</li>`"],
  tip:"Every power needs a limit, or the story gets boring. Even Captain Comet gets tired!",
  checks:[h2Is(/superpowers/,"Add the heading `<h2>Superpowers</h2>`."),cnt('ul li strong',2,"Add 2 `<li>` powers in a `<ul>`, each name in `<strong>`.")]}),
 H('x6','Power levels',{why:"Hero HQ rates every hero. HTML can draw the bars for you!",
  learn:"`<meter>` draws a level bar. `min` is the lowest, `max` is the highest, `value` is how full it is:\n`<meter min=\"0\" max=\"10\" value=\"7\">7 out of 10</meter>`\nThe words inside are for browsers that can't draw the bar.",
  todo:"Add `<h2>Power Levels</h2>` and at least **3** `<p>` lines, each with a `<meter min=\"0\" max=\"10\" value=\"...\">`. Pick any value from 0 to 10.",
  job:"Add `<h2>Power Levels</h2>`. Make 3 `<p>` lines, each with `<meter min=\"0\" max=\"10\" value=\"7\">`. Pick any value from 0 to 10.",
  snippet:`<h2>Power Levels</h2>
<p>Speed: <meter min="0" max="10" value="10">10 out of 10</meter></p>
<p>Strength: <meter min="0" max="10" value="6">6 out of 10</meter></p>
<p>Brains: <meter min="0" max="10" value="8">8 out of 10</meter></p>`,
  hints:["Each line: a label, then a `<meter>` tag.","`<p>Speed: <meter min=\"0\" max=\"10\" value=\"10\">10 out of 10</meter></p>` — make 3."],
  tip:"Change a `value` and watch the bar grow or shrink in the preview. No CSS needed!",
  checks:[h2Is(/power levels/,"Add the heading `<h2>Power Levels</h2>`."),cnt('meter[max][value]',3,"Add 3 `<meter>` bars, each with `max=\"10\"` and a `value`.")]}),
 H('x7','The weakness',{why:"Every hero has a weakness. It's top secret — mark it as important!",
  learn:"`<strong>` means **this is important**. Perfect for a warning.",
  todo:"Add `<h2>Weakness</h2>` and a `<p>` that starts with `<strong>Top secret:</strong>`, then says the weakness.",
  job:"Add `<h2>Weakness</h2>`. Write a `<p>` that starts with `<strong>Top secret:</strong>`. Then write the weakness.",
  snippet:`<h2>Weakness</h2>
<p><strong>Top secret:</strong> Captain Comet is scared of spiders. Even tiny ones.</p>`,
  hints:["`<h2>Weakness</h2>`, then a `<p>`.","`<p><strong>Top secret:</strong> scared of spiders.</p>`"],
  tip:"A screen reader says `<strong>` words more firmly. It's not just bold — it's a meaning.",
  checks:[h2Is(/weakness/,"Add the heading `<h2>Weakness</h2>`."),has('p strong',"Start your weakness `<p>` with `<strong>Top secret:</strong>`.")]}),
 H('x8','Catchphrase',{why:"What does your hero shout before saving the day?",
  learn:"`<q>` is for a short quote inside a sentence. The browser adds the “quote marks” for you!",
  todo:"Add a `<p>` like `Catchphrase:` followed by the catchphrase inside `<q>` (don't type quote marks yourself).",
  job:"Write a `<p>` with `Catchphrase:` and then your hero's words inside `<q>` and `</q>`.",
  snippet:`<p>Catchphrase: <q>To the stars and back!</q></p>`,
  hints:["A `<p>` with a `<q>` inside it.","`<p>Catchphrase: <q>To the stars and back!</q></p>`"],
  tip:"Short quote in a sentence = `<q>`. Big quote on its own = `<blockquote>`.",
  checks:[has('p q',"Put your catchphrase inside `<q>` … `</q>` in a `<p>`.")]}),
 H('x9','The fine print',{why:"Real ID cards have tiny print at the bottom. Ours too!",
  learn:"`<small>` is for **fine print** — side notes, copyright, rules.",
  todo:"Add a `<footer>` with a `<p>`, and put the fine print inside `<small>`.",
  job:"Add a `<footer>` with a `<p>`. Put the fine print inside `<small>` and `</small>`.",
  snippet:`<footer>
  <p><small>Hero ID #0042 · Property of Hero HQ · If found, return to Moon Base 3</small></p>
</footer>`,
  hints:["`<footer><p>` … `</p></footer>`","Inside the `<p>`: `<small>Hero ID #0042 · Property of Hero HQ</small>`."],
  tip:"Make ID cards for your whole family as superheroes. Mum = Captain Coffee?",
  checks:[has('footer small',"Add a `<footer>` with `<small>` fine print inside.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_travel',cat:'html',emoji:'✈️',title:'Holiday Travel Journal',mentor:'Grandpa Joe, world traveller',uses:'Codeling Quest, Dungeon Escape',
 blurb:'A day-by-day holiday journal with highlights, hidden secrets and a packing list.',
 intro:"Grandpa Joe has kept a travel journal for 60 years. Now it's your turn — online! Write about a real or dream holiday, one day at a time, with highlighted best moments and secrets that open when you click them.",
 steps:[
 H('t1','Where did you go?',{why:"A journal starts with where you went, so readers can picture it.",
  todo:"Add an `<h1>` with the trip's name and a `<p>` saying where you went.",job:"Write the trip name in an `<h1>`. Under it, write a `<p>` about where you went.",where:TOP,
  snippet:`<h1>Our Beach Holiday</h1>
<p>Five sunny days at Byron Bay with my family.</p>`,
  hints:["`<h1>Our Beach Holiday</h1>`","Under it: `<p>Five sunny days at Byron Bay.</p>`"],
  tip:"It can be a pretend trip — to the Moon, a jungle, or Grandma's backyard!",
  checks:[has('h1',"Add an `<h1>` with your trip's name."),has('h1 ~ p',"Add a `<p>` under the `<h1>`.")]}),
 H('t2','Day 1',{why:"Each day of the trip is its own little story. Stories go in articles.",
  learn:"`<article>` is a piece that makes sense on its own — like one diary entry.\n`<time datetime=\"2026-12-27\">` writes the date so computers understand it too (year-month-day).",
  todo:"Add an `<article>` with an `<h2>` (with a `<time datetime=\"...\">` date in it) and a `<p>` about the day.",
  job:"Make an `<article>`. Put an `<h2>` inside with `Day 1` and a `<time datetime=\"2026-12-27\">` date. Then a `<p>` about the day.",
  snippet:`<article>
  <h2>Day 1 · <time datetime="2026-12-27">27 December</time></h2>
  <p>We drove for six hours. I counted 14 cows and 2 camels!</p>
</article>`,
  hints:["`<article>` … `</article>` holds the whole day.","Inside: `<h2>Day 1 · <time datetime=\"2026-12-27\">27 December</time></h2>` and a `<p>`."],
  tip:"`datetime` is always year-month-day: 27 December 2026 is `2026-12-27`.",
  checks:[has('article h2',"Add an `<article>` with an `<h2>` inside."),has('article time[datetime]',"Add a `<time datetime=\"...\">` date to your day.")]}),
 H('t3','Day 2 — highlight it!',{why:"Something AMAZING happened on day 2. Let's highlight it like a highlighter pen.",
  learn:"`<mark>` highlights text, like a yellow highlighter. Use it for the part you want people to notice.",
  todo:"Add a second `<article>` for Day 2 (an `<h2>` and a `<p>`). Wrap the best moment in `<mark>`.",
  job:"Make another `<article>` for Day 2 with an `<h2>` and a `<p>`. Put the best moment inside `<mark>` and `</mark>`.",
  snippet:`<article>
  <h2>Day 2 · <time datetime="2026-12-28">28 December</time></h2>
  <p>We swam all morning. Then the best thing happened: <mark>I saw a real dolphin!</mark></p>
</article>`,
  hints:["Copy your Day 1 article, then change the words.","In the `<p>`: `<mark>I saw a real dolphin!</mark>`."],
  tip:"Highlight just a few words. If you highlight everything, nothing stands out.",
  checks:[cnt('article',2,"Add a second `<article>` for Day 2."),has('article mark',"Wrap the best moment in `<mark>` … `</mark>`.")]}),
 H('t4','Day 3 — a secret',{why:"Some things are secret… readers have to click to find out!",
  learn:"`<details>` hides things until you click. `<summary>` is the part you can always see — click it to open!\n`<details>`\n  `<summary>Click me</summary>`\n  `<p>Surprise!</p>`\n`</details>`",
  todo:"Add a Day 3 `<article>` with an `<h2>`, a `<p>`, and a `<details>` with a `<summary>` and a secret `<p>` inside.",
  job:"Make a Day 3 `<article>` with an `<h2>` and a `<p>`. Add a `<details>` with a `<summary>` and a secret `<p>`.",
  snippet:`<article>
  <h2>Day 3 · <time datetime="2026-12-29">29 December</time></h2>
  <p>Rainy day. We played board games in the cabin.</p>
  <details>
    <summary>A secret about Day 3</summary>
    <p>I won every game. Dad says it was luck.</p>
  </details>
</article>`,
  hints:["Start like the other days: `<article>`, `<h2>`, `<p>`.","Before `</article>`: `<details><summary>A secret</summary><p>I won every game.</p></details>`"],
  tip:"Click the little triangle in the preview. A click-to-open box with zero JavaScript!",
  checks:[cnt('article',3,"Add a third `<article>` for Day 3."),has('article details summary',"Inside Day 3, add `<details>` with a `<summary>` inside.")]}),
 H('t5','Packing list',{why:"I always forget my hat. A packing list that folds away keeps the page tidy.",
  todo:"Add a `<details>` with `<summary>My Packing List</summary>` and a `<ul>` of at least **4** things inside.",
  job:"Make a `<details>` with `<summary>My Packing List</summary>`. Inside, add a `<ul>` with 4 `<li>` things.",
  snippet:`<details>
  <summary>My Packing List</summary>
  <ul>
    <li>Swimmers</li>
    <li>Sunscreen</li>
    <li>Hat (don't forget it!)</li>
    <li>Snorkel</li>
  </ul>
</details>`,
  hints:["`<details>` then `<summary>My Packing List</summary>`.","Then a `<ul>` with 4 `<li>` items, then `</details>`."],
  tip:"You can put anything inside `<details>`: lists, pictures, even another `<details>`!",
  checks:[[a=>a.$$('details ul li').length>=4,"Inside a `<details>`, add a `<ul>` with at least 4 `<li>` things."]]}),
 H('t6','Open it up',{why:"The packing list is useful — let's show it open when the page loads.",
  learn:"Some tags have switches with no value. Adding `open` to `<details>` makes it start open: `<details open>`.",
  todo:"Change the packing list's `<details>` to `<details open>`.",job:"Find your packing list's `<details>` tag. Change it to `<details open>`.",
  where:"On the `<details>` line of your packing list — the last `<details>` on the page.",kind:'edit',
  snippet:`<details open>`,apply:c=>{const i=c.lastIndexOf('<details>');return i<0?c:c.slice(0,i)+'<details open>'+c.slice(i+9);},
  hints:["Find `<details>` just above `<summary>My Packing List</summary>`.","Type a space and the word `open` before the `>`: `<details open>`."],
  tip:"Readers can still click to close it. `open` only sets how it starts.",
  checks:[has('details[open]',"Change the packing list's tag to `<details open>`.")]}),
 H('t7','Top 3 moments',{why:"If you had to pick your 3 best moments, in order, what would they be?",
  todo:"Add `<h2>My Top 3 Moments</h2>` and an `<ol>` with **3** `<li>` moments, best first.",
  job:"Add `<h2>My Top 3 Moments</h2>`. Make an `<ol>` with 3 `<li>` moments. Best one first!",
  snippet:`<h2>My Top 3 Moments</h2>
<ol>
  <li>Seeing the dolphin</li>
  <li>Building a sandcastle taller than my sister</li>
  <li>Fish and chips on the beach</li>
</ol>`,
  hints:["A ranking has an order, so use `<ol>`.","`<ol>` with three `<li>…</li>` items."],
  tip:"`<ol>` numbers itself. Swap two lines and the numbers fix themselves.",
  checks:[h2Is(/top 3 moments|top three moments/,"Add the heading `<h2>My Top 3 Moments</h2>`."),cnt('ol li',3,"Add an `<ol>` with 3 `<li>` moments.")]}),
 H('t8','A postcard home',{why:"A postcard has short lines. In HTML, a new line inside a paragraph needs a special tag.",
  learn:"`<br>` is a **line break** — it starts a new line inside the same paragraph. It has no closing tag! Use it for postcards, poems and addresses.",
  todo:"Add `<h2>Postcard Home</h2>` and a `<p>` with your postcard. Put `<br>` at the end of each line (at least **2** `<br>`).",
  job:"Add `<h2>Postcard Home</h2>`. Write a `<p>` postcard. End each line with `<br>` — use at least 2.",
  snippet:`<h2>Postcard Home</h2>
<p>
  Dear Nana,<br>
  The beach is amazing and the water is warm.<br>
  Wish you were here!<br>
  Love, Sam
</p>`,
  hints:["One `<p>` holds the whole postcard.","Put `<br>` at the end of each line: `Dear Nana,<br>`"],
  tip:"Don't use `<br>` to make space between paragraphs — use a new `<p>` for that.",
  checks:[h2Is(/postcard/,"Add the heading `<h2>Postcard Home</h2>`."),cnt('p br',2,"Put at least 2 `<br>` line breaks inside your postcard `<p>`.")]}),
 H('t9','The end',{why:"Finish the journal with a line across the page and a signature.",
  learn:"`<hr>` draws a line that means **a new topic starts here**. Like `<br>`, it has no closing tag.",
  todo:"Add an `<hr>`, then a `<footer>` with a `<p>` inside.",job:"Type `<hr>` for a line. Then add a `<footer>` with a `<p>` and your name.",
  snippet:`<hr>
<footer>
  <p>The End · Written by Sam, age 8</p>
</footer>`,
  hints:["`<hr>` on its own line — no closing tag.","Then `<footer><p>The End · by Sam</p></footer>`."],
  tip:"Print this page and stick it in a scrapbook. Or start a journal for your next trip!",
  checks:[has('hr',"Add an `<hr>` line."),has('footer p',"Add a `<footer>` with a `<p>` inside.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_sports',cat:'html',emoji:'⚽',title:'Sports Team Page',mentor:'Coach Dee, Under-10s coach',uses:'Codeling Quest, Grid Farm',
 blurb:'A team page with game results, a league ladder, the squad and the next match.',
 intro:"Coach Dee's Under-10s team needs a web page for families. You'll build tables of games and scores — the proper way, with headings that screen readers understand — plus the squad and the next match.",
 steps:[
 H('s1','Team name',{why:"Families should know at once which team this page is for.",
  todo:"Make a `<header>` with an `<h1>` (team name) and a `<p>` (a motto).",job:"Make a `<header>`. Put the team name in an `<h1>` and a motto in a `<p>`.",where:TOP,
  snippet:`<header>
  <h1>Riverside Rockets ⚽</h1>
  <p>Under-10s soccer · Play fair, have fun!</p>
</header>`,
  hints:["`<header>` … `</header>`.","Inside: `<h1>Riverside Rockets</h1>` and `<p>Play fair, have fun!</p>`."],
  tip:"Use your real team — or invent one for any sport you like!",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Add a motto `<p>` inside the `<header>`.")]}),
 H('s2','About the team',{why:"New families want to know when and where we train.",
  todo:"Add `<h2>About Us</h2>` and a `<p>` under it.",job:"Add `<h2>About Us</h2>`. Under it, write a `<p>` about the team.",
  snippet:`<h2>About Us</h2>
<p>We train every Tuesday at 4pm at Riverside Park. New players are always welcome!</p>`,
  hints:["`<h2>About Us</h2>`","Then `<p>We train every Tuesday...</p>`."],
  tip:"Headings help screen-reader users jump from part to part, like a table of contents.",
  checks:[h2Is(/about us/,"Add the heading `<h2>About Us</h2>`."),has('h2 + p',"Put a `<p>` right under the `<h2>`.")]}),
 H('s3','The fixtures table',{why:"Games and scores are rows and columns — that's exactly what tables are for.",
  learn:"`<table>` makes a table. `<caption>` is its title.\n`<thead>` holds the heading row. Each heading is a `<th>`.\n`scope=\"col\"` tells screen readers 'this heading is for the whole column'.",
  todo:"Add `<h2>Fixtures and Results</h2>` and a `<table>` with a `<caption>` and a `<thead>`. The head row needs **4** `<th scope=\"col\">`: Date, Opponent, Home or Away, Result.",
  job:"Make a `<table>` with a `<caption>`. Add a `<thead>` row with 4 `<th scope=\"col\">`: Date, Opponent, Home or Away, Result.",
  snippet:`<h2>Fixtures and Results</h2>
<table>
  <caption>Autumn season games</caption>
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Opponent</th>
      <th scope="col">Home or Away</th>
      <th scope="col">Result</th>
    </tr>
  </thead>
</table>`,
  hints:["`<table>` then `<caption>Autumn season games</caption>`.","`<thead><tr>` with 4 of these: `<th scope=\"col\">Date</th>` — then `</tr></thead></table>`."],
  tip:"`<tr>` = table row. `<th>` = table heading. `<td>` = table data (a normal cell).",
  checks:[has('table caption',"Add a `<caption>` inside your `<table>`."),cnt('table thead th[scope="col"]',4,"Add a `<thead>` with 4 `<th scope=\"col\">` headings.")]}),
 H('s4','Add the games',{why:"Now fill in the games we've played so far.",
  learn:"`<tbody>` holds the main rows of a table. Each `<tr>` is one game, and each `<td>` is one cell.\n`<abbr title=\"Win\">W</abbr>` explains a short letter.",
  todo:"Inside your table, after `</thead>`, add a `<tbody>` with at least **3** `<tr>` rows. Each row needs **4** `<td>` cells.",
  job:"Inside the table, under `</thead>`, add a `<tbody>`. Put 3 `<tr>` rows in it. Each row gets 4 `<td>` cells.",
  where:"Inside your fixtures `<table>`, just before `</table>`.",
  snippet:`<tbody>
  <tr><td>3 May</td><td>Hilltop Hawks</td><td>Home</td><td><abbr title="Win">W</abbr> 3–1</td></tr>
  <tr><td>10 May</td><td>Lakeside Lions</td><td>Away</td><td><abbr title="Draw">D</abbr> 2–2</td></tr>
  <tr><td>17 May</td><td>Northside Owls</td><td>Home</td><td><abbr title="Win">W</abbr> 4–0</td></tr>
</tbody>`,apply:before('</table>',`<tbody>
  <tr><td>3 May</td><td>Hilltop Hawks</td><td>Home</td><td><abbr title="Win">W</abbr> 3–1</td></tr>
  <tr><td>10 May</td><td>Lakeside Lions</td><td>Away</td><td><abbr title="Draw">D</abbr> 2–2</td></tr>
  <tr><td>17 May</td><td>Northside Owls</td><td>Home</td><td><abbr title="Win">W</abbr> 4–0</td></tr>
</tbody>`),
  hints:["Find `</table>` and type above it: `<tbody>` … `</tbody>`.","One row: `<tr><td>3 May</td><td>Hilltop Hawks</td><td>Home</td><td>W 3–1</td></tr>`. Make 3."],
  tip:"Every row needs the same number of cells as the heading row — 4 here — or the columns get messy.",
  checks:[cnt('table tbody tr',3,"Add a `<tbody>` with at least 3 `<tr>` rows inside your table."),[a=>{const r=a.$$('table tbody tr');return r.length>=3&&r.every(x=>x.querySelectorAll('td').length>=4);},"Each game row needs 4 `<td>` cells."]]}),
 H('s5','The league ladder',{why:"How are we doing against the other teams? Build a whole table by yourself!",
  todo:"Add `<h2>League Ladder</h2>` and a second `<table>` with a `<caption>`, a `<thead>` (`<th scope=\"col\">` headings) and a `<tbody>` with at least **3** rows. Put your team's name in `<strong>`.",
  job:"Add `<h2>League Ladder</h2>` and a new `<table>`. Give it a `<caption>`, a `<thead>` and a `<tbody>` with 3 rows. Put your team name in `<strong>`.",
  snippet:`<h2>League Ladder</h2>
<table>
  <caption>Top 3 teams</caption>
  <thead>
    <tr><th scope="col">Team</th><th scope="col">Played</th><th scope="col">Points</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Riverside Rockets</strong></td><td>3</td><td>7</td></tr>
    <tr><td>Hilltop Hawks</td><td>3</td><td>6</td></tr>
    <tr><td>Lakeside Lions</td><td>3</td><td>4</td></tr>
  </tbody>
</table>`,
  hints:["Same shape as before: `<table>`, `<caption>`, `<thead>`, `<tbody>`.","Head: `<tr><th scope=\"col\">Team</th><th scope=\"col\">Points</th></tr>`. Body: 3 `<tr>` rows of `<td>`s."],
  tip:"A ladder is sorted from most points to fewest. Who's on top?",
  checks:[cnt('table',2,"Add a second `<table>` for the ladder."),[a=>{const t=a.$$('table')[1];return !!t&&!!t.querySelector('caption')&&!!t.querySelector('thead th[scope="col"]');},"Give the ladder table a `<caption>` and a `<thead>` with `<th scope=\"col\">` headings."],[a=>{const t=a.$$('table')[1];return !!t&&t.querySelectorAll('tbody tr').length>=3;},"Add a `<tbody>` with at least 3 rows to the ladder."],has('tbody strong',"Put your team's name in `<strong>` in the ladder.")]}),
 H('s6','Our squad',{why:"Every player should see their name on the team page.",
  todo:"Add `<h2>Our Squad</h2>` and a `<ul>` with at least **4** players.",job:"Add `<h2>Our Squad</h2>`. Make a `<ul>` with 4 `<li>` players.",
  snippet:`<h2>Our Squad</h2>
<ul>
  <li>#1 Mia – goalkeeper</li>
  <li>#4 Jayden – defender</li>
  <li>#7 Priya – midfield</li>
  <li>#9 Tom – striker</li>
</ul>`,
  hints:["`<h2>Our Squad</h2>` then `<ul>`.","`<li>#7 Priya – midfield</li>` — make at least 4."],
  tip:"Only use first names on a public website. It keeps young players safe.",
  checks:[h2Is(/our squad/,"Add the heading `<h2>Our Squad</h2>`."),[a=>a.$$('ul').some(u=>u.querySelectorAll('li').length>=4),"Add a `<ul>` with at least 4 `<li>` players."]]}),
 H('s7','Next game',{why:"The #1 question from parents: when's the next game?",
  learn:"`<time>` can hold a date AND a time: `datetime=\"2026-05-24T09:00\"` means 24 May 2026 at 9:00am. The `T` splits the date from the time.",
  todo:"Add `<h2>Next Game</h2>` and a `<p>` with a `<time datetime=\"...\">` for the game.",
  job:"Add `<h2>Next Game</h2>`. Write a `<p>` with `<time datetime=\"2026-05-24T09:00\">`. Use any date and time.",
  snippet:`<h2>Next Game</h2>
<p><strong>Saturday</strong> vs Lakeside Lions, <time datetime="2026-05-24T09:00">9:00am, 24 May</time>. Wear your blue socks!</p>`,
  hints:["`<h2>Next Game</h2>` then a `<p>`.","Inside: `<time datetime=\"2026-05-24T09:00\">9:00am, 24 May</time>`."],
  tip:"Phones can read `datetime` and offer to add the game to the calendar!",
  checks:[h2Is(/next game/,"Add the heading `<h2>Next Game</h2>`."),has('p time[datetime]',"Add a `<time datetime=\"...\">` inside a `<p>`.")]}),
 H('s8','Join the team',{why:"New players can email me with one click.",
  todo:"Add a `<p>` with a link whose `href` starts with `mailto:`.",job:"Add a `<p>` with an email link: `<a href=\"mailto:coach@rockets.club\">`.",
  snippet:`<p><a href="mailto:coach@rockets.club">Email Coach Dee to join the team</a></p>`,
  hints:["Email links start with `mailto:`.","`<a href=\"mailto:coach@rockets.club\">Email Coach Dee</a>` inside a `<p>`."],
  tip:"Good link words say what happens: 'Email Coach Dee' is better than 'click here'.",
  checks:[has('a[href^="mailto:"]',"Add a link with `href=\"mailto:...\"`.")]}),
 H('s9','Footer',{why:"Finish with the club name and year.",
  todo:"Add a `<footer>` with a `<p>`.",job:"Add a `<footer>` with a `<p>` inside.",
  snippet:`<footer>
  <p>Riverside Rockets Football Club · Season 2026</p>
</footer>`,
  hints:["`<footer>` … `</footer>`.","`<footer><p>Riverside Rockets · 2026</p></footer>`"],
  tip:"Update the results table after every game — that's how real club sites work!",
  checks:[has('footer p',"Add a `<footer>` with a `<p>` inside.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_science',cat:'html',emoji:'🔬',title:'Science Fair Poster',mentor:'Dr Ada, science teacher',uses:'Codeling Quest, Bug Hunter',
 blurb:'A science fair poster with a hypothesis, method, results figure and real science symbols.',
 intro:"Science fair time! Dr Ada wants every project on the school website. You'll build a poster with the parts real scientists use — hypothesis, method and result — plus science writing like H₂O.",
 steps:[
 H('e1','The big question',{why:"A science poster starts with the question you tested, as the title.",
  todo:"Add an `<h1>` with your question and a `<p>` saying who did the project.",job:"Write your science question in an `<h1>`. Under it, a `<p>` with your name.",where:TOP,
  snippet:`<h1>Does Salt Make Ice Melt Faster?</h1>
<p>A science fair project by Sam, Class 4B</p>`,
  hints:["`<h1>Does Salt Make Ice Melt Faster?</h1>`","Then `<p>A project by Sam</p>`."],
  tip:"The best science questions can be tested at home with simple things.",
  checks:[has('h1',"Add an `<h1>` with your question."),has('h1 ~ p',"Add a `<p>` under the `<h1>`.")]}),
 H('e2','Hypothesis',{why:"Before testing, scientists guess what will happen. That guess is called a hypothesis.",
  learn:"`<section>` groups one part of the page with its own `<h2>` heading. Our poster will have a section for each part.",
  todo:"Add a `<section>` with `<h2>Hypothesis</h2>` and a `<p>` with your guess.",job:"Make a `<section>`. Inside, put `<h2>Hypothesis</h2>` and a `<p>` with your guess.",
  snippet:`<section>
  <h2>Hypothesis</h2>
  <p>I think the ice with salt will melt first, because people put salt on icy roads.</p>
</section>`,
  hints:["`<section>` … `</section>` holds it all.","Inside: `<h2>Hypothesis</h2>` and `<p>I think...</p>`."],
  tip:"A hypothesis can be wrong — that's fine! Finding out is the whole point of science.",
  checks:[secH2(/hypothesis/,'p',"Add a `<section>` with `<h2>Hypothesis</h2>` and a `<p>`.")]}),
 H('e3','Materials',{why:"List everything you used, so others can repeat your test. Scientists write water as H₂O!",
  learn:"`<sub>` is **subscript** — small and low. Chemists write water as `H<sub>2</sub>O`. The 2 sits down low.",
  todo:"Add a `<section>` with `<h2>Materials</h2>` and a `<ul>`. In one item write water as `H<sub>2</sub>O`.",
  job:"Make a `<section>` with `<h2>Materials</h2>` and a `<ul>` list. Write water as `H<sub>2</sub>O` in one item.",
  snippet:`<section>
  <h2>Materials</h2>
  <ul>
    <li>4 ice cubes (frozen H<sub>2</sub>O)</li>
    <li>1 teaspoon of salt</li>
    <li>2 plates</li>
    <li>A timer</li>
  </ul>
</section>`,
  hints:["`<section>`, `<h2>Materials</h2>`, then a `<ul>` with `<li>` items.","One item: `<li>4 ice cubes (frozen H<sub>2</sub>O)</li>`."],
  tip:"H₂O means 2 hydrogen atoms + 1 oxygen atom. That's every drop of water in the world!",
  checks:[secH2(/materials/,'ul',"Add a `<section>` with `<h2>Materials</h2>` and a `<ul>`."),has('sub',"Write water as `H<sub>2</sub>O` in your list.")]}),
 H('e4','Method',{why:"The method is the steps you followed. The order really matters!",
  learn:"Steps have an order, so we use `<ol>` — the browser numbers them for you.",
  todo:"Add a `<section>` with `<h2>Method</h2>` and an `<ol>` with at least **4** steps.",job:"Make a `<section>` with `<h2>Method</h2>`. Add an `<ol>` with 4 `<li>` steps.",
  snippet:`<section>
  <h2>Method</h2>
  <ol>
    <li>Put 2 ice cubes on each plate.</li>
    <li>Sprinkle salt on one plate only.</li>
    <li>Start the timer.</li>
    <li>Write down when each plate's ice has melted.</li>
  </ol>
</section>`,
  hints:["`<section>`, `<h2>Method</h2>`, then `<ol>`.","4 `<li>` steps inside the `<ol>`."],
  tip:"A good method is so clear that a stranger could do your test and get the same result.",
  checks:[secH2(/method/,'ol',"Add a `<section>` with `<h2>Method</h2>` and an `<ol>`."),cnt('section ol li',4,"Put at least 4 `<li>` steps in your `<ol>`.")]}),
 H('e5','Result',{why:"Show your measurements in a table, with a caption — like a real science paper.",
  learn:"`<figure>` isn't only for pictures! It can hold a table, chart or diagram. `<figcaption>` explains it, like 'Figure 1: …'.",
  todo:"Add a `<section>` with `<h2>Result</h2>`. Inside, a `<figure>` holding a `<table>` of your results and a `<figcaption>`.",
  job:"Make a `<section>` with `<h2>Result</h2>`. Inside, add a `<figure>`. Put a `<table>` and a `<figcaption>` in the figure.",
  snippet:`<section>
  <h2>Result</h2>
  <figure>
    <table>
      <tr><th scope="col">Plate</th><th scope="col">Time to melt</th></tr>
      <tr><td>Ice with salt</td><td>12 minutes</td></tr>
      <tr><td>Plain ice</td><td>25 minutes</td></tr>
    </table>
    <figcaption>Figure 1: How long the ice took to melt.</figcaption>
  </figure>
</section>`,
  hints:["`<section>`, `<h2>Result</h2>`, then `<figure>` … `</figure>`.","Inside the figure: a `<table>` with `<tr>` rows, then `<figcaption>Figure 1: ...</figcaption>`."],
  tip:"Always write the units: '12 minutes', not just '12'.",
  checks:[secH2(/result/,'figure',"Add a `<section>` with `<h2>Result</h2>` and a `<figure>` inside."),has('figure table',"Put a `<table>` inside the `<figure>`."),has('figure figcaption',"Add a `<figcaption>` inside the `<figure>`.")]}),
 H('e6','A picture of the setup',{why:"A diagram helps people see what you did.",
  learn:"An emoji can be a picture. Give it `role=\"img\"` and an `aria-label` so screen readers can describe it.",
  todo:"Add another `<figure>` with a `<p role=\"img\" aria-label=\"...\">` holding emoji, and a `<figcaption>` starting with `Figure 2`.",
  job:"Make a second `<figure>`. Put emoji in a `<p role=\"img\" aria-label=\"...\">`. Add a `<figcaption>` that says `Figure 2`.",
  snippet:`<figure>
  <p role="img" aria-label="Two plates of ice cubes, one with salt on it">🧊🧂 🧊</p>
  <figcaption>Figure 2: My two plates. Salt on the left, plain on the right.</figcaption>
</figure>`,
  hints:["A new `<figure>` … `</figure>` block.","`<p role=\"img\" aria-label=\"Two plates of ice\">🧊🧂 🧊</p>` then `<figcaption>Figure 2: ...</figcaption>`."],
  tip:"Number your figures (Figure 1, Figure 2…) so you can talk about them: 'Look at Figure 1'.",
  checks:[cnt('figure figcaption',2,"Add a second `<figure>` with a `<figcaption>`."),[a=>{const e=a.$('figure [role="img"]');return !!e&&(e.getAttribute('aria-label')||'').trim().length>2;},"Add `<p role=\"img\" aria-label=\"...\">` with a description in your new figure."]]}),
 H('e7','Fun fact',{why:"Big numbers in science are written with a small raised number. Let's try it!",
  learn:"`<sup>` is **superscript** — small and high. `10<sup>21</sup>` means 10 with 21 zeros after it. Also used for things like 5 m<sup>2</sup>.",
  todo:"Add a `<p>` fun fact that uses `<sup>`, like `10<sup>21</sup>`.",job:"Write a fun fact `<p>`. Use `<sup>` for a raised number, like `10<sup>21</sup>`.",
  snippet:`<p><strong>Fun fact:</strong> one drop of water has about 10<sup>21</sup> tiny water molecules in it!</p>`,
  hints:["`<sup>` goes around the small raised number.","`<p>One drop of water has about 10<sup>21</sup> molecules!</p>`"],
  tip:"Sub = down (like a submarine). Sup = up (like super!).",
  checks:[has('sup',"Use `<sup>` in your fun fact, like `10<sup>21</sup>`.")]}),
 H('e8','Conclusion',{why:"Was your hypothesis right? This is where you say what you found out.",
  todo:"Add a `<section>` with `<h2>Conclusion</h2>` and a `<p>`.",job:"Make a `<section>` with `<h2>Conclusion</h2>` and a `<p>` that says what you found out.",
  snippet:`<section>
  <h2>Conclusion</h2>
  <p>My hypothesis was <strong>correct</strong>! Salt made the ice melt about twice as fast.</p>
</section>`,
  hints:["Same shape as the Hypothesis section.","`<section><h2>Conclusion</h2><p>My hypothesis was correct!</p></section>`"],
  tip:"Scientists say what they'd test next. Would sugar work too?",
  checks:[secH2(/conclusion/,'p',"Add a `<section>` with `<h2>Conclusion</h2>` and a `<p>`.")]}),
 H('e9','Thank yous',{why:"Scientists always thank the people who helped.",
  todo:"Add a `<footer>` with a `<p>`.",job:"Add a `<footer>` with a `<p>` that thanks someone.",
  snippet:`<footer>
  <p>Thanks to Dr Ada, and to my dog for not eating the ice.</p>
</footer>`,
  hints:["`<footer>` … `</footer>`.","`<footer><p>Thanks to ...</p></footer>`"],
  tip:"Google likes pages with clear headings and sections — your poster is easy for it to understand!",
  checks:[has('footer p',"Add a `<footer>` with a `<p>` inside.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_movie',cat:'html',emoji:'🍿',title:'Movie Night Invitation',mentor:'Zara, movie-night host',uses:'Form Forge, Codeling Quest',
 blurb:'An invitation page with a full RSVP form: name, yes/no, snacks, movie choice and notes.',
 intro:"Zara is having a backyard movie night! You'll make the invitation, then build an RSVP form so guests can say if they're coming — with every kind of form box: text, radio buttons, a checkbox, a drop-down and a big text box.",
 steps:[
 H('m1',"You're invited!",{why:"An invitation starts with a big, exciting title.",
  todo:"Add an `<h1>` invitation title and a `<p>` under it.",job:"Write a big invitation title in an `<h1>`. Add a `<p>` under it.",where:TOP,
  snippet:`<h1>You're Invited to Movie Night! 🍿</h1>
<p>Popcorn, blankets and a giant screen in my backyard.</p>`,
  hints:["`<h1>You're Invited to Movie Night!</h1>`","Then `<p>Popcorn and blankets!</p>`."],
  tip:"Make it a party for anything — a birthday, a sleepover, a games night!",
  checks:[has('h1',"Add an `<h1>` title."),has('h1 ~ p',"Add a `<p>` under the `<h1>`.")]}),
 H('m2','When and where',{why:"Guests must know when and where to come!",
  learn:"`<time datetime=\"2026-11-14T18:30\">` holds a date AND time. The `T` splits them: 14 Nov 2026 at 6:30pm.",
  todo:"Add a `<p>` starting with `<strong>When:</strong>` and a `<time datetime=\"...\">`. Add another `<p>` starting with `<strong>Where:</strong>`.",
  job:"Write `<p><strong>When:</strong>` with a `<time datetime=\"2026-11-14T18:30\">`. Then a `<p><strong>Where:</strong>` with a place.",
  snippet:`<p><strong>When:</strong> <time datetime="2026-11-14T18:30">Saturday 14 November, 6:30pm</time></p>
<p><strong>Where:</strong> 12 Starlight Street</p>`,
  hints:["Two `<p>` lines, each starting with a `<strong>` label.","`<p><strong>When:</strong> <time datetime=\"2026-11-14T18:30\">Saturday, 6:30pm</time></p>`"],
  tip:"Use a pretend address on a public page. Send the real one privately.",
  checks:[has('p time[datetime]',"Add a `<time datetime=\"...\">` inside a `<p>`."),cnt('p strong',2,"Start both lines with a `<strong>` label: `When:` and `Where:`.")]}),
 H('m3','The movie list',{why:"Show the movies we might watch, so guests can pick a favourite later.",
  todo:"Add `<h2>Movies We Might Watch</h2>` and a `<ul>` with at least **3** movies.",job:"Add `<h2>Movies We Might Watch</h2>`. Make a `<ul>` with 3 `<li>` movies.",
  snippet:`<h2>Movies We Might Watch</h2>
<ul>
  <li>Space Pups</li>
  <li>The Lost Dragon</li>
  <li>Robot Racers</li>
</ul>`,
  hints:["`<h2>Movies We Might Watch</h2>` then `<ul>`.","Three `<li>` movie names."],
  tip:"Real or made-up movies — both are fine!",
  checks:[h2Is(/movies/,"Add the heading `<h2>Movies We Might Watch</h2>`."),cnt('ul li',3,"Add a `<ul>` with at least 3 `<li>` movies.")]}),
 H('m4','Start the RSVP form',{why:"RSVP means 'please reply'. A form lets guests answer right on the page.",
  learn:"`<form>` holds all the boxes people fill in.\n`<label>` is the words next to a box. The label's `for` must match the box's `id` — then clicking the words jumps into the box, and screen readers read the label out loud.",
  todo:"Add `<h2>RSVP</h2>` and a `<form>`. Inside it, add `<label for=\"guest-name\">` and `<input type=\"text\" id=\"guest-name\">`.",
  job:"Add `<h2>RSVP</h2>` and a `<form>`. Inside, add `<label for=\"guest-name\">` and `<input type=\"text\" id=\"guest-name\">`.",
  snippet:`<h2>RSVP</h2>
<form>
  <p>
    <label for="guest-name">Your name</label>
    <input type="text" id="guest-name" name="guest-name">
  </p>
</form>`,
  hints:["`<form>` … `</form>` holds everything.","Inside: `<label for=\"guest-name\">Your name</label>` and `<input type=\"text\" id=\"guest-name\" name=\"guest-name\">`."],
  tip:"Click the words 'Your name' in the preview. The cursor jumps into the box — that's the label working!",
  checks:[has('form input[type="text"]',"Add `<input type=\"text\">` inside a `<form>`."),[a=>labelLinked(a,'form'),"Link the label to the box: `<label for=\"guest-name\">` and `id=\"guest-name\"`."]]}),
 H('m5','Coming or not?',{why:"The big question! Guests pick ONE answer: yes or no.",
  learn:"`type=\"radio\"` makes round buttons where you can pick only one.\nAll radio buttons in a group must share the SAME `name` (like `name=\"coming\"`).\n`<fieldset>` groups them, and `<legend>` is the question.",
  todo:"Inside the form, add a `<fieldset>` with a `<legend>` and **2** `<input type=\"radio\">` buttons with `name=\"coming\"`. Give each one an `id` and a `<label for>`.",
  job:"Inside the form, add a `<fieldset>` with a `<legend>`. Add 2 `<input type=\"radio\" name=\"coming\">` buttons, each with a `<label>`.",
  where:"Inside your `<form>`, just before `</form>`.",
  snippet:`<fieldset>
  <legend>Are you coming?</legend>
  <input type="radio" id="yes" name="coming" value="yes">
  <label for="yes">Yes! 🎉</label>
  <input type="radio" id="no" name="coming" value="no">
  <label for="no">Sorry, I can't</label>
</fieldset>`,apply:before('</form>',`<fieldset>
  <legend>Are you coming?</legend>
  <input type="radio" id="yes" name="coming" value="yes">
  <label for="yes">Yes! 🎉</label>
  <input type="radio" id="no" name="coming" value="no">
  <label for="no">Sorry, I can't</label>
</fieldset>`),
  hints:["`<fieldset><legend>Are you coming?</legend>` … `</fieldset>`","One button: `<input type=\"radio\" id=\"yes\" name=\"coming\" value=\"yes\">` + `<label for=\"yes\">Yes!</label>`. Then the same for `no`."],
  tip:"Try clicking Yes then No in the preview — only one can be picked, because they share a `name`.",
  checks:[has('form fieldset legend',"Add a `<fieldset>` with a `<legend>` inside the form."),cnt('form input[type="radio"]',2,"Add 2 `<input type=\"radio\">` buttons inside the form."),[a=>{const r=a.$$('form input[type="radio"]');return r.length>=2&&r.every(x=>x.name&&x.name===r[0].name);},"Both radio buttons need the SAME name: `name=\"coming\"`."]]}),
 H('m6','Bringing snacks?',{why:"A checkbox is a yes-or-no tick. Perfect for 'I'll bring snacks'.",
  learn:"`type=\"checkbox\"` makes a square tick box. You can tick it or leave it empty.",
  todo:"Inside the form, add `<input type=\"checkbox\" id=\"snacks\">` with a `<label for=\"snacks\">`.",
  job:"Inside the form, add `<input type=\"checkbox\" id=\"snacks\">` and a `<label for=\"snacks\">`.",
  where:"Inside your `<form>`, just before `</form>`.",
  snippet:`<p>
  <input type="checkbox" id="snacks" name="snacks">
  <label for="snacks">I'll bring snacks</label>
</p>`,apply:before('</form>',`<p>
  <input type="checkbox" id="snacks" name="snacks">
  <label for="snacks">I'll bring snacks</label>
</p>`),
  hints:["`<input type=\"checkbox\" id=\"snacks\" name=\"snacks\">`","Then `<label for=\"snacks\">I'll bring snacks</label>`."],
  tip:"Radio = pick ONE. Checkbox = tick as many as you like.",
  checks:[has('form input[type="checkbox"]',"Add `<input type=\"checkbox\">` inside the form."),linkedTo('form input[type="checkbox"]',"Give the checkbox an `id=\"snacks\"` and a `<label for=\"snacks\">`.")]}),
 H('m7','Pick a movie',{why:"A drop-down menu keeps lots of choices neat and small.",
  learn:"`<select>` is a drop-down box. Each choice inside is an `<option>`.",
  todo:"Inside the form, add `<label for=\"movie\">` and a `<select id=\"movie\">` with at least **3** `<option>`s.",
  job:"Inside the form, add `<label for=\"movie\">` and `<select id=\"movie\">`. Put 3 `<option>` movies inside.",
  where:"Inside your `<form>`, just before `</form>`.",
  snippet:`<p>
  <label for="movie">Which movie do you want?</label>
  <select id="movie" name="movie">
    <option>Space Pups</option>
    <option>The Lost Dragon</option>
    <option>Robot Racers</option>
  </select>
</p>`,apply:before('</form>',`<p>
  <label for="movie">Which movie do you want?</label>
  <select id="movie" name="movie">
    <option>Space Pups</option>
    <option>The Lost Dragon</option>
    <option>Robot Racers</option>
  </select>
</p>`),
  hints:["`<select id=\"movie\" name=\"movie\">` … `</select>`","Inside: `<option>Space Pups</option>` — 3 of them. Add `<label for=\"movie\">` above."],
  tip:"Click the drop-down in the preview. It works already — no JavaScript!",
  checks:[cnt('form select option',3,"Add a `<select>` with at least 3 `<option>`s inside the form."),linkedTo('form select',"Give the `<select>` an `id=\"movie\"` and a `<label for=\"movie\">`.")]}),
 H('m8','Anything else?',{why:"Some guests need to tell us things, like food allergies. They need a big box.",
  learn:"`<textarea>` is a big box for typing lots of words. Unlike `<input>`, it has a closing tag: `<textarea></textarea>`.",
  todo:"Inside the form, add `<label for=\"notes\">` and `<textarea id=\"notes\"></textarea>`.",
  job:"Inside the form, add `<label for=\"notes\">` and `<textarea id=\"notes\"></textarea>`.",
  where:"Inside your `<form>`, just before `</form>`.",
  snippet:`<p>
  <label for="notes">Any food allergies?</label>
  <textarea id="notes" name="notes" rows="3"></textarea>
</p>`,apply:before('</form>',`<p>
  <label for="notes">Any food allergies?</label>
  <textarea id="notes" name="notes" rows="3"></textarea>
</p>`),
  hints:["`<textarea id=\"notes\" name=\"notes\" rows=\"3\"></textarea>`","Put `<label for=\"notes\">Any food allergies?</label>` before it."],
  tip:"`rows=\"3\"` makes the box 3 lines tall.",
  checks:[has('form textarea',"Add a `<textarea>` inside the form."),linkedTo('form textarea',"Give the `<textarea>` an `id=\"notes\"` and a `<label for=\"notes\">`.")]}),
 H('m9','Send button',{why:"Every form needs a button to send it!",
  todo:"Inside the form, add `<button type=\"submit\">Send my RSVP</button>`.",job:"At the end of the form, add `<button type=\"submit\">Send my RSVP</button>`.",
  where:"Inside your `<form>`, just before `</form>`.",
  snippet:`<button type="submit">Send my RSVP</button>`,apply:before('</form>',`<button type="submit">Send my RSVP</button>`),
  hints:["The button goes INSIDE the form, at the end.","`<button type=\"submit\">Send my RSVP</button>`"],
  tip:"A button's words should say what it does. 'Send my RSVP' beats 'Submit'.",
  checks:[has('form button',"Add a `<button>` inside the form.")]}),
 H('m10','Name is a must',{why:"An RSVP with no name is no use! Make the name box required.",
  learn:"Adding `required` to an `<input>` means the form won't send until that box is filled in. The browser shows a warning for you!",
  todo:"Add the word `required` inside your name `<input>` tag.",job:"Find the name `<input>`. Add the word `required` inside the tag, before the `>`.",
  where:"On your name `<input type=\"text\" ...>` line.",kind:'edit',
  snippet:`<input type="text" id="guest-name" name="guest-name" required>`,
  apply:c=>c.replace(/<input type="text"([^>]*?)\s*>/,(m,attrs)=>/\brequired\b/.test(attrs)?m:'<input type="text"'+attrs+' required>'),
  hints:["Find `<input type=\"text\" id=\"guest-name\" name=\"guest-name\">`.","Type ` required` just before the `>`."],
  tip:"Try it: click Send with the name empty. The browser stops you and asks for a name!",
  checks:[has('form input[type="text"][required]',"Add `required` to your name `<input>`.")]}),
 H('m11','See you there',{why:"End with a friendly sign-off from the host.",
  todo:"Add a `<footer>` with a `<p>` after the form.",job:"Under the form, add a `<footer>` with a `<p>` sign-off.",
  snippet:`<footer>
  <p>Can't wait to see you! – Zara</p>
</footer>`,
  hints:["`<footer>` … `</footer>` goes AFTER `</form>`.","`<footer><p>Can't wait to see you!</p></footer>`"],
  tip:"Right now the form doesn't send anywhere. When you learn JavaScript or use a form service, it can!",
  checks:[has('footer p',"Add a `<footer>` with a `<p>` inside.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_museum',cat:'html',emoji:'🏛️',title:'Museum Exhibit Page',mentor:'Professor Bones, museum curator',uses:'Codeling Quest, Bug Hunter',
 blurb:'A dinosaur exhibit page that teaches great alt text, captions and safe outside links.',
 intro:"Professor Bones is putting the Dinosaur Hall online. The photos aren't ready yet — so the browser will show your **alt text** instead. That's exactly what blind visitors hear, so you'll learn to write it really well.",
 steps:[
 H('u1','The exhibit',{why:"Visitors need to know which hall of the museum they're in.",
  todo:"Add an `<h1>` with the exhibit name and a `<p>` introduction.",job:"Write the exhibit name in an `<h1>`. Add a `<p>` under it.",where:TOP,
  snippet:`<h1>Dinosaur Hall 🦖</h1>
<p>Meet the giants that walked the Earth millions of years ago.</p>`,
  hints:["`<h1>Dinosaur Hall</h1>`","Then `<p>Meet the giants...</p>`."],
  tip:"Pick any exhibit you like: space rockets, ancient Egypt, ocean animals…",
  checks:[has('h1',"Add an `<h1>` with the exhibit name."),has('h1 ~ p',"Add a `<p>` under the `<h1>`.")]}),
 H('u2','Exhibit 1 with alt text',{why:"Every picture needs words that describe it, for visitors who can't see it.",
  learn:"`<img src=\"t-rex.jpg\" alt=\"...\">` shows a picture. `src` is the picture file. `alt` describes the picture in words.\nWe don't have `t-rex.jpg` yet, so the browser shows your `alt` words instead — just like a screen reader would read them!",
  todo:"Add an `<h2>`, then a `<figure>` with an `<img src=\"t-rex.jpg\" alt=\"...\">` and a `<figcaption>`. Write at least **3** words in the `alt`.",
  job:"Add an `<h2>`. Then make a `<figure>` with `<img src=\"t-rex.jpg\" alt=\"...\">` and a `<figcaption>`. Describe the picture in `alt` with 3 or more words.",
  snippet:`<h2>Tyrannosaurus rex</h2>
<figure>
  <img src="t-rex.jpg" alt="A huge T. rex skeleton with its mouth wide open, showing sharp teeth">
  <figcaption>The T. rex skeleton was found in Montana, USA.</figcaption>
</figure>`,
  hints:["`<figure>` holds the `<img>` and the `<figcaption>`.","`<img src=\"t-rex.jpg\" alt=\"A huge T. rex skeleton with sharp teeth\">` then `<figcaption>...</figcaption>`."],
  tip:"`<img>` has no closing tag. It's one tag that does the whole job.",
  checks:[[a=>{const i=a.$('figure img');return !!i&&words(i.getAttribute('alt'))>=3;},"Add `<img src=\"t-rex.jpg\" alt=\"...\">` inside a `<figure>`, with at least 3 words in `alt`."],has('figure figcaption',"Add a `<figcaption>` inside the `<figure>`.")]}),
 H('u3','Alt text that paints a picture',{why:"Great alt text paints a picture in your mind. Let's make this one even better.",
  learn:"Good alt text:\n• says what's **in** the picture: colours, shapes, what's happening\n• does NOT start with 'image of' or 'picture of' — screen readers already say 'image'\n• is short — about one sentence",
  todo:"Add another `<h2>` and `<figure>` with an `<img>` and a `<figcaption>`. The `alt` must have at least **6** words and must NOT start with `image of` or `picture of`.",
  job:"Make a second `<figure>` with an `<img>` and a `<figcaption>`. Use 6 or more words in `alt`. Don't start it with `image of` or `picture of`.",
  snippet:`<h2>Triceratops</h2>
<figure>
  <img src="triceratops.jpg" alt="A Triceratops skull with three long horns and a wide bony frill">
  <figcaption>Triceratops used its horns to protect itself.</figcaption>
</figure>`,
  hints:["Copy your first figure and change the words.","`alt=\"A Triceratops skull with three long horns and a wide bony frill\"`"],
  tip:"Close your eyes and have someone read your alt text to you. Can you picture it?",
  checks:[cnt('figure img',2,"Add a second `<figure>` with an `<img>` inside."),[a=>{const i=a.$$('figure img')[1];return !!i&&words(i.getAttribute('alt'))>=6;},"Write at least 6 words in the second picture's `alt`."],[a=>{const i=a.$$('figure img')[1];return !!i&&!/^\s*(an? )?(image|picture|photo) of/i.test(i.getAttribute('alt')||'');},"Don't start the `alt` with 'image of' or 'picture of' — just describe what's in it."],[a=>{const f=a.$$('figure')[1];return !!f&&!!f.querySelector('figcaption');},"Add a `<figcaption>` inside the second `<figure>`."]]}),
 H('u4','Decoration pictures',{why:"Some pictures are just decoration, like a fancy line. Screen readers should skip them.",
  learn:"If a picture is ONLY decoration, use an empty alt: `alt=\"\"`. Then screen readers skip it instead of reading the file name. Never leave `alt` out completely!",
  todo:"Add `<img src=\"bone-divider.png\" alt=\"\">` — a decoration with an empty `alt`.",job:"Add a decoration picture: `<img src=\"bone-divider.png\" alt=\"\">`. Keep the `alt` empty.",
  snippet:`<img src="bone-divider.png" alt="">`,
  hints:["Two quote marks with nothing between them: `alt=\"\"`.","`<img src=\"bone-divider.png\" alt=\"\">`"],
  tip:"No `alt` at all = the screen reader might read 'bone-divider dot png'. Yuck! Empty `alt` = skip it.",
  checks:[has('img[alt=""]',"Add an `<img>` with an empty alt: `alt=\"\"`.")]}),
 H('u5','Fossil facts',{why:"Visitors love quick facts they can tell their friends.",
  todo:"Add `<h2>Fossil Facts</h2>` and a `<ul>` with at least **3** facts.",job:"Add `<h2>Fossil Facts</h2>`. Make a `<ul>` with 3 `<li>` facts.",
  snippet:`<h2>Fossil Facts</h2>
<ul>
  <li>A fossil is a bone or footprint that turned to stone.</li>
  <li>The T. rex lived about 66 million years ago.</li>
  <li>Birds are living relatives of dinosaurs!</li>
</ul>`,
  hints:["`<h2>Fossil Facts</h2>` then `<ul>`.","Three `<li>` facts."],
  tip:"Check your facts in a real book or museum website before you publish them.",
  checks:[h2Is(/fossil facts/,"Add the heading `<h2>Fossil Facts</h2>`."),cnt('ul li',3,"Add a `<ul>` with at least 3 `<li>` facts.")]}),
 H('u6','Learn more (safely)',{why:"Point visitors to other great museum websites — without losing them from ours.",
  learn:"`target=\"_blank\"` opens the link in a NEW tab.\n`rel=\"noopener noreferrer\"` keeps that new tab from messing with your page. Always add it to new-tab links to other websites.",
  todo:"Add a `<p>` with a link to another website. Give it `target=\"_blank\"` and `rel=\"noopener noreferrer\"`.",
  job:"Add a link to another website in a `<p>`. Give it `target=\"_blank\"` and `rel=\"noopener noreferrer\"`.",
  snippet:`<p>Want to dig deeper? <a href="https://www.nhm.ac.uk/discover/dino-directory.html" target="_blank" rel="noopener noreferrer">Explore the Natural History Museum's dino directory</a></p>`,
  hints:["A normal link plus 2 extra parts: `target` and `rel`.","`<a href=\"https://www.nhm.ac.uk\" target=\"_blank\" rel=\"noopener noreferrer\">Natural History Museum</a>`"],
  tip:"The link's `href` must start with `https://` to go to another website.",
  checks:[has('a[href^="http"][target="_blank"]',"Add a link to another website (`href=\"https://...\"`) with `target=\"_blank\"`."),has('a[target="_blank"][rel~="noopener"]',"Add `rel=\"noopener noreferrer\"` to your new-tab link.")]}),
 H('u7','Link words that make sense',{why:"Screen-reader users can list all the links on a page. 'Click here, click here' tells them nothing!",
  learn:"Good link words say **where the link goes**. ✅ 'Watch dinosaur videos from the American Museum' ❌ 'click here'.",
  todo:"Add a second new-tab link (with `target=\"_blank\"` and `rel=\"noopener noreferrer\"`). Its words must say where it goes — NOT `click here`.",
  job:"Add another link with `target=\"_blank\"` and `rel=\"noopener noreferrer\"`. Its words must say where it goes. Never `click here`!",
  snippet:`<p><a href="https://www.amnh.org/dinosaurs" target="_blank" rel="noopener noreferrer">Watch dinosaur videos from the American Museum of Natural History</a></p>`,
  hints:["Copy your first link and change the `href` and the words.","`<a href=\"https://www.amnh.org/dinosaurs\" target=\"_blank\" rel=\"noopener noreferrer\">Watch dinosaur videos from the American Museum of Natural History</a>`"],
  tip:"Read just your link words out loud. If they make sense alone, they're good links.",
  checks:[cnt('a[target="_blank"][rel~="noopener"]',2,"Add a second link with `target=\"_blank\"` and `rel=\"noopener noreferrer\"`."),[a=>a.$$('a').every(l=>!/^(click )?here$|^click here|^link$|^read more$/.test(a.text(l))),"Change the link words — don't use 'click here'. Say where the link goes."]]}),
 H('u8','Plan your visit',{why:"The page should end with how to visit the real museum.",
  todo:"Add `<h2>Plan Your Visit</h2>` and a `<p>` with the opening hours. Put the most important part in `<strong>`.",
  job:"Add `<h2>Plan Your Visit</h2>`. Write a `<p>` with opening hours. Put the most important part in `<strong>`.",
  snippet:`<h2>Plan Your Visit</h2>
<p>Open every day from 9am to 5pm. Entry is <strong>free for kids</strong>!</p>`,
  hints:["`<h2>Plan Your Visit</h2>` then a `<p>`.","`<p>Open every day from 9am to 5pm. Entry is <strong>free for kids</strong>!</p>`"],
  tip:"Clear headings like 'Plan Your Visit' help Google show your page when people search 'museum opening hours'.",
  checks:[h2Is(/plan your visit/,"Add the heading `<h2>Plan Your Visit</h2>`."),[a=>{const h=a.$$('h2').find(x=>/plan your visit/.test(a.text(x)));const p=h&&h.nextElementSibling;return !!p&&p.tagName==='P'&&!!p.querySelector('strong');},"Under the heading, add a `<p>` with some words in `<strong>`."]]}),
 H('u9','Copyright',{why:"Museums protect their work with a copyright line. There's a special code for the © symbol!",
  learn:"Some symbols have codes called **entities**. They start with `&` and end with `;`.\n`&copy;` makes ©. `&amp;` makes &. `&lt;` makes <.",
  todo:"Add a `<footer>` with a `<p>` that uses `&copy;` to make the © symbol.",job:"Add a `<footer>` with a `<p>`. Type `&copy;` to make the © symbol.",
  snippet:`<footer>
  <p>&copy; 2026 City Museum · Photos coming soon!</p>
</footer>`,
  hints:["Type `&copy;` exactly — the `&`, the word `copy`, and the `;`.","`<footer><p>&copy; 2026 City Museum</p></footer>`"],
  tip:"Want to show a `<` on your page without starting a tag? Type `&lt;`. That's how coding websites show code!",
  checks:[[a=>{const f=a.$('footer');return !!f&&/©/.test(f.textContent);},"Add a `<footer>` with `&copy;` in it (it shows as ©)."]]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_glossary',cat:'html',emoji:'📖',title:'Mini Coding Dictionary',mentor:'Wordy the Owl',uses:'Codeling Quest, Dungeon Escape',
 blurb:'An A-to-Z dictionary of coding words with letter jumps and back-to-top links.',
 intro:"Hoo-hoo! I'm Wordy the Owl and I collect words. Let's build a mini dictionary of coding words. You'll use description lists for words and meanings, and links that jump to any letter — and back to the top again.",
 steps:[
 H('g1','The title (with a name tag)',{why:"We'll want to jump back to the top later — so the title needs a name tag.",
  learn:"An `id` is a name tag for one part of the page. `id=\"top\"` means links can jump here with `href=\"#top\"`. Each `id` can only be used once per page.",
  todo:"Add `<h1 id=\"top\">` with your dictionary's name.",job:"Write your dictionary's name in `<h1 id=\"top\">`.",where:TOP,
  snippet:`<h1 id="top">My Coding Dictionary</h1>`,
  hints:["Put `id=\"top\"` inside the opening `<h1>` tag.","`<h1 id=\"top\">My Coding Dictionary</h1>`"],
  tip:"`id` names can't have spaces. Use dashes instead: `id=\"word-of-the-day\"`.",
  checks:[has('h1#top',"Add an `<h1 id=\"top\">`.")]}),
 H('g2','How to use it',{why:"Tell readers what's in the dictionary.",
  todo:"Add a `<p>` under the title.",job:"Write a `<p>` under the title that says what the dictionary is for.",
  snippet:`<p>Tricky computer words, explained in plain English. Tap a letter to jump to it!</p>`,
  hints:["A `<p>` … `</p>` paragraph.","`<p>Tricky computer words, explained simply.</p>`"],
  tip:"Write like you're explaining to a friend. Short words beat long words.",
  checks:[has('h1 ~ p',"Add a `<p>` under the `<h1>`.")]}),
 H('g3','Letter links',{why:"Real dictionaries have letters to jump to. Ours will too!",
  learn:"`href=\"#b\"` jumps to the part with `id=\"b\"`. We'll make those letter parts next.",
  todo:"Add a `<nav>` with **4** links: `href=\"#b\"`, `href=\"#c\"`, `href=\"#h\"` and `href=\"#p\"`.",
  job:"Make a `<nav>` with 4 letter links: `href=\"#b\"`, `href=\"#c\"`, `href=\"#h\"` and `href=\"#p\"`.",
  snippet:`<nav>
  <a href="#b">B</a> ·
  <a href="#c">C</a> ·
  <a href="#h">H</a> ·
  <a href="#p">P</a>
</nav>`,
  hints:["`<nav>` … `</nav>` with 4 `<a>` links.","One link: `<a href=\"#b\">B</a>`. Then `#c`, `#h` and `#p`."],
  tip:"The ids are lowercase: `#b`, not `#B`. Ids care about capital letters!",
  checks:[hrefs('nav',['#b','#c','#h','#p'],"Your `<nav>` needs 4 links: `#b`, `#c`, `#h` and `#p`.")]}),
 H('g4','Letter B',{why:"Each letter is a section with words and their meanings.",
  learn:"`<dl>` is a **description list** — perfect for a dictionary! `<dt>` is the word, `<dd>` is what it means.\nGive a word an `id` too, so you can link to it later: `<dt id=\"browser\">`.",
  todo:"Add `<section id=\"b\">` with `<h2>B</h2>` and a `<dl>` with at least **2** words (`<dt>`) and meanings (`<dd>`).",
  job:"Make `<section id=\"b\">` with `<h2>B</h2>`. Inside, add a `<dl>` with 2 `<dt>` words and 2 `<dd>` meanings.",
  snippet:`<section id="b">
  <h2>B</h2>
  <dl>
    <dt id="browser">Browser</dt>
    <dd>An app for visiting websites, like Chrome or Safari.</dd>
    <dt id="bug">Bug</dt>
    <dd>A mistake in code that makes something go wrong.</dd>
  </dl>
</section>`,
  hints:["`<section id=\"b\">` + `<h2>B</h2>` + `<dl>`.","A word and its meaning: `<dt id=\"bug\">Bug</dt>` then `<dd>A mistake in code.</dd>`."],
  tip:"Click B in your nav in the preview. Zoom — it jumps here!",
  checks:[has('section#b h2',"Add `<section id=\"b\">` with an `<h2>` inside."),cnt('section#b dl dt',2,"Add a `<dl>` with at least 2 `<dt>` words in section B."),cnt('section#b dl dd',2,"Give each word a `<dd>` meaning.")]}),
 H('g5','Letter C',{why:"Next letter! Same pattern, new words.",
  todo:"Add `<section id=\"c\">` with `<h2>C</h2>` and a `<dl>` with at least **2** words and meanings.",
  job:"Make `<section id=\"c\">` with `<h2>C</h2>` and a `<dl>`. Add 2 `<dt>` words with `<dd>` meanings.",
  snippet:`<section id="c">
  <h2>C</h2>
  <dl>
    <dt id="code">Code</dt>
    <dd>Instructions written for a computer to follow.</dd>
    <dt id="css">CSS</dt>
    <dd>The language that makes web pages look nice: colours, sizes, layouts.</dd>
  </dl>
</section>`,
  hints:["Copy section B and change the letters and words.","`<section id=\"c\">`, `<h2>C</h2>`, then `<dl>` with `<dt>` and `<dd>` pairs."],
  tip:"Keep words in A-to-Z order inside each letter, just like a real dictionary.",
  checks:[has('section#c h2',"Add `<section id=\"c\">` with an `<h2>` inside."),cnt('section#c dl dt',2,"Add a `<dl>` with at least 2 `<dt>` words in section C."),cnt('section#c dl dd',2,"Give each word a `<dd>` meaning.")]}),
 H('g6','Back to top',{why:"After reading a letter, readers want to zoom back up. Remember `id=\"top\"`?",
  learn:"`<a href=\"#top\">` jumps to the part with `id=\"top\"` — your `<h1>`!",
  todo:"At the bottom of section B AND section C, add `<p><a href=\"#top\">Back to top ↑</a></p>`.",
  job:"Put `<p><a href=\"#top\">Back to top ↑</a></p>` at the bottom of section B and section C.",
  where:"Just before `</section>` in section B, and again just before `</section>` in section C.",
  snippet:`<p><a href="#top">Back to top ↑</a></p>`,apply:c=>c.replace(/^([ \t]*)<\/section>/gm,(m,s)=>s+'  <p><a href="#top">Back to top ↑</a></p>\n'+s+'</section>'),
  hints:["Find `</section>` at the end of section B. Add the line just above it. Then do the same in section C.","`<p><a href=\"#top\">Back to top ↑</a></p>`"],
  tip:"Long pages on phones NEED back-to-top links. Your readers' thumbs will thank you!",
  checks:[has('section#b a[href="#top"]',"Add `<a href=\"#top\">` at the bottom of section B."),has('section#c a[href="#top"]',"Add `<a href=\"#top\">` at the bottom of section C too.")]}),
 H('g7','Letter H',{why:"H is for HTML — the very language you're writing right now!",
  todo:"Add `<section id=\"h\">` with `<h2>H</h2>`, a `<dl>` with at least **2** words, and a back-to-top link at the bottom. Give HTML the id `html`: `<dt id=\"html\">`.",
  job:"Make `<section id=\"h\">` with `<h2>H</h2>` and a `<dl>` of 2 words. Use `<dt id=\"html\">HTML</dt>`. End with a `#top` link.",
  snippet:`<section id="h">
  <h2>H</h2>
  <dl>
    <dt id="html">HTML</dt>
    <dd>The language that builds web pages using tags, like the one you're writing now!</dd>
    <dt id="hyperlink">Hyperlink</dt>
    <dd>A link you click to jump to another page or place.</dd>
  </dl>
  <p><a href="#top">Back to top ↑</a></p>
</section>`,
  hints:["Same as section C, but with `id=\"h\"` and `<h2>H</h2>`.","Use `<dt id=\"html\">HTML</dt>`, and finish with `<p><a href=\"#top\">Back to top ↑</a></p>` before `</section>`."],
  tip:"HTML stands for HyperText Markup Language. 'HyperText' just means text with links!",
  checks:[cnt('section#h dl dt',2,"Add `<section id=\"h\">` with a `<dl>` of at least 2 `<dt>` words."),has('section#h dt#html',"Give the HTML word an id: `<dt id=\"html\">HTML</dt>`."),has('section#h a[href="#top"]',"Add a `<a href=\"#top\">` link at the bottom of section H.")]}),
 H('g8','Letter P',{why:"Last letter in our mini dictionary!",
  todo:"Add `<section id=\"p\">` with `<h2>P</h2>`, a `<dl>` with at least **2** words, and a back-to-top link at the bottom.",
  job:"Make `<section id=\"p\">` with `<h2>P</h2>` and a `<dl>` of 2 words. End it with a `#top` link.",
  snippet:`<section id="p">
  <h2>P</h2>
  <dl>
    <dt id="pixel">Pixel</dt>
    <dd>One tiny dot of colour on a screen.</dd>
    <dt id="preview">Preview</dt>
    <dd>A look at your page before you share it.</dd>
  </dl>
  <p><a href="#top">Back to top ↑</a></p>
</section>`,
  hints:["Copy section H and change the letter and words.","`<section id=\"p\">`, `<h2>P</h2>`, a `<dl>`, and `<p><a href=\"#top\">Back to top ↑</a></p>`."],
  tip:"Your screen has millions of pixels. Look really closely — can you see them?",
  checks:[cnt('section#p dl dt',2,"Add `<section id=\"p\">` with a `<dl>` of at least 2 `<dt>` words."),has('section#p a[href="#top"]',"Add a `<a href=\"#top\">` link at the bottom of section P.")]}),
 H('g9','Word of the day',{why:"Let's link straight to ONE word — the word of the day!",
  learn:"Remember `<dt id=\"html\">`? A link with `href=\"#html\"` jumps right to that word.",
  todo:"Under your `<nav>`, add `<p>⭐ <strong>Word of the day:</strong> <a href=\"#html\">HTML</a></p>`.",
  job:"Under the `<nav>`, add a word-of-the-day `<p>`. Put a link in it to a word: `<a href=\"#html\">HTML</a>`.",
  where:"Just under your `<nav>` (after `</nav>`).",
  snippet:`<p>⭐ <strong>Word of the day:</strong> <a href="#html">HTML</a></p>`,apply:c=>c.includes('</nav>')?c.replace('</nav>','</nav>\n\n<p>⭐ <strong>Word of the day:</strong> <a href="#html">HTML</a></p>'):c,
  hints:["Find `</nav>` and start a new line under it.","`<p>⭐ <strong>Word of the day:</strong> <a href=\"#html\">HTML</a></p>`"],
  tip:"Any word with an `id` can be linked to — try `#bug` or `#pixel` tomorrow!",
  checks:[[a=>a.$$('a[href^="#"]').some(l=>{const t=a.doc.getElementById(l.getAttribute('href').slice(1));return !!t&&t.tagName==='DT';}),"Add a link to a word's id, like `<a href=\"#html\">HTML</a>`."]]}),
 H('g10','The footer',{why:"Sign your dictionary, and say how many words it has.",
  todo:"Add a `<footer>` with a `<p>`.",job:"Add a `<footer>` with a `<p>` inside.",
  snippet:`<footer>
  <p>8 words and counting · Made with Wordy the Owl 🦉</p>
</footer>`,
  hints:["`<footer>` … `</footer>`.","`<footer><p>8 words and counting</p></footer>`"],
  tip:"Keep adding words as you learn them. By the end of Code Arcade you'll have a huge dictionary!",
  checks:[has('footer p',"Add a `<footer>` with a `<p>` inside.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_timetable',cat:'html',emoji:'🗓️',title:'Weekly School Timetable',mentor:'Mr Tick, the school clock',uses:'Codeling Quest, Grid Farm',
 blurb:'A full week timetable with cells that stretch across days and lessons that last two hours.',
 intro:"Tick-tock! I'm Mr Tick, the school clock. Every class needs a timetable. You'll build a real table with headings, and learn the two big table tricks: cells that stretch **across** (colspan) and cells that stretch **down** (rowspan).",
 steps:[
 H('tt1','Timetable title',{why:"Which class is this timetable for? Say it at the top.",
  todo:"Add an `<h1>` and a `<p>` under it.",job:"Write the timetable's name in an `<h1>`. Add a `<p>` under it.",where:TOP,
  snippet:`<h1>Class 4B Timetable</h1>
<p>Our whole week at school, all in one place.</p>`,
  hints:["`<h1>Class 4B Timetable</h1>`","Then a `<p>` sentence."],
  tip:"Use your real class name and your real lessons as you build!",
  checks:[has('h1',"Add an `<h1>`."),has('h1 ~ p',"Add a `<p>` under the `<h1>`.")]}),
 H('tt2','Days of the week',{why:"The top row shows the days. Those are column headings.",
  learn:"`<th scope=\"col\">` is a heading for a whole **column** (going down). Screen readers then say 'Monday' when you reach any Monday cell.",
  todo:"Add a `<table>` with a `<caption>` and a `<thead>`. The head row needs **6** `<th scope=\"col\">`: Time, Mon, Tue, Wed, Thu, Fri.",
  job:"Make a `<table>` with a `<caption>`. Add a `<thead>` row with 6 `<th scope=\"col\">`: Time, Mon, Tue, Wed, Thu, Fri.",
  snippet:`<table>
  <caption>Class 4B · Term 4</caption>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Mon</th>
      <th scope="col">Tue</th>
      <th scope="col">Wed</th>
      <th scope="col">Thu</th>
      <th scope="col">Fri</th>
    </tr>
  </thead>
</table>`,
  hints:["`<table>`, then `<caption>Class 4B · Term 4</caption>`, then `<thead><tr>`.","6 headings like `<th scope=\"col\">Mon</th>`, then `</tr></thead></table>`."],
  tip:"`<caption>` is the table's title. It helps screen-reader users know what the table is about before they read it.",
  checks:[has('table caption',"Add a `<caption>` inside the `<table>`."),cnt('thead th[scope="col"]',6,"Add a `<thead>` with 6 `<th scope=\"col\">` headings.")]}),
 H('tt3','The first lesson',{why:"Now the lessons! Each row starts with the time.",
  learn:"`<th scope=\"row\">` is a heading for a whole **row** (going across). The time is the heading of its row.\n`<tbody>` holds all the normal rows.",
  todo:"Inside the table, add a `<tbody>` with one `<tr>`: a `<th scope=\"row\">9:00</th>` and **5** `<td>` lessons.",
  job:"Inside the table, add a `<tbody>`. Put one `<tr>` in it: `<th scope=\"row\">9:00</th>` and 5 `<td>` lessons.",
  where:"Inside your `<table>`, just before `</table>`.",
  snippet:`<tbody>
  <tr><th scope="row">9:00</th><td>Maths</td><td>English</td><td>Maths</td><td>English</td><td>Maths</td></tr>
</tbody>`,apply:before('</table>',`<tbody>
  <tr><th scope="row">9:00</th><td>Maths</td><td>English</td><td>Maths</td><td>English</td><td>Maths</td></tr>
</tbody>`),
  hints:["Above `</table>`, type `<tbody>` … `</tbody>`.","Inside: `<tr><th scope=\"row\">9:00</th><td>Maths</td>` … 5 `<td>`s … `</tr>`"],
  tip:"1 time + 5 days = 6 cells, the same as the 6 headings. Rows must match!",
  checks:[has('tbody th[scope="row"]',"Start the row with `<th scope=\"row\">9:00</th>`."),[a=>{const r=a.$('tbody tr');return !!r&&r.querySelectorAll('td').length>=5;},"Add 5 `<td>` lessons in the row (one for each day)."]]}),
 H('tt4','The second lesson',{why:"One row down, lots to go! Add the 10 o'clock lessons.",
  todo:"Inside `<tbody>`, add a new `<tr>` with `<th scope=\"row\">10:00</th>` and **5** `<td>` lessons.",
  job:"Inside the `<tbody>`, add a new `<tr>`: `<th scope=\"row\">10:00</th>` and 5 `<td>` lessons.",
  where:"Inside your `<tbody>`, just before `</tbody>`.",
  snippet:`<tr><th scope="row">10:00</th><td>English</td><td>Maths</td><td>English</td><td>Maths</td><td>Sport</td></tr>`,
  apply:before('</tbody>',`<tr><th scope="row">10:00</th><td>English</td><td>Maths</td><td>English</td><td>Maths</td><td>Sport</td></tr>`),
  hints:["Copy the 9:00 row and paste it under itself, still inside `<tbody>`.","Change it to `10:00` and change the lessons."],
  tip:"Copy, paste, change. Pros almost never type a table row from scratch!",
  checks:[cnt('tbody tr',2,"Add a second `<tr>` row inside `<tbody>`."),[a=>a.$$('tbody tr').filter(r=>r.querySelectorAll('td').length>=5).length>=2,"Give the new row 5 `<td>` lessons."]]}),
 H('tt5','Recess — stretch across!',{why:"Recess is the same for every day. One wide cell is neater than five 'Recess' cells.",
  learn:"`colspan=\"5\"` makes ONE cell stretch across **5 columns**. So this row only needs 1 `<td>` after the time!",
  todo:"Inside `<tbody>`, add a row: `<th scope=\"row\">10:30</th>` and ONE `<td colspan=\"5\">Recess 🍎</td>`.",
  job:"Add a new row in `<tbody>`: `<th scope=\"row\">10:30</th>` and one `<td colspan=\"5\">Recess 🍎</td>`.",
  where:"Inside your `<tbody>`, just before `</tbody>`.",
  snippet:`<tr><th scope="row">10:30</th><td colspan="5">Recess 🍎</td></tr>`,apply:before('</tbody>',`<tr><th scope="row">10:30</th><td colspan="5">Recess 🍎</td></tr>`),
  hints:["A new `<tr>` with only 2 cells: the time, and one wide cell.","`<tr><th scope=\"row\">10:30</th><td colspan=\"5\">Recess 🍎</td></tr>`"],
  tip:"col = column, span = stretch. colspan = stretch across columns!",
  checks:[has('td[colspan="5"]',"Add a `<td colspan=\"5\">` cell for recess.")]}),
 H('tt6','Swimming — stretch down!',{why:"On Wednesday, swimming lasts TWO hours. One tall cell shows that best.",
  learn:"`rowspan=\"2\"` makes a cell stretch down **2 rows**. It fills Wednesday at 11:00 AND at 12:00.",
  todo:"Add an 11:00 row with **5** `<td>`s. Make Wednesday's cell `<td rowspan=\"2\">Swimming 🏊</td>`.",
  job:"Add a row: `<th scope=\"row\">11:00</th>` and 5 `<td>`s. Wednesday's cell is `<td rowspan=\"2\">Swimming 🏊</td>`.",
  where:"Inside your `<tbody>`, just before `</tbody>`.",
  snippet:`<tr><th scope="row">11:00</th><td>Science</td><td>Art</td><td rowspan="2">Swimming 🏊</td><td>Music</td><td>Library</td></tr>`,
  apply:before('</tbody>',`<tr><th scope="row">11:00</th><td>Science</td><td>Art</td><td rowspan="2">Swimming 🏊</td><td>Music</td><td>Library</td></tr>`),
  hints:["A normal row of 5 lessons — the 3rd one (Wednesday) gets `rowspan=\"2\"`.","`<tr><th scope=\"row\">11:00</th><td>Science</td><td>Art</td><td rowspan=\"2\">Swimming 🏊</td><td>Music</td><td>Library</td></tr>`"],
  tip:"Look at the preview: the table looks a bit broken right now. The next step fixes it!",
  checks:[has('td[rowspan="2"]',"Add a `<td rowspan=\"2\">` cell for swimming.")]}),
 H('tt7','The row under swimming',{why:"Swimming already fills Wednesday at 12:00. So this row needs one FEWER cell!",
  learn:"Because the swimming cell stretches down into this row, the 12:00 row only needs **4** `<td>`s: Mon, Tue, Thu, Fri. Skip Wednesday!",
  todo:"Add a 12:00 row: `<th scope=\"row\">12:00</th>` and only **4** `<td>`s (no Wednesday).",
  job:"Add a row: `<th scope=\"row\">12:00</th>` and only 4 `<td>`s. Skip Wednesday — swimming is there!",
  where:"Inside your `<tbody>`, just before `</tbody>`.",
  snippet:`<tr><th scope="row">12:00</th><td>Reading</td><td>Art</td><td>Spelling</td><td>Library</td></tr>`,
  apply:before('</tbody>',`<tr><th scope="row">12:00</th><td>Reading</td><td>Art</td><td>Spelling</td><td>Library</td></tr>`),
  hints:["Count carefully: Monday, Tuesday, (skip Wednesday), Thursday, Friday = 4 cells.","`<tr><th scope=\"row\">12:00</th><td>Reading</td><td>Art</td><td>Spelling</td><td>Library</td></tr>`"],
  tip:"This is the trickiest table idea there is. If you got it — you're a table master!",
  checks:[[a=>a.$$('tbody tr').some(r=>r.querySelector('th[scope="row"]')&&r.querySelectorAll('td').length===4),"Add a row with `<th scope=\"row\">12:00</th>` and exactly 4 `<td>` cells."]]}),
 H('tt8','Lunch time',{why:"Lunch is the same for everyone — stretch it across again!",
  todo:"Add a row: `<th scope=\"row\">1:00</th>` and `<td colspan=\"5\">Lunch 🥪</td>`.",
  job:"Add a row: `<th scope=\"row\">1:00</th>` and one `<td colspan=\"5\">Lunch 🥪</td>`.",
  where:"Inside your `<tbody>`, just before `</tbody>`.",
  snippet:`<tr><th scope="row">1:00</th><td colspan="5">Lunch 🥪</td></tr>`,apply:before('</tbody>',`<tr><th scope="row">1:00</th><td colspan="5">Lunch 🥪</td></tr>`),
  hints:["Just like the recess row.","`<tr><th scope=\"row\">1:00</th><td colspan=\"5\">Lunch 🥪</td></tr>`"],
  tip:"You could keep going with afternoon lessons — the pattern is the same!",
  checks:[cnt('td[colspan="5"]',2,"Add a second `<td colspan=\"5\">` cell, for lunch.")]}),
 H('tt9','Home time',{why:"The bottom of a table can have a footer row too.",
  learn:"`<tfoot>` is the **table footer** — a last row for totals or notes. `colspan=\"6\"` stretches across ALL 6 columns.",
  todo:"After `</tbody>`, add `<tfoot>` with one row: `<td colspan=\"6\">Home time is 3:00pm 🏠</td>`.",
  job:"Under `</tbody>`, add a `<tfoot>` with one `<tr>` and a `<td colspan=\"6\">Home time is 3:00pm 🏠</td>`.",
  where:"Inside your `<table>`, just before `</table>` (after `</tbody>`).",
  snippet:`<tfoot>
  <tr><td colspan="6">Home time is 3:00pm 🏠</td></tr>
</tfoot>`,apply:before('</table>',`<tfoot>
  <tr><td colspan="6">Home time is 3:00pm 🏠</td></tr>
</tfoot>`),
  hints:["`<tfoot>` … `</tfoot>` goes between `</tbody>` and `</table>`.","`<tfoot><tr><td colspan=\"6\">Home time is 3:00pm 🏠</td></tr></tfoot>`"],
  tip:"A table can have `<thead>`, `<tbody>` and `<tfoot>` — head, body and feet, like a person!",
  checks:[has('tfoot td[colspan="6"]',"Add a `<tfoot>` with a `<td colspan=\"6\">`.")]}),
 H('tt10',"Don't forget!",{why:"Some days need special things from home. A reminder list helps!",
  todo:"Under the table, add `<h2>Don't Forget!</h2>` and a `<ul>` with at least **2** reminders.",
  job:"Under the table, add `<h2>Don't Forget!</h2>`. Make a `<ul>` with 2 `<li>` reminders.",
  snippet:`<h2>Don't Forget!</h2>
<ul>
  <li><strong>Wednesday:</strong> swimming bag and towel</li>
  <li><strong>Friday:</strong> library books</li>
</ul>`,
  hints:["`<h2>Don't Forget!</h2>` then `<ul>`.","`<li><strong>Wednesday:</strong> swimming bag</li>`"],
  tip:"Print this out and stick it on the fridge!",
  checks:[h2Is(/forget/,"Add the heading `<h2>Don't Forget!</h2>`."),cnt('ul li',2,"Add a `<ul>` with at least 2 `<li>` reminders.")]})
 ]},
/* ------------------------------------------------------------------ */
{id:'ph_space',cat:'html',emoji:'🚀',title:'Space Facts Encyclopedia',mentor:'Commander Luna, astronaut',uses:'Codeling Quest, Dungeon Escape',
 blurb:'A space encyclopedia with a proper page layout: header, nav, main, aside and footer.',
 intro:"Commander Luna here, from the space station! I need a space encyclopedia for kids on Earth. You'll build it with the 5 big **landmark** tags every professional page uses: header, nav, main, aside and footer.",
 steps:[
 H('sp1','The header',{why:"Every pro page starts with a header — the title area at the top.",
  learn:"**Landmark** tags are the big parts of a page. Screen readers can jump straight to them. The first one is `<header>`.",
  todo:"Make a `<header>` with an `<h1>` and a `<p>`.",job:"Make a `<header>`. Put an `<h1>` title and a `<p>` inside.",where:TOP,
  snippet:`<header>
  <h1>The Space Facts Encyclopedia 🚀</h1>
  <p>Amazing facts about our corner of space.</p>
</header>`,
  hints:["`<header>` … `</header>`.","Inside: `<h1>The Space Facts Encyclopedia</h1>` and a `<p>`."],
  tip:"Landmarks are like the big signs in a shopping centre: 'Food Court', 'Exit'. They help people find their way.",
  checks:[has('header h1',"Put an `<h1>` inside a `<header>`."),has('header p',"Add a `<p>` inside the `<header>`.")]}),
 H('sp2','The nav',{why:"Readers want to jump to a topic. The menu lives inside the header.",
  learn:"`<nav>` is the landmark for the main menu. Each `href=\"#sun\"` jumps to the part with `id=\"sun\"`.",
  todo:"Inside the `<header>`, add a `<nav>` with **4** links: `#sun`, `#moon`, `#mars` and `#planets`.",
  job:"Inside the `<header>`, add a `<nav>` with 4 links: `href=\"#sun\"`, `href=\"#moon\"`, `href=\"#mars\"` and `href=\"#planets\"`.",
  where:"Inside your `<header>`, just before `</header>`.",
  snippet:`<nav>
  <a href="#sun">Sun</a> |
  <a href="#moon">Moon</a> |
  <a href="#mars">Mars</a> |
  <a href="#planets">Planets</a>
</nav>`,apply:before('</header>',`<nav>
  <a href="#sun">Sun</a> |
  <a href="#moon">Moon</a> |
  <a href="#mars">Mars</a> |
  <a href="#planets">Planets</a>
</nav>`),
  hints:["Find `</header>` and add the `<nav>` just above it.","`<nav>` with `<a href=\"#sun\">Sun</a>`, `#moon`, `#mars` and `#planets`."],
  tip:"Put the nav INSIDE the header — lots of real websites do it this way.",
  checks:[hrefs('header nav',['#sun','#moon','#mars','#planets'],"Inside the `<header>`, add a `<nav>` with links to `#sun`, `#moon`, `#mars` and `#planets`.")]}),
 H('sp3','The main part',{why:"The main facts of the page go in one big box called main.",
  learn:"`<main>` holds the **main content** — the reason people came to the page. Use only ONE `<main>` per page.",
  todo:"Add a `<main>`. Inside it, put `<section id=\"sun\">` with an `<h2>` and a `<p>`.",
  job:"Make a `<main>`. Inside it, add `<section id=\"sun\">` with an `<h2>` and a `<p>` fact.",
  snippet:`<main>
  <section id="sun">
    <h2>The Sun ☀️</h2>
    <p>The Sun is a star. It is so big that about one million Earths could fit inside it!</p>
  </section>
</main>`,
  hints:["`<main>` … `</main>` wraps the section.","Inside: `<section id=\"sun\"><h2>The Sun</h2><p>...</p></section>`."],
  tip:"Screen readers have a 'skip to main' button. `<main>` is what makes it work!",
  checks:[has('main section#sun h2',"Inside a `<main>`, add `<section id=\"sun\">` with an `<h2>`."),has('main section#sun p',"Add a `<p>` fact in the sun section.")]}),
 H('sp4','The Moon',{why:"Our nearest neighbour in space gets its own section — inside main.",
  todo:"Inside `<main>`, add `<section id=\"moon\">` with an `<h2>` and a `<p>`.",job:"Inside `<main>`, add `<section id=\"moon\">` with an `<h2>` and a `<p>` fact.",
  where:"Inside your `<main>`, just before `</main>`.",
  snippet:`<section id="moon">
  <h2>The Moon 🌙</h2>
  <p>Footprints on the Moon can last for millions of years, because there is no wind to blow them away.</p>
</section>`,apply:before('</main>',`<section id="moon">
  <h2>The Moon 🌙</h2>
  <p>Footprints on the Moon can last for millions of years, because there is no wind to blow them away.</p>
</section>`),
  hints:["Find `</main>` and add the new section just above it.","`<section id=\"moon\"><h2>The Moon</h2><p>...</p></section>`"],
  tip:"If you put it AFTER `</main>`, it's not part of the main content anymore. Watch where you type!",
  checks:[has('main section#moon h2',"Inside `<main>`, add `<section id=\"moon\">` with an `<h2>`.")]}),
 H('sp5','Mars',{why:"The red planet! Mars has so many cool facts, it needs a list.",
  todo:"Inside `<main>`, add `<section id=\"mars\">` with an `<h2>` and a `<ul>` of at least **3** facts.",
  job:"Inside `<main>`, add `<section id=\"mars\">` with an `<h2>`. Add a `<ul>` with 3 `<li>` facts.",
  where:"Inside your `<main>`, just before `</main>`.",
  snippet:`<section id="mars">
  <h2>Mars 🔴</h2>
  <ul>
    <li>Mars is red because its dust is full of rust.</li>
    <li>It has the biggest volcano we know of: Olympus Mons.</li>
    <li>A day on Mars is 37 minutes longer than on Earth.</li>
  </ul>
</section>`,apply:before('</main>',`<section id="mars">
  <h2>Mars 🔴</h2>
  <ul>
    <li>Mars is red because its dust is full of rust.</li>
    <li>It has the biggest volcano we know of: Olympus Mons.</li>
    <li>A day on Mars is 37 minutes longer than on Earth.</li>
  </ul>
</section>`),
  hints:["Same as the Moon section, but with a `<ul>` instead of a `<p>`.","`<section id=\"mars\"><h2>Mars</h2><ul><li>...</li></ul></section>` — 3 `<li>`s."],
  tip:"Olympus Mons is about two and a half times taller than Mount Everest!",
  checks:[has('main section#mars h2',"Inside `<main>`, add `<section id=\"mars\">` with an `<h2>`."),cnt('main section#mars li',3,"Add a `<ul>` with at least 3 `<li>` facts about Mars.")]}),
 H('sp6','All 8 planets',{why:"The planets go in order from the Sun — a perfect numbered list.",
  todo:"Inside `<main>`, add `<section id=\"planets\">` with an `<h2>` and an `<ol>` of all **8** planets, closest to the Sun first.",
  job:"Inside `<main>`, add `<section id=\"planets\">` with an `<h2>`. Add an `<ol>` with all 8 planets, from the Sun outwards.",
  where:"Inside your `<main>`, just before `</main>`.",
  snippet:`<section id="planets">
  <h2>The 8 Planets</h2>
  <ol>
    <li>Mercury</li>
    <li>Venus</li>
    <li>Earth</li>
    <li>Mars</li>
    <li>Jupiter</li>
    <li>Saturn</li>
    <li>Uranus</li>
    <li>Neptune</li>
  </ol>
</section>`,apply:before('</main>',`<section id="planets">
  <h2>The 8 Planets</h2>
  <ol>
    <li>Mercury</li>
    <li>Venus</li>
    <li>Earth</li>
    <li>Mars</li>
    <li>Jupiter</li>
    <li>Saturn</li>
    <li>Uranus</li>
    <li>Neptune</li>
  </ol>
</section>`),
  hints:["Order matters, so use `<ol>`.","Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune — each in its own `<li>`."],
  tip:"A trick to remember them: **M**y **V**ery **E**asy **M**ethod **J**ust **S**peeds **U**p **N**aming.",
  checks:[has('main section#planets h2',"Inside `<main>`, add `<section id=\"planets\">` with an `<h2>`."),cnt('main section#planets ol li',8,"Add an `<ol>` with all 8 planets.")]}),
 H('sp7','Did you know?',{why:"Extra fun facts sit to the side of the main story — like a sticker in a book.",
  learn:"`<aside>` is for **extra** stuff that's related, but not the main content — tips, fun facts, side notes. It goes OUTSIDE `<main>`.",
  todo:"After `</main>`, add an `<aside>` with an `<h2>Did You Know?</h2>` and a `<p>`.",
  job:"Under `</main>` (outside it!), add an `<aside>`. Put `<h2>Did You Know?</h2>` and a `<p>` fun fact inside.",
  where:"Below `</main>` — outside it.",
  snippet:`<aside>
  <h2>Did You Know?</h2>
  <p>Astronauts grow up to 5 cm taller in space, because there is less gravity squashing their backs!</p>
</aside>`,
  hints:["`<aside>` … `</aside>` goes AFTER `</main>`.","Inside: `<h2>Did You Know?</h2>` and a `<p>` fun fact."],
  tip:"With CSS later, you could make the aside sit beside the main part, like a sidebar.",
  checks:[has('aside h2',"Add an `<aside>` with an `<h2>` inside."),[a=>{const s=a.$('aside');return !!s&&!s.closest('main');},"Put the `<aside>` OUTSIDE `<main>` — after `</main>`."]]}),
 H('sp8','The footer',{why:"The last landmark: the footer, at the very bottom.",
  todo:"Add a `<footer>` with a `<p>` and `<small>` fine print.",job:"Add a `<footer>` at the bottom. Put a `<p>` with `<small>` words inside.",
  snippet:`<footer>
  <p><small>Facts checked by Commander Luna · Updated 2026</small></p>
</footer>`,
  hints:["`<footer>` … `</footer>` at the very bottom.","`<footer><p><small>Facts checked by Commander Luna</small></p></footer>`"],
  tip:"You now have all 5 landmarks: header, nav, main, aside, footer. That's how pro pages are built!",
  checks:[has('footer small',"Add a `<footer>` with `<small>` fine print in a `<p>`.")]}),
 H('sp9','Skip to main content',{why:"A pro accessibility move: let keyboard users skip the menu and jump straight to the facts.",
  learn:"A **skip link** is the very first link on a page. It jumps to `<main>`, so keyboard and screen-reader users don't have to go through the whole menu every time.",
  todo:"Two changes: (1) add `id=\"main\"` to your `<main>` tag, and (2) put `<a href=\"#main\">Skip to main content</a>` on the very first line.",
  job:"Change `<main>` to `<main id=\"main\">`. Then put `<a href=\"#main\">Skip to main content</a>` on the very first line.",
  where:"The link goes on the very FIRST line (above `<header>`). The `id` goes inside your `<main>` tag.",kind:'edit',
  snippet:`<a href="#main">Skip to main content</a>

<header>
  ...
</header>

<main id="main">`,
  apply:c=>c.includes('<main>')?'<a href="#main">Skip to main content</a>\n\n'+c.replace('<main>','<main id="main">'):c,
  hints:["Change `<main>` to `<main id=\"main\">`.","Then type `<a href=\"#main\">Skip to main content</a>` on the very top line, above `<header>`."],
  tip:"Press Tab on almost any big website (like a government site) and a 'Skip to content' link pops up. Now you know how it works!",
  checks:[has('main#main',"Add `id=\"main\"` to your `<main>` tag."),[a=>{const l=a.$('a');return !!l&&l.getAttribute('href')==='#main';},"Make `<a href=\"#main\">Skip to main content</a>` the very FIRST link on the page."]]})
 ]}
);
})();
