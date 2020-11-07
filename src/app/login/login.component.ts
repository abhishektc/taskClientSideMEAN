import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SystemServiceService } from '../service/system-service.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isLoggedInUser = false;
  showEmployee = true;
  showManager = false;
  backGroundColorEmployee = 'blue'
  backGroundColorManager = 'white'

  constructor(private fb: FormBuilder, private systemService: SystemServiceService, private tokenStorage: TokenStorageService, private router: Router) { }

  loginForm = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(3)])]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedInUser = true;
    }
    if (this.isLoggedInUser) {
      this.router.navigate(['']);
    }
  }

  login(data: FormGroup) {
    const username = data.value.username;
    const password = data.value.password;
    let role;
    if (this.showEmployee) {
      role = 'ROLE_EMPLOYEE'
    } else {
      role = 'ROLE_MANAGER'
    }
    this.systemService.login({ username, password, role }).subscribe(
      data => {
        this.tokenStorage.saveToken(data.result.token);
        this.tokenStorage.saveUser(data.result);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        alert(data.message);
        this.reloadPage();
      },
      err => {
        this.isLoggedIn = false;
        this.isLoginFailed = true;
        
        this.errorMessage = err.error.message;
      }
    );
  }

  showLogin (showEmployee:boolean, showManager:boolean) {

    this.showEmployee = showEmployee;
    this.showManager = showManager;
    if(showManager) {
      this.backGroundColorEmployee = 'white'
      this.backGroundColorManager = 'blue'
    } else {
      this.backGroundColorEmployee = 'blue'
      this.backGroundColorManager = 'white'
    }
  }

  reloadPage() {
    window.location.reload();

  }

}
