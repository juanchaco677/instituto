
export class PropertiesListRoom {
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
      key: 'route-list-room',
      value: 'list-room',
    },
    {
      key: 'route-list-room-object',
      value: 'incripcion-horario-estudiante',
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
      key: 'table-actualizar-list-room-col',
      value: ['salon' , 'asignatura', 'grupo', 'dia' , 'horaInicial' , 'horaFinal']
    },
    {
      key: 'table',
      matColumnDef : ['salon' , 'asignatura', 'grupo', 'dia' , 'horaInicial' , 'horaFinal'],
      matHeaderCellDef: ['Salón' , 'Asignatura' , 'Grupo' , 'Día' , 'Hora Inicial' , 'Hora Final' ],
    },
    {
      key: 'mat-form-field-mensaje',
      value: 'Mensaje',
      placeholder: 'ej: enviar mensaje al chat grupal.',
      control: 'mensaje',
      error : 'Mensaje'
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



