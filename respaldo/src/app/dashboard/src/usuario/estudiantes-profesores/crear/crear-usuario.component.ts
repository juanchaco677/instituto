import { PropertiesUsuario } from '../../../../properties/properties-usuario';
import { MenuService } from '../../../../service/menu.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/MyErrorStateMatcher';
import { Validacion } from 'src/app/utils/validacion';
import { FileUpload } from 'src/app/fileupload';
import { UsuarioService } from 'src/app/dashboard/service/dashboard/usuario.service';
import { Sesion } from 'src/app/utils/sesion';
import { tap, catchError, map, take } from 'rxjs/operators';
import { Util } from 'src/app/utils/util';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/dashboard/modelo/usuario';
import { Localizacion } from 'src/app/dashboard/modelo/localizacion';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  crear: FormGroup;
  matcher = new MyErrorStateMatcher();
  usuario: Usuario;
  public fileUpload: FileUpload;
  activar = false;
  localizacion: Localizacion;
  dataForm: FormData = new FormData();
  errors: any;
  // cuando es la opcion de crear es false
  actCrear = false;
  imgActCrear: boolean;
  tipo: string;
  tipoUsuario: string;
  constructor(
    private snackBar: MatSnackBar,
    private menuService: MenuService,
    private properties: PropertiesUsuario,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioServivice: UsuarioService
  ) {

    this.usuario = new Usuario();
    this.localizacion = new Localizacion();
    this.route.paramMap.subscribe(params => {
      this.tipo = params.get('tipo').toUpperCase();
      this.usuario.tipo = this.tipo;
      this.usuario.id = +params.get('id');
      this.tipoUsuario = this.tipo === 'PR' ? 'Profesor' :
        this.tipo === 'ES' ? 'Estudiante' :
          this.tipo === 'AD' ? 'Administrador' : 'Otro';
    });
    this.menuService.add$(this.tipo === 'PR' ? properties.get('menu-profesor').value : properties.get('menu-estudiante').value);



    this.crear = this.formBuilder.group({
      nombre: new FormControl({ value: '', disabled: true }),
      nombreUno: Validacion.getCampoLetras(true),
      sexo: Validacion.getCampoLetras(true),
      nombreDos: Validacion.getCampoLetras(false),
      primerApellido: Validacion.getCampoLetras(true),
      segundoApellido: Validacion.getCampoLetras(false),
      email: Validacion.getCampoEmail(true),
      cedula: Validacion.getCampoNumero(true, 7, 12),
      celular: Validacion.getCampoNumero(true, 9, 11),
      telefono: Validacion.getCampoNumero(false, 0, 11),
      fechanacimiento: Validacion.getCampoDate(false),

    });
    // actualizar el usuario de la sesion
    if (!Util.empty(this.usuario) && this.usuario.tipo === 'AD') {
      this.usuarioServivice.getAuthUser$().pipe(take(1)).subscribe(
        usuario => {
          this.usuario = usuario;
          this.localizacion = this.usuario.localizacion;
          this.usuario.foto = Util.getUrlImage(this.usuario);
          this.actCrear = true;
        });
    } else {
      // actualizar el usuario seleccionado de un registro de la tabla
      if (!Util.emptyNaN(this.usuario.id)) {
        this.actCrear = true;
        this.usuario = this.usuarioServivice.buscarElementList$(this.usuario);

      } else {
        this.actCrear = false;
      }
    }

  }



  ngOnInit() {

  }

  getNombreCompleto() {
    const nombre = (this.usuario.nombre_uno == null ? '' : this.usuario.nombre_uno) + '' +
      (this.usuario.nombre_dos == null ? '' : ' ' + this.usuario.nombre_dos) + '' +
      (this.usuario.apellido_uno == null ? '' : ' ' + this.usuario.apellido_uno) + '' +
      (this.usuario.apellido_dos == null ? '' : ' ' + this.usuario.apellido_dos);
    this.usuario.nombre = nombre;
    return nombre;
  }

  oncreateUpdate() {
    if (this.crear.invalid) {
      return;
    }
    this.activar = true;
    if (this.getFile() != null && this.getFile().file != null) {
      this.dataForm.append('file', this.getFile().file.data);
    }
    if (!Util.empty(this.localizacion.latitud) && !Util.empty(this.localizacion.longitud)) {
      this.usuario.localizacion = this.localizacion;
    }
    if (!this.actCrear) {
      this.usuario.tipo = this.tipo;
    }
    this.dataForm.append('token', Sesion.user().token as string);
    this.dataForm.append('usuario', JSON.stringify(this.usuario).toString());
    this.dataForm.append('update', this.actCrear as any);

    this.usuarioServivice.store(this.dataForm).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (this.getFile() != null && this.getFile().file != null) {
              this.getFile().file.progress = Math.round(event.loaded * 100 / event.total);
            }
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap((usuario: any) => { }),
      catchError(err => {
        this.activar = false;
        this.errors = err.error;
        return Util.handleError<any>('store usuario');
      })

    ).subscribe
      (data => {
        if (!Util.empty(data)) {
          if (!Util.empty(this.getFile())) {
            this.getFile().file = null;
          }
          this.activar = false;
          if (!this.actCrear) {

            if (!Util.empty(this.usuarioServivice.listPagination$)) {
              if (this.usuarioServivice.size$() < 5) {
                this.usuarioServivice.addElementList$(data['usuario']);
              } else {
                this.usuarioServivice.listPagination$ = null;
              }
            }
            this.usuario = new Usuario();
            Util.openSnackBar(this.snackBar, 'Transaccion termino con éxito.', 1, 'top');
            this.crear.reset();

          } else {
            if (this.usuario != null && this.usuario.tipo === 'AD') {
              // cuando se esta actualizando el usuario de la sesion,
              this.usuario = data.body.usuario;
              this.usuario.foto = Util.getUrlImage(this.usuario);
              Sesion.setUser(this.usuario);
              this.usuarioServivice.addAuthUser$(this.usuario);
              Util.openSnackBar(this.snackBar, 'Actualización de Perfil exitosa.', 1, 'top');
            } else {
              // cuanso se actualiza el usuario que no es el de la sesión
              this.usuarioServivice.deleteElementList$(this.usuario);
              this.usuarioServivice.addElementList$(this.usuario);
              Util.openSnackBar(this.snackBar, 'Actualización de Perfil exitosa.', 1, 'top');

              // this.location.back();
            }
          }
        }
      })
      ;
  }

  getControls(key: string) {

    return this.crear.controls[key];
  }

  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  recive(fileUpload) {
    this.fileUpload = fileUpload;
    this.imgActCrear = true;
  }
  reciveLocalizacion(localizacion) {
    this.localizacion = localizacion;
  }

  getFile() {
    if (!Util.empty(this.fileUpload)
      && !Util.empty(this.fileUpload.file)) {
      return this.fileUpload;
    }
    return null;
  }
}
