import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from './../../../../../../respaldo/src/app/utils/util';
import { HttpEventType } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
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
  constructor(
    private snackBar: MatSnackBar,
    private serviceFileUpload: FileUploadPptService
  ) {}

  ngOnInit(): void {}
  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  recive(fileUpload) {
    console.log('entro la porqueria');
    this.fileUpload = fileUpload;
    console.log(this.fileUpload);
    const dataForm: FormData = new FormData();
    if (this.fileUpload != null && this.fileUpload.file != null) {
      dataForm.append('file-ppt', this.fileUpload.file.data);
    }
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
