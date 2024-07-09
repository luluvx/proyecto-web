// src/routes/curso.routes.js
import express from 'express';
import { CursoController } from '../controllers/curso.controller.js';

const router = express.Router();

router.get('/', CursoController.getAll);
router.get('/:id', CursoController.getById);
router.post('/', CursoController.create);
router.put('/:id', CursoController.update);
router.delete('/:id', CursoController.delete);

router.get('/:id/lecciones', CursoController.courseWithLessons);
router.put('/:id/imagen', CursoController.updateCourseImage);

export default router;