
export class PropertiesEscuelaPrograma {
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
      key: 'route-escuela-programa',
      value: 'escuela-programa',
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
      key: 'titulo-escuela-programa',
      value: 'Escuela Programa',
    },
    {
      key: 'menu-escuela-programa',
      value: 'Escuela Programa',
    },
    {
      key: 'table-actualizar-escuela-programa-col',
      value: ['escuela' , 'programa' , 'anioInicial', 'anioFinal']
    },
    {
      key: 'table-eliminar-escuela-programa-col',
      value: ['select', 'escuela' , 'programa' , 'anioInicial', 'anioFinal']
    },
    {
      key: 'table',
      matColumnDef : ['escuela', 'programa' , 'anioInicial' , 'anioFinal'],
      matHeaderCellDef: ['Escuela' , 'Programa', 'Año Inicial', 'Año Final'],
    },
    {
      key: 'mat-form-field-escuela',
      value: 'Escuela',
      placeholder: 'ej: ing de sistemas.',
      control: 'escuela',
      error : 'Escuela'
    },
    {
      key: 'mat-form-field-programa',
      value: 'Programa',
      placeholder: 'ej: ing sistemas.',
      control: 'programa',
      error : 'Programa'
    },

    {
      key: 'mat-form-field-anio-inicial',
      value: 'Año Inicial',
      placeholder: 'ej: 2020',
      control: 'anioInicial',
      error : 'Año Inicial'
    },
    {
      key: 'mat-form-field-anio-final',
      value: 'Año Final',
      placeholder: 'ej: 9999',
      control: 'anioFinal',
      error : 'Año Final'
    },
    {
      key: 'r-c-escuela-programa',
      route: 'crear-escuela-programa',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-escuela-programa',
      route: 'actualizar-escuela-programa',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-escuela-programa',
      route: 'eliminar-escuela-programa',
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



