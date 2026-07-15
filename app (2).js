// ---- Nav shadow on scroll ----
const nav=document.getElementById('nav');
if(nav){addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10));}

// ---- Mobile menu ----
const burger=document.getElementById('burger'),navlinks=document.getElementById('navlinks');
if(burger&&navlinks){
  burger.addEventListener('click',()=>navlinks.classList.toggle('open'));
  navlinks.querySelectorAll('a').forEach(a=>{
    if(!a.closest('.dd')||!a.nextElementSibling){a.addEventListener('click',()=>navlinks.classList.remove('open'));}
  });
}

// ---- Reveal on scroll ----
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ---- Count-up stats ----
const cio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,target=+el.dataset.count,suffix=el.dataset.suffix||'';
    let n=0;const step=Math.max(1,Math.ceil(target/40));
    const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t);}el.textContent=n+suffix;},28);
    cio.unobserve(el);
  });
},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(c=>cio.observe(c));

// ---- Hero temp drop 95 -> 72 ----
(function(){
  const el=document.getElementById('tempNum');
  if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let t=95;el.textContent=t+'°';
  const iv=setInterval(()=>{t--;el.textContent=t+'°';if(t<=72)clearInterval(iv);},70);
})();

// ---- Booking / contact form (client-side success state) ----
document.querySelectorAll('[data-form]').forEach(form=>{
  const btn=form.querySelector('[data-submit]');
  if(!btn)return;
  btn.addEventListener('click',()=>{
    const name=form.querySelector('[name="name"]');
    const phone=form.querySelector('[name="phone"]');
    let ok=true;
    [name,phone].forEach(f=>{if(f&&!f.value.trim()){f.style.borderColor='var(--red)';ok=false;}else if(f){f.style.borderColor='';}});
    if(!ok)return;
    const inner=form.querySelector('[data-form-inner]');
    const success=form.querySelector('[data-form-success]');
    if(inner)inner.style.display='none';
    if(success)success.classList.add('show');
  });
});


// ---- Hero comfort gauge: cool the room 98 -> 72, slide knob to comfort ----
(function(){
  var knob=document.getElementById('gaugeKnob'), cool=document.getElementById('gaugeCool');
  if(!knob||!cool) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){knob.style.left='88%';return;}
  var t=98, target=72, cur=12, end=88;
  cool.textContent='98\u00B0'; knob.style.left=cur+'%';
  var iv=setInterval(function(){
    if(t>target){t--; cool.textContent=t+'\u00B0';}
    if(cur<end){cur+=1.35; knob.style.left=Math.min(cur,end)+'%';}
    if(t<=target && cur>=end){clearInterval(iv);}
  },55);
})();
