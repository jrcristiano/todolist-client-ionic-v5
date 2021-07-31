import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from './main-header/main-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MainHeaderComponent
  ]
})
export class SharedModule { }
