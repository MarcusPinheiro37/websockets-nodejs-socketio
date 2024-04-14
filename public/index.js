import { emitirAdicionarDocumento } from './socket-front-index.js';

const listaDocumentos = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDocumento = document.getElementById('input-documento');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    emitirAdicionarDocumento(inputDocumento.value);
    inputDocumento.value = '';
});

function inserirLinkDocumento(nome){
    listaDocumentos.innerHTML += `
    <a href="documento.html?nome=${nome}" class="list-group-item list-group-item-action" 
    id="documento-${nome}">
    ${nome}
    </a>
    `;
}

function removerLinkDocumento(nome){
    const documento = document.getElementById(`documento-${nome}`);
    
    listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };

// const response = await fetch('http://192.168.1.12:3000/documentos');
// const documentos = await response.json();

// documentos.map((documento) => {
//     return inserirLinkDocumento(documento.nome);
// });

