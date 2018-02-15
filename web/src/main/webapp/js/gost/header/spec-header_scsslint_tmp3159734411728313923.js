/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $, navUriChangeTheme */

$(document).on('click', '.special-header-section .dropdown__button', function () {
    var currentVisibility = $(this).parent('.dropdown').hasClass('active');
    $('.dropdown').removeClass('active');

    if (!currentVisibility) {
        $(this).parent('.dropdown').addClass('active');
    }
});

function changeTheme(options) {
    var themeName = String(options.font + '-' + options.bg + '-' + options.img);
    location.replace(navUriChangeTheme + '&theme=' + themeName);
}

function findPath() {
    var pathName = location.pathname;
    pathName = pathName.match(/&theme=[A-Z-0-9]+/i);

    if (pathName === null) {
        pathName = ['low', 'black', 'show'];
    } else {
        pathName[0].replace('&theme=', '');
        pathName = pathName.split('-');
    }

    var font = pathName[0];
    var bg = pathName[1];
    var img = pathName[2];

    var currentThemeOptions = {
        font: font,
        bg: bg,
        img: img
    };

    $('.special-header-section__list_fonts li').on('click', function (e) {
        e.preventDefault();
        font = $(this).data('font');
        currentThemeOptions.font = font;

        changeTheme(currentThemeOptions);
    });

    $('.special-header-section__list_background li').on('click', function (e) {
        e.preventDefault();
        bg = $(this).data('bg');
        currentThemeOptions.bg = bg;

        changeTheme(currentThemeOptions);
    });

    $('.special-header-section__list_img li').on('click', function (e) {
        e.preventDefault();
        img = $(this).data('img');
        currentThemeOptions.img = img;

        changeTheme(currentThemeOptions);
    });
}

findPath();
//# sourceMappingURL=../maps/header/spec-header_scsslint_tmp3159734411728313923.js.map
