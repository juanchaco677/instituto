
export class PropertiesEscuela {
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
      key: 'route-escuela',
      value: 'escuela',
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
      key: 'titulo-escuela',
      value: 'Escuelas',
    },
    {
      key: 'menu-escuela',
      value: 'Escuelas',
    },
    {
      key: 'table-actualizar-escuela-col',
      value: ['id' , 'nombre', 'sede']
    },
    {
      key: 'table-eliminar-escuela-col',
      value: [ 'select' , 'id' , 'nombre', 'sede']
    },
    {
      key: 'table',
      matColumnDef : ['nombre', 'sede'],
      matHeaderCellDef: ['Nombre', 'Sede'],
    },
    {
      key: 'mat-form-field-sede',
      value: 'Sede',
      placeholder: 'ej: Carrera # - .',
      control: 'sede',
      error : 'Sede'
    },
    {
      key: 'mat-form-field-escuela',
      value: 'Escuela',
      placeholder: 'ej: Ing de sistemas.',
      control: 'nombre',
      error : 'Nombre'
    },

    {
      key: 'r-c-escuela',
      route: 'crear-escuela',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-escuela',
      route: 'actualizar-escuela',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-escuela',
      route: 'eliminar-escuela',
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



