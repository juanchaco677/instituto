
export class PropertiesSalones {

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
      key: 'menu-salon',
      value: 'Salones Clase',
    },
    {
      key: 'route-salon',
      value: 'salon',
    },
    {
      key: 'titulo-salon',
      value: 'Salones Clase'
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
      key: 'table-actualizar-salon-col',
      value: ['id', 'nombre' , 'sede']
    },
    {
      key: 'table-eliminar-salon-col',
      value: [ 'select' , 'id', 'nombre' , 'sede' ]
    },
    {
      key: 'table',
      matColumnDef : ['nombre' , 'sede' ],
      matHeaderCellDef: ['Nombre', 'Sede'],
    },
    {
      key: 'mat-form-field-nombre',
      value: 'Nombre',
      placeholder: 'ej: RA305.',
      control: 'nombre',
      error : 'Nombre'
    },
    {
      key: 'mat-form-field-sede',
      value: 'Sede',
      placeholder: 'ej: central',
      control: 'sede',
      error : 'Sede'
    },
    {
      key: 'r-c-salon',
      route: 'crear-salon',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-salon',
      route: 'actualizar-salon',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-salon',
      route: 'eliminar-salon',
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



