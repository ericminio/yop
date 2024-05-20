import { Server } from '../../../../../../dist/index.js';
import { routerForComponent } from '../../about/routers.js';

const router = routerForComponent('game-question');

export const server = new Server(router.handler.bind(router));
