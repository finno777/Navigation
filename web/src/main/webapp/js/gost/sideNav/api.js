/* This file is generated — do not edit by hand! */
/* eslint-disable */
'use strict';

/* global $, cr */
(function () {
    $('[data-appId]').each(function () {
        var sideNav = window['sideNav' + $(this).attr('data-appId')];

        var makeRequest = function makeRequest(url) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var newUrl = url.indexOf('http') < 0 ? cr + '/rest-api' + url : url;

            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: newUrl,
                    headers: sideNav.adminsHeaders,
                    dataType: 'json',
                    type: options.method || 'GET',
                    data: options.body || undefined,
                    success: resolve,
                    error: reject
                });
            });
        };

        var save = function save(application, pagesWithoutGroup, groups) {
            return makeRequest('/navigation/save.action', {
                method: 'POST',
                body: JSON.stringify({
                    application: application,
                    pagesWithoutGroup: pagesWithoutGroup,
                    groups: groups
                })
            });
        };

        var saveCustom = function saveCustom(page) {
            return makeRequest('/navigation/saveCustom.action', {
                method: 'POST',
                body: JSON.stringify(page)
            });
        };

        var saveGroup = function saveGroup(body) {
            return makeRequest('/navigation/saveGroupPage.action', {
                method: 'POST',
                body: JSON.stringify(body)
            });
        };

        var saveGroups = function saveGroups(groups) {
            return makeRequest('/navigation/saveGroupPages.action', {
                method: 'POST',
                body: JSON.stringify(groups)
            });
        };

        var getChilds = function getChilds(nodeId) {
            return makeRequest('/navigation/getChild.action?nodeId=' + nodeId);
        };

        var getSiblings = function getSiblings(nodeId) {
            return makeRequest('/navigation/getSibling.action?nodeId=' + nodeId);
        };

        var getPages = function getPages(appId) {
            return makeRequest('/navigation/getPagesByAppIdWithoutGroup.action?appId=' + appId);
        };

        var getGroups = function getGroups(appId) {
            var url = '/navigation/getGroupPages.action?appId=' + appId;

            return makeRequest(url);
        };

        var deleteGroup = function deleteGroup(id) {
            return makeRequest('/navigation/removeGroupPage.action?id=' + id, {
                method: 'DELETE'
            });
        };

        var deletePage = function deletePage(page) {
            return makeRequest('/navigation/removePage.action', {
                method: 'DELETE',
                body: JSON.stringify(page)
            });
        };

        var getSiteMap = function getSiteMap() {
            return makeRequest('/navigation/getMap.action', {
                method: 'GET'
            });
        };

        if (sideNav) {
            sideNav.api = {
                save: save,
                saveCustom: saveCustom,
                saveGroup: saveGroup,
                saveGroups: saveGroups,
                getChilds: getChilds,
                getSiblings: getSiblings,
                getPages: getPages,
                getGroups: getGroups,
                deleteGroup: deleteGroup,
                deletePage: deletePage,
                getSiteMap: getSiteMap
            };
        }
    });
})();
//# sourceMappingURL=../maps/sideNav/api.js.map
