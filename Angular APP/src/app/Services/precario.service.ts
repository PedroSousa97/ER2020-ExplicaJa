import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class precarioService {
    constructor(private http: HttpClient) { }

    precos: [] = [];

    getPrecos(){
      return this.http.get<any>("http://localhost:3000/api/precario/getprecos")
              .pipe(map(result => {
                  this.precos=result;
                  return result;
              }));
    }

    atualizaPreco(Aula: number, Mensal: number, Anual: number ){
      return this.http.post<any>("http://localhost:3000/api/precario/atualizaprecos", {Aula,Mensal,Anual})
              .pipe(map(result => {
                  this.getPrecos()
                  return result;
              }));
    }

}
