import { loadAll, saveSlice, defaultState } from './persistence.js';
import { issueVoucher } from '../game/engine.js';

let state = hydrate();
const listeners = new Set();

function hydrate() {
  const loaded = loadAll();
  return {
    settings: loaded.settings,
    progress: loaded.progress,
    vouchers: loaded.vouchers.items,
    serial: loaded.serial
  };
}

function emit() { for (const fn of listeners) fn(state); }

export const store = {
  getState: () => state,
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  updateSettings(patch) {
    state = { ...state, settings: { ...state.settings, ...patch } };
    saveSlice('settings', state.settings);
    emit();
  },

  recordStars(levelId, stars) {
    const prev = state.progress.starsByLevel[levelId] || 0;
    if (stars <= prev) return;
    const starsByLevel = { ...state.progress.starsByLevel, [levelId]: stars };
    state = { ...state, progress: { ...state.progress, starsByLevel } };
    saveSlice('progress', state.progress);
    emit();
  },

  takeNextSerial() {
    const nextSerial = state.serial.nextSerial;
    state = { ...state, serial: { ...state.serial, nextSerial: nextSerial + 1 } };
    saveSlice('serial', state.serial);
    return nextSerial;
  },

  issueNextVoucher({ levelId, stars }) {
    const serial = this.takeNextSerial();
    const voucher = issueVoucher({ serial, levelId, stars });
    state = { ...state, vouchers: [voucher, ...state.vouchers] };
    saveSlice('vouchers', { items: state.vouchers, schemaVersion: 1 });
    emit();
    return voucher;
  },

  redeemVoucher(id, note) {
    const now = new Date().toISOString();
    const vouchers = state.vouchers.map(v =>
      v.id === id ? { ...v, state: 'redeemed', redeemedAt: now, note: note ?? null } : v
    );
    state = { ...state, vouchers };
    saveSlice('vouchers', { items: vouchers, schemaVersion: 1 });
    emit();
  }
};
