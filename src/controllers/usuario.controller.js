import { UsuarioModel } from '../models/usuario.js';

export class UsuarioController {
    static async login(req, res) {
        const { correo_electronico, contrasena } = req.body;
        try {
            const usuario = await UsuarioModel.login({ correo_electronico, contrasena });
            if (!usuario) {
                res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
                return;
            }

            res.json(usuario);
        }catch (error) {
            res.status(500).json({error: 'Error al iniciar sesión'});
        }
    }

    static async getAll(req, res) {
        try {
            const usuarios = await UsuarioModel.getAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const usuario = await UsuarioModel.getById({ id });
            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    static async create(req, res) {
        const { nombre, apellido, correo_electronico, contrasena, tipoDeUsuario } = req.body;
        if (!nombre || !apellido || !correo_electronico || !contrasena || !tipoDeUsuario) {
            res.status(400).json({ error: 'Todos los campos son requeridos' });
            return;
        }
        try {
            const nuevoUsuario = await UsuarioModel.create({ nombre, apellido, correo_electronico, contrasena, tipoDeUsuario });
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { nombre, apellido, correo_electronico, contrasena, tipoDeUsuario } = req.body;
        if (!nombre || !apellido || !correo_electronico || !contrasena || !tipoDeUsuario) {
            res.status(400).json({ error: 'Todos los campos son requeridos' });
            return;
        }
        try {
            const usuarioActualizado = await UsuarioModel.update({ id, nombre, apellido, correo_electronico, contrasena, tipoDeUsuario });
            if (!usuarioActualizado) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json(usuarioActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const usuarioEliminado = await UsuarioModel.delete({ id });
            if (!usuarioEliminado) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    }
    static async getCoursesByUserId(req, res) {
        const { id } = req.params;
        try {
            const cursos = await UsuarioModel.getCoursesByUserId({ id });
            res.json(cursos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los cursos del usuario' });
        }
    }
}
