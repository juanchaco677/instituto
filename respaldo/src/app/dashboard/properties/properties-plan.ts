
export class PropertiesPlan {
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
      key: 'r-plan',
      value: 'plan',
    },
    {
      key: 'l-buscar',
      value: 'Buscar'
    },
    {
      key: 'f-c-nombre',
      value: 'Nombre',
      placeholder: 'ej: cuatrimestral - bimestral - anual - semestral.',
      control: 'nombre',
    },
    {
      key: 't-plan',
      value: 'Plan',
    },
    {
      key: 'm-t-plan',
      value: 'Plan'
    },

    {
      key: 't-a-plan-col',
      value: ['id', 'nombre'],
      matColumnDef: 'nombre',
      matHeaderCellDef: 'Nombre',
    },
    {
      key: 't-e-plan-col',
      value: ['select', 'id', 'nombre'],
      matColumnDef: 'nombre',
      matHeaderCellDef: 'Nombre',
    },

    {
      key: 'r-c-plan',
      route: 'crear-plan',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-plan',
      route: 'actualizar-plan',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar.!'
    },
    {
      key: 'r-e-plan',
      route: 'eliminar-plan',
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



