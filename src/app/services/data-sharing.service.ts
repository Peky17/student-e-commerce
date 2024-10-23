import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private dataSubject: Subject<string> = new Subject<string>();
  public dataObservable = this.dataSubject.asObservable();

  constructor() {}

  sendDataToSharedService(data: string) {
    this.dataSubject.next(data);
  }

  sendDataToSharedPayement(data: string) {
    this.dataSubject.next(data);
  }
}
