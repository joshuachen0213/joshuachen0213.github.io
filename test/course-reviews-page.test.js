const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

function buildSite() {
  execFileSync('bundle', ['exec', 'jekyll', 'build'], {
    cwd: root,
    encoding: 'utf8',
    stdio: 'pipe',
  });
}

function generatedPage() {
  return fs.readFileSync(
    path.join(root, '_site', 'course-reviews', 'index.html'),
    'utf8'
  );
}

function generated(relativePath) {
  return fs.readFileSync(path.join(root, '_site', relativePath), 'utf8');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const reviewUrls = [
  '/2022/01/17/course-review/',
  '/2022/06/20/course-review/',
  '/2022/12/26/course-review/',
  '/2023/06/20/course-review/',
  '/2023/12/25/course-review/',
  '/2024/06/10/course-review/',
  '/2025/01/15/course-review/',
  '/2025/07/27/course-review/',
  '/2026/03/07/course-review/',
  '/2026/06/30/course-review/',
];

function homePagePaths() {
  return [path.join(root, '_site', 'index.html')]
    .concat(fs.readdirSync(path.join(root, '_site'))
      .filter((entry) => /^page\d+$/.test(entry))
      .sort((a, b) => Number(a.slice(4)) - Number(b.slice(4)))
      .map((entry) => path.join(root, '_site', entry, 'index.html')));
}

function previewCount(filename) {
  const html = fs.readFileSync(filename, 'utf8');
  return (html.match(/<div class="post-preview">/g) || []).length;
}

test.before(buildSite);

test('the generated page contains all current semester and course groups', () => {
  const html = generatedPage();
  const results = html.slice(
    html.indexOf('<div class="course-review-results">'),
    html.indexOf('<div id="course-review-empty"')
  );
  assert.equal((html.match(/class="course-semester"/g) || []).length, 10);
  assert.equal((html.match(/data-course-school="nthu"/g) || []).length, 2);
  assert.equal((html.match(/data-course-school="ntu"/g) || []).length, 8);
  assert.equal((results.match(/<h3(?:\s|>)/g) || []).length, 57);
});

test('the page exposes Chinese accessible filter controls and fallback content', () => {
  const html = generatedPage();
  for (const id of ['course-search', 'course-school', 'course-semester', 'course-clear']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /role="status"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /data-course-reviews/);
  assert.match(html, /搜尋課程或授課教師/);
  assert.match(html, /輸入課程或教師名稱/);
  assert.match(html, />學校<\/label>/);
  assert.match(html, />全部學校<\/option>/);
  assert.match(html, />學期<\/label>/);
  assert.match(html, />全部學期<\/option>/);
  assert.match(html, /清除篩選條件/);
  assert.match(html, /沒有符合目前搜尋與篩選條件的課程/);
  assert.match(html, /記憶體與儲存系統/);
});

test('semester options include Gregorian and ROC academic terms', () => {
  const html = generatedPage();
  assert.match(html, /2021 秋季 \(110-1\)/);
  assert.match(html, /2022 春季 \(110-2\)/);
  assert.match(html, /2026 春季 \(114-2\)/);
});

test('the navigation links to the new page', () => {
  assert.match(generatedPage(), /href="\/course-reviews\/"[^>]*>Course Reviews<\/a>/);
});

test('Home pagination contains only regular posts in groups of 10', () => {
  const pages = homePagePaths();
  assert.equal(pages.length, 1);
  assert.equal(previewCount(pages[0]), 8);

  for (const [index, filename] of pages.entries()) {
    const html = fs.readFileSync(filename, 'utf8');
    for (const url of reviewUrls) assert.doesNotMatch(html, new RegExp(`href="${url}"`));
    if (index < pages.length - 1) assert.equal(previewCount(filename), 10);
    else assert.ok(previewCount(filename) > 0 && previewCount(filename) <= 10);
  }
});

test('Archive lists regular posts and course reviews with the combined count', () => {
  const html = generated(path.join('archive', 'index.html'));
  assert.match(html, /Show All\s*<sup>18<\/sup>/);
  for (const url of reviewUrls) {
    assert.match(html, new RegExp(`href="${escapeRegExp(url)}"`));
  }
  assert.match(html, /data-encode="Course(?:\+|%20)Review"[\s\S]*?rel="10"/);
});

test('featured tags retain the Course Review link and count', () => {
  const html = generated('index.html');
  assert.match(html, /href="\/archive\/\?tag=Course(?:\+|%20)Review"[\s\S]*?rel="10">Course Review<\/a>/);
});

test('global search indexes regular posts and course reviews', () => {
  const entries = JSON.parse(generated('search.json'));
  assert.equal(entries.length, 18);
  const urls = new Set(entries.map((entry) => entry.url));
  for (const url of reviewUrls) assert.ok(urls.has(url), `search is missing ${url}`);
});

test('RSS publishes the newest 10 combined content items', () => {
  const xml = generated('feed.xml');
  assert.equal((xml.match(/<item>/g) || []).length, 10);
  assert.match(xml, /<link>https:\/\/joshuachen0213\.github\.io\/2026\/06\/30\/course-review\/<\/link>/);
});

test('sitemap retains every course-review URL', () => {
  const xml = generated('sitemap.xml');
  for (const url of reviewUrls) {
    assert.match(xml, new RegExp(`https://joshuachen0213\\.github\\.io${escapeRegExp(url)}`));
  }
});

test('all existing semester-review URLs are preserved', () => {
  for (const url of reviewUrls) {
    assert.ok(fs.existsSync(path.join(root, '_site', url, 'index.html')),
      `missing generated review URL ${url}`);
  }
});

test('the generated page loads the progressive enhancement script', () => {
  assert.match(generatedPage(), /<script src="\/js\/course-reviews\.js" defer><\/script>/);
  assert.ok(fs.existsSync(path.join(root, '_site', 'js', 'course-reviews.js')));
});

test('the generated page loads the site MathJax integration for review formulas', () => {
  const html = generatedPage();
  assert.match(html, /<script type="text\/x-mathjax-config">/);
  assert.match(html, /MathJax\.js\?config=TeX-AMS-MML_SVG/);
});

test('the compiled styles contain the course review components', () => {
  const css = fs.readFileSync(path.join(root, 'css', 'hux-blog.css'), 'utf8');
  assert.match(css, /\.course-review-filters\s*\{/);
  assert.match(css, /\.course-review-empty\s*\{/);
});
