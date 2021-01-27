import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class FinancialService {
    faturas: [] = [];

    constructor(private http: HttpClient) { }

    getFaturas(){
      return this.http.get<any>("http://localhost:3000/api/financial/getfaturas")
              .pipe(map(result => {
                  this.faturas=result;
                  return result;
              }));
    }

}
