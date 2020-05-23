import { Util } from './../utils/util';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileMultimedia } from '../dashboard/modelo/filemultimedia';

@Component({
  selector: 'app-upload-drag-drop',
  templateUrl: './upload-drag-drop.component.html',
  styleUrls: ['./upload-drag-drop.component.scss']
})
export class UploadDragDropComponent implements OnInit {

  files: any[] = [];
  @Input() fileMultimedias: FileMultimedia[] = [];
  // tslint:disable-next-line: no-output-native
  @Output() load = new EventEmitter<FileMultimedia[]>();
  ngOnInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.saveFile($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event) {
    this.saveFile($event);
  }

  saveFile(files: Array<any>) {
    for (const file of files) {
      if (file.type.match('image/jpeg')
        || file.type.match('image/png')
        || file.type.match('image/jpg')) {
        if (file != null) {
          const reader = new FileReader();

          reader.readAsDataURL(file);
          reader.onload = (_event) => {
            const fileMultimedia = new FileMultimedia(file, 'in', false, 0, false, true);
            fileMultimedia.src = reader.result;
            this.fileMultimedias.push(fileMultimedia);
            this.load.emit(this.fileMultimedias);
          };
        }
      } else {
        const fileMultimedia = new FileMultimedia(file, 'in', false, 0, false, true);
        fileMultimedia.src = this.differentImg(file);
        this.fileMultimedias.push(fileMultimedia);
        this.load.emit(this.fileMultimedias);
      }
    }

  }

  differentImg(file: any) {
    const opcion = file.name.split('.')[1];
    switch (opcion) {
      case 'pdf':
        return Util.apiUrlImage + 'img/pdf.png';
    }
    return '';
  }


  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.fileMultimedias.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
