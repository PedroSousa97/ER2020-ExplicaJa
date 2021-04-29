import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import {AuthService} from '../auth/auth.service'
import { Role } from '../models/role'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService,private _snackBar: MatSnackBar){}


  onLogin(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      this.isLoading = true;
      this.authService.login(form.value.loginmail, form.value.loginpass)
        .pipe(first())
        .subscribe({
            next: (user) => {
                this.authService.islogged = true;
                if (user.role == Role.Admin) {
                  localStorage.setItem('islogged', JSON.stringify({islogged: "true"}));
                  this.router.navigateByUrl('/admin');
                } else if (user.role == Role.CFO) {
                  localStorage.setItem('islogged', JSON.stringify({islogged: "true"}));
                  this.router.navigateByUrl('/cfo');
                } else if (user.role == Role.RH) {
                  localStorage.setItem('islogged', JSON.stringify({islogged: "true"}));
                  this.router.navigateByUrl('/rh')
                } else if (user.role == Role.Explicador) {
                  localStorage.setItem('islogged', JSON.stringify({islogged: "true"}));
                  this.router.navigateByUrl('/explicador')
                } else if (user.role == Role.Educando) {
                  localStorage.setItem('islogged', JSON.stringify({islogged: "true"}));
                  this.router.navigateByUrl('/explicando')
                } else if (user.role == Role.Encarregado) {
                  localStorage.setItem('islogged', JSON.stringify({islogged: "true"}));
                  this.router.navigateByUrl('/encarregado')
                }else{
                  this.router.navigateByUrl('/')
                }
            },
            error: error => {
                if(error.status == "404"){
                  this._snackBar.open("Email inserido não existe", "Close", {
                    duration: 2000,
                  });
                  this.isLoading= false;
                  form.resetForm();
                  return;
                }
                if(error.status == "401"){
                  this._snackBar.open("Password inválida!", "Close", {
                    duration: 2000,
                  });
                  this.isLoading= false;
                  form.resetForm();
                  return;
                }
                if(error.status == "500"){
                  this._snackBar.open("Erro de autentificação!", "Close", {
                    duration: 2000,
                  });
                  this.isLoading= false;
                  form.resetForm();
                  return;
                }
            }
        });
    }
    }
}
