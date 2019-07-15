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

import emailLinkJs from "email-link.js";

import "../fonts/fonts.css";
import "../css/index.less";

import "@webcomponents/custom-elements";
import "./wpvs-container/wpvs-container.js";
import "./wpvs-detect-screen-size/wpvs-detect-screen-size.js";
import "./wpvs-header/wpvs-header.js";
import "./wpvs-material-card/wpvs-material-card.js";
import "./wpvs-nav-bar/wpvs-nav-bar.js";
import "./wpvs-tabs/wpvs-tabs.js";

if (document.readyState === "complete") {
    emailLinkJs.enableEmailLinks()
} else {
    window.addEventListener("load", () => emailLinkJs.enableEmailLinks());

}
