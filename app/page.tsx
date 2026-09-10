"use client";

import SiteImage from "@/app/components/site-image";
import LegalIdentity from "@/app/components/legal-identity";
import NelloCredit from "@/app/components/nello-credit";
import { CONTACT_EMAIL, CONTACT_FORM_URL, CONTACT_PHONE, CONTACT_PHONE_TEL, COUNTER_WORKER_URL } from "@/lib/legal";
import { SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, SOCIAL_MESSENGER } from "@/lib/site";
import GymMap from "@/app/components/gym-map";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { legMachines } from "@/lib/leg-machines";
import MobileSwipeBack from "@/app/components/mobile-swipe-back";
import { BoxingGloveIcon } from "@/app/components/boxing-glove-icon";
import { CourseAreaIcon, type CourseAreaIconKind } from "@/app/components/course-area-icon";
import SocialProofReviews from "@/app/components/social-proof-reviews";
import MachineSearch from "@/app/components/machine-search";
import { useViewportVideo } from "@/app/hooks/use-viewport-video";

const safariInline = { "webkit-playsinline": "true" } as const;

const courses: Array<{ icon: CourseAreaIconKind; title: string; tag: string; image: string; text: string; description: string; features: string[]; ideal: string }> = [
  { icon: "strength", title: "Sala Pesi", tag: "Forza · Performance", image: "/photos/live/hero-sala.webp", text: "Una sala completa per costruire forza e massa muscolare con macchinari selezionati e pesi liberi.", description: "Il cuore di Revenge Gym: uno spazio pensato per allenare la forza con libertà, metodo e progressione, dal primo carico fino agli obiettivi più ambiziosi.", features: ["Pesi liberi, panche e postazioni per i fondamentali", "Spazi organizzati per allenarsi con continuità", "Soluzioni adatte a forza, ipertrofia e ricomposizione corporea"], ideal: "Per chi vuole aumentare forza e massa muscolare, migliorare la tecnica e costruire un percorso personale misurabile nel tempo." },
  { icon: "isotonic", title: "Area Isotonica", tag: "Controllo · Qualità", image: "/photos/live/sala-isotonica-oggi.webp", text: "Macchinari isotonici selezionati per il controllo e la qualità del movimento.", description: "Macchinari selezionati per guidare il movimento, offrire stabilità e concentrare il lavoro sui gruppi muscolari desiderati con regolazioni semplici e precise.", features: ["Macchine a pacco pesi e plate-loaded", "Traiettorie controllate e numerose possibilità di regolazione", "Brand professionali scelti per solidità e qualità del movimento"], ideal: "Per principianti ed esperti che cercano un gesto controllato, un lavoro muscolare mirato e una progressione facile da gestire." },
  { icon: "cardio", title: "Area Cardio", tag: "Resistenza · Energia", image: "/photos/live/sala-cardio-oggi.webp", text: "Uno spazio dedicato al lavoro cardiovascolare e al miglioramento della resistenza.", description: "Un’area dedicata a resistenza e consumo energetico, da utilizzare come allenamento completo oppure in abbinamento al lavoro di forza.", features: ["Attrezzature cardio professionali", "Intensità adattabile al proprio livello di preparazione", "Ideale prima, dopo o indipendentemente dalla sala pesi"], ideal: "Per migliorare fiato e capacità cardiovascolare, sostenere il controllo del peso o preparare il corpo alla parte principale dell’allenamento." },
  { icon: "free", title: "Allenamento Libero", tag: "I tuoi obiettivi", image: "/photos/live/pesi-liberi-oggi.webp", text: "Organizza il tuo percorso e allenati con continuità in un ambiente curato, attrezzato e motivante.", description: "Lo spazio in cui costruire la tua routine combinando esercizi, attrezzi e intensità secondo il livello di partenza e il risultato che vuoi raggiungere.", features: ["Libertà di combinare forza, mobilità e condizionamento", "Spazio adatto a circuiti e lavoro a corpo libero", "Allenamento autonomo, flessibile e sempre diverso"], ideal: "Per chi ama gestire il proprio programma, variare gli stimoli e allenarsi seguendo ritmi e obiettivi personali." },
];

const partnerBrands = ["PANATTA", "HAMMER STRENGTH", "LIFE FITNESS", "PRECOR", "HOIST", "NAUTILUS"];

const gallery = [
  ["/photos/live/hero-sala.webp", "La sala pesi di Revenge Gym"],
  ["/photos/live/sala-isotonica-oggi.webp", "Area isotonica"],
  ["/photos/live/sala-cardio-oggi.webp", "Area cardio"],
  ["/photos/live/plate-loaded-oggi.webp", "Macchine plate loaded"],
  ["/photos/live/pesi-liberi-oggi.webp", "Sala pesi e manubri"],
];

const philosophyShots = [
  { src: "/photos/live/philosophy/sala-wide.webp", alt: "Vista ampia della sala attrezzi di Revenge Gym", label: "Sala completa", focus: "center 42%" },
  { src: "/photos/live/philosophy/macchine-centrale.webp", alt: "Macchinari arancioni al centro della sala", label: "Cuore della sala", focus: "center 48%" },
  { src: "/photos/live/philosophy/corridoio-arancio.webp", alt: "Fila di macchine Precor nella sala pesi", label: "Linea macchine", focus: "58% 45%" },
  { src: "/photos/live/philosophy/plate-row.webp", alt: "Fila di macchine plate-loaded", label: "Plate loaded", focus: "center 40%" },
  { src: "/photos/live/philosophy/isotonica-brand.webp", alt: "Area isotonica con scritta Revenge Gym", label: "Isotonica", focus: "35% 42%" },
  { src: "/photos/live/philosophy/cardio.webp", alt: "Area cardio con tapis roulant", label: "Cardio", focus: "center 55%" },
  { src: "/photos/live/philosophy/pesi-linea.webp", alt: "Rastrelliera di manubri nella sala pesi", label: "Sala pesi", focus: "center 38%" },
  { src: "/photos/live/philosophy/cavi-verticale.webp", alt: "Area cavi vista in verticale", label: "Cavi", focus: "center 28%" },
];

const equipmentBrands = [
  {
    name: "PANATTA", origin: "Apiro, Marche · Italia", since: "Dal 1973",
    intro: "Una storia italiana nata dalla passione di Rudi Panatta per la cultura fisica e la biomeccanica applicata all’allenamento.",
    history: "Dai primi pesi costruiti artigianalmente fino a un ciclo produttivo completamente controllato in Italia: progettazione, prototipazione, saldatura, verniciatura, assemblaggio e collaudo avvengono negli stabilimenti di Apiro, nelle Marche.",
    highlights: ["Progettazione e produzione Made in Italy", "Ricerca biomeccanica interna", "Macchine isotoniche, cardio e plate-loaded", "Controllo diretto dell’intero processo produttivo"],
    relevance: "In sala significa avere macchine progettate con particolare attenzione alla traiettoria del movimento, alle regolazioni e al lavoro muscolare mirato.",
    source: "https://www.panattasport.com/it/azienda/", sourceLabel: "Storia ufficiale Panatta",
  },
  {
    name: "HAMMER STRENGTH", origin: "Stati Uniti", since: "Dal 1989",
    intro: "Il marchio creato da Gary Jones per portare nella sala pesi movimenti ispirati alla prestazione degli atleti.",
    history: "Hammer Strength nacque combinando la progettazione di Gary Jones con il confronto diretto con atleti e preparatori, tra cui quelli dei Cincinnati Bengals. Nel 1997 il marchio entrò nel gruppo Life Fitness, ampliandone l’offerta dedicata alla forza.",
    highlights: ["Tecnologia Iso-Lateral per allenare i due lati in modo indipendente", "Macchine plate-loaded e strutture per la forza", "Progettazione orientata a gesti fluidi e naturali", "Test di durata oltre gli standard di settore"],
    relevance: "È un riferimento per chi cerca un allenamento di forza intenso, stabile e progressivo, con la libertà di caricare dischi e lavorare anche unilateralmente.",
    source: "https://www.lifefitness.com/en-us/brands/hammer-strength", sourceLabel: "Profilo ufficiale Hammer Strength",
  },
  {
    name: "LIFE FITNESS", origin: "Illinois · Stati Uniti", since: "Radici dal 1968",
    intro: "La sua storia comincia con la Lifecycle, una delle attrezzature che ha contribuito a trasformare il cardio indoor.",
    history: "L’idea della Lifecycle risale al 1968; l’azienda fu costituita nel 1977 e negli anni successivi estese la propria esperienza dalle bike a tapis roulant, cardio, forza e soluzioni digitali per le palestre di tutto il mondo.",
    highlights: ["Attrezzature per forza e allenamento funzionale", "Gamma pensata per utilizzo commerciale intensivo"],
    relevance: "La presenza di Life Fitness completa la sala con attrezzature intuitive e affidabili, adatte sia a chi comincia sia a chi si allena con continuità.",
    source: "https://www.lifefitness.com/en-us", sourceLabel: "Sito ufficiale Life Fitness",
  },
  {
    name: "PRECOR", origin: "Washington · Stati Uniti", since: "Dal 1980",
    intro: "Un marchio costruito intorno a ergonomia, affidabilità e movimenti capaci di seguire il corpo dell’utilizzatore.",
    history: "Fondata nel 1980 come Precision Corporation, lanciò il primo vogatore nel 1981 e assunse il nome Precor nel 1983. Nel 1995 presentò il primo Elliptical Fitness Crosstrainer EFX; in seguito introdusse l’Adaptive Motion Trainer e console cardio connesse.",
    highlights: ["Cardio, forza e functional training", "Movimenti ergonomici e regolazioni intuitive", "Attrezzature progettate per semplicità e affidabilità"],
    relevance: "È particolarmente apprezzata nelle aree cardio e nei percorsi in cui comfort, fluidità del gesto e facilità d’uso sono essenziali.",
    source: "https://www.precor.com/en-US/about-us", sourceLabel: "Storia ufficiale Precor",
  },
  {
    name: "HOIST", origin: "San Diego, California · Stati Uniti", since: "Dal 1977",
    intro: "Un marchio statunitense specializzato in macchine per il bodybuilding, riconoscibile per la ricerca applicata alla meccanica del movimento.",
    history: "HOIST sviluppa macchine professionali a pacco pesi e a carico libero.",
    highlights: ["Macchine professionali per il bodybuilding", "Selettori per il pacco pesi", "Sistemi ROC-IT con movimento dinamico del sedile"],
    relevance: "A Revenge Gym amplia le possibilità di lavorare sulla forza con postazioni solide, regolabili e adatte a una progressione graduale del carico.",
    source: "https://www.hoistfitness.com/pages/about", sourceLabel: "Storia ufficiale HOIST Fitness",
  },
  {
    name: "NAUTILUS", origin: "Stati Uniti", since: "Dal 1970",
    intro: "Uno dei nomi che hanno segnato la storia moderna delle macchine per la forza e dell’allenamento a resistenza variabile.",
    history: "L’eredità Nautilus nasce dal lavoro di Arthur Jones e dalla macchina presentata nel 1970, sviluppata per rendere la resistenza più coerente lungo l’arco del movimento. Il marchio è poi diventato un riferimento della sala pesi moderna; l’attuale offerta professionale comprende linee selectorized, plate-loaded, panche, rack e sistemi a cavi.",
    highlights: ["Tradizione legata alla resistenza variabile", "Progettazione orientata alla biomeccanica", "Macchine selectorized e plate-loaded", "Soluzioni per forza guidata e allenamento funzionale"],
    relevance: "In sala offre un lavoro muscolare guidato e leggibile, con regolazioni che aiutano utenti di esperienza diversa a trovare una posizione efficace e una progressione controllata.",
    source: "https://shop.corehandf.com/collections/nautilus", sourceLabel: "Profilo ufficiale Nautilus Professional",
  },
  {
    name: "STAR TRAC", origin: "California · Stati Uniti", since: "Dal 1979",
    intro: "Un marchio professionale noto soprattutto per il cardio, oggi leader anche nella produzione di macchine per palestra a pacco pesi e a carico libero.",
    history: "Star Trac unisce una lunga esperienza nel cardio professionale a una gamma completa di macchine per la forza.",
    highlights: ["Cardio professionale", "Macchine a pacco pesi", "Macchine a carico libero"],
    relevance: "Contribuisce a rendere più completa l’area cardio, offrendo strumenti adatti al riscaldamento, al lavoro aerobico e a sedute di resistenza con intensità facilmente modulabile.",
    source: "https://www.corehandf.com/pages/complete-line-of-cardio", sourceLabel: "Gamma ufficiale Star Trac",
  },
  {
    name: "GYMLECO", origin: "Stoccolma · Svezia", since: "Dal 1994",
    intro: "Un produttore scandinavo nato con l’obiettivo di creare macchine per la forza compatte, funzionali e semplici da mantenere.",
    history: "Dopo gli studi di ingegneria e l’esperienza nel bodybuilding, Kari Jernvall progettò in Svezia le prime tre macchine nel 1994. L’interesse raccolto alla prima esposizione del 1995 portò all’ampliamento della gamma; dal 2005 iniziò l’espansione nordica e nel 2018 la partecipazione a FIBO accelerò la presenza internazionale.",
    highlights: ["Progettazione e produzione svedese", "Ingombri studiati per sfruttare bene lo spazio", "Macchine per la forza", "Costruzione orientata a durata e manutenzione ridotta"],
    relevance: "Aggiunge alla sala macchine essenziali e robuste, pensate per offrire un movimento diretto e sfruttare in modo efficiente lo spazio senza rinunciare alla qualità del lavoro.",
    source: "https://gymleco.com/pages/our-history", sourceLabel: "Storia ufficiale Gymleco",
  },
  {
    name: "TECA", origin: "Italia · Made in Italy", since: "Dal 1985",
    intro: "Un produttore italiano specializzato in macchine isotoniche professionali, con progettazione biomeccanica e produzione interamente nazionale.",
    history: "TECA Fitness sviluppa attrezzature per centri fitness, sport e riabilitazione dal 1985. Il dipartimento SED (Science, Engineering & Design) unisce ricerca biomeccanica, ingegneria e design per costruire macchine pensate per l’uso intensivo in club. La linea isotonica copre i principali distretti muscolari con tecnologie come SAC (Self Adaptive Control), MME (Multiple Movement of Exercises) e ROM limiter su numerose postazioni.",
    highlights: ["Produzione e design 100% Made in Italy", "Ricerca biomeccanica e linea isotonica completa", "Macchine compatte con ingombri ottimizzati", "Soluzioni per fitness, sport e recupero funzionale", "Premi internazionali FIBO Innovation Award"],
    relevance: "In Revenge Gym le Leg Extension e Leg Curl Teca completano l’area gambe con postazioni dedicate, solide e facili da regolare: un marchio italiano che rafforza la profondità del parco macchine accanto a Panatta e Life Fitness.",
    source: "https://tecafitness.com/", sourceLabel: "Sito ufficiale TECA Fitness",
  },
  {
    name: "GYM EQUIPE", origin: "Origine non verificata", since: "Attrezzature professionali",
    intro: "Una presenza più giovane rispetto ai grandi gruppi internazionali, ma riconoscibile per i suoi macchinari solidi e per l’eccellente biomeccanica.",
    history: "Gym Equipe realizza attrezzature professionali per l’allenamento muscolare, con macchine guidate dedicate a distretti specifici.",
    highlights: ["Macchinari solidi", "Eccellente biomeccanica", "Macchine guidate per la muscolazione", "Lavoro mirato su distretti specifici"],
    relevance: "Completa la varietà delle stazioni disponibili e permette di inserire esercizi guidati e mirati all’interno di percorsi di forza, ipertrofia e condizionamento generale.",
    source: "https://www.google.com/search?q=%22Gym+Equipe%22+attrezzature+palestra", sourceLabel: "Ricerca web Gym Equipe · sito ufficiale non reperito",
  },
];

const introBeats = ["RIVINCITA", "FORZA", "POTENZA", "ENERGIA", "BOXE", "DISCIPLINA", "CARATTERE", "REVENGE GYM"];
const INTRO_BEAT_MS = 1210;
const INTRO_CLOSE_MS = 9800;
const INTRO_EXIT_MS = 10500;

const gymZones = [
  { id: "free", number: "01", title: "Sala pesi", subtitle: "Forza e fondamentali", className: "zone-free", image: "/photos/live/sala-isotonica-oggi.webp", text: "Una sala completa per costruire forza, tecnica e massa muscolare con attrezzature professionali.", equipment: ["Panche e postazioni regolabili", "Manubri e bilancieri", "Spazio per i principali esercizi multiarticolari"] },
  { id: "isotonic", number: "02", title: "Isotonica", subtitle: "Controllo e qualità del movimento", className: "zone-isotonic", image: "/photos/live/sala-isotonica-oggi.webp", text: "Macchinari isotonici professionali che guidano la traiettoria e permettono di concentrare il lavoro sul gruppo muscolare scelto.", equipment: ["Macchine Panatta e Hammer Strength", "Postazioni per dorso, petto, spalle e gambe", "Regolazioni adatte a livelli diversi"] },
  { id: "cardio", number: "03", title: "Cardio", subtitle: "Fiato e resistenza", className: "zone-cardio", image: "/photos/live/sala-cardio-oggi.webp", text: "Una zona dedicata a migliorare la capacità cardiovascolare e a completare la seduta con un lavoro aerobico.", equipment: ["Attrezzature cardio professionali", "Intensità facilmente regolabile", "Utilizzabile prima, dopo o indipendentemente dalla sala pesi"] },
  { id: "boxing", number: "04", title: "Boxe", subtitle: "Tecnica e carattere", className: "zone-boxing", image: "/photos/live/boxe-sacchi.webp", text: "Uno spazio distinto dedicato alla boxe, dove allenare tecnica, coordinazione, condizionamento e sicurezza.", equipment: ["Ring", "Sacchi", "Spazio per tecnica e preparazione atletica"] },
  { id: "relax", number: "05", title: "Sala relax", subtitle: "Caffè e retrò", className: "zone-relax", image: "/photos/live/sala-relax-poster.webp", href: "#sala-relax", text: "Dopo esserti allenato, ricaricati con un caffè e vivi uno spazio accogliente da condividere a fine seduta.", equipment: ["Caffè, cappuccino e tè", "Bibite energizzanti, proteiche e integratori alimentari", "Gadget, Vespa 50, flipper e oggetti vintage"] },
];

const magazineArticles = [
  { category: "INIZIARE", time: "4 min", title: "La prima volta in sala pesi: cosa aspettarsi", excerpt: "Niente ansia e nessuna gara: ecco come affrontare il primo allenamento con ordine e sicurezza.", image: "/photos/live/hero-sala.webp", intro: "Entrare per la prima volta in sala pesi può sembrare complicato. In realtà basta partire con poche idee chiare: conoscere gli spazi, scegliere carichi gestibili e dare priorità alla tecnica.", paragraphs: ["Indossa abbigliamento comodo, porta acqua e un asciugamano. Prima di iniziare, dedica qualche minuto a capire dove si trovano le diverse aree e come si regolano le attrezzature.", "Nelle prime sedute non serve provare ogni macchina. Un allenamento semplice e completo permette di imparare i movimenti senza accumulare fatica inutile.", "Il carico giusto è quello che consente di completare ogni ripetizione in modo controllato. La progressione arriverà con la continuità: il primo obiettivo è costruire una routine sostenibile."], takeaway: "La prima seduta serve a prendere confidenza, non a dimostrare quanto sei forte." },
  { category: "METODO", time: "5 min", title: "Allenarsi tre volte a settimana: una base concreta", excerpt: "Come distribuire forza, recupero e continuità quando il tempo non è infinito.", image: "/photos/live/sala-community.webp", intro: "Tre allenamenti settimanali sono una frequenza solida per moltissime persone: lasciano spazio al recupero e permettono di stimolare con regolarità tutto il corpo.", paragraphs: ["Una soluzione semplice è alternare sedute complete, distribuendo in ogni giornata esercizi per gambe, spinta e tirata. In questo modo ogni gruppo muscolare viene allenato più volte senza concentrare tutto in una sola seduta.", "Lascia almeno un giorno di recupero tra due allenamenti impegnativi e mantieni una durata che puoi sostenere anche nelle settimane più piene.", "Annotare esercizi, serie e carichi aiuta a capire se stai migliorando. Piccoli progressi ripetuti nel tempo valgono più di una singola seduta estrema."], takeaway: "Il programma migliore non è il più complicato: è quello che riesci a seguire con costanza." },
  { category: "TECNICA", time: "6 min", title: "Macchine o pesi liberi? Non devi scegliere", excerpt: "Due strumenti diversi che possono convivere nello stesso allenamento e completarsi a vicenda.", image: "/photos/live/plate-loaded-oggi.webp", intro: "Pesi liberi e macchine non sono avversari. Offrono stimoli diversi e, combinati con criterio, permettono di costruire un allenamento più completo.", paragraphs: ["Bilancieri e manubri richiedono stabilizzazione e libertà di movimento. Sono strumenti versatili, particolarmente utili per sviluppare tecnica e coordinazione nei movimenti fondamentali.", "Le macchine guidano maggiormente la traiettoria e aiutano a concentrare il lavoro su un distretto specifico. Possono essere utili per imparare a percepire il muscolo e continuare una seduta in modo controllato.", "La scelta dipende dall’obiettivo, dall’esperienza e dalle caratteristiche personali. Nella stessa scheda è normale iniziare con un esercizio libero e proseguire con uno o più esercizi guidati."], takeaway: "Gli strumenti cambiano; ciò che conta è usarli con tecnica, progressione e uno scopo preciso." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navFlyout, setNavFlyout] = useState<null | "palestra" | "macchinari" | "gruppi">(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [introVisible, setIntroVisible] = useState(true);
  const [introClosing, setIntroClosing] = useState(false);
  const [introSlide, setIntroSlide] = useState(0);
  const [introSound, setIntroSound] = useState(false);
  const [activeBrand, setActiveBrand] = useState<(typeof equipmentBrands)[number] | null>(null);
  const [activeArea, setActiveArea] = useState<(typeof courses)[number] | null>(null);
  const [activeZone, setActiveZone] = useState<(typeof gymZones)[number]>(gymZones[0]);
  const [activeArticle, setActiveArticle] = useState<(typeof magazineArticles)[number] | null>(null);
  const [philosophySlide, setPhilosophySlide] = useState(0);
  const [philosophyInView, setPhilosophyInView] = useState(false);
  const [philosophyTimerKey, setPhilosophyTimerKey] = useState(0);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [tickerHidden, setTickerHidden] = useState(false);
  const philosophyVisualRef = useRef<HTMLDivElement>(null);
  const gymMapDetailRef = useRef<HTMLDivElement>(null);
  const introAudioRef = useRef<HTMLAudioElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const gymTourVideoRef = useRef<HTMLVideoElement>(null);
  const relaxVideoRef = useRef<HTMLVideoElement>(null);
  const transformSpotVideoRef = useRef<HTMLVideoElement>(null);
  const socialProofVideoRef = useRef<HTMLVideoElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const [relaxSound, setRelaxSound] = useState(false);
  const tickerMachines = legMachines.slice(0, 10);
  const overlaysOpen = introVisible || Boolean(activeBrand || activeArea || activeArticle);

  useViewportVideo(gymTourVideoRef, { paused: overlaysOpen });
  useViewportVideo(relaxVideoRef, { paused: overlaysOpen, volume: 0.42, playbackRate: 0.8 });
  useViewportVideo(transformSpotVideoRef, { paused: overlaysOpen });
  useViewportVideo(socialProofVideoRef, { paused: overlaysOpen });

  useEffect(() => {
    const skipRequested = new URLSearchParams(window.location.search).get("skipIntro") === "1";
    let skipStored = false;
    try { skipStored = sessionStorage.getItem("revenge-gym-skip-intro") === "1"; } catch { /* ignore */ }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skipRequested || skipStored || reducedMotion) {
      const skipTimer = window.setTimeout(() => setIntroVisible(false), 0);
      return () => window.clearTimeout(skipTimer);
    }
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    items.forEach((item) => observer.observe(item));
    const failsafe = window.setTimeout(() => items.forEach((item) => item.classList.add("visible")), 1800);
    return () => { observer.disconnect(); window.clearTimeout(failsafe); };
  }, []);

  useEffect(() => {
    if (!introVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const slideTimer = window.setInterval(() => setIntroSlide((slide) => Math.min(slide + 1, introBeats.length - 1)), INTRO_BEAT_MS);
    const closingTimer = window.setTimeout(() => setIntroClosing(true), INTRO_CLOSE_MS);
    const exitTimer = window.setTimeout(() => {
      introAudioRef.current?.pause();
      introVideoRef.current?.pause();
      setIntroVisible(false);
    }, INTRO_EXIT_MS);
    return () => {
      window.clearInterval(slideTimer);
      window.clearTimeout(closingTimer);
      window.clearTimeout(exitTimer);
    };
  }, [introVisible]);

  useEffect(() => {
    if (!introVisible) return;
    const video = introVideoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    const playIntro = () => {
      void video.play().catch(() => undefined);
    };
    playIntro();
    video.addEventListener("canplay", playIntro);
    video.addEventListener("loadeddata", playIntro);
    return () => {
      video.removeEventListener("canplay", playIntro);
      video.removeEventListener("loadeddata", playIntro);
    };
  }, [introVisible]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const sync = () => {
      if (document.hidden || introVisible) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [introVisible]);

  useEffect(() => {
    if (!introVisible && !activeBrand && !activeArea && !activeArticle) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [introVisible, activeBrand, activeArea, activeArticle]);

  useEffect(() => {
    if (!activeBrand && !activeArea && !activeArticle) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    drawerCloseRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveBrand(null);
        setActiveArea(null);
        setActiveArticle(null);
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      previouslyFocused?.focus();
    };
  }, [activeBrand, activeArea, activeArticle]);

  useEffect(() => {
    const visual = philosophyVisualRef.current;
    if (!visual) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPhilosophyInView(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: [0, 0.25, 0.5, 0.75] },
    );
    observer.observe(visual);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pauseTicker = () => setTickerPaused(document.hidden);
    pauseTicker();
    document.addEventListener("visibilitychange", pauseTicker);
    return () => document.removeEventListener("visibilitychange", pauseTicker);
  }, []);

  useEffect(() => {
    const updateTicker = () => {
      const hero = document.getElementById("home");
      const hidden = hero ? hero.getBoundingClientRect().bottom <= 12 : window.scrollY > 80;
      setTickerHidden(hidden);
      document.documentElement.classList.toggle("ticker-collapsed", hidden);
    };
    updateTicker();
    window.addEventListener("scroll", updateTicker, { passive: true });
    window.addEventListener("resize", updateTicker);
    return () => {
      window.removeEventListener("scroll", updateTicker);
      window.removeEventListener("resize", updateTicker);
      document.documentElement.classList.remove("ticker-collapsed");
    };
  }, []);

  useEffect(() => {
    const active = tickerHidden && !overlaysOpen && window.innerWidth <= 760;
    document.body.classList.toggle("mobile-cta-active", active);
    return () => document.body.classList.remove("mobile-cta-active");
  }, [tickerHidden, overlaysOpen]);

  useEffect(() => {
    document.body.classList.toggle("menu-lock", menuOpen);
    return () => document.body.classList.remove("menu-lock");
  }, [menuOpen]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${COUNTER_WORKER_URL}/visits`, {
      method: "POST",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    }).catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) return;
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!philosophyInView) return;

    const advance = () => {
      if (document.hidden) return;
      setPhilosophySlide((slide) => (slide + 1) % philosophyShots.length);
    };

    const timer = window.setInterval(advance, 3000);
    const onVisibility = () => {
      // Al ritorno tab: riavvia il ciclo invece di restare su una foto “congelata”.
      if (!document.hidden) setPhilosophyTimerKey((key) => key + 1);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [philosophyInView, philosophyTimerKey]);

  const philosophyWindow = [
    (philosophySlide - 1 + philosophyShots.length) % philosophyShots.length,
    philosophySlide,
    (philosophySlide + 1) % philosophyShots.length,
  ];
  const philosophyVisible = Array.from(new Set(philosophyWindow));

  const selectPhilosophySlide = (index: number) => {
    setPhilosophySlide(index);
    setPhilosophyTimerKey((key) => key + 1);
  };

  const toggleRelaxSound = async () => {
    const video = relaxVideoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      video.volume = 0.42;
      try {
        await video.play();
        setRelaxSound(true);
      } catch {
        video.muted = true;
        setRelaxSound(false);
      }
      return;
    }
    video.muted = true;
    setRelaxSound(false);
  };

  const closeIntro = () => {
    try { sessionStorage.setItem("revenge-gym-skip-intro", "1"); } catch { /* ignore */ }
    setIntroClosing(true);
    introAudioRef.current?.pause();
    introVideoRef.current?.pause();
    window.setTimeout(() => setIntroVisible(false), 700);
  };

  const selectGymZone = (zone: (typeof gymZones)[number]) => {
    setActiveZone(zone);
    const detail = gymMapDetailRef.current;
    if (!detail) return;
    const navH = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 67;
    const rect = detail.getBoundingClientRect();
    const visible = rect.bottom > navH + 40 && rect.top < window.innerHeight * 0.55;
    if (visible) return;
    window.requestAnimationFrame(() => {
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const toggleIntroSound = async () => {
    const audio = introAudioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.48;
      try {
        await audio.play();
        setIntroSound(true);
      } catch {
        setIntroSound(false);
      }
    } else {
      audio.pause();
      setIntroSound(false);
    }
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      course: String(data.get("course") ?? ""),
      message: String(data.get("message") ?? ""),
      privacy: String(data.get("privacy") ?? ""),
    };
    try {
      const response = await fetch(CONTACT_FORM_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
      const result = (await response.json().catch(() => null)) as { success?: string | boolean } | null;
      const ok = response.ok && result?.success !== false && result?.success !== "false";
      if (!ok) throw new Error("send failed");
      setFormStatus("sent");
      form.reset();
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main>
      {(activeBrand || activeArea || activeArticle) && <MobileSwipeBack edgeOnly={false} label="Chiudi" onSwipe={() => { setActiveBrand(null); setActiveArea(null); setActiveArticle(null); }} />}
      {introVisible && <section className={`intro-screen${introClosing ? " is-closing" : ""}`} aria-label="Presentazione Revenge Gym">
        <div className="intro-frames is-running">
          <video ref={introVideoRef} className="intro-video" autoPlay muted playsInline {...safariInline} preload="auto" poster="/photos/live/hero-sala.webp" disablePictureInPicture aria-hidden="true">
            <source src="/media/intro-cinematic.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="intro-shade"></div>
        <div className="intro-logo logo"><SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" loading="eager" /></div>
        <button className={`intro-audio${introSound ? " active" : ""}`} type="button" onClick={toggleIntroSound} aria-pressed={introSound}>
          <i>{introSound ? "▮▮" : "▶"}</i> {introSound ? "Musica attiva" : "Attiva musica"}
        </button>
        <div className="intro-flash" aria-live="polite"><strong key={introSlide}>{introBeats[introSlide]}</strong><span>{String(introSlide + 1).padStart(2,"0")} / {String(introBeats.length).padStart(2,"0")}</span></div>
        <button className="intro-skip" type="button" onClick={closeIntro}>Salta intro <span>→</span></button>
        <div className="intro-progress" aria-hidden="true"><span></span></div>
        <audio ref={introAudioRef} src="/media/revenge-gym-intro.m4a" loop preload="none"/>
      </section>}
      <header className="nav-wrap">
        <a href="#home" className="logo" aria-label="Revenge Gym, torna all'inizio"><SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></a>
        <button className="menu-toggle" onClick={() => { setMenuOpen(!menuOpen); if (menuOpen) setNavFlyout(null); }} aria-label={menuOpen ? "Chiudi menu" : "Apri menu"} aria-expanded={menuOpen}><i></i><i></i></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Navigazione principale">
          <div className="nav-flyout">
            <button type="button" className="nav-flyout-trigger" aria-haspopup="true" aria-expanded={navFlyout === "palestra"} onClick={() => setNavFlyout(navFlyout === "palestra" ? null : "palestra")}>La palestra <span>▾</span></button>
            <div className={`nav-flyout-panel${navFlyout === "palestra" ? " open" : ""}`} role="menu">
              <div className="nav-flyout-panel-inner">
                <Link href="#filosofia" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>La palestra dove cambi davvero</Link>
                <Link href="#sala-relax" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Qui si scende di giri</Link>
                <Link href="#corsi" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Allenati. Evolvi.</Link>
                <Link href="#mappa" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Dentro Revenge</Link>
                <Link href="#gallery" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Sudore. Energia. Risultati.</Link>
                <Link href="#magazine" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Allenati con metodo</Link>
                <Link href="#orari" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Orari</Link>
              </div>
            </div>
          </div>
          <div className="nav-flyout">
            <button type="button" className="nav-flyout-trigger" aria-haspopup="true" aria-expanded={navFlyout === "macchinari"} onClick={() => setNavFlyout(navFlyout === "macchinari" ? null : "macchinari")}>Macchinari <span>▾</span></button>
            <div className={`nav-flyout-panel${navFlyout === "macchinari" ? " open" : ""}`} role="menu">
              <div className="nav-flyout-panel-inner">
                <Link href="#attrezzatura" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Macchinari selezionati</Link>
                <Link href="/nuove-macchine" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Nuove macchine</Link>
              </div>
            </div>
          </div>
          <div className="nav-flyout">
            <button type="button" className="nav-flyout-trigger" aria-haspopup="true" aria-expanded={navFlyout === "gruppi"} onClick={() => setNavFlyout(navFlyout === "gruppi" ? null : "gruppi")}>Per gruppi muscolari <span>▾</span></button>
            <div className={`nav-flyout-panel${navFlyout === "gruppi" ? " open" : ""}`} role="menu">
              <div className="nav-flyout-panel-inner">
                <Link href="/macchine/gambe" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Gambe</Link>
                <Link href="/macchine/glutei" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Glutei</Link>
                <Link href="/macchine/petto" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Petto</Link>
                <Link href="/macchine/dorso" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Dorso</Link>
                <Link href="/macchine/spalle" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Spalle</Link>
                <Link href="/macchine/bicipiti" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Bicipiti</Link>
                <Link href="/macchine/tricipiti" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Tricipiti</Link>
                <Link href="/macchine/addominali" role="menuitem" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Addominali</Link>
              </div>
            </div>
          </div>
          <MachineSearch
            variant="nav"
            brands={equipmentBrands}
            onOpen={() => setNavFlyout(null)}
            onNavigate={() => { setMenuOpen(false); setNavFlyout(null); }}
            onSelectBrand={(name) => {
              const brand = equipmentBrands.find((item) => item.name === name);
              if (brand) setActiveBrand(brand);
            }}
          />
          <Link href="/boxe/" className="nav-boxe" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>
            <BoxingGloveIcon className="nav-boxe-glove nav-boxe-glove-left" />
            <span className="nav-boxe-label">Boxe</span>
            <BoxingGloveIcon className="nav-boxe-glove nav-boxe-glove-right" />
          </Link>
          <a className="nav-cta" href="#contatti" onClick={() => { setMenuOpen(false); setNavFlyout(null); }}>Chiedi info <span>↗</span></a>
        </nav>
      </header>

      <div className={`machine-ticker${tickerPaused ? " is-paused" : ""}${tickerHidden ? " is-hidden" : ""}`} aria-label="Macchinari in evidenza">
        <div className="machine-ticker-track">
          {[...tickerMachines, ...tickerMachines].map((machine, index) => {
            const duplicate = index >= tickerMachines.length;
            return (
              <Link
                className="machine-ticker-item"
                key={`${machine.id}-${index}`}
                href={`/macchine/gambe/${machine.id}`}
                aria-hidden={duplicate || undefined}
                tabIndex={duplicate ? -1 : undefined}
                aria-label={duplicate ? undefined : `Apri la scheda di ${machine.name}`}
              >
                <SiteImage src={machine.image} alt="" width={76} height={76} decoding="async" loading={index < 6 ? "eager" : "lazy"} />
                <span>{machine.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <section className="hero" id="home">
        <div className="hero-media" role="img" aria-label="Sala attrezzi di Revenge Gym a Ladispoli">
          <video ref={heroVideoRef} className="hero-video" autoPlay muted loop playsInline {...safariInline} preload="metadata" poster="/photos/live/hero-sala.webp" disablePictureInPicture aria-hidden="true">
            <source src="/media/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-shade"></div>
        <div className="hero-content reveal">
          <p className="eyebrow"><span></span> Sala pesi · Ladispoli</p>
          <h1>NON CERCARE<br/>SCUSE. <em>CREA</em><br/>LA TUA <em>RIVINCITA.</em></h1>
          <p className="hero-copy">Una palestra completa, attrezzature di qualità e l’ambiente giusto per allenarti con costanza e superare ogni limite.</p>
          <MachineSearch
            variant="hero"
            brands={equipmentBrands}
            onSelectBrand={(name) => {
              const brand = equipmentBrands.find((item) => item.name === name);
              if (brand) setActiveBrand(brand);
            }}
          />
          <div className="hero-actions">
            <a href="#contatti" className="button primary">Chiedi info <span>↗</span></a>
            <a href="#filosofia" className="text-link">Scopri la palestra <span>↓</span></a>
          </div>
        </div>
        <div className="hero-stats">
          <div><strong>9</strong><span>Brand professionali</span></div><div><strong>100%</strong><span>Allenamento</span></div><div><strong>1</strong><span>Grande gruppo</span></div>
        </div>
        <a href="#filosofia" className="scroll-cue" aria-label="Scorri alla sezione successiva">SCROLL <span>↓</span></a>
      </section>

      <section className="section philosophy" id="filosofia">
        <div className="section-index">01 — FILOSOFIA</div>
        <div className="philosophy-copy reveal">
          <p className="eyebrow"><span></span> Il nostro metodo</p>
          <h2>LA PALESTRA DOVE<br/>CAMBI DAVVERO.</h2>
          <p className="lead">Spazi curati, attrezzature di alto livello e un gruppo che condivide la voglia di migliorarsi.</p>
          <p>Revenge Gym è una palestra completa a Ladispoli, pensata per chi vuole allenarsi seriamente in un ambiente pulito, accogliente e professionale. La sala riunisce macchinari Panatta, Hammer Strength, Life Fitness, Precor, Hoist, Nautilus, Star Trac, Gymleco, Teca e Gym Equipe.</p>
          <a href="#titolari" className="text-link orange">Conosci Gino e Stefania <span>↗</span></a>
        </div>
        <div className="philosophy-visual reveal" ref={philosophyVisualRef}>
          <div className="philosophy-stage" aria-live="polite" aria-atomic="true">
            {philosophyVisible.map((index) => {
              const shot = philosophyShots[index];
              return (
                <SiteImage
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  className={index === philosophySlide ? "is-active" : undefined}
                  style={{ objectPosition: shot.focus }}
                  loading={index === philosophySlide ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === philosophySlide ? "high" : "low"}
                />
              );
            })}
            <div className="philosophy-stage-veil" aria-hidden="true"></div>
          </div>
          <div className="philosophy-slide-meta">
            <div className="philosophy-slide-copy">
              <small>{String(philosophySlide + 1).padStart(2, "0")} / {String(philosophyShots.length).padStart(2, "0")}</small>
              <strong>{philosophyShots[philosophySlide].label}</strong>
            </div>
            <div className="philosophy-progress" role="tablist" aria-label="Foto della palestra">
              {philosophyShots.map((shot, index) => (
                <button
                  key={shot.src}
                  type="button"
                  role="tab"
                  aria-selected={index === philosophySlide}
                  aria-label={`Mostra foto: ${shot.label}`}
                  className={index === philosophySlide ? "is-active" : undefined}
                  onClick={() => selectPhilosophySlide(index)}
                />
              ))}
            </div>
          </div>
          <div className="quote">
            <span>“</span>
            <p>Non devi essere già in forma per iniziare. Devi solo decidere di iniziare.</p>
          </div>
        </div>
        <div className="owners-spotlight reveal" id="titolari" aria-label="I titolari di Revenge Gym">
          <div className="owners-photo-frame">
            <figure className="owners-photo">
              <SiteImage src="/photos/live/gino-stefania-revenge-gym.webp?v=3" alt="Gino e Stefania nella sala di Revenge Gym" loading="lazy" width={875} height={1099} decoding="async" />
            </figure>
          </div>
          <div className="owners-copy">
            <p className="eyebrow"><span></span> I titolari</p>
            <h3>GINO & STEFANIA.<br/><em>REVENGE GYM.</em></h3>
            <p>La palestra di Ladispoli guidata da chi ci crede ogni giorno: cura degli spazi, attenzione alle persone e la stessa passione per l’allenamento che si respira in sala.</p>
            <small>LADISPOLI · SALA PESI · BOXE · RELAX</small>
          </div>
        </div>
        <div className="real-gym-strip reveal" aria-label="Foto reali di Revenge Gym">
          <figure><SiteImage src="/photos/live/sala-community.webp" alt="Community in sala pesi di Revenge Gym" loading="lazy"/><figcaption>Community in sala</figcaption></figure>
          <div className="real-gym-caption"><small>REVENGE GYM · LADISPOLI</small><strong>QUESTA È<br/>LA NOSTRA<br/><em>PALESTRA.</em></strong></div>
          <figure><SiteImage src="/photos/live/boxe-sacchi.webp" alt="Area boxe con sacchi a Revenge Gym" loading="lazy"/><figcaption>Sala boxe · sacchi e ring</figcaption></figure>
        </div>
        <div className="gym-video reveal">
          <div className="gym-video-copy"><small>TOUR DELLA PALESTRA</small><h3>ENTRA IN<br/><em>REVENGE GYM.</em></h3><p>Scopri gli ambienti, le aree di allenamento e l’atmosfera della palestra prima ancora di venirci a trovare.</p></div>
          <video
            ref={gymTourVideoRef}
            autoPlay
            muted
            loop
            playsInline
            {...safariInline}
            preload="auto"
            poster="/media/sala-attrezzi.webp"
            disablePictureInPicture
            aria-label="Video degli ambienti di Revenge Gym"
          >
            <source src="/media/revenge-gym-tour.mp4" type="video/mp4"/>
            Il tuo browser non supporta la riproduzione video.
          </video>
        </div>
      </section>

      <section className="relax-lounge" id="sala-relax">
        <div className="relax-copy reveal">
          <p className="eyebrow"><span></span> Sala relax · Ladispoli</p>
          <h2>QUI SI SCENDE<br/><em>DI GIRI.</em></h2>
          <p className="lead">Dopo esserti allenato, ricaricati con un caffè in uno spazio pensato per rallentare, dissetarti e stare insieme.</p>
          <p>Caffè, cappuccino, tè, bibite energizzanti e proteiche, integratori alimentari, gadget, una Vespa 50, il flipper acceso e pezzi di storia: un angolo retrò dove chiacchierare e riprendere fiato.</p>
          <p>Non è un corridoio di passaggio, ma uno spazio da vivere e condividere a fine seduta: per incontrarsi o aspettare amici e figli.</p>
          <div className="relax-facts" aria-label="Cosa trovi in sala relax">
            <div><strong>01</strong><span>Caffè</span></div>
            <div><strong>02</strong><span>Retrò</span></div>
            <div><strong>03</strong><span>Pausa</span></div>
          </div>
          <small className="relax-credit">Musica: Latin Lovers · Ahjay Stelino · Mixkit</small>
        </div>
        <figure className="relax-player reveal">
          <video
            ref={relaxVideoRef}
            className="relax-video"
            autoPlay
            muted
            loop
            playsInline
            {...safariInline}
            preload="auto"
            poster="/photos/live/sala-relax-poster.webp"
            disablePictureInPicture
            aria-label="Video della sala relax di Revenge Gym: caffè, Vespa 50 e angolo retrò"
          >
            <source src="/media/sala-relax.mp4" type="video/mp4" />
            Il tuo browser non supporta la riproduzione video.
          </video>
          <button
            className={`relax-audio${relaxSound ? " active" : ""}`}
            type="button"
            onClick={toggleRelaxSound}
            aria-pressed={relaxSound}
          >
            <i>{relaxSound ? "▮▮" : "♪"}</i> {relaxSound ? "Musica attiva" : "Attiva musica"}
          </button>
          <figcaption>Sala relax · caffè, Vespa e angolo retrò</figcaption>
        </figure>
      </section>

      <section className="section courses" id="corsi">
        <div className="section-heading reveal">
          <div><p className="eyebrow"><span></span> Tutto ciò che ti serve</p><h2>ALLENATI.<br/><em>EVOLVI.</em></h2></div>
          <p>Spazi e attrezzature per costruire un allenamento completo, efficace e adatto ai tuoi obiettivi.</p>
        </div>
        <div className="course-grid">
          {courses.map((course, i) => <button type="button" className="course-card reveal" key={course.title} onClick={() => setActiveArea(course)} aria-label={`Scopri l’area ${course.title}`}>
            <SiteImage src={course.image} alt={course.title} loading="lazy" />
            <div className="course-overlay"></div><span className="course-number">0{i+1}</span>
            <div className="course-content"><span className="course-icon"><CourseAreaIcon kind={course.icon} /></span><small>{course.tag}</small><h3>{course.title}</h3><p>{course.text}</p><span className="course-open">Scopri l’area <span>↗</span></span></div>
          </button>)}
        </div>
      </section>

      {activeArea && <div className="brand-drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveArea(null)}>
        <aside ref={drawerRef} className="brand-drawer area-drawer" role="dialog" aria-modal="true" aria-labelledby="area-drawer-title">
          <button ref={drawerCloseRef} className="brand-drawer-close" type="button" onClick={() => setActiveArea(null)} aria-label="Chiudi approfondimento">×</button>
          <div className="brand-drawer-head area-drawer-head" style={{ backgroundImage: `linear-gradient(0deg,rgba(8,8,8,.96),rgba(8,8,8,.18) 75%),url(${activeArea.image})` }}><span>LE AREE · REVENGE GYM</span><small>{activeArea.tag}</small><h2 id="area-drawer-title" className={activeArea.title.length > 12 ? "brand-title-long" : undefined}>{activeArea.title}</h2><p>{activeArea.description}</p></div>
          <div className="brand-drawer-body">
            <section><small>COSA TROVI</small><ul>{activeArea.features.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section className="brand-relevance"><small>IDEALE PER</small><p>{activeArea.ideal}</p></section>
            <a className="brand-source" href="#contatti" onClick={() => setActiveArea(null)}>Chiedi info <span>↗</span></a>
          </div>
        </aside>
      </div>}

      <section className="section schedule-section" id="attrezzatura">
        <div className="section-heading reveal"><div><p className="eyebrow"><span></span> Qualità in sala</p><h2>MACCHINARI<br/><em>SELEZIONATI.</em></h2></div><p>Una palestra dotata di macchinari d’eccellenza, scelti tra i migliori marchi americani e italiani.</p></div>
        <div className="brand-grid reveal">
          {equipmentBrands.map((brand, i) => (
            <button type="button" key={brand.name} onClick={() => setActiveBrand(brand)} aria-label={`Scopri storia e caratteristiche di ${brand.name}`}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{brand.name}</strong>
              <small>{brand.since}</small>
              <p className="brand-excerpt">{brand.intro}</p>
              <i>Scopri il marchio ↗</i>
            </button>
          ))}
        </div>
        <div className="equipment-gallery reveal" aria-label="Attrezzature di Revenge Gym">
          {[
            ['/media/sala-attrezzi.webp', 'Panoramica completa di Revenge Gym'],
            ['/photos/live/sala-panoramica-oggi.webp', 'Macchinari professionali della sala'],
            ['/photos/live/sala-cavi-oggi.webp', 'Area cavi e macchine isotoniche']
          ].map(([src, alt], i) => <figure key={src}><SiteImage src={src} alt={alt} loading="lazy"/><span>0{i+1}</span></figure>)}
        </div>
        <p className="schedule-note">La dotazione può essere aggiornata nel tempo. Vieni a vedere la palestra dal vivo.</p>

        <div className="gym-map reveal" id="mappa">
          <div className="gym-map-copy">
            <p className="eyebrow"><span></span> Esplora gli spazi</p>
            <h3>DENTRO<br/><em>REVENGE.</em></h3>
            <p>Seleziona una zona della palestra per scoprire cosa trovi e come può entrare nel tuo allenamento.</p>
            <div className="gym-map-detail" ref={gymMapDetailRef} aria-live="polite">
              <small>{activeZone.number} · {activeZone.subtitle}</small>
              <strong>{activeZone.title}</strong>
              <p>{activeZone.text}</p>
              <ul>{activeZone.equipment.map(item => <li key={item}>{item}</li>)}</ul>
              {"href" in activeZone && activeZone.href ? <a className="text-link orange" href={activeZone.href}>Guarda il video <span>↗</span></a> : null}
            </div>
          </div>
          <div className="floor-plan" aria-label="Mappa interattiva delle aree di Revenge Gym">
            {gymZones.map(zone => <button key={zone.id} type="button" className={`floor-zone ${zone.className}${activeZone.id === zone.id ? " active" : ""}`} onClick={() => selectGymZone(zone)} aria-pressed={activeZone.id === zone.id}>
              <span>{zone.number}</span><strong>{zone.title}</strong><small>{zone.subtitle}</small>
            </button>)}
            <div className="floor-core">REVENGE<br/><span>GYM</span></div>
          </div>
        </div>
      </section>

      {activeBrand && <div className="brand-drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveBrand(null)}>
        <aside ref={drawerRef} className="brand-drawer" role="dialog" aria-modal="true" aria-labelledby="brand-drawer-title">
          <button ref={drawerCloseRef} className="brand-drawer-close" type="button" onClick={() => setActiveBrand(null)} aria-label="Chiudi approfondimento">×</button>
          <div className="brand-drawer-head"><span>BRAND PROFILE · REVENGE GYM</span><small>{activeBrand.origin}</small><h2 id="brand-drawer-title" className={activeBrand.name.length > 12 ? "brand-title-long" : undefined}>{activeBrand.name}</h2><p>{activeBrand.intro}</p></div>
          <div className="brand-drawer-body">
            <section><small>LA STORIA</small><p>{activeBrand.history}</p></section>
            <section><small>COSA LO DISTINGUE</small><ul>{activeBrand.highlights.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section className="brand-relevance"><small>PERCHÉ È IN REVENGE GYM</small><p>{activeBrand.relevance}</p></section>
            <a className="brand-source" href={activeBrand.source} target="_blank" rel="noopener noreferrer">{activeBrand.sourceLabel} <span>↗</span></a>
          </div>
        </aside>
      </div>}

      <section className="gallery-section" id="gallery">
        <div className="gallery-title reveal"><p className="eyebrow"><span></span> Dentro Revenge Gym</p><h2>SUDORE. ENERGIA.<br/><em>RISULTATI.</em></h2></div>
        <div className="gallery-grid">
          {gallery.map(([src, alt], i) => <figure className={`gallery-item g${i+1} reveal`} key={src}><SiteImage src={src} alt={alt} loading="lazy"/><figcaption>{alt}<span>↗</span></figcaption></figure>)}
        </div>
      </section>

      <section className="section magazine" id="magazine">
        <div className="section-heading reveal"><div><p className="eyebrow"><span></span> Revenge Journal</p><h2>ALLENATI<br/><em>CON METODO.</em></h2></div><p>Guide semplici per orientarti in palestra, capire gli strumenti e costruire un percorso che duri nel tempo.</p></div>
        <div className="magazine-grid">
          {magazineArticles.map((article, i) => <article className={`article-card article-${i + 1} reveal`} key={article.title}>
            <button type="button" onClick={() => setActiveArticle(article)} aria-label={`Leggi: ${article.title}`}>
              <div className="article-image"><SiteImage src={article.image} alt="" loading="lazy"/><span>0{i + 1}</span></div>
              <div className="article-copy"><small>{article.category} · {article.time} di lettura</small><h3>{article.title}</h3><p>{article.excerpt}</p><b>Leggi l’articolo <span>↗</span></b></div>
            </button>
          </article>)}
        </div>
      </section>

      {activeArticle && <div className="brand-drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveArticle(null)}>
        <article ref={drawerRef} className="brand-drawer article-drawer" role="dialog" aria-modal="true" aria-labelledby="article-drawer-title">
          <button ref={drawerCloseRef} className="brand-drawer-close" type="button" onClick={() => setActiveArticle(null)} aria-label="Chiudi articolo">×</button>
          <div className="article-drawer-hero"><SiteImage src={activeArticle.image} alt=""/><div><small>{activeArticle.category} · {activeArticle.time} di lettura</small><h2 id="article-drawer-title">{activeArticle.title}</h2></div></div>
          <div className="article-drawer-body"><p className="article-lead">{activeArticle.intro}</p>{activeArticle.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<blockquote><small>DA RICORDARE</small>{activeArticle.takeaway}</blockquote><a href="#contatti" onClick={() => setActiveArticle(null)} className="button primary">Chiedi info <span>↗</span></a></div>
        </article>
      </div>}

      <section className="social-proof" id="fiducia">
        <div className="social-proof-hero">
          <div className="social-proof-hero-media" role="img" aria-label="Community in sala pesi di Revenge Gym">
            <video
              ref={socialProofVideoRef}
              className="social-proof-hero-video"
              autoPlay
              muted
              loop
              playsInline
              {...safariInline}
              preload="metadata"
              poster="/photos/live/sala-community.webp"
              disablePictureInPicture
              aria-hidden="true"
            >
              <source src="/media/hero-loop.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="social-proof-hero-shade" aria-hidden="true"></div>
          <div className="social-proof-hero-content reveal">
            <p className="eyebrow"><span></span> Recensioni Google</p>
            <h2>CHI CI HA<br/><em>PROVATO.</em></h2>
            <p className="social-proof-hero-copy">Opinioni reali lasciate su Google Maps da chi si allena in sala — nomi e testi originali, tradotti in italiano dove necessario.</p>
          </div>
        </div>
        <div className="social-proof-body">
        <SocialProofReviews />
        <div className="social-proof-trust reveal">
          <div className="social-proof-fpi">
            <SiteImage src="/photos/boxe/fpi-logo-circolare.jpg" alt="Logo Federazione Pugilistica Italiana" width={72} height={72} loading="lazy" />
            <div>
              <strong>Affiliati FPI</strong>
              <span>Area boxe con ring e spazio tecnico, in linea con gli standard della Federazione Pugilistica Italiana.</span>
            </div>
          </div>
          <div className="social-proof-brands" aria-label="Marchi presenti in sala">
            {partnerBrands.map((brand) => <span key={brand}>{brand}</span>)}
          </div>
        </div>
        </div>
      </section>

      <section className="section transform-spot" id="trasformazione" aria-label="Spot trasformazione Revenge Gym">
        <div className="transform-spot-grid reveal">
          <div className="transform-spot-copy">
            <p className="eyebrow"><span></span> Spot · Revenge Gym</p>
            <h2>NON È SOLO<br/><em>ALLENAMENTO.</em><br/>È TRASFORMAZIONE.</h2>
            <p className="lead">Lo stesso impegno che vedi in sala, lo stesso ambiente che ti spinge a non mollare.</p>
            <p>Qui si costruisce la tua rivincita, giorno dopo giorno — con metodo, continuità e un gruppo che non ti lascia solo.</p>
            <a href="#contatti" className="button primary">Inizia da qui <span>↗</span></a>
          </div>
          <div className="transform-spot-frame">
            <figure className="transform-spot-player">
              <video
                ref={transformSpotVideoRef}
                autoPlay
                muted
                loop
                playsInline
                {...safariInline}
                preload="metadata"
                poster="/photos/live/hero-sala.webp"
                disablePictureInPicture
                aria-label="Video spot trasformazione Revenge Gym"
              >
                <source src="/media/spot-trasformazione.mp4" type="video/mp4" />
              </video>
              <figcaption>Spot trasformazione · Ladispoli</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="trial" id="info">
        <div className="trial-inner reveal"><p className="eyebrow"><span></span> Informazioni e iscrizioni</p><h2>HAI DOMANDE?<br/>SCRIVICI <em>ORA.</em></h2><p>Abbonamenti, aree della palestra o la boxe: dicci cosa ti serve sapere. Ti rispondiamo noi e ti aiutiamo a capire come allenarti da Revenge Gym.</p><a href="#contatti" className="button primary">Chiedi info <span>↗</span></a></div>
      </section>

      <section className="section contact" id="contatti">
        <div className="contact-info reveal">
          <p className="eyebrow"><span></span> Parliamone</p><h2>CI VEDIAMO<br/>IN <em>PALESTRA.</em></h2>
          <div className="info-list">
            <div><small>Dove siamo</small><p>Via Berna, 8<br/>00055 Ladispoli RM</p><a href="https://maps.google.com/?q=Via+Berna+8+00055+Ladispoli+RM" target="_blank" rel="noopener noreferrer">Apri in Google Maps ↗</a></div>
            <div id="orari">
              <small>Orari</small>
              <dl className="hours">
                <div><dt>Lun – Ven</dt><dd>6:30 – 22:00</dd></div>
                <div><dt>Sabato</dt><dd>6:30 – 17:00</dd></div>
                <div className="hours-closed"><dt>Domenica</dt><dd>Chiuso</dd></div>
              </dl>
            </div>
            <div><small>Contatti</small><p><a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a><br/><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></div>
            <div><small>Seguici</small><p className="socials"><a href={SOCIAL_FACEBOOK} target="_blank" rel="noopener noreferrer">Facebook ↗</a><a href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={SOCIAL_MESSENGER} target="_blank" rel="noopener noreferrer">Messenger ↗</a></p></div>
          </div>
          <GymMap />
        </div>
        <form className="contact-form reveal" onSubmit={submitForm} noValidate={false}>
          <span className="form-kicker">RICHIEDI INFORMAZIONI</span><h3>Scrivici, ti rispondiamo noi</h3>
          <label>Nome e cognome<input required name="name" autoComplete="name" maxLength={100} placeholder="Il tuo nome" /></label>
          <div className="form-row"><label>Email<input required type="email" name="email" autoComplete="email" maxLength={254} placeholder="nome@email.it" /></label><label>Telefono<input required type="tel" name="phone" autoComplete="tel" maxLength={30} placeholder="+39" /></label></div>
          <label>Area di interesse<select name="course" defaultValue="" required><option value="" disabled>Seleziona un’area</option>{[...courses.map(c => c.title), 'Boxe'].map(area => <option key={area}>{area}</option>)}</select></label>
          <label>Messaggio <span className="label-optional">(facoltativo)</span><textarea name="message" maxLength={2000} placeholder="Dicci cosa vuoi sapere: abbonamenti, obiettivi..."></textarea></label>
          <label className="privacy"><input required type="checkbox" name="privacy" value="accepted" /> <span>Ho letto e accetto la <Link href="/privacy/">privacy policy</Link>.</span></label>
          <button className="button primary" type="submit" disabled={formStatus === "sending"}>
            {formStatus === "sending" ? "Invio in corso…" : <>Chiedi info <span>↗</span></>}
          </button>
          {formStatus === "sent" && <p className="success" role="status">Richiesta ricevuta! Ti richiamiamo al più presto.</p>}
          {formStatus === "error" && <p className="form-error" role="alert">Invio non riuscito. Riprova o scrivi a {CONTACT_EMAIL}.</p>}
        </form>
      </section>

      <footer>
        <a href="#home" className="logo" aria-label="Revenge Gym, torna all'inizio"><SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></a>
        <p>Sala pesi · Ladispoli</p>
        <p className="footer-legal">
          <LegalIdentity copyright="© 2026 Revenge Gym. Tutti i diritti riservati." />
          <Link href="/privacy/" className="footer-privacy">Privacy</Link>
          <NelloCredit />
        </p>
        <a href="#home" className="back-top" aria-label="Torna all'inizio">↑</a>
      </footer>

      {!overlaysOpen && tickerHidden ? (
        <div className="mobile-cta-bar is-visible" aria-label="Azioni rapide">
          <a className="mobile-cta-call" href={`tel:${CONTACT_PHONE_TEL}`}>Chiama</a>
          <a className="mobile-cta-primary" href="#contatti">Chiedi info</a>
        </div>
      ) : null}
    </main>
  );
}
