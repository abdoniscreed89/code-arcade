import sys,asyncio,json
from playwright.async_api import async_playwright
JS=r'''async()=>{
 const out={};
 const mk=()=>{const f=document.createElement('iframe');f.setAttribute('sandbox','allow-same-origin');f.style.cssText='width:300px;height:200px;position:fixed;left:-2000px;top:0';document.body.appendChild(f);return f;};
 const fr=mk(),tg=mk(),wide=mk();wide.style.width='520px';wide.style.height='230px';
 const chk=async(list,frame,base)=>{const r=[];for(const c of list){const a=await runChecksCode(frame,c.answer,c.checks,base);const s=await runChecksCode(frame,c.starter||' ',c.checks,base);if(!a.ok||s.ok)r.push(c.id+(a.ok?'':' ANS FAIL:'+a.msg)+(s.ok?' STARTER PASSES':''));}return r;};
 out.quest=await chk(QUEST._test.CH,fr);
 out.bug=await chk(__BUG,fr);out.bugN=__BUG.length;
 out.form=await chk(__FORM,fr);out.formN=__FORM.length;
 out.grid=await chk(__GRID.L,wide,__GRID.FARM_BASE);out.gridN=__GRID.L.length;
 out.gridPhone=await chk(__GRID.L,fr,__GRID.FARM_BASE);
 let r=[];for(const c of __ART.ART){await renderInto(tg,c.target,__ART.ART_BASE);const a=await __ART.compare(c,c.answer,fr,tg);const s=await __ART.compare(c,c.starter,fr,tg);if(!a.ok||s.ok)r.push(c.id+(a.ok?'':' ANS:'+a.msg)+(s.ok?' STARTER PASSES':''));}out.art=r;out.artN=__ART.ART.length;
 r=[];for(const c of __ROOMS.ROOMS){const a=await renderInto(fr,'<div class="room">'+c.markup+'</div>',__ROOMS.ROOM_CSS);const m=__ROOMS.matchSet(a.doc,c.target);const all=__ROOMS.matchSet(a.doc,'*');if(!m||!m.length)r.push(c.id+' NO MATCH');else if(m.length===all.length&&c.target!=='*')r.push(c.id+' matches everything');}out.rooms=r;out.roomsN=__ROOMS.ROOMS.length;
 r=[];let code='';for(const d of __CAFE.DAYS){const before=await runChecksCode(fr,code,d.checks);code=d.apply(code);const a=await runChecksCode(fr,code,d.checks);if(!a.ok||before.ok)r.push(d.id+(a.ok?'':' FAIL:'+a.msg)+(before.ok?' PASSED BEFORE':''));}out.cafe=r;out.cafeN=__CAFE.DAYS.length;
 r=[];let n=0;for(const race of __RACES.RACES)for(const p of race.prompts){n++;const a=await runChecksCode(fr,__RACES.wrap(p,p.ans),p.checks);const e=await runChecksCode(fr,__RACES.wrap(p,' '),p.checks);if(!a.ok||e.ok)r.push(race.id+' '+p.q+' '+(a.ok?'':a.msg)+(e.ok?' EMPTY PASSES':''));}out.racer=r;out.racerN=__RACES.RACES.length+' races/'+n+' prompts';
 r=[];for(const L of __ROBOT.LV){const a=await __ROBOT.runRobot(L.answer,L.grid);const e=await __ROBOT.runRobot('',L.grid);const needOk=!(L.need||[]).some(([re])=>!re.test(L.answer));if(!(a.atGoal&&!a.gemsLeft&&!a.err&&!a.stop)||e.atGoal||!needOk)r.push(L.id+' '+JSON.stringify({g:a.atGoal,l:a.gemsLeft,e:a.err,s:a.stop,needOk}));}out.robot=r;out.robotN=__ROBOT.LV.length;
 r=[];for(const L of __SPELL.S){const t=L.tests.map(x=>x[0]);const a=await __SPELL.runSpell(L.answer,t);const s=await __SPELL.runSpell(L.starter||'',t);if(a.err||!a.res.every(Boolean))r.push(L.id+' ANS '+JSON.stringify(a.err||a.res)+' out='+JSON.stringify(a.out));if(s.res&&s.res.every(Boolean))r.push(L.id+' STARTER PASSES');}
 const inf=await __SPELL.runSpell('while(true){}',['true'],800);r.push('inf:'+(inf.timeout?'caught':'NO'));
 const und=await __SPELL.runSpell('x = 5;',['true']);r.push('undeclared:'+JSON.stringify(und.err));
 out.spell=r;out.spellN=__SPELL.S.length;
 r=[];let qn=0;for(const R of __QUIZ){for(const q of R.qs){qn++;if(q[2].length!==4||new Set(q[2]).size!==4||!q[3])r.push(R.id+' '+q[0]);}if(R.qs.length!==6)r.push(R.id+' has '+R.qs.length);}out.quiz=r;out.quizN=__QUIZ.length+' rounds/'+qn+' qs';
 out.games=Object.keys(GAMES).length;
 return out;}'''
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    pg=await b.new_page(); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto('file://'+sys.argv[1]); await pg.wait_for_timeout(600)
    r=await pg.evaluate(JS)
    for k,v in r.items(): print(k,':',v)
    print('ERRORS',errs)
    await b.close()
asyncio.run(main())
