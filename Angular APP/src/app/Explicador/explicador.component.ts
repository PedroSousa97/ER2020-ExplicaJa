import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';


import { GeneralUserService } from '../Services/generaluser.service';
import { disciplinaService } from '../Services/disciplina.service';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface FeedbackElement {
  ID: string;
  Feedback: string;
  IDExplicador: string;
  IDExplicando: string;
}

@Component({
          selector: 'app-explicador',
          templateUrl: './explicador.component.html',
          styleUrls: ['./explicador.component.css']
        })
export class ExplicadorComponent implements OnInit{

  FEEDBACK_DATA: FeedbackElement[] = [];

  displayedColumns2: string[] = ['ID', 'Feedback', 'IDExplicando'];
  dataSource2 = this.FEEDBACK_DATA;


  linkvazio = true;
  link ="";
  idLink ="";

  conteudos: [] = [];

  panelOpenState = false;
  disciplina={ID:"",Nome:"",Ano:""}
  User={Email: "",
  NIF: "",
  Nome: "",
  Sobrenome: "",
  id: "",
  role: "",
  token: ""};

  constructor(private GeneralUserService: GeneralUserService, private disciplinaService: disciplinaService,private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.User= JSON.parse(localStorage.getItem('user') || "null");
    this.disciplinaService.getDisciplina(this.User.id).pipe(first())
    .subscribe({
        next: (result) => {
          this.disciplina = result;
          this.disciplinaService.getDisciplinaLink(this.disciplina.ID).pipe(first())
            .subscribe({
                next: (result) => {
                  if(result.code == 0){
                    this.linkvazio = true;
                  }
                  else{
                    this.link = result.message;
                    this.idLink = result.id;
                    this.linkvazio = false;
                  }
                },
                error: error => {
                  this.linkvazio = true;
                }
            });
          this.disciplinaService.getDisciplinaConteudo(this.disciplina.ID).pipe(first())
            .subscribe({
                next: (result) => {
                  this.conteudos=result;
                },
                error: error => {
                  this.conteudos = [];
                }
            });
        },
        error: error => {
          this.disciplina.ID = "Loading";
          this.disciplina.Nome = "Loading";
          this.disciplina.Ano = "Loading"
        }
    });
    this.GeneralUserService.obtemFeedback(this.User.id)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if(response.code == "1"){
              return;
          }else
          {
            this.FEEDBACK_DATA = response;
            this.dataSource2 = this.FEEDBACK_DATA;
            }
        },
        error: error => {
          return
        }
    });
  }


  postConteudo(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.disciplinaService.criaConteúdo(this.disciplina.ID,form.value.titulo, form.value.conteudo)
        .pipe(first())
        .subscribe({
            next: (response) => {
                this.disciplinaService.getDisciplinaConteudo(this.disciplina.ID).pipe(first())
                .subscribe({
                    next: (result) => {
                      this.conteudos=result;
                    },
                    error: error => {
                      this.conteudos = [];
                    }
                    });
                form.resetForm();
                this._snackBar.open("Conteúdo Criado", "Close", {
                  duration: 2000,
                });
            },
            error: error => {
              form.resetForm();
              this._snackBar.open("Erro ao criar Conteúdo", "Close", {
                duration: 2000,
              });
            }
        });
    }
  }

  postLink(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.disciplinaService.atualizaLink(this.disciplina.ID,form.value.link)
        .pipe(first())
        .subscribe({
            next: (response) => {
              this.disciplinaService.getDisciplinaLink(this.disciplina.ID).pipe(first())
              .subscribe({
                  next: (result) => {
                    if(result.code == 0){
                      this.linkvazio = true;
                    }
                    else{
                      this.link = result.message;
                      this.idLink = result.id;
                      this.linkvazio = false;
                    }
                  },
                  error: error => {
                    this.linkvazio = true;
                  }
                });
                form.resetForm();
                this._snackBar.open("Link Atualizado", "Close", {
                  duration: 2000,
                });
            },
            error: error => {
              form.resetForm();
              this._snackBar.open("Erro ao atualizar Link", "Close", {
                duration: 2000,
              });
            }
        });
    }
  }

  postDisponibilidades(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      var datetime = form.value.disponibilidade;
      var spliter = datetime.split("T");
      var date = spliter[0];
      var time = spliter[1];
      var time2 = time+":00";
      var newdate = date.split("/").reverse().join("-");
      var newdate2 = newdate+" "
      var datafinal = newdate2+time2

      this.disciplinaService.atualizaDisponibilidade(datafinal,this.User.id)
        .pipe(first())
        .subscribe({
            next: (response) => {
              if(response.code == 201){
                form.resetForm();
                this._snackBar.open("Nova Data Adicionada", "Close", {
                  duration: 2000,
                });
              }
              else{
                form.resetForm();
                this._snackBar.open("Erro ao adicionar nova Data", "Close", {
                  duration: 2000,
                });
              }
            },
            error: error => {
              form.resetForm();
              this._snackBar.open("Erro ao adicionar nova Data", "Close", {
                duration: 2000,
              });
            }
        });

    }
  }
}
