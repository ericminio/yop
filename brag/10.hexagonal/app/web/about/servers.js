import { Server } from '../../../../../dist/index.js';
import { routerForComponent } from './routers.js';

export const serverForComponent = (tag) => {
    const router = routerForComponent(tag);
    return new Server(router.handler.bind(router));
};
