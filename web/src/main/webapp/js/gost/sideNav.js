/* eslint-disable */
var pages = [
    {
        nodeId: 1, pageType: 1, uri: "uri"
    }, {
        nodeId: 2, pageType: 2, uri: "uri2"
    }
];

$.ajax({
    headers: sideNav.adminsHeaders,
    dataType: 'json',
    type: 'POST',
    url: sideNav.cr + '/navigation/save',
    data: JSON.stringify(pages),
    success: function (res) {
        console.log(res)
    }

});
$.ajax({
    headers: sideNav.adminsHeaders,
    dataType: 'json',
    type: 'POST',
    url: sideNav.cr + '/navigation/getSibling.action',
    data: sideNav.currentNodeId,
    success: function (res) {
        console.log(res)
    }
});
$.ajax({
    headers: sideNav.adminsHeaders,
    dataType: 'json',
    type: 'POST',
    url: sideNav.cr + '/navigation/getChild.action',
    data: sideNav.currentNodeId,
    success: function (res) {
        console.log(res)
    }
});

