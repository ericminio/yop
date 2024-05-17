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
            eventBus.register(this.updateChoices.bind(this), 'choices set');
            eventBus.register(this.updateQuestion.bind(this), 'question set');
            eventBus.register(this.updateScore.bind(this), 'score increased');
            eventBus.register(this.gameOver.bind(this), 'game over');
        }

        updateScore(score) {
            this.querySelector('#score').innerHTML = score;
        }

        updateQuestion(question) {
            this.querySelector('#question').innerHTML = question;
        }

        updateChoices(choices) {
            const choiceId = (choice) => `choice-${choice}`;
            const choiceComponent = (choice) =>
                `<button id="${choiceId(choice)}">${choice}</button>`;
            this.querySelector('#choices').innerHTML = choices.reduce(
                (list, { choice }) => list + choiceComponent(choice),
                ''
            );
            choices.forEach(({ choice }) => {
                this.querySelector(`#${choiceId(choice)}`).addEventListener(
                    'click',
                    () => play(choice)
                );
            });
        }

        gameOver() {
            this.querySelector('#message').innerHTML = 'Game Over';
        }
    }
);
