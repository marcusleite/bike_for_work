'use strict'

const fs = require('fs');
const getActivities = require('./activities_get');
const loadActivities = require('./activities_load');
const geo = require('./geo');

//TODO: Identify manually added activities.
//TODO: Identify activities imported from other services(i.e.: Endomondo).
//TODO: Load configuration from a file.
//TODO: Double check my work Lat/Long coordinates.
//TODO: Count arrivals and departures.
//TODO: Oauth login

// Config
const str_activitiesFolder = './activities';

var num_trips = 0;
var arr_activities = [];

// Creates the directory to save the actvities, if it doesn't exist.
if (!fs.existsSync(str_activitiesFolder)) {
    fs.mkdirSync(str_activitiesFolder);
}

getActivities.getActivities(str_activitiesFolder, 1)
    .then(        
        () => {
            // Runs when the downloads finishes sucessfully.            
            arr_activities = loadActivities.loadActivities(str_activitiesFolder, 20);
            console.log("1");
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