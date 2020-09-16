export class PropertiesForoAualaMateria {
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
      key: 'menu-foro-aula-materia',
      value: 'Crear Foro',
    },
    {
      key: 'route-foro-aula-materia',
      value: 'foro-aula-materia',
    },
    {
      key: 'titulo-foro-aula-materia',
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
      key: 'table-actualizar-foro-aula-materia-col',
      value: ['id', 'titulo', 'descripcion', 'profesor', 'materia'],
    },
    {
      key: 'table-eliminar-foro-aula-materia-col',
      value: ['select', 'id', 'titulo', 'descripcion', 'profesor', 'materia'],
    },
    {
      key: 'table',
      matColumnDef: ['titulo', 'descripcion', 'profesor', 'materia'],
      matHeaderCellDef: ['Titulo', 'Descripcion', 'Profesor', 'Materia'],
    },
    {
      key: 'mat-form-field-titulo',
      value: 'Título',
      placeholder: 'ej: ...',
      control: 'titulo',
      error: 'Título',
    },
    {
      key: 'mat-form-field-descripcion',
      value: 'Descripción',
      placeholder: 'ej: ...',
      control: 'descripcion',
      error: 'Descripción',
    },
    {
      key: 'mat-form-field-materia',
      value: 'Materia',
      placeholder: 'ej: Matemáticas',
      control: 'materia',
      error: 'Materia',
    },

    {
      key: 'r-c-foro-aula-materia',
      route: 'crear-foro-aula-materia',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!',
    },
    {
      key: 'r-a-foro-aula-materia',
      route: 'actualizar-foro-aula-materia',
      titulo: 'Actualizar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de actualizar!',
    },
    {
      key: 'r-e-foro-aula-materia',
      route: 'eliminar-foro-aula-materia',
      titulo: 'Eliminar',
      subtitulo: '...',
      descripcion: '¡Por favor verifique la información antes de eliminar!',
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
