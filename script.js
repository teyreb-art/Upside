"use strict";
const questions=[{title:'Wat voor onderneming heb je?',hint:'Kies wat het beste bij jouw aanbod past.',options:['Dienstverlening','Horeca of winkel','Webshop','Creatief of zelfstandig beroep']},{title:'Waar sta je op dit moment?',hint:'Ook als je nog maar net begint, kun je stappen zetten.',options:['Ik bereid mijn start voor','Ik ben net gestart','Ik heb al klanten en wil doorgroeien']},{title:'Wat wil je als eerste verbeteren?',hint:'We stemmen de eerste acties af op jouw prioriteit.',options:['Meer klanten vinden','Online zichtbaarder worden','Tijd besparen','Meer aanvragen via mijn website']},{title:'Hoe ziet jouw online basis eruit?',hint:'Er is geen goed of fout antwoord.',options:['Ik heb nog geen website','Mijn website kan beter','Mijn website staat goed, maar trekt weinig bezoekers','Ik ben vooral actief op social media']},{title:'Waar gaat veel terugkerende tijd naartoe?',hint:'Kies de taak die je het liefst eenvoudiger zou maken.',options:['Vragen en aanvragen beantwoorden','Content en social media','Afspraken en opvolging','Administratie en gegevens overtypen']},{title:'Hoeveel tijd kun je wekelijks vrijmaken?',hint:'Klein beginnen is ook beginnen.',options:['Minder dan 2 uur','2 tot 5 uur','Meer dan 5 uur']}];

function makePlan(answers){const priority=answers[2]||'';const first=priority==='Tijd besparen'?'Wij gaan je terugkerende taken in kaart brengen en onderzoeken waar je de meeste tijd kunt besparen. Daarna werken we een passende automatisering uit.':priority==='Meer aanvragen via mijn website'?'Wij gaan onderzoeken waar bezoekers afhaken en maken de route naar een aanvraag of afspraak duidelijker, op computer én telefoon.':priority==='Online zichtbaarder worden'?'Wij gaan bepalen waar jouw doelgroep actief is en versterken daar je zichtbaarheid met een helder profiel, een duidelijk aanbod en relevante content.':'Wij gaan samen jouw ideale klant en aanbod scherpstellen. Vervolgens werken we een gerichte aanpak uit om de juiste mensen te bereiken.';const sectorTip=answers[0]==='Horeca of winkel'?'Wij gaan je online bedrijfsprofiel nakijken en je locatie, openingsuren en aanbod helder presenteren.':answers[0]==='Webshop'?'Wij gaan je productpagina’s en bestelproces bekijken en werken aan duidelijke productinformatie en eenvoudiger afrekenen.':'Wij gaan jouw aanbod helder verwoorden, zodat bezoekers begrijpen wat je doet, voor wie en hoe ze contact kunnen opnemen.';const automation=answers[4]==='Content en social media'?'Wij gaan een efficiënte contentwerkwijze opzetten met AI als ondersteuning. We bewaken jouw eigen stem en controleren de inhoud voordat die wordt gebruikt.':answers[4]==='Afspraken en opvolging'?'Wij gaan een passend boekingsproces met bevestigingen en herinneringen uitwerken en testen, zodat afspraken eenvoudiger worden opgevolgd.':answers[4]==='Administratie en gegevens overtypen'?'Wij gaan dubbele invoer opsporen en onderzoeken hoe jouw bestaande tools gegevens veilig kunnen uitwisselen.':'Wij gaan antwoorden op veelgestelde vragen voorbereiden en een slimmere opvolging van aanvragen opzetten, met ruimte voor persoonlijke controle.';const report=`JOUW UPWISE GROEIPLAN\nVoorstel voor hoe wij je bij een samenwerking kunnen ondersteunen. De invulling en planning stemmen we samen af.\n\n${answers.join('\n')}\n\n1. Onze eerste focus\n${first}\n\n2. Wij versterken je basis\n${sectorTip} ${answers[3]==='Ik heb nog geen website'?'Wij gaan een overzichtelijke website uitwerken met jouw aanbod en duidelijke contactmogelijkheden.':'Wij gaan je online aanbod en contactmogelijkheden duidelijker maken.'}\n\n3. Slimmer werken\n${automation}\n\nVOORSTEL BIJ SAMENWERKING — 30 DAGEN\nWeek 1: Wij brengen jouw situatie en prioriteiten in kaart.\nWeek 2: Wij werken de eerste gekozen verbetering uit.\nWeek 3: Wij testen en verfijnen de gekozen oplossing.\nWeek 4: Wij bespreken de inzichten en volgende stappen met jou.\n\nBeschikbare tijd: ${answers[5]}. ${answers[5]==='Minder dan 2 uur'?'Wij houden jouw inbreng beperkt en stemmen kort en gericht af.':'Wij stemmen vaste overlegmomenten af op jouw agenda.'}\n\nDeze testversie gebruikt vaste adviesregels, geen live AI-analyse. Geen voorspelling of gegarandeerd resultaat.`;
return {first,sectorTip,automation,report};}

// Navigatie op kleinere schermen.
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    navigation.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Menu openen');
    }
  });
}

// Downloads blijven lokaal; er worden geen gegevens verzonden.
function saveText(filename, text) {
  const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}

// Groeiscan: vaste adviesregels, geen live AI-koppeling.
if (document.body.dataset.page === 'groeiscan') {
  const card = document.querySelector('.scan-card');
  const title = document.querySelector('.page-intro h1');
  const answers = [];
  let step = 0;
  let currentReport = '';
  const weeks = [
    'Wij brengen jouw situatie en prioriteiten in kaart.',
    'Wij werken de eerste gekozen verbetering uit.',
    'Wij testen en verfijnen de gekozen oplossing.',
    'Wij bespreken de inzichten en volgende stappen met jou.'
  ];
  function showQuestion(focusHeading = false) {
    title.textContent = 'Een helder begin voor jouw volgende stap.';
    const question = questions[step];
    card.innerHTML = `
      <div class="step-line"><span>VRAAG ${step+1} / ${questions.length}</span><span>${Math.round(step/questions.length*100)}%</span></div>
      <div class="progress"><i style="width:${step/questions.length*100}%"></i></div>
      <h2 tabindex="-1">${escapeHTML(question.title)}</h2>
      <p>${escapeHTML(question.hint)}</p>
      <div class="options">${question.options.map((option,index) => `
        <button type="button" data-option="${index}" aria-pressed="${answers[step]===option}" class="${answers[step]===option?'active':''}">
          <span>${escapeHTML(option)}</span><span class="radio" aria-hidden="true">${answers[step]===option?'✓':''}</span>
        </button>`).join('')}</div>
      <div class="scan-controls">
        <button type="button" class="quiet" data-previous ${step===0?'disabled':''}>Vorige</button>
        <button type="button" class="button" data-next ${!answers[step]?'disabled':''}>${step===questions.length-1?'Bekijk mijn groeiplan':'Volgende'}</button>
      </div>`;
    card.querySelectorAll('[data-option]').forEach(button => button.addEventListener('click', () => {
      answers[step] = question.options[Number(button.dataset.option)];
      card.querySelectorAll('[data-option]').forEach(optionButton => {
        const selected = optionButton === button;
        optionButton.classList.toggle('active', selected);
        optionButton.setAttribute('aria-pressed', String(selected));
        optionButton.querySelector('.radio').textContent = selected ? '✓' : '';
      });
      card.querySelector('[data-next]').disabled = false;
    }));
    card.querySelector('[data-previous]').addEventListener('click', () => { if(step>0){step--;showQuestion(true);} });
    card.querySelector('[data-next]').addEventListener('click', () => {
      if (!answers[step]) return;
      if (step === questions.length-1) showReport();
      else {step++;showQuestion(true);}
    });
    if(focusHeading) card.querySelector('h2').focus({preventScroll:true});
  }
  function showReport() {
    const plan = makePlan(answers);
    currentReport = plan.report;
    const basis = plan.sectorTip+' '+(answers[3]==='Ik heb nog geen website'
      ? 'Wij gaan een overzichtelijke website uitwerken met jouw aanbod en duidelijke contactmogelijkheden.'
      : 'Wij gaan je online aanbod en contactmogelijkheden duidelijker maken.');
    const timing = answers[5]==='Minder dan 2 uur'
      ? 'Wij houden jouw inbreng beperkt en stemmen kort en gericht af.'
      : 'Wij stemmen vaste overlegmomenten af op jouw agenda.';
    title.textContent = 'Een volgende stap die bij jou past.';
    card.innerHTML = `<div class="report">
      <p class="section-label">JOUW PRIORITEIT · ${escapeHTML(answers[2])}</p>
      <h2 tabindex="-1">Zo kunnen wij jouw groei ondersteunen.</h2>
      <p>Een voorstel voor jouw onderneming in ${escapeHTML(answers[0].toLowerCase())}. Zo kan onze aanpak eruitzien als we samenwerken; de invulling en planning stemmen we samen af.</p>
      ${[['Onze eerste focus',plan.first],['Wij versterken je online basis',basis],['Wij maken ruimte met automatisering',plan.automation]].map(([heading,text])=>`<article><div><h3>${escapeHTML(heading)}</h3><p>${escapeHTML(text)}</p></div></article>`).join('')}
      <h3>Voorstel voor onze eerste 30 dagen</h3>
      <div class="weeks">${weeks.map((text,index)=>`<div><span>WEEK ${index+1}</span><p>${escapeHTML(text)}</p></div>`).join('')}</div>
      <p>${timing}</p>
      <button type="button" class="button" data-download>Bewaar mijn groeiplan</button>
      <button type="button" class="quiet restart" data-restart>Antwoorden aanpassen</button>
      <div class="report-end"><h3>Je hoeft niet alles alleen te doen.</h3><p>Wij denken met je mee en nemen de uitvoering samen door. Jij bepaalt of en wanneer je verder wilt.</p><a class="text-link" href="diensten.html">Ontdek hoe we kunnen helpen</a></div>
    </div>`;
    card.querySelector('[data-download]').addEventListener('click', event => {
      saveText('Upwise-groeiplan.txt', currentReport);
      event.currentTarget.textContent = 'Download opnieuw';
    });
    card.querySelector('[data-restart]').addEventListener('click', () => {step=0;showQuestion(true);});
    card.querySelector('h2').focus({preventScroll:true});
    card.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  showQuestion();
}

// Groei & resultaten: rekent uitsluitend met eigen aannames.
if (document.body.dataset.page === 'resultaten') {
  const inputs = Array.from(document.querySelectorAll('.calc-inputs input'));
  const result = document.querySelector('.calc-result');
  const euro = value => new Intl.NumberFormat('nl-BE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
  result.setAttribute('aria-live','polite');
  function recalculate() {
    const [visitors,rate,improve,value,margin,cost] = inputs.map(input => {
      const number = Number(input.value);
      return Math.min(Number(input.max),Math.max(Number(input.min),Number.isFinite(number)?number:0));
    });
    const conversions = visitors*rate/100;
    const extra = Math.min(visitors-conversions,conversions*improve/100);
    const revenue = extra*value;
    const profit = revenue*margin/100;
    result.querySelector('strong').textContent = euro(revenue);
    const values = result.querySelectorAll('b');
    values[0].textContent = extra.toLocaleString('nl-BE',{maximumFractionDigits:1});
    values[1].textContent = euro(profit);
    values[2].textContent = euro(profit-cost);
    values[3].textContent = cost>0 ? ((profit-cost)/cost*100).toLocaleString('nl-BE',{maximumFractionDigits:0})+'%' : 'Niet berekenbaar';
  }
  inputs.forEach(input => input.addEventListener('input',recalculate));
  recalculate();
}

// Native POST lets Netlify process the form and show the confirmation page.
if (document.body.dataset.page === 'contact') {
 const leadForm = document.querySelector('#lead-form');
 leadForm?.addEventListener('submit', event => {
  if (location.protocol === 'file:') {
   event.preventDefault();
   leadForm.querySelector('[role="status"]').textContent = 'Je bekijkt de website lokaal. Het formulier werkt na publicatie en activering van Netlify Forms. Je kunt ons nu al via WhatsApp of e-mail bereiken.';
  }
 });
}
