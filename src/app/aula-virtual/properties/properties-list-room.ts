export class PropertiesListRoom {
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
      key: 'route-programacion-horario',
      value: 'programacion-horario',
    },
    {
      key: 'route-redirect-web',
      route: '../../aula-virtual/living-room',
    },
    {
      key: 'route-redirect-web-video',
      route: '../../clase-videos',
    },
    {
      key: 'route-redirect-web-presentacion',
      route: '../../clase-presentaciones',
    },
    {
      key: 'route-redirect-web-foro-comentarios',
      route: '../../foro-comentarios',
    },
    {
      key: 'route-programacion-horario-estudiante',
      value: 'programacion-horario-estudiante',
    },
    {
      key: 'label-buscar',
      value: 'Buscar',
      placeholder: 'Materia'
    },
    {
      key: 'label-eliminar',
      value: 'Eliminar',
    },
    {
      key: 'titulo-programacion-horario-estudiante',
      value: 'Horario Estudiante',
    },
    {
      key: 'menu-programacion-horario-estudiante',
      value: 'Horario Estudiante',
    },
    {
      key: 'table-ver-programacion-horario-estudiante-col',
      value: [
        'profesor',
        'materia',
        'salon',
        'hora_inicial',
        'hora_final',
      ],
    },
    {
      key: 'table-actualizar-programacion-horario-estudiante-col',
      value: [
        'estudiante',
        'profesor',
        'materia',
        'salon',
        'hora_inicial',
        'hora_final',
      ],
    },
    {
      key: 'table-ver-salon-programacion-horario-estudiante-col',
      value: ['salon', 'materia'],
    },
    {
      key: 'table-eliminar-programacion-horario-estudiante-col',
      value: [
        'select',
        'id',
        'estudiante',
        'profesor',
        'materia',
        'salon',
        'hora_inicial',
        'hora_final',
      ],
    },
    {
      key: 'table',
      matColumnDef: [
        'estudiante',
        'profesor',
        'materia',
        'salon',
        'hora_inicial',
        'hora_final',
      ],
      matColumnDefMateria: ['salon', 'materia'],
      matHeaderCellDefMateria: ['Salón', 'Asignatura'],
      matHeaderCellDef: [
        'Estudiante',
        'Profesor',
        'Materia',
        'Salón',
        'Hora Inicial',
        'Hora Final',
      ],
    },
    {
      key: 'mat-form-field-estudiante',
      value: 'Estudiante',
      placeholder: 'ej: Nancy Johanna Becerra Tamayo.',
      control: 'estudiante',
      error: 'Estudiante',
    },
    {
      key: 'mat-form-field-programacion-horario',
      value: 'Programación Horario',
      placeholder: 'ej: ...',
      control: 'programacion-horario',
      error: 'Programación Horario',
    },
    {
      key: 'mat-form-field-profesor',
      value: 'Profesor',
      placeholder: 'ej: Carol Tatiana Rodriguez Becerra.',
      control: 'profesor',
      error: 'Profesor',
    },
    {
      key: 'mat-form-field-materia',
      value: 'Materia',
      placeholder: 'ej: Biología - Física - Matemáticas.',
      control: 'materia',
      error: 'Materia',
    },
    {
      key: 'mat-form-field-salon',
      value: 'Salón',
      placeholder: 'ej: RA-1 , RA-2.',
      control: 'salon',
      error: 'Salón',
    },
    {
      key: 'mat-form-field-hora-inicial',
      value: 'Hora Inicial',
      placeholder: 'ej: 08:00 am.',
      control: 'hora_inicial',
      error: 'Hora Inicial',
    },
    {
      key: 'mat-form-field-hora-final',
      value: 'Hora Final',
      placeholder: 'ej: 18:00 pm.',
      control: 'hora_final',
      error: 'Hora Final',
    },
    {
      key: 'r-c-programacion-horario-estudiante',
      route: 'crear-programacion-horario-estudiante',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!',
    },
    {
      key: 'r-a-programacion-horario-estudiante',
      route: 'actualizar-programacion-horario-estudiante',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!',
    },
    {
      key: 'r-e-programacion-horario-estudiante',
      route: 'eliminar-programacion-horario-estudiante',
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
