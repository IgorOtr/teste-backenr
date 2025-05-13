import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { sequelize } from '../config/database';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());

// Serve imagens da pasta de uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'public/uploads')));

// Rotas da aplicação
app.use(userRoutes);

// Conecta e sincroniza com banco de dados
sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL'))
  .catch(err => console.error('Erro de conexão:', err));

sequelize.sync();

export default app;
