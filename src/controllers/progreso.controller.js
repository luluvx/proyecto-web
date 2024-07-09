import {ProgresoModel} from "../models/progreso.js";

export class ProgresoController{
    static async createOrUpdateProgress(req,res){
        const {id_usuario,id_leccion} = req.body;
        if(!id_usuario || !id_leccion){
            res.status(400).json({error: 'Todos los campos son requeridos'});
            return;
        }
        try {
            const progreso = await ProgresoModel.createOrUpdateProgress({id_usuario,id_leccion});
            res.status(201).json(progreso);
        } catch (error) {
            res.status(500).json({error: 'Error al crear o actualizar el progreso'});
        }
    }
    static async getProgressByUser(req,res){
        const {id_usuario} = req.params;
        try {
            const progreso = await ProgresoModel.getProgressByUser({id_usuario});
            res.json(progreso);
        } catch (error) {
            res.status(500).json({error: 'Error al obtener el progreso por usuario'});
        }
    }
    static async getProgressByUserAndLesson(req,res){
        const {id_usuario,id_leccion} = req.params;
        try {
            const progreso = await ProgresoModel.getProgressByUserAndLesson({id_usuario,id_leccion});
            res.json(progreso);
        } catch (error) {
            res.status(500).json({error: 'Error al obtener el progreso por usuario y lección'});
        }
    }
    static async getUserProgressInACourse(req,res){
        const {id_usuario,id_curso} = req.params;
        try {
            const progreso = await ProgresoModel.getUserProgressInACourse({id_usuario,id_curso});
            res.json(progreso);
        } catch (error) {
            res.status(500).json({error: 'Error al obtener el progreso del usuario en el curso'});
        }
    }


}