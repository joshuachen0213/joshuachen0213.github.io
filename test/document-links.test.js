const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
let siteRoot;

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function generatedDocumentLinks() {
  const links = new Set();
  const linkPattern = /(?:href|src)="(\/docs\/[^"#?]+)(?:[?#][^"]*)?"/g;

  for (const htmlFile of htmlFiles(siteRoot)) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    for (const match of html.matchAll(linkPattern)) links.add(match[1]);
  }

  return links;
}

test.before(() => {
  siteRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'document-links-site-'));
  execFileSync('bundle', ['exec', 'jekyll', 'build', '--destination', siteRoot], {
    cwd: root,
    encoding: 'utf8',
    stdio: 'pipe',
  });
});

test.after(() => fs.rmSync(siteRoot, { recursive: true, force: true }));

test('every generated /docs link resolves to a published file', () => {
  const brokenLinks = new Set();
  for (const link of generatedDocumentLinks()) {
    const documentPath = decodeURIComponent(link).replace(/^\//, '');
    if (!fs.existsSync(path.join(siteRoot, documentPath))) {
      brokenLinks.add(link);
    }
  }

  assert.deepEqual(Array.from(brokenLinks).sort(), []);
});

test('the tempered distribution report uses the correctly spelled URL', () => {
  const links = generatedDocumentLinks();

  assert.equal(links.has('/docs/TemperedDistribution.pdf'), true);
  assert.equal(links.has('/docs/TemperedDistruction.pdf'), false);
});
