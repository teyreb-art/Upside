'use strict';
// Wordt in stap 2 aangesloten op een Cloudflare Worker met D1.
// Zonder backend worden antwoorden NIET verzonden of opgeslagen.
const ENDPOINT = '/api/kennismaking';
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
const none = s => s.startsWith('Nog ');
function renderOptions(container,key,multiple){
 choices[key].forEach((value,i)=>{
  const label=document.createElement('label');label.className='choice';
  const input=document.createElement('input');input.type=multiple?'checkbox':'radio';input.name=key;input.value=value;input.id=key+'-'+i;
  const span=document.createElement('span');span.textContent=value;
  label.append(input,span);container.append(label);
  if(multiple)input.addEventListener('change',()=>{
   if(!input.checked)return;
   container.querySelectorAll('input:checked').forEach(other=>{
    if(other===input)return;
    if(none(value)||none(other.value))other.checked=false;
   });
  });
 });
}
document.querySelectorAll('[data-multi]').forEach(el=>renderOptions(el,el.dataset.multi,true));
document.querySelectorAll('[data-single]').forEach(el=>renderOptions(el,el.dataset.single,false));
const form=document.getElementById('intake');const feedback=document.getElementById('feedback');const submit=document.getElementById('submit');
form.addEventListener('submit',async event=>{
 event.preventDefault();feedback.textContent='';
 if(!form.reportValidity())return;
 const value=key=>form.querySelector('input[name="'+key+'"]:checked')?.value||'';
 const many=key=>[...form.querySelectorAll('input[name="'+key+'"]:checked')].map(el=>el.value);
 const payload={company:document.getElementById('company').value.trim(),activities:many('activities'),clients:value('clients'),existing:many('existing'),acquisition:many('acquisition'),services:many('services'),challenge:value('challenge'),photos:value('photos'),budget:value('budget'),notes:document.getElementById('notes').value.trim(),consent:true};
 if(!payload.company){feedback.textContent='Vul je bedrijfsnaam in.';return;}
 submit.disabled=true;submit.textContent='Bezig met verzenden…';
 try{
  const response=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if(!response.ok)throw Error('Opslaan mislukt');
  form.hidden=true;document.getElementById('success').hidden=false;window.scrollTo({top:0,behavior:'smooth'});
 }catch(e){feedback.textContent='Verzenden is nog niet beschikbaar. De beveiligde databasekoppeling moet eerst worden ingesteld.';}
 finally{submit.disabled=false;submit.textContent='Verstuur mijn antwoorden';}
});
