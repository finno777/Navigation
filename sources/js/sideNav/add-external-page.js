/* global $ */
/* eslint no-param-reassign: 0 */
/* eslint no-new: 0 */
(() => {
    function AddExternalPage($elem) {
        this.$elem = $elem;

        const that = this;
        const gostValidation = window.gostValidation;
        const $pageName = this.$elem.find('.js-pageName');
        const $pageLink = this.$elem.find('.js-pageLink');
        const $pageDesc = this.$elem.find('.js-pageDescription');
        const sideNav = window[`sideNav${$elem.closest('[data-appId]').attr('data-appId')}`];
        let savedExternalPage = null;

        const initAddExternalPage = page => {
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

        const fillExternalPageData = () => {
            const displayName = $pageName.val().trim();
            const link = $pageLink.val().trim();
            const description = $pageDesc.val().trim();

            return {
                name: null,
                displayName,
                description,
                uri: link,
                internal: false,
                nodeId: null,
                custom: true,
            };
        };

        const validateExternalPage = externalPage => {
            const selector = `[data-appId = "${that.$elem.closest('[data-appId]').attr('data-appId')}"] .js-sideNavAddExternalPage`;
            const requiredFilled = gostValidation.validateRequiredValues(externalPage, selector);
            const suitableLengths = gostValidation.validateValuesLength(externalPage, selector);
            const validPattern = gostValidation.validatePattern(externalPage, selector);
            const isValid = requiredFilled && suitableLengths && validPattern;
            return isValid;
        };

        const addExternalPage = () => {
            const newPage = fillExternalPageData();
            const isValid = validateExternalPage(newPage);

            if (isValid) {
                if (savedExternalPage) {
                    sideNav.pages = sideNav.pages.map(page => {
                        if (page !== savedExternalPage) return page;

                        return newPage;
                    });

                    sideNav.groups.forEach(group => {
                        group.pages = group.pages.map(page => {
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

        this.init = () => {
            sideNav.addExternalPage = {
                init: initAddExternalPage,
                add: addExternalPage,
            };
        };
        this.init();
    }

    $.fn.fnAddExternalPage = function () {
        $(this).each((index, elem) => {
            new AddExternalPage($(elem));
        });
    };
    $('[data-appId]').each(function () {
        if (!window[`sideNav${$(this).attr('data-appId')}`]) return;

        $(this).find('.js-sideNavAddExternalPage').fnAddExternalPage();
    });
})();
