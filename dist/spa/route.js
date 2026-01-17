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
                    const varNameIndex = whenParts.findIndex((part) =>
                        part.startsWith(':')
                    );
                    const varName = whenParts[varNameIndex].substring(1);
                    const varValue = pathParts[varNameIndex];
                    this.then = `<${this.thenAttribute} ${varName}="${varValue}"></${this.thenAttribute}>`;
                }
                this.innerHTML = this.then;
            } else {
                this.innerHTML = '';
            }
        }
    }
);
