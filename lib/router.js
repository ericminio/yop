export class Router {
    constructor(routes) {
        this.routes = routes;
    }
    handler(incoming, response) {
        const route = this.routes.find(r => r.matches(incoming));
        route.go(incoming, response);
    }
};