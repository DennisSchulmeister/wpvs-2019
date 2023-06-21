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
import templates from "./wpvs-metadata.html";

/**
 * Custom element <wpvs-metadata> to insert a block of meta data into a <wpvs-material>
 * or similar element. The meta data will be rendered as multiple fields in a row using
 * a simple flexbox layout. Example:
 * 
 *   <wpvs-metadata>
 *     <metadata-value label="Format"  value="HTML"></metadata-value>
 *     <metadata-value label="Sprache" value="Deutsch"></metadata-value>
 *     <metadata-value label="Lizenz"  value="CC-BY 4.0"></metadata-value>
 *   </wpvs-metadata>
 * 
 * @extends CustomElement
 */
export class WpvsMetadataElement extends CustomElement {
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
        // Apply template and styles
        let containerTemplate = this.constructor.#templates.querySelector("#container-template").cloneNode(true);
        this.sRoot.replaceChildren(...containerTemplate.content.childNodes);
        let containerElement = this.sRoot.querySelector(".container");

        let styleElement = this.constructor.#templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render metadata values
        let valueTemplate = this.constructor.#templates.querySelector("#value-template");

        for (let valueElement of this.querySelectorAll("metadata-value")) {
            let valueChildElement = valueTemplate.content.firstElementChild.cloneNode(true);
            containerElement.appendChild(valueChildElement);

            valueChildElement.querySelector(".label").textContent = (valueElement.getAttribute("label") || "") + ":";
            valueChildElement.querySelector(".value").textContent = valueElement.getAttribute("value") || "";
        }
    }

}

window.customElements.define("wpvs-metadata", WpvsMetadataElement);
