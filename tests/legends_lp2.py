from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1100,'height':860});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/me2.html');pg.wait_for_timeout(900)
    T="QUEST2._test";ev=pg.evaluate
    def dlg():
        for i in range(40):
            if pg.is_visible('#lgDialog'):pg.click('#lgDialog');pg.wait_for_timeout(60)
            else:break
    def modalok():
        if pg.is_visible('#modal'):pg.click('#modalCard .row .btn.primary');pg.wait_for_timeout(250)
    pg.click('[data-go=quest2]');pg.wait_for_timeout(300);pg.click('.starter[data-i="2"]');pg.click('#lgNew');pg.wait_for_timeout(300);dlg();modalok()
    # locked gate
    ev(f"()=>{T}.go('meadow',33,10)");pg.wait_for_timeout(300);pg.keyboard.press('ArrowRight');pg.wait_for_timeout(300);pg.keyboard.press('ArrowRight');pg.wait_for_timeout(400)
    print('gate dialog',pg.is_visible('#lgDialog'),pg.inner_text('#lgText'));dlg()
    print('pos',ev(f"()=>[{T}.state().map,{T}.state().x]"))
    # wrong answer -> damage, then potion, scroll, run
    ev(f"()=>{T}.go('meadow',2,10)");pg.wait_for_timeout(200);ev(f"()=>{T}.wild()")
    pg.wait_for_selector('#lgBattle:not(.hidden) .studio');pg.evaluate("()=>{const t=document.querySelector('#lgBattle textarea');t.value='<p>nope</p>'}");pg.click('#lgBattle [data-a=check]');pg.wait_for_timeout(1200)
    print('hp after miss',ev(f"()=>{T}.state().hp"),pg.inner_text('#lgBattle .feedback')[:60])
    pg.click('[data-t=potion]');pg.wait_for_timeout(200);print('potion',pg.inner_text('#lgBattle .bmsg'))
    pg.click('[data-t=scroll]');pg.wait_for_timeout(200);print('scroll',pg.is_visible('.lgb-scroll'),ev(f"()=>{T}.state().bag"))
    pg.click('[data-t=run]');pg.wait_for_timeout(300);dlg();print('mode',ev(f"()=>{T}.mode()"))
    # blackout
    ev(f"()=>{{{T}.state().hp=5}}");ev(f"()=>{T}.wild()");pg.wait_for_selector('#lgBattle:not(.hidden) .studio');pg.evaluate("()=>{document.querySelector('#lgBattle textarea').value='x'}");pg.click('#lgBattle [data-a=check]');pg.wait_for_timeout(1800)
    print('faint modal',pg.is_visible('#modal'));modalok();dlg();print('after blackout',ev(f"()=>[{T}.state().map,{T}.state().hp,{T}.mode()]"))
    # champion
    ev(f"()=>{{const s={T}.state();['meadow','falls','caves','bay','jungle','peaks','volcano'].forEach(r=>s.badges[r]=1);s.visited.castle=1;{T}.hud();}}")
    ev(f"()=>{T}.go('castle',12,9)");pg.wait_for_timeout(300);pg.keyboard.press('ArrowUp');pg.wait_for_timeout(300);pg.keyboard.press('ArrowUp');pg.wait_for_timeout(500)
    dlg()
    for r in range(4):
        pg.wait_for_function("()=>/summons/.test(document.querySelector('#lgBattle .bmsg').textContent)",timeout=8000)
        js=pg.is_visible('#lgBattle [data-a=go]')
        pg.click('#lgBattle [data-a=answer]' if js else '#lgBattle [data-a=answer]');pg.click('#lgBattle [data-a=go]' if js else '#lgBattle [data-a=check]')
        pg.wait_for_timeout(400);print('champ round',r,js,pg.inner_text('#lgBattle .bmsg')[:50])
        if r<3:pg.wait_for_function("()=>!/super effective/.test(document.querySelector('#lgBattle .bmsg').textContent)&&!/fainted/.test(document.querySelector('#lgBattle .bmsg').textContent)",timeout=8000)
    pg.wait_for_selector('#modal:not(.hidden)',timeout=8000);pg.screenshot(path='lc1.png');modalok();dlg()
    pg.wait_for_timeout(300)
    if pg.is_visible('#modal'):pg.screenshot(path='lc2.png');modalok()
    print('champion',ev(f"()=>[{T}.state().champion,{T}.state().hats,{T}.state().xp]"))
    pg.click('#lgMapBtn');pg.wait_for_timeout(200);pg.screenshot(path='lc3.png');pg.click('[data-fly=town]');pg.wait_for_timeout(600);print('fly',ev(f"()=>{T}.state().map"))
    pg.click('#lgBagBtn');pg.wait_for_timeout(200);pg.click('[data-wear=crown]');pg.wait_for_timeout(200);modalok();print('wear',ev(f"()=>{T}.state().look.hat"))
    # reload persistence
    pg.reload();pg.wait_for_timeout(800);pg.click('[data-go=quest2]');pg.wait_for_timeout(300);print('continue',pg.is_visible('#lgCont'));pg.click('#lgCont');pg.wait_for_timeout(400)
    print('restored',ev(f"()=>[{T}.state().champion,{T}.state().map,{T}.mode()]"));pg.screenshot(path='lc4.png')
    print(pg.evaluate("()=>document.querySelector('[data-go=quest2]')?1:0"))
    print(errs)
