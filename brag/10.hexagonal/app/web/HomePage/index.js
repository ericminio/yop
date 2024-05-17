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
            let list = '';
            for (const { choice } of choices) {
                list += `<button id="choice-${choice}">${choice}</button>`;
            }
            this.querySelector('#choices').innerHTML = list;
            choices.forEach(({ choice }) => {
                this.querySelector(`#choice-${choice}`).addEventListener(
                    'click',
                    () => play(choice)
                );
            });
        }

        gameOver() {
            this.updateMessage('Game Over');
        }
        updateMessage(text) {
            this.querySelector('#message').innerHTML = text;
        }
    }
);
