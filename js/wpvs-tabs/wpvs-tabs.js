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
import templates from "./wpvs-tabs.html";

/**
 * Custom element wpvs-tabs to render tab pages, which switch the visible
 * content based upon the active button pressed. Use the element like this:
 *
 *     <wpvs-tabs>
 *         <tab-page active>
 *             <page-button class="…">
 *                 Text on the page switch button
 *             </page-button>
 *             <page-content>
 *                 …
 *             </page-content>
 *         </tab-page>
 *
 *         <tab-page>
 *             …
 *         </tab-page>
 *     </wpvs-tabs>
 * @extends HTMLElement
 */
export class WpvsTabsElement extends CustomElement {

    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
        super();
        this.sRoot = this.attachShadow({mode: "open"});

        this.templates = document.createElement("div");
        this.templates.innerHTML = templates;
    }

    /**
     * Render shadow DOM to display the element.
     */
    render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Apply styles
        let styleElement = this.templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render <ul class="wpvs-button-bar"> for the button bar
        let ulElement = document.createElement("ul");
        ulElement.classList.add("button-bar");
        this.sRoot.appendChild(ulElement);

        // Render page buttons and content
        let index = -1;

        this.querySelectorAll("tab-page").forEach(pageElement => {
            let active = null;
            index++;

            // Render <li class="button" data-index="0" active> for each button
            let pageButtonElement = pageElement.querySelector("page-button");

            if (pageButtonElement) {
                let liElement = document.createElement("li");
                ulElement.appendChild(liElement);

                this.copyAttributes(pageButtonElement, liElement);
                liElement.classList.add("button");
                liElement.innerHTML = pageButtonElement.innerHTML;
                liElement.dataset.index = index;

                active = pageElement.getAttribute("active");
                if (active != null) liElement.setAttribute("active", active);

                liElement.addEventListener("click", event => {
                    this.switchToPage(event.target.dataset.index);
                });
            }

            // Render <div data-index="0"> for each page
            let pageContentElement = pageElement.querySelector("page-content");

            if (pageContentElement) {
                let divElement = document.createElement("div");
                this.sRoot.appendChild(divElement);

                this.copyAttributes(pageContentElement, divElement);
                divElement.classList.add("page");
                divElement.innerHTML = pageContentElement.innerHTML;
                divElement.dataset.index = index;

                if (active != null) {
                    divElement.setAttribute("active", active);
                }
            }
        });
    }


    switchToPage(index) {
        // Switch active button
        this.sRoot.querySelectorAll(".button").forEach(e => e.removeAttribute("active"));
        this.sRoot.querySelectorAll(`.button[data-index="${index}"]`).forEach(e => e.setAttribute("active", ""));

        // Switch active page
        this.sRoot.querySelectorAll(".page").forEach(e => e.removeAttribute("active"));
        this.sRoot.querySelectorAll(`.page[data-index="${index}"]`).forEach(e => e.setAttribute("active", ""));
    }

}

window.customElements.define("wpvs-tabs", WpvsTabsElement);
