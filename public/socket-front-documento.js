import { atualizaTextoEditor } from './documento.js';

// eslint-disable-next-line no-undef
const socket = io('http://192.168.1.12:3000');

function emitirTextoEditor(texto) {
    socket.emit('texto_editor', texto);
}

socket.on('texto_editor_clientes', (texto) =>{
    atualizaTextoEditor(texto);
});

socket.on('disconnect', (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
});

export { emitirTextoEditor };