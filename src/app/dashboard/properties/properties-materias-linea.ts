
export class PropertiesMateriaLinea {
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
      key: 'route-materia-linea',
      value: 'linea-asignatura',
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
      key: 'mat-form-field-materia-origen',
      value: 'Materia Origen',
      placeholder: 'ej: Calculo I - Filosofia - Fisica.',
      control: 'materiaOrigen',
      error : 'Materia Origen'
    },

    {
      key: 'titulo-materia-linea',
      value: 'Linea Asignaturas',
    },
    {
      key: 'menu-titulo-materia-linea',
      value: 'Linea Asignaturas'
    },
    {
      key: 'table-eliminar-col',
      value: ['select', 'materiaOrigen', 'credito', 'materia', 'credito']
    },
    {
      key: 'table',
      matColumnDef : ['materiaOrigen', 'creditoOrigen', 'materia', 'credito'],
      matHeaderCellDef: ['Asignatura Origen', 'Crédito', 'Asignatura', 'Crédito'],
    },
    {
      key: 'mat-form-field-materia',
      value: 'Materia',
      placeholder: 'ej: Calculo I - Filosofia - Fisica.',
      control: 'materia',
      error : 'Materia'
    },
    {
      key: 'r-c-linea-asignatura',
      route: 'crear-asignatura',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-linea-asignatura',
      route: 'actualizar-asignatura',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-linea-asignatura',
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



