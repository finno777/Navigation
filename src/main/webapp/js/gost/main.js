/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $ */
(function ($) {
    var $menuItem = $('.nav-menu__item');
    var easingClassName = 'easing';

    $menuItem.on('mouseenter mouseleave', function () {
        var target = $(this).children('.nav-menu__dropdown-container');
        target.addClass(easingClassName).on('transitionend webkitTransitionEnd oTransitionEnd', function () {
            target.removeClass(easingClassName);
        });
    });
})($);
//# sourceMappingURL=maps/main.js.map
