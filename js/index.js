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
import "./wpvs-page/wpvs-page.js";
import "./wpvs-router/wpvs-router.js";
import "./wpvs-tabs/wpvs-tabs.js";
import "./wpvs-tile/wpvs-tile.js";

let init = () => {
    // Make email links work
    emailLinkJs.enableEmailLinks();

    // Update page title, when the router loads a new page
    let routerElement = document.querySelector("wpvs-router");

    routerElement.addEventListener("route-changed", event => {
        let siteTitle = "";
        let headerElement = document.querySelector("wpvs-header");
        if (headerElement && headerElement.dataset.siteTitle) siteTitle = headerElement.dataset.siteTitle;

        let pageTitle = "";
        let pageElement = event.detail.sRoot.querySelector("wpvs-page");
        if (pageElement && pageElement.dataset.title) pageTitle = pageElement.dataset.title;

        if (siteTitle && pageTitle) document.title = `${pageTitle} | ${siteTitle}`;
        else document.title = `${pageTitle}${siteTitle}`;

        if (headerElement) headerElement.dataset.pageTitle = pageTitle;
    });
};

if (document.readyState === "complete") init();
else window.addEventListener("load", init);
