let routes = {};
let current = null;
let container = null;

function parse() {
  // History-API routing. Path like "/board" with params in the query string.
  // Falls back to any legacy "#/board?level=3" hash so old shared links resolve.
  let name = location.pathname.replace(/^\/+/, '').split('/')[0];
  let search = location.search;

  if (!name && location.hash) {
    const hash = location.hash.replace(/^#\/?/, '');
    const [hName, hQs] = hash.split('?');
    name = hName;
    search = hQs ? '?' + hQs : '';
  }

  const params = Object.fromEntries(new URLSearchParams(search));
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
    window.addEventListener('popstate', render);
    // Normalize a legacy hash URL (e.g. "#/start") to a clean path once.
    if (location.hash) {
      const { name, params } = parse();
      const qs = new URLSearchParams(params).toString();
      history.replaceState({}, '', `/${name}${qs ? '?' + qs : ''}`);
    } else if (location.pathname === '/' || location.pathname === '') {
      history.replaceState({}, '', '/start');
    }
    render();
  },
  go(name, params = {}) {
    const qs = new URLSearchParams(params).toString();
    history.pushState({}, '', `/${name}${qs ? '?' + qs : ''}`);
    render();
  }
};
