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
            eventBus.register(this, 'challenge passed');
            eventBus.register(this, 'challenge failed');
        }

        wasMe() {
            return state.challenge.chosenAnswer === this.choice;
        }

        amITheCorrectAnswer() {
            return state.challenge.correctAnswer === this.choice;
        }

        update() {
            if (this.amITheCorrectAnswer()) {
                this.hightlightAsCorrect();
            } else {
                if (this.wasMe()) {
                    this.hightlightAsIncorrect();
                }
            }
        }

        hightlightAsCorrect() {
            this.setClass('bg-green-600');
        }
        hightlightAsIncorrect() {
            this.setClass('bg-orange-600');
        }
        setClass(className) {
            this.choiceElement().className = className;
        }
        choiceElement() {
            return this.querySelector(`#${this.choiceId()}`);
        }
        choiceId() {
            return `choice-${this.choice.toLowerCase().replaceAll(' ', '-')}`;
        }
    }
);
