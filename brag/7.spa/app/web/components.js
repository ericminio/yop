import { contentOfFile } from '../../../../dist/index.js';

const scripts = [
    './About/index.js',
    './MainMenu/index.js',
    './WelcomeHome/index.js',
].reduce(
    (acc, current) => acc + contentOfFile(new URL(current, import.meta.url)),
    ''
);

export const components = () => ({
    content: scripts,
    contentType: 'application/javascript',
});
