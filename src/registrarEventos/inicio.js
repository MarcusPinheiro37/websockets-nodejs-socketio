import DocumentoController from '../controllers/documentoController.js';

const documentoController = new DocumentoController();



export default async function registrarEventosInicio(socket, io){
    socket.on('obter_documentos', async (devolverDocumentos) => {
        const documentos = await documentoController.listaDados();
        devolverDocumentos(documentos);
    });

    socket.on('adicionar_documento', async (nomeDocumento) =>{
        const documentoExiste = (await documentoController.listaUmDado({nome: nomeDocumento})) !== null;
        
        if(documentoExiste){
            socket.emit('documento_existente', nomeDocumento);
        } else{
            const resultado = await documentoController.adicionaDocumentos(nomeDocumento);
            if(resultado.insertedCount){
                io.emit('adicionar_documento_interface', nomeDocumento);
            }
        }
    });
}