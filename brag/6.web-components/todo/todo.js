customElements.define(
    'yop-todo',
    class extends HTMLElement {
        constructor() {
            super();
        }

        async connectedCallback() {
            const html = await getTemplate('/todo/todo.html');
            this.innerHTML = html.replace(
                'todo-text',
                this.getAttribute('data-task')
            );
        }
    }
);
