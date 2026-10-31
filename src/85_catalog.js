/* =====================================================================
   CATALOG — categories, topics, achievements, rank, cheat sheet data
   ===================================================================== */
const CATS=[
 {id:'home',em:'🏠',name:'Home'},
 {id:'html',em:'🧱',name:'HTML',kid:'HTML is the bricks of a web page — the words, pictures, links, lists and boxes.'},
 {id:'css',em:'🎨',name:'CSS',kid:'CSS is the paint and decorations — colours, sizes, fonts and fancy effects.'},
 {id:'flex',em:'↔️',name:'Flexbox',kid:'Flexbox lines things up in a row or a column — like books on a shelf.'},
 {id:'grid',em:'▦',name:'Grid',kid:'Grid puts things into rows AND columns — like a chessboard or a garden plot.'},
 {id:'js',em:'⚡',name:'JavaScript',kid:'JavaScript is the brain — it makes pages think, count, decide and react when you click.'},
 {id:'adv',em:'🗡️',name:'Adventures',kid:'Big story games with heroes, villains and bosses. Every fight is won with real code.'},
 {id:'proj',em:'🛠️',name:'Projects',kid:'Build real websites step by step — then download them and show your family!'},
 {id:'topics',em:'🔎',name:'Topics',kid:'Pick ONE skill and see every lesson about it, from every game.'},
 {id:'sheet',em:'📚',name:'Cheat sheet',kid:'Forgot how something works? Search every idea you have learned, with an example.'}
];
const GAMEINFO=[
 {id:'quest',kind:'adv',em:'🌿',t:'Codeling Quest',d:'Your first adventure! Tame wild creatures by writing HTML and CSS.',cats:['html','css','flex'],lvl:'Start here',ribbon:'START HERE'},
 {id:'rift',kind:'adv',em:'🌀',t:'Rift Runner',d:'A real-time platformer! Run, jump, wall-jump and dash — and the code you write becomes REAL platforms.',cats:['html','css','flex','grid','js'],lvl:'All levels',ribbon:'NEW · PLATFORMER'},
 {id:'shadow',kind:'adv',em:'🗡️',t:'Shadowblade',d:'Sneak across the rooftops of Azura. Silent takedowns and boss fights — all written in CSS.',cats:['css','flex','grid'],lvl:'Beginner → Pro',ribbon:'NEW'},
 {id:'rune',kind:'adv',em:'🪓',t:'Runebound',d:'A father and daughter climb a frozen mountain. Every rune on the axe is JavaScript.',cats:['js'],lvl:'Beginner → Pro',ribbon:'NEW'},
 {id:'quest2',kind:'adv',em:'🐉',t:'Codeling Legends',d:'The huge creature quest: 7 regions, gyms, trainers, a shop — and a partner that evolves.',cats:['html','css','flex','grid','js'],lvl:'All levels'},
 {id:'bug',kind:'game',em:'🐞',t:'Bug Hunter',d:'Be a detective. Fix broken websites to solve each case.',cats:['html','css','flex'],lvl:'Beginner'},
 {id:'form',kind:'game',em:'📝',t:'Form Forge',d:'Build tables, forms and full page structures for the Builders\' Guild.',cats:['html'],lvl:'Beginner'},
 {id:'dungeon',kind:'game',em:'🏰',t:'Dungeon Escape',d:'Open magic doors with CSS selectors. Free the trapped knight.',cats:['css'],lvl:'Beginner → Pro'},
 {id:'art',kind:'game',em:'🎨',t:'Copy the Picture',d:'Restore faded paintings by recreating them with CSS.',cats:['css','flex'],lvl:'Beginner'},
 {id:'grid',kind:'game',em:'🌻',t:'Grid Farm',d:'Plant Farmer Flo\'s crops with CSS Grid.',cats:['grid','css'],lvl:'Intermediate'},
 {id:'cafe',kind:'game',em:'☕',t:'Café Tycoon',d:'Build Grandma\'s café website day by day. Earn coins and decorate.',cats:['html','css'],lvl:'Beginner'},
 {id:'racer',kind:'game',em:'🏎️',t:'Tag Racer',d:'Type code fast and right to beat your rivals.',cats:['html','css','flex','grid'],lvl:'Practice'},
 {id:'quiz',kind:'game',em:'🧠',t:'Brain Battle',d:'A code quiz show with lives and a 50/50 lifeline.',cats:['html','css','flex','grid','js'],lvl:'Practice'},
 {id:'spell',kind:'game',em:'🧙',t:'Spell Academy',d:'Learn JavaScript at wizard school. Every spell is real code.',cats:['js'],lvl:'Beginner'},
 {id:'robot',kind:'game',em:'🤖',t:'Robot Commander',d:'Program Bolt the robot with JavaScript. Escape the factory!',cats:['js'],lvl:'Intermediate'}
];
const PCATS=[
 {id:'html',em:'🧱',name:'HTML only',d:'Structure only — learn which tag does what.'},
 {id:'css',em:'🎨',name:'CSS only',d:'The HTML is ready. You make it beautiful.'},
 {id:'web',em:'🌐',name:'HTML + CSS',d:'Build the page, then style it. Real websites.'},
 {id:'js',em:'⚡',name:'JavaScript',d:'The page is ready. You make it DO things.'},
 {id:'full',em:'🚀',name:'All three',d:'HTML + CSS + JavaScript from a blank page. Real apps!'}
];

/* ---------- progress helpers for any game or world ---------- */
function gameProgress(id){
  if(id==='quest'){const q=QUEST.progress();return{done:q.done,total:q.total,label:`${q.done}/${q.total} Codelings · ${q.badges}/4 badges`};}
  if(id==='quest2'){const q=QUEST2.progress();return{done:q.done,total:q.total,label:`${q.done}/${q.total} battles · ${q.badges}/7 badges`};}
  if(id==='rift'&&window.RIFT){const q=RIFT.progress();return{done:q.done,total:q.total,label:q.label};}
  if(window.SAGAS&&SAGAS[id]){const q=SAGAS[id].progress();return{done:q.done,total:q.total,label:`${q.done}/${q.total} battles · ${q.chapters}/${SAGAS[id]._test.CH.length} chapters`};}
  const g=GAMES[id];if(!g)return{done:0,total:1,label:''};const p=g.progress();return{done:p.done,total:p.total,stars:p.stars,max:p.max,label:`${p.done}/${p.total} ${g.def.unit||'Level'}s · ⭐ ${p.stars}/${p.max}`};
}
const projectList=()=>PK.PROJECTS.filter(P=>GAMES[P.id]);

/* ---------- topics: every level from every game, sorted by skill ---------- */
const TOPICS=[
 {id:'t_html',cat:'html',em:'🧱',name:'HTML basics',d:'Headings, paragraphs, bold, links, images, lists.'},
 {id:'t_sem',cat:'html',em:'🏛️',name:'Page structure',d:'header, nav, main, section, article, footer.'},
 {id:'t_form',cat:'html',em:'📋',name:'Forms & tables',d:'Inputs, labels, buttons, dropdowns, tables.'},
 {id:'t_sel',cat:'css',em:'🎯',name:'CSS selectors',d:'Choosing exactly what to style: .class, #id, child, :hover…'},
 {id:'t_style',cat:'css',em:'🖍️',name:'Colours, text & fonts',d:'color, background, font-size, text-align…'},
 {id:'t_box',cat:'css',em:'📦',name:'Boxes & spacing',d:'padding, margin, border, width, height, round corners.'},
 {id:'t_flex',cat:'flex',em:'↔️',name:'Flexbox',d:'display: flex, justify-content, align-items, gap, wrap.'},
 {id:'t_grid',cat:'grid',em:'▦',name:'Grid',d:'grid-template-columns, fr, repeat, span, areas.'},
 {id:'t_fx',cat:'css',em:'✨',name:'Position, effects & phones',d:'position, z-index, transform, transition, @media.'},
 {id:'t_jsb',cat:'js',em:'⚡',name:'JavaScript basics',d:'console.log, variables, numbers, text.'},
 {id:'t_logic',cat:'js',em:'🔀',name:'Decisions & loops',d:'if / else, true / false, for and while loops.'},
 {id:'t_func',cat:'js',em:'🧰',name:'Arrays, functions & objects',d:'Lists of things, reusable recipes, objects.'},
 {id:'t_debug',cat:'css',em:'🐞',name:'Debugging',d:'Finding and fixing mistakes in broken code.'}
];
function topicOf(gid,L){
  if(gid==='bug')return't_debug';
  const t=((L.concept||'')+' '+(L.title||'')+' '+(L.ch||'')+' '+(L.todo||'')).toLowerCase();
  const kind=L.type||L.kind||({form:'html',dungeon:'css',art:'css',grid:'css',spell:'js',robot:'js',rune:'js',tomb:'html',shadow:'css'})[gid]||(/<style|\{/.test(L.answer||L.snippet||'')?'css':'html');
  if(kind==='js'||gid==='spell'||gid==='robot'||gid==='rune'){
    if(/array|function|return|object|push|pop|map|filter|arrow|param|method|includes|index|length|\[/.test(t))return't_func';
    if(/\bif\b|else|loop|for\b|while|&&|\|\||boolean|compar|true|false|switch|break|decid|choice|===|>|</.test(t))return't_logic';
    return't_jsb';}
  if(kind==='css'||gid==='dungeon'||gid==='grid'||gid==='art'){
    if(gid==='grid'||/\bgrid|\bfr\b|place-items|grid-area|template/.test(t))return't_grid';
    if(/flex|justify|align-items|align-self|space-between|wrap|row|column/.test(t))return't_flex';
    if(/position|z-index|transform|transition|hover|animation|keyframe|@media|media|variable|opacity|shadow|sticky|fixed|absolute|rotate|scale|effect/.test(t))return't_fx';
    if(gid==='dungeon'||/selector|class|\bid\b|#|child|nth|:not|sibling|attribute|descendant|group|combin/.test(t))return't_sel';
    if(/padding|margin|border|width|height|box|radius|sizing|size\b|spacing/.test(t))return't_box';
    return't_style';}
  if(/form|input|label|button|select|textarea|table|\btr\b|\btd\b|\bth\b|caption|fieldset|radio|checkbox|option/.test(t))return't_form';
  if(/header|nav|main|footer|section|article|aside|figure|semantic|structure|layout/.test(t))return't_sem';
  return't_html';
}
/* every playable level with where it lives */
function allLevels(){
  const out=[];
  for(const g of GAMEINFO){if(g.kind!=='game')continue;const G=GAMES[g.id];if(!G)continue;G.def.levels.forEach((L,i)=>out.push({gid:g.id,i,L,title:L.title,topic:topicOf(g.id,L)}));}
  for(const P of projectList()){const G=GAMES[P.id];G.def.levels.forEach((L,i)=>out.push({gid:P.id,i,L,title:L.title,topic:topicOf(P.id,Object.assign({type:L.kind==='js'?'js':L.kind==='css'?'css':'html'},L)),proj:true}));}
  for(const id of ['shadow','rune'])if(window.SAGAS&&SAGAS[id])SAGAS[id]._test.LS.forEach(L=>out.push({gid:id,L,title:L.enemy+' — '+L.concept,topic:topicOf(id,L),saga:true}));
  if(window.RIFT)RIFT.lessons().forEach(L=>out.push({gid:'rift',L,title:'🌀 '+L._lv.name+' — '+L.concept,topic:riftTopic(L),rift:true}));
  return out;
}
function riftTopic(L){const w=L._lv._w;return L.js?(/for|loop|array|function/i.test(L.concept)?'t_func':'t_jsb'):['t_html','t_box','t_flex','t_grid','t_fx','t_jsb'][w]||'t_style';}
function levelStars(x){if(x.rift){const s=store.get(RIFT.key,null);return s&&s.zones?(s.zones[x.L._zid]||0):0;}if(x.saga){const s=store.get(SAGAS[x.gid].key,null);return s&&s.stars?(s.stars[x.L.id]||0):0;}const G=GAMES[x.gid];const S=G.def.starStore?G.def.starStore():PROG[x.gid];return (S&&S[x.L.id])||0;}
function levelUnlocked(x){if(x.rift){const s=store.get(RIFT.key,null);return !!(s&&s.zones&&s.zones[x.L._zid]);}if(x.saga){const s=store.get(SAGAS[x.gid].key,null);return !!(s&&s.done&&s.done[x.L.id]);}const G=GAMES[x.gid],lv=G.def.levels;const S=G.def.starStore?G.def.starStore():PROG[x.gid];const st=id=>(S&&S[id])||0;
  return x.i===0||st(lv[x.i-1].id)>0||lv.slice(x.i).some(l=>st(l.id)>0);}
function openLevel(x){if(x.rift){APP.show('rift');setTimeout(()=>{RIFT._test.startLevel(x.L._lv.id);},60);return;}if(x.saga){APP.show(x.gid);setTimeout(()=>SAGAS[x.gid]._test.battle({kind:'practice',L:x.L}),60);return;}APP.show(x.gid);GAMES[x.gid].open(x.i);}

/* ---------- totals, rank and achievements ---------- */
function everything(){
  let stars=0,done=0,total=0,three=0;
  for(const x of allLevels()){const s=levelStars(x);total++;if(s){done++;stars+=s;if(s===3)three++;}}
  const q=QUEST.progress(),q2=QUEST2.progress();done+=q.done+q2.done;total+=q.total+q2.total;
  const projDone=projectList().filter(P=>{const p=GAMES[P.id].progress();return p.done===p.total;}).length;
  const sagas=['shadow','rune'].map(id=>{const s=window.SAGAS&&SAGAS[id]?store.get(SAGAS[id].key,null):null;return s||{};});
  const stealth=sagas.reduce((a,s)=>a+(s.stealth||0),0),sagaDone=['shadow','rune'].filter(id=>{const p=SAGAS[id]&&SAGAS[id].progress();return p&&p.done===p.total;}).length;
  const days=STATS.days||{};const streak=(()=>{let n=0;const d=new Date();if(!days[dayKey(d)])d.setDate(d.getDate()-1);while(days[dayKey(d)]){n++;d.setDate(d.getDate()-1);}return n;})();
  const xp=stars*10+q.done*25+q2.done*25;
  const rp=window.RIFT?RIFT.progress():{done:0,total:0};
  return{riftDone:rp.done,riftTotal:rp.total,stars,done,total,three,projDone,projTotal:projectList().length,stealth,sagaDone,streak,xp,legend:!!(store.get(Q2KEY,null)||{}).champion,champ:!!(store.get(QKEY,null)||{}).champion,
    minutes:Object.values(days).reduce((a,b)=>a+(+b||0),0),daysActive:Object.keys(days).length,
    topicDone:t=>allLevels().filter(x=>x.topic===t&&levelStars(x)>0).length};
}
const RANKS=['Curious Coder','Tag Tinkerer','Style Sprout','Code Cadet','Web Weaver','Script Scout','Layout Ranger','Bug Squasher','Code Knight','Web Wizard','Pixel Master','Code Legend'];
function rankOf(xp){const lv=1+Math.floor(Math.sqrt(xp/60));return{lv,name:RANKS[Math.min(RANKS.length-1,Math.floor((lv-1)/2))],next:Math.pow(lv,2)*60,prev:Math.pow(lv-1,2)*60};}
const ACH=[
 ['first','🐣','First Steps','Finish your first level.',E=>E.done>=1],
 ['ten','🔟','Ten Down','Finish 10 levels.',E=>E.done>=10],
 ['fifty','🏅','Half Century','Finish 50 levels.',E=>E.done>=50],
 ['hundred','💯','Centurion','Finish 100 levels.',E=>E.done>=100],
 ['twofifty','🚀','Unstoppable Coder','Finish 250 levels.',E=>E.done>=250],
 ['stars50','⭐','Star Collector','Earn 50 stars.',E=>E.stars>=50],
 ['stars250','🌟','Star Hoarder','Earn 250 stars.',E=>E.stars>=250],
 ['stars600','💫','Superstar','Earn 600 stars.',E=>E.stars>=600],
 ['perfect','🎯','Perfectionist','Get 3 stars on 25 levels.',E=>E.three>=25],
 ['proj1','🛠️','Builder','Finish a whole project.',E=>E.projDone>=1],
 ['proj5','🏗️','Master Builder','Finish 5 projects.',E=>E.projDone>=5],
 ['proj20','🏙️','Web Architect','Finish 20 projects.',E=>E.projDone>=20],
 ['html','🧱','HTML Hero','Finish 40 HTML lessons.',E=>E.topicDone('t_html')+E.topicDone('t_sem')+E.topicDone('t_form')>=40],
 ['css','🎨','CSS Wizard','Finish 40 CSS lessons.',E=>E.topicDone('t_style')+E.topicDone('t_box')+E.topicDone('t_sel')+E.topicDone('t_fx')>=40],
 ['flex','↔️','Flex Master','Finish 15 Flexbox lessons.',E=>E.topicDone('t_flex')>=15],
 ['grid','▦','Grid Guru','Finish 15 Grid lessons.',E=>E.topicDone('t_grid')>=15],
 ['js','⚡','Script Sorcerer','Finish 40 JavaScript lessons.',E=>E.topicDone('t_jsb')+E.topicDone('t_logic')+E.topicDone('t_func')>=40],
 ['debug','🐞','Bug Squasher','Solve 20 Bug Hunter cases.',E=>E.topicDone('t_debug')>=20],
 ['stealth','🤫','Silent Shadow','Make 15 silent takedowns.',E=>E.stealth>=15],
 ['saga1','🗡️','Hero of the Story','Finish a whole adventure story.',E=>E.sagaDone>=1],
 ['saga2','👑','Legend of Two Lands','Finish both story sagas.',E=>E.sagaDone>=2],
 ['rift1','🌀','Rift Runner','Finish World 1 of Rift Runner.',E=>E.riftDone>=5],
 ['rift30','🌌','Master of the Rifts','Finish every Rift Runner level.',E=>E.riftDone>=E.riftTotal&&E.riftTotal>0],
 ['champ','🏆','Code Champion','Become champion in Codeling Quest.',E=>E.champ],
 ['legend','🐉','Codeling Legend','Beat Queen Byte in Codeling Legends.',E=>E.legend],
 ['streak3','🔥','On Fire','Learn 3 days in a row.',E=>E.streak>=3],
 ['streak7','☄️','Unstoppable','Learn 7 days in a row.',E=>E.streak>=7],
 ['hour','⏱️','Dedicated','Spend 60 minutes learning.',E=>E.minutes>=60]
];
function checkAchievements(quiet){
  const E=everything();STATS.ach=STATS.ach&&typeof STATS.ach==='object'?STATS.ach:{};const fresh=[];
  for(const[id,em,name,d,test]of ACH){let ok=false;try{ok=!!test(E);}catch(e){}if(ok&&!STATS.ach[id]){STATS.ach[id]=Date.now();fresh.push([em,name]);}}
  if(fresh.length){saveStats();if(!quiet)fresh.forEach((f,i)=>setTimeout(()=>toast(`${f[0]} <b>Achievement unlocked!</b><br>${esc(f[1])}`),i*1600));}
  return E;
}
function toast(html){const t=document.createElement('div');t.className='toast';t.innerHTML=html;document.body.appendChild(t);setTimeout(()=>t.classList.add('show'),20);setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),400);},3600);}

/* ---------- cheat sheet: every idea that has an explanation and an example ---------- */
let _sheet=null;
function cheatSheet(){if(_sheet)return _sheet;const seen=new Set(),out=[];
  const add=(concept,learn,example,where,topic)=>{if(!concept||!learn||!example)return;const k=String(concept).toLowerCase().trim();if(seen.has(k))return;seen.add(k);out.push({concept,learn,example,where,topic});};
  try{QUEST._test.CH.forEach(c=>add(c.concept,c.learn,c.example,'Codeling Quest',topicOf('quest',c)));}catch(e){}
  try{QUEST2._test.ALL.forEach(c=>add(c.concept,c.learn,c.example,'Codeling Legends',topicOf(c.type==='js'?'rune':c.type==='html'?'form':'shadow',c)));}catch(e){}
  for(const id of ['shadow','rune'])try{SAGAS[id]._test.LS.forEach(L=>add(L.concept,L.learn,L.example,SAGAS[id].def.title,topicOf(id,L)));}catch(e){}
  try{RIFT.lessons().forEach(L=>add(L.concept,L.learn,L.example,'Rift Runner',riftTopic(L)));}catch(e){}
  try{(window.__SPELL.S||[]).forEach(L=>add(L.title,L.learn,L.example||L.answer,'Spell Academy','t_jsb'));}catch(e){}
  _sheet=out;return out;}
