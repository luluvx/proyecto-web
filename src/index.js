import express from 'express';
import cors from 'cors';

import categoriaRouter from './routes/categoria.routes.js';
import usuarioRouter from './routes/usuario.routes.js';
import cursoRouter from './routes/curso.routes.js';
import leccionRouter from './routes/leccion.routes.js';
import inscripcionRouter from './routes/inscripcion.routes.js';
import progresoRouter from './routes/progreso.routes.js';
import * as bodyParser from "express";

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT ?? 3001;
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ "mensaje": 'Hola mundo' });
});

// Rutas
app.use('/categorias', categoriaRouter);
app.use('/usuario', usuarioRouter);
app.use('/cursos', cursoRouter);
app.use('/lecciones', leccionRouter);
app.use('/inscripcion', inscripcionRouter);
app.use('/progreso', progresoRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);

});
