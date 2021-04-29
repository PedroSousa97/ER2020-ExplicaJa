import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';


import { GeneralUserService } from '../Services/generaluser.service';
import { disciplinaService } from '../Services/disciplina.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
          selector: 'app-explicando',
          templateUrl: './encarregado.component.html',
          styleUrls: ['./encarregado.component.css']
        })
export class EncarregadoComponent implements OnInit{


  disciplinas: [] = [];

  minhasDisciplinas: [] = [];

  filhos: [] = [];

  propinas: [] = [];

  aproveitamento: [] = [];

  explicadores= [{idPessoa:0,Nome:"Null",Sobrenome:"Null"}];

  metodopagamento:string = "";

  panelOpenState = false;
  User={Email: "",
  NIF: "",
  Nome: "",
  Sobrenome: "",
  id: "",
  role: "",
  token: ""};

  constructor(private router: Router,private route: ActivatedRoute,private GeneralUserService: GeneralUserService, private disciplinaService: disciplinaService,private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.User= JSON.parse(localStorage.getItem('user') || "null");
    this.GeneralUserService.getEducandos(this.User.id).pipe(first())
    .subscribe({
        next: (result) => {
          this.filhos = result;
        },
        error: error => {
          return;
        }
    });
    this.GeneralUserService.getAproveitamento(this.User.id).pipe(first())
    .subscribe({
        next: (result) => {
          this.aproveitamento = result;
        },
        error: error => {
          return;
        }
    });
    this.GeneralUserService.getMétodoPagamento(this.User.id).pipe(first())
    .subscribe({
        next: (result) => {
          this.metodopagamento = result.metodo;
        },
        error: error => {
          return;
        }
    });
    this.GeneralUserService.getPropinas(this.User.id).pipe(first())
    .subscribe({
        next: (result) => {
          this.propinas = result;
        },
        error: error => {
          return;
        }
    });
  }

  realizarPagamento(form: NgForm){
    if(form.invalid){
      return;
    }else{
      this.GeneralUserService.realizarPagamento(this.metodopagamento, form.value.NIF, form.value.idFilho, this.User.id).pipe(first())
      .subscribe({
          next: (result) => {
            if(result.code == 200){
                form.resetForm();
                this._snackBar.open("Pagamento Realizado com Sucesso", "Close", {
                  duration: 2000,
                });
                this.GeneralUserService.getPropinas(this.User.id).pipe(first())
                .subscribe({
                    next: (result) => {
                      this.propinas = result;
                    },
                    error: error => {
                      return;
                    }
                });
            }else{
                form.resetForm();
                this._snackBar.open("Erro no Pagamento. Pagamento Cancelado", "Close", {
                  duration: 2000,
                });
            }
          },
          error: error => {
                form.resetForm();
                this._snackBar.open("Erro no Pagamento. Pagamento Cancelado", "Close", {
                  duration: 2000,
                });
          }
      });
    }
  }

  mudarmetodoPaga(form: NgForm){
    if(form.invalid){
      return;
    }else{
      this.GeneralUserService.mudarPagamento(form.value.registaPagamento, this.User.id).pipe(first())
      .subscribe({
          next: (result) => {
            if(result.code == 200){
                form.resetForm();
                this._snackBar.open("Mudou o método de Pagamento com Sucesso", "Close", {
                  duration: 2000,
                });
                this.GeneralUserService.getMétodoPagamento(this.User.id).pipe(first())
                .subscribe({
                    next: (result) => {
                      this.metodopagamento = result.metodo;
                    },
                    error: error => {
                      return;
                    }
                });
            }else{
                form.resetForm();
                this._snackBar.open("Erro ao mudar o pagamento", "Close", {
                  duration: 2000,
                });
            }
          },
          error: error => {
                form.resetForm();
                this._snackBar.open("Erro ao mudar o pagamento", "Close", {
                  duration: 2000,
                });
          }
      });
    }
  }


}
