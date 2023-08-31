customElements.define(
    'welcome-home',
    class extends HTMLElement {
        constructor() {
            super();
            this.yoptimer = new YopTimer({
                delay: 1000,
                count: 15,
            });
        }

        async connectedCallback() {
            const html = await fetch('/templates/WelcomeHome/index.html').then(
                (response) => response.text()
            );
            this.innerHTML = html;
            this.querySelector('#start').addEventListener('click', () => {
                this.yoptimer.start(this.update.bind(this));
            });
        }

        update(count) {
            this.querySelector('#remaining').innerHTML = `${count}s`;

            if (count === 0) {
                this.querySelector('#done').innerHTML = 'Done';
            }
        }
    }
);
