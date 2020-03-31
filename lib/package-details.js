"use strict";
var https = require('https');
var npmjsURL = "api.npmjs.org";
var npmsURL = "api.npms.io";
function getQuickDetails(name, endDate, currentDate, callback) {
    var path = '/downloads/point/' + endDate + ':' + currentDate + '/' + name;
    return https.get({
        host: npmjsURL,
        path: path
    }, function (response) {
        var body = '';
        response.on('data', function (value) {
            body += value;
        });
        response.on('end', function () {
            callback(JSON.parse(body));
        });
    });
}
function getFullDetails(name, callback) {
    var path = '/v2/package/' + name;
    return https.get({
        host: npmsURL,
        path: path
    }, function (response) {
        var body = '';
        response.on('data', function (value) {
            body += value;
        });
        response.on('end', function () {
            callback(JSON.parse(body));
        });
    });
}
exports.getFullDetails = getFullDetails;
exports.getQuickDetails = getQuickDetails;
