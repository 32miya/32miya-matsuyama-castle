/* ================= 松山城の天守（連立式）=================
   本壇（ほんだん）の東に大天守、西に内庭（うちにわ）。内庭を小天守・南隅櫓・北隅櫓と、それらをつなぐ多聞櫓・十間廊下・玄関多聞櫓・筋鉄門の櫓が囲む。
   現代: 三重三階・地下一階の層塔型（1854年・嘉永7/安政元年の再建、現存12天守のひとつ）
   寛永のころ: 加藤嘉明が築き、蒲生忠知が完成させた天守は「五重だった」と伝わる（松平定行が1642年・寛永19年に三重に改めたという。確かな図は残っていない仮説） */
const TEN={};
const MS={cx:6,cz:-196,g0:58,bw:16,bd:14,bh:3.4,bat:.5,oh:1.5};
const RING_Y=MS.g0+MS.bh;   /* 渡櫓・小天守・隅櫓の床（大天守1階と同じ高さ） */
const MS_EXT={modern:()=>[{w:14,d:12,h:5,slope:.5},{w:11.2,d:9.4,h:4.5,slope:.52},{w:8.6,d:7,h:4.3}],
  edo:()=>[{w:14,d:12,h:4.5,slope:.5},{w:12.2,d:10.2,h:3.9,slope:.5},{w:10.4,d:8.4,h:3.7,slope:.5},{w:8.6,d:6.8,h:3.5,slope:.52},{w:7.2,d:5.6,h:3.5}]};
const TFLOORS={modern:[
  {lv:0,name:'大天守 1階',kana:'だいてんしゅ いっかい',text:'松山城の大天守は三重三階・地下一階の層塔型。1784年（天明4年）元日の落雷で焼け、35年がかりで1854年（嘉永7年／安政元年）に再建されました。現存12天守のなかでいちばん新しい天守です。西の玄関多聞櫓、南の筋鉄門の櫓へと戸口がつながり、内庭を囲む建物をぐるりと歩いてめぐれます。',meta:[['構造','三重三階・地下一階・層塔型'],['再建','1854年（嘉永7年／安政元年）'],['この階から','西: 玄関多聞櫓 ／ 南: 筋鉄門の櫓']]},
  {lv:1,name:'大天守 2階',kana:'だいてんしゅ にかい',text:'柱と梁が太い木組みのまま見える階。窓の格子越しに、本丸の櫓と城下の松山の町が見下ろせます。いまは松山城と城主の歴史を伝える展示の階です。',meta:[['展示','城主と松山城の歴史'],['眺め','本丸・松山の町']]},
  {lv:2,noPillars:true,name:'大天守 3階（最上階）',kana:'だいてんしゅ さんがい',text:'最上階。四方の窓から松山平野と、西に瀬戸内海（伊予灘）、東に石鎚山系の山なみが見渡せます。天井を張った書院風の造りで、城主が登って眺めることを考えた階です。',meta:[['眺め','松山平野・瀬戸内海・石鎚の山々'],['つくり','竿縁天井']]}],
 edo:[
  {lv:0,name:'天守 1階',kana:'てんしゅ いっかい',text:'寛永のころの天守（想像復元）。加藤嘉明が慶長7年（1602年）に築きはじめ、寛永4年（1627年）に蒲生忠知が城を完成させました。籠城に備えて武具と兵糧が納められ、番士が詰めています。渡櫓で小天守・隅櫓とつながる連立式の構えは、このころからのものと考えられています。',meta:[['城主','蒲生忠知 → 松平定行（1635年〜）'],['構え','連立式（大天守・小天守・隅櫓を渡櫓でつなぐ）'],['注意','五重の姿は伝承をもとにした仮説']]},
  {lv:1,name:'天守 2階',kana:'てんしゅ にかい',text:'武具の倉の階。槍・弓・鉄砲が掛けられ、長持には火薬や弾が収められていたと考えられます。窓の下には石落としがあり、石垣をよじ登る敵を真上から狙いました。',meta:[['納めたもの','槍・弓・鉄砲・長持（想像）']]},
  {lv:2,name:'天守 3階',kana:'てんしゅ さんがい',text:'三重目。ここまでは今の三重の天守と同じくらいの高さです。この上にさらに二つの重が積み重なっていた、というのが「五重の天守」の言い伝えです。',meta:[['伝承','もとは五重天守'],['根拠','『松山叢談』などの記録（後世の編さん）']]},
  {lv:3,noPillars:true,name:'天守 4階',kana:'てんしゅ よんかい',text:'四重目。階段はさらに急になり、窓からは三之丸の堀と城下の町割りがよく見えます。',meta:[['眺め','三之丸（堀之内）・城下町']]},
  {lv:4,noPillars:true,name:'天守 5階（最上階）',kana:'てんしゅ ごかい',text:'五重天守の最上階（仮説による再現）。寛永19年（1642年）、3代目の城主・松平定行が天守を三重に改めたと伝わります。幕府への遠慮とも、地盤の弱さのためともいわれますが、本当の理由も、五重だったかどうかも、確かな史料はありません。',meta:[['改築','寛永19年（1642年）三重に（伝）'],['史料','五重の確かな図は残っていない']]}]};
const TF0={modern:{name:'天守入口（地階）',kana:'てんしゅ いりぐち',text:'内庭から天守台の中の地階（穴蔵）に入り、階段を上ると大天守の1階です。天守台の石垣は、角を加工した石をすき間なく積んだ打込接（うちこみはぎ）と切込接（きりこみはぎ）。',meta:[['この先','大天守 1階'],['見どころ','地階（穴蔵）']]},
  edo:{name:'天守入口（地階）',kana:'てんしゅ いりぐち',text:'天守台の中の地階。ふだんは塩や水などの籠城の備えを納めた蔵でした。番士が出入りを改めます。',meta:[['この先','天守 1階']]}};
/* 大天守1階から渡櫓への戸口（西: 玄関多聞櫓、南: 筋鉄門の櫓） */
const MS_DOORS=[{side:'w',c0:-200.9,c1:-199.1},{side:'s',c0:2.8,c1:7.2}];
for(const era of ['modern','edo']){ const T=TEN[era]=planTenshu({par:era==='modern'?GM:GE,cx:MS.cx,cz:MS.cz,g0:MS.g0,bw:MS.bw,bd:MS.bd,bh:MS.bh,bat:MS.bat,oh:MS.oh,es:-1,entZ:2,ext:MS_EXT[era](),floors:TFLOORS[era].map(f=>Object.assign({},f)),f0:Object.assign({},TF0[era]),
    mat:{wall:'inWall',floor:'tenF',ceil:'darkwood',stone:'plank',rail:'darkwood',post:'darkwood',eaveRoof:'roof'},sign:signTex('天守入口')}); T.doors1=MS_DOORS; }
/* 上の階の床は、下の屋根が壁に取りつく高さまで上げる（窓が目の高さに来るように） */
for(const era of ['modern','edo']){ const T=TEN[era],F=T.FL,L=T.ext;
  for(let i=2;i<F.length;i++){ const A=L[i-2],U=L[i-1],sh=Math.max(A.w/2+MS.oh-U.w/2,A.d/2+MS.oh-U.d/2)*A.slope-.35; F[i-1].h+=sh; F[i].y+=sh; F[i].h-=sh; }
  T.ST.forEach((s,i)=>s.rise=T.FL[i+1].y-T.FL[i].y); F.forEach((f,i)=>{ if(i) f.noWall=true; }); }
/* 天守の外壁: 白漆喰に黒い下見板の腰。各階の連子窓は本当に開いていて、格子越しに外が見える（お城さんぽ共通仕様） */
function msSide(par,s,Lv,cx,cz,y,H,o){ const a=Lv.w/2,b=Lv.d/2,len=(s==='s'||s==='n')?Lv.w:Lv.d-.62,ry={s:0,n:Math.PI,e:Math.PI/2,w:-Math.PI/2}[s],px=s==='e'?cx+a:s==='w'?cx-a:cx,pz=s==='s'?cz+b:s==='n'?cz-b:cz;
  const toL=wc=>s==='s'?wc-cx:s==='n'?-(wc-cx):s==='e'?-(wc-cz):(wc-cz);
  const holes=[],dz=[]; for(const d of (o.doors||[])) if(d.side===s){ const p=toL(d.c0),q=toL(d.c1),lo=Math.min(p,q),hi=Math.max(p,q); holes.push([(lo+hi)/2,.02,hi-lo,o.doorH||2.3]); dz.push([lo,hi]); }
  const n=Math.max(2,Math.round(len/(o.step||2.5))),wins=[]; for(let k=0;k<n;k++){ const x=-len/2+len*(k+.5)/n; if(dz.some(([lo,hi])=>x>lo-o.ww/2-.35&&x<hi+o.ww/2+.35)) continue; if(o.skipMid&&Math.abs(x)<o.skipMid) continue; wins.push(x); }
  const G=hkSide(par,px,y,pz,len,H,ry,o.noWin?[]:wins,'rect',{sill:o.sill,ww:o.ww,wh:o.wh,holes,inner:true});
  /* 腰の下見板（戸口を避ける） */ if(o.band){ const hb=Math.min(o.band,o.sill-.12); let segs=[[-len/2,len/2]]; for(const [lo,hi] of dz) segs=segs.flatMap(([p,q])=>[[p,Math.min(q,lo-.05)],[Math.max(p,hi+.05),q]]).filter(([p,q])=>q-p>.1);
    for(const [p,q] of segs){ const m=mesh(boxUVGeo(q-p,hb,.06,2.4,1.2),M.itaK,true,true); m.position.set((p+q)/2,hb/2,.04); G.add(m); } }
  /* 戸口の枠 */ for(const [lo,hi] of dz){ for(const x of [lo-.08,hi+.08]){ const m=mesh(new THREE.BoxGeometry(.16,(o.doorH||2.3)+.1,.36),M.darkwood,false,false); m.position.set(x,(o.doorH||2.3)/2,-.15); G.add(m); } const t=mesh(new THREE.BoxGeometry(hi-lo+.32,.16,.36),M.darkwood,false,false); t.position.set((lo+hi)/2,(o.doorH||2.3)+.08,-.15); G.add(t); }
  return {G,wins,len,toL}; }
function msTenshuWalls(T,par){ const cx=T.cx,cz=T.cz; T.WIN=[];
  T.ext.forEach((Lv,i)=>{ const F=T.FL[i+1],sill=(F.y-Lv.Y)+.82,wh=Math.min(1.1,Lv.h-sill-.42),ww=i===0?1.15:1.0;
    const S={sill,ww,wh,band:i<2?Math.min(1.2,sill-.12):0,step:i===0?2.6:2.4,doors:i===0?T.doors1:null}; T.WIN[i]=S; S.side={};
    for(const s of ['s','n','e','w']) S.side[s]=msSide(par,s,Lv,cx,cz,Lv.Y,Lv.h,S);
    /* 壁の下端の黒い長押 */ const a=Lv.w/2,b=Lv.d/2; for(const [len,x,z,ry] of [[Lv.w+.1,cx,cz+b,0],[Lv.w+.1,cx,cz-b,0],[Lv.d+.1,cx+a,cz,Math.PI/2],[Lv.d+.1,cx-a,cz,Math.PI/2]]){ const m=mesh(new THREE.BoxGeometry(len,.16,.1),M.darkwood,false,false); m.position.set(x,Lv.Y+.08,z); m.rotation.y=ry; par.add(m); } });
  /* 1重目の石落とし（四隅の張り出し） */ { const Lv=T.ext[0],a=Lv.w/2,b=Lv.d/2; for(const sx of [-1,1]) for(const sz of [-1,1]){ const m=mesh(new THREE.BoxGeometry(1.4,1.1,.55),M.hkPl,true,true); m.position.set(cx+sx*(a-1.1),Lv.Y+Lv.h-1.5,cz+sz*(b+.27)); par.add(m); const r=mesh(new THREE.BoxGeometry(1.55,.12,.7),M.ridge,false,false); r.position.set(cx+sx*(a-1.1),Lv.Y+Lv.h-.9,cz+sz*(b+.3)); par.add(r); } } }
/* 天守の中: 窓の間の柱・長押・鉄砲狭間・入側の鴨居・梁 */
function msInterior(T){ const cx=T.cx,cz=T.cz;
  for(let i=1;i<T.FL.length;i++){ const F=T.FL[i],Lv=T.ext[i-1],S=T.WIN[i-1],H=F.h-.25,inset=.42;
    for(const s of ['s','n','e','w']){ const SD=S.side[s],len=SD.len,ws=SD.wins.slice().sort((p,q)=>p-q),ps=[-len/2+.45,len/2-.45]; for(let k=0;k<ws.length-1;k++) ps.push((ws[k]+ws[k+1])/2);
      const P=(lx,d)=>{ /* 壁の内側の点 */ const a=Lv.w/2-d,b=Lv.d/2-d; return s==='s'?[cx+lx,cz+b]:s==='n'?[cx-lx,cz-b]:s==='e'?[cx+a,cz-lx]:[cx-a,cz+lx]; };
      const dz=(T.doors1&&i===1)?T.doors1.filter(d=>d.side===s).map(d=>{ const p=SD.toL(d.c0),q=SD.toL(d.c1); return [Math.min(p,q),Math.max(p,q)]; }):[];
      for(const p of ps){ if(dz.some(([lo,hi])=>p>lo-.4&&p<hi+.4)) continue; const [x,z]=P(p,inset); B.darkwood.add(new THREE.BoxGeometry(.24,H,.24),TM(x,F.y+H/2,z)); }
      const ax=(s==='s'||s==='n'); const L2=len-.7; const [mx2,mz2]=P(0,inset+.02);
      for(const yy of [Lv.Y+S.sill-.14,Lv.Y+S.sill+S.wh+.16]){ if(yy<F.y+.3) continue; let segs=[[-L2/2,L2/2]]; if(yy<F.y+2.45) for(const [lo,hi] of dz) segs=segs.flatMap(([p,q])=>[[p,Math.min(q,lo-.1)],[Math.max(p,hi+.1),q]]).filter(([p,q])=>q-p>.2);
        for(const [p,q] of segs){ const [x,z]=P((p+q)/2,inset+.02); B.darkwood.add(new THREE.BoxGeometry(ax?q-p:.1,.13,ax?.1:q-p),TM(x,yy,z)); } }
      /* 鉄砲狭間（1・2階）: 窓と窓の間の壁に内側へ開いた小さな四角い穴 */
      if(i<=2) for(let k=0;k<ws.length-1;k++){ const p=(ws[k]+ws[k+1])/2; if(dz.some(([lo,hi])=>p>lo-.6&&p<hi+.6)) continue; const [x,z]=P(p,inset+.08); B.darkwood.add(new THREE.BoxGeometry(ax?.4:.05,.4,ax?.05:.4),TM(x,F.y+.9,z)); B.black.add(new THREE.BoxGeometry(ax?.26:.06,.26,ax?.06:.26),TM(x,F.y+.9,z)); } }
    /* 入側と身舎を分ける鴨居（広い階だけ） */
    if(F.w>9){ const pa=F.w/2-2.8,pb=F.d/2-2.8,WS=[[T.ST[i],T.FL[i+1]],[T.ST[i-1],F]].filter(q=>q[0]).map(q=>i===1&&q[0]===T.ST[0]?q[0]:wellR(q[0],q[1]));
      for(const [L0,x0,z0,ry] of [[2*pa,cx,cz-pb,0],[2*pa,cx,cz+pb,0],[2*pb,cx-pa,cz,Math.PI/2],[2*pb,cx+pa,cz,Math.PI/2]]){ let segs=[[-L0/2,L0/2]];
        for(const w of WS){ const hit=ry?(x0>w.x0-.1&&x0<w.x1+.1):(z0>w.z0-.1&&z0<w.z1+.1); if(!hit) continue; const c0=(ry?w.z0-z0:w.x0-x0)-.1,c1=(ry?w.z1-z0:w.x1-x0)+.1; segs=segs.flatMap(([a,b])=>[[a,Math.min(b,c0)],[Math.max(a,c1),b]]).filter(([a,b])=>b-a>.2); }
        for(const [a,b] of segs){ const L=b-a,o=(a+b)/2,x=ry?x0:x0+o,z=ry?z0+o:z0; B.darkwood.add(new THREE.BoxGeometry(L,.2,.16),TM(x,F.y+2.05,z,ry)); B.darkwood.add(new THREE.BoxGeometry(L,.035,.14),TM(x,F.y+.02,z,ry)); } } }
    /* 天井下の太い梁（吹き抜けの上では切る） */ if(i<T.FL.length-1){ const w=wellR(T.ST[i],T.FL[i+1]); for(let k=-1;k<=1;k+=2){ const z=cz+k*F.d/4.2,x0=cx-(F.w-1)/2,x1=cx+(F.w-1)/2; const segs=(w&&z>w.z0-.3&&z<w.z1+.3)?[[x0,w.x0],[w.x1,x1]]:[[x0,x1]]; for(const [a,b] of segs) if(b-a>.3) bx(F,'darkwood',b-a,.36,.42,(a+b)/2,F.y+F.h-.48,z); } } } }
B=BS;
for(const era of ['modern','edo']){ const T=TEN[era],cx=T.cx,cz=T.cz,par=era==='modern'?GM:GE,yB=T.g0+T.bh;
  /* 天守台（打込接の石垣）。内庭の側に地階（穴蔵）への入口 */
  if(era==='modern'){ const base=mesh(frustumDoorGeo(T.bw,T.bd,T.bh+.02,T.bat,4.5,false,{z0:T.entZ-.9,z1:T.entZ+.9,y1:2.6}),wallN,false,true); base.position.set(cx,T.g0,cz); base.rotation.y=Math.PI; scene.add(base);
    for(const r of [{x0:-T.bw/2,x1:T.bw/2,z0:-T.bd/2,z1:-T.ext[0].d/2},{x0:-T.bw/2,x1:T.bw/2,z0:T.ext[0].d/2,z1:T.bd/2},{x0:-T.bw/2,x1:-T.ext[0].w/2,z0:-T.ext[0].d/2,z1:T.ext[0].d/2},{x0:T.ext[0].w/2,x1:T.bw/2,z0:-T.ext[0].d/2,z1:T.ext[0].d/2}]) box(BS.stoneK,cx+r.x0,cx+r.x1,yB-.3,yB,cz+r.z0,cz+r.z1);
    /* 当たり: 穴蔵の入口の前はあける */ const X0=cx-T.bw/2-T.bat,X1=cx+T.bw/2+T.bat,Z0=cz-T.bd/2-T.bat,Z1=cz+T.bd/2+T.bat,zc=cz+T.entZ; block(X0,Z0,X1,zc-1,'castle'); block(X0,zc+1,X1,Z1,'castle'); block(X0+1.6,zc-1.2,X1,zc+1.2,'castle'); }
  const crest=era==='modern'?M.aoi:M.tachi;
  const mats={roof:M.roof,gable:M.plaster,gold:false,orn:true,oh:T.oh,crest,trim:M.plaster,shs:.85};
  const X=tenshuExt(par,cx,yB,cz,T.ext.map(e=>Object.assign({},e,{noWall:true})),mats); T.X=X; msTenshuWalls(T,par);
  const dorm=(lv,side,off,kind,W,H)=>{ const r=X.info[lv]; if(r.top) return; const mb=(r.b0+r.b1)/2+.4,ma=(r.a0+r.a1)/2+.4,yy=r.ey+r.rise*.28;
    const [x,z,ry]=side==='s'?[off,mb,0]:side==='n'?[off,-mb,Math.PI]:side==='e'?[ma,off,Math.PI/2]:[-ma,off,-Math.PI/2];
    if(kind==='c') chidori(X.g,x,yy,z,ry,W,H,mats); else karahafu(X.g,x,yy-.45,z,ry,W,mats); };
  if(era==='modern'){ /* 1重目: 南北に大きな千鳥破風、東西に千鳥破風。2重目: 南に向唐破風、北に千鳥破風 */
    dorm(0,'s',0,'c',4.6,2.4); dorm(0,'n',0,'c',4.6,2.4); dorm(0,'e',0,'c',3.6,1.9); dorm(0,'w',0,'c',3.6,1.9); dorm(1,'s',0,'k',3.4); dorm(1,'n',0,'c',3.2,1.7); dorm(1,'e',0,'c',3,1.6); }
  else { /* 五重（仮説）: 1重目に比翼の千鳥破風、2重目に唐破風、3重目に千鳥破風 */
    dorm(0,'s',-2.4,'c',3.4,1.9); dorm(0,'s',2.4,'c',3.4,1.9); dorm(0,'n',0,'c',4.4,2.2); dorm(0,'e',0,'c',3.4,1.8); dorm(0,'w',0,'c',3.4,1.8);
    dorm(1,'s',0,'k',3.4); dorm(1,'n',0,'k',3.2); dorm(2,'e',0,'c',3,1.6); dorm(2,'w',0,'c',3,1.6); dorm(3,'s',0,'c',2.8,1.5); }
  B=era==='modern'?BM:BE; buildTenshuInterior(T); B=BS; }
/* 天守の各階の内装 */
{ for(const era of ['modern','edo']){ const T=TEN[era],F=T.FL,cx=T.cx,cz=T.cz; B=era==='modern'?BM:BE;
    F.forEach((f,i)=>{ if(i) f.light=i===F.length-1?.78:.66; }); msInterior(T);
    /* 最上階: 竿縁天井 */ { const f=F[F.length-1],y=f.y+f.h-.22; for(let k=-4;k<=4;k++) bx(f,'darkwood',.07,.06,f.d-.7,cx+k*f.w/9.6,y,cz); bx(f,'darkwood',f.w-.6,.14,.14,cx,y-.02,cz-f.d/2+.45); bx(f,'darkwood',f.w-.6,.14,.14,cx,y-.02,cz+f.d/2-.45); }
    if(era==='modern'){ for(let i=1;i<=2;i++){ const f=F[i]; panel(f,cx+f.w/2-.5,cz+1.4,Math.PI/2,1.6,1.1); panel(f,cx-f.w/2+.5,cz-1.6,-Math.PI/2,1.6,1.1); }
      glassCase(F[1],cx+.6,cz+2.4,2.4,1.1,1.1,0,.8); glassCase(F[2],cx-1.6,cz+2.2,2.2,1,1.1,0,.8); armor(F[2],cx+3.2,cz+2.6,0,'#2a2f3a','#c79f45',true); }
    else { /* 槍掛け・弓・甲冑・長持 */ { const f=F[1]; for(let k=0;k<2;k++){ const x=cx+1.2+k*2.4,z=cz+f.d/2-.85; bx(f,'darkwood',1.6,.12,.25,x,f.y+2.4,z); bx(f,'darkwood',1.6,.12,.25,x,f.y+.5,z); coll(f,x-.9,x+.9,z-.35,z+.35); for(let j=0;j<4;j++){ B.darkwood.add(new THREE.CylinderGeometry(.03,.03,3.1,5),TM(x-.6+j*.4,f.y+1.6,z)); B.black.add(new THREE.ConeGeometry(.05,.28,4),TM(x-.6+j*.4,f.y+3.3,z)); } }
        armor(f,cx-4.4,cz+2.4,Math.PI/2,'#2a2f3a','#c79f45',true); }
      { const f=F[2]; bx(f,'darkwood',1.4,.7,.8,cx+3.6,f.y+.35,cz+3,0,null,true); bx(f,'darkwood',1.4,.7,.8,cx+1.2,f.y+.35,cz+3,0,null,true); armor(f,cx-4.4,cz+2.6,Math.PI/2,'#7a2d24','#c79f45',true); } } }
  B=BS; }
/* ---------- 天守とつながる建物（連立式）: 小天守・南隅櫓・北隅櫓・十間廊下・多聞櫓・玄関多聞櫓・筋鉄門の櫓 ----------
   大天守1階と同じ高さの床でつながり、内庭をぐるりと囲む。中を歩いて一周できる（お城さんぽ共通仕様） */
const RZ=[];   /* 区画（FL[1].zones に入れる） */
function ringBldg(o){ const {x0,x1,z0,z1}=o,y=RING_Y,h=o.h||3.5,cx=(x0+x1)/2,cz=(z0+z1)/2,w=x1-x0,d=z1-z0,g0=MS.g0;
  /* 石垣の台（門の通り道はあける） */ if(o.base!==false) for(const r of (o.baseRects||[{x0,x1,z0,z1}])){ box(BS.stone,r.x0,r.x1,g0-.4,y-.3,r.z0,r.z1); box(BS.stoneK,r.x0-.05,r.x1+.05,y-.3,y-.18,r.z0-.05,r.z1+.05); block(r.x0,r.z0,r.x1,r.z1,'castle'); }
  /* 床と天井（両方の時代で同じ建物） */ box(BS.tenF,x0+.12,x1-.12,y-.22,y,z0+.12,z1-.12); if(o.under) box(BS.darkwood,x0+.12,x1-.12,y-.42,y-.22,z0+.12,z1-.12); box(BS.darkwood,x0+.15,x1-.15,y+h-.2,y+h,z0+.15,z1-.15);
  const Lv={w,d},S={sill:.86,ww:.95,wh:1.0,band:.8,step:2.3,doors:o.doors||[],noWin:false},side={};
  for(const s of ['s','n','e','w']){ if((o.skip||[]).includes(s)) continue; const S2=Object.assign({},S,{noWin:(o.noWin||[]).includes(s)}); side[s]=msSide(scene,s,Lv,cx,cz,y,h,S2); }
  /* 柱と梁 */ for(const s of Object.keys(side)){ const SD=side[s],len=SD.len; for(let t=-len/2+.4;t<=len/2-.39;t+=Math.max(1.8,len/Math.max(1,Math.round(len/2)))){ if(SD.wins.some(wx=>Math.abs(wx-t)<.62)) continue; if((o.doors||[]).some(dd=>dd.side===s&&(()=>{ const p=SD.toL(dd.c0),q=SD.toL(dd.c1); return t>Math.min(p,q)-.3&&t<Math.max(p,q)+.3; })())) continue;
      const a=w/2-.4,b=d/2-.4,[x,z]=s==='s'?[cx+t,cz+b]:s==='n'?[cx-t,cz-b]:s==='e'?[cx+a,cz-t]:[cx-a,cz+t]; BS.darkwood.add(new THREE.BoxGeometry(.24,h,.24),TM(x,y+h/2,z)); } }
  if(w>d) for(let x=x0+2.2;x<x1-1;x+=2.6) BS.darkwood.add(new THREE.BoxGeometry(.24,.3,d-.5),TM(x,y+h-.36,cz)); else for(let z=z0+2.2;z<z1-1;z+=2.6) BS.darkwood.add(new THREE.BoxGeometry(w-.5,.3,.24),TM(cx,y+h-.36,z));
  BS.lampIn.add(new THREE.BoxGeometry(.26,.36,.26),TM(cx,y+h-.6,cz));
  /* 屋根 */ const mats={roof:M.roof,gable:M.plaster,gold:false,crest:o.crest||M.tachi,shs:.65,oh:1.1,orn:true,trim:M.plaster};
  if(o.second){ /* 二重: 下の重の屋根と、上の重の壁・入母屋屋根 */ const lv=[{w,d,h,slope:.5,noWall:true},{w:w-o.second,d:d-o.second,h:o.h2||3.2,noWall:true}],X=tenshuExt(scene,cx,y,cz,lv,mats);
    const L2={w:w-o.second,d:d-o.second},y2=y+h; for(const s of ['s','n','e','w']) msSide(scene,s,L2,cx,cz,y2,o.h2||3.2,{sill:.9,ww:.85,wh:.9,band:0,step:2.2});
    if(o.koran){ /* 2階の窓の飾りの高欄（格式を高めるための飾り） */ for(const s of o.koran){ const a=L2.w/2,b=L2.d/2,ry={s:0,n:Math.PI,e:Math.PI/2,w:-Math.PI/2}[s],len=(s==='s'||s==='n')?L2.w:L2.d,px=s==='e'?cx+a+.45:s==='w'?cx-a-.45:cx,pz=s==='s'?cz+b+.45:s==='n'?cz-b-.45:cz;
        msPlane(scene,'koran',px,y2+.05,pz,ry,.75,{w:len*.8}); } }
    if(o.chidori) for(const [lv2,s,W,H] of o.chidori){ const r=X.info[lv2],mb=(r.b0+r.b1)/2+.4,ma=(r.a0+r.a1)/2+.4,yy=r.ey+r.rise*.28,[x,z,ry]=s==='s'?[0,mb,0]:s==='n'?[0,-mb,Math.PI]:s==='e'?[ma,0,Math.PI/2]:[-ma,0,-Math.PI/2]; chidori(X.g,x,yy,z,ry,W,H,mats); } }
  else { const L=Math.max(w,d),D=Math.min(w,d),ry=w>=d?0:Math.PI/2,ex=o.roofExt||0; BS.roof.add(gableRoofGeo(L+ex,D,1.7,1.0,.4),TM(cx,y+h-.05,cz,ry)); BS.plaster.add(gableEndsGeo(L+ex,D,1.7),TM(cx,y+h-.05,cz,ry)); BS.ridge.add(new THREE.BoxGeometry(ry?.5:L+ex+1,.36,ry?L+ex+1:.5),TM(cx,y+h+1.7,cz)); }
  if(o.zone) RZ.push(Object.assign({rects:o.zone,y},o.info)); return side; }
B=BS; curSet=BSETS.shared;
const Z=(name,kana,text,meta)=>({name,kana,text,meta});
/* 玄関多聞櫓（内門の上）: 大天守1階の西の戸口から入る */
ringBldg({x0:-27,x1:-1,z0:-205,z1:-198,skip:['e'],doors:[{side:'w',c0:-203.9,c1:-201.9}],baseRects:[{x0:-27,x1:-16,z0:-205,z1:-198},{x0:-12,x1:-1,z0:-205,z1:-198}],under:true,
  zone:[{x0:-26.4,x1:-.6,z0:-204.4,z1:-198.6},{x0:-1.6,x1:.6,z0:-200.8,z1:-199.2}],info:Z('玄関多聞櫓・内門','げんかん たもんやぐら・うちもん','大天守の西に続く多聞櫓。その下をくぐる内門は、北の仕切門から内庭（天守広場）へ入る門です。仕切門と内門の間は小さな枡形になっていて、入りこんだ敵を大天守と渡櫓から撃ちすえました。',[['つながる建物','東: 大天守 ／ 西: 北隅櫓'],['下の門','内門（内庭への入口）']])});
/* 北隅櫓（二重）: 西の高石垣の上に立つ */
ringBldg({x0:-35,x1:-27,z0:-207,z1:-198,h:3.5,second:2.6,h2:2.8,doors:[{side:'e',c0:-203.9,c1:-201.9},{side:'s',c0:-32.2,c1:-29.8}],koran:['w','n'],chidori:[[0,'w',2.8,1.5]],
  zone:[{x0:-34.4,x1:-27.6,z0:-206.4,z1:-198.6},{x0:-28,x1:-26.2,z0:-203.9,z1:-201.9}],info:Z('北隅櫓（二重櫓）','きたすみやぐら','本壇の北西の隅に建つ二重櫓。「戌亥（いぬい）小天守」とも呼ばれ、天守に次ぐ格式の櫓です。2階の窓には格式を高めるための飾りの高欄が付きます。昭和8年（1933年）の放火で焼け、昭和43年（1968年）に木造で再建されました。',[['別名','戌亥小天守・小天守北ノ櫓'],['再建','1968年（昭和43年）'],['つながる建物','東: 玄関多聞櫓 ／ 南: 十間廊下']])});
/* 十間廊下: 北隅櫓と南隅櫓をつなぐ多聞櫓（桁行十間） */
ringBldg({x0:-34,x1:-28,z0:-198,z1:-178,skip:['n','s'],h:3.3,
  zone:[{x0:-33.4,x1:-28.6,z0:-199.2,z1:-176.8}],info:Z('十間廊下','じゅっけんろうか','北隅櫓と南隅櫓をつなぐ多聞櫓で、長さ（桁行）が十間あることからこの名があります。本壇の西の高石垣の上にあり、石垣を登ってくる敵に石を落とす石落としが付いています。',[['長さ','十間（約18m）'],['つながる建物','北: 北隅櫓 ／ 南: 南隅櫓'],['再建','1968年（昭和43年）']])});
/* 南隅櫓（二重） */
ringBldg({x0:-35,x1:-27,z0:-178,z1:-169,h:3.5,second:2.6,h2:2.8,doors:[{side:'n',c0:-32.2,c1:-29.8},{side:'e',c0:-173.6,c1:-171.6}],koran:['w','s'],chidori:[[0,'s',2.8,1.5]],
  zone:[{x0:-34.4,x1:-27.6,z0:-177.4,z1:-169.6},{x0:-28,x1:-26.2,z0:-173.6,z1:-171.6}],info:Z('南隅櫓（二重櫓）','みなみすみやぐら','本壇の南西の隅に建つ二重櫓。「申酉（さるとり）小天守」とも呼ばれます。北隅櫓と同じく2階の窓に飾りの高欄があり、西の高石垣の下から見上げると、石落としの張り出しがよく見えます。',[['別名','申酉小天守'],['再建','1968年（昭和43年）'],['つながる建物','北: 十間廊下 ／ 東: 多聞櫓']])});
/* 多聞櫓（南隅櫓と小天守の間） */
ringBldg({x0:-27,x1:-2,z0:-176,z1:-169.6,skip:['w','e'],h:3.3,
  zone:[{x0:-27.4,x1:-1.6,z0:-175.4,z1:-170.2}],info:Z('多聞櫓','たもんやぐら','南隅櫓と小天守をつなぐ長い一重の櫓。ふだんは武具や兵糧を納める倉で、いざというときは内庭と本壇の南を見張る守りの線になりました。',[['つながる建物','西: 南隅櫓 ／ 東: 小天守']])});
/* 小天守（二重） */
ringBldg({x0:-2,x1:8,z0:-178,z1:-169,h:3.6,second:2.6,h2:2.9,doors:[{side:'w',c0:-173.6,c1:-171.6},{side:'n',c0:2.8,c1:7.2}],chidori:[[0,'s',3.2,1.7],[0,'n',3,1.6]],crest:M.tachi,
  zone:[{x0:-1.4,x1:7.4,z0:-177.4,z1:-169.6},{x0:-2.4,x1:-.6,z0:-173.6,z1:-171.6}],info:Z('小天守（二重櫓）','こてんしゅ','大天守の南に建つ二重の小天守。大天守・南隅櫓・北隅櫓とを渡櫓でつないだ「連立式」は、姫路城・和歌山城と並ぶ代表例です。昭和8年の放火で焼け、昭和43年（1968年）に木造で再建されました。',[['構え','連立式天守'],['再建','1968年（昭和43年）'],['つながる建物','西: 多聞櫓 ／ 北: 筋鉄門の櫓']])});
/* 筋鉄門（すじがねもん）の櫓: 大天守と小天守をつなぐ櫓門。下を三ノ門からの道が通る */
ringBldg({x0:2,x1:8,z0:-190,z1:-178,skip:['n','s'],h:3.4,baseRects:[{x0:2,x1:8,z0:-190,z1:-186.6},{x0:2,x1:8,z0:-180.6,z1:-178}],under:true,
  zone:[{x0:2.6,x1:7.4,z0:-191.8,z1:-177.2}],info:Z('筋鉄門の櫓','すじがねもん','大天守と小天守をつなぐ櫓門の上の櫓。下の筋鉄門は、柱や扉を鉄の筋金で補強した東向きの門で、三ノ門を抜けてきた敵を正面から撃ち、内庭（天守広場）を守る大切な門でした。',[['下の門','筋鉄門（東向き）'],['つながる建物','北: 大天守 ／ 南: 小天守'],['再建','1968年（昭和43年）']])});
/* 筋鉄門の門扉（鉄の筋金を打った扉）と、内門の扉 */
for(const [x,z0,z1,ry] of [[8,-186.6,-180.6,Math.PI/2]]){ for(const s of [-1,1]){ const zz=(z0+z1)/2+s*1.5; BS.woodGrain.add(boxUVGeo(.16,2.8,2.6,1.2,2.8),TM(x-.4,MS.g0+1.4,zz)); for(const yy of [.5,1.2,1.9,2.6]) BS.black.add(new THREE.BoxGeometry(.2,.08,2.6),TM(x-.38,MS.g0+yy,zz)); }
  for(const zz of [z0+.2,z1-.2]) BS.darkwood.add(new THREE.BoxGeometry(.5,3,.5),TM(x-.3,MS.g0+1.5,zz)); }
for(const s of [-1,1]) BS.darkwood.add(new THREE.BoxGeometry(.5,3,.5),TM(-14+s*2.1,MS.g0+1.5,-205.3));
/* 内庭（天守広場）を囲む建物の下の当たり（筋鉄門と内門の通り道はあける） */
block(-38,-216,-35,-162,'castle'); block(-35,-169,-2,-162,'castle'); block(-2,-169,14,-162,'castle');
for(const era of ['modern','edo']){ const F=TEN[era].FL[1]; F.zones=RZ.map(z=>Object.assign({},z)); }
/* 大天守と渡櫓の戸口のまわりの柱 */
for(const era of ['modern','edo']){ const F=TEN[era].FL[1]; coll(F,-1.6,.6,-201.6,-201); coll(F,-1.6,.6,-199,-198.4); coll(F,2.2,2.8,-191.2,-189.6); coll(F,7.2,7.8,-191.2,-189.6); }
