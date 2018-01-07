import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../../config";

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
            *ngFor="let room of rooms" 
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
  styles: [`
    mat-card { margin-bottom: 5px; }
  `]
})
export class RoomListComponent implements OnInit {

  API_URL = this.cf.API_URL + '/rooms';

  rooms: IRoom[];

  constructor( private http:HttpClient, private cf: Config ) { }

  ngOnInit() {

    this.http.get<IRoom[]>(this.API_URL)
      .subscribe( r => {
        this.rooms = r;
      })
  }

}
