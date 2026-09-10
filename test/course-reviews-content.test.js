const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const reviewsDirectory = path.join(root, '_course_reviews');
const oldReviewsDirectory = path.join(root, '_posts', 'course');
const cases = [
  ['2022-01-17-course-review.md', '2022-01-17', '/2022/01/17/course-review/', 'nthu', '清華大學', '2021-fall', '2021 秋季 (110-1)'],
  ['2022-06-20-course-review.md', '2022-06-20', '/2022/06/20/course-review/', 'nthu', '清華大學', '2022-spring', '2022 春季 (110-2)'],
  ['2022-12-26-course-review.md', '2022-12-26', '/2022/12/26/course-review/', 'ntu', '臺灣大學', '2022-fall', '2022 秋季 (111-1)'],
  ['2023-06-20-course-review.md', '2023-06-20', '/2023/06/20/course-review/', 'ntu', '臺灣大學', '2023-spring', '2023 春季 (111-2)'],
  ['2023-12-25-course-review.md', '2023-12-25', '/2023/12/25/course-review/', 'ntu', '臺灣大學', '2023-fall', '2023 秋季 (112-1)'],
  ['2024-06-10-course-review.md', '2024-06-10', '/2024/06/10/course-review/', 'ntu', '臺灣大學', '2024-spring', '2024 春季 (112-2)'],
  ['2025-01-15-course-review.md', '2025-01-15', '/2025/01/15/course-review/', 'ntu', '臺灣大學', '2024-fall', '2024 秋季 (113-1)'],
  ['2025-07-27-course-review.md', '2025-07-27', '/2025/07/27/course-review/', 'ntu', '臺灣大學', '2025-spring', '2025 春季 (113-2)'],
  ['2026-03-07-course-review.md', '2026-03-07', '/2026/03/07/course-review/', 'ntu', '臺灣大學', '2025-fall', '2025 秋季 (114-1)'],
  ['2026-06-30-course-review.md', '2026-06-30', '/2026/06/30/course-review/', 'ntu', '臺灣大學', '2026-spring', '2026 春季 (114-2)'],
];

function readReview(filename) {
  return fs.readFileSync(path.join(reviewsDirectory, filename), 'utf8');
}

function frontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, 'post must have YAML front matter');
  return match[1];
}

function field(yaml, name) {
  const match = yaml.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
}

test('all course reviews declare stable collection metadata', () => {
  for (const [filename, date, permalink, school, schoolLabel, semester, semesterLabel] of cases) {
    const yaml = frontMatter(readReview(filename));
    assert.equal(field(yaml, 'date'), date, filename);
    assert.equal(field(yaml, 'permalink'), permalink, filename);
    assert.equal(field(yaml, 'course_school'), school, filename);
    assert.equal(field(yaml, 'course_school_label'), schoolLabel, filename);
    assert.equal(field(yaml, 'course_semester'), semester, filename);
    assert.equal(field(yaml, 'course_semester_label'), semesterLabel, filename);
  }
});

test('the course review collection owns all semester reviews', () => {
  const files = fs.readdirSync(reviewsDirectory).filter((name) => name.endsWith('.md'));
  const oldFiles = fs.existsSync(oldReviewsDirectory)
    ? fs.readdirSync(oldReviewsDirectory).filter((name) => name.endsWith('.md'))
    : [];

  assert.equal(files.length, 10);
  assert.equal(oldFiles.length, 0);
});

test('the current inventory has 10 semester posts and 57 courses', () => {
  const files = fs.readdirSync(reviewsDirectory).filter((name) => name.endsWith('.md'));
  const courseCount = files.reduce((total, filename) => {
    return total + (readReview(filename).match(/^### /gm) || []).length;
  }, 0);

  assert.equal(files.length, 10);
  assert.equal(courseCount, 57);
});
