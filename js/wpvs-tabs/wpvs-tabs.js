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
 *     <wpvs-tabs data-active-tab="page1" data-mode="responsive" data-breakpoint="tablet">
 *         <tab-page data-tab-id="page1">
 *             <page-button class="…">
 *                 Text on the page switch button
 *             </page-button>
 *             <page-content>
 *                 …
 *             </page-content>
 *         </tab-page>
 *
 *         <tab-page data-tab-id="page2">
 *             …
 *         </tab-page>
 *     </wpvs-tabs>
 *
 * The attribute data-active-tab can be used to switch the tab via javascript.
 * It also always contains the currently visible tab if it is switched manually
 * by the user. Additionally a `tab-changed` event will the raised, with the
 * detail values `index` and `tabId`.
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

        this._detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");

        if (this._detectScreenSizeElement) {
            this._detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
        }
    }

    /**
     * Render shadow DOM to display the element.
     */
    _render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Apply styles
        let styleElement = this.templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render container element
        let containerElement = document.createElement("div");
        containerElement.classList.add("container");
        this.sRoot.appendChild(containerElement);

        this._updateDisplayMode();

        // Render <ul class="wpvs-button-bar"> for the button bar
        let ulElement = document.createElement("ul");
        ulElement.classList.add("button-bar");
        containerElement.appendChild(ulElement);

        // Render page buttons and content
        let index = -1;

        this.querySelectorAll("tab-page").forEach(pageElement => {
            let active = null;
            index++;

            let tabId = "";
            if (pageElement.dataset.tabId) tabId = pageElement.dataset.tabId;

            // Render <li class="button" data-index="0" data-tab-id="xxx" active> for each button
            let pageButtonElement = pageElement.querySelector("page-button");

            if (pageButtonElement) {
                let liElement = document.createElement("li");
                ulElement.appendChild(liElement);

                this.copyAttributes(pageButtonElement, liElement);
                liElement.classList.add("button");
                liElement.innerHTML = pageButtonElement.innerHTML;
                liElement.dataset.index = index;
                liElement.dataset.tabId = tabId;

                active = pageElement.getAttribute("active");
                if (active != null) liElement.setAttribute("active", active);

                liElement.addEventListener("click", event => {
                    this._switchToPage(event.target.dataset.index);
                });
            }

            // Render <div data-index="0" data-tab-id="xxx"> for each page
            let pageContentElement = pageElement.querySelector("page-content");

            if (pageContentElement) {
                let divElement = document.createElement("div");
                containerElement.appendChild(divElement);

                this.copyAttributes(pageContentElement, divElement);
                divElement.classList.add("page");
                divElement.innerHTML = pageContentElement.innerHTML;
                divElement.dataset.index = index;
                divElement.dataset.tabId = tabId;

                if (active != null) {
                    divElement.setAttribute("active", active);
                }
            }
        });

        // Switch to the first visible page
        if (this.dataset.activeTab) {
            this._switchToPageById(this.dataset.activeTab);
        }
    }

    _onAttributeChanged(mutations) {
        mutations.forEach(mutation => {
            switch (mutation.attributeName) {
                case "data-active-tab":
                    this._switchToPageById(this.dataset.activeTab);
                    break;
                case "data-mode":
                case "data-breakpoint":
                    this._updateDisplayMode();
                    break;
            }
        });
    }

    /**
     * Internal method to switch the visible page. This will update all internal
     * DOM elements as well as the <wpvs-tabs> element itself. It also throws
     * a `tab-changed` event.
     *
     * @param {Integer} index Index of the new visible page, starting with zero
     */
    _switchToPage(index) {
        // Switch active button
        this.sRoot.querySelectorAll(".button").forEach(e => e.removeAttribute("active"));
        this.sRoot.querySelectorAll(`.button[data-index="${index}"]`).forEach(e => e.setAttribute("active", ""));

        // Switch active page
        this.sRoot.querySelectorAll(".page").forEach(e => e.removeAttribute("active"));
        this.sRoot.querySelectorAll(`.page[data-index="${index}"]`).forEach(e => e.setAttribute("active", ""));

        // Update data-active-tab attribute
        let tabId = "";
        let pageDiv = this.sRoot.querySelector(`.page[data-index="${index}"]`);
        if (pageDiv && pageDiv.dataset.tabId) tabId = pageDiv.dataset.tabId;
        this.dataset.activeTab = tabId;

        // Raise tab-changed event
        let event = new CustomEvent("tab-changed", {
            detail: {
                index: index,
                tabId: tabId,
            }
        });

        this.dispatchEvent(event);
    }

    /**
     * This is a tiny wrapper around _switchToPage(index) to open a page by
     * its id instead of the index.
     *
     * @param {String} id `data-tab-id` attribute of the wanted page
     */
    _switchToPageById(id) {
        let pageDiv = this.sRoot.querySelector(`.page[data-tab-id="${id}"]`);

        if (pageDiv && pageDiv.dataset.index) {
            this._switchToPage(pageDiv.dataset.index);
        }
    }

    /**
     * Decide whether to display the page buttons horizontally or vertically.
     * This depends on the current value of the `data-mode` and `data-breakpoint`
     * attributes as described in the class documentation above.
     */
    _updateDisplayMode() {
        // Set default values for all attributes
        let containerElement = this.sRoot.querySelector(".container");
        if (!containerElement) return;

        if (!this.dataset.mode) this.dataset.mode = "responsive";
        this.dataset.mode = this.dataset.mode.toLowerCase();

        if (this.dataset.mode == "responsive" && !this._detectScreenSizeElement) {
            this.dataset.mode = "horizontal";
        }

        if (!this.dataset.breakpoint) this.dataset.breakpoint = "tablet";
        this.dataset.breakpoint = this.dataset.breakpoint.toLowerCase();

        // Determine display mode to be really used (horizontal or vertical)
        let mode = "";

        switch (this.dataset.mode) {
            case "responsive":
                if (this._detectScreenSizeElement.compareScreenSize(this.dataset.breakpoint) < 0) {
                    mode = "vertical";
                } else {
                    mode = "horizontal";
                }
                break;
            case "horizontal":
            case "vertical":
                mode = this.dataset.mode;
                break;
            default:
                mode = "horizontal";
        }

        containerElement.classList.remove("horizontal");
        containerElement.classList.remove("vertical");
        containerElement.classList.add(mode);
    }

}

window.customElements.define("wpvs-tabs", WpvsTabsElement);
