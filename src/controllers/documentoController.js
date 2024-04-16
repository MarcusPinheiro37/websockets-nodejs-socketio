import documento from '../database/models/Documento.js';
import Controller from './Controller.js';

class DocumentoController extends Controller {
    constructor(){
        super(documento);
    }
    
    async atualizaDocumento(dados){
        const { nomeDocumento, texto } = dados;
        const documentoAtualizado = await documento.findOneAndUpdate({nome: nomeDocumento}, {texto});
        return documentoAtualizado;
    }

    async adicionaDocumentos(nome){
        const novoDocumento = await documento.bulkWrite([
            {
                insertOne: {
                    document: {nome, texto: `Texto inicial de ${nome}`}
                }
            }
        ]);
        return novoDocumento;
    }

    async deletaDocumento(nome){
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
