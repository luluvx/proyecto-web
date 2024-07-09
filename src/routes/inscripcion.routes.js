import express from 'express';
import { InscripcionController } from '../controllers/inscripcion.controller.js';

const router = express.Router();


router.get('/usuario/:id_usuario', InscripcionController.getByUserId);
router.get('/curso/:id_curso', InscripcionController.getByCourseId);
router.get('/', InscripcionController.getAll);
router.delete('/:id', InscripcionController.delete);
router.get('/:id_usuario/:id_curso', InscripcionController.getByUserAndCourse);
router.post('/', InscripcionController.create);


export default router;