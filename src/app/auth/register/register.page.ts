import { AlertController, NavController, IonInput } from '@ionic/angular';
import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../core/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public form!: FormGroup;
  @ViewChild('email') email: IonInput;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private navController: NavController) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      lastname: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      email: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.email
        ]
      ],
      password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255)
        ]
      ]
    });
  }

  register() {
    if (this.form.valid) {
      const userData = this.form.getRawValue() as User;

      this.authService.register(userData)
        .subscribe(
          (res) => {
            const { name } = res;
            this.userCreatedSuccessfully(name)
          },
          (res) => {
            const emailErrors = res.error.errors.email;

            let allErrors = [];
            emailErrors.map(message => allErrors.push(message));

            allErrors.map(error => this.errorCreateUser(error));
        })
    }
  }

  async userCreatedSuccessfully(username: string) {
    const alert = await this.alertController.create({
      header: `Olá, ${username}`,
      message: 'Bem-vindo ao Nucleus, para continuar, por favor faça login.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navController.navigateForward('auth');
          }
        }
      ]
    });

    await alert.present();
  }

  async errorCreateUser(message: string) {
    const alert = await this.alertController.create({
      header: `Erro ao cadastrar`,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.form.controls['email'].setValue('');
            this.form.controls['password'].setValue('');
            this.email.setFocus();
          }
        }
      ]
    });

    await alert.present();
  }
}
