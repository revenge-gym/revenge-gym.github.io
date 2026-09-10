"use client";

import SiteImage from "@/app/components/site-image";
import Link from "next/link";
import type { Machine } from "@/lib/machines";
import type { MachineSheet } from "@/lib/machine-sheets";
import LegSheetIllustration from "./leg-sheet-illustration";
import styles from "./sheet.module.css";

type Props = {
  machine: Machine;
  sheet: MachineSheet;
};

export default function MachineSheetView({ machine, sheet }: Props) {
  const handlePrint = () => window.print();

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar} aria-hidden={false}>
        <Link href={`/macchine/${sheet.zone}/${machine.id}`} className={styles.back}>
          ← Torna alla scheda
        </Link>
        <div className={styles.actions}>
          <button type="button" className={styles.printBtn} onClick={handlePrint}>
            Stampa / Salva PDF
          </button>
        </div>
      </div>

      <article className={styles.sheet} id="machine-sheet">
        <header className={styles.header}>
          <div className={styles.brandRow}>
            <SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" className={styles.logo} />
            <div className={styles.meta}>
              <span>{sheet.zone === "glutei" ? "Glutei" : "Gambe"} · {machine.number}</span>
              <strong>{machine.brand}</strong>
            </div>
          </div>
          <h1>
            {machine.name}
            <em>.</em>
          </h1>
          <p className={styles.tagline}>{machine.focus}</p>
        </header>

        <section className={styles.illustrationBlock} aria-label="Schema d’uso">
          <figure className={styles.photoRef}>
            <SiteImage src={machine.image} alt={machine.alt} />
            <figcaption>Foto reale · {machine.name} {machine.brand} in sala</figcaption>
          </figure>
          <LegSheetIllustration type={sheet.illustration} machineName={machine.name} />
          <p className={styles.illustrationCaption}>{sheet.caption}</p>
        </section>

        <section className={styles.setupBlock}>
          <h2>Prima di iniziare</h2>
          <ul>
            {sheet.setup.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.stepsBlock}>
          <h2>Come si esegue</h2>
          <ol>
            {sheet.steps.map((step) => (
              <li key={step.number}>
                <span className={styles.stepNum}>{step.number}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className={styles.columns}>
          <section className={styles.musclesBlock}>
            <h2>Muscoli coinvolti</h2>
            <div className={styles.muscleCols}>
              <div>
                <b>Principali</b>
                {machine.primaryMuscles.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
              <div>
                <b>In assistenza</b>
                {machine.secondaryMuscles.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.avoidBlock}>
            <h2>Da evitare</h2>
            <ul>
              {sheet.avoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <footer className={styles.footer}>
          <p>Revenge Gym · Ladispoli · Scheda uso macchina</p>
          <p className={styles.trainer}>“{machine.trainer}”</p>
        </footer>
      </article>
    </div>
  );
}
