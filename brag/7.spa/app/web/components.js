import { contentOfFile } from '../../../../dist/index.js';

const scripts = [
    './components/About/index.js',
    './components/MainMenu/index.js',
    './components/WelcomeHome/index.js',
].reduce(
    (acc, current) => acc + contentOfFile(new URL(current, import.meta.url)),
    ''
);

export const components = () => ({
    content: scripts,
    contentType: 'application/javascript',
});
