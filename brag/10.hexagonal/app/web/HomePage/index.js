customElements.define(
    'home-page',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch('/templates/HomePage/index.html').then(
                (response) => response.text()
            );
            this.querySelector('#answer').addEventListener('click', () => {
                this.increaseScore();
            });
        }

        increaseScore() {
            this.querySelector('#score').innerHTML = '1';
        }
    }
);
