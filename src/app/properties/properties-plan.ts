
export class PropertiesPlan {

  datos = [
    {
      key: 'f-c-g-nombre',
      value: 'Nombre',
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
      value: ['id', 'nombre']
    },
    {
      key: 't-e-plan-col',
      value: ['select', 'id', 'nombre']
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



