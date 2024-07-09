import {loadCategories} from "./categories.js";
import {loadAllCourses, loadCoursesByCategory} from "./courses.js";
import {isAuthenticated, getUserInSession} from './utils.js';

document.addEventListener("DOMContentLoaded", function() {
    loadCategories()
    loadAllCourses()
    if (isAuthenticated()) {
        const user = getUserInSession();
        console.log(`Bienvenido ${user.nombre} ${user.apellido}`);

    }else {
        console.log('Bienvenido, usuario no registrado');
    }
});