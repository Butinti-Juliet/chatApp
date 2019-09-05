import { Component, OnInit } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage  {

tab1: string = "MainPage";
tab2: string = "ProfilePage";

  constructor() { }

  ngOnInit() {
  }

}
