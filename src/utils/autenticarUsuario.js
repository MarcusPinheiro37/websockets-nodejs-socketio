import bcrypt from 'bcrypt';

export default async function autenticarUsuario(dados) {
    const { user, senha } = dados;

    try {
        const isMatch = await bcrypt.compare(senha, user.senha);

        if (isMatch) {
            return { success: true, message: 'Autenticação bem-sucedida.' };
        } else {
            throw new Error('Senha inválida.');
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}