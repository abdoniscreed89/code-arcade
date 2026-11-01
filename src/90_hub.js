/* =====================================================================
   HUB — categories, adventures, games, projects, topics, cheat sheet
   ===================================================================== */
let HUBCAT=store.get('code-arcade-hubcat'+SFX,'home')||'home',PROJCAT='all',SHEETQ='';
if(!CATS.some(c=>c.id===HUBCAT))HUBCAT='home';
const pct=(a,b)=>b?Math.round(a/b*100):0;
const tagHTML=cats=>`<div class="tags">${cats.map(c=>{const C=CATS.find(x=>x.id===c);return C?`<span class="tag t-${c}">${C.name}</span>`:'';}).join('')}</div>`;
function gameCard(g){const p=gameProgress(g.id);return `<div class="gcard ${g.kind==='adv'?'adv':''}" data-go="${g.id}" role="button" tabindex="0">${g.ribbon?`<span class="ribbon">${esc(g.ribbon)}</span>`:''}
  <div class="em">${g.em}</div><h3>${esc(g.t)}</h3><p>${esc(g.d)}</p>${tagHTML(g.cats)}<small class="lvlchip">${esc(g.lvl||'')}</small>
  <div class="pbar"><i style="width:${pct(p.done,p.total)}%"></i></div><small class="muted">${esc(p.label)}</small></div>`;}
function projCard(P){const p=GAMES[P.id].progress();const C=PCATS.find(c=>c.id===P.cat)||PCATS[2];
  return `<div class="gcard proj" data-go="${P.id}" role="button" tabindex="0"><div class="em">${P.emoji}</div><h3>${esc(P.title)}</h3><p>${esc(P.blurb||'')}</p>
  <div class="tags"><span class="tag t-proj">${C.em} ${esc(C.name)}</span><span class="tag">${P.steps.length} steps</span></div>
  <div class="pbar"><i style="width:${pct(p.done,p.total)}%"></i></div><small class="muted">${p.done===p.total?'✅ Finished! Open it to download your site.':`${p.done}/${p.total} steps · ⭐ ${p.stars}/${p.max}`}</small></div>`;}
function sec(title,sub,html,cls=''){return html?`<h2 class="hubsec">${title}${sub?`<small>${sub}</small>`:''}</h2><div class="hubgrid ${cls}">${html}</div>`:'';}

function renderHub(cat){
  if(cat)HUBCAT=cat;store.set('code-arcade-hubcat'+SFX,HUBCAT);
  const E=checkAchievements(true),R=rankOf(E.xp);
  /* welcome strip */
  const last=STATS.lastPlay&&(GAMES[STATS.lastPlay.id]||WORLDS[STATS.lastPlay.id])?STATS.lastPlay:null;
  const lastName=last?(GAMEINFO.find(g=>g.id===last.id)||{}).t||(GAMES[last.id]&&GAMES[last.id].def.title)||'':'';
  $('#hubWelcome').innerHTML=`<div class="welcome"><div class="wav">${esc(ME.avatar)}</div><div class="wtxt"><b>Hi ${esc(ME.name)}!</b> <span class="rank">Lv ${R.lv} · ${esc(R.name)}</span>
     <div class="xpbar" title="${E.xp} XP"><i style="width:${pct(E.xp-R.prev,R.next-R.prev)}%"></i></div>
     <small class="muted">⭐ ${E.stars} stars · ✅ ${E.done} levels · 🔥 ${E.streak}-day streak · 🏆 ${Object.keys(STATS.ach||{}).length}/${ACH.length} badges</small></div>
     ${last?`<button class="btn primary" id="hubCont">▶ Continue: ${esc(lastName)}</button>`:`<button class="btn primary" id="hubCont">▶ Start: Codeling Quest</button>`}</div>`;
  $('#hubCont').onclick=()=>APP.show(last?last.id:'quest');
  /* category tabs */
  $('#catTabs').innerHTML=CATS.map(c=>`<button class="${c.id===HUBCAT?'on':''}" data-cat="${c.id}"><span>${c.em}</span> ${esc(c.name)}</button>`).join('');
  $$('#catTabs button').forEach(b=>b.onclick=()=>{renderHub(b.dataset.cat);const t=$('#catTabs');window.scrollTo({top:Math.max(0,t.offsetTop-6),behavior:'smooth'});});
  const on=$('#catTabs .on');if(on)on.scrollIntoView({block:'nearest',inline:'center'});
  const C=CATS.find(c=>c.id===HUBCAT),body=$('#hubBody');let html=C.kid&&HUBCAT!=='home'?`<p class="catkid">${C.em} ${esc(C.kid)}</p>`:'';
  const adv=GAMEINFO.filter(g=>g.kind==='adv'),games=GAMEINFO.filter(g=>g.kind==='game');
  if(HUBCAT==='home'){
    html+=pathHTML();
    html+=sec('🗡️ Story adventures','Be the hero. Every battle is won with real code.',adv.map(gameCard).join(''),'adv');
    html+=sec('🎮 Skill games','Short, focused games — great for practising one skill.',games.map(gameCard).join(''));
    html+=`<h2 class="hubsec">🛠️ Projects <small>Build real websites and apps step by step.</small></h2><div class="hubgrid pcats">${PCATS.map(c=>{const ps=projectList().filter(P=>P.cat===c.id);const d=ps.filter(P=>{const p=GAMES[P.id].progress();return p.done===p.total;}).length;return `<div class="gcard" data-pcat="${c.id}" role="button" tabindex="0"><div class="em">${c.em}</div><h3>${esc(c.name)}</h3><p>${esc(c.d)}</p><small class="muted">${ps.length} projects · ${d} finished</small></div>`;}).join('')}</div>`;
  }else if(['html','css','flex','grid','js'].includes(HUBCAT)){
    html+=sec('🗡️ Adventures with '+C.name,'',adv.filter(g=>g.cats.includes(HUBCAT)).map(gameCard).join(''),'adv');
    html+=sec('🎮 '+C.name+' games','',games.filter(g=>g.cats.includes(HUBCAT)).map(gameCard).join(''));
    const pc={html:['html'],css:['css','web'],flex:['css','web'],grid:['css','web'],js:['js','full']}[HUBCAT];
    let ps=projectList().filter(P=>pc.includes(P.cat));
    if(HUBCAT==='flex')ps=ps.filter(P=>P.steps.some(s=>/display:\s*flex/.test(s.snippet||'')));if(HUBCAT==='grid')ps=ps.filter(P=>P.steps.some(s=>/display:\s*grid/.test(s.snippet||'')));
    html+=sec('🛠️ '+C.name+' projects','',ps.map(projCard).join(''));
    const ts=TOPICS.filter(t=>t.cat===HUBCAT||(HUBCAT==='css'&&['t_debug'].includes(t.id)));
    html+=`<h2 class="hubsec">🔎 ${esc(C.name)} topics <small>Every lesson about one skill, from every game.</small></h2><div class="hubgrid topics">${ts.map(topicCard).join('')}</div>`;
  }else if(HUBCAT==='adv'){html+=sec('','',adv.map(gameCard).join(''),'adv');}
  else if(HUBCAT==='proj'){
    html+=`<div class="subtabs">${[{id:'all',em:'✨',name:'All'}].concat(PCATS).map(c=>`<button class="${PROJCAT===c.id?'on':''}" data-pc="${c.id}">${c.em} ${esc(c.name)} <small>${c.id==='all'?projectList().length:projectList().filter(P=>P.cat===c.id).length}</small></button>`).join('')}</div>`;
    const cats=PROJCAT==='all'?PCATS:PCATS.filter(c=>c.id===PROJCAT);
    for(const c of cats){const ps=projectList().filter(P=>P.cat===c.id);html+=sec(`${c.em} ${esc(c.name)}`,esc(c.d),ps.map(projCard).join(''));}
  }else if(HUBCAT==='topics'){html+=`<div class="hubgrid topics">${TOPICS.map(topicCard).join('')}</div>`;}
  else if(HUBCAT==='sheet'){html+=`<div class="sheetbar"><input class="pinput" id="sheetQ" placeholder="🔎 Search: padding, flex, loop, link, button…" value="${esc(SHEETQ)}" autocomplete="off"></div><div id="sheetRes"></div>`;}
  body.innerHTML=html;
  $$('[data-go]',body).forEach(el=>{const go=()=>APP.show(el.dataset.go);el.onclick=go;el.onkeydown=e=>{if(e.key==='Enter')go();};});
  $$('[data-pcat]',body).forEach(el=>{const go=()=>{PROJCAT=el.dataset.pcat;renderHub('proj');};el.onclick=go;el.onkeydown=e=>{if(e.key==='Enter')go();};});
  $$('[data-pc]',body).forEach(b=>b.onclick=()=>{PROJCAT=b.dataset.pc;renderHub('proj');});
  $$('[data-topic]',body).forEach(el=>{const go=()=>openTopic(el.dataset.topic);el.onclick=go;el.onkeydown=e=>{if(e.key==='Enter')go();};});
  $$('[data-path]',body).forEach(el=>el.onclick=()=>APP.show(el.dataset.path));
  if(HUBCAT==='sheet'){const q=$('#sheetQ');const draw=()=>{SHEETQ=q.value;renderSheet(q.value);};q.oninput=debounce(draw,150);draw();}
  showLastBackup();
}
function pathHTML(){const steps=[['quest','🌿','Codeling Quest','first HTML & CSS'],['rift','🌀','Rift Runner','code builds the world'],['spire','🏙️','Spire City','explore in 3D'],['sword','⚔️','Sword & Script','dungeons & bosses'],['shadow','🗡️','Shadowblade','all of CSS'],['rune','🪓','Runebound','JavaScript'],['proj','🛠️','Projects','build real sites']];
  return `<div class="path"><b>🧭 Not sure where to start?</b> Follow the path:<div class="pathrow">${steps.map(([id,em,t,d],i)=>`${i?'<span class="arrow">→</span>':''}<button class="pstep" ${id==='proj'?'data-cat2="proj"':`data-path="${id}"`}><span>${em}</span><b>${t}</b><small>${d}</small></button>`).join('')}</div></div>`;}
document.addEventListener('click',e=>{const b=e.target.closest('[data-cat2]');if(b)renderHub(b.dataset.cat2);});
function topicCard(t){const L=allLevels().filter(x=>x.topic===t.id),d=L.filter(x=>levelStars(x)>0).length;
  return `<div class="gcard topic" data-topic="${t.id}" role="button" tabindex="0"><div class="em">${t.em}</div><h3>${esc(t.name)}</h3><p>${esc(t.d)}</p><div class="pbar"><i style="width:${pct(d,L.length)}%"></i></div><small class="muted">${d}/${L.length} lessons done</small></div>`;}
function openTopic(tid){const t=TOPICS.find(x=>x.id===tid);const L=allLevels().filter(x=>x.topic===tid);
  const by={};L.forEach(x=>{(by[x.gid]=by[x.gid]||[]).push(x);});
  const name=gid=>{const g=GAMEINFO.find(x=>x.id===gid);if(g)return g.em+' '+g.t;const G=GAMES[gid];return G?G.def.emoji+' '+G.def.title+' (project)':gid;};
  modal(`<h2>${t.em} ${esc(t.name)}</h2><p class="muted" style="margin-top:0">${esc(t.d)} Tap any unlocked lesson to play it.</p>${Object.entries(by).sort((a,b)=>(a[1][0].proj?1:0)-(b[1][0].proj?1:0)).map(([gid,xs])=>`<div class="cxsec">${esc(name(gid))}</div><div class="sgj">${xs.map((x,k)=>{const s=levelStars(x),u=levelUnlocked(x);return `<button class="sgjl ${u?'':'lock'}" data-k="${gid}|${k}" ${u?'':'disabled'}><b>${esc(x.title)}</b>${s?starsHTML(s):`<small>${u?'not done yet':'🔒 locked'}</small>`}</button>`;}).join('')}</div>`).join('')}`,[['Close',null,'primary']]);
  $$('#modalCard .sgjl[data-k]:not([disabled])').forEach(b=>b.onclick=()=>{const[g,k]=b.dataset.k.split('|');closeModal();openLevel(by[g][+k]);});}
function renderSheet(q){const all=cheatSheet();q=(q||'').toLowerCase().trim();const words=q.split(/\s+/).filter(Boolean);
  const hits=all.filter(x=>!words.length||words.every(w=>(x.concept+' '+x.learn+' '+x.example).toLowerCase().includes(w)));
  const byT={};hits.forEach(x=>{(byT[x.topic]=byT[x.topic]||[]).push(x);});
  $('#sheetRes').innerHTML=hits.length?TOPICS.filter(t=>byT[t.id]).map(t=>`<h3 class="hubsec" style="font-size:18px">${t.em} ${esc(t.name)} <small>${byT[t.id].length} ideas</small></h3><div class="sheetgrid">${byT[t.id].slice(0,words.length?60:24).map(x=>`<div class="sheetcard"><b>${esc(x.concept)}</b><div class="lesson">${md(x.learn)}</div><pre class="ex">${esc(x.example)}</pre><small class="muted">from ${esc(x.where)}</small></div>`).join('')}</div>`).join(''):`<p class="muted">No ideas match “${esc(q)}”. Try a shorter word.</p>`;}

/* =====================================================================
   PROFILE
   ===================================================================== */
function renderProfile(){
  const E=checkAchievements(true),R=rankOf(E.xp);let A=null;try{A=REPORT.analyse(PID);}catch(e){}
  const skills=A?A.skills.filter(s=>s.cnt).sort((a,b)=>b.score-a.score):[];
  const ach=ACH.map(([id,em,name,d])=>{const got=STATS.ach&&STATS.ach[id];return `<div class="achv ${got?'on':''}" title="${esc(d)}"><span>${got?em:'🔒'}</span><b>${esc(name)}</b><small>${esc(d)}</small></div>`;}).join('');
  const games=GAMEINFO.map(g=>{const p=gameProgress(g.id);return `<div class="prgrow"><span>${g.em} ${esc(g.t)}</span><div class="pbar"><i style="width:${pct(p.done,p.total)}%"></i></div><small>${pct(p.done,p.total)}%</small></div>`;}).join('');
  const projs=PCATS.map(c=>{const ps=projectList().filter(P=>P.cat===c.id);const d=ps.filter(P=>{const p=GAMES[P.id].progress();return p.done===p.total;}).length;return `<div class="prgrow"><span>${c.em} ${esc(c.name)}</span><div class="pbar"><i style="width:${pct(d,ps.length)}%"></i></div><small>${d}/${ps.length}</small></div>`;}).join('');
  $('#profBody').innerHTML=`<div class="profhead box"><div class="pav">${esc(ME.avatar)}</div><div style="flex:1 1 180px;min-width:0"><h2 style="margin:0">${esc(ME.name)}</h2><div class="rank">Level ${R.lv} · ${esc(R.name)}</div>
      <div class="xpbar big"><i style="width:${pct(E.xp-R.prev,R.next-R.prev)}%"></i></div><small class="muted">${E.xp} XP · ${R.next-E.xp} XP to level ${R.lv+1}</small></div>
      <div class="profbtns"><button class="btn sm" id="profEdit">✏️ Edit</button><button class="btn sm" id="profSwitch">👥 Switch player</button></div></div>
    <div class="kpis">${[['⭐',E.stars,'stars'],['✅',E.done,'levels done'],['🎯',E.three,'perfect levels'],['🛠️',E.projDone+'/'+E.projTotal,'projects built'],['🔥',E.streak,'day streak'],['⏱️',Math.round(E.minutes)+' min','learning time'],['📅',E.daysActive,'days active'],['🤫',E.stealth,'silent takedowns']].map(([e,v,l])=>`<div class="kpi"><span>${e}</span><b>${v}</b><small>${l}</small></div>`).join('')}</div>
    <div class="profcols"><div class="box"><h3>🧩 Skills</h3>${skills.length?skills.map(s=>{const col=s.score>=85?'var(--good)':s.score>=65?'var(--blue)':s.score>=45?'var(--gold)':'var(--bad)';return `<div class="prgrow"><span>${esc(s.name)}</span><div class="pbar"><i style="width:${s.score}%;background:${col}"></i></div><small>${s.score}</small></div>`;}).join(''):'<p class="muted">Play a few levels and your skills will show up here.</p>'}</div>
      <div class="box"><h3>🎮 Games</h3>${games}<h3 style="margin-top:14px">🛠️ Projects</h3>${projs}</div></div>
    <h3 class="hubsec" style="padding:0">🏆 Achievements <small>${Object.keys(STATS.ach||{}).length} of ${ACH.length} unlocked</small></h3><div class="achgrid">${ach}</div>`;
  $('#profEdit').onclick=()=>editPlayer(PID);$('#profSwitch').onclick=openPlayers;
}
WORLDS.profile={enter(){renderProfile();},leave(){}};
$('#profBack').onclick=()=>APP.show('hub');$('#profReport').onclick=()=>APP.show('report');

/* remember the last game played (for the Continue button) and check achievements after wins */
(()=>{const show=APP.show;APP.show=(id,arg)=>{if(id!=='hub'&&id!=='report'&&id!=='profile'&&(GAMES[id]||WORLDS[id])){STATS.lastPlay={id,at:Date.now()};saveStats();}show(id,arg);};})();
(()=>{for(const id in GAMES){const g=GAMES[id],w=g.win;g.win=(i,s)=>{w(i,s);setTimeout(()=>checkAchievements(),1400);};}})();
setInterval(()=>{if(CURRENT!=='hub')checkAchievements();},20000);

/* =====================================================================
   BACKUP: download / load progress (all games, all adventures)
   ===================================================================== */
const BKEY='code-arcade-last-backup'+SFX;
function totalStars(arc){let n=0;for(const k in arc){if(k==='proj'){for(const pr of Object.values(arc.proj||{}))if(pr&&pr.stars)for(const v of Object.values(pr.stars))if(typeof v==='number'&&v>=0&&v<=3)n+=v;continue;}const o=k==='cafe'?(arc.cafe&&arc.cafe.stars)||{}:arc[k];if(o&&typeof o==='object')for(const v of Object.values(o))if(typeof v==='number'&&v>=0&&v<=3)n+=v;}return n;}
function showLastBackup(){const el=$('#lastBackup');if(!el)return;const d=store.get(BKEY,null);el.textContent=d?'Last backup: '+new Date(d).toLocaleString():'No backup downloaded yet.';}
$('#exportProg').onclick=()=>{
  const sagas={};SAGA_IDS.forEach(g=>{sagas[g]=store.get('saga-'+g+'-v1'+SFX,null);});const rift=store.get('rift-v1'+SFX,null),spire=store.get('spire-v1'+SFX,null),sword=store.get('sword-v1'+SFX,null);
  const data={app:'code-arcade',version:4,exportedAt:new Date().toISOString(),profile:{name:ME.name,avatar:ME.avatar},arcade:PROG,quest:store.get(QKEY,null),legends:store.get(Q2KEY,null),sagas,rift,spire,sword,stats:STATS};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='code-arcade-progress-'+(ME.name||'player').replace(/[^a-z0-9]+/gi,'-').toLowerCase()+'-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);
  store.set(BKEY,Date.now());showLastBackup();
  modal('<div class="center"><div style="font-size:48px">💾</div><h3>Backup downloaded!</h3></div><p>Keep the file somewhere safe, like Google Drive, or email it to yourself. If you ever lose your progress, tap <b>Load progress from file</b> and pick it.</p>');
};
$('#importProg').onclick=()=>$('#importFile').click();
$('#importFile').onchange=e=>{
  const f=e.target.files&&e.target.files[0];e.target.value='';if(!f)return;
  const bad=()=>modal('<h3>That file doesn\'t look right 🤔</h3><p>Please pick a progress file you downloaded from Code Arcade. It ends in <b>.json</b> and starts with <b>code-arcade-progress</b>.</p>');
  if(f.size>4e6)return bad();
  const r=new FileReader();
  r.onload=()=>{let d;try{d=JSON.parse(r.result);}catch(_){return bad();}
    if(!d||d.app!=='code-arcade'||!d.arcade||typeof d.arcade!=='object')return bad();
    const when=d.exportedAt?new Date(d.exportedAt).toLocaleString():'an unknown date';
    const q=d.quest&&d.quest.started?`<li>Codeling Quest: <b>${esc(d.quest.name||'trainer')}</b>, ${Object.keys(d.quest.caught||{}).length} Codelings</li>`:'';
    modal(`<h3>Load this backup?</h3><ul style="line-height:1.6">${d.profile&&d.profile.name?`<li>Player: <b>${esc(d.profile.avatar||'')} ${esc(d.profile.name)}</b></li>`:''}<li>Saved: <b>${esc(when)}</b></li><li>Stars earned: <b>⭐ ${totalStars(d.arcade)}</b></li>${q}</ul><p><b>This replaces ${esc(ME.name)}'s progress on this device.</b></p>`,
      [['Cancel',null],['Yes, load it',()=>{
        window._noStatsSave=true;clearTimeout(_stT);
        PROG=cleanProg(d.arcade);saveProg();
        try{if(d.quest)localStorage.setItem(QKEY,JSON.stringify(d.quest));else localStorage.removeItem(QKEY);
          if(d.legends)localStorage.setItem(Q2KEY,JSON.stringify(d.legends));else localStorage.removeItem(Q2KEY);
          SAGA_IDS.forEach(g=>{const k='saga-'+g+'-v1'+SFX,v=d.sagas&&d.sagas[g];if(v&&typeof v==='object')localStorage.setItem(k,JSON.stringify(v));else localStorage.removeItem(k);});
          if(d.sword&&typeof d.sword==='object')localStorage.setItem('sword-v1'+SFX,JSON.stringify(d.sword));else localStorage.removeItem('sword-v1'+SFX);
          if(d.spire&&typeof d.spire==='object')localStorage.setItem('spire-v1'+SFX,JSON.stringify(d.spire));else localStorage.removeItem('spire-v1'+SFX);
          if(d.rift&&typeof d.rift==='object')localStorage.setItem('rift-v1'+SFX,JSON.stringify(d.rift));else localStorage.removeItem('rift-v1'+SFX);
          if(d.stats&&typeof d.stats==='object'&&d.stats.levels)localStorage.setItem(STKEY,JSON.stringify(d.stats));}catch(_){}
        location.reload();},'primary']]);};
  r.onerror=bad;r.readAsText(f);
};
profileChip();$('#playerChip').onclick=openPlayers;$('#openReport').onclick=()=>APP.show('report');$('#openProfile').onclick=()=>APP.show('profile');
$('#resetAll').onclick=()=>modal(`<h3>Reset ${esc(ME.name)}'s progress?</h3><p>This wipes every game for <b>${esc(ME.name)}</b> only (other players are safe). This can't be undone — download a backup first if you're unsure.</p>`,[['Cancel',null],['Yes, reset',()=>{window._noStatsSave=true;clearTimeout(_stT);try{profileKeys(PID).forEach(k=>localStorage.removeItem(k));}catch(e){}location.reload();},'primary']]);
APP.show('hub');
