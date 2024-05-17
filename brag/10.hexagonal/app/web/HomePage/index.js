customElements.define(
    'home-page',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch('/templates/HomePage/index.html').then(
                (response) => response.text()
            );
            this.querySelector('#answer').addEventListener(
                'click',
                increaseScore
            );
            this.updateScore(state.score);
            eventBus.register(this.updateScore.bind(this), 'score increased');
            eventBus.register(this.updateAnswer.bind(this), 'answer set');
        }

        updateAnswer(answer) {
            this.querySelector('#answer').innerHTML = answer;
        }

        updateScore(score) {
            this.querySelector('#score').innerHTML = score;
        }
    }
);
