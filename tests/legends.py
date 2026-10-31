import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page();errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+sys.argv[1]+'');pg.wait_for_timeout(1000)
    r=pg.evaluate("""async()=>{const out=[];const fr=document.createElement('iframe');fr.setAttribute('sandbox','allow-same-origin');fr.style.cssText='width:800px;height:600px';document.body.appendChild(fr);
     for(const c of QUEST2._test.ALL){
       if(c.type==='js'){const a=await window.__SPELL.runSpell(c.answer,c.tests.map(t=>t[0]));const s=await window.__SPELL.runSpell(c.starter,c.tests.map(t=>t[0]));
         const ok=!a.err&&!a.timeout&&a.res.every(x=>x);const sf=s.err||s.timeout||s.res.some(x=>!x);if(!ok||!sf)out.push([c.id,'js',ok,sf,a.err||'',JSON.stringify(a.res),JSON.stringify(a.out)]);}
       else{const a=await runChecksCode(fr,c.answer,c.checks,BASE_CSS);const s=await runChecksCode(fr,c.starter,c.checks,BASE_CSS);if(!a.ok||s.ok)out.push([c.id,a.ok,a.msg||'',s.ok]);}
       if(!c.hints||c.hints.length<2||!c.tip||!c.learn||!c.example||!c.mission)out.push([c.id,'missing',(c.hints||[]).length,!!c.tip,!!c.learn,!!c.example,!!c.mission]);}
     return out;}""")
    for x in r:print(x)
    print('fails',len(r),errs)
