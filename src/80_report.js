/* ===================== PLAYERS (profiles) ===================== */
function saveProfiles(){store.set(PKEY,PROFILES);}
function profileChip(){const el=$('#playerChip');if(el)el.innerHTML=`<span class="av">${esc(ME.avatar)}</span><b>${esc(ME.name)}</b> ▾`;}
function openPlayers(){
  modal(`<h2>👤 Who's playing?</h2><p class="muted" style="margin-top:0">Each player has their own progress, stars and report. Tap a name to switch.</p>
   <div class="plist">${PROFILES.list.map(p=>`<div class="prow ${p.id===PID?'on':''}"><span class="av">${esc(p.avatar)}</span><b>${esc(p.name)}${p.id===PID?' <small class="muted">(playing now)</small>':''}</b>
     ${p.id===PID?'':`<button class="btn sm primary" data-sw="${p.id}">Play as</button>`}<button class="btn sm" data-ed="${p.id}" aria-label="Edit ${esc(p.name)}">✏️</button></div>`).join('')}</div>`,
   [['＋ Add player',()=>editPlayer(null)],['Close',null,'primary']]);
  $$('#modalCard [data-sw]').forEach(b=>b.onclick=()=>switchPlayer(b.dataset.sw));
  $$('#modalCard [data-ed]').forEach(b=>b.onclick=()=>editPlayer(b.dataset.ed));
}
function switchPlayer(id){window._noStatsSave=false;clearTimeout(_stT);store.set(STKEY,STATS);PROFILES.current=id;saveProfiles();location.reload();}
function editPlayer(id){
  const p=id?PROFILES.list.find(x=>x.id===id):null;let av=p?p.avatar:AVATARS[PROFILES.list.length%AVATARS.length];
  if(!p&&PROFILES.list.length>=8)return modal('<h3>That\'s a full house!</h3><p>You can have up to 8 players. Delete one to make room.</p>');
  modal(`<h2>${p?'Edit player':'New player'}</h2><label for="pName" style="font-weight:900">Name</label><input id="pName" class="pinput" maxlength="16" autocomplete="off" value="${p?esc(p.name):''}" placeholder="e.g. Zahra">
    <div style="font-weight:900;margin-top:12px">Pick an animal</div><div class="avpick">${AVATARS.map(a=>`<button data-av="${a}" class="${a===av?'on':''}" aria-label="${a}">${a}</button>`).join('')}</div>
    ${p&&PROFILES.list.length>1?`<p style="margin-top:14px"><button class="btn sm ghost" id="pDel" style="color:var(--bad)">🗑️ Delete this player</button></p>`:''}`,
   [['Cancel',openPlayers],[p?'Save':'Create player',null,'primary']]);
  const inp=$('#pName');setTimeout(()=>inp.focus(),50);
  $$('#modalCard [data-av]').forEach(b=>b.onclick=()=>{av=b.dataset.av;$$('#modalCard [data-av]').forEach(x=>x.classList.toggle('on',x===b));});
  const ok=$('#modalCard .row .btn.primary');ok.onclick=()=>{const n=inp.value.trim().slice(0,16);if(!n){inp.style.borderColor='var(--bad)';inp.placeholder='Please type a name';inp.focus();return;}
    if(PROFILES.list.some(x=>x!==p&&x.name.toLowerCase()===n.toLowerCase())){inp.style.borderColor='var(--bad)';inp.value='';inp.placeholder='That name is taken — try another';return;}
    closeModal();
    if(p){p.name=n;p.avatar=av;saveProfiles();ME.name=n;ME.avatar=av;profileChip();openPlayers();return;}
    let k=2;while(PROFILES.list.some(x=>x.id==='p'+k))k++;const np={id:'p'+k,name:n,avatar:av,created:Date.now()};PROFILES.list.push(np);saveProfiles();
    modal(`<div class="center"><div style="font-size:52px">${esc(av)}</div><h3>Welcome, ${esc(n)}!</h3><p>Switch to ${esc(n)} now?</p></div>`,[['Not now',openPlayers],['Play as '+n,()=>switchPlayer(np.id),'primary']]);};
  inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();ok.click();}};
  const del=$('#pDel');if(del)del.onclick=()=>modal(`<h3>Delete ${esc(p.name)}?</h3><p>All of <b>${esc(p.name)}</b>'s progress on this device will be erased. This can't be undone. Download a backup first if unsure.</p>`,
    [['Cancel',()=>editPlayer(id)],['Yes, delete',()=>{try{profileKeys(p.id).forEach(k=>localStorage.removeItem(k));}catch(e){}PROFILES.list=PROFILES.list.filter(x=>x!==p);
      if(p.id===PID){PROFILES.current=PROFILES.list[0].id;saveProfiles();window._noStatsSave=true;clearTimeout(_stT);location.reload();return;}saveProfiles();openPlayers();},'primary']]);
}

/* ===================== PROGRESS REPORT ===================== */
const SKILLS={
 html:{n:'HTML basics',d:'Headings, paragraphs, links, images, lists and buttons.',g:'quest'},
 sem:{n:'Page structure',d:'Meaningful tags like header, nav, main, section and footer.',g:'quest2'},
 form:{n:'Forms & tables',d:'Inputs, labels, buttons, dropdowns and data tables.',g:'form'},
 css:{n:'CSS styling',d:'Colours, fonts, text, borders and backgrounds.',g:'art'},
 sel:{n:'CSS selectors',d:'Choosing exactly which elements to style (.class, #id, child, :hover…).',g:'dungeon'},
 box:{n:'Spacing & sizing',d:'Padding, margin, width, height and the box model.',g:'quest2'},
 lay:{n:'Layout (Flexbox & Grid)',d:'Putting things side by side, in rows, columns and grids.',g:'grid'},
 fx:{n:'Effects & responsive',d:'Hover effects, animation, positioning and phone-friendly design.',g:'quest2'},
 js:{n:'JavaScript',d:'Variables, text, numbers, lists and functions.',g:'spell'},
 logic:{n:'Logic & problem solving',d:'If/else choices, loops and planning steps.',g:'robot'},
 debug:{n:'Debugging',d:'Spotting and fixing mistakes in broken code.',g:'bug'},
 recall:{n:'Speed & recall',d:'Remembering code and typing it quickly and correctly.',g:'racer'},
 theory:{n:'Theory & understanding',d:'Knowing WHY code works — answering questions about it.',g:'quiz'},
 build:{n:'Building whole pages',d:'Putting many skills together into a real website.',g:'pcafe'}
};
const GNAME=new Proxy({},{get:(o,g)=>{const i=(typeof GAMEINFO!=='undefined'?GAMEINFO:[]).find(x=>x.id===g);if(i)return i.em+' '+i.t;const G=GAMES[g];return G?G.def.emoji+' '+G.def.title:undefined;}});
const gorder=()=>['quest','quest2','rift','spire',...SAGA_IDS,...GAMEINFO.filter(g=>g.kind==='game').map(g=>g.id),...PK.PROJECTS.map(P=>P.id)];
function skillsFor(g,L){
  const ch=L.ch||'',t=(L.title||'')+'';
  switch(g){
    case 'quest':{if(L.ch==='r1'||L.ch==='g1')return['html'];if(L.ch==='r2')return /Padd/.test(t)?['box','css']:['css'];if(L.ch==='g2')return /ID/.test(t)?['sel']:/Hover/.test(t)?['fx','sel']:['css'];if(L.ch==='ch')return['build','lay'];return['lay'];}
    case 'quest2':return({meadow:['sem'],falls:['form'],caves:['sel'],bay:['box'],jungle:['lay'],peaks:['fx'],volcano:['js'],castle:['build'],trainer:['theory']})[L.region]||['build'];
    case 'bug':return['debug',/HTML/.test(ch)?'html':/Layout/.test(ch)?'lay':'css'];
    case 'art':return /Layout/.test(ch)?['css','lay']:['css'];
    case 'dungeon':return['sel'];
    case 'cafe':return['build','css'];
    case 'racer':return['recall',/CSS/.test(ch)||/Pro|Champion/.test(ch)?'css':'html'];
    case 'robot':return['logic','js'];
    case 'form':return /Structure/.test(ch)?['sem']:/Exam/.test(ch)?['build','form']:['form'];
    case 'grid':return['lay'];
    case 'spell':return /Choices|Loops/.test(ch)?['js','logic']:['js'];
    case 'quiz':return['theory'];
    case 'shadow':return[['sel','box','css','lay','lay','fx'][L._ch]||'css'];
    case 'rune':return[['js','js','logic','logic','js','js'][L._ch]||'js'];
    case 'spire':return[['html','box','lay','lay','fx','js'][L._w]||'build'];
    case 'rift':return[['html','box','lay','lay','fx','js'][L._w]||'build'];
    default:return['build',L.kind==='js'?'js':L.kind==='css'||/CSS/.test(ch)?'css':'html'];
  }
}
function profileData(pid){
  const sfx=pid==='p1'?'':'::'+pid,live=pid===PID;
  return{profile:PROFILES.list.find(x=>x.id===pid)||ME,prog:live?PROG:cleanProg(store.get('code-arcade-v1'+sfx,{})),quest:store.get('codeling-quest-v1'+sfx,null),
    legends:store.get('codeling-legends-v1'+sfx,null),sagas:Object.fromEntries(SAGA_IDS.map(g=>[g,store.get('saga-'+g+'-v1'+sfx,null)])),rift:store.get('rift-v1'+sfx,null),spire:store.get('spire-v1'+sfx,null),stats:live?STATS:(store.get('code-arcade-stats-v1'+sfx,null)||freshStats())};
}
function collect(D){
  const SL=(D.stats&&D.stats.levels)||{},rows=[];
  const add=(g,L,stars)=>{const r=SL[g+':'+L.id]||null;rows.push({g,id:L.id,title:L.title,ch:L.ch,stars:stars||0,r,skills:skillsFor(g,L)});};
  const q1=QUEST.levels(),qc=(D.quest&&D.quest.caught)||{};
  q1.forEach(L=>{let s=0;if(qc[L.id]){const r=SL['quest:'+L.id];s=r?(r.ans?1:r.h?2:3):2;}add('quest',L,s);});
  const lc=(D.legends&&D.legends.caught)||{};QUEST2.levels().forEach(L=>add('quest2',L,Math.max(0,Math.min(3,+lc[L.id]||0))));
  Object.keys((D.legends&&D.legends.trainers)||{}).forEach(tid=>{const r=SL['quest2:trainer:'+tid];add('quest2',{id:'trainer:'+tid,title:'Trainer quiz battle',region:'trainer'},r&&r.f?2:3);});
  if(window.SPIRE){const sv=(D.spire)||{};SPIRE.lessons().forEach(L=>{add('spire',Object.assign({},L,{title:L._lv.name+' — '+L.concept,_w:L._lv._i}),Math.max(0,Math.min(3,+((sv.zones||{})[L._zid])||0)));});}
  if(window.RIFT){const sv=(D.rift)||{};RIFT.lessons().forEach(L=>{add('rift',Object.assign({},L,{title:L._lv.name+' — '+L.concept,_w:L._lv._w}),Math.max(0,Math.min(3,+((sv.zones||{})[L._zid])||0)));});}
  for(const g of SAGA_IDS){if(!window.SAGAS||!SAGAS[g])continue;const sv=(D.sagas&&D.sagas[g])||{};SAGAS[g]._test.LS.forEach(L=>{const st=(sv.stars&&sv.stars[L.id])||(sv.done&&sv.done[L.id]?2:0);add(g,Object.assign({},L,{title:L.enemy+' — '+L.concept}),Math.max(0,Math.min(3,+st||0)));});}
  for(const g of gorder()){if(SAGA_IDS.includes(g)||g==='quest'||g==='quest2'||g==='rift'||g==='spire')continue;const G=GAMES[g];if(!G)continue;const st=g==='cafe'?(D.prog.cafe.stars||{}):g[0]==='p'&&D.prog.proj?((D.prog.proj[g]||{}).stars||{}):(D.prog[g]||{});
    G.def.levels.forEach(L=>add(g,L,Math.max(0,Math.min(3,+st[L.id]||0))));}
  rows.forEach(x=>{const r=x.r,f=r?(+r.f||0):0;x.tried=x.stars>0||(r&&(r.a>0||r.f>0||r.h>0));
    x.mastery=x.stars?Math.max(x.stars===3?70:x.stars===2?50:25,({3:100,2:75,1:40})[x.stars]-Math.min(25,f*6)):x.tried?20:null;x.fails=f;});
  return rows;
}
function streakOf(days){let n=0;const d=new Date();if(!days[dk(d)]){d.setDate(d.getDate()-1);}while(days[dk(d)]){n++;d.setDate(d.getDate()-1);}return n;}
function dk(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function analyse(D){
  const rows=collect(D),done=rows.filter(x=>x.stars>0),tried=rows.filter(x=>x.tried);
  const sk={};for(const k in SKILLS)sk[k]={k,name:SKILLS[k].n,d:SKILLS[k].d,g:SKILLS[k].g,total:0,done:0,sum:0,cnt:0};
  rows.forEach(x=>x.skills.forEach(s=>{const o=sk[s];if(!o)return;if(x.id.startsWith&&x.id.startsWith('trainer:')){}else o.total++;if(x.stars)o.done++;if(x.mastery!=null){o.sum+=x.mastery;o.cnt++;}}));
  const list=Object.values(sk).map(o=>Object.assign(o,{score:o.cnt?Math.round(o.sum/o.cnt):null,cov:o.total?o.done/o.total:0}));
  const rated=list.filter(o=>o.cnt>=2).sort((a,b)=>b.score-a.score);
  const strengths=rated.filter(o=>o.score>=80).slice(0,3),weak=rated.filter(o=>o.score<65).slice(-3).reverse();
  const SL=Object.values((D.stats&&D.stats.levels)||{}).filter(r=>r&&typeof r==='object');
  const hinted=done.filter(x=>x.r&&x.r.h>0).length,ans=done.filter(x=>x.r&&x.r.ans).length,first=done.filter(x=>x.r&&x.r.ft).length,withRec=done.filter(x=>x.r&&x.r.done).length;
  const days=(D.stats&&D.stats.days)||{},mins=Object.values(days).reduce((a,b)=>a+(+b||0),0);
  const last=SL.reduce((m,r)=>Math.max(m,+r.last||0),0);
  const stuck=rows.filter(x=>!x.stars&&x.fails>=3).sort((a,b)=>b.fails-a.fails).slice(0,6);
  const practise=done.filter(x=>x.stars<3).sort((a,b)=>a.mastery-b.mastery).slice(0,8);
  const games0=gorder().map(g=>{const rs=rows.filter(x=>x.g===g&&!(x.id+'').startsWith('trainer:'));if(!rs.length)return null;const G=GAMES[g];
    return{g,name:GNAME[g]||((G&&G.def.emoji)+' '+(G&&G.def.title)),proj:!!GAMES[g]&&PK.PROJECTS.some(P=>P.id===g),total:rs.length,done:rs.filter(x=>x.stars).length,stars:rs.reduce((a,x)=>a+x.stars,0)};}).filter(Boolean);
  const games=games0.filter(x=>!x.proj).concat(PCATS.map(c=>{const ids=PK.PROJECTS.filter(P=>P.cat===c.id).map(P=>P.id);const gs=games0.filter(x=>x.proj&&ids.includes(x.g));if(!gs.length)return null;
    return{g:'proj-'+c.id,name:'🛠️ Projects · '+c.name,proj:true,total:gs.reduce((a,x)=>a+x.total,0),done:gs.reduce((a,x)=>a+x.done,0),stars:gs.reduce((a,x)=>a+x.stars,0),finished:gs.filter(x=>x.done===x.total).length,count:gs.length};}).filter(Boolean));
  return{rows,done,tried,skills:list,rated,strengths,weak,hinted,ans,first,withRec,days,mins,last,stuck,practise,games,streak:streakOf(days),
    stars:done.reduce((a,x)=>a+x.stars,0),three:done.filter(x=>x.stars===3).length,legends:D.legends};
}
function recs(A,name){
  const out=[];const pct=A.withRec?A.first/A.withRec:0;
  if(!A.done.length)return[`Start with <b>🌿 Codeling Quest</b> — it's the gentlest introduction. Even 15 minutes a day builds real skill.`];
  A.weak.forEach(s=>{const g=SKILLS[s.k].g,gn=GNAME[g]||(GAMES[g]&&GAMES[g].def.title)||g;out.push(`<b>${s.name}</b> needs practice (score ${s.score}). Replay the levels listed below under “Levels to practise”, or try <b>${gn}</b>, which focuses on this skill.`);});
  if(A.done.length>=5&&A.ans/A.done.length>.3)out.push(`${name} reveals the answer often (${A.ans} times). Encourage trying <b>one more hint</b> before tapping “Answer” — the struggle is where learning happens.`);
  else if(A.done.length>=5&&A.hinted/A.done.length>.6)out.push(`${name} uses hints a lot — that's fine early on. Next step: try each level once <b>without</b> a hint, then use hints only if stuck.`);
  if(A.withRec>=5&&pct>=.6)out.push(`${name} gets ${Math.round(pct*100)}% of levels right first time — impressive! They're ready for tougher challenges like <b>🛠️ Projects</b> or <b>🤖 Robot Commander</b>.`);
  if(A.stuck.length)out.push(`A few levels were tried several times without success (see “Stuck on”). Sitting together for 5 minutes on one of these can unlock a lot.`);
  const nextG=A.games.find(g=>!g.proj&&g.done<g.total&&g.done>0)||A.games.find(g=>!g.proj&&g.done===0);if(nextG)out.push(`Next adventure: keep going with <b>${nextG.name}</b> (${nextG.done}/${nextG.total} done).`);
  if(A.streak>=3)out.push(`🔥 ${A.streak}-day streak! Little and often is the best way to learn. Keep it going.`);
  else if(Object.keys(A.days).length>=1)out.push(`Aim for <b>short, regular sessions</b> (15–20 minutes, most days). It beats one long session a week.`);
  return out.slice(0,6);
}
const fmtMin=m=>m<60?Math.round(m)+' min':(Math.floor(m/60)+' h '+Math.round(m%60)+' min');
function reportHTML(D){
  const A=analyse(D),name=D.profile.name||'Player',av=D.profile.avatar||'',now=new Date();
  const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const total=A.rows.filter(x=>!(x.id+'').startsWith('trainer:')).length,doneN=A.done.filter(x=>!(x.id+'').startsWith('trainer:')).length;
  const lvl=s=>s==null?['Not started','#9ca3af']:s>=85?['Excelling','#16a34a']:s>=65?['Doing well','#2563eb']:s>=45?['Getting there','#d97706']:['Needs practice','#dc2626'];
  const bar=(p,col)=>`<div class="bar"><i style="width:${Math.max(0,Math.min(100,p))}%;background:${col}"></i></div>`;
  const chart=(()=>{const W=560,H=150,arr=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);arr.push([d,+A.days[dk(d)]||0]);}
    const mx=Math.max(20,...arr.map(a=>a[1])),bw=W/14;
    return `<svg viewBox="0 0 ${W} ${H+28}" width="100%" role="img" aria-label="Minutes played each day for the last 14 days">${arr.map(([d,m],i)=>{const h=Math.round(m/mx*H);return `<rect x="${i*bw+6}" y="${H-h}" width="${bw-12}" height="${Math.max(h,m?2:0)}" rx="5" fill="#7c5cff"/>${m?`<text x="${i*bw+bw/2}" y="${H-h-4}" font-size="11" text-anchor="middle" fill="#444">${Math.round(m)}</text>`:''}<text x="${i*bw+bw/2}" y="${H+16}" font-size="10" text-anchor="middle" fill="#777">${d.getDate()}/${d.getMonth()+1}</text>`;}).join('')}<line x1="0" y1="${H}" x2="${W}" y2="${H}" stroke="#ddd"/></svg>`;})();
  const skillRows=A.skills.slice().sort((a,b)=>(b.score??-1)-(a.score??-1)).map(s=>{const[l,c]=lvl(s.cnt?s.score:null);
    return `<tr><td><b>${E(s.name)}</b><div class="sm">${E(s.d)}</div></td><td>${s.cnt?bar(s.score,c):'<span class="sm">—</span>'}</td><td><span class="pill" style="background:${c}1a;color:${c}">${l}</span>${s.cnt?`<div class="sm">score ${s.score}/100</div>`:''}</td><td class="sm">${s.done}/${s.total} levels</td></tr>`;}).join('');
  const gameRows=A.games.map(g=>`<tr><td>${E(g.name)}${g.proj?` <span class="sm">(${g.finished}/${g.count} finished)</span>`:''}</td><td>${bar(g.done/g.total*100,g.done===g.total?'#16a34a':'#7c5cff')}</td><td class="sm">${g.done}/${g.total} · ⭐ ${g.stars}/${g.total*3}</td></tr>`).join('');
  const nameOf=x=>`${E(GNAME[x.g]||(GAMES[x.g]&&GAMES[x.g].def.emoji+' '+GAMES[x.g].def.title)||x.g)} — ${E(x.title)}`;
  const recent=A.done.filter(x=>x.r&&x.r.done).sort((a,b)=>b.r.done-a.r.done).slice(0,10);
  const lg=A.legends&&A.legends.started?A.legends:null;
  const card=(t,v,s)=>`<div class="kpi"><div class="v">${v}</div><div class="t">${t}</div>${s?`<div class="sm">${s}</div>`:''}</div>`;
  const firstPct=A.withRec?Math.round(A.first/A.withRec*100):0;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Code Arcade report — ${E(name)}</title><style>
  *{box-sizing:border-box}body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#2a2840;background:#fffdf8;margin:0;padding:22px;line-height:1.5;font-size:15px}
  .wrap{max-width:900px;margin:0 auto}h1{font-size:26px;margin:0}h2{font-size:19px;margin:26px 0 10px;padding-bottom:6px;border-bottom:3px solid #f1ecfb}
  .head{display:flex;gap:14px;align-items:center;background:#fff;border:2px solid #2a2840;border-radius:18px;padding:16px 18px}.head .av{font-size:52px}.sm{color:#6b6880;font-size:12.5px}
  .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:14px}.kpi{background:#fff;border:2px solid #ece8f5;border-radius:14px;padding:12px}.kpi .v{font-size:24px;font-weight:900;color:#7c5cff}.kpi .t{font-weight:800}
  .cols{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:640px){.cols{grid-template-columns:1fr}body{padding:12px}}
  .box{background:#fff;border:2px solid #ece8f5;border-radius:14px;padding:12px 14px}.good{border-color:#bbf7d0;background:#f0fdf4}.warn{border-color:#fed7aa;background:#fff7ed}
  .box ul{margin:6px 0 0;padding-left:20px}table{width:100%;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden}td,th{padding:9px 10px;border-bottom:1px solid #f0edf6;text-align:left;vertical-align:middle}th{font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#6b6880;background:#faf8ff}
  .bar{height:10px;background:#f0edf6;border-radius:9px;overflow:hidden;min-width:90px}.bar i{display:block;height:100%;border-radius:9px}.pill{display:inline-block;font-weight:800;font-size:12px;padding:2px 9px;border-radius:999px;white-space:nowrap}
  .recs li{margin-bottom:6px}.stars{color:#f5b301}.foot{margin-top:28px;color:#6b6880;font-size:12.5px;border-top:2px solid #f1ecfb;padding-top:10px}
  @media print{body{background:#fff;padding:0}.head,.kpi,.box,table{break-inside:avoid}h2{break-after:avoid}}
  </style></head><body><div class="wrap">
  <div class="head"><div class="av">${E(av)}</div><div><h1>${E(name)}'s progress report</h1><div class="sm">Code Arcade · learning HTML, CSS &amp; JavaScript · made ${E(now.toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'}))}</div></div></div>
  ${!A.tried.length?`<div class="box warn" style="margin-top:14px"><b>No activity yet.</b> Once ${E(name)} plays a few levels, this report fills in with strengths, weaknesses and suggestions.</div>`:''}
  <div class="kpis">${card('Levels completed',`${doneN}<span class="sm"> / ${total}</span>`,`${Math.round(doneN/Math.max(1,total)*100)}% of everything`)}${card('Stars earned','⭐ '+A.stars,`${A.three} perfect (3-star) levels`)}${card('Right first try',firstPct+'%',`${A.first} of ${A.withRec} tracked levels`)}${card('Time learning',fmtMin(A.mins),`${Object.keys(A.days).length} day(s) active${A.streak?` · 🔥 ${A.streak}-day streak`:''}`)}</div>
  <h2>🌟 At a glance</h2><div class="cols">
   <div class="box good"><b>💪 Strengths</b>${A.strengths.length?`<ul>${A.strengths.map(s=>`<li><b>${E(s.name)}</b> — score ${s.score}/100</li>`).join('')}</ul>`:`<p class="sm">Not enough data yet — a few more levels will show clear strengths.</p>`}</div>
   <div class="box warn"><b>🎯 Needs more practice</b>${A.weak.length?`<ul>${A.weak.map(s=>`<li><b>${E(s.name)}</b> — score ${s.score}/100</li>`).join('')}</ul>`:`<p class="sm">${A.rated.length?'Nothing stands out as weak — great work!':'Not enough data yet.'}</p>`}</div></div>
  <h2>💡 Suggestions</h2><div class="box"><ul class="recs">${recs(A,E(name)).map(r=>`<li>${r}</li>`).join('')}</ul></div>
  <h2>🧩 Skills</h2><p class="sm" style="margin-top:-4px">Score = how well levels went: stars earned, minus a little for many wrong tries. 85+ excelling · 65+ doing well · 45+ getting there.</p>
  <table><tr><th>Skill</th><th style="width:28%">Score</th><th>Level</th><th>Done</th></tr>${skillRows}</table>
  <h2>🎮 Completion by game</h2><table><tr><th>Game</th><th style="width:35%">Progress</th><th>Done · Stars</th></tr>${gameRows}</table>
  ${lg?`<h2>🐉 Codeling Legends</h2><div class="box">Trainer <b>${E(lg.name)}</b> · <b>${REG_BADGES(lg)}/7</b> gym badges${lg.champion?' · 👑 <b>Codeling Legend!</b>':''} · ${Object.keys(lg.caught||{}).length} Codelings beaten · ${Object.keys(lg.trainers||{}).length} trainers beaten</div>`:''}
  <h2>📌 Levels to practise</h2>${A.practise.length?`<table><tr><th>Level</th><th>Stars</th><th>Why</th></tr>${A.practise.map(x=>`<tr><td>${nameOf(x)}</td><td class="stars">${'★'.repeat(x.stars)}<span style="color:#ddd">${'★'.repeat(3-x.stars)}</span></td><td class="sm">${x.r&&x.r.ans?'Used the answer':x.r&&x.r.h?`Needed ${x.r.h} hint(s)`:''}${x.fails?` · ${x.fails} wrong tr${x.fails===1?'y':'ies'}`:''}</td></tr>`).join('')}</table>`:`<p class="sm">Nothing to redo — every finished level has 3 stars (or none finished yet).</p>`}
  ${A.stuck.length?`<h2>🧱 Stuck on</h2><table><tr><th>Level</th><th>Wrong tries</th></tr>${A.stuck.map(x=>`<tr><td>${nameOf(x)}</td><td>${x.fails}</td></tr>`).join('')}</table>`:''}
  <h2>🧠 Learning habits</h2><div class="cols"><div class="box"><ul>
   <li>Levels finished <b>without any help</b>: <b>${A.done.filter(x=>x.r&&!x.r.h&&!x.r.ans).length}</b></li>
   <li>Levels where hints were used: <b>${A.hinted}</b></li><li>Times the answer was revealed: <b>${A.ans}</b></li>
   <li>Total checks / attempts: <b>${A.rows.reduce((a,x)=>a+((x.r&&x.r.a)||0),0)}</b></li></ul></div>
   <div class="box"><ul><li>Days active: <b>${Object.keys(A.days).length}</b></li><li>Current streak: <b>${A.streak} day(s)</b></li><li>Average per active day: <b>${fmtMin(Object.keys(A.days).length?A.mins/Object.keys(A.days).length:0)}</b></li><li>Last played: <b>${A.last?E(new Date(A.last).toLocaleString()):'—'}</b></li></ul></div></div>
  <h2>📅 Last 14 days <span class="sm">(minutes played)</span></h2><div class="box">${chart}</div>
  ${recent.length?`<h2>✅ Recently completed</h2><table><tr><th>Level</th><th>Stars</th><th>When</th></tr>${recent.map(x=>`<tr><td>${nameOf(x)}</td><td class="stars">${'★'.repeat(x.stars)}</td><td class="sm">${E(new Date(x.r.done).toLocaleDateString())}</td></tr>`).join('')}</table>`:''}
  <h2>👪 For parents &amp; teachers</h2><div class="box"><ul>
   <li><b>Stars:</b> ⭐⭐⭐ = solved with no help · ⭐⭐ = used hints · ⭐ = looked at the answer. Replaying a level for more stars is great practice.</li>
   <li><b>Hints are good.</b> Using hints is how beginners learn. Worry only if the answer is revealed on most levels.</li>
   <li><b>Wrong tries are normal.</b> Real developers get errors all day. Many tries on one level usually means one small idea needs explaining.</li>
   <li><b>Time</b> counts only active minutes (it pauses when nobody touches the screen).</li>
   <li>Older levels played before reports were added may show fewer details (no hint/time data).</li></ul></div>
  <div class="foot">Generated by Code Arcade on this device. Progress is stored only in this browser — download a backup from the Arcade home screen to keep it safe.</div>
  </div></body></html>`;
}
function REG_BADGES(lg){return Object.keys(lg.badges||{}).filter(k=>lg.badges[k]).length;}
let REPORT_PID=PID;
function showReport(){
  const D=profileData(REPORT_PID),html=reportHTML(D);$('#reportFrame').srcdoc=html;
  const sel=$('#repWho');if(sel)sel.value=REPORT_PID;return html;
}
(function(){
  const bar=$('#report .topbar');
  if(PROFILES.list.length>1){const s=document.createElement('select');s.id='repWho';s.className='chip';s.setAttribute('aria-label','Choose player');s.innerHTML=PROFILES.list.map(p=>`<option value="${p.id}">${esc(p.avatar)} ${esc(p.name)}</option>`).join('');s.onchange=()=>{REPORT_PID=s.value;showReport();};bar.insertBefore(s,$('#repDl'));}
  $('#repBack').onclick=()=>APP.show('hub');
  $('#repDl').onclick=()=>{const D=profileData(REPORT_PID),html=reportHTML(D);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));
    a.download='code-arcade-report-'+(D.profile.name||'player').replace(/[^a-z0-9]+/gi,'-').toLowerCase()+'-'+dk(new Date())+'.html';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);
    modal('<div class="center"><div style="font-size:48px">📄</div><h3>Report downloaded!</h3></div><p>Open the file in any browser to view it. To make a PDF, open it and choose <b>Print → Save as PDF</b>.</p>');};
  $('#repPrint').onclick=()=>{try{$('#reportFrame').contentWindow.focus();$('#reportFrame').contentWindow.print();}catch(e){modal('<h3>Printing isn\'t available here</h3><p>Tap <b>Download</b>, open the file, then print it from your browser.</p>');}};
})();
window.REPORT={analyse:pid=>analyse(profileData(pid||PID)),html:pid=>reportHTML(profileData(pid||PID))};


WORLDS.report={enter(){REPORT_PID=PID;showReport();},leave(){}};
