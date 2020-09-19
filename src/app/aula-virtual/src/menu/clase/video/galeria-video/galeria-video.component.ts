import { SalonesEsPrService } from './../../../../../service/salones-es-pr.service';
import { PaginationMaterial } from './../../../../../../paginationmaterial';
import { ActivatedRoute} from '@angular/router';
import { ArchivoBilbliotecaService } from './../../../../../service/archivo-bilblioteca.service';
import { Util } from './../../../../../../utils/util';
import { Component, OnInit } from '@angular/core';
import { AnyPagination } from 'src/app/dashboard/modelo/anyPagination';
import { Location } from '@angular/common';
@Component({
  selector: 'app-galeria-video',
  templateUrl: './galeria-video.component.html',
  styleUrls: ['./galeria-video.component.css'],
})
export class GaleriaVideoComponent implements OnInit {
  src: string;
  id: number;
  datas: any;
  data: any;
  paginationMaterial: PaginationMaterial;
  srcDownlod: string;
  spinner = false;
  constructor(
    private archivoBilbliotecaService: ArchivoBilbliotecaService,
    public service: SalonesEsPrService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.src = Util.apiUrlImage + 'img/';
    this.srcDownlod = Util.apiUrlImage + 'mp4/';
    this.route.paramMap.subscribe((params) => {
      console.log('all otro lado...');
      console.log(params.get('id').toString());
      // tslint:disable-next-line: radix
      this.id = parseInt(params.get('id').toString());
    });
    this.data = this.buscarElement();
    if (Util.empty(this.data)) {
      this.location.back();
    } else {
      this.consultarDatos(0);
    }
  }

  ngOnInit(): void {}

  buscarElement() {
    if (
      !Util.empty(this.service.listPagination$) &&
      this.service.listPagination$.getValue().array.length > 0
    ) {
      for (const element of this.service.listPagination$.getValue().array) {
        if (element.id === this.id) {
          return element;
        }
      }
    }
    return null;
  }

  consultarDatos(page: number) {
    this.spinner = true;
    this.archivoBilbliotecaService
      .getAllObject('archivo-biblioteca-jwt/get-all-pagination', page, {
        id_salon:
          this.data.programacion_horario === undefined
            ? this.data.salon.id
            : this.data.programacion_horario.salon.id,
        extension: 'mp4',
        tipo: 'CLASE',
      })
      .subscribe((data) => {
        this.datas = data['data'].data;
        this.paginationMaterial = new PaginationMaterial(
          data['data'].total,
          data['data'].per_page,
          [5, 10, 25, 100],
          page - 1
        );
        this.archivoBilbliotecaService.createList$(
          new AnyPagination(this.datas, this.paginationMaterial)
        );
        this.spinner = false;
      });
  }

  reciveMaterial(page: any) {
    this.consultarDatos(page.pageIndex + 1);
  }
}
