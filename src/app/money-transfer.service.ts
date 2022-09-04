import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoneyTransferService {

  constructor() {
  }

  transfer(number: number): Observable<number> {
    console.log(number);
    return of(number)
  }
}
