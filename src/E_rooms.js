/* ---------- 寛永のころ ---------- */
B=BE;
/* 二之丸御殿の表書院: 襖絵（松・桜と鶴・竹と鶴・桜）、金の屏風、床の間、星梅鉢の陣幕 */
{ const R=RD.goten=mkRoom(Object.assign({era:'edo'},doorAt(-156,-21.7,0,1),roomTxt('二之丸御殿 表書院','にのまる ごてん おもてしょいん','勝山のふもとの二之丸には、城主が住み政務をとる御殿がありました。加藤嘉明が築きはじめ、寛永4年（1627年）に会津へ移ったあとを受けた蒲生忠知が完成させます。忠知が若くして亡くなると、寛永12年（1635年）に松平定行（家康の甥）が15万石で入り、以後明治まで松平（久松）家の城となりました。',[['完成','寛永4年（1627年）・蒲生忠知'],['のちの城主','松平定行（1635年〜）'],['いま','二之丸史跡庭園（間取りを植え込みで再現）']])));
  const w=24,d=12,h=4.2; shell(R,w,d,h,{floor:'tatami',ftile:1.8,wall:'tl_w_sansui',front:'shoji',ceil:'tl_c_goushi',ctile:2.4,door:2.4,doorH:2.6,lamps:4}); pillarsRow(R,'woodGrain',w,d,h,3.6,false); nageshi(R,'woodGrain',w,d,2.7);
  fusumaWall(R,w,d,2.65,3.6,['fsPine','fsTsuru','fsTake','fsSakura']); ranmaRow(R,w,d,2.9,3.9,3.6,['ranma3','ranma1','ranma7']);
  rb(R,'tatami',-w/2+.2,w/2-.2,0,.35,-d/2+.2,-d/2+3.8,true,1.8); rb(R,'lacquer',-w/2+.2,w/2-.2,.28,.35,-d/2+3.75,-d/2+3.85);
  msRp(R,'toko',-1.4,-d/2+.55,0,2.5,{y:.35}); msRp(R,'byobu',-8,-d/2+1.6,0,1.7,{y:.35,solid:true}); msRp(R,'banner',8.4,-d/2+.5,0,2.6,{y:.35}); msRp(R,'vase',3.4,-d/2+1.2,0,1,{y:.35});
  msRp(R,'lamp',-10.5,1.5,0,1.1,{solid:true}); msRp(R,'lamp',10.5,1.5,0,1.1,{solid:true}); msRp(R,'chestK',9.5,-.6,-Math.PI/2,.95,{solid:true}); msRp(R,'katana',-4.8,-d/2+2.4,0,.75,{y:.35}); }
/* 太鼓櫓の中: 時を告げる大太鼓（三つ巴の紋） */
{ const R=RD.taiko=mkRoom(Object.assign({era:'edo'},doorAt(-12.5,-32.2,0,-1),roomTxt('太鼓櫓の中','たいこやぐら','本丸の南西の隅に建つ二重櫓。中に大太鼓を置き、時刻や登城の合図、いざというときの陣触れを城下へ打ち鳴らしました。下を通る登城道を見張る、大手の守りの要の櫓でもあります。',[['役目','時の太鼓・見張り'],['見下ろす先','揚木戸門から戸無門への道']])));
  const w=8,d=5.4,h=3.4; shell(R,w,d,h,{floor:'floor',wall:'kuraW',front:'woodGrain',ceil:'darkwood',door:1.4,lamps:2}); pillarsRow(R,'darkwood',w,d,h,2,false);
  msRp(R,'taiko',0,-.8,0,1.7,{solid:true}); msRp(R,'yari',-3,-d/2+.4,0,1.5); msRp(R,'nagamochi',3,-d/2+.6,0,.8,{solid:true}); }
/* 隠門の櫓の中: 筒井門に押し寄せた敵の横を突くため、兵がひそんで出撃を待つ */
{ const R=RD.kakure=mkRoom(Object.assign({era:'edo'},doorAt(-22,-62.7,0,-1),roomTxt('隠門の櫓','かくしもん','筒井門の東、石垣の陰に隠れるように造られた小さな櫓門（重要文化財）。筒井門に攻め寄せた敵からは見えず、ここから兵がひそかに打って出て、敵の側面や背後を突きました。松山城の守りの工夫がよくわかる門です。',[['構え','埋門形式の櫓門'],['年代','江戸時代前期（現存）'],['ねらい','筒井門の敵の側面を突く']])));
  const w=9,d=4.6,h=3; shell(R,w,d,h,{floor:'floor',wall:'kuraW',front:'woodGrain',ceil:'darkwood',door:1.2,lamps:2}); pillarsRow(R,'darkwood',w,d,h,1.8,false);
  msRp(R,'yari',-3.2,-d/2+.4,0,1.6); msRp(R,'yari',3.2,-d/2+.4,0,1.6); msRp(R,'nagamochi',0,-d/2+.6,0,.75,{solid:true}); }
/* 三之丸の重臣屋敷（書院） */
const bukeHouse=BUKE.reduce((a,b)=>Math.hypot(b.hx+290,b.hz-26)<Math.hypot(a.hx+290,a.hz-26)?b:a);
{ const D=bukeHouse,sx=D.face==='e'?1:-1,R=RD.bukeE=mkRoom(Object.assign({era:'edo'},doorAt(D.hx+sx*(D.hw/2+.55),D.hz,sx,0),roomTxt('三之丸の重臣屋敷','さんのまる じゅうしん やしき','堀に囲まれた三之丸（堀之内）には、家老など重臣の屋敷が並びました。表の書院で客を迎え、奥には家族の住まいがあります。のちの天和3年（1683年）には、藩主の住まいもこの三之丸の御殿に移されました。',[['住んだ人','家老・重臣'],['いま','堀之内公園・美術館']])));
  const w=11,d=8,h=3.3; shell(R,w,d,h,{floor:'tatami',ftile:1.8,wall:'tl_w_sansui',front:'shoji',ceil:'tl_c_wood',ctile:2.4,door:1.8,lamps:3}); pillarsRow(R,'darkwood',w,d,h,2.8,false); nageshi(R,'darkwood',w,d,2.25);
  fusumaWall(R,w,d,2.2,2.8,['fsTake','tl_f_sansui','fsSakura']); msRp(R,'scroll',-2.3,-d/2+.3,0,1.6,{y:.6}); rb(R,'darkwood',-3.6,-1,0,.2,-d/2,-d/2+.9,true);
  msRp(R,'table',1,-.6,0,.55,{solid:true}); msRp(R,'katana',3.6,-d/2+.6,0,.6); msRp(R,'lamp',-4.4,1.6,0,.95,{solid:true}); }
/* 城下の商家 */
{ const m=pickMachi(30,180),dd=machiDoor(m); const R=RD.machiE=mkRoom(Object.assign({era:'edo'},dd,roomTxt('城下の商家','じょうかの しょうか','加藤嘉明は城と同時に城下町を割り、商人や職人を集めました。松山の名もこのとき嘉明が名づけたものです。表の通りに面した店先から奥へ、通り土間と帳場、座敷が続きます。',[['町割り','加藤嘉明（慶長年間）'],['つくり','通り土間・帳場・座敷']])));
  const w=6.4,d=11,h=3.6; shell(R,w,d,h,{floor:'tsuchi',wall:'tsuchi',front:'woodGrain',ceil:'woodGrain',door:1.6,doorX:-2,doorMat:'noren',lamps:2});
  rb(R,'tatami',-.9,w/2,0,.45,-d/2,d/2-.8,true,1.8); rb(R,'darkwood',-1,-.9,0,.47,-d/2,d/2-.8); msRp(R,'chestK',2.3,-d/2+.6,0,.9,{y:.45}); msRp(R,'table',1.4,1,0,.5,{y:.45}); rb(R,'stone',-3,-1.4,0,.8,-d/2+.3,-d/2+1.6,true); }
/* ---------- 現代 ---------- */
B=BM;
/* 二之丸史跡庭園の休憩所 */
{ const R=RD.nino=mkRoom(Object.assign({era:'modern'},doorAt(-150,10.8,0,1),roomTxt('二之丸史跡庭園 休憩所','にのまる しせきていえん','二之丸の御殿の跡は、発掘でわかった間取りを植え込みと水面で表した庭園になっています。東には東西18m・南北13m・深さ9mほどの大井戸の遺構が残り、籠城に備えた水の大切さを伝えます。',[['開園','1992年（平成4年）'],['見どころ','表御殿・奥御殿の間取り、大井戸遺構']])));
  const w=12,d=7,h=3.2; shell(R,w,d,h,{floor:'tatami',ftile:1.8,wall:'tsuchi',front:'shoji',ceil:'tl_c_wood',ctile:2.4,door:2.4,lamps:2}); pillarsRow(R,'darkwood',w,d,h,3,false);
  msRp(R,'byobu',0,-d/2+.9,0,1.5,{solid:true}); msRp(R,'table',-3.4,.4,0,.5,{solid:true}); msRp(R,'table',3.4,.4,0,.5,{solid:true}); msRp(R,'vase',-5,-d/2+.6,0,.9); }
/* 萬翠荘: 大正時代のフランス風洋館 */
{ const R=RD.bansui=mkRoom(Object.assign({era:'modern'},doorAt(40,83.4,0,-1),roomTxt('萬翠荘','ばんすいそう','大正11年（1922年）、旧松山藩主の子孫・久松定謨（さだこと）伯爵が別邸として建てたフランス風の洋館。社交の場として使われ、いまは国の重要文化財です。城山の南のふもとの緑の中に建っています。',[['建築','1922年（大正11年）'],['指定','国の重要文化財']])));
  const w=14,d=10,h=4.6; shell(R,w,d,h,{floor:'carpet',wall:'pinkW',front:'woodGrain',ceil:'plaster',door:2,lamps:4}); pillarsRow(R,'woodGrain',w,d,h,3.5,false);
  rg(R,'gold',new THREE.CylinderGeometry(.08,.6,.9,12),0,h-.6,0); rg(R,'lampIn',new THREE.SphereGeometry(.42,12,8),0,h-1.2,0);
  msRp(R,'castle',0,-d/2+.3,0,2.2,{y:.9}); msRp(R,'vase',-5.4,-d/2+.6,0,1.1,{solid:true}); msRp(R,'vase',5.4,-d/2+.6,0,1.1,{solid:true}); rb(R,'woodGrain',-1.6,1.6,0,.75,-.6,.6,true); }
/* 本丸の売店（お城の模型と鯱・鬼瓦の飾り） */
{ const R=RD.shop=mkRoom(Object.assign({era:'modern'},doorAt(12.3,-112,-1,0),roomTxt('本丸広場の売店','ほんまるひろば','本丸広場の休憩所。春は約200本の桜が咲き、日本さくら名所100選に選ばれています。松山城は姫路城・津山城（または和歌山城）とともに日本三大平山城、また姫路城・和歌山城とともに三大連立式平山城に数えられます。',[['名所','日本さくら名所100選'],['数え方','三大平山城・三大連立式平山城']])));
  const w=9,d=6,h=3; shell(R,w,d,h,{floor:'floor',wall:'tsuchi',front:'glass',ceil:'woodGrain',door:2,lamps:2});
  msRp(R,'castle',0,-d/2+.25,0,1.8,{y:.7}); msRp(R,'shachiL',-3,-1.2,0,1,{y:.8}); msRp(R,'shachiR',3,-1.2,0,1,{y:.8}); msRp(R,'oni',0,-2,0,.7,{y:.8});
  rb(R,'woodGrain',-4,-2,0,.8,-1.8,-.6,true); rb(R,'woodGrain',2,4,0,.8,-1.8,-.6,true); rb(R,'woodGrain',-1,1,0,.8,-2.6,-1.4,true); }
B=BS;
