import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from './../../../../../../respaldo/src/app/utils/util';
import { HttpEventType } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { FileUploadPptService } from './../../../service/file-upload-ppt.service';
import { FileUpload } from './../../../../fileupload';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-file-upload',
  templateUrl: './list-file-upload.component.html',
  styleUrls: ['./list-file-upload.component.css'],
})
export class ListFileUploadComponent implements OnInit {
  fileUpload: FileUpload;
  room: Room = new Room(null, [], [], {}, {}, {});
  ppts = {};
  activar = false;
  srcPath: string;
  constructor(
    private serviceSocket: SocketIoClientService,
    private snackBar: MatSnackBar,
    private serviceFileUpload: FileUploadPptService
  ) {
    this.srcPath = Util.apiUrlImage;
  }

  ngOnInit(): void {
    this.serviceSocket.getRoom$().subscribe((data) => {
      if (!Util.empty(data)) {
        this.room = data;
        this.ppts = this.room.ppts;
      }
    });
    this.serviceSocket.$archivoPpt.subscribe((data) => this.recivePPT(data));
  }

  recivePPT(data: any) {
    this.ppts[data.nombre] = data;
  }
  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  recive(fileUpload: any) {
    if (this.fileUpload != null && this.fileUpload.file != null) {
      this.activar = true;
      this.fileUpload = fileUpload;
      const dataForm: FormData = new FormData();

      dataForm.append('file-ppt', this.fileUpload.file.data);

      dataForm.append('id', this.room.id);
      this.serviceFileUpload
        .store(dataForm)
        .pipe(
          map((event) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                if (this.fileUpload != null && this.fileUpload.file != null) {
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
          (data) => {
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
    }
  }
}
