document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{let t=b.dataset.copy;try{await navigator.clipboard.writeText(t);b.textContent='Copied';setTimeout(()=>b.textContent='Copy HEX',1500)}catch(e){prompt('Copy HEX:',t)}}));
// v10: move only the decorative petal pattern; the approved lockup remains stationary.
(()=>{
  const hero=document.querySelector('.landing-stage .landing-lockup');
  if(!hero || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let queued=false;
  const update=()=>{
    queued=false;
    const bounds=hero.getBoundingClientRect();
    if(bounds.bottom<0 || bounds.top>window.innerHeight) return;
    const offset=-window.scrollY*0.20;
    hero.style.setProperty('--petal-scroll',offset.toFixed(1)+'px');
  };
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});
  update();
})();
