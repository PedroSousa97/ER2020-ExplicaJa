import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { GeneralUserService } from '../Services/generaluser.service';
import { disciplinaService } from '../Services/disciplina.service';
import { precarioService } from '../Services/precario.service';
import { FinancialService } from '../Services/financial.service'
import {MatSnackBar} from '@angular/material/snack-bar';


export interface PeriodicElement {
  ID: string;
  Data: string;
  Valor: string;
  NIF: string;
  IDEncarregado: String
}

@Component({
          selector: 'app-cfo',
          templateUrl: './cfo.component.html',
          styleUrls: ['./cfo.component.css']
        })
export class CFOComponent implements OnInit{

  ELEMENT_DATA: PeriodicElement[] = [];


  displayedColumns: string[] = ['ID', 'Data', 'Valor', 'NIF', 'IDEncarregado'];
  dataSource = this.ELEMENT_DATA;

  constructor(private FinancialService: FinancialService,private GeneralUserService: GeneralUserService, private disciplinaService: disciplinaService, private precarioService: precarioService,private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.FinancialService.getFaturas().pipe(first())
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

}
