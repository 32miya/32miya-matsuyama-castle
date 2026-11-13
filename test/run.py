#!/usr/bin/env python3
"""ローカルで松山城さんぽを開いて、エラーと読み込みを確認し、スクリーンショットを撮る
使い方: python3 test/run.py [script.js] [out-prefix]"""
import asyncio, sys, os, http.server, threading, functools, json
from playwright.async_api import async_playwright
SITE='/home/claude/site'; PORT=8765
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
def serve():
    h=functools.partial(Q,directory=SITE); http.server.ThreadingHTTPServer(('127.0.0.1',PORT),h).serve_forever()
threading.Thread(target=serve,daemon=True).start()
THREE=open('/tmp/three.min.js','rb').read()
async def main():
    script=open(sys.argv[1]).read() if len(sys.argv)>1 and sys.argv[1].endswith('.js') else ''
    out=sys.argv[2] if len(sys.argv)>2 else '/tmp/shot'
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        pg=await b.new_page(viewport={'width':int(os.environ.get('VW','640')),'height':int(os.environ.get('VH','420'))})
        errs=[]; pg.on('pageerror',lambda e: errs.append('PAGEERR '+str(e)+' | '+(getattr(e,'stack','') or '')[:600])); pg.on('console',lambda m: errs.append(m.type+': '+m.text) if m.type in ('error','warning') else None)
        async def rt(route):
            u=route.request.url
            if 'three.min.js' in u: await route.fulfill(body=THREE,content_type='application/javascript')
            elif u.startswith('http://127.0.0.1'): await route.continue_()
            else: await route.fulfill(status=404,body='')
        await pg.route('**/*',rt)
        await pg.goto(f'http://127.0.0.1:{PORT}/matsuyama/index.html'+os.environ.get('QS','?q=low')+'')
        try: await pg.wait_for_function("document.getElementById('goBtn') && !document.getElementById('goBtn').disabled",timeout=int(os.environ.get('TO','120000')))
        except Exception as e: errs.append('TIMEOUT ready '+str(e)[:100])
        await pg.wait_for_timeout(1500)
        views=json.loads(os.environ['VIEWS']) if os.environ.get('VIEWS') else None
        if views:
            await pg.evaluate("document.getElementById('goBtn').click()"); await pg.wait_for_timeout(1500)
            for e in errs[:30]: print(e[:400])
            errs.clear()
            for i,v in enumerate(views):
                if 'js' in v: await pg.evaluate(v['js'])
                if 'cam' in v: await pg.evaluate('c=>{window.__cam=c}',v['cam'])
                await pg.wait_for_timeout(v.get('wait',1200))
                await pg.screenshot(path=f"{out}_{i}.png",timeout=180000)
        elif script:
            r=await pg.evaluate(script)
            if r: print(json.dumps(r,ensure_ascii=False)[:8000])
        else:
            for e in errs[:30]: print(e[:400])
            errs.clear()
            await pg.screenshot(path=out+'_start.png',timeout=180000)
        for e in errs[:30]: print(e[:400])
        await b.close()
asyncio.run(main())
