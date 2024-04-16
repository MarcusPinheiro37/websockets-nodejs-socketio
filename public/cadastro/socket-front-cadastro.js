// eslint-disable-next-line no-undef
const socket = io('http://192.168.1.12:3000');

function emitirCadastroUsuario(dados){
    socket.emit('cadastrar_usuario', dados);
}

socket.on('sucesso_cadastro_usuario', () =>{
    alert('Cadastro realizado com sucesso');
});
socket.on('erro_cadastro_usuario', (erro) =>{
    alert(`Erro ao cadatrar usuário ${erro}`);
});

export { emitirCadastroUsuario };