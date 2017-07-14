'use strict';

// Standard libraries
const fs = require('fs');

function loadPage(str_folderName, num_page = 1) {
    try {
        JSON.parse(fs.readFileSync(str_folderName + '/activities_page_' + num_page + '.json', 'utf8'));
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File not found!');
        } else {
            throw error;
        }
    }
    return (JSON.parse(fs.readFileSync(str_folderName + '/activities_page_' + num_page.toString() + '.json', 'utf8')));
}

function loadActivities(str_activitiesFolder) {
    var arr_activities = [];
    var num_page = 1;
    while (fs.existsSync(str_activitiesFolder + '/activities_page_' + num_page.toString() + '.json')) {
        num_page++;
    }
    for (var i = 1; i < num_page - 1; i++) {
        loadPage(str_activitiesFolder, i).forEach((x) => arr_activities.push(x))
    }
    return (arr_activities);
}

module.exports.loadActivities = loadActivities;