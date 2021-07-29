import { TodoService } from './../core/todos/todo.service';
import { User } from './../core/models/user';
import { TokenService } from './../core/token/token.service';
import { Router } from '@angular/router';
import { UserService } from './../core/user/user.service';
import { Component, ViewChild } from '@angular/core';
import { MenuController, AlertController, IonReorderGroup, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  public showSearch = false;
  public menuList = [
    {url: '/home', icon: 'home-outline', title: 'Home'},
    {url: '/ideas', icon: 'bulb-outline', title: 'Ideias'},
    {url: '/todo', icon: 'clipboard-outline', title: 'Tarefas a fazer'},
    {url: '/doing', icon: 'brush-outline', title: 'Tarefas em execução'},
    {url: '/done', icon: 'checkmark-done-outline', title: 'Tarefas concluídas'},
    {url: '/config', icon: 'cog-outline', title: 'Configurações'},
  ];
  public todos: any = [];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private menu: MenuController,
    private alertController: AlertController,
    private userService: UserService,
    private tokenService: TokenService,
    private todoService: TodoService,
    private router: Router) { }

  ionViewDidEnter() {
    const skip = this.todos.length;
    this.todoService.getOnDemandTasks(skip)
      .subscribe(todos => {
        this.todos = todos;
      });
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

  doReorder(ev: CustomEvent) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }

  loadData(event) {
    setTimeout(() => {
      const skip = this.todos.length + 15;
      this.todoService.getOnDemandTasks(skip).subscribe(todos => {
        this.todos = this.todos.concat(todos);
      });

      event.target.complete();
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  logout() {
    this.tokenService.removeToken();
    this.userService.removeUser();
    this.openEnd();
    this.router.navigate(['/auth']);
  }

}
