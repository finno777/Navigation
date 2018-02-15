/* global */

require(['SHARED/jquery'], function ($) {
    $(document).ready(() => {
        $('body').on('click', '.js-map-acco-btn', function (e) {
            $(e.currentTarget).parent('.js-map-acco').toggleClass('active');
        });
    });
});
