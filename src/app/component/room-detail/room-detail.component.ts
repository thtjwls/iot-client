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
          <az-floor [floor]="1"></az-floor>
          <az-floor [floor]="2"></az-floor>
          <az-floor [floor]="3"></az-floor>
          <az-floor [floor]="4"></az-floor>
          <az-floor [floor]="5"></az-floor>
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


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dcu_id = this.route.snapshot.params.dcu_id;
    this.hcu_id = this.route.snapshot.params.hcu_id;
  }
}
