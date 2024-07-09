// src/controllers/curso.controller.js
import { CursoModel } from '../models/curso.js';

export class CursoController {
    static async getAll(req, res) {
        try {
            const cursos = await CursoModel.getAll();
            res.json(cursos);
        }catch (error) {
            console.error(`Error al obtener los cursos: ${error.message}`);
            res.status(500).json({ error: 'Error al obtener los cursos' });
        }

    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const curso = await CursoModel.getById({ id });
            if (!curso) {
                res.status(404).json({ error: 'Curso no encontrado' });
                return;
            }
            res.json(curso);
        }catch (error) {
            console.error(`Error al obtener el curso por id: ${error.message}`);
            res.status(500).json({ error: 'Error al obtener el curso por id' });
        }
    }

    static async create(req, res) {
        try {
            const { nombre, pre_descripcion, descripcion, imagen_curso, id_categoria, id_usuario } = req.body;
            if (!nombre || !pre_descripcion || !descripcion || !imagen_curso || !id_categoria || !id_usuario) {
                res.status(400).json({ error: 'Nombre, pre_descripcion, descripcion, imagen_curso, id_categoria e id_usuario son requeridos' });
                return;
            }
            const nuevoCurso = await CursoModel.create({ nombre, pre_descripcion, descripcion, imagen_curso, id_categoria, id_usuario });
            res.status(201).json(nuevoCurso);
        }catch (error){
            console.error(`Error al crear el curso: ${error.message}`);
            res.status(500).json({ error: 'Error al crear el curso' });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, pre_descripcion, descripcion } = req.body;
            const cursoActualizado = await CursoModel.update({ id, nombre, pre_descripcion, descripcion });
            res.json(cursoActualizado);
        }catch (error) {
            console.error(`Error al actualizar el curso: ${error.message}`);
            res.status(500).json({ error: 'Error al actualizar el curso' });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const cursoEliminado = await CursoModel.delete({ id });
            res.json(cursoEliminado);
        }catch (error) {
            console.error(`Error al eliminar el curso: ${error.message}`);
            res.status(500).json({ error: 'Error al eliminar el curso' });
        }
    }
    static async getLessonsByCourse(req, res) {
        const { courseId } = req.params;
        const lessons = await CursoModel.getLessonsByCourse({ courseId });
        res.json(lessons);
    }
    static async courseWithLessons(req, res) {
        try {
            const { id } = req.params;
            const cursos = await CursoModel.courseWithLessons(id);
            if (!cursos) {
                res.status(404).json({ error: 'Curso no encontrado' });
                return;
            }
            res.json(cursos);
        }catch (error) {
            console.error(`Error al obtener el curso con lecciones: ${error.message}`);
            res.status(500).json({ error: 'Error al obtener el curso con lecciones' });
        }
    }
    static async updateCourseImage(req, res) {
        try {
            const { id: courseId } = req.params;
            const { imagen_curso: courseImage } = req.body;

            console.log('Datos recibidos para actualizar la imagen:', { courseId });

            if (!courseImage) {
                return res.status(400).json({ error: 'No se proporcionó la imagen del curso' });
            }

            const cursoActualizado = await CursoModel.updateCourseImage({ courseId, courseImage });
            console.log('Imagen del curso actualizada');

            res.json(cursoActualizado);
        } catch (error) {
            console.error(`Error al actualizar la imagen del curso: ${error.message}`);
            res.status(500).json({ error: 'Error al actualizar la imagen del curso' });
        }
    }
}