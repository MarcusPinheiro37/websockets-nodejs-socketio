
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

const documentos = [
    {
        nome: 'JavaScript',
        texto: 'texto javascript'
    },
    {
        nome: 'Node',
        texto: 'texto node'
    },
    {
        nome: 'Socket.io',
        texto: 'texto socket.io'
    },
];

export default io.on('connection', (socket) => {
    console.log('Um cliente se conectou. ID:', socket.id);

    socket.on('selecionar_documento', (nomeDocumento, devolverTexto) => {
        
        socket.join(nomeDocumento);
        const documento = encontrarDocumento(nomeDocumento);

        if(documento) {
            devolverTexto(documento.texto);
        }
    });

    socket.on('texto_editor', ({ texto, nomeDocumento }) => {
        socket.to(nomeDocumento).emit('texto_editor_clientes', texto);
    });

    socket.on('disconnect', (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
});

function encontrarDocumento(nomeDocumento){
    const documento = documentos.find((documento) => {
        return documento.nome === nomeDocumento;
    });
    return documento;
}