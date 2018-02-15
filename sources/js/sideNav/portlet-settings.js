/* global $, cr */
/* eslint no-use-before-define: 0 */
/* eslint no-param-reassign: 0 */
/* eslint no-new: 0 */
(() => {
    function SideNavSettings($elem) {
        this.$elem = $elem;

        const that = this;
        const gostValidation = window.gostValidation;
        const $groupsContainer = $elem.find('.js-sideNavSettingsGroups .navigation-group-table__list');
        const $pageGroupsContainer = $elem.find('.js-sideNavSettingsLinks .side-nav__groups');
        const sideNav = window[`sideNav${$elem.closest('[data-appId]').attr('data-appId')}`];
        sideNav.groups = [];
        sideNav.pages = [];
        const pageGroupTemp = `<li class="side-nav__group side-nav__group--active"><h3 class="side-nav__group-title"></h3><ul class="side-nav__pages"></ul></li>`;
        const groupTemp = `<li class="navigation-group-table__item">
                                <span class="navigation-group__title"></span>
                                <div class="dropdown dropdown--icon">
                                    <div class="dropdown__button button button--icon">
                                        <svg>
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                 xlink:href="${cr}/sprite/sprite.svg#sideNav--settings"></use>
                                        </svg>
                                    </div>
                                    <div class="dropdown__menu">
                                        <ul class="dropdown__list">
                                            <li class="dropdown__item">
                                                <a class="group-edit" href="javascript:void(0)">Редактировать</a>
                                            </li>
                                            <li class="dropdown__item">
                                                <a class="danger group-delete" href="javascript:void(0)">Удалить</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>`;
        const pageTemp = `<li>
                                <div class="side-nav__page-info">
                                    <div class="side-nav__page-img">
                                        <img style="display: none;" src=""/>
                                        <div class="side-nav__page-img-empty"></div>
                                    </div>
                                    <div class="side-nav__page-name">
                                        <p class="side-nav__page-title"></p>
                                        <p class="side-nav__page-description"></p>
                                    </div>
                                </div>
                                <div class="side-nav__page-actions">
                                    <button type="button" class="button button--icon side-nav__arrow-up">
                                        <svg>
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                 xlink:href="${cr}/sprite/sprite.svg#sideNav--move_up"></use>
                                        </svg>
                                    </button>
                                    <button type="button" class="button button--icon side-nav__arrow-down">
                                        <svg>
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                 xlink:href="${cr}/sprite/sprite.svg#sideNav--move_down"></use>
                                        </svg>
                                    </button>
                                    <div class="dropdown dropdown--icon">
                                        <button type="button" class="dropdown__button button button--icon">
                                            <svg>
                                                <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                                     xlink:href="${cr}/sprite/sprite.svg#sideNav--settings"></use>
                                            </svg>
                                        </button>
                                        <div class="dropdown__menu">
                                            <ul class="dropdown__list">
                                                <li class="dropdown__item">
                                                    <a class="link-edit" href="javascript:void(0)">Редактировать</a>
                                                </li>
                                                <li class="dropdown__item">
                                                    <a class="danger link-delete" href="javascript:void(0)">Удалить</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>`;
        let pagesToShow = 'custom';

        function changePagesToShow() {
            const selectedValue = $elem.find('.js-pagesToShow').val();
            pagesToShow = selectedValue;
            sideNav.groups.length = 0;
            sideNav.pages.length = 0;
            switch (selectedValue) {
                case 'CHILD':
                    sideNav.api.getChilds(sideNav.nodeId).then(childs => {
                        sideNav.pages = childs;
                        sideNav.settings.render();
                    });
                    break;
                case 'SIBLING':
                    sideNav.api.getSiblings(sideNav.nodeId).then(siblings => {
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
            const $select = $elem.find('.js-pagesToShow');
            $select.val(pagesToShow);
            $select.selectmenu('refresh');
        }

        function showConfirm(text, confirm, discard) {
            const $confirm = $elem.closest('[data-appId]').find('.js-sideNavConfirm');
            $confirm.html(`<div>${text}</div>`);
            $confirm.dialog({
                autoOpen: false,
                modal: true,
                minWidth: 600,
                title: 'Подтверждение',
                appendTo: $elem.closest(`[data-appId]`),
                buttons: [
                    {
                        text: 'Да',
                        class: 'button button--primary',
                        click() {
                            confirm();
                            $(this).dialog('close');
                        },
                    },
                    {
                        text: 'Отмена',
                        class: 'button',
                        click() {
                            discard();
                            $(this).dialog('close');
                        },
                    },
                ],
            });
            $confirm.dialog('open');
        }

        $elem.find('.js-pagesToShow').on('selectmenuopen', () => {
            pagesToShow = $elem.find('.js-pagesToShow').val();
        });

        $elem.find('.js-pagesToShow').on('selectmenuchange', () => {
            if (sideNav.pages.length > 0) {
                showConfirm('Страницы и группы, добавленные ранее, будут удалены. Продолжить?', changePagesToShow, discardPagesToShow);
            } else {
                changePagesToShow();
            }
        });

        const initPortletSettings = () => Promise.all([fetchPages(), fetchGroups()]).then(render);

        const renderGroups = () => {
            sideNav.groups.forEach(group => {
                const $template = $(groupTemp).clone();
                $template.find('.navigation-group__title').text(group.name);
                $template.find('.group-edit').on('click', () => sideNav.dialogs.openAddGroup(
                    this.$elem.closest('[data-appId]').find('.js-sideNavAddGroup'),
                    {
                        title: 'Редактирование группы',
                        buttons: [
                            {
                                text: 'Сохранить',
                                class: 'button button--primary',
                                click() {
                                    sideNav.addGroup.addGroup();
                                },
                            },
                            {
                                text: 'Отмена',
                                class: 'button',
                                click() {
                                    $(this).dialog('close');
                                },
                            },
                        ],
                    },
                    null,
                    group,
                    true));
                $template.find('.group-delete').on('click', () => deleteGroup(group));
                $groupsContainer.append($template);
            });
        };

        const renderPage = (page, $pageContainer) => {
            const $pageTemplate = $(pageTemp).clone();

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

                $pageTemplate.find('.link-edit').on('click', () => sideNav.dialogs.openAddInternalPage(
                    this.$elem.closest('[data-appId]').find('.js-sideNavAddInternalPage'),
                    {
                        title: 'Редактирование внутренней ссылки',
                        buttons: [
                            {
                                text: 'Сохранить',
                                class: 'button button--primary',
                                click() {
                                    sideNav.addInternalPage.add();
                                },
                            },
                            {
                                text: 'Отмена',
                                class: 'button',
                                click() {
                                    $(this).dialog('close');
                                },
                            },
                        ],
                    },
                    null,
                    page,
                    true));
            } else {
                $pageTemplate.find('.side-nav__page-img img').attr('src', '').hide();
                $pageTemplate.find('.side-nav__page-img .side-nav__page-img-empty').show();
                $pageTemplate.find('.link-edit').on('click', () => sideNav.dialogs.openAddExternalPage(
                    this.$elem.closest('[data-appId]').find('.js-sideNavAddExternalPage'),
                    {
                        title: 'Редактирование внешней ссылки',
                        buttons: [
                            {
                                text: 'Сохранить',
                                class: 'button button--primary',
                                click() {
                                    sideNav.addExternalPage.add();
                                },
                            },
                            {
                                text: 'Отмена',
                                class: 'button',
                                click() {
                                    $(this).dialog('close');
                                },
                            },
                        ],

                    },
                    null,
                    page,
                    true));
            }

            if (page.custom) {
                $pageTemplate.find('.link-delete').on('click', () => deletePage(page));
            } else {
                $pageTemplate.find('.link-delete').remove();
            }

            $pageTemplate.find('.side-nav__arrow-up').on('click', () => movePageUp(page));
            $pageTemplate.find('.side-nav__arrow-down').on('click', () => movePageDown(page));
            $pageContainer.append($pageTemplate);
        };

        const renderPages = () => {
            if (sideNav.pages.length > 0) {
                const $groupTemplate = $(pageGroupTemp).clone();
                $groupTemplate.find('.side-nav__group-title').text('Нет группы').addClass('side-nav__group-title--empty');
                const $pageContainer = $groupTemplate.find('.side-nav__pages');
                sideNav.pages.forEach(page => {
                    renderPage(page, $pageContainer);
                });
                $pageGroupsContainer.append($groupTemplate);
            }
            sideNav.groups.forEach(group => {
                const $groupTemplate = $(pageGroupTemp).clone();
                $groupTemplate.find('.side-nav__group-title').text(group.name).removeClass('side-nav__group-title--empty');
                if (group.pages) {
                    const $pageContainer = $groupTemplate.find('.side-nav__pages').addClass('side-nav__pages--group');
                    group.pages.forEach(page => {
                        renderPage(page, $pageContainer);
                    });
                }
                $pageGroupsContainer.append($groupTemplate);
            });
        };

        const render = () => {
            $groupsContainer.html('');
            $pageGroupsContainer.html('');
            renderGroups();
            renderPages();
        };

        const fetchGroups = () => sideNav.api.getGroups(sideNav.appId).then(newGroups => {
            sideNav.groups = newGroups;
            return sideNav.groups;
        });

        const fetchPages = () => sideNav.api.getPages(sideNav.appId).then(newPages => {
            sideNav.pages = newPages;
            return sideNav.pages;
        });

        const deleteGroup = group => {
            sideNav.pages = sideNav.pages.concat(group.pages);

            sideNav.groups = sideNav.groups.filter(g => g !== group);

            if (group.id) {
                sideNav.api.deleteGroup(group.id).then(() => {
                    sideNav.settings.render();
                });
            } else {
                sideNav.settings.render();
            }
        };

        const deletePage = page => {
            sideNav.pages = sideNav.pages.filter(p => p !== page);

            sideNav.groups.forEach(group => {
                group.pages = group.pages.filter(p => p !== page);
            });

            sideNav.settings.render();
        };

        const validateAppSettings = app => {
            const selector = `[data-appId = "${that.$elem.closest('[data-appId]').attr('data-appId')}"] .js-sideNavSettings`;
            const requiredFilled = gostValidation.validateRequiredValues(app, selector);
            const suitableLengths = gostValidation.validateValuesLength(app, selector);
            const isValid = requiredFilled && suitableLengths;
            return isValid;
        };

        const save = () => {
            const portletName = this.$elem.find('.js-portletName').val().trim();
            const portletDesc = this.$elem.find('.js-portletDescription').val().trim();
            const portletState = this.$elem.find('.js-portletType:checked').val().trim();
            const portletContentType = this.$elem.find('.js-pagesToShow').val().trim();

            const application = {
                displayName: portletName,
                description: portletDesc,
                state: portletState,
                contentType: portletContentType,
            };

            const pagesWithoutGroup = sideNav.pages
                .map(page => ({
                    name: page.name,
                    displayName: page.displayName,
                    description: page.description,
                    internal: page.internal,
                    uri: page.uri,
                    image: page.image,
                    nodeId: page.nodeId,
                    custom: page.custom,
                }));

            const isValid = validateAppSettings(application);

            if (isValid) {
                sideNav.api.save(
                    application,
                    pagesWithoutGroup,
                    sideNav.groups)
                    .then(
                        () => {
                            that.$elem.dialog('close');
                            window.location.reload();
                        },
                        console.error);
            }
        };

        const movePageDown = page => {
            for (let i = 0; i < sideNav.pages.length; i += 1) {
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

            for (let groupIndex = 0; groupIndex < sideNav.groups.length; groupIndex += 1) {
                for (let i = 0; i < sideNav.groups[groupIndex].pages.length; i += 1) {
                    if (sideNav.groups[groupIndex].pages[i] === page) {
                        if (i === sideNav.groups[groupIndex].pages.length - 1) {
                            if (sideNav.groups.length > groupIndex + 1) {
                                sideNav.groups[groupIndex + 1].pages.unshift(page);
                                sideNav.groups[groupIndex].pages.length -= 1;
                                sideNav.settings.render();
                                return;
                            }
                        } else {
                            sideNav.groups[groupIndex].pages.splice(i, 1);
                            sideNav.groups[groupIndex].pages.splice(i + 1, 0, page);
                            sideNav.settings.render();
                            return;
                        }
                    }
                }
            }
        };

        const movePageUp = page => {
            for (let i = 1; i < sideNav.pages.length; i += 1) {
                if (sideNav.pages[i] === page) {
                    sideNav.pages.splice(i, 1);
                    sideNav.pages.splice(i - 1, 0, page);
                    sideNav.settings.render();
                    return;
                }
            }

            sideNav.groups.forEach((group, groupIndex) => {
                for (let i = 0; i < group.pages.length; i += 1) {
                    if (group.pages[i] === page) {
                        if (i === 0) {
                            if (groupIndex === 0) {
                                sideNav.pages.push(page);
                                sideNav.groups[0].pages.shift();
                            } else {
                                sideNav.groups[groupIndex - 1].pages.push(page);
                                sideNav.groups[groupIndex].pages.shift();
                            }
                            return;
                        }

                        group.pages.splice(i, 1);
                        group.pages.splice(i - 1, 0, page);
                        return;
                    }
                }
            });
            sideNav.settings.render();
        };
        this.init = () => {
            sideNav.settings = {
                init: initPortletSettings,
                render,
                save,
            };
        };

        initPortletSettings();

        if (sideNav) {
            this.init();
        }
    }

    $.fn.fnSideNavSettings = function () {
        $(this).each((index, elem) => {
            new SideNavSettings($(elem));
        });
    };
    $('[data-appId]').each(function () {
        $(this).find('.js-sideNavSettings').fnSideNavSettings();
    });
})();
