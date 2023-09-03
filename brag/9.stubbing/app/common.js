import { contentOfFile, fail, fileExists } from '../../../dist/index.js';

export const commonGuards = [
    {
        matches: () => !process.env.YOP_STUB_FILE,
        go: fail(400, 'YOP_STUB_FILE env variable not set'),
    },
    {
        matches: () => !fileExists(process.env.YOP_STUB_FILE),
        go: fail(404, 'NOT FOUND'),
    },
    {
        matches: () => {
            try {
                JSON.parse(contentOfFile(process.env.YOP_STUB_FILE));
                return false;
            } catch (error) {
                return true;
            }
        },
        go: fail(400, 'Not valid JSON'),
    },
];
