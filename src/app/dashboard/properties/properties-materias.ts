
export class PropertiesMateria {
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
      key: 'route-materia',
      value: 'asignatura',
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
      key: 'titulo-materia',
      value: 'Asignaturas',
    },
    {
      key: 'menu-materia',
      value: 'Asignaturas',
    },
    {
      key: 'table-actualizar-materia-col',
      value: ['id' , 'nombre', 'credito']
    },
    {
      key: 'table-eliminar-materia-col',
      value: [ 'select' , 'id' , 'nombre', 'credito']
    },
    {
      key: 'table',
      matColumnDef : ['nombre', 'credito'],
      matHeaderCellDef: ['Nombre', 'Crédito'],
    },
    {
      key: 'mat-form-field-nombre',
      value: 'Nombre',
      placeholder: 'ej: Calculo I - Filosofia - Fisica.',
      control: 'nombre',
      error : 'Nombre'
    },
    {
      key: 'mat-form-field-credito',
      value: 'Crédito',
      placeholder: 'ej: 5 - 6 - 4.',
      control: 'credito',
      error : 'Crédito'
    },
    {
      key: 'r-c-asignatura',
      route: 'crear-asignatura',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-asignatura',
      route: 'actualizar-asignatura',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-asignatura',
      route: 'eliminar-asignatura',
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



