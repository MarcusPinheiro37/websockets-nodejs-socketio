
import 'dotenv/config';
import { Server } from 'socket.io';
import servidorHttp from './app.js';
import registrarEventosDocumento from './registrarEventos/documento.js';
import registrarEventosInicio from './registrarEventos/inicio.js';
import registrarEventosCadastro from './registrarEventos/cadastro.js';

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
    
    registrarEventosCadastro(socket, io);

    registrarEventosInicio(socket, io);
    
    registrarEventosDocumento(socket, io);

    socket.on('disconnect', (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
});
