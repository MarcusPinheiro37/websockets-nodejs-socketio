
import 'dotenv/config';
import conectaDataBase from './src/config/dbConnect.js';
import DocumentoController from './src/controllers/documentoController.js';
(async () => {
    const conexao = await conectaDataBase();
    conexao.on('error', (err) => {
        console.error('Erro de conexão: ', err);
    });

    conexao.once('open', () => {
        console.log('Conexão com o banco efetuada com sucesso.');
    });
})();
let documentos = await DocumentoController.listaUmDocumento('JavaScript');

console.log(documentos);
