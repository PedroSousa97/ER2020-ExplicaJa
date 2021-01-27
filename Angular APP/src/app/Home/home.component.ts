import { Component, OnInit } from '@angular/core';
import { precarioService } from '../Services/precario.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Anual: string = '';
  Aula: String = '';
  Mensal: String = '';

  constructor(private precarioService: precarioService) { }

  ngOnInit(): void {
    this.precarioService.getPrecos().pipe(first())
    .subscribe({
        next: (result) => {
          this.Anual = result[0].Anual;
          this.Aula = result[0].Aula;
          this.Mensal = result[0].Mensal;
        },
        error: error => {
          this.Anual = "Loading";
          this.Aula = "Loading";
          this.Mensal = "Loading";
        }
    });
  }

  public executeSelectedChange = (event:any) => {
    console.log(event);
  }
}
