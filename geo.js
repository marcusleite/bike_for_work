'use strict';

function its_close_to_prodest(lat_long) {
    // Some activities created manually or imported from other services have this field empty
    if (typeof lat_long === 'undefined' || lat_long === null) {
        return false;
    }
    const lat = parseFloat(lat_long[0]);
    const long = parseFloat(lat_long[1]);
    // Prodest: -20.313524, -40.296553
    if ((lat => -20.3) && (lat <= -20.2)) {
        if ((long >= -40.3) && (long <= -40.2)) {
            return true;
        }
    }
    return false;
}

module.exports.its_a_trip_to_work = (JSON_activity) => {
    if (its_close_to_prodest(JSON_activity.start_latlng)) {
        return true;
    } else {
        return false;
    };
}