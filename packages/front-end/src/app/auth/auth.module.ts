import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, PasswordRecoveryComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
