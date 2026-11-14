
'use strict';

(() => {
  if (document.body?.dataset.page !== 'resultaten') return;

  const LANGS = ['nl', 'fr', 'en', 'tr', 'es'];

  const translations = {
    nl: {
      nav: ['Diensten', 'Groei & resultaten', 'Projecten', 'Over Upside', 'Gratis groeiscan', 'Ik wil aan de slag'],
      title: 'Vooruitgang die je kunt begrijpen.',
      intro: 'Meer zichtbaarheid is pas waardevol als je weet wat ze bijdraagt. Daarom kijken we naar duidelijke doelen, vergelijkbare periodes en concrete veranderingen.',
      principles: [
        'Een eerlijk vertrekpunt',
        'We brengen de beginsituatie in kaart en kiezen wat we willen verbeteren.',
        'Een duidelijke periode',
        'We vergelijken gelijke periodes en houden rekening met seizoen en campagnebudget.',
        'Een onderbouwd resultaat',
        'We tonen de bron, de veranderingen en wat de cijfers wel en niet vertellen.'
      ],
      showcase: [
        'ONTDEK ONZE AANPAK · FICTIEVE VOORBEELDEN',
        'Zo maken wij het concreet.',
        'Kies een dienst en bekijk wat wij kunnen verbeteren. Alle bedrijven, berichten en cijfers in deze voorbeelden zijn verzonnen. De kaart van Gent is echt; het demo-bedrijf staat er niet op.',
        'Interactieve demonstraties · geen gerealiseerde of gegarandeerde Upside-resultaten.'
      ],
      tabs: ['Google-profiel', 'SEO', 'Social media', 'E-mailmarketing', 'Websites & CRO', 'AI & automatisering', 'Advertenties', 'Branding & logo’s'],
      before: 'Voor',
      after: 'Na',
      beforeOptimization: 'Voor optimalisatie',
      afterOptimization: 'Na optimalisatie',
      calculator: [
        'REKEN MET JE EIGEN AANNAMES',
        'Wat kan een verbetering betekenen?',
        'Maak een scenario. Geen voorspelling, maar inzicht in het verband tussen bezoekers, conversie, marge en kosten.'
      ],
      inputs: [
        'Websitebezoekers per maand',
        'Huidige conversieratio (%)',
        'Relatieve conversieverbetering (%)',
        'Omzet per conversie (€)',
        'Bijdragemarge vóór marketingkosten (%)',
        'Extra marketingkosten per maand (€)'
      ],
      outputs: [
        'JOUW MAANDELIJKSE SCENARIO',
        'Potentiële extra omzet',
        'Extra conversies',
        'Extra bijdrage vóór marketingkosten',
        'Na extra marketingkosten',
        'Incrementele marketing-ROI'
      ],
      cta: ['Klaar om samen aan de slag te gaan?', 'Wij bekijken welke aanpak bij jouw onderneming past.'],
      footer: [
        'Jij bouwt aan je onderneming. Wij staan aan je zijde.',
        'Ontdek Upside', 'Onze oplossingen', 'Onze aanpak', 'Jouw vraag',
        'Een stap vooruit', 'Gratis groeiscan', 'Groei & resultaten',
        'Projecten', 'Marketing · AI · Automatisering', 'Samen vooruit.'
      ]
    },

    fr: {
      nav: ['Services', 'Croissance & résultats', 'Projets', 'À propos d’Upside', 'Diagnostic gratuit', 'Je veux commencer'],
      title: 'Des progrès que vous pouvez comprendre.',
      intro: 'Une meilleure visibilité n’a de valeur que si vous savez ce qu’elle apporte. Nous examinons donc des objectifs clairs, des périodes comparables et des changements concrets.',
      principles: [
        'Un point de départ honnête',
        'Nous analysons la situation initiale et déterminons ce que nous voulons améliorer.',
        'Une période clairement définie',
        'Nous comparons des périodes équivalentes en tenant compte de la saison et du budget publicitaire.',
        'Des résultats étayés',
        'Nous présentons les sources, les changements et ce que les chiffres permettent réellement de conclure.'
      ],
      showcase: [
        'DÉCOUVREZ NOTRE APPROCHE · EXEMPLES FICTIFS',
        'Voici comment nous concrétisons les choses.',
        'Choisissez un service pour découvrir les améliorations possibles. Les entreprises, messages et chiffres présentés sont fictifs. La carte de Gand est réelle, mais l’entreprise de démonstration n’y figure pas.',
        'Démonstrations interactives · aucun résultat réel ou garanti par Upside.'
      ],
      tabs: ['Profil Google', 'SEO', 'Réseaux sociaux', 'E-mail marketing', 'Sites web & CRO', 'IA & automatisation', 'Publicités', 'Identité visuelle & logos'],
      before: 'Avant',
      after: 'Après',
      beforeOptimization: 'Avant optimisation',
      afterOptimization: 'Après optimisation',
      calculator: [
        'CALCULEZ AVEC VOS PROPRES HYPOTHÈSES',
        'Que pourrait apporter une amélioration ?',
        'Créez un scénario, pas une prévision. Comprenez le lien entre visiteurs, conversion, marge et coûts.'
      ],
      inputs: [
        'Visiteurs du site par mois',
        'Taux de conversion actuel (%)',
        'Amélioration relative de la conversion (%)',
        'Chiffre d’affaires par conversion (€)',
        'Marge contributive avant frais marketing (%)',
        'Frais marketing supplémentaires par mois (€)'
      ],
      outputs: [
        'VOTRE SCÉNARIO MENSUEL',
        'Chiffre d’affaires supplémentaire potentiel',
        'Conversions supplémentaires',
        'Contribution supplémentaire avant frais marketing',
        'Après frais marketing supplémentaires',
        'ROI marketing incrémental'
      ],
      cta: ['Prêt à avancer ensemble ?', 'Nous étudions l’approche adaptée à votre entreprise.'],
      footer: [
        'Vous développez votre entreprise. Nous sommes à vos côtés.',
        'Découvrez Upside', 'Nos solutions', 'Notre approche', 'Votre demande',
        'Un pas en avant', 'Diagnostic gratuit', 'Croissance & résultats',
        'Projets', 'Marketing · IA · Automatisation', 'Avançons ensemble.'
      ]
    },

    en: {
      nav: ['Services', 'Growth & results', 'Projects', 'About Upside', 'Free growth scan', "Let's get started"],
      title: 'Progress you can understand.',
      intro: 'Greater visibility only matters when you understand its impact. That is why we focus on clear goals, comparable periods and measurable changes.',
      principles: [
        'An honest starting point',
        'We assess the initial situation and decide what we want to improve.',
        'A clearly defined period',
        'We compare equivalent periods and account for seasonality and campaign budgets.',
        'Evidence-based results',
        'We show the sources, changes and what the figures do and do not tell us.'
      ],
      showcase: [
        'EXPLORE OUR APPROACH · FICTIONAL EXAMPLES',
        'Here is how we make it tangible.',
        'Choose a service and explore what we could improve. All companies, messages and figures in these examples are fictional. The map of Ghent is real, but the demo business is not shown on it.',
        'Interactive demonstrations · not actual or guaranteed Upside results.'
      ],
      tabs: ['Google Business Profile', 'SEO', 'Social media', 'Email marketing', 'Websites & CRO', 'AI & automation', 'Advertising', 'Branding & logos'],
      before: 'Before',
      after: 'After',
      beforeOptimization: 'Before optimization',
      afterOptimization: 'After optimization',
      calculator: [
        'CALCULATE USING YOUR OWN ASSUMPTIONS',
        'What could an improvement mean?',
        'Build a scenario, not a prediction. Explore the relationship between visitors, conversions, margins and costs.'
      ],
      inputs: [
        'Monthly website visitors',
        'Current conversion rate (%)',
        'Relative conversion improvement (%)',
        'Revenue per conversion (€)',
        'Contribution margin before marketing costs (%)',
        'Additional monthly marketing costs (€)'
      ],
      outputs: [
        'YOUR MONTHLY SCENARIO',
        'Potential additional revenue',
        'Additional conversions',
        'Additional contribution before marketing costs',
        'After additional marketing costs',
        'Incremental marketing ROI'
      ],
      cta: ['Ready to move forward together?', "We'll explore the right approach for your business."],
      footer: [
        "You're building your business. We're by your side.",
        'Discover Upside', 'Our solutions', 'Our approach', 'Your enquiry',
        'Take the next step', 'Free growth scan', 'Growth & results',
        'Projects', 'Marketing · AI · Automation', 'Moving forward together.'
      ]
    },

    tr: {
      nav: ['Hizmetler', 'Büyüme ve sonuçlar', 'Projeler', 'Upside hakkında', 'Ücretsiz büyüme analizi', 'Hemen başlayalım'],
      title: 'Anlaşılır ve ölçülebilir ilerleme.',
      intro: 'Daha fazla görünürlük, işletmenize ne kazandırdığını bildiğinizde anlamlıdır. Bu yüzden net hedeflere, karşılaştırılabilir dönemlere ve somut değişimlere odaklanıyoruz.',
      principles: [
        'Gerçekçi bir başlangıç',
        'Mevcut durumu analiz ediyor ve neleri geliştirebileceğimizi belirliyoruz.',
        'Net bir zaman aralığı',
        'Benzer dönemleri karşılaştırırken mevsimsel etkileri ve reklam bütçesini dikkate alıyoruz.',
        'Verilerle desteklenen sonuçlar',
        'Veri kaynaklarını, değişimleri ve rakamların gerçekte ne ifade ettiğini gösteriyoruz.'
      ],
      showcase: [
        'YAKLAŞIMIMIZI KEŞFEDİN · KURGUSAL ÖRNEKLER',
        'Neler yapabileceğimizi görün.',
        'Bir hizmet seçin ve neleri geliştirebileceğimizi inceleyin. Örneklerdeki işletmeler, mesajlar ve rakamlar kurgusaldır. Gent haritası gerçektir ancak örnek işletme haritada yer almaz.',
        'İnteraktif demolar · Upside tarafından elde edilmiş veya garanti edilen sonuçlar değildir.'
      ],
      tabs: ['Google İşletme Profili', 'SEO', 'Sosyal medya', 'E-posta pazarlaması', 'Web siteleri ve CRO', 'Yapay zekâ ve otomasyon', 'Reklamlar', 'Marka kimliği ve logolar'],
      before: 'Önce',
      after: 'Sonra',
      beforeOptimization: 'Optimizasyondan önce',
      afterOptimization: 'Optimizasyondan sonra',
      calculator: [
        'KENDİ VARSAYIMLARINIZLA HESAPLAYIN',
        'Bir iyileştirme ne kazandırabilir?',
        'Bir senaryo oluşturun. Bu bir tahmin değil; ziyaretçi, dönüşüm, kâr marjı ve maliyet arasındaki ilişkiyi gösteren bir hesaplamadır.'
      ],
      inputs: [
        'Aylık web sitesi ziyaretçisi',
        'Mevcut dönüşüm oranı (%)',
        'Göreceli dönüşüm artışı (%)',
        'Dönüşüm başına ciro (€)',
        'Pazarlama maliyetleri öncesi katkı marjı (%)',
        'Aylık ek pazarlama maliyeti (€)'
      ],
      outputs: [
        'AYLIK SENARYONUZ',
        'Potansiyel ek ciro',
        'Ek dönüşüm sayısı',
        'Pazarlama maliyetleri öncesi ek katkı',
        'Ek pazarlama maliyetleri sonrası',
        'Ek pazarlama yatırım getirisi'
      ],
      cta: ['Birlikte çalışmaya hazır mısınız?', 'İşletmeniz için en uygun yaklaşımı birlikte değerlendirelim.'],
      footer: [
        'Siz işletmenizi büyütüyorsunuz. Biz yanınızdayız.',
        "Upside'ı keşfedin", 'Çözümlerimiz', 'Çalışma şeklimiz', 'Bize ulaşın',
        'Bir adım ileri', 'Ücretsiz büyüme analizi', 'Büyüme ve sonuçlar',
        'Projeler', 'Pazarlama · Yapay zekâ · Otomasyon', 'Birlikte ileriye.'
      ]
    },

    es: {
      nav: ['Servicios', 'Crecimiento y resultados', 'Proyectos', 'Sobre Upside', 'Análisis gratuito', 'Quiero empezar'],
      title: 'Un progreso que puedes comprender.',
      intro: 'Una mayor visibilidad solo tiene valor cuando sabes qué aporta. Por eso nos centramos en objetivos claros, períodos comparables y cambios concretos.',
      principles: [
        'Un punto de partida realista',
        'Analizamos la situación inicial y decidimos qué queremos mejorar.',
        'Un período bien definido',
        'Comparamos períodos equivalentes teniendo en cuenta la temporada y el presupuesto publicitario.',
        'Resultados fundamentados',
        'Mostramos las fuentes, los cambios y lo que realmente indican las cifras.'
      ],
      showcase: [
        'DESCUBRE NUESTRO ENFOQUE · EJEMPLOS FICTICIOS',
        'Así convertimos las ideas en acciones.',
        'Elige un servicio y descubre qué podemos mejorar. Todas las empresas, mensajes y cifras de estos ejemplos son ficticios. El mapa de Gante es real, pero la empresa de demostración no aparece en él.',
        'Demostraciones interactivas · no representan resultados reales ni garantizados de Upside.'
      ],
      tabs: ['Perfil de Google', 'SEO', 'Redes sociales', 'Email marketing', 'Sitios web y CRO', 'IA y automatización', 'Publicidad', 'Identidad de marca y logotipos'],
      before: 'Antes',
      after: 'Después',
      beforeOptimization: 'Antes de optimizar',
      afterOptimization: 'Después de optimizar',
      calculator: [
        'CALCULA CON TUS PROPIAS HIPÓTESIS',
        '¿Qué podría aportar una mejora?',
        'Crea un escenario, no una predicción. Explora la relación entre visitantes, conversiones, márgenes y costes.'
      ],
      inputs: [
        'Visitantes mensuales del sitio web',
        'Tasa de conversión actual (%)',
        'Mejora relativa de la conversión (%)',
        'Ingresos por conversión (€)',
        'Margen de contribución antes de marketing (%)',
        'Costes adicionales de marketing al mes (€)'
      ],
      outputs: [
        'TU ESCENARIO MENSUAL',
        'Ingresos adicionales potenciales',
        'Conversiones adicionales',
        'Contribución adicional antes de marketing',
        'Después de los costes adicionales de marketing',
        'ROI incremental de marketing'
      ],
      cta: ['¿Listo para avanzar juntos?', 'Estudiamos el enfoque adecuado para tu negocio.'],
      footer: [
        'Tú haces crecer tu negocio. Nosotros te acompañamos.',
        'Descubre Upside', 'Nuestras soluciones', 'Nuestro enfoque', 'Tu consulta',
        'Un paso adelante', 'Análisis gratuito', 'Crecimiento y resultados',
        'Proyectos', 'Marketing · IA · Automatización', 'Avancemos juntos.'
      ]
    }
  };

  function language() {
    const param = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(param)) return param;

    try {
      const stored = localStorage.getItem('upside-language')
        || localStorage.getItem('upside-lang');

      if (LANGS.includes(stored)) return stored;
    } catch (_) {}

    return 'nl';
  }

  function text(selector, value) {
    const element = document.querySelector(selector);
    if (element && value !== undefined) {
      element.textContent = value;
    }
  }

  function all(selector, values) {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (values[index] !== undefined) {
        element.textContent = values[index];
      }
    });
  }

  function apply() {
    const lang = language();
    const t = translations[lang];

    document.documentElement.lang = lang === 'nl' ? 'nl-BE' : lang;

    text('.page-intro h1', t.title);
    text('.page-intro > p', t.intro);

    const nav = document.querySelectorAll('.header nav > a');

    nav.forEach((link, index) => {
      if (!t.nav[index]) return;
      const svg = link.querySelector('svg');
      link.textContent = t.nav[index] + ' ';
      if (svg) link.appendChild(svg);
    });

    document.querySelectorAll('.results-principles article')
      .forEach((article, index) => {
        textIn(article, 'h3', t.principles[index * 2]);
        textIn(article, 'p', t.principles[index * 2 + 1]);
      });

    text('.showcase-intro .section-label', t.showcase[0]);
    text('#showcase-heading', t.showcase[1]);
    text('.showcase-intro > p:last-child', t.showcase[2]);
    text('.showcase-demo-note', t.showcase[3]);

    all('[data-showcase-tab]', t.tabs);

    document.querySelectorAll('[data-example-state]').forEach(button => {
      button.textContent = button.dataset.exampleState === 'before'
        ? t.before : t.after;
    });

    document.querySelectorAll('[data-gbp-mode]').forEach(button => {
      button.textContent = button.dataset.gbpMode === 'before'
        ? t.beforeOptimization : t.afterOptimization;
    });

    document.querySelectorAll('.gbp-bar-row').forEach(row => {
      const label = row.querySelector('span');
      if (label) label.textContent =
        row.classList.contains('gbp-bar-after') ? t.after : t.before;
    });


    // Keep the existing input elements and their event listeners.
    document.querySelectorAll('.calc-inputs label')
      .forEach((label, index) => {
        const input = label.querySelector('input');
        if (!input || !t.inputs[index]) return;
        [...label.childNodes].forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) node.remove();
        });
        label.insertBefore(
          document.createTextNode(t.inputs[index]),
          input
        );
      });

    const calcHeading = document.querySelector('.pale .section-head');
    if (calcHeading) {
      textIn(calcHeading, '.section-label', t.calculator[0]);
      textIn(calcHeading, 'h2', t.calculator[1]);
      textIn(calcHeading, ':scope > p', t.calculator[2]);
    }

    text('.calc-result > .section-label', t.outputs[0]);
    text('.calc-result > span', t.outputs[1]);

    document.querySelectorAll('.calc-result > div').forEach((row, index) => {
      textIn(row, 'span', t.outputs[index + 2]);
    });

    text('.lead-invitation h2', t.cta[0]);
    text('.lead-invitation p', t.cta[1]);
    text('.lead-invitation a', t.nav[5]);

    const footer = document.querySelectorAll('.footer-main > div');

    if (footer[0]) {
      const p = footer[0].querySelector('p');
      if (p) {
        p.textContent = '';
        const parts = t.footer[0].split('. ');
        p.append(document.createTextNode(parts[0] + '.'));
        p.append(document.createElement('br'));
        p.append(document.createTextNode(parts.slice(1).join('. ')));
      }
    }

    if (footer[1]) {
      textIn(footer[1], 'span', t.footer[1]);
      footer[1].querySelectorAll('a').forEach((a, i) => {
        a.textContent = t.footer[i + 2];
      });
    }

    if (footer[2]) {
      textIn(footer[2], 'span', t.footer[5]);
      footer[2].querySelectorAll('a').forEach((a, i) => {
        const svg = a.querySelector('svg');
        a.textContent = t.footer[i + 6] + ' ';
        if (svg) a.appendChild(svg);
      });
    }

    const bottom = document.querySelectorAll('.footer-bottom span');
    if (bottom[1]) bottom[1].textContent = t.footer[9];
    if (bottom[2]) bottom[2].textContent = t.footer[10];
  }

  function textIn(root, selector, value) {
    const element = root?.querySelector(selector);
    if (element && value !== undefined) element.textContent = value;
  }

  document.addEventListener('DOMContentLoaded', () => {
    apply();

    document.addEventListener('change', event => {
      if (event.target.matches('#upside-language')) {
        queueMicrotask(apply);
      }
    });
  });
})();
