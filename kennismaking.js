
'use strict';

/*
 * UPSIDE AGENCY
 * Meertalig kennismakingsformulier
 * Nederlands, Engels, Frans, Turks en Spaans
 */

const ENDPOINT = '/api/kennismaking';

const keys = [
  'activities',
  'existing',
  'acquisition',
  'services',
  'clients',
  'challenge',
  'photos',
  'budget'
];

/* ==========================================
   VERTALINGEN
========================================== */

const dictionaries = {

  /* NEDERLANDS */

  nl: {
    language: 'Taal',
    home: 'Terug naar website',
    kicker: 'UPSIDE AGENCY · KENNISMAKING',
    heading: 'Vertel ons over jouw onderneming.',
    intro: 'Met een paar korte vragen leren we jouw bedrijf beter kennen en bereiden we ons gesprek voor.',
    duration: 'Ongeveer 5 minuten · 10 vragen',
    step: 'Stap {n} van {total}',
    multiple: 'Meerdere antwoorden mogelijk',
    multipleOptional: 'Meerdere antwoorden mogelijk. Je hoeft nog niets definitief te kiezen.',
    companyPlaceholder: 'Naam van jouw onderneming',
    optional: 'Optioneel',
    previous: 'Vorige',
    next: 'Volgende',
    send: 'Antwoorden versturen',
    sending: 'Bezig met verzenden…',
    consent: 'Ik ga ermee akkoord dat Upside Agency mijn antwoorden gebruikt om het kennismakingsgesprek voor te bereiden.',
    privacy: 'Privacyinformatie',
    footnote: 'Je gegevens worden niet gebruikt voor nieuwsbrieven zonder aparte toestemming.',
    successTitle: 'Bedankt voor het invullen!',
    successText: 'Je antwoorden zijn ontvangen en worden meegenomen naar ons gesprek.',
    companyError: 'Vul eerst de naam van je bedrijf in.',
    consentError: 'Vink eerst de toestemming aan.',
    sendError: 'Het verzenden is momenteel niet beschikbaar. Probeer het later opnieuw.',

    q1: 'Wat is de naam van jouw bedrijf?',
    q2: 'In welke sector is jouw onderneming actief?',
    q3: 'Wie zijn jouw belangrijkste klanten?',
    q4: 'Wat heeft jouw bedrijf momenteel al?',
    q5: 'Hoe vinden nieuwe klanten jouw bedrijf?',
    q6: 'Bij welke diensten zou jouw bedrijf ondersteuning kunnen gebruiken?',
    q7: 'Wat is momenteel de grootste uitdaging voor jouw bedrijf?',
    q8: "Heb je al foto's of ander beeldmateriaal van jouw onderneming, producten of diensten?",
    q9: 'Heb je al een budget voorzien voor marketing en online zichtbaarheid?',
    q10: 'Is er nog iets dat je graag wilt bespreken?',

    activities: [
      'Bouw, renovatie en technische diensten',
      'Horeca en voeding',
      'Schoonheid, verzorging en wellness',
      'Detailhandel en verkoop',
      'Auto’s, fietsen en mobiliteit',
      'Gezondheid, sport en fitness',
      'Zakelijke en professionele diensten',
      'Creatieve diensten en evenementen',
      'Andere sector',
      'Mijn onderneming is nog in opstartfase'
    ],

    existing: [
      'Website',
      'Google Bedrijfsprofiel',
      'Facebookpagina',
      'Instagrampagina',
      'TikTok-account',
      'Logo en huisstijl',
      'Visitekaartjes of flyers',
      'Professioneel e-mailadres',
      'Nog niets van bovenstaande'
    ],

    acquisition: [
      'Mond-tot-mondreclame',
      'Google',
      'Sociale media',
      'Via andere bedrijven of aannemers',
      'Via bestaande klanten',
      'Andere manieren',
      'Nog geen klanten via deze kanalen'
    ],

    services: [
      'Een professionele website laten maken of verbeteren',
      'Beter vindbaar worden op Google (SEO)',
      'Google Bedrijfsprofiel aanmaken of verbeteren',
      'Logo en huisstijl ontwerpen',
      'Sociale media aanmaken of beheren (Instagram, Facebook, TikTok)',
      'Online advertenties (Google Ads / sociale media)',
      'Visitekaartjes, flyers en reclameaffiches',
      'Google Reviews verzamelen via QR-code of NFC-kaart',
      'Professioneel e-mailadres instellen',
      'E-mailmarketing en klantencommunicatie',
      'AI en automatisering van repetitieve taken',
      'Nog niet zeker, ik wil eerst de mogelijkheden bespreken'
    ],

    clients: [
      'Particulieren',
      'Bedrijven',
      'Zowel particulieren als bedrijven',
      'Nog geen vaste klanten'
    ],

    challenge: [
      'Meer klanten vinden',
      'Online zichtbaarheid verbeteren',
      'Professionelere uitstraling creëren',
      'Weinig tijd voor marketing',
      'Nog geen specifieke uitdagingen',
      'Anders / bespreek ik liever tijdens het gesprek'
    ],

    photos: [
      'Ja, professioneel beeldmateriaal',
      'Ja, zelfgemaakte foto’s of video’s',
      'Nog niet, maar ik wil dit laten maken',
      'Nog niet, momenteel niet nodig'
    ],

    budget: [
      'Nog niet bepaald',
      'Minder dan €500',
      '€500 – €1.000',
      '€1.000 – €2.000',
      'Meer dan €2.000',
      'Bespreek ik liever persoonlijk'
    ]
  },

  /* ENGLISH */

  en: {
    language: 'Language',
    home: 'Back to website',
    kicker: 'UPSIDE AGENCY · INTRODUCTION',
    heading: 'Tell us about your business.',
    intro: 'A few short questions will help us get to know your business and prepare for our meeting.',
    duration: 'About 5 minutes · 10 questions',
    step: 'Step {n} of {total}',
    multiple: 'You can select more than one',
    multipleOptional: 'Select as many as you like. Nothing is final yet.',
    companyPlaceholder: 'Your company name',
    optional: 'Optional',
    previous: 'Back',
    next: 'Next',
    send: 'Send answers',
    sending: 'Sending…',
    consent: 'I agree that Upside Agency may use my answers to prepare for our introductory meeting.',
    privacy: 'Privacy information',
    footnote: 'Your details will not be used for newsletters without separate consent.',
    successTitle: 'Thank you!',
    successText: 'Your answers have been received and will help us prepare for our meeting.',
    companyError: 'Please enter your company name first.',
    consentError: 'Please agree to the privacy statement first.',
    sendError: 'Sending is currently unavailable. Please try again later.',

    q1: 'What is your company’s name?',
    q2: 'Which industry does your business operate in?',
    q3: 'Who are your main customers?',
    q4: 'What does your business already have?',
    q5: 'How do new customers find your business?',
    q6: 'Which services could your business use help with?',
    q7: 'What is currently your biggest business challenge?',
    q8: 'Do you already have photos or other visual content of your business, products or services?',
    q9: 'Have you set a budget for marketing and online visibility?',
    q10: 'Is there anything else you would like to discuss?',

    activities: [
      'Construction, renovation and technical services',
      'Hospitality and food',
      'Beauty, personal care and wellness',
      'Retail and sales',
      'Cars, bicycles and mobility',
      'Health, sports and fitness',
      'Business and professional services',
      'Creative services and events',
      'Other industry',
      'My business is still in the startup phase'
    ],

    existing: [
      'Website',
      'Google Business Profile',
      'Facebook page',
      'Instagram page',
      'TikTok account',
      'Logo and visual identity',
      'Business cards or flyers',
      'Professional email address',
      'None of the above yet'
    ],

    acquisition: [
      'Word of mouth',
      'Google',
      'Social media',
      'Other businesses or contractors',
      'Existing customers',
      'Other ways',
      'No customers through these channels yet'
    ],

    services: [
      'Create or improve a professional website',
      'Improve Google visibility (SEO)',
      'Create or improve Google Business Profile',
      'Design a logo and visual identity',
      'Set up or manage social media (Instagram, Facebook, TikTok)',
      'Online advertising (Google Ads / social media)',
      'Business cards, flyers and posters',
      'Collect Google reviews using QR codes or NFC cards',
      'Set up a professional email address',
      'Email marketing and customer communication',
      'AI and automation of repetitive tasks',
      'Not sure yet; I would like to discuss the options first'
    ],

    clients: [
      'Private individuals',
      'Businesses',
      'Both individuals and businesses',
      'No regular customers yet'
    ],

    challenge: [
      'Finding more customers',
      'Improving online visibility',
      'Creating a more professional image',
      'Not enough time for marketing',
      'No specific challenges yet',
      'Other / prefer to discuss in person'
    ],

    photos: [
      'Yes, professional visual content',
      'Yes, photos or videos I made myself',
      'Not yet, but I would like to have some created',
      'Not yet, not needed at the moment'
    ],

    budget: [
      'Not decided yet',
      'Less than €500',
      '€500–€1,000',
      '€1,000–€2,000',
      'More than €2,000',
      'Prefer to discuss in person'
    ]
  },

  /* FRANÇAIS */

  fr: {
    language: 'Langue',
    home: 'Retour au site',
    kicker: 'UPSIDE AGENCY · PREMIER CONTACT',
    heading: 'Parlez-nous de votre entreprise.',
    intro: 'Quelques questions rapides nous aideront à mieux connaître votre entreprise et à préparer notre rendez-vous.',
    duration: 'Environ 5 minutes · 10 questions',
    step: 'Étape {n} sur {total}',
    multiple: 'Plusieurs réponses possibles',
    multipleOptional: 'Plusieurs réponses possibles. Rien n’est définitif à ce stade.',
    companyPlaceholder: 'Nom de votre entreprise',
    optional: 'Facultatif',
    previous: 'Précédent',
    next: 'Suivant',
    send: 'Envoyer les réponses',
    sending: 'Envoi en cours…',
    consent: 'J’accepte qu’Upside Agency utilise mes réponses pour préparer notre premier rendez-vous.',
    privacy: 'Politique de confidentialité',
    footnote: 'Vos données ne seront pas utilisées pour des newsletters sans consentement distinct.',
    successTitle: 'Merci pour vos réponses !',
    successText: 'Vos réponses ont été reçues et serviront à préparer notre rendez-vous.',
    companyError: 'Veuillez d’abord indiquer le nom de votre entreprise.',
    consentError: 'Veuillez d’abord donner votre accord.',
    sendError: 'L’envoi est actuellement indisponible. Veuillez réessayer plus tard.',

    q1: 'Quel est le nom de votre entreprise ?',
    q2: 'Dans quel secteur votre entreprise est-elle active ?',
    q3: 'Qui sont vos principaux clients ?',
    q4: 'Quels outils votre entreprise possède-t-elle déjà ?',
    q5: 'Comment de nouveaux clients trouvent-ils votre entreprise ?',
    q6: 'Pour quels services auriez-vous besoin d’aide ?',
    q7: 'Quel est actuellement le plus grand défi de votre entreprise ?',
    q8: 'Avez-vous déjà des photos ou d’autres contenus visuels de votre entreprise, de vos produits ou de vos services ?',
    q9: 'Avez-vous prévu un budget pour le marketing et la visibilité en ligne ?',
    q10: 'Y a-t-il autre chose dont vous souhaitez parler ?',

    activities: [
      'Construction, rénovation et services techniques',
      'Horeca et alimentation',
      'Beauté, soins et bien-être',
      'Commerce de détail et vente',
      'Automobile, vélos et mobilité',
      'Santé, sport et fitness',
      'Services aux entreprises et services professionnels',
      'Services créatifs et événements',
      'Autre secteur',
      'Mon entreprise est encore en phase de lancement'
    ],

    existing: [
      'Site web',
      'Fiche d’établissement Google',
      'Page Facebook',
      'Page Instagram',
      'Compte TikTok',
      'Logo et identité visuelle',
      'Cartes de visite ou flyers',
      'Adresse e-mail professionnelle',
      'Aucun de ces éléments'
    ],

    acquisition: [
      'Bouche-à-oreille',
      'Google',
      'Réseaux sociaux',
      'Autres entreprises ou entrepreneurs',
      'Clients existants',
      'Autres moyens',
      'Pas encore de clients via ces canaux'
    ],

    services: [
      'Créer ou améliorer un site web professionnel',
      'Améliorer le référencement Google (SEO)',
      'Créer ou améliorer la fiche Google',
      'Créer un logo et une identité visuelle',
      'Créer ou gérer les réseaux sociaux (Instagram, Facebook, TikTok)',
      'Publicité en ligne (Google Ads / réseaux sociaux)',
      'Cartes de visite, flyers et affiches',
      'Obtenir des avis Google via QR code ou carte NFC',
      'Configurer une adresse e-mail professionnelle',
      'E-mail marketing et communication client',
      'IA et automatisation des tâches répétitives',
      'Je ne sais pas encore, je préfère en discuter'
    ],

    clients: [
      'Particuliers',
      'Entreprises',
      'Particuliers et entreprises',
      'Pas encore de clients réguliers'
    ],

    challenge: [
      'Trouver plus de clients',
      'Améliorer la visibilité en ligne',
      'Renforcer l’image professionnelle',
      'Manque de temps pour le marketing',
      'Pas de difficulté particulière',
      'Autre / à discuter en personne'
    ],

    photos: [
      'Oui, du contenu visuel professionnel',
      'Oui, des photos ou vidéos réalisées par moi-même',
      'Pas encore, mais je souhaite en faire réaliser',
      'Pas encore, ce n’est pas nécessaire pour le moment'
    ],

    budget: [
      'Pas encore défini',
      'Moins de 500 €',
      '500 € – 1 000 €',
      '1 000 € – 2 000 €',
      'Plus de 2 000 €',
      'Je préfère en discuter'
    ]
  },

  /* TÜRKÇE */

  tr: {
    language: 'Dil',
    home: 'Web sitesine dön',
    kicker: 'UPSIDE AGENCY · TANIŞMA',
    heading: 'Bize işletmenizden bahsedin.',
    intro: 'Birkaç kısa soruyla işletmenizi daha iyi tanıyıp görüşmemize hazırlanabiliriz.',
    duration: 'Yaklaşık 5 dakika · 10 soru',
    step: '{total} adımdan {n}. adım',
    multiple: 'Birden fazla seçenek işaretleyebilirsiniz',
    multipleOptional: 'Birden fazla seçenek işaretleyebilirsiniz. Henüz kesin karar vermeniz gerekmiyor.',
    companyPlaceholder: 'İşletmenizin adı',
    optional: 'İsteğe bağlı',
    previous: 'Geri',
    next: 'İleri',
    send: 'Yanıtları gönder',
    sending: 'Gönderiliyor…',
    consent: 'Upside Agency’nin yanıtlarımı tanışma görüşmesine hazırlanmak amacıyla kullanmasını kabul ediyorum.',
    privacy: 'Gizlilik bilgileri',
    footnote: 'Ayrı onayınız olmadan bilgileriniz e-posta bültenleri için kullanılmaz.',
    successTitle: 'Doldurduğunuz için teşekkürler!',
    successText: 'Yanıtlarınız alındı ve görüşmemize hazırlanırken kullanılacak.',
    companyError: 'Önce işletmenizin adını girin.',
    consentError: 'Lütfen önce onay kutusunu işaretleyin.',
    sendError: 'Gönderim şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.',

    q1: 'İşletmenizin adı nedir?',
    q2: 'İşletmeniz hangi sektörde faaliyet gösteriyor?',
    q3: 'Başlıca müşterileriniz kimler?',
    q4: 'İşletmenizde şu anda neler var?',
    q5: 'Yeni müşteriler işletmenizi nasıl buluyor?',
    q6: 'Hangi hizmetlerde desteğe ihtiyaç duyabilirsiniz?',
    q7: 'İşletmenizin şu anki en büyük zorluğu nedir?',
    q8: 'İşletmenizin, ürünlerinizin veya hizmetlerinizin fotoğrafları ya da başka görselleri var mı?',
    q9: 'Pazarlama ve internette görünürlük için bütçe ayırdınız mı?',
    q10: 'Görüşmek istediğiniz başka bir konu var mı?',

    activities: [
      'İnşaat, tadilat ve teknik hizmetler',
      'Yeme-içme ve gıda sektörü',
      'Güzellik, kişisel bakım ve wellness',
      'Perakende ve satış',
      'Otomotiv, bisiklet ve ulaşım',
      'Sağlık, spor ve fitness',
      'Kurumsal ve profesyonel hizmetler',
      'Yaratıcı hizmetler ve organizasyonlar',
      'Diğer sektör',
      'İşletmem henüz kuruluş aşamasında'
    ],

    existing: [
      'Web sitesi',
      'Google İşletme Profili',
      'Facebook sayfası',
      'Instagram sayfası',
      'TikTok hesabı',
      'Logo ve kurumsal kimlik',
      'Kartvizit veya broşür',
      'Profesyonel e-posta adresi',
      'Henüz hiçbiri yok'
    ],

    acquisition: [
      'Tavsiye yoluyla',
      'Google',
      'Sosyal medya',
      'Diğer işletmeler veya müteahhitler aracılığıyla',
      'Mevcut müşteriler aracılığıyla',
      'Diğer yollar',
      'Henüz bu kanallardan müşteri gelmiyor'
    ],

    services: [
      'Profesyonel web sitesi oluşturma veya iyileştirme',
      'Google’da daha görünür olma (SEO)',
      'Google İşletme Profili oluşturma veya iyileştirme',
      'Logo ve kurumsal kimlik tasarımı',
      'Sosyal medya hesabı açma veya yönetme (Instagram, Facebook, TikTok)',
      'İnternet reklamları (Google Ads / sosyal medya)',
      'Kartvizit, broşür ve reklam afişleri',
      'QR kod veya NFC kartıyla Google yorumu toplama',
      'Profesyonel e-posta adresi kurma',
      'E-posta pazarlaması ve müşteri iletişimi',
      'Yapay zekâ ve tekrarlayan işlerin otomasyonu',
      'Henüz emin değilim, önce seçenekleri görüşmek istiyorum'
    ],

    clients: [
      'Bireysel müşteriler',
      'Şirketler',
      'Hem bireysel müşteriler hem şirketler',
      'Henüz düzenli müşterim yok'
    ],

    challenge: [
      'Daha fazla müşteri bulmak',
      'İnternette görünürlüğü artırmak',
      'Daha profesyonel bir imaj oluşturmak',
      'Pazarlamaya yeterli zaman ayıramamak',
      'Şu an belirli bir zorluk yok',
      'Diğer / görüşmede konuşmak isterim'
    ],

    photos: [
      'Evet, profesyonel görsellerim var',
      'Evet, kendi çektiğim fotoğraf veya videolar var',
      'Henüz yok ama hazırlatmak istiyorum',
      'Henüz yok, şu an gerekli değil'
    ],

    budget: [
      'Henüz belirlemedim',
      '500 € altı',
      '500 € – 1.000 €',
      '1.000 € – 2.000 €',
      '2.000 € üzeri',
      'Yüz yüze görüşmek isterim'
    ]
  },

  /* ESPAÑOL */

  es: {
    language: 'Idioma',
    home: 'Volver al sitio web',
    kicker: 'UPSIDE AGENCY · PRIMER CONTACTO',
    heading: 'Cuéntanos sobre tu empresa.',
    intro: 'Unas preguntas breves nos ayudarán a conocer mejor tu negocio y preparar nuestra reunión.',
    duration: 'Unos 5 minutos · 10 preguntas',
    step: 'Paso {n} de {total}',
    multiple: 'Puedes seleccionar varias respuestas',
    multipleOptional: 'Puedes seleccionar varias respuestas. No tienes que decidir nada todavía.',
    companyPlaceholder: 'Nombre de tu empresa',
    optional: 'Opcional',
    previous: 'Anterior',
    next: 'Siguiente',
    send: 'Enviar respuestas',
    sending: 'Enviando…',
    consent: 'Acepto que Upside Agency utilice mis respuestas para preparar nuestra primera reunión.',
    privacy: 'Información de privacidad',
    footnote: 'Tus datos no se utilizarán para boletines sin tu consentimiento por separado.',
    successTitle: '¡Gracias por completar el formulario!',
    successText: 'Hemos recibido tus respuestas y las utilizaremos para preparar nuestra reunión.',
    companyError: 'Primero introduce el nombre de tu empresa.',
    consentError: 'Primero debes aceptar el consentimiento.',
    sendError: 'El envío no está disponible en este momento. Inténtalo de nuevo más tarde.',

    q1: '¿Cómo se llama tu empresa?',
    q2: '¿En qué sector opera tu empresa?',
    q3: '¿Quiénes son tus principales clientes?',
    q4: '¿Con qué recursos cuenta ya tu empresa?',
    q5: '¿Cómo encuentran tu empresa los nuevos clientes?',
    q6: '¿En qué servicios podría necesitar ayuda tu empresa?',
    q7: '¿Cuál es actualmente el mayor reto de tu empresa?',
    q8: '¿Ya tienes fotos u otro material visual de tu empresa, productos o servicios?',
    q9: '¿Has reservado un presupuesto para marketing y visibilidad online?',
    q10: '¿Hay algo más que quieras comentar?',

    activities: [
      'Construcción, reformas y servicios técnicos',
      'Hostelería y alimentación',
      'Belleza, cuidado personal y bienestar',
      'Comercio minorista y ventas',
      'Automóviles, bicicletas y movilidad',
      'Salud, deporte y fitness',
      'Servicios empresariales y profesionales',
      'Servicios creativos y eventos',
      'Otro sector',
      'Mi empresa todavía está en fase de creación'
    ],

    existing: [
      'Sitio web',
      'Perfil de Empresa en Google',
      'Página de Facebook',
      'Página de Instagram',
      'Cuenta de TikTok',
      'Logotipo e identidad visual',
      'Tarjetas de visita o folletos',
      'Correo electrónico profesional',
      'Todavía ninguno de los anteriores'
    ],

    acquisition: [
      'Recomendaciones personales',
      'Google',
      'Redes sociales',
      'Otras empresas o contratistas',
      'Clientes actuales',
      'Otros medios',
      'Todavía no llegan clientes por estos canales'
    ],

    services: [
      'Crear o mejorar un sitio web profesional',
      'Mejorar la visibilidad en Google (SEO)',
      'Crear o mejorar el Perfil de Empresa en Google',
      'Diseñar logotipo e identidad visual',
      'Crear o gestionar redes sociales (Instagram, Facebook, TikTok)',
      'Publicidad online (Google Ads / redes sociales)',
      'Tarjetas de visita, folletos y carteles',
      'Conseguir reseñas de Google mediante QR o tarjeta NFC',
      'Configurar un correo electrónico profesional',
      'Email marketing y comunicación con clientes',
      'IA y automatización de tareas repetitivas',
      'Aún no lo sé; prefiero hablar primero de las opciones'
    ],

    clients: [
      'Clientes particulares',
      'Empresas',
      'Particulares y empresas',
      'Todavía sin clientes habituales'
    ],

    challenge: [
      'Conseguir más clientes',
      'Mejorar la visibilidad online',
      'Proyectar una imagen más profesional',
      'Falta de tiempo para marketing',
      'Ningún reto específico por ahora',
      'Otro / prefiero hablarlo en la reunión'
    ],

    photos: [
      'Sí, material visual profesional',
      'Sí, fotos o vídeos hechos por mí',
      'Todavía no, pero me gustaría encargarlos',
      'Todavía no, por ahora no es necesario'
    ],

    budget: [
      'Aún no decidido',
      'Menos de 500 €',
      '500 € – 1.000 €',
      '1.000 € – 2.000 €',
      'Más de 2.000 €',
      'Prefiero hablarlo en persona'
    ]
  }
};

/* ==========================================
   FORMULIER ELEMENTEN
========================================== */

const form = document.getElementById('intake');

const steps = [
  ...document.querySelectorAll('.intake-step')
];

const feedback = document.getElementById('feedback');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const submit = document.getElementById('submit');
const languageSelect = document.getElementById('language');

let step = 0;

const requestedLang = new URLSearchParams(window.location.search).get('lang');
let lang = ['fr', 'en', 'tr', 'es'].includes(requestedLang) ? requestedLang : 'nl';

languageSelect.value = lang;

/* ==========================================
   ANTWOORDOPTIES GENEREREN
========================================== */

function optionNode(key, index, multiple) {

  const label = document.createElement('label');
  label.className = 'intake-choice';

  const input = document.createElement('input');

  input.type = multiple ? 'checkbox' : 'radio';
  input.name = key;

  // Altijd Nederlandse waarden opslaan.
  // Zo blijven antwoorden in de database
  // consistent, ongeacht de gekozen taal.
  input.value = dictionaries.nl[key][index];

  input.id = `${key}-${index}`;

  const span = document.createElement('span');

  span.textContent = dictionaries[lang][key][index];

  label.append(input, span);

  /*
   * Bij activiteiten mogen meerdere sectoren
   * geselecteerd worden, inclusief opstartfase.
   *
   * Bij andere meerkeuzevragen wordt de laatste
   * optie als exclusieve keuze behandeld.
   */

  if (multiple) {

    input.addEventListener('change', () => {

      if (!input.checked || key === 'activities') {
        return;
      }

      const noneIndex = dictionaries.nl[key].length - 1;

      label.parentElement
        .querySelectorAll('input:checked')
        .forEach(other => {

          if (other === input) return;

          const otherIndex = Number(
            other.id.split('-').at(-1)
          );

          if (
            index === noneIndex ||
            otherIndex === noneIndex
          ) {
            other.checked = false;
          }

        });

    });

  }

  return label;
}

/* ==========================================
   KEUZES OPBOUWEN
========================================== */

function renderChoices() {

  document
    .querySelectorAll('[data-multi]')
    .forEach(fieldset => {

      const key = fieldset.dataset.multi;
      const container = fieldset.querySelector('.intake-options');

      if (!container || !dictionaries.nl[key]) return;

      container.replaceChildren();

      dictionaries.nl[key].forEach((_, index) => {

        container.append(
          optionNode(key, index, true)
        );

      });

    });

  document
    .querySelectorAll('[data-single]')
    .forEach(container => {

      const key = container.dataset.single;

      if (!dictionaries.nl[key]) return;

      container.replaceChildren();

      dictionaries.nl[key].forEach((_, index) => {

        container.append(
          optionNode(key, index, false)
        );

      });

    });

}

/* ==========================================
   VERTALEN
========================================== */

function translate() {

  const t = dictionaries[lang];

  document.documentElement.lang = lang;

  document.title =
    `${t.kicker.split('·').at(-1).trim()} | Upside Agency`;

  // Alle gewone teksten vertalen.

  document
    .querySelectorAll('[data-i18n]')
    .forEach(element => {

      const key = element.dataset.i18n;

      if (t[key] !== undefined) {
        element.textContent = t[key];
      }

    });

  // Placeholders vertalen.

  document
    .querySelectorAll('[data-placeholder]')
    .forEach(element => {

      const key = element.dataset.placeholder;

      if (t[key] !== undefined) {
        element.placeholder = t[key];
      }

    });

  // Antwoordkaarten vertalen zonder
  // geselecteerde antwoorden te verliezen.

  keys.forEach(key => {

    form
      .querySelectorAll(`input[name="${key}"]`)
      .forEach(input => {

        const index = Number(
          input.id.split('-').at(-1)
        );

        const span = input.parentElement
          .querySelector('span');

        if (span && t[key]?.[index] !== undefined) {
          span.textContent = t[key][index];
        }

      });

  });

  updateStep(false);

  feedback.textContent = '';

}

/* ==========================================
   VOORTGANG EN STAPPEN
========================================== */

function updateStep(scroll = true) {

  steps.forEach((section, index) => {

    section.hidden = index !== step;

  });

  prev.hidden = step === 0;

  next.hidden = step === steps.length - 1;

  submit.hidden = step !== steps.length - 1;

  const percent = Math.round(
    ((step + 1) / steps.length) * 100
  );

  const stepText = dictionaries[lang].step
    .replace('{n}', step + 1)
    .replace('{total}', steps.length);

  document.getElementById('stepLabel')
    .textContent = stepText;

  document.getElementById('stepPercent')
    .textContent = `${percent}%`;

  document.getElementById('progressFill')
    .style.width = `${percent}%`;

  document.getElementById('progress')
    .setAttribute(
      'aria-valuenow',
      String(percent)
    );

  if (scroll) {

    document.querySelector('.intake-shell')
      .scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

  }

}

/* ==========================================
   TAAL WISSELEN
========================================== */

languageSelect.addEventListener('change', () => {

  lang = languageSelect.value;

  translate();

});

/* ==========================================
   VOLGENDE STAP
========================================== */

next.addEventListener('click', () => {

  const company = document.getElementById('company');

  if (step === 0 && !company.value.trim()) {

    feedback.textContent =
      dictionaries[lang].companyError;

    company.focus();

    return;

  }

  feedback.textContent = '';

  step = Math.min(
    step + 1,
    steps.length - 1
  );

  updateStep();

});

/* ==========================================
   VORIGE STAP
========================================== */

prev.addEventListener('click', () => {

  feedback.textContent = '';

  step = Math.max(step - 1, 0);

  updateStep();

});

/* ==========================================
   FORMULIER VERZENDEN
========================================== */

form.addEventListener('submit', async event => {

  event.preventDefault();

  feedback.textContent = '';

  const company = document.getElementById('company');

  // Bedrijfsnaam verplicht.

  if (!company.value.trim()) {

    step = 0;

    updateStep();

    feedback.textContent =
      dictionaries[lang].companyError;

    company.focus();

    return;

  }

  // Privacytoestemming verplicht.

  const consent = document.getElementById('consent');

  if (!consent.checked) {

    feedback.textContent =
      dictionaries[lang].consentError;

    consent.focus();

    return;

  }

  // Antwoorden ophalen.

  const single = key => {

    return form.querySelector(
      `input[name="${key}"]:checked`
    )?.value || '';

  };

  const multi = key => {

    return [
      ...form.querySelectorAll(
        `input[name="${key}"]:checked`
      )
    ].map(input => input.value);

  };

  // Gegevens voorbereiden.

  const payload = {

    company: company.value.trim(),

    activities: multi('activities'),

    clients: single('clients'),

    existing: multi('existing'),

    acquisition: multi('acquisition'),

    services: multi('services'),

    challenge: single('challenge'),

    photos: single('photos'),

    budget: single('budget'),

    notes: document.getElementById('notes')
      .value.trim(),

    consent: true,

    language: lang

  };

  // Verzendknop tijdelijk uitschakelen.

  submit.disabled = true;

  submit.textContent = dictionaries[lang].sending;

  try {

    const response = await fetch(ENDPOINT, {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(payload)

    });

    if (!response.ok) {

      throw new Error(
        `Submission failed: ${response.status}`
      );

    }

    // Alleen succes tonen als de server
    // de inzending daadwerkelijk accepteert.

    form.hidden = true;

    document.getElementById('success')
      .hidden = false;

    document.querySelector('.intake-progress')
      .hidden = true;

    document.querySelector('.intake-shell')
      .scrollIntoView({
        behavior: 'smooth'
      });

  } catch (error) {

    console.error(
      'Kennismakingsformulier:',
      error
    );

    feedback.textContent =
      dictionaries[lang].sendError;

  } finally {

    submit.disabled = false;

    submit.textContent = dictionaries[lang].send;

  }

});

/* ==========================================
   INITIALISEREN
========================================== */

renderChoices();

translate();
