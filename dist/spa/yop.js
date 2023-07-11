import { contentOfFile } from '../files/content-of-file.js';

const scripts = [
    './store.js',
    './event-bus.js',
    './navigate.js',
    './route.js',
].reduce(
    (acc, current) => acc + contentOfFile(new URL(current, import.meta.url)),
    ''
);

export const yop = () => ({
    content: scripts,
    contentType: 'application/javascript',
});
