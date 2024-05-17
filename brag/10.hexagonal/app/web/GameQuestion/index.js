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
