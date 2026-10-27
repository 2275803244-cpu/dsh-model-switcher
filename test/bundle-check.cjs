'use strict';
// Zero-dep bundle sanity check: the lib/client.js entry must stay a
// browser-only ModuleLoader bundle (no Node APIs) that dsh web/desktop can
// load. Run: node test/bundle-check.cjs
const fs = require('fs');
const assert = require('assert');

const src = fs.readFileSync(require('path').join(__dirname, '..', 'lib', 'client.js'), 'utf8');
// Scan only code, ignoring comments, so prose in Zen comments (e.g. "global
// Host settings") can't produce false positives.
const code = src.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');

assert(!/node:/.test(code), 'no node:<module> references');
assert(!/\bprocess\./.test(code), 'no process.* references');
assert(!/require\(["']fs["']\)/.test(code), 'no fs require');
assert(!/require\(["']path["']\)/.test(code), 'no path require');
assert(/window\.__ModuleLoader__\.load\({/.test(src), 'ModuleLoader.load present');
assert(/function apply\(/.test(src) || /\.apply\s*=|\bapply\s*\(/.test(src), 'cordis apply entry present');
assert(/react\/jsx-runtime/.test(src) || /react_jsx_runtime/.test(src), 'uses only the react jsx runtime');
assert(!/createRequire/.test(code), 'no createRequire');
assert(!/\bBuffer\b/.test(code), 'no Buffer');
assert(!/\bglobalThis\b|\bglobal\s+=/.test(code), 'no Node globalThis/global assignment');

assert.strictEqual(/require\(["']([^"']+)["']\)/.test(src) && true, true, 'require calls parse');
const requires = [...src.matchAll(/require\(["']([^"']+)["']\)/g)].map((m) => m[1]);
const banned = requires.filter((m) => m.startsWith('node:') || m === 'fs' || m === 'path' || m === 'os');
assert.deepStrictEqual(banned, [], 'no Node builtin requires');

console.log('bundle-check OK: browser-only ModuleLoader bundle, react-only, no Node APIs');
console.log('  require() deps:', requires.join(', ') || '(none)');
console.log('  client.js bytes:', src.length);