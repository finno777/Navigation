/* global $ */
/* eslint no-use-before-define: 0 */
/* eslint no-new: 0 */
/* eslint no-shadow: 0 */
(() => {
    function SideNavAddGroup($elem) {
        this.$elem = $elem;

        const that = this;
        const $linksContainer = $elem.find('.add-group__links-container');
        const $groupName = $elem.find('.js-groupName');
        const sideNav = window[`sideNav${$elem.closest('[data-appId]').attr('data-appId')}`];
        const gostValidation = window.gostValidation;
        const linkTemplate = '<li class="add-group__link"><label class="add-group__link-label checkbox"><input class="add-group__link-input" type="checkbox"/><span></span></label></li>';
        let addGroupPages = [];
        let savedGroup = null;

        const initAddGroup = group => {
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
                    savedGroup.pages.forEach(page => {
                        that.$elem.find(`.add-group__link-input[value="${page.nodeId}-${page.displayName}"]`).closest('.add-group__link').removeClass('hide');
                        that.$elem.find(`.add-group__link-input[value="${page.nodeId}-${page.displayName}"]`).prop('checked', true);
                    });
                }
            } else {
                $groupName.val('');
            }
            gostValidation.setAllValid();
        };

        const renderAddGroup = () => {
            $linksContainer.html('');

            if (addGroupPages.length) {
                addGroupPages.forEach(page => {
                    const $template = $(linkTemplate).clone();

                    $template.find('.add-group__link-label span').text(page.displayName);
                    $template.find('.add-group__link-input').val(`${page.nodeId}-${page.displayName}`);
                    $linksContainer.append($template);
                });
            } else {
                $linksContainer.append('<li class="add-group__links-empty-mssg">Нет ссылок для добавления</li>');
            }
        };

        const fillGroupInfo = () => {
            const name = $groupName.val().trim();
            const pages = addGroupPages.filter(page =>
                that.$elem.find(`.add-group__link-input[value="${page.nodeId}-${page.displayName}"]`).prop('checked'));

            return {
                id: savedGroup ? savedGroup.id : null,
                name,
                pages,
            };
        };

        const validateGroupInfo = groupInfo => {
            const selector = `[data-appId = "${that.$elem.closest('[data-appId]').attr('data-appId')}"] .js-sideNavAddGroup`;
            const requiredFilled = gostValidation.validateRequiredValues(groupInfo, selector);
            const suitableLengths = gostValidation.validateValuesLength(groupInfo, selector);
            const isValid = requiredFilled && suitableLengths;

            if (!isValid) {
                gostValidation.scrollToFirstError();
            }
            return isValid;
        };

        const addGroup = () => {
            const newGroup = fillGroupInfo();
            const isValid = validateGroupInfo(newGroup);

            if (isValid) {
                if (savedGroup) {
                    sideNav.groups = sideNav.groups.map(g => {
                        if (g !== savedGroup) return g;
                        return newGroup;
                    });
                } else {
                    sideNav.groups.push(newGroup);
                }

                sideNav.pages = addGroupPages.concat([]).filter(oldPage =>
                    !newGroup.pages.some(page => page === oldPage));

                sideNav.settings.render();
                that.$elem.dialog('close');
            }
        };

        this.init = () => {
            sideNav.addGroup = {
                init: initAddGroup,
                render: renderAddGroup,
                addGroup,
            };
        };

        this.init();
    }

    $.fn.fnSideNavAddGroup = function () {
        $(this).each((index, elem) => {
            new SideNavAddGroup($(elem));
        });
    };

    $('[data-appId]').each(function () {
        if (!window[`sideNav${$(this).attr('data-appId')}`]) return;

        $(this).find('.js-sideNavAddGroup').fnSideNavAddGroup();
    });
})();
