import { Component, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { Student } from '../../models';
import { DataProvider } from '../../providers';
import * as _ from "lodash";


@IonicPage()
@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Students {

  public students:Student[];
  public subscription:any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ref: ChangeDetectorRef,
              public alertCtrl: AlertController,
              public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.subscription = this.dataProvider.getDocsObservable('student').subscribe(
      docs =>{
        this.students = _.sortBy(docs, ['name']);
        this.students = this.students.map(doc=>new Student(doc));
        console.log('Loaded Students', this.students);
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

  ionViewWillUnload(){
    this.subscription.dispose();
  }


  view(id:string = null){
    this.navCtrl.push('StudentDetail',{id:id});
  }


  add(){
    this.view();
  }

  remove(item:any){
    let prompt = this.alertCtrl.create({
      title: 'Remove Student',
      message: "Are you sure you want to remove this student record?",
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
