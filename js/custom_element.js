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

        this.sRoot = this.attachShadow({mode: "open"});
    }

    /**
     * To be called by all sub-classes at the very end of the constructor to
     * start rendering the element.
     */
    postConstruct() {
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
    async render() {
        this._disableObservers();
        await this._render();

        let globalLinkElement = document.createElement("link");
        globalLinkElement.rel = "stylesheet";
        globalLinkElement.href = "global.css";
        this.sRoot.appendChild(globalLinkElement);

        let fontelloLinkElement = document.createElement("link");
        fontelloLinkElement.rel = "stylesheet";
        fontelloLinkElement.href = "fontello/css/fontello.css";
        this.sRoot.appendChild(fontelloLinkElement);

        this._enableObservers();
    }

    /**
     * Internal callback to completely render the custom element. Needs to be
     * overwritten by the sub-classes. Never call it manually!
     */
    async _render() {
    }

    /**
     * Internal method to call the subclasses `_onAttributeChanged()` method.
     * It makes sure to disable all MutationObservers before calling
     * `_onAttributeChanged()` and enabling them again afterwards, because
     * otherwise we could produce an infinite loop.
     *
     * @param {MutationRecord[]} mutations Array of all detected changes,
     *   see: https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
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
     * Utility method to copy all HTML attributes of the src element over
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

    /**
     * Utility method to be called by sub-classes to adapt to the current
     * screen size. The way this works is to use a <wpvs-detect-screen-size>
     * element, that must already be present on the page, to query the current
     * screen type and to switch between two display modes base on whether the
     * size is lower or greater-than-equal a given break point size. The chosen
     * display mode is then set as a CSS class to the given container element.
     *
     * The config object takes the following properties, which are all optional:
     *
     * +-------------------+--------------+------------------------------------+
     * | PROPERTY          | DEFAULT      | DESCRIPTION                        |
     * +-------------------+--------------+------------------------------------+
     * | defaultBreakpoint | "tablet"     | The minimum screen size needed to  |
     * |                   |              | to apply the `aboveMode` CSS class |
     * +-------------------+--------------+------------------------------------+
     * | defaultMode       | "responsive" | The default mode to assume, when   |
     * |                   |              | the element's `data-mode`          |
     * |                   |              | attribute is not set.              |
     * +-------------------+--------------+------------------------------------+
     * | responsiveMode    | "responsive" | The `data-mode` attribute value    |
     * |                   |              | which allows the element to choose |
     * |                   |              | it's display mode itself based on  |
     * |                   |              | current viewport size.             |
     * +-------------------+--------------+------------------------------------+
     * | belowMode         | "vertical"   | The CSS class to apply, when the   |
     * |                   |              | viewport size is below the break   |
     * |                   |              | point.                             |
     * +-------------------+--------------+------------------------------------+
     * | aboveMode         | "horizontal" | The CSS class to apply, when the   |
     * |                   |              | viewport size is equal to or       |
     * |                   |              | greater than the break point.      |
     * +-------------------+--------------+------------------------------------+
     *
     * The default is to allow for `data-mode` the following values
     *
     *  * "responsive" (default)
     *  * "vertical" (small screens)
     *  * "horizontal" (large screens)
     *
     * and to switch to large display for screen class "tablet" and above.
     *
     * @param {HTMLElement} containerElement
     * HTML element to apply the detected CSS classes to.
     *
     * @param {HTMLElement} detectScreenSizeElement
     * Already existing element <wpvs-detect-screen-size> to be queried for the
     * viewport size.
     *
     * @param {Object} config
     * Configuration object, see above
     *
     * @return {String}
     * The chosen display mode
     */
     adaptToScreenSize(containerElement, detectScreenSizeElement, config) {
        // Read configuration
        if (!containerElement) return;
        if (!config) config = {};

        let defaultBreakpoint = config.defaultBreakpoint ? config.defaultBreakpoint : "tablet";
        let defaultMode = config.defaultMode ? config.defaultMode : "responsive";
        let responsiveMode = config.responsiveMode ? config.responsiveMode : "responsive";
        let belowMode = config.belowMode ? config.belowMode : "vertical";
        let aboveMode = config.aboveMode ? config.aboveMode : "horizontal";

        // Apply defaults
        if (!this.dataset.mode) this.dataset.mode = defaultMode;
        this.dataset.mode = this.dataset.mode.toLowerCase();

        if (this.dataset.mode == responsiveMode && !detectScreenSizeElement) {
            this.dataset.mode = aboveMode;
        }

        if (!this.dataset.breakpoint) this.dataset.breakpoint = defaultBreakpoint;
        this.dataset.breakpoint = this.dataset.breakpoint.toLowerCase();

        // Determine display mode to be used
        let displayMode = "";

        switch (this.dataset.mode) {
            case responsiveMode:
                if (detectScreenSizeElement.compareScreenSize(this.dataset.breakpoint) < 0) {
                    displayMode = belowMode;
                } else {
                    displayMode = aboveMode;
                }
                break;
            case aboveMode:
            case belowMode:
                displayMode = this.dataset.mode;
                break;
            default:
                displayMode = aboveMode;
        }

        containerElement.classList.remove(aboveMode);
        containerElement.classList.remove(belowMode);
        containerElement.classList.add(displayMode);

        return displayMode
    }

}

export default CustomElement;
