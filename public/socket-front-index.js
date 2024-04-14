import { inserirLinkDocumento, removerLinkDocumento } from './index.js';

// eslint-disable-next-line no-undef
const socket = io('http://192.168.1.12:3000');

socket.emit('obter_documentos', (documentos) => {
    documentos.forEach(documento => inserirLinkDocumento(documento.nome));
});

function emitirAdicionarDocumento(nome){
    socket.emit('adicionar_documento', nome);
}

socket.on('documento_existente', (nome) => {
    alert(`Documento ${nome} já existe`);
});

socket.on('excluir_documento_sucesso', (nome) =>{
    removerLinkDocumento(nome);
});

socket.on('adicionar_documento_interface', (nome) => {
    inserirLinkDocumento(nome);
});

export { emitirAdicionarDocumento };