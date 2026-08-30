import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packagesDir = path.join(root, 'packages');
const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const failures = [];

for (const name of packages) {
  const dir = path.join(packagesDir, name);
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (pkg.private) continue;

  const src = path.join(dir, 'src');
  const indexCandidates = ['index.ts', 'index.tsx'];
  const index = indexCandidates.map((f) => path.join(src, f)).find(fs.existsSync);

  if (!index && name !== 'testing') failures.push(`${pkg.name}: missing public source entrypoint`);
  if (pkg.exports && typeof pkg.exports === 'object' && !pkg.exports['.']) failures.push(`${pkg.name}: exports map has no '.' entry`);

  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.peerDependencies ?? {}) };
  for (const dep of Object.keys(deps)) {
    if (!dep.startsWith('@handheld/')) continue;
    const depName = dep.slice('@handheld/'.length);
    if (!packages.includes(depName)) failures.push(`${pkg.name}: references removed package ${dep}`);
  }
}

const forbidden = [
  ['lit', /from ['"]lit(?:\/|['"])/],
  ['@storybook/web-components', /@storybook\/web-components/],
  ['@storybook/web-components-vite', /@storybook\/web-components-vite/],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.turbo') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|mjs|json)$/.test(entry.name)) {
      const text = fs.readFileSync(full, 'utf8');
      for (const [label, re] of forbidden) if (re.test(text)) failures.push(`${path.relative(root, full)}: forbidden ${label}`);
    }
  }
}
walk(path.join(root, 'packages'));
walk(path.join(root, 'apps'));

if (failures.length) {
  console.error('HANDHELD public API/dead-code check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`HANDHELD public API/dead-code check passed (${packages.length} packages checked).`);
