'use strict'

const fs = require('fs');
const download = require('./baixa_atividades_promise');
const carga = require('./carrega_atividades');
const geo = require('./geo');

//TODO: Buscar atividades sem limitar manualmente as páginas
//TODO: Carregar atividades sem limitar manualmente as páginas
//TODO: Fazer o programa rodar sequencialmente de uma só vez de maneira(Promises?)
//TODO: Identificar lançamentos manuais de atividades
//TODO: Criar arquivo de configuração
//TODO: Verificar coordenadas da Prodest
//TODO: Colocar no versionamento
//TODO: Logar com Oauth
//TODO: Separar idas, vindas e quando veio no mesmo dia

// Config
const pastaAtividades = './atividades';

var viagens = 0;
var atividades = [];

// Cria o diretório de atividades, se não existir
if (!fs.existsSync(pastaAtividades)) {
    fs.mkdirSync(pastaAtividades);
}
download.baixarAtividadesPromise(pastaAtividades)
    .then(
        // Executa quando a carga termina com sucesso
        () => {
            atividades = carga.carregaAtividades(pastaAtividades);
            atividades.forEach(function (element) {
                if (element.type === 'Ride') {
                    if (geo.eh_trabalho(element)) {
                        viagens++;
                    } else {
                        console.log("Atividade que não foi para o trabalho: id " + element.id + " Coordenadas: " + element.start_latlng + " Nome: " + element.name);
                    }
                }
            });
            console.log("Total de viagens para o trabalho: " + viagens / 2);
        }
    ).catch(
        // Executa em caso de erro na carga
        (err) => {
            console.log(err);
        }
    );