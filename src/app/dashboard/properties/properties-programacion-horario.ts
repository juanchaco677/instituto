
export class PropertiesProgramacionHorario {
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
      key: 'label-buscar',
      value: 'Buscar'
    },
    {
      key: 'label-eliminar',
      value: 'Eliminar'
    },
    {
      key: 'titulo-programacion-horario',
      value: 'Programación Horario',
    },
    {
      key: 'menu-programacion-horario',
      value: 'Programación Horario',
    },
    {
      key: 'table-actualizar-programacion-horario-col',
      value: ['id', 'programa', 'profesor', 'plan', 'salon', 'materia', 'cupos', 'grupo', 'dia', 'horaInicial', 'horaFinal', 'fechaInicial', 'fechaFinal']
    },
    {
      key: 'table-eliminar-programacion-horario-col',
      value: ['select', 'id', 'programa', 'profesor', 'plan', 'salon', 'materia', 'cupos', 'grupo', 'dia', 'horaInicial', 'horaFinal', 'fechaInicial', 'fechaFinal']
    },
    {
      key: 'table',
      matColumnDef: ['programa', 'profesor', 'plan', 'salon', 'materia', 'cupos', 'grupo', 'dia', 'horaInicial', 'horaFinal', 'fechaInicial', 'fechaFinal'],
      matHeaderCellDef: ['Programa', 'Profesor', 'Plan', 'Salon', 'Materia', 'Cupos', 'Grupo', 'Día', 'Hora Inicial', 'Hora Final', 'Fecha Inicial', 'Fecha Final'],
    },
    {
      key: 'mat-form-field-programa',
      value: 'Programa',
      placeholder: 'ej: ing de sistemas.',
      control: 'programa',
      error: 'programa'
    },
    {
      key: 'mat-form-field-plan',
      value: 'Plan',
      placeholder: 'ej: Cuatrimestral - Bimestral.',
      control: 'plan',
      error: 'Plan'
    },
    {
      key: 'mat-form-field-profesor',
      value: 'Profesor',
      placeholder: 'ej: tatiana',
      control: 'profesor',
      error: 'Profesor'
    },
    {
      key: 'mat-form-field-salon',
      value: 'Salon',
      placeholder: 'ej: Ra-345',
      control: 'salon',
      error: 'Salon'
    },
    {
      key: 'mat-form-field-materia',
      value: 'Materia',
      placeholder: 'ej: Física',
      control: 'materia',
      error: 'Materia'
    },
    {
      key: 'mat-form-field-cupos',
      value: 'Cupos',
      placeholder: 'ej: 25 - 45 - 60',
      control: 'cupos',
      error: 'Cupos'
    },
    {
      key: 'mat-form-field-grupo',
      value: 'Grupo',
      placeholder: 'ej: 1 - 2 -3',
      control: 'grupo',
      error: 'Grupo'
    },
    {
      key: 'mat-form-field-dia',
      value: 'Día',
      placeholder: 'ej: Lune - Martes - Miercoles...',
      control: 'dia',
      error: 'Día'
    },
    {
      key: 'mat-form-field-hora-inicial',
      value: 'Hora Inicial',
      placeholder: 'ej: 06:00 am',
      control: 'horaInicial',
      error: 'Hora Inicial'
    },
    {
      key: 'mat-form-field-hora-final',
      value: 'Hora Final',
      placeholder: 'ej: 12:00 pm',
      control: 'horaFinal',
      error: 'Hora Final'
    },
    {
      key: 'mat-form-field-fecha-inicial',
      value: 'Fecha Inicial',
      placeholder: 'ej: 01/01/9999 12:00 pm',
      control: 'fechaInicial',
      error: 'Fecha Inicial'
    },

    {
      key: 'mat-form-field-fecha-final',
      value: 'Fecha Final',
      placeholder: 'ej: 01/01/2020 12:00 pm',
      control: 'fechaFinal',
      error: 'Fecha Final'
    },

    {
      key: 'r-c-programacion-horario',
      route: 'crear-programacion-horario',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-programacion-horario',
      route: 'actualizar-programacion-horario',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-programacion-horario',
      route: 'eliminar-programacion-horario',
      titulo: 'Eliminar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de eliminar!'
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



