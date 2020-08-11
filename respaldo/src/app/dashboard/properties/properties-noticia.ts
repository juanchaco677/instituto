
export class PropertiesNoticia {

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
      key: 'menu-noticia',
      value: 'Noticia',
    },
    {
      key: 'route-noticia',
      value: 'noticia',
    },
    {
      key: 'titulo-noticia',
      value: 'Noticia'
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
      key: 'table-eliminar-noticia-col',
      value: [ 'select' , 'titulo' , 'descripcion']
    },
    {
      key: 'table',
      matColumnDef : ['titulo', 'descripcion'],
      matHeaderCellDef: ['Título', 'Descripción'],
    },
    {
      key: 'mat-form-field-titulo',
      value: 'Título',
      placeholder: 'ej: Noticia ultima hora.',
      control: 'titulo',
      error : 'Título'
    },
    {
      key: 'mat-form-field-descripcion',
      value: 'Descripción',
      placeholder: 'ej: descripción descripción descripción descripción descripción descripción.',
      control: 'descripcion',
      error : 'Descripción'
    },
    {
      key: 'r-c-noticia',
      route: 'crear-noticia',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-a-noticia',
      route: 'actualizar-noticia',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!'
    },
    {
      key: 'r-e-noticia',
      route: 'eliminar-noticia',
      titulo: 'Eliminar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de eliminar!'
    },
    {
      key: 'r-v-noticia',
      route: 'ver-noticia',
      titulo: 'Ver',
      subtitulo: '...',
      descripcion: '¡Visualización de la noticia!'
    },
  ];


  get(key: string ): any {

    // tslint:disable-next-line: no-shadowed-variable
    for (const element of this.datos) {
      if (element.key === key) {
        return element;
      }
    }

    return '';
  }

}



