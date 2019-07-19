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
 *         <material-meta data-label="Lizense" data-value="CC-BY 4.0"></material-meta>
 *         <material-link data-icon="icon-globe" data-label="Online Version" data-href="https://www.wpvs.de/webprog/0-intro/einleitung/"></material-link>
 *         <material-link data-icon="icon-git" data-label="Source Code" data-href="https://github.com/DennisSchulmeister/dhbwka-wwi-webprog-folien/tree/master/static/0-intro/einleitung"></material-link>
 *     </wpvs-material-card>
 *
 * @extends CustomElement
 */
export class WpvsMaterialCardElement extends CustomElement {

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
    _render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Apply template and styles
        let cardTemplate = this.templates.querySelector("#card-template").cloneNode(true);
        this.sRoot.innerHTML = cardTemplate.innerHTML;

        let styleElement = this.templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render header with type and name of card
        this._renderCardType();
        this._renderCardName();

        // Render meta information
        let metaTemplate = this.templates.querySelector("#meta-template");
        let metaParentElement = this.sRoot.querySelector(".meta");

        this.querySelectorAll("material-meta").forEach(metaElement => {
            let metaChildElement = metaTemplate.content.firstElementChild.cloneNode(true);
            metaParentElement.appendChild(metaChildElement);

            metaChildElement.querySelector(".label").textContent = metaElement.dataset.label + ":";
            metaChildElement.querySelector(".value").textContent = metaElement.dataset.value;
        });

        // Render download links
        let linkTemplate = this.templates.querySelector("#link-template");
        let linkParentElement = this.sRoot.querySelector(".links");

        this.querySelectorAll("material-link").forEach(linkElement => {
            let aElement = linkTemplate.content.firstElementChild.cloneNode(true);
            linkParentElement.appendChild(aElement);

            aElement.href = linkElement.dataset.href;
            aElement.querySelector("i").classList.add(linkElement.dataset.icon);
            aElement.querySelector(".label").textContent = linkElement.dataset.label;
        });
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
        mutations.forEach(mutation => {
            switch (mutation.attributeName) {
                case "data-type":
                    this._renderCardType();
                    break;
                case "data-name":
                    this._renderCardName();
                    break;
            }
        });
    }

}

window.customElements.define("wpvs-material-card", WpvsMaterialCardElement);
