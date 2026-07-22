import { store } from '../core/store.js';
import { router } from '../core/router.js';
import { audio } from '../core/audio.js';
import { haptics } from '../core/haptics.js';
import { ornaments } from '../art/ornaments.js';
import { lipIcon } from '../art/lipIcon.js';
import { MOTIF_SETS } from '../art/motifs/index.js';

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function accountScreen(container) {
  render();
  function render() {
    const s = store.getState();
    const open = s.vouchers.filter(v => v.state === 'open');
    const redeemed = s.vouchers.filter(v => v.state === 'redeemed');
    container.innerHTML = `
      <main class="screen account">
        <header class="acct-head">
          <button class="back" id="back">←</button>
          <h2 class="h2">Konto</h2>
        </header>
        <p class="big-saldo">${lipIcon()} ×${open.length}</p>
        <section class="list"><h3 class="list-title">Offen</h3>${voucherList(open, true)}</section>
        <section class="list"><h3 class="list-title">Verbraucht</h3>${voucherList(redeemed, false)}</section>
        <section class="settings">
          <h3 class="list-title">Einstellungen</h3>
          ${settingsHtml(s.settings)}
        </section>
      </main>`;

    container.querySelector('#back').addEventListener('click', () => router.go('start'));
    container.querySelectorAll('[data-redeem]').forEach(b =>
      b.addEventListener('click', () => confirmRedeem(b.dataset.redeem))
    );
    bindSettings(container, s.settings);
  }

  function voucherList(list, canRedeem) {
    if (!list.length) return `<p class="empty">Keine Einträge.</p>`;
    return `<ul class="vouchers">${list.map(v => `
      <li class="v-row ${v.category} ${v.isMilestone ? 'milestone' : ''}">
        <span class="v-num">Nr. ${v.serial}</span>
        <span class="v-meta">${v.levelName} · ${'★'.repeat(v.stars)}</span>
        ${v.state === 'redeemed' && v.redeemedAt ? `<span class="v-date">${fmt(v.redeemedAt)}</span>` : ''}
        ${v.state === 'redeemed' && v.note ? `<span class="v-note">${escapeAttr(v.note)}</span>` : ''}
        ${canRedeem ? `<button class="btn redeem" data-redeem="${v.id}">Verbrauchen</button>` : ''}
      </li>`).join('')}</ul>`;
  }

  function confirmRedeem(id) {
    const v = store.getState().vouchers.find(x => x.id === id);
    if (!v) return;
    const ov = document.createElement('div');
    ov.className = 'modal-overlay';
    ov.innerHTML = `<div class="modal">
      <h3>Nr. ${v.serial} verbrauchen?</h3>
      <div class="modal-actions">
        <button class="btn" id="cancel">Abbrechen</button>
        <button class="btn btn-primary" id="ok">Bestätigen</button>
      </div>
    </div>`;
    container.appendChild(ov);
    ov.querySelector('#cancel').addEventListener('click', () => ov.remove());
    ov.querySelector('#ok').addEventListener('click', () => {
      ov.remove();
      doStamp(v);
    });
  }

  function doStamp(v) {
    const overlay = document.createElement('div');
    overlay.className = 'stamp-overlay';
    overlay.innerHTML = `<div class="stamp-target">
      <div class="ticket mini ${v.category}"><span class="serial">Nr. ${v.serial}</span></div>
      <div class="stamp-anim">${ornaments.stamp()}</div>
      <textarea class="note" maxlength="100" placeholder="Notiz (optional)"></textarea>
      <div class="note-count"><span id="nc">0</span>/100</div>
      <button class="btn btn-primary" id="finalize">OK</button>
    </div>`;
    container.appendChild(overlay);
    audio.stamp(); haptics.heavy();
    overlay.querySelector('.note').addEventListener('input', e => {
      overlay.querySelector('#nc').textContent = e.target.value.length;
    });
    overlay.querySelector('#finalize').addEventListener('click', () => {
      const note = overlay.querySelector('.note').value.trim() || null;
      store.redeemVoucher(v.id, note);
      overlay.remove();
      render();
    });
  }

  return { unmount() {} };
}

function fmt(iso) { return new Date(iso).toLocaleDateString('de-DE'); }

function settingsHtml(s) {
  const toggle = (key, on) => `<label class="switch"><input type="checkbox" data-snd="${key}" ${on ? 'checked' : ''}/><span>${key}</span></label>`;
  return `
    <div class="set-row"><span>Theme</span>
      <div class="seg"><button data-theme="rose" class="${s.theme==='rose'?'active':''}">Rosé</button><button data-theme="nuit" class="${s.theme==='nuit'?'active':''}">Nuit</button></div>
    </div>
    <div class="set-row"><span>Motive</span>
      <select data-motif>${Object.keys(MOTIF_SETS).map(k => `<option value="${k}" ${s.motifSet===k?'selected':''}>${k}</option>`).join('')}</select>
    </div>
    <div class="set-row"><span>Sound</span><div class="toggles">${toggle('cards',s.sound.cards)}${toggle('success',s.sound.success)}${toggle('stamp',s.sound.stamp)}</div></div>
    <div class="set-row"><span>Zeitanzeige</span><label class="switch"><input type="checkbox" data-time ${s.showTime?'checked':''}/><span>anzeigen</span></label></div>
    <div class="set-row"><span>Name</span><input type="text" data-name value="${escapeAttr(s.name)}" maxlength="24"/></div>
  `;
}

function bindSettings(container, s) {
  container.querySelectorAll('[data-theme]').forEach(b => b.addEventListener('click', () => {
    store.updateSettings({ theme: b.dataset.theme });
    document.documentElement.setAttribute('data-theme', b.dataset.theme);
  }));
  container.querySelector('[data-motif]').addEventListener('change', e => store.updateSettings({ motifSet: e.target.value }));
  container.querySelectorAll('[data-snd]').forEach(cb => cb.addEventListener('change', () => {
    const sound = { cards: s.sound.cards, success: s.sound.success, stamp: s.sound.stamp };
    container.querySelectorAll('[data-snd]').forEach(x => sound[x.dataset.snd] = x.checked);
    store.updateSettings({ sound });
  }));
  container.querySelector('[data-time]').addEventListener('change', e => store.updateSettings({ showTime: e.target.checked }));
  container.querySelector('[data-name]').addEventListener('change', e => store.updateSettings({ name: e.target.value.slice(0,24) }));
}
