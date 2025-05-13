import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { userService } from '../services/userService';
import dotenv from 'dotenv';

dotenv.config();

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const { nome, email, senha, dataNascimento } = req.body;
      const hashedPassword = await bcrypt.hash(senha, 10);
      const fotoPerfil = req.file ? req.file.filename : '';

      const newUser = await userService.createUser({
        nome,
        email,
        senha: hashedPassword,
        fotoPerfil,
        dataNascimento,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao registrar usuário.' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const user = await userService.findByEmail(email);
      if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

      const isMatch = await bcrypt.compare(senha, user.senha);
      if (!isMatch) return res.status(401).json({ error: 'Credenciais inválidas' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
      });

      return res.json({ token });
    } catch (error) {
        console.error('Erro detalhado no login:', error);
        return res.status(500).json({ error: 'Erro no login' });
      }
  },

  async profile(req: Request, res: Response) {
    try {
      const user = await userService.findById(Number(req.params.id));
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.body.id);
      const updateData = req.body;
      if (req.file) updateData.fotoPerfil = req.file.filename;

      const updatedUser = await userService.updateUser(id, updateData);
      return res.json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.body.id);
      await userService.deleteUser(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao deletar usuário' });
    }
  },
};
