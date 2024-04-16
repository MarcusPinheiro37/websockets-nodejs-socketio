import { emitirCadastroUsuario } from './socket-front-cadastro.js';

const form = document.getElementById('form-cadastro');

form.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    const usuario = form['input-usuario'].value;
    const senha = form['input-senha'].value;

    emitirCadastroUsuario({usuario,senha});
});