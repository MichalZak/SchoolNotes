import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ElasticModule  }       from 'angular2-elastic';
import { GetProviders } from '../providers';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '05b0f87f'
  }
};



@NgModule({
  declarations: [
    MyApp,
    TabsPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ElasticModule,
    CloudModule.forRoot(cloudSettings),    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
  ],
  providers: GetProviders(), 
})
export class AppModule {}
