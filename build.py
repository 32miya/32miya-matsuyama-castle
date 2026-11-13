#!/usr/bin/env python3
"""松山城さんぽ: 備中松山城さんぽ（base.html）を土台に、松山城の部分を差しかえて index.html を作る"""
import re, sys, os
D=os.path.dirname(os.path.abspath(__file__)); S=os.path.join(D,'src')
L=open(os.path.join(S,'base.html'),encoding='utf-8').read().split('\n')
def rng(a,b): return '\n'.join(L[a-1:b])
def f(n): return open(os.path.join(S,n),encoding='utf-8').read().rstrip('\n')
parts=[rng(1,1467),f('A_layout.js'),rng(1556,2073),f('C0_tenshucore.js'),rng(2144,2223),f('B_sprite.js'),rng(2224,2273),f('G_ground.js'),
  rng(2366,2385),rng(2423,2465),f('C1_tenshu.js'),rng(2533,2561),rng(2585,2623),f('D_castle.js'),rng(2699,2705),f('E_rooms.js'),f('F_spots.js'),
  rng(2824,2836),f('H_scenery.js'),rng(2921,3304),f('I_npc.js'),rng(3368,len(L))]
s='\n'.join(parts)
n_err=0
def rep(old,new,cnt=1):
  global s,n_err
  c=s.count(old)
  if c<1: print('NOT FOUND:',old[:90]); n_err+=1; return
  if cnt and c!=cnt: print(f'COUNT {c}!={cnt}:',old[:90]); n_err+=1
  s=s.replace(old,new)
def rre(pat,new):
  global s,n_err
  s2,k=re.subn(pat,new,s,flags=re.S)
  if not k: print('RE NOT FOUND:',pat[:90]); n_err+=1
  s=s2
# ---- 見出し・説明 ----
rep('<meta name="description" content="現存天守でただひとつの山城・備中松山城（岡山県高梁市）の天守と城下町を、現代と江戸時代を切り替えてスマホで歩いて巡れる3D散策アプリ">',
    '<meta name="description" content="現存12天守のひとつ・松山城（愛媛県松山市）の連立式天守と門・櫓群、城下を、現代と寛永のころ（築城完成の時代）を切り替えてスマホで歩いて巡れる3D散策アプリ">')
rep('<title>備中松山城さんぽ</title>','<title>松山城さんぽ</title>')
rep('備中松山城さんぽ · 現代','松山城さんぽ · 現代')
rep('<h1 class="vtitle" style="font-size:clamp(46px,11.5vw,80px)">備中松山城</h1>','<h1 class="vtitle" style="font-size:clamp(52px,13vw,88px)">松山城</h1>')
rep('<div class="eyebrow">岡山県高梁市 · 重要文化財 · 3D散策</div>','<div class="eyebrow">愛媛県松山市 · 現存12天守 · 3D散策</div>')
rre(r'<p>臥牛山（がぎゅうざん）の山頂近く.*?</p>','<p>標高132mの勝山（城山）に建つ、加藤嘉明が築いた連立式の平山城。黒門口から大手の登城道を登り、扉のない戸無門、石垣の陰にひそむ隠門と筒井門、太鼓門をへて本丸へ。一ノ門・二ノ門・三ノ門・筋鉄門をくぐった内庭から大天守に入り、小天守・隅櫓・十間廊下・多聞櫓の中をぐるりと一周できます。メニューの「時代」で、寛永のころ（築城が完成した時代・五重天守の伝承による再現）に切り替えられます。</p>')
rep('<div class="note">建物の配置と寸法は簡略な再現で、距離は実際より縮めています。高さも実際よりかなり低くしています。江戸時代の姿は、絵図などをもとにした想像を交えた復元です。</div>',
    '<div class="note">建物の配置と寸法は簡略な再現で、距離と高さは実際よりかなり縮めています。寛永のころの姿は、わかっている史実に言い伝え・仮説（五重の天守など）を加えた想像の復元です。</div>')
# ---- 門の扉なし（戸無門） ----
rep("    const leaf=mesh(o.gold?new THREE.BoxGeometry(W/2-.3,H-1.1,.18):boxUVGeo(W/2-.3,H-1.1,.18,1.4,H),o.gold?M.lattice:M.woodGrain); leaf.position.set(s*(W/2-.25),(H-1.1)/2+.1,-(W/4-.15)); leaf.rotation.y=Math.PI/2; g.add(leaf); }",
    "    if(!o.noLeaf){ const leaf=mesh(o.gold?new THREE.BoxGeometry(W/2-.3,H-1.1,.18):boxUVGeo(W/2-.3,H-1.1,.18,1.4,H),o.gold?M.lattice:M.woodGrain); leaf.position.set(s*(W/2-.25),(H-1.1)/2+.1,-(W/4-.15)); leaf.rotation.y=Math.PI/2; g.add(leaf); } }")
# ---- 素材: 床板と石垣（松山城は打込接の石垣） ----
rep("const HKT_F={floor:'floor_ita_kuro',plaster:'shikkui_kabe',stoneE:'stone_nozura_atarashii',stoneM:'stone_nozura_koke',","const HKT_F={floor:'floor_ita',plaster:'shikkui_kabe',stoneE:'stone_uchikomi',stoneM:'stone_uchikomi',")
rep("M.stone.color.set(art?0xffffff:edo?0xe6e2d8:0xd4d4ce);","M.stone.color.set(art?(edo?0xffffff:0xbfbdb4):edo?0xe6e2d8:0xd4d4ce);")
# ---- 堀の水 ----
rep("/* 高梁川と紺屋川 */\nwaterRect(RIVER_X-RIVER_W,-6000,RIVER_X,6000); waterRect(KONYA.x0,KONYA.z0,KONYA.x1,KONYA.z1);","/* 三之丸の堀 */\nfor(const w of MOATS) waterRect(w.x0,w.z0,w.x1,w.z1);")
# ---- ライトアップ ----
rre(r"const spots=\[\]; for\(const \[p,t\] of \[\[\[HK\.cx-15.*?\]\]\]\)\{","const spots=[]; for(const [p,t] of [[[MS.cx+22,58.5,MS.cz+26],[MS.cx,68,MS.cz]],[[MS.cx-26,55,MS.cz+40],[MS.cx,68,MS.cz]],[[MS.cx+30,58.5,MS.cz-4],[MS.cx,68,MS.cz]],[[-60,52,-186],[-30,62,-186]],[[-36,48,-40],[-32,52,-60]]]){")
# ---- 最初の位置 ----
rep("const P={x:-2,z:-69,y:71.6,yaw:0,pitch:.1,mode:'walk',bob:0,level:-1,room:null};","const P={x:24,z:-176,y:59.6,yaw:0,pitch:.1,mode:'walk',bob:0,level:-1,room:null};")
# ---- 天守入口の目印（内庭の側） ----
rre(r"\{ const T=TEN\.modern,A=T\.annex; for\(const \[par,era\] of \[\[GM,'modern'\],\[GE,'edo'\]\]\)\{ const t=labelSprite\('天守入口','近づくと入れます'\);.*?\} \}",
    "{ const T=TEN.modern,E=T.entry; for(const [par,era] of [[GM,'modern'],[GE,'edo']]){ const t=labelSprite('天守入口','近づくと入れます'); t.position.set(E.X-1.6,T.g0+4.6,E.zc); par.add(t); DOOR_MARKS.push({sp:t,base:T.g0+4.6,era,x:E.X-1.6,z:E.zc}); } }")
rep("else if(Math.hypot(P.x-(T.entry.X+2),P.z-T.entry.zc)<6||(T.annex&&Math.hypot(P.x-(T.annex.x1+1.5),P.z-T.annex.zc)<3.5&&Math.abs(groundH(P.x,P.z)-T.g0)<1)) return {name:'天守に入る',keep:true}; return null; }",
    "else if(Math.hypot(P.x-(T.entry.X+2*(T.es||1)),P.z-T.entry.zc)<6&&Math.abs(groundH(P.x,P.z)-T.g0)<1) return {name:'天守に入る',keep:true}; return null; }")
# 天守から出る（入口は西向き）
rep("else if(!TD&&L===0&&P.x+dx>E.X&&P.z>E.z0-.2&&P.z<E.z1+.2){ P.level=-1; P.x=E.X+.6; P.y=TEN[MODE].g0+1.6; showHint('天守の入口に出ました。東の戸口から本丸へ出られます'); }",
    "else if(!TD&&L===0&&(E.es<0?P.x+dx<E.X:P.x+dx>E.X)&&P.z>E.z0-.2&&P.z<E.z1+.2){ P.level=-1; P.x=E.X+(E.es<0?-.6:.6); P.y=TEN[MODE].g0+1.6; showHint('内庭（天守広場）に出ました'); }")
rep("else if(!TEN[MODE].door&&dx<0&&P.z>TEN[MODE].entry.z0&&P.z<TEN[MODE].entry.z1&&P.x+dx<TEN[MODE].entry.X+.45&&P.x>TEN[MODE].entry.X-.2&&Math.abs(groundH(P.x,P.z)-TEN[MODE].g0)<.5){ P.level=0; P.x=TEN[MODE].entry.X-.2; showHint('天守の入口から中へ。天守台の中の階段を上ると1階です'); }",
    "else if(!TEN[MODE].door&&(()=>{ const E=TEN[MODE].entry; return P.z>E.z0&&P.z<E.z1&&(E.es<0?(dx>0&&P.x+dx>E.X-.45&&P.x<E.X+.2):(dx<0&&P.x+dx<E.X+.45&&P.x>E.X-.2))&&Math.abs(groundH(P.x,P.z)-TEN[MODE].g0)<.5; })()){ const E=TEN[MODE].entry; P.level=0; P.x=E.X-(E.es||1)*.2; showHint('天守台の地階（穴蔵）へ。奥の階段を上ると大天守の1階です'); }")
rep("else { P.level=0; P.x=T.entry.X-.2; P.z=T.entry.zc; P.y=T.g0+1.6; P.yaw=Math.PI/2;","else { const es=T.entry.es||1; P.level=0; P.x=T.entry.X-es*.2; P.z=T.entry.zc; P.y=T.g0+1.6; P.yaw=es<0?-Math.PI/2:Math.PI/2;")
rep("else { P.x=E.X+12; P.z=E.zc; } }","else { P.x=E.X+12*(E.es||1); P.z=E.zc; } }")
# ---- 天守1階の区画（渡櫓・小天守・隅櫓） ----
rep("function floorY(L,x,z){ const st=stairAt(L,x,z); return st?FL[st.base].y+st.t*st.s.rise:FL[L].y; }",
    "function zoneAt(L,x,z){ const F=FL[L]; return F&&F.zones?F.zones.find(Z=>Z.rects.some(r=>inR(r,x,z,0))):null; }\nfunction floorY(L,x,z){ const st=stairAt(L,x,z); if(st) return FL[st.base].y+st.t*st.s.rise; if(FL[L]&&FL[L].zones&&!FL[L].rects.some(r=>inR(r,x,z,0))){ const Z=zoneAt(L,x,z); if(Z) return Z.y; } return FL[L].y; }")
rep("function walkFloor(L,x,z){ const F=FL[L]; if(!F||!F.rects.some(r=>inR(r,x,z,0))) return false;","function walkFloor(L,x,z){ const F=FL[L]; if(!F||!(F.rects.some(r=>inR(r,x,z,0))||(F.zones&&zoneAt(L,x,z)))) return false;")
rep("function updateHUD(){ const a=P.room?P.room.name:P.level>=0?FL[P.level].name:areaAt(P.x,P.z);","function updateHUD(){ const ZN=!P.room&&P.level>=0&&!FL[P.level].rects.some(r=>inR(r,P.x,P.z,0))?zoneAt(P.level,P.x,P.z):null; const a=P.room?P.room.name:P.level>=0?(ZN||FL[P.level]).name:areaAt(P.x,P.z);")
rep("const ns=doorSpot()||elevSpot()||(P.room?P.room:P.level>=0?FL[P.level]:(bd<20?best:null));","const ns=doorSpot()||elevSpot()||(P.room?P.room:P.level>=0?(ZN||FL[P.level]):(bd<20?best:null));")
# ---- 地図の範囲・時代の名前 ----
rep("let MAPR={x0:-330,x1:320,z0:-170,z1:537};","let MAPR={x0:-500,x1:260,z0:-300,z1:230};")
rep("MAPR={x0:-330,x1:320,z0:-170,z1:537};","MAPR={x0:-500,x1:260,z0:-300,z1:230};")
rep("$('vEra').textContent=m==='edo'?'江戸':'現代'; $('eyebrow').textContent='備中松山城さんぽ · '+(m==='edo'?'江戸時代':'現代');","$('vEra').textContent=m==='edo'?'寛永':'現代'; $('eyebrow').textContent='松山城さんぽ · '+(m==='edo'?'寛永のころ':'現代');")
rep("th.textContent=MODE==='edo'&&(s.edoOnly&&!s.q)?'江戸時代':'写真なし';","th.textContent=MODE==='edo'&&(s.edoOnly&&!s.q)?'寛永のころ':'写真なし';")
rre(r"if\(started&&T\.name==='朝'\) showHint\('秋から春の朝は、盆地に霧[^']*'\);","")
rep("function attract(dt){ orbit+=dt*(reduceMotion?.02:.05); const c=TEN.modern,cx=c.cx,cz=c.cz; camera.position.set(cx+Math.sin(orbit+.35)*86,98,cz+Math.cos(orbit+.35)*86); camera.lookAt(cx,58,cz); }",
    "function attract(dt){ orbit+=dt*(reduceMotion?.02:.05); const c=TEN.modern,cx=c.cx,cz=c.cz; camera.position.set(cx+Math.sin(orbit+.35)*96,96,cz+Math.cos(orbit+.35)*96); camera.lookAt(cx,64,cz); }")
rep("window.__oc={spotList","window.__dbg={P,TEN,ROOMS,setMode:m=>setMode(m),teleport:s=>teleport(s),SPOTS,walkable:(x,z)=>walkable(x,z),groundH:(x,z)=>groundH(x,z),enterRoom:R=>enterRoom(R),get FL(){return FL},walkFloor:(L,x,z)=>walkFloor(L,x,z),stepIn:(L,a,b,c,d)=>stepIn(L,a,b,c,d),stepOK:(x,z)=>stepOK(x,z),areaAt:(x,z)=>areaAt(x,z),hitBlock:(x,z,m)=>hitBlock(x,z,m),meshH:(x,z)=>meshH(x,z),upd:dt=>updatePlayer(dt),keys,baseH:(x,z)=>baseH(x,z)}; window.__oc={spotList")
open(os.path.join(D,'index.html'),'w',encoding='utf-8').write(s)
print('written',len(s),'errors',n_err)
