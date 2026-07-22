// Paris motif set — 18 fine line illustrations for the "Mémoire" memory game.
// Conventions applied to every motif:
//   - SVG string, viewBox="0 0 48 48"
//   - stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
//     stroke-linejoin="round" fill="none"
//   - root <svg> id="paris-N" (0-based)
//   - engraved / etched line-art feel; no fills, no cartoon outlines

export const MOTIFS = [
  // 0 — Eiffel tower
  `<svg id="paris-0" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M24 4 L24 9"/>
    <path d="M22 9 L26 9"/>
    <path d="M22.5 9 L19 42"/>
    <path d="M25.5 9 L29 42"/>
    <path d="M15 42 C17 32 20 23 24 17"/>
    <path d="M24 17 C28 23 31 32 33 42"/>
    <path d="M20 17 L28 17"/>
    <path d="M18 24 L30 24"/>
    <path d="M16 32 L32 32"/>
    <path d="M19 38 Q24 34.5 29 38"/>
  </svg>`,

  // 1 — Croissant
  `<svg id="paris-1" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M13 30 C7 20 14 12 26 12 C34 12 40 17 39 24"/>
    <path d="M13 30 C17 26 21 20 26 19 C33 19 38 22 39 24"/>
    <path d="M13 30 Q10.5 31.5 12 33.7"/>
    <path d="M39 24 Q41.5 25.7 40 27.8"/>
    <path d="M18 26 C21 22 24 20 26 19"/>
    <path d="M23 28 C26 25 29 22 31 21"/>
    <path d="M28 29 C31 27 34 25 35 24"/>
  </svg>`,

  // 2 — Café table (round bistro)
  `<svg id="paris-2" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M9 17 Q24 13.5 39 17 Q24 20.5 9 17 Z"/>
    <path d="M9 17 Q24 18.8 39 17"/>
    <path d="M24 20 L24 37"/>
    <path d="M15 37 Q24 35.3 33 37 Q24 38.7 15 37 Z"/>
  </svg>`,

  // 3 — Vespa scooter
  `<svg id="paris-3" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="11" cy="35" r="4.5"/>
    <circle cx="37" cy="35" r="4.5"/>
    <circle cx="11" cy="35" r="1"/>
    <circle cx="37" cy="35" r="1"/>
    <path d="M15.5 34 L32.5 34"/>
    <path d="M15 33 C13.5 28 16 24 20 24 L27 24 C30 24 31 26 31 29 L31 33"/>
    <path d="M19 24 L27 24"/>
    <path d="M31 30 C33 29 34 27 34 24"/>
    <path d="M34 24 C35 20 37 16 38 13"/>
    <path d="M37 13 L42 15"/>
    <path d="M41 14 Q43 15 42 17"/>
  </svg>`,

  // 4 — Baguette
  `<svg id="paris-4" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M10 34 C8 30 13 26 18 23 C26 18 34 13 39 12 C42 11.5 42.5 14 40.5 16 C34 20 25 26 16 31 C11 33 9 34.5 10 34 Z"/>
    <path d="M14 30 L16 28"/>
    <path d="M19 26 L21 24"/>
    <path d="M24 22 L26 20"/>
    <path d="M29 19 L31 17"/>
    <path d="M34 16 L36 14"/>
  </svg>`,

  // 5 — Béret (beret)
  `<svg id="paris-5" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M8 27 Q24 18 40 27 Q40 31.5 24 31.5 Q8 31.5 8 27 Z"/>
    <path d="M8 27 Q24 22 40 27"/>
    <path d="M9 31 Q24 33.5 39 31"/>
    <path d="M26 23 L27 20"/>
    <circle cx="27.3" cy="19.4" r="0.9"/>
  </svg>`,

  // 6 — Wine bottle
  `<svg id="paris-6" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M21 7 L21 14 C19 15 18 17 18 19 L18 39 C18 40.5 19 41.5 20.5 41.5 L27.5 41.5 C29 41.5 30 40.5 30 39 L30 19 C30 17 29 15 27 14 L27 7 Z"/>
    <path d="M21 7 L27 7"/>
    <path d="M21 10.5 L27 10.5"/>
    <path d="M18 28 L30 28"/>
    <path d="M18 34 L30 34"/>
  </svg>`,

  // 7 — Metro sign (Metropolitain)
  `<svg id="paris-7" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M11 42 L11 19"/>
    <path d="M37 42 L37 19"/>
    <path d="M11 19 C11 12 16 9 24 9 C32 9 37 12 37 19"/>
    <path d="M14 16.5 L34 16.5"/>
    <path d="M11 19 Q8 19.3 8 21.5"/>
    <path d="M37 19 Q40 19.3 40 21.5"/>
    <circle cx="11" cy="21.5" r="1.4"/>
    <circle cx="37" cy="21.5" r="1.4"/>
  </svg>`,

  // 8 — Bouquin (bookstall)
  `<svg id="paris-8" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M8 33 L40 33"/>
    <path d="M9 33 L8 41"/>
    <path d="M40 33 L41 41"/>
    <path d="M11 36.5 L37 36.5"/>
    <path d="M11 33 V25 h2.5 V33"/>
    <path d="M15 33 V23 h2.2 V33"/>
    <path d="M18.5 33 V26 h1.8 V33"/>
    <path d="M22 33 V22 h2.5 V33"/>
    <path d="M25.5 33 V24 h2 V33"/>
    <path d="M28.5 33 V23 h2.2 V33"/>
    <path d="M32 33 V25 h2 V33"/>
    <path d="M35 33 V24.5 h1.8 V33"/>
  </svg>`,

  // 9 — Street lantern
  `<svg id="paris-9" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M24 17 L24 42"/>
    <path d="M18 42 L30 42"/>
    <path d="M19 17 L29 17 L29 25 L24 29 L19 25 Z"/>
    <path d="M24 17 L24 12"/>
    <circle cx="24" cy="11" r="1.3"/>
    <path d="M24 17 L24 29"/>
    <path d="M19 21 L29 21"/>
    <path d="M21 29 L27 29"/>
  </svg>`,

  // 10 — Arc de Triomphe outline
  `<svg id="paris-10" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M6 42 L42 42"/>
    <path d="M10 42 L10 15 L38 15 L38 42"/>
    <path d="M15 15 L15 11 L33 11 L33 15"/>
    <path d="M17 42 L17 23 Q24 16 31 23 L31 42"/>
    <path d="M10 21 L38 21"/>
    <path d="M10 31 L17 31"/>
    <path d="M31 31 L38 31"/>
  </svg>`,

  // 11 — Coffee cup (espresso / demitasse)
  `<svg id="paris-11" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M11 35 Q24 38 37 35 Q24 32.5 11 35 Z"/>
    <path d="M17.5 22 Q24 19.5 30.5 22 L29 30 Q24 32 19 30 Z"/>
    <path d="M17.5 22 Q24 19.5 30.5 22"/>
    <path d="M19.5 22 Q24 20.8 28.5 22"/>
    <path d="M30 24 Q34 24.5 34 27.5 Q34 30.5 30 30"/>
    <path d="M21 18 Q19 15 21 12 Q23 9 21 6.5"/>
    <path d="M27 18 Q25 15.5 27 13 Q29 10.5 27 8"/>
  </svg>`,

  // 12 — Macaron
  `<svg id="paris-12" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M9 19 C9 12 15 11 24 11 C33 11 39 12 39 19"/>
    <path d="M9 19 Q12 21 15 19.5 Q18 21 21 19.5 Q24 21 27 19.5 Q30 21 33 19.5 Q36 21 39 19"/>
    <path d="M12 22 L36 22"/>
    <path d="M12 23.2 L36 23.2"/>
    <path d="M9 25 Q12 23.5 15 25 Q18 23.5 21 25 Q24 23.5 27 25 Q30 23.5 33 25 Q36 23.5 39 25"/>
    <path d="M9 25 C9 32 15 34 24 34 C33 34 39 32 39 25"/>
  </svg>`,

  // 13 — Café awning
  `<svg id="paris-13" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M4 14.5 L44 14.5"/>
    <path d="M5 16 L5 21"/>
    <path d="M5 21 Q8.8 25 12.6 21 Q16.4 25 20.2 21 Q24 25 27.8 21 Q31.6 25 35.4 21 Q39.2 25 43 21"/>
    <path d="M43 21 L43 16"/>
    <path d="M5 16 L43 16"/>
    <path d="M8.8 16 L8.8 24"/>
    <path d="M16.4 16 L16.4 24"/>
    <path d="M24 16 L24 24"/>
    <path d="M31.6 16 L31.6 24"/>
    <path d="M39.2 16 L39.2 24"/>
  </svg>`,

  // 14 — Postcard
  `<svg id="paris-14" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M7 12 L41 12 L41 36 L7 36 Z"/>
    <path d="M22 12 L22 36"/>
    <path d="M34 15 L39 15 L39 20 L34 20 Z"/>
    <path d="M34.3 16.2 L38.7 18.8"/>
    <path d="M24 19 L32 19"/>
    <path d="M24 23 L38 23"/>
    <path d="M24 27 L38 27"/>
    <path d="M24 31 L34 31"/>
    <path d="M9 16 L20 16"/>
    <path d="M9 20 L20 20"/>
    <path d="M9 24 L20 24"/>
    <path d="M9 28 L20 28"/>
    <path d="M9 32 L18 32"/>
  </svg>`,

  // 15 — Bicycle
  `<svg id="paris-15" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="11" cy="34" r="5"/>
    <circle cx="37" cy="34" r="5"/>
    <path d="M11 29 L11 39"/>
    <path d="M37 29 L37 39"/>
    <circle cx="11" cy="34" r="0.9"/>
    <circle cx="37" cy="34" r="0.9"/>
    <path d="M22 34 L20 25"/>
    <path d="M20 25 L33 26"/>
    <path d="M22 34 L33 26"/>
    <path d="M22 34 L11 34"/>
    <path d="M20 25 L11 34"/>
    <path d="M33 26 L37 34"/>
    <path d="M33 26 L34 22"/>
    <path d="M32 22 L36 23"/>
    <path d="M17.5 24.2 Q20 23.2 22.5 24"/>
    <circle cx="22" cy="34" r="1"/>
    <path d="M22 34 L24 36.5"/>
  </svg>`,

  // 16 — Accordion
  `<svg id="paris-16" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M5 17 L14 17 L14 33 L5 33 Z"/>
    <path d="M7 17 L7 33"/>
    <path d="M9 17 L9 33"/>
    <path d="M11 17 L11 33"/>
    <path d="M14 17 L30 17"/>
    <path d="M14 33 L30 33"/>
    <path d="M14 18 L17 32 L20 18 L23 32 L26 18 L29 32"/>
    <path d="M14 32 L17 18 L20 32 L23 18 L26 32 L29 18"/>
    <path d="M30 17 L42 17 L42 33 L30 33 Z"/>
    <circle cx="33" cy="21" r="0.8"/>
    <circle cx="36" cy="21" r="0.8"/>
    <circle cx="39" cy="21" r="0.8"/>
    <circle cx="33" cy="25" r="0.8"/>
    <circle cx="36" cy="25" r="0.8"/>
    <circle cx="39" cy="25" r="0.8"/>
    <circle cx="33" cy="29" r="0.8"/>
    <circle cx="36" cy="29" r="0.8"/>
    <circle cx="39" cy="29" r="0.8"/>
  </svg>`,

  // 17 — Baguette basket
  `<svg id="paris-17" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M13 27 Q24 24 35 27 Q24 30 13 27 Z"/>
    <path d="M14 27 L16 41 L32 41 L34 27"/>
    <path d="M14.5 30.5 L33.5 30.5"/>
    <path d="M15.3 34.5 L32.7 34.5"/>
    <path d="M16 38.5 L32 38.5"/>
    <path d="M18 27 L18 30.5"/>
    <path d="M22 27 L22 30.5"/>
    <path d="M26 27 L26 30.5"/>
    <path d="M30 27 L30 30.5"/>
    <path d="M19 31 L19 34.5"/>
    <path d="M24 31 L24 34.5"/>
    <path d="M29 31 L29 34.5"/>
    <path d="M16 26 L13 13 Q12.7 11.3 14 10.8 Q15.3 11 15.6 12.8 L18 26 Z"/>
    <path d="M13.8 15 L15.3 13.8"/>
    <path d="M23 25 L22 11 Q21.8 9.3 23 8.8 Q24.3 9 24.5 10.8 L25 25 Z"/>
    <path d="M22.3 14 L23.7 13"/>
    <path d="M29 26 L33 14 Q33.5 12.3 35 12 Q36 13.5 35.3 15 L31 26 Z"/>
    <path d="M33.5 16 L34.8 15"/>
  </svg>`,
];
