import { TokenService } from './../core/token/token.service';
import { Router } from '@angular/router';
import { UserService } from './../core/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public showSearch = false;

  constructor(
    private menu: MenuController,
    private alertController: AlertController,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.close();
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Sair',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.tokenService.removeToken();
    this.userService.removeUser();
    this.router.navigate(['login']);
  }

}
