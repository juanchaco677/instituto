
export class PropertiesNivelEducativo {
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
      key: 'route-nivel-educativo',
      value: 'nivel-educativo',
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
      key: 'titulo-nivel-educativo',
      value: 'nivel-educativo',
    },
    {
      key: 'menu-nivel-educativo',
      value: 'nivel-educativo',
    },
    {
      key: 'table-actualizar-nivel-educativo-col',
      value: ['id' , 'nombre', 'tipo']
    },
    {
      key: 'table-eliminar-nivel-educativo-col',
      value: [ 'select' , 'id' , 'nombre', 'tipo']
    },
    {
      key: 'table',
      matColumnDef : ['nombre', 'tipo'],
      matHeaderCellDef: ['Nombre', 'tipo'],
    },
    {
      key: 'mat-form-field-nombre',
      value: 'Nombre',
      placeholder: 'ej: Doctorado - Maestria - Pregrado.',
      control: 'nombre',
      error : 'Nombre'
    },
    {
      key: 'mat-form-field-tipo',
      value: 'Tipo',
      placeholder: 'ej: Doctorado - Maestria - Pregrado.',
      control: 'tipo',
      error : 'Tipo'
    },
    {
      key: 'mat-form-field-credito',
      value: 'Crédito',
      placeholder: 'ej: 5 - 6 - 4.',
      control: 'credito',
      error : 'Crédito'
    },
    {
      key: 'r-c-nivel-educativo',
      route: 'crear-nivel-educativo',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-nivel-educativo',
      route: 'actualizar-nivel-educativo',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-nivel-educativo',
      route: 'eliminar-nivel-educativo',
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



