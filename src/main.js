import './app.css';
import { store } from './core/store.js';
import { audio } from './core/audio.js';
import { router } from './core/router.js';
import { startScreen } from './screens/start.js';
import { levelSelectScreen } from './screens/levelselect.js';
import { boardScreen } from './screens/board.js';
import { voucherScreen } from './screens/voucher.js';
import { accountScreen } from './screens/account.js';

function applyTheme(theme) { document.documentElement.setAttribute('data-theme', theme); }
function applyAudio(snd) { audio.setEnabled(snd); }

const { settings } = store.getState();
applyTheme(settings.theme);
applyAudio(settings.sound);

router.register({
  start: startScreen,
  levelselect: levelSelectScreen,
  board: boardScreen,
  voucher: voucherScreen,
  account: accountScreen
});
router.start();
