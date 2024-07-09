
import { pool } from '../dbconfig.js';

export class CursoModel {
    static async getAll() {
        try {
            const result = await pool.query('SELECT id, nombre, pre_descripcion, descripcion, encode(imagen_curso, \'base64\') as imagen_curso, id_categoria, id_usuario FROM curso');
            return result.rows;
        }catch (error) {
            console.error(`Error al obtener los cursos: ${error.message}`);
            throw error;
        }
    }

    static async getById({ id }) {
        try {
            const result = await pool.query('SELECT id, nombre, pre_descripcion, descripcion, encode(imagen_curso, \'base64\') as imagen_curso, id_categoria, id_usuario FROM curso WHERE id = $1', [id]);
            return result.rows[0];
        }catch (error) {
            console.error(`Error al obtener el curso por id: ${error.message}`);
            throw error;
        }

    }

    static async create({ nombre, pre_descripcion, descripcion, imagen_curso, id_categoria, id_usuario }) {
        try {
            const result = await pool.query(
                'INSERT INTO curso(nombre, pre_descripcion, descripcion, imagen_curso, id_categoria, id_usuario) VALUES ($1, $2, $3, decode($4, \'base64\'), $5, $6) RETURNING id, nombre, pre_descripcion, descripcion, encode(imagen_curso, \'base64\') as imagen_curso, id_categoria, id_usuario',
                [nombre, pre_descripcion, descripcion, imagen_curso, id_categoria, id_usuario]
            );
            return result.rows[0];
        }catch (error) {
            console.error(`Error al crear el curso: ${error.message}`);
            throw error;
        }
    }

    static async update({ id, nombre, pre_descripcion, descripcion }) {
        try {
            const result = await pool.query(
                'UPDATE curso SET nombre = $1, pre_descripcion = $2, descripcion = $3 WHERE id = $4 RETURNING id, nombre, pre_descripcion, descripcion',
                [nombre, pre_descripcion, descripcion, id]
            );
            return result.rows[0];
        }catch (error){
            console.error(`Error al actualizar el curso: ${error.message}`);
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const result = await pool.query('DELETE FROM curso WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(`Error al eliminar el curso: ${error.message}`);
            throw error;
        }
    }
    static async getLessonsByCourse({ courseId }) {
        try {
            const { rows } = await pool.query(
                "SELECT * FROM leccion WHERE id_curso = $1 ORDER BY orden ASC",
                [courseId]
            );
            return rows;
        }catch (error) {
            console.error(`Error al obtener las lecciones del curso: ${error.message}`);
            throw error;
        }


    }
    static async courseWithLessons(id) {
        try {
            const { rows } = await pool.query("SELECT id, nombre, pre_descripcion, descripcion, encode(imagen_curso, 'base64') as imagen_curso, id_categoria, id_usuario FROM curso WHERE id = $1", [id]);
            const [curso] = rows;

            if (curso) {
                const { rows: lecciones } = await pool.query("SELECT id, id_curso, tituloLeccion, descripcion, orden, tipoContenido, contenido FROM leccion WHERE id_curso = $1 ORDER BY orden ASC", [curso.id]);
                curso.lecciones = lecciones;
            }
            return curso;
        }catch (error) {
            console.error(`Error al obtener el curso con lecciones: ${error.message}`);
            throw error;
        }
    }
    static async updateCourseImage({ courseId, courseImage }) {
        try {
            const result = await pool.query(
                'UPDATE curso SET imagen_curso = decode($1, \'base64\') WHERE id = $2 ',
                [courseImage, courseId]
            );
            return result.rows[0];
        }catch (error) {
            console.error(`Error al actualizar la imagen del curso: ${error.message}`);
            throw error;
        }
    }
}