import http from 'http';
import { notImplemented } from './route-501.js';

export class Server {
    constructor(maybePort, maybeHandler) {
        if (Number.isNaN(maybePort)) {
            this.handler = maybePort;
        } else {
            this.handler = maybeHandler || notImplemented;
            this.port = maybePort;
        }
        this.sockets = [];
        this.internal = http.createServer();
        this.internal.on('connection', (socket) => {
            this.sockets.push(socket);
            socket.on('close', () => {
                this.sockets.splice(this.sockets.indexOf(socket), 1);
            });
        });
        this.use(this.handler);
        this.started = false;
    }
    start(done) {
        if (this.started) {
            if (!!done) {
                done(this.port);
            } else {
                return Promise.resolve(this.port);
            }
        } else {
            this.started = true;
            if (!!done) {
                new PortFinder(this.internal, this.port).please(done);
            } else {
                return new Promise((resolve) => {
                    new PortFinder(this.internal, this.port).please(resolve);
                });
            }
        }
    }
    stop(done) {
        this.sockets.forEach((socket) => socket.destroy());
        if (done) {
            this.close(done);
        } else {
            return new Promise((resolve) => {
                this.close(resolve);
            });
        }
    }
    use(handler) {
        this.internal.removeListener('request', this.handler);
        this.handler = handler;
        this.internal.on('request', this.handler);
    }
    close(then) {
        this.internal.close(() => {
            this.started = false;
            then();
        });
    }
}

class PortFinder {
    constructor(server, port) {
        this.port = port || 5001;
        this.server = server;
        this.found = false;
    }

    please(callback) {
        this.server.on('listening', () => {
            if (!this.found) {
                this.found = true;
                callback(this.port);
            }
        });
        this.server.on('error', () => {
            this.port += 1;
            this.server.listen(this.port);
        });
        this.server.listen(this.port);
    }
}
