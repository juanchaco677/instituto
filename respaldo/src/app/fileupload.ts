import { FileMultimedia } from './dashboard/modelo/filemultimedia';

export class FileUpload {

  public file: FileMultimedia;

  constructor() { }

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
    var reader = new FileReader();
    if (this.file != null) {
      var reader = new FileReader();

    reader.readAsDataURL(this.file.data);
      reader.onload = (_event) => {
        this.file.src = reader.result;
      }
    }
  }


}
