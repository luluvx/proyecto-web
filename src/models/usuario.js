import { pool } from '../dbconfig.js';
import bcrypt from 'bcrypt';

export class UsuarioModel {
    static async login({ correo_electronico, contrasena }) {
        try {
            const { rows } = await pool.query("SELECT id, nombre, apellido, correo_electronico, contrasena, tipoDeUsuario FROM usuario WHERE correo_electronico = $1", [correo_electronico]);
            const [usuario] = rows;
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!contrasenaValida) {
                throw new Error("Contraseña incorrecta");
            }
            return usuario;
        }catch (error) {
            console.error(`Error al iniciar sesión: ${error.message}`);
            throw error;
        }

    }
    static async getAll() {
        try {
            const { rows } = await pool.query("SELECT id, nombre, apellido, correo_electronico, tipoDeUsuario FROM usuario");
            return rows;
        }catch (error) {
            console.error(`Error al obtener los usuarios: ${error.message}`);
            throw error;
        }
    }

    static async getById({ id }) {
        try {
const { rows } = await pool.query("SELECT id, nombre, apellido, correo_electronico, tipoDeUsuario FROM usuario WHERE id = $1", [id]);
            const [usuario] = rows;
            return usuario;
        }catch (error) {
            console.error(`Error al obtener el usuario por id: ${error.message}`);
            throw error;
        }
    }
    static async create({ nombre, apellido, correo_electronico, contrasena, tipoDeUsuario }) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
            const result = await pool.query(
                "INSERT INTO usuario(nombre, apellido, correo_electronico, contrasena, tipoDeUsuario) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, apellido, correo_electronico, tipoDeUsuario",
                [nombre, apellido, correo_electronico, hashedPassword, tipoDeUsuario]
            );
            const [usuario] = result.rows;
            return usuario;
        }catch (error) {
            console.error(`Error al crear el usuario: ${error.message}`);
            throw error;
        }

    }

    static async update({ id, nombre, apellido, correo_electronico, contrasena, tipoDeUsuario }) {
        try {
            // Encriptar la contraseña antes de guardarla en la base de datos
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            const result = await pool.query(
                "UPDATE usuario SET nombre = $1, apellido = $2, correo_electronico = $3, contrasena = $4, tipoDeUsuario = $5 WHERE id = $6 RETURNING id, nombre, apellido, correo_electronico, tipoDeUsuario",
                [nombre, apellido, correo_electronico, hashedPassword, tipoDeUsuario, id]
            );
            const [usuario] = result.rows;
            return usuario;
        }catch (error) {
            console.error(`Error al actualizar el usuario: ${error.message}`);
            throw error;
        }
    }
    static async delete({ id }) {
        try {
            const result = await pool.query("DELETE FROM usuario WHERE id = $1 RETURNING id", [id]);
            const [usuario] = result.rows;
            return usuario;
        }catch (error) {
            console.error(`Error al eliminar el usuario: ${error.message}`);
            throw error;
        }
    }
    static async getCoursesByUserId({ id }) {
        try {
            const { rows } = await pool.query(
                `SELECT curso.id, curso.nombre, encode(curso.imagen_curso, 'base64') as imagen_curso
                 FROM inscripcion
                 JOIN curso ON inscripcion.id_curso = curso.id
                 WHERE inscripcion.id_usuario = $1`,
                [id]
            );
            return rows;
        }catch (error) {
            console.error(`Error al obtener los cursos por el id del usuario: ${error.message}`);
            throw error;
        }
    }
}
