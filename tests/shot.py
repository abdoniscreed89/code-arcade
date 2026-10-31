import sys
from playwright.sync_api import sync_playwright
# usage: shot.py html out.png width height js_to_run_after_load
html,out,w,h,js=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4]),sys.argv[5]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':w,'height':h});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+html);pg.wait_for_timeout(700)
    pg.evaluate(js);pg.wait_for_timeout(int(__import__("os").environ.get("WAIT","900")))
    pg.screenshot(path=out);print('errors',errs)
