/*
 * Copyright © 2022 Dennis Schulmeister-Zimolong
 *
 * E-Mail: dhbw@windows3.de
 * Webseite: https://www.wpvs.de/
 *
 * Dieser Quellcode ist lizenziert unter einer
 * Creative Commons Namensnennung 4.0 International Lizenz.
 */
"use strict"

import CustomElement from "../custom_element.js";
import {upwardsSearch} from "../dom_utils.js";

/**
 * Custom element `<wpvs-macro-insert>` that can be used to insert a HTML string macro
 * into the DOM. For this to work, the macro bust be defined somewhere at an outer level
 * like this. Because when the macro is inserted, its definition is searched by bubbling
 * up the DOM until a corresponding `<script>` element has been found.
 * 
 * ```html
 * <script type="text/html" data-macro="say-hello">
 *     Hello, $username$
 * </script>
 * ```
 * 
 * Since it is a script, the browser does not interpret the actual HTML content. The
 * macro can then be inserted as often as wanted with:
 * 
 * ```html
 * <wpvs-macro-insert data-name="say-hello" username="World"></wpvs-macro-insert>
 * ```
 * 
 * Variables denoted by `$xxx$` will be replaced by the value give to the same named
 * attribute of `<wpvs-macro-insert>`. If the variable name stats with `url-` its
 * value will automatically be URL encoded.
 * 
 * Note, that `<wpvs-macro-insert>` is a block element whose innerHTML will be set
 * based on the macro definition.
 * 
 * @extends CustomElement
 */
export class WpvsMacroInsertElement extends CustomElement {

    /**
     * Constructor as required for custom elements.
     */
    constructor() {
        super(true);
        this.postConstruct();
    }

    /**
     * Copy macro content to innerHTML if this element and make sure that this
     * element is treaded like a block element easier positioning.
     */
    async _render() {
        // Clear previous content
        this.innerHTML = "";

        // Find macro definition
        // let query = `wpvs-macro-define[data-name="${this.dataset.name}"]`;
        let query = `script[data-macro="${this.dataset.name}"]`;
        let macroDefinitionElements = upwardsSearch(this.parentElement, query);
        let macroDefinitionElement = undefined;

        if (macroDefinitionElements.length == 0) {
            return;
        } else {
            macroDefinitionElement = macroDefinitionElements[0];
        }

        // Place macro content in the DOM
        let innerHTML1 = macroDefinitionElement.innerHTML;
        let innerHTML2 = "";

        while (innerHTML1 !== innerHTML2) {
            innerHTML2 = innerHTML1;

            for (let attribute of this.attributes) {
                let value = attribute.value;

                if (attribute.name.startsWith("url-")) {
                    value = encodeURI(value);
                }
                
                innerHTML1 = innerHTML1.replace(`$${attribute.name}$`, value);
            }
        }

        this.style.display = "block";
        this.innerHTML = innerHTML1;
    }

}

window.customElements.define("wpvs-macro-insert", WpvsMacroInsertElement);
