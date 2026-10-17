const projects = [
 {title:'White & Red Chimera',category:'Weapons',images:['hero.jpg','reverse.jpg','side.jpg'],views:['Hero','Reverse','Side'],desc:'An organic fantasy firearm, pairing sculpted ivory surfaces with deep crimson forms.'},
 {title:'Crimson Wings',category:'Accessories',images:['wings.jpg'],desc:'Angular red membranes and pale horn tips give this wing set a bold, graphic silhouette.'},
 {title:'Crescent Fang',category:'Weapons',images:['sharp sword.jpg'],desc:'A curved fantasy blade with a dramatic hooked profile, contrasting pale edges, and a gold guard.'},
 {title:'Ivory Glaive',category:'Weapons',images:['staff.jpg'],desc:'A sweeping ivory blade, gold collars, and sapphire accents bring an elegant finish to this long-form prop.'},
 {title:'Mimikyu / Fan Study',category:'Characters',images:['pokemon.jpg'],desc:'A stylized low-poly fan-art study of Mimikyu. Pokémon character design belongs to its respective owners.'},
 {title:'Monochrome Shotgun',category:'Weapons',images:['shotgun.jpg'],desc:'A classic pump-action silhouette explored through contrasting pale panels and glossy dark metal.'},
 {title:'Sculpted Longsword',category:'Weapons',images:['short_sword.jpg'],desc:'A pale material study highlighting the slender blade and sculpted hilt geometry.'},
 {title:'Twin Cleaver',category:'Weapons',images:['thick sword.jpg'],desc:'A clay-style form study of opposing broad blades, spine details, and a central grip.'},
 {title:'Scarlet-Band Top Hat',category:'Accessories',images:['hatt.jpg'],desc:'A clean, faceted accessory with a vivid red band and a deep charcoal finish.'}
];
const gallery=document.querySelector('#gallery');
function render(filter='All'){
 gallery.replaceChildren();
 projects.forEach((p,i)=>{
  if(filter!=='All'&&p.category!==filter)return;
  const card=document.createElement('article');card.className='card';
  card.innerHTML=`<button data-project="${i}" aria-label="Inspect ${p.title}"><span class="card-number">${String(i+1).padStart(2,'0')} / ${p.images.length>1?'3 ANGLES':'RENDER'}</span><div class="card-image"><img src="${p.images[0]}" alt="${p.title}" loading="lazy"></div><span class="card-open" aria-hidden="true">↗</span></button><div class="card-info"><h3>${p.title}</h3><span>${p.category}</span></div>`;
  gallery.append(card);
 });
 document.querySelector('#result-count').textContent=`SHOWING ${String(gallery.children.length).padStart(2,'0')} PIECES`;
}
render();
const viewer=document.querySelector('#viewer');let current=0,angle=0;
function showAngle(){
 const p=projects[current];const img=document.querySelector('#viewer-img');img.src=''+p.images[angle];img.alt=p.title+' — '+(p.views?.[angle]||'render');
 document.querySelector('#viewer-title').textContent=p.title;document.querySelector('#viewer-desc').textContent=p.desc;
 document.querySelector('#viewer-category').textContent=`${p.category.toUpperCase()} / ${String(current+1).padStart(2,'0')} — ${angle+1} OF ${p.images.length}`;
 document.querySelector('#prev').hidden=document.querySelector('#next').hidden=p.images.length===1;
 const tabs=document.querySelector('#view-tabs');tabs.replaceChildren();
 if(p.views)p.views.forEach((name,i)=>{const b=document.createElement('button');b.textContent=name;b.classList.toggle('active',i===angle);b.setAttribute('aria-pressed',i===angle);b.addEventListener('click',()=>{angle=i;showAngle()});tabs.append(b)});
}
document.addEventListener('click',event=>{
 const target=event.target.closest('[data-project]');
 if(target){current=Number(target.dataset.project);angle=Number(target.dataset.view||0);showAngle();viewer.showModal();document.body.style.overflow='hidden'}
 const filter=event.target.closest('[data-filter]');
 if(filter){document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===filter);b.setAttribute('aria-pressed',b===filter)});render(filter.dataset.filter)}
});
function step(n){angle=(angle+n+projects[current].images.length)%projects[current].images.length;showAngle()}
document.querySelector('#prev').addEventListener('click',()=>step(-1));document.querySelector('#next').addEventListener('click',()=>step(1));
document.querySelector('#close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('close',()=>document.body.style.overflow='');
viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}});

