import UsuarioController from '../controllers/usuarioController.js';

const usuarioController = new UsuarioController();

export default async function registrarEventosCadastro(socket, io){
    socket.on('cadastrar_usuario', async (dados) =>{
        try {
            await usuarioController.cadastraUsuario(dados);
            socket.emit('sucesso_cadastro_usuario');
        } catch (error) {
            socket.emit('erro_cadastro_usuario', error.errmsg);
        }
    });
}