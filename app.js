'use strict';

// Fictional venues, sample sensory ratings, and approximate positions on an
// illustrated neighborhood. This is not real geodata or a navigation service.
const places = [
  {id:'willow',name:'Willow Reading Room',type:'Library',noise:1,light:2,crowd:1,quiet:true,detail:'Soft lighting and quiet reading corners',icon:'📚',x:29,y:30},
  {id:'juniper',name:'Juniper Community Hub',type:'Community space',noise:3,light:3,crowd:3,quiet:true,detail:'Flexible activity rooms and a separate lounge',icon:'🏡',x:72,y:28},
  {id:'moss',name:'Moss & Maple Café',type:'Café',noise:2,light:4,crowd:2,quiet:false,detail:'Bright windows and a compact seating area',icon:'☕',x:51,y:56},
  {id:'harbor',name:'Harbor Market Hall',type:'Market',noise:4,light:4,crowd:5,quiet:false,detail:'Popular indoor market with a lively atmosphere',icon:'🛍️',x:85,y:70}
];
const names=['Very low','Low','Moderate','High','Very high'];
const dimensions=['noise','light','crowd'];
const sliders=dimensions.map(id=>document.getElementById(id));
const list=document.getElementById('place-list');
const reset=document.getElementById('reset');
const pinLayer=document.getElementById('map-pins');
const mapDetails=document.getElementById('map-panel-places');
const routesPanel=document.getElementById('map-panel-routes');
const mapCanvas=document.getElementById('map-canvas');
const routeLayer=document.getElementById('route-lines');
const zoneLayer=document.getElementById('sensory-areas');
const placesButton=document.getElementById('view-places');
const routesButton=document.getElementById('view-routes');
const quietRouteButton=document.getElementById('select-route-quiet');
const directRouteButton=document.getElementById('select-route-direct');
let selectedPlaceId='willow';
function setMapView(view){
  const routes=view==='routes';
  placesButton.setAttribute('aria-pressed',String(!routes));
  routesButton.setAttribute('aria-pressed',String(routes));
  mapDetails.hidden=routes;
  routesPanel.hidden=!routes;
  pinLayer.hidden=routes;
  routeLayer.hidden=!routes;
  document.getElementById('map-key-places').hidden=routes;
  document.getElementById('map-key-routes').hidden=!routes;
  mapCanvas.dataset.view=view;
}
function setRouteChoice(choice){
  mapCanvas.dataset.route=choice;
  quietRouteButton.setAttribute('aria-pressed',String(choice==='quiet'));
  directRouteButton.setAttribute('aria-pressed',String(choice==='direct'));
  quietRouteButton.querySelector('em').textContent=choice==='quiet'?'Selected route':'Compare this route';
  directRouteButton.querySelector('em').textContent=choice==='direct'?'Selected route':'Compare this route';
}
placesButton.addEventListener('click',()=>setMapView('places'));
routesButton.addEventListener('click',()=>setMapView('routes'));
quietRouteButton.addEventListener('click',()=>setRouteChoice('quiet'));
directRouteButton.addEventListener('click',()=>setRouteChoice('direct'));
document.getElementById('show-zones').addEventListener('change',event=>{
  zoneLayer.hidden=!event.target.checked;
});
setMapView('places');
setRouteChoice('quiet');

function currentPreferences(){
  return Object.fromEntries(sliders.map(el=>[el.id,Number(el.value)]));
}
function matching(place,p){
  return dimensions.filter(k=>place[k]<=p[k]).length;
}
function matchClass(score){return score===3?'match-good':score===2?'match-some':'match-low';}
function makeElement(tag,className,text){
  const el=document.createElement(tag);
  if(className)el.className=className;
  if(text!==undefined)el.textContent=text;
  return el;
}
function renderPlace(place,score){
  const article=makeElement('article','place-card');
  article.dataset.placeId=place.id;
  const icon=makeElement('div','place-mark',place.icon);
  icon.setAttribute('aria-hidden','true');
  const body=makeElement('div','place-body');
  const type=makeElement('span','place-type',place.type);
  const heading=makeElement('h4','',place.name);
  const description=makeElement('p','',place.detail);
  const stats=makeElement('div','place-stats');
  [['Noise',place.noise],['Light',place.light],['Crowds',place.crowd]].forEach(([name,value])=>{
    stats.append(makeElement('span','',name+' '+value+'/5'));
  });
  stats.append(makeElement('span','',place.quiet?'Quiet area noted':'No quiet area recorded'));
  const seeOnMap=makeElement('button','show-on-map','Show on map');
  seeOnMap.type='button';
  seeOnMap.setAttribute('aria-label','Show '+place.name+' on the concept map');
  seeOnMap.addEventListener('click',()=>{
    setMapView('places');
    selectPlace(place.id);
    document.querySelector('.map-demo').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
    const pin=Array.from(pinLayer.querySelectorAll('.map-pin')).find(btn=>btn.dataset.placeId===place.id);
    if(pin)pin.focus({preventScroll:true});
  });
  body.append(type,heading,description,stats,seeOnMap);
  const badge=makeElement('div','match-rating '+matchClass(score),score+'/3 match');
  article.append(icon,body,badge);
  return article;
}
function makePin(place,score){
  const btn=makeElement('button','map-pin '+matchClass(score));
  btn.type='button';
  btn.dataset.placeId=place.id;
  btn.style.left=place.x+'%';
  btn.style.top=place.y+'%';
  btn.setAttribute('aria-label',place.name+', '+place.type+', '+score+' of 3 sensory preferences matched. Select for details.');
  btn.setAttribute('aria-pressed',selectedPlaceId===place.id?'true':'false');
  const symbol=makeElement('span','map-pin-symbol');symbol.setAttribute('aria-hidden','true');
  symbol.append(makeElement('span','map-pin-emoji',place.icon));
  const label=makeElement('span','map-pin-label',place.name);label.setAttribute('aria-hidden','true');
  btn.append(symbol,label);
  btn.addEventListener('click',()=>selectPlace(place.id));
  return btn;
}
function selectPlace(id){
  selectedPlaceId=id;
  const place=places.find(candidate=>candidate.id===id);
  if(!place)return;
  const score=matching(place,currentPreferences());
  document.getElementById('map-detail-icon').textContent=place.icon;
  document.getElementById('map-detail-type').textContent=place.type+' · Fictional venue';
  document.getElementById('map-detail-name').textContent=place.name;
  document.getElementById('map-detail-description').textContent=place.detail;
  const match=document.getElementById('map-detail-match');
  match.textContent=score+' of 3 preferences matched';
  match.className='map-place-match '+matchClass(score);
  document.getElementById('map-detail-noise').textContent='Noise: '+place.noise+'/5 · '+names[place.noise-1];
  document.getElementById('map-detail-light').textContent='Light: '+place.light+'/5 · '+names[place.light-1];
  document.getElementById('map-detail-crowd').textContent='Crowds: '+place.crowd+'/5 · '+names[place.crowd-1];
  document.getElementById('map-detail-quiet').textContent=place.quiet?'✓ Quiet area noted':'No quiet area recorded';
  pinLayer.querySelectorAll('.map-pin').forEach(pin=>pin.setAttribute('aria-pressed',String(pin.dataset.placeId===id)));
  list.querySelectorAll('.place-card').forEach(card=>card.classList.toggle('is-selected',card.dataset.placeId===id));
}
function render(){
  const preferences=currentPreferences();
  sliders.forEach(el=>{
    const value=Number(el.value);
    document.getElementById(el.id+'-value').textContent=names[value-1]+' ('+value+'/5)';
    el.style.setProperty('--filled',((value-1)*25)+'%');
  });
  const ranked=places.map(place=>({place,score:matching(place,preferences)}))
    .sort((a,b)=>b.score-a.score||a.place.noise-b.place.noise);
  list.replaceChildren(...ranked.map(item=>renderPlace(item.place,item.score)));
  pinLayer.replaceChildren(...places.map(place=>makePin(place,matching(place,preferences))));
  document.getElementById('results-counter').textContent=ranked.filter(item=>item.score===3).length+' full matches · '+places.length+' places';
  if(selectedPlaceId)selectPlace(selectedPlaceId);
}
sliders.forEach(el=>el.addEventListener('input',render));
reset.addEventListener('click',()=>{sliders.forEach(el=>el.value=3);render();});
render();

// Theme follows OS preference until explicitly overridden, then saves only
// this display setting locally. No account, location, or health data is used.
const themeButton=document.getElementById('theme-toggle');
const themeLabel=document.getElementById('theme-label');
const themeIcon=document.getElementById('theme-icon');
function safeSave(key,value){try{localStorage.setItem(key,value);}catch(e){/* storage unavailable */}}
function applyTheme(theme){
  document.documentElement.dataset.theme=theme;
  const dark=theme==='dark';
  themeButton.setAttribute('aria-pressed',String(dark));
  themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  themeLabel.textContent=dark?'Light mode':'Dark mode';
  themeIcon.textContent=dark?'☀':'☾';
  document.querySelector('meta[name="theme-color"]').content=dark?'#111d24':'#f6f8f7';
}
applyTheme(document.documentElement.dataset.theme==='dark'?'dark':'light');
themeButton.addEventListener('click',()=>{
  const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
  applyTheme(theme);safeSave('sensory-atlas-theme',theme);
});

const panel=document.getElementById('accessibility-panel');
const panelToggle=document.getElementById('accessibility-toggle');
const panelClose=document.getElementById('accessibility-close');
function setPanel(open){
  panel.hidden=!open;
  panelToggle.setAttribute('aria-expanded',String(open));
  if(open)panelClose.focus();else panelToggle.focus();
}
panelToggle.addEventListener('click',()=>setPanel(panel.hidden));
panelClose.addEventListener('click',()=>setPanel(false));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!panel.hidden){setPanel(false);}
});
const textSizeButtons=Array.from(document.querySelectorAll('[data-text-choice]'));
function setTextSize(size,save=true){
  document.documentElement.dataset.textSize=size;
  textSizeButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.textChoice===size)));
  if(save)safeSave('sensory-atlas-text-size',size);
}
setTextSize(['normal','large','extra'].includes(document.documentElement.dataset.textSize)?
  document.documentElement.dataset.textSize:'normal',false);
textSizeButtons.forEach(button=>button.addEventListener('click',()=>setTextSize(button.dataset.textChoice)));
document.getElementById('reset-accessibility').addEventListener('click',()=>{
  setTextSize('normal',false);
  const systemTheme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  applyTheme(systemTheme);
  try{localStorage.removeItem('sensory-atlas-text-size');localStorage.removeItem('sensory-atlas-theme');}catch(e){}
});

const readButton=document.getElementById('read-page');
const stopButton=document.getElementById('stop-reading');
const speechStatus=document.getElementById('speech-status');
const speechRate=document.getElementById('speech-rate');
const speechSupported=('speechSynthesis' in window)&&('SpeechSynthesisUtterance' in window);
let speechSession=0;
function stopReading(message='Reading stopped.'){
  speechSession+=1;
  if(speechSupported)window.speechSynthesis.cancel();
  readButton.disabled=!speechSupported;
  stopButton.disabled=true;
  speechStatus.textContent=message;
}
if(!speechSupported){
  readButton.disabled=true;
  speechRate.disabled=true;
  speechStatus.textContent='Read aloud is not supported by this browser. You can use your device screen reader.';
}
readButton.addEventListener('click',()=>{
  if(!speechSupported)return;
  stopReading('Starting read aloud.');
  const chunks=Array.from(document.querySelectorAll('main h1, main h2, main h3, main p, main li'))
    .filter(node=>node.getClientRects().length>0&&!node.closest('.place-list')&&!node.closest('.map-detail'))
    .map(node=>node.textContent.trim()).filter(Boolean);
  if(!chunks.length){speechStatus.textContent='No readable content was found.';return;}
  const session=++speechSession;
  let index=0;
  readButton.disabled=true;stopButton.disabled=false;
  speechStatus.textContent='Reading aloud. Select Stop to end.';
  function speakNext(){
    if(session!==speechSession)return;
    if(index>=chunks.length){stopReading('Finished reading the page.');return;}
    const utterance=new SpeechSynthesisUtterance(chunks[index++]);
    utterance.lang='en-US';
    utterance.rate=Number(speechRate.value);
    utterance.onend=()=>{if(session===speechSession)speakNext();};
    utterance.onerror=(event)=>{
      if(session===speechSession)stopReading('Reading could not continue. Try again or use a screen reader.');
    };
    window.speechSynthesis.speak(utterance);
  }
  speakNext();
});
stopButton.addEventListener('click',()=>stopReading());
window.addEventListener('pagehide',()=>{if(speechSupported)window.speechSynthesis.cancel();});


// Optional visual upgrades. Existing SVG illustrations stay visible until the
// real curated image files are present, so Pages never shows broken images.
document.querySelectorAll('img[data-concept-src]').forEach(target=>{
  const candidate=new Image();
  candidate.onload=()=>{target.src=candidate.src;};
  candidate.src=target.dataset.conceptSrc;
});
const accessibilityVisual=document.getElementById('accessibility-visual');
if(accessibilityVisual){
  const picture=accessibilityVisual.querySelector('img');
  const test=new Image();
  test.onload=()=>{picture.src=test.src;accessibilityVisual.hidden=false;};
  test.src=picture.getAttribute('src');
}
