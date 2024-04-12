import mongoose from 'mongoose';

const documentoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: [true, 'Nome do texto é obrigatório'] },
    texto: { type: String }
}, {versionKey: false});

const documento = mongoose.model('documentos', documentoSchema);

export default documento;