customElements.define(
    'main-menu',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            this.innerHTML = await fetch('/templates/MainMenu/index.html').then(
                (response) => response.text()
            );
            this.querySelector('#menu-about').addEventListener('click', () => {
                navigate.to('/about');
            });
        }
    }
);
