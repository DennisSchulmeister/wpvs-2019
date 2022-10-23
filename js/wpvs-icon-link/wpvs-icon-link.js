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

/**
 * Custom element <wpvs-icon-link> to insert a simple hyperlink with an icon:
 * 
 *   <wpvs-icon-link
 *     icon   = "icon-globe"
 *     label  = "Link text"
 *     href   = "URL"
 *     target = "_blank">
 *   </wpvs-icon-link>
 * 
 * This will be rendered like so:
 * 
 *   <a href="URL" target="_blank">
 *     <i class="icon-globe"></i>
 *     Link text
 *   </a>
 * 
 * @extends CustomElement
 */
export class WpvsIconLinkElement extends CustomElement {

    /**
     * Constructor as required for custom elements.
     */
    constructor() {
        super();
        this.postConstruct();
    }

    /**
     * Render link content
     */
    async _render() {
        this.sRoot.innerHTML = "";

        let aElement = document.createElement("a");
        aElement.href = this.getAttribute("href") || "";
        aElement.target = this.getAttribute("target") || "";
        this.sRoot.appendChild(aElement);

        aElement.style.display = "flex";
        aElement.style.flexDirection = "row";
        aElement.style.justifyContent = "flex-start";
        aElement.style.alignItems = "top";

        if (this.getAttribute("icon")) {
            let iElement = document.createElement("i");
            iElement.classList.add(this.getAttribute("icon"));
            aElement.appendChild(iElement);
        }

        if (this.getAttribute("label")) {
            let spanElement = document.createElement("span");
            spanElement.style.flex = "1";
            spanElement.textContent = this.getAttribute("label");
            aElement.appendChild(spanElement);
        }
    }

    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
        mutations.forEach(mutation => {
            switch (mutation.attributeName) {
                case "icon":
                case "label":
                case "href":
                case "target":
                    this._render();
                    break;
            }
        });
    }
}

window.customElements.define("wpvs-icon-link", WpvsIconLinkElement);
