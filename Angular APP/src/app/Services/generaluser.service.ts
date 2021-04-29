import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class GeneralUserService {
    explicadores: [] = [];

    constructor(private http: HttpClient) { }

    getnExplicadores() {
        return this.http.get<any>("http://localhost:3000/api/user/getexplicadores");
    }

    getnExplicandos() {
        return this.http.get<any>("http://localhost:3000/api/user/getexplicandos");
    }

    criaToken(Token: string){
      return this.http.post<any>("http://localhost:3000/api/user/criaToken", { Token })
                .pipe(map(response => {
                    return response;
                }));
    }

    getDadosExplicador(){
      return this.http.get<any>("http://localhost:3000/api/user/getdadosexplicador")
              .pipe(map(result => {
                  this.explicadores=result;
                  return result;
              }));
    }

    eliminaExplicador(ID: string){
        const url = `http://localhost:3000/api/user/eliminaexplicador/${ID}`;
        return this.http.delete<any>(url)
                .pipe(map(response => {
                    return response;
                }));
    }

    obtemFeedback(ID: string){
      return this.http.post<any>("http://localhost:3000/api/user/obterfeedback", {ID})
                .pipe(map(response => {
                    return response;
                }));
    }

    avaliarExplicador(ID: string, Avaliacao: string){
      return this.http.post<any>("http://localhost:3000/api/user/avaliaexplicador", { ID, Avaliacao })
                .pipe(map(response => {
                    return response;
                }));
    }

    getAvaliacoes(ID: string){
      return this.http.post<any>("http://localhost:3000/api/user/obteravaliacoes", {ID})
                .pipe(map(response => {
                    return response;
                }));
    }

    getEducandos(ID: string){
      const url = `http://localhost:3000/api/user/educandos/${ID}`;
      return this.http.get<any>(url)
              .pipe(map(response => {
                  return response;
              }));
    }
    getAproveitamento(ID: string){
      const url = `http://localhost:3000/api/user/aproveitamento/${ID}`;
      return this.http.get<any>(url)
              .pipe(map(response => {
                  return response;
              }));
    }
    getMétodoPagamento(ID: string){
      const url = `http://localhost:3000/api/user/metodopaga/${ID}`;
      return this.http.get<any>(url)
              .pipe(map(response => {
                  return response;
              }));
    }
    getPropinas(ID: string){
      const url = `http://localhost:3000/api/user/propinas/${ID}`;
      return this.http.get<any>(url)
              .pipe(map(response => {
                  return response;
              }));
    }

    realizarPagamento(Metodo: string, NIF: string, ID: string, IDPai: string){

      return this.http.post<any>("http://localhost:3000/api/user/pagarpropinas", {Metodo,NIF,ID, IDPai})
                .pipe(map(response => {
                    return response;
                }));
    }

    mudarPagamento(Metodo: string, ID: string){
      return this.http.post<any>("http://localhost:3000/api/user/mudapagamento", {Metodo,ID})
                .pipe(map(response => {
                    return response;
                }));
    }
}
