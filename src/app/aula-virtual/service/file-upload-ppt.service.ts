import { Observable } from 'rxjs';
import { Util } from './../../utils/util';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileUploadPptService {

  constructor(public http: HttpClient) {

  }

  store(data: any): Observable<any> {
    const req = new HttpRequest('POST', Util.apiUrlNode + 'upload-ppt', data, {
      reportProgress: true,
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    });
    return this.http.request(req);
  }
}
