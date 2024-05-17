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
        }

        update({ question, choices }) {
            this.querySelector('#question').innerHTML = question;
            this.querySelector('#choices').innerHTML = choices
                .map(({ choice }) => this.choiceComponent(choice))
                .join('');
            this.wire(choices);
        }

        choiceId(choice) {
            return `choice-${choice}`;
        }
        choiceComponent(choice) {
            return `<button id="${this.choiceId(choice)}">${choice}</button>`;
        }
        wire(choices) {
            choices.forEach(({ choice }) => {
                this.querySelector(
                    `#${this.choiceId(choice)}`
                ).addEventListener('click', () => play(choice));
            });
        }
    }
);
