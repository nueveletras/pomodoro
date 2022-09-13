import { Observable } from "rxjs";

export interface IAuxiliarMethods {
  getMessage(): Observable<string>
  getError(): Observable<string>
  getLoading(): Observable<boolean>
}

