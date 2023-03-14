import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConnexionStatusService {
  private connectionStatus = new Subject<boolean>();

  constructor() { }

  sendConnectionStatus(status: boolean) {
    this.connectionStatus.next(status);
  }

  getConnectionStatus() {
    return this.connectionStatus.asObservable();
  }


}
