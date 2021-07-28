import { User } from './../../core/models/user';
import { AuthService } from '../../core/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;
  @ViewChild('usernameInput') usernameInput: IonInput;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ]]
    })
  }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue() as User;

      this.authService.authenticate(email, password)
        .subscribe(
          () => {
            this.navController.navigateForward('home');
            this.form.reset();
          },
          (err) => {
            this.presentAlert().then(() => {
              this.usernameInput.setFocus();
            })
          }
        )
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login inválido',
      message: 'Por favor, verifique seus dados e tente novamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
