import  documento  from '../models/Documento.js';

class DocumentoController {

    static async listaDocumentos(){
        const listaDocumentos = await documento.find();
        return listaDocumentos;
    }

    static async listaUmDocumento(nome){
        const listaDocumento = await documento.findOne({ nome });
        return listaDocumento;
    }
    
    static async atualizaDocumento(dados){
        const { nomeDocumento, texto } = dados;
        const documentoAtualizado = await documento.findOneAndUpdate({nome: nomeDocumento}, {texto});
        return documentoAtualizado;
    }
    // static async buscaDocumento(req, res){
    //     try {
    //         const listaDocumento = await documento.findById(req.params.id);            
    //         if(listaDocumento !== null){
    //             res.status(200).json(listaDocumento);
    //         } else {
    //             res.status(404).send('Documento nao encontrado');
    //         }
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // }

    static async adicionaDocumentoes(req, res){
        try {
            const novoDocumento = await documento.create(req.body);
            res.status(201).json({ message: 'Inserido com sucesso', documento: novoDocumento });        
        } catch(error) {
            res.status(500).send(error);
        }
    }
}

export default DocumentoController;
