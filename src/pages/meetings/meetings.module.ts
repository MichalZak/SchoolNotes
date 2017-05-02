import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Meetings } from './meetings';

@NgModule({
  declarations: [
    Meetings,
  ],
  imports: [
    IonicPageModule.forChild(Meetings),
  ],
  exports: [
    Meetings
  ]
})
export class MeetingsModule {}
