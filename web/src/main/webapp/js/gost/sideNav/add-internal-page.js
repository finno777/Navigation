/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $, RSTFileManager */
/* eslint no-param-reassign: 0 */
/* eslint no-use-before-define: 0 */
/* eslint no-new: 0 */
(function () {
    function AddInternalPage($elem) {
        this.$elem = $elem;

        var that = this;
        var gostValidation = window.gostValidation;
        var $siteMap = $elem.find('.js-pageSelect .dropdown__menu > div');
        var $pageName = $elem.find('.js-internalPageName');
        var $pageDesc = $elem.find('.js-internalPageDescription');
        var $pageSelect = $elem.find('.js-pageSelect');
        var $pageImg = $elem.find('.js-internalPageImg');
        var $pageImgPlaceholder = $elem.find('.icon-selector__img-empty');
        var $pageImgSelect = $elem.find('.js-imagesSelect');
        var siteMapList = '<ul class="dropdown__list js-map-list"></ul>';
        var siteMapItem = '<li class="dropdown__item"><span class="page-select-arrow"></span><a href="javascript:void(0)"></a></li>';
        var sideNav = window['sideNav' + that.$elem.closest('[data-appId]').attr('data-appId')];

        var savedInternalPage = null;
        var savedPages = null;
        var savedPlainPages = [];
        var savedUri = null;
        var savedNodeId = null;
        var savedPageName = null;
        var savedImage = null;

        var renderPages = function renderPages(container, pages) {
            var listTemplate = $(siteMapList).clone();
            pages.forEach(function (page) {
                renderPage(listTemplate, page);
            });
            container.append(listTemplate);
        };

        var renderPage = function renderPage(container, page) {
            var itemTempalte = $(siteMapItem).clone();
            itemTempalte.find('a').text(page.displayName).on('click', function () {
                return selectPage(page);
            });
            if (page.pages && page.pages.length > 0) {
                renderPages(itemTempalte, page.pages);
                itemTempalte.addClass('has-pages');
            }
            container.append(itemTempalte);
        };

        var selectPage = function selectPage(page) {
            savedUri = page.uri;
            savedNodeId = page.nodeId;
            savedPageName = page.name;
            $pageSelect.find('.dropdown__button').text(page.displayName);
            $pageSelect.removeClass('active');
            $pageName.val(page.displayName);
            $pageDesc.val(page.description);
        };

        var getPlainPagesList = function getPlainPagesList(page) {
            if (page.name) {
                savedPlainPages.push({
                    name: page.name,
                    displayName: page.displayName,
                    nodeId: page.nodeId,
                    uri: page.uri,
                    image: page.image
                });
            }
            if (page.pages) {
                page.pages.forEach(function (p) {
                    return getPlainPagesList(p);
                });
            }
        };

        var renderSiteMap = function renderSiteMap() {
            $siteMap.html('');
            sideNav.api.getSiteMap(sideNav.nodeId).then(function (pages) {
                savedPages = pages;
                getPlainPagesList({
                    pages: pages
                });
                renderPages($siteMap, pages);
                if (savedInternalPage) {
                    var selected = savedPlainPages.filter(function (p) {
                        return p.uri === savedInternalPage.uri;
                    })[0];
                    if (selected) {
                        savedUri = selected.uri;
                        $pageSelect.find('.dropdown__button').text(selected.displayName);
                    }
                }
            });

            $pageSelect.find('.textbox').off('keyup').on('keyup', rerenderSiteMap);
        };

        var rerenderSiteMap = function rerenderSiteMap() {
            var filter = $pageSelect.find('.dropdown__menu .textbox').val();
            $siteMap.html('');

            if (filter.length > 0) {
                renderPages($siteMap, savedPlainPages.filter(function (p) {
                    return p.displayName.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
                }));
            } else {
                renderPages($siteMap, savedPages);
            }
        };

        var render = function render() {
            var options = {
                appId: sideNav.appId,
                portalName: 'gost',
                appName: 'IconStore',
                fmType: 'icons',
                onClose: function onClose() {
                    var files = RSTFileManager.getFiles();
                    var icon = files[0];
                    if (icon) {
                        $pageImg.attr('src', icon.path);
                        $pageImg.show();
                        $pageImgPlaceholder.hide();
                        savedImage = icon.path;
                    }
                }
            };

            $pageImgSelect.off('click');
            $pageImgSelect.on('click', function () {
                RSTFileManager.open(options);
            });
            $(document).on('click', '.page-select-arrow', function () {
                $(this).closest('.dropdown__item').toggleClass('expand');
            });

            renderSiteMap();
        };

        var initAddInternalPage = function initAddInternalPage(page) {
            savedUri = null;
            savedPageName = null;
            savedImage = null;
            savedNodeId = null;
            savedPages = null;
            savedPlainPages = [];

            if (page) {
                $pageName.val(page.displayName);
                $pageDesc.val(page.description);
                if (!page.custom) {
                    $pageName.attr('disabled', 'disabled');
                    $pageSelect.find('.dropdown__button').attr('disabled', 'disabled');
                } else {
                    $pageName.removeAttr('disabled');
                    $pageSelect.find('.dropdown__button').removeAttr('disabled');
                }
                $pageSelect.find('.dropdown__button').text(page.displayName);
                savedInternalPage = page;
                savedUri = page.uri;
                savedPageName = page.name;
                savedImage = page.image;
                savedNodeId = page.nodeId;
                $pageImg.attr('src', page.image);
                $pageImg.show();
                $pageImgPlaceholder.hide();
            } else {
                savedInternalPage = null;
                $pageName.val('');
                $pageDesc.val('');
                $pageName.removeAttr('disabled');
                $pageSelect.find('.dropdown__button').removeAttr('disabled');
                $pageSelect.find('.dropdown__button').text('*Выбор из страниц карты сайта*');
                $pageImg.attr('src', '');
                $pageImg.hide();
                $pageImgPlaceholder.show();
            }

            render();
            gostValidation.setAllValid();
        };

        var fillInternalPageData = function fillInternalPageData() {
            var displayName = $pageName.val().trim();
            var description = $pageDesc.val().trim();

            return {
                name: savedPageName,
                displayName: displayName,
                description: description,
                internal: true,
                image: savedImage,
                uri: savedUri,
                nodeId: savedNodeId,
                custom: savedInternalPage ? savedInternalPage.custom : true
            };
        };

        var validateInternalPage = function validateInternalPage(internalPage) {
            var selector = '[data-appId = "' + that.$elem.closest('[data-appId]').attr('data-appId') + '"] .js-sideNavAddInternalPage';
            var requiredFilled = gostValidation.validateRequiredValues(internalPage, selector);
            var suitableLengths = gostValidation.validateValuesLength(internalPage, selector);
            var isValid = requiredFilled && suitableLengths;
            return isValid;
        };

        var addInternalPage = function addInternalPage() {
            var newPage = fillInternalPageData();
            var isValid = validateInternalPage(newPage);

            if (isValid) {
                if (savedInternalPage) {
                    sideNav.pages = sideNav.pages.map(function (page) {
                        if (page !== savedInternalPage) return page;

                        return newPage;
                    });

                    sideNav.groups.forEach(function (group) {
                        group.pages = group.pages.map(function (page) {
                            if (page !== savedInternalPage) return page;

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
            sideNav.addInternalPage = {
                init: initAddInternalPage,
                add: addInternalPage,
                render: render
            };
        };

        this.init();
    }

    $.fn.fnAddInternalPage = function () {
        $(this).each(function (index, elem) {
            new AddInternalPage($(elem));
        });
    };

    $('[data-appId]').each(function () {
        if (!window['sideNav' + $(this).attr('data-appId')]) return;

        $(this).find('.js-sideNavAddInternalPage').fnAddInternalPage();
    });
})();
//# sourceMappingURL=../maps/sideNav/add-internal-page.js.map
