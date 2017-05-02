import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataProvider } from './data-provider';
//import { getConfig } from '../config';


export {
  DataProvider,
}


export function GetProviders() {
  return [
 //   Storage,    
    DataProvider,

    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}
