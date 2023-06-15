customElements.define(
    'main-menu',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            const html = await fetch('/MainMenu/index.html').then((response) =>
                response.text()
            );
            this.innerHTML = html;
            this.querySelector('#menu-about').addEventListener('click', () => {
                navigate.to('/about');
            });
        }
    }
);
