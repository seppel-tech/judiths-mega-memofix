let routes = {};
let current = null;
let container = null;

function parse() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [name, qs] = hash.split('?');
  const params = Object.fromEntries(new URLSearchParams(qs || ''));
  return { name: name || 'start', params };
}

function render() {
  if (current?.unmount) current.unmount();
  container.innerHTML = '';
  const { name, params } = parse();
  const route = routes[name] || routes.start;
  current = route(container, params);
}

export const router = {
  register(map) { routes = map; },
  start() {
    container = document.getElementById('app');
    window.addEventListener('hashchange', render);
    if (!location.hash) {
      // Setting the hash fires an async hashchange that will call render().
      // Do NOT also render synchronously here, or the first screen mounts twice.
      location.hash = '#/start';
    } else {
      render();
    }
  },
  go(name, params = {}) {
    const qs = new URLSearchParams(params).toString();
    location.hash = `#/${name}${qs ? '?' + qs : ''}`;
  }
};
