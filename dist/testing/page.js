import { Page as PageJSDOM } from './page-jsdom.js';

import { Page as PageWebDriver } from './page-webdriver.js';

export const Page =
    process.env.YOP_WEBTEST === 'webdriver'
        ? PageWebDriver
        : process.env.YOP_WEBTEST === 'jsdom'
        ? PageJSDOM
        : PageJSDOM;
