import {pool} from '../dbconfig.js';

export class InscripcionModel {
    static async create({id_usuario, id_curso}) {
        try {
            const result = await pool.query('INSERT INTO inscripcion (id_usuario, id_curso) VALUES ($1, $2) RETURNING *', [id_usuario, id_curso]);
            return result.rows[0];
        } catch (error) {
            console.error(`Error al crear la inscripción: ${error.message}`);
            throw error;
        }
    }

    static async getAll() {
        try {
            const result = await pool.query('SELECT * FROM inscripcion');
            return result.rows;
        } catch (error) {
            console.error(`Error al obtener las inscripciones: ${error.message}`);
            throw error;
        }
    }

    static async getById({id}) {
        try {
            const result = await pool.query('SELECT * FROM inscripcion WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(`Error al obtener la inscripción por id: ${error.message}`);
            throw error;
        }
    }

    static async getByUserId({id_usuario}) {
        try {
            const {rows} = await pool.query('SELECT * FROM inscripcion WHERE id_usuario = $1', [id_usuario]);
            return rows;
        } catch (error) {
            console.error(`Error al obtener la inscripcion por la id del usuario: ${error.message}`);
            throw error;
        }
    }

    static async getByCourseId({id_curso}) {
        try {
            const {rows} = await pool.query('SELECT * FROM inscripcion WHERE id_curso = $1', [id_curso]);
            return rows;
        } catch (error) {
            console.error(`Error al obtener la inscripcion por la id del curso: ${error.message}`);
            throw error;
        }
    }


    static async delete({id}) {
        const result = await pool.query('DELETE FROM inscripcion WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    static async getByUserAndCourse({id_usuario, id_curso}) {
        try {
            const result = await pool.query('SELECT * FROM inscripcion WHERE id_usuario = $1 AND id_curso = $2', [id_usuario, id_curso]);
            return result.rows[0];
        } catch (error) {
            console.error(`Error al obtener la inscripcion por el id del usuario y del curso: ${error.message}`);
            throw error;
        }
    }

    static async getCoursesByUserId({id_usuario}) {
        try {
            const result = await pool.query(
                `SELECT curso.id, curso.nombre, curso.descripcion, curso.imagen_curso
                 FROM inscripcion
                          JOIN curso ON inscripcion.id_curso = curso.id
                 WHERE inscripcion.id_usuario = $1`,
                [id_usuario]
            );
            return result.rows;
        } catch (error) {
            console.error(`Error al obtener los cursos por el id del usuario: ${error.message}`);
            throw error;

        }
    }
}