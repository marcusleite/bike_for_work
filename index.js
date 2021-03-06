'use strict';

// Standard libraries
const fs = require('fs');

// App libraries
const config = require('./config');
const getActivities = require('./activities_get');
const is_a_trip_to_work = require('./geo');
const loadActivities = require('./activities_load');

/* TODO LIST
    * Count arrivals and departures.
    * Oauth login(passport-strava)
    * Pick workplace from Google Maps widget or similar
*/

let num_trips = 0;
let arr_activities = [];

// Creates the directory to save the actvities, if it doesn't exist.
if (!fs.existsSync(config.activities_folder)) {
    fs.mkdirSync(config.activities_folder);
}

getActivities(config.activities_folder, 1)
    .then(
    () => {
        // Runs when the downloads finishes sucessfully.
        arr_activities = loadActivities(config.activities_folder, 20);
        arr_activities.forEach(function (activity) {
            if (activity.type === 'Ride') {
                if (is_a_trip_to_work(activity)) {
                    num_trips++;
                } else if (!activity.name.startsWith("Volta")) {
                    console.log(
                        "Activity that wasn't to work: id " + activity.id
                        //+ " Coords: " + JSON_activity.start_latlng
                        + " Time: " + activity.start_date_local
                        + " Activity Name: " + activity.name
                    );
                }
            }
        });
        console.log("Total trips from work: " + num_trips);
    }
    ).catch(
    (err) => {
        console.log(err);
    }
    );