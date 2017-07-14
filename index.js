'use strict'

// Standard libraries
const fs = require('fs');

// App libraries
const getActivities = require('./activities_get');
const loadActivities = require('./activities_load');
const geo = require('./geo');

// Third parties
const config = require('config.json')('./config.json');

/* TODO LIST
    * Decide what to put in the configuration file.
    * Count arrivals and departures.
    * Oauth login
    * Pick workplace from Google Maps widget or similar
    * async/await version
*/

// Config
//const str_activitiesFolder = config.activities_folder;
var num_trips = 0;
var arr_activities = [];

// Creates the directory to save the actvities, if it doesn't exist.
if (!fs.existsSync(config.activities_folder)) {
    fs.mkdirSync(config.activities_folder);
}

getActivities.getActivities(config.activities_folder, 1)
    .then(        
        () => {
            // Runs when the downloads finishes sucessfully.            
            arr_activities = loadActivities.loadActivities(config.activities_folder, 20);
            arr_activities.forEach(function (JSON_activity) {                
                if (JSON_activity.type === 'Ride') {
                    if (geo.its_a_trip_to_work(JSON_activity)) {
                        num_trips++;
                    } else {
                        console.log(
                            "Activity that wasn't to work: id " + JSON_activity.id 
                            //+ " Coords: " + JSON_activity.start_latlng 
                            + " Start date Local: " + JSON_activity.start_date_local
                            + " Activity Name: " + JSON_activity.name                            
                        );
                    }
                }
            });
            console.log("Total trips to work: " + num_trips / 2);
        }
    ).catch(        
        (err) => {
            console.log(err);
        }
    );