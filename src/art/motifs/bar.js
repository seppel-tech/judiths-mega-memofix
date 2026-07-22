// Bar / cocktail motif set — 18 fine line illustrations.
// Conventions per motif:
//   viewBox="0 0 48 48", stroke="currentColor", stroke-width="1.25",
//   stroke-linecap="round", stroke-linejoin="round", fill="none".
//   Root <svg> id is `bar-N` (0-based).
// Aesthetic: "Quiet Luxury" — engraved/etched line art, not cartoonish.

export const MOTIFS = [
  // 0 — Martini glass (reference style)
  `<svg id="bar-0" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M10 12 L38 12 L24 28 Z"/><path d="M24 28 L24 40 M16 40 L32 40"/><circle cx="26.5" cy="16" r="2"/></svg>`,

  // 1 — Coupe glass (shallow rounded bowl on stem)
  `<svg id="bar-1" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M9 13 Q24 28 39 13"/><path d="M9 13 L39 13"/><path d="M24 19 L24 39 M16 39 L32 39"/><path d="M16 13 Q18 11 19 13"/></svg>`,

  // 2 — Tumbler / rocks glass (short, wide, thick base)
  `<svg id="bar-2" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M14 15 L34 15 L32 38 L16 38 Z"/><path d="M15 32 L33 32"/><path d="M15.5 20 Q20 19 24 20 Q28 21 32.5 20"/></svg>`,

  // 3 — Highball glass (tall, narrow, straight)
  `<svg id="bar-3" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M17 7 L31 7 L30 41 L18 41 Z"/><path d="M17.5 14 L30.5 14"/><path d="M18 36 L30 36"/><path d="M17.8 21 Q21 20 24 21 Q27 22 30.2 21"/></svg>`,

  // 4 — Olive on a stick (cocktail pick)
  `<svg id="bar-4" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M8 40 L40 8"/><ellipse cx="22" cy="26" rx="5" ry="6.5" transform="rotate(-45 22 26)"/><circle cx="22" cy="26" r="1.4"/><path d="M40 8 L43 5 M40 8 L37 11"/></svg>`,

  // 5 — Lemon wheel (cross-section)
  `<svg id="bar-5" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="10.5"/><path d="M24 13.5 L24 34.5 M13.5 24 L34.5 24 M16.6 16.6 L31.4 31.4 M31.4 16.6 L16.6 31.4"/></svg>`,

  // 6 — Lime wedge (pie slice with rind)
  `<svg id="bar-6" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M24 7 L24 41 A17 17 0 0 0 41 24 Z"/><path d="M27 11 L27 37 A13 13 0 0 0 37 27 Z"/><path d="M24 18 L34 28 M24 18 L31 35 M24 25 L37 23"/></svg>`,

  // 7 — Cocktail cherry with stem
  `<svg id="bar-7" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M27 10 Q22 4 16 6"/><circle cx="28" cy="24" r="8"/><path d="M24 30 Q28 36 26 41"/></svg>`,

  // 8 — Ice cube (faceted)
  `<svg id="bar-8" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M12 16 L24 9 L36 16 L36 32 L24 39 L12 32 Z"/><path d="M12 16 L24 23 L36 16 M24 23 L24 39"/></svg>`,

  // 9 — Cocktail shaker (Boston)
  `<svg id="bar-9" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M18 6 L30 6 L30 12 L18 12 Z"/><path d="M17 12 L31 12 L29 41 L19 41 Z"/><path d="M19 41 L29 41"/><path d="M18 18 L30 18"/></svg>`,

  // 10 — Mint sprig (stem with leaves)
  `<svg id="bar-10" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M24 41 Q23 30 24 18 Q25 10 24 6"/><path d="M24 20 Q18 17 13 19 Q17 22 24 22"/><path d="M24 20 Q30 17 35 19 Q31 22 24 22"/><path d="M24 28 Q19 26 15 27 Q18 30 24 30"/><path d="M24 28 Q29 26 33 27 Q30 30 24 30"/><path d="M24 13 Q20 11 17 12 Q19 15 24 15"/><path d="M24 13 Q28 11 31 12 Q29 15 24 15"/></svg>`,

  // 11 — Vinyl record (grooves + label)
  `<svg id="bar-11" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="13"/><circle cx="24" cy="24" r="9"/><circle cx="24" cy="24" r="4"/><circle cx="24" cy="24" r="1"/></svg>`,

  // 12 — Matchbox (sleeve + drawer + striker)
  `<svg id="bar-12" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><rect x="6" y="17" width="36" height="16" rx="1"/><path d="M6 25 L42 25"/><path d="M9 21 L13 21 M16 21 L20 21 M23 21 L27 21 M30 21 L34 21"/><path d="M9 28 L15 28 M19 28 L25 28 M29 28 L35 28"/></svg>`,

  // 13 — Bottle opener (waiter's style: handle + crown lifter + corkscrew hint)
  `<svg id="bar-13" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M9 9 L20 20 L26 14 Q30 10 34 14 Q38 18 34 22 L28 28 L39 39"/><circle cx="20" cy="20" r="2.2"/><path d="M28 28 L26 26"/></svg>`,

  // 14 — Bitters bottle (small dasher bottle with label)
  `<svg id="bar-14" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M20 7 L28 7 L28 13 L20 13 Z"/><path d="M21 13 L27 13 L27 19 Q31 22 31 28 L31 40 Q31 42 29 42 L19 42 Q17 42 17 40 L17 28 Q17 22 21 19 Z"/><path d="M18 29 L30 29 M18 34 L30 34"/></svg>`,

  // 15 — Copper mug (Moscow mule): flared body, handle, rivets
  `<svg id="bar-15" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M13 12 L35 12 L32 40 L16 40 Z"/><path d="M35 16 Q43 17 43 24 Q43 31 35 32"/><circle cx="17" cy="17" r="0.9"/><circle cx="31" cy="17" r="0.9"/><circle cx="16.5" cy="35" r="0.9"/><circle cx="31.5" cy="35" r="0.9"/></svg>`,

  // 16 — Absinthe glass with slotted spoon
  `<svg id="bar-16" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M14 13 L34 13 Q34 24 31 28 Q31 35 30 39 L18 39 Q17 35 17 28 Q14 24 14 13 Z"/><path d="M16.5 26 L31.5 26"/><path d="M18 39 L30 39"/><path d="M9 16 L39 16"/><path d="M14 14 L14 18 M19 14 L19 18 M24 14 L24 18 M29 14 L29 18 M34 14 L34 18"/></svg>`,

  // 17 — Brandy balloon / snifter (large bowl, short stem & base)
  `<svg id="bar-17" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="24" cy="18" r="12"/><path d="M12 18 Q12 26 18 28 L18 33 M36 18 Q36 26 30 28 L30 33"/><path d="M18 33 L30 33 M14 39 L34 39"/><path d="M18 36 L30 36"/></svg>`,
];
