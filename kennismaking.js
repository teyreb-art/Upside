
'use strict';

const ENDPOINT = '/api/kennismaking';

const keys = [
  'activities', 'existing', 'acquisition', 'services',
  'clients', 'challenge', 'photos', 'budget'
];

const dictionaries = {
  nl: {
    language:'Taal',
    home:'Terug naar website',
    kicker:'UPSIDE AGENCY · KENNISMAKING',
    heading:'Vertel ons over jouw onderneming.',
    intro:'Met een paar korte vragen leren we jouw bedrijf beter kennen en bereiden we ons gesprek voor.',
    duration:'Ongeveer 5 minuten · 10 vragen',
    step:'Stap {n} van {total}',
    multiple:'Meerdere antwoorden mogelijk',
    multipleOptional:'Meerdere antwoorden mogelijk. Je hoeft nog niets definitief te kiezen.',
    companyPlaceholder:'Naam van jouw onderneming',
    optional:'Optioneel',
    previous:'Vorige',
    next:'Volgende',
    send:'Antwoorden versturen',
    sending:'Bezig met verzenden…',
    consent:'Ik ga ermee akkoord dat Upside Agency mijn antwoorden gebruikt om het kennismakingsgesprek voor te bereiden.',
    privacy:'Privacyinformatie',
    footnote:'Je gegevens worden niet gebruikt voor nieuwsbrieven zonder aparte toestemming.',
    successTitle:'Bedankt voor het invullen!',
    successText:'Je antwoorden zijn ontvangen en worden meegenomen naar ons gesprek.',
    companyError:'Vul eerst de naam van je bedrijf in.',
    consentError:'Vink eerst de toestemming aan.',
    sendError:'Verzenden is momenteel niet beschikbaar. De Cloudflare-koppeling moet nog worden ingesteld.',
    q1:'Wat is de naam van jouw bedrijf?',
    q2:'Welke werkzaamheden voert jouw bedrijf uit?',
    q3:'Wie zijn jouw belangrijkste klanten?',
    q4:'Wat heeft jouw bedrijf momenteel al?',
    q5:'Hoe vinden nieuwe klanten jouw bedrijf?',
    q6:'Bij welke diensten zou jouw bedrijf ondersteuning kunnen gebruiken?',
    q7:'Wat is momenteel de grootste uitdaging voor jouw bedrijf?',
    q8:"Heb je al foto's van uitgevoerde projecten?",
    q9:'Heb je al een budget voorzien voor marketing en online zichtbaarheid?',
    q10:'Is er nog iets dat je graag wilt bespreken?',
    activities:['Laswerken op maat','Metaalconstructies','Trappen en leuningen','Poorten en afsluitingen','Industriële laswerken','Herstellingen en onderhoud','Andere werkzaamheden','Nog niet actief'],
    existing:['Website','Google Bedrijfsprofiel','Facebookpagina','Instagrampagina','TikTok-account','Logo en huisstijl','Visitekaartjes of flyers','Professioneel e-mailadres','Nog niets van bovenstaande'],
    acquisition:['Mond-tot-mondreclame','Google','Sociale media','Via andere bedrijven of aannemers','Via bestaande klanten','Andere manieren','Nog geen klanten via deze kanalen'],
    services:['Een professionele website laten maken of verbeteren','Beter vindbaar worden op Google (SEO)','Google Bedrijfsprofiel aanmaken of verbeteren','Logo en huisstijl ontwerpen','Sociale media aanmaken of beheren (Instagram, Facebook, TikTok)','Online advertenties (Google Ads / sociale media)','Visitekaartjes, flyers en reclameaffiches','Google Reviews verzamelen via QR-code of NFC-kaart','Professioneel e-mailadres instellen','E-mailmarketing en klantencommunicatie','AI en automatisering van repetitieve taken','Nog niet zeker, ik wil eerst de mogelijkheden bespreken'],
    clients:['Particulieren','Bedrijven','Zowel particulieren als bedrijven','Nog geen vaste klanten'],
    challenge:['Meer klanten vinden','Online zichtbaarheid verbeteren','Professionelere uitstraling creëren','Weinig tijd voor marketing','Nog geen specifieke uitdagingen','Anders / bespreek ik liever tijdens het gesprek'],
    photos:['Ja, professionele foto’s','Ja, foto’s met mijn telefoon','Nog niet, maar ik wil die wel maken','Nog niet, momenteel niet nodig'],
    budget:['Nog niet bepaald','Minder dan €500','€500 – €1.000','€1.000 – €2.000','Meer dan €2.000','Bespreek ik liever persoonlijk']
  },

  en: {
    language:'Language',
    home:'Back to website',
    kicker:'UPSIDE AGENCY · INTRODUCTION',
    heading:'Tell us about your business.',
    intro:'A few short questions will help us get to know your business and prepare for our meeting.',
    duration:'About 5 minutes · 10 questions',
    step:'Step {n} of {total}',
    multiple:'You can select more than one',
    multipleOptional:'Select as many as you like. Nothing is final yet.',
    companyPlaceholder:'Your company name',
    optional:'Optional',
    previous:'Back',
    next:'Next',
    send:'Send answers',
    sending:'Sending…',
    consent:'I agree that Upside Agency may use my answers to prepare for our introductory meeting.',
    privacy:'Privacy information',
    footnote:'Your details will not be used for newsletters without separate consent.',
    successTitle:'Thank you!',
    successText:'Your answers have been received and will help us prepare for our meeting.',
    companyError:'Please enter your company name first.',
    consentError:'Please agree to the privacy statement first.',
    sendError:'Sending is not available yet. The Cloudflare connection still needs to be set up.',
    q1:'What is your company’s name?',
    q2:'What kind of work does your company do?',
    q3:'Who are your main customers?',
    q4:'What does your business already have?',
    q5:'How do new customers find your business?',
    q6:'Which services could your business use help with?',
    q7:'What is currently your biggest business challenge?',
    q8:'Do you have photos of completed projects?',
    q9:'Have you set a budget for marketing and online visibility?',
    q10:'Is there anything else you would like to discuss?',
    activities:['Custom welding','Metal structures','Stairs and railings','Gates and fencing','Industrial welding','Repairs and maintenance','Other activities','Not operating yet'],
    existing:['Website','Google Business Profile','Facebook page','Instagram page','TikTok account','Logo and visual identity','Business cards or flyers','Professional email address','None of the above yet'],
    acquisition:['Word of mouth','Google','Social media','Other businesses or contractors','Existing customers','Other ways','No customers through these channels yet'],
    services:['Create or improve a professional website','Improve Google visibility (SEO)','Create or improve Google Business Profile','Design a logo and visual identity','Set up or manage social media (Instagram, Facebook, TikTok)','Online advertising (Google Ads / social media)','Business cards, flyers and posters','Collect Google reviews using QR codes or NFC cards','Set up a professional email address','Email marketing and customer communication','AI and automation of repetitive tasks','Not sure yet; I would like to discuss the options first'],
    clients:['Private individuals','Businesses','Both individuals and businesses','No regular customers yet'],
    challenge:['Finding more customers','Improving online visibility','Creating a more professional image','Not enough time for marketing','No specific challenges yet','Other / prefer to discuss in person'],
    photos:['Yes, professional photos','Yes, photos taken with my phone','Not yet, but I would like to take some','Not yet, not needed at the moment'],
    budget:['Not decided yet','Less than €500','€500–€1,000','€1,000–€2,000','More than €2,000','Prefer to discuss in person']
  },

  fr: {
    language:'Langue',
    home:'Retour au site',
    kicker:'UPSIDE AGENCY · PREMIER CONTACT',
    heading:'Parlez-nous de votre entreprise.',
    intro:'Quelques questions rapides nous aideront à mieux connaître votre entreprise et à préparer notre rendez-vous.',
    duration:'Environ 5 minutes · 10 questions',
    step:'Étape {n} sur {total}',
    multiple:'Plusieurs réponses possibles',
    multipleOptional:'Plusieurs réponses possibles. Rien n’est définitif à ce stade.',
    companyPlaceholder:'Nom de votre entreprise',
    optional:'Facultatif',
    previous:'Précédent',
    next:'Suivant',
    send:'Envoyer les réponses',
    sending:'Envoi en cours…',
    consent:'J’accepte qu’Upside Agency utilise mes réponses pour préparer notre premier rendez-vous.',
    privacy:'Politique de confidentialité',
    footnote:'Vos données ne seront pas utilisées pour des newsletters sans consentement distinct.',
    successTitle:'Merci pour vos réponses !',
    successText:'Vos réponses ont été reçues et serviront à préparer notre rendez-vous.',
    companyError:'Veuillez d’abord indiquer le nom de votre entreprise.',
    consentError:'Veuillez d’abord donner votre accord.',
    sendError:'L’envoi n’est pas encore disponible. La connexion Cloudflare doit être configurée.',
    q1:'Quel est le nom de votre entreprise ?',
    q2:'Quels types de travaux réalisez-vous ?',
    q3:'Qui sont vos principaux clients ?',
    q4:'Quels outils votre entreprise possède-t-elle déjà ?',
    q5:'Comment de nouveaux clients trouvent-ils votre entreprise ?',
    q6:'Pour quels services auriez-vous besoin d’aide ?',
    q7:'Quel est actuellement le plus grand défi de votre entreprise ?',
    q8:'Avez-vous des photos de projets réalisés ?',
    q9:'Avez-vous prévu un budget pour le marketing et la visibilité en ligne ?',
    q10:'Y a-t-il autre chose dont vous souhaitez parler ?',
    activities:['Soudure sur mesure','Constructions métalliques','Escaliers et garde-corps','Portails et clôtures','Soudure industrielle','Réparations et entretien','Autres activités','Pas encore en activité'],
    existing:['Site web','Fiche d’établissement Google','Page Facebook','Page Instagram','Compte TikTok','Logo et identité visuelle','Cartes de visite ou flyers','Adresse e-mail professionnelle','Aucun de ces éléments'],
    acquisition:['Bouche-à-oreille','Google','Réseaux sociaux','Autres entreprises ou entrepreneurs','Clients existants','Autres moyens','Pas encore de clients via ces canaux'],
    services:['Créer ou améliorer un site web professionnel','Améliorer le référencement Google (SEO)','Créer ou améliorer la fiche Google','Créer un logo et une identité visuelle','Créer ou gérer les réseaux sociaux (Instagram, Facebook, TikTok)','Publicité en ligne (Google Ads / réseaux sociaux)','Cartes de visite, flyers et affiches','Obtenir des avis Google via QR code ou carte NFC','Configurer une adresse e-mail professionnelle','E-mail marketing et communication client','IA et automatisation des tâches répétitives','Je ne sais pas encore, je préfère en discuter'],
    clients:['Particuliers','Entreprises','Particuliers et entreprises','Pas encore de clients réguliers'],
    challenge:['Trouver plus de clients','Améliorer la visibilité en ligne','Renforcer l’image professionnelle','Manque de temps pour le marketing','Pas de difficulté particulière','Autre / à discuter en personne'],
    photos:['Oui, des photos professionnelles','Oui, des photos prises au téléphone','Pas encore, mais je souhaite en prendre','Pas encore, ce n’est pas nécessaire'],
    budget:['Pas encore défini','Moins de 500 €','500 € – 1 000 €','1 000 € – 2 000 €','Plus de 2 000 €','Je préfère en discuter']
  },

  tr: {
    language:'Dil',
    home:'Web sitesine dön',
    kicker:'UPSIDE AGENCY · TANIŞMA',
    heading:'Bize işletmenizden bahsedin.',
    intro:'Birkaç kısa soruyla işletmenizi daha iyi tanıyıp görüşmemize hazırlanabiliriz.',
    duration:'Yaklaşık 5 dakika · 10 soru',
    step:'{total} adımdan {n}. adım',
    multiple:'Birden fazla seçenek işaretleyebilirsiniz',
    multipleOptional:'Birden fazla seçenek işaretleyebilirsiniz. Henüz kesin karar vermeniz gerekmiyor.',
    companyPlaceholder:'İşletmenizin adı',
    optional:'İsteğe bağlı',
    previous:'Geri',
    next:'İleri',
    send:'Yanıtları gönder',
    sending:'Gönderiliyor…',
    consent:'Upside Agency’nin yanıtlarımı tanışma görüşmesine hazırlanmak amacıyla kullanmasını kabul ediyorum.',
    privacy:'Gizlilik bilgileri',
    footnote:'Ayrı onayınız olmadan bilgileriniz e-posta bültenleri için kullanılmaz.',
    successTitle:'Doldurduğunuz için teşekkürler!',
    successText:'Yanıtlarınız alındı ve görüşmemize hazırlanırken kullanılacak.',
    companyError:'Önce işletmenizin adını girin.',
    consentError:'Lütfen önce onay kutusunu işaretleyin.',
    sendError:'Gönderim henüz kullanılamıyor. Cloudflare bağlantısının kurulması gerekiyor.',
    q1:'İşletmenizin adı nedir?',
    q2:'İşletmeniz hangi işleri yapıyor?',
    q3:'Başlıca müşterileriniz kimler?',
    q4:'İşletmenizde şu anda neler var?',
    q5:'Yeni müşteriler işletmenizi nasıl buluyor?',
    q6:'Hangi hizmetlerde desteğe ihtiyaç duyabilirsiniz?',
    q7:'İşletmenizin şu anki en büyük zorluğu nedir?',
    q8:'Tamamladığınız projelerin fotoğrafları var mı?',
    q9:'Pazarlama ve internette görünürlük için bütçe ayırdınız mı?',
    q10:'Görüşmek istediğiniz başka bir konu var mı?',
    activities:['Özel kaynak işleri','Metal konstrüksiyon','Merdiven ve korkuluklar','Kapı ve çitler','Endüstriyel kaynak işleri','Tamir ve bakım','Diğer işler','Henüz faaliyette değil'],
    existing:['Web sitesi','Google İşletme Profili','Facebook sayfası','Instagram sayfası','TikTok hesabı','Logo ve kurumsal kimlik','Kartvizit veya broşür','Profesyonel e-posta adresi','Henüz hiçbiri yok'],
    acquisition:['Tavsiye yoluyla','Google','Sosyal medya','Diğer işletmeler veya müteahhitler aracılığıyla','Mevcut müşteriler aracılığıyla','Diğer yollar','Henüz bu kanallardan müşteri gelmiyor'],
    services:['Profesyonel web sitesi oluşturma veya iyileştirme','Google’da daha görünür olma (SEO)','Google İşletme Profili oluşturma veya iyileştirme','Logo ve kurumsal kimlik tasarımı','Sosyal medya hesabı açma veya yönetme (Instagram, Facebook, TikTok)','İnternet reklamları (Google Ads / sosyal medya)','Kartvizit, broşür ve reklam afişleri','QR kod veya NFC kartıyla Google yorumu toplama','Profesyonel e-posta adresi kurma','E-posta pazarlaması ve müşteri iletişimi','Yapay zekâ ve tekrarlayan işlerin otomasyonu','Henüz emin değilim, önce seçenekleri görüşmek istiyorum'],
    clients:['Bireysel müşteriler','Şirketler','Hem bireysel müşteriler hem şirketler','Henüz düzenli müşterim yok'],
    challenge:['Daha fazla müşteri bulmak','İnternette görünürlüğü artırmak','Daha profesyonel bir imaj oluşturmak','Pazarlamaya yeterli zaman ayıramamak','Şu an belirli bir zorluk yok','Diğer / görüşmede konuşmak isterim'],
    photos:['Evet, profesyonel fotoğraflar','Evet, telefonla çekilmiş fotoğraflar','Henüz yok ama çekmek istiyorum','Henüz yok, şu an gerekli değil'],
    budget:['Henüz belirlemedim','500 € altı','500 € – 1.000 €','1.000 € – 2.000 €','2.000 € üzeri','Yüz yüze görüşmek isterim']
  },

  es: {
    language:'Idioma',
    home:'Volver al sitio web',
    kicker:'UPSIDE AGENCY · PRIMER CONTACTO',
    heading:'Cuéntanos sobre tu empresa.',
    intro:'Unas preguntas breves nos ayudarán a conocer mejor tu negocio y preparar nuestra reunión.',
    duration:'Unos 5 minutos · 10 preguntas',
    step:'Paso {n} de {total}',
    multiple:'Puedes seleccionar varias respuestas',
    multipleOptional:'Puedes seleccionar varias respuestas. No tienes que decidir nada todavía.',
    companyPlaceholder:'Nombre de tu empresa',
    optional:'Opcional',
    previous:'Anterior',
    next:'Siguiente',
    send:'Enviar respuestas',
    sending:'Enviando…',
    consent:'Acepto que Upside Agency utilice mis respuestas para preparar nuestra primera reunión.',
    privacy:'Información de privacidad',
    footnote:'Tus datos no se utilizarán para boletines sin tu consentimiento por separado.',
    successTitle:'¡Gracias por completar el formulario!',
    successText:'Hemos recibido tus respuestas y las utilizaremos para preparar nuestra reunión.',
    companyError:'Primero introduce el nombre de tu empresa.',
    consentError:'Primero debes aceptar el consentimiento.',
    sendError:'El envío todavía no está disponible. Falta configurar la conexión con Cloudflare.',
    q1:'¿Cómo se llama tu empresa?',
    q2:'¿Qué tipo de trabajos realiza tu empresa?',
    q3:'¿Quiénes son tus principales clientes?',
    q4:'¿Con qué recursos cuenta ya tu empresa?',
    q5:'¿Cómo encuentran tu empresa los nuevos clientes?',
    q6:'¿En qué servicios podría necesitar ayuda tu empresa?',
    q7:'¿Cuál es actualmente el mayor reto de tu empresa?',
    q8:'¿Tienes fotos de proyectos realizados?',
    q9:'¿Has reservado un presupuesto para marketing y visibilidad online?',
    q10:'¿Hay algo más que quieras comentar?',
    activities:['Trabajos de soldadura a medida','Estructuras metálicas','Escaleras y barandillas','Puertas y vallas','Soldadura industrial','Reparaciones y mantenimiento','Otros trabajos','Todavía sin actividad'],
    existing:['Sitio web','Perfil de Empresa en Google','Página de Facebook','Página de Instagram','Cuenta de TikTok','Logotipo e identidad visual','Tarjetas de visita o folletos','Correo electrónico profesional','Todavía ninguno de los anteriores'],
    acquisition:['Recomendaciones personales','Google','Redes sociales','Otras empresas o contratistas','Clientes actuales','Otros medios','Todavía no llegan clientes por estos canales'],
    services:['Crear o mejorar un sitio web profesional','Mejorar la visibilidad en Google (SEO)','Crear o mejorar el Perfil de Empresa en Google','Diseñar logotipo e identidad visual','Crear o gestionar redes sociales (Instagram, Facebook, TikTok)','Publicidad online (Google Ads / redes sociales)','Tarjetas de visita, folletos y carteles','Conseguir reseñas de Google mediante QR o tarjeta NFC','Configurar un correo electrónico profesional','Email marketing y comunicación con clientes','IA y automatización de tareas repetitivas','Aún no lo sé; prefiero hablar primero de las opciones'],
    clients:['Clientes particulares','Empresas','Particulares y empresas','Todavía sin clientes habituales'],
    challenge:['Conseguir más clientes','Mejorar la visibilidad online','Proyectar una imagen más profesional','Falta de tiempo para marketing','Ningún reto específico por ahora','Otro / prefiero hablarlo en la reunión'],
    photos:['Sí, fotos profesionales','Sí, fotos hechas con el móvil','Todavía no, pero quiero hacerlas','Todavía no, por ahora no hace falta'],
    budget:['Aún no decidido','Menos de 500 €','500 € – 1.000 €','1.000 € – 2.000 €','Más de 2.000 €','Prefiero hablarlo en persona']
  }
};

/* FORMULIER */

const form = document.getElementById('intake');
const steps = [...document.querySelectorAll('.intake-step')];
const feedback = document.getElementById('feedback');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const submit = document.getElementById('submit');
const languageSelect = document.getElementById('language');

let step = 0;
const browserLang = navigator.language.toLowerCase().split('-')[0];
let lang = dictionaries[browserLang] ? browserLang : 'nl';
languageSelect.value = lang;

/* ANTWOORDEN AANMAKEN */

function optionNode(key, index, multiple) {
  const label = document.createElement('label');
  label.className = 'intake-choice';

  const input = document.createElement('input');
  input.type = multiple ? 'checkbox' : 'radio';
  input.name = key;
  input.value = dictionaries.nl[key][index];
  input.id = `${key}-${index}`;

  const span = document.createElement('span');
  span.textContent = dictionaries[lang][key][index];

  label.append(input, span);

  if (multiple) {
    input.addEventListener('change', () => {
      if (!input.checked) return;

      const noneIndex = dictionaries.nl[key].length - 1;

      label.parentElement
        .querySelectorAll('input:checked')
        .forEach(other => {
          if (other === input) return;

          const otherIndex = Number(other.id.split('-').at(-1));

          if (index === noneIndex || otherIndex === noneIndex) {
            other.checked = false;
          }
        });
    });
  }

  return label;
}

function renderChoices() {
  document.querySelectorAll('[data-multi]').forEach(fieldset => {
    const key = fieldset.dataset.multi;
    const container = fieldset.querySelector('.intake-options');

    dictionaries.nl[key].forEach((_, i) => {
      container.append(optionNode(key, i, true));
    });
  });

  document.querySelectorAll('[data-single]').forEach(container => {
    const key = container.dataset.single;

    dictionaries.nl[key].forEach((_, i) => {
      container.append(optionNode(key, i, false));
    });
  });
}

/* VERTALEN */

function translate() {
  const t = dictionaries[lang];

  document.documentElement.lang = lang;
  document.title =
    `${t.kicker.split('·').at(-1).trim()} | Upside Agency`;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t[el.dataset.i18n];
  });

  document.querySelectorAll('[data-placeholder]').forEach(el => {
    el.placeholder = t[el.dataset.placeholder];
  });

  keys.forEach(key => {
    form.querySelectorAll(`input[name="${key}"]`).forEach(input => {
      const i = Number(input.id.split('-').at(-1));
      input.parentElement.querySelector('span').textContent = t[key][i];
    });
  });

  updateStep(false);
  feedback.textContent = '';
}

/* STAPPEN */

function updateStep(scroll = true) {
  steps.forEach((section, i) => {
    section.hidden = i !== step;
  });

  prev.hidden = step === 0;
  next.hidden = step === steps.length - 1;
  submit.hidden = step !== steps.length - 1;

  const percent = Math.round((step + 1) / steps.length * 100);

  document.getElementById('stepLabel').textContent =
    dictionaries[lang].step
      .replace('{n}', step + 1)
      .replace('{total}', steps.length);

  document.getElementById('stepPercent').textContent = `${percent}%`;
  document.getElementById('progressFill').style.width = `${percent}%`;

  document.getElementById('progress')
    .setAttribute('aria-valuenow', String(percent));

  if (scroll) {
    document.querySelector('.intake-shell')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* TAAL WISSELEN */

languageSelect.addEventListener('change', () => {
  lang = languageSelect.value;
  translate();
});

/* VOLGENDE */

next.addEventListener('click', () => {
  if (step === 0 && !document.getElementById('company').value.trim()) {
    feedback.textContent = dictionaries[lang].companyError;
    document.getElementById('company').focus();
    return;
  }

  feedback.textContent = '';
  step = Math.min(step + 1, steps.length - 1);
  updateStep();
});

/* VORIGE */

prev.addEventListener('click', () => {
  feedback.textContent = '';
  step = Math.max(step - 1, 0);
  updateStep();
});

/* VERZENDEN */

form.addEventListener('submit', async event => {
  event.preventDefault();
  feedback.textContent = '';

  if (!document.getElementById('company').value.trim()) {
    step = 0;
    updateStep();
    feedback.textContent = dictionaries[lang].companyError;
    return;
  }

  if (!document.getElementById('consent').checked) {
    feedback.textContent = dictionaries[lang].consentError;
    return;
  }

  const single = key =>
    form.querySelector(`input[name="${key}"]:checked`)?.value || '';

  const multi = key =>
    [...form.querySelectorAll(`input[name="${key}"]:checked`)]
      .map(el => el.value);

  const payload = {
    company: document.getElementById('company').value.trim(),
    activities: multi('activities'),
    clients: single('clients'),
    existing: multi('existing'),
    acquisition: multi('acquisition'),
    services: multi('services'),
    challenge: single('challenge'),
    photos: single('photos'),
    budget: single('budget'),
    notes: document.getElementById('notes').value.trim(),
    consent: true,
    language: lang
  };

  submit.disabled = true;
  submit.textContent = dictionaries[lang].sending;

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    form.hidden = true;
    document.getElementById('success').hidden = false;
    document.querySelector('.intake-progress').hidden = true;
    document.querySelector('.intake-shell')
      .scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    feedback.textContent = dictionaries[lang].sendError;

  } finally {
    submit.disabled = false;
    submit.textContent = dictionaries[lang].send;
  }
});

/* START */

renderChoices();
translate();
