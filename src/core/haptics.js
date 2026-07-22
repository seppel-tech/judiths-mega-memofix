// Cross-platform haptics.
//
// - Android / Chrome: navigator.vibrate supports arbitrary millisecond
//   patterns, so we use it directly.
// - iOS Safari (>= 17.4): navigator.vibrate is NOT supported, but toggling a
//   Safari-only <input type="checkbox" switch> fires the Taptic Engine. We keep
//   one hidden switch around and "click" it to emit a tick. Multi-part patterns
//   are approximated by emitting several spaced-out ticks.
// - Everything is best-effort: if neither path is available it silently no-ops.

let enabled = true;
let iosSwitch = null;

const canVibrate =
  typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

function ensureIosSwitch() {
  if (iosSwitch || typeof document === 'undefined' || !document.body) return iosSwitch;
  const label = document.createElement('label');
  label.setAttribute('aria-hidden', 'true');
  label.style.cssText =
    'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.setAttribute('switch', ''); // Safari-only switch control
  label.appendChild(input);
  document.body.appendChild(label);
  iosSwitch = label;
  return iosSwitch;
}

function iosTick() {
  const el = ensureIosSwitch();
  if (el) el.click(); // toggling the switch triggers the system haptic
}

// pattern: number | number[] passed straight to navigator.vibrate.
// iosTicks: how many spaced ticks to emit on the iOS fallback path.
function buzz(pattern, iosTicks = 1) {
  if (!enabled) return;
  if (canVibrate) {
    try { navigator.vibrate(pattern); } catch { /* ignore */ }
    return;
  }
  for (let i = 0; i < iosTicks; i++) {
    setTimeout(iosTick, i * 90);
  }
}

export const haptics = {
  setEnabled(v) { enabled = !!v; },

  // Create the hidden iOS switch ahead of time (call inside a user gesture) so
  // the very first real tick is not swallowed while the element mounts.
  prime() { ensureIosSwitch(); },

  light()   { buzz(10, 1); },       // card flip, taps
  medium()  { buzz(22, 1); },       // confirmations
  heavy()   { buzz(45, 1); },       // stamp / strong action
  success() { buzz([16, 45, 28], 2); },        // matched pair
  error()   { buzz([26, 55, 26], 2); },        // wrong pair
  win()     { buzz([18, 40, 18, 40, 70], 3); } // level cleared
};
