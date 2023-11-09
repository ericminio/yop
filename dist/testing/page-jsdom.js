import { JSDOM } from 'jsdom';
const config = {
    runScripts: 'dangerously',
    resources: 'usable',
};
const openWithJsdom = (isUrl) => (isUrl ? JSDOM.fromURL : JSDOM.fromFile);

export class Page {
    constructor() {}

    async open(spec, options) {
        const isUrl = typeof spec == 'string' && spec.indexOf('http') === 0;
        const target = isUrl ? spec : spec.pathname;
        const fetchImplementation =
            !!options && options.fetch
                ? options.fetch
                : (url, options) => {
                      return isUrl &&
                          typeof url == 'string' &&
                          url.indexOf('/') === 0
                          ? fetch(`${new URL(spec).origin}${url}`, options)
                          : fetch(url, options);
                  };
        return new Promise(async (resolve, reject) => {
            try {
                const dom = await openWithJsdom(isUrl)(target, {
                    beforeParse: (window) => {
                        window.fetch = fetchImplementation;
                    },
                    ...config,
                });
                this.window = dom.window;
                this.document = dom.window.document;
                if (this.document.readyState === 'loading') {
                    this.document.addEventListener('DOMContentLoaded', () =>
                        resolve()
                    );
                } else {
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async close() {
        return new Promise((resolve) => {
            this.window.close();
            resolve();
        });
    }

    async title() {
        return this.document.title;
    }

    section(text) {
        return this.find({ tag: 'section', text })
            .textContent.replace(/\s\s+/g, ' ')
            .trim();
    }

    click(text) {
        this.find({ tag: 'button', text }).click();
    }

    enter(prompt, value) {
        let field = this.input(prompt);
        field.value = value;
        field.dispatchEvent(new this.window.Event('input'));
    }

    color(text) {
        const label = this.find({ tag: 'label', text });
        const style = this.document.defaultView.getComputedStyle(label, null);

        return style.color;
    }

    element(selector) {
        return this.document.querySelector(selector);
    }

    input(prompt) {
        let label = this.find({ tag: 'label', text: prompt });
        if (label.htmlFor.length === 0) {
            throw new Error(
                `label with text '${prompt}' is missing for attribute`
            );
        }
        let candidate = this.element(`#${label.htmlFor}`);
        if (candidate === null) {
            throw new Error(`input with id '${label.htmlFor}' not found`);
        }
        return candidate;
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
}
