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
import style from "./wpvs-detect-screen-size.less";

/**
 * Custom element <wpvs-detect-screen-size> to use the browser's media query
 * features to detect which screen size the page is currently viewed on.
 * The following screen sizes are detected:
 *
 *   * phone
 *   * tablet
 *   * screen
 *   * hires
 *
 * All that needs to be done is to place the following element in the
 * index.html:
 *
 *   <wpvs-detect-screen-size></wpvs-detect-screen-size>
 *
 * @extends CustomElement
 */
export class WpvsDetectScreenSizeElement extends CustomElement {

    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
        super();
        // this.sRoot = this.attachShadow({mode: "open"});

        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    _render() {
        // Cannot use the shadowRoot here, as global CSS classes have no effect there!
        this.innerHTML = "";

        this.divPhone = document.createElement("div");
        this.divPhone.classList.add(style["screen-size-phone"]);
        this.appendChild(this.divPhone);

        this.divTablet = document.createElement("div");
        this.divTablet.classList.add(style["screen-size-tablet"]);
        this.appendChild(this.divTablet);

        this.divScreen = document.createElement("div");
        this.divScreen.classList.add(style["screen-size-screen"]);
        this.appendChild(this.divScreen);

        this.divHires = document.createElement("div");
        this.divHires.classList.add(style["screen-size-hires"]);
        this.appendChild(this.divHires);

        this._raiseScreenSizeChanged();
        this._prevScreenSize = this.screenSize;
        this.dataset.screenSize = this.screenSize;

        window.addEventListener("resize", event => {
            if (this.screenSize == this._prevScreenSize) return;
            this._raiseScreenSizeChanged();
            this._prevScreenSize = this.screenSize;
            this.dataset.screenSize = this.screenSize;
        });
    }

    /**
     * Getter method to retrieve the current screen size. Returns one of the
     * following strings: phone, tablet, screen, hires, unknown.
     */
    get screenSize() {
        if (window.getComputedStyle(this.divPhone).display.toLowerCase() != "none") {
            return "phone";
        } else if (getComputedStyle(this.divTablet).display.toLowerCase() != "none") {
            return "tablet";
        } else if (getComputedStyle(this.divScreen).display.toLowerCase() != "none") {
            return "screen";
        } else if (getComputedStyle(this.divHires).display.toLowerCase() != "none") {
            return "hires";
        } else {
            return "unknown";
        }
    }

    /**
     * Compares the given screen size name to the current screen size.
     *
     * @param  {String} screenSize Screen size to compare (`phone`, `tablet`, …)
     * @return {Integer} -1 if current screen size is smaller,
     *   1 if the current screen size is larger,
     *   0 otherwise (both are equal or an unknown string as given)
     */
    compareScreenSize(screenSize) {
        let ordering = ["phone", "tablet", "screen", "hires"]
        let currentIndex = ordering.indexOf(this.screenSize);
        let givenIndex = ordering.indexOf(screenSize);

        if (currentIndex < 0 || givenIndex < 0 || currentIndex == givenIndex) {
            return 0;
        } else if (currentIndex < givenIndex) {
            return -1;
        } else {
            return 1;
        }
    }

    /**
     * Internal method to raise a "screen-size-changed" custom event. The
     * event will carry the attribute "screenSize" with the current size
     * in its detail data.
     */
    _raiseScreenSizeChanged() {
        let event = new CustomEvent("screen-size-changed", {
            detail: {
                screenSize: this.screenSize,
            }
        });

        this.dispatchEvent(event);
    }

}

window.customElements.define("wpvs-detect-screen-size", WpvsDetectScreenSizeElement);
