import { Util } from './../../../../utils/util';
import { Video } from './../../../model/video';
import { BotonesService } from './../../../service/botones.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css'],
})
export class BotonesComponent implements OnInit {
  cam = false;
  audio = false;
  desktop = false;
  constructor(public cdr: ChangeDetectorRef, private botones: BotonesService) {}

  ngOnInit(): void {}

  startVideo() {
    this.cam = !this.cam;
    this.botones.add(Util.video);
  }

  startMic() {
    this.audio = !this.audio;
    this.botones.add(Util.audio);
  }

  startVideoDesktop() {
    this.desktop = true;
    this.botones.add(Util.desktop);
  }

  stopVideoDesktop() {
    this.desktop = false;
    this.botones.add(Util.stopDesktop);
  }

  sidenav() {
    this.botones.addSidenav(true);
  }

  redistribuir(opcion: string){
    this.botones.add(Util.redistribuir[opcion]);
  }
}
