#!/usr/bin/env python3
"""Assemble index.html from src/ according to MANIFEST."""
import os,sys
ROOT=os.path.dirname(os.path.abspath(__file__));S=os.path.join(ROOT,'src')
MANIFEST=[l.strip() for l in open(os.path.join(S,'MANIFEST')) if l.strip() and not l.startswith('#')]
out=[]
for name in MANIFEST:
    t=open(os.path.join(S,name),encoding='utf-8').read()
    if name.endswith('.js'):
        import re
        t=re.sub(r'</(script)',r'<\\/\1',t,flags=re.I)  # a literal </script> inside JS would end the block early
        out.append('<script>\n'+t.rstrip()+'\n</script>\n')
    elif name.endswith('.css'):out.append('<style>\n'+t.rstrip()+'\n</style>\n')
    else:out.append(t if t.endswith('\n') else t+'\n')
html=''.join(out)
out_path=sys.argv[sys.argv.index('--out')+1] if '--out' in sys.argv else os.path.join(ROOT,'index.html')
open(out_path,'w',encoding='utf-8').write(html)
print('built',out_path,len(html),'bytes')
