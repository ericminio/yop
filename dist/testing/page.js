import { JSDOM } from 'jsdom';
const config = {
    runScripts: 'dangerously',
    resources: 'usable',
};
const openWithJsdom = (isUrl) => (isUrl ? JSDOM.fromURL : JSDOM.fromFile);

const open = (spec, options) => {
    const isUrl = typeof spec == 'string' && spec.indexOf('http') === 0;
    const target = isUrl ? spec : spec.pathname;
    const fetchImplementation =
        !!options && options.fetch
            ? options.fetch
            : (url, options) => {
                  return isUrl &&
                      typeof url == 'string' &&
                      url.indexOf('/') === 0
                      ? fetch(`${spec}${url}`, options)
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
            page.window = dom.window;
            page.document = dom.window.document;
            if (page.document.readyState === 'loading') {
                page.document.addEventListener('DOMContentLoaded', () =>
                    resolve()
                );
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};

const close = (done) => {
    done();
};

const click = (text) => {
    find({ tag: 'button', text }).click();
};

const set = (prompt) => {
    let label = find({ tag: 'label', text: prompt });
    if (label.htmlFor.length === 0) {
        throw new Error(
            `label with text '${prompt}' is missing htmlFor attribute`
        );
    }
    let candidate = element(`#${label.htmlFor}`);
    if (candidate === null) {
        throw new Error(`input with id '${label.htmlFor}' not found`);
    }
    return candidate;
};
const input = set;

const enter = (prompt, value) => {
    let field = input(prompt);
    field.value = value;
    field.dispatchEvent(new page.window.Event('input'));
};

const section = (text) => {
    return find({ tag: 'section', text })
        .textContent.replace(/\s\s+/g, ' ')
        .trim();
};

const color = (text) => {
    const label = find({ tag: 'label', text });
    const style = page.document.defaultView.getComputedStyle(label, null);

    return style.color;
};

export const page = { open, close, section, set, input, enter, click, color };

const find = (options) => {
    if (page.document === undefined) {
        throw new Error('page.document is undefined');
    }
    let candidates = Array.from(
        page.document.querySelectorAll(options.tag)
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
};

const element = (selector) => {
    return page.document.querySelector(selector);
};