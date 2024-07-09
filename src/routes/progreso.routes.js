import express from "express";
import { ProgresoController } from "../controllers/progreso.controller.js";
const router = express.Router();

router.post("/", ProgresoController.createOrUpdateProgress);
router.get("/:id_usuario", ProgresoController.getProgressByUser);
router.get("/:id_usuario/:id_leccion", ProgresoController.getProgressByUserAndLesson);
router.get("/usuario/:id_usuario/curso/:id_curso", ProgresoController.getUserProgressInACourse);

export default router;