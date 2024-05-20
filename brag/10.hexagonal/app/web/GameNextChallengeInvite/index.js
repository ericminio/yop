customElements.define(
    'game-next-challenge-invite',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.template = await fetch(
                '/templates/GameNextChallengeInvite/index.html'
            ).then((response) => response.text());
            this.innerHTML = '&nbsp;';
            eventBus.registerForAll(this);
        }

        isVisible() {
            return (
                state.challenge.answered &&
                !state.challenge.isLast &&
                !state.gameOver
            );
        }

        update() {
            if (this.isVisible()) {
                this.innerHTML = this.template;
                this.querySelector('#next').addEventListener('click', () => {
                    nextChallenge();
                });
            }
        }
    }
);
