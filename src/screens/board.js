import { createGame, flipCard, resolveNoMatch, maybeReshuffle, computeStars } from '../game/engine.js';
import { store } from '../core/store.js';
import { router } from '../core/router.js';
import { audio } from '../core/audio.js';
import { haptics } from '../core/haptics.js';
import { prefersReduced } from '../core/motion.js';
import { getMotifSet } from '../art/motifs/index.js';

export function boardScreen(container, params) {
  const levelId = Number(params.level) || 1;
  const motifSetName = store.getState().settings.motifSet;
  const motifs = getMotifSet(motifSetName);
  // CRITICAL FIX: pass motif INDICES (0..17) into createGame, not the SVG strings.
  // engine.createGame stores card.motif = motifIds[i] verbatim, so card.motif is
  // then a number and we render motifs[card.motif] directly — no indexOf lookup.
  const motifIndices = motifs.map((_, i) => i);
  let game = createGame(levelId, motifIndices);

  let paused = false;
  const reduced = prefersReduced();
  const showTime = store.getState().settings.showTime;
  const startedAt = Date.now();

  // Every timer/interval is registered here so unmount can clear them all.
  // This matters because the "Noch eine Runde" loop remounts board repeatedly;
  // a leaked no-match timeout or win-delay timer would stack across rounds.
  const timers = new Set();
  function track(id) { timers.add(id); return id; }

  document.documentElement.dataset.level = String(levelId);

  render();
  if (showTime) startClock();

  function render() {
    const lvl = game.level;
    container.innerHTML = `
      <main class="screen board">
        <header class="board-head">
          <button class="back" id="back" aria-label="Zurück">←</button>
          <span class="lvl-name">${lvl.name}</span>
          <span class="moves">Zug ${game.moves}</span>
          ${showTime ? `<span class="time" id="time">0:00</span>` : ''}
          <button class="pause" id="pause" aria-label="Pause">II</button>
        </header>
        <div class="grid" id="grid" style="grid-template-columns:repeat(${lvl.cols},1fr)"></div>
      </main>`;
    const grid = container.querySelector('#grid');
    const ordered = [...game.cards].sort((a, b) => a.position - b.position);
    for (const card of ordered) {
      const cell = document.createElement('button');
      cell.className = 'card' + (card.matched ? ' matched' : '') + (card.faceUp ? ' face-up' : '');
      cell.dataset.id = card.id;
      cell.style.order = card.position;
      cell.setAttribute('aria-label', `Karte ${card.position + 1}`);
      cell.innerHTML = `<div class="card-inner">
        <div class="face back">${cardBackOrnament()}</div>
        <div class="face front">${motifs[card.motif]}</div>
      </div>`;
      cell.addEventListener('click', () => onFlip(card.id));
      grid.appendChild(cell);
    }
    container.querySelector('#back').addEventListener('click', () => router.go('levelselect'));
    container.querySelector('#pause').addEventListener('click', togglePause);
  }

  function cardBackOrnament() {
    return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.5"><path d="M6 24 Q12 12 24 24 T42 24 M6 30 Q12 18 24 30 T42 30 M6 18 Q12 6 24 18 T42 18"/></svg>`;
  }

  function onFlip(cardId) {
    if (paused) return;
    // Ignore taps on cards that can't meaningfully flip — saves a wasted sound
    // and avoids relying on the engine's 'flip' no-op event.
    const current = game.cards.find(c => c.id === cardId);
    if (!current || current.faceUp || current.matched) return;

    const res = flipCard(game, cardId);
    game = res.game;

    if (res.event === 'locked') return;

    // flip / match / nomatch / win all change at least one card face.
    audio.flip();
    haptics.light();
    rerenderCards();
    updateMovesLabel();

    if (res.event === 'match' || res.event === 'win') {
      audio.success();
      haptics.medium();
      // maybeReshuffle only triggers for level 5 (reshuffleEvery: 6), at
      // multiples of 6 matched pairs, while a pair count remains. On win it
      // short-circuits inside the engine.
      const resh = maybeReshuffle(game);
      if (resh.reshuffled) {
        game = resh.game;
        track(setTimeout(rerenderCards, reduced ? 0 : 450));
      }
    }

    if (res.event === 'win') {
      const stars = computeStars(game.moves, game.level.pairs);
      store.recordStars(levelId, stars);
      const voucher = store.issueNextVoucher({ levelId, stars });
      track(setTimeout(() => router.go('voucher', { v: voucher.id }), reduced ? 200 : 900));
      return;
    }

    if (res.event === 'nomatch') {
      track(setTimeout(() => {
        game = resolveNoMatch(game);
        rerenderCards();
      }, game.level.flipBackMs));
    }
  }

  function rerenderCards() {
    const grid = container.querySelector('#grid');
    if (!grid) return;
    const byId = new Map(game.cards.map(c => [c.id, c]));
    grid.querySelectorAll('.card').forEach(el => {
      const c = byId.get(el.dataset.id);
      if (!c) return;
      el.style.order = c.position;
      el.classList.toggle('face-up', c.faceUp);
      el.classList.toggle('matched', c.matched);
    });
  }

  function updateMovesLabel() {
    const moves = container.querySelector('.moves');
    if (moves) moves.textContent = `Zug ${game.moves}`;
  }

  function togglePause() {
    paused = !paused;
    if (paused) {
      const ov = document.createElement('div');
      ov.className = 'pause-overlay';
      ov.innerHTML = `<div class="pause-card"><h3>Pausiert</h3><button class="btn btn-primary" id="resume">Weiter</button></div>`;
      container.appendChild(ov);
      container.querySelector('#resume').addEventListener('click', togglePause);
    } else {
      container.querySelector('.pause-overlay')?.remove();
    }
  }

  function startClock() {
    const id = setInterval(() => {
      const t = container.querySelector('#time');
      if (!t) return;
      const s = Math.floor((Date.now() - startedAt) / 1000);
      t.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    }, 500);
    track(id);
  }

  return {
    unmount() {
      for (const id of timers) {
        clearTimeout(id);
        clearInterval(id);
      }
      timers.clear();
      container.querySelector('.pause-overlay')?.remove();
      delete document.documentElement.dataset.level;
    }
  };
}
