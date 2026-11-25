import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const backend = join(root, 'backend');
const generated = join(root, 'src/generated/go-demo');
const goRoot = execFileSync('go', ['env', 'GOROOT'], { encoding: 'utf8' }).trim();

mkdirSync(generated, { recursive: true });
execFileSync('go', ['build', '-o', join(generated, 'go-demo.wasm'), './cmd/go-demo'], {
  cwd: backend,
  env: { ...process.env, GOOS: 'js', GOARCH: 'wasm' },
  stdio: 'inherit',
});
copyFileSync(join(goRoot, 'lib/wasm/wasm_exec.js'), join(generated, 'wasm_exec.js'));
copyFileSync(join(goRoot, 'LICENSE'), join(generated, 'LICENSE'));
