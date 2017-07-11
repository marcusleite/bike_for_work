'use strict';

// Prodest: -20.313524, -40.296553
function eh_proximo_a_prodest(lat_long){
    if(typeof lat_long === 'undefined' || lat_long === null){
        return false;
    }
    const lat = parseFloat(lat_long[0]);
    const long = parseFloat(lat_long[1]);
    if ((lat => -20.3) && (lat <= -20.2)){
        if ((long >= -40.3) && (long <= -40.2)){
            return true;
        }
    }
    return false;
}

module.exports.eh_trabalho = (json_atividade)=>{
    if (eh_proximo_a_prodest(json_atividade.start_latlng)){
        return true;
    }else{
        return false;
        //sconsole.log(false, json_atividade.name, json_atividade.workout_type, json_atividade.gear);
    };
}