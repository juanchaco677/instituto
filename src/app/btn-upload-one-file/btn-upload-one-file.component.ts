import { Util } from 'src/app/utils/util';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUpload } from '../fileupload';
@Component({
  selector: 'app-btn-upload-one-file',
  templateUrl: './btn-upload-one-file.component.html',
  styleUrls: ['./btn-upload-one-file.component.css'],

})
export class BtnUploadOneFileComponent implements OnInit {
  /** Link text */
  text = 'Cargar Imagen';
  /** Name used in form which will be sent in HTTP request. */
  param = 'file';
  /** Target URL for file uploading. */
  target = 'https://file.io';

  accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  // tslint:disable-next-line: no-output-native
  @Output() load = new EventEmitter<FileUpload>();

  public fileUpload: FileUpload;
  public src: string | ArrayBuffer | null;
  constructor() {
    this.fileUpload = new FileUpload();

  }

  ngOnInit() {

  }

  onClick() {
    this.fileUpload = new FileUpload();
    this.fileUpload.load('fileUpload');
    this.load.emit(this.fileUpload);
  }

  cancelFile() {
    this.fileUpload.file = null;
    this.fileUpload = null;
    this.load.emit(this.fileUpload);
  }

  getFile() {
    if (!Util.empty(this.fileUpload)
      && !Util.empty(this.fileUpload.file)) {
        return this.fileUpload;
    }
    return null;
  }
}
