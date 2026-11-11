(() => {
  'use strict';
  const root = document.querySelector('.services-showcase');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-showcase-tab]')];
  const panels = [...root.querySelectorAll('[data-showcase-panel]')];
  function activate(tab, focus = false) {
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    panels.forEach(panel => { panel.hidden = panel.dataset.showcasePanel !== tab.dataset.showcaseTab; });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
    });
  });
  const set = (selector, value) => { const el = root.querySelector(selector); if (el) el.textContent = value; };
  const states = {
    social: {
      before: {'social-label':'Losse berichten','social-heading':'Welkom op onze pagina!!!','social-bio':'Wij doen banden. Stuur maar een berichtje voor info.','social-link':'Geen duidelijke contactverwijzing.','social-caption':'Losse onderwerpen, wisselende stijlen en weinig uitleg over de dienstverlening.','social-post="0"':'BANDEN!!','social-post="1"':'Goedemorgen allemaal','social-post="2"':'Onze zaak'},
      after: {'social-label':'Een herkenbare lijn','social-heading':'Veilig op weg, met aandacht voor jouw auto.','social-bio':'Bandenwissel, uitlijning en controle in Gent. Wij helpen je kiezen wat bij jouw auto past.','social-link':'Een afspraak aanvragen via de link in ons profiel.','social-caption':'Wij combineren nuttige tips, een blik in de werkplaats en een duidelijke route naar contact.','social-post="0"':'Wanneer wissel jij je banden?','social-post="1"':'Zo controleren wij je banden','social-post="2"':'Maak kennis met onze werkplaats'}
    },
    email: {
      before: {'mail-subject':'NIEUWSBRIEF!!! NIEUWE BANDEN!!!','mail-title':'Beste klant,','mail-copy':'Wij hebben banden en allerlei andere diensten. Kijk op onze website voor meer informatie. Tot binnenkort!','mail-cta':'Meer info','mail-footer':'Je ontvangt dit voorbeeld als bestaande inschrijver. Uitschrijven.'},
      after: {'mail-subject':'Tijd voor je seizoenswissel? Wij helpen je plannen.','mail-title':'Je bandenwissel, op een moment dat jou past.','mail-copy':'Dag Sam,\n\nWil je jouw banden laten wisselen? Wij bekijken samen welke afspraak past en controleren meteen de staat van je banden.\n\nVraag je voorkeurmoment aan. Wij bevestigen daarna de beschikbare afspraak.','mail-cta':'Mijn voorkeurmoment doorgeven','mail-footer':'Fictief voorbeeld voor een bestaande inschrijver. Voorkeuren aanpassen · Uitschrijven. Er wordt geen e-mail verzonden.'}
    },
    ads: {
      before: {'ad-copy':'WIJ HEBBEN BANDEN!!! Bekijk onze website voor alle info. Goede service en veel mogelijkheden!','ad-title':'Welkom op onze website','ad-cta':'Meer informatie'},
      after: {'ad-copy':'Tijd voor een bandenwissel in Gent?\nWij wisselen je banden en controleren hun staat. Geef je voorkeurmoment door; wij nemen contact op om de afspraak te bevestigen.','ad-title':'Je bandenwissel helder geregeld.','ad-cta':'Afspraak aanvragen'}
    }
  };
  root.querySelectorAll('[data-example-target]').forEach(button => button.addEventListener('click', () => {
    const {exampleTarget: target, exampleState: state} = button.dataset;
    root.querySelectorAll(`[data-example-target="${target}"]`).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const preview = root.querySelector(`[data-${target}-state]`);
    if (preview) preview.setAttribute(`data-${target}-state`, state);
    if (target === 'ads') { const image = root.querySelector('[data-ad-image]'); image.src = state === 'after' ? 'assets/werkplaats.png' : 'assets/banden.png'; }
    Object.entries(states[target][state]).forEach(([key,value]) => set(`[data-${key}]`,value));
  }));
  const queries = {
    banden: ['Bandenwissel in Gent | Bandencentrale Gent','Wij wisselen je banden en controleren hun staat. Ontdek onze diensten in Gent en vraag je voorkeurmoment aan.'],
    uitlijnen: ['Auto uitlijnen in Gent | Bandencentrale Gent','Trekt je auto naar één kant? Wij controleren de uitlijning en bespreken wat jouw auto nodig heeft. Vraag een afspraak in Gent aan.'],
    controle: ['Bandencontrole in Gent | Bandencentrale Gent','Wij bekijken bandenspanning, slijtage en profieldiepte. Maak kennis met onze bandencontrole in Gent en vraag je voorkeurmoment aan.']
  };
  root.querySelector('[data-seo-query]').addEventListener('change', event => { const entry = queries[event.target.value]; if (entry) { set('[data-seo-title]',entry[0]); set('[data-seo-description]',entry[1]); root.querySelectorAll('[data-seo-search-label]').forEach(label => { label.textContent = event.target.options[event.target.selectedIndex].text; }); } });
  root.querySelectorAll('[data-preview-width]').forEach(button => button.addEventListener('click', () => {
    root.querySelector('[data-web-preview]').dataset.device = button.dataset.previewWidth;
    root.querySelectorAll('[data-preview-width]').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
  }));
  const output = root.querySelector('[data-automation-output]');
  const initial = output.innerHTML;
  const run = root.querySelector('[data-run-automation]');
  const reset = root.querySelector('[data-reset-automation]');
  run.addEventListener('click', () => {
    output.innerHTML = '<h3>Aanvraag gestructureerd. Antwoord klaar ter controle.</h3><dl><div><dt>Naam</dt><dd>Sam</dd></div><div><dt>Dienst</dt><dd>Bandenwissel</dd></div><div><dt>Voorkeur</dt><dd>Volgende week dinsdag</dd></div><div><dt>Planning</dt><dd>Nog te bevestigen door een medewerker</dd></div></dl><div class="automation-draft"><strong>Conceptantwoord</strong><p>Dag Sam, bedankt voor je aanvraag. Wij bekijken of dinsdag mogelijk is en nemen contact met je op om een tijdstip te bevestigen.</p></div><p>Wij zetten de aanvraag klaar voor opvolging. In een echte workflow controleert een medewerker de gegevens en beschikbaarheid.</p>';
    run.hidden = true; reset.hidden = false;
  });
  reset.addEventListener('click', () => { output.innerHTML = initial; run.hidden = false; reset.hidden = true; run.focus(); });
  root.querySelectorAll('[data-brand-view]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-brand-view]').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
    const application = root.querySelector('[data-brand-application]');
    application.dataset.brandMode = button.dataset.brandView;
    application.innerHTML = button.dataset.brandView === 'signature' ? '<strong>BG.</strong><div><b>Sam · Klantenservice</b><span>Bandencentrale Gent</span><small>Fictief concept voor een e-mailhandtekening</small></div>' : '<strong>BG.</strong><div><b>Bandencentrale Gent</b><span>Bandenwissel · Uitlijning · Controle</span><small>Fictief visitekaartconcept</small></div>';
  }));
})();
