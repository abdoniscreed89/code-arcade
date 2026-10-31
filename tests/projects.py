import sys,json
from playwright.sync_api import sync_playwright
# usage: projects.py built.html [cat]   -> checks every project step: fails before, passes after, and no JS errors
JS=r'''async(cat)=>{const out={};const f=document.createElement('iframe');f.style.cssText='width:420px;height:400px;position:fixed;left:-3000px';document.body.appendChild(f);
 const ids=new Set();
 for(const P of PK.PROJECTS){if(cat&&P.cat!==cat)continue;PK.prep(P);const r=[];
  if(ids.has(P.id))r.push('DUPLICATE ID');ids.add(P.id);
  for(const k of ['id','emoji','title','cat','mentor','blurb','intro'])if(!P[k])r.push('missing '+k);
  if(P.steps.length<6)r.push('only '+P.steps.length+' steps');
  let code=P.base||'';const sid=new Set();
  for(const S of P.steps){if(sid.has(S.id))r.push(S.id+' dup step id');sid.add(S.id);
   for(const k of ['why','todo','job','snippet','where','tip'])if(!S[k])r.push(S.id+' missing '+k);
   if(!S.hints||S.hints.length<2)r.push(S.id+' <2 hints');
   const o={scripts:P.js};
   const before=await runChecksCode(f,code,S.checks,undefined,o);
   const next=S.apply(code);if(next===code)r.push(S.id+' apply() changed nothing');
   const after=await runChecksCode(f,next,S.checks,undefined,o);
   if(before.ok)r.push(S.id+' PASSES BEFORE the step');
   if(!after.ok)r.push(S.id+' FAILS AFTER: '+after.msg);
   code=next;}
  const a=await renderInto(f,code,undefined,{scripts:P.js});await a.wait(80);if(a.errs.length)r.push('final page JS errors: '+a.errs.join(' | '));
  out[P.id+' ('+P.cat+', '+P.steps.length+' steps)']=r;}
 return out;}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page();errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+sys.argv[1]);pg.wait_for_timeout(800)
    r=pg.evaluate(JS,sys.argv[2] if len(sys.argv)>2 else None)
    bad=0
    for k,v in r.items():
        print(k,':',v);bad+=len(v)
    print('PROJECTS',len(r),'PROBLEMS',bad,'PAGE ERRORS',errs)
