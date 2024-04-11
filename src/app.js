import express from 'express';
import routes from './routes/index.js';
import conectaDataBase from './config/dbConnect.js';
import http from 'http';

(async () => {
    const conexao = await conectaDataBase();
    conexao.on('error', (err) => {
        console.error('Erro de conexão: ', err);
    });

    conexao.once('open', () => {
        console.log('Conexão com o banco efetuada com sucesso.');
    });
})();

const app = express();
routes(app);

const servidorHttp = http.createServer(app);

export default servidorHttp;
