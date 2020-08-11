
export class PropertiesProgramaModalidad {

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
      key: 'menu-programa-modalidad',
      value: 'Programa Modalidad',
    },
    {
      key: 'route-programa-modalidad',
      value: 'programa-modalidad',
    },
    {
      key: 'titulo-programa-modalidad',
      value: 'Programa Modalidad'
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
      key: 'table-actualizar-programa-modalidad-col',
      value: ['programa', 'modalidad']
    },
    {
      key: 'table-eliminar-programa-modalidad-col',
      value: [ 'select' , 'programa' , 'modalidad']
    },
    {
      key: 'table',
      matColumnDef : ['programa' , 'modalidad'],
      matHeaderCellDef: ['Programa' , 'Modalidad'],
    },
    {
      key: 'mat-form-field-programa',
      value: 'Programa',
      placeholder: 'ej: ing de sistemas.',
      control: 'programa',
      error : 'Programa'
    },
    {
      key: 'mat-form-field-modalidad',
      value: 'Modalidad',
      placeholder: 'ej: Presencia - Distancia.',
      control: 'modalidad',
      error : 'Modalidad'
    },
    {
      key: 'r-c-programa-modalidad',
      route: 'crear-programa-modalidad',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-programa-modalidad',
      route: 'actualizar-programa-modalidad',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-programa-modalidad',
      route: 'eliminar-programa-modalidad',
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



