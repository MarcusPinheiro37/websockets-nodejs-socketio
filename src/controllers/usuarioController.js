import usuario from '../database/models/Usuarios.js';
import Controller from './Controller.js';

export default class UsuarioController extends Controller{
    constructor(){
        super(usuario);
    }
    async cadastraUsuario(dados){
        const criaUsuario = await usuario.create(dados);
        return criaUsuario;
    }
}