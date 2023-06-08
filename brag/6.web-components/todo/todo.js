customElements.define(
    'yop-todo',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            const html = await fetch('/todo/todo.html').then((response) =>
                response.text()
            );
            this.innerHTML = html.replace(
                'todo-text',
                this.getAttribute('data-task')
            );
        }
    }
);
