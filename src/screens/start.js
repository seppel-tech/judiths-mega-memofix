import { store } from '../core/store.js';
import { router } from '../core/router.js';
import { haptics } from '../core/haptics.js';
import { lipIcon } from '../art/lipIcon.js';

export function startScreen(container) {
  const open = store.getState().vouchers.filter(v => v.state === 'open').length;
  container.innerHTML = `
    <main class="screen start">
      <h1 class="title">Judiths Mega Memofix</h1>
      <button class="btn btn-primary" id="play">Spielen</button>
      <p class="version">Bimmelbirnen Version 1.0</p>
      <p class="saldo">${lipIcon()} <span class="saldo-num">${open}</span></p>
    </main>`;
  container.querySelector('#play').addEventListener('click', () => { haptics.medium(); router.go('levelselect'); });
  return { unmount() {} };
}
