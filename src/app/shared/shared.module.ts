import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from './main-header/main-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MainHeaderComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    MainHeaderComponent,
    NavMenuComponent
  ]
})
export class SharedModule { }
