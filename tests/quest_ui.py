import sys
from playwright.sync_api import sync_playwright
html,W=sys.argv[1],int(sys.argv[2])
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':W,'height':820});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto('file://'+html);pg.wait_for_timeout(600)
    pg.evaluate("()=>{APP.show('quest');QUEST._test.start('Ali')}");pg.wait_for_timeout(300)
    ids=pg.evaluate("QUEST._test.CH.map(c=>c.id)");won=0
    for k,i in enumerate(ids[:12]):
        pg.evaluate(f"()=>QUEST._test.wild('{i}')");pg.wait_for_timeout(900)
        if k==0:pg.screenshot(path='/tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/q1b.png')
        pg.click('#bAnswer');pg.wait_for_timeout(100);pg.click('#bAttack')
        for _ in range(50):
            if pg.is_visible('#modal'):break
            pg.wait_for_timeout(100)
        if pg.is_visible('#modal'):won+=1
        for _ in range(4):
            if pg.is_visible('#modal'):pg.click('#modalCard .row .btn.primary');pg.wait_for_timeout(250)
        for _ in range(20):
            if pg.is_visible('#dialog'):pg.click('#dialog');pg.wait_for_timeout(40)
    print('quest1 won',won,'of 12; mode',pg.evaluate("QUEST._test.mode()"),'errors',errs)
