import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { GeneralUserService } from '../Services/generaluser.service';
import { disciplinaService } from '../Services/disciplina.service';
import { precarioService } from '../Services/precario.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
          selector: 'app-admin',
          templateUrl: './admin.component.html',
          styleUrls: ['./admin.component.css']
        })
export class AdminComponent implements OnInit{

  panelOpenState = false;
  disciplinas: [] = [];

  totalExplicadores: String = '';
  totalExplicandos: String = '';
  totalDisciplinas: String = '';
  error: any;

  constructor(private GeneralUserService: GeneralUserService, private disciplinaService: disciplinaService, private precarioService: precarioService,private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.GeneralUserService.getnExplicadores().pipe(first())
    .subscribe({
        next: (result) => {
          this.totalExplicadores = result.total;
        },
        error: error => {
          this.totalExplicadores = "Loading";
        }
    });
    this.GeneralUserService.getnExplicandos().pipe(first())
    .subscribe({
        next: (result) => {
          this.totalExplicandos = result.total;
        },
        error: error => {
          this.totalExplicandos = "Loading";
        }
    });
    this.disciplinaService.getDisciplinas().pipe(first())
    .subscribe({
        next: (result) => {
          this.totalDisciplinas = result.total;
        },
        error: error => {
          this.totalDisciplinas = "Loading";
        }
    });

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

  criaDisciplina(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.disciplinaService.criaDisciplina(form.value.nomedisciplina, parseInt(form.value.anoLecionar))
        .pipe(first())
        .subscribe({
            next: (response) => {
              if(response.code == "201"){
                this.disciplinaService.getDisciplinasInfo().pipe(first())
                .subscribe({
                    next: (result) => {
                      this.disciplinas=result;
                    },
                    error: error => {
                      this.disciplinas = [];
                    }
                });
                this.disciplinaService.getDisciplinas().pipe(first())
                .subscribe({
                    next: (result) => {
                      this.totalDisciplinas = result.total;
                    },
                    error: error => {
                      this.totalDisciplinas = "Loading";
                    }
                });
                form.resetForm();
                this._snackBar.open("Disciplina Criada", "Close", {
                  duration: 2000,
                });}else{
                  form.resetForm();
                  this._snackBar.open("Disciplina inserida já existe", "Close", {
                    duration: 2000,
                  });
                }
            },
            error: error => {
              form.resetForm();
              this._snackBar.open("Erro ao criar Disciplina", "Close", {
                duration: 2000,
              });
            }
        });
    }
  }

  apagaDisciplina(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.disciplinaService.deleteDisciplina(form.value.iddisciplina,)
        .pipe(first())
        .subscribe({
            next: (response) => {
              if(response.code == "200"){
                this.disciplinaService.getDisciplinasInfo().pipe(first())
                .subscribe({
                    next: (result) => {
                      this.disciplinas=result;
                    },
                    error: error => {
                      this.disciplinas = [];
                    }
                });
                this.disciplinaService.getDisciplinas().pipe(first())
                .subscribe({
                    next: (result) => {
                      this.totalDisciplinas = result.total;
                    },
                    error: error => {
                      this.totalDisciplinas = "Loading";
                    }
                });
                form.resetForm();
                this._snackBar.open("Disciplina apagada com sucesso", "Close", {
                  duration: 2000,
                });}else{
                  form.resetForm();
                  this._snackBar.open("ID Disciplina inserido não existe", "Close", {
                    duration: 2000,
                  });
                }
            },
            error: error => {
              form.resetForm();
              this._snackBar.open("Erro ao criar Disciplina", "Close", {
                duration: 2000,
              });
            }
        });
    }
  }

  atualizaPrecario(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.precarioService.atualizaPreco(form.value.aulapreco,form.value.Mensalpreco,form.value.Anualpreco)
        .pipe(first())
        .subscribe({
            next: (response) => {
              if(response.code == "200"){
                form.resetForm();
                this._snackBar.open("Preçário atualizado com sucesso", "Close", {
                  duration: 2000,
                });}else{
                  form.resetForm();
                  this._snackBar.open("Lamentamos, erro ao atualizar", "Close", {
                    duration: 2000,
                  });
                }
            },
            error: error => {
              form.resetForm();
              this._snackBar.open("Lamentamos, erro ao atualizar", "Close", {
                duration: 2000,
              });
            }
        });
    }
  }

}
