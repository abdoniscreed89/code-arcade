(()=>{
const ROOM_CSS=`html,body{margin:0}body{font-family:system-ui,sans-serif;background:#efe6d3}
.room{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end;justify-content:center;padding:26px 10px 30px;min-height:224px;box-sizing:border-box;background:linear-gradient(#f3ead8,#e3d3b2)}
.room *{display:inline-flex;align-items:center;justify-content:center;position:relative;font-size:34px;line-height:1;padding:4px 4px 18px;border-radius:10px;transition:transform .2s}
.room chest::before{content:"🧰"}.room key::before{content:"🗝️"}.room potion::before{content:"🧪"}.room skull::before{content:"💀"}.room gem::before{content:"💎"}
.room box{border:3px dashed #a47b4f;padding:20px 8px 20px;gap:6px;background:rgba(255,255,255,.45);min-width:44px;min-height:30px}
.room box::before{content:"box";position:absolute;top:3px;font-size:10px;color:#7a5a37;font-weight:800}
.room [class]::after,.room [id]::after,.room [locked]::after,.room [spell]::after{position:absolute;bottom:2px;font-size:10px;color:#6b4c2a;font-weight:800;white-space:nowrap}
.room [class]::after{content:"." attr(class)}.room [id]::after{content:"#" attr(id)}.room [locked]::after{content:"locked"}.room [spell]::after{content:"spell=" attr(spell)}
.room [element]::after{position:absolute;bottom:2px;font-size:10px;color:#6b4c2a;font-weight:800;white-space:nowrap;content:attr(element)}
.room .gold{filter:drop-shadow(0 0 5px #f5b301)}
.room [data-tgt]{animation:wig .9s ease-in-out infinite}
@keyframes wig{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}
.room [data-hit]{outline:3px solid #22a06b;outline-offset:2px;background:rgba(34,160,107,.14)}
.room [data-hit="bad"]{outline-color:#e5484d;background:rgba(229,72,77,.14)}`;
const ROOMS=[
{id:'r1',ch:'Floor 1: The Basics',title:'The First Door',target:'chest',markup:"<chest></chest>\n<chest></chest>",
 story:"You wake up in a stone room. A voice says: \"Only those who speak SELECTOR may pass.\" The wiggling things are what the door wants.",
 job:"Grab both chests. Just type the tag name: `chest`",
 learn:"A **type selector** is just the tag name. `chest` grabs every `<chest>` in the room.",
 hints:["The items are `<chest>` tags.","Type the tag name with no symbols: `chest`"],tip:"In real CSS, `p { }` uses a type selector to style every paragraph."},
{id:'r2',ch:'Floor 1: The Basics',title:'Potion Shelf',target:'potion',markup:"<chest></chest>\n<potion></potion>\n<chest></chest>\n<potion></potion>",
 story:"A dusty shelf of chests and potions. The door only wants the potions.",
 job:"Grab only the potions. Leave the chests alone.",
 learn:"A type selector only grabs tags with THAT name. The chests are left out.",
 hints:["Which tag is wiggling?","`potion`"],tip:"Watch the green outlines as you type. They show what your selector grabs."},
{id:'r3',ch:'Floor 1: The Basics',title:'The Golden Glow',target:'.gold',markup:"<chest></chest>\n<chest class=\"gold\"></chest>\n<potion class=\"gold\"></potion>\n<chest></chest>",
 story:"Some items glow gold. The door hums: \"Bring me everything golden.\"",
 job:"Grab every gold thing — the chest AND the potion. A class starts with a dot: `.gold`",
 learn:"A **class selector** starts with a dot. `.gold` grabs anything with `class=\"gold\"`, whatever tag it is.",
 hints:["Look at the labels under the items.","Classes start with a dot: `.gold`"],tip:"Classes are the most used selector in real websites."},
{id:'r4',ch:'Floor 1: The Basics',title:'The Master Key',target:'#master',markup:"<key></key>\n<key id=\"master\"></key>\n<key></key>",
 story:"Three keys. Only ONE opens the door: the master key.",
 job:"Grab only the master key. An id starts with a hash: `#master`",
 learn:"An **id selector** starts with a hash. `#master` grabs the ONE thing with `id=\"master\"`.",
 hints:["Look for a `#` label.","`#master`"],tip:"An id is used only once on a page. A class can be used again and again."},
{id:'r5',ch:'Floor 1: The Basics',title:'Golden Chests Only',target:'chest.gold',markup:"<chest class=\"gold\"></chest>\n<potion class=\"gold\"></potion>\n<chest></chest>\n<chest class=\"gold\"></chest>",
 story:"This door is picky: gold chests only. Not gold potions. Not plain chests.",
 job:"Grab only the gold chests. Put the tag and the class together with no space: `chest.gold`",
 learn:"Join a tag and a class with NO space: `chest.gold` means \"a chest that is also gold\".",
 hints:["You need the tag AND the class together.","No space between them: `chest.gold`"],tip:"No space = the same item. A space means something else. You'll see on the next floor!"},
{id:'r6',ch:'Floor 2: Families',title:'Boxed In',target:'box chest',markup:"<chest></chest>\n<box>\n  <chest></chest>\n</box>\n<box>\n  <chest></chest>\n  <potion></potion>\n</box>",
 story:"Floor 2. Some chests are hiding INSIDE boxes. The door wants only those.",
 job:"Grab only the chests that are inside a box. Type `box`, a space, then `chest`.",
 learn:"A **space** between two selectors means \"inside\". `box chest` = any chest inside a box.",
 hints:["You want chests that live inside boxes.","Box first, then a space, then chest: `box chest`"],tip:"`.menu a` styles only the links inside your menu. Super common in real sites."},
{id:'r7',ch:'Floor 2: Families',title:'Hidden Treasure',target:'box .gold',markup:"<potion class=\"gold\"></potion>\n<box>\n  <gem class=\"gold\"></gem>\n  <gem></gem>\n</box>\n<box>\n  <chest class=\"gold\"></chest>\n</box>",
 story:"Gold is everywhere! But the door only wants the gold that hides inside boxes.",
 job:"Grab only the gold things that are inside a box. Not the gold potion outside!",
 learn:"Mix them: `box .gold` = anything gold that is inside a box.",
 hints:["Inside a box... with class gold.","`box .gold`"],tip:"You can mix tags, classes and ids however you like."},
{id:'r8',ch:'Floor 2: Families',title:'Skulls and Keys',target:'skull, key',markup:"<skull></skull>\n<chest></chest>\n<key></key>\n<potion></potion>\n<skull></skull>",
 story:"A spooky room. The door wants every skull AND every key.",
 job:"Grab every skull and every key. Join two selectors with a comma: `skull, key`",
 learn:"A **comma** joins selectors: `skull, key` grabs the skulls and the keys.",
 hints:["Two different tags at once.","Put a comma between them: `skull, key`"],tip:"`h1, h2, h3 { }` styles all three headings with one rule."},
{id:'r9',ch:'Floor 2: Families',title:'Grab Everything',target:'*',markup:"<gem></gem>\n<box>\n  <key></key>\n</box>\n<potion></potion>",
 story:"A greedy door. It wants EVERYTHING in the room.",
 job:"Grab everything in the room, even the box. Use the star: `*`",
 learn:"The **star** `*` grabs every single thing.",
 hints:["One symbol grabs everything.","`*`"],tip:"Pros put `* { box-sizing: border-box; }` at the top of almost every stylesheet."},
{id:'r10',ch:'Floor 2: Families',title:'Direct Children',target:'box > gem',markup:"<gem></gem>\n<box>\n  <gem></gem>\n  <chest>\n    <gem></gem>\n  </chest>\n</box>",
 story:"Tricky! Only the gem sitting RIGHT inside the box counts. Not the one hiding in the chest.",
 job:"Grab only the gem sitting right inside the box, not the gem in the chest. Use `>`: `box > gem`",
 learn:"`>` means **right inside** (one step down). `box > gem` = gems whose parent is the box. A space would also grab the gem in the chest.",
 hints:["`box gem` grabs too many. You need the ones right inside only.","Put `>` between them: `box > gem`"],tip:"Space = anywhere inside. `>` = one step down only."},
{id:'r11',ch:'Floor 3: Positions',title:'First in Line',target:'potion:first-child',markup:"<potion></potion>\n<potion></potion>\n<potion></potion>",
 story:"Floor 3. Three potions that look the same. The door wants only the FIRST one.",
 job:"Grab only the first potion. Use `:first-child`: `potion:first-child`",
 learn:"`:first-child` grabs a thing only if it is first in its group. `potion:first-child`.",
 hints:["It's about position, not class.","`potion:first-child`"],tip:"Words that start with `:` are called pseudo-classes. `:hover` is one too!"},
{id:'r12',ch:'Floor 3: Positions',title:'Last in Line',target:'chest:last-child',markup:"<chest></chest>\n<chest></chest>\n<chest></chest>\n<chest></chest>",
 story:"Four chests. This door wants the LAST one.",
 job:"Grab only the last chest. Use `:last-child`: `chest:last-child`",
 learn:"`:last-child` is the opposite of `:first-child`.",
 hints:["Opposite of first-child.","`chest:last-child`"],tip:"Real use: remove the line under the last item in a list."},
{id:'r13',ch:'Floor 3: Positions',title:'Number Three',target:'skull:nth-child(3)',markup:"<skull></skull>\n<skull></skull>\n<skull></skull>\n<skull></skull>\n<skull></skull>",
 story:"Five skulls stare at you. Only the THIRD one is the secret lever.",
 job:"Grab only the 3rd skull. Use `:nth-child(3)`.",
 learn:"`:nth-child(3)` grabs the 3rd one. You can put any number in the brackets.",
 hints:["Count from the left: 1, 2, 3.","`skull:nth-child(3)`"],tip:"`:nth-child(odd)` and `:nth-child(even)` make striped tables!"},
{id:'r14',ch:'Floor 3: Positions',title:'The Locked Things',target:'[locked]',markup:"<chest></chest>\n<chest locked></chest>\n<chest></chest>\n<key locked></key>",
 story:"Some things are LOCKED. The door wants all the locked things, chest or key.",
 job:"Grab every locked thing. Use square brackets: `[locked]`",
 learn:"An **attribute selector** uses square brackets. `[locked]` grabs anything that has the word locked in its tag.",
 hints:["Look at the labels: what do the wiggling items share?","Square brackets: `[locked]`"],tip:"Real example: `input[type=\"email\"]` styles only email boxes."},
{id:'r15',ch:'Floor 3: Positions',title:'The Floor 3 Door',target:'chest:not(.gold)',markup:"<chest class=\"gold\"></chest>\n<chest></chest>\n<chest class=\"gold\"></chest>\n<chest></chest>\n<potion></potion>",
 story:"The last door on Floor 3! It wants every chest that is NOT gold. Get it right and the stairs to Floor 4 appear!",
 job:"Grab the plain chests — every chest that is NOT gold. Use `:not(.gold)`.",
 learn:"`:not( )` flips a selector: `chest:not(.gold)` = chests that are NOT gold.",
 hints:["Chests... but not the gold ones.","`chest:not(.gold)`"],tip:"You now know more selectors than many grown-up beginners!"},
{id:'r16',ch:'Floor 4: Master Selectors',title:'Odd Ones Out',target:'gem:nth-child(odd)',markup:"<gem></gem>\n<gem></gem>\n<gem></gem>\n<gem></gem>\n<gem></gem>",
 story:"Floor 4, deep down in the dungeon. Five gems sit in a row. The door wants the 1st, 3rd and 5th.",
 job:"Grab gems number 1, 3 and 5. Use `:nth-child(odd)`.",
 learn:"`:nth-child(odd)` grabs spots 1, 3, 5 and so on.",
 hints:["1, 3 and 5 are odd numbers.","`gem:nth-child(odd)`"],tip:"Striped tables use `tr:nth-child(odd)` to colour every other row."},
{id:'r17',ch:'Floor 4: Master Selectors',title:'Even Steven',target:'potion:nth-child(even)',markup:"<potion></potion>\n<potion></potion>\n<potion></potion>\n<potion></potion>\n<potion></potion>\n<potion></potion>",
 story:"Six potions. Steven the guard only drinks the even ones.",
 job:"Grab potions number 2, 4 and 6. Use `:nth-child(even)`.",
 learn:"`:nth-child(even)` grabs spots 2, 4, 6 and so on.",
 hints:["The opposite of odd.","`potion:nth-child(even)`"],tip:"`:nth-child(2n)` also means even: every 2nd one."},
{id:'r18',ch:'Floor 4: Master Selectors',title:'Next-Door Neighbour',target:'key + chest',markup:"<key></key>\n<chest></chest>\n<chest></chest>\n<key></key>\n<chest></chest>\n<gem></gem>",
 story:"Only chests standing RIGHT after a key will open this door.",
 job:"Grab only the chests that come right after a key. Use `+`: `key + chest`",
 learn:"`+` grabs the thing **right after** another one. `key + chest` = a chest that comes straight after a key.",
 hints:["Each wiggling chest comes straight after a key.","`key + chest`"],tip:"Real example: `h2 + p` styles the first paragraph right after each heading."},
{id:'r19',ch:'Floor 4: Master Selectors',title:'Everyone After',target:'skull ~ gem',markup:"<gem></gem>\n<skull></skull>\n<gem></gem>\n<chest></chest>\n<gem></gem>",
 story:"A cursed skull! Every gem that comes AFTER it (not before) is cursed... and the door wants them.",
 job:"Grab every gem that comes after the skull. Not the gem before it! Use `~`: `skull ~ gem`",
 learn:"`~` grabs ALL the matching things that come after: `skull ~ gem` = every gem after the skull.",
 hints:["`+` only grabs the very next one. You need ALL the ones after.","`skull ~ gem`"],tip:"`+` = the next one only. `~` = all the ones after."},
{id:'r20',ch:'Floor 4: Master Selectors',title:'Double Class',target:'.gold.big',markup:"<chest class=\"gold\"></chest>\n<chest class=\"gold big\"></chest>\n<gem class=\"big\"></gem>\n<gem class=\"gold big\"></gem>",
 story:"The door only wants BIG GOLD things. Gold alone is not enough. Big alone is not enough.",
 job:"Grab only things that are gold AND big. Join both classes with no space: `.gold.big`",
 learn:"Join two classes with NO space: `.gold.big` = things that have BOTH classes.",
 hints:["Some items have two classes: gold AND big.","`.gold.big` (no space!)"],tip:"`.gold .big` (with a space) means a .big INSIDE a .gold. Totally different!"},
{id:'r21',ch:'Floor 4: Master Selectors',title:'Fire Element',target:'[element="fire"]',markup:"<potion element=\"fire\"></potion>\n<potion element=\"ice\"></potion>\n<gem element=\"fire\"></gem>\n<potion></potion>",
 story:"Magic! Only things with the FIRE element will melt this icy door.",
 job:"Grab only the fire things. Use `[element=\"fire\"]`.",
 learn:"`[element=\"fire\"]` grabs things whose element is exactly fire.",
 hints:["Square brackets, the word element, then = and \"fire\" in quotes.","`[element=\"fire\"]`"],tip:"Real websites use `input[type=\"password\"]` to style only password boxes."},
{id:'r22',ch:'Floor 4: Master Selectors',title:'The Royal Vault',target:'#vault gem',markup:"<gem></gem>\n<box id=\"vault\">\n  <gem></gem>\n  <chest>\n    <gem></gem>\n  </chest>\n</box>\n<box>\n  <gem></gem>\n</box>",
 story:"The royal vault is a box with an id. The door wants every gem inside the vault, even the hidden one.",
 job:"Grab every gem inside the box with id vault, even the one in the chest. Use `#vault gem`.",
 learn:"An id plus a space: `#vault gem` = any gem anywhere inside #vault.",
 hints:["Start with the vault's id: `#vault`","Then a space, then gem: `#vault gem`"],tip:"A space means 'anywhere inside', no matter how deep."},
{id:'r23',ch:'Floor 4: Master Selectors',title:'Children of Boxes',target:'box > *',markup:"<gem></gem>\n<box>\n  <chest></chest>\n  <potion></potion>\n</box>\n<box>\n  <key></key>\n</box>",
 story:"The door wants every item sitting right inside a box, whatever it is.",
 job:"Grab every item that sits right inside a box. Not the gem outside! Use `>` and `*`: `box > *`",
 learn:"Mix `>` with `*`: `box > *` = everything right inside a box.",
 hints:["'Anything' is `*`.","Right inside uses `>`: `box > *`"],tip:"Joining small selectors lets you grab almost anything on a page."},
{id:'r24',ch:'Floor 4: Master Selectors',title:'Last of Its Kind',target:'chest:last-of-type',markup:"<chest></chest>\n<chest></chest>\n<gem></gem>\n<chest></chest>\n<key></key>",
 story:"Tricky! The door wants the last CHEST. But a key is the last thing in the room.",
 job:"Grab only the last chest. The key is last in the room, so use `:last-of-type`.",
 learn:"`:last-child` only works if it is the very last thing. `:last-of-type` = the last one of THAT tag.",
 hints:["`chest:last-child` won't work. The key is last.","`chest:last-of-type`"],tip:"There's also `:first-of-type` and `:nth-of-type(2)`."},
{id:'r25',ch:'Floor 4: Master Selectors',title:'The Escape Hatch',target:'box .gold:not(chest)',markup:"<gem class=\"gold\"></gem>\n<box>\n  <chest class=\"gold\"></chest>\n  <gem class=\"gold\"></gem>\n  <potion class=\"gold\"></potion>\n</box>\n<box>\n  <key class=\"gold\"></key>\n</box>",
 story:"The hatch at the end of Floor 4! It wants gold things inside boxes, but NOT chests. Solve it and a secret staircase opens down to the Spell Library.",
 job:"Grab the gold things inside boxes, but NOT the gold chest. Use `box .gold` plus `:not(chest)`.",
 learn:"Mix everything: a space (inside) + a class + `:not()`.",
 hints:["Start with gold things inside boxes: `box .gold`","Then leave out chests: add `:not(chest)` right after `.gold`","`box .gold:not(chest)`"],tip:"You now know more CSS selectors than lots of grown-up coders!"},
{id:'r26',ch:'Floor 5: The Spell Library',title:'Starts With Fire',target:'[spell^="fire"]',markup:"<potion spell=\"fireball\"></potion>\n<potion spell=\"icebolt\"></potion>\n<gem spell=\"firestorm\"></gem>\n<potion spell=\"bigfire\"></potion>",
 story:"Floor 5: the Spell Library! Each item has a spell name written under it. This door wants spells that START with fire.",
 job:"Grab things whose spell STARTS with fire (fireball, firestorm). Not bigfire! Use `[spell^=\"fire\"]`.",
 learn:"`^=` means **starts with**. `[spell^=\"fire\"]` grabs spells whose name begins with fire.",
 hints:["bigfire has fire at the END, so it does not count.","Square brackets, spell, then `^=` and \"fire\" in quotes.","`[spell^=\"fire\"]`"],tip:"Real example: `a[href^=\"https\"]` styles only safe https links."},
{id:'r27',ch:'Floor 5: The Spell Library',title:'Ends With Bolt',target:'[spell$="bolt"]',markup:"<potion spell=\"icebolt\"></potion>\n<gem spell=\"boltstorm\"></gem>\n<potion spell=\"firebolt\"></potion>\n<potion spell=\"heal\"></potion>",
 story:"A crackling door. It only wants spells that END with bolt.",
 job:"Grab things whose spell ENDS with bolt (icebolt, firebolt). Not boltstorm! Use `[spell$=\"bolt\"]`.",
 learn:"`$=` means **ends with**. `[spell$=\"bolt\"]` grabs spells whose name finishes with bolt.",
 hints:["boltstorm STARTS with bolt, so it does not count.","Use `$=` instead of `^=`.","`[spell$=\"bolt\"]`"],tip:"Real example: `a[href$=\".pdf\"]` styles every link to a PDF file."},
{id:'r28',ch:'Floor 5: The Spell Library',title:'Ice Anywhere',target:'[spell*="ice"]',markup:"<gem spell=\"frostice\"></gem>\n<potion spell=\"fireball\"></potion>\n<potion spell=\"iceball\"></potion>\n<potion spell=\"heal\"></potion>\n<gem spell=\"bigicewall\"></gem>",
 story:"A frozen door. It wants every spell that has ice ANYWHERE in its name: start, middle or end.",
 job:"Grab every spell with ice anywhere in its name (frostice, iceball, bigicewall). Use `[spell*=\"ice\"]`.",
 learn:"`*=` means **has it anywhere**. `[spell*=\"ice\"]` grabs any spell with ice in it.",
 hints:["ice is at the end, the start and the middle of the wiggling spells.","Use `*=`.","`[spell*=\"ice\"]`"],tip:"`^=` starts with, `$=` ends with, `*=` anywhere. Three handy tools!"},
{id:'r29',ch:'Floor 5: The Spell Library',title:'The Empty Boxes',target:'box:empty',markup:"<box>\n  <gem></gem>\n</box>\n<box></box>\n<box>\n  <key></key>\n</box>\n<box></box>",
 story:"Four boxes. The door wants the boxes with NOTHING inside them.",
 job:"Grab only the empty boxes. Use `:empty`: `box:empty`",
 learn:"`:empty` grabs things that have nothing inside them.",
 hints:["Two of the boxes have nothing in them.","`box:empty`"],tip:"Real use: hide an empty message box with `.alert:empty { display: none; }`."},
{id:'r30',ch:'Floor 5: The Spell Library',title:'All Alone',target:'gem:only-child',markup:"<box>\n  <gem></gem>\n</box>\n<box>\n  <gem></gem>\n  <gem></gem>\n</box>\n<box>\n  <key></key>\n  <gem></gem>\n</box>\n<gem></gem>",
 story:"One lonely gem sits all by itself in a box. The door feels sorry for it and wants only that one.",
 job:"Grab only the gem that is all alone in its box. Use `:only-child`: `gem:only-child`",
 learn:"`:only-child` grabs a thing when it has no brothers or sisters: it is the ONLY thing in its parent.",
 hints:["The other gems share their box with something else.","`gem:only-child`"],tip:"`:only-child` is the same as `:first-child:last-child` — first AND last at once!"},
{id:'r31',ch:'Floor 5: The Spell Library',title:'The Second Gem',target:'gem:nth-of-type(2)',markup:"<skull></skull>\n<gem></gem>\n<key></key>\n<gem></gem>\n<gem></gem>",
 story:"Things are mixed up in a row. The door wants the SECOND gem. Count only the gems!",
 job:"Grab only the 2nd gem. Skip the skull and key when you count. Use `:nth-of-type(2)`.",
 learn:"`:nth-of-type(2)` counts only things with THAT tag. `gem:nth-of-type(2)` = the 2nd gem.",
 hints:["`:nth-child` counts everything. `:nth-of-type` counts only gems.","`gem:nth-of-type(2)`"],tip:"`p:nth-of-type(1)` grabs the first paragraph, even if a heading comes before it."},
{id:'r32',ch:'Floor 5: The Spell Library',title:'Every Third Skull',target:'skull:nth-child(3n)',markup:"<skull></skull>\n<skull></skull>\n<skull></skull>\n<skull></skull>\n<skull></skull>\n<skull></skull>",
 story:"Six skulls. Every THIRD one is a trap lever: number 3 and number 6.",
 job:"Grab skulls number 3 and 6. Use `:nth-child(3n)`, which means every 3rd one.",
 learn:"`3n` means every 3rd one: 3, 6, 9... `:nth-child(3n)`.",
 hints:["`:nth-child(3)` only grabs number 3. You need a pattern.","`skull:nth-child(3n)`"],tip:"`:nth-child(4n)` would grab every 4th. Try other numbers!"},
{id:'r33',ch:'Floor 5: The Spell Library',title:'Last in Every Box',target:'box > :last-child',markup:"<box>\n  <key></key>\n  <gem></gem>\n</box>\n<box>\n  <potion></potion>\n  <chest></chest>\n  <skull></skull>\n</box>\n<gem></gem>",
 story:"Each box has a guard at the back of the line. The door wants the LAST item in every box.",
 job:"Grab the last item inside each box (a gem and a skull). Not the gem outside! Use `box > :last-child`.",
 learn:"You can use `:last-child` with no tag. `box > :last-child` = the last thing right inside each box.",
 hints:["The last things are different tags, so don't type a tag name.","Right inside a box `>`, then `:last-child`.","`box > :last-child`"],tip:"`li:last-child` is how pros remove the line under the last item in a menu."},
{id:'r34',ch:'Floor 5: The Spell Library',title:'Boxes With Gems',target:'box:has(gem)',markup:"<box>\n  <gem></gem>\n</box>\n<box>\n  <key></key>\n</box>\n<box>\n  <potion></potion>\n  <gem></gem>\n</box>\n<gem></gem>",
 story:"This time the door wants the BOXES, not the gems! But only the boxes that have a gem inside.",
 job:"Grab the boxes that have a gem inside. Grab the BOX, not the gem! Use `box:has(gem)`.",
 learn:"`:has( )` grabs a thing that has something inside it. `box:has(gem)` = boxes with a gem in them.",
 hints:["You want the box itself, so start with `box`.","Then `:has(gem)` right after it, no space.","`box:has(gem)`"],tip:"`:has()` is brand new in CSS. People called it the 'parent selector' and waited 20 years for it!"},
{id:'r35',ch:'Floor 5: The Spell Library',title:'The Dragon Gate',target:'box:has(skull) > gem',markup:"<box>\n  <skull></skull>\n  <gem></gem>\n  <gem></gem>\n</box>\n<box>\n  <gem></gem>\n  <key></key>\n</box>\n<gem></gem>\n<box>\n  <skull></skull>\n  <chest>\n    <gem></gem>\n  </chest>\n</box>",
 story:"The final door! A sleepy dragon guards it. It wants the gems sitting right inside boxes that have a skull. Solve it and Sir Select walks free into the sunshine! ☀️",
 job:"Grab the 2 gems sitting right inside the box that has a skull. Not the gem in the chest! Use `:has(skull)` and `>`.",
 learn:"Mix the new tricks: `box:has(skull)` finds the skull boxes, then `> gem` grabs gems right inside them.",
 hints:["First find boxes with a skull: `box:has(skull)`","Now grab gems right inside those boxes with `> gem`. The gem in the chest is too deep.","`box:has(skull) > gem`"],tip:"You escaped the whole dungeon! You know CSS selectors better than many real web developers."}
];
function matchSet(doc,sel){const room=doc.querySelector('.room');let list;try{list=[...doc.querySelectorAll(sel)];}catch(e){return null;}return list.filter(e=>room.contains(e)&&e!==room);}
const jobBox=t=>typeof jobHTML==='function'?jobHTML(t):`<div class="mission job" style="border:3px solid #f5b301;background:#fff8e1;color:#3b2a10;border-radius:14px;padding:10px 14px;font-size:18px;margin-bottom:10px"><b>🧒 Your job:</b> ${md(t)}</div>`;
let cur=null,api=null;
function play(L,el,done){
  let hints=0,used=false;cur=L;
  const S=Studio(el,{cls:'dng'});S.job(L.job||'');
  S.task.innerHTML=`<div class="bstory">${storyHTML('Sir Select, trapped knight',L.story)}<div class="lesson">📖 ${md(L.learn)}</div><div class="mission" style="margin-top:8px">🎯 Write a CSS selector that grabs <b>exactly</b> the wiggling items — no more, no less.</div></div>`;
  S.code.innerHTML=`<div class="pane-h">🪄 Your selector <small>Enter = open the door</small></div><div class="selrow"><input class="code1 selin" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="type a selector…" aria-label="Selector"><span class="brace">{ open: door; }</span></div><div class="snips"></div><div class="count"></div>
    <div class="exl">The room's HTML</div><pre class="ex codegrow" style="overflow:auto">${esc(L.markup)}</pre>`;
  S.view.innerHTML=`<div class="pane-h">🏰 The room <small>wiggling = what the door wants</small></div><div class="framewrap grow"><iframe class="droom prev" sandbox="allow-same-origin" title="Dungeon room"></iframe></div>`;
  S.actions.innerHTML=`<button class="btn" data-a="hint">💡 Hint</button><button class="btn" data-a="tip">✨ Tip</button><button class="btn" data-a="ans">👁 Answer</button><span></span><button class="btn primary big" data-a="go">🔓 Open the door</button>`;
  el=S.el;const fbEl=S.fbEl,hb=S.hb;
  const fb=(t,h)=>S.fb(t,h);
  const fr=$('.droom',el),inp=$('.selin',el),cnt=$('.count',el);
  renderInto(fr,`<div class="room">${L.markup}</div>`,ROOM_CSS).then(a=>{api=a;matchSet(a.doc,L.target).forEach(e=>e.setAttribute('data-tgt',''));live();});
  function live(){if(!api)return;const doc=api.doc;doc.querySelectorAll('[data-hit]').forEach(e=>e.removeAttribute('data-hit'));
    const s=inp.value.trim();if(!s){cnt.textContent='Targets: '+matchSet(doc,L.target).length;return null;}
    const m=matchSet(doc,s);if(!m){cnt.textContent='⚠️ That selector has a typo — the magic fizzles.';return null;}
    m.forEach(e=>e.setAttribute('data-hit',e.hasAttribute('data-tgt')?'good':'bad'));
    cnt.textContent=`You're grabbing ${m.length} · The door wants ${matchSet(doc,L.target).length}`;return m;}
  inp.addEventListener('input',live);
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}});
  addSnips($('.snips',el),inp,live,['.','#',' ','>','+','~',',','*','[',']','=','^','$','"',':','(',')']);
  $('.snips',el).lastChild.remove();
  [...$('.snips',el).children].find(b=>b.textContent===' ').textContent='␣ space';
  function go(){if(!api)return;const s=inp.value.trim();if(!s){fb('bad','Type a selector first!');return;}
    const m=live();if(!m){TRACK.attempt(CURRENT_GAME,L.id,false);fb('bad','❌ That selector isn\'t valid CSS. Check your symbols.');return;}
    const t=matchSet(api.doc,L.target);const okSet=m.length===t.length&&m.every(e=>t.includes(e));TRACK.attempt(CURRENT_GAME,L.id,okSet);
    if(okSet){fb('good','✅ The door rumbles open!');done(used?1:hints?2:3);}
    else{const extra=m.filter(e=>!t.includes(e)).length,missing=t.filter(e=>!m.includes(e)).length;
      fb('bad',`❌ The door stays shut. ${missing?`You missed ${missing} wiggling item${missing>1?'s':''}. `:''}${extra?`You grabbed ${extra} item${extra>1?'s':''} the door doesn't want (red outline).`:''}<br><small>Stuck? Tap 💡 Hint.</small>`);}}
  $('[data-a=go]',el).onclick=go;
  $('[data-a=hint]',el).onclick=()=>{if(hints<L.hints.length)hints++;TRACK.hint(CURRENT_GAME,L.id,hints);hb.innerHTML=L.hints.slice(0,hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('');el.classList.add('has-fb');};
  $('[data-a=tip]',el).onclick=()=>{showTip(hb,L.tip);el.classList.add('has-fb');};
  $('[data-a=ans]',el).onclick=()=>{used=true;TRACK.answer(CURRENT_GAME,L.id);inp.value=L.target;live();S.tab('code');hb.innerHTML=`<div class="h a">👁 The answer is <code>${esc(L.target)}</code>. Look at how it matches the wiggling items, then open the door.</div>`;};
}
Game({id:'dungeon',emoji:'🏰',title:'Dungeon Escape',unit:'Room',winWord:'Door opened!',levels:ROOMS,
 intro:`<h2>🗝️ The Selector Dungeon</h2><p class="lesson">Sir Select, a brave knight, is trapped in a dungeon of magic doors. Each door opens only when you speak its language: <b>CSS selectors</b>.</p><p class="lesson">Selectors are how CSS picks WHAT to style. Write a selector that grabs exactly the wiggling items. Green outline = good, red = wrong.</p>`,
 finale:"Sir Select is free! You've mastered CSS selectors — the way CSS picks what to style on every website.",
 play});
window.__ROOMS={ROOMS,ROOM_CSS,matchSet};
})();
