(()=>{
// Each question: [question, code or null, [CORRECT answer first, ...wrong answers], explanation]
const Q=[
{id:'q1',ch:'Season 1: HTML & CSS',title:'HTML Basics',story:"Welcome to BRAIN BATTLE, the quiz show where code knowledge is king! Round 1 is all about HTML basics. Three lives. Let's GO!",qs:[
 ["What does HTML stand for?",null,["HyperText Markup Language","High Tech Modern Language","Home Tool Making Language","Hyperlink Text Machine Language"],"HTML = HyperText Markup Language. 'Markup' means labelling text with tags like <h1> and <p>."],
 ["Which tag makes the BIGGEST heading?",null,["<h1>","<h6>","<head>","<big>"],"h1 is the biggest heading and h6 the smallest. <head> is something else — an invisible area for page info."],
 ["Which one is a correct CLOSING tag?",null,["</p>","<p/>","<\\p>","<p>"],"Closing tags have a forward slash right after the <."],
 ["Which tag is for a normal paragraph of text?",null,["<p>","<para>","<text>","<pg>"],"p is short for paragraph."],
 ["Which of these tags has NO closing tag?",null,["<img>","<p>","<h1>","<ul>"],"<img> has nothing inside it, so it has no closing tag. <input> and <br> work the same way."],
 ["What does <ul> make?",null,["A bullet list","A numbered list","Underlined text","A link"],"ul = unordered list (bullets). ol = ordered list (numbers)."]]},
{id:'q2',ch:'Season 1: HTML & CSS',title:'Elements & Attributes',story:"Round 2: attributes — the extra info inside opening tags.",qs:[
 ["Which attribute holds a link's web address?",null,["href","src","link","url"],"<a href=\"...\">. The src attribute is for images."],
 ["Which attribute describes an image for people who can't see it?",null,["alt","title","src","desc"],"alt text is read out by screen readers, and shows if the image fails to load."],
 ["Which words show on the page for people to click?","<a href=\"shop.com\">Buy now</a>",["Buy now","shop.com","href","a"],"The words BETWEEN the opening and closing tags show on the page. Here that is Buy now. shop.com is where the link goes."],
 ["Which tag is one item inside a list?",null,["<li>","<item>","<ul>","<list>"],"li = list item. It always lives inside a <ul> or <ol>."],
 ["Which tag makes a box people can type into?",null,["<input>","<type>","<textbox>","<write>"],"<input> makes a typing box. For big multi-line boxes, use <textarea>."],
 ["What is a <div>?",null,["An invisible box for grouping things","A line across the page","A maths divide sign","A video player"],"A div is a plain box. You can't see it until CSS gives it a look."]]},
{id:'q3',ch:'Season 1: HTML & CSS',title:'CSS Basics',story:"Round 3: time to paint! CSS questions coming your way.",qs:[
 ["What does CSS control?",null,["How a page LOOKS","What a page SAYS","How fast the internet is","Page passwords"],"HTML = what things are. CSS = how they look (colours, sizes, layout)."],
 ["Which is a correctly written CSS rule?",null,["h1 { color: red; }","h1 ( color = red )","h1 { color red }","<h1 color=\"red\">"],"First the selector (h1), then curly braces { }. Inside: property, colon, value, semicolon."],
 ["Which property changes the colour of TEXT?",null,["color","colour","text-color","font-color"],"Just color — and only the American spelling works!"],
 ["Which property changes the colour BEHIND something?",null,["background-color","bg","back-color","fill"],"background-color paints the area behind the content."],
 ["What does px mean in 16px?",null,["Pixels — tiny dots on the screen","Points of text","Percent","Paragraph X"],"Screens are made of millions of pixels. 16px is normal text size."],
 ["Where does CSS go inside an HTML file?",null,["Between <style> tags","Between <css> tags","Between <script> tags","Between <design> tags"],"<style> holds CSS. <script> holds JavaScript."]]},
{id:'q4',ch:'Season 1: HTML & CSS',title:'Selectors',story:"Round 4: selectors — how CSS picks what to style. Sir Select would be proud.",qs:[
 ["How do you select class=\"hero\" in CSS?",null,[".hero","#hero","hero","*hero"],"Classes use a dot."],
 ["How do you select id=\"logo\" in CSS?",null,["#logo",".logo","logo","@logo"],"ids use a hash."],
 ["What does this select?","ul li { }",["Every li inside a ul","Only the first li","A ul next to an li","Nothing — it's broken"],"A space means inside. So ul li picks every li that sits inside a ul."],
 ["What does this select?","h1, h2 { }",["All h1s AND all h2s","h2s inside h1s","Only the first h1","Nothing — commas aren't allowed"],"A comma means AND. One rule styles both h1s and h2s."],
 ["What does this rule do?",".btn:hover { background: gold; }",["Makes .btn gold while the mouse is over it","Makes .btn gold forever","Hides the button","Makes every button gold"],":hover only works while the mouse is on top of it."],
 ["What does * select?",null,["Every element","Nothing","Only stars","Only images"],"* is the universal selector. It picks every element on the page."]]},
{id:'q5',ch:'Season 1: HTML & CSS',title:'The Box Model',story:"Round 5: every element is a box. Do you know your padding from your margin?",qs:[
 ["Padding is space…",null,["Inside the border","Outside the border","Between letters","Between pages"],"Padding = inside (like bubble wrap). Margin = outside."],
 ["Margin is space…",null,["Outside the border","Inside the border","Between letters","Under the text"],"Margin pushes other boxes away."],
 ["What does border-radius: 50% do to a square?",null,["Turns it into a circle","Makes it 50% smaller","Makes it half see-through","Adds a thick border"],"50% rounding on a square = a perfect circle."],
 ["Which CSS centers TEXT?",null,["text-align: center;","align: middle;","center: true;","text-center: yes;"],"text-align centers text inside its box."],
 ["What border does this make?",".box { border: 2px dashed red; }",["2px thick, dashed, red","2 red dashes","A red box with no border","Two dashed boxes"],"border = thickness, style, colour."],
 ["Which CSS line is written correctly?",null,["font-size: 20px;","font-size: 20 px;","font size: 20px;","fontsize: 20px;"],"No space between the number and px, and a dash joins two-word properties."]]},
{id:'q6',ch:'Season 1: HTML & CSS',title:'Flexbox & Grid',story:"Round 6: layouts! The topic that makes beginners sweat. Not you though.",qs:[
 ["Where does display: flex go?",null,["On the PARENT box","On every child","On the body only","On the text"],"Flex goes on the box that holds the items."],
 ["Which property moves flex items left-right along a row?",null,["justify-content","align-items","text-align","float"],"justify-content = along the row. align-items = across it."],
 ["Which centers items UP-DOWN in a flex row?",null,["align-items: center;","justify-content: center;","vertical: center;","top: 50%;"],"align-items controls the up-down direction in a row."],
 ["What does flex-direction: column do?",null,["Stacks items top to bottom","Makes columns of text","Hides the items","Reverses the items"],"column stacks items from top to bottom. Phone layouts use it all the time."],
 ["What does gap: 10px do?",null,["Adds 10px BETWEEN items","Adds 10px around the outside","Makes items 10px wide","Adds 10 gaps"],"gap only adds space between items."],
 ["How many columns does this make?",".grid { display: grid; grid-template-columns: 1fr 1fr 1fr; }",["3 equal columns","1 column","111 columns","3 rows"],"Each value makes one column. 1fr means one equal share, so 1fr 1fr 1fr makes 3 equal columns."]]},
{id:'q7',ch:'Season 2: JavaScript',title:'JavaScript Basics',story:"Season 2! JavaScript makes websites DO things. Round 7 — the basics.",qs:[
 ["What does JavaScript add to a website?",null,["Actions — making things happen","Colours","Headings","Images"],"HTML = structure, CSS = style, JavaScript = behaviour."],
 ["Which line correctly creates a variable?",null,["let score = 0;","variable score = 0;","score := 0;","make score 0;"],"let makes a new variable. Here it is called score and starts at 0."],
 ["What does this print?","console.log(2 + 3);",["5","23","2 + 3","Error"],"Without quotes they are numbers, so 2 + 3 = 5."],
 ["What does this print?","console.log(\"2\" + \"3\");",["23","5","2 + 3","Error"],"With quotes they're TEXT, and + joins text together."],
 ["Which of these is a string (text)?",null,["\"hello\"","hello","42","true"],"Strings are text, and text always lives inside quotes."],
 ["In moveRight(); what do the ( ) brackets do?",null,["They run the command now","They make it a comment","They do maths","Nothing at all"],"The brackets call (run) the function. Without them, nothing happens."]]},
{id:'q8',ch:'Season 2: JavaScript',title:'Predict the Output',story:"Round 8: read the code and predict what it prints. Think like a computer!",qs:[
 ["What does this print?","let x = 5;\nx = x + 2;\nconsole.log(x);",["7","5","2","x + 2"],"x starts at 5, then becomes 5 + 2."],
 ["What does this print?","console.log(10 > 3);",["true","false","10","3"],"10 is bigger than 3, so the answer is true. Comparisons always give true or false."],
 ["What does this print?","let a = 4;\nif (a > 10) {\n  console.log(\"big\");\n} else {\n  console.log(\"small\");\n}",["small","big","big and small","Nothing"],"4 is not bigger than 10, so the else part runs."],
 ["How many times does this print \"hi\"?","for (let i = 0; i < 3; i++) {\n  console.log(\"hi\");\n}",["3","2","4","Forever"],"i = 0, 1, 2 → three times. When i reaches 3, it stops."],
 ["What does this print?","let list = [\"a\", \"b\", \"c\"];\nconsole.log(list[1]);",["b","a","c","1"],"Arrays count from 0! list[0] is \"a\", list[1] is \"b\"."],
 ["What does this print?","function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 5));",["7","25","a + b","undefined"],"The function returns 2 + 5."]]},
{id:'q9',ch:'Season 3: Champions',title:'Spot the Bug',story:"Season 3 — the Champions round! Every snippet has a bug. Find it.",qs:[
 ["Why does this heading look wrong?","<h1>Welcome<h1>",["The closing tag is missing its /","h1 isn't a real tag","Welcome is spelled wrong","Headings can't hold text"],"It should end with </h1>."],
 ["Why doesn't this CSS work?","p { colour: blue; }",["It must be spelled color (no u)","blue isn't a colour","p can't be styled","It needs two semicolons"],"CSS only understands the American spelling: color."],
 ["The HTML has class=\"title\". Why doesn't this CSS work?","title { color: red; }",["It's missing the dot: .title","It needs a # instead","red isn't allowed","The braces are wrong"],"Classes need a dot in CSS."],
 ["What's wrong here?","<a herf=\"page.html\">Go</a>",["herf should be href","Go needs quotes","a should be link","Nothing"],"It's href — H-R-E-F."],
 ["What's wrong here?","let name = \"Sam\";\nconsole.log(Name);",["Name has a capital N — JavaScript is case-sensitive","console is misspelled","Sam shouldn't have quotes","Nothing"],"name and Name are two different things to JavaScript."],
 ["Why does this loop never stop?","let i = 0;\nwhile (i < 5) {\n  console.log(i);\n}",["i never goes up, so it's always less than 5","5 is too big","console.log stops loops","while needs a semicolon"],"It needs i++ inside the loop."]]},
{id:'q10',ch:'Season 3: Champions',title:'The Grand Final',story:"THE GRAND FINAL! Mixed questions from everything. Win this to become a champion — and open the Season 4 bonus rounds! 🏆",qs:[
 ["Which tag holds the MAIN content of a page?",null,["<main>","<content>","<center>","<body2>"],"<main> holds the main content — only one per page."],
 ["A child has position: absolute. What should its PARENT box get, so the child is pinned inside it?",null,["position: relative;","display: flex;","margin: auto;","a border"],"Give the parent position: relative. It becomes the pin board for the child."],
 ["In CSS, what does this selector pick?","key + chest",["A chest that comes right after a key","Every key and every chest","A chest inside a key","Nothing at all"],"The + picks the very next element at the same level. A comma would pick both."],
 ["Which creates a list (array) in JavaScript?",null,["[\"a\", \"b\"]","(\"a\", \"b\")","<\"a\", \"b\">","list \"a\" \"b\""],"Square brackets [ ] make an array (a list)."],
 ["What does this print?","let n = 3;\nn++;\nconsole.log(n);",["4","3","n++","5"],"n++ adds 1, so 3 becomes 4."],
 ["What does this print?","let p = [\"x\", \"y\"];\np.push(\"z\");\nconsole.log(p.length);",["3","2","z","xyz"],"push adds one item, so there are now 3."]]},
{id:'q11',ch:'Season 4: Level Up',title:'Flexbox Tricks',story:"Season 4 — the Level Up season! These rounds go deeper. First up: more flexbox tricks.",qs:[
 ["What happens to boxes when their parent gets display: flex?",null,["They line up side by side in a row","They stack on top of each other","They disappear","They turn into 3 columns"],"display: flex puts the boxes inside it into a row, side by side."],
 ["What does justify-content: space-between do?",null,["Puts the first and last items at the ends, with equal space between","Puts all items in the middle","Adds space only on the left","Stacks the items in a column"],"space-between pushes the end items to the edges and shares the space between the rest."],
 ["Which line pushes flex items to the RIGHT end of a row?",null,["justify-content: flex-end;","text-align: right;","flex-direction: column;","align-items: flex-start;"],"justify-content moves items along the row. flex-end means the end of the row (the right side)."],
 ["Which flex-wrap value lets items jump to a new line when the row is full?",null,["wrap","nowrap","newline","break"],"flex-wrap: wrap lets items move down to the next line. nowrap squeezes them into one line."],
 ["This box is inside a flex row. What does the rule do?",".logo { flex-grow: 1; }",["The logo grows to fill the empty space","The logo becomes 1px wide","The logo moves to line 1","The logo text gets bigger"],"flex-grow: 1 says: take up any empty space in the row."],
 ["What does flex-direction: row-reverse do?",null,["Lines the items up backwards, right to left","Turns the row upside down","Stacks the items in a column","Hides the last item"],"row-reverse keeps a row but flips the order, so the first item ends up on the right."]]},
{id:'q12',ch:'Season 4: Level Up',title:'Grid Power',story:"Round 12: Grid Power! Rows, columns, and boxes that stretch.",qs:[
 ["What does repeat(4, 1fr) make?",".grid { display: grid; grid-template-columns: repeat(4, 1fr); }",["4 equal columns","1 column that is 4 times wider","4 rows","A 4px gap"],"repeat(4, 1fr) is a short way to write 1fr 1fr 1fr 1fr — four equal columns."],
 ["Which property sets the size of grid ROWS?",null,["grid-template-rows","grid-template-columns","row-height","grid-rows-size"],"grid-template-rows is for rows. grid-template-columns is for columns."],
 ["What does this do to a grid item?",".big { grid-column: span 2; }",["It stretches across 2 columns","It becomes 2px wide","It moves to column 2 only","It makes 2 copies of the item"],"span 2 means: take up the space of 2 columns."],
 ["What columns does this make?",".grid { display: grid; grid-template-columns: 2fr 1fr; }",["2 columns, and the first is twice as wide","3 equal columns","2 columns that are the same size","21 columns"],"2fr gets 2 shares of space and 1fr gets 1 share, so the first column is twice as wide."],
 ["What does column-gap: 20px add?",null,["20px of space between the columns only","20px of space between the rows only","20px around the whole grid","20px of padding inside each item"],"column-gap is only for the space between columns. row-gap is for rows. gap does both."],
 ["When is grid a better choice than flexbox?",null,["When you need rows AND columns, like a photo wall","When you have just one line of buttons","When you want to change text colour","When you want to add a link"],"Flexbox is great for one line. Grid is great for rows and columns at the same time."]]},
{id:'q13',ch:'Season 4: Level Up',title:'Forms & Access for All',story:"Round 13: forms that EVERYONE can use — including people who use screen readers.",qs:[
 ["Why should a typing box have a <label>?",null,["It tells everyone what to type — screen readers read it out loud","It makes the box bigger","It changes the box colour","It sends the form"],"A label names the box. Screen readers read it out, and clicking the label jumps into the box."],
 ["What connects this label to this input?","<label for=\"email\">Email</label>\n<input id=\"email\">",["for=\"email\" matches id=\"email\"","They are next to each other","The word Email","Nothing connects them"],"The label's for must match the input's id. Then they belong together."],
 ["What does required do here?","<input type=\"email\" required>",["The form won't send until the box is filled in","It makes the box red","It hides the box","It fills in the box for you"],"required means: you must fill this in before the form can be sent."],
 ["Which input type hides what you type behind dots?",null,["password","hidden","secret","text"],"type=\"password\" shows dots instead of letters, so no one can peek."],
 ["These two radio buttons have the same name. What can you do?","<input type=\"radio\" name=\"size\"> Small\n<input type=\"radio\" name=\"size\"> Big",["Pick only ONE of them","Pick both at once","Type words into them","Nothing — they can't be clicked"],"Radio buttons with the same name are a group. You can only pick one. Checkboxes let you pick many."],
 ["Which alt text is the MOST helpful for a photo?",null,["A brown dog catching a red ball","image","dog.png","picture123"],"Good alt text says what is in the picture, so people who can't see it still know."]]},
{id:'q14',ch:'Season 4: Level Up',title:'Loops & Arrays',story:"Round 14: loops and arrays! Count carefully — computers start counting at 0.",qs:[
 ["What does this print?","let fruits = [\"apple\", \"pear\", \"plum\"];\nconsole.log(fruits[fruits.length - 1]);",["plum","apple","pear","3"],"There are 3 fruits, so fruits.length - 1 is 2. fruits[2] is the last one: plum."],
 ["What is the LAST number this prints?","for (let i = 0; i < 10; i += 2) {\n  console.log(i);\n}",["8","10","9","2"],"i goes 0, 2, 4, 6, 8. Next would be 10, but 10 is not less than 10, so it stops."],
 ["What does this print?","let total = 0;\nfor (let n of [1, 2, 3]) {\n  total = total + n;\n}\nconsole.log(total);",["6","123","3","0"],"The loop adds each number: 0 + 1 + 2 + 3 = 6."],
 ["What is in cars after this?","let cars = [\"red\", \"blue\"];\ncars.pop();",["[\"red\"]","[\"blue\"]","[\"red\", \"blue\"]","[]"],"pop() takes away the LAST item, so only red is left."],
 ["What does this print?","let nums = [5, 8, 2];\nconsole.log(nums.includes(8));",["true","false","8","1"],"includes asks: is this item in the list? 8 is there, so it prints true."],
 ["What is in list after this?","let list = [];\nfor (let i = 0; i < 3; i++) {\n  list.push(i);\n}",["[0, 1, 2]","[1, 2, 3]","[3]","[0, 1, 2, 3]"],"The loop runs with i = 0, 1 and 2, and push adds each one to the end of the list."]]},
{id:'q15',ch:'Season 4: Level Up',title:'Functions & the Page',story:"Round 15: functions, and JavaScript that changes the page itself!",qs:[
 ["What does this print?","function greet(name) {\n  return \"Hi \" + name;\n}\nconsole.log(greet(\"Mia\"));",["Hi Mia","Hi name","greet","Mia"],"Mia goes into name, so the function gives back Hi Mia."],
 ["What does this print?","function double(n) {\n  return n * 2;\n}\nconsole.log(double(double(3)));",["12","6","9","33"],"The inside runs first: double(3) is 6. Then double(6) is 12."],
 ["What does document.querySelector(\"#title\") find?",null,["The element with id=\"title\"","Every element with class=\"title\"","A brand new heading","The words on the browser tab"],"querySelector uses CSS selectors. # means id, so it finds the element with id=\"title\"."],
 ["What does this code do?","document.querySelector(\"h1\").textContent = \"Hello!\";",["Changes the h1's words to Hello!","Makes a new h1","Deletes the h1","Prints Hello! in the console"],"textContent is the words inside an element. Setting it swaps in new words."],
 ["When does jump run?","button.addEventListener(\"click\", jump);",["Every time the button is clicked","Once, straight away","Never","Every second"],"addEventListener waits for the event. Each click runs jump again."],
 ["What does this do?","box.classList.add(\"hidden\");",["Adds the class hidden to the box, so the .hidden CSS rule styles it","Deletes the box","Makes a new box called hidden","Removes all of the box's classes"],"classList.add puts a new class on the element. Any CSS for that class now applies to it."]]},
{id:'q16',ch:'Season 4: Level Up',title:'Debug It!',story:"The last bonus round: Debug It! Each snippet has ONE bug. Can you spot it?",qs:[
 ["This image won't show. What's the bug?","<img src=\"cat.png' alt=\"Cat\">",["The quotes around cat.png don't match","<img> needs a closing tag","alt must come before src","cat.png must be in capitals"],"It starts with \" and ends with ' . Both quotes must be the same kind."],
 ["Why is the h1 NOT blue?","p { color: red;\nh1 { color: blue; }",["The p rule is missing its closing }","red needs quotes","h1 must come first","color needs a capital C"],"Every { needs a }. Without it, the browser thinks the h1 rule is still part of the p rule."],
 ["This prints the word score instead of 10. Why?","let score = 10;\nconsole.log(\"score\");",["\"score\" has quotes, so it's text, not the variable","let needs a capital L","10 needs quotes","console.log is spelled wrong"],"Quotes make text. To print the variable, write console.log(score) with no quotes."],
 ["What's wrong with this check?","if (age = 10) {\n  console.log(\"Ten!\");\n}",["One = SETS age to 10. To compare, use ===","if needs square brackets","10 needs quotes","console.log can't go inside an if"],"= puts a value in a box. === asks: are these the same?"],
 ["Nothing prints. Why?","function sayHi() {\n  console.log(\"Hi\");\n}",["The function is never called — add sayHi(); at the end","console.log is broken","Functions can't print","It needs two { at the start"],"Making a function only writes the recipe. You must call it, sayHi(), to run it."],
 ["We wanted blue but got undefined. Why?","let colors = [\"red\", \"green\", \"blue\"];\nconsole.log(colors[3]);",["Arrays start at 0, so blue is colors[2]","blue is spelled wrong","Arrays can only hold 2 items","console.log needs two brackets"],"Counting starts at 0: red is 0, green is 1, blue is 2. There is no item 3."]]}
];
function play(L,el,done){
  let i=0,hearts=3,miss=0,used5050=false;
  const qs=L.qs.map(q=>({q:q[0],code:q[1],opts:q[2].map((t,k)=>({t,ok:k===0})).sort(()=>Math.random()-.5),why:q[3]}));
  el.innerHTML=`<div class="box"><div class="bstory">${storyHTML('Quizzy, your host',L.story)}</div>
   <div class="rstat"><span class="chip">❓ Question <b class="qn">1</b>/${qs.length}</span><span class="chip hearts"></span><button class="btn sm" data-a="5050">🎲 50/50 (once per round)</button></div>
   <div class="qbody"></div><div class="feedback"></div><div class="qnext"></div></div>`;
  const body=$('.qbody',el),fbEl=$('.feedback',el),nx=$('.qnext',el),b5=$('[data-a="5050"]',el);
  const fb=(t,h)=>{fbEl.className='feedback '+(t||'');fbEl.innerHTML=h||'';};
  const drawHearts=()=>{$('.hearts',el).textContent='❤️'.repeat(hearts)+'🤍'.repeat(3-hearts);};
  function show(){const Qn=qs[i];$('.qn',el).textContent=i+1;drawHearts();fb();nx.innerHTML='';
    body.innerHTML=`<div class="qtext">${md(Qn.q)}</div>${Qn.code?`<pre class="ex">${esc(Qn.code)}</pre>`:''}<div class="opts">${Qn.opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o.t)}</button>`).join('')}</div>`;
    $$('.opt',body).forEach(b=>b.onclick=()=>pick(+b.dataset.k));
    b5.disabled=used5050;}
  function pick(k){const Qn=qs[i],o=Qn.opts[k];const btns=$$('.opt',body);btns.forEach(b=>b.disabled=true);b5.disabled=true;
    btns[Qn.opts.findIndex(x=>x.ok)].classList.add('right');
    if(o.ok){fb('good','✅ Correct! '+esc(Qn.why));}
    else{btns[k].classList.add('wrong');miss++;hearts--;TRACK.miss(CURRENT_GAME,L.id);drawHearts();fb('bad','❌ Not quite. '+esc(Qn.why));
      if(hearts<=0){TRACK.attempt(CURRENT_GAME,L.id,false);nx.innerHTML='';setTimeout(()=>modal(`<div class="center"><div style="font-size:52px">💔</div><h2>Out of lives!</h2><p>Every mistake is a lesson — the explanations are the best part. Try the round again!</p></div>`,[['Round list',()=>GAMES.quiz.levels()],['Try again',()=>GAMES.quiz.open(GAMES.quiz.cur),'primary']]),900);return;}}
    nx.innerHTML=`<div class="actions"><button class="btn primary big wide">${i+1<qs.length?'Next question →':'Finish round 🏁'}</button></div>`;
    $('button',nx).onclick=()=>{i++;if(i<qs.length)show();else{TRACK.attempt(CURRENT_GAME,L.id,true);let s=miss===0?3:miss===1?2:1;if(used5050)s=Math.min(s,2);done(s);}};}
  b5.onclick=()=>{if(used5050)return;used5050=true;TRACK.hint(CURRENT_GAME,L.id,1);b5.disabled=true;const btns=$$('.opt',body);
    qs[i].opts.map((o,k)=>k).filter(k=>!qs[i].opts[k].ok).sort(()=>Math.random()-.5).slice(0,2).forEach(k=>{btns[k].disabled=true;btns[k].classList.add('gone');});};
  show();
}
Game({id:'quiz',emoji:'🧠',title:'Brain Battle',levels:Q,unit:'Round',winWord:'Round won!',play,
 intro:`<h2>📺 BRAIN BATTLE — the code quiz show!</h2><p class="lesson">Lights, camera, CODE! Host Quizzy fires 6 questions per round. You have 3 lives ❤️❤️❤️ and one 50/50 lifeline per round.</p><p class="lesson">Every answer comes with a short explanation — wrong answers teach you just as much as right ones. Great for quick revision, even on the bus!</p>`,
 finale:"You're the Brain Battle Champion! 🏆 96 questions across HTML, CSS, forms and JavaScript — that's serious knowledge."});
window.__QUIZ=Q;
})();
