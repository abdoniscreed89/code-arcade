import sys
from playwright.sync_api import sync_playwright
# usage: ovf2.py built.html  -> sideways-scroll check on every screen at 360 and 390 px
html=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (360,390):
        pg=b.new_page(viewport={'width':W,'height':780});errs=[];bad=[]
        pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
        pg.goto('file://'+html);pg.wait_for_timeout(600)
        def ck(tag):
            o=pg.evaluate("document.documentElement.scrollWidth-innerWidth")
            if o>2:bad.append(f'{tag}:{o}')
        for c in pg.evaluate("CATS.map(c=>c.id)"):
            pg.evaluate(f"()=>renderHub('{c}')");pg.wait_for_timeout(120);ck('hub-'+c)
        ids=pg.evaluate("Object.keys(GAMES)")
        for g in ids:
            pg.evaluate(f"()=>APP.show('{g}')");pg.wait_for_timeout(60);ck(g+'-list')
            pg.evaluate(f"()=>GAMES['{g}'].open(0)");pg.wait_for_timeout(140);ck(g+'-L1')
            if g in ('cafe','dungeon','robot','spell','bug','art','grid','pj_quiz','pf_memory'):
                n=pg.evaluate(f"GAMES['{g}'].def.levels.length")
                pg.evaluate(f"()=>GAMES['{g}'].open({n-1})");pg.wait_for_timeout(140);ck(g+'-Llast')
        for w in ('quest','quest2','shadow','rune','rift','profile','report'):
            pg.evaluate(f"()=>APP.show('{w}')");pg.wait_for_timeout(250);ck(w)
        print(W,'overflow:',bad,'errors:',errs,flush=True)
        pg.close()
