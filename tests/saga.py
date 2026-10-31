import sys,json
from playwright.sync_api import sync_playwright
# usage: saga.py built.html [game]  -> every adventure lesson: answer passes, starter fails, fields present
JS=r'''async(game)=>{const out={};const fr=document.createElement('iframe');fr.setAttribute('sandbox','allow-same-origin');fr.style.cssText='width:420px;height:320px;position:fixed;left:-3000px';document.body.appendChild(fr);
 for(const g in SAGA_DATA){if(game&&g!==game)continue;const ids=new Set();const r=[];let n=0;
  SAGA_DATA[g].chapters.forEach((ch,ci)=>{for(const k of ['id','title','topic','place','intro','outro','enemies','boss','relics'])if(ch[k]==null)r.push('chapter '+ci+' missing '+k);});
  for(const ch of SAGA_DATA[g].chapters){const all=[...(ch.enemies||[]),...((ch.boss&&ch.boss.phases)||[])];
   if((ch.enemies||[]).length<6)r.push(ch.id+' has only '+(ch.enemies||[]).length+' enemies');
   if(!ch.boss||!ch.boss.name||!(ch.boss.phases||[]).length||!ch.boss.intro||!ch.boss.defeat)r.push(ch.id+' boss incomplete');
   if(!ch.relics||ch.relics.length<2)r.push(ch.id+' needs 2+ relics');
   for(const L of all){n++;if(ids.has(L.id))r.push('DUP id '+L.id);ids.add(L.id);
    for(const k of ['id','enemy','type','concept','learn','example','job','mission','answer','tip'])if(!L[k])r.push(L.id+' missing '+k);
    if(!L.hints||L.hints.length<2)r.push(L.id+' <2 hints');
    if(L.type==='js'){const t=(L.tests||[]).map(x=>x[0]);if(!t.length){r.push(L.id+' no tests');continue;}
      const a=await window.__SPELL.runSpell(L.answer,t);const s=await window.__SPELL.runSpell(L.starter||'',t);
      if(a.err||a.timeout||!a.res.every(Boolean))r.push(L.id+' ANSWER FAILS '+JSON.stringify(a.err||a.res));
      if(s.res&&s.res.every(Boolean))r.push(L.id+' STARTER PASSES');}
    else{if(!(L.checks||[]).length){r.push(L.id+' no checks');continue;}
      const a=await runChecksCode(fr,L.answer,L.checks);const s=await runChecksCode(fr,L.starter||' ',L.checks);
      if(!a.ok)r.push(L.id+' ANSWER FAILS: '+a.msg);if(s.ok)r.push(L.id+' STARTER PASSES');}}}
  out[g+' ('+SAGA_DATA[g].chapters.length+' chapters, '+n+' lessons)']=r;}
 return out;}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page();errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+sys.argv[1]);pg.wait_for_timeout(800)
    r=pg.evaluate(JS,sys.argv[2] if len(sys.argv)>2 else None)
    for k,v in r.items():print(k,':',v)
    print('PAGE ERRORS',errs)
