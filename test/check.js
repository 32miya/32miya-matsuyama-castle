(()=>{ const D=__dbg,out={spots:[],zones:[],path:[]};
 for(const m of ['modern','edo']){ D.setMode(m); for(const s of __oc.spotList()){ const w=D.walkable(s.pos[0],s.pos[1]); if(!w) out.spots.push(m+' NOT WALKABLE '+s.id+' '+__oc.dbgBlock(s.pos[0],s.pos[1])); } 
   for(const R of D.ROOMS.filter(R=>R.era===m)){ const x=(R.zone.x0+R.zone.x1)/2,z=(R.zone.z0+R.zone.z1)/2; if(!D.walkable(x,z)) out.spots.push(m+' room door blocked '+R.name+' '+__oc.dbgBlock(x,z)); } }
 D.setMode('modern');
 /* 1階の区画を一周: 大天守1階 → 玄関多聞 → 北隅櫓 → 十間廊下 → 南隅櫓 → 多聞 → 小天守 → 筋鉄門 → 大天守 */
 const pts=[[1.5,-198],[0,-200],[-1,-200],[-10,-201.5],[-24,-202.9],[-26,-202.9],[-30,-203],[-31,-199],[-31,-190],[-31,-180],[-31,-176],[-31,-172.6],[-30,-172.6],[-27,-172.6],[-16,-172.6],[-6,-172.6],[-2,-172.6],[1,-172.6],[3,-174],[5,-176],[5,-178],[5,-185],[5,-190.5],[5,-191.6],[5,-193]];
 for(const [x,z] of pts) out.zones.push([x,z,D.walkFloor(1,x,z)]);
 /* 線をたどって歩けるか（0.2m刻み） */ let L=1,bad=[]; for(let i=0;i<pts.length-1;i++){ const [a,b]=pts[i],[c,d]=pts[i+1],n=Math.ceil(Math.hypot(c-a,d-b)/.2); let px=a,pz=b; for(let k=1;k<=n;k++){ const x=a+(c-a)*k/n,z=b+(d-b)*k/n,r=D.stepIn(L,px,pz,x,z); if(r<0){ bad.push([i,x.toFixed(2),z.toFixed(2)]); break; } L=r; px=x; pz=z; } } out.path=bad;
 return out; })()
