customElements.define(
    'game-challenge',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch(
                '/templates/GameChallenge/index.html'
            ).then((response) => response.text());
            eventBus.register(this, 'question set');
            this.update(state.challenge);
        }

        update({ question, choices }) {
            this.querySelector('#question').innerHTML = question;
            this.querySelector('#choices').innerHTML = choices
                .map(({ choice }) => this.choiceDefinition(choice))
                .join('');
        }

        choiceDefinition(choice) {
            return `<game-choice choice="${choice}"></game-choice>`;
        }
    }
);
