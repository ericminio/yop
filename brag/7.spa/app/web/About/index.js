customElements.define(
    'page-about',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch('/templates/About/index.html').then(
                (response) => response.text()
            );
        }
    }
);
