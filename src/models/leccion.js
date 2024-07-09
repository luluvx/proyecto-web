import {pool} from '../dbconfig.js'
export class LeccionModel{
    static async getAll() {

        try {
            const { rows } = await pool.query("SELECT * FROM leccion");
            return rows;
        }catch (error) {
            console.error(`Error al obtener las lecciones: ${error.message}`);
            throw error;
        }
    }
    static async getById({ id }) {
        try {
            const {rows} = await pool.query("SELECT * FROM leccion WHERE id = $1", [id]);
            const[leccion] = rows;
            return leccion;
        }catch (error) {
            console.error(`Error al obtener la leccion por id: ${error.message}`);
            throw error;
        }
    }
    static async create({ id_curso, tituloLeccion, descripcion, orden, tipoContenido, contenido }) {
        try {
            const result = await pool.query(
                "INSERT INTO leccion(id_curso, tituloLeccion, descripcion, orden, tipoContenido, contenido) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [id_curso, tituloLeccion, descripcion, orden, tipoContenido, contenido]
            );
            const [leccion] = result.rows;
            return leccion;
        }catch (error) {
            console.error(`Error al crear la leccion: ${error.message}`);
            throw error;
        }
    }
    static async update({ id, tituloLeccion, descripcion, orden, tipoContenido, contenido }) {
        try {
            const result = await pool.query(
                "UPDATE leccion SET tituloLeccion = $1, descripcion = $2, orden = $3, tipoContenido = $4, contenido = $5 WHERE id = $6 RETURNING *",
                [tituloLeccion, descripcion, orden, tipoContenido, contenido, id]
            );
            const [leccion] = result.rows;
            return leccion;
        }catch (error) {
            console.error(`Error al actualizar la leccion: ${error.message}`);
            throw error;
        }
    }
    static async delete({ id }) {
        try {
            const result = await pool.query("DELETE FROM leccion WHERE id = $1 RETURNING *", [id]);
            const [leccion] = result.rows;
            return leccion;
        }catch (error) {
            console.error(`Error al eliminar la leccion: ${error.message}`);
            throw error;
        }
    }
    static async getByCourseId({ id_curso }) {
        try {
            const { rows } = await pool.query("SELECT * FROM leccion WHERE id_curso = $1", [id_curso]);
            return rows;
        }catch (error) {
            console.error(`Error al obtener la leccion por id del curso: ${error.message}`);
            throw error;
        }

    }

    static async getLessonsByCourse({ id_curso }) {
        try {
            const { rows } = await pool.query(
                "SELECT * FROM leccion WHERE id_curso = $1 ORDER BY orden ASC",
                [id_curso]
            );
            return rows;
        }catch (error) {
            console.error(`Error al obtener las lecciones del curso: ${error.message}`);
            throw error;
        }
    }
    static async getOrdenes({ id_curso }) {
        try {
            const { rows } = await pool.query(
                "SELECT orden FROM leccion WHERE id_curso = $1",
                [id_curso]
            );
            return rows;
        }catch (error) {
            console.error(`Error al obtener los ordenes de las lecciones: ${error.message}`);
            throw error;
        }
    }



}