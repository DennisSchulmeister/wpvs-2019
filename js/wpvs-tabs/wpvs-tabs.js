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
 * Custom element <wpvs-tabs> to render tab pages, which switch the visible
 * content based upon the active button pressed. Use the element like this:
 *
 *     <wpvs-tabs data-active-tab="page1" data-mode="responsive" data-breakpoint="tablet">
 *         <!-- Short form -->
 *         <tab-page data-tab-id="page2" data-title="Title">
 *             … direct HTML content ...
 *         </tab-page>
 * 
 *         <!-- Long form -->
 *         <tab-page data-tab-id="page1">
 *             <page-button class="…">
 *                 Text on the page switch button
 *             </page-button>
 *             <page-content>
 *                 …
 *             </page-content>
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
 * @extends CustomElement
 */
export class WpvsTabsElement extends CustomElement {
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
    _render() {
        // Remove old content
        this.sRoot.replaceChildren();

        // Apply styles
        let styleElement = this.constructor.#templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render container element
        let containerElement = document.createElement("div");
        containerElement.classList.add("container");
        this.sRoot.appendChild(containerElement);

        // Render <div class="dropdown"> to open the menu in vertical mode
        let dropdownParentElement = document.createElement("div");
        dropdownParentElement.classList.add("dropdown");
        containerElement.appendChild(dropdownParentElement);

        let dropdownTitleElement = document.createElement("div");
        dropdownTitleElement.classList.add("active-tab-title");
        dropdownParentElement.appendChild(dropdownTitleElement);

        let dropdownArrowElement = document.createElement("div");
        dropdownArrowElement.classList.add("arrow");
        dropdownArrowElement.classList.add("icon-down-open");
        dropdownParentElement.appendChild(dropdownArrowElement);

        // Render <ul class="button-bar"> for the button bar (horizontal mode)
        // or menu list (vertical mode)
        let divElement = document.createElement("div");
        divElement.classList.add("button-bar-outer");
        containerElement.appendChild(divElement);

        let ulElement = document.createElement("ul");
        ulElement.classList.add("button-bar");
        divElement.appendChild(ulElement);

        dropdownParentElement.addEventListener("click", () => {
            dropdownArrowElement.classList.remove("icon-down-open");
            dropdownArrowElement.classList.remove("icon-up-open");

            if (ulElement.classList.contains("closed")) {
                ulElement.classList.remove("closed");
                dropdownArrowElement.classList.add("icon-up-open");
            } else {
                ulElement.classList.add("closed");
                dropdownArrowElement.classList.add("icon-down-open");
            }
        });

        // Render page buttons and content
        let index = -1;

        for (let pageElement of this.querySelectorAll("tab-page")) {
            let active = null;
            index++;

            let tabId = pageElement.dataset.tabId || "";
            let pageTitle = pageElement.dataset.title || "";

            // Render <li class="tab-button" data-index="0" data-tab-id="xxx"> for each button
            let liElement = document.createElement("li");
            ulElement.appendChild(liElement);

            liElement.classList.add("tab-button");
            liElement.textContent = pageTitle;
            liElement.dataset.index = index;
            liElement.dataset.tabId = tabId;

            active = pageElement.getAttribute("active");
            if (active != null) liElement.setAttribute("active", active);

            liElement.addEventListener("click", event => {
                this._switchToPage(event.target.dataset.index);
            });

            // Render <div data-index="0" data-tab-id="xxx"> for each page
            let divElement = document.createElement("div");            
            divElement.classList.add("page");
            divElement.dataset.index = index;
            divElement.dataset.tabId = tabId;
            divElement.append(...pageElement.childNodes);
            containerElement.appendChild(divElement);

            if (active != null) {
                divElement.setAttribute("active", active);
            }

            // Adapt to initial viewport size
            this._updateDisplayMode();
        }

        // Switch to the first visible page
        if (this.dataset.activeTab) {
            this._switchToPageById(this.dataset.activeTab);
        }
    }

    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
        for (let mutation of mutations) {
            switch (mutation.attributeName) {
                case "data-active-tab":
                    this._switchToPageById(this.dataset.activeTab);
                    break;
                case "data-mode":
                case "data-breakpoint":
                    this._updateDisplayMode();
                    break;
            }
        }
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
        this.sRoot.querySelectorAll(".tab-button").forEach(e => e.removeAttribute("active"));
        this.sRoot.querySelectorAll(`.tab-button[data-index="${index}"]`).forEach(e => e.setAttribute("active", ""));

        // Switch active page
        this.sRoot.querySelectorAll(".page").forEach(e => e.removeAttribute("active"));
        this.sRoot.querySelectorAll(`.page[data-index="${index}"]`).forEach(e => e.setAttribute("active", ""));

        // Update data-active-tab attribute
        let tabId = "";
        let pageDiv = this.sRoot.querySelector(`.page[data-index="${index}"]`);
        if (pageDiv && pageDiv.dataset.tabId) tabId = pageDiv.dataset.tabId;
        this.dataset.activeTab = tabId;

        // Update dropdown label for vertical mode and close the menu
        let buttonElement = this.sRoot.querySelector(`.tab-button[data-index="${index}"]`);

        if (buttonElement) {
            this.sRoot.querySelectorAll(".active-tab-title").forEach(e => e.innerHTML = buttonElement.innerHTML);
        }

        let buttonBarElement = this.sRoot.querySelector(".button-bar");
        if (buttonBarElement) buttonBarElement.classList.add("closed");

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
        // Choose display mode depending on viewport size
        let containerElement = this.sRoot.querySelector(".container");
        if (!containerElement) return;

        let mode = this.adaptToScreenSize(containerElement, this.constructor.#detectScreenSizeElement);

        // Hide page menu by default in vertical mode
        let buttonBarElement = this.sRoot.querySelector(".button-bar");

        if (buttonBarElement) {
            if (mode == "horizontal") {
                buttonBarElement.classList.remove("closed");
            } else {
                buttonBarElement.classList.add("closed");
            }
        }
    }

}

window.customElements.define("wpvs-tabs", WpvsTabsElement);
