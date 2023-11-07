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
        await this.driver.quit();
        this.driver = null;
    }

    click(text) {
        this.find({ tag: 'button', text }).click();
    }

    set(prompt) {
        let label = this.find({ tag: 'label', text: prompt });
        if (label.htmlFor.length === 0) {
            throw new Error(
                `label with text '${prompt}' is missing for attribute`
            );
        }
        let candidate = element(`#${label.htmlFor}`);
        if (candidate === null) {
            throw new Error(`input with id '${label.htmlFor}' not found`);
        }
        return candidate;
    }
    input(prompt) {
        return this.set(prompt);
    }

    enter(prompt, value) {
        let field = this.input(prompt);
        field.value = value;
        field.dispatchEvent(new this.window.Event('input'));
    }

    color(text) {
        const label = find({ tag: 'label', text });
        const style = this.document.defaultView.getComputedStyle(label, null);

        return style.color;
    }

    find(options) {
        if (!this.document) {
            throw new Error('page.document must be defined');
        }
        const document = options.in || this.document;
        let candidates = Array.from(
            document.querySelectorAll(options.tag)
        ).filter(
            (element) =>
                element.textContent.indexOf(options.text) !== -1 ||
                element.getAttribute('name') === options.text
        );
        if (candidates.length === 0) {
            throw new Error(
                `${options.tag} with text or name '${options.text}' not found`
            );
        }
        return candidates.sort(
            (a, b) => a.textContent.length - b.textContent.length
        )[0];
    }

    element(selector) {
        return this.document.querySelector(selector);
    }

    async section() {
        try {
            const candidates = await this.driver.findElements(
                By.css('section')
            );
            const value = await candidates[0].getText();
            return value.replace(/\s\s+/g, ' ').trim();
        } catch (error) {
            console.log(error);
            throw new Error('Unable to locate section');
        }
    }
}
