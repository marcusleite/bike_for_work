'use strict';

// Standard libraries
const fs = require('fs');

// Third parties
const strava = require('strava-v3');

function getPage(str_folderName, num_page, resolve, reject) {
    strava.athlete.listActivities({ 'page': num_page }, function (err, payload, limits) {
        if (!err) {
            // Teste
            if (JSON.stringify(payload) == '[]') {
                resolve(num_page);
            } else {
                fs.writeFileSync(str_folderName + '/activities_page_' + num_page.toString() + '.json', JSON.stringify(payload), (err) => {
                    if (err) {
                        reject(err);
                    }
                });
                getPage(str_folderName, num_page + 1, resolve, reject);
            }
        }
        else {
            reject(err);
        }
    });
};

// Begins from page 1 because page 0 and 1 are the same.
function getActivities(str_folderName, num_page = 1) {
    return new Promise(
        (resolve, reject) => {
            getPage(str_folderName, num_page, resolve, reject);
        }
    );
}

module.exports.getActivities = getActivities;