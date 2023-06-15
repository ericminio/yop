import { contentOfFile } from '../content-of-file.js';

export const yop = ['./event-bus.js', './navigate.js', './route.js'].reduce(
    (acc, current) => acc + contentOfFile(new URL(current, import.meta.url)),
    ''
);
