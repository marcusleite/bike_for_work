'use strict';

const strava = require('strava-v3');

// Script para rodar suas credenciais
strava.athlete.get({}, function (err, payload, limits) {
    if (!err) {
        //console.log(payload);
        console.log('Credenciais OK');
    }
    else {
        console.log(err);
    }
});