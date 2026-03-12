/*
 * Copyright © 2022 Dennis Schulmeister-Zimolong
 *
 * E-Mail: dhbw@windows3.de
 * Webseite: https://www.wpvs.de/
 *
 * Dieser Quellcode ist lizenziert unter einer
 * Creative Commons Namensnennung 4.0 International Lizenz.
 */

/**
 * Starting with the given element, call the given callback function first
 * for the element itself, then for each parent element, until the DOM root
 * is reached. The function receives the current element and the `data`
 * value as parameters.
 */
export function bubble(element: Node, func: (element: Node, data?: any) => void, data?: any): void {
    func(element, data);

    let current: any = element;
    while (current) {
        if ("parentNode" in current && current.parentNode) {
            current = current.parentNode;
        } else if ("host" in current && current.host) {
            current = current.host;
        } else {
            break;
        }
        
        func(current, data);
    }
}

/**
 * Starting from the given element this function queries the content of
 * the element and then bubbles up the DOM to search for similar ancestors.
 * The found elements are returned as a depth-first array.
 * 
 * This can be used by custom elements to find the nearest elements, that
 * contain a specific configuration required by the custom element.
 */
export function upwardsSearch(startElement: Element, selector: string): Element[] {
    let result: Element[] = [];

    bubble(startElement, checkedElement => {
        if (!checkedElement) return;

        if ((checkedElement as Element).children) {
            for (let childElement of (checkedElement as Element).children) {
                if (childElement.matches(selector)) {
                    result.push(childElement);
                }
            }
        }
    });


    return result;
}