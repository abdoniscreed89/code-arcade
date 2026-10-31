from playwright.sync_api import sync_playwright
import sys
W=int(sys.argv[1]) if len(sys.argv)>1 else 1280
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':W,'height':860});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/me2.html');pg.wait_for_timeout(900)
    T="QUEST2._test"
    def ev(js):return pg.evaluate(js)
    def dlg():
        for i in range(40):
            if pg.is_visible('#lgDialog'):pg.click('#lgDialog');pg.wait_for_timeout(60)
            else:break
    def modalok():
        if pg.is_visible('#modal'):pg.click('#modalCard .row .btn.primary');pg.wait_for_timeout(250)
    def ovf(tag):
        o=ev("()=>document.documentElement.scrollWidth-innerWidth")
        if o>0:errs.append(f'overflow {tag} {o}')
    pg.click('[data-go=quest2]');pg.wait_for_timeout(300);ovf('title')
    pg.fill('#lgTName','Ali');pg.click('#lgNew');pg.wait_for_timeout(300)
    dlg();modalok();ovf('world')
    def win_code(shot=None):
        pg.wait_for_selector('#lgBattle:not(.hidden) .lgb-panel .studio',timeout=5000);pg.wait_for_timeout(300)
        if shot:pg.screenshot(path=shot,full_page=False);ovf('battle')
        js=pg.is_visible('#lgBattle [data-a=go]')
        pg.click('#lgBattle [data-a=answer]' if js else '#lgBattle [data-a=answer]');pg.wait_for_timeout(100)
        pg.click('#lgBattle [data-a=go]' if js else '#lgBattle [data-a=check]')
    # meadow wilds
    ev(f"()=>{T}.go('meadow',2,10)");pg.wait_for_timeout(300)
    for i in range(10):
        ev(f"()=>{T}.wild()");win_code('lb1.png' if i==0 else None)
        pg.wait_for_selector('#modal:not(.hidden)',timeout=8000);pg.wait_for_timeout(100)
        if i==0:pg.screenshot(path='lb2.png')
        modalok();
        if pg.is_visible('#modal'):modalok()
    print('caught',ev(f"()=>Object.keys({T}.state().caught).length"),ev(f"()=>{T}.mode()"))
    ev(f"()=>{T}.gym('meadow')");dlg()
    for r in range(3):
        pg.wait_for_function("()=>/sent out/.test(document.querySelector('#lgBattle .bmsg').textContent)",timeout=8000)
        win_code();pg.wait_for_timeout(300);print('round',r,ev(f"()=>{T}.state().gym"),pg.inner_text('#lgBattle .bmsg'))
        pg.wait_for_function("()=>!/sent out/.test(document.querySelector('#lgBattle .bmsg').textContent)",timeout=8000)
    pg.wait_for_selector('#modal:not(.hidden)',timeout=8000);pg.screenshot(path='lb3.png');modalok();dlg();modalok()
    print('badges',ev(f"()=>{T}.state().badges"),ev(f"()=>{T}.mode()"))
    # trainer
    ev(f"()=>{T}.go('meadow',13,6)");pg.wait_for_timeout(300)
    pg.keyboard.down('ArrowUp');pg.wait_for_timeout(120);pg.keyboard.up('ArrowUp');pg.wait_for_timeout(1800);dlg()
    pg.wait_for_selector('#lgBattle:not(.hidden) .opt',timeout=6000);pg.screenshot(path='lb4.png')
    for i in range(12):
        pg.click('#lgBattle .opt:not(:disabled) >> nth=0');pg.wait_for_timeout(700)
        if ev(f"()=>{T}.state().hp")<=0:print('fainted');break
        t=pg.inner_text('#lgBattle .qnext button');pg.click('#lgBattle .qnext button');pg.wait_for_timeout(200)
        if 'Finish' in t:break
    pg.wait_for_timeout(1500);modalok();dlg();modalok()
    print('trainers',ev(f"()=>{T}.state().trainers"),ev(f"()=>{T}.mode()"))
    # js battle
    ev(f"()=>{T}.go('volcano',2,10)");pg.wait_for_timeout(300);ev(f"()=>{T}.wild()");win_code('lb5.png')
    pg.wait_for_selector('#modal:not(.hidden)',timeout=8000);modalok();modalok()
    # shop
    ev(f"()=>{T}.go('town',19,7)");pg.wait_for_timeout(300)
    for k in range(2):pg.keyboard.press('ArrowUp');pg.wait_for_timeout(250)
    pg.wait_for_timeout(300);pg.screenshot(path='lb6.png');print('shopvisible',pg.is_visible('#modal'))
    if pg.is_visible('[data-hat=cap]'):pg.click('[data-hat=cap]');pg.wait_for_timeout(200)
    modalok();print('hat',ev(f"()=>{T}.state().look.hat"),ev(f"()=>{T}.state().coins"))
    ev(f"()=>{T}.go('meadow',8,10)");pg.wait_for_timeout(400);pg.screenshot(path='lb7.png')
    pg.click('#lgDexBtn');pg.wait_for_timeout(300);pg.screenshot(path='lb8.png');modalok()
    pg.click('#lgBack');pg.wait_for_timeout(300)
    pg.click('#openReport');pg.wait_for_timeout(800);ovf('report')
    pg.screenshot(path='lb9.png',full_page=True)
    fr=pg.frame_locator('#reportFrame');print(fr.locator('h1').inner_text())
    print('stats',ev("()=>Object.keys(STATS.levels).length"))
    print(errs)
