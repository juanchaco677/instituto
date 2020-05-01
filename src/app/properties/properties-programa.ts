
export class PropertiesPrograma {
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
      key: 'r-programa',
      value: 'programa',
    },
    {
      key: 'l-buscar',
      value: 'Buscar'
    },
    {
      key: 'f-c-nombre',
      value: 'Nombre',
      placeholder: 'ej: Ingeniera de Sistemas - Técnico en Sisttemas.',
      control: 'nombre',
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
      value: ['id', 'nombre'],
      matColumnDef: 'nombre',
      matHeaderCellDef: 'Nombre',
    },
    {
      key: 't-e-programa-col',
      value: ['select', 'id', 'nombre'],
      matColumnDef: 'nombre',
      matHeaderCellDef: 'Nombre',
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



