/*
 * Copyright © 2019 Dennis Schulmeister-Zimolong
 *
 * E-Mail: dhbw@windows3.de
 * Webseite: https://www.wpvs.de/
 *
 * Dieser Quellcode ist lizenziert unter einer
 * Creative Commons Namensnennung 4.0 International Lizenz.
 */

import CustomElement from "../custom_element.js";
import templates from "./wpvs-tile.html";

/**
 * Custom element <wpvs-tile> to render a launchpad-like tile to navigate
 * to another page. This is used on the start page to go to the different
 * lectures and categories.
 *
 *     <wpvs-tile data-background="url(img/iotws.jpg)" date-href="#/iotws">
 *         IoT-Workshop
 *     </wpvs-tile>
 *
 * @extends CustomElement
 */
export class WpvsTileElement extends CustomElement {
    static #templates;

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

        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    _render(): void {
        // Apply template and styles
        let cardTemplate = WpvsTileElement.#templates.querySelector("#tile-template")!.cloneNode(true) as HTMLTemplateElement;
        this.sRoot!.replaceChildren(...cardTemplate.content.childNodes);

        let styleElement = WpvsTileElement.#templates.querySelector("style")!.cloneNode(true);
        this.sRoot!.appendChild(styleElement);

        // Render card content
        let containerElement = this.sRoot!.querySelector(".container") as HTMLElement;

        if (this.dataset.background) {
            containerElement.style.backgroundImage = this.dataset.background;
        }

        let contentElement = this.sRoot!.querySelector(".content") as HTMLElement;
        if (this.childNodes.length) contentElement.replaceChildren(...this.childNodes);
        else contentElement.remove();

        if (this.dataset.href) {
            containerElement.addEventListener("click", () => {
                if (!this.dataset.href) return;
                location.href = this.dataset.href;
            });
        } else {
            containerElement.classList.add("inactive");
        }
    }

}

window.customElements.define("wpvs-tile", WpvsTileElement);
