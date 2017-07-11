'use strict';

const strava = require('strava-v3');
const fs = require('fs');

// Começa a baixar da pagina 1 porque a página 1 e a página 0 são iguais
function baixarAtividadesPromise(pasta, pagina = 1) {
    return new Promise(
        (resolve, reject) => {
            baixarPagina(pasta, pagina, resolve, reject);
        }
    );
}

function baixarPagina(pasta, pagina, resolve, reject) {
    strava.athlete.listActivities({ 'page': pagina }, function (err, payload, limits) {
        if (!err) {
            if (JSON.stringify(payload) == '[]') {
                resolve(pagina);
            } else {
                fs.writeFileSync(pasta + '/atividades_pag_' + pagina.toString() + '.json', JSON.stringify(payload), (err) => {
                    if (err) {
                        reject(err);
                    }
                });
                baixarPagina(pasta, pagina + 1, resolve, reject);
            }
        }
        else {
            reject(err);
        }
    });
};

module.exports.baixarAtividadesPromise = baixarAtividadesPromise;