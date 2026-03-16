/*
 * Copyright © 2026 Dennis Schulmeister-Zimolong
 *
 * E-Mail: dhbw@windows3.de
 * Webseite: https://www.wpvs.de/
 *
 * Dieser Quellcode ist lizenziert unter einer
 * Creative Commons Namensnennung 4.0 International Lizenz.
 */

// Type declarations for HTML imports
declare module "*.html" {
    const content: string;
    export default content;
}

// Type declarations for CSS/LESS imports
declare module "*.css" {
    const content: string;
    export default content;
}

declare module "*.less" {
    const content: string;
    export default content;
}
