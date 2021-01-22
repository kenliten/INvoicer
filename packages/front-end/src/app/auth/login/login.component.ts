import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;

  errorMessage: string;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
    ) { }

  onSubmit(e: Event) {
    console.log('Your data: ', this.loginForm.value);

    this.api.postRequest('users/login', this.loginForm.value)
      .subscribe((res: any) => {
        if (res.status) {
          console.log(res);

          this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));

          this.auth.setDataInLocalStorage('token', res.token);

          this.router.navigate(['']);
        }}, err => this.errorMessage = err['error'].message);
    e.preventDefault();
  }

  isUserLogged() {
    if (this.auth.getUserDetails()) {
      this.isLogged = true;
    }
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.isUserLogged();
  }

}
