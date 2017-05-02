import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Students } from './students';

@NgModule({
  declarations: [
    Students,
  ],
  imports: [
    IonicPageModule.forChild(Students),
  ],
  exports: [
    Students
  ]
})
export class StudentsModule {}
