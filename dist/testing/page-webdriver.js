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
        const selected = await this.find({ tag: 'section', text });
        return oneliner(selected.text);
    }

    async click(text) {
        const selected = await this.find({ tag: 'button', text });
        await selected.element.click();
    }

    async enter(prompt, value) {
        const label = await this.find({ tag: 'label', text: prompt });
        const id = await label.element.getAttribute('htmlFor');
        const input = await this.driver.findElement(By.id(id));
        await input.clear();
        await input.sendKeys(value);
    }

    async find({ tag, text }) {
        const buttons = await this.driver.findElements(By.css(tag));
        const candidates = [];
        for (let i = 0; i < buttons.length; i++) {
            const candidate = buttons[i];
            const actualText = await candidate.getText();
            const actualName = await candidate.getAttribute('name');
            if (
                actualText.indexOf(text) !== -1 ||
                (actualName && actualName.indexOf(text) !== -1)
            ) {
                candidates.push({ element: candidate, text: actualText });
            }
        }
        if (candidates.length === 0) {
            throw new Error(`${tag} with text or name '${text}' not found`);
        }
        const selected = candidates.sort(
            (a, b) => a.text.length - b.text.length
        )[0];
        return selected;
    }
}
