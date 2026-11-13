const decoRoomT=new Crowd(GE,300,true),decoRoomM=new Crowd(GM,200,true);
/* 門番と見張り */
for(const [s,x,z,nm,say] of [
  ['t_yari',-66,-40.6,'大手門の番士','大手門である。ここより上は、道が折れ曲がるたびに上の櫓から見張られておるぞ。'],['ashigaru',-66,-31.4,'大手門の足軽','黒門口から登ってきたか。御城の正式な登り道はこちらじゃ。'],
  ['yari_a',-60.8,12,'揚木戸門の番士','揚木戸門。この先、太鼓櫓の下で道は折り返す。'],['ashigaru',-31.6,-12,'戸無門の足軽','この門にははじめから扉がない。入った敵を、正面の筒井門と上の櫓で討つためよ。'],
  ['t_yari',-41.6,-56.6,'筒井門の番士','筒井門じゃ。……東の石垣の陰？　あれは、そなたの知らぬほうがよい門よ。'],['y_hb',-22.5,-64.6,'隠門の番士','（小声で）敵が筒井門に群がったら、ここから一気に横を突くのじゃ。'],
  ['t_yari',-24,-69.4,'太鼓門の番士','太鼓門を抜ければ御本丸。櫓の太鼓が鳴れば、城下まで聞こえるぞ。'],['yari_a',11,-154.2,'一ノ門の番士','一ノ門。ここから先は本壇（天守曲輪）じゃ。'],
  ['ashigaru',16.6,-181,'三ノ門の番士','三ノ門の先が筋鉄門。くぐれば天守の内庭じゃ。'],['t_yari',11,-206.4,'仕切門の番士','仕切門と内門の間に入った者は、四方から撃たれる。'],
  ['ashigaru',-55.6,-232.6,'乾門の番士','乾門の外は古町へ下りる道じゃ。'],['yari_a',35.6,-232.6,'艮門の番士','艮門は鬼門の守り。いざとなれば、ここから兵を出す。'],
  ['ashigaru',-123.6,-39.6,'黒門の番士','黒門を抜けると、大手の登城道じゃ。'],['t_yari',-152,-18,'二之丸御殿の番士','殿の御殿じゃ。御用の向きを申されよ。']]) npc(s,[[x,z]],0,nm,say,{fixed:true});
/* 登城の侍・城内で働く人 */
for(const [s,a,b,sp,nm,say] of [
  ['samurai_a',[-115,-36],[-74,-36],.7,'登城する藩士','黒門口から御本丸まで、ひと汗かくのう。'],['samurai_b',[-63,-22],[-63,6],.6,'登城する藩士','坂が何度も折れ曲がる。攻める側にはたまらぬ道じゃ。'],
  ['sam_kami',[-50,17],[-26,12],.5,'藩士','太鼓櫓の下で道を折り返して、戸無門へ上るのじゃ。'],['roujin',[-40,-30],[-24,-40],.4,'老いた藩士','嘉明公がこの城を築きはじめて二十五年。ようやく出来上がったのじゃ。'],
  ['samurai_a',[0,-110],[0,-50],.6,'本丸の番士','この本丸は、尾根を削り谷を埋めて平らにしたのよ。'],['w_samurai',[-46,-210],[-46,-170],.5,'紫竹門の番士','紫竹門から先は搦手。乾門へ通じておる。'],
  ['ashigaru_b',[-30,-246],[10,-240],.5,'足軽','野原櫓は古い造り。天守の祖父のような櫓よ。'],['sam_haori',[18,-200],[28,-180],.5,'本壇の役人','天守の五重の屋根、松山の町のどこからでも見えるであろう。'],
  ['jijo',[-176,-50],[-136,-50],.5,'奥女中','御殿の奥へ、お届け物でございます。'],['sam_haori',[-180,-8],[-130,-8],.5,'御殿の役人','蒲生さまの御代に、この二之丸がようやく出来上がったのじゃ。'],
  ['samurai_b',[-329,140],[-329,20],.8,'三之丸の重臣','堀之内の屋敷から二之丸へ出仕するところじゃ。'],['kago',[-329,-200],[-329,-40],.5,'重臣の乗物','（乗物が二之丸の方へ向かっていく）'],
  ['w_youth',[-440,-16],[-340,-16],.7,'若い藩士','松平の殿さまは、家康公の甥御だそうな。'],['p_porter',[-200,-20],[-200,120],.6,'荷運び','米俵を二之丸の蔵まで運ぶんだ。']]) npc(s,[a,b],sp,nm,say);
/* 城下の人々 */
const TOWN_P=[['musume_r','町娘','三津の浜から、新しい魚が入ったそうですよ。'],['onna_b','町の女','この籠いっぱいの青物、市で売れるといいんだけど。'],['w_red','町娘','山の上のお城、五重の屋根がきれいでしょう。'],['w_bucket','水汲みの娘','お堀の水は冷たくて気持ちいいわ。'],
  ['w_umbrella','武家の娘','日差しが強いので、傘をさしております。'],['lady_walk','商家の娘','今日は呉服屋で新しい反物を見てきましたの。'],['q_girl','町の娘','あめを買ってもらいました！'],['q_purple','町の女','お届け物の途中なんです。'],['q_green','町の女','道後の湯に、今度みんなで行きましょうね。'],
  ['w_box','行商人','小間物はいらんかねー。針に糸に扇子だよー。'],['q_merchant','問屋の主人','三津の湊に着いた品を、この町まで運んでくるんですわ。'],['shonin','商人','この箱は大事な証文。落としたら大ごとじゃ。'],['q_yoke','棒手振り','伊予の鯛だよー、うまいよー。'],['w_yoke','棒手振り','魚に野菜、何でもござれだ！'],
  ['wara','百姓','藁を納めに来たところだ。'],['w_straw','百姓','村から薪と藁を運んできました。'],['q_oldw','近在の村の女','村で採れた瓜を、城下の市へ売りに来ました。'],
  ['kodomo','町の子ども','見て見て、山の上のお城！'],['w_boy','町の子ども','薪拾いのお手伝いだよ。'],['q_child','町の子ども','わんこの人形、いいでしょ！'],['q_traveler','旅の商人','三津の湊から上ってきました。立派な城下町ですな。'],['w_traveler','旅人','これから道後の湯につかりに行きます。'],
  ['okami_p','商家のおかみさん','いらっしゃいまし。どうぞゆっくり見ていってくださいな。'],['w_tray','茶屋の娘','お茶をどうぞ。一服していってくださいな。'],['q_ronin','浪人','仕官の口を探しておるのだが……。']];
{ let k=0; for(const zz of [180,203]) for(let j=0;j<16;j++){ const P2=TOWN_P[k++%TOWN_P.length],x0=-620+rnd()*1000,x1=x0+30+rnd()*60; npc(P2[0],j%2?[[x1,zz+(rnd()-.5)*3],[x0,zz]]:[[x0,zz],[x1,zz]],.6+rnd()*.6,P2[1],P2[2]); }
  for(let j=0;j<10;j++){ const P2=TOWN_P[k++%TOWN_P.length],xx=206+(rnd()-.5)*6,a=-180+rnd()*400; npc(P2[0],[[xx,a],[xx,a+40]],.6+rnd()*.6,P2[1],P2[2]); }
  for(let j=0;j<8;j++){ const P2=TOWN_P[k++%TOWN_P.length],zz=70+(rnd()-.5)*5,x0=-200+rnd()*600; npc(P2[0],[[x0,zz],[x0+50,zz]],.6+rnd()*.6,P2[1],P2[2]); }
  for(const [s,x,z,nm,say] of [['okami_p',4,191,'商家のおかみさん','このあたりは、嘉明さまが町割りをなさった町ですのよ。'],['shonin',40,191,'問屋の主人','伊予絣に砥部の焼き物、なんでもございます。'],['w_tray',70,191,'茶屋の娘','名物の団子はいかがですか？']]) npc(s,[[x,z]],0,nm,say,{fixed:true}); }
/* 町の灯り・店先の道具・門の篝火 */
const decoT=new Crowd(GE,900,false);
for(const m of MACHI){ const c=Math.cos(m.ry),s=Math.sin(m.ry); for(const off of [-1.2,1.2]){ const x=m.cx+(m.eo+off)*c+(m.F+.5)*s,z=m.cz-(m.eo+off)*s+(m.F+.5)*c; const r=rnd(); if(r<.4) decoT.add(pick(['lan_white','lan_red']),x,1.55,z,{shadow:false}); else if(r<.6&&okW(x+s*.6,z+c*.6,.2)) decoT.add(pick(['tawara','barrels','crates','bucket','jar','pot']),x+s*.4,0,z+c*.4,{}); } }
for(const [x,z] of [[-66,-42],[-66,-30],[-42,-54],[-34,-54],[-24,-66],[-24,-78],[10,-153],[10,-160],[-49,-160],[-41,-160]]) decoT.add('kagaribi',x,gyT(x,z),z,{s:1});
/* 天守の中（寛永のころ）: 番士 */
{ const T=TEN.edo,F=T.FL,cx=T.cx,cz=T.cz; for(const [i,s,x,z,nm,say] of [[1,'ashigaru',-2,2.6,'天守の番士','籠城となれば、ここに兵糧と武具を運びこむのじゃ。'],[1,'roujin',-3.4,-2.6,'老いた番士','この天守は五重。松山の町のどこからでも見えるわい。'],[3,'yari_a',-1.2,1.2,'物見の番士','西に見えるのが伊予灘、晴れた日は島々がよう見える。'],[5,'t_yari',.6,-1,'最上階の番士','ここが天守のてっぺん。……殿は、いずれ三重に改めるおつもりと聞いたが。']]){ const f=F[i]; if(!f) continue; const it=decoRoomT.add(s,cx+x,f.y,cz+z,{}); if(it){ coll(f,cx+x-.4,cx+x+.4,cz+z-.4,cz+z+.4); TALK.push({it,name:nm,say,era:'edo'}); } } }
/* 連立式の建物の中（寛永のころ）: 番士と武具 */
{ const f=TEN.edo.FL[1]; for(const [s,x,z,nm,say] of [['ashigaru',-30.5,-188,'十間廊下の番士','この廊下の下は高石垣。石落としから石を落とせば、登る敵はひとたまりもない。'],['y_hb',1,-175.6,'小天守の番士','小天守と大天守、隅櫓が渡櫓でつながっておる。どこからでも駆けつけられるのじゃ。'],['yari_a',-14,-201.6,'玄関多聞の番士','下の内門をくぐる者を、ここから見張っておる。']]){ const it=decoRoomT.add(s,x,f.y,z,{}); if(it){ coll(f,x-.4,x+.4,z-.4,z+.4); TALK.push({it,name:nm,say,era:'edo'}); } }
  msFp(GE,f,'yari',-31.8,-192,Math.PI/2,1.5); msFp(GE,f,'nagamochi',-20,-175,0,.7,{solid:true}); msFp(GE,f,'nobori',-31,-171,Math.PI/2,2.2); }
/* 連立式の建物の中（現代）: 展示 */
{ const f=TEN.modern.FL[1]; msFp(GM,f,'castle',-31,-205.4,Math.PI/2,1.3,{y:.8}); panel(f,-33.2,-188,Math.PI/2,1.6,1.1); glassCase(f,-20,-174.7,2.4,.9,1,0,.8); msFp(GM,f,'oni',-20,-174.7,0,.55,{y:.82});
  msFp(GM,f,'shachiL',1.6,-170.6,0,.9,{y:.05,solid:true}); msFp(GM,f,'shachiR',4.6,-170.6,0,.9,{y:.05,solid:true}); glassCase(f,-13,-203.4,2.4,.9,1,0,.8); msFp(GM,f,'katana',-13,-203.4,0,.45,{y:.85}); }
/* 室内の人物 */
function rp(R,spr,x,y,z,o,solid,talk){ const C=R.era==='modern'?decoRoomM:decoRoomT; const it=C.add(spr,R.ox+x,R.y+y,R.oz+z,o); if(it&&solid){ const w=Math.max(.5,it.w*.4); R.boxes.push({x0:R.ox+x-w,x1:R.ox+x+w,z0:R.oz+z-.45,z1:R.oz+z+.45}); } if(it&&talk) TALK.push({it,name:talk[0],say:talk[1],era:R.era}); return it; }
{ const D=RD;
  rp(D.goten,'lord_purple',0,.35,-4.6,{},true,['松山城主・蒲生忠知','嘉明どのが二十五年かけた城、わしの代でようやく仕上がった。']);
  for(const [s,x,z,nm,say,fl] of [['sam_haori',-6,0,'家老','御城の普請、二之丸まですべて相済みましてございます。'],['samurai_a',-2,1.5,'藩士','領内の村々の様子をご報告にまいりました。'],['samurai_b',2,1.5,'藩士','（静かに控えている）',1],['sam_kami',6,0,'近習','殿の御前じゃ。お静かに。',1]]) rp(D.goten,s,x,0,z,{flip:!!fl},true,[nm,say]);
  rp(D.taiko,'ashigaru',2.4,0,1,{},true,['太鼓番','刻（とき）になれば、この太鼓を打って城下へ知らせるのじゃ。']);
  rp(D.kakure,'y_hb',-1.4,0,.6,{},true,['隠門の伏兵','しっ。筒井門の前に敵が群がるのを待っておる。']); rp(D.kakure,'ashigaru',1.6,0,.8,{flip:true},true,['足軽','合図があれば、ここから一斉に打って出る。']);
  rp(D.bukeE,'sam_kami',-1.2,0,-1.2,{},true,['重臣','明日は本丸の番に上がる日じゃ。']); rp(D.bukeE,'lady_walk',2,0,1.2,{flip:true},true,['奥方','お城の太鼓が鳴りましたね。']);
  rp(D.machiE,'q_merchant',1.6,.45,1.2,{},false,['商家の主人','いらっしゃいまし。帳場で勘定をいたしましょう。']); rp(D.machiE,'w_tray',-2.1,0,2,{},true,['女中','奥の座敷へどうぞ。']); for(const [s,x,z] of [['tawara',-2.5,-1.5],['barrels',-2.4,3.6]]) rp(D.machiE,s,x,0,z,{},true);
  rp(D.nino,'ikebana',-4,.2,-3,{s:.5}); rp(D.bansui,'ex_monjo',-3,.75,-4,{shadow:false,s:1}); }
function updateNPC(dt){ if(!GNPC.visible||!GE.visible) return; const rx=Math.cos(P.yaw),rz=-Math.sin(P.yaw);
  for(const n of NPCS){ if(n.len<=0) continue; n.t+=n.spd*dt*n.dir; if(n.t>n.len){ n.t=n.len; n.dir=-1; } if(n.t<0){ n.t=0; n.dir=1; }
    const a=n.path[0],b=n.path[1],u=n.t/n.len,x=a[0]+(b[0]-a[0])*u,z=a[1]+(b[1]-a[1])*u; n.ph+=dt*n.spd*(n.spd>2?3:5); const mx=(b[0]-a[0])*n.dir,mz=(b[1]-a[1])*n.dir;
    const y=n.fixedY?n.y:withMode('edo',()=>groundH(x,z,n.lastY===undefined?n.y:n.lastY)); n.lastY=y; npcCrowd.move(n.it,x,y+Math.abs(Math.sin(n.ph))*.04,z,(mx*rx+mz*rz)<0); } }
function standAt(par,x,y0,z,h,w,d,mat){ const m=mesh(new THREE.BoxGeometry(w||.7,h,d||.5),M[mat||'lacquer']); m.position.set(x,y0+h/2,z); par.add(m); return y0+h; }
function rpS(R,spr,x,z,h,o,w,d,mat){ const y=standAt(R.era==='modern'?GM:GE,R.ox+x,R.y,R.oz+z,h,w,d,mat); return rp(R,spr,x,y-R.y,z,o); }
