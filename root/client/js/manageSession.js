import { isAuthenticated, getUserInSession } from './utils.js';

window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function () {
    if (isAuthenticated()) {
        window.history.pushState(null, null, window.location.href);
    } else {
        window.location.href = '/index.html';
    }
});
/*
Gustavito el mas maco
function preventBackNavigation() {
    window.history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function () {
        const currentUser = getCurrentUser();
        if (currentUser) {
            window.history.pushState(null, document.title, location.href);
        } else {
            window.location.href = '../../index.html';
        }
    });
}
}*/
