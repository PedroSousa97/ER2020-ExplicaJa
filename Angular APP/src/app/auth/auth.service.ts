import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User'

import {AuthData} from './authdata.model'

@Injectable({
  providedIn: "root"
})
export class AuthService{

  islogged: boolean = false;

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  requestOptions: Object = {
    code: 'text',
    message: 'text'
  }

  message: string ='';
  code: string = '';

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createExplicador(nome: string, sobrenome: string, NIF: string,Disciplina: string,token: string, Email: string, password: string ){

    const authData: AuthData ={nome: nome, sobrenome: sobrenome, NIF: NIF,Disciplina: Disciplina,token: token, Email: Email, password: password};

    return this.http.post<any>("http://localhost:3000/api/user/signupexplicador",authData,this.requestOptions)
    .pipe(map(response => {
      return response;
  }));
  }
  createExplicando(nome: string, sobrenome: string, NIF: string,NIFEncarregado: string,Ano: string, Email: string, password: string ){

    return this.http.post<any>("http://localhost:3000/api/user/signupexplicando",{nome,sobrenome,NIF,NIFEncarregado,Ano,Email,password})
    .pipe(map(response => {
      return response;
  }));
  }
  createEncarregado(nome: string, sobrenome: string, NIF: string,Pagamento: string, Email: string, password: string ){


    return this.http.post<any>("http://localhost:3000/api/user/signupencarregado",{nome,sobrenome,NIF,Pagamento,Email,password})
    .pipe(map(response => {
      return response;
  }));
  }

  login(Email: string, password: string){
    return this.http.post<any>("http://localhost:3000/api/user/login", { Email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
  }
}
