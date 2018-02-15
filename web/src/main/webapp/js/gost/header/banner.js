/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $, eXo, headerConstants */

function initializeHamburger() {
    var $hamburgerButton = $('.hamburger');
    $hamburgerButton.on('click', function () {
        var $menu = $('.nav-menu__wrap');
        $menu.slideToggle();
        $('.main-header').toggleClass('open');
    });
}

function initializeDropdowns() {
    $(document).on('click', '.main-banner .dropdown__button', function (e) {
        var currentVisibility = $(e.currentTarget).parent('.dropdown').hasClass('active');
        $('.dropdown').removeClass('active');

        if (!currentVisibility) {
            $(e.currentTarget).parent('.dropdown').addClass('active');
        }
    });

    $(document).on('mouseup', function (ev) {
        var $dropdown = $('.main-banner .dropdown');
        if (!$dropdown.is(ev.target) && $dropdown.has(ev.target).length === 0) {
            $dropdown.removeClass('active');
        }
    });
}

function preLogOut() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            headers: headerConstants.adminsHeaders,
            type: 'GET',
            url: '/navigationRST/commons/logoutSSO.action?v=' + new Date(),
            success: function success(data) {
                resolve(data);
            },
            error: function error(err) {
                reject(err);
            }
        });
    });
}

function initializeLogoutButton() {
    $('#logout').on('click', function (ev) {
        ev.preventDefault();
        preLogOut().then(function () {
            eXo.portal.logout();
        }, function (err) {
            console.error(err);
        });
    });
}

function initializeSearchInput() {
    var $header = $('.main-header');
    var $btnClose = $('.js-head-search-close');
    var $overlay = $('<div/>').addClass('overlay-bg').appendTo($header);

    $('body').on('click', '.js-head-search-btn', function (e) {
        e.preventDefault();
        if ($(window).width() >= 800) {
            $header.addClass('main-header--open-search');
            $overlay.show();
        }

        return false;
    });

    $overlay.on('click', function () {
        $header.removeClass('main-header--open-search');
        $overlay.hide();
    });

    $btnClose.on('click', function (e) {
        e.preventDefault();
        $header.removeClass('main-header--open-search');
        $overlay.hide();
    });
}

initializeDropdowns();
initializeLogoutButton();
initializeHamburger();
initializeSearchInput();
//# sourceMappingURL=../maps/header/banner.js.map
