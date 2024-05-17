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
            this.update(state.score);
            eventBus.register(this, 'score increased');
        }

        update(score) {
            this.querySelector('#score').innerHTML = score;
        }
    }
);
