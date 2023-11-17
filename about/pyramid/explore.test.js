import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { readdir, rm, mkdir, writeFile } from 'node:fs/promises';

const inspect = async ({ folder, test, report }) => {
    try {
        await rm(report, { recursive: true, force: true });
    } catch {}
    await mkdir(report);

    await writeFile(`${report.pathname}/compute.js`, 'one');
    await writeFile(`${report.pathname}/wire.js`, 'one');
};

describe('generating tests', () => {
    it('creates test files for exercised code only', async () => {
        await inspect({
            folder: new URL('./app', import.meta.url),
            test: new URL('./incoming/situation/situation.js', import.meta.url),
            report: new URL('./incoming/situation/tests', import.meta.url),
        });
        const files = await readdir(
            new URL('./incoming/situation/tests', import.meta.url)
        );

        assert.deepEqual(files, ['compute.js', 'wire.js']);
    });
});
