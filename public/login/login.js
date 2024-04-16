import { emitirAutenticarUsuario } from './socket-front-login.js';

const form = document.getElementById('form-login');

form.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    const usuario = form['input-usuario'].value;
    const senha = form['input-senha'].value;

    emitirAutenticarUsuario({usuario,senha});
});