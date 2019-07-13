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
     * registers a MutationObserver to rerender the element if its content
     * has changed.
     */
    constructor() {
        super();

        this._childMutationObserver = null;
        this._attributeMutationObserver = null;

        if (document.readyState === "complete") {
            this.render();
        } else {
            window.addEventListener("load", () => this.render());
        }
    }

    /**
     * Internal method to call the subclasses `render()` method. It makes sure
     * to disable all MutationObservers before calling `render()` and enabling
     * them again afterwards, because otherwise we would have an infinite loop.
     *
     * If a custom element wants to rerender its content it also must call this
     * method instead of render() to prevent an infinite loop.
     */
    render() {
        this._disableObservers();
        this._render();
        this._enableObservers();
    }

    /**
     * Internal callback to completely render the custom element. Needs to be
     * overwritten by the sub-classes. Never call it manually!
     */
    _render() {
    }

    /**
    * Internal method to call the subclasses `_onAttributeChanged()` method.
    * It makes sure to disable all MutationObservers before calling
    * `_onAttributeChanged()` and enabling them again afterwards, because
    * otherwise we could produce an infinite loop.
     */
    onAttributeChanged(mutations) {
        this._disableObservers();
        this._onAttributeChanged(mutations);
        this._enableObservers();
    }

    /**
     * Internal callback to be overwritten by subclasses. This allows a custom
     * element to detect, when one of its HTML attributes has changed. The
     * element might update its DOM or call the render() method if needed.
     *
     * @param {MutationRecord[]} mutations Array of all detected changes,
     *   see: https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
     */
    _onAttributeChanged(mutations) {
    }

    /**
     * Disable all mutation observers to prevent an infinite loop while modifying
     * the DOM tree. This doesn't need to be called inside the inherited `_render()`
     * method. But it can be called on other places by the subclasses to prevent
     * infinite loops.
     */
    _disableObservers() {
        if (this._childMutationObserver) this._childMutationObserver.disconnect();
        if (this._attributeMutationObserver) this._attributeMutationObserver.disconnect();
    }

    /**
     * Reenable all mutation observers again. This doesn't need to be called inside
     * the inherited `_render()` method. But it can be called on other places by
     * the subclasses where they also called `_disableObservers()` to reenable
     * them again.
     */
    _enableObservers() {
        this._disableObservers();

        // See: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
        this._childMutationObserver = new MutationObserver((mutations, observer) => this.render());
        this._childMutationObserver.observe(this, {childList: true, subtree: true, characterData: true});

        this._attributeMutationObserver = new MutationObserver((mutations, observer) => this.onAttributeChanged(mutations));
        this._attributeMutationObserver.observe(this, {attributes: true, attributeOldValue: true, subtree: false});
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
