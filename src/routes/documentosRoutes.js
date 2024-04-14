import express from 'express';
import DocumentoController from '../controllers/documentoController.js';

const routes = express.Router();

routes.get('/documentos', DocumentoController.listaDocumentosReq);
routes.delete('/documentos', (req, res) => DocumentoController.deletaErros(req, res));


export default routes;