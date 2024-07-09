import { CategoriaModel } from '../models/categoria.js';

export class CategoriaController{
    static async getAll(req,res){
        try {
            const categoria = await CategoriaModel.getAll();
            res.json(categoria);
        }catch (error) {
            console.error(`Error al obtener las categorías: ${error.message}`);
            res.status(500).json({error: 'Error al obtener las categorías'});
        }
    }

    static async getById(req, res) {

        try {
            const { id } = req.params; // Obtener el id de los parámetros de la solicitud
            const categoria = await CategoriaModel.getById({id}); // Llamar al método del modelo
            if (!categoria) {
                res.status(404).json({ error: 'Categoria no encontrada' }); // Manejar si no se encuentra la categoría
                return;
            }
            res.json(categoria); // Devolver la categoría encontrada

        }catch (error){
            console.error(`Error al obtener la categoría por id: ${error.message}`);
            res.status(500).json({ error: 'Error al obtener la categoría' });
        }

        
    }
    static async create(req, res) {
        try {
            const { nombre, imagen } = req.body; // Obtener los datos del cuerpo de la solicitud
            if (!nombre || !imagen) {
                res.status(400).json({ error: 'Nombre e imagen son requeridos' });
                return;
            }
            try {
                const nuevaCategoria = await CategoriaModel.create({ nombre, imagen });
                res.status(201).json(nuevaCategoria);
            }catch (error) {
                res.status(500).json({ error: 'Error al crear la categoría' });
            }

        }catch (error) {
            console.error(`Error al crear la categoría: ${error.message}`);
            res.status(500).json({ error: 'Error al crear la categoría' });
        }

    }
    static async update(req,res){
        try {
            const {id} = req.params;
            const {nombre,imagen} = req.body;
            const categoria = await CategoriaModel.update({id,nombre,imagen});
            res.json(categoria);
        }catch (error) {
            console.error(`Error al actualizar la categoría: ${error.message}`);
            res.status(500).json({error: 'Error al actualizar la categoría'});
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaModel.delete({ id });
            if (!categoria) {
                res.status(404).json({ error: 'Categoria no encontrada' });
                return;
            }
            res.json({ mensaje: 'Categoria eliminada' });
        } catch (error) {
            console.error(`Error al eliminar la categoría: ${error.message}`);
            if (error.code === '23503') { //codigo de error por la clave  foránea
                res.status(400).json({ error: 'No se puede eliminar la categoría porque tiene cursos asignados.' });
            } else {
                res.status(500).json({ error: 'Error al eliminar la categoría' });
            }
        }
    }

    static async categoryWithCourses(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaModel.categoryWithCourses(id);
            if (!categoria) {
                res.status(404).json({ error: 'Categoria no encontrada' });
                return;
            }
            res.json(categoria);
        }catch (error) {
            console.error(`Error al obtener la categoría con cursos: ${error.message}`);
            res.status(500).json({ error: 'Error al obtener la categoría con cursos' });
        }

    }




}