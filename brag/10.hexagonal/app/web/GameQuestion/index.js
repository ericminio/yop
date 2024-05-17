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
            eventBus.register(this.updateChoices.bind(this), 'choices set');
            eventBus.register(this.updateQuestion.bind(this), 'question set');
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
    }
);
