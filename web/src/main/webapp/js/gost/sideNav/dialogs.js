/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $ */
(function () {
    var defaults = {
        modal: true,
        resizable: false,
        draggable: false,
        width: 960,
        autoOpen: false
    };

    function initializeSwitcher($elem) {
        $elem.find('.toggler__item').click(function () {
            var $tab = $(this);
            var contentArea = $tab.attr('data-content-area');

            if (contentArea === 'links') {
                $elem.find('.js-sideNavSettingsLinks').show();
                $elem.find('.js-addLink').show();
                $elem.find('.js-sideNavSettingsGroups').hide();
                $elem.find('.js-addGroup').hide();
            } else {
                $elem.find('.js-sideNavSettingsGroups').show();
                $elem.find('.js-addGroup').show();
                $elem.find('.js-sideNavSettingsLinks').hide();
                $elem.find('.js-addLink').hide();
            }
        });
    }

    function openPortletSettings($elem, overrides, dialogData, appId) {
        defaults.appendTo = $elem.closest('[data-appId]');
        $elem.dialog($.extend(true, {}, defaults, overrides || {}));
        $elem.data('data', dialogData || {});
        $elem.dialog('open');
        $elem.fnSideNavSettings();
        initializeSwitcher($elem, appId);
    }

    function openAddGroup($elem, overrides, dialogData, group) {
        window['sideNav' + $elem.closest('[data-appId]').attr('data-appId')].addGroup.init(group);
        defaults.appendTo = $elem.closest('[data-appId]');
        $elem.dialog($.extend(true, {}, defaults, overrides || {}));
        $elem.data('data', dialogData || {});
        $elem.dialog('open');
    }

    function openAddExternalPage($elem, overrides, dialogData, page) {
        window['sideNav' + $elem.closest('[data-appId]').attr('data-appId')].addExternalPage.init(page);
        defaults.appendTo = $elem.closest('[data-appId]');
        $elem.dialog($.extend(true, {}, defaults, overrides || {}));
        $elem.data('data', dialogData || {});
        $elem.dialog('open');
    }

    function openAddInternalPage($elem, overrides, dialogData, page) {
        window['sideNav' + $elem.closest('[data-appId]').attr('data-appId')].addInternalPage.init(page);
        defaults.appendTo = $elem.closest('[data-appId]');
        $elem.dialog($.extend(true, {}, defaults, overrides || {}));
        $elem.data('data', dialogData || {});
        $elem.dialog('open');
    }

    $('[data-appId]').each(function () {
        var appId = $(this).attr('data-appId');
        var sideNav = window['sideNav' + appId];

        $(this).find('.js-open-settings').on('click', function () {
            var $parent = $(this).closest('[data-appId="' + appId + '"]').find('.js-sideNavSettings');

            openPortletSettings($parent, {
                title: $(this).data('title'),
                height: window.innerHeight,
                buttons: [{
                    text: 'Сохранить',
                    class: 'button button--primary',
                    click: function click() {
                        sideNav.settings.save();
                    }
                }, {
                    text: 'Отмена',
                    class: 'button',
                    click: function click() {
                        $(this).dialog('close');
                    }
                }]
            }, null, appId);
        });
        $(this).find('.js-addGroup').on('click', function () {
            var $parent = $(this).closest('[data-appId="' + appId + '"]').find('.js-sideNavAddGroup');

            openAddGroup($parent, {
                title: $(this).data('title'),
                buttons: [{
                    text: 'Добавить',
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
            });
        });
        $(this).find('.js-add-external-page').on('click', function () {
            var $parent = $(this).closest('[data-appId="' + appId + '"]').find('.js-sideNavAddExternalPage');

            openAddExternalPage($parent, {
                title: $(this).data('title'),
                buttons: [{
                    text: 'Добавить',
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
            });
        });
        $(this).find('.js-add-internal-page').on('click', function () {
            var $parent = $(this).closest('[data-appId="' + appId + '"]').find('.js-sideNavAddInternalPage');

            openAddInternalPage($parent, {
                title: $(this).data('title'),
                buttons: [{
                    text: 'Добавить',
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
            });
        });

        if (window['sideNav' + $(this).attr('data-appId')]) {
            window['sideNav' + $(this).attr('data-appId')].dialogs = {
                openPortletSettings: openPortletSettings,
                openAddGroup: openAddGroup,
                openAddExternalPage: openAddExternalPage,
                openAddInternalPage: openAddInternalPage
            };
        }
    });
})();
//# sourceMappingURL=../maps/sideNav/dialogs.js.map
