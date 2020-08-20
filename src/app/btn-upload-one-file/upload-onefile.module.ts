import { MaterialModule } from './../dashboard/module/material/material.module';
import { BtnUploadOneFileComponent } from './btn-upload-one-file.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [BtnUploadOneFileComponent],
  exports: [BtnUploadOneFileComponent],
})
export class UploadOnefileModule {}
