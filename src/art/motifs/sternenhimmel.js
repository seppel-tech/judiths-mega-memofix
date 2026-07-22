// Sternenhimmel — 18 celestial / starry-sky line motifs.
// Card faces for one of four selectable motif sets ("Sternenhimmel").
// Conventions (every motif):
//   - single SVG string, viewBox="0 0 48 48"
//   - stroke="currentColor", stroke-width="1.25", stroke-linecap="round",
//     stroke-linejoin="round", fill="none"
//   - root <svg> id="stern-N" (N = 0..17)
//   - fine engraved / celestial-chart line art; no fills, no cartoon outlines

export const MOTIFS = [
  // 0 — Full moon: disc with quiet crater marks.
  `<svg id="stern-0" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="24" cy="24" r="14"/><circle cx="19" cy="20" r="2"/><circle cx="29" cy="28" r="2.6"/><circle cx="24" cy="14" r="1.4"/><circle cx="15" cy="27" r="1.6"/><circle cx="30" cy="19" r="1.1"/><circle cx="22" cy="31" r="1"/></svg>`,

  // 1 — 4-point sparkle: four concave petals pinched to a bright center.
  `<svg id="stern-1" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M24 5 Q26 22 43 24 Q26 26 24 43 Q22 26 5 24 Q22 22 24 5 Z"/><circle cx="24" cy="24" r="1.3"/></svg>`,

  // 2 — 5-point star: classic engraved star.
  `<svg id="stern-2" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M24 8 L27.82 18.74 L39.22 19.06 L30.18 26.01 L33.4 36.94 L24 30.5 L14.6 36.94 L17.82 26.01 L8.78 19.06 L20.18 18.74 Z"/></svg>`,

  // 3 — 6-point star: hexagram of two interlocked triangles.
  `<svg id="stern-3" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M24 7 L38.72 32.5 L9.28 32.5 Z"/><path d="M24 41 L9.28 15.5 L38.72 15.5 Z"/></svg>`,

  // 4 — 8-point star: square overlaying a diamond (compass-rose star).
  `<svg id="stern-4" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M24 6 L42 24 L24 42 L6 24 Z"/><path d="M11 11 L37 11 L37 37 L11 37 Z"/></svg>`,

  // 5 — Crescent moon: sliver opening to the right, with a companion sparkle.
  `<svg id="stern-5" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M28 9 A15 15 0 0 0 28 39 A21.5 21.5 0 0 1 28 9 Z"/><path d="M37 20 L38.2 23 L41 24 L38.2 25 L37 28 L35.8 25 L33 24 L35.8 23 Z"/></svg>`,

  // 6 — Comet: bright head with a curved, tapering dust tail.
  `<svg id="stern-6" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M31 18 Q19 25 9 37 Q25 30 35 18 Z"/><circle cx="33" cy="15" r="3.6"/><path d="M29 20 Q22 25 14 33"/><path d="M32 19 Q25 27 18 35"/></svg>`,

  // 7 — Saturn: globe with wide horizontal rings (back arc, body, front arc).
  `<svg id="stern-7" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M9 26 A16 5 0 0 1 39 26"/><circle cx="24" cy="26" r="8"/><path d="M9 26 A16 5 0 0 0 39 26"/><path d="M12.5 26 A11.5 3.4 0 0 1 35.5 26"/><path d="M12.5 26 A11.5 3.4 0 0 0 35.5 26"/></svg>`,

  // 8 — Ringed planet (Uranus-like): vertical ring + two surface bands.
  `<svg id="stern-8" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M24 8 A4.5 16 0 0 1 24 40"/><circle cx="24" cy="24" r="8.5"/><path d="M24 8 A4.5 16 0 0 0 24 40"/><path d="M16 21 L32 21"/><path d="M16 27 L32 27"/></svg>`,

  // 9 — Shooting star: small 4-point head with a straight tapered streak.
  `<svg id="stern-9" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M31 15 L11 37 L33 17 Z"/><path d="M34 8 L35.4 12.4 L40 14 L35.4 15.6 L34 20 L32.6 15.6 L28 14 L32.6 12.4 Z"/></svg>`,

  // 10 — Big Dipper (Ursa Major): handle + bowl, seven star marks.
  `<svg id="stern-10" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M7 33 L12 29 L17 26 L23 22 L32 21 L33 30 L24 30 Z"/><circle cx="7" cy="33" r="1"/><circle cx="12" cy="29" r="1"/><circle cx="17" cy="26" r="1"/><circle cx="23" cy="22" r="1.1"/><circle cx="32" cy="21" r="1.1"/><circle cx="33" cy="30" r="1.1"/><circle cx="24" cy="30" r="1.1"/></svg>`,

  // 11 — Cassiopeia: the W, five star marks on a zigzag.
  `<svg id="stern-11" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M7 33 L16 21 L22 33 L30 21 L41 33"/><circle cx="7" cy="33" r="1"/><circle cx="16" cy="21" r="1.1"/><circle cx="22" cy="33" r="1.1"/><circle cx="30" cy="21" r="1.1"/><circle cx="41" cy="33" r="1"/></svg>`,

  // 12 — Orion: shoulders, belt of three, feet, and hanging sword.
  `<svg id="stern-12" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M11 13 L33 13 M11 13 L16 26 M33 13 L29 26 M16 26 L22 26 L29 26 M16 26 L14 39 M29 26 L34 39 M14 39 L34 39 M22 26 L22 34"/><circle cx="11" cy="13" r="1.1"/><circle cx="33" cy="13" r="1.1"/><circle cx="16" cy="26" r="1"/><circle cx="22" cy="26" r="1"/><circle cx="29" cy="26" r="1"/><circle cx="14" cy="39" r="1.1"/><circle cx="34" cy="39" r="1.1"/><circle cx="22" cy="34" r="0.8"/></svg>`,

  // 13 — North Star (Polaris) within a graduated compass ring.
  `<svg id="stern-13" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="24" cy="24" r="14"/><path d="M24 5 L22 9 L24 7.5 L26 9 Z"/><path d="M24 4 L24 8 M24 40 L24 44 M4 24 L8 24 M40 24 L44 24"/><path d="M11 11 L13 13 M37 11 L35 13 M11 37 L13 35 M37 37 L35 35"/><path d="M24 14 L26.5 21.5 L34 24 L26.5 26.5 L24 34 L21.5 26.5 L14 24 L21.5 21.5 Z"/><circle cx="24" cy="24" r="1.2"/></svg>`,

  // 14 — Milky Way: a soft diagonal star-band with scattered points.
  `<svg id="stern-14" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M5 39 Q15 30 24 25 T43 12"/><path d="M5 42 Q15 34 24 29 T43 16"/><circle cx="11" cy="34" r="0.9"/><circle cx="18" cy="29" r="0.7"/><circle cx="27" cy="24" r="1.1"/><circle cx="34" cy="19" r="0.8"/><circle cx="40" cy="14" r="1"/><circle cx="15" cy="36" r="0.7"/><circle cx="31" cy="27" r="0.7"/></svg>`,

  // 15 — Constellation grid: an abstract web of linked star-points.
  `<svg id="stern-15" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M11 11 L37 11 L39 31 L26 41 L9 35 Z"/><path d="M11 11 L24 24 L37 11 M9 35 L24 24 L39 31 M18 19 L30 30"/><circle cx="11" cy="11" r="1"/><circle cx="37" cy="11" r="1"/><circle cx="39" cy="31" r="1"/><circle cx="26" cy="41" r="1"/><circle cx="9" cy="35" r="1"/><circle cx="24" cy="24" r="1.2"/><circle cx="18" cy="19" r="0.8"/><circle cx="30" cy="30" r="0.8"/></svg>`,

  // 16 — Eclipse (ring of fire): moon disc within the solar ring, corona spikes.
  `<svg id="stern-16" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="10"/><path d="M24 4 L24 8 M24 40 L24 44 M4 24 L8 24 M40 24 L44 24"/><path d="M10.5 10.5 L13 13 M37.5 10.5 L35 13 M10.5 37.5 L13 35 M37.5 37.5 L35 35"/><path d="M16 6.5 L17 9 M32 6.5 L31 9 M6.5 16 L9 17 M41.5 16 L39 17 M6.5 32 L9 31 M41.5 32 L39 31 M16 41.5 L17 39 M32 41.5 L31 39"/></svg>`,

  // 17 — Nova / supernova burst: radials of varied length around a bright core.
  `<svg id="stern-17" viewBox="0 0 48 48" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M24 24 L24 5 M24 24 L24 43 M24 24 L5 24 M24 24 L43 24 M24 24 L10 10 M24 24 L38 10 M24 24 L10 38 M24 24 L38 38 M24 24 L14 6 M24 24 L34 6 M24 24 L6 34 M24 24 L42 34 M24 24 L6 14 M24 24 L42 14 M24 24 L14 42 M24 24 L34 42"/><path d="M24 14 L26.8 21.2 L34 24 L26.8 26.8 L24 34 L21.2 26.8 L14 24 L21.2 21.2 Z"/><circle cx="24" cy="24" r="1.4"/></svg>`,
];
