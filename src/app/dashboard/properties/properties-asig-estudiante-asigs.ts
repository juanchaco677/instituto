export class PropertiesAsigEstudianteAsigs {
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
      key: 'menu-asig-estudiante-asigs',
      value: 'Asignar Materia Estudiante',
    },
    {
      key: 'route-asig-estudiante-asigs',
      value: 'asig-estudiante-asigs',
    },
    {
      key: 'titulo-asig-estudiante-asigs',
      value: 'Asignar Materia Estudiante',
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
      key: 'table-actualizar-asig-estudiante-asigs-col',
      value: ['id', 'programa', 'estudiante', 'plan', 'materia', 'periodo', 'ano_gravable'],
    },
    {
      key: 'table-eliminar-asig-estudiante-asigs-col',
      value: [
        'select',
        'id',
        'programa',
        'estudiante',
        'plan',
        'materia',
        'periodo',
        'ano_gravable',
      ],
    },
    {
      key: 'table',
      matColumnDef: [
        'programa',
        'estudiante',
        'plan',
        'materia',
        'periodo',
        'ano_gravable',
      ],
      matHeaderCellDef: [
        'Programa',
        'Estudiante',
        'Plan',
        'Materia',
        'Periodo',
        'Año',
      ],
    },
    {
      key: 'mat-form-field-programa',
      value: 'Programa',
      placeholder: 'ej: Ing De Sistemas.',
      control: 'programa',
      error: 'programa',
    },
    {
      key: 'mat-form-field-plan',
      value: 'Plan',
      placeholder: 'ej: Cuatrimestral - Bimestral.',
      control: 'plan',
      error: 'Plan',
    },
    {
      key: 'mat-form-field-estudiante',
      value: 'Estudiante',
      placeholder: 'ej: Camilo',
      control: 'estudiante',
      error: 'Estudiante',
    },
    {
      key: 'mat-form-field-materia',
      value: 'Materia',
      placeholder: 'ej: Física',
      control: 'materia',
      error: 'Materia',
    },
    {
      key: 'mat-form-field-periodo',
      value: 'Periodo',
      placeholder: 'ej: Física',
      control: 'periodo',
      error: 'Periodo',
    },
    {
      key: 'mat-form-field-ano',
      value: 'Año',
      placeholder: 'ej: 2020 - 2050',
      control: 'ano',
      error: 'Año',
    },
    {
      key: 'mat-form-field-profesor',
      value: 'Profesor',
      placeholder: 'ej: Carol Tatiana Rodriguez Becerra..',
      control: 'profesor',
      error: 'Profesor',
    },
    {
      key: 'mat-form-field-salon',
      value: 'Salón',
      placeholder: 'ej: RA - A',
      control: 'salon',
      error: 'Salón',
    },
    {
      key: 'r-c-asig-estudiante-asigs',
      route: 'crear-asig-estudiante-asigs',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!',
    },
    {
      key: 'r-a-asig-estudiante-asigs',
      route: 'actualizar-asig-estudiante-asigs',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!',
    },
    {
      key: 'r-e-asig-estudiante-asigs',
      route: 'eliminar-asig-estudiante-asigs',
      titulo: 'Eliminar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de eliminar!',
    },
    {
      key: 'route-redirect-web',
      route: '../living-room',
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
