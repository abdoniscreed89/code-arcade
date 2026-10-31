import sys
from playwright.sync_api import sync_playwright
# usage: saga_play.py built.html game [width]  -> plays chapter 1 (all 7 enemies + boss) through the real UI
html,game=sys.argv[1],sys.argv[2];W=int(sys.argv[3]) if len(sys.argv)>3 else 1280
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':W,'height':860});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+html);pg.wait_for_timeout(700)
    T=f"SAGAS.{game}._test";ev=pg.evaluate
    def dlg():
        for i in range(60):
            if pg.is_visible(f'.saga-{game} .sgDialog'):pg.click(f'.saga-{game} .sgDialog');pg.wait_for_timeout(40)
            else:break
    def modalok():
        for i in range(3):
            if pg.is_visible('#modal'):pg.click('#modalCard .row .btn.primary');pg.wait_for_timeout(200)
    ev(f"()=>APP.show('{game}')");pg.wait_for_timeout(300)
    pg.click('.sgTitle [data-x=new]');pg.wait_for_timeout(300);dlg();modalok()
    def solve(shot=None):
        pg.wait_for_selector('.sgBattle:not(.hidden) .studio',timeout=8000);pg.wait_for_timeout(250)
        if shot:pg.screenshot(path=shot)
        pg.click('.sgBattle [data-a=answer]');pg.wait_for_timeout(100)
        btn='.sgBattle [data-a=go]' if pg.is_visible('.sgBattle [data-a=go]') else '.sgBattle [data-a=check]'
        pg.click(btn)
    # spotted test: stand in front of enemy 0 cone
    sp=ev(f"()=>{{const e={T}.enemies()[0];const d={{up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}}[e.dir];return [e.x+d[0]*2,e.y+d[1]*2]}}")
    print('spot pos',sp)
    for k in range(7):
        ev(f"()=>{T}.battle({{kind:{'\"fight\"' if k==0 else '\"takedown\"'},e:{T}.enemies()[{k}]}})")
        solve(f'/tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/sp_{game}_{k}.png' if k in (0,3) else None)
        pg.wait_for_selector('#modal:not(.hidden)',timeout=12000);pg.wait_for_timeout(100);modalok()
    st=ev(f"()=>{{const s={T}.state();return [Object.keys(s.done).length,s.xp,s.sp,s.stealth,{T}.mode()]}}")
    print('after enemies',st)
    gates=ev(f"()=>{T}.enemies().every(e=>e.down)")
    print('all down',gates)
    ev(f"()=>{{{T}.place(1+7*10+3,7);}}");pg.wait_for_timeout(100);print("pre-boss",ev(f"()=>[{T}.mode(),document.querySelector('#modal').className]"));ev(f"()=>{T}.boss()");pg.wait_for_timeout(200);dlg()
    for ph in range(3):
        try:pg.wait_for_function("()=>!document.querySelector('.sgBattle.saga-"+game+"').classList.contains('hidden')",timeout=8000)
        except Exception as ex:print('BOSS FAIL',ev(f"()=>[{T}.mode(),document.querySelector('.saga-{game} .sgDialog').className]"),errs);raise
        solve(f'/tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/sp_{game}_boss.png' if ph==1 else None)
        pg.wait_for_timeout(2600)
    pg.wait_for_timeout(1200);dlg();pg.wait_for_timeout(300);dlg()
    pg.wait_for_selector('#modal:not(.hidden)',timeout=8000);print('end modal:',pg.inner_text('#modalCard h2'))
    pg.screenshot(path=f'/tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/sp_{game}_end.png')
    pg.click('#modalCard .row .btn.primary');pg.wait_for_timeout(600);dlg()
    print('chapter now',ev(f"()=>[{T}.state().ch,{T}.mode(),SAGAS.{game}.progress()]"))
    # spotting: put hero 2 tiles in front of first enemy of chapter 2 and wait
    ev(f"()=>{{const e={T}.enemies()[0];const d={{up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}}[e.dir];{T}.place(e.x+d[0]*1,e.y+d[1]*1);}}");pg.wait_for_timeout(2500);dlg()
    print('spotted ->',pg.is_visible('.sgBattle:not(.hidden)'))
    print('errors',errs)
