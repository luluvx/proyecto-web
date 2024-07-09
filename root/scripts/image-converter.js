import fs from 'fs';
import path from 'path';

// Usar __dirname para obtener la ruta absoluta
const __dirname = path.resolve();

// Ruta al archivo de imagendesarrollo-web.png
const imagePath = path.join(__dirname, 'root/assets/images/mi-primera-pagina-web.png');

// Leer el archivo de imagen y convertirlo a base64
try {
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
    console.log(imageBase64);
} catch (error) {
    console.error(`Error leyendo la imagen: ${error.message}`);
}
