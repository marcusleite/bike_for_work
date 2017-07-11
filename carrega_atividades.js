'use strict';

const fs = require('fs');

function carregaPag(pasta, pagina = 1){
    try {
        JSON.parse(fs.readFileSync(pasta + '/atividades_pag_' + pagina + '.json', 'utf8'));
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File not found!');
        } else {
            throw error;
        }
    }
    return(JSON.parse(fs.readFileSync(pasta + '/atividades_pag_' + pagina.toString() + '.json', 'utf8')));
}

function carregaAtividades(pasta){
    var atividades = [];
    var pagina = 1;
    while(fs.existsSync(pasta + '/atividades_pag_' + pagina.toString() + '.json')){
        pagina++;
    }
    for(var i = 1; i < pagina - 2; i++){
        carregaPag(pasta, i).forEach((x) => atividades.push(x))
    }
    return(atividades);
}

module.exports.carregaAtividades = carregaAtividades;