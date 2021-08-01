import { TodoService } from './../core/todos/todo.service';
import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public todos: any = [];

  constructor(private todoService: TodoService) { }

  ionViewDidEnter() {
    const skip = this.todos.length;
    this.todoService.getOnDemandTasks(skip)
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  doReorder(ev: CustomEvent) {
    let { from, to } = ev.detail;

    from = this.todos[from].id;
    to = this.todos[to].id;

    if (from < to) {
      this.todoService.updateByDragUpDown({from, to});
    }

    if (from > to) {
      this.todoService.updateByDragDownUp({from, to});
    }

    ev.detail.complete();
  }

  reloadData(event) {
    setTimeout(() => {
      const skip = this.todos.length;
      this.todoService.getOnDemandTasks(skip).subscribe(todos => {
        this.todos = this.todos.concat(todos);
      });

      event.target.complete();
    }, 500);
  }

}
