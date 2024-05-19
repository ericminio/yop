customElements.define(
    'game-next-challenge-invite',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch(
                '/templates/GameNextChallengeInvite/index.html'
            ).then((response) => response.text());
            this.querySelector('#next').addEventListener('click', () => {
                nextChallenge();
            });
        }
    }
);
