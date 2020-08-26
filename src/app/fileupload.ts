import { EventEmitter } from '@angular/core';
import { FileMultimedia } from './dashboard/modelo/filemultimedia';

export class FileUpload {
  public file: FileMultimedia;

  constructor(private emit: EventEmitter<FileUpload>) {}

  load(id: string) {
    const fileUpload = document.getElementById(id) as HTMLInputElement;
    fileUpload.onchange = () => {
      const fileDesktop = fileUpload.files[0];
      this.file = new FileMultimedia(fileDesktop, 'in', false, 0, false, true);
      this.loadPreview();
    };
    fileUpload.click();
  }

  loadPreview() {
    console.log('entro el perro a qui');
    const reader = new FileReader();
    if (this.file != null) {
      reader.readAsDataURL(this.file.data);
      reader.onload = (_event) => {
        console.log('ver aqui');
        this.file.src = reader.result;
        this.emit.emit(this);
      };
    }
  }
}
