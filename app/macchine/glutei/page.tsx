import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { gluteMachines, gluteZone } from "@/lib/glute-machines";
import styles from "../machine-area.module.css";

export const metadata: Metadata = {
  title: "Allenamento Glutei | 7 macchine | Revenge Gym Ladispoli",
  description:
    "Esplora le 7 postazioni per i glutei di Revenge Gym: Hip Thrust Sidea e guidate, Gluteus Machine, Master Gluteus Panatta, Abductor e Adductor.",
  alternates: { canonical: "/macchine/glutei/" },
  openGraph: {
    title: "Allenamento Glutei | Revenge Gym",
    description: "Catalogo completo dell’area glutei di Revenge Gym Ladispoli.",
    images: [{ url: "/media/new-machines/sidea-hip-thrust.webp", alt: "Hip Thrust Sidea — Revenge Gym", width: 1200, height: 630 }],
  },
};

export default function GlutesPage() {
  return (
    <MachineHub
      area="glutei"
      areaLabel="Glutei"
      machines={gluteMachines}
      zone={gluteZone}
      styles={styles}
      athleteSrc="/photos/athletes/glutei-athlete-hero.webp"
      athleteAlt="Atleta dedicata all’allenamento dei glutei"
      catalogIntro="Sette postazioni dedicate a glutei e anche. Apri ogni scheda per scoprire funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni."
      ctaEm="SPINGERE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione glutei con lo staff."
    />
  );
}
