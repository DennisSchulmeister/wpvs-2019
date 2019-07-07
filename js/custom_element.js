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

/**
 * Abstract base class for customer HTML elements. Instead of the built-in
 * HTMLElement class, this extended version offers automatic rerendering,
 * when the DOM content inside the element changes.
 *
 * @extends HTMLElement
 */
class CustomElement extends HTMLElement {

    /**
     * Constructor as required for custom elements. This makes sure that the
     * element will only be rendered once the document has finished loading.
     * Because otherwise rendering will most likely start too soon. It also
     * registers a MutationObserver to rerender the element if its contant
     * has changed.
     */
    constructor() {
        super();

        this.mutationObserver = new MutationObserver(() => this._rerenderContent);
        this.mutationObserver.observe(this, {attributes: true, childList: true, subtree: true});

        if (document.readyState === "complete") {
            this.render();
        } else {
            window.addEventListener("load", () => this.render());
        }
    }

    /**
     * Internal callback to completely (re)render the custom element.
     * Needs to be overwritten by the sub-classes.
     */
    render() {
    }

    /**
     * Utility function to copy all HTML attributes of the src element over
     * to the dst element. To be called by the sub-classes, when needed.
     *
     * @param {HTMLElement} src Source element
     * @param {HTMLElement} dst Destination element
     */
    copyAttributes(src, dst) {
        for (let i = 0; i < src.attributes.length; i++) {
            let item = src.attributes[i];
            dst.setAttribute(item.name, item.value);
        }
    }

}

export default CustomElement;
