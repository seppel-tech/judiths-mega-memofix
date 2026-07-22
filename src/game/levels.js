export const LEVELS = [
  { id: 1, name: 'Leicht',      cols: 4, rows: 3, pairs: 6,  flipBackMs: 1560 },
  { id: 2, name: 'Normal',      cols: 4, rows: 4, pairs: 8,  flipBackMs: 1300 },
  { id: 3, name: 'Schwer',      cols: 5, rows: 4, pairs: 10, flipBackMs: 1040 },
  { id: 4, name: 'Sehr schwer', cols: 6, rows: 5, pairs: 15, flipBackMs: 910  },
  { id: 5, name: 'Extrem',      cols: 6, rows: 6, pairs: 18, flipBackMs: 780, reshuffleEvery: 6 }
];

export function getLevel(id) {
  const lvl = LEVELS.find(l => l.id === id);
  if (!lvl) throw new Error(`Unbekannte Stufe: ${id}`);
  return lvl;
}
