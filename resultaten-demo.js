'use strict';
// Fictieve profielgegevens; geen externe Google-koppeling.
(() => {
  const root = document.querySelector('.gbp-demo');
  if (!root) return;
  const versions = {
    before: {
      status: 'Voor optimalisatie', rating: '3,1', stars: '★★★☆☆', reviews: '9 reviews · fictief', photoNote: 'Donker · onscherp · verkeerde uitsnede',
      description: 'Banden te koop. Bel maar.',
      hours: 'Uren onbekend',
      services: 'Banden',
      link: 'Geen website toegevoegd'
    },
    after: {
      status: 'Na optimalisatie', rating: '4,7', stars: '★★★★★', reviews: '42 reviews · fictief', photoNote: 'Helder · scherp · herkenbare werkplaats',
      description: 'Bandencentrale in Gent voor bandenwissels, uitlijning en bandencontrole. Voor particulieren en ondernemers, met persoonlijk advies over passende banden.',
      hours: 'Ma–vr 08.30–18.00 · Za 09.00–13.00',
      services: 'Bandenwissel · Uitlijning · Bandencontrole',
      link: 'Website en afspraakmogelijkheid toegevoegd'
    }
  };
  root.querySelectorAll('[data-gbp-mode]').forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.dataset.gbpMode;
      const version = versions[mode];
      if (!version) return;
      root.querySelectorAll('[data-gbp-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      for (const key of ['status','description','hours','services','link']) {
        root.querySelector('[data-gbp-'+key+']').textContent = version[key];
      }
      root.querySelector('[data-gbp-website]').hidden = mode !== 'after';
      root.querySelector('[data-gbp-rating]').textContent = version.rating;
      root.querySelector('[data-gbp-stars]').textContent = version.stars;
      root.querySelector('[data-gbp-stars]').setAttribute('aria-label', version.rating + ' van 5 sterren');
      root.querySelector('[data-gbp-reviews]').textContent = version.reviews;
      root.querySelector('[data-gbp-photo]').classList.toggle('gbp-photo-before', mode === 'before');
      root.querySelector('.google-demo-shell').dataset.demoState = mode;
      root.querySelector('[data-gbp-photo-note]').textContent = version.photoNote;
      root.querySelector('[data-gbp-photo-img]').alt = mode === 'before'
        ? 'AI-gegenereerd voorbeeld van een bandencentrale; vóór: donker, onscherp en onhandig bijgesneden'
        : 'AI-gegenereerd voorbeeld van dezelfde bandencentrale; na: helder en professioneel gepresenteerd';
    });
  });
})();

// Galerij: eigen afbeeldingen; geen foto's van Google overgenomen.
(() => {
 const root=document.querySelector('.gbp-demo');if(!root)return;
 const main=root.querySelector('[data-gbp-photo-img]');
 root.querySelectorAll('[data-gallery-src]').forEach(button=>button.addEventListener('click',()=>{
  main.src=button.dataset.gallerySrc;
  main.alt='AI-gegenereerde voorbeeldfoto: '+button.dataset.galleryAlt;
  root.querySelectorAll('[data-gallery-src]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 }));
})();
