import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  sendClickEvent(value:string){
    this.subject.next(value);
  }

  getClieckEvent():Observable<any>{
    return this.subject.asObservable()
  }
  constructor() { }
}
