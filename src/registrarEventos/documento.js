import DocumentoController from '../controllers/documentoController.js';

export default async function registrarEventosDocumento(socket,io){
    socket.on('selecionar_documento', async (nomeDocumento, devolverTexto) => {
        
        socket.join(nomeDocumento);
        const documento = await DocumentoController.listaUmDocumento(nomeDocumento);
    
        if(documento) {
            devolverTexto(documento.texto);
        }
    });
    
    socket.on('texto_editor', async ({ texto, nomeDocumento })  => {
        const documento = await DocumentoController.atualizaDocumento({nomeDocumento, texto});
    
        if(documento){
            socket.to(nomeDocumento).emit('texto_editor_clientes', texto);
        }
    });
    
    socket.on('deleta_documento', async (nomeDocumento) => {
        const deletaDocumento = await DocumentoController.deletaDocumento(nomeDocumento);
        if(deletaDocumento.deletedCount){
            io.emit('excluir_documento_sucesso', nomeDocumento);
        }
    });
    
}