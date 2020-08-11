
export class PropertiesUsuario {

  /**
   * r=> ruta
   * f=formulario
   * t=>tabla
   * m=>menu
   * c=>campo
   * a=>actualizar
   * e=>eliminar
   * r-c=>route - crear
   */
  datos = [
    {
      key: 'route-usuario',
      value: 'auth',
    },
    {
      key: 'label-buscar',
      value: 'Buscar'
    },
    {
      key: 'label-eliminar',
      value: 'Eliminar'
    },
    {
      key: 'titulo-profesor',
      value: 'Profesor'
    },
    {
      key: 'menu-profesor',
      value: 'Profesor',
    },
    {
      key: 'menu-estudiante',
      value: 'Estudiante',
    },
    {
      key: 'table-actualizar-usuario-col',
      value: ['id', 'nombre', 'correo', 'cedula', 'celular' ]
    },
    {
      key: 'table-eliminar-usuario-col',
      value: ['select' , 'id', 'nombre', 'correo', 'cedula', 'celular' ]
    },
    {
      key: 'table',
      matColumnDef: ['nombre', 'correo', 'cedula', 'celular'],
      matHeaderCellDef: ['Nombre', 'Correo', 'Cédula', 'Celular']
    },
    {
      key: 'r-c-usuario',
      route: 'crear-usuario',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-usuario',
      route: 'actualizar-usuario',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-usuario',
      route: 'eliminar-usuario',
      titulo: 'Eliminar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de eliminar!'
    },
  ];


  get(key: string ): any {

    // tslint:disable-next-line: no-shadowed-variable
    for (const element of this.datos) {
      if (element.key === key) {
        return element;
      }
    }

    return '';
  }

}



