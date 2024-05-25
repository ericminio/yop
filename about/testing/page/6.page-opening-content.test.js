import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page, eventually } from '../../../dist/index.js';

describe('page opening content', () => {
    const content = `
        <!DOCTYPE html>
        <html>
            <head>
                <script>
                    customElements.define(
                        'yop-component',
                        class extends HTMLElement {
                            constructor() {
                                super();
                            }

                            async connectedCallback() {
                                this.innerHTML = '<section>component content</section>'
                            }
                        }
                    );
                </script>
            </head>
            <body>
                <section>
                    page from raw content
                </section>
                <yop-component></<yop-component>
            </body>
        </html>
    `;
    let page;

    beforeEach(async () => {
        page = new Page();
        await page.open(content);
    });
    afterEach(async () => {
        await page.close();
    });

    it('works', async () => {
        assert.match(await page.section('page from raw content'), /.*/);
    });

    it('instantiates component as expected', async () => {
        assert.match(await page.section('component content'), /.*/);
    });
});
