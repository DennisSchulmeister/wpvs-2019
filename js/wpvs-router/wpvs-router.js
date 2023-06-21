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

import Navigo from "navigo/lib/navigo.js";
import CustomElement from "../custom_element.js";

/**
 * Custom element <wpvs-router> to integrate the Navigo single page router.
 * This is just a bare-bones implementation with just the very few features
 * needed by this side. Namely to change the page content upon navigation to
 * another url. For this the router works with HTML templates like so:
 *
 *   <wpvs-router>
 *       <script type="text/html" data-route="/webdev">
 *           <wpvs-page data-src="webdev.html" data-title="…"></wpvs-page>
 *       </script>
 *       <script type="text/html" data-route="/distsys">
 *           <wpvs-page data-src="distsys.html" data-title="…"></wpvs-page>
 *       </script>
 *   </wpvs-router>
 *
 * The charm of the <script> elements here is that the browser doesn't interpret
 * their content. Therefor the <wpvs-page> elements will only be instantiated
 * when they are picked up by the router to be placed on the site. For the router
 * to know, when to use which template, the URL pattern given in `data-route`
 * will be used. This can be any valid pattern that is understood by Navigo.
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
        this._router = null;
        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    _render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Initialize single page router
        if (this._router) this._router.pause(true);
        this._router = new Navigo(null, true, "#");

        // Add routes
        this.querySelectorAll("script").forEach(scriptElement => {
            if (scriptElement.dataset.route) {
                this._router.on(scriptElement.dataset.route, () => {
                    this.sRoot.innerHTML = scriptElement.innerHTML;
                });
            } else {
                this._router.notFound(() => {
                    this.sRoot.innerHTML = scriptElement.innerHTML;
                });
            }
        });

        this._router.hooks({
            // before, after, leave, already
            after: () => {
                // Activate <a data-navigo> links on the newly loaded page
                this._router.updatePageLinks();

                // Raise event to inform the outside world of the new page
                let event = new CustomEvent("route-changed", {
                    detail: {
                        route: this._router.lastRouteResolved(),
                        sRoot: this.sRoot,
                    }
                });

                this.dispatchEvent(event);
            },
        });

        // Resolve first route
        this._router.resolve();
    }

}

window.customElements.define("wpvs-router", WpvsRouterElement);
