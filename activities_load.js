'use strict';

// Standard libraries
const fs = require('fs');

function loadPage(activities_file) {
    let json_activities;
    try {
        json_activities = JSON.parse(fs.readFileSync(activities_file));
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
    let page_number = 1;
    let activities_file = str_activitiesFolder + '/activities_page_' + page_number + '.json';
    let arr_activities = [];
    while (fs.existsSync(activities_file)) {
        loadPage(activities_file, page_number).forEach(
            (x) => arr_activities.push(x)
        );
        page_number++;
        activities_file = str_activitiesFolder + '/activities_page_' + page_number + '.json';
    }
    return (arr_activities);
}

module.exports = loadActivities;