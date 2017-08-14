'use strict';

const strava = require('strava-v3');
// Loading env folders for development
require('dotenv').config();

// Script to test Strava API credentials.
strava.athlete.get({}, function (err, payload, limits) {
    if (!err) {
        console.log('Credentials OK!');
    }
    else {
        console.log(err);
    }
});