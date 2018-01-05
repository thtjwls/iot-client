import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface IRoom {
  room_group: string;
  room_id: string;
  dcu_id: string;
  hcu_id: string;
}

@Component({
  selector: 'app-room-list',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-4 cursor"
            *ngFor=" let room of rooms" 
            matTooltip="DCU_ID : {{ room.dcu_id }}, HCU_ID : {{ room.hcu_id }}"
            routerLink="/room/{{ room.dcu_id }}/id/{{ room.hcu_id }}">
          <mat-card>
            {{ room.room_group }}동 
            {{ room.room_id }} 호
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RoomListComponent implements OnInit {

  API_URL = 'http://115.71.233.53:8080/api/rooms';
  //API_URL = 'http://127.0.0.1:8080/api/rooms';

  rooms: IRoom[];

  constructor( private http:HttpClient ) { }

  ngOnInit() {
    this.http.get<IRoom[]>(this.API_URL)
      .subscribe( r => {
        this.rooms = r;
      })
  }

}
