const COOKIE = 'mym_admin';
const THEMES = new Set(['coral','terracota','rosa','salvia','ciruela']);
const FIELDS = {
  home: ['heroTitle','heroLead','journeyTitle','journeyLead','guidanceTitle','guidanceLead','pillarsTitle','pillarsLead','eventTitle','eventLead','testimonialsTitle','resourcesTitle','aboutTitle','contactTitle'],
  day: ['heroTitle','heroLead','proofTitle','fitTitle','pricingTitle','introTitle','bankTitle','profileTitle','faqTitle','finalTitle']
};
const SECTIONS = {
  home: ['trust','journey','guidance','pillars','event','testimonials','resources','about','contact'],
  day: ['proof','fit','pricing','intro','bank','profile','faq','final']
};
const json = (data,status=200,extra={}) => new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...extra}});
const enc=s=>new TextEncoder().encode(s);
const b64url=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
async function hmac(secret,value){const key=await crypto.subtle.importKey('raw',enc(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return b64url(await crypto.subtle.sign('HMAC',key,enc(value)));}
async function digest(value){return new Uint8Array(await crypto.subtle.digest('SHA-256',enc(value)));}
function equal(a,b){if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a[i]^b[i];return x===0;}
function getCookie(req,name){const raw=req.headers.get('cookie')||'';const hit=raw.split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='));return hit?hit.slice(name.length+1):null;}
async function isAdmin(req,env){if(!env.ADMIN_PASSWORD)return false;const token=getCookie(req,COOKIE);if(!token)return false;const [exp,sig]=token.split('.');if(!exp||!sig||Number(exp)<Date.now())return false;return equal(enc(sig),enc(await hmac(env.ADMIN_PASSWORD,exp)));}
async function makeCookie(env){const exp=String(Date.now()+8*60*60*1000);return `${COOKIE}=${exp}.${await hmac(env.ADMIN_PASSWORD,exp)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`;}
function sameOrigin(req){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin;}
function cleanConfig(input){if(!input||typeof input!=='object')throw new Error('Configuración inválida');const out={version:1,theme:THEMES.has(input.theme)?input.theme:'coral',pages:{}};for(const page of ['home','day']){const src=input.pages?.[page]||{},texts={};for(const key of FIELDS[page]){const v=src.texts?.[key];if(typeof v==='string')texts[key]=v.trim().slice(0,1200);}const sections={};for(const key of SECTIONS[page])sections[key]=src.sections?.[key]!==false;const requested=Array.isArray(src.order)?src.order.filter(x=>SECTIONS[page].includes(x)):[];out.pages[page]={texts,sections,order:[...new Set([...requested,...SECTIONS[page]])]};}return out;}
async function defaults(env,requestUrl){const r=await env.ASSETS.fetch(new Request(new URL('/editorial-defaults.json',requestUrl)));return r.json();}
async function store(env,path,init={}){const stub=env.EDITORIAL.get(env.EDITORIAL.idFromName('global'));return stub.fetch(new Request('https://editorial.internal'+path,init));}
async function assetWithEditorial(req,env){const r=await env.ASSETS.fetch(req);const type=r.headers.get('content-type')||'';if(!r.ok||!type.includes('text/html'))return r;const text=await r.text();if(text.includes('/editorial-client.js'))return new Response(text,r);const injected=text.replace('</body>','<script src="/editorial-client.js"></script></body>');const headers=new Headers(r.headers);headers.delete('content-length');return new Response(injected,{status:r.status,headers});}

export default {async fetch(req,env){const url=new URL(req.url),path=url.pathname;
  if(path==='/api/admin/login'&&req.method==='POST'){if(!env.ADMIN_PASSWORD)return json({error:'Administrador aún no configurado'},503);if(!sameOrigin(req))return json({error:'Origen no permitido'},403);const body=await req.json().catch(()=>({}));if(!equal(await digest(String(body.password||'')),await digest(env.ADMIN_PASSWORD)))return json({error:'Clave incorrecta'},401);return json({ok:true},200,{'set-cookie':await makeCookie(env)});}
  if(path==='/api/admin/logout'&&req.method==='POST')return json({ok:true},200,{'set-cookie':`${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`});
  if(path==='/api/content'&&req.method==='GET'){const preview=url.searchParams.get('preview')==='1';if(preview&&!(await isAdmin(req,env)))return json({error:'No autorizado'},401);const r=await store(env,preview?'/draft':'/published');if(r.ok)return new Response(r.body,{headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});return json(await defaults(env,req.url));}
  if(path.startsWith('/api/admin/')){if(!(await isAdmin(req,env)))return json({error:'No autorizado'},401);if(!sameOrigin(req))return json({error:'Origen no permitido'},403);
    if(path==='/api/admin/state'&&req.method==='GET'){const state=await (await store(env,'/state')).json();if(!state.published)state.published=await defaults(env,req.url);if(!state.draft)state.draft=structuredClone(state.published);return json(state);}
    if(path==='/api/admin/draft'&&req.method==='PUT'){const raw=await req.text();if(raw.length>60000)return json({error:'Cambio demasiado grande'},413);let cleaned;try{cleaned=cleanConfig(JSON.parse(raw));}catch(e){return json({error:e.message},400);}await store(env,'/draft',{method:'PUT',body:JSON.stringify(cleaned),headers:{'content-type':'application/json'}});return json({ok:true,draft:cleaned});}
    if(path==='/api/admin/publish'&&req.method==='POST'){const r=await store(env,'/publish',{method:'POST'});if(!r.ok)return json({error:'No hay borrador para publicar'},409);return json({ok:true,...await r.json()});}
    if(path==='/api/admin/rollback'&&req.method==='POST'){const r=await store(env,'/rollback',{method:'POST'});if(!r.ok)return json({error:'No existe una versión anterior'},409);return json({ok:true,...await r.json()});}
  }
  return assetWithEditorial(req,env);
}};

export class EditorialStore{constructor(ctx){this.ctx=ctx;}async fetch(req){const url=new URL(req.url),s=this.ctx.storage;
  if(url.pathname==='/state')return json({draft:await s.get('draft')||null,published:await s.get('published')||null,previous:await s.get('previous')||null,updatedAt:await s.get('updatedAt')||null});
  if((url.pathname==='/draft'||url.pathname==='/published')&&req.method==='GET'){const value=await s.get(url.pathname.slice(1));return value?json(value):new Response('',{status:404});}
  if(url.pathname==='/draft'&&req.method==='PUT'){const value=await req.json();await s.put('draft',value);await s.put('updatedAt',new Date().toISOString());return json({ok:true});}
  if(url.pathname==='/publish'&&req.method==='POST'){const draft=await s.get('draft');if(!draft)return new Response('',{status:409});const published=await s.get('published');if(published)await s.put('previous',published);await s.put('published',draft);await s.put('draft',draft);const updatedAt=new Date().toISOString();await s.put('updatedAt',updatedAt);return json({published:draft,updatedAt});}
  if(url.pathname==='/rollback'&&req.method==='POST'){const previous=await s.get('previous');if(!previous)return new Response('',{status:409});const published=await s.get('published');if(published)await s.put('previous',published);await s.put('published',previous);await s.put('draft',previous);const updatedAt=new Date().toISOString();await s.put('updatedAt',updatedAt);return json({published:previous,updatedAt});}
  return new Response('Not found',{status:404});
}}
