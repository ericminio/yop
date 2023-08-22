customElements.define(
    'welcome-home',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            const html = await fetch('/templates/WelcomeHome/index.html').then(
                (response) => response.text()
            );
            this.innerHTML = html;
            this.ownerDocument
                .querySelector('#start')
                .addEventListener('click', () => {
                    setTimeout(() => {
                        this.ownerDocument.querySelector(
                            '#remaining'
                        ).innerHTML = '14s';
                    }, 1000);
                });
        }
    }
);
