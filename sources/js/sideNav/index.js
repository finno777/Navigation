/* global $ */
(() => {
    function initializeDropdowns() {
        $(document).on('click', '.side-nav .dropdown__button', function () {
            const currentVisibility = $(this).parent('.dropdown').hasClass('active');
            $('.dropdown').removeClass('active');
            if (!currentVisibility) {
                const $dropdown = $(this).parent('.dropdown');
                $dropdown.addClass('active');
                if ($dropdown.hasClass('dropdown--fixed')) {
                    const $dropdownMenu = $(this).siblings('.dropdown__menu');
                    const buttonOffset = this.getBoundingClientRect();
                    $dropdownMenu.css('top', `${buttonOffset.top}px`);
                    $dropdownMenu.css('right', `${$(window).width() - buttonOffset.right}px`);
                }
            }
        });
        $(document).on('mouseup', e => {
            const $dropdown = $('.side-nav .dropdown');
            if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) {
                $dropdown.removeClass('active');
            }
        });
        $(window).on('scroll resize orientationchange', function () {
            const $dropdown = $('.side-nav .dropdown--fixed');
            $dropdown.removeClass('active');
        });
    }

    function initializeSelects() {
        $('.js-pagesToShow').selectmenu();
    }

    function initializeTogglers() {
        $(document).on('click', '.side-nav .toggler__button', function () {
            const currentVisibility = $(this).parent('.toggler').hasClass('active');
            $('.toggler').removeClass('active');

            if (!currentVisibility) {
                const $toggler = $(this).parent('.toggler');
                $toggler.addClass('active');

                if ($toggler.hasClass('toggler--resizable') || $toggler.hasClass('toggler--as_list')) {
                    const $togglerMenu = $(this).siblings('.toggler__menu');
                    const selectedItemIdx = +$(this).attr('data-toggler-selected_idx');
                    const togglerOffset = -(selectedItemIdx * 62);
                    $togglerMenu.css('top', `${togglerOffset}px`);
                }
            }
        });

        $(document).on('click', '.side-nav .toggler__item', function () {
            const $tab = $(this);
            const tabIdx = $tab.index();
            const currentTabTitle = $tab.find('span').text();

            if (!$tab.hasClass('toggler__item--disabled') &&
                !$tab.hasClass('toggler__item--current')) {
                const $tabBtn = $tab.closest('.toggler').find('.toggler__button');

                $('.toggler__item--current').removeClass('toggler__item--current');
                $tab.addClass('toggler__item--current');

                // update info in button:: index and title
                $tabBtn.attr('data-toggler-selected_idx', tabIdx);
                $tabBtn.text(currentTabTitle);

                // remove active class
                $tab.closest('.toggler').removeClass('active');
            }
        });

        $(document).on('mouseup', e => {
            const $toggler = $('.side-nav .toggler');
            if (!$toggler.is(e.target) && $toggler.has(e.target).length === 0) {
                $toggler.removeClass('active');
            }
        });

        $(window).on('scroll resize orientationchange', () => {
            const $toggler = $('.side-nav .toggler');
            const $togglerMenu = $toggler.find('.toggler__menu');
            $toggler.removeClass('active');
            $togglerMenu.css('top', `0px`);
        });
    }

    function init() {
        initializeDropdowns();
        initializeSelects();
        initializeTogglers();
    }

    init();
})();
