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
import templates from "./wpvs-nav-bar.html";

/**
 * Custom element <wpvs-nav-bar> to render a simple navigation bar for the
 * site header.
 *
 *     <wpvs-nav-bar data-mode="responsive" data-breakpoint="tablet">
 *         <a href="…">…</a>
 *         <a href="…">…</a>
 *         <a href="…">…</a>
 *     </wpvs-nav-bar>
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
export class WpvsNavBarElement extends CustomElement {
    static #templates;
    static #detectScreenSizeElement;

    static {
        this.#templates = document.createElement("div");
        this.#templates.innerHTML = templates;
    }

    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
        super();

        if (!this.constructor.#detectScreenSizeElement) {
            this.constructor.#detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");
        }
        
        if (this.constructor.#detectScreenSizeElement) {
            this.constructor.#detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
        }

        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    _render() {
        // Remove old content
        this.sRoot.replaceChildren();

        // Apply template and styles
        let headerTemplate = this.constructor.#templates.querySelector("template").cloneNode(true);
        this.sRoot.replaceChildren(...headerTemplate.content.childNodes);

        let styleElement = this.constructor.#templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render navigation list items
        let ulElement = this.sRoot.querySelector("ul");

        for (let i = 0; i < this.children.length; i++) {
            let liElement = document.createElement("li");
            liElement.appendChild(this.children[i].cloneNode(true));
            ulElement.appendChild(liElement);
        }

        // Adapt to current viewport size
        this._updateDisplayMode();
    }

    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
        for (let mutation of mutations) {
            switch (mutation.attributeName) {
                case "data-mode":
                case "data-breakpoint":
                    this._updateDisplayMode();
                    break;
            }
        }
    }

    /**
     * Decide whether to display the two titles horizontally or vertically.
     * This depends on the current value of the `data-mode` and `data-breakpoint`
     * attributes as described in the class documentation above.
     */
    _updateDisplayMode() {
        let containerElement = this.sRoot.querySelector(".container");
        if (!containerElement) return;

        let mode = this.adaptToScreenSize(containerElement, this.constructor.#detectScreenSizeElement);
    }

}

window.customElements.define("wpvs-nav-bar", WpvsNavBarElement);
