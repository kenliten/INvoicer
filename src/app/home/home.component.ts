import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  user: User;

  loggedIn: boolean;

  loginForm = this.fb.group({
    username: ['', Validators.minLength],
    password: ['', Validators.requiredTrue]
  });

  constructor(private authService: AuthService,
    private fb: FormBuilder) { }

  login(e: Event): void {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(r => {
        this.user = r;
        this.isLoggedIn();
      });
    e.preventDefault();
  }

  isLoggedIn(): void {
    this.authService.isLoggedIn()
      .subscribe(r => this.loggedIn = r);
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

}
