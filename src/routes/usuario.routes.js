import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';

export const usuarioRouter = Router();

usuarioRouter.get('/', UsuarioController.getAll);

usuarioRouter.get('/:id',  UsuarioController.getById);

usuarioRouter.post('/', UsuarioController.create);

usuarioRouter.post('/login', UsuarioController.login);

usuarioRouter.put('/:id', UsuarioController.update);

usuarioRouter.delete('/:id', UsuarioController.delete);

usuarioRouter.get('/:id/cursos', UsuarioController.getCoursesByUserId);


export default usuarioRouter;
