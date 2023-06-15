customElements.define(
    'welcome-home',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            const html = await fetch('/WelcomeHome/index.html').then(
                (response) => response.text()
            );
            this.innerHTML = html;
        }
    }
);
