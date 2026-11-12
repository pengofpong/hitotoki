(() => {
  const palette = [
    {name:'Night Sky',hex:'#262A50'}, {name:'Lunar White',hex:'#EBF2FA'},
    {name:'Day Sky',hex:'#3083DC'}, {name:'Sunset Orange',hex:'#FFA83F'},
    {name:'Solar Yellow',hex:'#F3C969'}
  ];
  const head=document.getElementById('wcag-head'), body=document.getElementById('wcag-body');
  if(!head||!body)return;
  const luminance = hex => { const channels=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4)); return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722; };
  const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)};
  const header=document.createElement('tr'); const corner=document.createElement('th');corner.textContent='Text ↓ / Background →';corner.scope='col';header.append(corner);
  palette.forEach(c=>{const th=document.createElement('th');th.scope='col';th.textContent=c.name;header.append(th)});head.append(header);
  const pair=document.getElementById('wcag-pair'), ratio=document.getElementById('wcag-ratio'),criteria=document.getElementById('wcag-criteria'),sample=document.getElementById('wcag-sample');
  let active=null;
  function select(fg,bg,button){
    if(active)active.setAttribute('aria-pressed','false');active=button;button.setAttribute('aria-pressed','true');
    const r=contrast(fg.hex,bg.hex);pair.textContent=fg.name+' on '+bg.name;ratio.textContent=r.toFixed(2)+':1 contrast ratio';
    sample.style.color=fg.hex;sample.style.backgroundColor=bg.hex;criteria.replaceChildren();
    [['AA · Normal',4.5],['AA · Large',3],['AAA · Normal',7],['AAA · Large',4.5]].forEach(([label,limit])=>{const el=document.createElement('span');const passes=r>=limit;el.className='wcag-result '+(passes?'pass':'fail');el.textContent=label+' · '+(passes?'Pass':'Fail');criteria.append(el)});
  }
  palette.forEach(fg=>{const tr=document.createElement('tr');const th=document.createElement('th');th.scope='row';th.textContent=fg.name;tr.append(th);palette.forEach(bg=>{const td=document.createElement('td'),btn=document.createElement('button'),r=contrast(fg.hex,bg.hex);btn.type='button';btn.className='wcag-cell';btn.style.backgroundColor=bg.hex;btn.style.color=fg.hex;btn.textContent=r.toFixed(2)+':1';btn.setAttribute('aria-label',fg.name+' text on '+bg.name+' background: '+r.toFixed(2)+' to 1 contrast ratio');btn.setAttribute('aria-pressed','false');btn.title=fg.name+' on '+bg.name;btn.addEventListener('click',()=>select(fg,bg,btn));td.append(btn);tr.append(td)});body.append(tr)});
  select(palette[0],palette[1],body.rows[0].cells[2].firstElementChild);
})();
