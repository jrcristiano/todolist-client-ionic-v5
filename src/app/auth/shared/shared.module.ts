import { NucleusHeaderComponent } from './components/nucleus-header/nucleus-header.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NucleusHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NucleusHeaderComponent
  ]
})
export class SharedModule { }
