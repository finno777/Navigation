/* global $, RSTFileManager */
/* eslint no-param-reassign: 0 */
/* eslint no-use-before-define: 0 */
/* eslint no-new: 0 */
(() => {
    function AddInternalPage($elem) {
        this.$elem = $elem;

        const that = this;
        const gostValidation = window.gostValidation;
        const $siteMap = $elem.find('.js-pageSelect .dropdown__menu > div');
        const $pageName = $elem.find('.js-internalPageName');
        const $pageDesc = $elem.find('.js-internalPageDescription');
        const $pageSelect = $elem.find('.js-pageSelect');
        const $pageImg = $elem.find('.js-internalPageImg');
        const $pageImgPlaceholder = $elem.find('.icon-selector__img-empty');
        const $pageImgSelect = $elem.find('.js-imagesSelect');
        const siteMapList = '<ul class="dropdown__list js-map-list"></ul>';
        const siteMapItem = '<li class="dropdown__item"><span class="page-select-arrow"></span><a href="javascript:void(0)"></a></li>';
        const sideNav = window[`sideNav${that.$elem.closest('[data-appId]').attr('data-appId')}`];

        let savedInternalPage = null;
        let savedPages = null;
        let savedPlainPages = [];
        let savedUri = null;
        let savedNodeId = null;
        let savedPageName = null;
        let savedImage = null;

        const renderPages = (container, pages) => {
            const listTemplate = $(siteMapList).clone();
            pages.forEach(page => {
                renderPage(listTemplate, page);
            });
            container.append(listTemplate);
        };

        const renderPage = (container, page) => {
            const itemTempalte = $(siteMapItem).clone();
            itemTempalte.find('a').text(page.displayName).on('click', () => selectPage(page));
            if (page.pages && page.pages.length > 0) {
                renderPages(itemTempalte, page.pages);
                itemTempalte.addClass('has-pages');
            }
            container.append(itemTempalte);
        };

        const selectPage = page => {
            savedUri = page.uri;
            savedNodeId = page.nodeId;
            savedPageName = page.name;
            $pageSelect.find('.dropdown__button').text(page.displayName);
            $pageSelect.removeClass('active');
            $pageName.val(page.displayName);
            $pageDesc.val(page.description);
        };

        const getPlainPagesList = page => {
            if (page.name) {
                savedPlainPages.push({
                    name: page.name,
                    displayName: page.displayName,
                    nodeId: page.nodeId,
                    uri: page.uri,
                    image: page.image,
                });
            }
            if (page.pages) {
                page.pages.forEach(p => getPlainPagesList(p));
            }
        };

        const renderSiteMap = () => {
            $siteMap.html('');
            sideNav.api.getSiteMap(sideNav.nodeId).then(pages => {
                savedPages = pages;
                getPlainPagesList({
                    pages,
                });
                renderPages($siteMap, pages);
                if (savedInternalPage) {
                    const selected = savedPlainPages.filter(
                        p => p.uri === savedInternalPage.uri)[0];
                    if (selected) {
                        savedUri = selected.uri;
                        $pageSelect.find('.dropdown__button').text(selected.displayName);
                    }
                }
            });

            $pageSelect.find('.textbox').off('keyup').on('keyup', rerenderSiteMap);
        };

        const rerenderSiteMap = () => {
            const filter = $pageSelect.find('.dropdown__menu .textbox').val();
            $siteMap.html('');

            if (filter.length > 0) {
                renderPages($siteMap, savedPlainPages.filter(p =>
                    p.displayName.toLowerCase().indexOf(filter.toLowerCase()) >= 0));
            } else {
                renderPages($siteMap, savedPages);
            }
        };

        const render = () => {
            const options = {
                appId: sideNav.appId,
                portalName: 'gost',
                appName: 'IconStore',
                fmType: 'icons',
                onClose() {
                    const files = RSTFileManager.getFiles();
                    const icon = files[0];
                    if (icon) {
                        $pageImg.attr('src', icon.path);
                        $pageImg.show();
                        $pageImgPlaceholder.hide();
                        savedImage = icon.path;
                    }
                },
            };

            $pageImgSelect.off('click');
            $pageImgSelect.on('click', () => {
                RSTFileManager.open(options);
            });
            $(document).on('click', '.page-select-arrow', function () {
                $(this).closest('.dropdown__item').toggleClass('expand');
            });

            renderSiteMap();
        };

        const initAddInternalPage = page => {
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

        const fillInternalPageData = () => {
            const displayName = $pageName.val().trim();
            const description = $pageDesc.val().trim();

            return {
                name: savedPageName,
                displayName,
                description,
                internal: true,
                image: savedImage,
                uri: savedUri,
                nodeId: savedNodeId,
                custom: savedInternalPage ? savedInternalPage.custom : true,
            };
        };

        const validateInternalPage = internalPage => {
            const selector = `[data-appId = "${that.$elem.closest('[data-appId]').attr('data-appId')}"] .js-sideNavAddInternalPage`;
            const requiredFilled = gostValidation.validateRequiredValues(internalPage, selector);
            const suitableLengths = gostValidation.validateValuesLength(internalPage, selector);
            const isValid = requiredFilled && suitableLengths;
            return isValid;
        };

        const addInternalPage = () => {
            const newPage = fillInternalPageData();
            const isValid = validateInternalPage(newPage);

            if (isValid) {
                if (savedInternalPage) {
                    sideNav.pages = sideNav.pages.map(page => {
                        if (page !== savedInternalPage) return page;

                        return newPage;
                    });

                    sideNav.groups.forEach(group => {
                        group.pages = group.pages.map(page => {
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
        this.init = () => {
            sideNav.addInternalPage = {
                init: initAddInternalPage,
                add: addInternalPage,
                render,
            };
        };

        this.init();
    }

    $.fn.fnAddInternalPage = function () {
        $(this).each((index, elem) => {
            new AddInternalPage($(elem));
        });
    };

    $('[data-appId]').each(function () {
        if (!window[`sideNav${$(this).attr('data-appId')}`]) return;

        $(this).find('.js-sideNavAddInternalPage').fnAddInternalPage();
    });
})();

