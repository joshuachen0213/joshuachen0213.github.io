$(document).ready(function () {
  $("table").wrap("<div class='table-responsive'></div>"),
    $("table").addClass("table");
}),
  $(document).ready(function () {
    $('iframe[src*="youtube.com"]').wrap(
      '<div class="embed-responsive embed-responsive-16by9"></div>'
    ),
      $('iframe[src*="youtube.com"]').addClass("embed-responsive-item"),
      $('iframe[src*="vimeo.com"]').wrap(
        '<div class="embed-responsive embed-responsive-16by9"></div>'
      ),
      $('iframe[src*="vimeo.com"]').addClass("embed-responsive-item");
  }),
  jQuery(document).ready(function (i) {
    var a, o;
    1170 < i(window).width() &&
      ((a = i(".navbar-custom").height()),
      (o = i(".intro-header .container").height()),
      i(window).on("scroll", { previousTop: 0 }, function () {
        var s = i(window).scrollTop(),
          e = i(".side-catalog");
        s < this.previousTop
          ? 0 < s && i(".navbar-custom").hasClass("is-fixed")
            ? i(".navbar-custom").addClass("is-visible")
            : i(".navbar-custom").removeClass("is-visible is-fixed")
          : (i(".navbar-custom").removeClass("is-visible"),
            a < s &&
              !i(".navbar-custom").hasClass("is-fixed") &&
              i(".navbar-custom").addClass("is-fixed")),
          (this.previousTop = s),
          e.show(),
          o + 41 < s ? e.addClass("fixed") : e.removeClass("fixed");
      }));
  });
