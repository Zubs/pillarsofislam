// js/router.js — hash-based client-side router
import { updateSEO } from './seo.js';

export class Router {
    constructor(routes, outlet) {
        this.routes = routes;
        this.outlet = outlet;
        this.current = null;
        this._cleanup = null;
        this.afterRender = null; // optional post-render hook

        window.addEventListener('hashchange', () => this._route());
        window.addEventListener('load', () => this._route());
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

        // Match exact route or prefix
        let match = this.routes[hash];
        if (!match) {
            for (const [pattern, loader] of Object.entries(this.routes)) {
                if (hash.startsWith(pattern) && pattern !== '#/') {
                    match = loader;
                    break;
                }
            }
        }

        if (!match) {
            match = this.routes['#/'];
        }

        // ── SEO: update title, meta, canonical, JSON-LD on every navigation
        updateSEO(hash);

        // ── Cleanup previous page
        if (this._cleanup) {
            this._cleanup();
            this._cleanup = null;
        }

        // ── Fade out
        this.outlet.style.opacity = '0';
        this.outlet.style.transition = 'opacity .15s ease';
        await new Promise(r => setTimeout(r, 120));

        // ── Render new page
        const mod = await match();
        this._cleanup = mod.render(this.outlet);

        // ── Fade in
        this.outlet.style.opacity = '1';
        this.current = hash;

        // ── Update active nav items
        document.querySelectorAll('[data-route]').forEach(el => {
            const r = el.dataset.route;
            el.classList.toggle(
                'active',
                hash === r || (r !== '#/' && hash.startsWith(r))
            );
        });

        // ── Scroll to top
        window.scrollTo({top: 0, behavior: 'instant'});

        // ── Post-render hook (scroll-reveal animations etc.)
        if (typeof this.afterRender === 'function') {
            this.afterRender(hash);
        }
    }
}
