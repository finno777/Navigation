/* global $, cr */
(() => {
    $('[data-appId]').each(function () {
        const sideNav = window[`sideNav${$(this).attr('data-appId')}`];

        const makeRequest = (url, options = {}) => {
            const newUrl = url.indexOf('http') < 0 ? `${cr}/rest-api${url}` : url;

            return new Promise((resolve, reject) => {
                $.ajax({
                    url: newUrl,
                    headers: sideNav.adminsHeaders,
                    dataType: 'json',
                    type: options.method || 'GET',
                    data: options.body || undefined,
                    success: resolve,
                    error: reject,
                });
            });
        };

        const save = (application, pagesWithoutGroup, groups) => makeRequest(`/navigation/save.action`, {
            method: 'POST',
            body: JSON.stringify({
                application,
                pagesWithoutGroup,
                groups,
            }),
        });

        const saveCustom = page => makeRequest('/navigation/saveCustom.action', {
            method: 'POST',
            body: JSON.stringify(page),
        });

        const saveGroup = body => makeRequest('/navigation/saveGroupPage.action', {
            method: 'POST',
            body: JSON.stringify(body),
        });

        const saveGroups = groups => makeRequest('/navigation/saveGroupPages.action', {
            method: 'POST',
            body: JSON.stringify(groups),
        });

        const getChilds = nodeId => makeRequest(`/navigation/getChild.action?nodeId=${nodeId}`);

        const getSiblings = nodeId => makeRequest(`/navigation/getSibling.action?nodeId=${nodeId}`);

        const getPages = appId => makeRequest(`/navigation/getPagesByAppIdWithoutGroup.action?appId=${appId}`);

        const getGroups = appId => {
            const url = `/navigation/getGroupPages.action?appId=${appId}`;

            return makeRequest(url);
        };

        const deleteGroup = id => makeRequest(`/navigation/removeGroupPage.action?id=${id}`, {
            method: 'DELETE',
        });

        const deletePage = page => makeRequest(`/navigation/removePage.action`, {
            method: 'DELETE',
            body: JSON.stringify(page),
        });

        const getSiteMap = makeRequest(`/navigation/getMap.action`, {
            method: 'GET'
        });

        if (sideNav) {
            sideNav.api = {
                save,
                saveCustom,
                saveGroup,
                saveGroups,
                getChilds,
                getSiblings,
                getPages,
                getGroups,
                deleteGroup,
                deletePage,
                getSiteMap,
            };
        }
    });
})();
