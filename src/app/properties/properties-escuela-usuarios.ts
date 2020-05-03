
export class PropertiesEscuelaUsuarios {
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
      key: 'route-escuela-usuario',
      value: 'escuela-usuario',
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
      key: 'titulo-escuela-usuario',
      value: 'Escuela Usuarios',
    },
    {
      key: 'menu-escuela-usuario',
      value: 'Escuela Usuarios',
    },
    {
      key: 'table-eliminar-escuela-usuario-col',
      value: ['select', 'cedula', 'usuario', 'escuela']
    },
    {
      key: 'table',
      matColumnDef : ['cedula', 'usuario', 'escuela'],
      matHeaderCellDef: ['cedula', 'Usuario', 'Escuela'],
    },

    {
      key: 'mat-form-field-escuela-usuario',
      value: 'Nombre Usuario',
      placeholder: 'ej: carlos humberto rodriguez parra.',
      control: 'nombre',
      error : 'Nombre Usuario'
    },

    {
      key: 'r-c-escuela-usuario',
      route: 'crear-escuela-usuario',
      parameter: ['pr'],
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-e-escuela-usuario',
      route: 'eliminar-escuela-usuario',
      parameter: ['pr'],
      titulo: 'Eliminar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de eliminar!'
    },
  ];

  get(key: string): any {
    // tslint:disable-next-line: no-shadowed-variable
    for (const element of this.datos) {
      if (element.key === key) {
        return element;
      }
    }

    return '';
  }

}



