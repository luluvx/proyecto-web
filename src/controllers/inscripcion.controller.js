import {InscripcionModel} from "../models/inscripcion.js";

export class InscripcionController{
    static async create(req, res){
        const {id_usuario, id_curso} = req.body;
        try {
            const inscripcion = await InscripcionModel.create({id_usuario, id_curso});
            res.status(201).json(inscripcion);
            console.log('Inscripcion creada', inscripcion);
        }catch (error){
            console.error('Error creando inscripcion', error);
            res.status(400).json({error: error.message})
        }
    }
    static async getByUserId(req, res){
        const {id_usuario} = req.params;
        try {
            const inscripciones = InscripcionModel.getByUserId({id_usuario});
            res.status(200).json(inscripciones);
            console.log('Inscripciones obtenidas por usuario', inscripciones);
        }catch (error){
            console.error('Error obteniendo inscripciones por usuario:', error);
            res.status(400).json({error: error.message});
        }
    }
    static async getByCourseId(req, res){
        const {id_curso} = req.params;
        try {
            const inscripciones = InscripcionModel.getByCourseId({id_curso});
            res.status(200).json(inscripciones);
            console.log('Inscripciones obtenidas por curso', inscripciones);
        }catch (error){
            console.error('Error obteniendo inscripciones por curso:', error);
            res.status(400).json({error: error.message});
        }
    }
    static async getAll(req, res){
        try {
            const inscripciones = await InscripcionModel.getAll();
            res.status(200).json(inscripciones);
            console.log('Inscripciones obtenidas', inscripciones);
        }catch (error){
            console.error('Error obteniendo inscripciones:', error);
            res.status(400).json({error: error.message});
        }
    }
    static async delete(req, res){
        const {id} = req.params;
        try {
            const inscripcion = await InscripcionModel.delete({id});
            res.status(200).json(inscripcion);
            console.log('Inscripcion eliminada', inscripcion);
        }catch (error){
            console.error('Error eliminando inscripcion', error);
            res.status(400).json({error: error.message});
        }
    }

    static async getByUserAndCourse(req, res) {
        const { id_usuario, id_curso } = req.params;
        try {
            const inscripcion = await InscripcionModel.getByUserAndCourse({ id_usuario, id_curso });
            if (inscripcion) {
                res.status(200).json({ enrolled: true });
            } else {
                res.status(200).json({ enrolled: false });
            }
            console.log('Inscripcion obtenida por usuario y curso', inscripcion);
        } catch (error) {
            console.error('Error obteniendo inscripcion por usuario y curso', error);
            res.status(400).json({ error: error.message });
        }
    }

}