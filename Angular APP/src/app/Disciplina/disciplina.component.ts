import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';

import { GeneralUserService } from '../Services/generaluser.service';
import { disciplinaService } from '../Services/disciplina.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
          selector: 'app-disciplina',
          templateUrl: './disciplina.component.html',
          styleUrls: ['./disciplina.component.css']
        })
export class DisciplinaComponent implements OnInit{

  idDisciplina: string = ""
  nomeDisciplina: string = ""
  anoDisciplina: string = ""


  linkvazio = true;
  link ="";
  idLink ="";

  conteudos: [] = [];
  disponibilidades: [] =[];

  panelOpenState = false;
  disciplina={ID:"",Nome:"",Ano:""}
  User={Email: "",
  NIF: "",
  Nome: "",
  Sobrenome: "",
  id: "",
  role: "",
  token: ""};

  constructor(private _location: Location,private router: Router,private route: ActivatedRoute,private GeneralUserService: GeneralUserService, private disciplinaService: disciplinaService,private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.User= JSON.parse(localStorage.getItem('user') || "null");

    this.idDisciplina = this.route.snapshot.params.id;
    this.nomeDisciplina = this.route.snapshot.params.nome;
    this.anoDisciplina = this.route.snapshot.params.ano;

  }

  getLinkeCont(){
    this.disciplinaService.getthisDisciplina(this.idDisciplina).pipe(first())
    .subscribe({
        next: (result) => {
          this.disciplina = result;
          this.disciplinaService.getDisciplinaLink(this.idDisciplina).pipe(first())
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
          this.disciplinaService.getDisciplinaConteudo(this.idDisciplina).pipe(first())
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
  }

  getDisponibilidades(){
    this.disciplinaService.getDisponibilidades(this.idDisciplina).pipe(first())
    .subscribe({
        next: (result) => {
          this.disponibilidades = result;
        },
        error: error => {
          return;
        }
    });
  }

  backClicked() {
    this._location.back();
  }

  adicionarAula(){
    this.disciplinaService.adicionarAula(this.User.id,this.idDisciplina).pipe(first())
    .subscribe({
        next: (result) => {
          if(result.code == "200"){
            this._snackBar.open("Progresso atualizado com sucesso", "Close", {
              duration: 2000,
            });
          }else{
            this._snackBar.open("Erro ao atualizar progresso!", "Close", {
              duration: 2000,
            });
          }
        },
        error: error => {
          this._snackBar.open("Erro ao atualizar progresso!", "Close", {
            duration: 2000,
          });
        }
    });
  }

}
