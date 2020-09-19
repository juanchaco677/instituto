import { ProgramacionHorario } from './../../../../dashboard/modelo/programacion-horario';
import { Salon } from './../../../../dashboard/modelo/salon';
import { Session } from 'protractor';
import { PPT } from './../../../model/ppt';
import { Sesion } from 'src/app/utils/sesion';
import { ArchivoBilbliotecaService } from './../../../service/archivo-bilblioteca.service';
import { ArchivoBiblioteca } from './../../../model/archivo-biblioteca';
import { DialogoIntegrantesComponent } from './../dialogo-integrantes/dialogo-integrantes.component';
import { MatDialog } from '@angular/material/dialog';
import { ListVideoComponent } from './../list-video/list-video.component';
import { Util } from './../../../../utils/util';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { FileUploadPptService } from './../../../service/file-upload-ppt.service';
import { FileUpload } from './../../../../fileupload';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-file-upload',
  templateUrl: './list-file-upload.component.html',
  styleUrls: ['./list-file-upload.component.css'],
})
export class ListFileUploadComponent implements OnInit {
  fileUpload: FileUpload;
  room: Room = new Room(null, {}, [], {}, {}, {}, {});
  ppts = {};
  activar = false;
  srcPath: string;
  @Input() listVideo: ListVideoComponent;
  constructor(
    public dialog: MatDialog,
    private serviceSocket: SocketIoClientService,
    private snackBar: MatSnackBar,
    private serviceFileUpload: FileUploadPptService,
    private archivoService: ArchivoBilbliotecaService
  ) {
    this.srcPath = Util.apiUrlImage;
  }

  ngOnInit(): void {
    this.serviceSocket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
        if (!Util.empty(this.room.ppts)) {
          this.ppts = this.room.ppts;
        }
      }
    });
    this.serviceSocket.$archivoPpt.subscribe((data) => this.recivePPT(data));
  }

  buscarPPTnombre(data: any) {
    // tslint:disable-next-line: forin
    for (const key in this.ppts) {
      for (const element of data) {
        if (element.nombre === this.ppts[key].nombre) {
          delete this.ppts[key];
        }
      }
    }
  }

  recivePPT(data: any) {
    this.room.ppts[data.nombre] = data;
    this.ppts[data.nombre] = this.room.ppts[data.nombre];
  }
  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  compartir(key: string) {
    this.listVideo.ppt = this.ppts[key];
    this.listVideo.redimensionarPPT = true;
    this.listVideo.redimensionar = true;
    this.serviceSocket.emit('recibePaginationS', {
      id: this.room.id,
      ppt: this.listVideo.ppt,
    });
  }

  eliminar(key: string) {
    delete this.room.ppts[key];
    this.serviceSocket.addRoom$(this.room);
    this.serviceSocket.emit('eliminarPPTS', { id: this.room.id, key });
  }

  recive(fileUpload: any) {
    this.fileUpload = fileUpload;
    if (!Util.empty(this.fileUpload) && !Util.empty(this.fileUpload.file)) {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoIntegrantesComponent, {
      width: '350px',
    });
    dialogRef.componentInstance.room = this.room;
    dialogRef.componentInstance.out.subscribe((data: any) => {
      const integrantes = data.integrantes;
      const permisos = data.todos;
      if (!Util.empty(data)) {
        switch (data.opcion) {
          case 1:
            this.activar = false;
            this.fileUpload = null;
            break;

          case 2:
            this.activar = true;
            const dataForm: FormData = new FormData();

            dataForm.append('file-ppt', this.fileUpload.file.data);

            dataForm.append('id', this.room.id);
            dataForm.append('integrantes', JSON.stringify(data.integrantes));
            dataForm.append('permisos', JSON.stringify({ todos: data.todos }));
            this.serviceFileUpload
              .store(dataForm)
              .pipe(
                map((event) => {
                  switch (event.type) {
                    case HttpEventType.UploadProgress:
                      if (
                        this.fileUpload != null &&
                        this.fileUpload.file != null
                      ) {
                        this.fileUpload.file.progress = Math.round(
                          (event.loaded * 100) / event.total
                        );
                      }
                      break;
                    case HttpEventType.Response:
                      return event;
                  }
                }),
                tap((usuario: any) => {})
              )
              .subscribe(
                // tslint:disable-next-line: no-shadowed-variable
                (data: any) => {
                  if (
                    !Util.empty(data) &&
                    !Util.empty(data.body) &&
                    data.body.success
                  ) {
                    this.activar = false;
                    Util.openSnackBar(
                      this.snackBar,
                      'Estimado usuario, ya puede compartir la presentación.',
                      1,
                      'top'
                    );
                    console.log('entrando a salvar en biblioteca');
                    console.log(data);

                    const programacion: ProgramacionHorario = Sesion.getProgramacion();
                    const biblioteca = new ArchivoBiblioteca(
                      null,
                      data.body.nombreExtension,
                      'ppt',
                      'CLASE',
                      Sesion.userAulaChat(),
                      programacion.salon,
                      programacion,
                      data.body.totalPaginas,
                      integrantes,
                      permisos
                    );
                    console.log(biblioteca);
                    console.log('------------------------');
                    this.archivoService
                      .store({ biblioteca }, 'archivo-biblioteca')
                      // tslint:disable-next-line: no-shadowed-variable
                      .subscribe();
                  } else {
                    if (
                      !Util.empty(data) &&
                      !Util.empty(data.body) &&
                      !data.body.success
                    ) {
                      this.activar = false;
                      Util.openSnackBar(
                        this.snackBar,
                        'Ocurrio un error inesperado al tratar de almacenar la presentación.',
                        3,
                        'bottom'
                      );
                    }
                  }
                },
                (err) =>
                  Util.openSnackBar(
                    this.snackBar,
                    'Ocurrio un error inesperado al tratar de almacenar la presentación.',
                    3,
                    'bottom'
                  )
              );
            break;
        }
      }
      dialogRef.close();
    });
  }
}
