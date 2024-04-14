import { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento } from './socket-front-documento.js';

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get('nome');

const deletaDocumento = document.getElementById('excluir-documento');
const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById('titulo-documento');

tituloDocumento.textContent = nomeDocumento || 'Documento sem título';

selecionarDocumento(nomeDocumento);

textoEditor.addEventListener('keyup', () => {
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumento});
});

function atualizaTextoEditor(texto) {
    textoEditor.value = texto;
}

function alertarERedirecionar(nome){
    if (nome === nomeDocumento){
        alert(`Documento ${nome} excluído`);
        window.location.href = '/';
    }
}

deletaDocumento.addEventListener('click', () =>{
    emitirExcluirDocumento(nomeDocumento);
});

export {atualizaTextoEditor, alertarERedirecionar};

