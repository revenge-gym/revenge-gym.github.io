export type Machine = {
  id: string;
  number: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  alt: string;
  tagline: string;
  brandNote: string[];
  lead: string[];
  qualityEdge: string;
  focus: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  trainingRole: string[];
  cues: string[];
  programming: string[];
  errors: string[];
  trainer: string;
};

export type MachineZone = {
  title: string;
  eyebrow: string;
  heroTitle: string[];
  heroLead: string;
  manifestoTitle: string[];
  manifesto: string[];
};

export type MachineArea = "gambe" | "glutei" | "petto" | "dorso" | "spalle" | "bicipiti" | "tricipiti" | "addominali";
