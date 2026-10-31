/* =====================================================================
   RIFT RUNNER — a real-time platformer where your code builds the world.
   Run, jump, wall-jump and dash. When the path is broken, hack a terminal:
   the HTML / CSS / JavaScript you write is laid out by the browser and the
   boxes it makes become REAL platforms you can stand on.
   ===================================================================== */
window.RIFT_DATA=window.RIFT_DATA||{worlds:[]};
(function(){
const TS=32;let VW=640,VH=360;
const PH={g:2400,jump:820,cut:.45,run:250,acc:2600,air:1700,fric:2600,maxFall:880,coyote:.1,buffer:.13,wallSlide:120,wallJumpX:290,dash:620,dashT:.15,spring:1180};
/* the validator uses a safe fraction of the real jump so every level is truly beatable */
const JUMP_H=PH.jump*PH.jump/(2*PH.g); /* ≈140px */
const SAFE_H=JUMP_H*.82, SAFE_SPRING=(PH.spring*PH.spring/(2*PH.g))*.82;
const rng=seed=>{let s=(seed>>>0)||7;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return (s%100000)/100000;};};
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=amt<0?0:255,p=Math.abs(amt);r=Math.round((t-r)*p+r);g=Math.round((t-g)*p+g);b=Math.round((t-b)*p+b);return `rgb(${r},${g},${b})`;}
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,Math.max(0,Math.min(r,w/2,h/2)));else c.rect(x,y,w,h);c.fill();}
function circ(c,x,y,r){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
function ell(c,x,y,rx,ry){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();}

/* ------------------------------------------------------------------ themes (all light & bright) */
const THEMES={
 meadow:{name:'Meadow Isles',sky:['#bfe6ff','#fdf3dc'],sun:'#ffe9a8',far:'#c9e3f2',mid:'#b4dd8f',near:'#8fcc6a',grass:'#7cc95a',grassD:'#5aa83f',dirt:'#f0cf9a',dirtD:'#dcb37a',stone:'#e9dfcf',plank:'#c98a4b',deco:['#ff7aa2','#ffd166','#ffffff','#a78bfa'],code:'#7c5cff'},
 caves:{name:'Crystal Caves',sky:['#efe7ff','#fbe9f4'],sun:'#ffffff',far:'#e3d6fb',mid:'#d4c2f7',near:'#c3acf2',grass:'#b79cf0',grassD:'#9b7ee0',dirt:'#f4eefc',dirtD:'#dfd2f5',stone:'#efe8fb',plank:'#a78bfa',deco:['#f0abfc','#93c5fd','#ffffff','#fde68a'],code:'#ec4899',crystals:1},
 clouds:{name:'Cloud Kingdom',sky:['#d6efff','#fff6fb'],sun:'#fff3b0',far:'#ffffff',mid:'#e6f4ff',near:'#d3ecff',grass:'#ffffff',grassD:'#d9ecff',dirt:'#f2f8ff',dirtD:'#dbe9f8',stone:'#ffffff',plank:'#f9c784',deco:['#fbcfe8','#bae6fd','#fde68a','#ddd6fe'],code:'#0ea5e9',cloudy:1},
 clock:{name:'Clockwork Tower',sky:['#fdeccf','#fff8ec'],sun:'#ffd59e',far:'#f6dcb9',mid:'#ecc99c',near:'#e2b884',grass:'#d4a373',grassD:'#b98552',dirt:'#f7e7cf',dirtD:'#e8cfa9',stone:'#f3e6d3',plank:'#b45309',deco:['#facc15','#fb923c','#ffffff','#fca5a5'],code:'#d97706',gears:1},
 ruins:{name:'Sunset Ruins',sky:['#ffd9c4','#fff1dc'],sun:'#ffb38a',far:'#f9cdb4',mid:'#f2b99a',near:'#e9a585',grass:'#9fd67c',grassD:'#74b453',dirt:'#f6dcc2',dirtD:'#e8c29f',stone:'#f5e6d5',plank:'#c2410c',deco:['#fb7185','#fbbf24','#ffffff','#fdba74'],code:'#e11d48',pillars:1},
 stars:{name:'Starlight Observatory',sky:['#e0e7ff','#fdf4ff'],sun:'#ffffff',far:'#e7e3fd',mid:'#dbd6fb',near:'#cdc6f7',grass:'#a5b4fc',grassD:'#818cf8',dirt:'#f5f3ff',dirtD:'#e2ddfb',stone:'#f8f7ff',plank:'#6366f1',deco:['#fde68a','#f0abfc','#ffffff','#a5f3fc'],code:'#4f46e5',sparkle:1}
};

/* ------------------------------------------------------------------ level parsing */
const SOLID=new Set(['#']),ONEWAY=new Set(['=']);
function parseLevel(L){
  const rows=L.map.map(r=>r.replace(/\s+$/,''));const H=rows.length,W=Math.max(...rows.map(r=>r.length));
  const g=rows.map(r=>(r+'.'.repeat(W-r.length)).split(''));
  const P={W,H,g,anchors:[],gems:[],enemies:[],checkpoints:[],terminals:[],springs:[],start:{x:2,y:H-3},exit:null};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const c=g[y][x];
    if(c==='S'){P.start={x,y};g[y][x]='.';}
    else if(c==='E'){P.exit={x,y};g[y][x]='.';}
    else if(c==='o'){P.gems.push({x:x*TS+16,y:y*TS+16,got:false});g[y][x]='.';}
    else if(c==='s'||c==='b'){P.enemies.push({kind:c==='s'?'slime':'bat',x:x*TS+16,y:y*TS+(c==='s'?TS:16),ox:x*TS+16,oy:y*TS+16,vx:c==='s'?-45:0,alive:true,t:Math.random()*6});g[y][x]='.';}
    else if(c==='C'){P.checkpoints.push({x,y,on:false});g[y][x]='.';}
    else if(c==='T'){P.terminals.push({x,y});g[y][x]='.';}
    else if(c==='B'){P.springs.push({x,y,t:0});g[y][x]='.';}
    else if(c>='1'&&c<='9'){P.anchors[+c-1]={x,y};g[y][x]='.';}}
  P.terminals.sort((a,b)=>a.x-b.x);
  return P;
}
const tileAt=(P,x,y)=>(y<0?'.':(P.g[y]&&P.g[y][x])||(y>=P.H?'.':'#'));

/* ------------------------------------------------------------------ code zones → platforms */
const ZONE_BASE='*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}body{position:relative;font:14px system-ui,sans-serif;color:#2a2840}';
const zf=document.createElement('iframe');zf.setAttribute('sandbox','allow-same-origin');zf.setAttribute('aria-hidden','true');zf.tabIndex=-1;zf.style.cssText='position:fixed;left:-6000px;top:0;border:0;visibility:hidden';
document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(zf));if(document.body)document.body.appendChild(zf);
let zq=Promise.resolve();
function layoutZone(Z,code){
  const job=zq.then(async()=>{
    const L=Z.lesson;zf.style.width=Z.w*TS+'px';zf.style.height=Z.h*TS+'px';
    const a=await renderInto(zf,code,ZONE_BASE,{scripts:!!L.js});if(L.js)await a.wait(40);
    const sel=L.solid||'.platform';let els=[];try{els=a.$$(sel);}catch(e){}
    const rects=els.map(el=>{const r=el.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height,col:a.css(el,'backgroundColor'),rad:parseFloat(a.css(el,'borderTopLeftRadius'))||0,label:(el.textContent||'').trim().slice(0,14)};})
      .map(r=>{const x1=Math.max(0,r.x),y1=Math.max(0,r.y),x2=Math.min(Z.w*TS,r.x+r.w),y2=Math.min(Z.h*TS,r.y+r.h);return Object.assign(r,{x:x1,y:y1,w:x2-x1,h:y2-y1});})
      .filter(r=>r.w>=6&&r.h>=4);
    return{rects,api:a};});
  zq=job.catch(()=>{});return job;
}
async function checkZone(Z,code){const {rects,api}=await layoutZone(Z,code);
  if(Z.lesson.js&&api.errs.length)return{ok:false,rects,msg:'Your JavaScript has an error: `'+String(api.errs[0]).replace(/`/g,"'").slice(0,120)+'`. Check spelling, brackets and quotes.'};
  for(const[fn,msg]of(Z.lesson.checks||[])){let ok=false;try{ok=!!(await fn(api));}catch(e){}if(!ok)return{ok:false,rects,msg};}
  if(!rects.length)return{ok:false,rects,msg:'No platforms appeared! Platforms are elements that match `'+(Z.lesson.solid||'.platform')+'`.'};
  return{ok:true,rects};}

/* ------------------------------------------------------------------ reachability validator (used by tests and the level brief) */
function surfacesOf(P,zonePlats){
  const segs=[];const solidAt=(x,y)=>SOLID.has(tileAt(P,x,y));
  for(let y=0;y<P.H;y++){let run=null;for(let x=0;x<=P.W;x++){const t=x<P.W?P.g[y][x]:'.';const top=(SOLID.has(t)||ONEWAY.has(t))&&!solidAt(x,y-1);
      if(top){if(!run)run={x1:x*TS,y:y*TS,spring:false};run.x2=(x+1)*TS;}else if(run){segs.push(run);run=null;}}}
  P.springs.forEach(s=>segs.push({x1:s.x*TS+4,x2:s.x*TS+28,y:s.y*TS+TS-10,spring:true}));
  (zonePlats||[]).forEach(r=>segs.push({x1:r.x,x2:r.x+r.w,y:r.y,zone:true}));
  return segs.filter(s=>s.x2-s.x1>=8);
}
function reachable(P,zonePlats,opt={}){const F=opt.full?1/.82:1,DF=opt.full?1.25:1;
  const segs=surfacesOf(P,zonePlats);
  const footOf=(tx,ty)=>{const px=tx*TS+16,py=(ty+1)*TS;let best=null;for(const s of segs){if(px>=s.x1-6&&px<=s.x2+6&&s.y>=py-2&&s.y-py<TS*6){if(!best||s.y<best.y)best=s;}}return best;};
  const a=footOf(P.start.x,P.start.y),b=P.exit&&footOf(P.exit.x,P.exit.y);if(!a||!b)return{ok:false,why:!a?'no ground under S':'no ground under E'};
  const tH=(v,dy)=>{const d=v*v-2*PH.g*dy;if(d<0)return -1;return (v+Math.sqrt(d))/PH.g;};
  const can=(A,B)=>{if(A===B)return true;const dy=A.y-B.y; /* + means B is higher */
    const v=A.spring?PH.spring:PH.jump,Hm=(A.spring?SAFE_SPRING:SAFE_H)*F;if(dy>Hm)return false;
    const t=tH(v*0.95,Math.max(dy,-2000));if(t<0)return false;const D=PH.run*t*.8*DF;
    const gap=Math.max(0,B.x1-A.x2,A.x1-B.x2);
    /* overlapping horizontally: need to jump up through (zone/one-way) or step down */
    return gap<=D+(dy<0?Math.min(-dy*.5,TS*2):0);};
  const seen=new Set([a]),q=[a];while(q.length){const s=q.shift();if(s===b)return{ok:true};for(const n of segs)if(!seen.has(n)&&can(s,n)){seen.add(n);q.push(n);}}
  return{ok:false,why:'the exit cannot be reached'};
}

/* ------------------------------------------------------------------ drawing: hero Nova */
const HERO={skin:'#f1c27d',hair:'#5b3a29',suit:'#4f8cff',suit2:'#2f6fe0',scarf:'#ff7a59',boots:'#2a2840'};
function drawHero(c,p,t){
  const s=p.squash||1,face=p.face;c.save();c.translate(Math.round(p.x),Math.round(p.y+p.h));c.scale(face,1);c.scale(1/Math.sqrt(s),s);
  const run=p.onGround&&Math.abs(p.vx)>20,ph=run?(t*0.016*Math.abs(p.vx)/14):0,air=!p.onGround;
  const legA=run?Math.sin(ph)*7:air?(p.vy<0?-5:4):0,legB=run?-Math.sin(ph)*7:air?(p.vy<0?4:-3):0;
  const bob=run?Math.abs(Math.sin(ph))*-1.5:Math.sin(t/420)*-.6;
  /* legs */
  c.fillStyle=HERO.suit2;c.save();c.translate(-3,-12+bob);c.rotate(legA*.06);rr(c,-2.5,0,5,11,2);c.fillStyle=HERO.boots;rr(c,-3,9,7,3,1.5);c.restore();
  c.fillStyle=HERO.suit2;c.save();c.translate(3,-12+bob);c.rotate(legB*.06);rr(c,-2.5,0,5,11,2);c.fillStyle=HERO.boots;rr(c,-3,9,7,3,1.5);c.restore();
  /* body */
  c.fillStyle=HERO.suit;rr(c,-7,-24+bob,14,14,5);c.fillStyle='#ffffff';rr(c,-2,-21+bob,4,8,2);c.fillStyle='#ffd166';circ(c,0,-18+bob,1.6);
  /* arms */
  const arm=run?Math.sin(ph+Math.PI)*8:air?-10:0;c.fillStyle=HERO.suit;c.save();c.translate(0,-21+bob);c.rotate((arm)*.05);rr(c,4,-1,4,9,2);c.fillStyle=HERO.skin;circ(c,6,9,2);c.restore();
  /* head */
  c.fillStyle=HERO.skin;circ(c,1,-32+bob,8.5);
  c.fillStyle=HERO.hair;c.beginPath();c.arc(1,-33+bob,9,Math.PI*1.02,Math.PI*2.05);c.fill();c.fillRect(-8,-34+bob,6,7);
  const pony=Math.sin(t/180)*2+(run?-3:0);c.beginPath();c.moveTo(-6,-36+bob);c.quadraticCurveTo(-15,-34+bob+pony,-13,-26+bob+pony);c.lineTo(-8,-29+bob);c.fill();
  /* eye */
  const blink=(Math.floor(t/90)%46===0);c.fillStyle='#2a2840';if(blink)c.fillRect(4,-32+bob,3,1.2);else{rr(c,4,-34+bob,2.6,4,1.2);}c.fillStyle='rgba(255,120,140,.45)';circ(c,4.5,-28.5+bob,1.6);
  /* goggles band */
  c.fillStyle='#ffd166';c.fillRect(-8,-38+bob,16,2);
  c.restore();
}
function drawScarf(c,p){const pts=p.scarf;if(!pts)return;c.strokeStyle=HERO.scarf;c.lineWidth=4;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)c.lineTo(pts[i].x,pts[i].y);c.stroke();c.lineWidth=2.5;c.strokeStyle=shade(HERO.scarf,.25);c.stroke();}

/* ------------------------------------------------------------------ the game */
const sec=document.createElement('section');sec.className='screen hidden rift';sec.id='g-rift';
sec.innerHTML=`<div class="rfTop"><button class="chip" data-r="back">← Arcade</button><b class="rfTitle pix">RIFT RUNNER</b><span class="rfLevel"></span>
   <span class="rfStats"><span class="chip rfHearts"></span><span class="chip rfGems"></span><button class="chip" data-r="menu">⏸ Menu</button></span></div>
  <div class="rfMain"><div class="rfStageWrap"><div class="rfStage"><canvas class="rfCv" width="1280" height="720" aria-label="Rift Runner game"></canvas>
      <div class="rfBanner pix"></div><div class="rfDialog hidden"><span class="rfWho"></span><span class="rfFace"></span><span class="rfText"></span><span class="more">▼</span></div>
      <button class="rfHack hidden">⌨️ Hack the terminal <kbd>E</kbd></button><div class="rfFlash"></div></div>
    <div class="rfPad"><div class="rfPadL"><button data-k="left" aria-label="Left">◀</button><button data-k="right" aria-label="Right">▶</button></div>
      <div class="rfPadR"><button data-k="dash" class="dash" aria-label="Dash">💨</button><button data-k="jump" class="jump" aria-label="Jump">⤒</button></div></div></div>
   <aside class="rfPanel hidden" aria-label="Code terminal"></aside></div>`;
document.body.insertBefore(sec,$('#modal'));
const mapScr=document.createElement('div');mapScr.className='overlay hidden rfMap';sec.after(mapScr);
const $r=q=>sec.querySelector(q),cv=$r('.rfCv'),ctx=cv.getContext('2d');
const KEY=()=>'rift-v1'+SFX;
const freshSave=()=>({stars:{},gems:{},zones:{},code:{},seenIntro:{},deaths:0,last:null});
let SV=(()=>{const o=store.get(KEY(),null);const f=freshSave();if(!o||typeof o!=='object')return f;for(const k in f)if(o[k]==null||typeof o[k]!==typeof f[k])o[k]=f[k];return o;})();
const saveSV=()=>store.set(KEY(),SV);
const WORLDS_=()=>RIFT_DATA.worlds;
const allLevels=()=>[].concat(...WORLDS_().map((w,wi)=>w.levels.map((L,li)=>Object.assign(L,{_w:wi,_l:li,_theme:w.theme}))));
const levelById=id=>allLevels().find(L=>L.id===id);
const zoneId=(L,i)=>L.id+':z'+i;

let LV=null,P=null,ZONES=[],player=null,cam={x:0,y:0},parts=[],shake=0,mode='map',keys={},pressed={},tAcc=0,lastT=0,STATIC=null,BG=null,timeIn=0,gemsGot=0,dlg=null,activeZone=null,levelHints=0,levelAns=false,respawn=null,hearts=3,inv=0,won=false;

function mkPlayer(x,y){return{x:x*TS+16,y:y*TS+TS-28,w:16,h:28,vx:0,vy:0,face:1,onGround:false,coyote:0,buffer:0,wall:0,dashT:0,canDash:true,squash:1,scarf:null,jumpHeld:false};}
function startLevel(id){
  const L=levelById(id);if(!L)return;mapScr.classList.add('hidden');LV=L;P=parseLevel(L);won=false;
  ZONES=(L.zones||[]).map((z,i)=>({...z,...(P.anchors[i]||{}),i,id:zoneId(L,i),solved:!!SV.zones[zoneId(L,i)],rects:[],show:[],from:null,ft:1,term:P.terminals[i]||{x:z.x-2,y:z.y+z.h-1}}));
  respawn={x:P.start.x,y:P.start.y};player=mkPlayer(P.start.x,P.start.y);hearts=3;inv=0;gemsGot=0;timeIn=0;levelHints=0;levelAns=false;parts=[];
  player.scarf=Array.from({length:7},()=>({x:player.x,y:player.y-20,px:player.x,py:player.y-20}));
  cam.x=Math.max(0,player.x-VW/2);cam.y=Math.max(0,Math.min(P.H*TS-VH,player.y-VH/2));
  STATIC=buildStatic();BG=buildBackground();
  ZONES.forEach(Z=>{const code=Z.solved?(SV.code[Z.id]||Z.lesson.answer):(SV.code[Z.id]||Z.lesson.starter);layoutZone(Z,code).then(r=>{Z.rects=r.rects;Z.show=r.rects.map(x=>({...x}));});});
  mode='play';requestAnimationFrame(fitCanvas);hud();$r('.rfLevel').textContent=`${WORLDS_()[L._w].name} · ${L._l+1}. ${L.name}`;
  banner(L.name.toUpperCase());
  if(L.story&&!SV.seenIntro[L.id]){SV.seenIntro[L.id]=1;saveSV();say(L.story);}
}
/* ---------- static level art ---------- */
function buildStatic(){
  const th=THEMES[LV._theme]||THEMES.meadow,W=P.W*TS,H=P.H*TS;const cn=document.createElement('canvas');cn.width=W*2;cn.height=H*2;const c=cn.getContext('2d');c.scale(2,2);
  const solid=(x,y)=>SOLID.has(tileAt(P,x,y));
  for(let y=0;y<P.H;y++)for(let x=0;x<P.W;x++){const t=P.g[y][x],px=x*TS,py=y*TS,r=rng(hash(LV.id+x+':'+y));
    if(t==='#'){const top=!solid(x,y-1),left=!solid(x-1,y),right=!solid(x+1,y),bot=!solid(x,y+1);
      c.fillStyle=th.dirt;rr(c,px,py,TS,TS,0);
      c.fillStyle=th.dirtD;for(let k=0;k<3;k++)ell(c,px+4+r()*24,py+(top?14:4)+r()*(top?14:24),2+r()*2.5,1.5+r()*1.5);
      if(!top){c.fillStyle='rgba(0,0,0,.035)';c.fillRect(px,py,TS,2);}
      if(left){c.fillStyle='rgba(0,0,0,.05)';c.fillRect(px,py,3,TS);}if(right){c.fillStyle='rgba(255,255,255,.25)';c.fillRect(px+TS-3,py,3,TS);}
      if(bot){c.fillStyle='rgba(0,0,0,.08)';c.fillRect(px,py+TS-4,TS,4);}
      if(top){c.fillStyle=th.grassD;rr(c,px-(left?1:0),py,TS+(left?1:0)+(right?1:0),11,left||right?5:0);c.fillStyle=th.grass;rr(c,px-(left?1:0),py,TS+(left?1:0)+(right?1:0),8,left||right?5:0);
        c.fillStyle=th.grassD;for(let k=0;k<4;k++){const gx=px+3+r()*26;c.beginPath();c.moveTo(gx,py+1);c.lineTo(gx+1.5,py-4-r()*3);c.lineTo(gx+3,py+1);c.fill();}
        if(r()<.35){const col=th.deco[Math.floor(r()*th.deco.length)];const fx=px+6+r()*20;c.fillStyle=th.grassD;c.fillRect(fx,py-6,1.2,6);c.fillStyle=col;circ(c,fx+.6,py-7,2.6);c.fillStyle='#fde68a';circ(c,fx+.6,py-7,.9);}
        if(th.crystals&&r()<.2){c.fillStyle=th.deco[Math.floor(r()*2)];c.beginPath();const cx=px+8+r()*16;c.moveTo(cx,py-12);c.lineTo(cx+4,py);c.lineTo(cx-4,py);c.fill();}}}
    else if(t==='='){c.fillStyle=th.plank;rr(c,px,py,TS,9,3);c.fillStyle=shade(th.plank,.25);c.fillRect(px+2,py+1,TS-4,2);c.fillStyle=shade(th.plank,-.25);c.fillRect(px+(x%2?6:20),py+9,3,7);}
    else if(t==='^'){c.fillStyle='#cbd5e1';for(let k=0;k<4;k++){c.beginPath();c.moveTo(px+k*8,py+TS);c.lineTo(px+k*8+4,py+TS-14);c.lineTo(px+k*8+8,py+TS);c.fill();}c.fillStyle='#ffffff';for(let k=0;k<4;k++){c.beginPath();c.moveTo(px+k*8+2,py+TS-4);c.lineTo(px+k*8+4,py+TS-13);c.lineTo(px+k*8+5,py+TS-4);c.fill();}}
  }
  /* code zone frames */
  return cn;
}
function buildBackground(){const th=THEMES[LV._theme]||THEMES.meadow;const layers=[];
  const mk=(h,col,par,amp,seed,kind)=>{const w=Math.ceil((P.W*TS*par+900)),cn=document.createElement('canvas');cn.width=w;cn.height=h;const c=cn.getContext('2d');const r=rng(seed);c.fillStyle=col;
    if(kind==='hills'){c.beginPath();c.moveTo(0,h);for(let x=0;x<=w;x+=20){c.lineTo(x,h*.35+Math.sin(x/170+seed)*amp+Math.sin(x/61+seed*2)*amp*.35);}c.lineTo(w,h);c.fill();}
    else if(kind==='islands'){for(let x=40;x<w;x+=180+r()*160){const iw=80+r()*120,iy=h*.3+r()*h*.3;c.beginPath();c.moveTo(x,iy);c.quadraticCurveTo(x+iw/2,iy-24-r()*20,x+iw,iy);c.quadraticCurveTo(x+iw*.6,iy+60+r()*40,x+iw*.45,iy+80);c.quadraticCurveTo(x+iw*.3,iy+50,x,iy);c.fill();}}
    else if(kind==='clouds'){c.fillStyle='rgba(255,255,255,.85)';for(let x=0;x<w;x+=140+r()*200){const y=20+r()*h*.45,s=.6+r()*.8;ell(c,x,y,40*s,14*s);ell(c,x+24*s,y-8*s,28*s,16*s);ell(c,x+50*s,y,34*s,12*s);}}
    else if(kind==='pillars'){for(let x=30;x<w;x+=120+r()*120){const ph=60+r()*100;c.fillRect(x,h-ph,26,ph);c.fillRect(x-6,h-ph-8,38,8);}}
    else if(kind==='gears'){for(let x=40;x<w;x+=160+r()*120){const y=h*.3+r()*h*.4,R=24+r()*30;circ(c,x,y,R);for(let k=0;k<10;k++){const a=k*Math.PI/5;c.fillRect(x+Math.cos(a)*R-5,y+Math.sin(a)*R-5,10,10);}c.globalCompositeOperation='destination-out';circ(c,x,y,R*.35);c.globalCompositeOperation='source-over';}}
    layers.push({cn,par,h});};
  mk(VH,null,0,0,1,'none');layers.pop();
  mk(220,th.far,.12,26,hash(LV.id)%9,th.pillars?'pillars':'islands');
  mk(200,'#fff',.22,0,hash(LV.id)%13+3,'clouds');
  if(th.gears)mk(260,shade(th.mid,.1),.3,0,7,'gears');
  mk(150,th.mid,.38,22,hash(LV.id)%17+5,'hills');
  mk(110,th.near,.55,16,hash(LV.id)%23+9,'hills');
  return layers;}

/* ---------- physics ---------- */
const solidTile=(tx,ty)=>SOLID.has(tileAt(P,tx,ty));
function hitSolid(x,y,w,h){const x0=Math.floor((x-w/2)/TS),x1=Math.floor((x+w/2-.01)/TS),y0=Math.floor(y/TS),y1=Math.floor((y+h-.01)/TS);for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++)if(solidTile(tx,ty))return true;return false;}
function platforms(){/* one-way surfaces: '=' tiles + solved code rects (world coords) */const out=[];
  ZONES.forEach(Z=>{if(!Z.solved)return;Z.show.forEach(r=>out.push({x1:Z.x*TS+r.x,x2:Z.x*TS+r.x+r.w,y:Z.y*TS+r.y,zone:Z}));});return out;}
function step(dt){
  const p=player;const L=keys.left,R=keys.right,J=keys.jump,D=pressed.dash;
  timeIn+=dt;if(inv>0)inv-=dt;
  if(pressed.jump)p.buffer=PH.buffer;else p.buffer=Math.max(0,p.buffer-dt);
  if(p.dashT>0){p.dashT-=dt;p.vy=0;if(Math.random()<.8)parts.push({x:p.x,y:p.y+p.h/2,vx:-p.face*30,vy:(Math.random()-.5)*30,life:.35,col:'rgba(79,140,255,.35)',s:10,ghost:true});}
  else{const want=(R?1:0)-(L?1:0),acc=p.onGround?PH.acc:PH.air;
    if(want){p.vx+=want*acc*dt;p.vx=Math.max(-PH.run,Math.min(PH.run,p.vx));p.face=want;}
    else{const f=(p.onGround?PH.fric:PH.air*.5)*dt;p.vx=Math.abs(p.vx)<=f?0:p.vx-Math.sign(p.vx)*f;}
    p.vy+=PH.g*dt;if(!J&&p.vy<0&&p.jumpHeld){p.vy*=PH.cut;p.jumpHeld=false;}
    if(p.wall&&!p.onGround&&p.vy>PH.wallSlide&&((p.wall<0&&L)||(p.wall>0&&R))){p.vy=PH.wallSlide;if(Math.random()<.3)parts.push({x:p.x+p.wall*8,y:p.y+p.h-6,vx:0,vy:-20,life:.3,col:'rgba(255,255,255,.8)',s:3});}
    p.vy=Math.min(p.vy,PH.maxFall);}
  if(D&&p.canDash){p.dashT=PH.dashT;p.canDash=false;p.vx=p.face*PH.dash;shake=Math.max(shake,3);}
  /* jump */
  if(p.buffer>0){if(p.onGround||p.coyote>0){p.vy=-PH.jump;p.jumpHeld=true;p.onGround=false;p.coyote=0;p.buffer=0;p.squash=.7;dust(p.x,p.y+p.h,6);}
    else if(p.wall){p.vy=-PH.jump*.92;p.vx=-p.wall*PH.wallJumpX;p.face=-p.wall;p.jumpHeld=true;p.buffer=0;p.wall=0;dust(p.x,p.y+p.h-8,5);}}
  /* move X */
  let nx=p.x+p.vx*dt;p.wall=0;
  if(hitSolid(nx,p.y,p.w,p.h)){const dir=Math.sign(p.vx);while(!hitSolid(p.x+dir,p.y,p.w,p.h)&&Math.abs(nx-p.x)>.5)p.x+=dir;p.wall=dir;p.vx=0;if(p.dashT>0)p.dashT=0;}else p.x=nx;
  if(!p.wall){if(hitSolid(p.x+1.5,p.y+4,p.w,p.h-10))p.wall=1;else if(hitSolid(p.x-1.5,p.y+4,p.w,p.h-10))p.wall=-1;}
  /* move Y */
  const wasGround=p.onGround;p.onGround=false;let ny=p.y+p.vy*dt;
  if(hitSolid(p.x,ny,p.w,p.h)){const dir=Math.sign(p.vy);while(!hitSolid(p.x,p.y+dir,p.w,p.h)&&Math.abs(ny-p.y)>.5)p.y+=dir;if(dir>0)land(wasGround);p.vy=0;}
  else{let landed=false;if(p.vy>=0){const feet=p.y+p.h,nf=ny+p.h;
      for(const pl of platforms().concat(onewayTiles(p))){if(p.x+p.w/2>pl.x1+1&&p.x-p.w/2<pl.x2-1&&feet<=pl.y+1&&nf>=pl.y){ny=pl.y-p.h;landed=true;break;}}}
    p.y=ny;if(landed){land(wasGround);p.vy=0;}}
  if(p.onGround){p.coyote=PH.coyote;p.canDash=true;}else p.coyote=Math.max(0,p.coyote-dt);
  p.squash+=(1-p.squash)*Math.min(1,dt*12);
  /* springs */
  for(const s of P.springs){const sx=s.x*TS+16,sy=s.y*TS+TS;if(Math.abs(p.x-sx)<16&&p.y+p.h>=sy-12&&p.y+p.h<=sy+2&&p.vy>=0){p.vy=-PH.spring;p.onGround=false;p.jumpHeld=false;s.t=.3;p.squash=.6;burst(sx,sy-10,'#ffd166',10);}}
  /* gems */
  for(const gm of P.gems){if(!gm.got&&Math.abs(gm.x-p.x)<16&&Math.abs(gm.y-(p.y+p.h/2))<20){gm.got=true;gemsGot++;burst(gm.x,gm.y,'#ffd166',14);hud();}}
  /* checkpoints */
  for(const cp of P.checkpoints){if(!cp.on&&Math.abs(cp.x*TS+16-p.x)<20&&Math.abs(cp.y*TS+16-(p.y+p.h/2))<40){cp.on=true;respawn={x:cp.x,y:cp.y};burst(cp.x*TS+16,cp.y*TS,'#4ade80',16);banner('CHECKPOINT');}}
  /* hazards */
  const ftx=Math.floor(p.x/TS),fty=Math.floor((p.y+p.h-2)/TS);if(tileAt(P,ftx,fty)==='^'&&(p.y+p.h)%TS>TS-14)hurt(true);
  if(p.y>P.H*TS+60)hurt(true);
  /* enemies */
  for(const e of P.enemies){if(!e.alive)continue;e.t+=dt;
    if(e.kind==='slime'){e.x+=e.vx*dt;const ahead=Math.floor((e.x+Math.sign(e.vx)*12)/TS),row=Math.floor((e.y-4)/TS);
      if(solidTile(ahead,row)||!(solidTile(ahead,row+1)||ONEWAY.has(tileAt(P,ahead,row+1))))e.vx=-e.vx;}
    else{e.x=e.ox+Math.sin(e.t*1.4)*48;e.y=e.oy+Math.sin(e.t*2.6)*14;}
    const ex=e.x,ey=e.kind==='slime'?e.y-10:e.y,er=e.kind==='slime'?11:10;
    if(Math.abs(ex-p.x)<er+p.w/2&&Math.abs(ey-(p.y+p.h/2))<er+p.h/2){
      if(p.vy>0&&p.y+p.h-ey<er+2){e.alive=false;p.vy=-PH.jump*.72;p.jumpHeld=false;burst(ex,ey,e.kind==='slime'?'#a78bfa':'#f472b6',18);shake=4;}
      else if(p.dashT>0){e.alive=false;burst(ex,ey,'#a78bfa',18);shake=4;}
      else hurt(false,ex);}}
  /* exit */
  if(P.exit&&!won&&Math.abs(P.exit.x*TS+16-p.x)<16&&Math.abs(P.exit.y*TS+TS-(p.y+p.h))<34)finishLevel();
  /* terminal proximity */
  const near=ZONES.find(Z=>!Z.solved&&Math.abs(Z.term.x*TS+16-p.x)<34&&Math.abs(Z.term.y*TS+16-(p.y+p.h/2))<40)||ZONES.find(Z=>Z.solved&&Math.abs(Z.term.x*TS+16-p.x)<24&&Math.abs(Z.term.y*TS+16-(p.y+p.h/2))<40);
  const hb=$r('.rfHack');hb.classList.toggle('hidden',!near);if(near){hb.innerHTML=near.solved?'✏️ Edit this code <kbd>E</kbd>':'⌨️ Hack the terminal <kbd>E</kbd>';hb._z=near;}
  if(pressed.act&&near)openPanel(near);
  /* scarf (verlet) */
  const sc=p.scarf;sc[0].x=p.x-p.face*2;sc[0].y=p.y+p.h-22;
  for(let i=1;i<sc.length;i++){const s=sc[i],vx=(s.x-s.px)*.9,vy=(s.y-s.py)*.9;s.px=s.x;s.py=s.y;s.x+=vx-p.face*(30+Math.abs(p.vx)*.5)*dt*dt*60;s.y+=vy+500*dt*dt+Math.sin(timeIn*9+i)*.08;}
  for(let k=0;k<3;k++)for(let i=1;i<sc.length;i++){const a=sc[i-1],b=sc[i],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,diff=(d-3.4)/d;b.x-=dx*diff;b.y-=dy*diff;}
  pressed={};
}
function animZones(dt){
  ZONES.forEach(Z=>{if(Z.ft<1){Z.ft=Math.min(1,Z.ft+dt*4);const e=1-Math.pow(1-Z.ft,3);Z.show=Z.rects.map((r,i)=>{const f=Z.from&&Z.from[i]||{x:r.x,y:r.y+40,w:r.w,h:r.h};return{...r,x:f.x+(r.x-f.x)*e,y:f.y+(r.y-f.y)*e,w:f.w+(r.w-f.w)*e,h:f.h+(r.h-f.h)*e};});}});
}
function onewayTiles(p){const out=[];const x0=Math.floor((p.x-12)/TS),x1=Math.floor((p.x+12)/TS),y0=Math.floor((p.y+p.h-4)/TS),y1=y0+2;for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++)if(ONEWAY.has(tileAt(P,tx,ty)))out.push({x1:tx*TS,x2:tx*TS+TS,y:ty*TS});return out;}
function land(was){const p=player;p.onGround=true;if(!was&&p.vy>300){p.squash=1.25;dust(p.x,p.y+p.h,8);}}
function dust(x,y,n){for(let i=0;i<n;i++)parts.push({x:x+(Math.random()-.5)*12,y,vx:(Math.random()-.5)*80,vy:-Math.random()*60,life:.45,col:'rgba(214,190,150,.7)',s:3});}
function burst(x,y,col,n){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=60+Math.random()*160;parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,life:.6+Math.random()*.3,col,s:3+Math.random()*2,grav:1});}}
function hurt(fall,ex){if(inv>0&&!fall)return;hearts--;shake=8;SV.deaths++;flash();
  if(hearts<=0||fall){/* back to the last checkpoint — kind, never "game over" */
    if(hearts<=0)hearts=3;const p=player;Object.assign(p,mkPlayer(respawn.x,respawn.y));p.scarf=Array.from({length:7},()=>({x:p.x,y:p.y-20,px:p.x,py:p.y-20}));inv=1.2;
}
  else{inv=1.1;player.vy=-420;player.vx=(player.x<ex?-1:1)*260;}
  hud();saveSV();}
function flash(){const f=$r('.rfFlash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}

/* ---------- render ---------- */
function render(t){
  const th=THEMES[LV._theme]||THEMES.meadow;const c=ctx;c.setTransform(2,0,0,2,0,0);
  /* camera */
  const p=player,look=p.face*50+p.vx*.15;let tx=p.x-VW/2+look,ty=p.y-VH*.55;
  if(activeZone){tx=activeZone.x*TS+activeZone.w*TS/2-VW/2;ty=activeZone.y*TS+activeZone.h*TS/2-VH/2;}
  cam.x+=(tx-cam.x)*.12;cam.y+=(ty-cam.y)*.1;cam.x=Math.max(0,Math.min(P.W*TS-VW,cam.x));cam.y=Math.max(0,Math.min(P.H*TS-VH,cam.y));if(P.W*TS<VW)cam.x=(P.W*TS-VW)/2;
  const sx=shake>0?(Math.random()-.5)*shake:0,sy=shake>0?(Math.random()-.5)*shake:0;shake*=.86;if(shake<.3)shake=0;
  /* sky */
  const g=c.createLinearGradient(0,0,0,VH);g.addColorStop(0,th.sky[0]);g.addColorStop(1,th.sky[1]);c.fillStyle=g;c.fillRect(0,0,VW,VH);
  const sun=c.createRadialGradient(VW*.78,70,6,VW*.78,70,90);sun.addColorStop(0,th.sun);sun.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=sun;c.fillRect(0,0,VW,VH);
  for(const Lr of BG){c.drawImage(Lr.cn,-Math.round(cam.x*Lr.par),Math.round(VH-Lr.h+(P.H*TS-VH-cam.y)*Lr.par*.25));}
  if(th.sparkle){for(let k=0;k<26;k++){const x=(k*97+t*.01)%VW,y=(k*53)%(VH*.6);c.fillStyle=`rgba(255,255,255,${.4+.4*Math.sin(t/300+k)})`;circ(c,x,y,1.4);}}
  c.save();c.translate(-Math.round(cam.x)+sx,-Math.round(cam.y)+sy);
  c.drawImage(STATIC,Math.max(0,cam.x*2-40),Math.max(0,cam.y*2-40),VW*2+80,VH*2+80,Math.max(0,cam.x-20),Math.max(0,cam.y-20),VW+40,VH+40);
  /* code zones */
  ZONES.forEach(Z=>drawZone(c,Z,t,th));
  /* springs, checkpoints, exit, gems, terminals */
  for(const s of P.springs){const x=s.x*TS,y=s.y*TS;s.t=Math.max(0,s.t-.016);const comp=s.t>0?6:0;c.fillStyle='#64748b';rr(c,x+4,y+TS-6,24,6,2);c.strokeStyle='#94a3b8';c.lineWidth=2;c.beginPath();for(let k=0;k<4;k++){c.lineTo(x+8+(k%2)*16,y+TS-8-k*3+comp*k/4);}c.stroke();c.fillStyle='#ff7a59';rr(c,x+3,y+TS-22+comp,26,6,3);}
  for(const cp of P.checkpoints){const x=cp.x*TS+16,y=cp.y*TS+TS;c.fillStyle='#94a3b8';c.fillRect(x-1,y-40,3,40);c.fillStyle=cp.on?'#4ade80':'#e2e8f0';const wv=Math.sin(t/200)*2;c.beginPath();c.moveTo(x+2,y-40+(cp.on?0:20));c.lineTo(x+20,y-34+(cp.on?0:20)+wv);c.lineTo(x+2,y-28+(cp.on?0:20));c.fill();}
  if(P.exit){const x=P.exit.x*TS+16,y=P.exit.y*TS+TS;c.fillStyle='#e7e5e4';rr(c,x-20,y-52,40,52,18);c.fillStyle='#a8a29e';rr(c,x-20,y-52,40,6,3);
    const pg=c.createRadialGradient(x,y-24,2,x,y-24,22);pg.addColorStop(0,'#ffffff');pg.addColorStop(.5,'#c4b5fd');pg.addColorStop(1,'#7c5cff');c.fillStyle=pg;rr(c,x-14,y-46,28,46,13);
    c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=1.5;for(let k=0;k<3;k++){c.beginPath();c.arc(x,y-24,4+k*4,t/300+k,t/300+k+2.2);c.stroke();}}
  for(const gm of P.gems){if(gm.got)continue;const bb=Math.sin(t/260+gm.x)*3;c.save();c.translate(gm.x,gm.y+bb);c.fillStyle='rgba(255,209,102,.25)';circ(c,0,0,12);const sw=Math.abs(Math.cos(t/400+gm.x));c.scale(.4+.6*sw,1);
    c.fillStyle='#ffd166';c.beginPath();c.moveTo(0,-9);c.lineTo(7,-2);c.lineTo(0,9);c.lineTo(-7,-2);c.closePath();c.fill();c.fillStyle='#fff7d6';c.beginPath();c.moveTo(0,-9);c.lineTo(3,-2);c.lineTo(0,2);c.lineTo(-3,-2);c.fill();c.restore();}
  ZONES.forEach(Z=>{const x=Z.term.x*TS+16,y=Z.term.y*TS+TS;c.fillStyle='#e2e8f0';rr(c,x-10,y-30,20,30,4);c.fillStyle='#94a3b8';c.fillRect(x-12,y-4,24,4);
    const col=Z.solved?'#22c55e':th.code;c.fillStyle=col;rr(c,x-8,y-28,16,12,3);c.fillStyle='#fff';c.font='bold 8px monospace';c.textAlign='center';c.fillText(Z.solved?'✓':'</>',x,y-19);
    if(!Z.solved){c.fillStyle=`rgba(124,92,255,${.15+.12*Math.sin(t/200)})`;circ(c,x,y-22,16+Math.sin(t/200)*3);c.fillStyle='#ff7a59';c.font='bold 12px sans-serif';c.fillText('!',x,y-40+Math.sin(t/180)*3);}});
  /* enemies */
  for(const e of P.enemies){if(!e.alive)continue;if(e.kind==='slime'){const sq=1+Math.sin(e.t*8)*.08;c.save();c.translate(e.x,e.y);c.scale(1/sq,sq);c.fillStyle='rgba(0,0,0,.12)';ell(c,0,0,12,3);
      const sg=c.createRadialGradient(-3,-12,2,0,-8,14);sg.addColorStop(0,'#e9d5ff');sg.addColorStop(1,'#a78bfa');c.fillStyle=sg;c.beginPath();c.moveTo(-12,0);c.quadraticCurveTo(-13,-18,0,-19);c.quadraticCurveTo(13,-18,12,0);c.closePath();c.fill();
      c.fillStyle='#2a2840';const d=Math.sign(e.vx)||1;circ(c,-3+d*2,-10,2);circ(c,4+d*2,-10,2);c.fillStyle='#fff';circ(c,-2.5+d*2,-10.6,.7);circ(c,4.5+d*2,-10.6,.7);
      for(let k=0;k<3;k++){c.fillStyle=['#22d3ee','#f472b6','#facc15'][k];c.fillRect(-8+k*6+Math.sin(e.t*9+k)*2,-17-k%2*2,2.5,2.5);}c.restore();}
    else{c.save();c.translate(e.x,e.y);const fl=Math.sin(e.t*16)*6;c.fillStyle='#f9a8d4';c.beginPath();c.moveTo(-4,0);c.quadraticCurveTo(-14,-6-fl,-18,2);c.quadraticCurveTo(-11,0,-4,4);c.fill();c.beginPath();c.moveTo(4,0);c.quadraticCurveTo(14,-6-fl,18,2);c.quadraticCurveTo(11,0,4,4);c.fill();
      c.fillStyle='#f472b6';circ(c,0,0,8);c.fillStyle='#2a2840';circ(c,-3,-1,1.6);circ(c,3,-1,1.6);c.fillStyle='#fff';c.fillRect(-2,3,1.5,2);c.fillRect(.5,3,1.5,2);c.restore();}}
  /* hero */
  if(!(inv>0&&Math.floor(t/80)%2)){drawScarf(c,player);drawHero(c,player,t);}
  /* particles */
  parts=parts.filter(q=>{q.life-=.016;q.x+=q.vx*.016;q.y+=q.vy*.016;if(q.grav)q.vy+=500*.016;if(q.life<=0)return false;c.globalAlpha=Math.max(0,Math.min(1,q.life*2));c.fillStyle=q.col;if(q.ghost){rr(c,q.x-8,q.y-14,16,28,6);}else c.fillRect(q.x-q.s/2,q.y-q.s/2,q.s,q.s);c.globalAlpha=1;return true;});
  c.restore();
  /* soft vignette */
  const vg=c.createRadialGradient(VW/2,VH/2,VH*.4,VW/2,VH/2,VH*.95);vg.addColorStop(0,'rgba(255,255,255,0)');vg.addColorStop(1,'rgba(120,100,160,.12)');c.fillStyle=vg;c.fillRect(0,0,VW,VH);
}
function drawZone(c,Z,t,th){const x0=Z.x*TS,y0=Z.y*TS,w=Z.w*TS,h=Z.h*TS;
  if(!Z.solved){c.save();c.strokeStyle=activeZone===Z?'rgba(124,92,255,.85)':'rgba(124,92,255,.45)';c.lineWidth=2;c.setLineDash([8,6]);c.lineDashOffset=-t/40;rr(c,x0,y0,w,h,10);c.beginPath();if(c.roundRect)c.roundRect(x0,y0,w,h,10);else c.rect(x0,y0,w,h);c.stroke();c.setLineDash([]);
    c.fillStyle='rgba(124,92,255,.05)';c.fillRect(x0,y0,w,h);
    for(let k=0;k<10;k++){const r=rng(hash(Z.id)+k+Math.floor(t/140));c.fillStyle=['rgba(124,92,255,.35)','rgba(236,72,153,.3)','rgba(34,211,238,.35)'][k%3];c.fillRect(x0+r()*w,y0+r()*h,4+r()*10,2+r()*4);}
    c.font='bold 11px sans-serif';c.textAlign='center';c.fillStyle='rgba(91,63,209,.75)';c.fillText(activeZone===Z?'✨ live preview of your code':'⚠ GLITCHED — hack the terminal',x0+w/2,y0+14);c.restore();}
  for(const r of Z.show){const X=x0+r.x,Y=y0+r.y;const col=/rgba?\(0, 0, 0, 0\)|transparent/.test(r.col||'')?th.code:(r.col||th.code);
    c.save();if(!Z.solved){c.globalAlpha=.45;}c.fillStyle='rgba(0,0,0,.1)';rr(c,X+2,Y+4,r.w,r.h,Math.min(r.rad,10));c.fillStyle=col;rr(c,X,Y,r.w,r.h,Math.min(r.rad,10));
    c.fillStyle='rgba(255,255,255,.35)';rr(c,X+3,Y+2,Math.max(0,r.w-6),Math.min(5,r.h/3),3);
    if(Z.solved){c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=1;c.strokeRect(X+.5,Y+.5,r.w-1,r.h-1);}
    else{c.setLineDash([4,3]);c.strokeStyle='rgba(91,63,209,.8)';c.lineWidth=1.5;c.strokeRect(X+.5,Y+.5,r.w-1,r.h-1);c.setLineDash([]);}
    if(r.label&&r.w>30&&r.h>=14){c.fillStyle='rgba(42,40,64,.7)';c.font='bold 9px sans-serif';c.textAlign='center';c.fillText(r.label,X+r.w/2,Y+Math.min(r.h-3,12));}
    c.restore();}
}
/* ---------- loop ---------- */
function loop(t){const dt=Math.min(.05,(t-lastT)/1000||0);lastT=t;
  if(CURRENT==='rift'&&LV&&P){animZones(dt);if(mode==='play'){tAcc+=dt;while(tAcc>=1/120){step(1/120);tAcc-=1/120;}}render(t);}
  requestAnimationFrame(loop);}

/* ---------- HUD, banner, dialog ---------- */
function hud(){if(!LV)return;$r('.rfHearts').innerHTML='❤️'.repeat(Math.max(0,hearts))+'<span style="opacity:.25">'+'❤️'.repeat(Math.max(0,3-hearts))+'</span>';$r('.rfGems').textContent=`💎 ${gemsGot}/${P.gems.length}`;}
let bT;function banner(t){const b=$r('.rfBanner');b.textContent=t;b.classList.add('show');clearTimeout(bT);bT=setTimeout(()=>b.classList.remove('show'),1800);}
function say(lines,done){mode='dialog';const box=$r('.rfDialog');dlg={lines:[].concat(lines),i:0,done};box.classList.remove('hidden');showLine();}
function showLine(){const raw=dlg.lines[dlg.i];const m=/^([A-Z][\w .'-]{1,20}):\s+(.*)$/s.exec(raw);const who=m?m[1]:'',txt=m?m[2]:raw;
  $r('.rfWho').textContent=who;$r('.rfWho').style.display=who?'':'none';$r('.rfFace').textContent=({Nova:'🧑‍🚀',Byte:'🤖',Glitch:'👾'})[who]||'';
  const el=$r('.rfText');let n=0;clearInterval(dlg.tm);el.textContent='';dlg.typing=true;dlg.cur=txt;dlg.tm=setInterval(()=>{n+=2;el.textContent=txt.slice(0,n);if(n>=txt.length){clearInterval(dlg.tm);dlg.typing=false;}},16);}
function advance(){if(!dlg)return;if(dlg.typing){clearInterval(dlg.tm);$r('.rfText').textContent=dlg.cur;dlg.typing=false;return;}dlg.i++;if(dlg.i<dlg.lines.length){showLine();return;}const d=dlg.done;dlg=null;$r('.rfDialog').classList.add('hidden');mode='play';d&&d();}

/* ---------- code panel ---------- */
let PZ=null;
function openPanel(Z){
  if(mode!=='play')return;mode='code';activeZone=Z;keys={};const L=Z.lesson;PZ={Z,hints:0,used:false};
  const pnl=$r('.rfPanel');pnl.classList.remove('hidden');sec.classList.add('coding');
  pnl.innerHTML=`<div class="rfPh"><b>⌨️ ${esc(L.concept||'Terminal')}</b><button class="btn sm ghost" data-p="close" aria-label="Close terminal">✕ Back to the game</button></div>
    <div class="rfPbody"><div class="jobbox"><b>🎯 Your job</b><div class="jobtxt">${md(L.job||L.mission)}</div></div>
      <details class="rfLearn" ${Z.solved?'':'open'}><summary>📖 How it works</summary><div class="lesson">${md(L.learn||'')}</div>${L.example?`<div class="exl">Example</div><pre class="ex">${esc(L.example)}</pre>`:''}${L.mission&&L.job!==L.mission?`<div class="mission" style="margin-top:8px">🎯 ${md(L.mission)}</div>`:''}</details>
      <div class="pane-h">✍️ Your code <small>the platforms change as you type ✨</small></div>
      <textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Code editor"></textarea><div class="snips"></div>
      <div class="st-drawer"><div class="feedback"></div><div class="hintbox"></div></div></div>
    <div class="rfPact"><button class="btn" data-p="hint">💡 Hint</button><button class="btn" data-p="tip">✨ Tip</button><button class="btn" data-p="answer">👁 Answer</button><button class="btn ghost" data-p="reset">↺ Reset</button><button class="btn primary big" data-p="apply">⚡ Apply code</button></div>`;
  const ed=$('textarea',pnl),fb=(t,h)=>{const f=$('.feedback',pnl);f.className='feedback '+(t||'');f.innerHTML=h||'';},hb=$('.hintbox',pnl);
  ed.value=SV.code[Z.id]||(Z.solved?L.answer:L.starter);TRACK.open('rift',L.id);
  const live=debounce(async()=>{const code=ed.value;SV.code[Z.id]=code;saveSV();const r=await layoutZone(Z,code);if(PZ&&PZ.Z===Z&&!Z.solved)setRects(Z,r.rects);},280);
  wireEditor(ed,live,()=>apply());addSnips($('.snips',pnl),ed,live,L.js?['(',')','{','}',';','"','=','+','<','>','.','`','$']:undefined);
  const hintBtn=$('[data-p=hint]',pnl),lab=()=>hintBtn.textContent=`💡 Hint ${Math.min(PZ.hints,L.hints.length)}/${L.hints.length}`;lab();
  hintBtn.onclick=()=>{if(PZ.hints<L.hints.length)PZ.hints++;levelHints++;lab();TRACK.hint('rift',L.id,PZ.hints);hb.innerHTML=L.hints.slice(0,PZ.hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('');hb.lastElementChild.scrollIntoView({block:'nearest'});};
  $('[data-p=tip]',pnl).onclick=()=>showTip(hb,L.tip);
  $('[data-p=answer]',pnl).onclick=()=>{PZ.used=true;levelAns=true;TRACK.answer('rift',L.id);ed.value=L.answer;live();hb.innerHTML=`<div class="h a">👁 <b>Here's one answer</b> — it's in your code box. Watch how the platforms move, then press ⚡ Apply.</div>`;};
  $('[data-p=reset]',pnl).onclick=()=>{ed.value=L.starter;live();fb();};
  $('[data-p=close]',pnl).onclick=closePanel;
  async function apply(){const b=$('[data-p=apply]',pnl);if(b.disabled)return;b.disabled=true;fb('info','⚡ Compiling platforms…');
    let r;try{r=await checkZone(Z,ed.value);}finally{b.disabled=false;}
    TRACK.attempt('rift',L.id,r.ok);setRects(Z,r.rects);
    if(!r.ok){fb('bad','❌ '+md(r.msg)+'<small style="display:block;margin-top:4px">Fix it and press ⚡ Apply again. Stuck? Tap 💡 Hint.</small>');shake=3;return;}
    Z.solved=true;SV.zones[Z.id]=PZ.used?1:PZ.hints?2:3;SV.code[Z.id]=ed.value;saveSV();fb('good','✅ The platforms are real now! Go!');
    Z.show.forEach(q=>burst(Z.x*TS+q.x+q.w/2,Z.y*TS+q.y,'#c4b5fd',10));banner('PLATFORMS ONLINE');setTimeout(closePanel,900);}
  $('[data-p=apply]',pnl).onclick=apply;
  live();requestAnimationFrame(fitCanvas);setTimeout(fitCanvas,120);setTimeout(()=>{if(innerWidth>=900)ed.focus();},60);
}
function setRects(Z,rects){Z.from=Z.show.map(r=>({...r}));Z.rects=rects;Z.ft=0;}
function closePanel(){const pnl=$r('.rfPanel');pnl.classList.add('hidden');pnl.innerHTML='';sec.classList.remove('coding');activeZone=null;PZ=null;if(mode==='code')mode='play';fitCanvas();}

/* ---------- finishing ---------- */
function finishLevel(){won=true;mode='done';const L=LV;
  const allGems=gemsGot===P.gems.length,clean=!levelAns;const stars=1+(allGems?1:0)+(clean?1:0);
  SV.stars[L.id]=Math.max(SV.stars[L.id]||0,stars);SV.gems[L.id]=Math.max(SV.gems[L.id]||0,gemsGot);SV.last=L.id;saveSV();
  TRACK.attempt('rift','lvl:'+L.id,true);
  const next=nextLevel(L);burst(P.exit.x*TS+16,P.exit.y*TS,'#c4b5fd',40);
  const showWin=()=>{mode='done';modal(`<div class="center"><div style="font-size:52px">${stars===3?'🏆':'🎉'}</div><h2>${esc(L.name)} cleared!</h2><div style="font-size:30px">${starsHTML(stars)}</div>
     <p class="muted" style="text-align:left;line-height:1.8">⭐ Reached the portal<br>${allGems?'⭐':'☆'} All gems (${gemsGot}/${P.gems.length})<br>${clean?'⭐':'☆'} Hacked every terminal without peeking at the answer</p>
     <p class="muted">Time ${Math.floor(timeIn/60)}:${String(Math.floor(timeIn%60)).padStart(2,'0')}</p>${next?'':'<p><b>You finished every world. You are a true Rift Runner! 🌟</b></p>'}</div>`,
     next?[['World map',showMap],['Next level →',()=>startLevel(next.id),'primary']]:[['World map',showMap,'primary']]);};
  setTimeout(()=>{if(L.outro&&L.outro.length)say(L.outro,showWin);else showWin();},700);
  setTimeout(()=>{if(typeof checkAchievements==='function')checkAchievements();},1600);}
function nextLevel(L){const all=allLevels();const i=all.indexOf(L);return all[i+1]||null;}
const unlocked=L=>{const all=allLevels(),i=all.indexOf(L);return i<=0||!!SV.stars[all[i-1].id]||!!SV.stars[L.id];};

/* ---------- world map ---------- */
function showMap(){if(typeof closeModal==='function')closeModal();mode='map';closePanel();mapScr.classList.remove('hidden');
  const W=WORLDS_();const totalStars=Object.values(SV.stars).reduce((a,b)=>a+b,0),maxStars=allLevels().length*3;
  mapScr.innerHTML=`<div class="rfMapIn"><div class="rfMapTop"><button class="btn sm" data-m="back">← Arcade</button><div class="pix rfLogo">RIFT<br>RUNNER</div><span class="chip">⭐ ${totalStars}/${maxStars}</span></div>
    <canvas class="rfMapArt" width="1200" height="360" aria-hidden="true"></canvas>
    <p class="rfIntro">The Glitch has torn holes in the world. You are <b>Nova</b>, a Rift Runner. Run, jump and dash — and when the path is broken, <b>hack a terminal</b>: the code you write becomes real platforms!</p>
    <div class="rfHow"><span><kbd>←</kbd><kbd>→</kbd> run</span><span><kbd>Space</kbd> jump (hold = higher)</span><span><kbd>Shift</kbd> dash</span><span><kbd>E</kbd> hack terminal</span><span>Jump into walls to wall-jump!</span></div>
    ${W.map((w,wi)=>{const th=THEMES[w.theme]||THEMES.meadow;return `<div class="rfWorld" style="--wc:${th.code};--wb:${th.sky[0]}"><div class="rfWh"><b>World ${wi+1} · ${esc(w.name)}</b><small>${esc(w.topic)}</small></div>
      <div class="rfNodes">${w.levels.map((L,li)=>{L._w=wi;L._l=li;L._theme=w.theme;const u=unlocked(L),s=SV.stars[L.id]||0;return `<button class="rfNode ${u?'':'lock'} ${s?'done':''}" data-lv="${L.id}" ${u?'':'disabled'}><span class="n">${u?wi+1+'-'+(li+1):'🔒'}</span><b>${esc(L.name)}</b>${s?starsHTML(s):`<small>${u?'Play!':'Locked'}</small>`}</button>`;}).join('')}</div></div>`;}).join('')}</div>`;
  drawMapArt($('.rfMapArt',mapScr));
  $('[data-m=back]',mapScr).onclick=()=>APP.show('hub');
  $$('.rfNode[data-lv]:not([disabled])',mapScr).forEach(b=>b.onclick=()=>{mapScr.classList.add('hidden');startLevel(b.dataset.lv);fitCanvas();});}
function drawMapArt(cn){const c=cn.getContext('2d');c.scale(2,2);const w=600,h=180;const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#c7e7ff');g.addColorStop(1,'#fdf3dc');c.fillStyle=g;c.fillRect(0,0,w,h);
  const r=rng(42);c.fillStyle='rgba(255,255,255,.9)';for(let k=0;k<6;k++){const x=r()*w,y=20+r()*60;ell(c,x,y,30,10);ell(c,x+18,y-6,20,10);}
  ['#8fcc6a','#c3acf2','#ffffff','#e2b884','#e9a585','#a5b4fc'].forEach((col,i)=>{const x=40+i*95,y=110+Math.sin(i)*14;c.fillStyle=col;c.beginPath();c.moveTo(x-34,y);c.quadraticCurveTo(x,y-26,x+34,y);c.quadraticCurveTo(x+10,y+46,x,y+56);c.quadraticCurveTo(x-10,y+40,x-34,y);c.fill();c.fillStyle='rgba(0,0,0,.08)';c.fillRect(x-30,y-2,60,4);});
  c.strokeStyle='rgba(124,92,255,.6)';c.setLineDash([5,5]);c.lineWidth=2;c.beginPath();for(let i=0;i<6;i++){const x=40+i*95,y=100+Math.sin(i)*14;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();c.setLineDash([]);
  const fake={x:52,y:96,h:28,vx:0,vy:0,face:1,onGround:true,squash:1};drawHero(c,fake,1000);
  c.font='bold 16px sans-serif';c.fillText('👾',w-60,60);}

/* ---------- input ---------- */
const KM={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'jump',w:'jump',W:'jump',' ':'jump',z:'jump',Z:'jump',Shift:'dash',x:'dash',X:'dash',e:'act',E:'act',ArrowDown:'act',s:'act',S:'act',Enter:'act'};
document.addEventListener('keydown',e=>{if(CURRENT!=='rift')return;const tg=(e.target.tagName||'').toLowerCase();if(tg==='textarea'||tg==='input')return;
  if(!$('#modal').classList.contains('hidden'))return;
  if(mode==='dialog'){if([' ','Enter','e','E','z'].includes(e.key)){e.preventDefault();advance();}return;}
  if(mode==='code'&&e.key==='Escape'){closePanel();return;}
  if(mode==='play'&&e.key==='Escape'){menu();return;}
  const k=KM[e.key];if(!k||mode!=='play')return;e.preventDefault();if(!keys[k])pressed[k]=true;keys[k]=true;});
document.addEventListener('keyup',e=>{const k=KM[e.key];if(k)keys[k]=false;});
$$('.rfPad button',sec).forEach(b=>{const k=b.dataset.k;const on=e=>{e.preventDefault();if(mode==='dialog'){advance();return;}if(!keys[k])pressed[k]=true;keys[k]=true;b.classList.add('on');};const off=e=>{keys[k]=false;b.classList.remove('on');};
  b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);});
$r('.rfHack').addEventListener('click',()=>{const z=$r('.rfHack')._z;if(z)openPanel(z);});
$r('.rfDialog').addEventListener('click',advance);
$r('[data-r=back]').onclick=()=>{closePanel();APP.show('hub');};
$r('[data-r=menu]').onclick=menu;
function menu(){if(mode==='code')closePanel();const was=mode;mode='paused';modal(`<h2>⏸ Paused</h2><p>${esc(LV?LV.name:'')}</p>`,[['World map',showMap],['Restart level',()=>startLevel(LV.id)],['How to play',()=>{help();}],['Resume',()=>{mode='play';},'primary']]);}
function help(){modal(`<h2>How to play</h2><p>🏃 <b>Run</b> with ← → (or A/D). <b>Jump</b> with Space — hold it to jump higher. <b>Dash</b> with Shift. On a phone, use the buttons.</p><p>🧗 Jump at a wall, then jump again to <b>wall-jump</b> up.</p><p>⌨️ When the path is broken, walk to a <b>terminal</b> and press <b>E</b>. The code you write is turned into REAL platforms — watch them move as you type!</p><p>💎 Collect gems, 🚩 touch flags to save your spot, 🌀 reach the portal to win. Jump on slimes and bats to bonk them.</p>`,[['Let\'s go!',()=>{if(mode==='paused')mode='play';},'primary']]);}
/* ---------- sizing ---------- */
function fitCanvas(){const wrap=$r('.rfStage');if(!wrap)return;const W=wrap.clientWidth-8,H=(wrap.clientHeight||W*9/16)-8;if(W<50)return;
  const asp=H/W,maxH=P?P.H*TS:640;if(asp>.62){VW=360;VH=Math.round(Math.max(225,Math.min(maxH,640,360*asp)));}else{VW=640;VH=Math.min(360,maxH);}
  let w=W,h=W*VH/VW;if(h>H&&H>100){h=H;w=H*VW/VH;}
  if(cv.width!==VW*2||cv.height!==VH*2){cv.width=VW*2;cv.height=VH*2;}cv.style.width=Math.floor(w)+'px';cv.style.height=Math.floor(h)+'px';}
addEventListener('resize',()=>{if(CURRENT==='rift')fitCanvas();});

const api={
  enter(){if(!WORLDS_().length){modal('<h3>Rift Runner is loading…</h3>');return;}if(mode==='map'||!LV){showMap();}else{fitCanvas();if(mode==='paused')mode='play';}},
  leave(){mapScr.classList.add('hidden');keys={};if(mode==='play')mode='paused';},
  progress(){const ls=allLevels();const done=ls.filter(L=>SV.stars[L.id]).length;return{done,total:ls.length,stars:Object.values(SV.stars).reduce((a,b)=>a+b,0),label:`${done}/${ls.length} levels · ⭐ ${Object.values(SV.stars).reduce((a,b)=>a+b,0)}/${ls.length*3}`};},
  lessons(){return[].concat(...allLevels().map(L=>(L.zones||[]).map((z,i)=>Object.assign(z.lesson,{_lv:L,_zi:i,_zid:zoneId(L,i)}))));},
  levels(){const s=store.get(KEY(),null)||freshSave();return api.lessons().map(l=>({id:l.id,title:l.concept,stars:(s.zones||{})[l._zid]||0,world:l._lv._w}));},
  key:KEY(),
  zonePos:(L,i)=>{const P2=parseLevel(L);const z=L.zones[i];return Object.assign({},z,P2.anchors[i]||{});},
  _test:{solve:async i=>{const Z=ZONES[i];const r=await checkZone(Z,Z.lesson.answer);Z.solved=r.ok;Z.rects=r.rects;Z.show=r.rects.map(x=>({...x}));return r.ok;},THEMES,parseLevel,layoutZone,checkZone,reachable,surfacesOf,allLevels,startLevel,state:()=>({mode,player,P,ZONES,LV,hearts,gemsGot,won}),openPanel,closePanel,keys:()=>keys,press:k=>{pressed[k]=true;},hold:(k,v)=>{keys[k]=v;},showMap,PH,JUMP_H,SAFE_H,TS}
};
window.RIFT=api;WORLDS.rift=api;requestAnimationFrame(loop);
})();
