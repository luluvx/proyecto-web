import {pool} from '../dbconfig.js'

export class ProgresoModel{
    static async createOrUpdateProgress({id_usuario,id_leccion}){
        try {
            const result = await pool.query('INSERT INTO progreso (id_usuario, id_leccion) VALUES ($1, $2) ON CONFLICT (id_usuario, id_leccion) DO UPDATE SET id_usuario = $1, id_leccion = $2 RETURNING *', [id_usuario, id_leccion]);
            return result.rows[0];
        } catch (error) {
            console.error(`Error al crear o actualizar el progreso: ${error.message}`);
            throw error;
        }
    }
    /*static async createProgress({id_usuario,id_leccion}){
        try {
            const result = await pool.query('INSERT INTO progreso (id_usuario, id_leccion) VALUES ($1, $2) RETURNING *', [id_usuario, id_leccion]);
            return result.rows[0];
        } catch (error) {
            console.error(`Error al crear el progreso: ${error.message}`);
            throw error;
        }
    }*/
    static async getProgressByUser({id_usuario}){
        try {
            const result = await pool.query('SELECT * FROM progreso WHERE id_usuario = $1', [id_usuario]);
            return result.rows;
        } catch (error) {
            console.error(`Error al obtener el progreso por usuario: ${error.message}`);
            throw error;
        }
    }
    static async getProgressByUserAndLesson({id_usuario,id_leccion}){
        try {
            const result = await pool.query('SELECT * FROM progreso WHERE id_usuario = $1 AND id_leccion = $2', [id_usuario,id_leccion]);
            return result.rows[0];
        } catch (error) {
            console.error(`Error al obtener el progreso por usuario y lección: ${error.message}`);
            throw error;
        }
    }
    static async getUserProgressInACourse({id_usuario,id_curso}){
        try{
            console.log(`Obteniendo el progreso del usuario ${id_usuario} en el curso ${id_curso}`);

            const totalLessons = await pool.query(
                'SELECT COUNT(*) as total FROM leccion WHERE id_curso = $1',
                [id_curso]
            );
            const totalLessonsCount = totalLessons.rows[0].total;
            console.log(`Total de lecciones en el curso: ${totalLessonsCount}`);

            const totalLessonsViewed = await pool.query(
                'SELECT COUNT(*) as total FROM progreso JOIN leccion ON progreso.id_leccion = leccion.id WHERE progreso.id_usuario = $1 AND leccion.id_curso = $2',
                [id_usuario, id_curso]
            );
            const totalLessonsViewedCount = totalLessonsViewed.rows[0].total;
            console.log(`Total de lecciones vistas por el usuario: ${totalLessonsViewedCount}`);

            if (totalLessonsCount === 0 || totalLessonsViewedCount === 0) {
                console.log("El usuario no ha visto ninguna lección o el curso no tiene lecciones.");
                return 0;
            }
            const progress = (totalLessonsViewedCount / totalLessonsCount) * 100;
            console.log(`Progreso del usuario en el curso: ${progress}`);
            return {progress};

        }catch (error) {
            console.error(`Error al obtener el progreso del usuario en el curso: ${error.message}`);
            throw error;
        }
    }




}