
export class PropertiesPrograma {

  datos = [
    {
      key: 'f-c-programa-nombre',
      value: 'Nombre',
    },
    {
      key: 't-programa',
      value: 'Programa',
    },
    {
      key: 'm-t-programa',
      value: 'Programa'
    },

    {
      key: 't-a-programa-col',
      value: ['id', 'nombre']
    },
    {
      key: 't-e-programa-col',
      value: ['select', 'id', 'nombre']
    },

    {
      key: 'r-c-programa',
      route: 'crear-programa',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-programa',
      route: 'actualizar-programa',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar.!'
    },
    {
      key: 'r-e-programa',
      route: 'eliminar-programa',
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



