"""Spire City map helper.
   from citygen import City
   c=City(40,34)            # 40 wide (x) by 34 deep (z), starts as street '.'
   c.rect(x,z,w,d,ch)       # fill a rectangle: '~' water, ',' grass, '=' plaza, '+' hay,
                            #   'a'..'z' climbable building (height 1..26 m), 'A'..'Z' smooth wall (1..26 m)
   c.border(n,'~')          # n cells of sea around the edge
   c.put(x,z,ch)
   print(c.js())            # JS array of rows to paste into map:[...]
   Letter heights: a=1 b=2 c=3 d=4 e=5 f=6 g=7 h=8 i=9 j=10 ... v=22 ... z=26 (same for capitals)."""
class City:
    def __init__(s,W,D,fill='.'):s.W,s.D=W,D;s.g=[[fill]*W for _ in range(D)]
    def put(s,x,z,ch):
        if 0<=x<s.W and 0<=z<s.D:s.g[z][x]=ch
        return s
    def rect(s,x,z,w,d,ch):
        for zz in range(z,z+d):
            for xx in range(x,x+w):s.put(xx,zz,ch)
        return s
    def ring(s,x,z,w,d,ch):
        s.rect(x,z,w,1,ch);s.rect(x,z+d-1,w,1,ch);s.rect(x,z,1,d,ch);s.rect(x+w-1,z,1,d,ch);return s
    def border(s,n=2,ch='~'):
        s.rect(0,0,s.W,n,ch);s.rect(0,s.D-n,s.W,n,ch);s.rect(0,0,n,s.D,ch);s.rect(s.W-n,0,n,s.D,ch);return s
    def rows(s):return [''.join(r) for r in s.g]
    def js(s):return '[\n'+',\n'.join('  "'+r+'"' for r in s.rows())+']'
    def show(s):print('\n'.join(f'{i:2d} '+r for i,r in enumerate(s.rows())))
