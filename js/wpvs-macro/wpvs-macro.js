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
 * Custom element <wpvs-macro-define> to define a reusable fragment of HTML
 * code, that can be placed at different positions in the page with the
 * corresponding element <wpvs-macro-insert>.
 *
 *   <wpvs-macro-define data-name="say-hello">
 *      Hello, $username$
 *   </wpvs-macro-define>
 *
 * The macro content is treated as a string that can have variables denoted
 * by $xxx$. Normally, the variable is simply replaced by the content set
 * when inserting the macro. However, if the variable name starts with `url-`
 * the value will automatically be URL encoded. Variables are expanded in
 * a loop until the expansion doesn't change the HTML result anymore. This
 * means, that a variable can contain the name of another variable in its
 * content, and both variables will be expanded.
 * 
 * The macro can then be inserted anywhere like this:
 * 
 * <wpvs-macro-insert data-name="say-hello" username="World"></wpvs-macro-insert>
 * 
 * Note, that <wpvs-macro-insert> is a block element whose innerHTML will be
 * set based on the macro definition.
 * 
 * When inserting a macro, its definition is search by bubbling the DOM upwards.
 * This is, a recursive search is started, walking the DOM upwards, until either
 * one parent elements contains a corresponding macro definition or no definition
 * is found.
 * 
 * @extends CustomElement
 */
export class WpvsMacroDefineElement extends CustomElement {

    /**
     * Constructor as required for custom elements.
     */
    constructor() {
        super(true);
        this.postConstruct();
    }

    /**
     * Make sure, the macro definition is stored in the DOM but remains invisible.
     */
    async _render() {
        this.style.display = "none";
    }

}

/**
 * Custom element <wpvs-macro-insert>, which is the counter part of the element
 * <wpvs-macro-define>. See the class documentation there for details.
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
        let query = `wpvs-macro-define[data-name="${this.dataset.name}"]`;
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

window.customElements.define("wpvs-macro-define", WpvsMacroDefineElement);
window.customElements.define("wpvs-macro-insert", WpvsMacroInsertElement);
