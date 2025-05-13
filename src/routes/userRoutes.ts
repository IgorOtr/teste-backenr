import express from 'express';
import multer from 'multer';
import path from 'path';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/register', upload.single('fotoPerfil'), userController.register);
router.post('/login', userController.login);
router.get('/profile/:id', authMiddleware, userController.profile);
router.put('/update', authMiddleware, upload.single('fotoPerfil'), userController.update);
router.delete('/delete', authMiddleware, userController.delete);

export default router;
