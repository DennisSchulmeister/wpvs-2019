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
import templates from "./wpvs-columns.html";

/**
 * Custom element <wpvs-columns> which can break up long texts into a
 * multi-column layout similar to a newspaper. On small screens only
 * one column is used. On larger screens the number of columns can be
 * set via data attributes, but defaults to three.
 *
 *     <wpvs-columns data-mode="responsive" data-breakpoint="tablet" data-columns="3">
 *         …
 *     </wpvs-columns>
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
export class WpvsColumnsElement extends CustomElement {
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

        // Apply style
        let styleElement = this.constructor.#templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render container
        this.containerElement = document.createElement("container");
        this.containerElement.classList.add("container");
        this.containerElement.append(...this.childNodes);
        this.sRoot.appendChild(this.containerElement);

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
                case "data-columns":
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

        let columns = this.dataset.columns || 3;
        let mode = this.adaptToScreenSize(containerElement, this.constructor.#detectScreenSizeElement);

        if (mode != "horizontal") {
            columns = 1;
        }

        this.containerElement.style.columnCount = columns;
    }

}

window.customElements.define("wpvs-columns", WpvsColumnsElement);
