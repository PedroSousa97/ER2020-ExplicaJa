import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  localStorageData = {islogged: false};

  isStillLogged: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.localStorageData = JSON.parse(localStorage.getItem('islogged') || "null");
    if(this.localStorageData == null){
      return
    }
    this.isStillLogged = this.localStorageData.islogged;
  }

  public logout(){
    localStorage.clear();
    this.isStillLogged = false;
    this.authService.islogged=false;
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
