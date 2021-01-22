import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  isLogged: boolean = false;

  errorMessage: string;

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
    ) { }

  onSubmit() {
    console.log('Your form data : ', this.registerForm.value);
    this.api.postRequest('user/register', this.registerForm.value)
      .subscribe((res: any) => {
        if (res.status) {


          console.log(res);
          this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
          this.auth.setDataInLocalStorage('token', res.token);
          this.router.navigate(['login']);
        } else {
          console.log(res);
          alert(res.msg)}
        }, err => {
          this.errorMessage = err['error'].message;
        });
  }

  isUserLogged(){
    if(this.auth.getUserDetails() != null) {
      this.isLogged = true;
    }
  }

  ngOnInit() {
    this.isUserLogged();
  }

}
