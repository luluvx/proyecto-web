import {Router} from 'express';

import {CategoriaController} from '../controllers/categoria.controller.js';

export const categoriaRouter = Router();

categoriaRouter.get('/', CategoriaController.getAll);

categoriaRouter.get('/:id', CategoriaController.getById);

categoriaRouter.post('/', CategoriaController.create);
categoriaRouter.put('/:id', CategoriaController.update);
categoriaRouter.delete('/:id', CategoriaController.delete);
categoriaRouter.get('/:id/cursos', CategoriaController.categoryWithCourses);


export default categoriaRouter;
