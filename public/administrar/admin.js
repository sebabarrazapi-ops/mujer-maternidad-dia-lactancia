(() => {
  const $ = (s) => document.querySelector(s);
  const login = $('[data-login]'), app = $('[data-app]'), status = $('[data-status]'), loginStatus = $('[data-login-status]');
  const pageSelect = $('[data-page]'), fieldsRoot = $('[data-fields]'), sectionsRoot = $('[data-sections]'), palettesRoot = $('[data-palettes]'), frame = $('[data-frame]');
  let state = null;

  const schema = {
    home: {
      path:'/',
      fields:[
        ['heroTitle','Título principal'],['heroLead','Texto principal'],['journeyTitle','Título “¿En qué etapa estás?”'],['journeyLead','Texto de etapas'],
        ['guidanceTitle','Título orientación'],['guidanceLead','Texto orientación'],['pillarsTitle','Título formas de acompañarte'],['pillarsLead','Texto formas de acompañarte'],
        ['eventTitle','Título evento'],['eventLead','Texto evento'],['testimonialsTitle','Título testimonios'],['resourcesTitle','Título recursos'],['aboutTitle','Título sobre Verónica'],['contactTitle','Título contacto']
      ],
      sections:{trust:'Señales de confianza',journey:'¿En qué etapa estás?',guidance:'Orientación general',pillars:'Formas de acompañarte',event:'Día de Lactancia',testimonials:'Testimonios',resources:'Recursos gratuitos',about:'Sobre Verónica',contact:'Contacto'}
    },
    day: {
      path:'/dia-de-lactancia/',
      fields:[['heroTitle','Título principal'],['heroLead','Texto principal'],['proofTitle','Título testimonios'],['fitTitle','Título “Es para ti”'],['pricingTitle','Título opciones'],['introTitle','Título Taller 1'],['bankTitle','Título Taller 2'],['profileTitle','Nombre / autoridad'],['faqTitle','Título preguntas frecuentes'],['finalTitle','Título cierre']],
      sections:{proof:'Testimonios',fit:'¿Es para ti?',pricing:'Opciones de compra',intro:'Introducción a la Lactancia',bank:'Banco de Leche',profile:'Sobre Verónica',faq:'Preguntas frecuentes',final:'Cierre / CTA'}
    }
  };
  const paletteMeta = {coral:['Coral','#b86b63'],terracota:['Terracota','#a95f50'],rosa:['Rosa','#b96f7d'],salvia:['Salvia','#718b79'],ciruela:['Ciruela','#8c6174']};
  const PREVIEW_KEY = 'mym-editorial-preview-v1';

  const api = async (url, options={}) => {
    const r = await fetch(url,{credentials:'same-origin',headers:{'content-type':'application/json',...(options.headers||{})},...options});
    const data = await r.json().catch(()=>({}));
    if (!r.ok) throw new Error(data.error || `Error ${r.status}`);
    return data;
  };
  const msg = (text, error=false) => { status.textContent=text; status.classList.toggle('error',error); };
  const previewUrl = () => `${schema[pageSelect.value].path}?editorial_preview=1&v=${Date.now()}`;
  const rememberPreview = () => {
    if (!state?.draft) return;
    try { sessionStorage.setItem(PREVIEW_KEY, JSON.stringify(state.draft)); } catch {}
  };
  const refreshFrame = () => { rememberPreview(); frame.src = previewUrl(); };
  const syncLivePreview = () => {
    if (!state?.draft || !frame.contentWindow) return;
    rememberPreview();
    frame.contentWindow.postMessage({type:'mym-editorial-preview',config:state.draft}, location.origin);
  };
  const sameConfig = (a,b) => JSON.stringify(a) === JSON.stringify(b);
  const saveAndVerifyDraft = async () => {
    const r = await api('/api/admin/draft',{method:'PUT',body:JSON.stringify(state.draft)});
    state.draft = r.draft;
    const persisted = await api('/api/content?preview=1');
    if (!sameConfig(persisted,state.draft)) throw new Error('El borrador se guardó, pero la verificación del servidor no coincide. No publiques todavía.');
    rememberPreview();
    return persisted;
  };
  frame.addEventListener('load', () => setTimeout(syncLivePreview, 60));

  const renderPalettes = () => {
    palettesRoot.innerHTML='';
    Object.entries(paletteMeta).forEach(([key,[label,color]]) => {
      const b=document.createElement('button'); b.type='button'; b.className='palette'+(state.draft.theme===key?' active':'');
      b.innerHTML=`<i style="background:${color}"></i><span>${label}</span>`;
      b.onclick=()=>{state.draft.theme=key;renderPalettes();syncLivePreview();}; palettesRoot.appendChild(b);
    });
  };
  const renderFields = () => {
    const page=pageSelect.value, values=state.draft.pages[page].texts;
    fieldsRoot.innerHTML='';
    schema[page].fields.forEach(([key,label])=>{
      const wrap=document.createElement('label'); wrap.className='field';
      const value=values[key]||''; const multiline=value.length>90 || key.toLowerCase().includes('lead');
      wrap.innerHTML=`<span>${label}</span>${multiline?'<textarea></textarea>':'<input type="text" />'}`;
      const input=wrap.querySelector('input,textarea'); input.value=value;
      input.oninput=()=>{values[key]=input.value;syncLivePreview();};
      fieldsRoot.appendChild(wrap);
    });
  };
  const move = (key,dir) => {
    const page=state.draft.pages[pageSelect.value], i=page.order.indexOf(key), j=i+dir;
    if(i<0||j<0||j>=page.order.length)return;
    [page.order[i],page.order[j]]=[page.order[j],page.order[i]];
    renderSections();
    syncLivePreview();
  };
  const renderSections = () => {
    const pageKey=pageSelect.value, page=state.draft.pages[pageKey], labels=schema[pageKey].sections;
    sectionsRoot.innerHTML='';
    page.order.filter(k=>labels[k]).forEach((key)=>{
      const row=document.createElement('div');row.className='section-row';
      row.innerHTML=`<input type="checkbox" ${page.sections[key]!==false?'checked':''} aria-label="Mostrar ${labels[key]}"><strong>${labels[key]}</strong><div class="move"><button type="button" aria-label="Subir">↑</button><button type="button" aria-label="Bajar">↓</button></div>`;
      row.querySelector('input').onchange=(e)=>{page.sections[key]=e.target.checked;syncLivePreview();};
      const buttons=row.querySelectorAll('.move button');buttons[0].onclick=()=>move(key,-1);buttons[1].onclick=()=>move(key,1);
      sectionsRoot.appendChild(row);
    });
  };
  const render = () => { renderPalettes(); renderFields(); renderSections(); refreshFrame(); };
  const load = async () => {
    try { state=await api('/api/admin/state'); login.hidden=true; app.hidden=false; rememberPreview(); render(); }
    catch(e){ login.hidden=false; app.hidden=true; }
  };

  $('[data-login-form]').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const form = e.currentTarget;
    loginStatus.textContent='Entrando…'; loginStatus.classList.remove('error');
    try {
      const password = new FormData(form).get('password');
      await api('/api/admin/login',{method:'POST',body:JSON.stringify({password})});
      form.reset();
      await load();
    }
    catch(err){ loginStatus.textContent=err.message; loginStatus.classList.add('error'); }
  });
  pageSelect.onchange=render;
  $('[data-save]').onclick=async()=>{try{msg('Guardando y verificando borrador…');await saveAndVerifyDraft();msg('Borrador guardado y verificado.');syncLivePreview();}catch(e){msg(e.message,true)}};
  $('[data-preview]').onclick=async()=>{
    const popup=window.open('about:blank','_blank');
    try{
      msg('Preparando vista previa…');
      await saveAndVerifyDraft();
      if (popup) {
        try { popup.sessionStorage.setItem(PREVIEW_KEY, JSON.stringify(state.draft)); } catch {}
        popup.location.href=previewUrl();
      }
      msg('Borrador guardado y verificado.');
    }catch(e){if(popup)popup.close();msg(e.message,true)}
  };
  $('[data-publish]').onclick=async()=>{if(!confirm('¿Publicar estos cambios en el sitio?'))return;try{msg('Publicando…');await saveAndVerifyDraft();const r=await api('/api/admin/publish',{method:'POST'});state.published=r.published;state.draft=structuredClone(r.published);const visible=await api('/api/content');if(!sameConfig(visible,state.published))throw new Error('La publicación se guardó, pero la verificación pública no coincide todavía. No hagas más cambios hasta reintentar.');rememberPreview();msg('Cambios publicados y verificados.');syncLivePreview();}catch(e){msg(e.message,true)}};
  $('[data-rollback]').onclick=async()=>{if(!confirm('¿Volver a la versión publicada anterior?'))return;try{msg('Restaurando…');const r=await api('/api/admin/rollback',{method:'POST'});state.published=r.published;state.draft=structuredClone(r.published);rememberPreview();msg('Versión anterior restaurada.');render();}catch(e){msg(e.message,true)}};
  $('[data-logout]').onclick=async()=>{try{sessionStorage.removeItem(PREVIEW_KEY);}catch{}await api('/api/admin/logout',{method:'POST'}).catch(()=>{});location.reload();};

  load();
})();
