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

            this.ownerDocument.yoptimer = new document.YopTimer({
                cycle: 1000,
                count: 15,
            });

            this.ownerDocument
                .querySelector('#start')
                .addEventListener('click', () => {
                    this.ownerDocument.yoptimer.start(this.update.bind(this));
                });
        }

        update(count) {
            this.ownerDocument.querySelector(
                '#remaining'
            ).innerHTML = `${count}s`;

            if (count === 0) {
                this.ownerDocument.querySelector('#done').innerHTML = 'Done';
            }
        }
    }
);
