
export class PropertiesAsigProfeAsigs {

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
      key: 'menu-asig-profe-asigs',
      value: 'Asignar Profesor Asignatura Programa',
    },
    {
      key: 'route-asig-profe-asigs',
      value: 'asig-profe-asigs',
    },
    {
      key: 'titulo-asig-profe-asigs',
      value: 'Asignar Profesor Asignatura Programa'
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
      key: 'table-actualizar-asig-profe-asigs-col',
      value: ['id', 'programa' , 'profesor', 'plan', 'materia', 'ano_gravable' , 'periodo' ]
    },
    {
      key: 'table-eliminar-asig-profe-asigs-col',
      value: ['select', 'id', 'programa' , 'profesor', 'plan', 'materia', 'ano_gravable' , 'periodo']
    },
    {
      key: 'table',
      matColumnDef: ['programa' , 'profesor', 'plan', 'materia', 'ano_gravable' , 'periodo'],
      matHeaderCellDef: ['Programa', 'Profesor' , 'Plan' , 'Materia', 'Año Gravable' , 'Periodo'],
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
      key: 'mat-form-field-materia',
      value: 'Materia',
      placeholder: 'ej: Física',
      control: 'materia',
      error: 'Materia'
    },
    {
      key: 'mat-form-field-periodo',
      value: 'Periodo',
      placeholder: 'ej: 1 - 2 - 3 ...',
      control: 'periodo',
      error: 'Periodo'
    },
    {
      key: 'mat-form-field-ano-gravable',
      value: 'Año Gravable',
      placeholder: 'ej: 2020 - 2021 - 2022 ...',
      control: 'ano_gravable',
      error: 'Año Gravable'
    },
    {
      key: 'r-c-asig-profe-asigs',
      route: 'crear-asig-profe-asigs',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-asig-profe-asigs',
      route: 'actualizar-asig-profe-asigs',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-asig-profe-asigs',
      route: 'eliminar-asig-profe-asigs',
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



