customElements.define(
    'game-choice',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.choice = this.getAttribute('choice');
            const template = await fetch(
                '/templates/GameChoice/index.html'
            ).then((response) => response.text());
            this.innerHTML = template
                .replace('choice-id', this.choiceId(this.choice))
                .replace('choice-label', this.choice);
            this.choiceElement(this.choice).addEventListener('click', () =>
                play(this.choice)
            );
            eventBus.register(
                this.highlightCorrectAnswer.bind(this),
                'correct answer'
            );
            eventBus.register(
                this.highlightWrongAnswer.bind(this),
                'game over'
            );
        }

        isMe(answer) {
            return answer === this.choice;
        }

        highlightCorrectAnswer(answer) {
            if (this.isMe(answer)) {
                this.choiceElement(answer).className = 'bg-green-600';
            }
        }

        highlightWrongAnswer(answer) {
            if (this.isMe(answer)) {
                this.choiceElement(answer).className = 'bg-orange-600';
            }
        }

        choiceId(choice) {
            return `choice-${choice.toLowerCase().replaceAll(' ', '-')}`;
        }
        choiceElement(choice) {
            return this.querySelector(`#${this.choiceId(choice)}`);
        }
    }
);
