import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-room-detail',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <app-amount-card
            [title]="'현재전기 검침량'"
            [showPacket]="'electric'"
            [hcu_id]="hcu_id"
            [dcu_id]="dcu_id"
            [unit_type]="'(kWh)'">
          </app-amount-card>
        </div>
        <div class="col-md-4">
          <app-amount-card
            [title]="'현재수도 검침량'"
            [showPacket]="'water'"
            [hcu_id]="hcu_id"
            [dcu_id]="dcu_id"
            [unit_type]="'(㎡)'">
          </app-amount-card>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-12">
          <button mat-raised-button color="{{ _1F | floor:'color' }}" class="floor-btn" (click)="_1F =! _1F">1층전등 {{ _1F | floor:'status' }}</button>
          <button mat-raised-button color="{{ _2F | floor:'color' }}" class="floor-btn" (click)="_2F =! _2F">2층전등 {{ _2F | floor:'status' }}</button>
          <button mat-raised-button color="{{ _3F | floor:'color' }}" class="floor-btn" (click)="_3F =! _3F">3층전등 {{ _3F | floor:'status' }}</button>
          <button mat-raised-button color="{{ _4F | floor:'color' }}" class="floor-btn" (click)="_4F =! _4F">4층전등 {{ _4F | floor:'status' }}</button>
          <button mat-raised-button color="{{ _5F | floor:'color' }}" class="floor-btn" (click)="_5F =! _5F">5층전등 {{ _5F | floor:'status' }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    mat-grid-tile {
      background: lightblue;
    }
    mat-card { padding: 15px 20px; font-size: 24px; font-weight: bold; }
    .floor-btn { display: block; width: 100%; padding: 20px 16px; font-size: 24px; margin-bottom: 10px; }
    .mat-toolbar { margin-bottom: 10px; }
  `]
})
export class RoomDetailComponent implements OnInit {

  @Input() room_name: string;

  dcu_id: string;
  hcu_id: string;

  _1F: boolean = false;
  _2F: boolean = false;
  _3F: boolean = false;
  _4F: boolean = false;
  _5F: boolean = false;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dcu_id = this.route.snapshot.params.dcu_id;
    this.hcu_id = this.route.snapshot.params.hcu_id;
  }


}
