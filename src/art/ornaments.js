export const ornaments = {
  guilloche() {
    return `<svg class="guilloche" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="guillo" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 Q2.5 0 5 5 T10 5" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.5"/>
          <path d="M5 0 Q10 2.5 5 5 T5 10" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#guillo)"/>
    </svg>`;
  },
  perforation({ w = 100, h = 100 } = {}) {
    return `<svg class="perf" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="3" x2="${w}" y2="3" stroke="currentColor" stroke-width="0.3" stroke-dasharray="1 1.5" opacity="0.6"/>
      <line x1="0" y1="4" x2="${w}" y2="4" stroke="currentColor" stroke-width="0.2" opacity="0.4"/>
    </svg>`;
  },
  seal() {
    return `<svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="none" stroke="#C9A05A" stroke-width="0.8"/>
      <circle cx="20" cy="20" r="14" fill="none" stroke="#C9A05A" stroke-width="0.4"/>
      <text x="20" y="17" text-anchor="middle" font-family="Playfair Display, serif" font-size="6" fill="#C9A05A">III</text>
      <path d="M12 22 a8 4 0 0 0 16 0" fill="none" stroke="#C9A05A" stroke-width="0.5"/>
      <text x="20" y="29" text-anchor="middle" font-family="Inter, sans-serif" font-size="2.5" letter-spacing="1" fill="#C9A05A">STERNE</text>
    </svg>`;
  },
  stamp() {
    return `<svg viewBox="0 0 120 120" aria-hidden="true">
      <rect x="6" y="6" width="108" height="108" fill="none" stroke="#7A2E3E" stroke-width="3" opacity="0.85"/>
      <rect x="12" y="12" width="96" height="96" fill="none" stroke="#7A2E3E" stroke-width="1.2" opacity="0.7"/>
      <text x="60" y="62" text-anchor="middle" font-family="Inter, sans-serif" font-weight="600" font-size="18" letter-spacing="3" fill="#7A2E3E" opacity="0.85" transform="rotate(-8 60 60)">EINGELÖST</text>
    </svg>`;
  }
};
