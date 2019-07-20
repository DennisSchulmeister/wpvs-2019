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
 * Custom element <wpvs-page> to embed the content of an external html file
 * into the website. This is used in conjunction with with <wpvs-router> for
 * navigation on the site. A <wpvs-page> is defined like this:
 *
 *   <wpvs-page data-src="webdev.html" data-title="Web Development"></wpvs-page>
 *
 *  The <body> element may also contain a data-title attribute whose content
 *  will be concatenated to the final page title:
 *
 *    <body data-title="My Site">
 *        <wpvs-page data-src="…" data-title="Page"></wpvs-page>
 *    </body>
 *
 *  This will lead to the following window title:
 *
 *    Page | My Site
 *
 * @extends CustomElement
 */
export class WpvsPageElement extends CustomElement {

    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
        super();
        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    async _render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Fetch page and render its content
        if (this.dataset.src) {
            let pageContent = await fetch(this.dataset.src);
            this.sRoot.innerHTML = await pageContent.text();
        }
    }

    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
        this.render();
    }

}

window.customElements.define("wpvs-page", WpvsPageElement);
