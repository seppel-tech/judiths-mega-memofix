let ctx = null;
let enabled = { cards: true, success: true, stamp: true };

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone({ freq, type = 'sine', dur = 0.15, gain = 0.08, slideTo }) {
  const c = ac();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + dur + 0.02);
}

export const audio = {
  setEnabled(map) { enabled = { ...enabled, ...map }; },
  flip()    { if (enabled.cards)   tone({ freq: 440, slideTo: 620, type: 'triangle', dur: 0.08, gain: 0.05 }); },
  success() { if (enabled.success) { tone({ freq: 523, dur: 0.18, gain: 0.06 }); setTimeout(() => tone({ freq: 784, dur: 0.22, gain: 0.06 }), 90); } },
  stamp()   { if (enabled.stamp)   { tone({ freq: 180, type: 'square', dur: 0.05, gain: 0.07 }); setTimeout(() => tone({ freq: 90, type: 'sine', dur: 0.18, gain: 0.09 }), 30); } }
};
