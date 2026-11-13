(()=>{ const D=__dbg,P=D.P,o=[]; window.__cam=null; document.getElementById('goBtn').click(); const run=n=>{ for(let i=0;i<n;i++) D.upd(.05); };
 for(const m of ['modern','edo']){ D.setMode(m); const T=D.TEN[m]; T.ST.forEach((s,i)=>{ const x=(s.x0+s.x1)/2,dir=Math.sign(s.to-s.from); P.room=null; P.level=i; P.x=x; P.z=s.from-dir*.5; P.y=T.FL[i].y+1.6; P.yaw=dir<0?0:Math.PI; D.keys['KeyW']=true; run(140); D.keys['KeyW']=false; o.push([m,i,'->',P.level,P.x.toFixed(1),P.z.toFixed(1),P.y.toFixed(1)]); }); }
 return o; })()
