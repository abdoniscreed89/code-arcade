import sys,time
from playwright.sync_api import sync_playwright
# usage: rift_bot.py built.html levelId [width] -> a simple bot holds RIGHT, jumps at gaps/walls, solves terminals with the answer, must reach the portal
html,lid=sys.argv[1],sys.argv[2];W=int(sys.argv[3]) if len(sys.argv)>3 else 1280
BOT=r'''(lid)=>{const T=RIFT._test;APP.show('rift');T.startLevel(lid);
 const st=()=>T.state();window.__bot={t:0,log:[],stuck:0,lastX:0};
 const id=setInterval(async()=>{const S=st();if(S.mode==='dialog'){document.querySelector('.rfDialog').click();return;}
  if(S.won){clearInterval(id);__bot.done=true;return;}
  const p=S.player,P=S.P,TS=32;__bot.t++;
  /* solve any unsolved zone once we are near its terminal */
  for(const Z of S.ZONES){if(!Z.solved&&Math.abs(Z.term.x*TS+16-p.x)<60){await T.solve(Z.i);__bot.log.push('solved '+Z.i);}}
  const tile=(x,y)=>(P.g[Math.floor(y/TS)]||[])[Math.floor(x/TS)]||'.';
  const solidAt=(x,y)=>tile(x,y)==='#'||tile(x,y)==='='||S.ZONES.some(Z=>Z.solved&&Z.show.some(r=>x>=Z.x*TS+r.x&&x<=Z.x*TS+r.x+r.w&&y>=Z.y*TS+r.y-2&&y<=Z.y*TS+r.y+r.h));
  T.hold('right',true);
  const ahead=p.x+28,foot=p.y+p.h+4;
  const gap=p.onGround&&!solidAt(ahead,foot)&&!solidAt(ahead,foot+40);
  const wall=solidAt(p.x+14,p.y+p.h-8)||solidAt(p.x+14,p.y+4);
  if(gap||wall||(p.wall>0&&!p.onGround)){T.press('jump');T.hold('jump',true);}else if(p.onGround)T.hold('jump',false);
  if(Math.abs(p.x-__bot.lastX)<1)__bot.stuck++;else __bot.stuck=0;__bot.lastX=p.x;
  if(__bot.stuck>40){T.press('jump');T.hold('jump',true);__bot.stuck=0;}
 },16);}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':W,'height':800});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto('file://'+html);pg.wait_for_timeout(700)
    pg.evaluate(BOT,lid)
    t0=time.time();done=False
    while time.time()-t0<int(__import__("os").environ.get("BOT_T","60")):
        pg.wait_for_timeout(500)
        if pg.evaluate("window.__bot&&__bot.done"):done=True;break
    st=pg.evaluate("(()=>{const S=RIFT._test.state();return {x:Math.round(S.player.x),y:Math.round(S.player.y),hearts:S.hearts,gems:S.gemsGot,log:__bot.log,mode:S.mode}})()")
    pg.screenshot(path='/tmp/claude-0/-home-claude/f09cf13d-a7ae-5dd7-af98-aa468e084b89/scratchpad/bot_'+lid+'.png')
    print(lid,'WON' if done else 'NOT FINISHED',st,'errors',errs)
