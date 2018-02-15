/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $, currentTheme */

function handleScrollHeader() {
    var bannerHeight = $('.main-banner__wrap').outerHeight();
    var menuHeight = $('.nav-menu__wrap').outerHeight();

    if ($(window).scrollTop() > bannerHeight) {
        $('.main-header').addClass('main-header--sticky');
        $('.main-header').css('padding-bottom', menuHeight + 'px');
    } else {
        $('.main-header').removeClass('main-header--sticky');
        $('.main-header').css('padding-bottom', '0');
    }
}

function unbindHandlers() {
    $(window).off('scroll', handleScrollHeader);
    $('.nav-menu__item').children('a').off('click');
    $('.nav-menu__item').off('click');
}

function initializeTopMenu() {
    $(window).on('scroll', handleScrollHeader);
}

function clearMobileMenuSelection() {
    $('.nav-menu__dropdown-container').slideUp();
    $('.nav-menu__item > .active').removeClass('active');
}

function initializeMobileMenu() {
    var $menuItem = $('.nav-menu__item');

    // $menuItem.off('mouseenter mouseleave');

    $menuItem.children('a').on('click', function (ev) {
        return ev.preventDefault();
    });

    $menuItem.on('click', function (ev) {
        var $currentDropdown = $(ev.currentTarget).children('.nav-menu__dropdown-container');
        var currentVisibility = $currentDropdown.is(':visible');

        clearMobileMenuSelection();

        if (!currentVisibility) {
            $currentDropdown.slideDown();
            $currentDropdown.prev().addClass('active');
        } else {
            $currentDropdown.blur();
        }
    });
}

function initializeMenu() {
    unbindHandlers();

    var mobileBreakPoint = 1200;
    if (window.matchMedia('(min-width: ' + mobileBreakPoint + 'px)').matches && currentTheme === 'gost') {
        initializeTopMenu();
    } else if (window.matchMedia('(min-width: ' + mobileBreakPoint + 'px)').matches && currentTheme !== 'gost') {
        //
    } else {
        initializeMobileMenu();
    }
}

initializeMenu();
$(window).on('resize', initializeMenu);
//# sourceMappingURL=../maps/header/menu.js.map
