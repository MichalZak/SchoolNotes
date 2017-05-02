import { Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { IonicPage,NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Student } from '../../models';
import { DataProvider } from '../../providers';
import * as _ from "lodash";
import * as moment from 'moment';
import { delay } from '../../utils';

@IonicPage()
@Component({
  selector: 'page-student-detail',
  templateUrl: 'student-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDetail {

  public student:Student = new Student();
  public shortName:string='';
  public oldStudent:Student;
  public subscription:any;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public dataProvider: DataProvider,
              public toastCtrl: ToastController,
              private ref: ChangeDetectorRef,
              public navParams: NavParams) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentDetail');
  }


  ionViewDidEnter(){
    console.log("IonViewDidEnter: ", this.student);
    this.ref.markForCheck();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter: ", this.student);

    let id = this.navParams.get('id');
    console.log("ID: ", id);

    //lets make sure we have an id, if not need to ask user if he wants to create meeting
    if(!id){
      //lets create meeting
      this.promptUser('Please input new student name.');
    } else {
      this.subscribe(id);
    } 
    
 }

 subscribe(id:string){
    
    this.subscription = this.dataProvider.getDocObservable(id).subscribe(
      doc =>{
        console.log("Viewing Student Detail ", doc); 
        this.student = new Student(Object.assign({}, doc));
        this.oldStudent = new Student(Object.assign({}, doc)); 
        this.ref.markForCheck();
      }
    ); 
 }  
  
  
 promptUser(msg:string){ 
    let toast = this.toastCtrl.create({
      message:msg,
      duration:3000,
      position: 'bottom'
    });
    toast.present;
 } 


ionViewWillLeave(){ 
    this.save(); 
    this.subscription.unsubscribe();
}

save(){
    //are we saving?
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Are we saving?");
    //lets see if changes where made
    if(_.isEqual(this.student, this.oldStudent))
      return; //no changes have been make, no need to save

    console.log("Yes we are: ", this.student);
    this.dataProvider.save(this.student);
 }



 async create(id:string = null){
  if(this.shortName == '')return; 

  if(!id) 
    id = 'student/'+this.shortName;

  let s = this.dataProvider.getDoc(id);

  if(!s)
  {
    //lets create meeting
    let ss = await this.dataProvider.save(new Student({_id: id, type: 'student'}));
    console.log('Created new doc: ', ss);
    while (!s)
    {
      await delay(200); //delay until we can load the record
      s = this.dataProvider.getDoc(id);
    }    
  }

  this.subscribe(s._id);
 }
 

 createButtonDisabled():boolean {
   this.shortName = this.shortName.replace('/', '');
   this.ref.markForCheck();
   if(this.shortName == null  || this.shortName == '')
     return true;
   else
     return false;  
 }




}
