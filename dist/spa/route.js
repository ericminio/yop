customElements.define(
    'yop-route',
    class extends HTMLElement {
        connectedCallback() {
            if (this.getAttribute('then') !== null) {
                this.thenAttributeSet = true;
                this.thenAttribute = this.getAttribute('then');
                this.then = `<${this.thenAttribute}></${this.thenAttribute}>`;
            } else {
                this.thenAttributeSet = false;
                this.then = this.innerHTML;
            }
            eventBus.register(this, 'navigation');
            this.update();
        }
        update() {
            const path = window.location.pathname;
            const when = this.getAttribute('when');
            if (path == when) {
                const searchParams = window.location.search;
                if (this.thenAttributeSet && searchParams) {
                    this.then = `<${this.thenAttribute} searchParams="${searchParams}"></${this.thenAttribute}>`;
                }
                this.innerHTML = this.then;
            } else if (when.includes('/:')) {
                if (this.thenAttributeSet) {
                    const whenParts = when.split('/');
                    const pathParts = path.split('/');
                    const variables = [];
                    for (let i = 0; i < whenParts.length; i++) {
                        if (whenParts[i].startsWith(':')) {
                            variables.push({
                                name: whenParts[i].substring(1),
                                value: pathParts[i],
                            });
                        }
                    }
                    const attributes = variables.reduce((acc, curr) => {
                        const varName = curr.name;
                        const varValue = curr.value;
                        acc += ` ${varName}="${varValue}"`;
                        return acc;
                    }, '');

                    this.then = `<${this.thenAttribute}${attributes}></${this.thenAttribute}>`;
                }
                this.innerHTML = this.then;
            } else {
                this.innerHTML = '';
            }
        }
    }
);
