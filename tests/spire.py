import sys,json
from playwright.sync_api import sync_playwright
# usage: spire.py built.html [districtId ...]  -> validates Spire City districts (answers pass, starters fail,
#   every terminal reachable in order, sync point reachable with all answers, every terminal NEEDED, feathers reachable)
html=sys.argv[1];only=sys.argv[2:]
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']);pg=b.new_page(viewport={'width':1280,'height':800});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto('file://'+html);pg.wait_for_timeout(800)
    ids=pg.evaluate("SPIRE._test.allLevels().map(L=>L.id)")
    total=0
    for i in ids:
        if only and i not in only:continue
        r=pg.evaluate("id=>SPIRE._test.validate(id)",i)
        L=pg.evaluate("id=>{const L=SPIRE._test.allLevels().find(x=>x.id===id);return [L.name,L.map[0].length,L.map.length,L.zones.length,(L.feathers||[]).length]}",i)
        print(i,json.dumps(L[0]),f'({L[1]}x{L[2]}, {L[3]} terminals, {L[4]} feathers) :',r,flush=True);total+=len(r)
    print('DISTRICTS',len(ids),'PROBLEMS',total,'PAGE ERRORS',errs)
