document.yoptimer = new document.YopTimer({ cycle: 1000, count: 15 });

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
                    this.ownerDocument.yoptimer.start();
                });
        }
    }
);
