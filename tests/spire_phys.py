import sys,json
from playwright.sync_api import sync_playwright
# usage: spire_phys.py built.html -> physics sanity checks for Spire City (jump size, climbing, code stairs)
html=sys.argv[1]
JS=r'''async()=>{const T=SPIRE._test;APP.show('spire');T.startLevel('s1');await new Promise(r=>setTimeout(r,500));
 const st=T.state();st.mode;document.querySelectorAll('#g-spire .rfDialog').forEach(()=>{});
 const sim=(sec,fn)=>{for(let i=0;i<sec*120;i++){fn&&fn(i);T.step(1/120);}};const out={};
 const play=()=>{while(T.state().mode==='dialog')document.querySelector('#g-spire .rfDialog').click();};play();
 const P=()=>T.state().player;const set=(k,v)=>T.hold(k,v);
 /* 1: standing jump height and running jump length on open ground (street at z=29..31? use row 25 x 2..17) */
 T.teleport(3.5,0,25.5);T.state().cam.yaw=-Math.PI/2;T.setDyn();
 let maxY=0;T.press('jump');sim(1,()=>{maxY=Math.max(maxY,P().y);});out.jumpH=+maxY.toFixed(2);
 T.teleport(3.5,0,25.5);set('up',true);sim(.6);const x0=P().x;T.press('jump');let air=0;sim(1.2,i=>{if(!P().ground)air++;});const x1=P().x;set('up',false);out.runSpeed=+(x0-3.5).toFixed(2);
 /* measure distance covered in the air */T.teleport(3.5,0,25.5);set('up',true);sim(.5);let start=null,end=null;T.press('jump');sim(1,()=>{const p=P();if(!p.ground&&start==null)start=p.x;if(p.ground&&start!=null&&end==null)end=p.x;});set('up',false);out.jumpLen=+((end||0)-(start||0)).toFixed(2);
 /* 2: climb a building: e block x4..7 z4..8 is 5 m */
 T.teleport(5.5,0,10.5);T.state().cam.yaw=0;set('up',true);let cy=0;sim(3.2,()=>{cy=Math.max(cy,P().y);});set('up',false);out.climbY=+cy.toFixed(2);
 /* 3: code stairs up the plinth */
 for(let i=0;i<3;i++)await T.solve(i);await new Promise(r=>setTimeout(r,1500));T.setDyn();
 T.teleport(29.3,0,17.2);T.state().cam.yaw=-Math.PI/2;set('up',true);let sy=0;sim(4,i=>{if(i%40===0)T.press('jump');sy=Math.max(sy,P().y);});set('up',false);out.stairsMax=+sy.toFixed(2);out.stairsY=+P().y.toFixed(2);out.stairsX=+P().x.toFixed(2);
 /* 4: bridge: walk across the canal at z=26 from x=16 to x=25 */
 T.teleport(16,0,26);T.state().cam.yaw=-Math.PI/2;set('up',true);sim(2.5);set('up',false);out.bridgeX=+P().x.toFixed(2);out.bridgeY=+P().y.toFixed(2);
 /* 5: gate is open: walk east through x=26 at z=16.5 */
 T.teleport(24.5,0,16.5);set('up',true);sim(1.5);set('up',false);out.gateX=+P().x.toFixed(2);
 /* 6: climb the tower from the plinth: tower x31..32 z12..13 (22 m) */
 T.teleport(31.5,6,15.2);T.state().cam.yaw=0;set('up',true);sim(9);set('up',false);out.towerY=+P().y.toFixed(2);out.won=T.state().won;
 return out;}'''
# 7: D5 keep lift (CSS animation): Kai stands on it at the bottom, is carried up, walks off onto the plinth
LIFT=r'''async()=>{const T=SPIRE._test;await new Promise(r=>setTimeout(r,4500));/* let the D1 win sequence finish */
 while(T.state().mode==='dialog')document.querySelector('#g-spire .rfDialog').click();if(typeof closeModal==='function')closeModal();T.startLevel('s5');await new Promise(r=>setTimeout(r,500));
 while(T.state().mode==='dialog')document.querySelector('#g-spire .rfDialog').click();
 for(let i=0;i<5;i++)await T.solve(i);await new Promise(r=>setTimeout(r,1500));
 const Z=T.state().ZONES[4],box=()=>T.dyn().find(b=>b.zone===Z),fr=()=>new Promise(r=>requestAnimationFrame(r)),P=()=>T.state().player;
 for(let i=0;i<2000&&Z.ft<1;i++)await fr();await new Promise(r=>setTimeout(r,300));
 for(let i=0;i<2000&&!(box()&&box().y1<.4);i++)await fr();
 const b=box(),cx=(b.x0+b.x1)/2,cz=(b.z0+b.z1)/2,F={s:[0,1],n:[0,-1],e:[1,0],w:[-1,0]}[Z.face||'s'];T.teleport(cx,b.y1,cz);Object.assign(P(),{ground:true,on:b.key});T.state().cam.yaw=Math.atan2(F[0],F[1]);/* walk away from the viewer, onto the plinth */
 const off=()=>-((P().x-cx)*F[0]+(P().z-cz)*F[1]);
 let maxY=0,walk=false;const t0=performance.now(),mode0=T.state().mode;
 while(performance.now()-t0<9000){await fr();maxY=Math.max(maxY,P().y);if(!walk&&box().y1>8.1){walk=true;T.hold('up',true);}if(walk&&off()>1.6)break;}
 T.hold('up',false);for(let i=0;i<10;i++)await fr();return{mode:mode0,maxY:+maxY.toFixed(2),endY:+P().y.toFixed(2),off:+off().toFixed(2)};}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':800});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto('file://'+html);pg.wait_for_timeout(700)
    has_s5=pg.evaluate("SPIRE._test.allLevels().some(L=>L.id==='s5')")
    r=pg.evaluate(JS);print(json.dumps(r));print('errors',errs)
    lift=pg.evaluate(LIFT) if has_s5 else None
    if lift is not None:print('lift',json.dumps(lift))
    bad=[]
    if not 1.3<=r['jumpH']<=1.5:bad.append('jump height')
    if r['climbY']<4.9:bad.append('climb')
    if r['stairsMax']<5.9:bad.append('code stairs')
    if r['bridgeX']<24 or r['bridgeY']<-.1:bad.append('bridge')
    if r['gateX']<27:bad.append('gate')
    if r['towerY']<21.9:bad.append('tower climb')
    if lift is not None and not (lift['maxY']>=7.9 and lift['endY']>=7.9 and lift['off']>1.5):bad.append('lift ride (D5 keep lift)')
    print('PHYSICS PROBLEMS',bad)
