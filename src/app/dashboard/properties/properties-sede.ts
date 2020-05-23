
export class PropertiesSede {
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
      key: 'route-sede',
      value: 'sede',
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
      key: 'label-localizacion',
      value: 'Localización',
    },
    {
      key: 'titulo-sede',
      value: 'Sedes',
    },
    {
      key: 'menu-sede',
      value: 'Sedes',
    },
    {
      key: 'table-actualizar-sede-col',
      value: ['id' , 'nombre', 'direccion', 'latitud', 'longitud']
    },
    {
      key: 'table-eliminar-sede-col',
      value: ['select', 'id' , 'nombre', 'direccion', 'latitud', 'longitud']
    },
    {
      key: 'table',
      matColumnDef : ['nombre', 'direccion', 'latitud', 'longitud'],
      matHeaderCellDef: ['Nombre', 'Dirección', 'Latitud', 'Longitud'],
    },

    {
      key: 'mat-form-field-sede',
      value: 'Nombre Sede',
      placeholder: 'ej: Principal.',
      control: 'nombre',
      error : 'Nombre Sede'
    },

    {
      key: 'r-c-sede',
      route: 'crear-sede',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-sede',
      route: 'actualizar-sede',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-sede',
      route: 'eliminar-sede',
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



