/*
 * lecture-slides.js (https://www.buzzlms.de)
 * © 2017  Dennis Schulmeister-Zimolong <dennis@pingu-mail.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 */

import utils from "./utils.js";

/**
 * This is a simple utility class which allows to define a simple kind of
 * one-way data-binding for variables and object attributes. Whenever the
 * observable value changes all bound observers will be called. Observers
 * in that regard can be:
 *
 *   * Plain functions, called like func(newValue, oldValue)
 *   * DOM elements whose innerHTML will be updated (with or without HTML escaping)
 *   * jQuery collections whose val() method will be called
 *   * jQuery collections whose html() method will be called
 */
interface Binding {
    type: string;
    object: any;
    escape?: boolean;
}

class ObservableValue {
    _value: any;
    _bindings: Binding[];
    _validators: ((newValue: any, oldValue: any) => boolean)[];

    /**
     * The constructor.
     * @param value Initial value
     */
    constructor(value: any) {
        this._value = value;
        this._bindings = [];
        this._validators = [];
    }

    /**
     * Get the current value.
     */
    get value(): any {
        return this._value;
    }

    /**
     * Set a new value and call all observers.
     */
    set value(newValue: any) {
        let oldValue = this._value;

        if (!this._callValidators(newValue, oldValue)) return;
        this._value = newValue;
        this._callObservers(newValue, oldValue);
    }

    /**
     * This triggers a refresh by calling all bound observers again.
     */
    refresh() {
        this._callObservers(this._value, this._value);
    }

    /**
     * Add a validator function which will be called before the actual
     * update occurs. This function, which will be given the new and the
     * old value, must return true, if the update is allowed or false, if
     * the update is not allowed.
     *
     *   func(newValue, oldValue) --> true on success
     *
     * @param func Validator function, must return true on success
     */
    addValidator(func: (newValue: any, oldValue: any) => boolean): void {
        this._validators.push(func);
    }

    removeValidator(func: (newValue: any, oldValue: any) => boolean): void {
        this._validators = this._validators.filter(v => v != func);
    }

    /**
     * Bind a function to be called when the value changes. The function will
     * be called with the new and the old value, like this:
     *
     *   func(newValue, oldValue);
     *
     * @param func Function to be called
     */
    bindFunction(func: (newValue: any, oldValue: any) => void): void {
        this._bindings.push({
            type: "function",
            object: func,
        });
    }

    /**
     * Unbind a function again.
     * @param func Bound function
     */
    unbindFunction(func: (newValue: any, oldValue: any) => void): void {
        this._unbind("function", func);
    }

    /**
     * Bind a DOM element to be updated when the value changes. The update
     * will be done by setting element.innerHTML.
     *
     * @param element The element to be updated
     * @param escape Whether to escape HTML entities (default: true)
     */
    bindElement(element: Element, escape?: boolean): void {
        this._bindings.push({
            type: "element",
            object: element,
            escape: escape == undefined ? true : escape,
        });
    }

    /**
     * Unbind a DOM element again.
     * @param element Bound element
     */
    unbindElement(element: Element): void {
        this._unbind("element", element);
    }

    /**
     * Bind a jQuery object to be updated when the value changes. The update
     * will be done by calling object.val(newValue).
     *
     * @param object jQuery object with DOM nodes
     */
    bindJQueryValue(object: any): void {
        this._bindings.push({
            type: "jQueryValue",
            object: object,
        });
    }

    /**
     * Unbind a jQuery object's value update again.
     * @param object Bound jQuery object with DOM nodes
     */
    unbindJQueryValue(object: any): void {
        this._unbind("jQueryValue", object);
    }

    /**
     * Bind a jQuery object to be updated when the value changes. The update
     * will be done by calling object.html(newValue).
     *
     * @param object jQuery object with DOM nodes
     */
    bindJQueryHtml(object: any): void {
        this._bindings.push({
            type: "jQueryHtml",
            object: object,
        });
    }

    /**
     * Unbind a jQuery object's HTML update again.
     * @param object Bound jQuery object with DOM nodes
     */
    unbindJQueryHtml(object: any): void {
        this._unbind("jQueryHtml", object);
    }

    /**
     * Unbind an observer given by its type and object.
     */
    _unbind(type: string, object: any): void {
        this._bindings = this._bindings.filter(binding => binding.type != type || binding.object != object);
    }

    /**
     * This calls all registered validator functions to check whether an update
     * is allowed or not.
     *
     * @returns true when the update is allowed
     */
    _callValidators(newValue: any, oldValue: any): boolean {
        for (let i = 0; i < this._validators.length; i++) {
            let validator = this._validators[i];
            if (!validator(newValue, oldValue)) return false;
        }

        return true;
    }

    /**
     * Call all observers in the order they were bound.
     */
    _callObservers(newValue: any, oldValue: any): void {
        for (let binding of this._bindings) {
            switch (binding.type) {
                case "function":
                    binding.object(newValue, oldValue);
                    break;
                case "element":
                    if (binding.escape) newValue = utils.escapeHTML(newValue);
                    binding.object.innerHTML = newValue;
                    break;
                case "jQueryValue":
                    binding.object.val(newValue);
                    break;
                case "jQueryHtml":
                    binding.object.html(newValue);
                    break;
            }
        }
    }
}

export default ObservableValue;
