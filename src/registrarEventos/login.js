import UsuarioController from '../controllers/usuarioController.js';
import autenticarUsuario from '../utils/autenticarUsuario.js';
import gerarJwt from '../utils/gerarJwt.js';

const usuarioController = new UsuarioController();

export default function registrarEventosLogin(socket, io){
    socket.on('autenticar_usuario', async ({usuario, senha}) =>{
        const user = await usuarioController.listaUmDado({usuario});

        if(user){
            const autenticado = await autenticarUsuario({user, senha});
            if(autenticado.success){
                const tokenJwt = gerarJwt({ usuario });
                socket.emit('autenticacao_login_sucesso', autenticado.message, tokenJwt);
            } else{
                socket.emit('autenticacao_login_erro', autenticado.message);
            }
        } else{
            socket.emit('usuario_nao_encontrado');
        } 
    });
}