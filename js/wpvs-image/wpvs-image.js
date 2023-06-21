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
import templates from "./wpvs-image.html";

/**
 * Custom element <wpvs-image> for responsive images. On large screens the
 * image takes its assigned height and an automatic width according to the
 * image's aspect ratio. On small screens it takes 100% width and the height
 * according to the ratio. Use it like this:
 *
 *   <wpvs-image
 *      data-src        = "image.jpg"
 *      data-alt        = "alternative text"
 *      data-height     = "15em"
 *      data-breakpoint = "tablet"
 *   ></wpvs-image>
 *
 * The `data-breakpoint` attribute is optional and defaults to `tablet`.
 * In fact only the `data-src` attribute is really needed.
 *
 * @extends CustomElement
 */
export class WpvsImageElement extends CustomElement {
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
    async _render() {
        // Remove old content
        this.sRoot.replaceChildren();

        // Apply style
        let styleElement = this.constructor.#templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render image
        if (!this.dataset.src) return;

        let imageElement = document.createElement("img");
        imageElement.src = this.dataset.src;
        imageElement.alt = this.dataset.alt;

        if (this.dataset.height) {
            imageElement.style.height = this.dataset.height;
        }

        this.sRoot.appendChild(imageElement);

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
                case "data-breakpoint":
                    this._updateDisplayMode();
                    break;
            }
        }
    }

    /**
     * Decide how to display the image. This depends on the current value of
     * the `data-mode` and `data-breakpoint` attributes as described in the
     * class documentation above.
     */
    _updateDisplayMode() {
        let containerElement = this.sRoot.querySelector("img");
        if (!containerElement) return;

        let mode = this.adaptToScreenSize(containerElement, this.constructor.#detectScreenSizeElement);
    }

}

window.customElements.define("wpvs-image", WpvsImageElement);
