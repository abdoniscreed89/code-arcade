import sys,json
from playwright.sync_api import sync_playwright
# usage: rift.py built.html [worldIndex]  -> every level: answers make the exit reachable, every
#        required terminal is needed (starter code alone can't reach the exit), answers pass checks, starters fail
JS=r'''async(wi)=>{const out={};const T=RIFT._test;
 const W=RIFT_DATA.worlds;const ids=new Set();
 for(let w=0;w<W.length;w++){if(wi!=null&&w!==wi)continue;const world=W[w];
  for(const L of world.levels){const r=[];if(ids.has(L.id))r.push('DUP level id');ids.add(L.id);
   for(const k of ['id','name','map','zones'])if(!L[k])r.push('missing '+k);
   const P=T.parseLevel(L);if(!P.exit)r.push('no E exit');if(!P.map&&false){}
   if(P.terminals.length!==(L.zones||[]).length)r.push(`terminals T=${P.terminals.length} but zones=${(L.zones||[]).length}`);
   if((L.zones||[]).some((z,i)=>!P.anchors[i]))r.push('zone anchor digit missing');
   const plat=async(i,code)=>{const Z=RIFT.zonePos(L,i);const res=await T.layoutZone(Z,code);return res.rects.map(q=>({x:Z.x*32+q.x,y:Z.y*32+q.y,w:q.w,h:q.h}));};
   const ansP=[];for(let i=0;i<(L.zones||[]).length;i++){const z=L.zones[i],Ls=z.lesson;
     for(const k of ['id','concept','learn','job','mission','starter','answer','tip'])if(!Ls[k])r.push(Ls.id+' missing '+k);
     if(!Ls.hints||Ls.hints.length<2)r.push(Ls.id+' <2 hints');if(ids.has(Ls.id))r.push('DUP lesson id '+Ls.id);ids.add(Ls.id);
     const Z=RIFT.zonePos(L,i);const a=await T.checkZone(Z,Ls.answer),s=await T.checkZone(Z,Ls.starter);
     if(!a.ok)r.push(Ls.id+' ANSWER FAILS: '+a.msg);if(s.ok)r.push(Ls.id+' STARTER PASSES');
     ansP.push(await plat(i,Ls.answer));}
   const all=[].concat(...ansP);const rch=T.reachable(P,all);if(!rch.ok)r.push('NOT BEATABLE with answers: '+rch.why);
   for(let i=0;i<ansP.length;i++){if(L.zones[i].optional)continue;const st=L.zones[i].lesson.starter;const sp=await plat(i,st);const others=[].concat(...ansP.filter((_,j)=>j!==i));
     if(T.reachable(P,others.concat(sp),{full:true}).ok)r.push(L.zones[i].lesson.id+' is NOT NEEDED (exit reachable without solving it)');}
   const noCode=T.reachable(P,[],{full:true});if((L.zones||[]).length&&noCode.ok&&!(L.zones.every(z=>z.optional)))r.push('beatable with no code at all');
   out[`W${w+1} ${L.id} "${L.name}" (${P.W}x${P.H}, ${(L.zones||[]).length} terminals, ${P.gems.length} gems)`]=r;}}
 return out;}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page();errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto('file://'+sys.argv[1]);pg.wait_for_timeout(800)
    r=pg.evaluate(JS,int(sys.argv[2]) if len(sys.argv)>2 else None);bad=0
    for k,v in r.items():print(k,':',v);bad+=len(v)
    print('LEVELS',len(r),'PROBLEMS',bad,'PAGE ERRORS',errs)
