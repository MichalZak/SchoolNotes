import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentDetail } from './student-detail';

@NgModule({
  declarations: [
    StudentDetail,
  ],
  imports: [
    IonicPageModule.forChild(StudentDetail),
  ],
  exports: [
    StudentDetail
  ]
})
export class StudentDetailModule {}
