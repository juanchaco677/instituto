
export class PropertiesLoginDashboard {
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
      key: 'titulo',
      value: 'Iniciar Sesión',
    },
    {
      key: 'mat-form-field-correo',
      value: 'Correo Electrónico',
      placeholder: 'ej: pat@example.com',
      control: 'email',
      error: 'Correo Electrónico',
    },
    {
      key: 'mat-form-field-contraseña',
      value: 'Contraseña',
      placeholder: 'ej: carlos1234567*.',
      control: 'password',
      error: 'Contraseña',
    },
    {
      key: 'mat-form-field-rol',
      value: 'Permisos',
      control: 'tipo',
      error: 'Permisos',
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



