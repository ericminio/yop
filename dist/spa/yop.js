import { scripts } from '../http/scripts.js';

export const yop = scripts(
    ['./store.js', './event-bus.js', './navigate.js', './route.js'],
    import.meta.url
);
