addMat('hedge',std({color:0x47622f,roughness:.95}));
/* 現代の天守の瓦紋: 三つ葉葵（現存12天守で唯一。松平＝久松家が徳川一門として許された紋）。灰色の浮き彫り */
{ const c=makeCanvas(128,128),g=c.getContext('2d'); g.fillStyle='#3b3f45'; g.fillRect(0,0,128,128); g.fillStyle='#5a5f66'; g.beginPath(); g.arc(64,64,58,0,6.283); g.fill(); g.fillStyle='#454a51'; g.beginPath(); g.arc(64,64,50,0,6.283); g.fill();
  g.translate(64,64); g.fillStyle='#6d737b'; g.strokeStyle='#454a51'; g.lineWidth=2;
  for(let k=0;k<3;k++){ g.save(); g.rotate(k*2.094); g.beginPath(); g.moveTo(0,-4); g.bezierCurveTo(-20,-10,-24,-36,-6,-42); g.quadraticCurveTo(0,-40,0,-34); g.quadraticCurveTo(0,-40,6,-42); g.bezierCurveTo(24,-36,20,-10,0,-4); g.fill(); g.beginPath(); for(let j=-2;j<=2;j++){ g.moveTo(0,-8); g.lineTo(j*7,-34); } g.stroke(); g.restore(); }
  g.beginPath(); g.arc(0,0,5,0,6.283); g.fill();
  addMat('aoi',std({map:toTex(c,true,false),roughness:.6,metalness:.2})); }
/* ================= 松山城専用の調度品・襖絵・旗（assets/ms_spr.webp, 2048×936） =================
   描いてもらった1枚の絵を切り抜いて並べ直したもの。屏風・掛軸・床の間・行灯・伊万里の壺・蒔絵の箪笥・長持・文机・刀掛け・槍掛け・太鼓・
   星梅鉢の陣幕と幟（松平家）・鬼瓦・金の鯱・三つ巴・天守の絵・高欄・門扉。襖絵（松・桜と鶴・竹と鶴・桜）は御殿の襖に貼る */
const MSS_META={"castle":[0,0,512,407],"banner":[516,0,262,367],"scroll":[782,0,160,326],"shachiL":[946,0,195,252],"shachiR":[1145,0,196,252],"byobu":[1345,0,384,224],"lamp":[1733,0,131,206],"door":[0,411,283,202],"taiko":[287,411,145,201],"vase":[436,411,155,196],"toko":[595,411,234,194],"yari":[833,411,144,190],"tomoe":[981,411,179,182],"nobori":[1164,411,315,180],"fsPine":[1483,411,303,179],"fsTsuru":[0,617,346,175],"fsTake":[350,617,268,175],"fsSakura":[622,617,228,172],"chestK":[854,617,230,171],"oni":[1088,617,230,158],"koran":[1322,617,342,154],"nagamochi":[1668,617,204,154],"table":[0,796,214,138],"katana":[218,796,231,130],"dobei":[453,796,417,94]},MSS_W=2048,MSS_H=936,MSS={};
{ const TX=[]; const im=new Image(); im.onload=()=>{ for(const t of TX){ t.image=im; t.needsUpdate=true; } }; im.src='assets/ms_spr.webp';
  for(const k in MSS_META){ const [x,y,w,h]=MSS_META[k],t=new THREE.Texture(); t.encoding=THREE.sRGBEncoding; t.anisotropy=8; t.repeat.set(w/MSS_W,h/MSS_H); t.offset.set(x/MSS_W,1-(y+h)/MSS_H); TX.push(t);
    if(k.startsWith('fs')) addMat(k,std({map:t,roughness:.5,metalness:.22}));
    else MSS[k]=std({map:t,alphaTest:.45,side:THREE.DoubleSide,roughness:.7,metalness:(k==='shachiL'||k==='shachiR'||k==='tomoe')?.45:0}); } }
/* 板1枚（cross: 十字に組んで屋外で使う）。下端の高さがy、高さh。o.w で幅を指定すると高さは縦横比から決まらず、そのまま伸ばす */
function msPlane(par,k,x,y,z,ry,h,o){ o=o||{}; const [,,w0,h0]=MSS_META[k],w=o.w||h*w0/h0,g=new THREE.Group(); g.position.set(x,y,z); g.rotation.y=ry||0; par.add(g);
  for(const r of o.cross?[0,Math.PI/2]:[0]){ const m=mesh(new THREE.PlaneGeometry(w,h),MSS[k],!!o.cross,false); m.position.y=h/2; m.rotation.y=r; g.add(m); } return {g,w}; }
/* 室内に置く（部屋の中心からの位置）。solid: ぶつかる */
function msRp(R,k,x,z,ry,h,o){ o=o||{}; const r=msPlane(R.era==='modern'?GM:GE,k,R.ox+x,R.y+(o.y||0),R.oz+z,ry,h);
  if(o.solid){ const c=Math.abs(Math.cos(ry||0)),s=Math.abs(Math.sin(ry||0)),hw=r.w/2*c+.35*s,hd=r.w/2*s+.35*c; R.boxes.push({x0:R.ox+x-hw,x1:R.ox+x+hw,z0:R.oz+z-hd,z1:R.oz+z+hd}); } return r; }
/* 天守の階に置く（solid: その階でぶつかる） */
function msFp(par,F,k,x,z,ry,h,o){ o=o||{}; const r=msPlane(par,k,x,F.y+(o.y||0),z,ry,h);
  if(o.solid){ const c=Math.abs(Math.cos(ry||0)),s=Math.abs(Math.sin(ry||0)),hw=r.w/2*c+.3*s,hd=r.w/2*s+.3*c; coll(F,x-hw,x+hw,z-hd,z+hd); } return r; }
