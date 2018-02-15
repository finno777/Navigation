/* global $, currentTheme */

function handleScrollHeader() {
    const bannerHeight = $('.main-banner__wrap').outerHeight();
    const menuHeight = $('.nav-menu__wrap').outerHeight();

    if ($(window).scrollTop() > bannerHeight) {
        $('.main-header').addClass('main-header--sticky');
        $('.main-header').css('padding-bottom', `${menuHeight}px`);
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
    const $menuItem = $('.nav-menu__item');

    // $menuItem.off('mouseenter mouseleave');

    $menuItem.children('a').on('click', ev => ev.preventDefault());

    $menuItem.on('click', ev => {
        const $currentDropdown = $(ev.currentTarget).children('.nav-menu__dropdown-container');
        const currentVisibility = $currentDropdown.is(':visible');

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

    const mobileBreakPoint = 1200;
    if (window.matchMedia(`(min-width: ${mobileBreakPoint}px)`).matches && currentTheme === 'gost') {
        initializeTopMenu();
    } else if (window.matchMedia(`(min-width: ${mobileBreakPoint}px)`).matches && currentTheme !== 'gost') {
      //
    } else {
        initializeMobileMenu();
    }
}

initializeMenu();
$(window).on('resize', initializeMenu);
