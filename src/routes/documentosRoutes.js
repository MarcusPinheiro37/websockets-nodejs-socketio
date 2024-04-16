import express from 'express';
import DocumentoController from '../controllers/documentoController.js';
const documentoController = new DocumentoController();
const routes = express.Router();

routes.get('/documentos', (req, res) => documentoController.listaDadosReq(req, res));
routes.delete('/documentos', (req, res) => documentoController.deletaErros(req, res));


export default routes;