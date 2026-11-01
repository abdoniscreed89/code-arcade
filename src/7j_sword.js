/* =====================================================================
   SWORD & SCRIPT — a real-time, top-down action RPG (classic Zelda feel).
   Rowan the young knight and Spark the fairy clear six dungeons of the
   Hex King. Fight monsters with your sword in real time — and when the
   way is blocked, use a RUNE ALTAR: the code you write is laid out by the
   browser and its boxes become real stone blocks (push them onto switches,
   wall off pits) or wooden bridges (cross water and holes).
   1 tile = 32 px = 32 CSS px. A room is 15 × 11 tiles.
   ===================================================================== */
window.SWORD_DATA=window.SWORD_DATA||{dungeons:[]};
(function(){
const TS=32,RW=15,RH=11,VW=RW*TS,VH=RH*TS;
const HERO={w:20,h:20,speed:132,swing:.24,iframes:1.0};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const rng=seed=>{let s=(seed>>>0)||7;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return (s%100000)/100000;};};
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,Math.max(0,Math.min(r,w/2,h/2)));else c.rect(x,y,w,h);c.fill();}
function circ(c,x,y,r){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
function ell(c,x,y,rx,ry){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();}
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=amt<0?0:255,p=Math.abs(amt);r=Math.round((t-r)*p+r);g=Math.round((t-g)*p+g);b=Math.round((t-b)*p+b);return `rgb(${r},${g},${b})`;}

/* ------------------------------------------------------------------ themes (light) */
const THEMES={
 moss:{name:'Mossy Temple',floor:'#eef3df',floor2:'#e3ecd0',wall:'#9cc38a',wallTop:'#c8e3b4',wallD:'#6fa35c',hole:'#5b6b4f',water:'#8fd8f2',grass:'#b6e09a',accent:'#7c5cff',bg:'#f4f9ec'},
 coral:{name:'Coral Grotto',floor:'#e8f4f8',floor2:'#dcecf3',wall:'#7fc4d8',wallTop:'#b8e2ee',wallD:'#4f9db5',hole:'#3d6a7a',water:'#6fd0f0',grass:'#a6e3d4',accent:'#0ea5e9',bg:'#eef9fc'},
 bramble:{name:'Bramble Maze',floor:'#f6efdc',floor2:'#efe4c8',wall:'#86c06e',wallTop:'#b5dd97',wallD:'#5a9548',hole:'#6b5a40',water:'#93dcef',grass:'#c3e6a2',accent:'#16a34a',bg:'#fbf6e8'},
 clock:{name:'Clockwork Keep',floor:'#f7ead6',floor2:'#efdcc0',wall:'#d9a66c',wallTop:'#efc994',wallD:'#b07a3f',hole:'#5e4630',water:'#8fd6ee',grass:'#cfe0a0',accent:'#d97706',bg:'#fdf4e6'},
 sand:{name:'Sandstone Vault',floor:'#fbe9d2',floor2:'#f5dcbc',wall:'#e8b37f',wallTop:'#f6d2a6',wallD:'#c48650',hole:'#6e4b32',water:'#90d9ef',grass:'#d9e6a6',accent:'#e11d48',bg:'#fff4e6'},
 cloud:{name:'Cloud Citadel',floor:'#f1f0fd',floor2:'#e6e4fb',wall:'#b6b4f0',wallTop:'#dcdafc',wallD:'#8a87d8',hole:'#c9d6f5',water:'#bfe4fb',grass:'#d6ecc6',accent:'#4f46e5',bg:'#f6f5ff',sky:1}
};

/* ------------------------------------------------------------------ map
  '#' wall   '.' floor   ',' grass   '~' water (hole)   '_' pit (hole)   'B' bush (cut it)   'p' pot (break it)   'T' torch
  'D' door: opens when every switch 'P' in its room is covered by a block — or, if the room has no switches, when its monsters are beaten
  'L' locked door (needs a key 'K')   'Z' boss door (opens when the boss is beaten)   'P' switch   'C' chest   'H' heart container
  'S' start   'E' crystal (the goal)   'g' gem   'R' rune altar   's' slime  'b' bat  'x' skeleton  'a' arrow turret  'X' boss   '1'..'9' zone corner */
const SOLID=new Set(['#','B','p','T','R','a','C']),HOLE=new Set(['~','_']);
function parseDungeon(D){
  const rows=D.map.map(r=>r.replace(/\s+$/,''));const H=rows.length,W=Math.max(...rows.map(r=>r.length));
  const g=rows.map(r=>(r+'#'.repeat(W-r.length)).split(''));
  const P={W,H,g,start:{x:1,y:1},exit:null,anchors:[],enemies:[],items:[],plates:[],altars:[],chests:[],doors:[],boss:null};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const c=g[y][x],cx=x*TS+16,cy=y*TS+16;
    if(c==='S'){P.start={x,y};g[y][x]='.';}
    else if(c==='E'){P.exit={x,y};g[y][x]='.';}
    else if(c==='g'||c==='K'||c==='H'){P.items.push({kind:c==='g'?'gem':c==='K'?'key':'heart',x:cx,y:cy,got:false});g[y][x]='.';}
    else if(c==='P'){P.plates.push({x,y});g[y][x]='.';}
    else if(c==='R'){P.altars.push({x,y});}
    else if(c==='C'){P.chests.push({x,y,open:false});}
    else if(c==='D'||c==='L'||c==='Z'){P.doors.push({x,y,kind:c,open:false});}
    else if('sbxa'.includes(c)){P.enemies.push(mkEnemy(c,cx,cy));g[y][x]=c==='a'?'a':'.';}
    else if(c==='X'){P.boss=mkEnemy('X',cx,cy);P.enemies.push(P.boss);g[y][x]='.';}
    else if(c>='1'&&c<='9'){P.anchors[+c-1]={x,y};g[y][x]='.';}
    if(g[y][x]==='.'&&c!=='.')P._fill=(P._fill||[]).concat([[x,y]]);}
  /* things placed on grass keep grass under them */
  (P._fill||[]).forEach(([x,y])=>{let n=0;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{if((g[y+dy]||[])[x+dx]===',')n++;});if(n>=2)g[y][x]=',';});
  return P;}
function mkEnemy(c,x,y){const k={s:'slime',b:'bat',x:'skel',a:'turret',X:'boss'}[c];
  return{kind:k,x,y,ox:x,oy:y,hp:{slime:2,bat:1,skel:3,turret:999,boss:14}[k],max:{slime:2,bat:1,skel:3,turret:999,boss:14}[k],r:{slime:11,bat:9,skel:11,turret:13,boss:24}[k],vx:0,vy:0,t:Math.random()*3,kb:0,alive:true,flash:0,cd:1+Math.random()*1.5};}
/* each zone uses the rune altar 'R' nearest to it (or zone.rune:[x,y]) */
function altarFor(P,z,x,y){if(z.rune)return{x:z.rune[0],y:z.rune[1]};const cx=x+z.w/2,cy=y+z.h/2;let best=null,bd=1e9;for(const a of P.altars){const d=Math.hypot(a.x+.5-cx,a.y+.5-cy);if(d<bd){bd=d;best=a;}}return best;}
const roomOf=(x,y)=>({rx:Math.floor(x/(RW*TS)),ry:Math.floor(y/(RH*TS))});
const roomKey=(rx,ry)=>rx+','+ry;

/* ------------------------------------------------------------------ code zones */
const ZONE_BASE='*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}body{position:relative;font:14px system-ui,sans-serif;color:#2a2840}';
function mkFrame(){const f=document.createElement('iframe');f.setAttribute('sandbox','allow-same-origin');f.setAttribute('aria-hidden','true');f.tabIndex=-1;
  f.style.cssText='position:fixed;left:0;top:0;border:0;opacity:0.001;pointer-events:none;z-index:-5';document.body.appendChild(f);return f;}
function readRects(Z,a){const sel=Z.lesson.solid||'.block';let els=[];try{els=a.$$(sel);}catch(e){}const W=Z.w*TS,H=Z.h*TS;
  return els.map(el=>{const r=el.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height,col:a.css(el,'backgroundColor'),label:(el.textContent||'').trim().slice(0,10)};})
    .map(r=>{const x1=Math.max(0,r.x),y1=Math.max(0,r.y),x2=Math.min(W,r.x+r.w),y2=Math.min(H,r.y+r.h);return Object.assign(r,{x:x1,y:y1,w:x2-x1,h:y2-y1});})
    .filter(r=>r.w>=6&&r.h>=6);}
function layout(Z,frame,code){const run=(frame._q||Promise.resolve()).then(async()=>{const L=Z.lesson;frame.style.width=Z.w*TS+'px';frame.style.height=Z.h*TS+'px';
    const a=await renderInto(frame,code,ZONE_BASE,{scripts:!!L.js});if(L.js)await a.wait(60);return{rects:readRects(Z,a),api:a};});frame._q=run.catch(()=>{});return run;}
async function checkCode(Z,frame,code){const {rects,api}=await layout(Z,frame,code);
  if(Z.lesson.js&&api.errs.length)return{ok:false,rects,msg:'Your JavaScript has an error: `'+String(api.errs[0]).replace(/`/g,"'").slice(0,120)+'`. Check spelling, brackets and quotes.'};
  for(const[fn,msg]of(Z.lesson.checks||[])){let ok=false;try{ok=!!(await fn(api));}catch(e){}if(!ok)return{ok:false,rects,msg};}
  if(!rects.length&&!Z.lesson.empty)return{ok:false,rects,msg:'Nothing appeared! The '+(Z.kind==='bridge'?'bridges':'blocks')+' are the elements that match `'+(Z.lesson.solid||'.block')+'`.'};
  return{ok:true,rects};}

/* ------------------------------------------------------------------ the world rules (shared by the game and the validator) */
function world(P,zoneRects){/* zoneRects: [{kind,rects in world px,anim}] */
  const blocks=[],bridges=[];zoneRects.forEach(z=>z.rects.forEach(r=>(z.kind==='bridge'?bridges:blocks).push({x:r.x,y:r.y,w:r.w,h:r.h,anim:z.anim})));
  const covered=pl=>blocks.some(b=>!b.anim&&pl.x*TS+16>=b.x&&pl.x*TS+16<=b.x+b.w&&pl.y*TS+16>=b.y&&pl.y*TS+16<=b.y+b.h);
  return{blocks,bridges,covered};}
function roomPlates(P,rx,ry){return P.plates.filter(p=>Math.floor(p.x/RW)===rx&&Math.floor(p.y/RH)===ry);}

/* ------------------------------------------------------------------ validator (used by the tests)
   Proves each dungeon can be finished with the answers, and that every altar is really NEEDED.
   'safe' = a 24px hero that must stand fully on solid ground; 'full' = a 16px hero that only needs its centre on a bridge. */
function reach(P,zoneRects,targets,mode){const C=8,NX=P.W*TS/C,NY=P.H*TS/C,full=mode==='full',k=full?2:3;
  const W0=world(P,zoneRects);const tile=(cx,cy)=>(P.g[Math.floor(cy*C/TS)]||[])[Math.floor(cx*C/TS)]||'#';
  const inR=(rs,cx,cy)=>rs.some(b=>!(b.anim&&b.solidOnly)&&cx*C+C/2>b.x&&cx*C+C/2<b.x+b.w&&cy*C+C/2>b.y&&cy*C+C/2<b.y+b.h);
  const blocked=new Uint8Array(NX*NY),hole=new Uint8Array(NX*NY);
  for(let cy=0;cy<NY;cy++)for(let cx=0;cx<NX;cx++){const t=tile(cx,cy),i=cy*NX+cx;
    if(SOLID.has(t))blocked[i]=1;if(HOLE.has(t)&&!inR(W0.bridges,cx,cy))hole[i]=1;if(inR(W0.blocks.filter(b=>!b.anim),cx,cy))blocked[i]=1;}
  const doorAt=(x,y)=>P.doors.find(d=>d.x===x&&d.y===y);
  const isOpen=new Map();P.doors.forEach(d=>{if(d.kind==='D'){const rx=Math.floor(d.x/RW),ry=Math.floor(d.y/RH);const pl=roomPlates(P,rx,ry);isOpen.set(d,pl.length?pl.every(W0.covered):true);}else isOpen.set(d,false);});
  let keys=0,usedKeys=0;const gotKeys=new Set();let bossSeen=false;let seen;
  const free=(x0,y0)=>{if(x0<0||y0<0||x0+k>NX||y0+k>NY)return false;for(let dy=0;dy<k;dy++)for(let dx=0;dx<k;dx++){const cx=x0+dx,cy=y0+dy,i=cy*NX+cx;if(blocked[i])return false;
      const t=tile(cx,cy);if('DLZ'.includes(t)){const d=doorAt(Math.floor(cx*C/TS),Math.floor(cy*C/TS));if(d&&!isOpen.get(d))return false;}
      if(hole[i]&&(!full||(dx===1&&dy===1)))return false;}return true;};
  for(let pass=0;pass<12;pass++){seen=new Uint8Array(NX*NY);const s=[Math.floor((P.start.x*TS+16)/C)-(k>>1),Math.floor((P.start.y*TS+16)/C)-(k>>1)];const q=[s];seen[s[1]*NX+s[0]]=1;
    while(q.length){const[x,y]=q.pop();for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=NX||ny>=NY||seen[ny*NX+nx])continue;if(!free(nx,ny))continue;seen[ny*NX+nx]=1;q.push([nx,ny]);}}
    const hit=(px,py,rad=14)=>{for(let y=Math.max(0,Math.floor((py-rad)/C)-k);y<=Math.min(NY-1,Math.floor((py+rad)/C));y++)for(let x=Math.max(0,Math.floor((px-rad)/C)-k);x<=Math.min(NX-1,Math.floor((px+rad)/C));x++)if(seen[y*NX+x])return true;return false;};
    let changed=false;
    P.items.forEach((it,i)=>{if(it.kind==='key'&&!gotKeys.has(i)&&hit(it.x,it.y)){gotKeys.add(i);keys++;changed=true;}});
    if(P.boss&&!bossSeen&&hit(P.boss.x,P.boss.y,40)){bossSeen=true;P.doors.forEach(d=>{if(d.kind==='Z')isOpen.set(d,true);});changed=true;}
    for(const d of P.doors){if(d.kind==='L'&&!isOpen.get(d)&&keys>usedKeys&&hit(d.x*TS+16,d.y*TS+16,30)){isOpen.set(d,true);usedKeys++;changed=true;break;}}
    if(!changed)return{hits:targets.map(t=>!!t&&hit(t[0],t[1],t[2]||18))};}
  return{hits:targets.map(()=>false)};}

/* ------------------------------------------------------------------ DOM */
const sec=document.createElement('section');sec.className='screen hidden rift sword';sec.id='g-sword';
sec.innerHTML=`<div class="rfTop"><button class="chip" data-w="back">← Arcade</button><b class="rfTitle pix swTitle">SWORD&amp;SCRIPT</b><span class="rfLevel"></span>
   <span class="rfStats"><span class="chip swHearts"></span><span class="chip swGems"></span><span class="chip swKeys"></span><button class="chip" data-w="menu">⏸ Menu</button></span></div>
  <div class="rfMain"><div class="rfStageWrap"><div class="rfStage"><canvas class="rfCv swCv" width="960" height="704" aria-label="Sword and Script game"></canvas>
      <div class="rfBanner pix"></div><div class="rfDialog hidden"><span class="rfWho"></span><span class="rfFace"></span><span class="rfText"></span><span class="more">▼</span></div>
      <button class="rfHack hidden">🔮 Use the rune altar <kbd>E</kbd></button><div class="rfFlash"></div></div>
    <div class="rfPad swPad"><div class="swStickZone"><div class="swStick"><i></i></div></div>
      <div class="rfPadR"><button data-k="act" class="dash" aria-label="Action">✋</button><button data-k="attack" class="jump" aria-label="Sword">⚔️</button></div></div></div>
   <aside class="rfPanel hidden" aria-label="Rune altar"></aside></div>`;
document.body.insertBefore(sec,$('#modal'));
const mapScr=document.createElement('div');mapScr.className='overlay hidden rfMap swMap';sec.after(mapScr);
const $w=q=>sec.querySelector(q),cv=$w('.swCv'),ctx=cv.getContext('2d');
const KEY=()=>'sword-v1'+SFX;
const freshSave=()=>({stars:{},zones:{},code:{},seenIntro:{},chests:{},last:null,maxHp:6});
let SV=(()=>{const o=store.get(KEY(),null);const f=freshSave();if(!o||typeof o!=='object')return f;for(const k in f)if(o[k]==null||typeof o[k]!==typeof f[k])o[k]=f[k];return o;})();
const saveSV=()=>store.set(KEY(),SV);
const DUNS=()=>SWORD_DATA.dungeons;
const allLevels=()=>DUNS().map((d,i)=>Object.assign(d,{_i:i}));
const levelById=id=>allLevels().find(L=>L.id===id);
const zoneId=(L,i)=>L.id+':z'+i;

/* ------------------------------------------------------------------ state */
let LV=null,P=null,TH=null,ZONES=[],hero=null,cam={x:0,y:0,fx:0,fy:0,t:1},room={rx:0,ry:0},entry=null,checkpoint=null,mode='map',keys={},pressed={},stick={x:0,y:0},tAcc=0,lastT=0,
    parts=[],shots=[],dlg=null,activeZone=null,levelHints=0,levelAns=false,timeIn=0,STATIC=null,won=false,shake=0,preview=null,floatTxt=[],bossBar=null,faints=0;
function mkHero(x,y){return{x:x*TS+16,y:y*TS+16,vx:0,vy:0,face:'down',hp:SV.maxHp||6,inv:0,swing:0,kb:0,kbx:0,kby:0,keys:0,gems:0,fall:0,walk:0};}
function startLevel(id){const L=levelById(id);if(!L)return;mapScr.classList.add('hidden');LV=L;P=parseDungeon(L);TH=THEMES[L.theme]||THEMES.moss;won=false;
  ZONES.forEach(Z=>Z.frame&&Z.frame.remove());if(!preview)preview=mkFrame();
  ZONES=(L.zones||[]).map((z,i)=>{const a=z.at?{x:z.at[0],y:z.at[1]}:(P.anchors[i]||{x:0,y:0});const Z=Object.assign({},z,{i,id:zoneId(L,i),x:a.x,y:a.y,lesson:z.lesson,kind:z.kind||'block',solved:!!SV.zones[zoneId(L,i)],frame:mkFrame(),rects:[],show:[],from:null,ft:1,ghost:null,altar:altarFor(P,z,a.x,a.y)});
    layout(Z,Z.frame,Z.solved?(SV.code[Z.id]||Z.lesson.answer):Z.lesson.starter).then(r=>{Z.rects=r.rects;Z.show=r.rects.map(q=>({...q}));});return Z;});
  hero=mkHero(P.start.x,P.start.y);entry={x:hero.x,y:hero.y};checkpoint={x:hero.x,y:hero.y};room=roomOf(hero.x,hero.y);cam.x=room.rx*VW;cam.y=room.ry*VH;cam.t=1;
  parts=[];shots=[];floatTxt=[];timeIn=0;levelHints=0;levelAns=false;faints=0;(P.chests||[]).forEach(c=>{c.open=!!SV.chests[L.id+':'+c.x+','+c.y];if(c.open)P.g[c.y][c.x]='C';});
  STATIC=buildStatic();mode='play';hud();fitCanvas();$w('.rfLevel').textContent=`${L._i+1}. ${L.name}`;banner(L.name.toUpperCase());
  if(L.story&&!SV.seenIntro[L.id]){SV.seenIntro[L.id]=1;saveSV();say(L.story);}}

/* ------------------------------------------------------------------ zones → world rects */
const zoneWorld=Z=>Z.show.map(r=>({x:Z.x*TS+r.x,y:Z.y*TS+r.y,w:r.w,h:r.h,col:r.col,label:r.label}));
function curWorld(){return world(P,ZONES.map(Z=>({kind:Z.kind,rects:zoneWorld(Z)})));}
let W=null;
function animZones(dt){ZONES.forEach(Z=>{
  if(Z.ft<1){Z.ft=Math.min(1,Z.ft+dt*3);const e=1-Math.pow(1-Z.ft,3);Z.show=Z.rects.map((r,i)=>{const f=Z.from&&Z.from[i]||{x:r.x+r.w/2,y:r.y+r.h/2,w:0,h:0};return{...r,x:f.x+(r.x-f.x)*e,y:f.y+(r.y-f.y)*e,w:f.w+(r.w-f.w)*e,h:f.h+(r.h-f.h)*e};});}
  else if(Z.lesson.anim&&Z.frame.contentDocument){try{const rs=readRects(Z,makeApi(Z.frame.contentDocument,Z.frame.contentWindow));if(rs.length===Z.show.length||!Z.show.length){Z.rects=rs;Z.show=rs;}}catch(e){}}});}

/* ------------------------------------------------------------------ collision */
const tileAt=(x,y)=>(P.g[y]&&P.g[y][x])||'#';
function doorOpen(d){if(d.open)return true;if(d.kind==='D'){const rx=Math.floor(d.x/RW),ry=Math.floor(d.y/RH);const pl=roomPlates(P,rx,ry);
    if(pl.length)return pl.every(W.covered);const foes=P.enemies.filter(e=>e.kind!=='turret'&&Math.floor(e.ox/(RW*TS))===rx&&Math.floor(e.oy/(RH*TS))===ry);return foes.every(e=>!e.alive);}
  return false;}
function solidTile(tx,ty,forFoe){const t=tileAt(tx,ty);if(SOLID.has(t))return true;if('DLZ'.includes(t)){const d=P.doors.find(q=>q.x===tx&&q.y===ty);return !(d&&doorOpen(d));}if(forFoe&&HOLE.has(t)&&!onBridge(tx*TS+16,ty*TS+16))return true;return false;}
function onBridge(x,y){return W.bridges.some(b=>x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h);}
function hits(x,y,w,h,forFoe){const x0=Math.floor((x-w/2)/TS),x1=Math.floor((x+w/2-.01)/TS),y0=Math.floor((y-h/2)/TS),y1=Math.floor((y+h/2-.01)/TS);
  for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++)if(solidTile(tx,ty,forFoe))return true;
  for(const b of W.blocks)if(x+w/2>b.x&&x-w/2<b.x+b.w&&y+h/2>b.y&&y-h/2<b.y+b.h)return true;return false;}
function move(o,dx,dy,w,h,forFoe){let hit=false;if(dx){if(!hits(o.x+dx,o.y,w,h,forFoe))o.x+=dx;else{hit=true;/* slide around corners */const n=6;for(const s of[n,-n])if(!hits(o.x+dx,o.y+s,w,h,forFoe)&&Math.abs(dy)<1){o.y+=Math.sign(s)*Math.min(Math.abs(dx),2);break;}}}
  if(dy){if(!hits(o.x,o.y+dy,w,h,forFoe))o.y+=dy;else{hit=true;const n=6;for(const s of[n,-n])if(!hits(o.x+s,o.y+dy,w,h,forFoe)&&Math.abs(dx)<1){o.x+=Math.sign(s)*Math.min(Math.abs(dy),2);break;}}}return hit;}

/* ------------------------------------------------------------------ game step */
const DIRV={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
function step(dt){const h=hero;timeIn+=dt;
  const prevW=W;W=curWorld();
  /* moving bridges carry Rowan */
  if(prevW&&!h.fall){for(let i=0;i<W.bridges.length&&i<prevW.bridges.length;i++){const a=prevW.bridges[i],b=W.bridges[i];if(h.x>=a.x&&h.x<=a.x+a.w&&h.y>=a.y&&h.y<=a.y+a.h){h.x+=b.x-a.x;h.y+=b.y-a.y;break;}}}
  if(h.inv>0)h.inv-=dt;if(h.swing>0)h.swing-=dt;
  if(h.fall>0){h.fall-=dt;if(h.fall<=0){h.x=entry.x;h.y=entry.y;hurt(1,true);}pressed={};return;}
  let ix=(keys.right?1:0)-(keys.left?1:0)+stick.x,iy=(keys.down?1:0)-(keys.up?1:0)+stick.y;const il=Math.hypot(ix,iy);if(il>1){ix/=il;iy/=il;}
  if(h.kb>0){h.kb-=dt;move(h,h.kbx*dt,h.kby*dt,HERO.w,HERO.h);}
  else{const sp=HERO.speed*(h.swing>0?.45:1);move(h,ix*sp*dt,iy*sp*dt,HERO.w,HERO.h);if(il>.2&&h.swing<=0)h.face=Math.abs(ix)>Math.abs(iy)?(ix>0?'right':'left'):(iy>0?'down':'up');h.walk+=il*dt*10;}
  /* sword */
  if(pressed.attack&&h.swing<=0){h.swing=HERO.swing;swingHits();}
  /* holes */
  const tx=Math.floor(h.x/TS),ty=Math.floor(h.y/TS);if(HOLE.has(tileAt(tx,ty))&&!onBridge(h.x,h.y)){h.fall=.45;burst(h.x,h.y,tileAt(tx,ty)==='~'?'#ffffff':'#8b7355',12);}
  /* room change → slide the camera */
  const r=roomOf(h.x,h.y);if(r.rx!==room.rx||r.ry!==room.ry){room=r;cam.fx=cam.x;cam.fy=cam.y;cam.t=0;mode='slide';const d=DIRV[h.face];entry={x:h.x+d[0]*6,y:h.y+d[1]*6};
    shots=[];P.enemies.forEach(e=>{if(e.alive&&e.kind!=='boss'){e.x=e.ox;e.y=e.oy;}});if(P.boss&&P.boss.alive&&inRoom(P.boss)){bossBar=P.boss;banner((LV.boss&&LV.boss.name||'THE BOSS').toUpperCase());}}
  /* items */
  for(const it of P.items){if(!it.got&&Math.hypot(it.x-h.x,it.y-h.y)<20){it.got=true;
    if(it.kind==='gem'){h.gems++;burst(it.x,it.y,'#5eead4',10);}else if(it.kind==='key'){h.keys++;burst(it.x,it.y,'#fde047',14);banner('KEY!');}
    else if(it.kind==='heart'){SV.maxHp=Math.min(20,Math.max(SV.maxHp||6,6)+2);saveSV();h.hp=SV.maxHp;burst(it.x,it.y,'#fb7185',24);banner('HEART CONTAINER!');}
    else if(it.kind==='drop'){h.hp=Math.min(SV.maxHp,h.hp+2);burst(it.x,it.y,'#fb7185',8);}else if(it.kind==='coin'){h.gems++;}hud();}}
  /* locked doors */
  for(const d of P.doors){if(d.kind==='L'&&!d.open&&h.keys>0&&Math.hypot(d.x*TS+16-h.x,d.y*TS+16-h.y)<30){d.open=true;h.keys--;P.g[d.y][d.x]='.';burst(d.x*TS+16,d.y*TS+16,'#fde047',16);banner('UNLOCKED');hud();STATIC=buildStatic();}}
  /* enemies */
  for(const e of P.enemies){if(!e.alive||!inRoom(e))continue;e.t+=dt;if(e.flash>0)e.flash-=dt;foe(e,dt);
    if(e.kind!=='turret'&&h.inv<=0&&Math.abs(e.x-h.x)<e.r+HERO.w/2-3&&Math.abs(e.y-h.y)<e.r+HERO.h/2-3)hurt(e.kind==='boss'?2:1,false,e.x,e.y);}
  /* arrows & magic */
  shots=shots.filter(s=>{s.x+=s.vx*dt;s.y+=s.vy*dt;s.t+=dt;if(s.t>4)return false;
    if(solidTile(Math.floor(s.x/TS),Math.floor(s.y/TS))&&tileAt(Math.floor(s.x/TS),Math.floor(s.y/TS))!=='a'||W.blocks.some(b=>s.x>b.x&&s.x<b.x+b.w&&s.y>b.y&&s.y<b.y+b.h)){burst(s.x,s.y,'#cbd5e1',4);return false;}
    if(h.swing>0){const[fx,fy]=DIRV[h.face];if(Math.hypot(s.x-(h.x+fx*20),s.y-(h.y+fy*20))<18){burst(s.x,s.y,'#fde68a',8);return false;}}
    if(h.inv<=0&&Math.abs(s.x-h.x)<12&&Math.abs(s.y-h.y)<12){hurt(1,false,s.x-s.vx,s.y-s.vy);return false;}return true;});
  /* exit crystal */
  if(P.exit&&!won&&Math.hypot(P.exit.x*TS+16-h.x,P.exit.y*TS+16-h.y)<22)finish();
  /* altars & chests (act) */
  const near=nearThing();const hb=$w('.rfHack');hb.classList.toggle('hidden',!near);
  if(near){hb.innerHTML=near.kind==='altar'?(near.Z.solved?'✏️ Edit the rune <kbd>E</kbd>':'🔮 Use the rune altar <kbd>E</kbd>'):'🎁 Open the chest <kbd>E</kbd>';hb._n=near;}
  if(pressed.act&&near)useThing(near);
  pressed={};}
function inRoom(e){return Math.floor(e.x/(RW*TS))===room.rx&&Math.floor(e.y/(RH*TS))===room.ry||(e.kind==='boss'&&Math.floor(e.ox/(RW*TS))===room.rx&&Math.floor(e.oy/(RH*TS))===room.ry);}
function nearThing(){const h=hero;
  for(const Z of ZONES){const a=Z.altar;if(a&&Math.hypot(a.x*TS+16-h.x,a.y*TS+16-h.y)<40)return{kind:'altar',Z};}
  for(const c of P.chests){if(!c.open&&Math.hypot(c.x*TS+16-h.x,c.y*TS+16-h.y)<38)return{kind:'chest',c};}return null;}
function useThing(n){if(n.kind==='altar')openPanel(n.Z);else{const c=n.c;c.open=true;SV.chests[LV.id+':'+c.x+','+c.y]=1;saveSV();hero.gems+=5;burst(c.x*TS+16,c.y*TS+8,'#fde047',24);banner('+5 GEMS');floatT(c.x*TS+16,c.y*TS,'💎 +5');hud();STATIC=buildStatic();}}
function swingHits(){const h=hero,[fx,fy]=DIRV[h.face];const ax=h.x+fx*22,ay=h.y+fy*22,R=24;
  for(const e of P.enemies){if(!e.alive||!inRoom(e)||e.kind==='turret')continue;if(Math.hypot(e.x-ax,e.y-ay)<R+e.r){if(e.kind==='boss'&&e.flash>0)continue;e.hp--;e.flash=e.kind==='boss'?.45:.25;e.kb=.16;e.vx=fx*240;e.vy=fy*240;burst(e.x,e.y,'#ffffff',8);shake=2;
    if(e.hp<=0){e.alive=false;burst(e.x,e.y,e.kind==='boss'?'#fde047':'#c4b5fd',e.kind==='boss'?60:16);if(Math.random()<.35)P.items.push({kind:Math.random()<.5?'drop':'coin',x:e.x,y:e.y,got:false});
      if(e.kind==='boss'){bossBar=null;banner('BOSS DEFEATED!');P.doors.forEach(d=>{if(d.kind==='Z'){d.open=true;P.g[d.y][d.x]='.';}});STATIC=buildStatic();shake=8;}}}}
  /* cut bushes, break pots */
  for(let ty=Math.floor((ay-R)/TS);ty<=Math.floor((ay+R)/TS);ty++)for(let tx=Math.floor((ax-R)/TS);tx<=Math.floor((ax+R)/TS);tx++){const t=tileAt(tx,ty);
    if((t==='B'||t==='p')&&Math.hypot(tx*TS+16-ax,ty*TS+16-ay)<R+12){P.g[ty][tx]=t==='B'?',':'.';burst(tx*TS+16,ty*TS+16,t==='B'?'#86efac':'#d6b48a',12);
      const r=Math.random();if(r<.3)P.items.push({kind:'coin',x:tx*TS+16,y:ty*TS+16,got:false});else if(r<.45)P.items.push({kind:'drop',x:tx*TS+16,y:ty*TS+16,got:false});STATIC=buildStatic();}}}
function hurt(n,fromFall,sx,sy){const h=hero;if(!fromFall&&h.inv>0)return;h.hp-=n;h.inv=HERO.iframes;flash();shake=4;
  if(!fromFall&&sx!=null){const d=Math.hypot(h.x-sx,h.y-sy)||1;h.kb=.14;h.kbx=(h.x-sx)/d*260;h.kby=(h.y-sy)/d*260;}hud();
  if(h.hp<=0){faints++;h.hp=SV.maxHp;h.x=checkpoint.x;h.y=checkpoint.y;h.fall=0;const r=roomOf(h.x,h.y);room=r;cam.x=r.rx*VW;cam.y=r.ry*VH;cam.t=1;entry={x:h.x,y:h.y};shots=[];
    P.enemies.forEach(e=>{if(e.alive){e.x=e.ox;e.y=e.oy;if(e.kind==='boss')e.hp=e.max;}});bossBar=null;banner('YOU FAINTED…');setTimeout(()=>{if(typeof toast==='function')toast('💤 Spark brought you back to the last rune altar. Keep going!');},300);hud();}}
function foe(e,dt){const h=hero,dx=h.x-e.x,dy=h.y-e.y,d=Math.hypot(dx,dy)||1;
  if(e.kb>0){e.kb-=dt;move(e,e.vx*dt,e.vy*dt,e.r*2-4,e.r*2-4,e.kind!=='bat');return;}
  if(e.kind==='slime'){e.cd-=dt;if(e.cd<=0&&d<260){e.cd=1.1;e.vx=dx/d*150;e.vy=dy/d*150;e.hop=.35;}if(e.hop>0){e.hop-=dt;move(e,e.vx*dt,e.vy*dt,18,18,true);}}
  else if(e.kind==='bat'){const tx=h.x+Math.cos(e.t*2.3)*50,ty=h.y+Math.sin(e.t*3.1)*40;const ddx=tx-e.x,ddy=ty-e.y,dd=Math.hypot(ddx,ddy)||1;if(d<300)move(e,ddx/dd*85*dt,ddy/dd*85*dt,14,14,false);}
  else if(e.kind==='skel'){if(d<320)move(e,dx/d*58*dt,dy/d*58*dt,20,20,true);}
  else if(e.kind==='turret'){e.cd-=dt;if(e.cd<=0&&d<420){e.cd=2.2;shots.push({x:e.x,y:e.y,vx:dx/d*200,vy:dy/d*200,t:0,kind:'arrow'});}}
  else if(e.kind==='boss'){const B=LV.boss||{},ph=e.hp>e.max*.66?1:e.hp>e.max*.33?2:3;e.cd-=dt;
    if(e.dash>0){e.dash-=dt;if(move(e,e.vx*dt,e.vy*dt,40,40,true)){e.dash=0;shake=5;}}
    else{move(e,dx/d*(40+ph*10)*dt,dy/d*(40+ph*10)*dt,40,40,true);
      if(e.cd<=0){e.cd=ph===1?2.6:2.1;const r=Math.random();
        if(ph>=2&&r<.45){e.dash=.55;e.vx=dx/d*280;e.vy=dy/d*280;banner('!');}
        else if(ph>=3||r<.75){const n=ph===3?10:6;for(let k=0;k<n;k++){const a=k/n*Math.PI*2+e.t;shots.push({x:e.x,y:e.y,vx:Math.cos(a)*150,vy:Math.sin(a)*150,t:0,kind:'magic',col:B.color||'#a855f7'});}}
        else if(P.enemies.filter(q=>q.alive&&q.kind==='slime'&&q.summon).length<3){for(let k=0;k<2;k++){const m=mkEnemy('s',e.x+(k?40:-40),e.y+30);m.summon=1;m.ox=m.x;m.oy=m.y;P.enemies.push(m);}}}}}}

/* ------------------------------------------------------------------ drawing */
function buildStatic(){const th=TH,cn=document.createElement('canvas');cn.width=P.W*TS*2;cn.height=P.H*TS*2;const c=cn.getContext('2d');c.scale(2,2);
  const wallAt=(x,y)=>tileAt(x,y)==='#';
  for(let y=0;y<P.H;y++)for(let x=0;x<P.W;x++){const t=P.g[y][x],px=x*TS,py=y*TS,r=rng(hash(LV.id+x+':'+y));
    /* floor under everything */
    c.fillStyle=t===','||t==='B'?th.grass:((x+y)%2?th.floor:th.floor2);c.fillRect(px,py,TS,TS);
    if(t===','||t==='B'){c.fillStyle=shade(th.grass,-.12);for(let k=0;k<3;k++){const gx=px+4+r()*24,gy=py+6+r()*22;c.fillRect(gx,gy,2,4);}}
    else{c.fillStyle='rgba(0,0,0,.03)';c.fillRect(px,py,TS,1);c.fillRect(px,py,1,TS);}
    if(t==='#'){c.fillStyle=th.wallD;c.fillRect(px,py,TS,TS);const open=!wallAt(x,y+1);c.fillStyle=th.wall;c.fillRect(px,py,TS,open?TS-9:TS);c.fillStyle=th.wallTop;c.fillRect(px+2,py+2,TS-4,open?TS-14:TS-4);
      c.fillStyle='rgba(255,255,255,.35)';c.fillRect(px+4,py+4,10,3);if(open){c.fillStyle='rgba(0,0,0,.08)';c.fillRect(px,py+TS-9,TS,9);c.fillStyle='rgba(0,0,0,.08)';for(let k=0;k<3;k++)c.fillRect(px+k*11+2,py+TS-8,1,8);}}
    else if(t==='_'){c.fillStyle=th.hole;c.fillRect(px,py,TS,TS);c.fillStyle='rgba(0,0,0,.25)';if(!HOLE.has(tileAt(x,y-1)))c.fillRect(px,py,TS,8);}
    else if(t==='~'){c.fillStyle=th.water;c.fillRect(px,py,TS,TS);c.fillStyle='rgba(255,255,255,.55)';for(let k=0;k<2;k++){const wx=px+4+r()*18,wy=py+6+r()*20;c.fillRect(wx,wy,8,2);}if(!HOLE.has(tileAt(x,y-1))){c.fillStyle='rgba(0,0,0,.12)';c.fillRect(px,py,TS,5);}}
    else if(t==='B'){c.fillStyle=shade(th.grass,-.35);circ(c,px+16,py+18,13);c.fillStyle=shade(th.grass,-.18);circ(c,px+12,py+14,8);circ(c,px+21,py+15,8);c.fillStyle='rgba(255,255,255,.35)';circ(c,px+12,py+11,3);}
    else if(t==='p'){c.fillStyle='rgba(0,0,0,.12)';ell(c,px+16,py+27,11,4);c.fillStyle='#d6a37a';rr(c,px+7,py+9,18,19,8);c.fillStyle='#b9845a';c.fillRect(px+9,py+7,14,5);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(px+10,py+13,4,9);}
    else if(t==='T'){c.fillStyle='#8a7a6a';rr(c,px+11,py+12,10,18,3);c.fillStyle='#ffb347';ell(c,px+16,py+9,6,8);c.fillStyle='#fff3b0';ell(c,px+16,py+10,3,4);}
    else if(t==='R'){c.fillStyle='rgba(0,0,0,.12)';ell(c,px+16,py+28,13,4);c.fillStyle='#e2e8f0';rr(c,px+5,py+8,22,21,5);c.fillStyle='#cbd5e1';c.fillRect(px+5,py+24,22,5);c.fillStyle=th.accent;rr(c,px+9,py+11,14,9,3);c.fillStyle='#ffffff';c.font='bold 8px monospace';c.textAlign='center';c.fillText('</>',px+16,py+18);}
    else if(t==='C'){const ch=P.chests.find(q=>q.x===x&&q.y===y);c.fillStyle='rgba(0,0,0,.12)';ell(c,px+16,py+28,13,4);c.fillStyle='#c98a4b';rr(c,px+4,py+10,24,18,4);c.fillStyle=ch&&ch.open?'#7a4f2a':'#e0a35f';rr(c,px+4,py+8,24,ch&&ch.open?5:9,4);c.fillStyle='#fde047';c.fillRect(px+14,py+14,4,5);}
    else if(t==='a'){c.fillStyle=th.wallD;rr(c,px+3,py+3,26,26,6);c.fillStyle=th.wall;rr(c,px+6,py+5,20,18,5);c.fillStyle='#2a2840';circ(c,px+16,py+14,4);}
    else if(t==='L'||t==='D'||t==='Z'){/* doors drawn live */}}
  /* plates */
  P.plates.forEach(p=>{const px=p.x*TS,py=p.y*TS;c.fillStyle='rgba(0,0,0,.12)';rr(c,px+4,py+5,24,24,5);c.fillStyle='#cbd5e1';rr(c,px+4,py+4,24,23,5);c.fillStyle=TH.accent;rr(c,px+9,py+9,14,13,3);});
  return cn;}
function drawHero(c,h,t){if(h.inv>0&&Math.floor(t*12)%2&&h.hp>0)return;const fallS=h.fall>0?Math.max(.1,h.fall/.45):1;c.save();c.translate(h.x,h.y);c.scale(fallS,fallS);
  const step=Math.sin(h.walk)*2,f=h.face;c.fillStyle='rgba(0,0,0,.15)';ell(c,0,11,10,4);
  /* sword swing */
  if(h.swing>0){const p=1-h.swing/HERO.swing,base={right:0,down:Math.PI/2,left:Math.PI,up:-Math.PI/2}[f],a=base-1.2+p*2.4;c.save();c.rotate(a);c.fillStyle='rgba(255,255,255,.6)';c.beginPath();c.arc(0,0,30,-.4,.4);c.arc(0,0,12,.4,-.4,true);c.fill();
    c.fillStyle='#e5e7eb';rr(c,8,-2.5,22,5,2);c.fillStyle='#fde047';c.fillRect(6,-5,3,10);c.restore();}
  /* body */
  c.fillStyle='#2a2840';rr(c,-7,4+step*.5,5,7,2);rr(c,2,4-step*.5,5,7,2);
  c.fillStyle='#4f8cff';rr(c,-9,-6,18,14,6);c.fillStyle='#fde047';c.fillRect(-9,3,18,3);
  /* shield */
  if(f!=='up'){c.fillStyle='#e11d48';const sx=f==='left'?6:f==='right'?-12:-13;rr(c,sx,-4,7,11,3);c.fillStyle='#fde047';c.fillRect(sx+2,0,3,3);}
  /* head */
  c.fillStyle='#f1c27d';circ(c,0,-12,8);c.fillStyle='#5b3a29';c.beginPath();c.arc(0,-13,8.5,Math.PI,0);c.fill();
  c.fillStyle='#22c55e';c.beginPath();c.moveTo(-8,-15);c.lineTo(8,-15);c.lineTo(f==='left'?12:f==='right'?-12:0,f==='up'?-28:-25);c.closePath();c.fill();
  if(f!=='up'){c.fillStyle='#2a2840';const ex=f==='left'?-3:f==='right'?3:0;c.fillRect(ex-4,-12,2,3);c.fillRect(ex+2,-12,2,3);}
  c.restore();}
function drawFoe(c,e,t){if(!e.alive)return;c.save();c.translate(e.x,e.y);if(e.flash>0&&Math.floor(t*20)%2){c.globalAlpha=.4;}
  c.fillStyle='rgba(0,0,0,.14)';ell(c,0,e.r*.8,e.r,e.r*.35);
  if(e.kind==='slime'){const sq=1+Math.sin(e.t*8)*.08;c.scale(1/sq,sq);c.fillStyle='#a78bfa';c.beginPath();c.moveTo(-11,8);c.quadraticCurveTo(-12,-12,0,-12);c.quadraticCurveTo(12,-12,11,8);c.closePath();c.fill();c.fillStyle='#2a2840';circ(c,-4,-2,2);circ(c,4,-2,2);c.fillStyle='rgba(255,255,255,.5)';circ(c,-5,-7,2.5);}
  else if(e.kind==='bat'){const fl=Math.sin(e.t*18)*5;c.translate(0,-8);c.fillStyle='#f472b6';c.beginPath();c.moveTo(-3,0);c.quadraticCurveTo(-12,-6-fl,-16,3);c.quadraticCurveTo(-9,1,-3,4);c.fill();c.beginPath();c.moveTo(3,0);c.quadraticCurveTo(12,-6-fl,16,3);c.quadraticCurveTo(9,1,3,4);c.fill();circ(c,0,1,6);c.fillStyle='#2a2840';circ(c,-2,0,1.3);circ(c,2,0,1.3);}
  else if(e.kind==='skel'){const w=Math.sin(e.t*8)*2;c.fillStyle='#f8fafc';rr(c,-7,-4,14,12,4);c.fillStyle='#cbd5e1';c.fillRect(-6,8+w*.3,4,5);c.fillRect(2,8-w*.3,4,5);c.fillStyle='#f8fafc';circ(c,0,-11,8);c.fillStyle='#2a2840';circ(c,-3,-11,2);circ(c,3,-11,2);c.fillRect(-3,-6,6,1);c.fillStyle='#94a3b8';c.fillRect(8,-8,3,14);}
  else if(e.kind==='turret'){}
  else if(e.kind==='boss'){const B=LV.boss||{},col=B.color||'#a855f7',p=Math.sin(t*4)*2;c.fillStyle=col;rr(c,-22,-20+p,44,40,16);c.fillStyle=shade(col,.35);rr(c,-16,-14+p,32,12,6);
    c.fillStyle='#ffffff';circ(c,-8,-8+p,6);circ(c,8,-8+p,6);c.fillStyle='#2a2840';circ(c,-8+(hero.x>e.x?2:-2),-8+p,3);circ(c,8+(hero.x>e.x?2:-2),-8+p,3);
    c.fillStyle='#fde047';c.beginPath();c.moveTo(-14,-20+p);c.lineTo(-10,-30+p);c.lineTo(-4,-22+p);c.lineTo(0,-32+p);c.lineTo(4,-22+p);c.lineTo(10,-30+p);c.lineTo(14,-20+p);c.closePath();c.fill();}
  c.restore();}
function drawDoor(c,d){const px=d.x*TS,py=d.y*TS;if(doorOpen(d)){c.fillStyle='rgba(0,0,0,.08)';c.fillRect(px+2,py+2,TS-4,TS-4);return;}
  c.fillStyle=d.kind==='Z'?'#7c3aed':d.kind==='L'?'#b45309':TH.wallD;rr(c,px+1,py+1,TS-2,TS-2,4);c.fillStyle=d.kind==='Z'?'#c4b5fd':d.kind==='L'?'#f59e0b':TH.wall;rr(c,px+4,py+4,TS-8,TS-8,3);
  if(d.kind==='L'){c.fillStyle='#2a2840';circ(c,px+16,py+14,3.5);c.fillRect(px+14.5,py+15,3,7);}else if(d.kind==='Z'){c.fillStyle='#fde047';c.font='bold 14px sans-serif';c.textAlign='center';c.fillText('☠',px+16,py+21);}
  else{c.fillStyle='rgba(0,0,0,.18)';for(let k=0;k<3;k++)c.fillRect(px+8+k*7,py+6,3,TS-12);}}
function drawZones(c,t){ZONES.forEach(Z=>{const x0=Z.x*TS,y0=Z.y*TS,w=Z.w*TS,h=Z.h*TS;
    if(!Z.solved){c.save();c.strokeStyle=activeZone===Z?'rgba(124,92,255,.9)':'rgba(124,92,255,.5)';c.lineWidth=2;c.setLineDash([7,5]);c.lineDashOffset=-t*25;c.strokeRect(x0+1,y0+1,w-2,h-2);c.setLineDash([]);c.restore();}
    for(const r of zoneWorld(Z))drawBox(c,r,Z.kind,false);
    if(activeZone===Z&&Z.ghost)for(const r of Z.ghost)drawBox(c,{x:x0+r.x,y:y0+r.y,w:r.w,h:r.h,col:r.col,label:r.label},Z.kind,true);});}
function drawBox(c,r,kind,ghost){const col=/rgba?\(0, 0, 0, 0\)|transparent/.test(r.col||'')?(kind==='bridge'?'#c98a4b':'#a8a29e'):(r.col||'#a8a29e');c.save();if(ghost)c.globalAlpha=.42;
  if(kind==='bridge'){c.fillStyle='rgba(0,0,0,.15)';c.fillRect(r.x+2,r.y+3,r.w,r.h);c.fillStyle=col;c.fillRect(r.x,r.y,r.w,r.h);c.fillStyle='rgba(0,0,0,.12)';const hz=r.w>=r.h;for(let k=8;k<(hz?r.w:r.h);k+=10)hz?c.fillRect(r.x+k,r.y,1.5,r.h):c.fillRect(r.x,r.y+k,r.w,1.5);c.fillStyle='rgba(255,255,255,.3)';c.fillRect(r.x,r.y,r.w,2);}
  else{c.fillStyle='rgba(0,0,0,.18)';c.fillRect(r.x+2,r.y+5,r.w,r.h);c.fillStyle=shade(col.startsWith('#')?col:'#a8a29e',-.25);c.fillRect(r.x,r.y+Math.min(6,r.h*.25),r.w,r.h-Math.min(6,r.h*.25));c.fillStyle=col;c.fillRect(r.x,r.y,r.w,r.h-Math.min(6,r.h*.25));c.fillStyle='rgba(255,255,255,.35)';c.fillRect(r.x+2,r.y+2,r.w-4,2);}
  if(ghost){c.globalAlpha=.9;c.setLineDash([4,3]);c.strokeStyle='#5b3fd1';c.lineWidth=1.5;c.strokeRect(r.x+.5,r.y+.5,r.w-1,r.h-1);c.setLineDash([]);}
  if(r.label&&r.w>26&&r.h>=14){c.globalAlpha=ghost?.7:.8;c.fillStyle='#2a2840';c.font='bold 9px sans-serif';c.textAlign='center';c.fillText(r.label,r.x+r.w/2,r.y+Math.min(r.h-3,12));}c.restore();}
function render(t){const c=ctx;c.setTransform(2,0,0,2,0,0);c.fillStyle=TH.bg;c.fillRect(0,0,VW,VH);
  let sx=0,sy=0;if(shake>0){sx=(Math.random()-.5)*shake;sy=(Math.random()-.5)*shake;shake=Math.max(0,shake-.4);}
  c.save();c.translate(-Math.round(cam.x)+sx,-Math.round(cam.y)+sy);
  c.drawImage(STATIC,0,0,P.W*TS,P.H*TS);
  P.doors.forEach(d=>drawDoor(c,d));
  /* switch glow when covered */
  P.plates.forEach(p=>{if(W&&W.covered(p)){c.fillStyle='rgba(34,197,94,.35)';c.fillRect(p.x*TS,p.y*TS,TS,TS);}});
  drawZones(c,t);
  /* items */
  for(const it of P.items){if(it.got)continue;const b=Math.sin(t*4+it.x)*2;c.save();c.translate(it.x,it.y+b);
    if(it.kind==='gem'||it.kind==='coin'){c.fillStyle='rgba(0,0,0,.12)';ell(c,0,10-b,6,2);c.fillStyle='#2dd4bf';c.beginPath();c.moveTo(0,-8);c.lineTo(6,0);c.lineTo(0,8);c.lineTo(-6,0);c.closePath();c.fill();c.fillStyle='#ccfbf1';c.fillRect(-1,-5,2,5);}
    else if(it.kind==='key'){c.fillStyle='#facc15';circ(c,0,-4,5);c.fillRect(-1.5,0,3,10);c.fillRect(1,6,4,2);c.fillStyle='#fff7d6';circ(c,0,-4,2);}
    else{const s=it.kind==='heart'?1.6:1;c.scale(s,s);c.fillStyle='#fb7185';c.beginPath();c.moveTo(0,6);c.bezierCurveTo(-10,-2,-5,-10,0,-4);c.bezierCurveTo(5,-10,10,-2,0,6);c.fill();}c.restore();}
  /* exit crystal */
  if(P.exit){const ex=P.exit.x*TS+16,ey=P.exit.y*TS+16,b=Math.sin(t*3)*3;c.fillStyle='rgba(124,92,255,.18)';circ(c,ex,ey,18+b);c.fillStyle='#a78bfa';c.beginPath();c.moveTo(ex,ey-16+b);c.lineTo(ex+10,ey+b);c.lineTo(ex,ey+14+b);c.lineTo(ex-10,ey+b);c.closePath();c.fill();c.fillStyle='#ede9fe';c.fillRect(ex-2,ey-9+b,3,10);}
  /* altars: floating hint */
  ZONES.forEach(Z=>{if(!Z.solved&&Z.altar){const ax=Z.altar.x*TS+16,ay=Z.altar.y*TS;c.fillStyle='#ff7a59';c.font='bold 13px sans-serif';c.textAlign='center';c.fillText('!',ax,ay-4+Math.sin(t*5)*2);}});
  /* turrets glow, enemies, hero (sorted by y) */
  const actors=P.enemies.filter(e=>e.alive&&e.kind!=='turret'&&inRoom(e)).concat([hero]).sort((a,b)=>a.y-b.y);
  actors.forEach(a=>a===hero?drawHero(c,hero,t):drawFoe(c,a,t));
  /* shots */
  shots.forEach(s=>{c.save();c.translate(s.x,s.y);if(s.kind==='arrow'){c.rotate(Math.atan2(s.vy,s.vx));c.fillStyle='#78716c';c.fillRect(-8,-1,14,2);c.fillStyle='#e7e5e4';c.beginPath();c.moveTo(8,0);c.lineTo(3,-4);c.lineTo(3,4);c.fill();}else{c.fillStyle=s.col||'#a855f7';circ(c,0,0,6);c.fillStyle='#ffffff';circ(c,-1.5,-1.5,2);}c.restore();});
  /* particles */
  parts=parts.filter(q=>{q.life-=.016;q.x+=q.vx*.016;q.y+=q.vy*.016;q.vy+=q.g*.016;if(q.life<=0)return false;c.globalAlpha=clamp(q.life*2,0,1);c.fillStyle=q.col;c.fillRect(q.x-q.s/2,q.y-q.s/2,q.s,q.s);c.globalAlpha=1;return true;});
  floatTxt=floatTxt.filter(f=>{f.t+=.016;if(f.t>1.2)return false;c.globalAlpha=1-f.t/1.2;c.fillStyle='#2a2840';c.font='bold 12px sans-serif';c.textAlign='center';c.fillText(f.txt,f.x,f.y-f.t*24);c.globalAlpha=1;return true;});
  c.restore();
  /* boss health */
  if(bossBar&&bossBar.alive){const B=LV.boss||{};c.fillStyle='rgba(255,255,255,.9)';rr(c,90,VH-26,VW-180,16,8);c.fillStyle=B.color||'#a855f7';rr(c,93,VH-23,(VW-186)*bossBar.hp/bossBar.max,10,5);c.fillStyle='#2a2840';c.font='bold 10px sans-serif';c.textAlign='center';c.fillText(B.name||'Boss',VW/2,VH-30);}
  /* vignette */
  const vg=c.createRadialGradient(VW/2,VH/2,VH*.45,VW/2,VH/2,VH*.9);vg.addColorStop(0,'rgba(255,255,255,0)');vg.addColorStop(1,'rgba(90,70,140,.10)');c.fillStyle=vg;c.fillRect(0,0,VW,VH);}
function burst(x,y,col,n){for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*180,vy:(Math.random()-.5)*180-40,g:220,life:.4+Math.random()*.3,col,s:2+Math.random()*3});}
function floatT(x,y,txt){floatTxt.push({x,y,txt,t:0});}
function flash(){const f=$w('.rfFlash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}

/* ------------------------------------------------------------------ HUD, banner, dialog */
function hud(){if(!LV)return;const h=hero,mx=SV.maxHp||6;let s='';for(let i=0;i<mx;i+=2)s+=h.hp>=i+2?'❤️':h.hp===i+1?'💔':'🤍';$w('.swHearts').textContent=s;$w('.swGems').textContent='💎 '+h.gems;$w('.swKeys').textContent='🗝️ '+h.keys;}
let bT;function banner(t){const b=$w('.rfBanner');b.textContent=t;b.classList.add('show');clearTimeout(bT);bT=setTimeout(()=>b.classList.remove('show'),1700);}
function say(lines,done){const was=mode;mode='dialog';const box=$w('.rfDialog');dlg={lines:[].concat(lines),i:0,done,was};box.classList.remove('hidden');showLine();}
function showLine(){const raw=dlg.lines[dlg.i];const m=/^([A-Z][\w .'-]{1,20}):\s+(.*)$/s.exec(raw);const who=m?m[1]:'',txt=m?m[2]:raw;
  $w('.rfWho').textContent=who;$w('.rfWho').style.display=who?'':'none';$w('.rfFace').textContent=({Rowan:'🛡️',Spark:'🧚','Hex King':'👑'})[who]||'';
  const el=$w('.rfText');let n=0;clearInterval(dlg.tm);el.textContent='';dlg.typing=true;dlg.cur=txt;dlg.tm=setInterval(()=>{n+=2;el.textContent=txt.slice(0,n);if(n>=txt.length){clearInterval(dlg.tm);dlg.typing=false;}},16);}
function advance(){if(!dlg)return;if(dlg.typing){clearInterval(dlg.tm);$w('.rfText').textContent=dlg.cur;dlg.typing=false;return;}dlg.i++;if(dlg.i<dlg.lines.length){showLine();return;}
  const d=dlg.done,was=dlg.was;dlg=null;$w('.rfDialog').classList.add('hidden');mode=was==='done'?'done':'play';d&&d();}

/* ------------------------------------------------------------------ the rune altar (code panel) */
let PZ=null;
function openPanel(Z){if(mode!=='play')return;mode='code';activeZone=Z;keys={};stick.x=stick.y=0;const L=Z.lesson;PZ={Z,hints:0,used:false};
  const pnl=$w('.rfPanel');pnl.classList.remove('hidden');sec.classList.add('coding');
  pnl.innerHTML=`<div class="rfPh"><b>🔮 ${esc(L.concept||'Rune altar')}</b><button class="btn sm ghost" data-p="close" aria-label="Close the altar">✕ Back to the dungeon</button></div>
    <div class="rfPbody"><div class="jobbox"><b>🎯 Your job</b><div class="jobtxt">${md(L.job||L.mission)}</div></div>
      <details class="rfLearn" ${Z.solved?'':'open'}><summary>📖 How it works</summary><div class="lesson">${md(L.learn||'')}</div>${L.example?`<div class="exl">Example</div><pre class="ex">${esc(L.example)}</pre>`:''}${L.mission&&L.job!==L.mission?`<div class="mission" style="margin-top:8px">🎯 ${md(L.mission)}</div>`:''}</details>
      <div class="pane-h">✍️ Your code <small>the see-through ${Z.kind==='bridge'?'bridges':'blocks'} move as you type ✨</small></div>
      <textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Code editor"></textarea><div class="snips"></div>
      <div class="st-drawer"><div class="feedback"></div><div class="hintbox"></div></div></div>
    <div class="rfPact"><button class="btn" data-p="hint">💡 Hint</button><button class="btn" data-p="tip">✨ Tip</button><button class="btn" data-p="answer">👁 Answer</button><button class="btn ghost" data-p="reset">↺ Reset</button><button class="btn primary big" data-p="apply">⚡ Cast the rune</button></div>`;
  const ed=$('textarea',pnl),fb=(t,h)=>{const f=$('.feedback',pnl);f.className='feedback '+(t||'');f.innerHTML=h||'';},hb=$('.hintbox',pnl);
  ed.value=SV.code[Z.id]||(Z.solved?L.answer:L.starter);TRACK.open('sword',L.id);
  const live=debounce(async()=>{const code=ed.value;SV.code[Z.id]=code;saveSV();const r=await layout(Z,preview,code);if(PZ&&PZ.Z===Z)Z.ghost=r.rects;},260);
  wireEditor(ed,live,()=>apply());addSnips($('.snips',pnl),ed,live,L.js?['(',')','{','}',';','"','=','+','<','>','.','`','$']:undefined);
  const hintBtn=$('[data-p=hint]',pnl),lab=()=>hintBtn.textContent=`💡 Hint ${Math.min(PZ.hints,L.hints.length)}/${L.hints.length}`;lab();
  hintBtn.onclick=()=>{if(PZ.hints<L.hints.length)PZ.hints++;levelHints++;lab();TRACK.hint('sword',L.id,PZ.hints);hb.innerHTML=L.hints.slice(0,PZ.hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('');hb.lastElementChild.scrollIntoView({block:'nearest'});};
  $('[data-p=tip]',pnl).onclick=()=>showTip(hb,L.tip);
  $('[data-p=answer]',pnl).onclick=()=>{PZ.used=true;levelAns=true;TRACK.answer('sword',L.id);ed.value=L.answer;live();hb.innerHTML=`<div class="h a">👁 <b>Here's one answer</b> — it's in your code box. Watch the see-through ${Z.kind==='bridge'?'bridges':'blocks'} move, then press ⚡ Cast the rune.</div>`;};
  $('[data-p=reset]',pnl).onclick=()=>{ed.value=L.starter;live();fb();};
  $('[data-p=close]',pnl).onclick=closePanel;
  async function apply(){const b=$('[data-p=apply]',pnl);if(b.disabled)return;b.disabled=true;live.cancel&&live.cancel();fb('info','⚡ Casting…');
    let r;try{r=await checkCode(Z,preview,ed.value);}finally{b.disabled=false;}
    TRACK.attempt('sword',L.id,r.ok);Z.ghost=r.rects;
    if(!r.ok){fb('bad','❌ '+md(r.msg)+'<small style="display:block;margin-top:4px">Fix it and cast again. Stuck? Tap 💡 Hint.</small>');shake=3;return;}
    Z.solved=true;SV.zones[Z.id]=Math.max(SV.zones[Z.id]||0,PZ.used?1:PZ.hints?2:3);SV.code[Z.id]=ed.value;saveSV();fb('good','✅ The rune worked! The dungeon is changing…');
    const res=await layout(Z,Z.frame,ed.value);Z.from=Z.show.map(q=>({...q}));Z.rects=res.rects;Z.ft=0;checkpoint={x:hero.x,y:hero.y};
    /* never trap Rowan inside a new block */
    setTimeout(()=>{W=curWorld();if(hits(hero.x,hero.y,HERO.w,HERO.h)){hero.x=Z.altar.x*TS+16;hero.y=Z.altar.y*TS+16+TS;}},400);
    banner('RUNE CAST!');setTimeout(closePanel,1000);}
  $('[data-p=apply]',pnl).onclick=apply;
  live();requestAnimationFrame(fitCanvas);setTimeout(fitCanvas,120);setTimeout(()=>{if(innerWidth>=900)ed.focus();},60);}
function closePanel(){const pnl=$w('.rfPanel');pnl.classList.add('hidden');pnl.innerHTML='';sec.classList.remove('coding');if(activeZone)activeZone.ghost=null;activeZone=null;PZ=null;if(mode==='code')mode='play';fitCanvas();}

/* ------------------------------------------------------------------ finishing */
function finish(){won=true;mode='done';const L=LV;const allC=P.chests.every(c=>c.open),clean=!levelAns;const stars=1+(allC?1:0)+(clean?1:0);
  SV.stars[L.id]=Math.max(SV.stars[L.id]||0,stars);SV.last=L.id;saveSV();TRACK.attempt('sword','lvl:'+L.id,true);burst(hero.x,hero.y,'#c4b5fd',50);banner('CRYSTAL CLAIMED!');
  const next=allLevels()[L._i+1];
  const win=()=>{mode='done';modal(`<div class="center"><div style="font-size:52px">${stars===3?'🏆':'💎'}</div><h2>${esc(L.name)} cleared!</h2><div style="font-size:30px">${starsHTML(stars)}</div>
    <p class="muted" style="text-align:left;line-height:1.8">⭐ Claimed the crystal<br>${allC?'⭐':'☆'} Opened every chest (${P.chests.filter(c=>c.open).length}/${P.chests.length})<br>${clean?'⭐':'☆'} Cast every rune without peeking at the answer</p>
    <p class="muted">Time ${Math.floor(timeIn/60)}:${String(Math.floor(timeIn%60)).padStart(2,'0')} · Fainted ${faints}×</p>${next?'':'<p><b>All six crystals are home. The Hex King is beaten — you are a legend! 🌟</b></p>'}</div>`,
    next?[['Dungeon map',showMap],['Next dungeon →',()=>startLevel(next.id),'primary']]:[['Dungeon map',showMap,'primary']]);};
  setTimeout(()=>{if(L.outro&&L.outro.length)say(L.outro,win);else win();},700);setTimeout(()=>{if(typeof checkAchievements==='function')checkAchievements();},1800);}

/* ------------------------------------------------------------------ loop */
function loop(t){const dt=Math.min(.05,(t-lastT)/1000||0);lastT=t;
  if(CURRENT==='sword'&&LV&&P&&mapScr.classList.contains('hidden')){animZones(dt);if(!W)W=curWorld();
    if(mode==='slide'){cam.t=Math.min(1,cam.t+dt/.38);const e=cam.t<.5?2*cam.t*cam.t:1-Math.pow(-2*cam.t+2,2)/2;cam.x=cam.fx+(room.rx*VW-cam.fx)*e;cam.y=cam.fy+(room.ry*VH-cam.fy)*e;if(cam.t>=1)mode='play';}
    else if(mode==='play'){tAcc+=dt;while(tAcc>=1/120){step(1/120);tAcc-=1/120;}}else{tAcc=0;W=curWorld();}
    render(t/1000);}
  requestAnimationFrame(loop);}

/* ------------------------------------------------------------------ input */
const KM={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',' ':'attack',j:'attack',J:'attack',k:'attack',K:'attack',e:'act',E:'act',Enter:'act'};
document.addEventListener('keydown',e=>{if(CURRENT!=='sword'||!LV)return;const tg=(e.target.tagName||'').toLowerCase();if(tg==='textarea'||tg==='input')return;
  if(!$('#modal').classList.contains('hidden'))return;
  if(mode==='dialog'){if([' ','Enter','e','E'].includes(e.key)){e.preventDefault();advance();}return;}
  if(mode==='code'&&e.key==='Escape'){closePanel();return;}
  if(mode==='play'&&e.key==='Escape'){menu();return;}
  const k=KM[e.key];if(!k||(mode!=='play'&&mode!=='slide'))return;e.preventDefault();if(!keys[k])pressed[k]=true;keys[k]=true;});
document.addEventListener('keyup',e=>{const k=KM[e.key];if(k)keys[k]=false;});
/* touch: a stick on the left, sword + action on the right */
const zone=$w('.swStickZone'),stickEl=$w('.swStick');let sp=null;
zone.addEventListener('pointerdown',e=>{if(mode==='dialog'){advance();return;}zone.setPointerCapture(e.pointerId);const r=zone.getBoundingClientRect();sp={id:e.pointerId,ox:e.clientX,oy:e.clientY};stickEl.style.left=(e.clientX-r.left-45)+'px';stickEl.style.top=(e.clientY-r.top-45)+'px';stickEl.classList.add('on');});
zone.addEventListener('pointermove',e=>{if(!sp||e.pointerId!==sp.id)return;let dx=(e.clientX-sp.ox)/40,dy=(e.clientY-sp.oy)/40;const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l;}stick.x=dx;stick.y=dy;stickEl.firstElementChild.style.transform=`translate(${dx*26}px,${dy*26}px)`;});
const endS=()=>{sp=null;stick.x=stick.y=0;stickEl.classList.remove('on');stickEl.firstElementChild.style.transform='';};['pointerup','pointercancel','lostpointercapture'].forEach(ev=>zone.addEventListener(ev,endS));
$$('.rfPadR button',sec).forEach(b=>{const k=b.dataset.k;const on=e=>{e.preventDefault();if(mode==='dialog'){advance();return;}if(!keys[k])pressed[k]=true;keys[k]=true;b.classList.add('on');};const off=()=>{keys[k]=false;b.classList.remove('on');};
  b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);});
cv.addEventListener('pointerdown',()=>{if(mode==='dialog')advance();});
$w('.rfHack').addEventListener('click',()=>{const n=$w('.rfHack')._n;if(n)useThing(n);});
$w('.rfDialog').addEventListener('click',advance);
$w('[data-w=back]').onclick=()=>{closePanel();APP.show('hub');};
$w('[data-w=menu]').onclick=menu;
function menu(){if(!LV)return;if(mode==='code')closePanel();if(mode!=='play')return;mode='paused';
  modal(`<h2>⏸ Paused</h2><p>${esc(LV.name)}</p>`,[['Dungeon map',showMap],['Restart dungeon',()=>startLevel(LV.id)],['How to play',help],['Resume',()=>{mode='play';},'primary']]);}
function help(){modal(`<h2>How to play</h2><p>🏃 <b>Move</b> with W A S D or the arrow keys (on a phone, drag the left pad).</p><p>⚔️ <b>Swing your sword</b> with Space or J (on a phone, the ⚔️ button). Cut bushes, break pots, beat monsters. A swing also knocks arrows away!</p>
  <p>🔮 At a <b>rune altar</b> press <b>E</b> (or ✋). The code you write becomes real <b>stone blocks</b> or <b>wooden bridges</b>. Cover every glowing switch with a block to open a door.</p>
  <p>🗝️ Keys open locked doors. 🎁 Open every chest for a star. 💎 Reach the crystal to clear the dungeon.</p>`,[['Let\'s go!',()=>{if(mode==='paused')mode='play';},'primary']]);}
function fitCanvas(){const wrap=$w('.rfStage');if(!wrap)return;const Wd=wrap.clientWidth-8,Hd=(wrap.clientHeight||Wd*.73)-8;if(Wd<50)return;let w=Wd,h=Wd*VH/VW;if(h>Hd&&Hd>100){h=Hd;w=Hd*VW/VH;}cv.style.width=Math.floor(w)+'px';cv.style.height=Math.floor(h)+'px';}
addEventListener('resize',()=>{if(CURRENT==='sword')fitCanvas();});

/* ------------------------------------------------------------------ dungeon map */
const unlocked=L=>{const all=allLevels(),i=all.indexOf(L);return i<=0||!!SV.stars[all[i-1].id]||!!SV.stars[L.id];};
function showMap(){if(typeof closeModal==='function')closeModal();closePanel();mode='map';mapScr.classList.remove('hidden');const ls=allLevels(),tot=Object.values(SV.stars).reduce((a,b)=>a+b,0);
  mapScr.innerHTML=`<div class="rfMapIn"><div class="rfMapTop"><button class="btn sm" data-m="back">← Arcade</button><div class="pix rfLogo swLogo">SWORD &amp;<br>SCRIPT</div><span class="chip">⭐ ${tot}/${ls.length*3}</span></div>
    <div class="spHero"><div class="spHeroArt">🛡️⚔️🧚</div><p class="rfIntro">The <b>Hex King</b> stole the six crystals and hid them in his dungeons. You are <b>Rowan</b>, a young knight, with <b>Spark</b> the fairy. Fight your way through monsters in real time — and when the way is blocked, use a <b>rune altar</b>: your code becomes real stone blocks and bridges!</p></div>
    <div class="rfHow spKb"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move</span><span><kbd>Space</kbd> sword</span><span><kbd>E</kbd> altar / chest</span><span>cover switches with blocks</span></div>
    <div class="rfHow spTp"><span>👈 drag the left pad to move</span><span>⚔️ sword</span><span>✋ altar / chest</span></div>
    <div class="spDistricts">${ls.map((L,i)=>{const th=THEMES[L.theme]||THEMES.moss,u=unlocked(L),s=SV.stars[L.id]||0;
      return `<button class="spDist ${u?'':'lock'} ${s?'done':''}" data-lv="${L.id}" ${u?'':'disabled'} style="--wc:${th.accent};--wb:${th.floor};--wb2:${th.wallTop}"><span class="n">${u?'Dungeon '+(i+1):'🔒 Locked'}</span><b>${esc(L.name)}</b><small>${esc(L.topic||'')}</small>${s?starsHTML(s):''}</button>`;}).join('')}</div></div>`;
  $('[data-m=back]',mapScr).onclick=()=>APP.show('hub');
  $$('.spDist[data-lv]:not([disabled])',mapScr).forEach(b=>b.onclick=()=>{mapScr.classList.add('hidden');startLevel(b.dataset.lv);});}

/* ------------------------------------------------------------------ tests: validate a dungeon */
async function validate(id){const L=levelById(id),probs=[];if(!L)return['no such dungeon'];const P0=parseDungeon(L);
  ['id','name','theme','map','zones','story','boss'].forEach(k=>{if(L[k]==null)probs.push('missing '+k);});
  if(P0.W%RW||P0.H%RH)probs.push(`map must be a multiple of ${RW}×${RH} tiles (is ${P0.W}×${P0.H})`);
  if(!P0.exit)probs.push('no exit E');if(!P0.boss)probs.push('no boss X');
  const zs=(L.zones||[]).map((z,i)=>Object.assign({},z,{i,kind:z.kind||'block',x:z.at?z.at[0]:(P0.anchors[i]||{}).x,y:z.at?z.at[1]:(P0.anchors[i]||{}).y}));
  zs.forEach(Z=>{if(Z.x==null)probs.push('zone '+Z.i+' has no anchor digit '+(Z.i+1));const a=Z.x==null?null:altarFor(P0,Z,Z.x,Z.y);if(!a||P0.g[a.y][a.x]!=='R')probs.push('zone '+Z.i+' rune altar is not on an R tile');Z.alt=a;});
  if(probs.length)return probs;
  const f=mkFrame();const ans=[],sta=[];
  const rectsFor=async(Z,code)=>{const r=await layout(Z,f,code);let rs=r.rects;
    if(Z.lesson.anim){const S=[];for(let k=0;k<16;k++){await new Promise(res=>setTimeout(res,(Z.lesson.period||4)*1000/16));try{S.push(...readRects(Z,makeApi(f.contentDocument,f.contentWindow)));}catch(e){}}rs=S.length?S:rs;}
    return{kind:Z.kind,anim:!!Z.lesson.anim,rects:rs.map(q=>({x:Z.x*TS+q.x,y:Z.y*TS+q.y,w:q.w,h:q.h,anim:!!Z.lesson.anim&&Z.kind==='block',solidOnly:!!Z.lesson.anim&&Z.kind==='block'}))};};
  for(const Z of zs){const L2=Z.lesson;['id','concept','learn','mission','job','starter','answer','hints','tip','checks'].forEach(k=>{if(L2[k]==null)probs.push(L2.id+' missing '+k);});
    const a=await checkCode(Z,f,L2.answer);if(!a.ok)probs.push(L2.id+' ANSWER FAILS: '+a.msg);
    const s=await checkCode(Z,f,L2.starter);if(s.ok)probs.push(L2.id+' STARTER PASSES');
    ans[Z.i]=await rectsFor(Z,L2.answer);sta[Z.i]=await rectsFor(Z,L2.starter);}
  f.remove();
  const goal=[P0.exit.x*TS+16,P0.exit.y*TS+16];
  const solved=new Set();let changed=true;
  while(changed){changed=false;const r=reach(P0,zs.map(Z=>solved.has(Z.i)?ans[Z.i]:sta[Z.i]),zs.map(Z=>[Z.alt.x*TS+16,Z.alt.y*TS+16,30]),'safe');r.hits.forEach((h,i)=>{if(h&&!solved.has(i)){solved.add(i);changed=true;}});}
  zs.forEach(Z=>{if(!solved.has(Z.i))probs.push(Z.lesson.id+' rune altar cannot be reached');});
  const ok=reach(P0,zs.map(Z=>ans[Z.i]),[goal],'safe');if(!ok.hits[0])probs.push('CRYSTAL NOT REACHABLE with all answers');
  for(const Z of zs){const r=reach(P0,zs.map(Y=>Y===Z?sta[Y.i]:ans[Y.i]),[goal],'full');if(r.hits[0])probs.push(Z.lesson.id+' NOT NEEDED (crystal reachable with its starter)');}
  const items=P0.items.filter(i=>i.kind!=='heart').map(i=>[i.x,i.y,20]).concat(P0.chests.map(c=>[c.x*TS+16,c.y*TS+16,34]));
  const ir=reach(P0,zs.map(Z=>ans[Z.i]),items,'full');ir.hits.forEach((h,i)=>{if(!h)probs.push('item/chest '+i+' unreachable at '+items[i].slice(0,2).map(v=>Math.floor(v/TS)));});
  return probs;}

const api={
  enter(){if(!DUNS().length){modal('<h3>Sword &amp; Script is loading…</h3>');return;}if(mode==='map'||!LV)showMap();else{fitCanvas();if(mode==='paused')mode='play';}},
  leave(){mapScr.classList.add('hidden');keys={};stick.x=stick.y=0;if(mode==='play')mode='paused';},
  progress(){const ls=allLevels();const done=ls.filter(L=>SV.stars[L.id]).length,st=Object.values(SV.stars).reduce((a,b)=>a+b,0);return{done,total:ls.length,stars:st,label:`${done}/${ls.length} dungeons · ⭐ ${st}/${ls.length*3}`};},
  lessons(){return[].concat(...allLevels().map(L=>(L.zones||[]).map((z,i)=>Object.assign(z.lesson,{_lv:L,_zi:i,_zid:zoneId(L,i)}))));},
  levels(){const s=store.get(KEY(),null)||freshSave();return api.lessons().map(l=>({id:l.id,title:l.concept,stars:(s.zones||{})[l._zid]||0,world:l._lv._i}));},
  key:KEY(),
  _test:{validate,reach,parseDungeon,layout,checkCode,allLevels,startLevel,openPanel,closePanel,showMap,THEMES,RW,RH,TS,
    state:()=>({mode,hero,P,ZONES,LV,won,room}),press:k=>{pressed[k]=true;},hold:(k,v)=>{keys[k]=v;},step:dt=>step(dt||1/120),
    solve:async i=>{const Z=ZONES[i];const r=await checkCode(Z,Z.frame,Z.lesson.answer);if(r.ok){Z.solved=true;Z.from=Z.show.map(q=>({...q}));Z.rects=r.rects;Z.ft=1;Z.show=r.rects.map(q=>({...q}));}return r.ok;},
    teleport:(tx,ty)=>{hero.x=tx*TS+16;hero.y=ty*TS+16;room=roomOf(hero.x,hero.y);cam.x=room.rx*VW;cam.y=room.ry*VH;entry={x:hero.x,y:hero.y};}}
};
window.SWORD=api;WORLDS.sword=api;requestAnimationFrame(loop);
})();
