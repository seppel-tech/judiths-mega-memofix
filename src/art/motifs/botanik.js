// Botanik motif set — 18 distinct botanical line illustrations.
// Conventions (apply to every entry):
//   - One `<svg>` string per motif, viewBox="0 0 48 48".
//   - stroke="currentColor", stroke-width="1.25", stroke-linecap="round",
//     stroke-linejoin="round", fill="none" (set on the root, inherited).
//   - Stable id on the root svg: `botanik-<index>` for debugging / tests.
//   - Fine-line, engraved-plate aesthetic; no fills, no cartoon outlines.
//   - Each motif is visually distinct at a glance.

const S = 'stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"';

export const MOTIFS = [
  // 0 — single-petal bloom (anemone / open rose)
  `<svg id="botanik-0" viewBox="0 0 48 48" ${S}><circle cx="24" cy="20" r="4"/><path d="M24 20 C20 12 16 10 14 14 M24 20 C28 12 32 10 34 14 M24 20 C20 28 16 30 14 26 M24 20 C28 28 32 30 34 26"/><path d="M24 24 L24 40"/></svg>`,

  // 1 — lanceolate leaf (single pointed blade with central vein)
  `<svg id="botanik-1" viewBox="0 0 48 48" ${S}><path d="M24 6 C16 18 16 30 24 42 C32 30 32 18 24 6 Z"/><path d="M24 8 L24 40"/></svg>`,

  // 2 — branch with two leaves (diagonal stem, two ovate blades)
  `<svg id="botanik-2" viewBox="0 0 48 48" ${S}><path d="M8 40 C18 32 30 22 40 8"/><path d="M22 24 C16 22 14 18 16 14 C20 14 24 18 24 24 Z"/><path d="M30 16 C26 14 24 10 26 6 C30 6 34 10 34 16 Z"/></svg>`,

  // 3 — fern frond (vertical rachis with paired leaflets + fiddlehead curl)
  `<svg id="botanik-3" viewBox="0 0 48 48" ${S}><path d="M24 42 L24 12"/><path d="M24 12 C24 9 27 8 28 10 C29 11 27 12 25 11"/><path d="M24 38 Q19 36 15 32"/><path d="M24 38 Q29 36 33 32"/><path d="M24 31 Q20 29 17 25"/><path d="M24 31 Q28 29 31 25"/><path d="M24 24 Q21 22 19 18"/><path d="M24 24 Q27 22 29 18"/><path d="M24 18 Q22 16 21 13"/><path d="M24 18 Q26 16 27 13"/></svg>`,

  // 4 — thistle (bristly ovoid head, radiating spikes, bracts + stem)
  `<svg id="botanik-4" viewBox="0 0 48 48" ${S}><ellipse cx="24" cy="14" rx="5" ry="6"/><path d="M21 9 L19 6 M24 8 L24 4 M27 9 L29 6 M18 12 L14 10 M30 12 L34 10 M19 15 L15 16 M29 15 L33 16 M21 18 L19 22 M27 18 L29 22"/><path d="M21 19 L19 23 M24 20 L24 24 M27 19 L29 23"/><path d="M24 20 L24 42"/><path d="M24 30 C18 29 15 31 17 34 C21 34 24 33 24 30 Z"/><path d="M24 34 C30 33 33 35 31 38 C27 38 24 37 24 34 Z"/></svg>`,

  // 5 — cherry twig with blossom (diagonal branch + 5-petal flower + bud)
  `<svg id="botanik-5" viewBox="0 0 48 48" ${S}><path d="M8 40 C14 34 22 26 30 16 L36 10"/><circle cx="30" cy="14" r="1.5"/><ellipse cx="30" cy="10" rx="2" ry="3"/><ellipse cx="30" cy="10" rx="2" ry="3" transform="rotate(72 30 14)"/><ellipse cx="30" cy="10" rx="2" ry="3" transform="rotate(144 30 14)"/><ellipse cx="30" cy="10" rx="2" ry="3" transform="rotate(216 30 14)"/><ellipse cx="30" cy="10" rx="2" ry="3" transform="rotate(288 30 14)"/><path d="M21 25 C19 24 18 22 19 20 C22 20 23 22 22 24"/></svg>`,

  // 6 — lavender sprig (long stem with clustered bell buds + basal leaves)
  `<svg id="botanik-6" viewBox="0 0 48 48" ${S}><path d="M24 42 L24 14"/><ellipse cx="22" cy="14" rx="1" ry="1.5"/><ellipse cx="26" cy="14" rx="1" ry="1.5"/><ellipse cx="23" cy="11" rx="1" ry="1.5"/><ellipse cx="25" cy="11" rx="1" ry="1.5"/><ellipse cx="24" cy="8" rx="1" ry="1.5"/><ellipse cx="22" cy="17" rx="1" ry="1.5"/><ellipse cx="26" cy="17" rx="1" ry="1.5"/><ellipse cx="24" cy="14" rx="1" ry="1.5"/><path d="M24 34 C20 32 18 34 19 38 C22 38 24 36 24 34 Z"/><path d="M24 36 C28 34 30 36 29 40 C26 40 24 38 24 36 Z"/></svg>`,

  // 7 — rose (side view): cup of curled petals + sepals + stem
  `<svg id="botanik-7" viewBox="0 0 48 48" ${S}><path d="M16 20 C16 14 20 10 24 10 C28 10 32 14 32 20 C32 22 28 24 24 24 C20 24 16 22 16 20 Z"/><path d="M19 18 C21 14 27 14 29 18"/><path d="M22 16 C24 18 24 21 24 22"/><path d="M26 16 C25 18 24 21 24 22"/><path d="M21 23 L19 28"/><path d="M27 23 L29 28"/><path d="M24 24 L24 42"/><path d="M24 32 C19 30 16 33 18 37 C22 37 24 34 24 32 Z"/><path d="M24 34 C29 32 32 35 30 39 C26 39 24 36 24 34 Z"/></svg>`,

  // 8 — tulip: cup with three petals + long basal leaf
  `<svg id="botanik-8" viewBox="0 0 48 48" ${S}><path d="M15 18 C15 11 19 7 24 7 C29 7 33 11 33 18 C33 19 32 20 30 20 C28 19 26 19 24 19 C22 19 20 19 18 20 C16 20 15 19 15 18 Z"/><path d="M20 9 C20 14 22 18 24 18 C26 18 28 14 28 9"/><path d="M24 20 L24 42"/><path d="M24 30 C16 27 12 34 16 41 C22 40 24 35 24 30 Z"/></svg>`,

  // 9 — peony: large ruffled bloom, layered petals around a small center
  `<svg id="botanik-9" viewBox="0 0 48 48" ${S}><path d="M24 20 C18 16 14 17 14 22 C16 24 20 24 24 22"/><path d="M24 20 C30 16 34 17 34 22 C32 24 28 24 24 22"/><path d="M22 18 C17 13 12 14 11 19 C13 21 18 21 22 19"/><path d="M26 18 C31 13 36 14 37 19 C35 21 30 21 26 19"/><path d="M22 21 C17 25 13 28 15 32 C19 32 22 28 23 24"/><path d="M26 21 C31 25 35 28 33 32 C29 32 26 28 25 24"/><circle cx="24" cy="21" r="1.5"/><path d="M24 25 L24 42"/><path d="M24 33 C19 31 16 34 18 38 C22 38 24 35 24 33 Z"/></svg>`,

  // 10 — eucalyptus sprig: vertical stem with opposite rounded leaves
  `<svg id="botanik-10" viewBox="0 0 48 48" ${S}><path d="M24 42 L24 14"/><ellipse cx="20" cy="36" rx="3" ry="5" transform="rotate(-25 20 36)"/><ellipse cx="28" cy="36" rx="3" ry="5" transform="rotate(25 28 36)"/><ellipse cx="20" cy="28" rx="3" ry="5" transform="rotate(-25 20 28)"/><ellipse cx="28" cy="28" rx="3" ry="5" transform="rotate(25 28 28)"/><ellipse cx="20" cy="20" rx="3" ry="5" transform="rotate(-25 20 20)"/><ellipse cx="28" cy="20" rx="3" ry="5" transform="rotate(25 28 20)"/><ellipse cx="24" cy="12" rx="3" ry="5"/></svg>`,

  // 11 — clover: three heart-shaped leaflets from a central junction
  `<svg id="botanik-11" viewBox="0 0 48 48" ${S}><path d="M24 24 C20 22 18 18 20 14 C22 13 23 15 24 16 C25 15 26 13 28 14 C30 18 28 22 24 24 Z"/><path d="M24 24 C20 22 18 18 20 14 C22 13 23 15 24 16 C25 15 26 13 28 14 C30 18 28 22 24 24 Z" transform="rotate(120 24 24)"/><path d="M24 24 C20 22 18 18 20 14 C22 13 23 15 24 16 C25 15 26 13 28 14 C30 18 28 22 24 24 Z" transform="rotate(240 24 24)"/><path d="M24 24 L24 42"/></svg>`,

  // 12 — wheat ear: vertical stem with paired grain kernels + awns
  `<svg id="botanik-12" viewBox="0 0 48 48" ${S}><path d="M24 42 L24 16"/><ellipse cx="22" cy="34" rx="1.5" ry="2.5" transform="rotate(-30 22 34)"/><ellipse cx="26" cy="34" rx="1.5" ry="2.5" transform="rotate(30 26 34)"/><ellipse cx="22" cy="29" rx="1.5" ry="2.5" transform="rotate(-30 22 29)"/><ellipse cx="26" cy="29" rx="1.5" ry="2.5" transform="rotate(30 26 29)"/><ellipse cx="22" cy="24" rx="1.5" ry="2.5" transform="rotate(-30 22 24)"/><ellipse cx="26" cy="24" rx="1.5" ry="2.5" transform="rotate(30 26 24)"/><ellipse cx="22" cy="19" rx="1.5" ry="2.5" transform="rotate(-30 22 19)"/><ellipse cx="26" cy="19" rx="1.5" ry="2.5" transform="rotate(30 26 19)"/><ellipse cx="24" cy="16" rx="1.5" ry="2.5"/><path d="M24 14 L20 6"/><path d="M24 14 L24 4"/><path d="M24 14 L28 6"/></svg>`,

  // 13 — dandelion seedhead: receptacle + radiating parachutes + stem
  `<svg id="botanik-13" viewBox="0 0 48 48" ${S}><circle cx="24" cy="18" r="1.5"/><path d="M24 18 L24 10"/><path d="M24 18 L29.7 12.3"/><path d="M24 18 L32 18"/><path d="M24 18 L29.7 23.7"/><path d="M24 18 L24 26"/><path d="M24 18 L18.3 23.7"/><path d="M24 18 L16 18"/><path d="M24 18 L18.3 12.3"/><path d="M22 8 L24 10 L26 8"/><path d="M30.6 10 L29.7 12.3 L32.2 13"/><path d="M34 16 L32 18 L34 20"/><path d="M32.2 23 L29.7 23.7 L30.6 26"/><path d="M22 28 L24 26 L26 28"/><path d="M17.4 26 L18.3 23.7 L15.8 23"/><path d="M14 16 L16 18 L14 20"/><path d="M15.8 13 L18.3 12.3 L17.4 10"/><path d="M24 26 L24 42"/></svg>`,

  // 14 — ivy leaf: five angular lobes on a petiole
  `<svg id="botanik-14" viewBox="0 0 48 48" ${S}><path d="M24 7 L27 11 L31 12 L34 15 L31 19 L33 24 L30 28 L26 30 L24 31 L22 30 L18 28 L15 24 L17 19 L14 15 L17 12 L21 11 Z"/><path d="M24 31 L24 42"/><path d="M24 11 L24 30"/></svg>`,

  // 15 — magnolia: five broad petals around a small center
  `<svg id="botanik-15" viewBox="0 0 48 48" ${S}><ellipse cx="24" cy="13" rx="4" ry="6"/><ellipse cx="24" cy="13" rx="4" ry="6" transform="rotate(72 24 20)"/><ellipse cx="24" cy="13" rx="4" ry="6" transform="rotate(144 24 20)"/><ellipse cx="24" cy="13" rx="4" ry="6" transform="rotate(216 24 20)"/><ellipse cx="24" cy="13" rx="4" ry="6" transform="rotate(288 24 20)"/><circle cx="24" cy="20" r="1.8"/><path d="M24 27 L24 42"/><path d="M24 33 C19 31 16 34 18 38 C22 38 24 35 24 33 Z"/></svg>`,

  // 16 — olive branch: diagonal stem with small lance leaves + olives
  `<svg id="botanik-16" viewBox="0 0 48 48" ${S}><path d="M8 38 C16 32 26 22 38 10"/><path d="M16 31 C12 29 10 31 12 34 C15 34 17 33 16 31 Z"/><path d="M22 25 C26 27 28 25 26 22 C23 22 21 23 22 25 Z"/><path d="M28 19 C24 17 22 19 24 22 C27 22 29 21 28 19 Z"/><path d="M34 13 C38 15 40 13 38 10 C35 10 33 11 34 13 Z"/><ellipse cx="19" cy="29" rx="1.5" ry="2"/><ellipse cx="25" cy="23" rx="1.5" ry="2"/><ellipse cx="31" cy="17" rx="1.5" ry="2"/></svg>`,

  // 17 — poppy capsule: oval pod crowned with radiating stigmas
  `<svg id="botanik-17" viewBox="0 0 48 48" ${S}><ellipse cx="24" cy="22" rx="6" ry="8"/><path d="M19 14 L29 14"/><path d="M19 14 L17 10"/><path d="M21.5 14 L21 9"/><path d="M24 14 L24 8"/><path d="M26.5 14 L27 9"/><path d="M29 14 L31 10"/><path d="M19 18 L29 18"/><path d="M18 22 L30 22"/><path d="M19 26 L29 26"/><path d="M24 30 L24 42"/></svg>`
];
