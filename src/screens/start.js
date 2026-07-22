import { store } from '../core/store.js';
import { router } from '../core/router.js';
import { lipIcon } from '../art/lipIcon.js';

export function startScreen(container) {
  const open = store.getState().vouchers.filter(v => v.state === 'open').length;
  container.innerHTML = `
    <main class="screen start">
      <h1 class="title">Mémoire</h1>
      <p class="tagline">Ein Spiel. Eine Währung, die nicht verfällt.</p>
      <button class="btn btn-primary" id="play">Spielen</button>
      <p class="saldo">${lipIcon()} <span class="saldo-num">${open}</span></p>
    </main>`;
  container.querySelector('#play').addEventListener('click', () => router.go('levelselect'));
  return { unmount() {} };
}
