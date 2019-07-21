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
import templates from "./wpvs-header.html";

/**
 * Custom element <wpvs-header> to render the main page header. Use it like this:
 *
 *     <wpvs-header
 *         data-site-title = "Name of the website"
 *         data-page-title = "Name of the current page"
 *         data-mode       = "responsive"
 *         data-breakpoint = "tablet"
 *     >
 *         Header content, e.g. navigation bar
 *     </wpvs-header>
 *
 * The `data-mode` attribute is optional. It can have the following values:
 *
 *   * `responsive` (default): Decide upon current viewport width whether to
 *     show the page buttons horizontally or vertically.
 *
 *   * `horizontal`: Always use horizontal page buttons (best for large screens).
 *
 *   * `vertical`: Always use vertical page buttons (best for small screens).
 *
 * In order for responsive mode to work, the page must contain a
 * <wpvs-detect-screen-size> element somewhere. The `data-breakpoint` attribute
 * then sets at which screen size the page buttons will be aligned horizontally.
 * It's default value is `tablet`.
 *
 * @extends CustomElement
 */
export class WpvsHeaderElement extends CustomElement {

    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
        super();

        this.templates = document.createElement("div");
        this.templates.innerHTML = templates;

        this._detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");

        if (this._detectScreenSizeElement) {
            this._detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
        }

        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    _render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Apply template and styles
        let headerTemplate = this.templates.querySelector("#header-template").cloneNode(true);
        this.sRoot.innerHTML = headerTemplate.innerHTML;

        let styleElement = this.templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        this._renderSiteTitle();
        this._renderPageTitle();

        this.sRoot.querySelector(".content").innerHTML = this.innerHTML;

        // Adapt to current viewport size
        this._updateDisplayMode();
    }

    /**
     * Update the visible site title based on the `data-site-title` attribute.
     */
    _renderSiteTitle() {
        let element = this.sRoot.querySelector(".site-title");
        if (!element) return;
        element.textContent = this.dataset.siteTitle;
    }

    /**
     * Update the visible site title based on the `data-page-title` attribute.
     */
    _renderPageTitle() {
        let element = this.sRoot.querySelector(".page-title");
        if (!element) return;
        element.textContent = this.dataset.pageTitle;
    }

    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
        mutations.forEach(mutation => {
            switch (mutation.attributeName) {
                case "data-site-title":
                    this._renderSiteTitle();
                    break;
                case "data-page-title":
                    this._renderPageTitle();
                    break;
                case "data-mode":
                case "data-breakpoint":
                    this._updateDisplayMode();
                    break;
            }
        });
    }

    /**
     * Decide whether to display the two titles horizontally or vertically.
     * This depends on the current value of the `data-mode` and `data-breakpoint`
     * attributes as described in the class documentation above.
     */
    _updateDisplayMode() {
        let containerElement = this.sRoot.querySelector(".container");
        if (!containerElement) return;

        let mode = this.adaptToScreenSize(containerElement, this._detectScreenSizeElement);
    }

}

window.customElements.define("wpvs-header", WpvsHeaderElement);
