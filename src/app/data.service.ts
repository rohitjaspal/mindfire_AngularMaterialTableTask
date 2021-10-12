import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  sendDatas = new Subject<any>();

  constructor() {}

  sendMessage(data: any) {
    this.sendDatas.next(data);
  }

  receiveMessage(): Observable<any> {
    return this.sendDatas.asObservable();
  }
}
