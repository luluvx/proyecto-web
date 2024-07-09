import {Router} from "express";
import {LeccionController} from "../controllers/leccion.controller.js";

export const leccionRouter = Router();
leccionRouter.get('/', LeccionController.getAll);
leccionRouter.get('/:id', LeccionController.getById);
leccionRouter.post('/', LeccionController.create);
leccionRouter.put('/:id', LeccionController.update);
leccionRouter.delete('/:id', LeccionController.delete);
leccionRouter.get('/curso/:id_curso', LeccionController.getLessonsByCourse);
leccionRouter.get('/ordenes/:id_curso/',LeccionController.getOrdenes);

export default leccionRouter;

