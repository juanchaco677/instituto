import { Usuario } from '../modelo/usuario';
export class Sesion {
  /**
   * agregar el usuario logueado
   */
  static setUser(usuario: Usuario) {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }
  static getSesionStorage(): any {
    return JSON.parse(sessionStorage.getItem('usuario'));
  }
  static getSesionStorageEmail(): any {
    return JSON.parse(sessionStorage.getItem('email'));
  }
  static getCookie(name: string) {

    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        if (c.substring(cookieName.length, c.length) !== '') {
          return c.substring(cookieName.length, c.length);
        }
      }
    }
    return null;
  }
  static deleteCookie(name: string) {
    const expiry = new Date();
    expiry.setTime(expiry.getTime() - 3600);
    document.cookie = name + '=; expires=' + expiry.toUTCString() + '; path=/';
  }
  /**
   * obtener el usuario logueado
   */
  static user(): Usuario {
    return Sesion.getSesionStorage() as Usuario;
  }
  /**
   * eliminar usuario
   */
  static delete() {
    sessionStorage.removeItem('usuario');
  }
  /**
   * eliminar todos los elementos
   */
  static clear() {
    sessionStorage.clear();
  }
}
