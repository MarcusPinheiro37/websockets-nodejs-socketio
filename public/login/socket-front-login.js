// eslint-disable-next-line no-undef
const socket = io('http://192.168.1.12:3000');

function emitirAutenticarUsuario(dados){
    socket.emit('autenticar_usuario', dados);
}

socket.on('sucesso_autenticar_usuario', () =>{
    alert('Cadastro realizado com sucesso');
});
socket.on('erro_autenticar_usuario', (erro) =>{
    alert(`Erro ao autenticar usuário ${erro}`);
});

socket.on('autenticacao_login_sucesso', (msg, tokenJwt) => {
    alert(msg);
    window.location.href = '/';
});
socket.on('autenticacao_login_erro', (msg) => {
    alert(msg);
});
socket.on('usuario_nao_encontrado', () => {
    alert('Usuário não encontrado');
});
export { emitirAutenticarUsuario };