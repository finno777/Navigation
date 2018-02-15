/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $ */
/* eslint no-use-before-define: 0 */
/* eslint no-new: 0 */
/* eslint no-shadow: 0 */
(function () {
    function SideNavAddGroup($elem) {
        this.$elem = $elem;

        var that = this;
        var $linksContainer = $elem.find('.add-group__links-container');
        var $groupName = $elem.find('.js-groupName');
        var sideNav = window['sideNav' + $elem.closest('[data-appId]').attr('data-appId')];
        var gostValidation = window.gostValidation;
        var linkTemplate = '<li class="add-group__link"><label class="add-group__link-label checkbox"><input class="add-group__link-input" type="checkbox"/><span></span></label></li>';
        var addGroupPages = [];
        var savedGroup = null;

        var initAddGroup = function initAddGroup(group) {
            addGroupPages = sideNav.pages.concat(group ? group.pages : []);

            if (group) {
                savedGroup = group;
            } else {
                savedGroup = null;
            }

            renderAddGroup();

            if (group) {
                $groupName.val(savedGroup.name);
                if (savedGroup.pages) {
                    savedGroup.pages.forEach(function (page) {
                        that.$elem.find('.add-group__link-input[value="' + page.nodeId + '-' + page.displayName + '"]').closest('.add-group__link').removeClass('hide');
                        that.$elem.find('.add-group__link-input[value="' + page.nodeId + '-' + page.displayName + '"]').prop('checked', true);
                    });
                }
            } else {
                $groupName.val('');
            }
            gostValidation.setAllValid();
        };

        var renderAddGroup = function renderAddGroup() {
            $linksContainer.html('');

            if (addGroupPages.length) {
                addGroupPages.forEach(function (page) {
                    var $template = $(linkTemplate).clone();

                    $template.find('.add-group__link-label span').text(page.displayName);
                    $template.find('.add-group__link-input').val(page.nodeId + '-' + page.displayName);
                    $linksContainer.append($template);
                });
            } else {
                $linksContainer.append('<li class="add-group__links-empty-mssg">Нет ссылок для добавления</li>');
            }
        };

        var fillGroupInfo = function fillGroupInfo() {
            var name = $groupName.val().trim();
            var pages = addGroupPages.filter(function (page) {
                return that.$elem.find('.add-group__link-input[value="' + page.nodeId + '-' + page.displayName + '"]').prop('checked');
            });

            return {
                id: savedGroup ? savedGroup.id : null,
                name: name,
                pages: pages
            };
        };

        var validateGroupInfo = function validateGroupInfo(groupInfo) {
            var selector = '[data-appId = "' + that.$elem.closest('[data-appId]').attr('data-appId') + '"] .js-sideNavAddGroup';
            var requiredFilled = gostValidation.validateRequiredValues(groupInfo, selector);
            var suitableLengths = gostValidation.validateValuesLength(groupInfo, selector);
            var isValid = requiredFilled && suitableLengths;

            if (!isValid) {
                gostValidation.scrollToFirstError();
            }
            return isValid;
        };

        var addGroup = function addGroup() {
            var newGroup = fillGroupInfo();
            var isValid = validateGroupInfo(newGroup);

            if (isValid) {
                if (savedGroup) {
                    sideNav.groups = sideNav.groups.map(function (g) {
                        if (g !== savedGroup) return g;
                        return newGroup;
                    });
                } else {
                    sideNav.groups.push(newGroup);
                }

                sideNav.pages = addGroupPages.concat([]).filter(function (oldPage) {
                    return !newGroup.pages.some(function (page) {
                        return page === oldPage;
                    });
                });

                sideNav.settings.render();
                that.$elem.dialog('close');
            }
        };

        this.init = function () {
            sideNav.addGroup = {
                init: initAddGroup,
                render: renderAddGroup,
                addGroup: addGroup
            };
        };

        this.init();
    }

    $.fn.fnSideNavAddGroup = function () {
        $(this).each(function (index, elem) {
            new SideNavAddGroup($(elem));
        });
    };

    $('[data-appId]').each(function () {
        if (!window['sideNav' + $(this).attr('data-appId')]) return;

        $(this).find('.js-sideNavAddGroup').fnSideNavAddGroup();
    });
})();
//# sourceMappingURL=../maps/sideNav/add-group.js.map
