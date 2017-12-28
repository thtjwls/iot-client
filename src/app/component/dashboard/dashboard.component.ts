import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  floorStatus = [];

  constructor() { }

  ngOnInit() {
    this.floorStatus[0] = true;
    this.floorStatus[1] = true;
    this.floorStatus[2] = true;
    this.floorStatus[3] = true;
    this.floorStatus[4] = false;
  }

  floorToggle(number: number) {
    return this.floorStatus[number];
  }
}
