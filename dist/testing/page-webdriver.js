import { Builder, By } from 'selenium-webdriver';

export class Page {
    constructor() {}

    async open(spec, options) {
        if (!!this.driver) {
            await this.driver.quit();
        }
        this.driver = await new Builder().forBrowser('firefox').build();

        const isUrl = typeof spec == 'string' && spec.indexOf('http') === 0;
        const target = isUrl ? spec : `file://${spec.pathname}`;
        await this.driver.get(target);
    }

    async title() {
        return await this.driver.executeScript('return document.title');
    }

    async close() {
        if (!!this.driver) {
            await this.driver.quit();
            this.driver = null;
        }
    }

    async section() {
        try {
            const candidates = await this.driver.findElements(
                By.css('section')
            );
            const value = await candidates[0].getText();
            return value.replace(/\s\s+/g, ' ').trim();
        } catch (error) {
            throw new Error(`Unable to locate section ${error.message}`);
        }
    }
}
