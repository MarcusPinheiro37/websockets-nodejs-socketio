import  documento  from '../models/Documento.js';

class DocumentoController {

    static async listaDocumentos(){
        const listaDocumentos = await documento.find();
        return listaDocumentos;
    }

    // Caso vá fazer com api request
    static async listaDocumentosReq(req, res){
        try {
            const listaDocumentos = await documento.find();
            res.status(200).json(listaDocumentos);
        } catch (error) {
            res.status(500).send(error);
        }
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

    static async adicionaDocumentos(nome){
        const novoDocumento = await documento.bulkWrite([
            {
                insertOne: {
                    document: {nome, texto: `Texto inicial de ${nome}`}
                }
            }
        ]);
        return novoDocumento;
    }

    static async deletaDocumento(nome){
        const deletaDoc = await documento.deleteOne({nome});
        return deletaDoc;
    }

    static async deletaErros(req, res){
        const { nome } = req.query;
        try {
            const documentoDeletado = await documento.deleteMany({nome});
            res.status(201).json({message: `Documentos com o nome ${nome} foram deletados`, documentoDeletado});
        } catch (error) {
            res.status(500).send('Erro ao deletar');
        }
        
    }
}

export default DocumentoController;
