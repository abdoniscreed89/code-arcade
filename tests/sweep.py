import sys,asyncio,json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=1,accept_downloads=True)
    pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    await pg.goto('file://'+sys.argv[1]);await pg.wait_for_timeout(500)
    report={}
    async def overflow(tag):
      w=await pg.evaluate("document.documentElement.scrollWidth-window.innerWidth")
      if w>2: report.setdefault('overflow',[]).append(f'{tag}:{w}px')
    async def close_modal():
      if await pg.is_visible('#modal'):
        t=await pg.inner_text('#modal h2, #modal h3') if await pg.locator('#modal h2, #modal h3').count() else ''
        await pg.click('#modal .row .btn:first-child');return t
      return None
    ONLY=sys.argv[3].split(',')
    for gid in [g for g in ['bug','form','dungeon','art','grid','cafe','spell','robot'] if g in ONLY]:
      await pg.click('[data-go=%s]'%gid);await pg.wait_for_timeout(200)
      n=await pg.evaluate(f"GAMES['{gid}'].def.levels.length");fails=[]
      for i in range(n):
        await pg.click(f'#g-{gid} .lv[data-i="{i}"]');await pg.wait_for_timeout(250)
        await overflow(f'{gid}#{i+1}')
        sec=f'#g-{gid}'
        for _ in range(4):
          if await pg.locator(f'{sec} [data-a=hint]').count(): await pg.click(f'{sec} [data-a=hint]')
        await pg.click(f'{sec} [data-a=tip]')
        if gid=='dungeon':
          await pg.click(f'{sec} [data-a=ans]');await pg.wait_for_timeout(100);await pg.click(f'{sec} [data-a=go]');wait=600
        elif gid=='robot':
          await pg.click(f'{sec} [data-a=ans]');await pg.click(f'{sec} [data-a=run]');wait=900+await pg.evaluate(f"__ROBOT.LV[{i}].answer.length")*0+12000
          for _ in range(80):
            await pg.wait_for_timeout(250)
            if await pg.is_visible('#modal') or 'bad' in (await pg.get_attribute(f'{sec} .feedback','class') or ''): break
          wait=100
        elif gid=='spell':
          await pg.click(f'{sec} [data-a=ans]');await pg.click(f'{sec} [data-a=run]');wait=1500
        else:
          await pg.click(f'{sec} [data-a=answer]')
          if gid=='cafe': await pg.click(f'{sec} [data-add]')
          await pg.wait_for_timeout(350);await pg.click(f'{sec} [data-a=check]');wait=1500
        for _ in range(int(max(wait,1500)/100)+15):
          if await pg.is_visible('#modal'): break
          await pg.wait_for_timeout(100)
        await pg.wait_for_timeout(100)
        t=await close_modal()
        if not t: fails.append(f'L{i+1}: '+(await pg.inner_text(f'{sec} .feedback'))[:120])
        if await pg.locator(f'{sec} [data-lv]').count(): await pg.click(f'{sec} [data-lv]')
        await pg.wait_for_timeout(150)
        print(gid,i+1,'ok' if t else 'FAIL',flush=True)
      stars=await pg.evaluate(f"GAMES['{gid}'].progress()")
      report[gid]={'levels':n,'won':n-len(fails),'fails':fails,'stars':stars['stars']}
      await pg.click(f'#g-{gid} [data-back]');await pg.wait_for_timeout(150)
    if 'racer' in ONLY:
     pass
    # racer: use pit stop answers
    rf=[]
    if 'racer' in ONLY:
     await pg.click('[data-go=racer]')
     for i in range(12):
      await pg.click(f'#g-racer .lv[data-i="{i}"]');await pg.wait_for_timeout(2900);await overflow(f'racer#{i+1}')
      for k in range(6):
        await pg.click('#g-racer [data-a=skip]')
        ans=await pg.inner_text('#g-racer .feedback code')
        await pg.wait_for_timeout(2050)
        await pg.fill('#g-racer .rin',ans);await pg.press('#g-racer .rin','Enter');await pg.wait_for_timeout(350)
      await pg.wait_for_timeout(900)
      t=await close_modal()
      if t!='You won the race!': rf.append(f'race{i+1}:{t} {await pg.inner_text("#g-racer .feedback")}')
      if await pg.locator('#g-racer [data-lv]').count(): await pg.click('#g-racer [data-lv]')
      await pg.wait_for_timeout(150)
     report['racer']={'fails':rf}
     await pg.click('#g-racer [data-back]')
    # quiz: all rounds, deliberately get one wrong each round
    qf=[]
    for r in (range(10) if 'quiz' in ONLY else []):
      if r==0: await pg.click('[data-go=quiz]')
      await pg.click(f'#g-quiz .lv[data-i="{r}"]');await pg.wait_for_timeout(200);await overflow(f'quiz#{r+1}')
      for qi in range(6):
        correct=await pg.evaluate(f"__QUIZ[{r}].qs[{qi}][2][0]");btns=pg.locator('#g-quiz .opt')
        for k in range(await btns.count()):
          txt=await btns.nth(k).inner_text()
          if (txt==correct)!=(qi==0): await btns.nth(k).click();break
        await pg.click('#g-quiz .qnext button');await pg.wait_for_timeout(80)
      await pg.wait_for_timeout(900);t=await close_modal()
      if t!='Round won!': qf.append(f'round{r+1}:{t}')
      if await pg.locator('#g-quiz [data-lv]').count(): await pg.click('#g-quiz [data-lv]')
    if 'quiz' in ONLY:
      report['quiz']={'fails':qf,'stars':(await pg.evaluate("GAMES.quiz.progress()"))['stars']}
      await pg.click('#g-quiz [data-back]');await pg.wait_for_timeout(200)
    await overflow('hub')
    if 'backup' not in ONLY:
      print(json.dumps(report,ensure_ascii=False));print('ERRORS',errs);await b.close();return
    # backup round trip
    before=await pg.evaluate("JSON.stringify(PROG)")
    async with pg.expect_download() as d: await pg.click('#exportProg')
    dl=await d.value;path=sys.argv[2]+'/backup.json';await dl.save_as(path);await close_modal()
    report['backup_file']=dl.suggested_filename
    await pg.evaluate("localStorage.clear()");await pg.reload();await pg.wait_for_timeout(400)
    report['after_wipe_stars']=await pg.evaluate("GAMES.bug.progress().stars")
    await pg.set_input_files('#importFile',path);await pg.wait_for_timeout(400)
    report['import_prompt']=(await pg.inner_text('#modal'))[:160].replace('\n',' | ')
    await pg.click('#modal .btn.primary');await pg.wait_for_timeout(800)
    after=await pg.evaluate("JSON.stringify(PROG)")
    report['restored_exactly']=before==after
    # bad file
    open(sys.argv[2]+'/bad.json','w').write('{"hello":1}')
    await pg.set_input_files('#importFile',sys.argv[2]+'/bad.json');await pg.wait_for_timeout(300)
    report['bad_file_msg']=await pg.inner_text('#modal h3');await close_modal()
    await pg.screenshot(path=sys.argv[2]+'/v3_hub.png',full_page=True)
    print(json.dumps(report,indent=1,ensure_ascii=False));print('ERRORS',errs)
    await b.close()
asyncio.run(main())
