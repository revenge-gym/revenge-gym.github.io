"use client";

import SiteImage from "@/app/components/site-image";
import LegalIdentity from "@/app/components/legal-identity";
import NelloCredit from "@/app/components/nello-credit";
import { useEffect, useState } from "react";
import Link from "next/link";
import MobileSwipeBack from "@/app/components/mobile-swipe-back";
import { bodyZones } from "@/lib/body-zones";
import { getSheetPath, hasMachineSheet } from "@/lib/machine-sheets";
import type { Machine, MachineArea } from "@/lib/machines";

type Props = {
  area: MachineArea;
  areaLabel: string;
  leadLabel: string;
  pagerHomeLabel: string;
  machine: Machine;
  prev: Machine;
  next: Machine;
  styles: Record<string, string>;
  brandKicker?: string;
  whyTitle?: string;
  figcaption?: string;
  showSheet?: boolean;
};

export default function MachineDetailView({
  area,
  areaLabel,
  leadLabel,
  pagerHomeLabel,
  machine,
  prev,
  next,
  styles,
  brandKicker = "01 · LA MACCHINA",
  whyTitle = "POSTAZIONE",
  figcaption = "Revenge Gym · Ladispoli",
  showSheet = false,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);
  const nameParts = machine.name.split(" ");
  const last = nameParts.pop() ?? machine.name;
  const first = nameParts.join(" ");
  const closeMenu = () => {
    setZonesOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle("menu-lock", menuOpen);
    return () => document.body.classList.remove("menu-lock");
  }, [menuOpen]);

  return (
    <main className={styles.page} id="top">
      <MobileSwipeBack />
      <header className={styles.nav}>
        <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym, home">
          <SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <button
          className={styles.menuToggle}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
        >
          <i></i>
          <i></i>
        </button>
        <nav className={menuOpen ? styles.open : ""} aria-label={`Menu scheda macchina ${areaLabel.toLowerCase()}`}>
          <Link className={styles.siteLink} href={`/macchine/${area}`} onClick={() => setMenuOpen(false)}>
            ← {areaLabel}
          </Link>
          <div className={`${styles.zoneMenu} ${zonesOpen ? styles.zoneOpen : ""}`}>
            <button type="button" className={styles.zoneTrigger} aria-expanded={zonesOpen} onClick={() => setZonesOpen(!zonesOpen)}>
              Per gruppi muscolari <span>▾</span>
            </button>
            <div className={styles.zonePanel} role="menu">
              <div className={styles.zonePanelInner}>
                {bodyZones.map((zone) => (
                  <Link key={zone.label} href={zone.href} role="menuitem" onClick={closeMenu}>
                    {zone.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link className={styles.siteLink} href="/nuove-macchine" onClick={() => setMenuOpen(false)}>
            Nuove macchine
          </Link>
          <Link href="/?skipIntro=1#contatti" className={styles.contact} onClick={() => setMenuOpen(false)}>
            Chiedi info <span>↗</span>
          </Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span>
            {machine.number} · {machine.category.toUpperCase()}
          </span>
          <small>{machine.brand}</small>
          <h1>
            {first ? (
              <>
                {first}
                <br />
                <em>{last}.</em>
              </>
            ) : (
              <em>{last}.</em>
            )}
          </h1>
          <p>{machine.tagline}</p>
          <b>{machine.focus}</b>
          {showSheet && styles.sheetLink && hasMachineSheet(machine.id) ? (
            <Link href={getSheetPath(area, machine.id)} className={styles.sheetLink}>
              Scarica la scheda · {machine.name}
              <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>
        <figure className={styles.heroPhoto}>
          <span className={styles.photoNumber} aria-hidden="true">
            {machine.number}
          </span>
          <SiteImage src={machine.image} alt={machine.alt} />
          <figcaption>{figcaption}</figcaption>
        </figure>
      </section>

      <div className={styles.body}>
        <section className={styles.brandBlock}>
          <small>{brandKicker}</small>
          <h2>
            PERCHÉ QUESTA
            <br />
            <em>{whyTitle}.</em>
          </h2>
          {machine.brandNote.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
        <section className={styles.leadBlock}>
          <small>02 · ALLENAMENTO {leadLabel}</small>
          <h2>
            COME SI USA
            <br />
            <em>IN SALA.</em>
          </h2>
          {machine.lead.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
        <section className={styles.qualityBlock}>
          <small>STANDARD REVENGE</small>
          <h2>
            QUALITÀ,
            <br />
            <em>NON PREZZO.</em>
          </h2>
          <p>{machine.qualityEdge}</p>
        </section>
        <div className={styles.grid2}>
          <section>
            <small>03 · MUSCOLI</small>
            <h3>
              COSA LAVORA
              <br />
              DAVVERO.
            </h3>
            <div className={styles.dual}>
              <div>
                <b>PRINCIPALI</b>
                {machine.primaryMuscles.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div>
                <b>IN ASSISTENZA</b>
                {machine.secondaryMuscles.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.dark}>
            <small>04 · RUOLO</small>
            <h3>
              DOVE SI
              <br />
              INSERISCE.
            </h3>
            <ul>
              {machine.trainingRole.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className={styles.grid2}>
          <section className={styles.accent}>
            <small>05 · CUE TECNICI</small>
            <h3>
              ESECUZIONE
              <br />
              PROFESSIONALE.
            </h3>
            <ul>
              {machine.cues.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <small>06 · PROGRAMMAZIONE</small>
            <h3>
              COME USARLA
              <br />
              NELLA SETTIMANA.
            </h3>
            <ul>
              {machine.programming.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className={styles.grid2}>
          <section className={styles.error}>
            <small>07 · ERRORI</small>
            <h3>
              CONTROLLO,
              <br />
              NON FRETTA.
            </h3>
            <ul>
              {machine.errors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className={styles.trainer}>
            <small>CONSIGLI DEL TRAINER</small>
            <blockquote>“{machine.trainer}”</blockquote>
          </section>
        </div>
      </div>

      <nav className={styles.pager} aria-label={`Altre macchine ${areaLabel.toLowerCase()}`}>
        <Link href={`/macchine/${area}/${prev.id}`}>
          <span>← Precedente</span>
          <strong>{prev.name}</strong>
        </Link>
        <Link href={`/macchine/${area}`} className={styles.pagerHome}>
          {pagerHomeLabel}
        </Link>
        <Link href={`/macchine/${area}/${next.id}`} className={styles.pagerNext}>
          <span>Successiva →</span>
          <strong>{next.name}</strong>
        </Link>
      </nav>

      <footer className={styles.footer}>
        <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym home">
          <SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <p>
          {machine.brand} · {areaLabel}
        </p>
        <p className={styles.footerLegal}>
          <LegalIdentity />
          <NelloCredit className={styles.byNello} />
        </p>
      </footer>
    </main>
  );
}
