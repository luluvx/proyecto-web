
import {pool} from '../dbconfig.js'
export class CategoriaModel{
    static async getAll() {
        try {
            const { rows } = await pool.query("SELECT id, nombre, encode(imagen, 'base64') as imagen FROM categoria");
            return rows;
        }catch (error) {
            console.error(`Error al obtener las categorías: ${error.message}`);
            throw error;
        }
    }
    static async getById({ id }) {
        try {
            const {rows} = await pool.query("SELECT id, nombre, encode(imagen, 'base64') as imagen FROM categoria WHERE id = $1", [id]);
            const[categoria] = rows;
            return categoria;
        }catch (error) {
            console.error(`Error al obtener la categoría por id: ${error.message}`);
            throw error;
        }

    }
    static async create({ nombre, imagen }) {
        try {
            const result = await pool.query(
                "INSERT INTO categoria(nombre, imagen) VALUES ($1, decode($2, 'base64')) RETURNING id, nombre, encode(imagen, 'base64') as imagen",
                [nombre, imagen]
            );
            const [categoria] = result.rows;
            return categoria;
        }catch (error) {
            console.error(`Error al crear la categoría: ${error.message}`);
            throw error;
        }

    }
    static async update({ id, nombre, imagen }) {
        try {
            const result = await pool.query(
                "UPDATE categoria SET nombre = $1, imagen = decode($2, 'base64') WHERE id = $3 RETURNING id, nombre, encode(imagen, 'base64') as imagen",
                [nombre, imagen, id]
            );
            const [categoria] = result.rows;
            return categoria;
        }catch (error) {
            console.error(`Error al actualizar la categoría: ${error.message}`);
            throw error;
        }
    }
    static async delete({ id }) {
        try {
            const result = await pool.query("DELETE FROM categoria WHERE id = $1 RETURNING *", [id]);
            const [categoria] = result.rows;
            return categoria;
        }catch (error) {
            console.error(`Error al eliminar la categoría: ${error.message}`);
            throw error;
        }
    }
    static async categoryWithCourses(id) {
        try {
            const { rows } = await pool.query("SELECT id, nombre, encode(imagen, 'base64') as imagen FROM categoria WHERE id = $1", [id]);
            const [categoria] = rows;

            if (categoria) {
                const { rows: cursos } = await pool.query("SELECT id, nombre, pre_descripcion, descripcion, encode(imagen_curso, 'base64') as imagen_curso, id_categoria, id_usuario FROM curso WHERE id_categoria = $1", [categoria.id]);
                categoria.cursos = cursos;
            }

            return categoria;
        }catch (error) {
            console.error(`Error al obtener la categoría con sus cursos: ${error.message}`);
            throw error;
        }

    }





}