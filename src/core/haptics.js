export const haptics = {
  light(ms = 12)   { if (navigator.vibrate) navigator.vibrate(ms); },
  medium(ms = 25)  { if (navigator.vibrate) navigator.vibrate(ms); },
  heavy(ms = 45)   { if (navigator.vibrate) navigator.vibrate(ms); }
};
