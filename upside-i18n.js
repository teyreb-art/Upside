
const upsideLanguages = ['nl', 'fr', 'en', 'tr', 'es'];

const upsideSelect = document.getElementById('upside-language');

const upsideLanguageNames = {
  nl: 'Nederlands',
  fr: 'Français',
  en: 'English',
  tr: 'Türkçe',
  es: 'Español'
};

function upsideNormalize(value) {
  return value.replace(/\s+/g, ' ').trim();
}

// Verzamel de oorspronkelijke teksten op de homepage.
const upsideNodes = [];

if (document.body.dataset.page === 'home') {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  let node;

  while ((node = walker.nextNode())) {
    if (
      node.parentElement &&
      (
        ['SCRIPT', 'STYLE', 'SVG', 'OPTION'].includes(
          node.parentElement.tagName
        ) ||
        node.parentElement.closest('.upside-lang-wrap')
      )
    ) {
      continue;
    }

    if (upsideNormalize(node.nodeValue)) {
      upsideNodes.push(node);
    }
  }
}

// Onthoud de originele tekstnodes.
const upsideOriginalTexts = upsideNodes.map(
  node => node.nodeValue
);

function upsideGetSavedLanguage() {
  const param = new URLSearchParams(
    window.location.search
  ).get('lang');

  if (upsideLanguages.includes(param)) {
    return param;
  }

  try {
    const saved =
      localStorage.getItem('upside-language') ||
      localStorage.getItem('upside-lang');

    if (upsideLanguages.includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.warn('Taalvoorkeur niet beschikbaar.');
  }

  return 'nl';
}

function upsideApplyLanguage(language) {
  const lang = upsideLanguages.includes(language)
    ? language
    : 'nl';

  // Bewaar de taal voor andere pagina's.
  try {
    localStorage.setItem('upside-language', lang);
    localStorage.setItem('upside-lang', lang);
  } catch (error) {
    console.warn('Taalvoorkeur kon niet worden opgeslagen.');
  }

  document.documentElement.lang =
    lang === 'nl' ? 'nl-BE' : lang;

  if (upsideSelect) {
    upsideSelect.value = lang;
  }

  // Vertaal de homepage.
  if (document.body.dataset.page === 'home') {
    if (upsideNodes.length === upsideI18nData.source.length) {
      const values = lang === 'nl'
        ? upsideI18nData.source
        : upsideI18nData.translations[lang];

      upsideNodes.forEach((node, index) => {
        const original = upsideOriginalTexts[index];
        const prefix = original.match(/^\s*/)[0];
        const suffix = original.match(/\s*$/)[0];

        node.nodeValue =
          prefix + values[index] + suffix;
      });
    } else {
      console.warn(
        'Upside: de homepage is gewijzigd. ' +
        'Vertaling overgeslagen om fouten te voorkomen.'
      );
    }

    const titles = {
      nl: 'Upside Agency | Marketingbureau & Websites in Gent',
      fr: 'Upside Agency | Agence marketing et sites web à Gand',
      en: 'Upside Agency | Marketing Agency & Websites in Ghent',
      tr: 'Upside Agency | Gent Pazarlama Ajansı ve Web Siteleri',
      es: 'Upside Agency | Agencia de marketing y sitios web en Gante'
    };

    document.title = titles[lang];
  }

  // Neem de gekozen taal mee naar alle interne pagina's.
  document.querySelectorAll('a[href]').forEach(link => {
    const rawHref = link.getAttribute('href');

    if (
      !rawHref ||
      rawHref.startsWith('#') ||
      rawHref.startsWith('mailto:') ||
      rawHref.startsWith('tel:') ||
      rawHref.startsWith('javascript:')
    ) {
      return;
    }

    let url;

    try {
      url = new URL(rawHref, window.location.href);
    } catch (error) {
      return;
    }

    // Externe websites blijven ongewijzigd.
    if (url.origin !== window.location.origin) {
      return;
    }

    if (lang === 'nl') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }

    link.setAttribute(
      'href',
      url.pathname + url.search + url.hash
    );
  });

  // Vertaal de toegankelijkheid van het mobiele menu.
  const menuButton = document.querySelector('.menu-button');

  if (menuButton) {
    const menuLabels = {
      nl: ['Menu openen', 'Menu sluiten'],
      fr: ['Ouvrir le menu', 'Fermer le menu'],
      en: ['Open menu', 'Close menu'],
      tr: ['Menüyü aç', 'Menüyü kapat'],
      es: ['Abrir menú', 'Cerrar menú']
    };

    const isOpen =
      menuButton.getAttribute('aria-expanded') === 'true';

    menuButton.setAttribute(
      'aria-label',
      menuLabels[lang][isOpen ? 1 : 0]
    );
  }
}

// Bouw de taalkeuzelijst op.
if (upsideSelect) {
  upsideSelect.replaceChildren(
    ...Object.entries(upsideLanguageNames).map(
      ([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        return option;
      }
    )
  );

  upsideSelect.addEventListener('change', () => {
    upsideApplyLanguage(upsideSelect.value);
  });
}

// Gebruik bij het openen de laatst gekozen taal.
upsideApplyLanguage(upsideGetSavedLanguage());
