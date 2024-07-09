export function  getUserInSession(){
    const userInSession = localStorage.getItem('userInSession');//
    if (!userInSession) {
        return null;
    }
    let user = null;
    try {
        user = JSON.parse(userInSession);

    }catch (error){
        console.error('Error al obtener el usuario de la sesión:', error);

    }
    return user;
}
export function isAuthenticated(){
    return getUserInSession() !== null;
}
export function logout() {
    localStorage.removeItem('userInSession');
    console.log('Sesión cerrada');
    window.location.href = '../../index.html';

}

/*export function  setUserInSession(user){
    localStorage.setItem('user', JSON.stringify(user));
}
export function  removeUserInSession(){
    localStorage.removeItem('user');
}
export function  isAuthenticated(){
    return !!getUserInSession();
}
export function  isAdmin(){
    const user = getUserInSession();
    return user && user.tipodeusuario === 'admin';
}*/
/*export function  logout(){
    removeUserInSession();
    window.location.href = 'login.html';
}*/