const assert = require('node:assert/strict');
const test = require('node:test');

const {
  normalizeText,
  valueAfterLabel,
  emptyFilters,
  courseMatches,
  initialize,
} = require('../js/course-reviews');

const operatingSystems = {
  name: '作業系統(OS)',
  professor: '施吉昇',
  school: 'ntu',
  semester: '2024-spring',
};

function eventTarget(properties = {}) {
  const listeners = new Map();
  return {
    ...properties,
    listeners,
    addEventListener(type, listener) {
      const registered = listeners.get(type) || [];
      registered.push(listener);
      listeners.set(type, registered);
    },
    dispatch(type, event) {
      for (const listener of listeners.get(type) || []) listener(event);
    },
  };
}

function successfulPage() {
  const createdElements = [];
  const metadataList = {
    nodeType: 1,
    children: [
      { textContent: '學分：3 學分' },
      { textContent: '授課教師：施吉昇' },
      { textContent: '學期成績：A+' },
    ],
    nextSibling: null,
    matches: () => false,
    insertBefore(child) {
      this.children.unshift(child);
    },
  };
  const heading = eventTarget({
    id: 'operating-systems',
    textContent: 'Operating Systems',
    nextSibling: metadataList,
    insertAdjacentElement() {},
  });
  const body = {
    insertBefore() {},
    querySelector: () => null,
    querySelectorAll: () => [heading],
  };
  heading.parentNode = body;

  const group = {
    dataset: {
      courseSchool: 'ntu',
      courseSchoolLabel: '臺灣大學',
      courseSemester: '2024-spring',
      courseSemesterLabel: '2024 春季 (112-2)',
    },
    hidden: false,
    querySelector: (selector) => selector === '.course-semester__content' ? body : null,
  };
  const form = eventTarget();
  const search = eventTarget({ value: '' });
  const school = eventTarget({ value: 'all' });
  const semester = eventTarget({ value: 'all' });
  const clear = eventTarget({ disabled: true });
  const status = { textContent: '' };
  const empty = { hidden: true };
  const emptyReset = eventTarget();
  const controls = new Map([
    ['#course-review-filters', form],
    ['#course-search', search],
    ['#course-school', school],
    ['#course-semester', semester],
    ['#course-clear', clear],
    ['#course-review-status', status],
    ['#course-review-empty', empty],
    ['[data-course-reset]', emptyReset],
  ]);
  const root = {
    classList: { add() {} },
    querySelector: (selector) => controls.get(selector) || null,
    querySelectorAll: () => [group],
  };
  const document = {
    querySelector: () => root,
    createElement(tagName) {
      const children = [];
      const element = {
        tagName,
        children,
        hidden: false,
        appendChild(child) {
          children.push(child);
          if (child === heading) heading.parentNode = this;
        },
        querySelector(selector) {
          if (selector === 'h3') return heading;
          if (selector === ':scope > ul' || selector === 'ul') return metadataList;
          return null;
        },
      };
      createdElements.push(element);
      return element;
    },
  };

  return {
    document,
    root,
    group,
    form,
    search,
    school,
    semester,
    status,
    createdElements,
    metadataList,
  };
}

test('normalization is case-insensitive and collapses whitespace', () => {
  assert.equal(normalizeText('  Advanced   NLP  '), 'advanced nlp');
});

test('labeled metadata extraction returns the value or an empty string', () => {
  const values = ['學分：3 學分', '授課教師：張原豪', '學期成績：A+'];
  assert.equal(valueAfterLabel(values, '授課教師'), '張原豪');
  assert.equal(valueAfterLabel(values, '未知欄位'), '');
});

test('metadata extraction tolerates full-width and missing values', () => {
  const values = ['學分：２ 學分', '授課教師：', '學期成績：A'];
  assert.equal(valueAfterLabel(values, '學分'), '２ 學分');
  assert.equal(valueAfterLabel(values, '授課教師'), '');
});

test('empty filters match every course', () => {
  assert.equal(courseMatches(operatingSystems, emptyFilters()), true);
});

test('search matches course names and professor names', () => {
  assert.equal(courseMatches(operatingSystems, { ...emptyFilters(), query: 'os' }), true);
  assert.equal(courseMatches(operatingSystems, { ...emptyFilters(), query: '施吉昇' }), true);
  assert.equal(courseMatches(operatingSystems, { ...emptyFilters(), query: 'review text' }), false);
});

test('school and semester filters compose with AND semantics', () => {
  assert.equal(courseMatches(operatingSystems, {
    query: '施吉昇',
    school: 'ntu',
    semester: '2024-spring',
  }), true);
  assert.equal(courseMatches(operatingSystems, {
    query: '施吉昇',
    school: 'nthu',
    semester: '2024-spring',
  }), false);
  assert.equal(courseMatches(operatingSystems, {
    query: '',
    school: 'ntu',
    semester: '2025-fall',
  }), false);
});

test('missing professor metadata does not prevent a course-name match', () => {
  const course = { ...operatingSystems, professor: '' };
  assert.equal(courseMatches(course, { ...emptyFilters(), query: '作業系統' }), true);
});

test('initialize safely returns null without the course reviews root', () => {
  const documentWithoutPage = { querySelector: () => null };
  assert.equal(initialize(documentWithoutPage), null);
});

test('initialize exposes the empty state without enhancing pages that contain no courses', () => {
  const embeddedTitle = { hidden: false };
  const body = {
    querySelector: (selector) => selector === ':scope > h1' ? embeddedTitle : null,
    querySelectorAll: () => [],
  };
  const group = {
    querySelector: (selector) => selector === '.course-semester__content' ? body : null,
  };
  const clear = { disabled: false };
  const status = { textContent: '顯示全部課程心得' };
  const empty = { hidden: true };
  const controls = new Map([
    ['#course-review-filters', {}],
    ['#course-search', {}],
    ['#course-school', {}],
    ['#course-semester', {}],
    ['#course-clear', clear],
    ['#course-review-status', status],
    ['#course-review-empty', empty],
    ['[data-course-reset]', {}],
  ]);
  const root = {
    querySelector: (selector) => controls.get(selector) || null,
    querySelectorAll: () => [group],
  };
  const documentWithoutCourses = { querySelector: () => root };

  assert.equal(initialize(documentWithoutCourses), null);
  assert.equal(embeddedTitle.hidden, false);
  assert.equal(root.__courseReviewsController, undefined);
  assert.equal(status.textContent, '顯示 0 / 0 門課程');
  assert.equal(empty.hidden, false);
  assert.equal(clear.disabled, true);
});

test('initialize returns a cached controller without rediscovering the page', () => {
  const cachedController = { courses: [] };
  const root = {
    __courseReviewsController: cachedController,
    querySelector: () => {
      throw new Error('cached initialization should not query controls');
    },
  };

  assert.equal(initialize({ querySelector: () => root }), cachedController);
});

test('submitting initialized filters prevents navigation and reapplies current values', () => {
  const page = successfulPage();
  const controller = initialize(page.document);
  assert.ok(controller);

  page.search.value = 'no matching course';
  const submitEvent = {
    defaultPrevented: false,
    preventDefault() { this.defaultPrevented = true; },
  };
  page.form.dispatch('submit', submitEvent);

  assert.equal(submitEvent.defaultPrevented, true);
  assert.equal(page.search.value, 'no matching course');
  assert.equal(page.school.value, 'all');
  assert.equal(page.semester.value, 'all');
  assert.equal(controller.courses[0].element.hidden, true);
  assert.equal(page.group.hidden, true);
  assert.equal(page.status.textContent, '顯示 0 / 1 門課程');
  assert.equal(initialize(page.document), controller);
  assert.equal(page.form.listeners.get('submit').length, 1);
});

test('enhancement prepends the semester to the existing metadata bullets', () => {
  const page = successfulPage();
  initialize(page.document);

  assert.deepEqual(page.metadataList.children.map((item) => item.textContent), [
    '學期：2024 春季 (112-2)',
    '學分：3 學分',
    '授課教師：施吉昇',
    '學期成績：A+',
  ]);
  assert.equal(page.createdElements.some((element) => element.tagName === 'dl'), false);
});
