(async function(){
  const email=sessionStorage.getItem('cliente_email')||'';const causa=sessionStorage.getItem('cliente_causa')||'';const $=s=>document.querySelector(s);
  let cfg={};try{cfg=await (await fetch('config.json')).json();}catch(e){}
  const api=cfg.GWORK_API_URL||'';let data;
  try{data=api?(await (await fetch(api+'?email='+email+'&causa='+causa)).json()):(await (await fetch('mock-data.json')).json());}
  catch(e){data=await (await fetch('mock-data.json')).json();}
  $('#subtitle').textContent=data.cliente?.nombre+' — Causa '+(data.causa?.id||'');
  $('#panel').innerHTML=`
    <h2>Estado actual: ${data.causa?.estado||'-'}</h2>
    <p><b>Próximo hito:</b> ${data.causa?.proximo_hito||'-'}</p>
    <h3>Timeline</h3>
    <ul>${(data.timeline||[]).map(t=>`<li>${t.fecha}: ${t.evento} — ${t.detalle}</li>`).join('')}</ul>
    <h3>Documentos</h3>
    <ul>${(data.documentos||[]).map(d=>`<li><a href="${d.url||'#'}" target="_blank">${d.nombre}</a> (${d.fecha})</li>`).join('')}</ul>
    <h3>Mensajes</h3>
    <ul>${(data.mensajes||[]).map(m=>`<li><b>${m.de}:</b> ${m.texto} (${m.fecha})</li>`).join('')}</ul>
    <h3>Pagos</h3>
    <ul>${(data.pagos||[]).map(p=>`<li>${p.concepto}: ${p.monto} — ${p.estado}</li>`).join('')}</ul>`;
})();
