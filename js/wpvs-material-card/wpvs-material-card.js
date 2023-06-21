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
import templates from "./wpvs-material-card.html";

/**
 * Custom element <wpvs-material-card> to render a card with all information on
 * a downloadable material.
 *
 *     <wpvs-material-card data-type="Folien und Skript" data-name="Einführung in die Vorlesung">
 *         <material-meta data-label="Format" data-value="HTML"></material-meta>
 *         <material-meta data-label="Language" data-value="English"></material-meta>
 *         <material-meta data-label="Lizenz" data-value="CC-BY 4.0"></material-meta>
 *         <material-link data-icon="icon-globe" data-label="Online Version" data-href="https://www.wpvs.de/webprog/0-intro/einleitung/"></material-link>
 *         <material-link data-icon="icon-git" data-label="Source Code" data-href="https://github.com/DennisSchulmeister/dhbwka-wwi-webprog-folien/tree/master/static/0-intro/einleitung"></material-link>
 *     </wpvs-material-card>
 *
 * @extends CustomElement
 */
export class WpvsMaterialCardElement extends CustomElement {
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
    _render() {
        // Apply template and styles
        let cardTemplate = this.constructor.#templates.querySelector("#card-template").cloneNode(true);
        this.sRoot.replaceChildren(...cardTemplate.content.childNodes);

        let styleElement = this.constructor.#templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render header with type and name of card
        this._renderCardType();
        this._renderCardName();

        // Render meta information
        let metaTemplate = this.constructor.#templates.querySelector("#meta-template");
        let metaParentElement = this.sRoot.querySelector(".meta");

        for (let metaElement of this.querySelectorAll("material-meta")) {
            let metaChildElement = metaTemplate.content.firstElementChild.cloneNode(true);
            metaParentElement.appendChild(metaChildElement);

            metaChildElement.querySelector(".label").textContent = metaElement.dataset.label + ":";
            metaChildElement.querySelector(".value").textContent = metaElement.dataset.value;
        }

        // Render download links
        let linkTemplate = this.constructor.#templates.querySelector("#link-template");
        let linkParentElement = this.sRoot.querySelector(".links");

        for (let linkElement of this.querySelectorAll("material-link")) {
            let aElement = linkTemplate.content.firstElementChild.cloneNode(true);
            linkParentElement.appendChild(aElement);

            aElement.href = linkElement.dataset.href;
            aElement.querySelector("i").classList.add(linkElement.dataset.icon);
            aElement.querySelector(".label").textContent = linkElement.dataset.label;
        }
    }

    /**
     * Update the card type header based on the `data-type` attribute.
     */
    _renderCardType() {
        let element = this.sRoot.querySelector(".type");
        if (!element) return;
        element.textContent = this.dataset.type;
    }

    /**
     * Update the card name header based on the `data-name` attribute.
     */
    _renderCardName() {
        let element = this.sRoot.querySelector(".name");
        if (!element) return;
        element.textContent = this.dataset.name;
    }

    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
        for (let mutation of mutations) {
            switch (mutation.attributeName) {
                case "data-type":
                    this._renderCardType();
                    break;
                case "data-name":
                    this._renderCardName();
                    break;
            }
        }
    }

}

window.customElements.define("wpvs-material-card", WpvsMaterialCardElement);
