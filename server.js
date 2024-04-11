import 'dotenv/config';
import app from './src/app.js';
import './src/socket-back.js'; // Importação lateral para garantir a execução

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => console.log(`Servidor escutando na porta ${PORT}`));
