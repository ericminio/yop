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
            eventBus.register(this.updateScore.bind(this), 'score increased');
            this.updateScore(state.score);
        }

        updateScore(score) {
            this.querySelector('#score').innerHTML = score;
        }
    }
);
