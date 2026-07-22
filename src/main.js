import './app.css';
import { store } from './core/store.js';
import { audio } from './core/audio.js';
import { router } from './core/router.js';
import { startScreen } from './screens/start.js';
import { levelSelectScreen } from './screens/levelselect.js';
import { boardScreen } from './screens/board.js';
import { voucherScreen } from './screens/voucher.js';
import { accountScreen } from './screens/account.js';

function applySettings({ theme, sound }) {
  document.documentElement.setAttribute('data-theme', theme);
  audio.setEnabled(sound);
}

// Apply on boot, then re-apply whenever settings change (e.g. toggling a sound
// or theme in the account screen). Keeps audio/theme in sync without each
// screen having to know about the audio module.
applySettings(store.getState().settings);
store.subscribe(state => applySettings(state.settings));

router.register({
  start: startScreen,
  levelselect: levelSelectScreen,
  board: boardScreen,
  voucher: voucherScreen,
  account: accountScreen
});
router.start();
