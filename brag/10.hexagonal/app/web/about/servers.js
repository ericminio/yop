import { Server } from '../../../../../dist/index.js';
import { routerForComponent } from './routers.js';

export const serverForComponent = (componentClass, body) => {
    const router = routerForComponent(componentClass, body);
    return new Server(router.handler.bind(router));
};
