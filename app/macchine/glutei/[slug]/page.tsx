import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gluteMachines, getGluteMachine } from "@/lib/glute-machines";
import MachineDetailView from "@/app/components/machine-detail-view";
import styles from "../../machine-detail.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return gluteMachines.map((machine) => ({ slug: machine.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getGluteMachine(slug);
  if (!machine) return { title: "Macchina non trovata | Revenge Gym" };
  return {
    title: `${machine.name} · ${machine.brand} | Glutei | Revenge Gym`,
    description: machine.lead[0]?.slice(0, 155) ?? machine.tagline,
    alternates: { canonical: `/macchine/glutei/${machine.id}/` },
    openGraph: {
      title: `${machine.name} · Revenge Gym`,
      description: machine.tagline,
      images: [{ url: machine.image, alt: machine.alt, width: 1200, height: 630 }],
    },
  };
}

export default async function GluteMachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getGluteMachine(slug);
  if (!machine) notFound();
  const index = gluteMachines.findIndex((item) => item.id === machine.id);
  const prev = gluteMachines[(index - 1 + gluteMachines.length) % gluteMachines.length];
  const next = gluteMachines[(index + 1) % gluteMachines.length];
  return (
    <MachineDetailView
      area="glutei"
      areaLabel="Glutei"
      leadLabel="GLUTEI"
      pagerHomeLabel="Tutti i glutei"
      machine={machine}
      prev={prev}
      next={next}
      styles={styles}
      showSheet
    />
  );
}
