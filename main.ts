// The harness driver: node runs this file as `node /bot/main.ts` (Node 22).
//
// It reads every case from cases.json in the input directory (a JSON array of
// {id, input}), answers each case on its own with run() from ./solve.js, and writes the
// answers, in the cases' order, to answers.json in the output directory. Inside the
// sandbox the input directory is /input and the output directory is /output; outside it,
// MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR stand in for them.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// Turn V8's incremental marking off before solve.js is imported, so all of the
// generator's work runs under it (the house baseline is timed the same way).
setFlagsFromString('--no-incremental-marking');

const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as {
  run: (input: unknown) => unknown;
};

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as { id: string; input: unknown }[];
const answers = new Array(cases.length);
for (let i = 0; i < cases.length; i++) answers[i] = run(cases[i].input);
writeFileSync(join(OUTPUT_DIR, 'answers.json'), JSON.stringify(answers));
