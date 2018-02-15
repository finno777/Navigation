/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $ */
/* eslint no-param-reassign: 0 */
/* eslint no-new: 0 */
(function () {
    function AddExternalPage($elem) {
        this.$elem = $elem;

        var that = this;
        var gostValidation = window.gostValidation;
        var $pageName = this.$elem.find('.js-pageName');
        var $pageLink = this.$elem.find('.js-pageLink');
        var $pageDesc = this.$elem.find('.js-pageDescription');
        var sideNav = window['sideNav' + $elem.closest('[data-appId]').attr('data-appId')];
        var savedExternalPage = null;

        var initAddExternalPage = function initAddExternalPage(page) {
            if (page) {
                $pageName.val(page.displayName);
                $pageDesc.val(page.description);
                $pageLink.val(page.uri);
                savedExternalPage = page;
            } else {
                $pageName.val('');
                $pageDesc.val('');
                $pageLink.val('');
                savedExternalPage = null;
            }
            gostValidation.setAllValid();
        };

        var fillExternalPageData = function fillExternalPageData() {
            var displayName = $pageName.val().trim();
            var link = $pageLink.val().trim();
            var description = $pageDesc.val().trim();

            return {
                name: null,
                displayName: displayName,
                description: description,
                uri: link,
                internal: false,
                nodeId: null,
                custom: true
            };
        };

        var validateExternalPage = function validateExternalPage(externalPage) {
            var selector = '[data-appId = "' + that.$elem.closest('[data-appId]').attr('data-appId') + '"] .js-sideNavAddExternalPage';
            var requiredFilled = gostValidation.validateRequiredValues(externalPage, selector);
            var suitableLengths = gostValidation.validateValuesLength(externalPage, selector);
            var validPattern = gostValidation.validatePattern(externalPage, selector);
            var isValid = requiredFilled && suitableLengths && validPattern;
            return isValid;
        };

        var addExternalPage = function addExternalPage() {
            var newPage = fillExternalPageData();
            var isValid = validateExternalPage(newPage);

            if (isValid) {
                if (savedExternalPage) {
                    sideNav.pages = sideNav.pages.map(function (page) {
                        if (page !== savedExternalPage) return page;

                        return newPage;
                    });

                    sideNav.groups.forEach(function (group) {
                        group.pages = group.pages.map(function (page) {
                            if (page !== savedExternalPage) return page;

                            return newPage;
                        });
                    });
                } else {
                    sideNav.pages.push(newPage);
                }

                that.$elem.dialog('close');
                sideNav.settings.render();
            }
        };

        this.init = function () {
            sideNav.addExternalPage = {
                init: initAddExternalPage,
                add: addExternalPage
            };
        };
        this.init();
    }

    $.fn.fnAddExternalPage = function () {
        $(this).each(function (index, elem) {
            new AddExternalPage($(elem));
        });
    };
    $('[data-appId]').each(function () {
        if (!window['sideNav' + $(this).attr('data-appId')]) return;

        $(this).find('.js-sideNavAddExternalPage').fnAddExternalPage();
    });
})();
//# sourceMappingURL=../maps/sideNav/add-external-page.js.map
