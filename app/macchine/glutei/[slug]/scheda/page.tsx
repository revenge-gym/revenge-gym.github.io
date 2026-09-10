import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MachineSheetView from "@/app/components/machine-sheet/machine-sheet-view";
import { getGluteMachine } from "@/lib/glute-machines";
import { getMachineSheet, getSheetSlugs } from "@/lib/machine-sheets";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSheetSlugs("glutei").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getGluteMachine(slug);
  if (!machine) return { title: "Scheda non trovata | Revenge Gym" };
  return {
    title: `Scheda ${machine.name} · ${machine.brand} | Revenge Gym`,
    description: `Guida illustrata per usare ${machine.name} ${machine.brand} in sala.`,
    alternates: { canonical: `/macchine/glutei/${machine.id}/scheda/` },
    robots: { index: false },
  };
}

export default async function GluteMachineSheetPage({ params }: Props) {
  const { slug } = await params;
  const machine = getGluteMachine(slug);
  const sheet = getMachineSheet(slug);
  if (!machine || !sheet) notFound();
  return <MachineSheetView machine={machine} sheet={sheet} />;
}
