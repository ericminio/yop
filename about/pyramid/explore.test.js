import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { readdir, rm, mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const clean = async (report) => {
    try {
        await rm(report, { recursive: true, force: true });
    } catch {}
    await mkdir(report);
};

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
        const coverage = extratcCoverageInfo(error.stdout, situation);
        const files = exercisedScripts(folder, coverage);
        files.forEach(async (file) => {
            await writeFile(`${report.pathname}${file}`, 'content');
        });
    }
};

const extratcCoverageInfo = (output, situation) => {
    const data = JSON.stringify(output);
    const start = data.substring(data.indexOf('test:coverage'));
    return start.substring(0, start.indexOf(situation.pathname));
};

const exercisedScripts = (folder, coverage) => {
    const filesinfo = coverage.split(/\\"\\u0004path\\"./);
    for (let i = 0; i < filesinfo.length; i++) {
        let file = filesinfo[i];
        const [filename, filecoverageinfo] = file.split(
            '\\"\\u000etotalLineCount'
        );
        if (!!filecoverageinfo) {
            filesinfo[i] = {
                path: filename,
                exercised:
                    filecoverageinfo.indexOf(
                        '\\"\\u0014coveredFunctionCountI\\u0000'
                    ) === -1,
            };
        }
    }

    const candidates = filesinfo
        .filter(exercisedJs)
        .map((candidate) => candidate.path.substring(folder.pathname.length));

    return candidates;
};

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
});
