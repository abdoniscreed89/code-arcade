(()=>{
const ind=(s,n)=>s.replace(/\n/g,'\n'+' '.repeat(n));
/* Code order in every project: HTML first, then one <style> section, then one <script> section. */
const firstTag=(code,re)=>{const m=re.exec(code);return m?m.index:-1;};
const insCSS=(code,css)=>{
  if(/<\/style>/i.test(code))return code.replace(/\s*<\/style>(?![\s\S]*<\/style>)/i,()=>'\n\n  '+ind(css,2)+'\n</style>');
  const block='<style>\n  '+ind(css,2)+'\n</style>';const i=firstTag(code,/<script/i);
  return i>=0?code.slice(0,i).replace(/\s*$/,'')+(code.slice(0,i).trim()?'\n\n':'')+block+'\n\n'+code.slice(i):code.replace(/\s*$/,'')+(code.trim()?'\n\n':'')+block;};
const insHTML=(code,html)=>{const i=firstTag(code,/<(style|script)\b/i);return i>=0?code.slice(0,i).replace(/\s*$/,'')+(code.slice(0,i).trim()?'\n\n':'')+html+'\n\n'+code.slice(i):(code.replace(/\s*$/,'')+(code.trim()?'\n\n':'')+html);};
const insJS=(code,js)=>/<\/script>/i.test(code)?code.replace(/\s*<\/script>(?![\s\S]*<\/script>)/i,()=>'\n\n  '+ind(js,2)+'\n</script>'):code.replace(/\s*$/,'')+(code.trim()?'\n\n':'')+'<script>\n  '+ind(js,2)+'\n</script>';
const W_HTML='Below everything you already have — but ABOVE the `<style>` section (and above `<script>`), if you have them. HTML always goes first.';
const W_CSS='Inside your `<style>` section, just before `</style>`. No style section yet? Type `<style>` on a new line under your HTML, then your CSS, then `</style>`.';
const W_JS='Inside your `<script>` section, just before `</script>`. No script section yet? Type `<script>` on a new line at the very bottom, then your JavaScript, then `</script>`.';
const H=(id,title,o)=>Object.assign({id,title,kind:'html',ch:'Part 1: Build it (HTML)',where:W_HTML},o);
const C=(id,title,o)=>Object.assign({id,title,kind:'css',ch:'Part 2: Style it (CSS)',where:W_CSS},o);
const J=(id,title,o)=>Object.assign({id,title,kind:'js',ch:'Part 3: Make it work (JavaScript)',where:W_JS},o);
const nonDefaultFont=a=>a.css(a.doc.body,'fontFamily')!=='system-ui, sans-serif';
const labelLinked=(a,scope)=>a.$$(scope+' label[for]').some(l=>a.doc.getElementById(l.getAttribute('for')));
const anyHover=(re,prop)=>a=>a.rules().some(r=>r.selectorText&&re.test(r.selectorText.replace(/\s+/g,' '))&&r.style[prop]);
const hasMedia=(re,m)=>[a=>a.rules().some(r=>r.media&&re.test(r.media.mediaText)&&r.cssRules&&r.cssRules.length),m];
const grad=(s,m)=>[a=>/gradient/.test(a.css(a.$(s)||a.doc.body,'backgroundImage')),m];
const transOn=(s,m)=>[a=>{const e=a.$(s);return !!e&&a.css(e,'transitionDuration').split(',').some(v=>parseFloat(v)>0);},m];
/* JavaScript-project helpers: run after the page's own script has run */
const clickThen=(sel,fn,m)=>[async a=>{if(!a.click(sel))return false;await a.wait(30);return fn(a);},m];
const noErrors=m=>[a=>a.errs.length===0,m||'Your JavaScript has an error. Check spelling, brackets and quotes.'];

const PROJECTS=[];

/* ---------- shared project engine ---------- */
function prep(P){if(P._prepped)return;P._prepped=true;P.cat=P.cat||'web';P.js=P.cat==='js'||P.cat==='full'||P.steps.some(s=>s.kind==='js');
  P.steps.forEach(s=>{if(!s.apply)s.apply=c=>s.kind==='css'?insCSS(c,s.snippet):s.kind==='js'?insJS(c,s.snippet):insHTML(c,s.snippet);s.answer=s.snippet;s.starter='';});
  let code=P.base||'';P.ref=P.steps.map(s=>(code=s.apply(code)));}
const docFor=(P,code)=>{const t=(/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(code)||[])[1];const title=esc((t||P.title).replace(/<[^>]+>/g,'').trim()||P.title);
  return `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>${title}</title>\n</head>\n<body>\n\n${code}\n\n</body>\n</html>\n`;};
function download(P,code){const blob=new Blob([docFor(P,code)],{type:'text/html'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='index.html';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);
  modal(`<div class="center"><div style="font-size:48px">⬇️</div><h3>Your website is downloading!</h3></div><p>The file is called <b>index.html</b>. Double-click it to open your site in any browser.</p><p>Want it online for free? Upload <b>index.html</b> to a new GitHub repository and turn on <b>GitHub Pages</b> in the repository settings — you'll get a real link to share.</p>`);}
function fullPreview(P,code){modal(`<h3>${P.emoji} ${esc(P.title)} — full preview</h3><iframe class="fullprev" sandbox="allow-same-origin" title="Full preview"></iframe>`,[['Close',null,'primary']]);renderInto($('#modalCard .fullprev'),code,undefined,{scripts:P.js});}
function copyCode(P,code){const txt=docFor(P,code);const ok=()=>modal('<h3>Copied! 📋</h3><p>Your whole website is on your clipboard, ready to paste anywhere.</p>');
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,()=>fallback());else fallback();
  function fallback(){const t=document.createElement('textarea');t.value=txt;document.body.appendChild(t);t.select();try{document.execCommand('copy');ok();}catch(e){modal('<h3>Couldn\'t copy automatically</h3><p>Use the Download button instead.</p>');}t.remove();}}

function register(P){prep(P);
  const PS=()=>{const o=PROG.proj[P.id]&&typeof PROG.proj[P.id]==='object'?PROG.proj[P.id]:(PROG.proj[P.id]={});if(!o.stars||typeof o.stars!=='object')o.stars={};if(typeof o.code!=='string')o.code='';if(typeof o.start!=='string')o.start='';return o;};
  Game({id:P.id,emoji:P.emoji,title:P.title,unit:'Step',winWord:'Step complete! ✅',levels:P.steps,starStore:()=>PS().stars,
    intro:`<h2>${P.emoji} ${esc(P.title)}</h2><p class="lesson">${md(P.intro)}</p><p class="lesson">🧭 <b>How it works:</b> every step tells you exactly <b>what</b> to add and <b>where</b>, and shows a picture of how your page should look after it. Your code carries over from step to step — by the end, it's one complete website you can download.</p>${P.uses?`<p class="muted" style="font-size:14px;margin-bottom:0">Skills from: ${esc(P.uses)}</p>`:''}`,
    header(el,g){const code=PS().code;const p=g.progress();
      el.innerHTML=`<div class="box" style="margin-top:12px"><b>🖥️ Your website so far</b> <span class="muted" style="font-size:14px">· ${p.done} of ${p.total} steps done</span>
        <div class="pbar" style="margin:8px 0 10px"><i style="width:${Math.round(p.done/p.total*100)}%"></i></div>
        ${code.trim()?`<iframe class="prev" sandbox="allow-same-origin" title="Your website" style="height:220px"></iframe>`:`<p class="muted">Nothing yet — start with Step 1 below!</p>`}
        <div class="row2" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
          <button class="btn sm primary" data-p="full" ${code.trim()?'':'disabled'}>👀 Full preview</button>
          <button class="btn sm" data-p="dl" ${code.trim()?'':'disabled'}>⬇️ Download index.html</button>
          <button class="btn sm" data-p="copy" ${code.trim()?'':'disabled'}>📋 Copy code</button>
          <button class="btn sm ghost" data-p="restart" ${code.trim()?'':'disabled'}>↺ Start over</button></div></div>`;
      if(code.trim())renderInto($('iframe',el),code,undefined,{scripts:P.js});
      $('[data-p=full]',el).onclick=()=>fullPreview(P,PS().code);
      $('[data-p=dl]',el).onclick=()=>download(P,PS().code);
      $('[data-p=copy]',el).onclick=()=>copyCode(P,PS().code);
      $('[data-p=restart]',el).onclick=()=>modal(`<h3>Start ${esc(P.title)} over?</h3><p>This deletes your code and stars for this project only. Tip: download it first if you want to keep a copy.</p>`,[['Cancel',null],['Yes, start over',()=>{PROG.proj[P.id]={code:'',start:'',stars:{}};saveProg();g.levels();},'primary']]);},
    finale:`🎉 Your ${P.title} is finished! Download it, open it, show it off. Put it on GitHub Pages and you have a real website.`,
    finaleBtns:[['⬇️ Download my website',()=>download(P,PS().code)],['👀 Full preview',()=>fullPreview(P,PS().code)]],
    play(S,el,done){const st=PS();const i=P.steps.indexOf(S);const already=!!st.stars[S.id];if(!st.code&&P.base)st.code=P.base;
      if(!already&&st.cur!==S.id){st.start=st.code;st.cur=S.id;saveProg();}
      const b=Bench(el,{scripts:P.js,snips:P.js?['<','>','/','=','"','{','}','(',')',';','.','#','=>']:undefined,checkLabel:'✅ Check this step',resetLabel:'Undo this step\'s changes',winText:'Step complete!',
        onInput:v=>{PS().code=v;saveProg();},
        answer:(T,ed,hb,onInput)=>{hb.innerHTML=`<div class="h a">👁 <b>${T.kind==='edit'?'Change it to look like this:':'Here\'s the code for this step:'}</b><pre class="ex">${esc(T.snippet)}</pre>📍 <b>Where:</b> ${md(T.where)}<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm primary" data-add>✨ Put it in for me</button></div><small>(Typing it yourself = more stars and better memory. But no shame in using this!)</small></div>`;
          $('[data-add]',hb).onclick=()=>{const before=ed.value;const after=T.apply(before);if(after===before){$('[data-add]',hb).insertAdjacentHTML('afterend','<span class="muted" style="font-size:13px"> Couldn\'t place it automatically — please type the change yourself.</span>');return;}ed.value=after;onInput();};},
        onPass:s=>{PS().cur=null;saveProg();done(s);}});
      const N=P.steps.length;
      S.storyHTML=`<div style="margin-bottom:10px"><div class="pbar"><i style="width:${Math.round(i/N*100)}%"></i></div><small class="muted">Step ${i+1} of ${N} · ${esc(S.ch)}</small></div>`
        +storyHTML(P.mentor,S.why)+(S.learn?`<div class="lesson">📖 ${md(S.learn)}</div>`:'')
        +`<div class="mission" style="margin-top:10px">🎯 <b>Your task:</b> ${md(S.todo)}</div><div class="where">📍 <b>Where:</b> ${md(S.where)}</div>`
        +`<div class="edhead">🏁 Goal: your page after this step <small>your words can be different</small></div><iframe class="prev goalprev" sandbox="allow-same-origin" title="Goal"></iframe>`;
      b.load(S,st.code);b.setReset(already?st.code:st.start);
      renderInto($('.goalprev',el),P.ref[i],undefined,{scripts:P.js});}
  });
}
window.PK={PROJECTS,H,C,J,W_HTML,W_CSS,W_JS,insCSS,insHTML,insJS,nonDefaultFont,labelLinked,anyHover,hasMedia,grad,transOn,clickThen,noErrors,prep,register,docFor};
window.__PROJ={PROJECTS,insCSS,insHTML,insJS,docFor,prep};
})();
