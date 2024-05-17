customElements.define(
    'game-question',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch(
                '/templates/GameQuestion/index.html'
            ).then((response) => response.text());
            eventBus.register(this, 'question set');
            eventBus.register(
                this.highlightCorrectAnswer.bind(this),
                'correct answer'
            );
            eventBus.register(
                this.highlightWrongAnswer.bind(this),
                'game over'
            );
        }

        update({ question, choices }) {
            this.querySelector('#question').innerHTML = question;
            this.querySelector('#choices').innerHTML = choices
                .map(({ choice }) => this.choiceDefinition(choice))
                .join('');
            this.wire(choices);
        }

        choiceId(choice) {
            return `choice-${choice.toLowerCase().replaceAll(' ', '-')}`;
        }
        choiceDefinition(choice) {
            return `<button id="${this.choiceId(choice)}">${choice}</button>`;
        }
        choiceElement(choice) {
            return this.querySelector(`#${this.choiceId(choice)}`);
        }
        wire(choices) {
            choices.forEach(({ choice }) => {
                this.querySelector(
                    `#${this.choiceId(choice)}`
                ).addEventListener('click', () => play(choice));
            });
        }

        highlightCorrectAnswer(answer) {
            this.choiceElement(answer).className = 'bg-green-600';
        }

        highlightWrongAnswer(answer) {
            this.choiceElement(answer).className = 'bg-orange-600';
        }
    }
);
