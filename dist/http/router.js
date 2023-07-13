export class Router {
    constructor(routes) {
        this.routes = routes;
    }
    async handler(incoming, response) {
        let found = false;
        for (let i = 0; i < this.routes.length; i++) {
            let route = this.routes[i];
            let matching = await route.matches(incoming, this);
            if (matching) {
                found = true;
                await route.go(incoming, response, this);
                break;
            }
        }
        if (!found) {
            response.statusCode = 404;
            response.setHeader('content-type', 'text/plain');
            response.write('NOT FOUND');
            response.end();
        }
    }
}
