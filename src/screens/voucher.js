import { store } from '../core/store.js';
import { router } from '../core/router.js';
import { audio } from '../core/audio.js';
import { haptics } from '../core/haptics.js';
import { prefersReduced } from '../core/motion.js';
import { ornaments } from '../art/ornaments.js';

export function voucherScreen(container, params) {
  const v = store.getState().vouchers.find(x => x.id === params.v);
  if (!v) { router.go('account'); return { unmount() {} }; }
  const reduced = prefersReduced();
  const date = new Date(v.issuedAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const cls = ['ticket', v.category, v.isMilestone ? 'milestone' : ''].join(' ');

  container.innerHTML = `
    <main class="screen voucher-screen">
      <article class="${cls}">
        <div class="guilloche-bg">${ornaments.guilloche()}</div>
        <header class="ticket-top">
          <span class="brand">Judiths Mega Memofix</span>
          <span class="serial">Nr. ${v.serial}</span>
        </header>
        <div class="ticket-body">
          <p class="label">1 Punkt</p>
          <div class="stars">${'★'.repeat(v.stars)}${'☆'.repeat(3 - v.stars)}</div>
          <p class="meta">Datum: ${date}</p>
          <p class="meta">Stufe: ${v.levelName}</p>
        </div>
        <div class="perf">${ornaments.perforation({ w: 100, h: 6 })}</div>
        ${v.isMilestone ? `<span class="seal">${ornaments.seal()}</span>` : ''}
      </article>
      <div class="actions">
        <button class="btn btn-primary" id="again">Weiter spielen</button>
        <button class="btn" id="account">Konto</button>
      </div>
    </main>`;

  const ticket = container.querySelector('.ticket');
  ticket.classList.add(reduced ? 'reveal-static' : 'reveal');
  audio.success(); haptics.medium();

  container.querySelector('#again').addEventListener('click', () => router.go('board', { level: v.level }));
  container.querySelector('#account').addEventListener('click', () => router.go('account'));
  return { unmount() {} };
}
