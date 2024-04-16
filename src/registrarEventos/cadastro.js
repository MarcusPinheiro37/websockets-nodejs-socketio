import UsuarioController from '../controllers/usuarioController.js';

export default async function registrarEventosCadastro(socket, io){
    socket.on('cadastrar_usuario', async (dados) =>{
        try {
            await UsuarioController.cadastraUsuario(dados);
            socket.emit('sucesso_cadastro_usuario');
        } catch (error) {
            socket.emit('erro_cadastro_usuario', error.errmsg);
        }
    });
}