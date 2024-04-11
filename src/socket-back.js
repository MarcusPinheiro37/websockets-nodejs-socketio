
import 'dotenv/config';
import { Server } from 'socket.io';
import servidorHttp from './app.js';

const io = new Server(servidorHttp, {
    cors: {
        origin: '*', // Permite acesso somente desta origem
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('Um cliente se conectou. ID:', socket.id);
    
    socket.on('selecionar_documento', (nomeDocumento) => {
        socket.join(nomeDocumento);
    });

    socket.on('texto_editor', ({ texto, nomeDocumento }) => {
        socket.to(nomeDocumento).emit('texto_editor_clientes', texto);
    });

    socket.on('disconnect', (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
});
export default io;
