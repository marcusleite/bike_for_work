'use strict';

const strava = require('strava-v3');

// Script to test Strava API credentials.
strava.athlete.get({}, function (err, payload, limits) {
    if (!err) {
        console.log('Credentials OK!');
    }
    else {
        console.log(err);
    }
});