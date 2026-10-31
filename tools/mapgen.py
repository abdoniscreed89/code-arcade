"""Tiny helper to draw Rift Runner maps.
   m=Map(W,H); m.ground(x1,x2,top); m.block(x1,y1,x2,y2); m.plat(x,y,n); m.put(x,y,'o'); print(m.js())"""
class Map:
    def __init__(s,W,H):s.W,s.H=W,H;s.g=[['.']*W for _ in range(H)]
    def ground(s,x1,x2,top):
        for y in range(top,s.H):
            for x in range(x1,x2+1):s.g[y][x]='#'
        return s
    def block(s,x1,y1,x2,y2,ch='#'):
        for y in range(y1,y2+1):
            for x in range(x1,x2+1):s.g[y][x]=ch
        return s
    def plat(s,x,y,n):
        for i in range(n):s.g[y][x+i]='='
        return s
    def put(s,x,y,ch):s.g[y][x]=ch;return s
    def rows(s):return[''.join(r).rstrip('.') or '.' for r in s.g]
    def js(s,indent='  '):return '[\n'+',\n'.join(indent+'"'+r+'"' for r in s.rows())+']'
