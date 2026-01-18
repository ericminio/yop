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
            if (path === when) {
                const searchParams = window.location.search;
                if (this.thenAttributeSet && searchParams) {
                    this.then = `<${this.thenAttribute} searchParams="${searchParams}"></${this.thenAttribute}>`;
                }
                this.innerHTML = this.then;
            } else if (this.pathMatchesRoute(path, when)) {
                if (this.thenAttributeSet) {
                    const attributes = this.buildAttributes(path, when);
                    this.then = `<${this.thenAttribute} ${attributes}></${this.thenAttribute}>`;
                }
                this.innerHTML = this.then;
            } else {
                this.innerHTML = '';
            }
        }

        pathMatchesRoute(path, route) {
            const pathParts = path.split('/');
            const routeParts = route.split('/');
            if (pathParts.length !== routeParts.length) {
                return false;
            }
            for (let i = 0; i < routeParts.length; i++) {
                if (
                    !routeParts[i].startsWith(':') &&
                    routeParts[i] !== pathParts[i]
                ) {
                    return false;
                }
            }
            return true;
        }

        buildAttributes(path, route) {
            const routeParts = route.split('/');
            const pathParts = path.split('/');
            const variables = [];
            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i].startsWith(':')) {
                    variables.push({
                        name: routeParts[i].substring(1),
                        value: pathParts[i],
                    });
                }
            }
            return variables
                .map((variable) => `data-${variable.name}="${variable.value}"`)
                .join(' ');
        }
    }
);
