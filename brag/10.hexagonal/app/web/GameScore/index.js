customElements.define(
    'game-score',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch(
                '/templates/GameScore/index.html'
            ).then((response) => response.text());
            eventBus.register(this.updateScore.bind(this), 'challenge passed');
            this.updateScore(state.score);
        }

        updateScore() {
            this.querySelector('#score').innerHTML = state.score;
        }
    }
);
