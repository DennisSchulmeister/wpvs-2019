/*
 * lecture-slides.js (https://www.buzzlms.de)
 * © 2017  Dennis Schulmeister-Zimolong <dennis@pingu-mail.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 */
"use strict";

/**
 * Take an HTML string and replace all &, <, > with &amp;, &lt;, &gt;
 * @param  {String} html Raw HTML string
 * @return {String} Escaped HTML string
 */
function escapeHTML(html) {
    return html.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/**
 * Take a multi-line text and return a string with the apropriate linebreak
 * sequence. The returns string is one of these, depending on which one is
 * first found:
 *
 *   * "\r\n": Windows style
 *   * "\n": Unix style
 *   * "\r": Mac style
 *   * "": No linebreaks found
 *
 * @param  {String} text Original text
 * @return {String} Linebreak sequence
 */
function determineLinebreaks(text) {
    if (text.includes("\r\n")) return "\r\n";
    else if (text.includes("\n")) return "\n";
    else if (text.includes("\r")) return "\r";
    else return "";
}

/**
 * This function takes a text string and shifts all lines to the left so that
 * as most leading spaces are removed as possible. All lines are shifted by
 * the same amount which is determined as the minimum amount of white space
 * at the beginning of all lines.
 *
 * @param  {String} text Original text
 * @return {String} Shifted text
 */
function shiftLinesLeft(text) {
    // Determine type of linebreak
    let linebreak = determineLinebreaks(text);
    if (linebreak === "") return text;

    let lines = [];
    lines = text.split(linebreak);

    // Find amount to shift lines
    let commonPrefix = null;

    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].length) continue;

        let whitespace = lines[i].match(/^\s*/);
        if (whitespace) whitespace = whitespace[0];
        else whitespace = "";

        if (commonPrefix === null || commonPrefix.startsWith(whitespace)) commonPrefix = whitespace;
    }

    // Shift lines and return result
    text = "";
    let shift = commonPrefix.length;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length) {
            lines[i] = lines[i].slice(shift, lines[i].length);
        }

        text += lines[i] + linebreak;
    }

    return text;
}

/**
 * Remove any leading empty lines found inside the given text.
 *
 * @param  {String} text Original text
 * @return {String} Trimmed text
 */
function removeLeadingLinebreaks(text) {
    let linebreak = determineLinebreaks(text);
    if (linebreak === "") return text;

    while (text.startsWith(linebreak)) {
        text = text.slice(linebreak.length);
    }

    return text;
}

/**
 * Remove any trailing empty lines found inside the given text.
 *
 * @param  {String} text Original text
 * @return {String} Trimed text
 */
function removeTrailingLinebreaks(text) {
    let linebreak = determineLinebreaks(text);
    if (linebreak === "") return text;

    while (text.endsWith(linebreak)) {
        text = text.slice(0, 0 - linebreak.length);
    }

    return text;
}

/**
 * Remove any trailing spaces or tabs at the end of each line of a given text.
 *
 * @param  {String} text Original text
 * @return {String} Trimed text
 */
function trimLines(text) {
    let linebreak = determineLinebreaks(text);
    if (linebreak === "") return text;

    let lines = [];
    lines = text.split(linebreak);
    text = "";

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        while (true) {
            let lastChar = line.slice(line.length-1, line.length);
            let repeat = false;

            switch (lastChar) {
                case " ":
                case "\t":
                    line = line.slice(0, -1)
                    repeat = true;
            }

            if (!repeat) break;
        }

        text += line + linebreak;
    }

    return text;
}

export default {
    escapeHTML,
    determineLinebreaks,
    shiftLinesLeft,
    removeLeadingLinebreaks,
    removeTrailingLinebreaks,
    trimLines,
}
