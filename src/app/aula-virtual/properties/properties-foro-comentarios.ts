export class PropertiesForoComentarios {
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
      key: 'menu-foro-aula-comentario',
      value: 'Crear Foro',
    },
    {
      key: 'route-foro-aula-comentario',
      value: 'foro-aula-comentario',
    },
    {
      key: 'titulo-foro-aula-comentario',
      value: 'Crear Foro',
    },
    {
      key: 'label-buscar',
      value: 'Buscar',
    },
    {
      key: 'label-eliminar',
      value: 'Eliminar',
    },
    {
      key: 'mat-form-field-comentario',
      value: 'Comentario',
      placeholder: 'ej: ...',
      control: 'comentario',
      error: 'Comentario',
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
