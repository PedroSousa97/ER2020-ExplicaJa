import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';


import { GeneralUserService } from '../Services/generaluser.service';
import { disciplinaService } from '../Services/disciplina.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
          selector: 'app-explicando',
          templateUrl: './explicando.component.html',
          styleUrls: ['./explicando.component.css']
        })
export class ExplicandoComponent implements OnInit{


  disciplinas: [] = [];

  minhasDisciplinas: [] = [];
  explicadores= [{idPessoa:0,Nome:"Null",Sobrenome:"Null"}];
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
    this.disciplinaService.getExplicadores(this.User.id).pipe(first())
    .subscribe({
        next: (result) => {
          this.explicadores = result;
        },
        error: error => {
          return;
        }
    });
    this.disciplinaService.getDisciplinasAno(this.User.id).pipe(first())
    .subscribe({
        next: (result) => {
          this.disciplinas = result;
        },
        error: error => {
          return;
        }
    });
    this.disciplinaService.getminhasDisciplinas(this.User.id).pipe(first())
    .subscribe({
        next: (result) => {
          this.minhasDisciplinas = result;
          console.log(this.minhasDisciplinas)
        },
        error: error => {
          return;
        }
    });
  }

  subscreveDisciplina(IDDisc: string){
    this.disciplinaService.subscreveDisciplina(this.User.id,IDDisc).pipe(first())
    .subscribe({
        next: (result) => {
          if(result.code == "200"){
            this.disciplinaService.getminhasDisciplinas(this.User.id).pipe(first())
              .subscribe({
                  next: (result) => {
                    this.minhasDisciplinas = result;
                  },
                  error: error => {
                    return;
                  }
              });
            this._snackBar.open("Inscrição Realizada com sucesso!", "Close", {
              duration: 2000,
            });
          }else{
            this._snackBar.open("Já está inscrito nesta disciplina", "Close", {
              duration: 2000,
            });
          }
        },
        error: error => {
          this._snackBar.open("Erro ao submeter inscrição", "Close", {
            duration: 2000,
          });
        }
    });

  }

  visualizarDisciplina(ID: string, Nome: string, Ano: string){
    const url = `/disciplina/${ID}/${Nome}/${Ano}`;
    this.router.navigateByUrl(url)
  }

  criarFeedback(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.disciplinaService.criaFeedback(form.value.idExplicador,form.value.fedback, this.User.id)
        .pipe(first())
        .subscribe({
            next: (response) => {
              if(response.code == "201"){
                form.resetForm();
                this._snackBar.open("Feedback criado com sucesso", "Close", {
                  duration: 2000,
                });
                }else{
                  form.resetForm();
                  this._snackBar.open("Erro ao criar Feedback", "Close", {
                    duration: 2000,
                  });
                }
            },
            error: error => {
              form.resetForm();
              this._snackBar.open("Erro ao criar Feedback", "Close", {
                duration: 2000,
              });
            }
        });
    }
  }

}
