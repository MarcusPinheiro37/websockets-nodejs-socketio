import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: [true, 'Nome do usuário é obrigatório'], unique: true },
    senha: { type: String, required: [true, 'Senha é obrigatória'] }
}, { versionKey: false });

// Pre-save hook to hash password
usuarioSchema.pre('save', async function(next) {
    if (this.isModified('senha')) {
        const hash = await bcrypt.hash(this.senha, 10); // Adjust the salt rounds as needed
        this.senha = hash;
    }
    next();
});

const Usuario = mongoose.model('usuarios', usuarioSchema);

export default Usuario;
