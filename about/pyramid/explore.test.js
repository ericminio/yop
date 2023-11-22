import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { readdir, rm, mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const inspect = async ({ folder, situation, report }) => {
    await clean(report);
    try {
        const output = execFileSync(
            'node',
            ['--experimental-test-coverage', '--test', situation.pathname],
            {
                encoding: 'utf8',
            }
        );
        console.log({ output });
    } catch (error) {
        // await writeFile(
        //     `${report.pathname}/output`,
        //     JSON.stringify(error.stdout)
        // );
        const coverage = extractCoverageInfo(error.stdout, situation);
        const files = exercisedScripts(folder, coverage);
        files.forEach(async (file) => {
            await writeFile(
                `${report.pathname}${file}`,
                'decomposing also works for 42'
            );
        });
    }
};

const clean = async (report) => {
    try {
        await rm(report, { recursive: true, force: true });
    } catch {}
    await mkdir(report);
};

const extractCoverageInfo = (output, situation) => {
    const data = JSON.stringify(output);
    const start = data.substring(data.indexOf('test:coverage'));
    return start.substring(0, start.indexOf(situation.pathname));
};

const exercisedScripts = (folder, coverage) => {
    const filesinfo = splitCoverageInfoByFile(coverage);
    const candidates = filesinfo
        .filter(exercisedJs)
        .map((candidate) => candidate.path.substring(folder.pathname.length));

    return candidates;
};

const splitCoverageInfoByFile = (coverage) =>
    coverage
        .split(/\\"\\u0004path\\"./)
        .filter((info) => info.indexOf('\\"\\u000etotalLineCount') !== -1)
        .map((info) => info.split('\\"\\u000etotalLineCount'))
        .map(([path, filecoverageinfo]) => ({
            path,
            exercised:
                filecoverageinfo.indexOf('coveredFunctionCountI\\u0000') === -1,
        }));

const exercisedJs = (file) => /\.js$/.test(file.path) && file.exercised;

describe('generating tests', () => {
    it('creates test files for exercised code only', async () => {
        await inspect({
            folder: new URL('./incoming/app', import.meta.url),
            situation: new URL(
                './incoming/situation/situation.js',
                import.meta.url
            ),
            report: new URL('./incoming/situation/tests', import.meta.url),
        });
        const files = await readdir(
            new URL('./incoming/situation/tests', import.meta.url)
        );

        assert.deepEqual(files, ['compute.js', 'wire.js']);
    });

    it('generated tests call for exepectation clarification', async () => {
        await inspect({
            folder: new URL('./incoming/app', import.meta.url),
            situation: new URL(
                './incoming/situation/situation.js',
                import.meta.url
            ),
            report: new URL('./incoming/situation/tests', import.meta.url),
        });
        const files = await readdir(
            new URL('./incoming/situation/tests', import.meta.url)
        );
        const code = readFileSync(
            new URL('./incoming/situation/tests/compute.js', import.meta.url)
        ).toString();

        assert.equal(code, 'decomposing also works for 42');
    });
});
