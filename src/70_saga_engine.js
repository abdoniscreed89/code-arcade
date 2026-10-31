/* =====================================================================
   SAGA ENGINE — story-driven action-adventure games
   (Shadowblade · Runebound · Tomb of Tags)
   Each chapter is a run of zones: one enemy guards each gate, a boss waits at the end.
   Sneak up from behind for a silent takedown, or get spotted and fight. Every fight = real code.
   ===================================================================== */
(function(){
const T=32;
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const rng=seed=>{let s=(seed>>>0)||7;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return (s%100000)/100000;};};
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=amt<0?0:255,p=Math.abs(amt);r=Math.round((t-r)*p+r);g=Math.round((t-g)*p+g);b=Math.round((t-b)*p+b);return `rgb(${r},${g},${b})`;}
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h);c.fill();}
function circ(c,x,y,r){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
function ell(c,x,y,rx,ry){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();}
function tri(c,a,b,d,e,f,g){c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.lineTo(f,g);c.closePath();c.fill();}

/* ------------------------------------------------------------------ places (tilesets) */
const PLACES={
 market:{floor:'#f3e2c0',floor2:'#ead4a8',wall:'#f7efe2',wallTop:'#d9653b',props:['stall','crate','pot','stall','barrel','lamp'],sky:['#cfefff','#f3e2c0'],deco:'#e7c98f'},
 docks:{floor:'#d9b98a',floor2:'#c9a776',wall:'#8fd3f7',wallTop:'#5fb8e6',water:1,props:['crate','barrel','rope','crate','barrel','net'],sky:['#bfe6ff','#d9b98a'],deco:'#bf9c6a',plank:1},
 glasshall:{floor:'#f6f2fb',floor2:'#ebe4f6',wall:'#e9e0f5',wallTop:'#9b7ee0',props:['pillar','glass','pillar','statue'],sky:['#f4efff','#ebe4f6'],deco:'#d9ccef',checker:1},
 rooftops:{floor:'#f0a37c',floor2:'#e4936b',wall:'#cfefff',wallTop:'#9fd6f5',props:['chimney','laundry','crate','chimney','pot'],sky:['#cfefff','#f0a37c'],deco:'#d9825c',tiles:1},
 gardens:{floor:'#bfe8a0',floor2:'#afdc8f',wall:'#7cc96a',wallTop:'#4f9a3a',props:['hedge','fountain','flowerbed','hedge','statue','tree'],sky:['#dff3ff','#bfe8a0'],deco:'#9fd07f'},
 tower:{floor:'#e8e3dc',floor2:'#ddd6cc',wall:'#f4f0ea',wallTop:'#b45309',props:['gear','banner','machine','pillar','crate'],sky:['#fde8cf','#e8e3dc'],deco:'#d1c8bb',checker:1},
 village:{floor:'#f3f7fb',floor2:'#e6eef6',wall:'#f8fbff',wallTop:'#8b5a2b',props:['pine','longhouse','fire','barrel','pine','rock'],sky:['#e8f3ff','#f3f7fb'],deco:'#dbe6f0',snow:1},
 forest:{floor:'#eef4f2',floor2:'#e0ebe6',wall:'#f5faf8',wallTop:'#2f7a50',props:['pine','bigtree','rock','mushroom','pine','log'],sky:['#e6f5ef','#eef4f2'],deco:'#d3e3dc',snow:1},
 bridge:{floor:'#d6d3cd',floor2:'#c9c5bd',wall:'#bfe3f7',wallTop:'#93cdee',water:1,props:['rock','post','rock','rune'],sky:['#e3f2fb','#d6d3cd'],deco:'#bdb8ae',plank:1},
 forge:{floor:'#e9dfd4',floor2:'#ded1c3',wall:'#f6eee6',wallTop:'#ea580c',props:['anvil','lava','barrel','gear','anvil'],sky:['#ffeedd','#e9dfd4'],deco:'#d6c6b5'},
 lake:{floor:'#e9f6fb',floor2:'#d9eef7',wall:'#bfe3f7',wallTop:'#7fc4e8',water:1,props:['reeds','rock','icecrystal','reeds','log'],sky:['#e3f4fb','#e9f6fb'],deco:'#cfe6f1',snow:1},
 peak:{floor:'#f7fbff',floor2:'#eaf2fb',wall:'#fdfeff',wallTop:'#93b4d8',props:['icecrystal','rock','pine','icecrystal','rune'],sky:['#eef6ff','#f7fbff'],deco:'#dde9f5',snow:1},
 sandgate:{floor:'#f6e2b3',floor2:'#efd59c',wall:'#fbefd3',wallTop:'#d9a441',props:['column','cactus','palm','pot','column','rock'],sky:['#cfefff','#f6e2b3'],deco:'#e8c98a'},
 echohall:{floor:'#f1dcb2',floor2:'#e8cf9f',wall:'#f8ebcf',wallTop:'#b7862f',props:['statue','torch','column','pot'],sky:['#fff1d6','#f1dcb2'],deco:'#dcc08c',checker:1},
 library:{floor:'#f3e6cf',floor2:'#eadbbf',wall:'#fbf3e4',wallTop:'#8b5a2b',props:['shelf','scrolls','shelf','torch','pot'],sky:['#fff4e2','#f3e6cf'],deco:'#dfcaa6'},
 puzzle:{floor:'#efe2c7',floor2:'#e4d4b3',wall:'#f8efdc',wallTop:'#0f766e',props:['glyph','column','statue','glyph','pot'],sky:['#e6fbf7','#efe2c7'],deco:'#14b8a6',checker:1},
 royal:{floor:'#fbe9c4',floor2:'#f5dcaa',wall:'#fff6df',wallTop:'#c2410c',props:['column','statue','throne','torch','column'],sky:['#fff1d6','#fbe9c4'],deco:'#e11d48',carpet:1},
 heart:{floor:'#f3ecff',floor2:'#e8ddff',wall:'#faf6ff',wallTop:'#7c3aed',props:['crystal','column','crystal','statue'],sky:['#f5efff','#f3ecff'],deco:'#c4b5fd',glow:1}
};

/* ------------------------------------------------------------------ drawing: people */
const SKIN={a:'#ffdbb5',b:'#f1c27d',c:'#c68642',d:'#8d5524'};
function drawPerson(c,x,y,L,dir,frame,bob,s=1){
  c.save();c.translate(x+16*(1-s),y+32*(1-s));c.scale(s,s);x=0;y=0;
  const cx=x+16,yy=y+(bob||0),sw=[0,1,0,-1][frame||0],side=dir==='left'||dir==='right';
  c.fillStyle='rgba(0,0,0,.18)';ell(c,cx,y+29,9,3.2);
  if(L.cape&&dir!=='down'){c.fillStyle=L.cape;c.beginPath();c.moveTo(cx-7,yy+13);c.lineTo(cx+7,yy+13);c.lineTo(cx+9+(side?(dir==='left'?4:-4):0),yy+27);c.lineTo(cx-9+(side?(dir==='left'?4:-4):0),yy+27);c.fill();}
  c.fillStyle=L.pants||'#3b4a6b';
  if(side){rr(c,cx-4+sw*2,yy+21,4,7,1.5);rr(c,cx-sw*2,yy+21,4,7,1.5);}else{rr(c,cx-5,yy+21-(sw>0?1:0),4,7,1.5);rr(c,cx+1,yy+21-(sw<0?1:0),4,7,1.5);}
  c.fillStyle=L.boots||'#5b3a24';if(side){c.fillRect(cx-4+sw*2,yy+26.5,4,2);c.fillRect(cx-sw*2,yy+26.5,4,2);}else{c.fillRect(cx-5,yy+26.5-(sw>0?1:0),4,2);c.fillRect(cx+1,yy+26.5-(sw<0?1:0),4,2);}
  c.fillStyle=L.shirt;if(side)rr(c,cx-5,yy+13,10,10,4);else rr(c,cx-7,yy+13,14,10,4);
  if(L.belt){c.fillStyle=L.belt;c.fillRect(cx-(side?5:7),yy+19.5,side?10:14,2);}
  c.fillStyle=shade(L.shirt,-.15);if(side)rr(c,cx-1+sw*2.5,yy+14,3.5,8,1.5);else{rr(c,cx-9,yy+14+sw,3,7,1.5);rr(c,cx+6,yy+14-sw,3,7,1.5);}
  c.fillStyle=L.skin;if(side)circ(c,cx+.5+sw*2.5,yy+22.5,1.6);else{circ(c,cx-7.5,yy+21.5+sw,1.6);circ(c,cx+7.5,yy+21.5-sw,1.6);}
  if(L.cape&&dir==='down'){c.fillStyle=L.cape;c.fillRect(cx-7,yy+13,2,9);c.fillRect(cx+5,yy+13,2,9);}
  c.fillStyle=L.skin;circ(c,cx,yy+9,7.5);
  if(L.hood){c.fillStyle=L.hood;c.beginPath();c.arc(cx,yy+8.5,9,Math.PI*.95,Math.PI*2.05);c.fill();
    if(dir==='up')circ(c,cx,yy+9,8.6);else{c.beginPath();c.moveTo(cx-9,yy+8);c.lineTo(cx,yy-3);c.lineTo(cx+9,yy+8);c.fill();
      if(side){c.fillRect(dir==='left'?cx+1:cx-9,yy+6,8,9);}else{c.fillRect(cx-9,yy+7,3,8);c.fillRect(cx+6,yy+7,3,8);}}
    c.fillStyle='rgba(0,0,0,.18)';if(dir==='down')c.fillRect(cx-6,yy+6,12,2.2);}
  else{c.fillStyle=L.hair;
    if(dir==='up')circ(c,cx,yy+8.5,8);
    else{c.beginPath();c.arc(cx,yy+8,8,Math.PI,0);c.fill();if(dir==='down'){c.fillRect(cx-8,yy+7,2.5,5);c.fillRect(cx+5.5,yy+7,2.5,5);}else if(dir==='left')c.fillRect(cx+2,yy+6,6,7);else c.fillRect(cx-8,yy+6,6,7);}
    if(L.pony){c.fillStyle=L.hair;if(dir!=='down')rr(c,dir==='left'?cx+5:dir==='right'?cx-9:cx-2,yy+9,4,10,2);}}
  if(L.beard&&dir!=='up'){c.fillStyle=L.beard;if(dir==='down'){c.beginPath();c.moveTo(cx-6,yy+11);c.quadraticCurveTo(cx,yy+22,cx+6,yy+11);c.fill();}else{c.beginPath();c.moveTo(cx+(dir==='left'?-6:6),yy+11);c.quadraticCurveTo(cx+(dir==='left'?-3:3),yy+20,cx,yy+12);c.fill();}}
  c.fillStyle='#2a2840';
  if(dir==='down'){circ(c,cx-3,yy+10,1.3);circ(c,cx+3,yy+10,1.3);if(!L.beard){c.fillStyle='rgba(255,120,140,.4)';circ(c,cx-4.5,yy+12.5,1.3);circ(c,cx+4.5,yy+12.5,1.3);}}
  else if(dir==='left')circ(c,cx-3.5,yy+10,1.3);else if(dir==='right')circ(c,cx+3.5,yy+10,1.3);
  if(L.hat==='explorer'){c.fillStyle='#b08850';ell(c,cx,yy+3.5,12,3);c.fillStyle='#c79d63';rr(c,cx-6.5,yy-3,13,7,3);c.fillStyle='#7c5a2e';c.fillRect(cx-6.5,yy+1.5,13,1.6);}
  else if(L.hat==='helm'){c.fillStyle='#9aa3ad';c.beginPath();c.arc(cx,yy+7,8.6,Math.PI,0);c.fill();c.fillStyle='#c5ccd3';c.fillRect(cx-9,yy+6,18,2.2);if(dir==='down'||side){c.fillStyle='#9aa3ad';c.fillRect(side?cx+(dir==='left'?-1.5:-.5):cx-1,yy+6,2,6);}}
  else if(L.hat==='guard'){c.fillStyle=L.helm||'#94a3b8';c.beginPath();c.arc(cx,yy+7,8.4,Math.PI,0);c.fill();c.fillStyle=shade(L.helm||'#94a3b8',-.2);c.fillRect(cx-9,yy+6,18,2);c.fillStyle=L.plume||'#ef4444';rr(c,cx-1.5,yy-5,3,6,1.5);}
  else if(L.hat==='band'){c.fillStyle=L.band||'#ef4444';c.fillRect(cx-8,yy+3.5,16,3);}
  if(L.weapon==='spear'){c.strokeStyle='#8b5a2b';c.lineWidth=1.6;c.beginPath();c.moveTo(cx+9,yy+26);c.lineTo(cx+9,yy+2);c.stroke();c.fillStyle='#cbd5e1';tri(c,cx+9,yy-3,cx+7,yy+3,cx+11,yy+3);}
  if(L.weapon==='bow'){c.strokeStyle='#8b5a2b';c.lineWidth=1.4;c.beginPath();c.arc(cx-9,yy+16,6,-1.2,1.2);c.stroke();}
  c.restore();
}
/* monsters & non-human foes */
function drawFoe(c,x,y,kind,dir,t,s=1,tint){
  c.save();c.translate(x+16*(1-s),y+32*(1-s));c.scale(s,s);x=0;y=0;
  const cx=16,bob=Math.sin((t||0)/300)*1;
  c.fillStyle='rgba(0,0,0,.18)';ell(c,cx,29,10,3.2);
  switch(kind){
   case'wolf':{const col=tint||'#cbd5e1';c.fillStyle=col;ell(c,cx,19+bob,11,6);c.fillStyle=shade(col,-.2);rr(c,cx-9,22,3,7,1);rr(c,cx-4,22,3,7,1);rr(c,cx+2,22,3,7,1);rr(c,cx+7,22,3,7,1);
     const hx=dir==='left'?cx-11:cx+11;c.fillStyle=col;ell(c,hx,14+bob,6,5);tri(c,hx-4,10+bob,hx-2,4+bob,hx,10+bob);tri(c,hx,10+bob,hx+2,4+bob,hx+4,10+bob);c.fillStyle='#1e3a8a';circ(c,hx+(dir==='left'?-2:2),13+bob,1.2);
     c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(dir==='left'?cx+10:cx-10,17);c.quadraticCurveTo(dir==='left'?cx+16:cx-16,10,dir==='left'?cx+15:cx-15,6);c.stroke();break;}
   case'troll':{const col=tint||'#8fae7a';c.fillStyle=col;rr(c,cx-11,9+bob,22,18,8);circ(c,cx,8+bob,7);c.fillStyle=shade(col,-.2);rr(c,cx-14,12+bob,5,12,2);rr(c,cx+9,12+bob,5,12,2);rr(c,cx-8,25,6,5,2);rr(c,cx+2,25,6,5,2);
     c.fillStyle='#fff';tri(c,cx-4,11+bob,cx-2,11+bob,cx-3,8+bob);tri(c,cx+2,11+bob,cx+4,11+bob,cx+3,8+bob);c.fillStyle='#2a2840';circ(c,cx-3,6+bob,1.3);circ(c,cx+3,6+bob,1.3);break;}
   case'golem':{const col=tint||'#b9b2a6';c.fillStyle=col;rr(c,cx-11,10+bob,22,15,3);rr(c,cx-7,1+bob,14,10,3);c.fillStyle=shade(col,-.22);rr(c,cx-15,11+bob,5,12,2);rr(c,cx+10,11+bob,5,12,2);rr(c,cx-8,24,6,6,2);rr(c,cx+2,24,6,6,2);
     c.fillStyle=tint==='#bfe3f7'?'#38bdf8':'#f59e0b';rr(c,cx-4,5+bob,3,2,1);rr(c,cx+1,5+bob,3,2,1);c.strokeStyle=shade(col,-.3);c.lineWidth=1;c.beginPath();c.moveTo(cx-6,14+bob);c.lineTo(cx-1,18+bob);c.lineTo(cx+5,15+bob);c.stroke();break;}
   case'mummy':{c.fillStyle='#f1ead8';rr(c,cx-7,13+bob,14,11,4);circ(c,cx,9+bob,7.5);rr(c,cx-5,22,4,7,1.5);rr(c,cx+1,22,4,7,1.5);rr(c,cx-11,14+bob,4,4,2);rr(c,cx+7,14+bob,4,4,2);
     c.strokeStyle='#d6cbb0';c.lineWidth=1;for(let k=0;k<6;k++){c.beginPath();c.moveTo(cx-7,4+k*4+bob);c.lineTo(cx+7,6+k*4+bob);c.stroke();}c.fillStyle='#f59e0b';circ(c,cx-3,9+bob,1.4);circ(c,cx+3,9+bob,1.4);break;}
   case'scarab':{for(let k=0;k<7;k++){const a=k*0.9+(t||0)/400,r=4+(k%3)*3;const bx=cx+Math.cos(a)*r,by=17+Math.sin(a*1.3)*r*.7;c.fillStyle=k%2?'#0f766e':'#14b8a6';ell(c,bx,by,3,2.2);c.fillStyle='#fde68a';circ(c,bx-1,by-.5,.6);}break;}
   case'cobra':{c.fillStyle=tint||'#65a30d';ell(c,cx,25,10,4);rr(c,cx-3,10+bob,6,15,3);ell(c,cx,10+bob,7,6);c.fillStyle='#fde68a';ell(c,cx,13+bob,3,4);c.fillStyle='#2a2840';circ(c,cx-2.5,8+bob,1);circ(c,cx+2.5,8+bob,1);c.strokeStyle='#ef4444';c.lineWidth=1;c.beginPath();c.moveTo(cx,14+bob);c.lineTo(cx,17+bob);c.stroke();break;}
   case'wraith':{c.globalAlpha=.85;c.fillStyle=tint||'#c4b5fd';c.beginPath();c.moveTo(cx-10,26+bob);c.quadraticCurveTo(cx-12,6+bob,cx,3+bob);c.quadraticCurveTo(cx+12,6+bob,cx+10,26+bob);for(let k=0;k<4;k++)c.lineTo(cx+10-k*5-2.5,23+bob+(k%2?3:0));c.fill();c.globalAlpha=1;c.fillStyle='#4c1d95';ell(c,cx-3.5,11+bob,1.6,2.2);ell(c,cx+3.5,11+bob,1.6,2.2);break;}
   case'draugr':{drawPerson(c,0,0,{skin:'#cfe3ea',hair:'#e5e7eb',shirt:'#64748b',pants:'#475569',hat:'helm',beard:'#e5e7eb',boots:'#334155'},dir,0,bob);c.fillStyle='#38bdf8';circ(c,dir==='left'?12.5:dir==='right'?19.5:13,10+bob,1.2);if(dir==='down')circ(c,19,10+bob,1.2);break;}
   case'sphinx':{c.fillStyle='#e7c27a';ell(c,cx,21,13,7);circ(c,cx,10+bob,7);c.fillStyle='#2563eb';c.fillRect(cx-8,6+bob,3,10);c.fillRect(cx+5,6+bob,3,10);c.fillStyle='#facc15';c.fillRect(cx-8,5+bob,16,3);c.fillStyle='#2a2840';circ(c,cx-2.5,10+bob,1.1);circ(c,cx+2.5,10+bob,1.1);break;}
   default:{/* humanoid guards / rivals */
     const looks={guard:{skin:'#e0ac69',hair:'#2b1d14',shirt:'#64748b',pants:'#334155',hat:'guard',helm:'#94a3b8',plume:'#ef4444',weapon:'spear',belt:'#1f2937'},
      brute:{skin:'#c68642',hair:'#1f2937',shirt:'#7c2d12',pants:'#44403c',hat:'band',band:'#1f2937',belt:'#111827'},
      archer:{skin:'#f1c27d',hair:'#6b4423',shirt:'#3f6212',pants:'#365314',hat:'guard',helm:'#a3a3a3',plume:'#facc15',weapon:'bow'},
      rival:{skin:'#f1c27d',hair:'#6b4423',shirt:'#f5f5f4',pants:'#57534e',hat:'explorer',belt:'#78350f'},
      noble:{skin:'#ffdbb5',hair:'#111827',shirt:'#7f1d1d',pants:'#111827',cape:'#991b1b',belt:'#facc15'}};
     drawPerson(c,0,0,looks[kind]||looks.guard,dir,0,bob);}
  }
  c.restore();
}
function foeKind(name,game,boss){const n=(name||'').toLowerCase();
  if(/wolf|hound/.test(n))return'wolf';if(/troll|ogre/.test(n))return'troll';if(/golem|giant|jarl|colossus|guardian|construct/.test(n))return game==='tomb'&&/guardian|sekh/.test(n)?'golem':'golem';
  if(/mummy|wrapped/.test(n))return'mummy';if(/scarab|beetle|swarm/.test(n))return'scarab';if(/cobra|snake|serpent|wyrm|jormun|viper/.test(n))return'cobra';
  if(/wraith|ghost|spirit|echo|shade/.test(n))return'wraith';if(/draugr|skeleton|undead|chieftain|skarn/.test(n))return'draugr';if(/sphinx/.test(n))return'sphinx';
  if(/crane|victor|rival/.test(n))return'rival';if(/lord|malvek|noble|general/.test(n))return'noble';if(/archer|sniper|lookout|hunter|sable/.test(n))return'archer';if(/brute|thug|heavy|overseer|brutus|vex/.test(n))return'brute';
  return game==='rune'?'draugr':game==='tomb'?(boss?'golem':'mummy'):'guard';}

/* ------------------------------------------------------------------ drawing: props */
function drawProp(c,kind,px,py,P,seed){
  const r=rng(seed);
  c.fillStyle='rgba(0,0,0,.12)';ell(c,px+16,py+27,12,4);
  switch(kind){
   case'crate':c.fillStyle='#c68a4c';rr(c,px+5,py+8,22,19,3);c.strokeStyle='#8b5a2b';c.lineWidth=2;c.strokeRect(px+6,py+9,20,17);c.beginPath();c.moveTo(px+6,py+9);c.lineTo(px+26,py+26);c.stroke();break;
   case'barrel':c.fillStyle='#b7793f';rr(c,px+8,py+6,16,21,6);c.fillStyle='#6b4423';c.fillRect(px+8,py+11,16,2);c.fillRect(px+8,py+20,16,2);break;
   case'pot':c.fillStyle=['#e07a4f','#3b82f6','#14b8a6'][Math.floor(r()*3)];ell(c,px+16,py+19,9,9);c.fillRect(px+12,py+7,8,5);c.fillStyle='rgba(255,255,255,.35)';ell(c,px+12,py+16,2.5,4);break;
   case'stall':{const cols=[['#ef4444','#fff'],['#3b82f6','#fff'],['#f59e0b','#fff'],['#14b8a6','#fff']][Math.floor(r()*4)];c.fillStyle='#8b5a2b';c.fillRect(px+4,py+12,2,16);c.fillRect(px+26,py+12,2,16);c.fillStyle='#fef3c7';rr(c,px+3,py+18,26,8,2);
     for(let k=0;k<5;k++){c.fillStyle=cols[k%2];c.beginPath();c.moveTo(px+2+k*5.6,py+5);c.lineTo(px+7.6+k*5.6,py+5);c.lineTo(px+7.6+k*5.6,py+13);c.quadraticCurveTo(px+4.8+k*5.6,py+16,px+2+k*5.6,py+13);c.fill();}
     ['#ef4444','#f59e0b','#22c55e'].forEach((f,i)=>{c.fillStyle=f;circ(c,px+9+i*7,py+20,2.6);});break;}
   case'lamp':c.fillStyle='#57534e';c.fillRect(px+15,py+8,2,20);c.fillStyle='#facc15';rr(c,px+11,py+3,10,9,3);c.fillStyle='rgba(250,204,21,.25)';circ(c,px+16,py+8,10);break;
   case'rope':c.strokeStyle='#c8a165';c.lineWidth=3;for(let k=0;k<3;k++){c.beginPath();c.ellipse(px+16,py+20-k*3,10-k*2,5-k,0,0,7);c.stroke();}break;
   case'net':c.strokeStyle='#a3a3a3';c.lineWidth=1;for(let k=0;k<5;k++){c.beginPath();c.moveTo(px+4+k*6,py+6);c.lineTo(px+4+k*6,py+26);c.stroke();c.beginPath();c.moveTo(px+4,py+6+k*5);c.lineTo(px+28,py+6+k*5);c.stroke();}break;
   case'pillar':case'column':c.fillStyle=kind==='column'?'#f4e3bd':'#ffffff';rr(c,px+8,py+2,16,26,3);c.fillStyle=kind==='column'?'#e2c98e':'#e9e0f5';c.fillRect(px+6,py+1,20,4);c.fillRect(px+6,py+24,20,4);c.fillStyle='rgba(0,0,0,.06)';c.fillRect(px+12,py+5,2,19);c.fillRect(px+18,py+5,2,19);break;
   case'glass':{const g=c.createLinearGradient(px,py,px+32,py+32);g.addColorStop(0,'#fda4af');g.addColorStop(.5,'#c4b5fd');g.addColorStop(1,'#93c5fd');c.fillStyle='#9b7ee0';rr(c,px+5,py+1,22,27,10);c.fillStyle=g;rr(c,px+7,py+3,18,23,8);c.strokeStyle='#ffffff';c.lineWidth=1;c.beginPath();c.moveTo(px+16,py+3);c.lineTo(px+16,py+26);c.moveTo(px+7,py+14);c.lineTo(px+25,py+14);c.stroke();break;}
   case'statue':c.fillStyle='#d6d3d1';rr(c,px+7,py+20,18,8,2);c.fillStyle='#e7e5e4';rr(c,px+11,py+8,10,13,4);circ(c,px+16,py+6,4.5);break;
   case'chimney':c.fillStyle='#b45309';c.fillRect(px+9,py+6,14,21);c.fillStyle='#92400e';c.fillRect(px+7,py+4,18,4);c.fillStyle='rgba(203,213,225,.7)';circ(c,px+18,py,4);circ(c,px+22,py-5,3);break;
   case'laundry':c.strokeStyle='#8b5a2b';c.lineWidth=1.2;c.beginPath();c.moveTo(px,py+6);c.quadraticCurveTo(px+16,py+11,px+32,py+6);c.stroke();[['#f472b6',4],['#60a5fa',13],['#facc15',22]].forEach(([col,o])=>{c.fillStyle=col;rr(c,px+o,py+8,7,10,1);});c.fillStyle='#8b5a2b';c.fillRect(px+1,py+6,2,22);c.fillRect(px+29,py+6,2,22);break;
   case'hedge':c.fillStyle='#3f9a4a';rr(c,px+2,py+8,28,20,8);c.fillStyle='#5cb85f';rr(c,px+5,py+9,22,8,5);break;
   case'fountain':c.fillStyle='#cbd5e1';ell(c,px+16,py+21,14,7);c.fillStyle='#93d5f5';ell(c,px+16,py+20,11,4.5);c.fillStyle='#e2e8f0';c.fillRect(px+14,py+7,4,13);c.fillStyle='#93d5f5';circ(c,px+16,py+6,3);break;
   case'flowerbed':c.fillStyle='#a16207';rr(c,px+3,py+16,26,11,3);['#f43f5e','#facc15','#a78bfa','#fb923c'].forEach((f,i)=>{c.fillStyle='#16a34a';c.fillRect(px+7+i*6,py+11,1.5,6);c.fillStyle=f;circ(c,px+8+i*6,py+11,2.8);});break;
   case'tree':case'bigtree':c.fillStyle='#8b5a2b';c.fillRect(px+13,py+17,6,11);c.fillStyle=P.snow?'#2f7a50':'#3f9a4a';circ(c,px+16,py+12,kind==='bigtree'?14:12);c.fillStyle=P.snow?'#f8fbff':'#6cc96a';circ(c,px+11,py+7,5);break;
   case'pine':c.fillStyle='#7c5a3a';c.fillRect(px+14,py+22,4,7);[[0,24,13],[5,19,11],[10,14,9]].forEach(([o,w,h])=>{c.fillStyle='#2f7a50';tri(c,px+16,py+o,px+16+w/2,py+o+h+6,px+16-w/2,py+o+h+6);if(P.snow){c.fillStyle='#f8fbff';tri(c,px+16,py+o,px+19,py+o+4,px+13,py+o+4);}});break;
   case'longhouse':c.fillStyle='#a16207';c.fillRect(px+2,py+12,28,16);c.fillStyle='#78350f';tri(c,px-1,py+13,px+16,py+1,px+33,py+13);if(P.snow){c.fillStyle='#ffffff';tri(c,px+4,py+10,px+16,py+3,px+28,py+10);}c.fillStyle='#451a03';rr(c,px+13,py+19,6,9,2);break;
   case'fire':c.fillStyle='#78350f';c.fillRect(px+8,py+23,16,3);c.fillStyle='#fb923c';tri(c,px+10,py+24,px+16,py+8,px+22,py+24);c.fillStyle='#fde047';tri(c,px+13,py+24,px+16,py+14,px+19,py+24);break;
   case'rock':c.fillStyle=P.snow?'#cbd5e1':'#b9b2a6';ell(c,px+16,py+19,12,9);c.fillStyle=P.snow?'#ffffff':'#d6d0c4';ell(c,px+13,py+14,6,3.5);break;
   case'mushroom':c.fillStyle='#f5f5f4';c.fillRect(px+14,py+17,4,10);c.fillStyle='#ef4444';ell(c,px+16,py+16,9,6);c.fillStyle='#fff';circ(c,px+12,py+14,1.6);circ(c,px+19,py+13,1.4);break;
   case'log':c.fillStyle='#92400e';rr(c,px+2,py+15,28,10,5);c.fillStyle='#d6a35c';ell(c,px+28,py+20,3,5);break;
   case'post':c.fillStyle='#78350f';rr(c,px+12,py+4,8,24,2);c.fillStyle='#a16207';c.fillRect(px+10,py+4,12,3);break;
   case'rune':c.fillStyle='#94a3b8';rr(c,px+8,py+3,16,25,6);c.strokeStyle='#38bdf8';c.lineWidth=2;c.beginPath();c.moveTo(px+16,py+7);c.lineTo(px+16,py+23);c.moveTo(px+16,py+11);c.lineTo(px+21,py+7);c.moveTo(px+16,py+15);c.lineTo(px+11,py+11);c.stroke();break;
   case'anvil':c.fillStyle='#475569';rr(c,px+6,py+12,20,6,2);c.fillRect(px+12,py+18,8,7);c.fillRect(px+9,py+24,14,4);c.fillStyle='#fb923c';circ(c,px+20,py+10,1.5);break;
   case'lava':c.fillStyle='#fb923c';rr(c,px+2,py+6,28,22,8);c.fillStyle='#fde047';ell(c,px+12,py+14,5,3);ell(c,px+21,py+21,4,2.5);break;
   case'gear':c.fillStyle='#a8a29e';circ(c,px+16,py+16,10);for(let k=0;k<8;k++){const a=k*Math.PI/4;c.fillRect(px+16+Math.cos(a)*11-2.5,py+16+Math.sin(a)*11-2.5,5,5);}c.fillStyle='#e7e5e4';circ(c,px+16,py+16,4);break;
   case'banner':c.fillStyle='#57534e';c.fillRect(px+6,py+2,20,2);c.fillStyle='#b91c1c';c.beginPath();c.moveTo(px+8,py+4);c.lineTo(px+24,py+4);c.lineTo(px+24,py+24);c.lineTo(px+16,py+19);c.lineTo(px+8,py+24);c.fill();c.fillStyle='#facc15';circ(c,px+16,py+11,3);break;
   case'machine':c.fillStyle='#78716c';rr(c,px+3,py+6,26,22,4);c.fillStyle='#fbbf24';circ(c,px+10,py+14,3);c.fillStyle='#22c55e';circ(c,px+18,py+14,3);c.fillStyle='#e7e5e4';c.fillRect(px+7,py+21,18,3);break;
   case'reeds':c.strokeStyle='#65a30d';c.lineWidth=2;for(let k=0;k<5;k++){c.beginPath();c.moveTo(px+6+k*5,py+28);c.lineTo(px+5+k*5+(k%2?2:-2),py+8+k%3*3);c.stroke();}c.fillStyle='#78350f';ell(c,px+12,py+9,2,4);ell(c,px+22,py+12,2,4);break;
   case'icecrystal':case'crystal':{const col=kind==='crystal'?'#c4b5fd':'#bae6fd';c.fillStyle=col;tri(c,px+16,py+1,px+23,py+26,px+9,py+26);c.fillStyle=shade(col,-.1);tri(c,px+9,py+10,px+13,py+26,px+4,py+26);c.fillStyle='#ffffff';tri(c,px+16,py+4,px+18,py+16,px+15,py+16);break;}
   case'cactus':c.fillStyle='#4d7c0f';rr(c,px+12,py+4,8,24,4);rr(c,px+5,py+10,5,10,2.5);rr(c,px+22,py+8,5,9,2.5);break;
   case'palm':c.strokeStyle='#a16207';c.lineWidth=4;c.beginPath();c.moveTo(px+16,py+28);c.quadraticCurveTo(px+20,py+16,px+15,py+7);c.stroke();c.fillStyle='#16a34a';for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*.7;c.beginPath();c.ellipse(px+15+Math.cos(a)*8,py+7+Math.sin(a)*5,9,3.5,a,0,7);c.fill();}break;
   case'torch':c.fillStyle='#78350f';c.fillRect(px+14,py+12,4,16);c.fillStyle='#fb923c';tri(c,px+11,py+13,px+16,py+1,px+21,py+13);c.fillStyle='#fde047';tri(c,px+13.5,py+13,px+16,py+6,px+18.5,py+13);c.fillStyle='rgba(251,146,60,.18)';circ(c,px+16,py+10,13);break;
   case'shelf':c.fillStyle='#8b5a2b';c.fillRect(px+3,py+2,26,26);c.fillStyle='#a16207';for(let k=0;k<3;k++)c.fillRect(px+3,py+9+k*7,26,2);['#ef4444','#3b82f6','#22c55e','#f59e0b','#8b5cf6'].forEach((b,i)=>{c.fillStyle=b;c.fillRect(px+5+i*4.6,py+4,3.5,5);c.fillRect(px+6+i*4.4,py+18,3,5);});break;
   case'scrolls':c.fillStyle='#fef3c7';for(let k=0;k<4;k++){rr(c,px+4+k*3,py+20-k*4,20,5,2.5);}c.fillStyle='#d6b46a';for(let k=0;k<4;k++)circ(c,px+24+k*3,py+22.5-k*4,2.5);break;
   case'glyph':c.fillStyle='#14b8a6';rr(c,px+6,py+6,20,20,3);c.fillStyle='#ccfbf1';c.font='bold 13px sans-serif';c.textAlign='center';c.fillText(['☥','𓂀','⟁','✶'][Math.floor(r()*4)]||'✶',px+16,py+21);break;
   case'throne':c.fillStyle='#facc15';rr(c,px+7,py+3,18,25,4);c.fillStyle='#e11d48';rr(c,px+10,py+12,12,10,2);break;
   default:c.fillStyle='#b9b2a6';ell(c,px+16,py+19,11,8);
  }
}

/* ------------------------------------------------------------------ map building: one chapter = 8 zones */
const ZW=10,ZH=14,ZN=8;
function buildChapterMap(game,ci,ch){
  const W=2+ZN*ZW,H=ZH,P=PLACES[ch.place]||PLACES.market;
  for(let attempt=0;attempt<30;attempt++){
    const seed=hash(game+ci+':'+attempt),r=rng(seed);
    const g=[];for(let y=0;y<H;y++)g.push(Array(W).fill('.'));
    for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(y<2||y>=H-1||x===0||x===W-1)g[y][x]='#';
    const gates=[],enemies=[],relics=[];
    for(let k=0;k<ZN;k++){
      const x0=1+k*ZW,gx=x0+ZW;
      if(k<ZN-1){for(let y=2;y<H-1;y++)g[y][gx]='#';g[6][gx]='g';g[7][gx]='g';gates.push({k,x:gx,ys:[6,7]});}
      if(k===ZN-1)continue; /* boss arena stays open */
      const n=3+Math.floor(r()*4);
      for(let i=0;i<n;i++){const x=x0+2+Math.floor(r()*(ZW-4)),y=3+Math.floor(r()*(H-5));if(y===6||y===7)continue;g[y][x]='o';if(r()<.35&&g[y][x+1]==='.'&&x+1<gx-1)g[y][x+1]='o';}
      if(r()<.5)for(let i=0;i<3;i++){const x=x0+1+Math.floor(r()*(ZW-2)),y=2+Math.floor(r()*(H-3));if(g[y][x]==='.')g[y][x]=',';}
    }
    /* enemies: one per zone 0..6, patrolling */
    for(let k=0;k<ZN-1;k++){const x0=1+k*ZW;const vert=r()<.55;const route=[];
      if(vert){const x=x0+5+Math.floor(r()*2)-(k===0?1:0);for(let y=3;y<=H-3;y++)if(g[y][x]!=='o'&&g[y][x]!=='#')route.push([x,y]);}
      else{const y=[4,9,10][Math.floor(r()*3)];for(let x=x0+3;x<=x0+ZW-3;x++)if(g[y][x]!=='o')route.push([x,y]);}
      const clean=[];for(const p of route){if(clean.length&&(Math.abs(p[0]-clean[clean.length-1][0])+Math.abs(p[1]-clean[clean.length-1][1]))!==1)break;clean.push(p);}
      if(clean.length<3)continue;enemies.push({k,route:clean});}
    if(enemies.length<ZN-1)continue;
    /* relics in zones 1,3,5 — a free floor corner */
    for(const k of [1,3,5]){const x0=1+k*ZW;const spots=[[x0+1,2],[x0+ZW-2,2],[x0+1,H-2],[x0+ZW-2,H-2],[x0+2,3],[x0+ZW-3,H-3]];const s=spots.find(([x,y])=>g[y][x]==='.'||g[y][x]===',');if(s){g[s[1]][s[0]]='.';relics.push({k,x:s[0],y:s[1]});}}
    /* connectivity check: with gates open, every enemy route start, relic and the boss spot must be reachable */
    const ok=(()=>{const seen=new Set(['2,7']);const q=[[2,7]];while(q.length){const[x,y]=q.shift();for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k2=nx+','+ny;if(seen.has(k2)||nx<0||ny<0||nx>=W||ny>=H)continue;const t=g[ny][nx];if(t==='#'||t==='o')continue;seen.add(k2);q.push([nx,ny]);}}
      const bx=1+(ZN-1)*ZW+5;return enemies.every(e=>e.route.every(([x,y])=>seen.has(x+','+y)))&&relics.every(o=>seen.has(o.x+','+o.y))&&seen.has(bx+',7');})();
    if(!ok)continue;
    const props={};for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(g[y][x]==='o')props[x+','+y]=P.props[hash(x*31+y*17+ci)%P.props.length];
    return{W,H,g,gates,enemies,relics,props,P,boss:{x:1+(ZN-1)*ZW+6,y:7},start:{x:2,y:7},npc:{x:3,y:4}};
  }
  throw new Error('map build failed '+game+ci);
}

/* ------------------------------------------------------------------ the factory */
window.SAGAS={};
function Saga(def){
  const ID=def.id,DATA=SAGA_DATA[ID],CH=DATA.chapters;
  if(!CH.length)return;
  const KEY='saga-'+ID+'-v1'+SFX;
  const fresh=()=>({started:false,ch:0,zone:0,hp:100,xp:0,sp:0,skills:{vit:0,ins:0,rec:0},done:{},stars:{},relics:{},bosses:{},stealth:0,x:2,y:7,dir:'right'});
  const load=()=>{const o=store.get(KEY,null);if(!o||!o.started)return null;const f=fresh();const s=Object.assign(f,o);['skills','done','stars','relics','bosses'].forEach(k=>{if(!s[k]||typeof s[k]!=='object')s[k]=f[k];});s.ch=Math.max(0,Math.min(CH.length-1,s.ch|0));return s;};
  let S=load()||fresh();
  const save=()=>store.set(KEY,S);
  const lvl=()=>1+Math.floor(Math.sqrt(S.xp/40));
  const maxHP=()=>100+S.skills.vit*25;
  const allLessons=()=>[].concat(...CH.map((ch,ci)=>ch.enemies.map((L,k)=>Object.assign(L,{_ch:ci,_k:k})).concat(ch.boss.phases.map((L,k)=>Object.assign(L,{_ch:ci,_boss:true,_k:k})))));
  const LS=allLessons();const LM=Object.fromEntries(LS.map(L=>[L.id,L]));

  /* ---------- DOM ---------- */
  const sec=document.createElement('section');sec.className='screen hidden saga saga-'+ID;sec.id='g-'+ID;
  sec.innerHTML=`<div class="sgApp">
    <header><button class="chip" data-back>← Arcade</button><h1 class="logo pix">${esc(def.logo)}</h1>
      <div class="stats"><span class="chip sg-hero">${def.heroIcon} ${esc(def.hero.name)}</span><span class="chip">❤️<span class="minihp"><i class="sg-hp"></i></span></span><span class="chip sg-lv">Lv 1</span><span class="chip sg-ch"></span></div></header>
    <div class="sggoal"></div>
    <div class="sgStage"><canvas class="sgCv" width="1280" height="832" aria-label="Game world"></canvas><div class="sgBanner pix"></div><div class="sgFlash"></div>
      <div class="sgDialog hidden"><span class="sgWho"></span><span class="sgPortrait"></span><span class="sgText"></span><span class="more">▼</span></div></div>
    <div class="lgtools"><button class="chip" data-t="journal">📜 Journal</button><button class="chip" data-t="skills">⭐ Skills <b class="sg-sp"></b></button><button class="chip" data-t="map">🗺️ Chapters</button><button class="chip" data-t="menu">⚙️ Menu</button></div>
    <div class="controls"><div class="dpad"><button class="u" data-d="up" aria-label="Up">▲</button><button class="l" data-d="left" aria-label="Left">◀</button><button class="r" data-d="right" aria-label="Right">▶</button><button class="d" data-d="down" aria-label="Down">▼</button></div>
      <div class="mid">Move: <kbd>Arrows</kbd>/<kbd>WASD</kbd><br>Act: <kbd>Space</kbd> or <b>A</b><br>🤫 Sneak up <b>behind</b> enemies!</div><button class="abtn" aria-label="Action button">A</button></div></div>`;
  document.body.insertBefore(sec,$('#modal'));
  const title=document.createElement('div');title.className='overlay hidden sgTitle';sec.after(title);
  const bx=document.createElement('div');bx.className='overlay hidden sgBattle saga-'+ID;title.after(bx);
  bx.innerHTML=`<div class="sgb-wrap"><div class="sgb-top"><div class="sgb-arena"><canvas width="1520" height="440"></canvas>
      <div class="sgb-card foe"><span class="nm"></span><small class="tg"></small><div class="hp"><i></i></div></div>
      <div class="sgb-card me"><span class="nm">${esc(def.hero.name)}</span><small class="tg"></small><div class="hp"><i></i></div></div><div class="sgb-big pix"></div></div>
    <div class="sgb-bar"><div class="bmsg"></div><button class="btn sm ghost" data-t="flee">🏃 Retreat</button></div></div><div class="sgb-panel"></div></div>`;
  const $s=q=>sec.querySelector(q),$b=q=>bx.querySelector(q);
  const cv=$s('.sgCv'),ctx=cv.getContext('2d');let VW=20,VH=13;
  function fit(){const small=innerWidth<600,nw=small?11:20,nh=small?12:13;if(nw!==VW||nh!==VH||cv.width!==VW*T*2){VW=nw;VH=nh;cv.width=VW*T*2;cv.height=VH*T*2;}ctx.setTransform(2,0,0,2,0,0);}

  /* ---------- world state ---------- */
  let M=null,STATIC=null,mode='title',mv=null,held=null,walkT=0,parts=[],ENEMY=[],dlg=null,P={vx:2,vy:7},COMP={x:1,y:7,vx:1,vy:7},alertT=0;
  function setupChapter(ci){
    M=buildChapterMap(ID,ci,CH[ci]);STATIC=null;
    const ch=CH[ci];
    ENEMY=M.enemies.map((e,k)=>{const L=ch.enemies[k];const st=e.route;const idx=0;return{k,L,route:st,i:idx,d:1,x:st[0][0],y:st[0][1],vx:st[0][0],vy:st[0][1],dir:dirOf(st,0,1),wait:600+k*137,anim:null,kind:foeKind(L.enemy,ID,false),down:!!S.done[L.id],alert:0};});
    /* gates open for defeated enemies */
    M.gates.forEach(gt=>{const e=ENEMY[gt.k];if(e&&e.down)gt.ys.forEach(y=>M.g[y][gt.x]='=');});
    STATIC=buildStatic();
  }
  function dirOf(route,i,d){const a=route[i],b=route[Math.max(0,Math.min(route.length-1,i+d))];if(!b||(a[0]===b[0]&&a[1]===b[1]))return'down';return b[0]>a[0]?'right':b[0]<a[0]?'left':b[1]>a[1]?'down':'up';}
  const tile=(x,y)=>(M.g[y]&&M.g[y][x])||'#';
  function blocked(x,y){const t=tile(x,y);if(t==='#'||t==='o'||t==='g')return true;if(ENEMY.some(e=>!e.down&&e.x===x&&e.y===y))return true;if(M.npc.x===x&&M.npc.y===y)return true;
    if(isBossZone()&&!bossDone()&&x===M.boss.x&&y===M.boss.y)return true;return false;}
  const isBossZone=()=>S.x>1+(ZN-1)*ZW;
  const bossDone=()=>!!S.bosses[CH[S.ch].boss.name];
  const zoneOf=x=>Math.max(0,Math.min(ZN-1,Math.floor((x-1)/ZW)));

  /* ---------- static layer ---------- */
  function buildStatic(){
    const P2=M.P,cn=document.createElement('canvas');cn.width=M.W*T*2;cn.height=M.H*T*2;const c=cn.getContext('2d');c.scale(2,2);
    for(let y=0;y<M.H;y++)for(let x=0;x<M.W;x++){const px=x*T,py=y*T,t=M.g[y][x],r=rng(hash(ID+x+':'+y));
      if(t==='#'){/* walls: top band shows the "roof" colour */
        if(P2.water&&(y<2||y===M.H-1)){c.fillStyle=P2.wall;c.fillRect(px,py,T,T);c.strokeStyle='rgba(255,255,255,.65)';c.lineWidth=1.4;const o=r()*8;c.beginPath();c.moveTo(px+4+o,py+12);c.quadraticCurveTo(px+9+o,py+9,px+14+o,py+12);c.stroke();continue;}
        c.fillStyle=P2.wall;c.fillRect(px,py,T,T);c.fillStyle=P2.wallTop;c.fillRect(px,py,T,y<2?10:6);c.fillStyle='rgba(0,0,0,.06)';c.fillRect(px,py+T-3,T,3);
        if(!(y<2||y===M.H-1||x===0||x===M.W-1)){c.fillStyle=P2.wallTop;c.fillRect(px+2,py+8,T-4,T-10);c.fillStyle='rgba(255,255,255,.18)';c.fillRect(px+4,py+10,T-8,3);}
        continue;}
      c.fillStyle=((x+y)%2&&P2.checker)?P2.floor2:P2.floor;c.fillRect(px,py,T,T);
      if(P2.plank){c.fillStyle='rgba(0,0,0,.07)';c.fillRect(px,py+T-2,T,2);c.fillRect(px+(y%2?10:22),py,2,T);}
      else if(P2.tiles){c.fillStyle='rgba(120,40,10,.12)';for(let k=0;k<4;k++)c.fillRect(px,py+k*8+6,T,2);c.fillStyle='rgba(255,255,255,.12)';c.fillRect(px+(y%2?4:20),py+2,6,3);}
      else{for(let k=0;k<3;k++){c.fillStyle=P2.floor2;c.fillRect(px+Math.floor(r()*28),py+Math.floor(r()*28),3,2);}}
      if(P2.snow&&r()<.2){c.fillStyle='#ffffff';circ(c,px+r()*30,py+r()*30,1.5);}
      if(P2.carpet&&(y===6||y===7)){c.fillStyle='#e11d48';c.fillRect(px,py+(y===6?4:0),T,y===6?28:28);c.fillStyle='#facc15';c.fillRect(px,y===6?py+4:py+26,T,2);}
      if(t===','){c.fillStyle=P2.deco;rr(c,px+4,py+4,T-8,T-8,6);}
    }
    for(let y=0;y<M.H;y++)for(let x=0;x<M.W;x++)if(M.g[y][x]==='o')drawProp(c,M.props[x+','+y],x*T,y*T,M.P,hash(ID+x+'p'+y));
    /* boss arena ring */
    const bx0=(1+(ZN-1)*ZW)*T;c.strokeStyle='rgba(239,68,68,.25)';c.lineWidth=4;c.setLineDash([10,8]);c.strokeRect(bx0+T,2*T+6,(ZW-2)*T,(M.H-3)*T-12);c.setLineDash([]);
    return cn;
  }

  /* ---------- runtime ---------- */
  function placeHero(x,y){S.x=x;S.y=y;P.vx=x;P.vy=y;COMP.x=COMP.vx=x-1>0&&!blocked(x-1,y)?x-1:x;COMP.y=COMP.vy=y;mv=null;}
  function startChapter(ci,resume){S.ch=ci;setupChapter(ci);if(resume&&!blocked(S.x,S.y)&&tile(S.x,S.y)!=='#')placeHero(S.x,S.y);else placeHero(M.start.x,M.start.y);S.zone=zoneOf(S.x);save();hud();banner(`CHAPTER ${ci+1} · ${CH[ci].title.toUpperCase()}`);}
  const DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  function step(dir){S.dir=dir;const[dx,dy]=DIRS[dir],nx=S.x+dx,ny=S.y+dy;if(blocked(nx,ny))return;mv={sx:S.x,sy:S.y,p:0};COMP.tx=S.x;COMP.ty=S.y;COMP.sx=COMP.x;COMP.sy=COMP.y;S.x=nx;S.y=ny;}
  function arrive(){
    const z=zoneOf(S.x);if(z!==S.zone){S.zone=z;save();hud();if(z===ZN-1&&!bossDone())setTimeout(bossIntro,250);}
    const rl=M.relics.find(o=>o.x===S.x&&o.y===S.y);const rid=rl&&(S.ch+':'+rl.k);
    if(rl&&!S.relics[rid]){S.relics[rid]=1;S.xp+=30;save();hud();const R=CH[S.ch].relics[[1,3,5].indexOf(rl.k)]||CH[S.ch].relics[0];
      for(let i=0;i<14;i++)parts.push({x:S.x*T+16,y:S.y*T+12,vx:(Math.random()-.5)*2.2,vy:-Math.random()*2.4,life:34,col:'#facc15',s:3});
      say([`✨ Relic found: ${R.name}! (+30 XP)`,R.lore],null,'Journal');return;}
    spotCheck();
  }
  /* vision: a cone in front of the enemy, blocked by props and walls */
  function sees(e,x,y){if(e.down)return false;const[dx,dy]=DIRS[e.dir];const R=3;
    for(let d=1;d<=R;d++){const lat=d<=1?0:1;for(let l=-lat;l<=lat;l++){const tx=e.x+dx*d+(dy?l:0),ty=e.y+dy*d+(dx?l:0);if(tx===x&&ty===y){/* line of sight */
      for(let k=1;k<d;k++){const t=tile(e.x+dx*k+(dy?Math.round(l*k/d):0),e.y+dy*k+(dx?Math.round(l*k/d):0));if(t==='#'||t==='o'||t==='g')return false;}return true;}}}
    return false;}
  function spotCheck(){if(mode!=='walk')return false;for(const e of ENEMY){if(e.down)continue;if(sees(e,S.x,S.y)){spotted(e);return true;}}return false;}
  function spotted(e){held=null;mode='busy';e.alert=1;alertT=performance.now();sfxShake();
    setTimeout(()=>{e.alert=0;say([`❗ ${e.L.enemy} spotted you!`,'No sneaking now — fight with code!'],()=>openBattle({kind:'fight',e}),'');},650);}
  function sfxShake(){$s('.sgStage').classList.remove('shake');void $s('.sgStage').offsetWidth;$s('.sgStage').classList.add('shake');}
  function interact(){
    if(mode==='dialog'){advance();return;}if(mode!=='walk'||mv)return;
    const[dx,dy]=DIRS[S.dir],fx=S.x+dx,fy=S.y+dy;
    const e=ENEMY.find(q=>!q.down&&q.x===fx&&q.y===fy);
    if(e){if(sees(e,S.x,S.y)){spotted(e);return;}mode='busy';e.dir={up:'down',down:'up',left:'right',right:'left'}[S.dir];held=null;say([`🤫 ${def.takedownLine}`],()=>openBattle({kind:'takedown',e}),'');return;}
    if(M.npc.x===fx&&M.npc.y===fy){npcTalk();return;}
    if(isBossZone()&&!bossDone()&&Math.abs(fx-M.boss.x)+Math.abs(fy-M.boss.y)<=1){bossIntro();return;}
  }
  function npcTalk(){const ch=CH[S.ch],left=ENEMY.filter(e=>!e.down).length;
    say(left?[...def.mentorTips(ch,left),`${left} enem${left===1?'y':'ies'} still guard${left===1?'s':''} the way. Then ${ch.boss.name} waits at the end.`]:[`Only ${ch.boss.name} remains. You're ready. Go!`],null,def.mentor);}
  function update(dt,t){
    if(mv){mv.p+=dt/140;walkT+=dt;if(mv.p>=1){mv=null;P.vx=S.x;P.vy=S.y;COMP.x=COMP.tx;COMP.y=COMP.ty;COMP.vx=COMP.x;COMP.vy=COMP.y;arrive();}
      else{P.vx=mv.sx+(S.x-mv.sx)*mv.p;P.vy=mv.sy+(S.y-mv.sy)*mv.p;COMP.vx=COMP.sx+(COMP.tx-COMP.sx)*mv.p;COMP.vy=COMP.sy+(COMP.ty-COMP.sy)*mv.p;}}
    if(!mv&&mode==='walk'&&held)step(held);
    if(mode==='walk'){for(const e of ENEMY){if(e.down)continue;
      if(e.anim){e.anim.p+=dt/420;if(e.anim.p>=1){e.x=e.anim.tx;e.y=e.anim.ty;e.vx=e.x;e.vy=e.y;e.anim=null;if(sees(e,S.x,S.y)){spotted(e);break;}}else{e.vx=e.anim.sx+(e.anim.tx-e.anim.sx)*e.anim.p;e.vy=e.anim.sy+(e.anim.ty-e.anim.sy)*e.anim.p;}continue;}
      e.wait-=dt;if(e.wait>0)continue;
      let ni=e.i+e.d;if(ni<0||ni>=e.route.length){e.d=-e.d;e.dir=dirOf(e.route,e.i,e.d);e.wait=900;if(sees(e,S.x,S.y)){spotted(e);break;}continue;}
      const[nx,ny]=e.route[ni];if((nx===S.x&&ny===S.y)||ENEMY.some(o=>o!==e&&!o.down&&o.x===nx&&o.y===ny)){e.wait=400;continue;}
      e.dir=dirOf(e.route,e.i,e.d);e.anim={sx:e.x,sy:e.y,tx:nx,ty:ny,p:0};e.i=ni;e.wait=260;}}
    if(mode==='walk'&&!mv){update.sc=(update.sc||0)+dt;if(update.sc>180){update.sc=0;spotCheck();}}
    parts=parts.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.05;return --p.life>0;});
  }
  function draw(t){if(!M||!STATIC)return;
    const W=M.W*T,H=M.H*T;let cx=P.vx*T+16-VW*T/2,cy=P.vy*T+16-VH*T/2;cx=Math.max(0,Math.min(W-VW*T,cx));cy=Math.max(0,Math.min(H-VH*T,cy));if(H<VH*T)cy=(H-VH*T)/2;cx=Math.round(cx);cy=Math.round(cy);
    ctx.fillStyle=M.P.wall;ctx.fillRect(0,0,VW*T,VH*T);ctx.drawImage(STATIC,Math.max(0,cx*2),Math.max(0,cy*2),VW*T*2,VH*T*2,cx<0?-cx:0,cy<0?-cy:0,VW*T,VH*T);
    ctx.save();ctx.translate(-cx,-cy);
    /* gates */
    M.gates.forEach(gt=>{gt.ys.forEach(y=>{const px=gt.x*T,py=y*T;if(M.g[y][gt.x]==='g'){ctx.fillStyle='#78350f';ctx.fillRect(px+4,py,6,T);ctx.fillRect(px+22,py,6,T);ctx.fillStyle='#a16207';ctx.fillRect(px+2,py+8,28,5);ctx.fillRect(px+2,py+20,28,5);ctx.fillStyle='#facc15';circ(ctx,px+16,py+16,3);}
      else{ctx.fillStyle='rgba(120,53,15,.35)';ctx.fillRect(px+2,py+28,28,3);}});});
    /* vision cones */
    for(const e of ENEMY){if(e.down)continue;const[dx,dy]=DIRS[e.dir];ctx.fillStyle=e.alert?'rgba(239,68,68,.28)':'rgba(250,204,21,.22)';
      for(let d=1;d<=3;d++){const lat=d<=1?0:1;for(let l=-lat;l<=lat;l++){const tx=Math.round(e.vx)+dx*d+(dy?l:0),ty=Math.round(e.vy)+dy*d+(dx?l:0);const tt=tile(tx,ty);if(tt==='#'||tt==='o'||tt==='g')continue;ctx.fillRect(tx*T+2,ty*T+2,T-4,T-4);}}}
    /* relics */
    M.relics.forEach(o=>{if(S.relics[S.ch+':'+o.k])return;const px=o.x*T,py=o.y*T,b=Math.sin(t/300)*2;ctx.fillStyle='rgba(250,204,21,.25)';circ(ctx,px+16,py+16,12+Math.sin(t/250)*2);ctx.font='18px serif';ctx.textAlign='center';ctx.fillText(def.relicIcon,px+16,py+22+b);});
    const L=[];
    L.push({y:M.npc.y,f:()=>{drawPerson(ctx,M.npc.x*T,M.npc.y*T,def.mentorLook,'down',0,Math.sin(t/600)>.9?-1:0);ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillStyle='#7c3aed';if(!S.done[CH[S.ch].enemies[0].id])ctx.fillText('💬',M.npc.x*T+16,M.npc.y*T-3+Math.sin(t/220)*2);}});
    for(const e of ENEMY){if(e.down){L.push({y:e.y-.5,f:()=>{ctx.globalAlpha=.55;ctx.save();ctx.translate(e.x*T+16,e.y*T+22);ctx.rotate(Math.PI/2);ctx.translate(-16,-22);drawFoe(ctx,0,0,e.kind,'down',0,.9);ctx.restore();ctx.globalAlpha=1;ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText('💤',e.x*T+24,e.y*T+6);}});continue;}
      L.push({y:e.vy,f:()=>{drawFoe(ctx,e.vx*T,e.vy*T,e.kind,e.dir,t);if(e.alert){ctx.fillStyle='#fff';rr(ctx,e.vx*T+9,e.vy*T-20,14,16,4);ctx.fillStyle='#e5484d';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillText('!',e.vx*T+16,e.vy*T-7);}
        else if(e===nextEnemy()){ctx.fillStyle='#ef4444';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.fillText('▼',e.vx*T+16,e.vy*T-4+Math.sin(t/200)*2);}}});}
    if(!bossDone()){const bL=CH[S.ch].boss;L.push({y:M.boss.y,f:()=>{drawFoe(ctx,M.boss.x*T,M.boss.y*T,foeKind(bL.name,ID,true),'left',t,1.5);ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillStyle='#b91c1c';ctx.fillText('☠ '+bL.name,M.boss.x*T+16,M.boss.y*T-18);}});}
    if(def.companion){L.push({y:COMP.vy-.01,f:()=>drawPerson(ctx,COMP.vx*T,COMP.vy*T,def.companion.look,S.dir,mv?Math.floor(walkT/90)%4:0,mv&&Math.floor(walkT/90)%2?-1:0,.82)});}
    L.push({y:P.vy,f:()=>{const fr=mv?Math.floor(walkT/80)%4:0;drawPerson(ctx,P.vx*T,P.vy*T,def.hero.look,S.dir,fr,mv&&fr%2?-1:0);}});
    L.sort((a,b)=>a.y-b.y).forEach(s=>s.f());
    parts.forEach(p=>{ctx.globalAlpha=Math.min(1,p.life/12);ctx.fillStyle=p.col;ctx.fillRect(p.x,p.y,p.s,p.s);ctx.globalAlpha=1;});
    ctx.restore();
    /* pointer to the next target when it's off screen */
    const ne=nextEnemy(),tgt=ne?{x:ne.vx,y:ne.vy}:(!bossDone()?M.boss:null);
    if(tgt){const sx=tgt.x*T+16-cx,sy=tgt.y*T+16-cy;if(sx<0||sy<0||sx>VW*T||sy>VH*T){const ax=Math.max(18,Math.min(VW*T-18,sx)),ay=Math.max(18,Math.min(VH*T-18,sy));const a=Math.atan2(sy-VH*T/2,sx-VW*T/2);
      ctx.save();ctx.translate(ax,ay);ctx.rotate(a);ctx.fillStyle='rgba(239,68,68,.9)';tri(ctx,12,0,-6,-8,-6,8);ctx.restore();}}
  }
  const nextEnemy=()=>ENEMY.find(e=>!e.down)||null;
  let lastT=performance.now();
  function loop(t){const dt=Math.min(50,t-lastT);lastT=t;if(CURRENT===ID&&mode!=='title'){update(dt,t);draw(t);}requestAnimationFrame(loop);}

  /* ---------- dialog ---------- */
  function say(lines,done,who=''){mode='dialog';held=null;dlg={lines:lines.map(l=>String(l)),i:0,done,typing:false,timer:null,who};$s('.sgDialog').classList.remove('hidden');typeLine();}
  function typeLine(){const raw=dlg.lines[dlg.i];let who=dlg.who,s=raw;const m=/^([A-Z][\w .'-]{1,24}):\s+(.*)$/s.exec(raw);if(m&&!/^https?$/i.test(m[1])){who=m[1];s=m[2];}
    $s('.sgWho').textContent=who||'';$s('.sgWho').style.display=who?'':'none';$s('.sgPortrait').textContent=(who&&def.portraits[who.split(' ').pop()]||def.portraits[who]||'')||'';
    const el=$s('.sgText');let n=0;dlg.typing=true;el.textContent='';clearInterval(dlg.timer);dlg.timer=setInterval(()=>{n+=2;el.textContent=s.slice(0,n);if(n>=s.length){clearInterval(dlg.timer);dlg.typing=false;}},16);dlg.cur=s;}
  function advance(){if(!dlg)return;if(dlg.typing){clearInterval(dlg.timer);$s('.sgText').textContent=dlg.cur;dlg.typing=false;return;}dlg.i++;if(dlg.i<dlg.lines.length){typeLine();return;}const d=dlg.done;dlg=null;$s('.sgDialog').classList.add('hidden');mode='walk';if(d)d();}
  let bT;function banner(t){const b=$s('.sgBanner');b.textContent=t;b.classList.add('show');clearTimeout(bT);bT=setTimeout(()=>b.classList.remove('show'),2000);}

  /* ---------- HUD ---------- */
  function hud(){if(!S.started)return;S.hp=Math.min(S.hp,maxHP());$s('.sg-hp').style.width=(S.hp/maxHP()*100)+'%';$s('.sg-hp').style.background=S.hp/maxHP()<.3?'var(--bad)':'var(--good)';
    $s('.sg-lv').textContent='Lv '+lvl();$s('.sg-ch').textContent=`📖 ${S.ch+1}/${CH.length}`;$s('.sg-sp').textContent=S.sp>0?S.sp:'';
    const ch=CH[S.ch];let g;if(!M)g='';else{const ne=nextEnemy();g=ne?`🎯 ${ne.L.enemy} guards the gate (${ENEMY.filter(e=>e.down).length}/${ENEMY.length}). Sneak behind for a silent takedown!`:!bossDone()?`☠ Face ${ch.boss.name} at the end of ${ch.title}!`:(S.ch<CH.length-1?`✅ Chapter cleared! Open 🗺️ Chapters to continue.`:`👑 You finished the story! Replay any fight from the 📜 Journal.`);}
    $s('.sggoal').innerHTML=`<b>${esc(ch.title)}</b> · <span class="muted">${esc(ch.topic)}</span><br>${esc(g)}`;}

  /* ---------- BATTLE ---------- */
  let BT=null;const bcv=$b('canvas'),bctx=bcv.getContext('2d');bctx.scale(2,2);const BW=760,BH=220;
  let A={hero:{x:0,flash:0},foe:{x:0,flash:0,fall:0,alpha:1},fx:[],shake:0,t0:0,run:false};
  function arenaLoop(t){if(!BT){A.run=false;return;}drawArena(t);requestAnimationFrame(arenaLoop);}
  function drawArena(t){const c=bctx,Pc=PLACES[CH[BT.ch].place]||PLACES.market;c.save();
    const sh=A.shake>0?(Math.random()-.5)*A.shake:0;A.shake*=.9;c.translate(sh,0);
    const g=c.createLinearGradient(0,0,0,BH);g.addColorStop(0,Pc.sky[0]);g.addColorStop(.62,shade(Pc.sky[0].length===7?Pc.sky[0]:'#dff3ff',-.02));g.addColorStop(.62,Pc.floor);g.addColorStop(1,Pc.floor2);c.fillStyle=g;c.fillRect(-10,0,BW+20,BH);
    /* scenery props in the background */
    for(let k=0;k<6;k++){drawPropBg(c,Pc,k);}
    
    const hx=170+A.hero.x,fx=BW-210+A.foe.x;
    /* hero */
    c.save();if(A.hero.flash>0){c.filter='brightness(1.6) saturate(.4)';A.hero.flash-=16;}drawPerson(c,hx,BH-64,def.hero.look,'right',BT.anim==='heroRun'?Math.floor(t/70)%4:0,Math.sin(t/400)*1.5,3.4);c.restore();
    if(def.companion)drawPerson(c,hx-80,BH-60,def.companion.look,'right',0,Math.sin(t/500+1)*1.5,2.5);
    /* foe */
    c.save();c.globalAlpha=A.foe.alpha;if(A.foe.flash>0){c.filter='brightness(2) saturate(0)';A.foe.flash-=16;}
    if(A.foe.fall){c.translate(fx+16,BH-40);c.rotate(A.foe.fall*1.2);c.translate(-(fx+16),-(BH-40));}
    drawFoe(c,fx,BH-72,BT.kind2,'left',t,BT.boss?4.4:3.5);c.restore();
    /* effects */
    A.fx=A.fx.filter(f=>{f.t+=16;const p=f.t/f.d;if(p>=1)return false;c.save();c.globalAlpha=1-p*.6;f.draw(c,p);c.restore();return true;});
    c.restore();}
  function drawPropBg(c,Pc,k){const kinds=Pc.props;const kind=kinds[k%kinds.length];c.save();c.globalAlpha=.55;const x=40+k*130,y=BH*.62-58+(k%2)*8;c.translate(x,y);c.scale(1.6,1.6);drawProp(c,kind,0,0,Pc,k*7+3);c.restore();}
  /* attack animations per game */
  function heroAttack(cb,finisher){const fxX=BW-194,fxY=BH-100;BT.anim='heroRun';let t0=performance.now();
    const tw=(ms,f,done)=>{const s=performance.now();const st=()=>{const p=Math.min(1,(performance.now()-s)/ms);f(p);if(p<1)requestAnimationFrame(st);else done&&done();};requestAnimationFrame(st);};
    if(def.attack==='axe'){/* rune-axe throw: spins to the foe and flies back */
      A.fx.push({t:0,d:900,draw:(c,p)=>{const q=p<.5?p*2:2-p*2;const x=200+(fxX-200)*q,y=BH-110-Math.sin(q*Math.PI)*60;c.translate(x,y);c.rotate(p*18);c.fillStyle='#8b5a2b';c.fillRect(-3,-22,6,40);c.fillStyle='#cbd5e1';c.beginPath();c.moveTo(3,-22);c.quadraticCurveTo(26,-14,16,6);c.lineTo(3,-2);c.fill();c.fillStyle='#38bdf8';circ(c,8,-10,2.5);}});
      setTimeout(()=>{hit(fxX,fxY,finisher);for(let i=0;i<14;i++)A.fx.push(spark(fxX,fxY,'#bae6fd'));},450);setTimeout(()=>{BT.anim=null;cb&&cb();},950);return;}
    if(def.attack==='whip'){tw(220,p=>{A.hero.x=p*90;},()=>{A.fx.push({t:0,d:420,draw:(c,p)=>{c.strokeStyle='#7c4a1e';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(230,BH-100);c.bezierCurveTo(380,BH-170-80*(1-p),520,BH-60,fxX,fxY);c.stroke();}});
        setTimeout(()=>{hit(fxX,fxY,finisher);for(let i=0;i<12;i++)A.fx.push(spark(fxX,fxY,'#fde68a'));},180);tw(260,p=>{A.hero.x=90*(1-p);},()=>{BT.anim=null;cb&&cb();});});return;}
    /* blade: dash in, two crescent slashes, dash out */
    tw(200,p=>{A.hero.x=p*(fxX-300);},()=>{[0,140].forEach((d,i)=>setTimeout(()=>{A.fx.push({t:0,d:300,draw:(c,p)=>{c.strokeStyle='rgba(255,255,255,'+(1-p)+')';c.lineWidth=7-p*5;c.beginPath();c.arc(fxX-10,fxY,50+p*20,i?-2.2:-0.8,i?-0.2:1.3);c.stroke();c.strokeStyle='rgba(56,189,248,'+(0.7-p*.7)+')';c.lineWidth=3;c.beginPath();c.arc(fxX-10,fxY,44+p*18,i?-2.2:-0.8,i?-0.2:1.3);c.stroke();}});hit(fxX,fxY,finisher&&i===1);},d));
      setTimeout(()=>tw(240,p=>{A.hero.x=(fxX-300)*(1-p);},()=>{BT.anim=null;cb&&cb();}),420);});}
  function spark(x,y,col){const a=Math.random()*Math.PI*2,v=2+Math.random()*4;return{t:0,d:500,draw:(c,p)=>{c.fillStyle=col;circ(c,x+Math.cos(a)*v*p*40,y+Math.sin(a)*v*p*30,4*(1-p)+1);}};}
  function hit(x,y,finisher){A.foe.flash=180;A.shake=finisher?18:10;const s=performance.now();const kb=()=>{const p=Math.min(1,(performance.now()-s)/260);A.foe.x=Math.sin(p*Math.PI)*28;if(p<1)requestAnimationFrame(kb);};requestAnimationFrame(kb);
    for(let i=0;i<8;i++)A.fx.push(spark(x,y,'#ffffff'));}
  function foeAttack(cb){const s=performance.now();const f=()=>{const p=Math.min(1,(performance.now()-s)/420);A.foe.x=-Math.sin(p*Math.PI)*(BW-480);if(p>.45&&!f.h){f.h=1;A.hero.flash=200;A.shake=12;for(let i=0;i<10;i++)A.fx.push(spark(200,BH-100,'#fca5a5'));}if(p<1)requestAnimationFrame(f);else cb&&cb();};requestAnimationFrame(f);}
  function bigText(t,col){const el=$b('.sgb-big');el.textContent=t;el.style.color=col||'';el.classList.remove('show');void el.offsetWidth;el.classList.add('show');}
  function bmsg(t){$b('.bmsg').innerHTML=t;}
  function setBars(){$b('.sgb-card.me .hp i').style.width=(S.hp/maxHP()*100)+'%';$b('.sgb-card.me .hp i').style.background=S.hp/maxHP()<.3?'var(--bad)':'var(--good)';$b('.sgb-card.me .tg').textContent=`Lv ${lvl()} · ❤️ ${S.hp}/${maxHP()}`;
    const f=BT.foeHP/BT.foeMax;$b('.sgb-card.foe .hp i').style.width=(f*100)+'%';$b('.sgb-card.foe .hp i').style.background=f<.34?'var(--bad)':f<.67?'var(--gold)':'#ef4444';hud();}
  function openBattle(o){
    mode='battle';held=null;
    const ch=CH[S.ch];BT=Object.assign({ch:S.ch,phase:0,free:S.skills.ins,anim:null},o);
    if(o.kind==='boss'){BT.boss=true;BT.lessons=ch.boss.phases;BT.phase=Math.min(S.bosses['_p'+S.ch]||0,BT.lessons.length-1);BT.foeMax=BT.lessons.length;BT.foeHP=BT.lessons.length-BT.phase;BT.name=ch.boss.name;BT.kind2=foeKind(ch.boss.name,ID,true);}
    else if(o.kind==='practice'){BT.lessons=[o.L];BT.foeMax=1;BT.foeHP=1;BT.name=o.L.enemy;BT.kind2=foeKind(o.L.enemy,ID,!!o.L._boss);BT.boss=!!o.L._boss;}
    else{BT.lessons=[o.e.L];BT.foeMax=1;BT.foeHP=1;BT.name=o.e.L.enemy;BT.kind2=o.e.kind;}
    A={hero:{x:0,flash:0},foe:{x:0,flash:0,fall:0,alpha:1},fx:[],shake:0};
    $b('.sgb-card.foe .nm').textContent=BT.name;$b('.sgb-card.foe .tg').textContent=BT.boss?(o.kind==='practice'?'Boss practice':`☠ ${ch.boss.title||'Boss'} · Phase ${BT.phase+1}/${BT.lessons.length}`):o.kind==='takedown'?'🤫 Unaware — silent takedown!':o.kind==='practice'?'Training rematch':'⚔️ Alerted';
    $b('[data-t=flee]').textContent=BT.boss?'🏳️ Retreat':'🏃 Retreat';
    bx.classList.remove('hidden');document.body.style.overflow='hidden';bx.scrollTop=0;setBars();
    if(!A.run){A.run=true;requestAnimationFrame(arenaLoop);}
    if(o.kind==='fight'){/* alerted guards strike first */bmsg(`${esc(BT.name)} attacks first!`);setTimeout(()=>{if(!BT)return;foeAttack(()=>{hurt(8);lesson();});},350);}
    else lesson();
  }
  function hurt(n){S.hp=Math.max(0,S.hp-n);save();setBars();if(S.hp<=0)setTimeout(defeat,500);}
  function lesson(){
    if(!BT)return;const L=BT.lessons[BT.phase];CURRENT_GAME=ID;
    const flavour=BT.boss?`☠ <b>${esc(BT.name)}</b> — phase ${BT.phase+1} of ${BT.lessons.length}.`:BT.kind==='takedown'?`🤫 <b>${esc(BT.name)}</b> hasn't seen you. Write the code to take them down silently!`:`⚔️ <b>${esc(BT.name)}</b> is fighting you. Every mistake lets them strike!`;
    bmsg(flavour);
    L.storyHTML=`<div class="lgb-lesson"><span class="lgb-type">${esc(def.tagName)} · ${esc(L.concept)}</span><div class="lesson">${md(L.learn)}</div><div class="exl">Example</div><pre class="ex">${esc(L.example)}</pre><div class="mission" style="margin-top:10px">🎯 <b>Mission:</b> ${md(L.mission)}</div></div>`;
    const panel=$b('.sgb-panel');
    const common={game:ID,checkLabel:def.attackLabel,winText:'Direct hit!',onPass:s=>won(s),onFail:()=>missed()};
    const b=L.type==='js'?JSBench(panel,common):Bench(panel,common);b.load(L);BT.bench=b;
    if(BT.free>0){/* Insight skill: free hints that don't cost stars */
      const hb=b.studio.hb;hb.insertAdjacentHTML('afterbegin',`<div class="h t">🦉 <b>Insight (skill):</b> ${md(L.hints[0])}</div>`);b.studio.el.classList.add('has-fb');BT.free--;}
  }
  function missed(){if(!BT)return;bmsg(`${esc(BT.name)} strikes back! Fix your code and try again.`);foeAttack(()=>hurt(BT.boss?14:10));}
  function won(stars){
    if(!BT)return;const L=BT.lessons[BT.phase];const prev=S.stars[L.id]||0;S.stars[L.id]=Math.max(prev,stars);
    const fin=BT.phase+1>=BT.lessons.length;BT.foeHP=BT.lessons.length-BT.phase-1;
    bmsg(fin?`💥 ${def.finisher}`:`💥 Hit! ${esc(BT.name)} staggers…`);
    heroAttack(()=>{setBars();if(fin)finish(stars);else{BT.phase++;if(BT.kind==='boss'){S.bosses['_p'+S.ch]=BT.phase;}save();
      const line=(CH[BT.ch].boss.taunts||[])[BT.phase-1]||`${BT.name}: You won't stop me that easily!`;bigText('PHASE '+(BT.phase+1),'#ef4444');
      $b('.sgb-card.foe .tg').textContent=`☠ Phase ${BT.phase+1}/${BT.lessons.length}`;setTimeout(()=>{if(BT){bmsg(esc(line));setTimeout(lesson,900);}},700);}},fin);
  }
  function finish(stars){
    const o=BT,ch=CH[o.ch];const L=o.lessons[o.phase];
    A.foe.flash=400;const s=performance.now();const fall=()=>{const p=Math.min(1,(performance.now()-s)/700);A.foe.fall=p;A.foe.alpha=1-p*.7;if(p<1)requestAnimationFrame(fall);};requestAnimationFrame(fall);
    let xp=0;
    if(o.kind==='practice'){xp=10;}
    else if(o.kind==='boss'){xp=150;S.bosses[ch.boss.name]=1;delete S.bosses['_p'+o.ch];o.lessons.forEach(x=>S.done[x.id]=1);}
    else{const e=o.e;e.down=true;S.done[L.id]=1;xp=o.kind==='takedown'?60:40;if(o.kind==='takedown')S.stealth++;
      const gt=M.gates.find(g=>g.k===e.k);if(gt)gt.ys.forEach(y=>M.g[y][gt.x]='=');}
    const lv0=lvl();S.xp+=xp;const up=lvl()-lv0;if(up>0){S.sp+=up;S.hp=maxHP();}
    if(S.skills.rec)S.hp=Math.min(maxHP(),S.hp+S.skills.rec*15);
    save();bigText(o.kind==='takedown'?'TAKEDOWN!':o.kind==='boss'?'VICTORY!':'DEFEATED!','#16a34a');
    setTimeout(()=>{closeBattle();
      if(o.kind==='boss'){const last=o.ch===CH.length-1;
        say(ch.boss.defeat,()=>say(ch.outro,()=>{modal(`<div class="center"><div style="font-size:56px">${last?'👑':'🏆'}</div><h2>${last?'You finished '+esc(def.title)+'!':'Chapter '+(o.ch+1)+' complete!'}</h2><p><b>+${xp} XP</b>${up?` · 🎉 Level up! +${up} skill point${up>1?'s':''}`:''}</p><p class="muted">${chapterStarsLine(o.ch)}</p>${last?`<p>You mastered ${esc(def.skillName)}. That's real developer skill. 🌟</p>`:''}</div>`,
          last?[['Journal',openJournal],['Done',null,'primary']]:[['Stay here',null],['Next chapter →',()=>{fade(()=>{startChapter(o.ch+1);say(CH[o.ch+1].intro,null,'');});},'primary']]);},''),'');}
      else if(o.kind==='practice'){modal(`<div class="center"><div style="font-size:44px">${starsHTML(S.stars[L.id]||0)}</div><h3>Practice complete!</h3><p>+${xp} XP</p></div>`,[['Journal',openJournal],['Close',null,'primary']]);}
      else{const left=ENEMY.filter(e=>!e.down).length;
        modal(`<div class="center"><div style="font-size:46px">${o.kind==='takedown'?'🤫':'⚔️'}</div><h2>${o.kind==='takedown'?'Silent takedown!':'Enemy defeated!'}</h2><div style="font-size:26px">${starsHTML(stars)}</div><p><b>+${xp} XP</b>${o.kind==='takedown'?' (stealth bonus!)':''}${up?` · 🎉 Level up! +${up} skill point`:''}</p><p class="muted">${left?`The gate is open. ${left} more to go.`:`The way to ${esc(ch.boss.name)} is open!`}</p>${up?`<p>Open ⭐ <b>Skills</b> to spend your point.</p>`:''}</div>`,[['Continue',null,'primary']]);}
      hud();},1300);
  }
  function chapterStarsLine(ci){const ch=CH[ci];const ls=ch.enemies.concat(ch.boss.phases);const st=ls.reduce((a,L)=>a+(S.stars[L.id]||0),0);return `Stars this chapter: ⭐ ${st}/${ls.length*3}. Replay any fight from the 📜 Journal for more.`;}
  function defeat(){if(!BT)return;closeBattle();S.hp=maxHP();const z=S.zone;const x=Math.max(2,1+z*ZW+1);placeHero(x,7);save();hud();
    say([`${def.hero.name} falls back to regroup…`,'Every coder hits errors. Read the hint, then try again — you keep everything you learned.'],null,def.mentor);}
  function closeBattle(){bx.classList.add('hidden');document.body.style.overflow='';$b('.sgb-panel').innerHTML='';BT=null;mode='walk';save();hud();}
  function fade(fn){const f=$s('.sgFlash');f.className='sgFlash';void f.offsetWidth;f.className='sgFlash fade';mode='busy';setTimeout(fn,240);setTimeout(()=>{if(mode==='busy')mode='walk';},480);}
  $b('[data-t=flee]').onclick=()=>{if(!BT)return;modal(`<h3>Retreat?</h3><p>${BT.boss?'Phases you won are saved.':'You can come back any time.'} ${BT.kind==='practice'?'':'The enemy stays where it is.'}</p>`,[['Keep fighting',null],['Retreat',()=>{const wasE=BT.e;closeBattle();if(wasE&&!BT){/* step away so the guard doesn't spot you again instantly */const[dx,dy]=DIRS[S.dir];const bx2=S.x-dx,by2=S.y-dy;if(!blocked(bx2,by2))placeHero(bx2,by2);wasE.wait=2000;}},'primary']]);};
  function bossIntro(){if(mode!=='walk'&&mode!=='busy')return;if(bossDone())return;const b=CH[S.ch].boss;mode='busy';sfxShake();say(b.intro,()=>openBattle({kind:'boss'}),'');}

  /* ---------- menus ---------- */
  function openJournal(){if(mode==='battle')return;
    const rows=CH.map((ch,ci)=>{const unlocked=ci<=maxChapter();const ls=ch.enemies.map(L=>({L,b:0})).concat(ch.boss.phases.map(L=>({L,b:1})));
      return `<div class="cxsec">${unlocked?'':'🔒 '}Chapter ${ci+1}: ${esc(ch.title)} <small>· ${esc(ch.topic)}</small></div>${unlocked?`<div class="sgj">${ls.map(({L,b})=>`<button class="sgjl ${S.done[L.id]?'':'lock'}" data-id="${L.id}" ${S.done[L.id]?'':'disabled'}><b>${b?'☠ ':''}${esc(L.enemy)}</b><small>${esc(L.concept)}</small>${S.done[L.id]?starsHTML(S.stars[L.id]||0):'<small>not yet</small>'}</button>`).join('')}</div>
        <p class="muted" style="font-size:13px;margin:6px 0 0">Relics: ${[1,3,5].map((k,i)=>S.relics[ci+':'+k]?`${def.relicIcon} ${esc((ch.relics[i]||{}).name||'')}`:'❔').join(' · ')}</p>`:''}`;}).join('');
    modal(`<h2>📜 Journal</h2><p class="muted" style="margin-top:0">Tap any defeated enemy to rematch it — great practice, and you can earn more stars.</p>${rows}`,[['Close',null,'primary']]);
    $$('#modalCard .sgjl[data-id]:not([disabled])').forEach(b=>b.onclick=()=>{const L=LM[b.dataset.id];closeModal();mode='busy';openBattle({kind:'practice',L});});}
  const maxChapter=()=>{let m=0;CH.forEach((ch,ci)=>{if(ci===0||S.bosses[CH[ci-1].boss.name])m=ci;});return m;};
  function openChapters(){if(mode!=='walk')return;
    modal(`<h2>🗺️ Chapters</h2><div class="shop">${CH.map((ch,ci)=>`<button data-ch="${ci}" ${ci<=maxChapter()?'':'disabled'} class="${ci===S.ch?'own':''}"><span class="e">${S.bosses[ch.boss.name]?'✅':ci<=maxChapter()?'📖':'🔒'}</span>${ci+1}. ${esc(ch.title)}<br><small>${esc(ch.topic)}</small></button>`).join('')}</div>`,[['Close',null,'primary']]);
    $$('#modalCard [data-ch]').forEach(b=>b.onclick=()=>{const ci=+b.dataset.ch;closeModal();if(ci===S.ch)return;fade(()=>{startChapter(ci);if(!S.done[CH[ci].enemies[0].id])say(CH[ci].intro,null,'');});});}
  function openSkills(){if(mode!=='walk')return;
    const SK=[['vit','❤️ Vitality','+25 max health per rank'],['ins','🦉 Insight','A free hint at the start of every fight (no star lost)'],['rec','💚 Second Wind','Heal 15 health after every win']];
    modal(`<h2>⭐ Skills</h2><p>Skill points: <b>${S.sp}</b> <span class="muted">(earn 1 every level-up · Lv ${lvl()} · ${S.xp} XP)</span></p><div class="shop">${SK.map(([k,n,d])=>`<button data-sk="${k}" ${S.sp>0&&S.skills[k]<3?'':'disabled'} class="${S.skills[k]>=3?'own':''}"><span class="e">${n.split(' ')[0]}</span>${n.slice(3)}<br><small>${d}</small><br><b>${'●'.repeat(S.skills[k])}${'○'.repeat(3-S.skills[k])}</b></button>`).join('')}</div>
      <p class="muted" style="margin-top:12px">🤫 Silent takedowns: <b>${S.stealth}</b> · Relics: <b>${Object.keys(S.relics).length}/${CH.length*3}</b></p>`,[['Close',()=>hud(),'primary']]);
    $$('#modalCard [data-sk]:not([disabled])').forEach(b=>b.onclick=()=>{S.skills[b.dataset.sk]++;S.sp--;if(b.dataset.sk==='vit')S.hp+=25;save();closeModal();openSkills();});}
  function menu(){if(mode!=='walk')return;modal(`<h2>${def.heroIcon} ${esc(def.title)}</h2><p>${esc(def.hero.name)} · Lv ${lvl()} · ${S.xp} XP · ⭐ ${Object.values(S.stars).reduce((a,b)=>a+b,0)} stars</p>`,
    [['How to play',help],['Restart story',()=>modal(`<h3>Restart ${esc(def.title)}?</h3><p>This deletes this story's progress for ${esc(ME.name)}. It can't be undone.</p>`,[['Cancel',null],['Yes, restart',()=>{try{localStorage.removeItem(KEY);}catch(e){}S=fresh();mode='title';titleScreen();},'primary']])],['Close',null,'primary']]);}
  function help(){modal(`<h2>How to play</h2><p>🕹️ Move with arrow keys / WASD or the D-pad. Press <b>Space</b> or <b>A</b> to act.</p><p>🟨 The yellow squares show where each enemy is looking. Stay out of them!</p><p>🤫 Walk up <b>behind or beside</b> an enemy and press A for a <b>silent takedown</b> — extra XP.</p><p>⚔️ If they spot you, they attack first. Every fight is won by writing real code: correct code = a combo attack, mistakes = they hit back.</p><p>🚪 Each enemy guards a gate. Beat them all to reach the boss.</p><p>⭐ Level up to earn skill points. 📜 Find 3 hidden relics in every chapter.</p>`,[['Got it!',null,'primary']]);}

  /* ---------- title ---------- */
  function titleScreen(){const saved=load();title.classList.remove('hidden');
    title.innerHTML=`<div class="tcard sg-title"><div style="text-align:left"><button class="btn sm" data-x="back">← Arcade</button></div>
      <canvas class="sg-hero-art" width="560" height="300" aria-hidden="true"></canvas>
      <div class="tlogo pix">${esc(def.logo)}</div><p class="tsub">${esc(def.tagline)}</p>
      <div class="tbox"><p style="margin-top:0">${md(def.premise)}</p><p class="muted" style="margin-bottom:0">${CH.length} chapters · ${LS.length} code battles · teaches <b>${esc(def.skillName)}</b></p></div>
      ${saved?`<button class="btn primary big" data-x="cont" style="width:100%;margin-bottom:10px">▶ Continue — Chapter ${saved.ch+1}</button>`:''}
      <button class="btn ${saved?'':'primary'} big" data-x="new" style="width:100%">${saved?'Start the story again':'Begin the story →'}</button></div>`;
    const c=$('.sg-hero-art',title).getContext('2d');c.scale(2,2);const Pc=PLACES[CH[0].place];const g=c.createLinearGradient(0,0,0,150);g.addColorStop(0,Pc.sky[0]);g.addColorStop(.7,Pc.sky[0]);g.addColorStop(.7,Pc.floor);g.addColorStop(1,Pc.floor2);c.fillStyle=g;c.fillRect(0,0,280,150);
    for(let k=0;k<4;k++){c.save();c.globalAlpha=.6;c.translate(10+k*70,62);c.scale(1.3,1.3);drawProp(c,Pc.props[k%Pc.props.length],0,0,Pc,k);c.restore();}
    drawPerson(c,70,104,def.hero.look,'right',0,0,2.8);if(def.companion)drawPerson(c,26,106,def.companion.look,'right',0,0,2.2);drawFoe(c,196,104,foeKind(CH[0].enemies[0].enemy,ID,false),'left',0,3.2);c.font='bold 22px sans-serif';c.textAlign='center';c.fillText('⚔️',150,70);
    $('[data-x=back]',title).onclick=()=>APP.show('hub');
    if(saved)$('[data-x=cont]',title).onclick=()=>{S=saved;begin(false);};
    $('[data-x=new]',title).onclick=()=>{const go=()=>{S=fresh();S.started=true;S.hp=maxHP();save();begin(true);};if(saved)modal(`<h3>Start again?</h3><p>Your saved progress in ${esc(def.title)} will be replaced.</p>`,[['Cancel',null],['Start again',go,'primary']]);else go();};}
  function begin(isNew){title.classList.add('hidden');fit();mode='walk';startChapter(S.ch,!isNew);if(isNew)say(CH[0].intro,help,'');}

  /* ---------- input ---------- */
  const KEYDIR={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right'};
  document.addEventListener('keydown',e=>{if(CURRENT!==ID)return;const tg=(e.target.tagName||'').toLowerCase();if(tg==='textarea'||tg==='input')return;if(mode==='battle'||mode==='title')return;
    if(!$('#modal').classList.contains('hidden')){if(e.key==='Enter'||e.key==='Escape'){const b=$('#modalCard .row .btn.primary')||$('#modalCard .row .btn');if(b){e.preventDefault();b.click();}}return;}
    if(KEYDIR[e.key]){e.preventDefault();held=KEYDIR[e.key];if(mode==='walk'&&!mv)step(held);}else if(e.key===' '||e.key==='Enter'||e.key==='z'){e.preventDefault();interact();}});
  document.addEventListener('keyup',e=>{if(KEYDIR[e.key]&&held===KEYDIR[e.key])held=null;});
  $$('.dpad button',sec).forEach(b=>{const on=e=>{e.preventDefault();held=b.dataset.d;b.classList.add('on');if(mode==='walk'&&!mv)step(held);};const off=()=>{if(held===b.dataset.d)held=null;b.classList.remove('on');};
    b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);});
  $s('.abtn').addEventListener('click',interact);$s('.sgDialog').addEventListener('click',advance);
  $s('[data-back]').onclick=()=>{if(mode==='dialog'){if(dlg)clearInterval(dlg.timer);dlg=null;$s('.sgDialog').classList.add('hidden');mode='walk';}if(mode==='walk'||mode==='title')APP.show('hub');};
  $s('[data-t=journal]').onclick=()=>{if(mode==='walk')openJournal();};$s('[data-t=skills]').onclick=openSkills;$s('[data-t=map]').onclick=openChapters;$s('[data-t=menu]').onclick=menu;
  addEventListener('resize',()=>{if(CURRENT===ID)fit();});

  const api={def,
    enter(){fit();if(mode==='title'||!S.started)titleScreen();else{hud();}},
    leave(){title.classList.add('hidden');held=null;},
    progress(){const s=load();const n=s?LS.filter(L=>s.done[L.id]).length:0;return{done:n,total:LS.length,stars:s?Object.values(s.stars).reduce((a,b)=>a+b,0):0,chapters:s?CH.filter(ch=>s.bosses[ch.boss.name]).length:0};},
    levels(){const s=load()||fresh();return LS.map(L=>({id:L.id,title:L.enemy+' — '+L.concept,ch:L._ch,stars:s.stars[L.id]||(s.done[L.id]?2:0)}));},
    key:KEY,
    _test:{CH,LS,state:()=>S,mode:()=>mode,build:ci=>buildChapterMap(ID,ci,CH[ci]),startChapter,place:placeHero,battle:o=>openBattle(o),enemies:()=>ENEMY,interact,boss:bossIntro,save}};
  window.SAGAS[ID]=api;WORLDS[ID]=api;requestAnimationFrame(loop);return api;
}

/* ------------------------------------------------------------------ the three games */
const tipsFor=topic=>[`Remember: read the "Your job" box first. It tells you exactly what to type.`];
Saga({id:'shadow',title:'Shadowblade',logo:'SHADOWBLADE',tagName:'CSS',skillName:'CSS — styling and layout',heroIcon:'🗡️',relicIcon:'📜',attack:'blade',attackLabel:'🗡️ STRIKE! (check my code)',finisher:'Kael finishes the combo!',
  tagline:'A stealth adventure across the rooftops of Azura. Every strike is written in CSS.',
  premise:"The **Iron Syndicate** controls Azura's Style Engines — machines that decide how the whole city looks. You are **Kael**, apprentice of the Veiled Order. Sneak past guards, rewrite their style scrolls with **CSS**, and bring down **Lord Malvek**.",
  takedownLine:'Kael slips behind the guard… rewrite their style scroll before they turn around!',
  hero:{name:'Kael',look:{skin:'#c68642',hair:'#2b1d14',shirt:'#f4f1ea',pants:'#6b5a4a',hood:'#ece6da',cape:'#c2410c',belt:'#7c2d12',boots:'#4a3424'}},
  mentor:'Master Idris',mentorLook:{skin:'#8d5524',hair:'#e5e7eb',shirt:'#e7e5e4',pants:'#57534e',hood:'#d6d3d1',beard:'#e5e7eb',belt:'#7c2d12'},
  mentorTips:ch=>[`Idris: ${ch.title}. The Syndicate's scrolls here are all about ${ch.topic}.`,'Idris: Watch the yellow light — that is where a guard is looking. Approach from behind for a silent takedown.'],
  portraits:{Kael:'🗡️',Idris:'🧔🏾',Lina:'🧕🏽',Malvek:'🎩',Brutus:'💪',Vex:'⚓',Warden:'🔷',Sable:'🏹',Thorn:'🌿'}});
Saga({id:'rune',title:'Runebound',logo:'RUNEBOUND',tagName:'JavaScript',skillName:'JavaScript — real programming',heroIcon:'🪓',relicIcon:'🪨',attack:'axe',attackLabel:'🪓 CARVE THE RUNE! (run my code)',finisher:'The rune-axe flies true — and returns!',
  tagline:'A father and daughter climb a frozen mountain. Every rune on the axe is JavaScript.',
  premise:"The **Frost Jarl Hrimgar** froze the great World-Forge. **Brynjar** and his clever daughter **Sigrid** must carry the Ember Stone up Mount Hrimfell. Brynjar's rune-axe obeys runes written in **JavaScript**.",
  takedownLine:'Brynjar creeps up behind… carve the rune before it turns!',
  hero:{name:'Brynjar',look:{skin:'#f1c27d',hair:'#a0522d',shirt:'#7f1d1d',pants:'#57534e',beard:'#a0522d',hat:'helm',cape:'#e7e5e4',belt:'#78350f',boots:'#44403c'}},
  companion:{name:'Sigrid',look:{skin:'#f1c27d',hair:'#d9a441',shirt:'#0e7490',pants:'#57534e',pony:1,weapon:'bow',belt:'#78350f'}},
  mentor:'Sigrid',mentorLook:{skin:'#f1c27d',hair:'#d9a441',shirt:'#0e7490',pants:'#57534e',pony:1,weapon:'bow'},
  mentorTips:ch=>[`Sigrid: Father, the runes here are about ${ch.topic}. I'll read them, you carve them.`,'Sigrid: See the yellow glow? That is where they are looking. Sneak around behind!'],
  portraits:{Brynjar:'🧔',Sigrid:'👧🏼',Hrimgar:'🥶',Skarn:'💀',Grunhild:'🧌',Golem:'🗿',Jormun:'🐍',Wyrm:'🐉'}});
})();
