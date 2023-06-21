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

/**
 * Starting with the given element, call the given callback function first
 * for the element itself, then for each parent element, until the DOM root
 * is reached. The function receives the current element and the `data`
 * value as parameters.
 * 
 * @param {Element} element DOM element
 * @param {Function} func Callback function
 * @param {*} data Additional data for the callback (optional)
 */
export function bubble(element, func, data) {
    func(element, data);

    while (element) {
        if ("parentNode" in element && element.parentNode) {
            element = element.parentNode;
        } else if ("host" in element && element.host) {
            element = element.host;
        } else {
            break;
        }
        
        func(element, data);
    }
}

/**
 * Starting from the given element this function queries the content of
 * the element and then bubbles up the DOM to search for similar ancestors.
 * The found elements are returned as a depth-first array.
 * 
 * This can be used by custom elements to find the nearest elements, that
 * contain a specific configuration required by the custom element.
 * 
 * @param {*} startElement Starting element whose children a matched first
 * @param {*} selector CSS selector string to match the search nodes
 * @returns {Array} Array of all found nodes in the order they were found
 */
export function upwardsSearch(startElement, selector) {
    let result = [];

    bubble(startElement, checkedElement => {
        if (!checkedElement) return;

        for (let childElement of checkedElement.children) {
            if (childElement.matches(selector)) {
                result.push(childElement);
            }
        }
    });


    return result;
}