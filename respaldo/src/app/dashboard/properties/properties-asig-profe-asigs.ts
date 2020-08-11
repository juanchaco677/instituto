
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
      value: ['id', 'programa' , 'profesor', 'plan', 'salon', 'materia', 'cupos', 'grupo']
    },
    {
      key: 'table-eliminar-asig-profe-asigs-col',
      value: ['select', 'id', 'programa' , 'profesor', 'plan', 'salon', 'materia', 'cupos', 'grupo']
    },
    {
      key: 'table',
      matColumnDef: ['programa' , 'profesor', 'plan', 'salon', 'materia', 'cupos', 'grupo'],
      matHeaderCellDef: ['Programa', 'Profesor' , 'Plan' , 'Salon', 'Materia', 'Cupos', 'Grupo'],
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



