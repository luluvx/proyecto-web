import {LeccionModel} from "../models/leccion.js";
export class LeccionController{
    static async getAll(req,res){
        try {
            const lecciones = await LeccionModel.getAll();
            res.json(lecciones);
        }catch (error) {
            console.error(`Error al obtener las lecciones: ${error.message}`);
            res.status(500).json({error: 'Error al obtener las lecciones'});
        }
    }
    static async getById(req,res){
        try {

            const {id} = req.params;
            const leccion = await LeccionModel.getById({id});
            if(!leccion){
                res.status(404).json({error: 'Leccion no encontrada'});
                return;
            }
            res.json(leccion);
        }catch (error) {
            console.error(`Error al obtener la leccion por id: ${error.message}`);
            res.status(500).json({error: 'Error al obtener la leccion por id'});
        }
    }
    static async create(req,res){
        try {
            const {id_curso,tituloLeccion,descripcion,orden,tipoContenido,contenido} = req.body;
            if(!id_curso || !tituloLeccion || !descripcion || !orden || !tipoContenido || !contenido){
                res.status(400).json({error: 'Todos los campos son requeridos'});
                return;
            }
            const nuevaLeccion = await LeccionModel.create({id_curso,tituloLeccion,descripcion,orden,tipoContenido,contenido});
            res.status(201).json(nuevaLeccion);
        }catch (error) {
            console.error(`Error al crear la leccion: ${error.message}`);
            res.status(500).json({error: 'Error al crear la leccion'});
        }
    }
    static async update(req,res){
        try {
            const {id} = req.params;
            const {tituloLeccion,descripcion,orden,tipoContenido,contenido} = req.body;
            const leccion = await LeccionModel.update({id,tituloLeccion,descripcion,orden,tipoContenido,contenido});
            res.json(leccion);
        }catch (error) {
            console.error(`Error al actualizar la leccion: ${error.message}`);
            res.status(500).json({error: 'Error al actualizar la leccion'});
        }
    }
    static async delete(req,res){
        try {
            const {id} = req.params;
            const leccion = await LeccionModel.delete({id});
            res.json(leccion);
        }catch (error) {
            console.error(`Error al eliminar la leccion: ${error.message}`);
            res.status(500).json({error: 'Error al eliminar la leccion'});
        }
    }
    static async getByCourseId(req,res){
        try {
            const {id_curso} = req.params;
            const lecciones = await LeccionModel.getByCourseId({id_curso});
            res.json(lecciones);
        }catch (error) {
            console.error(`Error al obtener las lecciones por id de curso: ${error.message}`);
            res.status(500).json({error: 'Error al obtener las lecciones por id de curso'});
        }
    }
    static async getLessonsByCourse(req,res){
        try {
            const {id_curso} = req.params;
            const lecciones = await LeccionModel.getLessonsByCourse({id_curso});
            res.json(lecciones);
        }catch (error) {
            console.error(`Error al obtener las lecciones del curso: ${error.message}`);
            res.status(500).json({error: 'Error al obtener las lecciones del curso'});
        }
    }
    static async getOrdenes(req,res){
        try {
            const {id_curso} = req.params;
            const ordenes = await LeccionModel.getOrdenes({id_curso});
            res.json(ordenes);
        }catch (error) {
            console.error(`Error al obtener los ordenes de las lecciones: ${error.message}`);
            res.status(500).json({error: 'Error al obtener los ordenes de las lecciones'});
        }
    }

}