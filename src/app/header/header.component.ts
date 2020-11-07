import { Router } from '@angular/router';
import { TokenStorageService } from './../service/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showManagerBoard = false;
  showEmployeeBoard = false;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();      
      this.roles = user.role;

      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');
      this.showEmployeeBoard = this.roles.includes('ROLE_EMPLOYEE');
    }

  }

  logout() {
    window.sessionStorage.clear();
    alert("Logged Out Successfully");
    window.location.reload();
  }

}
