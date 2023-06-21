/*
 * Copyright © 2019 Dennis Schulmeister-Zimolong
 *
 * E-Mail: dhbw@windows3.de
 * Webseite: https://www.wpvs.de/
 *
 * Dieser Quellcode ist lizenziert unter einer
 * Creative Commons Namensnennung 4.0 International Lizenz.
 */
"use strict"

import CustomElement from "../custom_element.js";

/**
 * Custom element <wpvs-router> with a plan and simple single page router.
 * This is just a bare-bones implementation with just the very few features
 * needed by this side. Namely to change the page content upon navigation to
 * another URL. For this the router works with HTML templates like so:
 *
 *   <wpvs-router>
 *       <script type="text/html" data-route="/webprog">
 *           <wpvs-page data-src="webprog.html" data-title="…"></wpvs-page>
 *       </script>
 *       <script type="text/html" data-route="/vertsys">
 *           <wpvs-page data-src="vertsys.html" data-title="…"></wpvs-page>
 *       </script>
 *   </wpvs-router>
 *
 * The charm of the <script> elements here is that the browser doesn't interpret
 * their content. Therefor the <wpvs-page> elements will only be instantiated
 * when they are picked up by the router to be placed on the site. For the router
 * to know, when to use which template, the URL pattern given in `data-route`
 * will be used verbatim (no regular expressions, though that would be trivial
 * to implement ...).
 *
 * @extends CustomElement
 */
export class WpvsRouterElement extends CustomElement {

    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
        super();
        this._routes = [];
        this._fallback = undefined;
        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    _render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Add routes
        this.querySelectorAll("script").forEach(scriptElement => {
            let callback = (url) => {
                // Show content
                this.sRoot.innerHTML = scriptElement.innerHTML;

                // Raise event to inform the outside world of the new page
                let event = new CustomEvent("route-changed", { detail: { route: url, sRoot: this.sRoot } });
                this.dispatchEvent(event);
            };

            if (scriptElement.dataset.route) {
                this._routes.push({ url: scriptElement.dataset.route, show: callback });
            } else if (scriptElement.dataset.routeFallback) {
                this._fallback = callback;
            }
        });

        // Enable routing
        window.addEventListener("hashchange", () => this._handleRouting());
        this._handleRouting();
    }

    /**
     * The actual single page router. Analyzes the URL hash tag to find a route and then
     * calls the corresponding callback function. Can you believe it? A full SPA router
     * in six lines with no external dependencies. Want regular expressions? Just change
     * three lines. Look, young folks: That's how you pull it off! :-)
     */
    _handleRouting() {
        let url = location.hash.slice(1);
        if (url.length === 0) url = "/";

        let route = this._routes.find(p => p.url === url);

        if (route) route.show(url);
        else if (this._fallback) this._fallback(url);
        else if (!this._fallback) console.error(`No route found for URL '${url}'`);
    }
}

window.customElements.define("wpvs-router", WpvsRouterElement);
