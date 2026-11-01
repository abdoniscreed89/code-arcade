import sys,json
from playwright.sync_api import sync_playwright
# usage: sword_play.py built.html -> runtime checks on Dungeon 1: bridge, switch door, sword, key door, boss door, crystal
html=sys.argv[1]
JS=r'''async()=>{const T=SWORD._test;APP.show('sword');T.startLevel('k1');await new Promise(r=>setTimeout(r,400));
 while(T.state().mode==='dialog')document.querySelector('#g-sword .rfDialog').click();
 const sim=(sec,fn)=>{for(let i=0;i<sec*120;i++){fn&&fn(i);T.step(1/120);}};const H=()=>T.state().hero;const out={};
 for(let i=0;i<3;i++)out['solve'+i]=await T.solve(i);await new Promise(r=>setTimeout(r,300));
 /* sword: a slime in room A */ const S=T.state();const sl=S.P.enemies.find(e=>e.kind==='slime');for(let k=0;k<8&&sl.alive;k++){H().inv=99;T.teleport(Math.floor(sl.x/32),Math.floor(sl.y/32));H().x=sl.x-26;H().y=sl.y;H().face='right';T.press('attack');sim(.3);}out.slimeDead=!sl.alive;
 /* bridge in room B (row y=15) */ T.state().P.enemies.forEach(e=>{if(e.kind!=='boss')e.alive=false;});H().inv=99;T.teleport(19,15);T.hold('right',true);sim(1.5);T.hold('right',false);out.bridgeX=+(H().x/32).toFixed(1);out.fell=H().fall>0;
 /* switch door north of room C */ T.teleport(37,13);T.hold('up',true);sim(1.2);T.hold('up',false);out.doorY=+(H().y/32).toFixed(1);
 /* key + locked door */ T.teleport(41,3);sim(.2);out.keys=H().keys;T.teleport(32,5);T.hold('left',true);sim(1.2);T.hold('left',false);out.lockX=+(H().x/32).toFixed(1);
 /* pit bridge in room E (row y=5) */ T.teleport(25,5);T.hold('left',true);sim(1.6);T.hold('left',false);out.pitX=+(H().x/32).toFixed(1);
 /* boss: weaken it, hit it, walk through the boss door to the crystal */ const B=T.state().P.boss;T.teleport(7,6);B.x=7*32+16;B.y=8*32+16;B.hp=1;H().face='down';H().inv=5;T.press('attack');sim(.4);out.bossDead=!B.alive;
 T.teleport(7,4);T.hold('up',true);sim(1.5);T.hold('up',false);out.won=T.state().won;
 /* moving bridges (real time): ride the Sandstone Vault raft west, then the Cloud Citadel lift north */
 const wait=ms=>new Promise(r=>setTimeout(r,ms));const ride=async(id,zi,tx,ty,dir,axis,board,dockFar,dockNear,offAt)=>{T.startLevel(id);await wait(500);while(T.state().mode==='dialog')document.querySelector('#g-sword .rfDialog').click();
   const n=T.state().ZONES.length;for(let i=0;i<n;i++)await T.solve(i);await wait(300);T.state().P.enemies.forEach(e=>e.alive=false);const Z=T.state().ZONES[zi];T.teleport(tx,ty);H().inv=99;
   const pos=()=>Z.show[0]?Z.show[0][axis]:0,hp=()=>H()[axis]/32;let st=0,fell=false;const sgn=dir==='left'||dir==='up'?-1:1;
   for(let k=0;k<400&&st<4;k++){await wait(30);const b=pos();fell=fell||H().fall>0;
     if(st===0&&Math.abs(b-dockNear)<4){T.hold(dir,true);st=1;}else if(st===1&&(hp()-board)*sgn>0){T.hold(dir,false);st=2;}
     else if(st===2&&Math.abs(b-dockFar)<4){T.hold(dir,true);st=3;}else if(st===3&&(hp()-offAt)*sgn>0){T.hold(dir,false);st=4;}}
   T.hold(dir,false);return{at:+hp().toFixed(1),fell,st};};
await wait(1200);while(T.state().mode==='dialog')document.querySelector('#g-sword .rfDialog').click();if(typeof closeModal==='function')closeModal();
 out.raft=await ride('k5',4,26,5,'left','x',24.4,0,192,17.5);
 out.lift=await ride('k6',4,21,9,'up','y',7.4,0,160,2.4);
 return out;}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':800});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto('file://'+html);pg.wait_for_timeout(700)
    r=pg.evaluate(JS);print(json.dumps(r));bad=[]
    if not r['slimeDead']:bad.append('sword')
    if r['bridgeX']<24.5 or r['fell']:bad.append('bridge')
    if r['doorY']>10.6:bad.append('switch door')
    if r['keys']<1 or r['lockX']>29.6:bad.append('key door')
    if r['pitX']>19.6:bad.append('pit bridge')
    if not r['bossDead'] or not r['won']:bad.append('boss/crystal')
    if r['raft']['st']<4 or r['raft']['fell']:bad.append('raft ride (k5)')
    if r['lift']['st']<4 or r['lift']['fell']:bad.append('cloud lift ride (k6)')
    print('PLAY PROBLEMS',bad,'errors',errs)
