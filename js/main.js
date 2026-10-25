// Andre M. Caspe portfolio scripts
const r=document.documentElement;
try{const t=localStorage.getItem('theme');if(t)r.dataset.theme=t}catch(e){}
document.getElementById('theme').onclick=()=>{
const dark=r.dataset.theme?r.dataset.theme==='dark':!matchMedia('(prefers-color-scheme: light)').matches;
const next=dark?'light':'dark';
const apply=()=>{r.dataset.theme=next;try{localStorage.setItem('theme',next)}catch(e){}};
if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.startViewTransition(apply)}
else{r.classList.add('theming');apply();setTimeout(()=>r.classList.remove('theming'),500)}};
const nav=document.getElementById('nav'),mb=document.getElementById('menu');
mb.onclick=()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');mb.setAttribute('aria-expanded',false)}});
const links=[...nav.querySelectorAll('a')];
const setOn=h=>links.forEach(a=>{const on=a.getAttribute('href')===h;a.classList.toggle('on',on);on?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')});
links.forEach(a=>a.addEventListener('click',()=>setOn(a.getAttribute('href'))));
const spy=()=>{let cur='';links.forEach(a=>{const t=document.querySelector(a.getAttribute('href'));if(t&&t.getBoundingClientRect().top<=140)cur=a.getAttribute('href')});if(innerHeight+scrollY>=document.body.scrollHeight-4)cur='#contact';setOn(cur)};
addEventListener('scroll',spy,{passive:true});spy();
document.getElementById('f').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);
const body=d.get('m')+'\n\n— '+d.get('n')+' ('+d.get('e')+')';
location.href='mailto:andrecaspe117@gmail.com?subject='+encodeURIComponent(d.get('s')||'Portfolio inquiry')+'&body='+encodeURIComponent(body)};
// Project gallery images (files in assets/images/screenshots)
const shots=[
  {s:"assets/images/screenshots/01-login.jpg",t:"Staff and admin login",c:"Staff and admins sign in here to reach their dashboards."},
  {s:"assets/images/screenshots/02-browse-bikes.jpg",t:"Browse bikes",c:"Customers search the bike list, see the price per hour and tap Rent Now."},
  {s:"assets/images/screenshots/03-rent-bike.jpg",t:"Rent a bike",c:"The rental form works out the total live from the hours entered."},
  {s:"assets/images/screenshots/04-staff-dashboard.jpg",t:"Staff dashboard",c:"Staff track total, available, active and overdue bikes, and mark returns."},
  {s:"assets/images/screenshots/05-admin-dashboard.jpg",t:"Admin dashboard",c:"Admins see inventory status, a rental summary and the latest rentals."},
  {s:"assets/images/screenshots/06-add-bike.jpg",t:"Add a bike",c:"New bikes are added with a name, type, hourly price and photo."}
];
(()=>{const gi=document.getElementById('gimg'),gc=document.getElementById('gcap'),th=document.getElementById('thumbs'),dl=document.getElementById('dlg'),di=document.getElementById('dimg');
const show=i=>{const s=shots[i];gi.src=s.s;gi.alt=s.t+' screen of the Bike Rental System';gc.innerHTML='<b></b> '+'';gc.firstChild.textContent=s.t+'.';gc.append(' '+s.c);[...th.children].forEach((b,j)=>b.setAttribute('aria-selected',j===i))};
shots.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',s.t);const m=document.createElement('img');m.src=s.s;m.alt='';b.append(m);b.onclick=()=>show(i);th.append(b)});
gi.onclick=()=>{di.src=gi.src;di.alt=gi.alt;dl.showModal()};dl.onclick=()=>dl.close();show(0)})();
