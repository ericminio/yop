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
            eventBus.register(this, 'score increased');
        }

        update() {
            if (!state.challenge.isLast) {
                this.innerHTML = this.template;
                this.querySelector('#next').addEventListener('click', () => {
                    nextChallenge();
                });
            }
        }
    }
);
