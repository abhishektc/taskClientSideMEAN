import { TokenStorageService } from './service/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'taskTripaxy';
  private roles: string[];
  isLoggedIn = false;
  showManagerBoard = false;
  showEmployeeBoard = false;

  constructor(private router:Router, private tokenStorage: TokenStorageService){}
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      this.router.navigate([''])

    } else {
      this.router.navigate(['login'])
    }
  }

}
