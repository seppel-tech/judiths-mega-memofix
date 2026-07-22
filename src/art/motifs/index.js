import { MOTIFS as BOTANIK } from './botanik.js';
import { MOTIFS as PARIS } from './paris.js';
import { MOTIFS as STERN } from './sternenhimmel.js';
import { MOTIFS as BAR } from './bar.js';

export const MOTIF_SETS = {
  botanik: BOTANIK,
  paris: PARIS,
  sternenhimmel: STERN,
  bar: BAR
};

export function getMotifSet(name) {
  const set = MOTIF_SETS[name];
  if (!set) throw new Error(`Unbekanntes Motiv-Set: ${name}`);
  return set;
}
