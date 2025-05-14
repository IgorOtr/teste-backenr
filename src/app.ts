import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { sequelize } from '../config/database';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'public/uploads')));
app.use(userRoutes);
sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL'))
  .catch(err => console.error('Erro de conexão:', err));

sequelize.sync();

export default app;
