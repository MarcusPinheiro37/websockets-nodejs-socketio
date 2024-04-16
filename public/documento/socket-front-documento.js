import { atualizaTextoEditor, alertarERedirecionar } from './documento.js';

// eslint-disable-next-line no-undef
const socket = io('http://192.168.1.12:3000');

function selecionarDocumento(nome){
    socket.emit('selecionar_documento', nome, (texto) => {
        atualizaTextoEditor(texto);
    });
}

function emitirTextoEditor(dados) {
    socket.emit('texto_editor', dados);
}

socket.on('texto_editor_clientes', (texto) =>{
    atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nomeDocumento){
    socket.emit('deleta_documento', nomeDocumento);
}

socket.on('excluir_documento_sucesso', (nome) => {
    alertarERedirecionar(nome);
});

socket.on('disconnect', (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
});


export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };