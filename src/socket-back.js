
import 'dotenv/config';
import { Server } from 'socket.io';
import servidorHttp from './app.js';
import DocumentoController from './controllers/documentoController.js';

const io = new Server(servidorHttp, {
    cors: {
        origin: '*', // Permite acesso somente desta origem
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

// let documentos = DocumentoController.listaDocumentos;

export default io.on('connection', (socket) => {
    console.log('Um cliente se conectou. ID:', socket.id);

    socket.on('obter_documentos', async (devolverDocumentos) => {
        const documentos = await DocumentoController.listaDocumentos();
        devolverDocumentos(documentos);
    });

    socket.on('adicionar_documento', async (nomeDocumento) =>{
        const documentoExiste = (await DocumentoController.listaUmDocumento(nomeDocumento)) !== null;
        
        if(documentoExiste){
            socket.emit('documento_existente', nomeDocumento);
        } else{
            const resultado = await DocumentoController.adicionaDocumentos(nomeDocumento);
            console.log(resultado);
            if(resultado.insertedCount){
                io.emit('adicionar_documento_interface', nomeDocumento);
            }
        }
    });

    socket.on('selecionar_documento', async (nomeDocumento, devolverTexto) => {
        
        socket.join(nomeDocumento);
        const documento = await DocumentoController.listaUmDocumento(nomeDocumento);

        if(documento) {
            devolverTexto(documento.texto);
        }
    });

    socket.on('deleta_documento', async (nomeDocumento) => {
        const deletaDocumento = await DocumentoController.deletaDocumento(nomeDocumento);
        if(deletaDocumento.deletedCount){
            io.emit('excluir_documento_sucesso', nomeDocumento);
        }
    });

    socket.on('texto_editor', async ({ texto, nomeDocumento })  => {
        const documento = await DocumentoController.atualizaDocumento({nomeDocumento, texto});

        if(documento){
            socket.to(nomeDocumento).emit('texto_editor_clientes', texto);
        }
    });

    socket.on('disconnect', (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
});
