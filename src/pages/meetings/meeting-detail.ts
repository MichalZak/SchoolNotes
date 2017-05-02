import { Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { IonicPage,NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Meeting, StudentTalks, Student, Talk, StudentLessons } from '../../models';
import { DataProvider } from '../../providers';
import * as _ from "lodash";
import * as moment from 'moment';
import { delay } from '../../utils';

@IonicPage() 
@Component({
  selector: 'page-meeting-detail',
  templateUrl: 'meeting-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
}) 
export class MeetingDetail {

  public meeting:Meeting = new Meeting();
  public oldMeeting:Meeting;
  public students:Student[] = new Array<Student>(); 
  public subscription:any;
  public meetingTypes:any[] = StudentTalks;  
  public lessons:any[] = StudentLessons;

  public meetingDate: String = moment().format('YYYY-MM-DD');


  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public dataProvider: DataProvider,
              public toastCtrl: ToastController,
              private ref: ChangeDetectorRef,
              public navParams: NavParams) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetingDetail');
  }

  ionViewDidEnter(){
    console.log("IonViewDidEnter: ", this.meeting);
    this.ref.markForCheck();  
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter: ", this.meeting);

    let m = this.navParams.get('id');

    //lets make sure we have an id, if not need to ask user if he wants to create meeting
    if(!m){
      //lets create meeting
      this.promptUser('Please choose meeting date and create meeting.');
    } else {
      this.create(m);
    }

    this.students = this.dataProvider.getDocs('student').map(doc=> new Student(doc));
    
 } 

 subscribe(id:string){
    
    this.subscription = this.dataProvider.getDocObservable(id).subscribe(
      doc =>{
        console.log("Viewing Meeting Detail ", doc);
        this.meeting = new Meeting(Object.assign({}, doc));
        this.oldMeeting = new Meeting(Object.assign({}, doc));
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
    
    //make sure talk data didn't change
    let noChange  = true;
    for(let i=0; i<4; i++)
    {
      if(!_.isEqual(this.meeting.talks[1], this.oldMeeting.talks[i]))
        noChange=false;
    }
    
    if(_.isEqual(this.meeting, this.oldMeeting) && noChange)
      return; //no changes have been make, no need to save
    

    console.log("Yes we are: ", this.meeting);
    this.dataProvider.save(this.meeting);
 }

 async create(id:string = null){
  if(!id) 
    id = 'meeting/'+moment(this.meetingDate).format('YYYYMMDD');

  let m = this.dataProvider.getDoc(id); 

  if(!m)
  {
    //lets create meeting
    //lets make default talks to insert into meeting
    let talks:Talk[] = [
      new Talk({id:0}),
      new Talk({id:1}),
      new Talk({id:2}),
      new Talk({id:3}),
    ]
    let mm = await this.dataProvider.save(new Meeting({_id: id, type: 'meeting', talks:talks}));
    console.log('Created new doc: ', mm);
    while (!m)
    { 
      await delay(200); //delay until we can load the record
      m = this.dataProvider.getDoc(id);
    }    
  }
 
  this.subscribe(m._id);
 }

 timers:any[] = [
   {timer:null, running:false, progress:0},
   {timer:null, running:false, progress:0},
   {timer:null, running:false, progress:0}, 
   {timer:null, running:false, progress:0},
 ]

  timer(index:number, action:string){
    if(index== 0)
      this.timer0(action);
    if(index==1)
      this.timer1(action);
    if(index==2)
      this.timer2(action);
    if(index==3)
      this.timer3(action);
  }


 timer0(action:string){
   let t:Talk = this.meeting.talks[0];
   let timer:any = this.timers[0];

   if(t.time == null)t.time = 0;
  
   if(action =='play'){ 
    if(timer.running) return;

    timer.running = true;
    timer.timer = setInterval(()=>{
      this.timers[0].progress += 1000; 
      this.meeting.talks[0].time = this.meeting.talks[0].time+1;
      this.ref.markForCheck();
    }, 1000)

   }

   if(action == 'pause'){
    clearInterval(timer.timer);
    timer.running = false;
   }

   if(action == 'reset'){
     clearInterval(timer.timer);
     t.time=0;
     timer.running = false;
     this.ref.markForCheck();
   }
 }

 timer1(action:string){
   let t:Talk = this.meeting.talks[1];
   let timer:any = this.timers[1];

   if(t.time == null)t.time = 0;
 
   if(action =='play'){ 
    if(timer.running) return;

    timer.running = true;
    timer.timer = setInterval(()=>{
      this.timers[1].progress += 1000; 
      this.meeting.talks[1].time = this.meeting.talks[1].time+1;
      this.ref.markForCheck();
    }, 1000)

   }

   if(action == 'pause'){
    clearInterval(timer.timer);
    timer.running = false;
   }

   if(action == 'reset'){
     clearInterval(timer.timer);
     t.time=0;
     timer.running = false;
     this.ref.markForCheck();
   }
 }

 timer2(action:string){
   let t:Talk = this.meeting.talks[2];
   let timer:any = this.timers[2];

   if(t.time == null)t.time = 0;
 
   if(action =='play'){ 
    if(timer.running) return;

    timer.running = true;
    timer.timer = setInterval(()=>{
      this.timers[2].progress += 1000; 
      this.meeting.talks[2].time = this.meeting.talks[2].time+1;
      this.ref.markForCheck();
    }, 1000)

   }

   if(action == 'pause'){
    clearInterval(timer.timer);
    timer.running = false;
   }

   if(action == 'reset'){
     clearInterval(timer.timer);
     t.time=0;
     timer.running = false;
     this.ref.markForCheck();
   }
 }

 timer3(action:string){
   let t:Talk = this.meeting.talks[3];
   let timer:any = this.timers[3];

   if(t.time == null)t.time = 0;
 
   if(action =='play'){ 
    if(timer.running) return;

    timer.running = true;
    timer.timer = setInterval(()=>{
      this.timers[3].progress += 1000; 
      this.meeting.talks[3].time = this.meeting.talks[3].time+1;
      this.ref.markForCheck();
    }, 1000)

   }

   if(action == 'pause'){
    clearInterval(timer.timer);
    timer.running = false;
   }

   if(action == 'reset'){
     clearInterval(timer.timer);
     t.time=0;
     timer.running = false;
     this.ref.markForCheck();
   }
 }

 printTime(seconds:number):string{
   let min2:string;
   let sec2:string;
   let min = moment.duration(seconds, 'seconds').minutes();
   let sec = moment.duration(seconds, 'seconds').seconds();
   if(min < 10) min2 = "0"+min; else min2=""+min;
   if(sec < 10) sec2 = "0"+sec; else sec2 = ""+sec;
   return min2+":"+sec2;
 }


}
