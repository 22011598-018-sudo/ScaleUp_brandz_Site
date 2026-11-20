const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// page curtain
const curt=document.createElement('div');curt.className='curt';curt.innerHTML='<span>Scaleupbrandz</span>';document.body.append(curt);
const prog=document.createElement('div');prog.className='prog';document.body.append(prog);
const cur=document.createElement('div');cur.className='cur';document.body.append(cur);
const start=()=>{curt.classList.add('out');setTimeout(()=>{$$('[data-split]').forEach(h=>h.classList.add('go'))},350)};
addEventListener('load',()=>setTimeout(start,350));setTimeout(start,2500);addEventListener('pageshow',e=>{if(e.persisted)start()});
$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(!h||h[0]==='#'||h.startsWith('mailto')||h.startsWith('http')||a.target)return;
 a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();curt.classList.remove('out');curt.classList.add('in');setTimeout(()=>location.href=h,650)})});
// split text
const split=(el,cls)=>{const w=el.textContent.trim().split(/\s+/);const keep=[...el.querySelectorAll('em')].map(e=>e.textContent.trim());
 el.innerHTML=w.map(x=>cls==='scrub'?`<span class="w">${x}</span>`:`<span class="w"><i>${x}</i></span>`).join(' ')};
$$('[data-split]').forEach(h=>{const u=$('.u',h);if(u){const t=u.textContent;h.innerHTML=h.innerHTML.replace(/<span class="u">.*?<\/span>/,`@@U@@`);}
 const words=h.innerHTML.split(/\s+/);h.innerHTML=words.map(x=>x==='@@U@@'?`<span class="w"><i><span class="u">scale</span></i></span>`:`<span class="w"><i>${x}</i></span>`).join(' ')});
$$('.scrub').forEach(el=>{const em=$('em',el);const emT=em?em.textContent:'';const parts=el.innerHTML.split(/(<em>.*?<\/em>)/);
 el.innerHTML=parts.map(p=>p.startsWith('<em>')?'<em>'+p.slice(4,-5).split(/\s+/).map(x=>`<span class="w">${x}</span>`).join(' ')+'</em>':p.trim().split(/\s+/).filter(Boolean).map(x=>`<span class="w">${x}</span>`).join(' ')).join(' ')});
// reveal
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
$$('.reveal,.giant').forEach((el,i)=>{el.style.transitionDelay=Math.min(i%4,3)*90+'ms';io.observe(el)});
$('.burger')?.addEventListener('click',()=>$('.links').classList.toggle('open'));
// scroll effects
let ly=0,tk=false;const tabs=$$('.tabbar a'),secs=tabs.map(a=>$(a.getAttribute('href')));
const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;prog.style.transform=`scaleX(${h>0?y/h:0})`;
 const t=$('.top');if(t){t.classList.toggle('sc',y>20);}ly=y;
 $$('[data-p]').forEach(el=>{const r=el.getBoundingClientRect();el.style.transform=`translateY(${(r.top-innerHeight/2)*el.dataset.p}px)`});
 $$('.scrub').forEach(el=>{const r=el.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.3)));const ws=$$('.w',el),n=Math.round(p*ws.length*1.15);ws.forEach((w,i)=>w.classList.toggle('on',i<n))});
 secs.forEach((s,i)=>{if(!s)return;const r=s.getBoundingClientRect();if(r.top<220&&r.bottom>220){tabs.forEach(a=>a.classList.remove('on'));tabs[i].classList.add('on')}});tk=false};
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
// cursor
let mx=0,my=0,cx=0,cy=0;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function loop(){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;cur.style.transform=`translate(${cx-7}px,${cy-7}px)`;requestAnimationFrame(loop)})();
document.addEventListener('mouseover',e=>cur.classList.toggle('big',!!e.target.closest('a,button,summary,.case,.card')));
// magnetic buttons + tilt
if(!rm&&matchMedia('(hover:hover)').matches){
 $$('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
 $$('.case,.stat,.price').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transition='transform .15s';c.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`});c.addEventListener('mouseleave',()=>{c.style.transition='';c.style.transform=''})})}
// counters, bars
$$('[data-count]').forEach(el=>{const t=+el.dataset.count,s=el.dataset.suffix||'';new IntersectionObserver(([e],o)=>{if(!e.isIntersecting)return;o.disconnect();let k=0;const i=setInterval(()=>{k+=1/40;if(k>=1){k=1;clearInterval(i)}el.textContent=Math.round(t*(1-Math.pow(1-k,3)))+s},28)}).observe(el)});
$$('.bt i').forEach(b=>new IntersectionObserver(([e],o)=>{if(e.isIntersecting){b.style.width=b.dataset.w+'%';o.disconnect()}}).observe(b));
// pricing toggle, slider, filter
$$('.tog button').forEach(b=>b.onclick=()=>{$$('.tog button').forEach(x=>x.classList.toggle('on',x===b));$$('[data-m]').forEach(a=>{const f=+a.textContent,t=+a.dataset[b.dataset.bill];let k=0;const i=setInterval(()=>{k+=.1;if(k>=1){k=1;clearInterval(i)}a.textContent=Math.round(f+(t-f)*k)},20)})});
const sl=$('.slider');if(sl){let n=0;const tr=$('.track',sl),c=$$('.sl',sl).length,go=d=>{n=(n+d+c)%c;tr.style.transform=`translateX(-${n*100}%)`};let a=setInterval(()=>go(1),6000);$$('.ctl button',sl).forEach(b=>b.onclick=()=>{go(+b.dataset.d);clearInterval(a)})}
$$('.filt button').forEach(b=>b.onclick=()=>{$$('.filt button').forEach(x=>x.classList.toggle('on',x===b));$$('.cgrid .case').forEach(c=>{const s=b.dataset.f==='all'||c.dataset.t===b.dataset.f;c.style.display=s?'':'none'})});
// forms
const FORM_URL=''; // paste Formspree / Google Apps Script URL here to receive submissions
function save(kind,form){const d=Object.fromEntries(new FormData(form));d.kind=kind;d.date=new Date().toISOString();
 try{const l=JSON.parse(localStorage.getItem('submissions')||'[]');l.push(d);localStorage.setItem('submissions',JSON.stringify(l))}catch(e){}
 if(FORM_URL)fetch(FORM_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}).catch(()=>{});
 form.reset();const ok=$('.ok',form);ok.style.display='block';ok.scrollIntoView({behavior:'smooth',block:'center'})}
const ap=$('#apply');
if(ap){const t2=$$('.tabs button',ap);t2.forEach(b=>b.onclick=()=>{t2.forEach(x=>x.classList.remove('on'));b.classList.add('on');const c=b.dataset.type==='college';ap.dataset.type=b.dataset.type;
 $$('.stu',ap).forEach(e=>{e.classList.toggle('hide',c);$('input',e).required=!c});$$('.col',ap).forEach(e=>{e.classList.toggle('hide',!c);$('input',e).required=c})});
 t2[0].click();ap.onsubmit=e=>{e.preventDefault();save('internship-'+ap.dataset.type,ap);t2[0].click()}}
const ct=$('#contact-form');if(ct)ct.onsubmit=e=>{e.preventDefault();save('contact',ct)};

// fit giant footer wordmark to exact screen width
const fitGiant=()=>{$$('.giant[data-giant]').forEach(el=>{
 el.style.fontSize='100px';el.style.width='max-content';
 const tw=el.getBoundingClientRect().width;el.style.width='';
 const avail=el.parentElement.clientWidth*0.96;
 if(tw>0)el.style.fontSize=Math.floor(100*avail/tw*10)/10+'px'})};
fitGiant();addEventListener('resize',fitGiant);addEventListener('load',fitGiant);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitGiant);