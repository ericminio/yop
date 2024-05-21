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
            eventBus.register(this.gameLost.bind(this), 'challenge failed');
            eventBus.register(this.win.bind(this), 'you win!');
        }

        gameLost() {
            this.querySelector('#message').innerHTML = 'Game Over';
        }

        win() {
            this.querySelector('#message').innerHTML = 'You win! Congrats!!!';
        }
    }
);
