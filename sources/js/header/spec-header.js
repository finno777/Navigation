/* global $, navUriChangeTheme, currentTheme */


$('.spec-switcher').on('click', function (e) {
  e.stopPropagation();
});

$(document).on('click', '.special-header-section .dropdown__button', function () {
    const currentVisibility = $(this).parent('.dropdown').hasClass('active');
    $('.dropdown').removeClass('active');

    if (!currentVisibility) {
        $(this).parent('.dropdown').addClass('active');
    }
});
function changeTheme(options) {
    const themeName = String(`${options.font}-${options.bg}-${options.img}-${options.fontFamily}-${options.letterSpacing}`);
    location.replace(`${navUriChangeTheme}&theme=${themeName}`);
}
function findPath() {
    let pathName = currentTheme;
    pathName[0].replace('&theme=', '');
    pathName = pathName.split('-');

    let font = pathName[0];
    let bg = pathName[1];
    let img = pathName[2];
    let fontFamily = pathName[3];
    let letterSpacing = pathName[4];


    const currentThemeOptions = {
        font,
        bg,
        img,
        fontFamily,
        letterSpacing,
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

    $('.dropdown_font-family label').on('click', function (e) {
        e.preventDefault();
        fontFamily = $(this).data('font');
        currentThemeOptions.fontFamily = fontFamily;

        changeTheme(currentThemeOptions);
    });

    $('.dropdown__item_letter-spacing label').on('click', function (e) {
        e.preventDefault();
        letterSpacing = $(this).data('spacing');
        currentThemeOptions.letterSpacing = letterSpacing;

        changeTheme(currentThemeOptions);
    });
}

findPath();
