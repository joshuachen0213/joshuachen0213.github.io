(function courseReviewsModule(root, factory) {
  var api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.CourseReviews = api;
    if (root.document && root.document.readyState === 'loading') {
      root.document.addEventListener('DOMContentLoaded', function initializePage() {
        api.initialize(root.document);
      });
    } else if (root.document) {
      api.initialize(root.document);
    }
  }
})(typeof window !== 'undefined' ? window : null, function createCourseReviews() {
  'use strict';

  function normalizeText(value) {
    var text = String(value == null ? '' : value);
    if (typeof text.normalize === 'function') {
      text = text.normalize('NFKC');
    }
    return text.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  function valueAfterLabel(values, label) {
    var prefix = normalizeText(label + '：');
    var match = values.find(function findValue(value) {
      return normalizeText(value).indexOf(prefix) === 0;
    });

    if (!match) return '';
    var separator = match.indexOf('：');
    return separator === -1 ? '' : match.slice(separator + 1).trim();
  }

  function emptyFilters() {
    return { query: '', school: 'all', semester: 'all' };
  }

  function courseMatches(course, filters) {
    var query = normalizeText(filters.query);
    var searchIndex = normalizeText(course.name + ' ' + course.professor);
    var queryMatches = !query || searchIndex.indexOf(query) !== -1;
    var schoolMatches = filters.school === 'all' || course.school === filters.school;
    var semesterMatches = filters.semester === 'all' || course.semester === filters.semester;
    return queryMatches && schoolMatches && semesterMatches;
  }

  function directMetadataTexts(article) {
    var list = article.querySelector(':scope > ul') || article.querySelector('ul');
    if (!list) return [];
    return Array.prototype.map.call(list.children, function listItemText(item) {
      return item.textContent.trim();
    });
  }

  function prependSemesterMetadata(document, article, course) {
    var list = article.querySelector(':scope > ul') || article.querySelector('ul');
    if (!list) return;
    var item = document.createElement('li');
    item.textContent = '學期：' + course.semesterLabel;
    list.insertBefore(item, list.firstChild);
  }

  function wrapCourse(document, group, heading, index) {
    var body = heading.parentNode;
    var article = document.createElement('article');
    article.className = 'course-review';
    body.insertBefore(article, heading);

    var cursor = heading;
    while (cursor) {
      var next = cursor.nextSibling;
      article.appendChild(cursor);
      cursor = next;
      if (cursor && cursor.nodeType === 1 && cursor.matches('h3')) break;
    }

    var semester = group.dataset.courseSemester;
    var originalId = heading.id || String(index + 1);
    heading.id = 'course-' + semester + '-' + originalId;

    var values = directMetadataTexts(article);
    var course = {
      element: article,
      group: group,
      name: heading.textContent.trim(),
      professor: valueAfterLabel(values, '授課教師'),
      school: group.dataset.courseSchool,
      semester: semester,
      semesterLabel: group.dataset.courseSemesterLabel,
    };

    prependSemesterMetadata(document, article, course);
    return course;
  }

  function discoverCourses(document, group) {
    var body = group.querySelector('.course-semester__content');
    if (!body) return [];
    var headings = Array.prototype.slice.call(body.querySelectorAll(':scope > h3'));
    if (!headings.length) return [];
    var embeddedTitle = body.querySelector(':scope > h1');
    if (embeddedTitle) embeddedTitle.hidden = true;
    return headings.map(function createCourse(heading, index) {
      return wrapCourse(document, group, heading, index);
    });
  }

  function initialize(document) {
    var root = document.querySelector('[data-course-reviews]');
    if (!root) return null;
    if (root.__courseReviewsController) return root.__courseReviewsController;

    var form = root.querySelector('#course-review-filters');
    var search = root.querySelector('#course-search');
    var school = root.querySelector('#course-school');
    var semester = root.querySelector('#course-semester');
    var clear = root.querySelector('#course-clear');
    var status = root.querySelector('#course-review-status');
    var empty = root.querySelector('#course-review-empty');
    var emptyReset = root.querySelector('[data-course-reset]');
    var controls = [form, search, school, semester, clear, status, empty, emptyReset];
    if (controls.some(function missing(control) { return !control; })) return null;

    var groups = Array.prototype.slice.call(root.querySelectorAll('.course-semester'));
    var courses = groups.reduce(function collect(all, group) {
      return all.concat(discoverCourses(document, group));
    }, []);
    if (!courses.length) {
      status.textContent = '顯示 0 / 0 門課程';
      empty.hidden = false;
      clear.disabled = true;
      return null;
    }

    function currentFilters() {
      return { query: search.value, school: school.value, semester: semester.value };
    }

    function applyFilters() {
      var filters = currentFilters();
      var visibleCount = 0;

      courses.forEach(function updateCourse(course) {
        var visible = courseMatches(course, filters);
        course.element.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      groups.forEach(function updateGroup(group) {
        var groupHasMatch = courses.some(function visibleInGroup(course) {
          return course.group === group && !course.element.hidden;
        });
        group.hidden = !groupHasMatch;
      });

      status.textContent = '顯示 ' + visibleCount + ' / ' + courses.length + ' 門課程';
      empty.hidden = visibleCount !== 0;
      clear.disabled = !filters.query && filters.school === 'all' && filters.semester === 'all';
    }

    function resetFilters() {
      var defaults = emptyFilters();
      search.value = defaults.query;
      school.value = defaults.school;
      semester.value = defaults.semester;
      applyFilters();
      search.focus();
    }

    search.addEventListener('input', applyFilters);
    school.addEventListener('change', applyFilters);
    semester.addEventListener('change', applyFilters);
    form.addEventListener('submit', function submitFilters(event) {
      event.preventDefault();
      applyFilters();
    });
    clear.addEventListener('click', resetFilters);
    emptyReset.addEventListener('click', resetFilters);
    root.classList.add('course-reviews--enhanced');
    applyFilters();

    var controller = {
      courses: courses,
      applyFilters: applyFilters,
      resetFilters: resetFilters,
    };
    root.__courseReviewsController = controller;
    return controller;
  }

  return {
    normalizeText: normalizeText,
    valueAfterLabel: valueAfterLabel,
    emptyFilters: emptyFilters,
    courseMatches: courseMatches,
    initialize: initialize,
  };
});
