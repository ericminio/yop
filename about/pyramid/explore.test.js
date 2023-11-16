import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { readdir, rm, mkdir, writeFile } from 'node:fs/promises';

const inspect = async ({ folder, test, report }) => {
    try {
        await rm(report, { recursive: true, force: true });
    } catch {}
    await mkdir(report);

    await writeFile(`${report.pathname}/1.js`, 'one');
    await writeFile(`${report.pathname}/2.js`, 'one');
};

describe('generating tests', () => {
    it('creates expected test files', async () => {
        await inspect({
            folder: new URL('./app', import.meta.url),
            test: new URL('./incoming/situation/situation.js', import.meta.url),
            report: new URL('./incoming/situation/tests', import.meta.url),
        });
        const files = await readdir(
            new URL('./incoming/situation/tests', import.meta.url)
        );

        assert.equal(files.length, 2);
    });
});
