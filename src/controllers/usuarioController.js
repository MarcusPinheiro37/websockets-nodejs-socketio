import usuario from '../database/models/Usuarios.js';

export default class UsuarioController {
    static async cadastraUsuario(dados){
        const criaUsuario = await usuario.create(dados);
        return criaUsuario;
    }
}