import { firefox } from 'playwright';
import { oneliner } from './oneliner.js';

export class Page {
    constructor() {}

    async open(spec, options) {
        if (!!this.browser) {
            await this.browser.close();
        }
        this.browser = await firefox.launch({ headless: false });
        this.page = await this.browser.newPage();

        const isUrl = typeof spec == 'string' && spec.indexOf('http') === 0;
        const target = isUrl ? spec : `file://${spec.pathname}`;
        await this.page.goto(target);
    }

    async close() {
        if (!!this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    async title() {
        return await this.page.title();
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
        const input = await this.input(prompt);
        await input.clear();
        await input.fill(value);
    }

    async input(prompt) {
        const label = await this.find({ tag: 'label', text: prompt });
        const id = await label.element.getAttribute('for');
        if (!id || id.length === 0) {
            throw new Error(
                `label with text '${prompt}' is missing for attribute`
            );
        }
        const candidates = await this.page.locator(`css=#${id}`).all();
        if (candidates.length == 0) {
            throw new Error(`input with id '${id}' not found`);
        }
        return candidates[0];
    }

    async find({ tag, text }) {
        const elements = await this.page.locator(tag).all();
        const candidates = [];
        for (let i = 0; i < elements.length; i++) {
            const candidate = elements[i];
            const actualText = await candidate.textContent();
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
