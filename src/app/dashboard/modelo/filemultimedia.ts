import { Subscription } from 'rxjs';

export class FileMultimedia {

  constructor(
    public data: File,
    public state: string,
    public inProgress: boolean,
    public progress: number,
    public canRetry: boolean,
    public canCancel: boolean,
    public sub?: Subscription,
    public src?: any){

  }
}
