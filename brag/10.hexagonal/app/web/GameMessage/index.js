customElements.define(
    'game-message',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch(
                '/templates/GameMessage/index.html'
            ).then((response) => response.text());
            eventBus.register(this.gameOver.bind(this), 'game over');
            eventBus.register(this.win.bind(this), 'you win!');
        }

        gameOver() {
            this.querySelector('#message').innerHTML = 'Game Over';
        }

        win() {
            this.querySelector('#message').innerHTML = 'You win! Congrats!!!';
        }
    }
);
