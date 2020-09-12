export class PropertiesMatricula {
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
      key: 'route-matricula',
      value: 'matricula',
    },
    {
      key: 'label-buscar',
      value: 'Buscar',
    },
    {
      key: 'label-eliminar',
      value: 'Eliminar',
    },
    {
      key: 'titulo-matricula',
      value: 'Matriculas',
    },
    {
      key: 'menu-matricula',
      value: 'Matriculas',
    },
    {
      key: 'table-actualizar-matricula-col',
      value: [
        'id',
        'escuela',
        'programa',
        'estudiante',
        'sede',
        'plan',
        'periodo',
        'ano',
      ],
    },
    {
      key: 'table-eliminar-matricula-col',
      value: [
        'select',
        'id',
        'escuela',
        'programa',
        'estudiante',
        'sede',
        'plan',
        'periodo',
        'ano',
      ],
    },
    {
      key: 'table',
      matColumnDef: [
        'escuela',
        'programa',
        'estudiante',
        'sede',
        'plan',
        'periodo',
        'ano',
      ],
      matHeaderCellDef: [
        'Escuela',
        'Programa',
        'Estudiante',
        'Sede',
        'Plan',
        'Periodo',
        'Año',
      ],
    },
    {
      key: 'mat-form-field-ano',
      value: 'Año',
      placeholder: 'ej: 2020 - 2050.',
      control: 'ano',
      error: 'Ano',
    },
    {
      key: 'mat-form-field-periodo',
      value: 'Periodo',
      placeholder: 'ej: 1 - 2 - 3.',
      control: 'periodo',
      error: 'Periodo',
    },
    {
      key: 'mat-form-field-plan',
      value: 'Plan',
      placeholder: 'ej: Semestral - Cuatrimestral - Otros.',
      control: 'plan',
      error: 'Plan',
    },
    {
      key: 'mat-form-field-sede',
      value: 'Sede',
      placeholder: 'ej: Edificio Central.',
      control: 'sede',
      error: 'Sede',
    },
    {
      key: 'mat-form-field-estudiante',
      value: 'Estudiante',
      placeholder: 'ej: juan camilo rodriguez diaz.',
      control: 'estudiante',
      error: 'Estudiante',
    },
    {
      key: 'mat-form-field-programa',
      value: 'Programa',
      placeholder: 'ej: Ingeniera De Sistemas.',
      control: 'programa',
      error: 'Programa',
    },
    {
      key: 'mat-form-field-escuela',
      value: 'Escuela',
      placeholder: 'ej: Ingeniera De Sistemas.',
      control: 'escuela',
      error: 'Escuela',
    },

    {
      key: 'r-c-matricula',
      route: 'crear-matricula',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!',
    },
    {
      key: 'r-a-matricula',
      route: 'actualizar-matricula',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!',
    },
    {
      key: 'r-e-matricula',
      route: 'eliminar-matricula',
      titulo: 'Eliminar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de eliminar!',
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
