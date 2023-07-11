customElements.define(
    'page-about',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            const html = await fetch('/template/About/index.html').then(
                (response) => response.text()
            );
            this.innerHTML = html;
        }
    }
);
