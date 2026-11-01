"""Sword & Script dungeon helper.
   from dungen import Dungeon
   d=Dungeon(3,2)                 # 3 rooms wide, 2 rooms tall (each room 15 x 11 tiles, walls already around every room)
   d.door(0,1,'e')                # open a gap between room (0,1) and its east neighbour (sides: n s e w); kind='.' (open), 'D', 'L' or 'Z'
   d.door(1,1,'n',kind='D',at=7)  # 'at' = position along the wall (default middle); the door tile goes in THIS room's wall
   d.put(x,y,ch) / d.rect(x,y,w,h,ch) use absolute tile coordinates;  d.rput(rx,ry,x,y,ch) / d.rrect(...) are room-relative
   print(d.js())"""
RW,RH=15,11
class Dungeon:
    def __init__(s,cols,rows,floor='.'):
        s.W,s.H=cols*RW,rows*RH;s.g=[[floor]*s.W for _ in range(s.H)]
        for ry in range(rows):
            for rx in range(cols):
                x0,y0=rx*RW,ry*RH
                for x in range(RW):s.g[y0][x0+x]='#';s.g[y0+RH-1][x0+x]='#'
                for y in range(RH):s.g[y0+y][x0]='#';s.g[y0+y][x0+RW-1]='#'
    def put(s,x,y,ch):s.g[y][x]=ch;return s
    def rect(s,x,y,w,h,ch):
        for yy in range(y,y+h):
            for xx in range(x,x+w):s.g[yy][xx]=ch
        return s
    def rput(s,rx,ry,x,y,ch):return s.put(rx*RW+x,ry*RH+y,ch)
    def rrect(s,rx,ry,x,y,w,h,ch):return s.rect(rx*RW+x,ry*RH+y,w,h,ch)
    def door(s,rx,ry,side,kind='.',at=None):
        x0,y0=rx*RW,ry*RH
        if side in 'ew':
            y=y0+(RH//2 if at is None else at);xa=x0+RW-1 if side=='e' else x0;xb=xa+1 if side=='e' else xa-1
            s.g[y][xa]=kind;s.g[y][xb]='.'
        else:
            x=x0+(RW//2 if at is None else at);ya=y0+RH-1 if side=='s' else y0;yb=ya+1 if side=='s' else ya-1
            s.g[ya][x]=kind;s.g[yb][x]='.'
        return s
    def rows(s):return [''.join(r) for r in s.g]
    def js(s):return '[\n'+',\n'.join('  "'+r+'"' for r in s.rows())+']'
    def show(s):print('\n'.join(f'{i:2d} '+r for i,r in enumerate(s.rows())))
