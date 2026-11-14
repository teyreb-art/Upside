
"use strict";

// UPSIDE AGENCY — SCRIPT.JS
// DEEL 1 VAN 3
// Ondersteunde talen: NL, FR, EN, TR, ES

const LANGUAGES = ["nl", "fr", "en", "tr", "es"];

function getLang() {
  const param = new URLSearchParams(location.search).get("lang");

  if (LANGUAGES.includes(param)) return param;

  try {
    const saved =
      localStorage.getItem("upside-language") ||
      localStorage.getItem("upside-lang");

    if (LANGUAGES.includes(saved)) return saved;
  } catch (_) {}

  return "nl";
}

function setLang(lang) {
  if (!LANGUAGES.includes(lang)) lang = "nl";

  try {
    localStorage.setItem("upside-language", lang);
    localStorage.setItem("upside-lang", lang);
  } catch (_) {}

  document.documentElement.lang =
    lang === "nl" ? "nl-BE" : lang;

  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) return;

    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;

      if (lang === "nl") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", lang);
      }

      link.href = url.pathname + url.search + url.hash;
    } catch (_) {}
  });
}

const scanTranslations = {
  nl: {
    questions: [
      {
        title: "Wat voor onderneming heb je?",
        hint: "Kies wat het beste bij jouw aanbod past.",
        options: [
          "Dienstverlening",
          "Horeca of winkel",
          "Webshop",
          "Creatief of zelfstandig beroep"
        ]
      },
      {
        title: "Waar sta je op dit moment?",
        hint: "Ook als je nog maar net begint, kun je stappen zetten.",
        options: [
          "Ik bereid mijn start voor",
          "Ik ben net gestart",
          "Ik heb al klanten en wil doorgroeien"
        ]
      },
      {
        title: "Wat wil je als eerste verbeteren?",
        hint: "We stemmen de eerste acties af op jouw prioriteit.",
        options: [
          "Meer klanten vinden",
          "Online zichtbaarder worden",
          "Tijd besparen",
          "Meer aanvragen via mijn website"
        ]
      },
      {
        title: "Hoe ziet jouw online basis eruit?",
        hint: "Er is geen goed of fout antwoord.",
        options: [
          "Ik heb nog geen website",
          "Mijn website kan beter",
          "Mijn website staat goed, maar trekt weinig bezoekers",
          "Ik ben vooral actief op social media"
        ]
      },
      {
        title: "Waar gaat veel terugkerende tijd naartoe?",
        hint: "Kies de taak die je het liefst eenvoudiger zou maken.",
        options: [
          "Vragen en aanvragen beantwoorden",
          "Content en social media",
          "Afspraken en opvolging",
          "Administratie en gegevens overtypen"
        ]
      },
      {
        title: "Hoeveel tijd kun je wekelijks vrijmaken?",
        hint: "Klein beginnen is ook beginnen.",
        options: [
          "Minder dan 2 uur",
          "2 tot 5 uur",
          "Meer dan 5 uur"
        ]
      }
    ],
    ui: {
      question: "VRAAG",
      previous: "Vorige",
      next: "Volgende",
      view: "Bekijk mijn groeiplan",
      save: "Bewaar mijn groeiplan",
      again: "Download opnieuw",
      restart: "Antwoorden aanpassen",
      heading: "Een helder begin voor jouw volgende stap.",
      resultHeading: "Een volgende stap die bij jou past.",
      priority: "JOUW PRIORITEIT",
      reportTitle: "Zo kunnen wij jouw groei ondersteunen.",
      first: "Onze eerste focus",
      basis: "Wij versterken je online basis",
      automation: "Wij maken ruimte met automatisering",
      days: "Voorstel voor onze eerste 30 dagen",
      week: "WEEK",
      ending: "Je hoeft niet alles alleen te doen.",
      endingText: "Wij denken met je mee en nemen de uitvoering samen door. Jij bepaalt of en wanneer je verder wilt.",
      discover: "Ontdek hoe we kunnen helpen"
    }
  },

  en: {
    questions: [
      {
        title: "What kind of business do you run?",
        hint: "Choose what best describes your offer.",
        options: [
          "Services",
          "Hospitality or retail",
          "Online store",
          "Creative or freelance profession"
        ]
      },
      {
        title: "Where are you right now?",
        hint: "Even if you are just starting, you can make progress.",
        options: [
          "Preparing to launch",
          "Just started",
          "Already have customers and want to grow"
        ]
      },
      {
        title: "What would you improve first?",
        hint: "We tailor the first actions to your priority.",
        options: [
          "Find more customers",
          "Increase online visibility",
          "Save time",
          "Get more enquiries through my website"
        ]
      },
      {
        title: "What is your online presence like?",
        hint: "There is no right or wrong answer.",
        options: [
          "I do not have a website yet",
          "My website needs improvement",
          "My website is good but gets few visitors",
          "I mainly use social media"
        ]
      },
      {
        title: "Which recurring tasks take the most time?",
        hint: "Choose the task you would most like to simplify.",
        options: [
          "Answering questions and enquiries",
          "Content and social media",
          "Appointments and follow-up",
          "Administration and data entry"
        ]
      },
      {
        title: "How much time can you spare each week?",
        hint: "Starting small is still a start.",
        options: [
          "Less than 2 hours",
          "2 to 5 hours",
          "More than 5 hours"
        ]
      }
    ],
    ui: {
      question: "QUESTION",
      previous: "Previous",
      next: "Next",
      view: "View my growth plan",
      save: "Save my growth plan",
      again: "Download again",
      restart: "Change answers",
      heading: "A clear start for your next step.",
      resultHeading: "A next step that suits you.",
      priority: "YOUR PRIORITY",
      reportTitle: "How we can support your growth.",
      first: "Our first focus",
      basis: "Strengthening your online presence",
      automation: "Making room with automation",
      days: "Our proposed first 30 days",
      week: "WEEK",
      ending: "You do not have to do it all alone.",
      endingText: "We will think along with you and discuss the work together. You decide if and when to continue.",
      discover: "Discover how we can help"
    }
  },

  fr: {
    questions: [
      {
        title: "Quel type d’entreprise avez-vous ?",
        hint: "Choisissez ce qui correspond le mieux à votre activité.",
        options: [
          "Services",
          "Horeca ou commerce",
          "Boutique en ligne",
          "Profession créative ou indépendante"
        ]
      },
      {
        title: "Où en êtes-vous actuellement ?",
        hint: "Même au début, vous pouvez avancer.",
        options: [
          "Je prépare mon lancement",
          "Je viens de démarrer",
          "J’ai déjà des clients et veux grandir"
        ]
      },
      {
        title: "Que souhaitez-vous améliorer en premier ?",
        hint: "Nous adaptons les premières actions à votre priorité.",
        options: [
          "Trouver plus de clients",
          "Gagner en visibilité en ligne",
          "Gagner du temps",
          "Recevoir plus de demandes via mon site"
        ]
      },
      {
        title: "Quelle est votre présence en ligne ?",
        hint: "Il n’y a pas de bonne ou de mauvaise réponse.",
        options: [
          "Je n’ai pas encore de site web",
          "Mon site peut être amélioré",
          "Mon site est bon mais reçoit peu de visites",
          "Je suis surtout actif sur les réseaux sociaux"
        ]
      },
      {
        title: "Quelles tâches répétitives prennent du temps ?",
        hint: "Choisissez celle que vous aimeriez simplifier.",
        options: [
          "Répondre aux questions et demandes",
          "Contenu et réseaux sociaux",
          "Rendez-vous et suivi",
          "Administration et saisie de données"
        ]
      },
      {
        title: "Combien de temps avez-vous par semaine ?",
        hint: "Commencer petit, c’est déjà commencer.",
        options: [
          "Moins de 2 heures",
          "2 à 5 heures",
          "Plus de 5 heures"
        ]
      }
    ],
    ui: {
      question: "QUESTION",
      previous: "Précédent",
      next: "Suivant",
      view: "Voir mon plan de croissance",
      save: "Enregistrer mon plan",
      again: "Télécharger à nouveau",
      restart: "Modifier mes réponses",
      heading: "Un départ clair pour votre prochaine étape.",
      resultHeading: "Une prochaine étape adaptée à votre activité.",
      priority: "VOTRE PRIORITÉ",
      reportTitle: "Comment soutenir votre croissance.",
      first: "Notre première priorité",
      basis: "Renforcer votre présence en ligne",
      automation: "Gagner du temps grâce à l’automatisation",
      days: "Nos 30 premiers jours proposés",
      week: "SEMAINE",
      ending: "Vous n’avez pas à tout faire seul.",
      endingText: "Nous réfléchissons avec vous et préparons les actions ensemble. Vous décidez de la suite.",
      discover: "Découvrez comment nous aider"
    }
  },

  tr: {
    questions: [
      {
        title: "Ne tür bir işletmeniz var?",
        hint: "Sunduğunuz hizmete en uygun seçeneği seçin.",
        options: [
          "Hizmet sektörü",
          "Restoran veya mağaza",
          "E-ticaret",
          "Yaratıcı veya serbest meslek"
        ]
      },
      {
        title: "Şu anda hangi aşamadasınız?",
        hint: "Yeni başlıyor olsanız bile ilerleyebilirsiniz.",
        options: [
          "İş kurmaya hazırlanıyorum",
          "Yeni başladım",
          "Müşterilerim var ve büyümek istiyorum"
        ]
      },
      {
        title: "Öncelikle neyi geliştirmek istiyorsunuz?",
        hint: "İlk adımları önceliğinize göre belirliyoruz.",
        options: [
          "Daha fazla müşteri bulmak",
          "İnternette daha görünür olmak",
          "Zaman kazanmak",
          "Web sitemden daha fazla talep almak"
        ]
      },
      {
        title: "İnternetteki varlığınız nasıl?",
        hint: "Doğru veya yanlış cevap yok.",
        options: [
          "Henüz web sitem yok",
          "Web sitem geliştirilebilir",
          "Web sitem iyi ama az ziyaretçi alıyor",
          "Daha çok sosyal medyada aktifim"
        ]
      },
      {
        title: "Hangi tekrarlayan işler zamanınızı alıyor?",
        hint: "En çok kolaylaştırmak istediğiniz işi seçin.",
        options: [
          "Soruları ve talepleri yanıtlamak",
          "İçerik ve sosyal medya",
          "Randevular ve takip",
          "İdari işler ve veri girişi"
        ]
      },
      {
        title: "Haftada ne kadar zaman ayırabilirsiniz?",
        hint: "Küçük başlamak da bir başlangıçtır.",
        options: [
          "2 saatten az",
          "2 ile 5 saat arası",
          "5 saatten fazla"
        ]
      }
    ],
    ui: {
      question: "SORU",
      previous: "Önceki",
      next: "Sonraki",
      view: "Büyüme planımı gör",
      save: "Büyüme planımı kaydet",
      again: "Tekrar indir",
      restart: "Cevapları değiştir",
      heading: "Bir sonraki adımınız için net bir başlangıç.",
      resultHeading: "Size uygun bir sonraki adım.",
      priority: "ÖNCELİĞİNİZ",
      reportTitle: "Büyümenizi nasıl destekleyebiliriz?",
      first: "İlk önceliğimiz",
      basis: "Dijital varlığınızı güçlendirmek",
      automation: "Otomasyonla zaman kazanmak",
      days: "İlk 30 gün için önerimiz",
      week: "HAFTA",
      ending: "Her şeyi tek başınıza yapmak zorunda değilsiniz.",
      endingText: "Sizinle birlikte düşünüyor ve yapılacak işleri değerlendiriyoruz. Devam edip etmeyeceğinize siz karar verirsiniz.",
      discover: "Nasıl yardımcı olabileceğimizi keşfedin"
    }
  },

  es: {
    questions: [
      {
        title: "¿Qué tipo de negocio tienes?",
        hint: "Elige la opción que mejor describa tu actividad.",
        options: [
          "Servicios",
          "Hostelería o comercio",
          "Tienda online",
          "Profesión creativa o autónoma"
        ]
      },
      {
        title: "¿En qué etapa estás?",
        hint: "Aunque acabes de empezar, puedes avanzar.",
        options: [
          "Estoy preparando mi lanzamiento",
          "Acabo de empezar",
          "Ya tengo clientes y quiero crecer"
        ]
      },
      {
        title: "¿Qué quieres mejorar primero?",
        hint: "Adaptamos las primeras acciones a tu prioridad.",
        options: [
          "Encontrar más clientes",
          "Aumentar mi visibilidad online",
          "Ahorrar tiempo",
          "Recibir más solicitudes desde mi web"
        ]
      },
      {
        title: "¿Cómo es tu presencia online?",
        hint: "No hay respuestas correctas o incorrectas.",
        options: [
          "Todavía no tengo web",
          "Mi web necesita mejoras",
          "Mi web está bien pero recibe pocas visitas",
          "Uso principalmente redes sociales"
        ]
      },
      {
        title: "¿Qué tareas repetitivas te quitan tiempo?",
        hint: "Elige la tarea que más te gustaría simplificar.",
        options: [
          "Responder preguntas y solicitudes",
          "Contenido y redes sociales",
          "Citas y seguimiento",
          "Administración e introducción de datos"
        ]
      },
      {
        title: "¿Cuánto tiempo tienes disponible por semana?",
        hint: "Empezar poco a poco también es empezar.",
        options: [
          "Menos de 2 horas",
          "De 2 a 5 horas",
          "Más de 5 horas"
        ]
      }
    ],
    ui: {
      question: "PREGUNTA",
      previous: "Anterior",
      next: "Siguiente",
      view: "Ver mi plan de crecimiento",
      save: "Guardar mi plan",
      again: "Descargar de nuevo",
      restart: "Cambiar respuestas",
      heading: "Un comienzo claro para tu siguiente paso.",
      resultHeading: "Un siguiente paso adaptado a ti.",
      priority: "TU PRIORIDAD",
      reportTitle: "Cómo podemos apoyar tu crecimiento.",
      first: "Nuestro primer objetivo",
      basis: "Reforzar tu presencia online",
      automation: "Ganar tiempo con automatización",
      days: "Nuestra propuesta para los primeros 30 días",
      week: "SEMANA",
      ending: "No tienes que hacerlo todo por tu cuenta.",
      endingText: "Pensamos contigo y revisamos juntos el trabajo. Tú decides si quieres continuar.",
      discover: "Descubre cómo podemos ayudarte"
    }
  }
};

/* ==========================================================
   UPSIDE AGENCY — SCRIPT.JS
   DEEL 2 VAN 3
   Groeiscan, adviezen en downloadbaar groeiplan
   ========================================================== */

const scanAdvice = {
  nl: {
    priorities: [
      "Wij gaan samen jouw ideale klant en aanbod scherpstellen. Vervolgens werken we een gerichte aanpak uit om de juiste mensen te bereiken.",
      "Wij gaan bepalen waar jouw doelgroep actief is en versterken daar je zichtbaarheid met een helder profiel, een duidelijk aanbod en relevante content.",
      "Wij gaan je terugkerende taken in kaart brengen en onderzoeken waar je de meeste tijd kunt besparen. Daarna werken we een passende automatisering uit.",
      "Wij gaan onderzoeken waar bezoekers afhaken en maken de route naar een aanvraag of afspraak duidelijker, op computer én telefoon."
    ],
    sectors: [
      "Wij gaan jouw aanbod helder verwoorden, zodat bezoekers begrijpen wat je doet, voor wie en hoe ze contact kunnen opnemen.",
      "Wij gaan je online bedrijfsprofiel nakijken en je locatie, openingsuren en aanbod helder presenteren.",
      "Wij gaan je productpagina's en bestelproces bekijken en werken aan duidelijke productinformatie en eenvoudiger afrekenen.",
      "Wij gaan jouw aanbod helder verwoorden, zodat bezoekers begrijpen wat je doet, voor wie en hoe ze contact kunnen opnemen."
    ],
    tasks: [
      "Wij gaan antwoorden op veelgestelde vragen voorbereiden en een slimmere opvolging van aanvragen opzetten, met ruimte voor persoonlijke controle.",
      "Wij gaan een efficiënte contentwerkwijze opzetten met AI als ondersteuning. We bewaken jouw eigen stem en controleren de inhoud voordat die wordt gebruikt.",
      "Wij gaan een passend boekingsproces met bevestigingen en herinneringen uitwerken en testen, zodat afspraken eenvoudiger worden opgevolgd.",
      "Wij gaan dubbele invoer opsporen en onderzoeken hoe jouw bestaande tools gegevens veilig kunnen uitwisselen."
    ],
    website: [
      "Wij gaan een overzichtelijke website uitwerken met jouw aanbod en duidelijke contactmogelijkheden.",
      "Wij gaan je online aanbod en contactmogelijkheden duidelijker maken."
    ],
    timing: [
      "Wij houden jouw inbreng beperkt en stemmen kort en gericht af.",
      "Wij stemmen vaste overlegmomenten af op jouw agenda."
    ],
    weeks: [
      "Wij brengen jouw situatie en prioriteiten in kaart.",
      "Wij werken de eerste gekozen verbetering uit.",
      "Wij testen en verfijnen de gekozen oplossing.",
      "Wij bespreken de inzichten en volgende stappen met jou."
    ],
    introduction: "Een voorstel voor jouw onderneming. Zo kan onze aanpak eruitzien als we samenwerken; de invulling en planning stemmen we samen af.",
    downloadIntro: "Voorstel voor hoe wij je bij een samenwerking kunnen ondersteunen. De invulling en planning stemmen we samen af.",
    downloadTitle: "JOUW UPSIDE GROEIPLAN",
    downloadBasis: "Wij versterken je online basis",
    downloadAutomation: "Slimmer werken",
    downloadDays: "VOORSTEL BIJ SAMENWERKING — 30 DAGEN",
    downloadTime: "Beschikbare tijd",
    disclaimer: "Deze testversie gebruikt vaste adviesregels, geen live AI-analyse. Geen voorspelling of gegarandeerd resultaat."
  },

  en: {
    priorities: [
      "We will clarify your ideal customer and your offer. Then we will develop a focused approach to reach the right people.",
      "We will identify where your target audience is active and improve your visibility with a clear profile, a strong offer and relevant content.",
      "We will identify your repetitive tasks and explore where you can save the most time. Then we will develop a suitable automation solution.",
      "We will examine where visitors leave your website and make the path to an enquiry or appointment clearer on desktop and mobile."
    ],
    sectors: [
      "We will explain your offer clearly so visitors understand what you do, who you help and how to contact you.",
      "We will review your online business profile and clearly present your location, opening hours and offer.",
      "We will review your product pages and checkout process, improving product information and making purchases easier.",
      "We will explain your offer clearly so visitors understand what you do, who you help and how to contact you."
    ],
    tasks: [
      "We will prepare answers to common questions and improve how enquiries are followed up, while keeping personal oversight.",
      "We will create a more efficient content workflow supported by AI, while preserving your voice and reviewing content before use.",
      "We will develop and test a booking process with confirmations and reminders to make appointment management easier.",
      "We will identify duplicate data entry and explore how your existing tools can exchange information securely."
    ],
    website: [
      "We will develop a clear website presenting your offer and making it easy for customers to contact you.",
      "We will make your online offer and contact options clearer."
    ],
    timing: [
      "We will keep your involvement limited and communicate briefly and efficiently.",
      "We will arrange regular meetings that fit your schedule."
    ],
    weeks: [
      "We assess your current situation and priorities.",
      "We develop the first selected improvement.",
      "We test and refine the chosen solution.",
      "We review the findings and next steps together."
    ],
    introduction: "A proposal for your business. This is how our approach could look if we work together; we will agree on the details and timing.",
    downloadIntro: "A proposal showing how we could support your business. We will agree on the details and schedule together.",
    downloadTitle: "YOUR UPSIDE GROWTH PLAN",
    downloadBasis: "Strengthening your online presence",
    downloadAutomation: "Working smarter",
    downloadDays: "PROPOSED FIRST 30 DAYS",
    downloadTime: "Available time",
    disclaimer: "This test version uses predefined advice rules, not live AI analysis. No results are predicted or guaranteed."
  },

  fr: {
    priorities: [
      "Nous allons définir votre client idéal et clarifier votre offre. Ensuite, nous préparerons une approche ciblée pour atteindre les bonnes personnes.",
      "Nous allons identifier les canaux utilisés par votre public cible et renforcer votre visibilité avec un profil clair, une offre précise et du contenu pertinent.",
      "Nous allons identifier vos tâches répétitives et rechercher les meilleures possibilités de gain de temps. Ensuite, nous proposerons une automatisation adaptée.",
      "Nous allons analyser où les visiteurs quittent votre site et simplifier le parcours vers une demande ou un rendez-vous, sur ordinateur et mobile."
    ],
    sectors: [
      "Nous allons présenter clairement votre offre pour que les visiteurs comprennent votre activité, votre clientèle et les moyens de vous contacter.",
      "Nous allons examiner votre fiche d'établissement et présenter clairement votre adresse, vos horaires et vos services.",
      "Nous allons examiner vos fiches produits et votre processus de commande pour améliorer les informations et faciliter les achats.",
      "Nous allons présenter clairement votre offre pour que les visiteurs comprennent votre activité, votre clientèle et les moyens de vous contacter."
    ],
    tasks: [
      "Nous allons préparer des réponses aux questions fréquentes et améliorer le suivi des demandes, tout en gardant un contrôle humain.",
      "Nous allons organiser une méthode de création de contenu plus efficace avec l'aide de l'IA, en préservant votre style et en vérifiant les contenus.",
      "Nous allons développer et tester un système de réservation avec confirmations et rappels pour faciliter le suivi des rendez-vous.",
      "Nous allons identifier les doubles saisies et étudier comment vos outils peuvent échanger des données en toute sécurité."
    ],
    website: [
      "Nous allons créer un site clair qui présente votre offre et facilite la prise de contact.",
      "Nous allons clarifier votre offre en ligne et vos possibilités de contact."
    ],
    timing: [
      "Nous limiterons votre implication et organiserons des échanges courts et efficaces.",
      "Nous organiserons des échanges réguliers adaptés à votre agenda."
    ],
    weeks: [
      "Nous analysons votre situation et vos priorités.",
      "Nous développons la première amélioration choisie.",
      "Nous testons et affinons la solution.",
      "Nous examinons ensemble les résultats et les prochaines étapes."
    ],
    introduction: "Une proposition pour votre entreprise. Voici comment nous pourrions travailler ensemble ; nous définirons les détails et le calendrier avec vous.",
    downloadIntro: "Une proposition présentant notre accompagnement possible. Nous définirons ensemble les détails et le calendrier.",
    downloadTitle: "VOTRE PLAN DE CROISSANCE UPSIDE",
    downloadBasis: "Renforcer votre présence en ligne",
    downloadAutomation: "Travailler plus efficacement",
    downloadDays: "PROPOSITION POUR LES 30 PREMIERS JOURS",
    downloadTime: "Temps disponible",
    disclaimer: "Cette version de test utilise des règles prédéfinies et non une analyse IA en direct. Aucun résultat n'est prédit ou garanti."
  },

  tr: {
    priorities: [
      "İdeal müşterilerinizi ve sunduğunuz hizmetleri birlikte netleştireceğiz. Ardından doğru kişilere ulaşmak için hedefli bir plan hazırlayacağız.",
      "Hedef kitlenizin hangi platformlarda aktif olduğunu belirleyip işletme profilinizi, sunduğunuz hizmetleri ve içeriklerinizi geliştirerek görünürlüğünüzü artıracağız.",
      "Tekrarlayan işlerinizi inceleyip en çok nerede zaman kazanabileceğinizi belirleyeceğiz. Ardından size uygun bir otomasyon çözümü hazırlayacağız.",
      "Ziyaretçilerin web sitenizden hangi aşamada ayrıldığını inceleyip iletişim ve randevu alma sürecini bilgisayar ve telefon için kolaylaştıracağız."
    ],
    sectors: [
      "Sunduğunuz hizmetleri açık şekilde anlatacağız. Böylece ziyaretçiler ne yaptığınızı, kimlere yardımcı olduğunuzu ve size nasıl ulaşabileceklerini anlayacak.",
      "Google işletme profilinizi inceleyip konumunuzu, çalışma saatlerinizi ve hizmetlerinizi daha açık şekilde sunacağız.",
      "Ürün sayfalarınızı ve sipariş sürecinizi inceleyip ürün bilgilerini iyileştirecek ve alışverişi kolaylaştıracağız.",
      "Sunduğunuz hizmetleri açık şekilde anlatacağız. Böylece ziyaretçiler ne yaptığınızı, kimlere yardımcı olduğunuzu ve size nasıl ulaşabileceklerini anlayacak."
    ],
    tasks: [
      "Sık sorulan sorulara yanıtlar hazırlayıp müşteri taleplerinin takibini kolaylaştıracağız. Son kontrol sizde kalacak.",
      "Yapay zekâ desteğiyle daha verimli bir içerik hazırlama sistemi kuracağız. İşletmenizin kendine özgü dilini koruyup içerikleri kullanmadan önce kontrol edeceğiz.",
      "Randevu onayları ve hatırlatmalar içeren uygun bir rezervasyon sistemi hazırlayıp test edeceğiz.",
      "Tekrarlanan veri girişlerini belirleyip mevcut araçlarınızın güvenli şekilde bilgi paylaşmasını sağlayabilecek çözümleri araştıracağız."
    ],
    website: [
      "Hizmetlerinizi tanıtan ve müşterilerin size kolayca ulaşmasını sağlayan anlaşılır bir web sitesi hazırlayacağız.",
      "İnternette sunduğunuz hizmetleri ve iletişim seçeneklerinizi daha açık hâle getireceğiz."
    ],
    timing: [
      "Sizin ayırmanız gereken zamanı sınırlı tutup kısa ve verimli görüşmeler yapacağız.",
      "Programınıza uygun düzenli görüşmeler planlayacağız."
    ],
    weeks: [
      "İşletmenizin mevcut durumunu ve önceliklerini inceliyoruz.",
      "Seçilen ilk geliştirmeyi hazırlıyoruz.",
      "Hazırlanan çözümü test edip iyileştiriyoruz.",
      "Elde edilen bilgileri ve sonraki adımları birlikte değerlendiriyoruz."
    ],
    introduction: "İşletmeniz için hazırlanmış bir öneri. Birlikte çalışırsak izleyebileceğimiz yol bu şekilde olabilir. Ayrıntıları ve takvimi birlikte belirleriz.",
    downloadIntro: "Birlikte çalışmamız hâlinde işletmenize nasıl destek olabileceğimizi gösteren bir öneri. Ayrıntıları ve takvimi birlikte belirleriz.",
    downloadTitle: "UPSIDE BÜYÜME PLANINIZ",
    downloadBasis: "Dijital varlığınızı güçlendirmek",
    downloadAutomation: "Daha verimli çalışmak",
    downloadDays: "İLK 30 GÜN İÇİN ÖNERİLEN PLAN",
    downloadTime: "Ayırabileceğiniz zaman",
    disclaimer: "Bu test sürümü önceden belirlenmiş öneri kurallarını kullanır; canlı yapay zekâ analizi içermez. Sonuç tahmini veya garantisi verilmez."
  },

  es: {
    priorities: [
      "Definiremos juntos a tu cliente ideal y tu oferta. Después prepararemos una estrategia enfocada en llegar a las personas adecuadas.",
      "Identificaremos dónde está activo tu público objetivo y mejoraremos tu visibilidad con un perfil claro, una oferta definida y contenido relevante.",
      "Analizaremos tus tareas repetitivas y dónde puedes ahorrar más tiempo. Después desarrollaremos una solución de automatización adecuada.",
      "Analizaremos dónde abandonan los visitantes tu web y facilitaremos el proceso para solicitar información o reservar una cita desde ordenador y móvil."
    ],
    sectors: [
      "Explicaremos tu oferta con claridad para que los visitantes entiendan qué haces, a quién ayudas y cómo pueden contactar contigo.",
      "Revisaremos tu perfil de empresa y presentaremos claramente tu ubicación, horario y servicios.",
      "Revisaremos tus páginas de producto y el proceso de compra para mejorar la información y facilitar los pedidos.",
      "Explicaremos tu oferta con claridad para que los visitantes entiendan qué haces, a quién ayudas y cómo pueden contactar contigo."
    ],
    tasks: [
      "Prepararemos respuestas a preguntas frecuentes y mejoraremos el seguimiento de solicitudes, manteniendo la supervisión personal.",
      "Crearemos un proceso de contenido más eficiente con apoyo de IA, manteniendo tu estilo y revisando todo antes de utilizarlo.",
      "Desarrollaremos y probaremos un sistema de reservas con confirmaciones y recordatorios para facilitar el seguimiento de citas.",
      "Identificaremos entradas de datos duplicadas y estudiaremos cómo conectar tus herramientas de forma segura."
    ],
    website: [
      "Crearemos una web clara que presente tu oferta y facilite el contacto con los clientes.",
      "Haremos más claras tu oferta online y tus opciones de contacto."
    ],
    timing: [
      "Limitaremos el tiempo que necesitas dedicar y organizaremos comunicaciones breves y eficientes.",
      "Organizaremos reuniones periódicas adaptadas a tu agenda."
    ],
    weeks: [
      "Analizamos tu situación actual y tus prioridades.",
      "Desarrollamos la primera mejora seleccionada.",
      "Probamos y perfeccionamos la solución.",
      "Revisamos juntos los resultados y los siguientes pasos."
    ],
    introduction: "Una propuesta para tu negocio. Así podría ser nuestra colaboración; definiremos juntos los detalles y los plazos.",
    downloadIntro: "Una propuesta sobre cómo podríamos apoyar tu negocio. Acordaremos juntos los detalles y el calendario.",
    downloadTitle: "TU PLAN DE CRECIMIENTO UPSIDE",
    downloadBasis: "Reforzar tu presencia online",
    downloadAutomation: "Trabajar de forma más eficiente",
    downloadDays: "PROPUESTA PARA LOS PRIMEROS 30 DÍAS",
    downloadTime: "Tiempo disponible",
    disclaimer: "Esta versión de prueba utiliza reglas de asesoramiento predefinidas, no análisis de IA en directo. No se predicen ni garantizan resultados."
  }
};

// Bescherm teksten die in HTML worden geplaatst.
function escapeHTML(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]
  );
}

// Download een tekstbestand zonder gegevens te verzenden.
function saveText(filename, content) {
  const blob = new Blob(
    [content],
    { type: "text/plain;charset=utf-8" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Vertaalde groeiscan.
if (document.body.dataset.page === "groeiscan") {
  const card = document.querySelector(".scan-card");
  const pageTitle = document.querySelector(".page-intro h1");

  if (card && pageTitle) {
    let lang = getLang();
    let step = 0;

    // Bewaar antwoordindexen in plaats van vertaalde teksten.
    // Zo blijven de adviesregels correct in elke taal.
    const answers = Array(6).fill(null);

    const languageNames = {
      nl: "Nederlands",
      fr: "Français",
      en: "English",
      tr: "Türkçe",
      es: "Español"
    };

    // Voeg een taalkeuze toe als die nog niet bestaat.
    let languageSelect =
      document.querySelector("#upside-language");

    if (!languageSelect) {
      const wrapper = document.createElement("div");
      wrapper.className = "upside-lang-wrap";

      languageSelect = document.createElement("select");
      languageSelect.id = "upside-language";
      languageSelect.setAttribute(
        "aria-label",
        "Select language"
      );

      wrapper.appendChild(languageSelect);

      const header = document.querySelector(".nav-actions");

      if (header) {
        header.prepend(wrapper);
      } else {
        card.parentElement.insertBefore(wrapper, card);
      }
    }

    languageSelect.replaceChildren(
      ...Object.entries(languageNames).map(([code, name]) => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = name;
        return option;
      })
    );

    languageSelect.value = lang;

    function currentData() {
      return scanTranslations[lang] || scanTranslations.nl;
    }

    function currentAdvice() {
      return scanAdvice[lang] || scanAdvice.nl;
    }

    function selectedAnswerLabels() {
      return answers.map((answer, index) => {
        const question = currentData().questions[index];
        return answer === null
          ? ""
          : question.options[answer];
      });
    }

    function makePlan() {
      const advice = currentAdvice();
      const labels = selectedAnswerLabels();

      const first = advice.priorities[answers[2]];
      const sector = advice.sectors[answers[0]];
      const automation = advice.tasks[answers[4]];

      const website = advice.website[
        answers[3] === 0 ? 0 : 1
      ];

      const timing = advice.timing[
        answers[5] === 0 ? 0 : 1
      ];

      const basis = sector + " " + website;

      const report = [
        advice.downloadTitle,
        advice.downloadIntro,
        "",
        ...currentData().questions.flatMap((question, index) => [
          question.title,
          labels[index],
          ""
        ]),
        "1. " + currentData().ui.first,
        first,
        "",
        "2. " + advice.downloadBasis,
        basis,
        "",
        "3. " + advice.downloadAutomation,
        automation,
        "",
        advice.downloadDays,
        ...advice.weeks.map((text, index) =>
          currentData().ui.week + " " + (index + 1) + ": " + text
        ),
        "",
        advice.downloadTime + ": " + labels[5],
        timing,
        "",
        advice.disclaimer
      ].join("\n");

      return {
        first,
        basis,
        automation,
        timing,
        report
      };
    }

    function showQuestion(focusHeading = false) {
      const data = currentData();
      const ui = data.ui;
      const question = data.questions[step];

      pageTitle.textContent = ui.heading;

      const progress = Math.round(
        (step / data.questions.length) * 100
      );

      card.innerHTML = `
        <div class="step-line">
          <span>${escapeHTML(ui.question)}
            ${step + 1} / ${data.questions.length}</span>
          <span>${progress}%</span>
        </div>

        <div class="progress">
          <i style="width:${progress}%"></i>
        </div>

        <h2 tabindex="-1">${escapeHTML(question.title)}</h2>
        <p>${escapeHTML(question.hint)}</p>

        <div class="options">
          ${question.options.map((option, index) => {
            const selected = answers[step] === index;

            return `
              <button
                type="button"
                data-option="${index}"
                aria-pressed="${selected}"
                class="${selected ? "active" : ""}"
              >
                <span>${escapeHTML(option)}</span>
                <span class="radio" aria-hidden="true">
                  ${selected ? "✓" : ""}
                </span>
              </button>
            `;
          }).join("")}
        </div>

        <div class="scan-controls">
          <button
            type="button"
            class="quiet"
            data-previous
            ${step === 0 ? "disabled" : ""}
          >
            ${escapeHTML(ui.previous)}
          </button>

          <button
            type="button"
            class="button"
            data-next
            ${answers[step] === null ? "disabled" : ""}
          >
            ${escapeHTML(
              step === data.questions.length - 1
                ? ui.view
                : ui.next
            )}
          </button>
        </div>
      `;

      card.querySelectorAll("[data-option]").forEach(button => {
        button.addEventListener("click", () => {
          answers[step] = Number(button.dataset.option);

          card.querySelectorAll("[data-option]").forEach(
            optionButton => {
              const selected = optionButton === button;

              optionButton.classList.toggle(
                "active",
                selected
              );

              optionButton.setAttribute(
                "aria-pressed",
                String(selected)
              );

              optionButton.querySelector(
                ".radio"
              ).textContent = selected ? "✓" : "";
            }
          );

          card.querySelector("[data-next]").disabled = false;
        });
      });

      card.querySelector("[data-previous]").addEventListener(
        "click",
        () => {
          if (step > 0) {
            step--;
            showQuestion(true);
          }
        }
      );

      card.querySelector("[data-next]").addEventListener(
        "click",
        () => {
          if (answers[step] === null) return;

          if (step === data.questions.length - 1) {
            showReport();
          } else {
            step++;
            showQuestion(true);
          }
        }
      );

      if (focusHeading) {
        card.querySelector("h2").focus({
          preventScroll: true
        });
      }
    }

    function showReport() {
      const data = currentData();
      const ui = data.ui;
      const plan = makePlan();

      pageTitle.textContent = ui.resultHeading;

      card.innerHTML = `
        <div class="report">
          <p class="section-label">
            ${escapeHTML(ui.priority)} ·
            ${escapeHTML(
              data.questions[2].options[answers[2]]
            )}
          </p>

          <h2 tabindex="-1">
            ${escapeHTML(ui.reportTitle)}
          </h2>

          <p>${escapeHTML(currentAdvice().introduction)}</p>

          ${[
            [ui.first, plan.first],
            [ui.basis, plan.basis],
            [ui.automation, plan.automation]
          ].map(([heading, text]) => `
            <article>
              <div>
                <h3>${escapeHTML(heading)}</h3>
                <p>${escapeHTML(text)}</p>
              </div>
            </article>
          `).join("")}

          <h3>${escapeHTML(ui.days)}</h3>

          <div class="weeks">
            ${currentAdvice().weeks.map((text, index) => `
              <div>
                <span>${escapeHTML(ui.week)}
                  ${index + 1}</span>
                <p>${escapeHTML(text)}</p>
              </div>
            `).join("")}
          </div>

          <p>${escapeHTML(plan.timing)}</p>

          <button
            type="button"
            class="button"
            data-download
          >
            ${escapeHTML(ui.save)}
          </button>

          <button
            type="button"
            class="quiet restart"
            data-restart
          >
            ${escapeHTML(ui.restart)}
          </button>

          <div class="report-end">
            <h3>${escapeHTML(ui.ending)}</h3>
            <p>${escapeHTML(ui.endingText)}</p>

            <a class="text-link" href="diensten.html">
              ${escapeHTML(ui.discover)}
            </a>
          </div>

          <p class="scan-disclaimer">
            ${escapeHTML(currentAdvice().disclaimer)}
          </p>
        </div>
      `;

      // Zorg dat de link naar Diensten de taal behoudt.
      const servicesLink = card.querySelector(".text-link");

      if (lang !== "nl") {
        servicesLink.href = "diensten.html?lang=" + lang;
      }

      card.querySelector("[data-download]").addEventListener(
        "click",
        event => {
          saveText(
            "Upside-groeiplan-" + lang + ".txt",
            plan.report
          );

          event.currentTarget.textContent = ui.again;
        }
      );

      card.querySelector("[data-restart]").addEventListener(
        "click",
        () => {
          step = 0;
          showQuestion(true);
        }
      );

      card.querySelector("h2").focus({
        preventScroll: true
      });

      card.scrollIntoView({
        block: "start",
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth"
      });
    }

    let showingReport = false;

    // Houd bij of de bezoeker het resultaat bekijkt.
    const originalShowReport = showReport;

    function displayReport() {
      showingReport = true;
      originalShowReport();
    }

    // Controleer of het resultaat zichtbaar is.
    function isReportVisible() {
      return Boolean(card.querySelector(".report"));
    }

    languageSelect.addEventListener("change", () => {
      lang = languageSelect.value;

      setLang(lang);

      if (isReportVisible()) {
        displayReport();
      } else {
        showQuestion();
      }
    });

    // Start met de juiste taal.
    setLang(lang);
    showQuestion();
  }
}

/* ==========================================================
   UPSIDE AGENCY — SCRIPT.JS
   DEEL 3 VAN 3
   Mobiel menu, calculator en contactformulier
   ========================================================== */

// Algemene vertalingen voor menu en contactformulier.
const generalTranslations = {
  nl: {
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
    sending: "Even verzenden…",
    sendingStatus: "Je aanvraag wordt verzonden…",
    formInactive:
      "Het formulier is nog niet geactiveerd. Neem voorlopig contact op via e-mail of WhatsApp.",
    formError:
      "Verzenden is niet gelukt. Je gegevens blijven staan. Probeer later opnieuw of neem contact op via e-mail of WhatsApp.",
    noServices: "Geen diensten geselecteerd",
    notAvailable: "Niet berekenbaar"
  },

  fr: {
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    sending: "Envoi en cours…",
    sendingStatus: "Votre demande est en cours d'envoi…",
    formInactive:
      "Le formulaire n'est pas encore activé. Contactez-nous par e-mail ou WhatsApp.",
    formError:
      "L'envoi a échoué. Vos informations sont conservées. Réessayez plus tard ou contactez-nous par e-mail ou WhatsApp.",
    noServices: "Aucun service sélectionné",
    notAvailable: "Non calculable"
  },

  en: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    sending: "Sending…",
    sendingStatus: "Your enquiry is being sent…",
    formInactive:
      "The form has not been activated yet. Please contact us by email or WhatsApp.",
    formError:
      "Your enquiry could not be sent. Your details have been kept. Please try again later or contact us by email or WhatsApp.",
    noServices: "No services selected",
    notAvailable: "Cannot be calculated"
  },

  tr: {
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
    sending: "Gönderiliyor…",
    sendingStatus: "Talebiniz gönderiliyor…",
    formInactive:
      "Form henüz etkinleştirilmedi. Lütfen e-posta veya WhatsApp üzerinden iletişime geçin.",
    formError:
      "Talebiniz gönderilemedi. Girdiğiniz bilgiler korunuyor. Daha sonra tekrar deneyin veya e-posta ya da WhatsApp üzerinden iletişime geçin.",
    noServices: "Hizmet seçilmedi",
    notAvailable: "Hesaplanamıyor"
  },

  es: {
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    sending: "Enviando…",
    sendingStatus: "Estamos enviando tu solicitud…",
    formInactive:
      "El formulario todavía no está activado. Contacta con nosotros por correo electrónico o WhatsApp.",
    formError:
      "No se ha podido enviar tu solicitud. Tus datos se han conservado. Inténtalo más tarde o contacta por correo electrónico o WhatsApp.",
    noServices: "No se han seleccionado servicios",
    notAvailable: "No se puede calcular"
  }
};

function getGeneralText() {
  return generalTranslations[getLang()] || generalTranslations.nl;
}

/* ==========================================================
   MOBIEL MENU
   ========================================================== */

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("nav");

if (menuButton && navigation) {
  function updateMenuLabel() {
    const text = getGeneralText();
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
      "aria-label",
      isOpen ? text.menuClose : text.menuOpen
    );
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") !== "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navigation.classList.toggle("open", isOpen);
    updateMenuLabel();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      navigation.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      updateMenuLabel();
    }
  });

  const languageSelect =
    document.querySelector("#upside-language");

  if (languageSelect) {
    languageSelect.addEventListener(
      "change",
      updateMenuLabel
    );
  }

  updateMenuLabel();
}

/* ==========================================================
   GROEI & RESULTATEN — CALCULATOR
   ========================================================== */

if (document.body.dataset.page === "resultaten") {
  const inputs = Array.from(
    document.querySelectorAll(".calc-inputs input")
  );

  const result = document.querySelector(".calc-result");

  if (inputs.length === 6 && result) {
    result.setAttribute("aria-live", "polite");

    function euro(value) {
      const lang = getLang();

      const locales = {
        nl: "nl-BE",
        fr: "fr-BE",
        en: "en-BE",
        tr: "tr-BE",
        es: "es-ES"
      };

      return new Intl.NumberFormat(
        locales[lang] || "nl-BE",
        {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0
        }
      ).format(value);
    }

    function recalculate() {
      const [
        visitors,
        rate,
        improve,
        value,
        margin,
        cost
      ] = inputs.map(input => {
        const number = Number(input.value);
        const minimum = Number(input.min);
        const maximum = Number(input.max);

        return Math.min(
          maximum,
          Math.max(
            minimum,
            Number.isFinite(number) ? number : 0
          )
        );
      });

      const conversions = visitors * rate / 100;

      const extra = Math.min(
        visitors - conversions,
        conversions * improve / 100
      );

      const revenue = extra * value;
      const profit = revenue * margin / 100;

      const strong = result.querySelector("strong");
      const values = result.querySelectorAll("b");

      if (!strong || values.length < 4) return;

      const lang = getLang();

      const locale = {
        nl: "nl-BE",
        fr: "fr-BE",
        en: "en-BE",
        tr: "tr-BE",
        es: "es-ES"
      }[lang] || "nl-BE";

      strong.textContent = euro(revenue);

      values[0].textContent = extra.toLocaleString(
        locale,
        { maximumFractionDigits: 1 }
      );

      values[1].textContent = euro(profit);

      values[2].textContent = euro(
        profit - cost
      );

      values[3].textContent = cost > 0
        ? (
            (profit - cost) / cost * 100
          ).toLocaleString(
            locale,
            { maximumFractionDigits: 0 }
          ) + "%"
        : getGeneralText().notAvailable;
    }

    inputs.forEach(input => {
      input.addEventListener(
        "input",
        recalculate
      );
    });

    const languageSelect =
      document.querySelector("#upside-language");

    if (languageSelect) {
      languageSelect.addEventListener(
        "change",
        recalculate
      );
    }

    recalculate();
  }
}

/* ==========================================================
   CONTACTFORMULIER — WEB3FORMS
   ========================================================== */

if (document.body.dataset.page === "contact") {
  const leadForm =
    document.querySelector("#lead-form");

  let sending = false;

  if (leadForm) {
    leadForm.addEventListener(
      "submit",
      async event => {
        event.preventDefault();

        if (
          sending ||
          !leadForm.reportValidity()
        ) {
          return;
        }

        const status = leadForm.querySelector(
          '[role="status"]'
        );

        const fields = new FormData(leadForm);

        const accessKey = String(
          fields.get("access_key") || ""
        );

        const text = getGeneralText();

        if (
          !accessKey ||
          accessKey.includes("VUL_HIER")
        ) {
          if (status) {
            status.textContent =
              text.formInactive;
          }

          return;
        }

        // Honeypot tegen automatische spam.
        if (
          String(
            fields.get("botcheck") || ""
          ).trim()
        ) {
          return;
        }

        // Verwerk de geselecteerde diensten.
        fields.delete("diensten[]");

        const selected = Array.from(
          leadForm.querySelectorAll(
            'input[name="diensten[]"]:checked'
          )
        ).map(input => input.value);

        fields.set(
          "Diensten",
          selected.join(", ") ||
          text.noServices
        );

        const button = leadForm.querySelector(
          '[type="submit"]'
        );

        if (!button) return;

        const originalText =
          button.textContent;

        sending = true;
        button.disabled = true;
        button.textContent = text.sending;

        leadForm.setAttribute(
          "aria-busy",
          "true"
        );

        if (status) {
          status.textContent =
            text.sendingStatus;
        }

        try {
          const response = await fetch(
            "https://api.web3forms.com/submit",
            {
              method: "POST",
              body: fields,
              headers: {
                Accept: "application/json"
              }
            }
          );

          const result =
            await response.json();

          if (
            !response.ok ||
            result.success !== true
          ) {
            throw new Error(
              result.message ||
              "Submission failed"
            );
          }

          // Bewaar de taal op de bedankpagina.
          const lang = getLang();

          const destination =
            lang === "nl"
              ? "/bedankt.html"
              : "/bedankt.html?lang=" +
                encodeURIComponent(lang);

          window.location.assign(
            destination
          );

        } catch (error) {
          console.error(
            "Web3Forms verzending:",
            error
          );

          if (status) {
            status.textContent =
              getGeneralText().formError;
          }

        } finally {
          sending = false;
          button.disabled = false;

          button.textContent =
            originalText;

          leadForm.removeAttribute(
            "aria-busy"
          );
        }
      }
    );
  }
}

/* ==========================================================
   EINDE SCRIPT.JS
   ========================================================== */

