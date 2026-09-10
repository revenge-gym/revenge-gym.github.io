import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { legMachines, legZone } from "@/lib/leg-machines";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Allenamento Gambe | 15 macchine | Revenge Gym Ladispoli",
  description:
    "Area gambe completa a Ladispoli con attrezzature professionali: presse, hack squat, Panatta, Hammer Strength e molto altro.",
  alternates: { canonical: "/macchine/gambe/" },
  openGraph: {
    title: "Allenamento Gambe | Revenge Gym",
    description: "Catalogo completo arti inferiori con foto reali dalla sala di Ladispoli.",
    images: [{ url: "/photos/machines/gambe/pressa-orizzontale-life-fitness.webp", alt: "Pressa Life Fitness — Revenge Gym", width: 1200, height: 630 }],
  },
};

export default function LegsPage() {
  return (
    <MachineHub
      area="gambe"
      areaLabel="Gambe"
      machines={legMachines}
      zone={legZone}
      styles={styles}
      athleteSrc="/photos/athletes/gambe-athlete-hero.webp"
      athleteAlt="Atleta dedicata all’allenamento delle gambe"
      catalogIntro="Quindici postazioni fotografate in sala per gli arti inferiori. Marchi professionali, testi tecnici corposi e un catalogo pensato per chi cerca qualità nell’allenamento."
      ctaEm="SPINGERE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione gambe con lo staff."
    />
  );
}
