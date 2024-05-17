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
            eventBus.register(this.gameOver.bind(this), 'game over');
        }

        gameOver() {
            this.querySelector('#message').innerHTML = 'Game Over';
        }
    }
);
