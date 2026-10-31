import sys
from playwright.sync_api import sync_playwright
# usage: proj_ui.py built.html width pid1,pid2,...  -> builds each project through the real UI using "Put it in for me"
html,W,ids=sys.argv[1],int(sys.argv[2]),sys.argv[3].split(',')
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':W,'height':860});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
    pg.goto('file://'+html);pg.wait_for_timeout(600)
    for pid in ids:
        pg.evaluate("()=>renderHub('proj')");pg.wait_for_timeout(150)
        pg.click(f'[data-go="{pid}"]');pg.wait_for_timeout(250)
        n=pg.evaluate(f"GAMES['{pid}'].def.levels.length");fails=[]
        sec=f'#g-{pid}'
        pg.click(f'{sec} .lv[data-i="0"]');pg.wait_for_timeout(300)
        for i in range(n):
            o=pg.evaluate("document.documentElement.scrollWidth-innerWidth")
            if o>2:fails.append(f'step{i+1} overflow {o}')
            pg.click(f'{sec} [data-a=answer]');pg.wait_for_timeout(80)
            if pg.locator(f'{sec} [data-add]').count():pg.click(f'{sec} [data-add]')
            pg.wait_for_timeout(120)
            pg.click(f'{sec} [data-a=check]')
            ok=False
            for _ in range(40):
                if pg.is_visible('#modal'):ok=True;break
                pg.wait_for_timeout(100)
            if not ok:
                fails.append(f'step{i+1}: '+pg.inner_text(f'{sec} .st-bar .feedback')[:160]);break
            txt=pg.inner_text('#modalCard')
            btn=pg.locator('#modalCard .row .btn.primary')
            if i<n-1:btn.click();pg.wait_for_timeout(350)
            else:print(pid,'FINAL:',txt.split('\n')[0:2])
        if pg.is_visible('#modal'):pg.click('#modalCard .row .btn:last-child')
        prog=pg.evaluate(f"GAMES['{pid}'].progress()")
        print(pid,'steps',n,'done',prog['done'],'fails',fails,flush=True)
        pg.evaluate("()=>APP.show('hub')")
    print('errors',errs)
