/* T: {cx,cz,g0,bw,bd,bh,bat,ext(levels),floors:[{lv,h,...}],mat:{wall,floor,ceil,stone,rail}}
   es: 入口の向き（+1: 東、−1: 西）。松山城は大天守の西の内庭から入る */
function planTenshu(T){ const {cx,cz,g0,bh}=T,es=T.es||1; const yB=g0+bh; const FL=[],ST=[];
  /* 外観の各層の高さを先に計算 */
  let y=yB; const lv=T.ext; lv.forEach((L,i)=>{ L.Y=y; const nx=lv[i+1]; if(nx){ const a0=L.w/2+T.oh,b0=L.d/2+T.oh,a1=nx.w/2+(nx.bal||0),b1=nx.d/2+(nx.bal||0),rise=Math.max(a0-a1,b0-b1)*(L.slope||.55); y+=L.h+(nx.bal?rise-.1:0); } else y+=L.h; });
  const X=cx+es*(T.bw/2+T.bat), zc=cz+T.entZ; T.entry={X,z0:zc-.75,z1:zc+.75,zc,es};
  const xa=cx+es*.2; FL.push(Object.assign({y:g0,h:2.8,rects:[{x0:Math.min(xa,X),x1:Math.max(xa,X),z0:zc-.9,z1:zc+.9}],pillars:[]},T.f0));
  /* 各階: 層の中を等分 */
  const byLv={}; T.floors.forEach(f=>{ (byLv[f.lv]=byLv[f.lv]||[]).push(f); });
  T.floors.forEach(f=>{ const L=lv[f.lv],arr=byLv[f.lv],k=arr.indexOf(f),nx=lv[f.lv+1]; const top=nx?nx.Y:L.Y+L.h; const hh=(top-L.Y)/arr.length;
    FL.push(Object.assign(f,{y:L.Y+k*hh,h:hh,w:L.w,d:L.d,bal:L.bal||0,open:!!L.open,pillars:[]})); });
  /* 階段: 天守台の中（穴蔵）から1階へ */
  const L0=bh*1.35,s0a=cx+es*.2,s0b=cx+es*2.2; ST.push({x0:Math.min(s0a,s0b),x1:Math.max(s0a,s0b),z0:zc-.6-L0,z1:zc-.6,from:zc-.6,to:zc-.6-L0});
  for(let i=1;i<FL.length-1;i++){ const U=FL[i+1],sg=(T.stairSide&&T.stairSide[i])||(i%2?1:-1),up=i%2?-1:1,a2=U.w/2-.9,hb=U.d/2-.9,sw=Math.min(2,a2-.6);
    const rise=U.y-FL[i].y,L=Math.max(1.8,Math.min(rise*1.3,2*hb-1.4)); const x1=sg>0?cx+a2-.15:cx-a2+.15+sw,x0=x1-sw,zs=cz-up*L/2,ze=cz+up*L/2;
    ST.push({x0,x1,z0:Math.min(zs,ze),z1:Math.max(zs,ze),from:zs,to:ze}); }
  ST.forEach((s,i)=>s.rise=FL[i+1].y-FL[i].y);
  T.FL=FL; T.ST=ST; return T; }
function buildTenshuInterior(T){ const {cx,cz,FL,ST}=T,MT=T.mat,es=T.es||1,mx=v=>cx+es*(v-cx);
  /* 吹き抜けを収める範囲（各階の歩ける範囲と同じ: 外壁から0.9m内側） */ const WB=F=>F&&{rects:[{x0:cx-F.w/2+.9,x1:cx+F.w/2-.9,z0:cz-F.d/2+.9,z1:cz+F.d/2-.9}]};
  FL.forEach((F,i)=>{ if(i===0) return; const fp={x0:cx-F.w/2,x1:cx+F.w/2,z0:cz-F.d/2,z1:cz+F.d/2};
    F.rects=[{x0:fp.x0+.9,x1:fp.x1-.9,z0:fp.z0+.9,z1:fp.z1-.9}];
    slab(B[F.floorMat||MT.floor],fp,clipR(fp,i>1?wellR(ST[i-1],WB(F)):ST[i-1]),F.y,.25);
    const last=i===FL.length-1; slab(B[F.ceilMat||MT.ceil],fp,last?null:clipR(fp,wellR(ST[i],WB(FL[i+1]))),F.y+F.h-(last?0:.25),.2);
    if(ST[i-1]&&i>1) stairWell(F,ST[i-1],'darkwood',WB(F));
    /* 入側の天井: 外壁の上端より上は屋根の内側になるので、外壁の上端の高さに板天井を張り、上の重の壁まで小壁でふさぐ（中から屋根瓦が見えないように） */
    if(!last){ const L=T.ext[F.lv],U=T.ext[F.lv+1],yT=L.Y+L.h-.02,yC=F.y+F.h-.25;
      if(L&&U&&yC>yT+.05){ const a=L.w/2-.3,b=L.d/2-.3,ua=Math.min(a-.2,U.w/2+.1),ub=Math.min(b-.2,U.d/2+.1);
        for(const r of [{x0:cx-a,x1:cx+a,z0:cz-b,z1:cz-ub},{x0:cx-a,x1:cx+a,z0:cz+ub,z1:cz+b},{x0:cx-a,x1:cx-ua,z0:cz-ub,z1:cz+ub},{x0:cx+ua,x1:cx+a,z0:cz-ub,z1:cz+ub}]) slab(B.darkwood,r,null,yT,.06);
        const hh=yC-yT; for(const [Lx,x,z,ry] of [[2*ua,cx,cz-ub,0],[2*ua,cx,cz+ub,0],[2*ub,cx-ua,cz,Math.PI/2],[2*ub,cx+ua,cz,Math.PI/2]]) B.darkwood.add(new THREE.BoxGeometry(Lx,hh,.08),TM(x,yT+hh/2,z,ry)); } }
    const H=F.h-.25,a=F.w/2-.3,b=F.d/2-.3;
    if(!F.noWall){ for(const [L,x,z,ry] of [[2*a,cx,cz-b,0],[2*a,cx,cz+b,0],[2*b,cx-a,cz,Math.PI/2],[2*b,cx+a,cz,Math.PI/2]]) B[F.wallMat||MT.wall].add(inWallGeo(L,H),TM(x,F.y+H/2,z,ry)); }
    if(!F.noPillars&&F.w>7.5){ const pa=F.w/2-2.8,pb=F.d/2-2.8,nx=Math.max(2,Math.round(2*pa/3.2)),nz=Math.max(2,Math.round(2*pb/3.2)),pts=[];
      for(let k=0;k<=nx;k++){ const x=cx-pa+k*2*pa/nx; pts.push([x,cz-pb],[x,cz+pb]); } for(let k=1;k<nz;k++){ const z=cz-pb+k*2*pb/nz; pts.push([cx-pa,z],[cx+pa,z]); }
      for(const [x,z] of pts){ if([ST[i],ST[i-1]].some(s=>s&&inR(s,x,z,.8))) continue; B[MT.post].add(new THREE.BoxGeometry(.42,H,.42),TM(x,F.y+H/2,z)); F.pillars.push([x,z]); } }
    B.lampIn.add(new THREE.BoxGeometry(.3,.42,.3),TM(cx-a+.3,F.y+2.1,cz)); B.lampIn.add(new THREE.BoxGeometry(.3,.42,.3),TM(cx+a-.3,F.y+2.1,cz));
    if(F.deco) F.deco(F,{cx,cz,a,b}); });
  ST.forEach((s,i)=>{ const y0=FL[i].y,n=Math.max(6,Math.round(s.rise/.24)),run=s.to-s.from,w=s.x1-s.x0,x=(s.x0+s.x1)/2,st=Math.abs(run)/n,sg=Math.sign(run);
    for(let k=0;k<n;k++){ const zc=s.from+(k+.5)/n*run,yt=y0+(k+1)/n*s.rise; B.darkwood.add(new THREE.BoxGeometry(w-.12,.08,st+.05),TM(x,yt-.04,zc)); B.darkwood.add(new THREE.BoxGeometry(w-.16,s.rise/n,.04),TM(x,yt-s.rise/n/2,zc-sg*st/2)); }
    const L=Math.hypot(run,s.rise),ang=-Math.atan2(s.rise,run),mz=(s.from+s.to)/2;
    for(const xx of [s.x0+.06,s.x1-.06]){ B.darkwood.add(new THREE.BoxGeometry(.1,.32,L),TM(xx,y0+s.rise/2-.1,mz,0,1,1,1,ang)); B.darkwood.add(new THREE.BoxGeometry(.06,.06,L),TM(xx,y0+s.rise/2+.85,mz,0,1,1,1,ang)); } });
  /* 天守台の中の通路（穴蔵）: 入口は黒い板でふさがず、奥の通路が見えるようにする（お城さんぽ共通仕様） */
  const E=T.entry,g0=T.g0,bh=T.bh,zc=E.zc,s0=ST[0],bt=B[MT.stone];
  const bxm=(b2,xa,xb,ya,yb,za,zb)=>{ const p=mx(xa),q=mx(xb); box(b2,Math.min(p,q),Math.max(p,q),ya,yb,za,zb); }, Xr=cx+es*(E.X-cx)*es; /* Xr: 東向きに直した入口の座標 */
  const XE=cx+Math.abs(E.X-cx),tH=Math.min(3,bh);
  bxm(bt,cx-.1,XE,g0,g0+tH,zc+.9,zc+1.2); bxm(bt,cx+2.5,XE,g0,g0+tH,zc-1.2,zc-.9);
  bxm(bt,cx-.1,cx+.2,g0,g0+bh,s0.z0-.3,zc+1.2); bxm(bt,cx+2.2,cx+2.5,g0,g0+bh,s0.z0-.3,zc-.9); bxm(bt,cx-.1,cx+2.5,g0,g0+bh,s0.z0-.3,s0.z0);
  bxm(B.darkwood,cx+.2,XE,g0+Math.min(2.8,bh-.22),g0+Math.min(3,bh-.02),zc-.9,zc+.9); bxm(bt,cx+.2,XE,g0,g0+.06,zc-.9,zc+.9);
  B.lampIn.add(new THREE.BoxGeometry(.2,.3,.3),TM(mx(cx+.35),g0+Math.min(2,bh-.5),zc+.3)); B.lampIn.add(new THREE.BoxGeometry(.3,.4,.2),TM(mx(XE-2),g0+2,zc+1.05));
  for(const z of [zc-1.1,zc+1.1]) B[MT.post].add(new THREE.BoxGeometry(.3,3,.3),TM(mx(XE+.15),g0+1.5,z));
  B[MT.post].add(new THREE.BoxGeometry(.34,.34,2.9),TM(mx(XE+.15),g0+2.9,zc)); B[MT.eaveRoof].add(gableRoofGeo(3.4,1.8,.7,.3,.2),TM(mx(XE+.3),g0+3.05,zc,Math.PI/2));
  const sg=new THREE.Mesh(new THREE.PlaneGeometry(.42,1.7),T.sign); sg.position.set(mx(XE+.12),g0+1.6,zc+1.9); sg.rotation.y=es*Math.PI/2; T.par.add(sg); }
