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
import templates from "./wpvs-info.html";

/**
 * Custom element <wpvs-info> to display a simple information box. The element
 * can be used like this:
 *
 *   <wpvs-info>
 *      This is an important information to be aware off.
 *   </wpvs-info>
 *
 * @extends CustomElement
 */
export class WpvsInfoElement extends CustomElement {

    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
        super();

        this.templates = document.createElement("div");
        this.templates.innerHTML = templates;

        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    async _render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Apply style
        let styleElement = this.templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render content
        let containerElement = document.createElement("div");
        containerElement.classList.add("container");
        containerElement.innerHTML = this.innerHTML;
        this.sRoot.appendChild(containerElement);
    }

}

window.customElements.define("wpvs-info", WpvsInfoElement);
