import { Component, OnInit } from '@angular/core';
import {SocketConnectService} from "../../service/socket-connect.service";

@Component({
  selector: 'app-dashboard',
  template: `    
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <app-amount-card [title]="'현재전기 검침량'"></app-amount-card>
        </div>
        <div class="col-md-4">
          <h4 class="text-center">현재수도 검침량</h4>
          <mat-card class="text-right">12345</mat-card>
        </div>
        <div class="col-md-4">
          <h4 class="text-center">현재가스 검침량</h4>
          <mat-card class="text-right">12345</mat-card>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-12">
          <button mat-raised-button color="{{ floorStatus[0] | floor:'color' }}" class="floor-btn" (click)="floorToggle(0)">1층전등 {{ floorStatus[0] | floor:'status' }}</button>
          <button mat-raised-button color="{{ floorStatus[1] | floor:'color' }}" class="floor-btn" (click)="floorToggle(1)">2층전등 {{ floorStatus[1] | floor:'status' }}</button>
          <button mat-raised-button color="{{ floorStatus[2] | floor:'color' }}" class="floor-btn" (click)="floorToggle(2)">3층전등 {{ floorStatus[2] | floor:'status' }}</button>
          <button mat-raised-button color="{{ floorStatus[3] | floor:'color' }}" class="floor-btn" (click)="floorToggle(3)">4층전등 {{ floorStatus[3] | floor:'status' }}</button>
          <button mat-raised-button color="{{ floorStatus[4] | floor:'color' }}" class="floor-btn" (click)="floorToggle(4)">5층전등 {{ floorStatus[4] | floor:'status' }}</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  floorStatus = [];
  public io;

  constructor( private socket: SocketConnectService ) {
    console.log('act packet');
    this.io = socket;
  }

  ngOnInit() {
    this.floorStatus[0] = true;
    this.floorStatus[1] = true;
    this.floorStatus[2] = true;
    this.floorStatus[3] = true;
    this.floorStatus[4] = false;
  }

  floorToggle(number: number) {
    return this.floorStatus[number] = !this.floorStatus[number];
  }
}
