
export class PropertiesEscuelaUsuarios {
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
      key: 'route-escuela-usuario',
      value: 'escuela-usuario',
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
      key: 'titulo-escuela-profesor',
      value: 'Escuela Profesor',
    },
    {
      key: 'titulo-escuela-estudiante',
      value: 'Escuela Estudiante',
    },
    {
      key: 'menu-escuela-profesor',
      value: 'Escuela Profesor',
    },
    {
      key: 'menu-escuela-estudiante',
      value: 'Escuela Estudiante',
    },
    {
      key: 'table-eliminar-escuela-usuario-col',
      value: ['select', 'cedula', 'usuario', 'escuela' , 'programa' , 'anioInicial', 'anioFinal']
    },
    {
      key: 'table',
      matColumnDef : ['cedula', 'usuario', 'escuela', 'programa' , 'anioInicial' , 'anioFinal'],
      matHeaderCellDef: ['cedula', 'Usuario', 'Escuela' , 'Programa', 'Año Inicial', 'Año Final'],
    },
    {
      key: 'mat-form-field-escuela',
      value: 'Escuela',
      placeholder: 'ej: ing de sistemas.',
      control: 'escuela',
      error : 'Escuela'
    },
    {
      key: 'mat-form-field-profesor',
      value: 'Profesor',
      titulo: 'Escuela Profesor',
      placeholder: 'ej: zepelin rodriguez becerra.',
      control: 'usuario',
      error : 'Profesor'
    },
    {
      key: 'mat-form-field-estudiante',
      value: 'Estudiante',
      titulo: 'Escuela Estudiante',
      placeholder: 'ej: constanza becerra tamayo.',
      control: 'usuario',
      error : 'Estudiante'
    },
    {
      key: 'mat-form-field-escuela-usuario',
      value: 'Nombre Usuario',
      placeholder: 'ej: carlos humberto rodriguez parra.',
      control: 'nombre',
      error : 'Nombre Usuario'
    },
    {
      key: 'mat-form-field-programa',
      value: 'Programa',
      placeholder: 'ej: ing sistemas.',
      control: 'programa',
      error : 'Programa'
    },

    {
      key: 'mat-form-field-anio-inicial',
      value: 'Año Inicial',
      placeholder: 'ej: 2020',
      control: 'anioInicial',
      error : 'Año Inicial'
    },
    {
      key: 'mat-form-field-anio-final',
      value: 'Año Final',
      placeholder: 'ej: 9999',
      control: 'anioFinal',
      error : 'Año Final'
    },
    {
      key: 'r-c-escuela-usuario',
      route: 'crear-escuela-usuario',
      titulo: 'Crear',
      subtitulo: '...',
      descripcion: '¡Verificar la información antes de guardar.!'
    },
    {
      key: 'r-e-escuela-usuario',
      route: 'eliminar-escuela-usuario',
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



