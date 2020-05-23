
export class PropertiesModalidad {

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
      key: 'menu-modalidad',
      value: 'Modalidad',
    },
    {
      key: 'route-modalidad',
      value: 'modalidad',
    },
    {
      key: 'titulo-modalidad',
      value: 'Modalidad'
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
      key: 'table-actualizar-modalidad-col',
      value: ['id', 'nombre' , 'tipo' , 'descripcion']
    },
    {
      key: 'table-eliminar-modalidad-col',
      value: [ 'select' , 'id', 'nombre' , 'tipo' , 'descripcion']
    },
    {
      key: 'table',
      matColumnDef : ['nombre' , 'tipo' , 'descripcion'],
      matHeaderCellDef: ['Nombre', 'Tipo' , 'Descripción'],
    },
    {
      key: 'mat-form-field-nombre',
      value: 'Nombre',
      placeholder: 'ej: Presencial - Distancia - Virtual - Otro.',
      control: 'nombre',
      error : 'Nombre'
    },
    {
      key: 'mat-form-field-descripcion',
      value: 'Descripción',
      placeholder: 'ej:...',
      control: 'descripcion',
      error : 'Descripción'
    },
    {
      key: 'mat-form-field-tipo',
      value: 'Tipo',
      placeholder: '',
      control: 'tipo',
      error : 'Tipo'
    },
    {
      key: 'mat-form-field-descripcion',
      value: 'Descripción',
      placeholder: 'ej: descripción descripción descripción descripción descripción descripción.',
      control: 'descripcion',
      error : 'Descripción'
    },
    {
      key: 'r-c-modalidad',
      route: 'crear-modalidad',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-modalidad',
      route: 'actualizar-modalidad',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-modalidad',
      route: 'eliminar-modalidad',
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



