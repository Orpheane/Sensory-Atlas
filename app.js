'use strict';
// All venues and sensory ratings in this demo are fictional examples.
// No user preferences are stored or sent to a server.
const places=[
{name:'Willow Reading Room',type:'Library',noise:1,light:2,crowd:1,quiet:true,detail:'Soft lighting and quiet reading corners',icon:'📚'},
{name:'Juniper Community Hub',type:'Community space',noise:3,light:3,crowd:3,quiet:true,detail:'Flexible activity rooms and a separate lounge',icon:'🏡'},
{name:'Moss & Maple Café',type:'Café',noise:2,light:4,crowd:2,quiet:false,detail:'Bright windows and a compact seating area',icon:'☕'},
{name:'Harbor Market Hall',type:'Market',noise:4,light:4,crowd:5,quiet:false,detail:'Popular indoor market with a lively atmosphere',icon:'🛍️'}];
const names=['Very low','Low','Moderate','High','Very high'];
const sliders=['noise','light','crowd'].map(id=>document.getElementById(id));
const list=document.getElementById('place-list');
const reset=document.getElementById('reset');
function matching(place,p){return ['noise','light','crowd'].filter(k=>place[k]<=p[k]).length;}
function renderPlace(place,score){
 const article=document.createElement('article');article.className='place-card';
 const icon=document.createElement('div');icon.className='place-mark';icon.setAttribute('aria-hidden','true');icon.textContent=place.icon;
 const body=document.createElement('div');body.className='place-body';
 const type=document.createElement('span');type.className='place-type';type.textContent=place.type;
 const h=document.createElement('h4');h.textContent=place.name;
 const description=document.createElement('p');description.textContent=place.detail;
 const stats=document.createElement('div');stats.className='place-stats';
 [['Noise',place.noise],['Light',place.light],['Crowds',place.crowd]].forEach(([name,value])=>{const pill=document.createElement('span');pill.textContent=name+' '+value+'/5';stats.append(pill);});
 const quiet=document.createElement('span');quiet.textContent=place.quiet?'Quiet area noted':'No quiet area recorded';stats.append(quiet);
 body.append(type,h,description,stats);
 const badge=document.createElement('div');badge.className='match-rating '+(score===3?'match-good':score===2?'match-some':'match-low');badge.textContent=score+'/3 match';
 article.append(icon,body,badge);return article;
}
function render(){
 const preferences=Object.fromEntries(sliders.map(el=>[el.id,Number(el.value)]));
 sliders.forEach(el=>{const value=Number(el.value);document.getElementById(el.id+'-value').textContent=names[value-1]+' ('+value+'/5)';el.style.setProperty('--filled',((value-1)*25)+'%');});
 const ranked=places.map(place=>({place,score:matching(place,preferences)})).sort((a,b)=>b.score-a.score||a.place.noise-b.place.noise);
 list.replaceChildren(...ranked.map(p=>renderPlace(p.place,p.score)));
}
sliders.forEach(el=>el.addEventListener('input',render));
reset.addEventListener('click',()=>{sliders.forEach(el=>el.value=3);render();});
render();