import { ProgramacionHorario } from './../dashboard/modelo/programacion-horario';
import { VideoBoton } from 'src/app/aula-virtual/model/video-boton';
import { Usuario } from './../dashboard/modelo/usuario';
import { RolUsuario } from './../dashboard/modelo/rol-usuario';
export class Sesion {
  /**
   * agregar el usuario logueado
   */
  static setUser(usuario: Usuario, aula?: boolean) {
    this.delete();
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    if (aula) {
      sessionStorage.setItem(
        'usuarioAulaChat',
        JSON.stringify({
          email: usuario.email,
          id: usuario.id,
          nombre: usuario.nombre,
          nombre_uno: usuario.nombre_uno,
          nombre_dos: usuario.nombre_dos,
          apellido_uno: usuario.apellido_uno,
          apellido_dos: usuario.apellido_dos,
          tipo: usuario.tipo,
          cedula: usuario.cedula,
          foto: usuario.foto,
          sex: usuario.sex,
          rol: usuario.rol,
          socket: '',
          color: '',
          boton: new VideoBoton(false, false, false, false, false)
        })
      );
    }
  }
  static setRolUser(rolUsuario: RolUsuario) {
    sessionStorage.setItem('rolUsuario', JSON.stringify(rolUsuario));
  }

  static setProgramacion(data: any){
    localStorage.setItem('programacion', JSON.stringify(data));
  }

  static setObjectAux(data: any){
    localStorage.setItem('objectAux', JSON.stringify(data));
  }

  static getObjectAux(): any{
    return JSON.parse(localStorage.getItem('objectAux'));
  }

  static getProgramacion(): ProgramacionHorario{
    return JSON.parse(localStorage.getItem('programacion'));
  }
  static getSesionStorage(): any {
    return JSON.parse(sessionStorage.getItem('usuario'));
  }
  static getSesionStorageRolUser(): any {
    return JSON.parse(sessionStorage.getItem('rolUsuario'));
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
  static userAulaChat(): any {
    return JSON.parse(sessionStorage.getItem('usuarioAulaChat'));
  }

  static rolUser(): Usuario {
    return Sesion.getSesionStorageRolUser() as RolUsuario;
  }
  /**
   * eliminar usuario
   */
  static delete() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rolUsuario');
  }
  /**
   * eliminar todos los elementos
   */
  static clear() {
    sessionStorage.clear();
  }
}
