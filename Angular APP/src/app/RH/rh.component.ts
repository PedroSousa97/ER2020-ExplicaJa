import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { GeneralUserService } from '../Services/generaluser.service';
import { disciplinaService } from '../Services/disciplina.service';
import { precarioService } from '../Services/precario.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface PeriodicElement {
  ID: string;
  Nome: string;
  Sobrenome: string;
  Disciplina: string;
  Ano: String
}

export interface FeedbackElement {
  ID: string;
  Feedback: string;
  IDExplicador: string;
  IDExplicando: string;
}

export interface AvaliacoesElement {
  ID: string;
  IDExplicador: string;
  Avaliacao: string;
}

@Component({
          selector: 'app-rh',
          templateUrl: './rh.component.html',
          styleUrls: ['./rh.component.css']
        })
export class RHComponent implements OnInit{

  ELEMENT_DATA: PeriodicElement[] = [];

  FEEDBACK_DATA: FeedbackElement[] = [];

  AVALIACAO_DATA: AvaliacoesElement[] = [];

  displayedColumns: string[] = ['ID', 'Nome', 'Sobrenome', 'Disciplina', 'Ano'];
  dataSource = this.ELEMENT_DATA;

  displayedColumns2: string[] = ['ID', 'Feedback', 'IDExplicador', 'IDExplicando'];
  dataSource2 = this.FEEDBACK_DATA;

  displayedColumns3: string[] = ['ID', 'IDExplicador', 'Avaliacao'];
  dataSource3 = this.AVALIACAO_DATA;

  tokenready: boolean = false;
  Token: string = "";

  constructor(private GeneralUserService: GeneralUserService, private disciplinaService: disciplinaService, private precarioService: precarioService,private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.GeneralUserService.getDadosExplicador().pipe(first())
    .subscribe({
        next: (result) => {
          this.ELEMENT_DATA = result;
          this.dataSource = this.ELEMENT_DATA;
        },
        error: error => {
          this.ELEMENT_DATA = [];
        }
    });
  }

  geraToken(){
    this.Token= Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    this.GeneralUserService.criaToken(this.Token)
        .pipe(first())
        .subscribe({
            next: (response) => {
              if(response.code == "201"){
                this.tokenready = true;
                this._snackBar.open("Token Gerada Criada", "Close", {
                  duration: 2000,
                });}else{
                  this._snackBar.open("Falha a gerar Token", "Close", {
                    duration: 2000,
                  });
                }
            },
            error: error => {
              this._snackBar.open("Falha a gerar Token", "Close", {
                duration: 2000,
              });
            }
        });
  }

  apagaExplicador(form: NgForm){
      if (form.invalid) {
        return;
      }else{
        this.GeneralUserService.eliminaExplicador(form.value.idexplicador)
          .pipe(first())
          .subscribe({
              next: (response) => {
                if(response.code == "200"){
                  this.GeneralUserService.getDadosExplicador().pipe(first())
                      .subscribe({
                          next: (result) => {
                            this.ELEMENT_DATA = result;
                            this.dataSource = this.ELEMENT_DATA;
                          },
                          error: error => {
                            this._snackBar.open("Erro a atualizar tabela Explicadores!", "Close", {
                              duration: 2000,
                            });
                            return;
                          }
                  });
                  form.resetForm();
                  this._snackBar.open("Explicador eliminado com sucesso!", "Close", {
                    duration: 2000,
                  });}else{
                    form.resetForm();
                    this._snackBar.open("ID de Explicador inserido não existe!", "Close", {
                      duration: 2000,
                    });
                  }
              },
              error: error => {
                form.resetForm();
                this._snackBar.open("Erro ao eliminar Explicador", "Close", {
                  duration: 2000,
                });
              }
          });
      }
  }

  getFeedbacks(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.GeneralUserService.obtemFeedback(form.value.idfeedbacks)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if(response.code == "1"){

            form.resetForm();
              this._snackBar.open("ID de Explicador inserido não tem Feedbacks", "Close", {
                duration: 2000,
              });
          }else
          {
            this.FEEDBACK_DATA = response;
            this.dataSource2 = this.FEEDBACK_DATA;
            form.resetForm();
            }
        },
        error: error => {
          form.resetForm();
          this._snackBar.open("Erro ao eliminar Explicador", "Close", {
            duration: 2000,
          });
        }
    });
    }
  }

  getAvaliacoes(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.GeneralUserService.getAvaliacoes(form.value.idAvaliacoes)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log(response);
          if(response.code == "1"){
            form.resetForm();
              this._snackBar.open("ID de Explicador inserido não tem Avaliações", "Close", {
                duration: 2000,
              });
          }else
          {
            this.AVALIACAO_DATA = response;
            this.dataSource3 = this.AVALIACAO_DATA;
            form.resetForm();
          }
        },
        error: error => {
          form.resetForm();
          this._snackBar.open("Erro ao eliminar Explicador", "Close", {
            duration: 2000,
          });
        }
    });
    }
  }

  avaliarExplicador(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.GeneralUserService.avaliarExplicador(form.value.idExplicadorAval,form.value.avaliacao)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if(response.code == "201"){
            form.resetForm();
              this._snackBar.open("Avaliação criada com sucesso!", "Close", {
                duration: 2000,
              });
          }else
          {
              form.resetForm();
              this._snackBar.open("ID de Explicador inserido não existe!", "Close", {
                duration: 2000,
              });
            }
        },
        error: error => {
          form.resetForm();
          this._snackBar.open("Erro ao criar Avaliação", "Close", {
            duration: 2000,
          });
        }
    });
    }
  }
}
