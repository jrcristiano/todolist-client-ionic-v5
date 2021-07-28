import { TokenService } from './../core/token/token.service';
import { Router } from '@angular/router';
import { UserService } from './../core/user/user.service';
import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public showSearch = false;
  public menuList = [
    {url: '/home', icon: 'home-outline', title: 'Home'},
    {url: '/ideas', icon: 'bulb-outline', title: 'Ideias'},
    {url: '/todo', icon: 'clipboard-outline', title: 'Tarefas a fazer'},
    {url: '/doing', icon: 'brush-outline', title: 'Tarefas em execução'},
    {url: '/done', icon: 'checkmark-done-outline', title: 'Tarefas concluídas'},
    {url: '/config', icon: 'cog-outline', title: 'Configurações'},
  ];

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
    this.openEnd();
    this.router.navigate(['/auth']);
  }

}
