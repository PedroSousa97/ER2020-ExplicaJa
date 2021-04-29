import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AuthService} from '../auth/auth.service';
import {disciplinaService} from '../Services/disciplina.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  disciplinas= [{idDisciplinas:0,Nome:"Null",Ano:"Null"}];

  options = {
    autoClose: true,
    keepAfterRouteChange: false,

  };

  isLoading: boolean = false;

  constructor(public authService: AuthService, public disciplinaService: disciplinaService, private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.disciplinaService.getDisciplinasInfo().pipe(first())
    .subscribe({
        next: (result) => {
          this.disciplinas=result;
        },
        error: error => {
          this.disciplinas = [];
        }
    });
  }

  encarregadoSignup(form: NgForm){
    if(form.invalid){
      return;
    }else{
      this.isLoading = true;
    this.authService.createEncarregado(form.value.encarregadonome,form.value.encarregadosobrenome,form.value.encarregadoNIF,form.value.registaPagamento,form.value.encarregadomail,form.value.encarregadopass)
    .pipe(first())
        .subscribe({
            next: (response) => {
                console.log(response.code);
                if(response.code == "201"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Utilizador Criado Com Sucesso!", "Close", {
                    duration: 2000,
                  });
                }
                else if(response.code == "1"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("NIF introduzido já existe!", "Close", {
                    duration: 2000,
                  });
                }
                else if(response.code == "2"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Email introduzido já existe!", "Close", {
                    duration: 2000,
                  });
                }
                else{
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Lamentamos, erro ao criar utilizador", "Close", {
                    duration: 2000,
                  });
                }
            },
            error: error => {
              console.log(error);
              this.isLoading = false;
              form.resetForm();
                this._snackBar.open("Lamentamos, erro no registo", "Close", {
                  duration: 2000,
                });
            }
        });
    }
  }

  estudanteSignup(form: NgForm){
    if(form.invalid){
      return;
    }else{
      this.isLoading = true;
    this.authService.createExplicando(form.value.estudantenome,form.value.estudantesobrenome,form.value.estudanteNIF,form.value.paiNIF,form.value.anoEscolaridade,form.value.estudantemail,form.value.estudantepass)
    .pipe(first())
        .subscribe({
            next: (response) => {
                console.log(response.code);
                if(response.code == "201"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Utilizador Criado Com Sucesso!", "Close", {
                    duration: 2000,
                  });
                }
                else if(response.code == "1"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("NIF introduzido já existe!", "Close", {
                    duration: 2000,
                  });
                }
                else if(response.code == "2"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Email introduzido já existe!", "Close", {
                    duration: 2000,
                  });
                }
                else if(response.code == "3"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("NIF de Encarregado não existe (Registe o Encarregado primeiro)", "Close", {
                    duration: 3000,
                  });
                }
                else{
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Lamentamos, erro ao criar utilizador", "Close", {
                    duration: 2000,
                  });
                }
            },
            error: error => {
              console.log(error);
              this.isLoading = false;
              form.resetForm();
                this._snackBar.open("Lamentamos, erro no registo", "Close", {
                  duration: 2000,
                });
            }
        });
    }
  }

  async explicadorSignup(form: NgForm){
    if(form.invalid){
      return;
    }else{
    this.isLoading = true;
    this.authService.createExplicador(form.value.explicadornome,form.value.explicadorsobrenome,form.value.explicadorNIF,form.value.Disciplina,form.value.tokenativa,form.value.explicadormail,form.value.explicadorpass)
    .pipe(first())
        .subscribe({
            next: (response) => {
                console.log(response.code);
                if(response.code == "201"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Utilizador Criado Com Sucesso!", "Close", {
                    duration: 2000,
                  });
                }
                else if(response.code == "1"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("NIF introduzido já existe!", "Close", {
                    duration: 2000,
                  });
                }
                else if(response.code == "2"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Email introduzido já existe!", "Close", {
                    duration: 2000,
                  });
                }
                else if(response.code == "3"){
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Token de registo introduzido é inválido", "Close", {
                    duration: 2000,
                  });
                }
                else{
                  this.isLoading = false;
                  form.resetForm();
                  this._snackBar.open("Lamentamos, erro ao criar utilizador", "Close", {
                    duration: 2000,
                  });
                }
            },
            error: error => {
              console.log(error);
              this.isLoading = false;
              form.resetForm();
                this._snackBar.open("Lamentamos, erro no registo", "Close", {
                  duration: 2000,
                });
            }
        });

    }
  }

}
