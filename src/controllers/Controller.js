export default class Controller{
    constructor(nomeModel){
        this.model = nomeModel;
    }
    async listaDados(){
        const listaDocumentos = await this.model.find();
        return listaDocumentos;
        
    }
    async listaDadosReq(req, res){
        try {
            const listaDocumentos = await this.model.find();
            res.status(200).json(listaDocumentos);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async listaUmDado(query){
        const listaDocumento = await this.model.findOne(query);
        return listaDocumento;
    }

}