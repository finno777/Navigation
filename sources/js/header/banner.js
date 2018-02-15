/* global $, eXo, headerConstants */

function initializeHamburger() {
    const $hamburgerButton = $('.hamburger');
    $hamburgerButton.on('click', () => {
        const $menu = $('.nav-menu__wrap');
        $menu.slideToggle();
        $('.main-header').toggleClass('open');
    });
}

function initializeDropdowns() {
    $(document).on('click', '.main-banner .dropdown__button', e => {
        const currentVisibility = $(e.currentTarget).parent('.dropdown').hasClass('active');
        $('.dropdown').removeClass('active');

        if (!currentVisibility) {
            $(e.currentTarget).parent('.dropdown').addClass('active');
        }
    });

    $(document).on('mouseup', ev => {
        const $dropdown = $('.main-banner .dropdown');
        if (!$dropdown.is(ev.target) && $dropdown.has(ev.target).length === 0) {
            $dropdown.removeClass('active');
        }
    });
}

function preLogOut() {
    return new Promise((resolve, reject) => {
        $.ajax({
            headers: headerConstants.adminsHeaders,
            type: 'GET',
            url: `/navigationRST/commons/logoutSSO.action?v=${new Date()}`,
            success: data => {
                resolve(data);
            },
            error: err => {
                reject(err);
            },
        });
    });
}

function initializeLogoutButton() {
    $('#logout').on('click', ev => {
        ev.preventDefault();
        preLogOut()
            .then(
                () => {
                    eXo.portal.logout();
                },
                err => {
                    console.error(err);
                });
    });
}

function initializeSearchInput() {
    const $header = $('.main-header');
    const $btnClose = $('.js-head-search-close');
    const $overlay = $('<div/>').addClass('overlay-bg').appendTo($header);

    $('body').on('click', '.js-head-search-btn', e => {
        e.preventDefault();
        if ($(window).width() >= 800) {
            $header.addClass('main-header--open-search');
            $overlay.show();
        }

        return false;
    });

    $overlay.on('click', () => {
        $header.removeClass('main-header--open-search');
        $overlay.hide();
    });

    $btnClose.on('click', e => {
        e.preventDefault();
        $header.removeClass('main-header--open-search');
        $overlay.hide();
    });
}

initializeDropdowns();
initializeLogoutButton();
initializeHamburger();
initializeSearchInput();
