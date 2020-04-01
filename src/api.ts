import * as https from 'https'
import * as axios from 'axios';
import to from 'await-to-js';
var url = "coronavirus-19-api.herokuapp.com";
var indiaURl = 'https://api.covid19india.org/data.json'


function getLatestData(callback: (arg0: any) => void) {
    return https.get({
        host: url,
        path: '/all'
    }, function (response: any) {
        var body = '';
        response.on('data', (value: any) => {
            body += value;
        });
        response.on('end', () => {
            callback(JSON.parse(body));
        });
    });
}

function getCountryWiseData(param: string,callback: (arg0: any) => void) {
    return https.get({
        host: url,
        path: "/countries/"+ param
    }, function (response: any) {
        var body = '';
        response.on('data', (value: any) => {
            body += value;
        });
        response.on('end', () => {
            callback(JSON.parse(body));
        });
    });
}

async function getDetailsForIndia (callback: (arg0: any) => void) {
    const [err, response] = await to(
        axios.default.get(indiaURl)
    );
    callback(response?.data?.statewise);
}
exports.getLatestData = getLatestData;
exports.getDetailsForIndia = getDetailsForIndia;
exports.getCountryWiseData = getCountryWiseData;
