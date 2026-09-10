import type { LegIllustrationType } from "@/app/components/machine-sheet/leg-sheet-illustration";
import { gluteMachines } from "@/lib/glute-machines";
import { legMachines } from "@/lib/leg-machines";
import type { Machine } from "@/lib/machines";

export type SheetStep = {
  number: number;
  title: string;
  detail: string;
};

export type SheetZone = "gambe" | "glutei";

export type MachineSheet = {
  machineId: string;
  zone: SheetZone;
  illustration: LegIllustrationType;
  caption: string;
  steps: SheetStep[];
  setup: string[];
  avoid: string[];
};

const ILLUSTRATION_BY_ID: Record<string, LegIllustrationType> = {
  "pressa-orizzontale-life-fitness": "pressa-orizzontale",
  "pressa-45-life-fitness": "pressa-angolata",
  "v-squat-life-fitness": "pressa-angolata",
  "hack-squat-gymleco": "hack-squat",
  "hack-squat-pendulum": "hack-squat",
  "belt-squat": "belt-squat",
  "dual-leg-curl-extension-panatta": "leg-extension",
  "leg-extension-teca": "leg-extension",
  "leg-curl-teca": "leg-curl-seated",
  "standing-leg-curl": "leg-curl-standing",
  "abductor-life-fitness": "abductor",
  "adductor-life-fitness": "adductor",
  "gluteus-machine-life-fitness": "glute-machine",
  "master-gluteus-panatta": "glute-machine",
  "hip-thrust-orizzontale": "hip-thrust",
  "hip-thrust-verticale": "hip-thrust-vertical",
  "lunge-deadlift-machine": "lunge-deadlift",
  "sissy-squat": "sissy-squat",
  "calf-machine-hammer": "calf-machine",
  "smith-machine-hammer": "smith-rack",
  "rack-hammer": "smith-rack",
};

const STEP_TITLES: Record<LegIllustrationType, [string, string, string, string]> = {
  "pressa-orizzontale": ["Assetto", "Piedi", "Discesa", "Spinta"],
  "pressa-angolata": ["Assetto", "Piedi", "Discesa", "Spinta"],
  "hack-squat": ["Appoggi", "Piedi", "Discesa", "Spinta"],
  "belt-squat": ["Cintura", "Assetto", "Discesa", "Spinta"],
  "leg-extension": ["Regolazione", "Contrazione", "Controllo", "Ritorno"],
  "leg-curl-seated": ["Regolazione", "Flessione", "Controllo", "Ritorno"],
  "leg-curl-standing": ["Stabilità", "Flessione", "Controllo", "Alternanza"],
  abductor: ["Assetto", "Apertura", "Controllo", "Chiusura"],
  adductor: ["Assetto", "Chiusura", "Controllo", "Apertura"],
  "glute-machine": ["Regolazione", "Estensione", "Contrazione", "Ritorno"],
  "hip-thrust": ["Setup", "Discesa", "Spinta", "Chiusura"],
  "hip-thrust-vertical": ["Setup", "Discesa", "Spinta", "Chiusura"],
  "lunge-deadlift": ["Passo", "Discesa", "Spinta", "Controllo"],
  "sissy-squat": ["Supporti", "Discesa", "Controllo", "Risalita"],
  "calf-machine": ["Appoggio", "Allungamento", "Spinta", "Pausa"],
  "smith-rack": ["Sicurezze", "Assetto", "Discesa", "Spinta"],
};

const SETUP_BY_ID: Record<string, string[]> = {
  "pressa-orizzontale-life-fitness": [
    "Regola lo schienale: zona lombare sempre a contatto",
    "Piedi sulla pedana, larghezza spalle o poco oltre",
    "Sblocca la sicura solo quando l'assetto è stabile",
  ],
  "pressa-45-life-fitness": [
    "Schiena e bacino aderenti allo schienale inclinato",
    "Piedi stabili sulla pedana — prova larghezza e posizione",
    "Carica i dischi in modo equilibrato su entrambi i lati",
  ],
  "v-squat-life-fitness": [
    "Spalle e schiena salde sugli appoggi prima di sbloccare",
    "Piede intero in appoggio per tutta la corsa",
    "Impara la traiettoria a carico leggero",
  ],
  "hack-squat-gymleco": [
    "Testa, schiena e bacino a contatto con i supporti",
    "Piedi sulla pedana — trova profondità e posizione stabili",
    "Regola i fermi di sicurezza prima di caricare",
  ],
  "hack-squat-pendulum": [
    "Sistema spalle e schiena prima di sbloccare",
    "Prova la cinematica a pendolo senza carico",
    "Piedi stabili per tutta l'escursione",
  ],
  "belt-squat": [
    "Regola altezza cintura e partenza in modo sicuro",
    "Petto alto, ginocchia tracciate sulle punte",
    "Parti leggero finché l'assetto è naturale",
  ],
  "dual-leg-curl-extension-panatta": [
    "Allinea il ginocchio all'asse di rotazione",
    "Regola schienale, sedile e rulli finché l'assetto è naturale",
    "In modalità curl: bacino aderente; in extension: schiena stabile",
  ],
  "leg-extension-teca": [
    "Allinea il ginocchio al fulcro della macchina",
    "Schiena stabile contro lo schienale",
    "Scegli un range completo ma confortevole",
  ],
  "leg-curl-teca": [
    "Bacino ben appoggiato alla seduta",
    "Allinea il ginocchio al fulcro",
    "Regola il rullo sul tendine d'Achille",
  ],
  "standing-leg-curl": [
    "Bacino fermo contro il supporto",
    "Gamba di lavoro allineata al fulcro",
    "Inizia dal lato più debole se serve equilibrio",
  ],
  "abductor-life-fitness": [
    "Schiena stabile, seduta regolata",
    "Scegli un'ampiezza iniziale comoda",
    "Carico moderato — qui conta la qualità del movimento",
  ],
  "adductor-life-fitness": [
    "Regola l'ampiezza iniziale sulla tua mobilità",
    "Bacino stabile per tutta la serie",
    "Non forzare aperture dolorose",
  ],
  "gluteus-machine-life-fitness": [
    "Regola pad e seduta finché senti il gluteo",
    "Spalle e busto stabili",
    "Carica solo quando la chiusura resta pulita",
  ],
  "master-gluteus-panatta": [
    "Assetto preciso prima del carico — tipico Panatta",
    "Spingi con l'anca, non con la lombare",
    "Escursione completa ma controllabile",
  ],
  "hip-thrust-orizzontale": [
    "Schiena sul pad, piedi radicati a terra",
    "Mento neutro, costole basse",
    "Regola altezza del pad e posizione dei piedi",
  ],
  "hip-thrust-verticale": [
    "Trova l'assetto in cui senti subito i glutei",
    "Costole basse, bacino neutro in partenza",
    "Confronta il feeling con la versione orizzontale",
  ],
  "lunge-deadlift-machine": [
    "Passo stabile prima di caricare",
    "Ginocchio sulla linea del piede avanti",
    "Parti leggero e costruisci qualità di schema",
  ],
  "sissy-squat": [
    "Regola i supporti in modo sicuro",
    "Attiva ginocchia e quadricipiti — mai a freddo",
    "Scendi solo nel range controllabile",
  ],
  "calf-machine-hammer": [
    "Avampiede stabile sulla pedana",
    "Ginocchia ferme (gambe tese o piegate secondo la macchina)",
    "ROM completo — non tagliare l'escursione",
  ],
  "smith-machine-hammer": [
    "Posiziona i fermi di sicurezza prima di ogni serie",
    "Barra sul trapezio alto, non sul collo",
    "Piedi stabili, ginocchia tracciate",
  ],
  "rack-hammer": [
    "Regola i pins di sicurezza prima di ogni serie pesante",
    "Brace del tronco, piedi radicati",
    "Chiedi spotter quando il carico lo richiede",
  ],
};

const CAPTION_BY_ILLUSTRATION: Record<LegIllustrationType, string> = {
  "pressa-orizzontale": "Schema a due fasi — discesa controllata e spinta. Confronta con la foto sopra.",
  "pressa-angolata": "Schema inclinato — due fasi del movimento. Confronta con la foto sopra.",
  "hack-squat": "Schema Hack Squat — appoggi e pedana. Confronta con la foto sopra.",
  "belt-squat": "Schema Belt Squat — cintura al bacino. Confronta con la foto sopra.",
  "leg-extension": "Schema extension — partenza e estensione. Confronta con la foto sopra.",
  "leg-curl-seated": "Schema curl seduto — flessione controllata. Confronta con la foto sopra.",
  "leg-curl-standing": "Schema curl in piedi — un arto alla volta. Confronta con la foto sopra.",
  abductor: "Schema abductor — apertura controllata. Confronta con la foto sopra.",
  adductor: "Schema adductor — chiusura controllata. Confronta con la foto sopra.",
  "glute-machine": "Schema glute — estensione dell'anca. Confronta con la foto sopra.",
  "hip-thrust": "Schema hip thrust — spinta d'anca. Confronta con la foto sopra.",
  "hip-thrust-vertical": "Schema hip thrust verticale — spinta d'anca. Confronta con la foto sopra.",
  "lunge-deadlift": "Schema affondo guidato — passo e spinta. Confronta con la foto sopra.",
  "sissy-squat": "Schema sissy squat — controllo del ginocchio. Confronta con la foto sopra.",
  "calf-machine": "Schema polpacci — allungamento e spinta. Confronta con la foto sopra.",
  "smith-rack": "Schema squat — discesa e spinta. Confronta con la foto sopra.",
};

function findSheetMachine(machineId: string): { machine: Machine; zone: SheetZone } | null {
  const glute = gluteMachines.find((m) => m.id === machineId);
  if (glute) return { machine: glute, zone: "glutei" };
  const leg = legMachines.find((m) => m.id === machineId);
  if (leg) return { machine: leg, zone: "gambe" };
  return null;
}

function buildSheet(machineId: string): MachineSheet | null {
  const found = findSheetMachine(machineId);
  const illustration = ILLUSTRATION_BY_ID[machineId];
  if (!found || !illustration) return null;
  const { machine, zone } = found;

  const titles = STEP_TITLES[illustration];
  const cues = machine.cues.slice(0, 4);
  while (cues.length < 4) cues.push(machine.cues[machine.cues.length - 1] ?? "");

  return {
    machineId,
    zone,
    illustration,
    caption: CAPTION_BY_ILLUSTRATION[illustration],
    setup: SETUP_BY_ID[machineId] ?? SETUP_BY_ID["pressa-orizzontale-life-fitness"],
    steps: cues.map((detail, i) => ({
      number: i + 1,
      title: titles[i],
      detail,
    })),
    avoid: machine.errors.slice(0, 3),
  };
}

const sheetSourceIds = [...legMachines, ...gluteMachines].map((m) => m.id);

const sheets: MachineSheet[] = sheetSourceIds
  .map((id) => buildSheet(id))
  .filter((s): s is MachineSheet => s !== null);

export function getMachineSheet(machineId: string): MachineSheet | undefined {
  return sheets.find((sheet) => sheet.machineId === machineId);
}

export function hasMachineSheet(machineId: string): boolean {
  return sheets.some((sheet) => sheet.machineId === machineId);
}

export function getSheetSlugs(zone?: SheetZone): string[] {
  return sheets.filter((sheet) => (zone ? sheet.zone === zone : true)).map((sheet) => sheet.machineId);
}

export function getSheetPath(zone: string, machineId: string): string {
  return `/macchine/${zone}/${machineId}/scheda`;
}
