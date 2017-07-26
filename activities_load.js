'use strict';

// Standard libraries
const fs = require('fs');

function loadPage(str_folderName, num_page = 1) {
    let json_activities;
    try {
        json_activities = JSON.parse(fs.readFileSync(
            str_folderName + '/activities_page_' + num_page + '.json'));
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File not found!');
        } else {
            throw error;
        }
    }
    return (json_activities);
}

function loadActivities(str_activitiesFolder) {
    let arr_activities = [];
    let num_page = 1;
    while (fs.existsSync(str_activitiesFolder + '/activities_page_' + num_page + '.json')) {
        num_page++;
    }
    for (var i = 1; i < num_page - 1; i++) {
        loadPage(str_activitiesFolder, i).forEach((x) => arr_activities.push(x))
    }
    return (arr_activities);
}

module.exports = loadActivities;