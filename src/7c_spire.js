/* =====================================================================
   SPIRE CITY — a 3D low-poly city you explore, climb and fix with code.
   Kai (a hooded runner) and Pip (an owl) climb towers and roam the city.
   When a bridge, a gate or a lift is broken, Kai hacks a terminal: the
   browser lays out the code and every box it makes becomes a REAL 3D
   block — bridges, stairs, gates and moving lifts.
   Units: metres. 32 CSS px = 1 m. Map: 1 character = 1 m × 1 m.
   ===================================================================== */
window.SPIRE_DATA=window.SPIRE_DATA||{districts:[]};
(function(){
if(typeof THREE==='undefined'){console.warn('Spire City needs three.js');return;}
const PX=32;
const PH={g:24,jump:8.2,run:5.2,acc:38,air:16,climb:2.8,step:.36,r:.3,h:1.7};
const JUMP_H=PH.jump*PH.jump/(2*PH.g);/* ≈1.40 m */
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const rng=seed=>{let s=(seed>>>0)||7;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return (s%100000)/100000;};};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const angDiff=(a,b)=>{let d=b-a;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;return d;};

/* ------------------------------------------------------------------ themes (light & bright) */
const THEMES={
 market:{name:'Market Square',sky:['#9fd3ff','#fff3df'],fog:'#f6eee4',street:'#f1e2c6',street2:'#e9d5b0',grass:'#a8db8a',walls:['#fde2c4','#fbd3c0','#fbe7a1','#e9dbf7','#cfe8f7','#d9f2d0'],roof:['#e07a5f','#f2a65a','#d9825b'],smooth:'#ffffff',smoothRoof:'#e8eef7',water:'#7dd3fc',code:'#7c5cff'},
 harbour:{name:'Harbour Docks',sky:['#8fd0ff','#eefaff'],fog:'#e9f6fb',street:'#e7e1d3',street2:'#d6cdb8',grass:'#9fd8a5',walls:['#dbeafe','#e0f2fe','#fef3c7','#fde2e4','#e2e8f0','#ccfbf1'],roof:['#3b82f6','#0ea5e9','#f97316'],smooth:'#f8fafc',smoothRoof:'#e2e8f0',water:'#60c9f5',code:'#0ea5e9'},
 garden:{name:'Garden Terraces',sky:['#a5e4ff','#f4ffe9'],fog:'#eef9e8',street:'#efe6cf',street2:'#e1d3ae',grass:'#8fd474',walls:['#ecfccb','#fef9c3','#fce7f3','#e0f2fe','#f5f5f4','#dcfce7'],roof:['#16a34a','#65a30d','#ea580c'],smooth:'#fffdf5',smoothRoof:'#ecfdf5',water:'#86e0f0',code:'#16a34a'},
 clock:{name:'Clockwork Plaza',sky:['#ffd9a8','#fff6e8'],fog:'#fbefdc',street:'#f2dfc0',street2:'#e5c898',grass:'#b9d98c',walls:['#fde68a','#fed7aa','#fef3c7','#f5d0c5','#e7e5e4','#fcd9b6'],roof:['#b45309','#c2410c','#92400e'],smooth:'#fffaf0',smoothRoof:'#f5e9d6',water:'#7cd4f0',code:'#d97706'},
 castle:{name:'Castle Gates',sky:['#ffc9d6','#fff1f4'],fog:'#fbecef',street:'#efe2e2',street2:'#e0cccc',grass:'#a7d98b',walls:['#fbcfe8','#fecdd3','#e9d5ff','#fde68a','#f5f5f4','#fed7e2'],roof:['#be185d','#9333ea','#e11d48'],smooth:'#ffffff',smoothRoof:'#fce7f3',water:'#93d8f5',code:'#e11d48'},
 sky:{name:'Sky Observatory',sky:['#c7d2fe','#fdf4ff'],fog:'#f1eefe',street:'#ece9fb',street2:'#dcd6f7',grass:'#b8e3a0',walls:['#e0e7ff','#ede9fe','#fae8ff','#e0f2fe','#f1f5f9','#fef9c3'],roof:['#6366f1','#8b5cf6','#0ea5e9'],smooth:'#ffffff',smoothRoof:'#eef2ff',water:'#a5d8ff',code:'#4f46e5'}
};

/* ------------------------------------------------------------------ map parsing
   '.' street  ',' grass (trees)  '=' plaza tiles  '~' water (fall in = respawn)  '+' haystack
   'a'..'z' CLIMBABLE building, height 1..26 m      'A'..'Z' SMOOTH wall (cannot climb), height 1..26 m */
function parseDistrict(D){
  const rows=D.map.map(r=>r.replace(/\s+$/,''));const ZD=rows.length,XW=Math.max(...rows.map(r=>r.length));
  const cells=new Array(XW*ZD);
  for(let z=0;z<ZD;z++)for(let x=0;x<XW;x++){const ch=rows[z][x]||'.';let c;
    if(ch==='~')c={ch,water:true,h:-1};
    else if(ch>='a'&&ch<='z')c={ch,h:ch.charCodeAt(0)-96,climb:true,bld:true};
    else if(ch>='A'&&ch<='Z')c={ch,h:ch.charCodeAt(0)-64,climb:false,bld:true,smooth:true};
    else c={ch,h:0,grass:ch===',',plaza:ch==='=',hay:ch==='+'};
    cells[z*XW+x]=c;}
  /* building regions (same character, touching) get one colour each */
  let rid=0;const seen=new Uint8Array(XW*ZD);
  for(let i=0;i<cells.length;i++){if(seen[i]||!cells[i].bld)continue;const ch=cells[i].ch,q=[i];seen[i]=1;rid++;
    while(q.length){const j=q.pop();cells[j].region=rid;const x=j%XW,z=(j/XW)|0;
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dz])=>{const nx=x+dx,nz=z+dz;if(nx<0||nz<0||nx>=XW||nz>=ZD)return;const k=nz*XW+nx;if(!seen[k]&&cells[k].ch===ch){seen[k]=1;q.push(k);}});}}
  return{XW,ZD,cells};
}
const cellAt=(S,x,z)=>(x<0||z<0||x>=S.XW||z>=S.ZD)?null:S.cells[z*S.XW+x];
const topAt=(S,x,z)=>{const c=cellAt(S,Math.floor(x),Math.floor(z));return c&&!c.water?c.h:-99;};

/* ------------------------------------------------------------------ code zones → 3D boxes */
const FACES={s:{R:[1,0],V:[0,1]},n:{R:[-1,0],V:[0,-1]},e:{R:[0,-1],V:[1,0]},w:{R:[0,1],V:[-1,0]}};
const ZONE_BASE='*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}body{position:relative;font:14px system-ui,sans-serif;color:#2a2840}';
function mkFrame(){const f=document.createElement('iframe');f.setAttribute('sandbox','allow-same-origin');f.setAttribute('aria-hidden','true');f.tabIndex=-1;
  /* kept inside the viewport (but invisible) so CSS animations and timers keep running */
  f.style.cssText='position:fixed;left:0;top:0;border:0;opacity:0.001;pointer-events:none;z-index:-5';document.body.appendChild(f);return f;}
function readRects(Z,a){const L=Z.lesson,W=Z.w,H=Z.h;const sel=L.solid||'.platform';let els=[];try{els=a.$$(sel);}catch(e){}
  return els.map(el=>{const r=el.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height,col:a.css(el,'backgroundColor'),label:(el.textContent||'').trim().slice(0,12)};})
    .map(r=>{const x1=Math.max(0,r.x),y1=Math.max(0,r.y),x2=Math.min(W,r.x+r.w),y2=Math.min(H,r.y+r.h);return Object.assign(r,{x:x1,y:y1,w:x2-x1,h:y2-y1});})
    .filter(r=>r.w>=6&&r.h>=4);}
function layout(Z,frame,code){
  const run=(frame._q||Promise.resolve()).then(async()=>{const L=Z.lesson;frame.style.width=Z.w+'px';frame.style.height=Z.h+'px';
    const a=await renderInto(frame,code,ZONE_BASE,{scripts:!!L.js});if(L.js)await a.wait(60);return{rects:readRects(Z,a),api:a};});
  frame._q=run.catch(()=>{});return run;}
async function checkCode(Z,frame,code){const {rects,api}=await layout(Z,frame,code);
  if(Z.lesson.js&&api.errs.length)return{ok:false,rects,msg:'Your JavaScript has an error: `'+String(api.errs[0]).replace(/`/g,"'").slice(0,120)+'`. Check spelling, brackets and quotes.'};
  for(const[fn,msg]of(Z.lesson.checks||[])){let ok=false;try{ok=!!(await fn(api));}catch(e){}if(!ok)return{ok:false,rects,msg};}
  if(!rects.length&&!Z.lesson.empty)return{ok:false,rects,msg:'Nothing appeared! The blocks are the elements that match `'+(Z.lesson.solid||'.platform')+'`.'};
  return{ok:true,rects};}
/* a zone: {at:[cx,cz], y, w, h (px), kind:'side'|'plan', face:'s'|'n'|'e'|'w', depth (m), thick (m)} */
function boxOf(Z,r){const F=FACES[Z.face||'s'],W=Z.w/PX,Hm=Z.h/PX;const a0=-W/2+r.x/PX,a1=a0+r.w/PX;let b0,b1,y0,y1;
  if(Z.kind==='plan'){/* page top = far side (away from the viewer, -V) */b0=-Hm/2+r.y/PX;b1=b0+r.h/PX;y1=Z.y;y0=Z.y-(Z.thick||.3);}
  else{const d=Z.depth||2;b0=-d/2;b1=d/2;y1=Z.y-r.y/PX;y0=y1-r.h/PX;}
  const xs=[a0,a1].flatMap(a=>[b0,b1].map(b=>Z.at[0]+F.R[0]*a+F.V[0]*b)),zs=[a0,a1].flatMap(a=>[b0,b1].map(b=>Z.at[1]+F.R[1]*a+F.V[1]*b));
  return{x0:Math.min(...xs),x1:Math.max(...xs),z0:Math.min(...zs),z1:Math.max(...zs),y0,y1,col:r.col,label:r.label};}
const zoneVolume=Z=>{const F=FACES[Z.face||'s'],W=Z.w/PX,Hm=Z.h/PX;
  return Z.kind==='plan'?boxOf(Z,{x:0,y:0,w:Z.w,h:Z.h}):Object.assign(boxOf(Z,{x:0,y:0,w:Z.w,h:Z.h}),{});};

/* ------------------------------------------------------------------ reachability validator
   Used by the tests: proves each district can be finished with the answers, and that every
   terminal is really NEEDED. 'safe' = a careful kid's jump; 'full' = the best possible jump. */
function buildCols(S,boxes){const R=2,NX=S.XW*R,NZ=S.ZD*R;const cols=new Array(NX*NZ);
  for(let i=0;i<cols.length;i++){const gx=i%NX,gz=(i/NX)|0,c=cellAt(S,gx>>1,gz>>1);cols[i]={s:c&&!c.water?[[-10,c.h,!!c.climb,1]]:[],t:null,cx:(gx+.5)/R,cz:(gz+.5)/R};}
  for(const b of boxes){const gx0=Math.max(0,Math.floor(b.x0*R)),gx1=Math.min(NX-1,Math.floor((b.x1-1e-6)*R)),gz0=Math.max(0,Math.floor(b.z0*R)),gz1=Math.min(NZ-1,Math.floor((b.z1-1e-6)*R));
    for(let gz=gz0;gz<=gz1;gz++)for(let gx=gx0;gx<=gx1;gx++){const ox=Math.min(b.x1,(gx+1)/R)-Math.max(b.x0,gx/R),oz=Math.min(b.z1,(gz+1)/R)-Math.max(b.z0,gz/R);
      if(ox>=.2&&oz>=.2)cols[gz*NX+gx].s.push(b.thin?[b.y1-.05,b.y1,false,0,b.thin]:[b.y0,b.y1,false,0]);}}
  const free=(col,y0,y1)=>!col.s.some(q=>!q[4]&&q[0]<y1&&q[1]>y0);
  for(const col of cols){col.t=[];for(const q of col.s){if(free(col,q[1]+.01,q[1]+PH.h))col.t.push({h:q[1],climb:q[2]&&q[3],anim:q[4]||0});}}
  return{cols,NX,NZ,R,free};}
function reach(S,boxes,from,targets,mode){
  const {cols,NX,NZ,R,free}=buildCols(S,boxes);const full=mode==='full';
  const v=full?PH.jump:Math.sqrt(2*PH.g*1.1),run=full?PH.run:PH.run*.8,margin=full?1.15:0,upMax=full?JUMP_H+.06:1.05;
  const reachD=dy=>{/* dy = target height - start height */if(dy>upMax)return -1;const d=v*v-2*PH.g*dy;if(d<0)return full&&dy<=upMax?margin:-1;return run*(v+Math.sqrt(d))/PH.g+margin;};
  const colAt=(x,z)=>{const gx=Math.floor(x*R),gz=Math.floor(z*R);return gx<0||gz<0||gx>=NX||gz>=NZ?-1:gz*NX+gx;};
  const nodeAt=(x,z,h)=>{const ci=colAt(x,z);if(ci<0)return null;const col=cols[ci];let best=null;for(let k=0;k<col.t.length;k++){const t=col.t[k];if(h==null||Math.abs(t.h-h)<.6){if(!best||t.h>col.t[best[1]].h)best=[ci,k];}}return best;};
  const start=nodeAt(from[0],from[1],from[2]);if(!start)return{ok:false,why:'no ground at the start'};
  const key=(ci,k)=>ci*64+k;const seen=new Set([key(...start)]),q=[start];const MAXR=Math.ceil((full?8:6)*R);
  while(q.length){const [ci,k]=q.shift();const col=cols[ci],h=col.t[k].h,gx=ci%NX,gz=(ci/NX)|0;
    /* riding a moving lift: all samples of a moving block in this column connect */
    if(col.t[k].anim)col.t.forEach((t,k2)=>{if(t.anim===col.t[k].anim&&!seen.has(key(ci,k2))){seen.add(key(ci,k2));q.push([ci,k2]);}});
    for(let dz=-MAXR;dz<=MAXR;dz++)for(let dx=-MAXR;dx<=MAXR;dx++){if(!dx&&!dz)continue;const nx=gx+dx,nz=gz+dz;if(nx<0||nz<0||nx>=NX||nz>=NZ)continue;
      const ci2=nz*NX+nx,c2=cols[ci2],dist=Math.hypot(dx,dz)/R,adj=Math.abs(dx)<=1&&Math.abs(dz)<=1;
      for(let k2=0;k2<c2.t.length;k2++){if(seen.has(key(ci2,k2)))continue;const t=c2.t[k2],dy=t.h-h;let ok=false;
        if(adj&&t.climb&&dy>0)ok=true; /* climb a building wall */
        else{const D=reachD(dy);if(D>=0&&dist<=Math.max(D,adj?1:0)){
          /* nothing in the way: destination clear from its floor up, path clear at head height */
          const top=Math.max(h,t.h);ok=free(c2,t.h+.01,top+PH.h);
          if(ok&&!adj){const n=Math.ceil(dist/.35);for(let s=1;s<n&&ok;s++){const px=(gx+.5+dx*s/n)/R,pz=(gz+.5+dz*s/n)/R,cm=colAt(px,pz);if(cm>=0&&cm!==ci&&cm!==ci2)ok=free(cols[cm],top+(full?JUMP_H:.05),top+PH.h);}}}}
        if(ok){seen.add(key(ci2,k2));q.push([ci2,k2]);}}}}
  return{hits:targets.map(tg=>{if(!tg)return false;const ci=colAt(tg[0],tg[1]);if(ci<0)return false;const col=cols[ci];return col.t.some((t,k)=>seen.has(key(ci,k))&&(tg[2]==null||Math.abs(t.h-tg[2])<.6));})};}

/* ------------------------------------------------------------------ textures */
function canvasTex(w,h,draw,rep=true){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping;}t.anisotropy=4;return t;}
const TEX={};
function textures(){if(TEX.climb)return TEX;
  /* climbable wall: plaster, a window, ledges and handholds (2 m × 2 m) */
  TEX.climb=canvasTex(128,128,(c,w,h)=>{c.fillStyle='#ffffff';c.fillRect(0,0,w,h);const r=rng(5);
    for(let k=0;k<70;k++){c.fillStyle=`rgba(0,0,0,${.02+r()*.03})`;c.fillRect(r()*w,r()*h,2+r()*6,2+r()*3);}
    c.fillStyle='rgba(120,90,60,.16)';c.fillRect(0,h-10,w,10);c.fillStyle='rgba(255,255,255,.6)';c.fillRect(0,h-12,w,3);
    c.fillStyle='#8aa6c4';c.fillRect(38,26,52,58);c.fillStyle='#b9d4ee';c.fillRect(42,30,20,24);c.fillRect(66,30,20,24);c.fillRect(42,58,20,22);c.fillRect(66,58,20,22);
    c.fillStyle='rgba(255,255,255,.75)';c.fillRect(34,84,60,6);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(34,90,60,3);
    c.fillStyle='rgba(120,90,60,.25)';[[12,40],[110,56],[16,100],[108,14]].forEach(([x,y])=>c.fillRect(x,y,10,4));});
  /* smooth wall: polished stone with gold seams — nothing to grab */
  TEX.smooth=canvasTex(128,128,(c,w,h)=>{const g=c.createLinearGradient(0,0,w,0);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#f3f1fa');g.addColorStop(1,'#ffffff');c.fillStyle=g;c.fillRect(0,0,w,h);
    c.fillStyle='rgba(250,204,21,.55)';c.fillRect(0,0,w,3);c.fillRect(0,0,3,h);c.fillStyle='rgba(160,150,200,.10)';for(let k=0;k<5;k++)c.fillRect(0,20+k*22,w,1);});
  TEX.water=canvasTex(128,128,(c,w,h)=>{c.fillStyle='#ffffff';c.fillRect(0,0,w,h);const r=rng(9);c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=2;c.fillStyle='rgba(30,120,180,.10)';c.fillRect(0,0,w,h);
    for(let k=0;k<14;k++){const x=r()*w,y=r()*h;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+8,y-4,x+16,y);c.stroke();}});
  return TEX;}
function labelTex(txt,bg,fg){return canvasTex(256,96,(c,w,h)=>{c.fillStyle=bg;const r=26;c.beginPath();c.moveTo(r,4);c.arcTo(w-4,4,w-4,h-4,r);c.arcTo(w-4,h-4,4,h-4,r);c.arcTo(4,h-4,4,4,r);c.arcTo(4,4,w-4,4,r);c.fill();
  c.strokeStyle='#2a2840';c.lineWidth=6;c.stroke();c.fillStyle=fg;c.font='bold 40px system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(txt,w/2,h/2+2);},false);}

/* ------------------------------------------------------------------ geometry helpers */
function GB(){const P=[],N=[],C=[],U=[];
  return{P,quad(o,u,v,n,col,uv){const a=o,b=[o[0]+u[0],o[1]+u[1],o[2]+u[2]],c=[b[0]+v[0],b[1]+v[1],b[2]+v[2]],d=[o[0]+v[0],o[1]+v[1],o[2]+v[2]];
      for(const p of[a,b,c,a,c,d])P.push(p[0],p[1],p[2]);for(let i=0;i<6;i++){N.push(n[0],n[1],n[2]);C.push(col.r,col.g,col.b);}
      if(uv){const[u0,v0,u1,v1]=uv;U.push(u0,v0,u1,v0,u1,v1,u0,v0,u1,v1,u0,v1);}else for(let i=0;i<12;i++)U.push(0);},
    geo(){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));g.computeBoundingSphere();return g;}};}
const flat=g=>{const n=g.index?g.toNonIndexed():g;n.computeVertexNormals();return n;};
const lam=(c,o={})=>new THREE.MeshLambertMaterial(Object.assign({color:c},o));
function part(geo,col,x=0,y=0,z=0){const m=new THREE.Mesh(flat(geo),lam(col));m.position.set(x,y,z);m.castShadow=true;return m;}

/* ------------------------------------------------------------------ build the city */
function buildCity(D,S,th,low){
  const grp=new THREE.Group(),tx=textures();
  const wallsC=GB(),wallsS=GB(),tops=GB();const C=x=>new THREE.Color(x);
  const wallCol=c=>C(c.smooth?th.smooth:th.walls[hash(D.id+c.region)%th.walls.length]);
  const roofCol=c=>C(c.smooth?th.smoothRoof:th.roof[hash(D.id+'r'+c.region)%th.roof.length]);
  const street=C(th.street),street2=C(th.street2),grass=C(th.grass),bank=C(th.street2).multiplyScalar(.9),hay=C('#f6d365');
  const DIRS=[[1,0],[-1,0],[0,1],[0,-1]];
  for(let z=0;z<S.ZD;z++)for(let x=0;x<S.XW;x++){const c=cellAt(S,x,z);if(c.water)continue;const h=c.h;
    let col;if(c.bld)col=roofCol(c);else if(c.grass)col=grass.clone().offsetHSL(0,0,((hash(x+':'+z)%7)-3)*.008);else if(c.plaza)col=((x+z)%2?street:street2).clone();else col=street.clone().offsetHSL(0,0,((hash(x*7+':'+z)%5)-2)*.01);
    tops.quad([x,h,z+1],[1,0,0],[0,0,-1],[0,1,0],col);
    for(const[dx,dz]of DIRS){const n=cellAt(S,x+dx,z+dz);const nh=n?(n.water?-1.6:n.h):-1.6;if(nh>=h)continue;
      const nrm=[dx,0,dz],u=[dz,0,-dx],cxp=x+.5+dx*.5,czp=z+.5+dz*.5,o=[cxp-u[0]*.5,nh,czp-u[2]*.5];
      if(c.bld){const tgt=c.smooth?wallsS:wallsC;const along=o[0]*u[0]+o[2]*u[2];tgt.quad(o,u,[0,h-nh,0],nrm,wallCol(c),[along/2,nh/2,(along+1)/2,h/2]);
        /* roof trim */const tc=roofCol(c).multiplyScalar(.85);tops.quad([o[0]+dx*.06,h-.25,o[2]+dz*.06],u,[0,.25,0],nrm,tc);}
      else tops.quad(o,u,[0,h-nh,0],nrm,bank);}}
  const mC=new THREE.Mesh(wallsC.geo(),lam('#ffffff',{map:tx.climb,vertexColors:true})),mS=new THREE.Mesh(wallsS.geo(),lam('#ffffff',{map:tx.smooth,vertexColors:true})),mT=new THREE.Mesh(tops.geo(),lam('#ffffff',{vertexColors:true}));
  [mC,mS,mT].forEach(m=>{m.castShadow=!low;m.receiveShadow=!low;grp.add(m);});
  /* sea + sea bed */
  const water=new THREE.Mesh(new THREE.PlaneGeometry(600,600),lam(th.water,{map:tx.water,transparent:true,opacity:.88}));water.rotation.x=-Math.PI/2;water.position.set(S.XW/2,-.35,S.ZD/2);tx.water.repeat.set(150,150);water.receiveShadow=!low;grp.add(water);
  const bed=new THREE.Mesh(new THREE.PlaneGeometry(600,600),lam('#f3e4c2'));bed.rotation.x=-Math.PI/2;bed.position.set(S.XW/2,-1.6,S.ZD/2);grp.add(bed);
  /* decorations: trees on grass, hay, lanterns, flags on tall roofs */
  const r=rng(hash(D.id));const trunk=lam('#b07a4e'),leaf=[lam('#7cc95a'),lam('#5fb35a'),lam('#9ad66f')];
  const tGeo=flat(new THREE.CylinderGeometry(.09,.13,1,5)),lGeo=flat(new THREE.IcosahedronGeometry(.75,0)),coneGeo=flat(new THREE.ConeGeometry(.7,1.6,6));
  for(let z=0;z<S.ZD;z++)for(let x=0;x<S.XW;x++){const c=cellAt(S,x,z);
    if(c.grass&&r()<.12){const t=new THREE.Group();const tr=new THREE.Mesh(tGeo,trunk);tr.position.y=.5;const lf=new THREE.Mesh(r()<.5?lGeo:coneGeo,leaf[Math.floor(r()*3)]);lf.position.y=1.4;const s=.7+r()*.5;t.scale.set(s,s,s);t.add(tr,lf);t.position.set(x+.5,0,z+.5);t.rotation.y=r()*6;tr.castShadow=lf.castShadow=!low;grp.add(t);}
    if(c.hay){const hm=new THREE.Mesh(flat(new THREE.SphereGeometry(.7,7,4,0,Math.PI*2,0,Math.PI/2)),lam('#f6d365'));hm.scale.y=.8;hm.position.set(x+.5,0,z+.5);grp.add(hm);}
    if(c.bld&&c.h>=12&&r()<.05){const pole=new THREE.Mesh(tGeo,lam('#e5e7eb'));pole.scale.set(.5,2.2,.5);pole.position.set(x+.5,c.h+1.1,z+.5);const fl=new THREE.Mesh(new THREE.PlaneGeometry(.9,.5),lam(th.code,{side:THREE.DoubleSide}));fl.position.set(x+.95,c.h+1.9,z+.5);fl.userData.flag=1;grp.add(pole,fl);}}
  /* drifting clouds */
  const cg=flat(new THREE.IcosahedronGeometry(3,0)),cm=lam('#ffffff',{transparent:true,opacity:.92});
  for(let k=0;k<10;k++){const cl=new THREE.Group();for(let j=0;j<3;j++){const m=new THREE.Mesh(cg,cm);m.position.set(j*3.2-3,Math.sin(j)*1,0);m.scale.set(1,.55,.8);cl.add(m);}cl.position.set(r()*S.XW*1.6-S.XW*.3,32+r()*14,r()*S.ZD*1.6-S.ZD*.3);cl.userData.cloud=.3+r()*.5;grp.add(cl);}
  return grp;}

/* ------------------------------------------------------------------ the hero: Kai, a hooded runner */
function mkHero(){const g=new THREE.Group(),b=new THREE.Group();g.add(b);
  const cloak='#f8fafc',cloak2='#dbe4f0',sash='#ef4444',skin='#f1c27d',boot='#2a2840',pants='#64748b';
  const legL=new THREE.Group(),legR=new THREE.Group();[legL,legR].forEach((l,i)=>{l.position.set(i?.12:-.12,.82,0);l.add(part(new THREE.BoxGeometry(.17,.62,.18),pants,0,-.33,0),part(new THREE.BoxGeometry(.2,.16,.3),boot,0,-.72,.05));b.add(l);});
  const torso=part(new THREE.CylinderGeometry(.24,.3,.68,7),cloak,0,1.15,0);b.add(torso);
  b.add(part(new THREE.CylinderGeometry(.31,.31,.09,7),sash,0,.98,0));
  const skirt=part(new THREE.ConeGeometry(.36,.5,7,1,true),cloak2,0,.82,0);skirt.material.side=THREE.DoubleSide;b.add(skirt);
  const armL=new THREE.Group(),armR=new THREE.Group();[armL,armR].forEach((a,i)=>{a.position.set(i?.32:-.32,1.42,0);a.add(part(new THREE.BoxGeometry(.13,.55,.14),cloak,0,-.26,0),part(new THREE.BoxGeometry(.12,.12,.12),skin,0,-.58,0));b.add(a);});
  const head=new THREE.Group();head.position.y=1.62;b.add(head);
  head.add(part(new THREE.IcosahedronGeometry(.19,1),skin,0,-.02,.1));
  const hood=part(new THREE.IcosahedronGeometry(.27,1),cloak,0,.05,-.05);hood.scale.set(1,1.08,1.1);head.add(hood);const tip=part(new THREE.ConeGeometry(.12,.3,5),cloak,0,.2,-.24);tip.rotation.x=-1.1;head.add(tip);
  const eyes=new THREE.Mesh(new THREE.BoxGeometry(.2,.04,.02),lam('#2a2840'));eyes.position.set(0,.0,.28);head.add(eyes);
  const tail=[];let prev=b;for(let i=0;i<5;i++){const s=part(new THREE.BoxGeometry(.12,.04,.22),sash,0,0,0);s.position.set(.2,1.0,-.18-i*.2);b.add(s);tail.push(s);}
  g.userData={b,legL,legR,armL,armR,head,tail};return g;}
function mkOwl(){const g=new THREE.Group();const body=part(new THREE.IcosahedronGeometry(.22,0),'#c8a27a');body.scale.set(1,1.15,1);g.add(body);
  g.add(part(new THREE.IcosahedronGeometry(.14,0),'#fff7ed',0,.04,.12));
  [-1,1].forEach(s=>{const e=part(new THREE.SphereGeometry(.06,6,4),'#ffffff',s*.08,.1,.17);const p=new THREE.Mesh(new THREE.SphereGeometry(.03,5,3),lam('#2a2840'));p.position.set(0,0,.045);e.add(p);g.add(e);
    const ear=part(new THREE.ConeGeometry(.05,.12,4),'#a37b56',s*.13,.27,0);g.add(ear);
    const w=part(new THREE.BoxGeometry(.06,.24,.18),'#a37b56',s*.24,0,0);w.userData.wing=s;g.add(w);});
  g.add(part(new THREE.ConeGeometry(.03,.07,4),'#f59e0b',0,.03,.22).rotateX(Math.PI/2));return g;}
function mkBot(){const g=new THREE.Group();g.add(part(new THREE.BoxGeometry(.7,.8,.5),'#94a3b8',0,.75,0),part(new THREE.BoxGeometry(.5,.38,.42),'#cbd5e1',0,1.36,0));
  const eye=new THREE.Mesh(new THREE.BoxGeometry(.32,.08,.05),new THREE.MeshBasicMaterial({color:'#ef4444'}));eye.position.set(0,1.38,.22);g.add(eye);
  g.add(part(new THREE.BoxGeometry(.18,.36,.2),'#64748b',-.18,.18,0),part(new THREE.BoxGeometry(.18,.36,.2),'#64748b',.18,.18,0));
  const ant=part(new THREE.CylinderGeometry(.02,.02,.3,4),'#64748b',0,1.7,0);g.add(ant);g.add(part(new THREE.SphereGeometry(.06,5,4),'#f59e0b',0,1.86,0));return g;}
function mkFeather(){const g=new THREE.Group();const m=new THREE.Mesh(flat(new THREE.ConeGeometry(.14,.62,4)),lam('#fbbf24',{emissive:'#7a4b00',emissiveIntensity:.35}));m.scale.z=.35;m.rotation.z=.4;g.add(m);
  const halo=new THREE.Mesh(new THREE.RingGeometry(.32,.4,16),new THREE.MeshBasicMaterial({color:'#fde68a',transparent:true,opacity:.6,side:THREE.DoubleSide}));g.add(halo);g.userData.halo=halo;return g;}
function mkTerminal(col){const g=new THREE.Group();g.add(part(new THREE.BoxGeometry(.7,1.0,.5),'#e2e8f0',0,.5,0),part(new THREE.BoxGeometry(.9,.1,.7),'#94a3b8',0,.05,0));
  const scr=new THREE.Mesh(new THREE.BoxGeometry(.78,.5,.08),new THREE.MeshBasicMaterial({color:col}));scr.position.set(0,1.22,.05);scr.rotation.x=-.35;g.add(scr);g.userData.scr=scr;
  const bang=new THREE.Sprite(new THREE.SpriteMaterial({map:labelTex('</>',  '#ffd166','#2a2840'),depthTest:false}));bang.scale.set(1.2,.45,1);bang.position.y=2.2;g.add(bang);g.userData.bang=bang;return g;}
function mkPerch(th){const g=new THREE.Group();const beam=part(new THREE.BoxGeometry(.25,.25,2.4),'#b07a4e',0,.4,.9);g.add(beam);
  g.add(part(new THREE.CylinderGeometry(.08,.1,.8,5),'#b07a4e',0,.4,-.2));
  const statue=mkOwl();statue.scale.set(1.8,1.8,1.8);statue.position.set(0,.85,1.9);g.add(statue);
  const beacon=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,60,10,1,true),new THREE.MeshBasicMaterial({color:'#fde68a',transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide}));beacon.position.y=30;g.add(beacon);g.userData.beacon=beacon;return g;}

/* ------------------------------------------------------------------ DOM: the game screen */
const sec=document.createElement('section');sec.className='screen hidden rift spire';sec.id='g-spire';
sec.innerHTML=`<div class="rfTop"><button class="chip" data-s="back">← Arcade</button><b class="rfTitle pix spTitle">SPIRE CITY</b><span class="rfLevel"></span>
   <span class="rfStats"><span class="chip spFeathers"></span><button class="chip" data-s="menu">⏸ Menu</button></span></div>
  <div class="rfMain"><div class="rfStageWrap"><div class="rfStage spStage"><div class="spView" aria-label="Spire City 3D view"></div>
      <div class="spGoal"><span class="spArrow">➤</span><span class="spGoalTxt"></span></div>
      <div class="rfBanner pix"></div><div class="rfDialog hidden"><span class="rfWho"></span><span class="rfFace"></span><span class="rfText"></span><span class="more">▼</span></div>
      <button class="rfHack hidden">⌨️ Hack the terminal <kbd>E</kbd></button><div class="rfFlash"></div><div class="spFade"></div>
      <div class="spStick hidden"><i></i></div>
      <div class="spBtns"><button class="spJump" aria-label="Jump">⤒</button></div>
      <div class="spHelp">🖱️ drag to look · <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move · <kbd>Space</kbd> jump · run into a wall to climb · <kbd>E</kbd> hack</div></div></div>
   <aside class="rfPanel hidden" aria-label="Code terminal"></aside></div>`;
document.body.insertBefore(sec,$('#modal'));
const mapScr=document.createElement('div');mapScr.className='overlay hidden rfMap spMap';sec.after(mapScr);
const $s=q=>sec.querySelector(q),view=$s('.spView');
const KEY=()=>'spire-v1'+SFX;
const freshSave=()=>({stars:{},feathers:{},zones:{},code:{},seenIntro:{},last:null,gfx:'auto'});
let SV=(()=>{const o=store.get(KEY(),null);const f=freshSave();if(!o||typeof o!=='object')return f;for(const k in f)if(o[k]==null||typeof o[k]!==typeof f[k])o[k]=f[k];return o;})();
const saveSV=()=>store.set(KEY(),SV);
const DISTS=()=>SPIRE_DATA.districts;
const allLevels=()=>DISTS().map((d,i)=>Object.assign(d,{_i:i}));
const levelById=id=>allLevels().find(L=>L.id===id);
const zoneId=(L,i)=>L.id+':z'+i;
const lowEnd=()=>SV.gfx==='fast'||(SV.gfx==='auto'&&((navigator.deviceMemory&&navigator.deviceMemory<=4)||(matchMedia('(pointer:coarse)').matches&&Math.min(screen.width,screen.height)<500)));

/* ------------------------------------------------------------------ three.js setup (made once, on first visit) */
let R3=null;
function initGL(){if(R3)return R3;let renderer;
  try{renderer=new THREE.WebGLRenderer({antialias:!lowEnd(),powerPreference:'high-performance'});}catch(e){return null;}
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  view.appendChild(renderer.domElement);renderer.domElement.className='spCv';
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(60,1,.1,700);
  const hemi=new THREE.HemisphereLight('#ffffff','#cdbf9f',.58),sun=new THREE.DirectionalLight('#fff3dc',.62);sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);const sc=sun.shadow.camera;sc.left=sc.bottom=-30;sc.right=sc.top=30;sc.near=1;sc.far=140;sun.shadow.bias=-.0006;sun.shadow.normalBias=.04;
  scene.add(hemi,sun,sun.target);
  const skyGeo=new THREE.SphereGeometry(450,24,12),skyMat=new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide,fog:false,depthWrite:false});const sky=new THREE.Mesh(skyGeo,skyMat);scene.add(sky);
  R3={renderer,scene,camera,sun,hemi,sky};return R3;}
function paintSky(th){const g=R3.sky.geometry,p=g.attributes.position,cols=[];const a=new THREE.Color(th.sky[0]),b=new THREE.Color(th.sky[1]);
  for(let i=0;i<p.count;i++){const t=clamp(p.getY(i)/450,0,1);const c=b.clone().lerp(a,Math.pow(t,.6));cols.push(c.r,c.g,c.b);}g.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));
  R3.scene.fog=new THREE.Fog(th.fog,55,190);}
function fitView(){if(!R3)return;const w=view.clientWidth,h=view.clientHeight;if(w<20||h<20)return;const low=lowEnd();
  R3.renderer.setPixelRatio(Math.min(devicePixelRatio||1,low?1:1.75));R3.renderer.setSize(w,h,false);R3.camera.aspect=w/h;R3.camera.updateProjectionMatrix();}
if(window.ResizeObserver)new ResizeObserver(()=>{if(CURRENT==='spire')fitView();}).observe(view);

/* ------------------------------------------------------------------ level state */
let LV=null,S=null,TH=null,city=null,ZONES=[],player=null,hero=null,owl=null,feathers=[],bots=[],perch=null,mode='map',keys={},pressed={},tAcc=0,lastT=0,
    timeIn=0,got=0,dlg=null,activeZone=null,levelHints=0,levelAns=false,checkpoint=null,won=false,cam={yaw:Math.PI,pitch:.42,dist:7.5,tx:0,ty:0,tz:0,lastDrag:-9},stick={x:0,y:0},preview=null,beam=null,dyn=null;
function mkPlayer(x,z){const y=Math.max(0,topAt(S,x,z));return{x,y,z,vx:0,vy:0,vz:0,ground:true,climb:null,face:0,phase:0,on:null,landT:0};}
function startLevel(id){const L=levelById(id);if(!L||!initGL())return;
  mapScr.classList.add('hidden');LV=L;S=parseDistrict(L);TH=THEMES[L.theme]||THEMES.market;won=false;
  const low=lowEnd();R3.renderer.shadowMap.enabled=!low;R3.sun.castShadow=!low;
  if(city){R3.scene.remove(city);city.traverse(o=>{if(o.geometry)o.geometry.dispose();});}
  ZONES.forEach(Z=>{Z.frame&&Z.frame.remove();});if(!preview)preview=mkFrame();
  city=new THREE.Group();city.add(buildCity(L,S,TH,low));R3.scene.add(city);paintSky(TH);
  hero=mkHero();owl=mkOwl();city.add(hero,owl);
  const sp=L.start||[2,2];player=mkPlayer(sp[0]+.5,sp[1]+.5);player.face=L.startFace||0;checkpoint={x:player.x,z:player.z};
  cam.yaw=player.face+Math.PI;cam.tx=player.x;cam.ty=player.y+1.4;cam.tz=player.z;
  /* feathers */got=0;feathers=(L.feathers||[]).map(([x,z])=>{const m=mkFeather();const y=Math.max(0,topAt(S,x+.5,z+.5))+1.1;m.position.set(x+.5,y,z+.5);city.add(m);return{m,x:x+.5,y,z:z+.5,got:false};});
  /* rust bots */bots=(L.bots||[]).map(([x1,z1,x2,z2],i)=>{const m=mkBot();city.add(m);return{m,a:[x1+.5,z1+.5],b:[x2+.5,z2+.5],t:i*.37,dir:1};});
  /* sync perch */perch=null;if(L.sync){const[x,z]=L.sync;const m=mkPerch(TH);const y=topAt(S,x+.5,z+.5);m.position.set(x+.5,y,z+.5);m.rotation.y=L.syncFace||0;city.add(m);perch={m,x:x+.5,y,z:z+.5};}
  /* code zones */
  ZONES=(L.zones||[]).map((z,i)=>{const Z=Object.assign({},z,{i,id:zoneId(L,i),lesson:z.lesson,solved:!!SV.zones[zoneId(L,i)],frame:mkFrame(),rects:[],show:[],from:null,ft:1,ghost:null,boxes:[],prev:[],meshes:[],gmeshes:[]});
    const tm=mkTerminal(TH.code);const tx=z.term[0]+.5,tz=z.term[1]+.5;tm.position.set(tx,Math.max(0,topAt(S,tx,tz)),tz);tm.rotation.y=Math.atan2(Z.at[0]-tx,Z.at[1]-tz);city.add(tm);Z.tmesh=tm;Z.tpos={x:tx,y:tm.position.y,z:tz};
    const vol=boxOf(Z,{x:0,y:0,w:Z.w,h:Z.h});const eg=new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));const out=new THREE.LineSegments(eg,new THREE.LineBasicMaterial({color:TH.code,transparent:true,opacity:.7}));
    out.scale.set(vol.x1-vol.x0,Math.max(.05,vol.y1-vol.y0),vol.z1-vol.z0);out.position.set((vol.x0+vol.x1)/2,(vol.y0+vol.y1)/2,(vol.z0+vol.z1)/2);city.add(out);Z.outline=out;
    const tag=new THREE.Sprite(new THREE.SpriteMaterial({map:labelTex('⚠ BROKEN','#ffffff','#7c5cff'),depthTest:true}));tag.scale.set(2.2,.8,1);tag.position.set(out.position.x,vol.y1+1,out.position.z);city.add(tag);Z.tag=tag;
    const code=Z.solved?(SV.code[Z.id]||Z.lesson.answer):Z.lesson.starter;
    layout(Z,Z.frame,code).then(r=>{Z.rects=r.rects;Z.show=r.rects.map(x=>({...x}));});return Z;});
  const bg=new THREE.CylinderGeometry(.35,.35,40,8,1,true);beam=new THREE.Mesh(bg,new THREE.MeshBasicMaterial({color:TH.code,transparent:true,opacity:.18,depthWrite:false,side:THREE.DoubleSide}));city.add(beam);
  timeIn=0;levelHints=0;levelAns=false;mode='play';fitView();hud();$s('.rfLevel').textContent=`${L._i+1}. ${L.name}`;banner(L.name.toUpperCase());
  if(L.story&&!SV.seenIntro[L.id]){SV.seenIntro[L.id]=1;saveSV();say(L.story);}
}

/* ------------------------------------------------------------------ dynamic boxes (from code) */
function zoneBoxes(Z){return Z.show.map((r,j)=>Object.assign(boxOf(Z,r),{key:Z.i*100+j,zone:Z}));}
function allDyn(){const out=[];ZONES.forEach(Z=>out.push(...zoneBoxes(Z)));return out;}
const animZones=dt=>{ZONES.forEach(Z=>{
  if(Z.ft<1){Z.ft=Math.min(1,Z.ft+dt*2.2);const e=1-Math.pow(1-Z.ft,3);Z.show=Z.rects.map((r,i)=>{const f=Z.from&&Z.from[i]||{x:r.x,y:Z.kind==='plan'?r.y:r.y+r.h,w:r.w,h:Z.kind==='plan'?r.h:0};return{...r,x:f.x+(r.x-f.x)*e,y:f.y+(r.y-f.y)*e,w:f.w+(r.w-f.w)*e,h:f.h+(r.h-f.h)*e};});}
  else if(Z.lesson.anim&&Z.frame.contentDocument){/* moving blocks: read the live layout every frame */
    try{const a=makeApi(Z.frame.contentDocument,Z.frame.contentWindow);const rs=readRects(Z,a);if(rs.length===Z.show.length||!Z.show.length){Z.rects=rs;Z.show=rs;}}catch(e){}}
  /* the see-through preview of a moving lesson moves too */
  if(Z.lesson.anim&&activeZone===Z&&Z.ghost&&preview&&preview.contentDocument){try{Z.ghost=readRects(Z,makeApi(preview.contentDocument,preview.contentWindow));}catch(e){}}});};
const zoneCol=(r)=>/rgba?\(0, 0, 0, 0\)|transparent/.test(r.col||'')?TH.code:(r.col||TH.code);
const unit=new THREE.BoxGeometry(1,1,1),unitEdges=new THREE.EdgesGeometry(unit);
function syncMeshes(){
  ZONES.forEach(Z=>{const bs=zoneBoxes(Z);
    while(Z.meshes.length<bs.length){const m=new THREE.Mesh(unit,lam('#ffffff'));m.castShadow=m.receiveShadow=!lowEnd();const e=new THREE.LineSegments(unitEdges,new THREE.LineBasicMaterial({color:'#ffffff',transparent:true,opacity:.55}));m.add(e);city.add(m);Z.meshes.push(m);}
    Z.meshes.forEach((m,j)=>{const b=bs[j];m.visible=!!b;if(!b)return;m.scale.set(Math.max(.02,b.x1-b.x0),Math.max(.02,b.y1-b.y0),Math.max(.02,b.z1-b.z0));m.position.set((b.x0+b.x1)/2,(b.y0+b.y1)/2,(b.z0+b.z1)/2);
      const c=zoneCol(Z.show[j]);if(m.userData.c!==c){m.material.color.set(c);m.userData.c=c;}});
    Z.outline.visible=!Z.solved;Z.tag.visible=!Z.solved&&activeZone!==Z;Z.tmesh.userData.scr.material.color.set(Z.solved?'#22c55e':TH.code);Z.tmesh.userData.bang.visible=!Z.solved;
    /* ghost preview while the terminal is open */
    const g=(activeZone===Z&&Z.ghost)?Z.ghost.map(r=>boxOf(Z,r)):[];
    while(Z.gmeshes.length<g.length){const m=new THREE.Mesh(unit,new THREE.MeshBasicMaterial({color:'#a78bfa',transparent:true,opacity:.35,depthWrite:false}));const e=new THREE.LineSegments(unitEdges,new THREE.LineBasicMaterial({color:'#5b3fd1'}));m.add(e);city.add(m);Z.gmeshes.push(m);}
    Z.gmeshes.forEach((m,j)=>{const b=g[j];m.visible=!!b;if(!b)return;m.scale.set(Math.max(.02,b.x1-b.x0),Math.max(.02,b.y1-b.y0),Math.max(.02,b.z1-b.z0));m.position.set((b.x0+b.x1)/2,(b.y0+b.y1)/2,(b.z0+b.z1)/2);});});}

/* ------------------------------------------------------------------ physics */
const OUT={top:999,y0:-99,climb:false,edge:true};
function hits(x0,x1,y0,y1,z0,z1){let best=null;
  for(let cz=Math.floor(z0);cz<=Math.floor(z1-1e-6);cz++)for(let cx=Math.floor(x0);cx<=Math.floor(x1-1e-6);cx++){const c=cellAt(S,cx,cz);
    const t=c?(c.water?null:{top:c.h,y0:-10,climb:!!c.climb,cx,cz}):Object.assign({cx,cz},OUT);if(!t)continue;if(y0<t.top-1e-4&&y1>t.y0&&(!best||t.top>best.top))best=t;}
  for(const b of dyn){if(x0<b.x1&&x1>b.x0&&z0<b.z1&&z1>b.z0&&y0<b.y1-1e-4&&y1>b.y0){if(!best||b.y1>best.top)best={top:b.y1,y0:b.y0,climb:false,box:b};}}
  return best;}
const pHit=(x,y,z,p)=>hits(x-PH.r,x+PH.r,y,y+PH.h,z-PH.r,z+PH.r);
function step(dt){const p=player;timeIn+=dt;
  /* moving blocks carry Kai */
  const prev=new Map(dyn.map(b=>[b.key,b]));dyn=allDyn();
  if(p.on!=null&&p.ground){const o=prev.get(p.on),n=dyn.find(b=>b.key===p.on);if(o&&n){p.x+=(n.x0-o.x0);p.z+=(n.z0-o.z0);if(n.y1>o.y1||Math.abs(p.y-o.y1)<.08)p.y=n.y1;}}/* follow it up AND down */
  {const inside=pHit(p.x,p.y+.05,p.z);if(inside&&inside.box&&inside.top-p.y<1.2)p.y=inside.top;}
  /* input → wanted direction (relative to the camera) */
  let ix=(keys.right?1:0)-(keys.left?1:0)+stick.x,iz=(keys.up?1:0)-(keys.down?1:0)+stick.y;const il=Math.hypot(ix,iz);if(il>1){ix/=il;iz/=il;}
  const fx=-Math.sin(cam.yaw),fz=-Math.cos(cam.yaw),rx=Math.cos(cam.yaw),rz=-Math.sin(cam.yaw);
  const wx=fx*iz+rx*ix,wz=fz*iz+rz*ix,want=Math.hypot(wx,wz);
  if(p.climb){const c=p.climb;const push=wx*c.nx+wz*c.nz; /* into the wall */
    if(pressed.jump){p.climb=null;p.vx=-c.nx*4.2;p.vz=-c.nz*4.2;p.vy=PH.jump*.8;p.face=Math.atan2(-c.nx,-c.nz);}
    else if(push<-.4){p.climb=null;p.vx=-c.nx*2;p.vz=-c.nz*2;}
    else{p.vy=push>.3?PH.climb:0;p.y+=p.vy*dt;p.phase+=p.vy*dt*3;
      const top=topAt(S,p.x+c.nx*(PH.r+.15),p.z+c.nz*(PH.r+.15));
      if(top<p.y-.2||top<-1){p.climb=null;}
      else if(p.y>=top-.5&&push>.3){const nx=p.x+c.nx*(PH.r+.45),nz=p.z+c.nz*(PH.r+.45);if(!pHit(nx,top+.02,nz)){p.x=nx;p.z=nz;p.y=top;p.climb=null;p.ground=true;p.vy=0;p.landT=.2;puff(p.x,p.y,p.z,6,'#ffffff');}else p.y=Math.min(p.y,top-.5);}}
    pressed={};return;}
  const acc=p.ground?PH.acc:PH.air;
  if(want>.05){p.vx+=(wx*PH.run-p.vx)*Math.min(1,acc*dt/PH.run*1.6);p.vz+=(wz*PH.run-p.vz)*Math.min(1,acc*dt/PH.run*1.6);p.face+=angDiff(p.face,Math.atan2(wx,wz))*Math.min(1,dt*14);}
  else{const f=p.ground?Math.min(1,dt*14):Math.min(1,dt*1.5);p.vx-=p.vx*f;p.vz-=p.vz*f;}
  if(pressed.jump&&(p.ground||p.coy>0)){p.vy=PH.jump;p.ground=false;p.coy=0;p.on=null;puff(p.x,p.y,p.z,5,'#e7dcc8');}
  p.vy-=PH.g*dt;p.vy=Math.max(p.vy,-30);
  /* move X then Z (step up small ledges, start climbing walls) */
  let wall=null;
  for(const ax of['x','z']){const d=(ax==='x'?p.vx:p.vz)*dt;if(!d)continue;const nx=ax==='x'?p.x+d:p.x,nz=ax==='z'?p.z+d:p.z;const h=pHit(nx,p.y,nz);
    if(!h){p.x=nx;p.z=nz;continue;}
    if(p.ground&&h.top-p.y<=PH.step&&!pHit(nx,h.top+.01,nz)){p.x=nx;p.z=nz;p.y=h.top;continue;}
    if(ax==='x')p.vx=0;else p.vz=0;wall={h,nx:ax==='x'?Math.sign(d):0,nz:ax==='z'?Math.sign(d):0};}
  if(wall&&wall.h.climb&&!wall.h.edge&&wall.h.top-p.y>.5){const push=wx*wall.nx+wz*wall.nz;if(push>.55){p.climb={nx:wall.nx,nz:wall.nz};p.vx=p.vz=0;p.vy=0;p.face=Math.atan2(wall.nx,wall.nz);}}
  /* move Y */
  const wasG=p.ground;p.ground=false;const ny=p.y+p.vy*dt,h=pHit(p.x,ny,p.z);
  if(h){if(p.vy<=0){p.y=h.top;if(!wasG&&p.vy<-9){p.landT=.18;puff(p.x,p.y,p.z,8,'#e7dcc8');}p.vy=0;p.ground=true;p.on=h.box?h.box.key:null;}else{p.y=Math.min(p.y,h.y0-PH.h);p.vy=0;}}
  else p.y=ny;
  if(p.ground)p.coy=.1;else p.coy=Math.max(0,(p.coy||0)-dt);
  if(p.landT>0)p.landT-=dt;
  if(p.y<-.9){splash();respawn('Splash! Back to your last safe spot.');}
  /* feathers */
  for(const f of feathers){if(!f.got&&Math.hypot(f.x-p.x,f.z-p.z)<.8&&Math.abs(f.y-(p.y+.9))<1.2){f.got=true;got++;f.m.visible=false;puff(f.x,f.y,f.z,14,'#fde68a');hud();}}
  /* bots */
  for(const b of bots){b.t+=dt*.16*b.dir;if(b.t>1||b.t<0){b.dir*=-1;b.t=clamp(b.t,0,1);}const x=b.a[0]+(b.b[0]-b.a[0])*b.t,z=b.a[1]+(b.b[1]-b.a[1])*b.t;const y=Math.max(0,topAt(S,x,z));b.m.position.set(x,y,z);b.m.rotation.y=Math.atan2((b.b[0]-b.a[0])*b.dir,(b.b[1]-b.a[1])*b.dir);
    if(Math.hypot(x-p.x,z-p.z)<.9&&Math.abs(y-p.y)<1.2)respawn('A Rust Bot spotted you! Sneak past or go over the rooftops.');}
  /* the sync perch */
  if(perch&&!won&&Math.hypot(perch.x-p.x,perch.z-p.z)<1.6&&Math.abs(perch.y-p.y)<.7)syncUp();
  /* terminals */
  const near=ZONES.find(Z=>Math.hypot(Z.tpos.x-p.x,Z.tpos.z-p.z)<1.8&&Math.abs(Z.tpos.y-p.y)<1.5);
  const hb=$s('.rfHack');hb.classList.toggle('hidden',!near);if(near){hb.innerHTML=near.solved?'✏️ Edit this code <kbd>E</kbd>':'⌨️ Hack the terminal <kbd>E</kbd>';hb._z=near;}
  if(pressed.act&&near)openPanel(near);
  pressed={};}
function respawn(msg){const p=player;Object.assign(p,{x:checkpoint.x,z:checkpoint.z,y:Math.max(0,topAt(S,checkpoint.x,checkpoint.z)),vx:0,vy:0,vz:0,climb:null,on:null});
  const f=$s('.spFade');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');if(msg)banner(msg.length>26?'OOPS!':msg);if(msg&&msg.length>26)toastMsg(msg);}
function toastMsg(m){if(typeof toast==='function')toast(m);}

/* ------------------------------------------------------------------ particles */
let parts=[];const pGeo=new THREE.BoxGeometry(.09,.09,.09);
function puff(x,y,z,n,col){if(!city)return;for(let i=0;i<n;i++){const m=new THREE.Mesh(pGeo,new THREE.MeshBasicMaterial({color:col,transparent:true}));m.position.set(x+(Math.random()-.5)*.4,y+.1+Math.random()*.4,z+(Math.random()-.5)*.4);city.add(m);parts.push({m,vx:(Math.random()-.5)*3,vy:Math.random()*3,vz:(Math.random()-.5)*3,life:.6+Math.random()*.3});}}
function splash(){puff(player.x,-.3,player.z,18,'#ffffff');}
function tickParts(dt){parts=parts.filter(q=>{q.life-=dt;q.vy-=9*dt;q.m.position.x+=q.vx*dt;q.m.position.y+=q.vy*dt;q.m.position.z+=q.vz*dt;q.m.material.opacity=clamp(q.life*2,0,1);if(q.life<=0){city&&city.remove(q.m);q.m.material.dispose();return false;}return true;});}

/* ------------------------------------------------------------------ animation of Kai, the owl, the camera */
function animHero(dt,t){const p=player,u=hero.userData;hero.position.set(p.x,p.y,p.z);hero.rotation.y=p.face;
  const sp=Math.hypot(p.vx,p.vz);if(p.ground)p.phase+=sp*dt*2.3;const run=p.ground&&sp>.5,s=Math.sin(p.phase);
  if(p.climb){const c=Math.sin(p.phase*2);u.armL.rotation.x=-2.6+c*.5;u.armR.rotation.x=-2.6-c*.5;u.legL.rotation.x=-.6+c*.5;u.legR.rotation.x=-.6-c*.5;u.b.rotation.x=0;}
  else if(!p.ground){u.armL.rotation.x=u.armR.rotation.x=-2.2;u.legL.rotation.x=-.5;u.legR.rotation.x=.3;u.b.rotation.x=.1;}
  else{const a=run?s*.9*Math.min(1,sp/4):Math.sin(t*2)*.04;u.armL.rotation.x=a;u.armR.rotation.x=-a;u.legL.rotation.x=-a;u.legR.rotation.x=a;u.b.rotation.x=run?.12:0;}
  const sq=p.landT>0?1-p.landT*1.2:1;u.b.scale.set(1/Math.sqrt(sq),sq,1/Math.sqrt(sq));u.b.position.y=run?Math.abs(Math.cos(p.phase))*.06:0;
  u.tail.forEach((s2,i)=>{s2.position.y=1.0+Math.sin(t*9+i)*.03*(1+sp*.4)+i*(sp>1?.04:-.03);s2.rotation.x=sp>1?-.3:.4;});
  /* Pip the owl flies beside Kai */
  const ox=p.x+Math.cos(p.face)*.7-Math.sin(p.face)*.3,oz=p.z-Math.sin(p.face)*.7-Math.cos(p.face)*.3;owl.position.lerp(new THREE.Vector3(ox,p.y+2.1+Math.sin(t*3)*.12,oz),Math.min(1,dt*5));owl.rotation.y=p.face;
  owl.children.forEach(c=>{if(c.userData.wing)c.rotation.z=c.userData.wing*(.3+Math.sin(t*16)*.5);});}
function camBlocked(x,y,z,noDyn){const c=cellAt(S,Math.floor(x),Math.floor(z));if(c&&!c.water&&y<c.h+.15)return true;if(noDyn)return false;for(const b of dyn)if(x>b.x0-.1&&x<b.x1+.1&&z>b.z0-.1&&z<b.z1+.1&&y>b.y0-.1&&y<b.y1+.1)return true;return false;}
function updateCam(dt){const p=player;let tx=p.x,ty=p.y+1.45,tz=p.z,yaw=cam.yaw,pitch=cam.pitch,dist=cam.dist;
  if(mode==='code'&&activeZone){const v=boxOf(activeZone,{x:0,y:0,w:activeZone.w,h:activeZone.h}),F=FACES[activeZone.face||'s'];tx=(v.x0+v.x1)/2;tz=(v.z0+v.z1)/2;ty=(v.y0+v.y1)/2;
    const size=Math.max(v.x1-v.x0,v.z1-v.z0,v.y1-v.y0);yaw=Math.atan2(F.V[0],F.V[1]);pitch=.4;dist=size*.8+4;}
  else if(mode==='sync'){tx=perch.x;ty=perch.y+1;tz=perch.z;yaw=cam.yaw+dt*1.2;cam.yaw=yaw;pitch=.25;dist=9;}
  else{const sp=Math.hypot(p.vx,p.vz);if(sp>1.5&&!p.climb&&timeIn-cam.lastDrag>1.4){const behind=Math.atan2(-p.vx,-p.vz);cam.yaw+=angDiff(cam.yaw,behind)*Math.min(1,dt*.9);}yaw=cam.yaw;}
  const k=Math.min(1,dt*(mode==='code'?6:9));cam.tx+=(tx-cam.tx)*k;cam.ty+=(ty-cam.ty)*k;cam.tz+=(tz-cam.tz)*k;cam.cy=(cam.cy==null?yaw:cam.cy+angDiff(cam.cy,yaw)*Math.min(1,dt*6));cam.cp=(cam.cp==null?pitch:cam.cp+(pitch-cam.cp)*Math.min(1,dt*6));cam.cd=(cam.cd==null?dist:cam.cd+(dist-cam.cd)*Math.min(1,dt*4));
  const dx=Math.sin(cam.cy)*Math.cos(cam.cp),dy=Math.sin(cam.cp),dz=Math.cos(cam.cy)*Math.cos(cam.cp);let d=cam.cd;
  let px=dx,py=dy,pz=dz;
  const clear=(ax,ay,az,len,nd)=>{const ox=nd?tx:cam.tx,oy=nd?ty:cam.ty,oz=nd?tz:cam.tz;for(let s=nd?1.2:.6;s<=len;s+=.25)if(camBlocked(ox+ax*s,oy+ay*s,oz+az*s,nd))return s;return 0;};
  if(mode==='code'&&activeZone){/* find a view of the build site that no wall blocks: try a few angles, lowest first */
    if(activeZone._view==null){let best=null;for(let pp=.32;pp<1.35&&!best;pp+=.06)for(const off of[0,.3,-.3]){const yy=yaw+off,ax=Math.sin(yy)*Math.cos(pp),ay=Math.sin(pp),az=Math.cos(yy)*Math.cos(pp);if(!clear(ax,ay,az,dist+1,true)){best=[yy,Math.min(1.35,pp+.1)];break;}}activeZone._view=best||[yaw,1.35];}
    const[vy,vp]=activeZone._view;cam.cy+=angDiff(cam.cy,vy)*Math.min(1,dt*6);cam.cp+=(vp-cam.cp)*Math.min(1,dt*6);px=Math.sin(cam.cy)*Math.cos(cam.cp);py=Math.sin(cam.cp);pz=Math.cos(cam.cy)*Math.cos(cam.cp);}
  else if(mode==='play'){const b=clear(dx,dy,dz,cam.cd);if(b)d=Math.max(.6,b-.35);}
  R3.camera.position.set(cam.tx+px*d,cam.ty+py*d,cam.tz+pz*d);R3.camera.lookAt(cam.tx,cam.ty,cam.tz);
  R3.sun.position.set(cam.tx+18,cam.ty+40,cam.tz+12);R3.sun.target.position.set(cam.tx,cam.ty,cam.tz);}

/* objective marker: the next broken terminal, then the sync tower */
function goal(){const Z=ZONES.find(z=>!z.solved);if(Z)return{x:Z.tpos.x,y:Z.tpos.y,z:Z.tpos.z,txt:`Terminal ${Z.i+1} of ${ZONES.length}`,col:TH.code};
  if(perch&&!won)return{x:perch.x,y:perch.y,z:perch.z,txt:'🦉 Climb to the sync point!',col:'#f59e0b'};return null;}
function goalHud(){const g=goal(),el=$s('.spGoal');if(!g||mode!=='play'){el.style.display='none';beam.visible=false;return;}el.style.display='';
  const dx=g.x-player.x,dz=g.z-player.z,dist=Math.hypot(dx,dz),ang=Math.atan2(dx,dz),rel=angDiff(cam.cy+Math.PI,ang);
  $s('.spArrow').style.transform=`rotate(${(-rel*180/Math.PI)-90}deg)`;$s('.spGoalTxt').textContent=`${g.txt} · ${Math.round(dist+Math.abs(g.y-player.y))} m`;
  beam.visible=true;beam.position.set(g.x,g.y+20,g.z);beam.material.color.set(g.col);}

/* ------------------------------------------------------------------ syncing & leap of faith */
function syncUp(){won=true;mode='sync';hud();banner('SYNCHRONIZED!');puff(perch.x,perch.y+1,perch.z,30,'#fde68a');keys={};
  setTimeout(()=>{if(LV.hay){mode='leap';const[hx,hz]=LV.hay;leapT={t:0,from:{x:player.x,y:player.y,z:player.z},to:{x:hx+.5,y:0,z:hz+.5}};}else finish();},2600);}
let leapT=null;
function leap(dt){const L=leapT;L.t+=dt/1.6;const e=Math.min(1,L.t),p=player;p.x=L.from.x+(L.to.x-L.from.x)*e;p.z=L.from.z+(L.to.z-L.from.z)*e;p.y=L.from.y+(L.to.y-L.from.y)*e+Math.sin(e*Math.PI)*2.2;
  p.face=Math.atan2(L.to.x-L.from.x,L.to.z-L.from.z);hero.rotation.x=e<.9?.9*Math.sin(e*Math.PI):0;
  if(e>=1){hero.rotation.x=0;puff(p.x,0,p.z,30,'#f6d365');banner('LEAP OF FAITH!');leapT=null;mode='sync2';setTimeout(finish,1100);}}
function finish(){mode='done';const L=LV;const all=got===feathers.length,clean=!levelAns;const stars=1+(all?1:0)+(clean?1:0);
  SV.stars[L.id]=Math.max(SV.stars[L.id]||0,stars);SV.feathers[L.id]=Math.max(SV.feathers[L.id]||0,got);SV.last=L.id;saveSV();TRACK.attempt('spire','lvl:'+L.id,true);
  const next=allLevels()[L._i+1];
  const win=()=>{mode='done';modal(`<div class="center"><div style="font-size:52px">${stars===3?'🏆':'🦉'}</div><h2>${esc(L.name)} — synchronized!</h2><div style="font-size:30px">${starsHTML(stars)}</div>
    <p class="muted" style="text-align:left;line-height:1.8">⭐ Reached the sync point<br>${all?'⭐':'☆'} All golden feathers (${got}/${feathers.length})<br>${clean?'⭐':'☆'} Fixed every terminal without peeking at the answer</p>
    <p class="muted">Time ${Math.floor(timeIn/60)}:${String(Math.floor(timeIn%60)).padStart(2,'0')}</p>${next?'':'<p><b>The whole city is free! You are a true Spire Runner! 🌟</b></p>'}</div>`,
    next?[['City map',showMap],['Next district →',()=>startLevel(next.id),'primary']]:[['City map',showMap,'primary']]);};
  if(L.outro&&L.outro.length)say(L.outro,win);else win();setTimeout(()=>{if(typeof checkAchievements==='function')checkAchievements();},1600);}

/* ------------------------------------------------------------------ HUD, banner, dialog */
function hud(){if(!LV)return;$s('.spFeathers').textContent=`🪶 ${got}/${feathers.length}`;}
let bT;function banner(t){const b=$s('.rfBanner');b.textContent=t;b.classList.add('show');clearTimeout(bT);bT=setTimeout(()=>b.classList.remove('show'),1900);}
function say(lines,done){const was=mode;mode='dialog';const box=$s('.rfDialog');dlg={lines:[].concat(lines),i:0,done,was};box.classList.remove('hidden');showLine();}
function showLine(){const raw=dlg.lines[dlg.i];const m=/^([A-Z][\w .'-]{1,20}):\s+(.*)$/s.exec(raw);const who=m?m[1]:'',txt=m?m[2]:raw;
  $s('.rfWho').textContent=who;$s('.rfWho').style.display=who?'':'none';$s('.rfFace').textContent=({Kai:'🥷',Pip:'🦉','Baron Rust':'🤖'})[who]||'';
  const el=$s('.rfText');let n=0;clearInterval(dlg.tm);el.textContent='';dlg.typing=true;dlg.cur=txt;dlg.tm=setInterval(()=>{n+=2;el.textContent=txt.slice(0,n);if(n>=txt.length){clearInterval(dlg.tm);dlg.typing=false;}},16);}
function advance(){if(!dlg)return;if(dlg.typing){clearInterval(dlg.tm);$s('.rfText').textContent=dlg.cur;dlg.typing=false;return;}dlg.i++;if(dlg.i<dlg.lines.length){showLine();return;}
  const d=dlg.done,was=dlg.was;dlg=null;$s('.rfDialog').classList.add('hidden');mode=was==='done'||was==='sync'||was==='sync2'?was:'play';d&&d();}

/* ------------------------------------------------------------------ the code terminal */
let PZ=null;
function openPanel(Z){if(mode!=='play')return;mode='code';activeZone=Z;keys={};stick.x=stick.y=0;const L=Z.lesson;PZ={Z,hints:0,used:false};
  const pnl=$s('.rfPanel');pnl.classList.remove('hidden');sec.classList.add('coding');
  pnl.innerHTML=`<div class="rfPh"><b>⌨️ ${esc(L.concept||'Terminal')}</b><button class="btn sm ghost" data-p="close" aria-label="Close terminal">✕ Back to the city</button></div>
    <div class="rfPbody"><div class="jobbox"><b>🎯 Your job</b><div class="jobtxt">${md(L.job||L.mission)}</div></div>
      <details class="rfLearn" ${Z.solved?'':'open'}><summary>📖 How it works</summary><div class="lesson">${md(L.learn||'')}</div>${L.example?`<div class="exl">Example</div><pre class="ex">${esc(L.example)}</pre>`:''}${L.mission&&L.job!==L.mission?`<div class="mission" style="margin-top:8px">🎯 ${md(L.mission)}</div>`:''}</details>
      <div class="pane-h">✍️ Your code <small>the see-through blocks move as you type ✨</small></div>
      <textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Code editor"></textarea><div class="snips"></div>
      <div class="st-drawer"><div class="feedback"></div><div class="hintbox"></div></div></div>
    <div class="rfPact"><button class="btn" data-p="hint">💡 Hint</button><button class="btn" data-p="tip">✨ Tip</button><button class="btn" data-p="answer">👁 Answer</button><button class="btn ghost" data-p="reset">↺ Reset</button><button class="btn primary big" data-p="apply">⚡ Build it</button></div>`;
  const ed=$('textarea',pnl),fb=(t,h)=>{const f=$('.feedback',pnl);f.className='feedback '+(t||'');f.innerHTML=h||'';},hb=$('.hintbox',pnl);
  ed.value=SV.code[Z.id]||(Z.solved?L.answer:L.starter);TRACK.open('spire',L.id);
  const live=debounce(async()=>{const code=ed.value;SV.code[Z.id]=code;saveSV();const r=await layout(Z,preview,code);if(PZ&&PZ.Z===Z)Z.ghost=r.rects;},280);
  wireEditor(ed,live,()=>apply());addSnips($('.snips',pnl),ed,live,L.js?['(',')','{','}',';','"','=','+','<','>','.','`','$']:undefined);
  const hintBtn=$('[data-p=hint]',pnl),lab=()=>hintBtn.textContent=`💡 Hint ${Math.min(PZ.hints,L.hints.length)}/${L.hints.length}`;lab();
  hintBtn.onclick=()=>{if(PZ.hints<L.hints.length)PZ.hints++;levelHints++;lab();TRACK.hint('spire',L.id,PZ.hints);hb.innerHTML=L.hints.slice(0,PZ.hints).map((h,i)=>`<div class="h">💡 <b>Hint ${i+1}:</b> ${md(h)}</div>`).join('');hb.lastElementChild.scrollIntoView({block:'nearest'});};
  $('[data-p=tip]',pnl).onclick=()=>showTip(hb,L.tip);
  $('[data-p=answer]',pnl).onclick=()=>{PZ.used=true;levelAns=true;TRACK.answer('spire',L.id);ed.value=L.answer;live();hb.innerHTML=`<div class="h a">👁 <b>Here's one answer</b> — it's in your code box. Watch how the blocks move, then press ⚡ Build it.</div>`;};
  $('[data-p=reset]',pnl).onclick=()=>{ed.value=L.starter;live();fb();};
  $('[data-p=close]',pnl).onclick=closePanel;
  async function apply(){const b=$('[data-p=apply]',pnl);if(b.disabled)return;b.disabled=true;live.cancel&&live.cancel();fb('info','⚡ Building…');
    let r;try{r=await checkCode(Z,preview,ed.value);}finally{b.disabled=false;}
    TRACK.attempt('spire',L.id,r.ok);Z.ghost=r.rects;
    if(!r.ok){fb('bad','❌ '+md(r.msg)+'<small style="display:block;margin-top:4px">Fix it and press ⚡ Build it again. Stuck? Tap 💡 Hint.</small>');return;}
    Z.solved=true;SV.zones[Z.id]=Math.max(SV.zones[Z.id]||0,PZ.used?1:PZ.hints?2:3);SV.code[Z.id]=ed.value;saveSV();fb('good','✅ It\'s real now! Go and try it!');
    const res=await layout(Z,Z.frame,ed.value);Z.from=Z.show.map(q=>({...q}));Z.rects=res.rects;Z.ft=0;
    checkpoint={x:Z.tpos.x,z:Z.tpos.z};banner('BUILT!');setTimeout(closePanel,1100);}
  $('[data-p=apply]',pnl).onclick=apply;
  live();requestAnimationFrame(fitView);setTimeout(()=>{if(innerWidth>=900)ed.focus();},60);}
function closePanel(){if(activeZone)activeZone._view=null;const pnl=$s('.rfPanel');pnl.classList.add('hidden');pnl.innerHTML='';sec.classList.remove('coding');if(activeZone)activeZone.ghost=null;activeZone=null;PZ=null;if(mode==='code')mode='play';requestAnimationFrame(fitView);}

/* ------------------------------------------------------------------ main loop */
function loop(t){const dt=Math.min(.05,(t-lastT)/1000||0);lastT=t;
  if(CURRENT==='spire'&&LV&&R3&&mapScr.classList.contains('hidden')){const tt=t/1000;
    animZones(dt);if(!dyn)dyn=allDyn();
    if(mode==='play'){tAcc+=dt;while(tAcc>=1/120){step(1/120);tAcc-=1/120;}}else{tAcc=0;dyn=allDyn();}
    if(mode==='leap'&&leapT)leap(dt);
    syncMeshes();animHero(dt,tt);updateCam(dt);goalHud();tickParts(dt);
    feathers.forEach((f,i)=>{if(!f.got){f.m.rotation.y=tt*2+i;f.m.position.y=f.y+Math.sin(tt*2.5+i)*.15;f.m.userData.halo.lookAt(R3.camera.position);}});
    ZONES.forEach(Z=>{if(Z.tmesh.userData.bang.visible)Z.tmesh.userData.bang.position.y=2.2+Math.sin(tt*3)*.12;});
    if(perch)perch.m.userData.beacon.material.opacity=won?.05:.16+Math.sin(tt*2)*.06;
    city.children[0].children.forEach(o=>{if(o.userData.cloud)o.position.x+=o.userData.cloud*dt;if(o.userData.flag)o.rotation.y=Math.sin(tt*3+o.position.x)*.3;});
    TEX.water&&(TEX.water.offset.x=tt*.02,TEX.water.offset.y=tt*.013);
    R3.renderer.render(R3.scene,R3.camera);}
  requestAnimationFrame(loop);}

/* ------------------------------------------------------------------ input: keyboard, mouse-drag look, touch stick */
const KM={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',' ':'jump',e:'act',E:'act',Enter:'act'};
document.addEventListener('keydown',e=>{if(CURRENT!=='spire'||!LV)return;const tg=(e.target.tagName||'').toLowerCase();if(tg==='textarea'||tg==='input')return;
  if(!$('#modal').classList.contains('hidden'))return;
  if(mode==='dialog'){if([' ','Enter','e','E'].includes(e.key)){e.preventDefault();advance();}return;}
  if(mode==='code'&&e.key==='Escape'){closePanel();return;}
  if(mode==='play'&&e.key==='Escape'){menu();return;}
  const k=KM[e.key];if(!k||mode!=='play')return;e.preventDefault();if(!keys[k])pressed[k]=true;keys[k]=true;});
document.addEventListener('keyup',e=>{const k=KM[e.key];if(k)keys[k]=false;});
const ptrs=new Map();const stickEl=$s('.spStick');
view.addEventListener('pointerdown',e=>{if(mode==='dialog'){advance();return;}if(mode!=='play'&&mode!=='code')return;view.setPointerCapture(e.pointerId);const r=view.getBoundingClientRect();
  const touch=e.pointerType!=='mouse',left=touch&&e.clientX-r.left<r.width*.42&&mode==='play';ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,ox:e.clientX,oy:e.clientY,stick:left});
  if(left){stickEl.classList.remove('hidden');stickEl.style.left=(e.clientX-r.left-50)+'px';stickEl.style.top=(e.clientY-r.top-50)+'px';}});
view.addEventListener('pointermove',e=>{const q=ptrs.get(e.pointerId);if(!q)return;
  if(q.stick){let dx=(e.clientX-q.ox)/45,dy=(e.clientY-q.oy)/45;const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l;}stick.x=dx;stick.y=-dy;stickEl.firstElementChild.style.transform=`translate(${dx*30}px,${dy*30}px)`;}
  else if(mode==='play'){cam.yaw-=(e.clientX-q.x)*.0065;cam.pitch=clamp(cam.pitch+(e.clientY-q.y)*.0045,-.1,1.25);cam.lastDrag=timeIn;}q.x=e.clientX;q.y=e.clientY;});
const endPtr=e=>{const q=ptrs.get(e.pointerId);if(!q)return;ptrs.delete(e.pointerId);if(q.stick){stick.x=stick.y=0;stickEl.classList.add('hidden');}};
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>view.addEventListener(ev,endPtr));
view.addEventListener('wheel',e=>{if(mode!=='play')return;e.preventDefault();cam.dist=clamp(cam.dist+e.deltaY*.01,4,14);},{passive:false});
const jb=$s('.spJump');jb.addEventListener('pointerdown',e=>{e.preventDefault();if(mode==='dialog'){advance();return;}pressed.jump=true;keys.jump=true;jb.classList.add('on');});
['pointerup','pointerleave','pointercancel'].forEach(ev=>jb.addEventListener(ev,()=>{keys.jump=false;jb.classList.remove('on');}));
$s('.rfHack').addEventListener('click',()=>{const z=$s('.rfHack')._z;if(z)openPanel(z);});
$s('.rfDialog').addEventListener('click',advance);
$s('[data-s=back]').onclick=()=>{closePanel();APP.show('hub');};
$s('[data-s=menu]').onclick=menu;
function menu(){if(!LV)return;if(mode==='code')closePanel();if(mode!=='play')return;mode='paused';
  modal(`<h2>⏸ Paused</h2><p>${esc(LV.name)}</p><p class="muted">Graphics: <b>${lowEnd()?'Fast':'Pretty'}</b> — choose Fast if the game feels slow.</p>`,
    [['City map',showMap],['Restart district',()=>startLevel(LV.id)],[lowEnd()?'🎨 Pretty graphics':'⚡ Fast graphics',()=>{SV.gfx=lowEnd()?'pretty':'fast';saveSV();startLevel(LV.id);}],['How to play',help],['Resume',()=>{mode='play';},'primary']]);}
function help(){modal(`<h2>How to play</h2><p>🏃 <b>Move</b> with W A S D or the arrow keys. On a phone, drag on the <b>left side</b> of the screen.</p><p>👀 <b>Look around</b>: drag with the mouse — or drag on the <b>right side</b> of the screen.</p>
  <p>🧗 <b>Climb</b>: run into a building with windows and keep going. Shiny white walls with gold lines are too smooth to climb.</p><p>⌨️ When a bridge, gate or lift is broken, walk to a <b>terminal</b> and press <b>E</b>. Your code becomes REAL blocks!</p>
  <p>🪶 Collect golden feathers. 🤖 Keep away from Rust Bots. 🦉 Climb to the <b>sync point</b> at the top of the tallest tower to finish.</p>`,[['Let\'s go!',()=>{if(mode==='paused')mode='play';},'primary']]);}

/* ------------------------------------------------------------------ city map (district select) */
const unlocked=L=>{const all=allLevels(),i=all.indexOf(L);return i<=0||!!SV.stars[all[i-1].id]||!!SV.stars[L.id];};
function showMap(){if(typeof closeModal==='function')closeModal();closePanel();mode='map';mapScr.classList.remove('hidden');
  const ls=allLevels();const tot=Object.values(SV.stars).reduce((a,b)=>a+b,0);
  mapScr.innerHTML=`<div class="rfMapIn"><div class="rfMapTop"><button class="btn sm" data-m="back">← Arcade</button><div class="pix rfLogo spLogo">SPIRE<br>CITY</div><span class="chip">⭐ ${tot}/${ls.length*3}</span></div>
    <div class="spHero"><div class="spHeroArt">🏙️🥷🦉</div><p class="rfIntro">Baron Rust has broken the bridges, locked the gates and jammed the lifts of Spire City. You are <b>Kai</b>, a rooftop runner, with your owl friend <b>Pip</b>. Climb the towers, roam the streets — and when the way is broken, <b>hack a terminal</b>: the code you write becomes real 3D blocks!</p></div>
    <div class="rfHow spKb"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move</span><span>🖱️ drag to look</span><span><kbd>Space</kbd> jump</span><span>run into a wall to climb</span><span><kbd>E</kbd> hack a terminal</span></div>
    <div class="rfHow spTp"><span>👈 drag the left side to move</span><span>👉 drag the right side to look</span><span>⤒ jump</span><span>run into a wall to climb</span></div>
    ${!window.WebGLRenderingContext?'<p class="bad">Your browser can\'t show 3D. Try Chrome, Edge, Safari or Firefox.</p>':''}
    <div class="spDistricts">${ls.map((L,i)=>{const th=THEMES[L.theme]||THEMES.market,u=unlocked(L),s=SV.stars[L.id]||0;
      return `<button class="spDist ${u?'':'lock'} ${s?'done':''}" data-lv="${L.id}" ${u?'':'disabled'} style="--wc:${th.code};--wb:${th.sky[0]};--wb2:${th.sky[1]}"><span class="n">${u?'District '+(i+1):'🔒 Locked'}</span><b>${esc(L.name)}</b><small>${esc(L.topic||'')}</small>${s?starsHTML(s):''}</button>`;}).join('')}</div></div>`;
  $('[data-m=back]',mapScr).onclick=()=>APP.show('hub');
  $$('.spDist[data-lv]:not([disabled])',mapScr).forEach(b=>b.onclick=()=>{mapScr.classList.add('hidden');startLevel(b.dataset.lv);});}

/* ------------------------------------------------------------------ test helpers: validate a district */
async function validate(id){const L=levelById(id),probs=[];if(!L)return['no such district'];const Sx=parseDistrict(L);
  ['id','name','theme','map','start','sync','zones','story'].forEach(k=>{if(L[k]==null)probs.push('missing '+k);});
  const zs=(L.zones||[]).map((z,i)=>Object.assign({},z,{i}));const f=mkFrame();
  const boxesFor=async(Z,code)=>{const r=await layout(Z,f,code);let bs=r.rects.map(q=>boxOf(Z,q));
    if(Z.lesson.anim){const samples=[];for(let k=0;k<16;k++){await new Promise(res=>setTimeout(res,(Z.lesson.period||4)*1000/16));try{readRects(Z,makeApi(f.contentDocument,f.contentWindow)).forEach((q,j)=>samples.push(Object.assign(boxOf(Z,q),{thin:Z.i*100+j+1})));}catch(e){}}bs=samples.length?samples:bs;}
    return bs;};
  const ans=[],sta=[];
  for(const Z of zs){const L2=Z.lesson;if(!L2){probs.push('zone '+Z.i+' has no lesson');continue;}
    ['id','concept','learn','mission','job','starter','answer','hints','tip','checks'].forEach(k=>{if(L2[k]==null)probs.push(L2.id+' missing '+k);});
    if(!Z.term)probs.push(L2.id+' has no terminal');
    const a=await checkCode(Z,f,L2.answer);if(!a.ok)probs.push(L2.id+' ANSWER FAILS: '+a.msg);
    const s=await checkCode(Z,f,L2.starter);if(s.ok)probs.push(L2.id+' STARTER PASSES');
    ans[Z.i]=await boxesFor(Z,L2.answer);sta[Z.i]=await boxesFor(Z,L2.starter);
    const tc=cellAt(Sx,Z.term[0],Z.term[1]);if(!tc||tc.water)probs.push(L2.id+' terminal is in water/outside');}
  f.remove();
  const sp=[L.start[0]+.5,L.start[1]+.5,topAt(Sx,L.start[0]+.5,L.start[1]+.5)],syncT=[L.sync[0]+.5,L.sync[1]+.5,topAt(Sx,L.sync[0]+.5,L.sync[1]+.5)];
  /* 1) play it in order: solve every terminal you can reach, then the sync point must be reachable */
  const solved=new Set();let changed=true;
  while(changed){changed=false;const boxes=[].concat(...zs.map(Z=>solved.has(Z.i)?ans[Z.i]:sta[Z.i]));
    const r=reach(Sx,boxes,sp,zs.map(Z=>[Z.term[0]+.5,Z.term[1]+.5,topAt(Sx,Z.term[0]+.5,Z.term[1]+.5)]),'safe');if(!r.hits){probs.push(r.why);break;}
    r.hits.forEach((h,i)=>{if(h&&!solved.has(i)){solved.add(i);changed=true;}});}
  zs.forEach(Z=>{if(!solved.has(Z.i))probs.push(Z.lesson.id+' terminal cannot be reached');});
  const allAns=[].concat(...zs.map(Z=>ans[Z.i]));
  const ok=reach(Sx,allAns,sp,[syncT],'safe');if(!ok.hits||!ok.hits[0])probs.push('SYNC POINT NOT REACHABLE with all answers');
  /* 2) every terminal is NEEDED, even with the best possible jumps */
  for(const Z of zs){const bx=[].concat(...zs.map(Y=>Y===Z?sta[Y.i]:ans[Y.i]));const r=reach(Sx,bx,sp,[syncT],'full');if(r.hits&&r.hits[0])probs.push(Z.lesson.id+' NOT NEEDED (sync reachable with its starter)');}
  /* 3) feathers can be collected */
  const fr=reach(Sx,allAns,sp,(L.feathers||[]).map(([x,z])=>[x+.5,z+.5]),'full');(fr.hits||[]).forEach((h,i)=>{if(!h)probs.push('feather '+i+' at '+L.feathers[i]+' unreachable');});
  if(L.hay){const hc=cellAt(Sx,L.hay[0],L.hay[1]);if(!hc||!hc.hay)probs.push('hay must be on a + cell');}
  return probs;}

const api={
  enter(){if(!DISTS().length){modal('<h3>Spire City is loading…</h3>');return;}if(!initGL()){modal('<h3>3D is not available</h3><p>Your browser or device can\'t show 3D graphics. Try another browser.</p>');APP.show('hub');return;}
    if(mode==='map'||!LV)showMap();else{fitView();if(mode==='paused')mode='play';}},
  leave(){mapScr.classList.add('hidden');keys={};stick.x=stick.y=0;if(mode==='play')mode='paused';},
  progress(){const ls=allLevels();const done=ls.filter(L=>SV.stars[L.id]).length,st=Object.values(SV.stars).reduce((a,b)=>a+b,0);return{done,total:ls.length,stars:st,label:`${done}/${ls.length} districts · ⭐ ${st}/${ls.length*3}`};},
  lessons(){return[].concat(...allLevels().map(L=>(L.zones||[]).map((z,i)=>Object.assign(z.lesson,{_lv:L,_zi:i,_zid:zoneId(L,i)}))));},
  levels(){const s=store.get(KEY(),null)||freshSave();return api.lessons().map(l=>({id:l.id,title:l.concept,stars:(s.zones||{})[l._zid]||0,world:l._lv._i}));},
  key:KEY(),
  _test:{validate,reach,parseDistrict,boxOf,layout,checkCode,allLevels,startLevel,openPanel,closePanel,showMap,PH,JUMP_H,
    state:()=>({mode,player,ZONES,LV,got,won,cam}),keys:()=>keys,press:k=>{pressed[k]=true;},hold:(k,v)=>{keys[k]=v;},
    solve:async i=>{const Z=ZONES[i];const r=await checkCode(Z,Z.frame,Z.lesson.answer);if(r.ok){Z.solved=true;Z.from=Z.show.map(q=>({...q}));Z.rects=r.rects;Z.ft=0;}return r.ok;},
    teleport:(x,y,z)=>{Object.assign(player,{x,y,z,vx:0,vy:0,vz:0,climb:null});},step:dt=>step(dt||1/120),dyn:()=>dyn,setDyn:()=>{dyn=allDyn();}}
};
window.SPIRE=api;WORLDS.spire=api;requestAnimationFrame(loop);
})();
