/* This file is generated — do not edit by hand! */
/* eslint-disable */
"use strict";

/*require(['SHARED/jquery'], function ($) {*/

var pages = [{
    nodeId: 1, pageType: 1, uri: "uri"
}, {
    nodeId: 2, pageType: 2, uri: "uri2"
}];

$.ajax({
    headers: adminsHeaders,
    dataType: 'json',
    type: 'POST',
    url: cr + '/navigation/save',
    data: JSON.stringify(pages),
    success: function success(res) {
        console.log(res);
    }

});
$.ajax({
    headers: adminsHeaders,
    dataType: 'json',
    type: 'POST',
    url: cr + '/navigation/getSibling.action',
    data: nodeId,
    success: function success(res) {
        console.log(res);
    }
});
$.ajax({
    headers: adminsHeaders,
    dataType: 'json',
    type: 'POST',
    url: cr + '/navigation/getChild.action',
    data: nodeId,
    success: function success(res) {
        console.log(res);
    }
});
/*});*/
//# sourceMappingURL=maps/sideNav.js.map
