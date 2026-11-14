'use strict';
// De backend /api/kennismaking wordt in de volgende fase gekoppeld aan Cloudflare D1.
const ENDPOINT='/api/kennismaking';
const choices = {
 activities:['Laswerken op maat','Metaalconstructies','Trappen en leuningen','Poorten en afsluitingen','Industriële laswerken','Herstellingen en onderhoud','Andere werkzaamheden','Nog niet actief'],
 existing:['Website','Google Bedrijfsprofiel','Facebookpagina','Instagrampagina','TikTok-account','Logo en huisstijl','Visitekaartjes of flyers','Professioneel e-mailadres','Nog niets van bovenstaande'],
 acquisition:['Mond-tot-mondreclame','Google','Sociale media','Via andere bedrijven of aannemers','Via bestaande klanten','Andere manieren','Nog geen klanten via deze kanalen'],
 services:['Een professionele website laten maken of verbeteren','Beter vindbaar worden op Google (SEO)','Google Bedrijfsprofiel aanmaken of verbeteren','Logo en huisstijl ontwerpen','Sociale media aanmaken of beheren (Instagram, Facebook, TikTok)','Online advertenties (Google Ads / sociale media)','Visitekaartjes, flyers en reclameaffiches','Google Reviews verzamelen via QR-code of NFC-kaart','Professioneel e-mailadres instellen','E-mailmarketing en klantencommunicatie','AI en automatisering van repetitieve taken','Nog niet zeker, ik wil eerst de mogelijkheden bespreken'],
 clients:['Particulieren','Bedrijven','Zowel particulieren als bedrijven','Nog geen vaste klanten'],
 challenge:['Meer klanten vinden','Online zichtbaarheid verbeteren','Professionelere uitstraling creëren','Weinig tijd voor marketing','Nog geen specifieke uitdagingen','Anders / bespreek ik liever tijdens het gesprek'],
 photos:['Ja, professionele foto’s','Ja, foto’s met mijn telefoon','Nog niet, maar ik wil die wel maken','Nog niet, momenteel niet nodig'],
 budget:['Nog niet bepaald','Minder dan €500','€500 – €1.000','€1.000 – €2.000','Meer dan €2.000','Bespreek ik liever persoonlijk']
};
const isNone=s=>s.startsWith('Nog ');
function renderOptions(container,key,multiple){
 choices[key].forEach((value,i)=>{
  const label=document.createElement('label');label.className='intake-choice';
  const input=document.createElement('input');input.type=multiple?'checkbox':'radio';input.name=key;input.value=value;input.id=key+'-'+i;
  const span=document.createElement('span');span.textContent=value;label.append(input,span);container.append(label);
  if(multiple)input.addEventListener('change',()=>{
   if(!input.checked)return;
   container.querySelectorAll('input:checked').forEach(other=>{if(other!==input&&(isNone(value)||isNone(other.value)))other.checked=false;});
  });
 });
}
document.querySelectorAll('[data-multi]').forEach(el=>renderOptions(el.querySelector('.intake-options'),el.dataset.multi,true));
document.querySelectorAll('[data-single]').forEach(el=>renderOptions(el,el.dataset.single,false));
const form=document.getElementById('intake'),steps=[...document.querySelectorAll('.intake-step')],feedback=document.getElementById('feedback');
const prev=document.getElementById('prev'),next=document.getElementById('next'),submit=document.getElementById('submit');let step=0;
function showStep(n){step=n;steps.forEach((s,i)=>s.hidden=i!==step);prev.hidden=step===0;next.hidden=step===steps.length-1;submit.hidden=step!==steps.length-1;feedback.textContent='';const pct=Math.round((step+1)/steps.length*100);document.getElementById('stepLabel').textContent=`Stap ${step+1} van ${steps.length}`;document.getElementById('stepPercent').textContent=pct+'%';document.getElementById('progressFill').style.width=pct+'%';document.getElementById('progress').setAttribute('aria-valuenow',pct);document.querySelector('.intake-shell').scrollIntoView({behavior:'smooth',block:'start'});}
next.addEventListener('click',()=>{if(step===0&&!document.getElementById('company').value.trim()){feedback.textContent='Vul eerst de naam van je bedrijf in.';document.getElementById('company').focus();return;}showStep(Math.min(step+1,steps.length-1));});
prev.addEventListener('click',()=>showStep(Math.max(step-1,0)));
form.addEventListener('submit',async event=>{
 event.preventDefault();feedback.textContent='';
 if(!document.getElementById('company').value.trim()){showStep(0);feedback.textContent='Vul eerst de naam van je bedrijf in.';return;}
 if(!document.getElementById('consent').checked){feedback.textContent='Vink eerst de toestemming aan.';return;}
 const value=key=>form.querySelector('input[name="'+key+'"]:checked')?.value||'';
 const many=key=>[...form.querySelectorAll('input[name="'+key+'"]:checked')].map(el=>el.value);
 const payload={company:document.getElementById('company').value.trim(),activities:many('activities'),clients:value('clients'),existing:many('existing'),acquisition:many('acquisition'),services:many('services'),challenge:value('challenge'),photos:value('photos'),budget:value('budget'),notes:document.getElementById('notes').value.trim(),consent:true};
 submit.disabled=true;submit.textContent='Bezig met verzenden…';
 try{const response=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw Error('Opslaan mislukt');form.hidden=true;document.getElementById('success').hidden=false;document.querySelector('.intake-shell').scrollIntoView({behavior:'smooth'});}
 catch(e){feedback.textContent='Verzenden is nog niet beschikbaar. Eerst moet de beveiligde Cloudflare D1-koppeling worden ingesteld.';}
 finally{submit.disabled=false;submit.textContent='Antwoorden versturen →';}
});
