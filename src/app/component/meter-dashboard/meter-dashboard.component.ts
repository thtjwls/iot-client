import { Component, OnInit } from '@angular/core';
import {Config} from "../../config";
import {HttpClient} from "@angular/common/http";

interface IRooms {
  room_group: string;
  room_id: string;
  dcu_id: string;
  hcu_id: string;
}

@Component({
  selector: 'az-meter-dashboard',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <h4>전기 = kWh / 수도 = ㎡</h4>
        </div>
        <div class="col-md-4 card-wrapper" *ngFor="let room of rooms" routerLink="/room/{{ room.dcu_id }}/id/{{ room.hcu_id }}">
          <mat-card>
            <mat-card-title class="text-center">{{ room.room_group }} 동 {{ room.room_id }}호</mat-card-title>
            <hr>
            <mat-card-content>
              <div class="row">
                <div class="col-md-6">
                  <app-amount-card
                    [title]="'전기'"
                    [showPacket]="'electric'"
                    [hcu_id]="room.hcu_id"
                    [dcu_id]="room.dcu_id"
                    [unit_type]="">
                  </app-amount-card>
                </div>
                <div class="col-md-6">
                  <app-amount-card
                    [title]="'수도'"
                    [showPacket]="'water'"
                    [hcu_id]="room.hcu_id"
                    [dcu_id]="room.dcu_id"
                    [unit_type]=""
                    style="font-size: 12px;">
                  </app-amount-card>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
     .card-wrapper { margin-bottom: 20px; cursor: pointer; padding: 10px; }
     .card-wrapper:hover { background-color: antiquewhite; }
  `]
})
export class MeterDashboardComponent implements OnInit {

  API_URL = `${this.cf.API_URL}/rooms`;

  rooms: IRooms[];

  constructor( private cf: Config, private http: HttpClient ) { }

  ngOnInit() {
    this.http.get<IRooms[]>(this.API_URL)
      .subscribe( r => {
        this.rooms = r;
      })
  }

}
