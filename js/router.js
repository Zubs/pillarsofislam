// js/router.js — hash-based client-side router

export class Router {
  constructor(routes, outlet) {
    this.routes  = routes;   // { '#/path': () => import('./pages/X.js') }
    this.outlet  = outlet;   // HTMLElement to render pages into
    this.current = null;
    this._cleanup = null;

    window.addEventListener('hashchange', () => this._route());
    window.addEventListener('load',       () => this._route());
  }

  navigate(hash) {
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      this._route();
    }
  }

  async _route() {
    const hash = window.location.hash || '#/';
    let match = this.routes[hash];

    // Prefix match for nested routes
    if (!match) {
      for (const [pattern, loader] of Object.entries(this.routes)) {
        if (hash.startsWith(pattern) && pattern !== '#/') {
          match = loader;
          break;
        }
      }
    }

    if (!match) match = this.routes['#/'];

    // Cleanup previous page
    if (this._cleanup) { this._cleanup(); this._cleanup = null; }

    // Fade out
    this.outlet.style.opacity = '0';
    this.outlet.style.transition = 'opacity .15s ease';

    await new Promise(r => setTimeout(r, 120));

    const mod = await match();
    this._cleanup = mod.render(this.outlet);

    // Fade in
    this.outlet.style.opacity = '1';
    this.current = hash;

    // Update active nav
    document.querySelectorAll('[data-route]').forEach(el => {
      const r = el.dataset.route;
      el.classList.toggle('active', hash === r || (r !== '#/' && hash.startsWith(r)));
    });

    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
