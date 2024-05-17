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
            this.updateScore(state.score);
            eventBus.register(this.updateScore.bind(this), 'score increased');
            eventBus.register(this.updateChoices.bind(this), 'choices set');
            eventBus.register(this.gameOver.bind(this), 'game over');
        }

        updateScore(score) {
            this.querySelector('#score').innerHTML = score;
        }

        updateChoices(choices) {
            let html = '';
            for (const { choice, isCorrect } of choices) {
                html += `<button id="choice-${choice}">${choice}</button>`;
            }
            this.querySelector('#choices').innerHTML = html;
            for (const { choice, isCorrect } of choices) {
                this.querySelector(`#choice-${choice}`).addEventListener(
                    'click',
                    isCorrect ? increaseScore : gameOver
                );
            }
        }

        gameOver() {
            this.updateMessage('Game Over');
        }
        updateMessage(text) {
            this.querySelector('#message').innerHTML = text;
        }
    }
);
