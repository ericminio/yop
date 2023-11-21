import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { readdir, rm, mkdir, writeFile } from 'node:fs/promises';
import { execFile, execFileSync } from 'node:child_process';
import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import { writeFileSync } from 'node:fs';

const inspect = async ({ folder, situation, report }) => {
    try {
        await rm(report, { recursive: true, force: true });
    } catch {}
    await mkdir(report);

    try {
        const output = execFileSync(
            'node',
            [
                '--experimental-test-coverage',
                '--test',
                // '--test-reporter=dot',
                situation.test.pathname,
            ],
            {
                encoding: 'utf8',
            }
        );
        console.log({ output });
    } catch (error) {
        const data = JSON.stringify(error.stdout);
        const start = data.substring(data.indexOf('test:coverage'));
        const coverage = start.substring(
            0,
            start.indexOf(situation.test.pathname)
        );
        let output = coverage;

        const filesinfo = output.split(/\\"\\u0004path\\"./);

        const splits = [
            '\\"\\u0012coveredLinePercent',
            '\\"\\u0014coveredFunctionCount',
            '\\"\\u000etotalLineCount',
        ];
        for (let i = 0; i < filesinfo.length; i++) {
            let file = filesinfo[i];
            splits.forEach((split) => {
                file = file.split(split).join(`\n${split}`);
            });
            const info = file.split('\n');
            filesinfo[i] = {
                path: info[0],
                exercised: info[2] !== '\\"\\u0014coveredFunctionCountI\\u0000',
            };
        }

        const candidates = filesinfo
            .filter((file) => /\.js$/.test(file.path) && file.exercised)
            .map((candidate) =>
                candidate.path.substring(folder.pathname.length)
            );

        candidates.forEach(async (candidate) => {
            await writeFile(`${report.pathname}${candidate}`, 'content');
        });
    }
};

describe('generating tests', () => {
    it('creates test files for exercised code only', async () => {
        await inspect({
            folder: new URL('./incoming/app', import.meta.url),
            situation: {
                folder: new URL('./incoming/situation', import.meta.url),
                test: new URL(
                    './incoming/situation/situation.js',
                    import.meta.url
                ),
            },
            report: new URL('./incoming/situation/tests', import.meta.url),
        });
        const files = await readdir(
            new URL('./incoming/situation/tests', import.meta.url)
        );

        assert.deepEqual(files, ['compute.js', 'wire.js']);
    });
});
