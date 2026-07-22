import { LEVELS } from '../game/levels.js';
import { store } from '../core/store.js';
import { router } from '../core/router.js';
import { ornaments } from '../art/ornaments.js';

function gridPreview(cols, rows) {
  const dots = Array.from({ length: cols * rows }, () => `<span class="dot"></span>`).join('');
  return `<span class="grid-prev" style="grid-template-columns:repeat(${cols},1fr)">${dots}</span>`;
}

export function levelSelectScreen(container) {
  const stars = store.getState().progress.starsByLevel;
  container.innerHTML = `
    <main class="screen levels">
      <button class="back" id="back">←</button>
      <h2 class="h2">Stufe wählen</h2>
      <ul class="level-list">
        ${LEVELS.map(l => `
          <li class="level-card" data-level="${l.id}">
            <div class="lc-body">
              <h3>${l.name}</h3>
              <p class="meta">${l.pairs} Paare · ${(l.flipBackMs/1000).toFixed(1)} s</p>
            </div>
            ${gridPreview(l.cols, l.rows)}
            ${stars[l.id] === 3 ? `<span class="seal">${ornaments.seal()}</span>` : ''}
          </li>`).join('')}
      </ul>
    </main>`;
  container.querySelector('#back').addEventListener('click', () => router.go('start'));
  container.querySelectorAll('.level-card').forEach(el =>
    el.addEventListener('click', () => router.go('board', { level: el.dataset.level }))
  );
  return { unmount() {} };
}
