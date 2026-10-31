# The three adventure stories (shared outline — keep names consistent)

## 1. SHADOWBLADE — game id `shadow` — teaches CSS
The sun-washed harbour city of **Azura** (white walls, terracotta roofs, blue sea, markets). The **Iron
Syndicate**, led by **Lord Malvek**, controls the city's "Style Engines" — great machines that read style
scrolls (CSS!) and decide how everything in the city looks and moves; Malvek uses them to hide his crimes and
blind the city. **Kael**, a young apprentice of the secret **Veiled Order**, sneaks across the city, rewriting
the Syndicate's style scrolls to slip past guards and take down his targets. Mentor: **Master Idris** (wise,
dry humour). Friend/informant: **Lina**, a quick-witted pickpocket who talks over a "whisper-shell".
Tone: heroic stealth adventure; no gore — defeated guards "drop their weapons and flee" or "are tied up".
Chapters (place in brackets):
- c1 The Market of Azura (`market`) — selectors & colours: element/class/id selectors, color, background-color,
  grouping selectors, descendant selector. Boss: **Overseer Brutus**.
- c2 The Harbour Docks (`docks`) — box model: padding, margin, border, width/height, border-radius, box-sizing,
  max-width + margin auto. Boss: **Harbourmaster Vex**.
- c3 The Glass Hall (`glasshall`) — text & fonts: font-size, font-weight, font-style, font-family, text-align,
  line-height, letter-spacing, text-transform, text-decoration, text-shadow. Boss: **The Glass Warden**.
- c4 The Rooftops (`rooftops`) — flexbox: display flex, justify-content, align-items, gap, flex-direction,
  flex-wrap, flex-grow, align-self, centring. Boss: **Sable the Rooftop Hunter**.
- c5 The Palace Gardens (`gardens`) — grid: grid-template-columns/rows, fr, repeat(), gap, grid-column span,
  grid-row, grid-template-areas, place-items, auto-fit/minmax. Boss: **General Thorn**.
- c6 The Syndicate Tower (`tower`) — position & effects: relative/absolute/fixed/sticky, top/left, z-index,
  transform (rotate/scale/translate), transition, :hover, @media, CSS variables (--x / var()), opacity.
  Final boss: **Lord Malvek** (phases escalate; final phase combines flex/grid/position).
Lesson id prefix: `sh1_` … `sh6_` (boss phases `sh1_b1` etc).

## 2. RUNEBOUND — game id `rune` — teaches JavaScript
Snowy Norse-style lands of **Nordheim** (original). **Brynjar**, a scarred but gentle warrior, travels with
his clever daughter **Sigrid** (she reads runes and comments, often teasing her dad). The **Frost Jarl
Hrimgar** froze the great World-Forge; Brynjar must carry the **Ember Stone** up Mount Hrimfell to relight it.
Brynjar's **rune-axe** obeys runes carved as JavaScript: code = rune-magic. Enemies: draugr (undead warriors,
not scary-gory), wolves of frost, trolls, wyrms, ice golems. Tone: epic father–daughter journey, warm humour.
Chapters:
- c1 Frostvale Village (`village`) — console.log, strings, numbers, let, const, reassigning variables.
  Boss: **Draugr Chieftain Skarn**.
- c2 Ironwood Forest (`forest`) — maths operators, % remainder, joining strings, template literals, booleans,
  comparison === !== < >. Boss: **The Forest Wyrm**.
- c3 Troll Bridge (`bridge`) — if / else / else if, && || !, nested conditions. Boss: **Grunhild the Bridge Troll**.
- c4 Stonehollow Forge (`forge`) — loops: for, while, counting up/down, totals (accumulators), loops with if,
  break. Boss: **The Forge Golem**.
- c5 Serpent Lake (`lake`) — arrays: [ ], index, length, push, pop, includes, for...of, loops summing arrays,
  simple filter/map. Boss: **Jormun the Lake Serpent** (an original serpent, not a mythological retelling).
- c6 Mount Hrimfell (`peak`) — functions: declare, parameters, return, arrow functions, objects {key: value},
  dot access, an object method; final boss combines everything. Final boss: **Frost Jarl Hrimgar**.
Lesson id prefix: `rb1_` … `rb6_`. All lessons are `js({...})` with `tests`.

## 3. TOMB OF TAGS — game id `tomb` — teaches HTML
The buried desert city of **Kesh** (original, not a real civilisation or religion). **Nadia Stone**, a bold
young explorer-archaeologist, talks by radio with her best friend and guide **Professor Ade Okafor**. A rival
treasure hunter, **Victor Crane**, is racing her to the **Heart of Kesh**. The tomb's doors and machines are
powered by ancient "glyph-script" — which is HTML. Enemies: sand golems, scarab swarms, stone guardians, mummy
sentries (silly-spooky, never gory), cobras, traps. Tone: daring treasure hunt, puzzles, jokes from Ade.
Chapters:
- c1 The Sand Gate (`sandgate`) — headings h1–h6, p, strong, em, br, hr, comments. Boss: **The Sand Golem**.
- c2 Hall of Echoes (`echohall`) — links: a href, target="_blank", links to #ids; images: img src/alt/width,
  emoji in text. Use image paths like `"idol.png"` (they won't load — that's fine; checks look at attributes).
  Boss: **The Echo Wraith**.
- c3 The Scribe's Library (`library`) — ul/ol/li, nested lists, dl/dt/dd, tables: table/tr/th/td, caption,
  thead/tbody. Boss: **The Scribe Guardian**.
- c4 The Puzzle Chamber (`puzzle`) — forms: input types (text, number, password, email, checkbox, radio),
  label for/id, button, select/option, textarea, placeholder, required. Boss: **The Riddle Sphinx** (original).
- c5 The Royal Halls (`royal`) — page structure: header, nav, main, section, article, aside, footer, figure,
  figcaption, div vs span, class and id attributes. Boss: **Victor Crane** (the rival, defeated not harmed).
- c6 The Heart of Kesh (`heart`) — extras: details/summary, abbr title, time datetime, mark, progress, meter,
  blockquote/cite, lang, aria-label, entities (&amp;lt; &amp;copy;), a final full mini-page. Final boss:
  **Sekh-Ra, the Undying Guardian** (a giant stone guardian awakened by the Heart).
Lesson id prefix: `tb1_` … `tb6_`. Lessons are `html({...})` with `checks`.
