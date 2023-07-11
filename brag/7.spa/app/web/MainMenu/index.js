customElements.define(
    'main-menu',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            const html = await fetch('/templates/MainMenu/index.html').then(
                (response) => response.text()
            );
            this.outerHTML = html;
            this.ownerDocument
                .querySelector('#menu-about')
                .addEventListener('click', () => {
                    navigate.to('/about');
                });
        }
    }
);
