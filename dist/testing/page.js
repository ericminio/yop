import { Page as PageJSDOM } from './page-jsdom.js';

import { Page as PageWebDriver } from './page-webdriver.js';

import { Page as PagePlaywright } from './page-playwright.js';

export const Page =
    process.env.YOP_WEBTEST === 'webdriver'
        ? PageWebDriver
        : process.env.YOP_WEBTEST === 'playwright'
        ? PagePlaywright
        : process.env.YOP_WEBTEST === 'jsdom'
        ? PageJSDOM
        : PageJSDOM;

Page.prototype.sortWithNameAndContent = function (tag, text) {
    return (a, b) => {
        if (a.name === text && b.name === text) {
            throw new Error(
                `multiple elements '${tag}' with name '${text}' found`
            );
        }
        if (a.name === text) return -1;
        if (b.name === text) return 1;
        return a.text.length - b.text.length;
    };
};
