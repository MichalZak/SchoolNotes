import { Component } from '@angular/core';

import { Tab1Root } from '../';
import { Tab2Root } from '../';
import { Tab3Root } from '../';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "Meetings";
  tab2Root = "Students";
  tab3Root = "About";

  constructor() {

  }
}
