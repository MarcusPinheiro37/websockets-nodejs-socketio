import express from 'express';
import cors from 'cors';
import url from 'url';
import { join, dirname } from 'path';
import documentos from './documentosRoutes.js';

const caminhoAtual  = url.fileURLToPath(import.meta.url);
const diretorioPublico = join(dirname(caminhoAtual ), '../..', 'public');

export default app => {
    app.use(cors());
    app.use(express.json(), documentos);
    app.use(express.static(diretorioPublico));
    
    // app.route('/').get((req, res) => res.status(200).send('Curso Node JS'));
    
    // app.use(express.json());
};
