/*
 * Copyright © 2022 Dennis Schulmeister-Zimolong
 *
 * E-Mail: dhbw@windows3.de
 * Webseite: https://www.wpvs.de/
 *
 * Dieser Quellcode ist lizenziert unter einer
 * Creative Commons Namensnennung 4.0 International Lizenz.
 */
"use strict"

import CustomElement from "../custom_element.js";
import templates from "./wpvs-material.html";

/**
 * Newer and more compact custom element <wpvs-material> to insert a downloadable
 * lecture material into the page. This will initially be rendered as link with a
 * circled icon, which reveals its HTML content as a card when clicked. Example:
 * 
 *   <wpvs-material icon="icon-book" name="Gesamtes Lehrbuch">
 *      HTML Content
 *   </wpvs-material>
 * 
 * This should be preferred over the older <wpvs-material-card> due to its cleaner
 * and more compact appearance.
 * 
 * @extends CustomElement
 */
export class WpvsMaterialElement extends CustomElement {
    static #templates;

    static {
        this.#templates = document.createElement("div");
        this.#templates.innerHTML = templates;
    }

    /**
     * Constructor as required for custom elements. Also parses the HTML templates.
     */
    constructor() {
        super();

        this.postConstruct();
    }

    /**
     * Render link content
     */
    async _render() {
        // Remove old content
        this.sRoot.replaceChildren();

        // Apply template and styles
        let containerTemplate = this.constructor.#templates.querySelector("#container-template").cloneNode(true);
        this.sRoot.innerHTML = containerTemplate.innerHTML;
        let containerElement = this.sRoot.querySelector(".container");

        let styleElement = this.constructor.#templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render content
        this._renderHeader();

        let bodyElement = containerElement.querySelector(".body");
        bodyElement.replaceChildren(...this.childNodes);

        // Add click event listener
        let headerElement = containerElement.querySelector(".header");

        headerElement.addEventListener("click", () => {
            if (containerElement.classList.contains("expanded")) {
                containerElement.classList.remove("expanded");
            } else {
                containerElement.classList.add("expanded");
            }
        })
    }

    /**
     * Update the card header based on the `icon` and `name` attributes.
     */
    _renderHeader() {
        let headerElement = this.sRoot.querySelector(".container > .header");
        if (!headerElement) return;
        
        headerElement.querySelector("i").className = this.getAttribute("icon") || "";
        headerElement.querySelector(".name").textContent = this.getAttribute("name") || "";
    }

    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
        for (let mutation of mutations) {
            switch (mutation.attributeName) {
                case "icon":
                case "name":
                    this._renderHeader();
                    break;
            }
        }
    }
}

window.customElements.define("wpvs-material", WpvsMaterialElement);
