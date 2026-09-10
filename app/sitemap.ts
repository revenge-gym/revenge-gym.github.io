import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";
import { absMachines } from "@/lib/abs-machines";
import { backMachines } from "@/lib/back-machines";
import { bicepsMachines } from "@/lib/biceps-machines";
import { chestMachines } from "@/lib/chest-machines";
import { gluteMachines } from "@/lib/glute-machines";
import { legMachines } from "@/lib/leg-machines";
import { shoulderMachines } from "@/lib/shoulder-machines";
import { tricepsMachines } from "@/lib/triceps-machines";

export const dynamic = "force-static";

const origin = SITE_ORIGIN;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/boxe/",
    "/nuove-macchine/",
    "/privacy/",
    "/macchine/spalle/",
    "/macchine/petto/",
    "/macchine/dorso/",
    "/macchine/bicipiti/",
    "/macchine/tricipiti/",
    "/macchine/addominali/",
    "/macchine/glutei/",
    "/macchine/gambe/",
  ];
  const collections = [
    ["spalle", shoulderMachines],
    ["petto", chestMachines],
    ["dorso", backMachines],
    ["bicipiti", bicepsMachines],
    ["tricipiti", tricepsMachines],
    ["addominali", absMachines],
    ["glutei", gluteMachines],
    ["gambe", legMachines],
  ] as const;
  const machinePaths = collections.flatMap(([area, machines]) =>
    machines.map((machine) => `/macchine/${area}/${machine.id}/`),
  );

  const lastModified = new Date();
  return [...staticPaths, ...machinePaths].map((path) => ({
    url: `${origin}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
