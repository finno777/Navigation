/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $, cr */
/* eslint no-use-before-define: 0 */
/* eslint no-param-reassign: 0 */
/* eslint no-new: 0 */
(function () {
    function SideNavSettings($elem) {
        var _this = this;

        this.$elem = $elem;

        var that = this;
        var gostValidation = window.gostValidation;
        var $groupsContainer = $elem.find('.js-sideNavSettingsGroups .navigation-group-table__list');
        var $pageGroupsContainer = $elem.find('.js-sideNavSettingsLinks .side-nav__groups');
        var sideNav = window['sideNav' + $elem.closest('[data-appId]').attr('data-appId')];
        sideNav.groups = [];
        sideNav.pages = [];
        var pageGroupTemp = '<li class="side-nav__group side-nav__group--active"><h3 class="side-nav__group-title"></h3><ul class="side-nav__pages"></ul></li>';
        var groupTemp = '<li class="navigation-group-table__item">\n                                <span class="navigation-group__title"></span>\n                                <div class="dropdown dropdown--icon">\n                                    <div class="dropdown__button button button--icon">\n                                        <svg>\n                                            <use xmlns:xlink="http://www.w3.org/1999/xlink"\n                                                 xlink:href="' + cr + '/sprite/sprite.svg#sideNav--settings"></use>\n                                        </svg>\n                                    </div>\n                                    <div class="dropdown__menu">\n                                        <ul class="dropdown__list">\n                                            <li class="dropdown__item">\n                                                <a class="group-edit" href="javascript:void(0)">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n                                            </li>\n                                            <li class="dropdown__item">\n                                                <a class="danger group-delete" href="javascript:void(0)">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </li>';
        var pageTemp = '<li>\n                                <div class="side-nav__page-info">\n                                    <div class="side-nav__page-img">\n                                        <img style="display: none;" src=""/>\n                                        <div class="side-nav__page-img-empty"></div>\n                                    </div>\n                                    <div class="side-nav__page-name">\n                                        <p class="side-nav__page-title"></p>\n                                        <p class="side-nav__page-description"></p>\n                                    </div>\n                                </div>\n                                <div class="side-nav__page-actions">\n                                    <button type="button" class="button button--icon side-nav__arrow-up">\n                                        <svg>\n                                            <use xmlns:xlink="http://www.w3.org/1999/xlink"\n                                                 xlink:href="' + cr + '/sprite/sprite.svg#sideNav--move_up"></use>\n                                        </svg>\n                                    </button>\n                                    <button type="button" class="button button--icon side-nav__arrow-down">\n                                        <svg>\n                                            <use xmlns:xlink="http://www.w3.org/1999/xlink"\n                                                 xlink:href="' + cr + '/sprite/sprite.svg#sideNav--move_down"></use>\n                                        </svg>\n                                    </button>\n                                    <div class="dropdown dropdown--icon">\n                                        <button type="button" class="dropdown__button button button--icon">\n                                            <svg>\n                                                <use xmlns:xlink="http://www.w3.org/1999/xlink"\n                                                     xlink:href="' + cr + '/sprite/sprite.svg#sideNav--settings"></use>\n                                            </svg>\n                                        </button>\n                                        <div class="dropdown__menu">\n                                            <ul class="dropdown__list">\n                                                <li class="dropdown__item">\n                                                    <a class="link-edit" href="javascript:void(0)">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n                                                </li>\n                                                <li class="dropdown__item">\n                                                    <a class="danger link-delete" href="javascript:void(0)">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a>\n                                                </li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                </div>\n                            </li>';
        var pagesToShow = 'custom';

        function changePagesToShow() {
            var selectedValue = $elem.find('.js-pagesToShow').val();
            pagesToShow = selectedValue;
            sideNav.groups.length = 0;
            sideNav.pages.length = 0;
            switch (selectedValue) {
                case 'CHILD':
                    sideNav.api.getChilds(sideNav.nodeId).then(function (childs) {
                        sideNav.pages = childs;
                        sideNav.settings.render();
                    });
                    break;
                case 'SIBLING':
                    sideNav.api.getSiblings(sideNav.nodeId).then(function (siblings) {
                        sideNav.pages = siblings;
                        sideNav.settings.render();
                    });
                    break;
                default:
                    sideNav.pages = [];
                    sideNav.settings.render();
                    break;
            }
        }

        function discardPagesToShow() {
            var $select = $elem.find('.js-pagesToShow');
            $select.val(pagesToShow);
            $select.selectmenu('refresh');
        }

        function showConfirm(text, confirm, discard) {
            var $confirm = $elem.closest('[data-appId]').find('.js-sideNavConfirm');
            $confirm.html('<div>' + text + '</div>');
            $confirm.dialog({
                autoOpen: false,
                modal: true,
                minWidth: 600,
                title: 'Подтверждение',
                appendTo: $elem.closest('[data-appId]'),
                buttons: [{
                    text: 'Да',
                    class: 'button button--primary',
                    click: function click() {
                        confirm();
                        $(this).dialog('close');
                    }
                }, {
                    text: 'Отмена',
                    class: 'button',
                    click: function click() {
                        discard();
                        $(this).dialog('close');
                    }
                }]
            });
            $confirm.dialog('open');
        }

        $elem.find('.js-pagesToShow').on('selectmenuopen', function () {
            pagesToShow = $elem.find('.js-pagesToShow').val();
        });

        $elem.find('.js-pagesToShow').on('selectmenuchange', function () {
            if (sideNav.pages.length > 0) {
                showConfirm('Страницы и группы, добавленные ранее, будут удалены. Продолжить?', changePagesToShow, discardPagesToShow);
            } else {
                changePagesToShow();
            }
        });

        var initPortletSettings = function initPortletSettings() {
            return Promise.all([fetchPages(), fetchGroups()]).then(render);
        };

        var renderGroups = function renderGroups() {
            sideNav.groups.forEach(function (group) {
                var $template = $(groupTemp).clone();
                $template.find('.navigation-group__title').text(group.name);
                $template.find('.group-edit').on('click', function () {
                    return sideNav.dialogs.openAddGroup(_this.$elem.closest('[data-appId]').find('.js-sideNavAddGroup'), {
                        title: 'Редактирование группы',
                        buttons: [{
                            text: 'Сохранить',
                            class: 'button button--primary',
                            click: function click() {
                                sideNav.addGroup.addGroup();
                            }
                        }, {
                            text: 'Отмена',
                            class: 'button',
                            click: function click() {
                                $(this).dialog('close');
                            }
                        }]
                    }, null, group, true);
                });
                $template.find('.group-delete').on('click', function () {
                    return deleteGroup(group);
                });
                $groupsContainer.append($template);
            });
        };

        var renderPage = function renderPage(page, $pageContainer) {
            var $pageTemplate = $(pageTemp).clone();

            $pageTemplate.find('.side-nav__page-title').text(page.displayName || '');
            if (page.internal) {
                $pageTemplate.find('.side-nav__page-title').removeClass('side-nav__page-title--external');
            } else {
                $pageTemplate.find('.side-nav__page-title').addClass('side-nav__page-title--external');
            }

            $pageTemplate.find('.side-nav__page-description').text(page.description || '');
            if (page.internal) {
                if (page.image) {
                    $pageTemplate.find('.side-nav__page-img img').attr('src', page.image).show();
                    $pageTemplate.find('.side-nav__page-img .side-nav__page-img-empty').hide();
                } else {
                    $pageTemplate.find('.side-nav__page-img img').attr('src', '').hide();
                    $pageTemplate.find('.side-nav__page-img .side-nav__page-img-empty').show();
                }

                $pageTemplate.find('.link-edit').on('click', function () {
                    return sideNav.dialogs.openAddInternalPage(_this.$elem.closest('[data-appId]').find('.js-sideNavAddInternalPage'), {
                        title: 'Редактирование внутренней ссылки',
                        buttons: [{
                            text: 'Сохранить',
                            class: 'button button--primary',
                            click: function click() {
                                sideNav.addInternalPage.add();
                            }
                        }, {
                            text: 'Отмена',
                            class: 'button',
                            click: function click() {
                                $(this).dialog('close');
                            }
                        }]
                    }, null, page, true);
                });
            } else {
                $pageTemplate.find('.side-nav__page-img img').attr('src', '').hide();
                $pageTemplate.find('.side-nav__page-img .side-nav__page-img-empty').show();
                $pageTemplate.find('.link-edit').on('click', function () {
                    return sideNav.dialogs.openAddExternalPage(_this.$elem.closest('[data-appId]').find('.js-sideNavAddExternalPage'), {
                        title: 'Редактирование внешней ссылки',
                        buttons: [{
                            text: 'Сохранить',
                            class: 'button button--primary',
                            click: function click() {
                                sideNav.addExternalPage.add();
                            }
                        }, {
                            text: 'Отмена',
                            class: 'button',
                            click: function click() {
                                $(this).dialog('close');
                            }
                        }]

                    }, null, page, true);
                });
            }

            if (page.custom) {
                $pageTemplate.find('.link-delete').on('click', function () {
                    return deletePage(page);
                });
            } else {
                $pageTemplate.find('.link-delete').remove();
            }

            $pageTemplate.find('.side-nav__arrow-up').on('click', function () {
                return movePageUp(page);
            });
            $pageTemplate.find('.side-nav__arrow-down').on('click', function () {
                return movePageDown(page);
            });
            $pageContainer.append($pageTemplate);
        };

        var renderPages = function renderPages() {
            if (sideNav.pages.length > 0) {
                var $groupTemplate = $(pageGroupTemp).clone();
                $groupTemplate.find('.side-nav__group-title').text('Нет группы').addClass('side-nav__group-title--empty');
                var $pageContainer = $groupTemplate.find('.side-nav__pages');
                sideNav.pages.forEach(function (page) {
                    renderPage(page, $pageContainer);
                });
                $pageGroupsContainer.append($groupTemplate);
            }
            sideNav.groups.forEach(function (group) {
                var $groupTemplate = $(pageGroupTemp).clone();
                $groupTemplate.find('.side-nav__group-title').text(group.name).removeClass('side-nav__group-title--empty');
                if (group.pages) {
                    var _$pageContainer = $groupTemplate.find('.side-nav__pages').addClass('side-nav__pages--group');
                    group.pages.forEach(function (page) {
                        renderPage(page, _$pageContainer);
                    });
                }
                $pageGroupsContainer.append($groupTemplate);
            });
        };

        var render = function render() {
            $groupsContainer.html('');
            $pageGroupsContainer.html('');
            renderGroups();
            renderPages();
        };

        var fetchGroups = function fetchGroups() {
            return sideNav.api.getGroups(sideNav.appId).then(function (newGroups) {
                sideNav.groups = newGroups;
                return sideNav.groups;
            });
        };

        var fetchPages = function fetchPages() {
            return sideNav.api.getPages(sideNav.appId).then(function (newPages) {
                sideNav.pages = newPages;
                return sideNav.pages;
            });
        };

        var deleteGroup = function deleteGroup(group) {
            sideNav.pages = sideNav.pages.concat(group.pages);

            sideNav.groups = sideNav.groups.filter(function (g) {
                return g !== group;
            });

            if (group.id) {
                sideNav.api.deleteGroup(group.id).then(function () {
                    sideNav.settings.render();
                });
            } else {
                sideNav.settings.render();
            }
        };

        var deletePage = function deletePage(page) {
            sideNav.pages = sideNav.pages.filter(function (p) {
                return p !== page;
            });

            sideNav.groups.forEach(function (group) {
                group.pages = group.pages.filter(function (p) {
                    return p !== page;
                });
            });

            sideNav.settings.render();
        };

        var validateAppSettings = function validateAppSettings(app) {
            var selector = '[data-appId = "' + that.$elem.closest('[data-appId]').attr('data-appId') + '"] .js-sideNavSettings';
            var requiredFilled = gostValidation.validateRequiredValues(app, selector);
            var suitableLengths = gostValidation.validateValuesLength(app, selector);
            var isValid = requiredFilled && suitableLengths;
            return isValid;
        };

        var save = function save() {
            var portletName = _this.$elem.find('.js-portletName').val().trim();
            var portletDesc = _this.$elem.find('.js-portletDescription').val().trim();
            var portletState = _this.$elem.find('.js-portletType:checked').val().trim();
            var portletContentType = _this.$elem.find('.js-pagesToShow').val().trim();

            var application = {
                displayName: portletName,
                description: portletDesc,
                state: portletState,
                contentType: portletContentType
            };

            var pagesWithoutGroup = sideNav.pages.map(function (page) {
                return {
                    name: page.name,
                    displayName: page.displayName,
                    description: page.description,
                    internal: page.internal,
                    uri: page.uri,
                    image: page.image,
                    nodeId: page.nodeId,
                    custom: page.custom
                };
            });

            var isValid = validateAppSettings(application);

            if (isValid) {
                sideNav.api.save(application, pagesWithoutGroup, sideNav.groups).then(function () {
                    that.$elem.dialog('close');
                    window.location.reload();
                }, console.error);
            }
        };

        var movePageDown = function movePageDown(page) {
            for (var i = 0; i < sideNav.pages.length; i += 1) {
                if (sideNav.pages[i] === page) {
                    if (i === sideNav.pages.length - 1) {
                        if (sideNav.groups.length > 0) {
                            sideNav.groups[0].pages.unshift(page);
                            sideNav.pages.length -= 1;
                            sideNav.settings.render();
                            return;
                        }
                    } else {
                        sideNav.pages.splice(i, 1);
                        sideNav.pages.splice(i + 1, 0, page);
                        sideNav.settings.render();
                        return;
                    }
                }
            }

            for (var groupIndex = 0; groupIndex < sideNav.groups.length; groupIndex += 1) {
                for (var _i = 0; _i < sideNav.groups[groupIndex].pages.length; _i += 1) {
                    if (sideNav.groups[groupIndex].pages[_i] === page) {
                        if (_i === sideNav.groups[groupIndex].pages.length - 1) {
                            if (sideNav.groups.length > groupIndex + 1) {
                                sideNav.groups[groupIndex + 1].pages.unshift(page);
                                sideNav.groups[groupIndex].pages.length -= 1;
                                sideNav.settings.render();
                                return;
                            }
                        } else {
                            sideNav.groups[groupIndex].pages.splice(_i, 1);
                            sideNav.groups[groupIndex].pages.splice(_i + 1, 0, page);
                            sideNav.settings.render();
                            return;
                        }
                    }
                }
            }
        };

        var movePageUp = function movePageUp(page) {
            for (var i = 1; i < sideNav.pages.length; i += 1) {
                if (sideNav.pages[i] === page) {
                    sideNav.pages.splice(i, 1);
                    sideNav.pages.splice(i - 1, 0, page);
                    sideNav.settings.render();
                    return;
                }
            }

            sideNav.groups.forEach(function (group, groupIndex) {
                for (var _i2 = 0; _i2 < group.pages.length; _i2 += 1) {
                    if (group.pages[_i2] === page) {
                        if (_i2 === 0) {
                            if (groupIndex === 0) {
                                sideNav.pages.push(page);
                                sideNav.groups[0].pages.shift();
                            } else {
                                sideNav.groups[groupIndex - 1].pages.push(page);
                                sideNav.groups[groupIndex].pages.shift();
                            }
                            return;
                        }

                        group.pages.splice(_i2, 1);
                        group.pages.splice(_i2 - 1, 0, page);
                        return;
                    }
                }
            });
            sideNav.settings.render();
        };
        this.init = function () {
            sideNav.settings = {
                init: initPortletSettings,
                render: render,
                save: save
            };
        };

        initPortletSettings();

        if (sideNav) {
            this.init();
        }
    }

    $.fn.fnSideNavSettings = function () {
        $(this).each(function (index, elem) {
            new SideNavSettings($(elem));
        });
    };
    $('[data-appId]').each(function () {
        $(this).find('.js-sideNavSettings').fnSideNavSettings();
    });
})();
//# sourceMappingURL=../maps/sideNav/portlet-settings.js.map
