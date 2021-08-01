import { Router } from '@angular/router';
import { TokenService } from './../../core/token/token.service';
import { UserService } from './../../core/user/user.service';
import { MenuController, AlertController } from '@ionic/angular';
import { User } from './../../core/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {

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
    private router: Router) {
    }

  get user(): User {
    const user = this.userService.getUser();
    return JSON.parse(user) as User;
  }

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
