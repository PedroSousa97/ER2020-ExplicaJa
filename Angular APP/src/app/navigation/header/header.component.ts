import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  localStorageData = {islogged: false};

  isStillLogged: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
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

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
