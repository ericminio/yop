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

    async close() {
        if (!!this.driver) {
            await this.driver.quit();
            this.driver = null;
        }
    }

    async location() {
        return await this.driver.getCurrentUrl();
    }

    async title() {
        return await this.driver.executeScript('return document.title');
    }

    async html() {
        const body = await this.driver.findElement(By.css('body'));
        return await body.getAttribute('innerHTML');
    }

    async section(text) {
        const selected = await this.find({ tag: 'section', text });
        return oneliner(selected.text);
    }

    async color(text) {
        const label = await this.find({ tag: 'label', text });
        const style = await label.element.getCssValue('color');

        return style;
    }

    async activeElementId() {
        const activeElement = await this.driver.switchTo().activeElement();
        return await activeElement.getAttribute('id');
    }

    async inputValue(prompt) {
        const element = await this.input(prompt);
        return await element.getAttribute('value');
    }

    async inputId(prompt) {
        const element = await this.input(prompt);
        return await element.getAttribute('id');
    }

    async click(text) {
        const selected = await this.find({ tag: 'button', text });
        await selected.element.click();
    }

    async enter(prompt, value) {
        const input = await this.input(prompt);
        await input.clear();
        await input.sendKeys(value);
    }

    async input(prompt) {
        const label = await this.find({ tag: 'label', text: prompt });
        const id = await label.element.getAttribute('htmlFor');
        if (!id || id.length === 0) {
            throw new Error(
                `label with text '${prompt}' is missing for attribute`
            );
        }
        try {
            return await this.driver.findElement(By.id(id));
        } catch (error) {
            throw new Error(`input with id '${id}' not found`);
        }
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
