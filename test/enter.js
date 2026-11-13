(()=>{ const D=__dbg,P=D.P,o=[]; window.__cam=null; document.getElementById('goBtn').click();
 const run=(n)=>{ for(let i=0;i<n;i++) D.upd(.05); };
 P.level=-1; P.room=null; P.x=-5; P.z=-194; P.y=D.groundH(-5,-194)+1.6; P.yaw=-Math.PI/2; P.mode='walk';
 D.keys['KeyW']=true; run(60); o.push(['east',P.level,P.x.toFixed(2),P.z.toFixed(2)]);
 P.yaw=0; run(120); o.push(['stairs N',P.level,P.x.toFixed(2),P.z.toFixed(2),P.y.toFixed(2)]);
 D.keys['KeyW']=false; P.level=0; P.x=1; P.z=-194; P.y=D.TEN.modern.g0+1.6; P.yaw=Math.PI/2; D.keys['KeyW']=true; run(60); o.push(['exit W',P.level,P.x.toFixed(2),P.z.toFixed(2)]);
 /* 1階から西の戸口へ → 玄関多聞 → 北隅櫓 */ P.level=1; P.x=2; P.z=-200; P.y=D.FL[1].y+1.6; P.yaw=Math.PI/2; run(80); o.push(['1F west',P.level,P.x.toFixed(2),P.z.toFixed(2),P.y.toFixed(2)]);
 D.keys['KeyW']=false; return o; })()
