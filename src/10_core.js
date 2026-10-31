/* =====================================================================
   SHARED TOOLKIT
   ===================================================================== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const md=s=>esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>').replace(/\{BT\}/g,'&#96;');
const debounce=(fn,ms)=>{let t;const f=(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);};f.cancel=()=>clearTimeout(t);return f;};
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
/* ---- player profiles: every child gets their own progress ---- */
const PKEY='code-arcade-profiles';
const AVATARS=['🦊','🐼','🦁','🐸','🐙','🦄','🐯','🐨','🐧','🦖','🐝','🐬','🐱','🐶','🦉','🐢'];
let PROFILES=store.get(PKEY,null);
if(!PROFILES||!Array.isArray(PROFILES.list)||!PROFILES.list.length){PROFILES={list:[{id:'p1',name:'Player 1',avatar:'🦊',created:Date.now()}],current:'p1'};store.set(PKEY,PROFILES);}
PROFILES.list=PROFILES.list.filter(x=>x&&typeof x.id==='string');
if(!PROFILES.list.some(x=>x.id===PROFILES.current))PROFILES.current=PROFILES.list[0].id;
const PID=PROFILES.current,SFX=PID==='p1'?'':'::'+PID,ME=PROFILES.list.find(x=>x.id===PID);
const AKEY='code-arcade-v1'+SFX, QKEY='codeling-quest-v1'+SFX, Q2KEY='codeling-legends-v1'+SFX, STKEY='code-arcade-stats-v1'+SFX;
const SAGA_IDS=['shadow','rune'];
const profileKeys=id=>{const x=id==='p1'?'':'::'+id;return['code-arcade-v1','codeling-quest-v1','codeling-legends-v1','code-arcade-stats-v1','code-arcade-last-backup','rift-v1','spire-v1','saga-tomb-v1','code-arcade-hubcat',...SAGA_IDS.map(g=>'saga-'+g+'-v1')].map(k=>k+x);};

/* ---- learning stats (used by the progress report) ---- */
const freshStats=()=>({v:1,levels:{},days:{},firstSeen:Date.now()});
let STATS=(()=>{const x=store.get(STKEY,null);return x&&typeof x==='object'&&x.levels&&typeof x.levels==='object'&&x.days&&typeof x.days==='object'?x:freshStats();})();
let _stT=null;const saveStats=()=>{if(window._noStatsSave)return;clearTimeout(_stT);_stT=setTimeout(()=>store.set(STKEY,STATS),300);};
let CURRENT_GAME=null;
const dayKey=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const TRACK={
  _o:null,
  rec(g,id){const k=g+':'+id;let r=STATS.levels[k];if(!r||typeof r!=='object')r=STATS.levels[k]={a:0,f:0,h:0,ans:0,ms:0};return r;},
  open(g,id){if(!g||id==null)return;TRACK._o={g,id,t:Date.now()};},
  hint(g,id,n){if(!g||id==null)return;const r=TRACK.rec(g,id);r.h=Math.max(r.h||0,n||1);r.last=Date.now();saveStats();},
  answer(g,id){if(!g||id==null)return;const r=TRACK.rec(g,id);r.ans=1;r.last=Date.now();saveStats();},
  miss(g,id){if(!g||id==null)return;const r=TRACK.rec(g,id);r.f++;r.last=Date.now();saveStats();},
  attempt(g,id,ok){if(!g||id==null)return;const r=TRACK.rec(g,id),now=Date.now();r.a++;if(!ok)r.f++;
    const o=TRACK._o;if(o&&o.g===g&&o.id===id){r.ms+=Math.max(0,Math.min(now-o.t,15*60e3));o.t=now;}
    if(ok&&!r.done){r.done=now;r.ft=(r.a===1&&!r.ans&&!r.h)?1:0;}r.last=now;saveStats();}
};
let _lastInput=Date.now();['pointerdown','keydown','input'].forEach(ev=>document.addEventListener(ev,()=>{_lastInput=Date.now();},{passive:true,capture:true}));
setInterval(()=>{if(document.hidden||Date.now()-_lastInput>90e3)return;const k=dayKey();STATS.days[k]=(+STATS.days[k]||0)+0.5;saveStats();},30e3);
const freshProg=()=>({bug:{},art:{},dungeon:{},cafe:{code:'',start:'',coins:0,decor:[],stars:{}},racer:{},robot:{},form:{},grid:{},spell:{},quiz:{},proj:{}});
function cleanProg(raw){const f=freshProg(),o=Object.assign({},f,raw&&typeof raw==='object'?raw:{});for(const k in f)if(!o[k]||typeof o[k]!=='object'||Array.isArray(o[k]))o[k]=f[k];o.cafe=Object.assign(f.cafe,o.cafe);if(!o.cafe.stars||typeof o.cafe.stars!=='object')o.cafe.stars={};if(!Array.isArray(o.cafe.decor))o.cafe.decor=[];o.cafe.coins=+o.cafe.coins||0;return o;}
let PROG=cleanProg(store.get(AKEY,{}));
const saveProg=()=>store.set(AKEY,PROG);

/* ---- colours as browsers report them ---- */
const RED='rgb(255, 0, 0)',GREEN='rgb(0, 128, 0)',PURPLE='rgb(128, 0, 128)',LIGHTBLUE='rgb(173, 216, 230)',CLEAR='rgba(0, 0, 0, 0)',
      BLUE='rgb(0, 0, 255)',YELLOW='rgb(255, 255, 0)',ORANGE='rgb(255, 165, 0)',WHITE='rgb(255, 255, 255)',INK='rgb(34, 34, 34)';

/* ---- rendering code into a sandboxed frame ---- */
const BASE_CSS='body{font-family:system-ui,sans-serif;margin:12px;color:#222}';
/* stops a never-ending loop in the player's JavaScript from freezing the whole app */
function loopGuard(js){return js.replace(/\b(for|while)\s*\(((?:[^()]|\((?:[^()]|\([^()]*\))*\))*)\)\s*\{/g,m=>m+'if((window.__lgc=(window.__lgc||0)+1)>300000)throw new Error("A loop never stopped! Check your loop condition.");');}
const FRAME_JS='<script>window.__errs=[];window.__logs=[];addEventListener("error",e=>{__errs.push(String(e.message||e))});(()=>{const l=console.log.bind(console);console.log=(...a)=>{__logs.push(a.map(x=>typeof x==="string"?x:JSON.stringify(x)).join(" "));l(...a);};})();setInterval(()=>{window.__lgc=0},40);<\/script>';
function setScripts(frame,on){const want=on?'allow-scripts allow-same-origin':'allow-same-origin';if(frame.getAttribute('sandbox')!==want)frame.setAttribute('sandbox',want);}
function renderInto(frame,code,base=BASE_CSS,o={}){
  return new Promise(res=>{
    const id=(frame._seq=(frame._seq||0)+1);let done=false;
    const scripts=!!o.scripts;setScripts(frame,scripts);
    const body=scripts?code.replace(/(<script\b[^>]*>)([\s\S]*?)(<\/script>)/gi,(m,a,b,c)=>a+loopGuard(b)+c):code;
    const finish=()=>{if(done)return;done=true;setTimeout(()=>res(makeApi(frame.contentDocument,frame.contentWindow)),scripts?60:0);};
    frame.onload=()=>{if(id===frame._seq)finish();};
    setTimeout(finish,1500);
    frame.srcdoc=`<!doctype html><html><head><meta charset="utf-8">${scripts?FRAME_JS:''}<style>${base}</style></head><body>${body}\n<!--${id}--></body></html>`;
  });
}
function makeApi(doc,win){
  const fire=(el,type)=>el.dispatchEvent(new win.Event(type,{bubbles:true}));
  return {doc,win,$:s=>doc.querySelector(s),$$:s=>[...doc.querySelectorAll(s)],
    text:el=>el?el.textContent.replace(/\s+/g,' ').trim().toLowerCase():'',
    css:(el,p)=>el?win.getComputedStyle(el)[p]:'',
    rules:()=>{const out=[];const walk=list=>{for(const r of list){out.push(r);if(r.cssRules&&!r.selectorText)try{walk(r.cssRules);}catch(e){}}};for(const sh of doc.styleSheets){try{walk(sh.cssRules);}catch(e){}}return out;},
    /* for JavaScript projects */
    get errs(){return (win&&win.__errs)||[];},get logs(){return (win&&win.__logs)||[];},
    click(s){const e=typeof s==='string'?doc.querySelector(s):s;if(!e)return false;e.click();return true;},
    type(s,v){const e=typeof s==='string'?doc.querySelector(s):s;if(!e)return false;e.value=v;fire(e,'input');fire(e,'change');return true;},
    key(s,k){const e=typeof s==='string'?doc.querySelector(s):s;if(!e)return false;e.dispatchEvent(new win.KeyboardEvent('keydown',{key:k,bubbles:true}));e.dispatchEvent(new win.KeyboardEvent('keyup',{key:k,bubbles:true}));return true;},
    wait:ms=>new Promise(r=>setTimeout(r,ms||50))};
}
/* ---- check builders (sizes are compared with a 1px tolerance — phones round pixels) ---- */
const px=v=>parseFloat(v)||0;
const has=(s,m)=>[a=>!!a.$(s),m];
const hasText=(s,w,m)=>[a=>a.text(a.$(s)).includes(w),m];
const cssIs=(s,p,v,m)=>[a=>a.css(a.$(s),p)===v,m];
const cssPx=(s,p,n,m,tol=1)=>[a=>{const e=a.$(s);return !!e&&Math.abs(px(a.css(e,p))-n)<=tol;},m];
const cssMin=(s,p,n,m)=>[a=>{const e=a.$(s);return !!e&&px(a.css(e,p))>=n;},m];
const cssNot=(s,p,vals,m)=>[a=>{const e=a.$(s);return !!e&&![].concat(vals).includes(a.css(e,p));},m];
const gapPx=(s,n,m)=>[a=>{const e=a.$(s);return !!e&&(Math.abs(px(a.css(e,'columnGap'))-n)<=1||Math.abs(px(a.css(e,'rowGap'))-n)<=1);},m];
const gridCols=(a,s,p='gridTemplateColumns')=>{const e=a.$(s);const v=e?a.css(e,p):'';return !v||v==='none'?[]:v.trim().split(/\s+/).map(px);};
const hoverRule=(sel,m)=>[a=>a.rules().some(r=>r.selectorText&&r.selectorText.replace(/\s/g,'').includes(sel)&&r.style.backgroundColor),m];
async function runChecksCode(frame,code,checks,base,o={}){
  const a=await renderInto(frame,code,base,o);
  if(o.scripts&&a.errs.length){const m=a.errs[0];return{ok:false,msg:'Your JavaScript has an error, so it stopped running: `'+String(m).replace(/`/g,"'").slice(0,140)+'`. Check spelling, brackets ( ) { } and quotes.'};}
  for(const[fn,msg]of checks){let ok=false;try{ok=!!(await fn(a));}catch(e){ok=false;}if(!ok)return{ok:false,msg};}
  return{ok:true};
}

/* ---- modal ---- */
function modal(html,buttons=[['OK',null,'primary']]){
  const c=$('#modalCard');c.innerHTML=html+'<div class="row"></div>';const row=c.querySelector('.row');
  buttons.forEach(([label,fn,cls])=>{const b=document.createElement('button');b.className='btn '+(cls||'');b.textContent=label;b.onclick=()=>{closeModal();if(fn)fn();};row.appendChild(b);});
  $('#modal').classList.remove('hidden');
}
function closeModal(){$('#modal').classList.add('hidden');}

/* ---- editor helpers ---- */
function insertAt(ed,txt,after){const s=ed.selectionStart,e=ed.selectionEnd;ed.setRangeText(txt,s,e,'end');ed.focus();after&&after();}
function addSnips(box,ed,after,keys=['<','>','/','=','"','{','}',':',';','.','#','-']){
  keys.forEach(k=>{const b=document.createElement('button');b.type='button';b.textContent=k;b.onmousedown=e=>e.preventDefault();b.onclick=()=>insertAt(ed,k,after);box.appendChild(b);});
  const b=document.createElement('button');b.type='button';b.textContent='⇥';b.title='Indent';b.onmousedown=e=>e.preventDefault();b.onclick=()=>insertAt(ed,'  ',after);box.appendChild(b);
}
function wireEditor(ed,onInput,onSubmit){
  ed.addEventListener('input',onInput);
  ed.addEventListener('keydown',e=>{
    if(e.key==='Tab'&&ed.tagName==='TEXTAREA'){e.preventDefault();insertAt(ed,'  ',onInput);}
    if(e.key==='Enter'&&(e.ctrlKey||e.metaKey||ed.tagName==='INPUT')){e.preventDefault();onSubmit();}
  });
}
function showTip(hb,tip){const ex=hb.querySelector('.h.t');if(ex){ex.classList.remove('flash');void ex.offsetWidth;ex.classList.add('flash');return;}hb.insertAdjacentHTML('afterbegin','<div class="h t">✨ <b>Pro tip:</b> '+md(tip)+'</div>');}
function placementHint(code){
  const at=code.search(/<style/i),endAt=code.toLowerCase().lastIndexOf('</style>'),html=(at>=0?code.slice(0,at):code)+(endAt>=0?'\n'+code.slice(endAt+8):'');
  if(at>=0&&!/<\/style>/i.test(code))return 'Your <code>&lt;style&gt;</code> section is never closed. Add <code>&lt;/style&gt;</code> at the very end.';
  const m=/<style[^>]*>([\s\S]*?)<\/style>/i.exec(code),css=m?m[1]:'';
  if(/<\/?(a|p|h[1-6]|div|ul|ol|li|img|nav|section|header|footer|button|input|label|span|table|tr|td|th|form|main|article|aside)\b/i.test(css))return 'Some HTML tags ended up INSIDE your <code>&lt;style&gt;</code> section. HTML goes ABOVE <code>&lt;style&gt;</code> — only CSS goes inside it.';
  if(/[.#]?[a-z][\w-]*\s*\{[^{}]*:[^{}]*\}/i.test(html.replace(/<[^>]*>/g,' ')))return at>=0?'Some CSS is sitting OUTSIDE your <code>&lt;style&gt;</code> section, so it shows up as text. Move it between <code>&lt;style&gt;</code> and <code>&lt;/style&gt;</code>.':'Your CSS needs to be inside a <code>&lt;style&gt;</code> section. Put <code>&lt;style&gt;</code> above it and <code>&lt;/style&gt;</code> below it.';
  return '';
}
const starsHTML=(n,max=3)=>`<span class="stars">${'★'.repeat(n)}<span class="off">${'★'.repeat(max-n)}</span></span>`;
const storyHTML=(who,text)=>`<div class="story"><b class="who">${esc(who)}</b>${md(text)}</div>`;

/* =====================================================================
   STUDIO — the shared no-scroll workspace: Task | Code | Preview + action bar
   Desktop: three columns side by side. Tablet: task left, code over preview right.
   Phone: two tabs ("Task" and "Code + Preview") with the buttons always on screen.
   ===================================================================== */
function Studio(root,opt={}){
  root.innerHTML=`<div class="studio ${opt.cls||''}">
    <div class="st-tabs" role="tablist"><button data-tab="task" class="on" role="tab">📋 Your task</button><button data-tab="code" role="tab">✍️ Code &amp; preview</button></div>
    <section class="st-pane st-task"><div class="jobbox hidden"><b>🎯 Your job</b><div class="jobtxt"></div></div><div class="st-taskbody"></div>
      <button class="btn primary wide st-go">✍️ Start coding →</button></section>
    <section class="st-pane st-code"><div class="jobmini hidden" title="Tap to read your whole task"></div><div class="st-codebody"></div></section>
    <section class="st-pane st-view"><div class="st-viewbody"></div></section>
    <div class="st-bar"><div class="st-drawer"><div class="feedback"></div><div class="hintbox"></div></div><div class="actions"></div></div>
  </div>`;
  const st=$('.studio',root);
  const tab=t=>{st.dataset.tab=t;$$('.st-tabs button',st).forEach(b=>b.classList.toggle('on',b.dataset.tab===t));if(t==='code'){const e=$('textarea,input.code1',st);/* do not pop the phone keyboard automatically */}};
  $$('.st-tabs button',st).forEach(b=>b.onclick=()=>tab(b.dataset.tab));
  $('.st-go',st).onclick=()=>tab('code');
  $('.jobmini',st).onclick=()=>tab('task');
  tab(opt.tab||'task');
  const fit=()=>{if(!st.isConnected)return;const r=st.getBoundingClientRect();const top=Math.max(0,r.top+window.scrollY-(window.scrollY||0));const h=Math.max(opt.minH||460,Math.round(window.innerHeight-Math.max(r.top,0)-10));st.style.setProperty('--sth',h+'px');};
  requestAnimationFrame(fit);setTimeout(fit,120);
  if(!Studio._r){Studio._r=true;addEventListener('resize',()=>$$('.studio').forEach(x=>x._fit&&x._fit()));}
  st._fit=fit;
  const api={el:st,task:$('.st-taskbody',st),code:$('.st-codebody',st),view:$('.st-viewbody',st),actions:$('.st-bar .actions',st),
    fbEl:$('.st-bar .feedback',st),hb:$('.st-bar .hintbox',st),tab,fit,
    job(t){const jb=$('.jobbox',st),jm=$('.jobmini',st);if(t){jb.classList.remove('hidden');$('.jobtxt',jb).innerHTML=md(t);jm.classList.remove('hidden');jm.innerHTML='🎯 '+md(t);}else{jb.classList.add('hidden');jm.classList.add('hidden');}},
    fb(t,h){api.fbEl.className='feedback '+(t||'');api.fbEl.innerHTML=h||'';st.classList.toggle('has-fb',!!h);if(h&&t==='bad')api.fbEl.scrollIntoView({block:'nearest'});}};
  return api;
}
/* =====================================================================
   BENCH — write code, live preview, check (used by most HTML/CSS games)
   ===================================================================== */
function Bench(root,opt={}){
  const base=opt.base||BASE_CSS,scripts=!!opt.scripts;
  const S=Studio(root,{cls:(opt.target?'has-target ':'')+(opt.cls||'')});
  S.code.innerHTML=`<div class="pane-h">✍️ Your code <small>Ctrl + Enter = check</small></div>
     <textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Code editor"></textarea>
     <div class="snips"></div>`;
  S.view.innerHTML=`${opt.target?`<div class="pane-h">🎯 The original <small>make yours match</small></div><div class="framewrap"><iframe class="tgt fixed prev" sandbox="allow-same-origin" title="Target"></iframe></div>`:''}
     <div class="pane-h">👀 ${opt.target?'Your version':'Live preview'} <small>${scripts?'runs your code':'updates as you type'}</small></div>
     <div class="framewrap grow"><iframe class="prev ${opt.target?'fixed':''}" sandbox="allow-same-origin" title="Preview"></iframe></div>`;
  S.actions.innerHTML=`<button class="btn" data-a="hint">💡 Hint</button><button class="btn" data-a="tip">✨ Tip</button><button class="btn" data-a="answer">👁 Answer</button><button class="btn ghost" data-a="reset" title="${esc(opt.resetLabel||'Reset code')}">↺ Reset</button><button class="btn primary big" data-a="check">${opt.checkLabel||'✅ Check my code'}</button>`;
  const root2=S.el,ed=$('textarea.code',root2),fr=$('iframe.prev:not(.tgt)',root2),tg=$('iframe.tgt',root2),hb=S.hb;
  let T=null,hints=0,used=false,busy=false,resetCode='';
  const G=()=>opt.game||CURRENT_GAME;
  const live=debounce(()=>{if(!busy)renderInto(fr,ed.value,base,{scripts});},scripts?600:250);
  const onInput=()=>{live();opt.onInput&&opt.onInput(ed.value);};
  wireEditor(ed,onInput,()=>check());
  addSnips($('.snips',root2),ed,onInput,opt.snips);
  const fb=S.fb;
  const hintBtn=$('[data-a=hint]',root2);
  const label=()=>{hintBtn.textContent=`💡 Hint ${Math.min(hints,T.hints.length)}/${T.hints.length}`;};
  async function check(){
    if(busy||!T)return;
    if(!ed.value.trim()){fb('bad','Your code box is empty! Type your code first.');return;}
    busy=true;live.cancel();const cb=$('[data-a=check]',root2);cb.disabled=true;
    let r;try{r=opt.checker?await opt.checker(T,ed.value,{fr,tg,base}):await runChecksCode(fr,ed.value,T.checks,base,{scripts});}finally{busy=false;cb.disabled=false;}
    TRACK.attempt(G(),T.id,!!r.ok);
    if(r.ok){const stars=used?1:hints?2:3;fb('good',`✅ ${opt.winText||'It works! Your code is correct.'} ${r.extra||''}`);opt.onPass&&opt.onPass(stars,ed.value);}
    else{const ph=placementHint(ed.value);fb('bad',`❌ ${md(r.msg)}${r.extra?'<br>'+r.extra:''}${ph?`<span class="placehint">🧭 ${ph}</span>`:''}<small style="font-weight:700;display:block;margin-top:6px">Fix it and check again. Stuck? Tap 💡 Hint.</small>`);opt.onFail&&opt.onFail(r);}
  }
  $('[data-a=check]',root2).onclick=check;
  hintBtn.onclick=()=>{if(!T)return;if(hints<T.hints.length)hints++;label();TRACK.hint(G(),T.id,hints);opt.onHint&&opt.onHint(hints);
    hb.innerHTML=T.hints.slice(0,hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('')+(hints>=T.hints.length?`<div class="h" style="background:#fff;border-style:dashed">That's every hint! Still stuck? Tap 👁 Answer — totally fine.</div>`:'');S.el.classList.add('has-fb');hb.lastElementChild&&hb.lastElementChild.scrollIntoView({block:'nearest'});};
  $('[data-a=tip]',root2).onclick=()=>{if(T){showTip(hb,T.tip);S.el.classList.add('has-fb');}};
  $('[data-a=answer]',root2).onclick=()=>{if(!T)return;used=true;TRACK.answer(G(),T.id);S.el.classList.add('has-fb');
    if(opt.answer){opt.answer(T,ed,hb,onInput);S.tab('code');return;}
    ed.value=T.answer;onInput();S.tab('code');
    hb.innerHTML=`<div class="h a">👁 <b>Here's a correct answer.</b> It's now in your code box. Read it line by line and compare it with what you had — spot the difference. Then press check.<br><small>(You'll get 1 star this time. Learning is the real win.)</small></div>`;};
  $('[data-a=reset]',root2).onclick=()=>{ed.value=resetCode;onInput();};
  return{
    load(task,code){T=task;hints=0;used=false;busy=false;resetCode=code!=null?code:task.starter;TRACK.open(G(),task.id);
      S.task.innerHTML=`<div class="bstory">${task.storyHTML||''}</div>`;S.job(task.job||'');ed.value=resetCode;renderInto(fr,ed.value,base,{scripts});
      if(tg&&task.target!=null)renderInto(tg,task.target,base);fb();hb.innerHTML='';S.el.classList.remove('has-fb');label();S.tab(opt.tab||(window.innerWidth<700?'task':'code'));S.fit();},
    ed,fr,tg,fb,studio:S,setReset(c){resetCode=c;}
  };
}

/* =====================================================================
   GAME SHELL — level select, stars, unlocking, win screen
   ===================================================================== */
const GAMES={};
let CURRENT='hub';
function Game(def){
  const sec=document.createElement('section');sec.className='screen hidden';sec.id='g-'+def.id;
  sec.innerHTML=`<div class="gwrap"><div class="topbar"><button class="btn sm" data-back>← Arcade</button><div class="gt"><span class="ge">${def.emoji}</span><span>${esc(def.title)}</span></div><span class="chip gprog"></span></div><div class="gbody"></div></div>`;
  document.body.insertBefore(sec,$('#modal'));
  const body=$('.gbody',sec);
  const S=()=>def.starStore?def.starStore():PROG[def.id];
  const st=id=>S()[id]||0;
  const unlocked=i=>i===0||st(def.levels[i-1].id)>0||def.levels.slice(i).some(l=>st(l.id)>0);
  const g={def,
    progress(){const done=def.levels.filter(l=>st(l.id)>0).length;const stars=def.levels.reduce((n,l)=>n+st(l.id),0);return{done,total:def.levels.length,stars,max:def.levels.length*3};},
    prog(){const p=g.progress();$('.gprog',sec).textContent=`⭐ ${p.stars}/${p.max}`;},
    levels(){g.cleanup();g.prog();let html=`<div class="intro box">${def.intro}</div>`;
      if(def.header)html+=`<div class="ghead"></div>`;
      let chap=null,next=def.levels.findIndex((l,i)=>unlocked(i)&&!st(l.id));
      def.levels.forEach((l,i)=>{if(l.ch!==chap){if(chap!==null)html+='</div>';chap=l.ch;html+=`<div class="chap">${esc(chap)}</div><div class="lvgrid">`;}
        const lock=!unlocked(i);
        html+=`<button class="lv ${lock?'lock':''} ${i===next?'next':''}" data-i="${i}" ${lock?'disabled':''}><small>${def.unit||'Level'} ${i+1}${lock?' · 🔒':''}</small>${esc(l.title)}${starsHTML(st(l.id))}</button>`;});
      html+='</div>';body.innerHTML=html;
      if(def.header)def.header($('.ghead',body),g);
      $$('.lv',body).forEach(b=>b.onclick=()=>g.open(+b.dataset.i));window.scrollTo(0,0);},
    open(i){g.cleanup();const L=def.levels[i];g.cur=i;CURRENT_GAME=def.id;TRACK.open(def.id,L.id);
      body.innerHTML=`<div class="lvhead"><button class="btn sm ghost" data-lv>← ${def.unit||'Level'}s</button><b>${def.unit||'Level'} ${i+1}: ${esc(L.title)}</b>${starsHTML(st(L.id))}</div><div class="lvplay"></div>`;
      $('[data-lv]',body).onclick=()=>g.levels();
      def.play(L,$('.lvplay',body),stars=>g.win(i,stars),g);window.scrollTo(0,0);},
    win(i,stars){const L=def.levels[i];const prev=st(L.id);S()[L.id]=Math.max(prev,stars);saveProg();g.prog();
      const hasNext=i+1<def.levels.length;
      setTimeout(()=>modal(`<div class="center"><div style="font-size:52px">${stars===3?'🏆':stars===2?'🎉':'👍'}</div><h2>${esc(def.winWord||'Level complete!')}</h2><div style="font-size:30px">${starsHTML(stars)}</div>
        ${L.outro?`<p style="font-weight:700">${md(L.outro)}</p>`:''}<p class="muted">${stars===3?'Perfect — no hints needed!':stars===2?'Nice! Try again with no hints for 3 stars.':'You used the answer — try it again later from memory for more stars.'}</p>
        ${!hasNext&&def.finale?`<p style="font-weight:800">${md(def.finale)}</p>`:''}</div>`,
        hasNext?[['Level list',()=>g.levels()],['Next →',()=>g.open(i+1),'primary']]:[...(def.finaleBtns||[]),['Level list',()=>g.levels(),'primary']]),700);},
    cleanup(){def.cleanup&&def.cleanup();}
  };
  $('[data-back]',sec).onclick=()=>APP.show('hub');
  GAMES[def.id]=g;return g;
}

/* Special screens register themselves here: {enter(), leave()} keyed by id ('quest', 'quest2', 'shadow', 'report', ...) */
const WORLDS={};
const APP={show(id,arg){
  if(GAMES[CURRENT])GAMES[CURRENT].cleanup();
  $$('.screen').forEach(s=>s.classList.add('hidden'));
  for(const k in WORLDS)if(k!==id&&WORLDS[k].leave)WORLDS[k].leave();
  CURRENT=id;
  if(id==='hub'){$('#hub').classList.remove('hidden');renderHub(arg);}
  else if(WORLDS[id]){const sec=$('#g-'+id)||$('#'+id);if(sec)sec.classList.remove('hidden');CURRENT_GAME=id;WORLDS[id].enter(arg);}
  else{$('#g-'+id).classList.remove('hidden');GAMES[id].levels();}
  window.scrollTo(0,0);
}};

/* ---- lesson builders shared by the adventure games (same shape as Codeling Legends) ---- */
const LESSON=(()=>{const LST="\n\n<style>\n  \n</style>";
  return{
    /* CSS lesson: o.html is given, the player writes o.css inside the empty <style> */
    css:o=>Object.assign({type:'css',starter:o.html+LST,answer:o.html+"\n\n<style>\n  "+o.css.replace(/\n/g,'\n  ')+"\n</style>"},o),
    /* layout lesson: like css() but o.base CSS is already in the style box */
    lay:o=>{const b=o.base||'';return Object.assign({type:'css',starter:o.html+"\n\n<style>\n"+(b?'  '+b.replace(/\n/g,'\n  ')+'\n':'')+"  \n</style>",answer:o.html+"\n\n<style>\n"+(b?'  '+b.replace(/\n/g,'\n  ')+'\n':'')+"  "+o.css.replace(/\n/g,'\n  ')+"\n</style>"},o);},
    /* HTML lesson: starter defaults to empty */
    html:o=>Object.assign({type:'html',starter:''},o),
    /* JavaScript lesson: runs in a worker; o.tests = [[expression, message], ...] */
    js:o=>Object.assign({type:'js',starter:''},o)};})();

/* =====================================================================
   JSBENCH — write JavaScript, run it, see what it prints, check it
   (lessons: {id, job, storyHTML, starter, answer, hints, tip, tests:[[expr,msg]]})
   ===================================================================== */
function JSBench(root,opt={}){
  const S=Studio(root,{cls:'jsb '+(opt.cls||'')});
  S.code.innerHTML=`<div class="pane-h">🪄 Your JavaScript <small>Ctrl + Enter = run</small></div>
    <textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="JavaScript code"></textarea><div class="snips"></div>`;
  S.view.innerHTML=`<div class="pane-h">🔮 Output <small>what console.log prints</small></div><div class="crystal grow"><span class="muted">(run your code to see the output)</span></div>`;
  S.actions.innerHTML=`<button class="btn" data-a="hint">💡 Hint</button><button class="btn" data-a="tip">✨ Tip</button><button class="btn" data-a="answer">👁 Answer</button><button class="btn ghost" data-a="reset">↺ Reset</button><button class="btn primary big" data-a="go">${opt.checkLabel||'▶ Run my code'}</button>`;
  const el=S.el,ed=$('textarea',el),ball=$('.crystal',el),hb=S.hb;let L=null,hints=0,used=false,busy=false;
  const G=()=>opt.game||CURRENT_GAME;
  const hintBtn=$('[data-a=hint]',el);const label=()=>{hintBtn.textContent=`💡 Hint ${Math.min(hints,L.hints.length)}/${L.hints.length}`;};
  async function run(){if(busy||!L)return;if(!ed.value.trim()){S.fb('bad','Write your code first!');return;}busy=true;$('[data-a=go]',el).disabled=true;S.fb('info','✨ Running…');
    let r;try{r=await window.__SPELL.runSpell(ed.value,L.tests.map(t=>t[0]));}finally{busy=false;$('[data-a=go]',el).disabled=false;}
    ball.innerHTML=r.out&&r.out.length?r.out.map(l=>`<div>› ${esc(l)}</div>`).join(''):'<span class="muted">(nothing was printed)</span>';
    let ok=false,msg='';
    if(r.timeout)msg='⏳ Your code never finished — a loop is probably running forever. Check that your loop has an end.';
    else if(r.err)msg='💥 '+(window.__SPELL.friendly?window.__SPELL.friendly(r.err):esc(r.err.message));
    else{const i=r.res.findIndex(x=>!x);if(i>=0)msg='❌ Not quite. '+md(L.tests[i][1]);else ok=true;}
    TRACK.attempt(G(),L.id,ok);
    if(ok){S.fb('good','✅ '+(opt.winText||'It works!'));opt.onPass&&opt.onPass(used?1:hints?2:3,ed.value);}
    else{S.fb('bad',msg+'<small style="font-weight:700;display:block;margin-top:6px">Fix it and run again. Stuck? Tap 💡 Hint.</small>');opt.onFail&&opt.onFail();}}
  wireEditor(ed,()=>{},run);addSnips($('.snips',el),ed,()=>{},['(',')','{','}','[',']',';','"','=','+','-','*','<','>','.','!','`','$','=>']);
  $('[data-a=go]',el).onclick=run;$('[data-a=reset]',el).onclick=()=>{ed.value=L.starter||'';S.fb();};
  hintBtn.onclick=()=>{if(!L)return;if(hints<L.hints.length)hints++;label();TRACK.hint(G(),L.id,hints);opt.onHint&&opt.onHint(hints);el.classList.add('has-fb');
    hb.innerHTML=L.hints.slice(0,hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('')+(hints>=L.hints.length?`<div class="h" style="background:#fff;border-style:dashed">That's every hint! Still stuck? Tap 👁 Answer.</div>`:'');};
  $('[data-a=tip]',el).onclick=()=>{if(L){showTip(hb,L.tip);el.classList.add('has-fb');}};
  $('[data-a=answer]',el).onclick=()=>{if(!L)return;used=true;TRACK.answer(G(),L.id);ed.value=L.answer;S.tab('code');el.classList.add('has-fb');hb.innerHTML=`<div class="h a">👁 <b>Here's one correct answer</b> — it's in your code box now. Read it line by line, then press Run.<br><small>(1 star this time. Learning is the real win.)</small></div>`;};
  return{load(lesson,code){L=lesson;hints=0;used=false;busy=false;TRACK.open(G(),L.id);S.task.innerHTML=`<div class="bstory">${L.storyHTML||''}</div>`;S.job(L.job||'');ed.value=code!=null?code:(L.starter||'');ball.innerHTML='<span class="muted">(run your code to see the output)</span>';S.fb();hb.innerHTML='';el.classList.remove('has-fb');label();S.tab(opt.tab||(window.innerWidth<700?'task':'code'));S.fit();},
    ed,studio:S,giveHint(){hintBtn.click();}};
}
