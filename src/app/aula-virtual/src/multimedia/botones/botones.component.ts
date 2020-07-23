import { Util } from './../../../../utils/util';
import { Video } from './../../../model/video';
import { BotonesService } from './../../../service/botones.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css'],
})
export class BotonesComponent implements OnInit {

  constructor(
    public cdr: ChangeDetectorRef,
    private botones: BotonesService
  ) {}

  ngOnInit(): void {}

  startVideo() {
    this.botones.add(Util.video);
  }

  startMic() {
    this.botones.add(Util.audio);
  }

  startVideoDesktop() {
    this.botones.add(Util.desktop);
  }

  stopVideoDesktop() {
    this.botones.add(Util.stopDesktop);
  }
}
