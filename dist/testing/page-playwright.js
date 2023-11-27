import { firefox } from 'playwright';

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
}
