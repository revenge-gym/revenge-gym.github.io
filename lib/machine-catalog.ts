import { absMachines } from "./abs-machines";
import { backMachines } from "./back-machines";
import { bicepsMachines } from "./biceps-machines";
import { chestMachines } from "./chest-machines";
import { gluteMachines } from "./glute-machines";
import { legMachines } from "./leg-machines";
import type { Machine, MachineArea } from "./machines";
import { shoulderMachines } from "./shoulder-machines";
import { tricepsMachines } from "./triceps-machines";

export const MACHINE_SEARCH_MIN_CHARS = 3;

export type CatalogMachine = {
  key: string;
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  alt: string;
  area: MachineArea;
  areaLabel: string;
  href: string;
};

const areas: { area: MachineArea; label: string; machines: Machine[] }[] = [
  { area: "gambe", label: "Gambe", machines: legMachines },
  { area: "glutei", label: "Glutei", machines: gluteMachines },
  { area: "petto", label: "Petto", machines: chestMachines },
  { area: "dorso", label: "Dorso", machines: backMachines },
  { area: "spalle", label: "Spalle", machines: shoulderMachines },
  { area: "bicipiti", label: "Bicipiti", machines: bicepsMachines },
  { area: "tricipiti", label: "Tricipiti", machines: tricepsMachines },
  { area: "addominali", label: "Addominali", machines: absMachines },
];

export const machineCatalog: CatalogMachine[] = areas.flatMap(({ area, label, machines }) =>
  machines.map((machine) => ({
    key: `${area}-${machine.id}`,
    id: machine.id,
    name: machine.name,
    brand: machine.brand,
    category: machine.category,
    image: machine.image,
    alt: machine.alt,
    area,
    areaLabel: label,
    href: `/macchine/${area}/${machine.id}`,
  })),
);

export type BrandSearchItem = {
  name: string;
  origin: string;
  since: string;
};

export type SearchHit =
  | { kind: "machine"; key: string; machine: CatalogMachine }
  | { kind: "brand"; key: string; name: string; origin: string; since: string };

export function foldSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/^\s+/, "")
    .replace(/\s+/g, " ");
}

function haystack(value: string) {
  return foldSearchText(value).trimEnd();
}

function tokens(value: string) {
  return haystack(value).split(/[^a-z0-9]+/).filter(Boolean);
}

function prefixScore(value: string, query: string, exact: number, token: number) {
  const folded = haystack(value);
  if (folded.startsWith(query)) return exact;
  if (!query.endsWith(" ") && tokens(value).some((part) => part.startsWith(query))) return token;
  return 0;
}

function queryReady(rawQuery: string) {
  const query = foldSearchText(rawQuery);
  return query.replace(/\s/g, "").length >= MACHINE_SEARCH_MIN_CHARS ? query : "";
}

export function searchMachines(rawQuery: string, limit = 16): CatalogMachine[] {
  return searchCatalog(rawQuery, [], limit)
    .filter((hit): hit is Extract<SearchHit, { kind: "machine" }> => hit.kind === "machine")
    .map((hit) => hit.machine);
}

export function searchCatalog(
  rawQuery: string,
  brands: BrandSearchItem[] = [],
  limit = 16,
): SearchHit[] {
  const query = queryReady(rawQuery);
  if (!query) return [];

  const brandHits = brands
    .map((brand) => {
      const score = prefixScore(brand.name, query, 108, 102);
      return score > 0
        ? { kind: "brand" as const, key: `brand-${haystack(brand.name)}`, name: brand.name, origin: brand.origin, since: brand.since, score, label: brand.name }
        : null;
    })
    .filter((entry) => entry !== null)
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label, "it"));

  const machineHits = machineCatalog
    .map((machine) => {
      const score = Math.max(
        prefixScore(machine.brand, query, 100, 95),
        prefixScore(machine.name, query, 80, 70),
        prefixScore(machine.category, query, 45, 40),
      );
      return score > 0 ? { kind: "machine" as const, key: machine.key, machine, score, label: machine.name } : null;
    })
    .filter((entry) => entry !== null)
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label, "it"));

  return [...brandHits, ...machineHits].slice(0, limit).map((hit) =>
    hit.kind === "machine"
      ? { kind: "machine" as const, key: hit.key, machine: hit.machine }
      : { kind: "brand" as const, key: hit.key, name: hit.name, origin: hit.origin, since: hit.since },
  );
}
