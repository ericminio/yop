import { Builder, By } from 'selenium-webdriver';
import { oneliner } from './oneliner.js';

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

    async section(text) {
        try {
            const sections = await this.driver.findElements(By.css('section'));
            const texts = [];
            for (let s of sections) {
                texts.push(await s.getText());
            }
            const candidates = texts.filter(
                (candidate) => candidate.indexOf(text) !== -1
            );
            const value = candidates.sort((a, b) => a.length - b.length)[0];
            return oneliner(value);
        } catch (error) {
            throw new Error(`Unable to locate section`);
        }
    }
}
