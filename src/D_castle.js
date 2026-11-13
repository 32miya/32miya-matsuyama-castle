/* ================= 両方の時代に残る門と櫓（現存・復元） =================
   松山城には天守をはじめ21棟の重要文化財が残る。そのほかの多くの門・櫓も昭和に木造で復元されている */
B=BS; curSet=BSETS.shared;
const MW={par:scene,wall:'wallBK'};
/* 望楼型の二重櫓（野原櫓）: 入母屋屋根の大きな1重目の上に、小さな望楼をのせた古い形。現存する望楼型二重櫓は日本でここだけ */
function noharaYagura(cx,cz,w,d,y,par){ const g=new THREE.Group(); g.position.set(cx,y,cz); par.add(g); const h1=3.8,mats={roof:M.roof,gable:M.plaster,gold:false,crest:M.tachi,shs:.6};
  const st=mesh(boxUVGeo(w+.6,1,d+.6,3,3),M.stone); st.position.y=-.49; g.add(st);
  const w1=mesh(wallBoxGeo(w,h1,d),M.wallBK); w1.position.y=h1/2; g.add(w1);
  for(const sx of [-1,1]){ const so=mesh(new THREE.BoxGeometry(1.5,1.3,.6),M.wallBK); so.position.set(sx*(w/2-1.1),h1-1.9,d/2+.3); g.add(so); }
  const r1=hipRoof(w,d,1.3,mats,true); r1.position.y=h1-.1; g.add(r1);
  /* 望楼: 屋根の棟の上にのる小さな2重目 */ const w2=w*.52,d2=d*.58,y2=h1+1.6,h2=2.6; const wb=mesh(wallBoxGeo(w2,h2,d2),M.wallBK); wb.position.y=y2+h2/2; g.add(wb);
  const r2=hipRoof(w2,d2,1.1,mats); r2.position.y=y2+h2-.1; g.add(r2); block(cx-w/2-.6,cz-d/2-.6,cx+w/2+.6,cz+d/2+.6,'castle'); return g; }
/* ---- 大手（南）から本丸へ ---- */
/* 戸無門（重要文化財）: 扉がはじめから無い高麗門。「門を閉ざしたことがない」ともいわれ、ここで敵を筒井門の前に誘いこむ */
gate(-35,-15.6,3.6,0,Object.assign({y:50,h:4.4,noLeaf:true},MW));
/* 筒井門（大手の正門、昭和46年復元）と、その東の石垣の陰にひそむ隠門（重要文化財） */
yaguraMon(-38,-60,4.2,0,{y:50,len:14,dep:6,ph:3.6,h2:3.2,wall:'wallBK',par:scene});
yaguraMon(-25.5,-60,2.8,0,{y:50,len:11,dep:5,ph:3.2,h2:2.9,wall:'wallBK',par:scene});
/* 隠門を戸無門の側から見えなくする石垣の張り出しと、その上の塀 */ stoneBlock(BS.stone,-31,-29.4,-57.4,-50,3.6,50); box(BS.stoneK,-31.1,-29.3,53.6,53.8,-57.5,-49.9);
DOBEI_K='dobeiB'; dobei(-30.2,-57.4,-30.2,-50.4,2,'castle',53.8,true);
/* 太鼓門（本丸大手の正門）と南北の続櫓 */
yaguraMon(-18,-72,4.2,Math.PI/2,{y:52,len:14,dep:6,ph:3.6,h2:3.2,wall:'wallBK',par:scene});
yagura(-15.5,-84,5,10,0,Object.assign({y:54,single:true,h1:3.4,pillar:0},MW)); yagura(-15.5,-60,5,10,0,Object.assign({y:54,single:true,h1:3.4,pillar:0},MW));
/* 太鼓櫓（復元）: 本丸の南西の隅。時を告げる太鼓を置いた */ yagura(-12.5,-28.5,9,6,0,Object.assign({y:54,h1:4,h2:3.2,pillar:0},MW));
/* 巽櫓（復元）: 本丸の南東の隅。太鼓門を破った敵の背後を突く位置 */ yagura(21.5,-28.5,7,6,0,Object.assign({y:54,h1:3.8,h2:3,pillar:0},MW));
/* 馬具櫓（本丸の東） */ yagura(22.5,-60,6,8,0,Object.assign({y:54,h1:3.8,h2:3,pillar:0},MW));
/* 本丸の大井戸: 谷を埋めて本丸を広げたとき、その谷底を井戸にしたと伝わる */
{ const x=4,z=-98,y=54; for(const [w,d,dx,dz] of [[9,.6,0,-3.3],[9,.6,0,3.3],[.6,7.2,-4.2,0],[.6,7.2,4.2,0]]) BS.stone.add(boxUVGeo(w,.9,d,3,3),TM(x+dx,y+.45,z+dz)); const wt=mesh(new THREE.PlaneGeometry(7.8,6),M.dote,false,true); wt.rotation.x=-Math.PI/2; wt.position.set(x,y-3,z); scene.add(wt);
  BS.stone.add(boxUVGeo(7.8,3,.3,3,3),TM(x,y-1.5,z-3)); BS.stone.add(boxUVGeo(7.8,3,.3,3,3),TM(x,y-1.5,z+3)); BS.stone.add(boxUVGeo(.3,3,6,3,3),TM(x-3.9,y-1.5,z)); BS.stone.add(boxUVGeo(.3,3,6,3,3),TM(x+3.9,y-1.5,z)); block(x-4.6,z-3.7,x+4.6,z+3.7,'castle'); }
/* ---- 本丸の北: 紫竹門・乾門・乾櫓・野原櫓・艮門 ---- */
gate(-45,-162,3.4,0,Object.assign({y:54,h:4.4},MW)); dobei(-42.6,-162,-38.4,-162,2.2,'castle',54); dobei(-51.6,-162,-47.4,-162,2.2,'castle',54); /* 紫竹門・東塀・西塀 */
yaguraMon(-52,-236,4,Math.PI/2,{y:54,len:12,dep:6,ph:3.6,h2:3.1,wall:'wallBK',par:scene});  /* 乾門 */
yagura(-46.5,-247,9,8,0,Object.assign({y:54,h1:4,h2:3.2,pillar:0},MW));                      /* 乾櫓（重要文化財） */
yagura(-37,-248.5,7,5,0,Object.assign({y:54,single:true,h1:3.4,pillar:0},MW));               /* 乾門東続櫓 */
noharaYagura(-21,-247.5,8,6,54,scene);                                                      /* 野原櫓（重要文化財） */
yaguraMon(32,-236,4,Math.PI/2,{y:54,len:12,dep:6,ph:3.6,h2:3.1,wall:'wallBK',par:scene});    /* 艮門 */
yagura(25.5,-247,9,6,0,Object.assign({y:54,single:true,h1:3.6,pillar:0},MW));                /* 艮門東続櫓 */
/* ---- 本壇（天守曲輪）: 一ノ門 → 二ノ門 → 三ノ門 → 筋鉄門 → 内庭 ---- */
gate(14,-156.5,3.6,Math.PI/2,Object.assign({y:58,h:4.8},MW));                                 /* 一ノ門（重要文化財）: 脇戸付きの高麗門 */
yagura(21,-152,10,4,0,Object.assign({y:58,single:true,h1:3.2,pillar:0},MW));                  /* 一ノ門南櫓 */
gate(25,-162,3.6,0,Object.assign({y:58,h:4.6},MW));                                           /* 二ノ門 */
yagura(31,-156,6,8,0,Object.assign({y:58,single:true,h1:3.2,pillar:0},MW));                   /* 二ノ門南櫓 */
yagura(19,-166,6,4,0,Object.assign({y:58,single:true,h1:3.2,pillar:0},MW));                   /* 三ノ門南櫓 */
gate(14,-183.6,3.4,Math.PI/2,Object.assign({y:58,h:4.4},MW));                                 /* 三ノ門（重要文化財） */
gate(14,-209,3.2,Math.PI/2,Object.assign({y:58,h:4.4},MW));                                   /* 仕切門（重要文化財） */
yagura(30,-212,8,7,0,Object.assign({y:58,single:true,h1:3.6,pillar:0},MW));                   /* 天神櫓: 久松松平家の祖とされる菅原道真をまつった櫓 */
/* 本壇の中の塀: 仕切門内塀・三ノ門東塀・筋鉄門東塀（いずれも重要文化財） */
for(const [z0,z1] of [[-215.6,-210.8],[-207.2,-202.8],[-189.4,-185.5],[-181.7,-178.2],[-177.8,-162.4]]) dobei(14,z0,14,z1,2.2,'castle',58);
/* ---- 登り石垣: 本丸から二之丸へ、山の斜面を下る長い石垣（南と北の2本）。豊臣秀吉の朝鮮出兵のころ倭城で使われた築き方 ---- */
function nobori(pts,era){ const par=era?(era==='edo'?GE:GM):scene,bt=era?(era==='edo'?BE:BM):BS; for(let i=0;i<pts.length-1;i++){ const [ax,az]=pts[i],[bx2,bz]=pts[i+1],L=Math.hypot(bx2-ax,bz-az),n=Math.ceil(L/2.4);
    for(let k=0;k<n;k++){ const t=(k+.5)/n,x=ax+(bx2-ax)*t,z=az+(bz-az)*t; if(rampAt(x,z)||RAMPS.some(r=>inR(r,x,z,2.2))||platAt(x,z)) continue; const y=hillH(x,z),ang=Math.atan2(bz-az,bx2-ax);
      bt.stone.add(boxUVGeo(L/n+.25,3.4,2.6,3,3),TM(x,y+.6,z,-ang)); bt.stoneK.add(new THREE.BoxGeometry(L/n+.3,.2,2.7),TM(x,y+2.35,z,-ang)); block(x-1.3,z-1.3,x+1.3,z+1.3,'castle'); } } }
nobori([[-46,-18],[-80,-14],[-118,-26]]);              /* 南登り石垣 */
nobori([[-52,-246],[-90,-210],[-118,-150],[-140,-82]]); /* 北登り石垣 */

/* 曲輪のふちの塀（両方の時代。本丸・本壇には狭間のある塀がめぐる） */
function edgeDobei(ids,era){ const gapR=[...RAMPS.map(r=>({x0:r.x0-1.5,x1:r.x1+1.5,z0:r.z0-1.5,z1:r.z1+1.5}))];
  for(const p of PLAT){ if(!ids.includes(p.id)||!p.walls) continue; const ins=.8,E=[[p.x0+ins,p.z0+ins,p.x1-ins,p.z0+ins,0,-1],[p.x1-ins,p.z0+ins,p.x1-ins,p.z1-ins,1,0],[p.x0+ins,p.z1-ins,p.x1-ins,p.z1-ins,0,1],[p.x0+ins,p.z0+ins,p.x0+ins,p.z1-ins,-1,0]];
    for(const [ax,az,bx2,bz,nx,nz] of E){ const L=Math.hypot(bx2-ax,bz-az),n=Math.max(1,Math.round(L/4)); let run=null;
      const flush=(t1)=>{ if(run===null) return; const t0=run; run=null; if(t1-t0<.02) return; dobei(ax+(bx2-ax)*t0,az+(bz-az)*t0,ax+(bx2-ax)*t1,az+(bz-az)*t1,2.1,'castle',p.H); };
      for(let i=0;i<n;i++){ const t0=i/n,t1=(i+1)/n,mx=ax+(bx2-ax)*(t0+t1)/2,mz=az+(bz-az)*(t0+t1)/2; const out=baseH(mx+nx*2,mz+nz*2);
        const ok=out<p.H-.8&&!gapR.some(r=>inR(r,mx,mz,0))&&!hitIn(BSETS.shared,mx,mz,1)&&!(era&&hitIn(BSETS[era],mx,mz,1)); if(ok){ if(run===null) run=t0; } else flush(t0); } flush(1); } } }
DOBEI_K='dobeiB'; edgeDobei(['hondan','hiroba','masu1','honN','honS','masu','koshi']); DOBEI_K='dobei';

/* ================= 現代 ================= */
B=BM; curSet=BSETS.modern;
/* 天守の券売所（本丸広場の北）と売店・休憩所 */
{ const y=54; BM.hall.add(boxUVGeo(5,2.8,3.4,3,3),TM(-6,y+1.4,-146)); BM.roof.add(gableRoofGeo(5,3.4,.8,.4,.25),TM(-6,y+2.8,-146)); BM.glass.add(new THREE.BoxGeometry(3,1,.06),TM(-6,y+1.6,-144.27)); block(-8.6,-147.8,-3.4,-144.2,'house');
  BM.hall.add(boxUVGeo(10,3,6,3,3),TM(18,y+1.5,-112)); BM.roof.add(gableRoofGeo(10,6,1.2,.6,.4),TM(18,y+3,-112)); BM.noren.add(new THREE.BoxGeometry(3,.8,.05),TM(14.97,y+2.1,-112,Math.PI/2)); block(12.8,-115.2,23.2,-108.8,'house');
  for(const [x,z] of [[-6,-120],[-6,-110],[-6,-100],[12,-70],[12,-80]]){ BM.darkwood.add(new THREE.BoxGeometry(1.8,.08,.5),TM(x,y+.45,z)); BM.concrete.add(new THREE.BoxGeometry(.1,.42,.4),TM(x-.7,y+.21,z)); BM.concrete.add(new THREE.BoxGeometry(.1,.42,.4),TM(x+.7,y+.21,z)); } }
/* 長者ヶ平: ロープウェイとリフトの山頂駅 */
{ const y=30; BM.hall.add(boxUVGeo(10,4.4,12,3,3),TM(88,y+2.2,12)); BM.roof.add(gableRoofGeo(12,10,1.4,.6,.4),TM(88,y+4.4,12,Math.PI/2)); block(83,6,93,18,'house');
  BM.hall.add(boxUVGeo(4,3,6,3,3),TM(66,y+1.5,-4)); BM.roof.add(gableRoofGeo(6,4,.8,.4,.3),TM(66,y+3,-4,Math.PI/2)); block(64,-7,68,-1,'house'); }
/* ふもとの東雲口駅舎と、ロープウェイ街 */
{ BM.hall.add(boxUVGeo(16,6,12,3,3),TM(178,3,10)); BM.concrete.add(new THREE.BoxGeometry(16.4,.4,12.4),TM(178,6.2,10)); BM.glass.add(new THREE.BoxGeometry(6,2.4,.06),TM(178,1.6,16.03)); block(170,4,186,16,'town'); }
/* ロープウェイのケーブルとゴンドラ、リフト（動きは updateBoats で） */
const ROPE={a:[92,34.5,12],b:[172,7.5,10],lift:{a:[92,30.6,22],b:[150,1.2,22]}};
{ for(const dz of [-1.2,1.2]){ const A=V3(ROPE.a[0],ROPE.a[1]+1.2,ROPE.a[2]+dz),Bp=V3(ROPE.b[0],ROPE.b[1]+1.2,ROPE.b[2]+dz),L=A.distanceTo(Bp),m=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,L,4),M.black); m.position.copy(A).add(Bp).multiplyScalar(.5); m.lookAt(Bp); m.rotateX(Math.PI/2); GM.add(m); }
  for(const t of [.33,.66]){ const x=ROPE.a[0]+(ROPE.b[0]-ROPE.a[0])*t,z=11,y=ROPE.a[1]+(ROPE.b[1]-ROPE.a[1])*t; const h=y+2.6-hillH(x,z); BM.concrete.add(new THREE.BoxGeometry(.6,h,.6),TM(x,hillH(x,z)+h/2,z)); BM.concrete.add(new THREE.BoxGeometry(.4,.4,4),TM(x,y+2.6,z)); }
  { const A=V3(...ROPE.lift.a).setY(ROPE.lift.a[1]+4),Bp=V3(...ROPE.lift.b).setY(ROPE.lift.b[1]+4),L=A.distanceTo(Bp),m=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,L,4),M.black); m.position.copy(A).add(Bp).multiplyScalar(.5); m.lookAt(Bp); m.rotateX(Math.PI/2); GM.add(m); } }
/* 二之丸史跡庭園: 御殿の部屋割りを植え込み（柑橘・草花）と水面であらわし、東に大井戸の遺構 */
{ const p=PL.ninomaru,y=p.H; for(let x=p.x0+10;x<p.x1-14;x+=12) for(let z=p.z0+10;z<p.z1-30;z+=10){ if(rnd()<.35) continue; BM.hedge.add(new THREE.BoxGeometry(10.4,.7,.6),TM(x+5,y+.35,z)); BM.hedge.add(new THREE.BoxGeometry(.6,.7,8.4),TM(x,y+.35,z+4.6)); }
  /* 流水園: 水面で部屋をあらわした所 */ const wt=mesh(new THREE.PlaneGeometry(18,10),M.dote,false,true); wt.rotation.x=-Math.PI/2; wt.position.set(-170,y+.05,-58); GM.add(wt); BM.stone.add(boxUVGeo(18.6,.3,10.6,3,3),TM(-170,y-.1,-58));
  /* 大井戸遺構: 東西18m・深さ9mほどの巨大な貯水池 */ const x=-134,z=-8; for(const [w,d,dx,dz] of [[16,.6,0,-6],[16,.6,0,6],[.6,12,-8,0],[.6,12,8,0]]) BM.stone.add(boxUVGeo(w,.8,d,3,3),TM(x+dx,y+.4,z+dz)); const wt2=mesh(new THREE.PlaneGeometry(15.4,11.4),M.dote,false,true); wt2.rotation.x=-Math.PI/2; wt2.position.set(x,y-4,z); GM.add(wt2);
  BM.stone.add(boxUVGeo(15.4,4,.3,3,3),TM(x,y-2,z-5.7)); BM.stone.add(boxUVGeo(15.4,4,.3,3,3),TM(x,y-2,z+5.7)); BM.stone.add(boxUVGeo(.3,4,11.4,3,3),TM(x-7.7,y-2,z)); BM.stone.add(boxUVGeo(.3,4,11.4,3,3),TM(x+7.7,y-2,z)); block(x-8.4,z-6.4,x+8.4,z+6.4,'castle');
  /* 休憩所（観恒亭）と門 */ goten2(-150,6,12,7,3.2,{y,roof:M.roof,par:GM,kind:'house'}); gate(-190,-56,3.6,Math.PI/2,{y,h:4.4,par:GM}); }
/* 三之丸（堀之内公園）: 芝生広場と愛媛県美術館・市民会館 */
{ bldg(-300,60,40,26,12,'#d9d4c8'); bldg(-390,-80,34,30,14,'#c9c4b8'); bldg(-250,-160,22,14,7,'#e3dccc'); }
/* 萬翠荘（大正11年・1922年）: 旧松山藩主の子孫・久松定謨が建てたフランス風の洋館 */
{ const x=40,z=90,w=16,d=12,h=8,y=0; BM.pinkW.add(boxUVGeo(w,h,d,3,3),TM(x,y+h/2,z)); BM.roof.add(gableRoofGeo(w,d,3.2,.6,.4),TM(x,y+h,z)); BM.pinkW.add(boxUVGeo(4,13,4,3,3),TM(x+w/2-2,y+6.5,z+d/2-2)); BM.roof.add(new THREE.ConeGeometry(3.2,3.4,4),TM(x+w/2-2,y+14.6,z+d/2-2,Math.PI/4));
  for(let k=0;k<4;k++) for(const yy of [2,5.4]) BM.glass.add(new THREE.BoxGeometry(1.2,1.8,.06),TM(x-6+k*3.6,y+yy,z+d/2+.02)); block(x-w/2,z-d/2,x+w/2,z+d/2,'town'); }
/* 愛媛県庁（昭和4年・1929年）: 中央にドームを持つ本館 */
{ const x=-80,z=110; bldg(x,z,60,18,14,'#d8d3c8'); BM.concrete.add(new THREE.CylinderGeometry(4,4,6,16),TM(x,17,z)); BM.roof.add(new THREE.SphereGeometry(4.4,16,8,0,6.283,0,1.57),TM(x,20,z)); }
/* 松山の町なか: 家並みとビル */
{ const xr=[[-200,-44],[-26,196],[216,520]]; for(const [a0,a1] of xr){ houseRow(a0,a1,185,'x',-1); houseRow(a0,a1,199,'x',1); } for(const [a0,a1] of [[-200,-44],[-26,22],[60,196],[216,520]]) houseRow(a0,a1,77,'x',1);
  for(const [a0,a1] of [[-640,-340],[-318,-216]]){ houseRow(a0,a1,199,'x',1); } houseRow(-640,-490,-11,'x',1); houseRow(-640,-490,-21,'x',-1);
  for(const [a0,a1] of [[-240,60],[80,180]]) { houseRow(a0,a1,213,'z',1); houseRow(a0,a1,199,'z',-1); } houseRow(152,520,29,'x',1); houseRow(196,520,17,'x',-1);
  houseRow(-640,-340,-263,'x',-1); houseRow(-318,200,-263,'x',-1); houseRow(-640,-490,-249,'x',1);
  for(let i=0;i<18;i++){ const x=230+rnd()*260,z=90+rnd()*90; if(hitBlock(x,z,8)||inR({x0:200,x1:212,z0:-500,z1:500},x,z,8)) continue; bldg(x,z,10+rnd()*14,10+rnd()*12,10+rnd()*26); }
  for(let i=0;i<18;i++){ const x=-640+rnd()*1100,z=210+rnd()*200; if(hitBlock(x,z,8)||ROADS.some(r=>inR(r,x,z,8))) continue; bldg(x,z,10+rnd()*14,10+rnd()*12,8+rnd()*22); } }

/* ================= 寛永のころ（江戸時代のはじめ） ================= */
B=BE; curSet=BSETS.edo;
/* 明治以降に失われた門と櫓 */
yaguraMon(-70,-36,4.2,Math.PI/2,{y:24,len:14,dep:6,ph:3.6,h2:3.2,wall:'wallBK',par:GE});   /* 大手門 */
gate(-63,10,3.6,0,{y:34,h:4.4,par:GE});                                                       /* 揚木戸門 */
gate(-120,-36,3.8,Math.PI/2,{y:10,h:4.6,par:GE});                                             /* 黒門 */
yagura(-8,-248.5,8,5,0,{y:54,single:true,par:GE,wall:'wallBK',h1:3.4,pillar:0});             /* 小筒櫓 */
yagura(-40,6,7,5,0,{y:40,single:true,par:GE,wall:'wallBK',h1:3.4,pillar:0});                 /* 太鼓櫓の下の番所櫓 */
gate(-190,-56,3.6,Math.PI/2,{y:10,h:4.6,par:GE});                                             /* 二之丸の西の門 */
/* 戦のための幟（星梅鉢は松平家の紋。寛永12年・1635年から松平定行が城主） */
for(const [x,z,ry,y] of [[-26,-40,Math.PI/2,50],[-40,-70,0,52],[-8,-120,Math.PI/2,54],[24,-200,-Math.PI/2,58]]) msPlane(GE,'nobori',x,y,z,ry,3.4);
DOBEI_K='dobeiB'; edgeDobei(['taikoshita','agekido','ote','kita','ninomaru'],'edo'); DOBEI_K='dobei';
/* 二之丸御殿: 寛永4年（1627年）に蒲生忠知が完成させた、城主の住まいと政庁 */
{ const y=10; goten2(-156,-30,28,14,4.4,{y,kara:1,roof:M.roof,par:GE}); goten2(-172,-67,16,10,3.8,{y,roof:M.roof,par:GE}); goten2(-140,-67,14,10,3.6,{y,roof:M.kokera,par:GE});
  roka2(-164,-37,-164,-61,y); roka2(-146,-37,-146,-61,y); kura(-132,8,9,6,0,{y,kind:'castle'}); kura(-180,8,9,6,0,{y,kind:'castle'}); }
/* 三之丸（堀之内）: 重臣の屋敷が並ぶ */
for(const [x0,x1] of [[-444,-392],[-386,-340],[-318,-270],[-264,-220]]) for(const [z0,z1] of [[-206,-146],[-136,-76],[-4,56],[66,144]]) buke(x0,z0,x1,z1,x0<-336?'e':'w',{hw:16});
/* 三之丸の門と堀ばたの塀 */ gate(-329,151,4,0,{y:0,h:4.6,par:GE}); gate(-329,-213,4,0,{y:0,h:4.6,par:GE}); gate(-449,-16,4,Math.PI/2,{y:0,h:4.6,par:GE});
DOBEI_K='dobeiB'; for(const [a,b] of [[[-449,-213],[-331.4,-213]],[[-326.6,-213],[-215,-213]],[[-449,151],[-331.4,151]],[[-326.6,151],[-215,151]],[[-449,-213],[-449,-18.4]],[[-449,-13.6],[-449,151]]]) dobei(a[0],a[1],b[0],b[1],2.3,'castle'); DOBEI_K='dobei';
/* 城下町: 古町（北西）と外側（南・東）の町人地 */
{ for(const [a0,a1] of [[-640,-340],[-318,-216],[-200,-44],[90,196],[216,480]]) simpleRow('edo',a0,a1,185,'x',-1); for(const [a0,a1] of [[-640,-340],[-318,-216],[-200,-44],[-26,196],[216,480]]) simpleRow('edo',a0,a1,199,'x',1);
  machiRow(-26,90,185,'x',1,true);
  for(const [a0,a1] of [[-200,-44],[-26,196],[216,480]]) simpleRow('edo',a0,a1,77,'x',1);
  for(const [a0,a1] of [[-240,60],[80,180]]){ simpleRow('edo',a0,a1,213,'z',1); simpleRow('edo',a0,a1,199,'z',-1); }
  for(const [a0,a1] of [[-640,-340],[-318,200]]) simpleRow('edo',a0,a1,-263,'x',-1); simpleRow('edo',152,480,29,'x',1); }
