(function ($) {
  "use strict";

  $.fn.ensureVisible = function (callback) {
    var $this = $(this).first();
    var $parent = $this.parent();
    var scrollTop = $parent.scrollTop();
    var parentTop = $parent.offset().top;
    var elementTop = $this.offset().top;

    // Calculate the scroll position relative to the top of the parent
    var scrollTo = scrollTop + (elementTop - parentTop);
    console.log(scrollTo);

    // Scroll the parent container to make the selected element appear at the top
    $parent.animate(
      {
        scrollTop: scrollTo,
      },
      200,
      callback
    );

    // var $this = $(this).first();
    // var $parent = $this.parent();
    // var scrollTop = $parent.scrollTop();
    // var scrollBottom = scrollTop + $parent.innerHeight();
    // var marginTop = parseInt($this.css('margin-top'));
    // var marginBottom = parseInt($this.css('margin-bottom'));
    // var top = $this.position().top + scrollTop + marginTop;
    // var bottom = top + $this.outerHeight();
    // var newPosition = null;

    // if (scrollTop > top - marginTop) {
    //   newPosition = {scrollTop: top - marginTop};
    // } else if (scrollBottom < bottom + marginBottom) {
    //   newPosition = {scrollTop: bottom - $parent.innerHeight() + marginBottom};
    // }

    // if (newPosition) {
    //   $parent.animate(newPosition, {
    //     duration: 200,
    //     done: callback.bind(this)
    //   });
    // } else {
    //   setTimeout(callback.bind(this));
    // }

    return this;
  };

  $.fn.ensureVisibleHorizontal = function (callback) {
    var $this = $(this).first();
    var $parent = $this.parent();
    var scrollLeft = $parent.scrollLeft();
    var parentLeft = $parent.offset().left;
    var elementLeft = $this.offset().left;
    var parentWidth = $parent.width();
    var elementWidth = $this.width();

    // Calculate the scroll position relative to the left of the parent
    var scrollTo = scrollLeft + (elementLeft - parentLeft);

    // Calculate the maximum scroll position to keep the element fully visible
    var maxScroll =
      scrollLeft + (elementLeft + elementWidth - parentLeft - parentWidth);

    // Check if the element is fully visible to the right of the parent
    if (scrollTo > maxScroll) {
      scrollTo = maxScroll;
    }

    // Scroll the parent container to make the selected element appear at the left
    $parent.animate(
      {
        scrollLeft: scrollTo,
      },
      200,
      callback
    );
  };
})(jQuery);
