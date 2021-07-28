import { RegisterPageModule } from './register/register.module';
import { LoginPageModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    LoginPageModule,
    RegisterPageModule
  ]
})
export class AuthModule { }
