'use strict';

const strava = require('strava-v3');
const fs = require('fs');

// Começa a baixar da pagina 1 porque a página 1 e a página 0 são iguais
function baixarAtividades(pasta, pagina = 1) {
    console.log("Baixa pagina " + pagina);
    strava.athlete.listActivities({ 'page': pagina }, function (err, payload, limits) {
        if (!err) {
            if (JSON.stringify(payload) == '[]') {
                return true;
            } else {
                fs.writeFileSync(pasta + '/atividades_pag_' + pagina.toString() + '.json', JSON.stringify(payload), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log(limits);
                return(baixarAtividades(pasta, pagina + 1));                
            }            
        }
        else {
            console.log(err);
        }
    });    
};

module.exports.baixarAtividades = baixarAtividades;