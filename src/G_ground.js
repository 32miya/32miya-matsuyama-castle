/* ---------- ground ---------- */
const GN=2048,DX0=-720,DZ0=-500,DW=1280,GS=GN/DW;
function painter(ctx){ const X=x=>(x-DX0)*GS,Z=z=>(z-DZ0)*GS; return {
  R(x0,z0,x1,z1,col){ ctx.fillStyle=col; ctx.fillRect(X(x0),Z(z0),(x1-x0)*GS,(z1-z0)*GS); },
  mot(x0,z0,x1,z1,cols,n,sz){ for(let i=0;i<n;i++){ ctx.fillStyle=pick(cols); ctx.globalAlpha=.3+rnd()*.38; const x=x0+rnd()*(x1-x0),z=z0+rnd()*(z1-z0),r=(sz*(.4+rnd()))*GS; ctx.beginPath(); ctx.ellipse(X(x),Z(z),r,r*(.5+rnd()*.6),rnd()*3,0,6.283); ctx.fill(); } ctx.globalAlpha=1; },
  poly(pts,w,col){ ctx.strokeStyle=col; ctx.lineWidth=w*GS; ctx.lineJoin='round'; ctx.lineCap='round'; ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(X(p[0]),Z(p[1])):ctx.moveTo(X(p[0]),Z(p[1]))); ctx.stroke(); },
  ell(x,z,rx,rz,col){ ctx.fillStyle=col; ctx.beginPath(); ctx.ellipse(X(x),Z(z),rx*GS,rz*GS,0,0,6.283); ctx.fill(); },
  joints(x0,z0,x1,z1,step){ ctx.fillStyle='rgba(0,0,0,.12)'; for(let x=x0;x<x1;x+=step) ctx.fillRect(X(x),Z(z0),1,(z1-z0)*GS); for(let z=z0;z<z1;z+=step) ctx.fillRect(X(x0),Z(z),(x1-x0)*GS,1); } }; }
const GRAVEL='#b6aa8f', LAWN=['#566a39','#61763f','#4f6334','#6a7c45','#5b6f3a'], WATERC='#34504b', FOREST=['#3a4729','#33402a','#414c2c','#4a4a30','#3c3f2a'];
const gc=makeCanvas(GN,GN), gg=gc.getContext('2d'), PM=painter(gg);
const gcE=makeCanvas(GN,GN), ge=gcE.getContext('2d'), PE=painter(ge);
/* 勝山: 林の斜面・曲輪・石段の下地（両方の時代） */
function paintHill(P,edo){ for(let x=INR.x0;x<INR.x1;x+=2.5) for(let z=INR.z0;z<INR.z1;z+=2.5){ if(platAt(x+1.25,z+1.25)) continue; const h=hillH(x+1.25,z+1.25); if(h>.5) P.R(x,z,x+2.6,z+2.6,pick(h>40&&rnd()<.3?['#46502e','#3f4a2b']:FOREST)); }
  for(const p of PLAT){ const A=(p.x1-p.x0)*(p.z1-p.z0);
    if(edo){ P.R(p.x0,p.z0,p.x1,p.z1,'#a69676'); P.mot(p.x0,p.z0,p.x1,p.z1,['#a39478','#ad9f83','#9a8c71','#b1a488'],A/10,2.2); }
    else { P.R(p.x0,p.z0,p.x1,p.z1,'#a99d82'); P.mot(p.x0,p.z0,p.x1,p.z1,['#9e957c','#b0a68c','#8f8a6c','#7d8450'],A/9,2.2); P.mot(p.x0,p.z0,p.x1,p.z1,LAWN,A/40,2.5); } }
  for(const r of RAMPS) if(r.road) P.R(r.x0,r.z0,r.x1,r.z1,edo?'#9a8a6c':'#8f8572'); }
const MOATR=MOATS;
/* 現代: 松山の町なか（道路・ビル街）、三之丸は堀之内公園の芝生 */
PM.R(-2000,-2000,2000,2000,'#6c6a5e'); PM.mot(DX0,DZ0,DX0+DW,DZ0+DW,['#6f6b63','#7e7a71','#736f67','#66705a'],3600,4);
PM.R(SAN.x0,SAN.z0,SAN.x1,SAN.z1,'#5f7440'); PM.mot(SAN.x0,SAN.z0,SAN.x1,SAN.z1,LAWN,900,5);
for(const r of ROADS) PM.R(r.x0,r.z0,r.x1,r.z1,'#47484c');
for(let x=-214;x<520;x+=6) PM.R(x,69.8,x+3,70.2,'#d8d6cf'); for(let x=-640;x<520;x+=6) PM.R(x,191.8,x+3,192.2,'#d8d6cf');
/* 路面電車の線路（南堀端） */ for(const z of [187.4,188.8,195,196.4]) PM.R(-640,z,520,z+.18,'#9a9ca0');
/* 大街道（アーケードの商店街）とロープウェイ街の石畳 */ PM.R(200,-200,212,420,'#b4aa94'); PM.joints(200,-200,212,420,1.2); PM.R(140,18,520,28,'#a99f8a'); PM.joints(140,18,520,28,1.4);
PM.R(-200,30,140,60,'#6a7448'); PM.mot(-200,30,140,60,LAWN,300,4);
/* 江戸時代: 三之丸は重臣の屋敷地、城下は町人地、まわりは田畑 */
PE.R(-2000,-2000,2000,2000,'#887a5e'); PE.mot(DX0,DZ0,DX0+DW,DZ0+DW,['#857560','#93836a','#7f7259'],4200,5);
for(let x=-1000;x<1000;x+=18) for(let z=-1000;z<1000;z+=12){ if(x>-660&&x<480&&z>-340&&z<400) continue; PE.R(x,z,x+18,z+12,pick(['#7f8a4e','#8a9256','#758046','#929a5c'])); PE.R(x,z,x+18,z+.6,'#6a6440'); }
PE.R(SAN.x0,SAN.z0,SAN.x1,SAN.z1,'#9a8c70'); PE.mot(SAN.x0,SAN.z0,SAN.x1,SAN.z1,['#8f8268','#a2957a'],700,4);
for(const r of ROADS) PE.R(r.x0,r.z0,r.x1,r.z1,'#a39273');
for(const [P,c] of [[PM,WATERC],[PE,WATERC]]) for(const w of MOATR) P.R(w.x0,w.z0,w.x1,w.z1,c);
PE.R(INR.x0,INR.z0,INR.x1,INR.z1,'#7a7656'); PE.mot(INR.x0,INR.z0,INR.x1,INR.z1,['#837760','#76815a','#6c7a50'],1400,5); paintHill(PE,true);
PM.R(INR.x0,INR.z0,INR.x1,INR.z1,'#5c7140'); PM.mot(INR.x0,INR.z0,INR.x1,INR.z1,LAWN,1600,5); paintHill(PM,false);
/* 二之丸史跡庭園（現代）: 御殿の部屋割りを植え込みと水面であらわした庭 */ { const p=PL.ninomaru; PM.R(p.x0+4,p.z0+4,p.x1-4,p.z1-4,'#b8ab8c'); PM.joints(p.x0+4,p.z0+4,p.x1-4,p.z1-4,6); }
for(const b of BRIDGES){ PM.R(b.x0,b.z0,b.x1,b.z1,'#a69c86'); PE.R(b.x0,b.z0,b.x1,b.z1,'#a39273'); }

function mkGroundMat(tex,vc){ const m=std({map:tex,roughness:.97,vertexColors:!!vc});
  m.onBeforeCompile=s=>{ s.uniforms.tDetail={value:tDet};
    s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;').replace('#include <begin_vertex>','#include <begin_vertex>\nvWP=(modelMatrix*vec4(transformed,1.0)).xyz;');
    s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nuniform sampler2D tDetail;\nvarying vec3 vWP;')
      .replace('#include <map_fragment>','#include <map_fragment>\ndiffuseColor.rgb*=(0.8+0.4*texture2D(tDetail,vWP.xz*0.45).r)*(0.88+0.24*texture2D(tDetail,vWP.xz*0.027).g);'); }; return m; }
const tGround=toTex(gc,true,false); tGround.wrapS=tGround.wrapT=THREE.ClampToEdgeWrapping;
const tGroundE=toTex(gcE,true,false); tGroundE.wrapS=tGroundE.wrapT=THREE.ClampToEdgeWrapping;
const groundMat=mkGroundMat(tGround), groundMatE=mkGroundMat(tGroundE); groundMat.color.setScalar(.9); groundMatE.color.setScalar(.74);
function rectPath(x0,z0,x1,z1,P){ const p=P||new THREE.Path(); p.moveTo(x0,-z0); p.lineTo(x1,-z0); p.lineTo(x1,-z1); p.lineTo(x0,-z1); p.closePath(); return p; }
function groundGeo(shape){ const g=new THREE.ShapeGeometry(shape,1); g.rotateX(-Math.PI/2); const p=g.attributes.position,u=g.attributes.uv;
  for(let i=0;i<p.count;i++) u.setXY(i,(p.getX(i)-DX0)/DW,1-(p.getZ(i)-DZ0)/DW); return g; }
const rectShape=r=>rectPath(r.x0,r.z0,r.x1,r.z1,new THREE.Shape());
const R4=(x0,z0,x1,z1)=>({x0,z0,x1,z1});
/* 長方形から長方形を切り抜く（平らな地面から勝山と堀をのぞく） */
function subRects(list,cut){ const out=[]; for(const s of list){ if(!(cut.x1>s.x0&&cut.x0<s.x1&&cut.z1>s.z0&&cut.z0<s.z1)){ out.push(s); continue; }
    if(cut.z0>s.z0) out.push(R4(s.x0,s.z0,s.x1,cut.z0)); if(cut.z1<s.z1) out.push(R4(s.x0,cut.z1,s.x1,s.z1));
    const z0=Math.max(s.z0,cut.z0),z1=Math.min(s.z1,cut.z1); if(cut.x0>s.x0) out.push(R4(s.x0,z0,cut.x0,z1)); if(cut.x1<s.x1) out.push(R4(cut.x1,z0,s.x1,z1)); } return out; }
{ let pieces=[R4(-6000,-6000,6000,6000)]; for(const c of [INR,...MOATR]) pieces=subRects(pieces,c);
  for(const [mat,par] of [[groundMat,GM],[groundMatE,GE]]) for(const r of pieces) par.add(mesh(groundGeo(rectShape(r)),mat,false,true)); }
/* 勝山: 2m格子の高さのある地面。曲輪・石段・林の斜面 */
const HILLGEO=(()=>{ const ST=2,NX=Math.round((INR.x1-INR.x0)/ST)+1,NZ=Math.round((INR.z1-INR.z0)/ST)+1,pos=new Float32Array(NX*NZ*3),uv=new Float32Array(NX*NZ*2),idx=[];
  for(let j=0;j<NZ;j++) for(let i=0;i<NX;i++){ const x=INR.x0+i*ST,z=INR.z0+j*ST,k=j*NX+i; pos[k*3]=x; pos[k*3+1]=meshH(x,z); pos[k*3+2]=z; uv[k*2]=(x-DX0)/DW; uv[k*2+1]=1-(z-DZ0)/DW; }
  for(let j=0;j<NZ-1;j++) for(let i=0;i<NX-1;i++){ const a=j*NX+i,b=a+1,d=a+NX,e=d+1; idx.push(a,d,b,b,d,e); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(pos,3)); g.setAttribute('uv',new THREE.BufferAttribute(uv,2)); g.setIndex(idx); g.computeVertexNormals(); return g; })();
GM.add(mesh(HILLGEO,groundMat,false,true)); GE.add(mesh(HILLGEO,groundMatE,false,true));
/* 石垣の上のふち（天端）: 地形メッシュの段差を上からふさぐ平らな帯 */
for(const p of PLAT){ if(!p.walls) continue; const w=2.2,R=[{x0:p.x0,x1:p.x1,z0:p.z0,z1:p.z0+w},{x0:p.x1-w,x1:p.x1,z0:p.z0,z1:p.z1},{x0:p.x0,x1:p.x1,z0:p.z1-w,z1:p.z1},{x0:p.x0,x1:p.x0+w,z0:p.z0,z1:p.z1}];
  R.forEach((r,k)=>{ if(!p.walls[k]) return; let parts=[r]; for(const q of RAMPS) parts=subRects(parts,q);
    for(const s of parts) for(const [mat,par] of [[groundMat,GM],[groundMatE,GE]]){ const m=mesh(groundGeo(rectShape(s)),mat,false,true); m.position.y=p.H+.02; par.add(m); } }); }

/* 水辺の石垣 */
const wallN=M.stone.clone(); wallN.side=THREE.DoubleSide;
function moatWallGeo(r,out,yTop,yBot,bat,tile){ const N=12,pos=[],uv=[],idx=[],sg=out?1:-1;
  const corners=o=>[[r.x0-sg*o,r.z0-sg*o],[r.x1+sg*o,r.z0-sg*o],[r.x1+sg*o,r.z1+sg*o],[r.x0-sg*o,r.z1+sg*o]];
  for(let k=0;k<4;k++){ const base=pos.length/3;
    for(let i=0;i<=N;i++){ const t=i/N,o=bat*Math.pow(t,1.5),y=yTop+(yBot-yTop)*t,c=corners(o),A=c[k],Bc=c[(k+1)%4],L=Math.hypot(Bc[0]-A[0],Bc[1]-A[1]);
      pos.push(A[0],y,A[1],Bc[0],y,Bc[1]); uv.push(0,(yTop-y)/tile*1.0,L/tile,(yTop-y)/tile); }
    for(let i=0;i<N;i++){ const a=base+i*2,b=a+1,c=a+2,d=a+3; idx.push(a,c,b,b,c,d); } }
  return geoFrom(pos,uv,idx); }
/* 三之丸の堀の石垣: コの字の堀の内と外の岸。堀どうしがつながる所には壁を立てない */
{ const yB=WATER_Y-2.4;
  const seg=(ax,az,bx,bz)=>{ const L=Math.hypot(bx-ax,bz-az),g=scaleUV(new THREE.PlaneGeometry(L,-yB),L/4.5,-yB/4.5).translate(0,yB/2,0); g.rotateY(-Math.atan2(bz-az,bx-ax)); g.translate((ax+bx)/2,0,(az+bz)/2); scene.add(mesh(g,wallN,false,true)); };
  seg(-480,-244,-480,182); seg(-480,-244,-214,-244); seg(-480,182,-214,182); seg(-214,-244,-214,-214); seg(-214,152,-214,182);
  seg(-450,-214,-450,152); seg(-450,-214,-214,-214); seg(-450,152,-214,152);
  for(const r of MOATR){ const fl=mesh(new THREE.PlaneGeometry(r.x1-r.x0,r.z1-r.z0),M.dote,false,true); fl.rotation.x=-Math.PI/2; fl.position.set((r.x0+r.x1)/2,WATER_Y-1.2,(r.z0+r.z1)/2); scene.add(fl); } }
