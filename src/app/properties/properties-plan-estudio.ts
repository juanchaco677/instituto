
export class PropertiesPlanEstudio {
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
      key: 'label-buscar',
      value: 'Buscar'
    },
    {
      key: 'label-eliminar',
      value: 'Eliminar'
    },
    {
      key: 'menu-plan-estudio',
      value: 'Plan Estudio'
    },
    {
      key: 'route-plan-estudio',
      value: 'plan-estudio'
    },
    {
      key: 'table-actualizar-plan-estudio-col',
      value: ['programa', 'materia', 'plan', 'periodo', 'fechaInicial', 'fechaHasta']
    },
    {
      key: 'table-eliminar-plan-estudio-col',
      value: ['select', 'programa', 'materia', 'plan', 'periodo', 'fechaInicial', 'fechaHasta']
    },

    {
      key: 'table',
      matColumnDef : ['programa', 'materia', 'plan', 'periodo', 'fechaInicial', 'fechaHasta'],
      matHeaderCellDef: ['Programa', 'Materia', 'Plan', 'Periodo', 'Fecha Inicial', 'Fecha Hasta']
    },
    {
      key: 'mat-form-field-fecha-inicial',
      value: 'Fecha Inicial',
      placeholder: 'ej: YYYYMMDD.',
      control: 'fechaInicial',
      error : 'Fecha Inicial'
    },
    {
      key: 'mat-form-field-fecha-final',
      value: 'Fecha Hasta',
      placeholder: 'ej: YYYYMMDD.',
      control: 'fechaHasta',
      error : 'Fecha Hasta'
    },
    {
      key: 'mat-form-field-periodo',
      value: 'Periodo',
      placeholder: 'ej: 1.',
      control: 'periodo',
      error : 'Periodo'
    },
    {
      key: 'mat-form-field-programa',
      value: 'Programa',
      placeholder: 'ej: ing de sistemas.',
      control: 'programa',
      error : 'Programa'
    },
    {
      key: 'mat-form-field-materia',
      value: 'Materia',
      placeholder: 'ej: filosofia.',
      control: 'materia',
      error : 'Materia'
    },
    {
      key: 'mat-form-field-plan',
      value: 'Plan',
      placeholder: 'ej: cuatrimestral - bimestral - semestral - anual.',
      control: 'plan',
      error : 'Plan'
    },
    {
      key: 'r-c-plan-estudio',
      route: 'crear-plan-estudio',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-plan-estudio',
      route: 'actualizar-plan-estudio',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar.!'
    },
    {
      key: 'r-e-plan-estudio',
      route: 'eliminar-plan-estudio',
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



