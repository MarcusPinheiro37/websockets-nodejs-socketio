import DocumentoController from '../controllers/documentoController.js';

export default async function registrarEventosInicio(socket, io){
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
}