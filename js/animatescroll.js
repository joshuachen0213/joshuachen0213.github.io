/* Coded by Ramswaroop */
(function (e) {
  e.easing["jswing"] = e.easing["swing"];
  e.extend(e.easing, {
    def: "easeOutQuad",
    swing: function (t, n, r, i, s) {
      return e.easing[e.easing.def](t, n, r, i, s);
    },
    easeInQuad: function (e, t, n, r, i) {
      return r * (t /= i) * t + n;
    },
    easeOutQuad: function (e, t, n, r, i) {
      return -r * (t /= i) * (t - 2) + n;
    },
    easeInOutQuad: function (e, t, n, r, i) {
      if ((t /= i / 2) < 1) return (r / 2) * t * t + n;
      return (-r / 2) * (--t * (t - 2) - 1) + n;
    },
    easeInCubic: function (e, t, n, r, i) {
      return r * (t /= i) * t * t + n;
    },
    easeOutCubic: function (e, t, n, r, i) {
      return r * ((t = t / i - 1) * t * t + 1) + n;
    },
    easeInOutCubic: function (e, t, n, r, i) {
      if ((t /= i / 2) < 1) return (r / 2) * t * t * t + n;
      return (r / 2) * ((t -= 2) * t * t + 2) + n;
    },
    easeInQuart: function (e, t, n, r, i) {
      return r * (t /= i) * t * t * t + n;
    },
    easeOutQuart: function (e, t, n, r, i) {
      return -r * ((t = t / i - 1) * t * t * t - 1) + n;
    },
    easeInOutQuart: function (e, t, n, r, i) {
      if ((t /= i / 2) < 1) return (r / 2) * t * t * t * t + n;
      return (-r / 2) * ((t -= 2) * t * t * t - 2) + n;
    },
    easeInQuint: function (e, t, n, r, i) {
      return r * (t /= i) * t * t * t * t + n;
    },
    easeOutQuint: function (e, t, n, r, i) {
      return r * ((t = t / i - 1) * t * t * t * t + 1) + n;
    },
    easeInOutQuint: function (e, t, n, r, i) {
      if ((t /= i / 2) < 1) return (r / 2) * t * t * t * t * t + n;
      return (r / 2) * ((t -= 2) * t * t * t * t + 2) + n;
    },
    easeInSine: function (e, t, n, r, i) {
      return -r * Math.cos((t / i) * (Math.PI / 2)) + r + n;
    },
    easeOutSine: function (e, t, n, r, i) {
      return r * Math.sin((t / i) * (Math.PI / 2)) + n;
    },
    easeInOutSine: function (e, t, n, r, i) {
      return (-r / 2) * (Math.cos((Math.PI * t) / i) - 1) + n;
    },
    easeInExpo: function (e, t, n, r, i) {
      return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n;
    },
    easeOutExpo: function (e, t, n, r, i) {
      return t == i ? n + r : r * (-Math.pow(2, (-10 * t) / i) + 1) + n;
    },
    easeInOutExpo: function (e, t, n, r, i) {
      if (t == 0) return n;
      if (t == i) return n + r;
      if ((t /= i / 2) < 1) return (r / 2) * Math.pow(2, 10 * (t - 1)) + n;
      return (r / 2) * (-Math.pow(2, -10 * --t) + 2) + n;
    },
    easeInCirc: function (e, t, n, r, i) {
      return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n;
    },
    easeOutCirc: function (e, t, n, r, i) {
      return r * Math.sqrt(1 - (t = t / i - 1) * t) + n;
    },
    easeInOutCirc: function (e, t, n, r, i) {
      if ((t /= i / 2) < 1) return (-r / 2) * (Math.sqrt(1 - t * t) - 1) + n;
      return (r / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
    },
    easeInElastic: function (e, t, n, r, i) {
      var s = 1.70158;
      var o = 0;
      var u = r;
      if (t == 0) return n;
      if ((t /= i) == 1) return n + r;
      if (!o) o = i * 0.3;
      if (u < Math.abs(r)) {
        u = r;
        var s = o / 4;
      } else var s = (o / (2 * Math.PI)) * Math.asin(r / u);
      return (
        -(
          u *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * i - s) * 2 * Math.PI) / o)
        ) + n
      );
    },
    easeOutElastic: function (e, t, n, r, i) {
      var s = 1.70158;
      var o = 0;
      var u = r;
      if (t == 0) return n;
      if ((t /= i) == 1) return n + r;
      if (!o) o = i * 0.3;
      if (u < Math.abs(r)) {
        u = r;
        var s = o / 4;
      } else var s = (o / (2 * Math.PI)) * Math.asin(r / u);
      return (
        u * Math.pow(2, -10 * t) * Math.sin(((t * i - s) * 2 * Math.PI) / o) +
        r +
        n
      );
    },
    easeInOutElastic: function (e, t, n, r, i) {
      var s = 1.70158;
      var o = 0;
      var u = r;
      if (t == 0) return n;
      if ((t /= i / 2) == 2) return n + r;
      if (!o) o = i * 0.3 * 1.5;
      if (u < Math.abs(r)) {
        u = r;
        var s = o / 4;
      } else var s = (o / (2 * Math.PI)) * Math.asin(r / u);
      if (t < 1)
        return (
          -0.5 *
            u *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * i - s) * 2 * Math.PI) / o) +
          n
        );
      return (
        u *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin(((t * i - s) * 2 * Math.PI) / o) *
          0.5 +
        r +
        n
      );
    },
    easeInBack: function (e, t, n, r, i, s) {
      if (s == undefined) s = 1.70158;
      return r * (t /= i) * t * ((s + 1) * t - s) + n;
    },
    easeOutBack: function (e, t, n, r, i, s) {
      if (s == undefined) s = 1.70158;
      return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n;
    },
    easeInOutBack: function (e, t, n, r, i, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= i / 2) < 1)
        return (r / 2) * t * t * (((s *= 1.525) + 1) * t - s) + n;
      return (r / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n;
    },
    easeInBounce: function (t, n, r, i, s) {
      return i - e.easing.easeOutBounce(t, s - n, 0, i, s) + r;
    },
    easeOutBounce: function (e, t, n, r, i) {
      if ((t /= i) < 1 / 2.75) {
        return r * 7.5625 * t * t + n;
      } else if (t < 2 / 2.75) {
        return r * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + n;
      } else if (t < 2.5 / 2.75) {
        return r * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + n;
      } else {
        return r * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + n;
      }
    },
    easeInOutBounce: function (t, n, r, i, s) {
      if (n < s / 2) return e.easing.easeInBounce(t, n * 2, 0, i, s) * 0.5 + r;
      return e.easing.easeOutBounce(t, n * 2 - s, 0, i, s) * 0.5 + i * 0.5 + r;
    },
  });
  e.fn.animatescroll = function (t) {
    var n = e.extend({}, e.fn.animatescroll.defaults, t);
    if (typeof n.onScrollStart == "function") {
      n.onScrollStart.call(this);
    }
    if (n.element == "html,body") {
      var r = this.offset().top;
      e(n.element)
        .stop()
        .animate({ scrollTop: r - n.padding }, n.scrollSpeed, n.easing);
    } else {
      e(n.element)
        .stop()
        .animate(
          {
            scrollTop:
              this.offset().top -
              this.parent().offset().top +
              this.parent().scrollTop() -
              n.padding,
          },
          n.scrollSpeed,
          n.easing
        );
    }
    setTimeout(function () {
      if (typeof n.onScrollEnd == "function") {
        n.onScrollEnd.call(this);
      }
    }, n.scrollSpeed);
  };
  e.fn.animatescroll.defaults = {
    easing: "swing",
    scrollSpeed: 800,
    padding: 0,
    element: "html,body",
  };
})(jQuery);
