import { Component, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { Meeting } from '../../models';
import { DataProvider } from '../../providers';
import * as _ from "lodash";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Meetings {

  public meetings:Meeting[];
  public subscription:any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ref: ChangeDetectorRef,
              public alertCtrl: AlertController,
              public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.subscription = this.dataProvider.getDocsObservable('meeting').subscribe(
      docs =>{
        this.meetings = _.sortBy(docs, ['_id']);
        this.meetings = this.meetings.map(doc=>new Meeting(doc));
        this.ref.markForCheck();
      },
      err =>{
        //onError
        console.log(err);
      },
      () =>{
        //onComplted
        console.log("Subscription Completed");
      }
    );
  }

  printMeetingSummary(meeting:Meeting):string{
    let m = this.getStudentName(meeting.talks[0].student)+this.getLesson(meeting.talks[0].lesson);
    m += ", "+this.getStudentName(meeting.talks[1].student)+this.getLesson(meeting.talks[1].lesson);
    m += ", "+this.getStudentName(meeting.talks[2].student)+this.getLesson(meeting.talks[2].lesson);
    m += ", "+this.getStudentName(meeting.talks[3].student)+this.getLesson(meeting.talks[3].lesson);
    return m;
  }

  getStudentName(id:string){
    if(!id)return "";
    return this.dataProvider.getDoc(id)['name'];
  }

  getLesson(lesson:number):string{
    if(!lesson)return "";
    return "("+lesson+")";
  }

  ionViewWillUnload(){
    this.subscription.dispose();
  }


  view(id:string = null){
    this.navCtrl.push('MeetingDetail',{id:id});
  }


  add(){
    this.view();
  }

  remove(item:any){
    let prompt = this.alertCtrl.create({
      title: 'Remove Meeting',
      message: "Are you sure you want to remove this meeting record?",
      buttons: [
        {
          text: 'Cancel',
          handler: data=>{}//do nothing, just leave
        },
        {
          text: 'Remove',
          handler: data => {
            this.dataProvider.remove(item)
          }
        }
      ]
    });
    prompt.present();
  
  }

}
