/* far: 松山平野の町と、まわりの山々。西には瀬戸内海（伊予灘）、東には石鎚の山なみ */
const nearCastle=(x,z)=>inR({x0:-700,x1:520,z0:-420,z1:420},x,z,0);
{ const N=640,geo=new THREE.BoxGeometry(1,1,1); geo.translate(0,.5,0); const im=new THREE.InstancedMesh(geo,M.city,N); im.frustumCulled=false; let n=0,guard=0; const c=new THREE.Color();
  while(n<N&&guard++<30000){ const x=-1300+rnd()*2400,z=-1100+rnd()*2200; if(nearCastle(x,z)||x<-1250) continue;
    const w=8+rnd()*14,d=8+rnd()*14,h=5+Math.pow(rnd(),2.2)*26; im.setMatrixAt(n,TM(x,0,z,rnd()*.3,w,h,d)); c.setHSL(.08+rnd()*.06,.04+rnd()*.08,.5+rnd()*.3); im.setColorAt(n,c.convertSRGBToLinear()); n++; }
  im.count=n; GM.add(im); }
/* 寛永のころ: 城下の外は田畑と村 */
{ const N=260,geo=new THREE.BoxGeometry(1,1,1); geo.translate(0,.5,0); const im=new THREE.InstancedMesh(geo,M.thatch,N),rf=new THREE.InstancedMesh(gableRoofGeo(1,1,1,.15,.08),M.thatch,N); im.frustumCulled=rf.frustumCulled=false; let n=0,guard=0;
  while(n<N&&guard++<30000){ const x=-1300+rnd()*2400,z=-1100+rnd()*2200; if(nearCastle(x,z)||x<-1250) continue; const w=7+rnd()*5,d=6+rnd()*4,h=2.6+rnd();
    im.setMatrixAt(n,TM(x,0,z,rnd()*3,w,h,d)); rf.setMatrixAt(n,TM(x,h,z,0,w,2.6,d)); n++; } im.count=rf.count=n; GE.add(im); GE.add(rf); }
/* 瀬戸内海（伊予灘）: 西のかなた。天守の最上階から海が見える */
{ const m=new THREE.Mesh(new THREE.PlaneGeometry(6000,9000),std({color:0x3f6170,roughness:.35,metalness:.2})); m.material.color.convertSRGBToLinear(); m.rotation.x=-Math.PI/2; m.position.set(-4400,-.6,0); scene.add(m);
  /* 興居島などの島 */ for(const [x,z,R,H] of [[-2300,-500,260,90],[-2700,400,180,60],[-3100,-1300,300,110]]){ const g=new THREE.ConeGeometry(R,H,18,1); g.translate(0,H/2-4,0); const mm=mesh(g,std({color:0x4a5c48,roughness:1}),false,false); mm.position.set(x,0,z); mm.scale.z=.6; scene.add(mm); } }
/* 平野を囲む山（近い山は緑、遠い山は青くかすむ）。西は海に開ける */
{ const SA=256,SR=26,pos=[],col=[],idx=[]; const cL=new THREE.Color('#3a4a33'),cM=new THREE.Color('#58665e'),tmp=new THREE.Color();
  for(let i=0;i<=SR;i++){ const t=i/SR,r=1500+Math.pow(t,1.2)*5200; for(let j=0;j<=SA;j++){ const a=j/SA*Math.PI*2,x=Math.cos(a)*r,z=Math.sin(a)*r*.9,west=Math.max(0,-Math.cos(a));
      const ridge=1-Math.abs(2*fbm(x*.0014+7,z*.0014,5)-1); const prof=Math.pow(Math.sin(Math.PI*Math.min(1,t*1.25)),.6),east=Math.max(0,Math.cos(a)); const h=((80+300*Math.pow(ridge,1.3))*(1+east*.9))*prof*(i?1:0)*(1-Math.pow(west,.7)*.97)+(i?0:-4);
      pos.push(x,h-2,z); tmp.copy(cL).lerp(cM,Math.min(1,t*1.6)).convertSRGBToLinear(); col.push(tmp.r,tmp.g,tmp.b); } }
  for(let i=0;i<SR;i++) for(let j=0;j<SA;j++){ const a=i*(SA+1)+j,b=a+1,c=a+SA+1,d=c+1; idx.push(a,c,b,b,c,d); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3)); g.setAttribute('color',new THREE.Float32BufferAttribute(col,3)); g.setIndex(idx); g.computeVertexNormals();
  scene.add(mesh(g,std({vertexColors:true,roughness:1}),false,false)); }
/* 平野の中の小山（道後の山・御幸寺山など） */
for(const [x,z,R,H] of [[700,-700,260,90],[260,-900,220,110],[-200,-1000,240,70],[900,300,200,60]]){ const NR=30,NA=48,pos=[],col=[],idx=[],c=new THREE.Color(),cL=new THREE.Color('#465a3a'),cH=new THREE.Color('#58694a');
  for(let i=0;i<=NR;i++){ const t=i/NR,r=R*t; for(let j=0;j<=NA;j++){ const a=j/NA*6.283,px=x+Math.cos(a)*r,pz=z+Math.sin(a)*r,h=H*Math.pow(Math.cos(t*Math.PI/2),1.4)*(.75+.5*fbm(px*.008+3,pz*.008,4)); pos.push(px,h-1,pz); c.copy(cL).lerp(cH,h/H).convertSRGBToLinear(); col.push(c.r,c.g,c.b); } }
  for(let i=0;i<NR;i++) for(let j=0;j<NA;j++){ const a=i*(NA+1)+j,b=a+1,cc=a+NA+1,d=cc+1; idx.push(a,cc,b,b,cc,d); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3)); g.setAttribute('color',new THREE.Float32BufferAttribute(col,3)); g.setIndex(idx); g.computeVertexNormals(); scene.add(mesh(g,std({vertexColors:true,roughness:1}),false,true)); }
function updateUnkai(dt){ if(scene.fog.near!==260){ scene.fog.near=260; scene.fog.far=6800; } }

/* ---------- trees ---------- */
const TSETS={modern:{TR:[],BL:[]},edo:{TR:[],BL:[]},both:{TR:[],BL:[]}}; let TS=TSETS.both;
const PINE=['#2b4a2d','#2f4f30','#28432a','#355434'],GREEN=['#4d6a33','#56723a','#47622f'],AUTUMN=['#b5652c','#c8902f','#9c4126','#a87a2c'],DEEP=['#2f4a2a','#38522e','#2a4226','#41582f','#4a5e33'];
function addPine(x,z,s){ const y=baseH(x,z),h=3.6*s; TS.TR.push([x,y+h/2,z,1.3*s,h,1.3*s]); const n=3+((rnd()*3)|0); for(let i=0;i<n;i++){ const a=rnd()*6.28,r=(.3+rnd()*1.2)*s; TS.BL.push([x+Math.cos(a)*r,y+h*(.72+i/n*.5)+rnd()*.4,z+Math.sin(a)*r,(1.5+rnd()*.8)*s,(.55+rnd()*.25)*s,(1.5+rnd()*.8)*s,pick(PINE)]); } }
function addRound(x,z,s,aut,cols){ const y=baseH(x,z),h=2.5*s; TS.TR.push([x,y+h/2,z,s,h,s]); const n=3+((rnd()*3)|0); const base=cols||(aut&&rnd()<.55?AUTUMN:GREEN); for(let i=0;i<n;i++){ const a=rnd()*6.28,r=rnd()*1.3*s; TS.BL.push([x+Math.cos(a)*r,y+h+1.2*s+rnd()*1.2*s,z+Math.sin(a)*r,(1.7+rnd()*.8)*s,(1.4+rnd()*.6)*s,(1.7+rnd()*.8)*s,pick(base)]); } }
const SAKURA=['#f1c6d0','#f4d3db','#eab7c4','#f7dfe4'];
function addBlossom(x,z,s,cols){ const y=baseH(x,z),h=2.3*s; TS.TR.push([x,y+h/2,z,s,h,s]); const n=4+((rnd()*3)|0); for(let i=0;i<n;i++){ const a=rnd()*6.28,r=rnd()*1.5*s; TS.BL.push([x+Math.cos(a)*r,y+h+1*s+rnd()*1*s,z+Math.sin(a)*r,(1.5+rnd()*.7)*s,(1+rnd()*.5)*s,(1.5+rnd()*.7)*s,pick(cols)]); } }
const onRoad=(x,z)=>ROADS.some(r=>inR(r,x,z,2))||actB().some(b=>inR(b,x,z,3))||SPOTS.some(s=>Math.hypot(s.pos[0]-x,s.pos[1]-z)<7||(s.edo&&s.edo.pos&&Math.hypot(s.edo.pos[0]-x,s.edo.pos[1]-z)<7));
function okT(x,z){ return !hitBlock(x,z,2.5)&&!waterAt(x,z,2)&&!onRoad(x,z)&&!rampAt(x,z)&&!RAMPS.some(r=>inR(r,x,z,2.5)); }
TS=TSETS.both;
const WILLOW=['#7f9a4a','#8aa654','#72904a'];
function addWillow(x,z,s){ const y=baseH(x,z),h=3.2*s; TS.TR.push([x,y+h/2,z,1.1*s,h,1.1*s]); for(let i=0;i<4;i++){ const a=rnd()*6.28,r=rnd()*.9*s; TS.BL.push([x+Math.cos(a)*r,y+h*.75+rnd()*.6*s,z+Math.sin(a)*r,(1.3+rnd()*.5)*s,(1.9+rnd()*.6)*s,(1.3+rnd()*.5)*s,pick(WILLOW)]); } }
function addShrub(x,z,sx,sy,sz){ const y=baseH(x,z); TS.BL.push([x,y+sy*.55,z,sx,sy,sz,pick(['#3f5a2c','#47622f','#3a5228','#4d6834'])]); }
/* 眺めの良い所の前は木を低くあける（本丸の南端・本壇から城下と海が見えるように） [x,z,目の高さ,見る先x,z,半角,距離] */
const VIEWS=[[2,-30,55.6,0,400,80,120],[-30,-200,63,-600,-100,70,160],[30,-200,63,600,0,70,160],[-20,-250,55.6,-200,-600,60,90]];
function viewBlocked(x,z,top){ for(const [vx,vz,vy,tx,tz,half,dist] of VIEWS){ const dx=x-vx,dz=z-vz,d=Math.hypot(dx,dz); if(d>dist||d<2) continue; const a=Math.atan2(dx,dz)-Math.atan2(tx-vx,tz-vz),aa=Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))*57.3; if(aa>half) continue; if(top>vy-1.5-d*.12) return true; } return false; }
/* 勝山の林（両方の時代） */
for(let i=0;i<10000;i++){ const x=INR.x0+3+rnd()*(INR.x1-INR.x0-6),z=INR.z0+3+rnd()*(INR.z1-INR.z0-6),h=hillH(x,z); if(h<1||platAt(x,z)) continue; if(viewBlocked(x,z,h+6)) continue; if(PLAT.some(p=>p.wall&&rDist(p,x,z)<3.2)||PLAT.some(p=>!p.wall&&rDist(p,x,z)<1.5)) continue; if(!okT(x,z)) continue;
  const r=rnd(); if(r<.3) addPine(x,z,1.2+rnd()*.7); else if(r<.4&&h<30) addRound(x,z,1.1+rnd()*.6,true); else addRound(x,z,1.3+rnd()*.9,false,DEEP); }
for(const [set,mode] of [[TSETS.modern,'modern'],[TSETS.edo,'edo']]){ TS=set; MODE=mode; const edo=mode==='edo';
  /* 本丸の桜（現代: 約200本。日本さくら名所100選）。寛永のころは松が少し */
  for(const id of ['honS','honN','choja','ninomaru','taikoshita']){ const p=PL[id]; let n=edo?(id==='ninomaru'?4:2):(id==='honS'?26:id==='honN'?14:id==='ninomaru'?10:6); for(let i=0;i<n*5&&n>0;i++){ const x=p.x0+2.5+rnd()*(p.x1-p.x0-5),z=p.z0+2.5+rnd()*(p.z1-p.z0-5); if(!okT(x,z)) continue; if(Math.hypot(x-MS.cx,z-MS.cz)<26) continue; if(id==='honS'&&Math.abs(x-6)<6) continue;
      if(edo||rnd()<.25) addPine(x,z,.9+rnd()*.4); else addBlossom(x,z,1+rnd()*.4,SAKURA); if(--n<=0) break; } }
  /* 堀端の並木（現代は桜と松、寛永のころは柳） */ for(const [x0,z0,x1,z1] of [[-470,190,-214,190],[-470,-252,-214,-252],[-490,-240,-490,180]]){ const L=Math.hypot(x1-x0,z1-z0),n=Math.floor(L/(edo?14:8)); for(let k=0;k<=n;k++){ const x=x0+(x1-x0)*k/n,z=z0+(z1-z0)*k/n; if(!okT(x,z)) continue; if(edo) addWillow(x,z,.9+rnd()*.3); else (k%3?addBlossom(x,z,1+rnd()*.3,SAKURA):addPine(x,z,1)); } }
  /* 三之丸 */ for(let i=0;i<(edo?20:70);i++){ const x=SAN.x0+6+rnd()*(SAN.x1-SAN.x0-12),z=SAN.z0+6+rnd()*(SAN.z1-SAN.z0-12); if(!okT(x,z)) continue; edo?addPine(x,z,.9+rnd()*.4):(rnd()<.5?addBlossom(x,z,1+rnd()*.4,SAKURA):addRound(x,z,1+rnd()*.5,false)); }
  /* 武家屋敷の庭木 */ for(const [x,z,k] of EDO_TREES) if(okT(x,z)) (k==='pine'?addPine(x,z,.8+rnd()*.4):addRound(x,z,.9+rnd()*.3,false));
  /* 町なかの木 */ for(let i=0;i<(edo?50:120);i++){ const x=-640+rnd()*1150,z=30+rnd()*380; if(inR(INR,x,z,0)||!okT(x,z)) continue; rnd()<.4?addPine(x,z,.9+rnd()*.4):addRound(x,z,.9+rnd()*.5,!edo); } }
MODE='modern';

for(const [set,par] of [[TSETS.modern,GM],[TSETS.edo,GE],[TSETS.both,scene]]){ const TR=set.TR,BL=set.BL; if(!TR.length) continue; const tg=new THREE.CylinderGeometry(.12,.2,1,6),bg=new THREE.IcosahedronGeometry(1,1);
  const ti=new THREE.InstancedMesh(tg,M.trunk,TR.length),bi=new THREE.InstancedMesh(bg,M.leaf,BL.length); ti.frustumCulled=bi.frustumCulled=false; ti.castShadow=bi.castShadow=true; bi.receiveShadow=true;
  TR.forEach((t,i)=>ti.setMatrixAt(i,TM(t[0],t[1],t[2],0,t[3],t[4],t[5],(rnd()-.5)*.12,(rnd()-.5)*.12)));
  const c=new THREE.Color(); BL.forEach((b,i)=>{ bi.setMatrixAt(i,TM(b[0],b[1],b[2],rnd()*6,b[3],b[4],b[5])); c.set(b[6]).multiplyScalar(.85+rnd()*.3).convertSRGBToLinear(); bi.setColorAt(i,c); });
  par.add(ti); par.add(bi); }

/* ---------- ロープウェイのゴンドラとリフト（現代） ---------- */
const boats=[];
{ const A=V3(...ROPE.a),Bp=V3(...ROPE.b);
  for(const [dz,t0] of [[-1.2,0],[1.2,.5]]){ const g=new THREE.Group(); GM.add(g); const c=mesh(new THREE.BoxGeometry(2.2,2,2.6),std({color:0xc23b2c,roughness:.5,metalness:.2})); c.position.y=-2.4; g.add(c); const w=mesh(new THREE.BoxGeometry(2.24,.8,2.2),M.glass); w.position.y=-2; g.add(w); const arm=mesh(new THREE.BoxGeometry(.1,1.6,.1),M.black); arm.position.y=-.7; g.add(arm);
    boats.push({g,A:A.clone().setZ(A.z+dz).setY(A.y+1.2),B:Bp.clone().setZ(Bp.z+dz).setY(Bp.y+1.2),t:t0,sp:1/180,dir:dz<0?1:-1}); }
  const LA=V3(...ROPE.lift.a).setY(ROPE.lift.a[1]+4),LB=V3(...ROPE.lift.b).setY(ROPE.lift.b[1]+4);
  for(let k=0;k<10;k++){ const g=new THREE.Group(); GM.add(g); const s=mesh(new THREE.BoxGeometry(.7,.12,.6),M.black); s.position.y=-1.6; g.add(s); const b=mesh(new THREE.BoxGeometry(.7,.6,.08),M.black); b.position.set(0,-1.3,-.3); g.add(b); const ar=mesh(new THREE.BoxGeometry(.06,1.6,.06),M.black); ar.position.y=-.8; g.add(ar);
    boats.push({g,A:LA,B:LB,t:k/10,sp:1/360,dir:1,loop:true}); } }
function updateBoats(dt,clock){ if(MODE!=='modern') return; for(const b of boats){ b.t+=b.sp*dt*b.dir; if(b.loop){ b.t%=1; } else { if(b.t>1){ b.t=1; b.dir=-1; } if(b.t<0){ b.t=0; b.dir=1; } }
  b.g.position.lerpVectors(b.A,b.B,b.t); b.g.rotation.y=Math.atan2(b.B.x-b.A.x,b.B.z-b.A.z); } }
