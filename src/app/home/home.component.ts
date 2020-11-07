import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showManagerBoard = false;
  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();      
      this.roles = user.role;

      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');
    }

  }

}
