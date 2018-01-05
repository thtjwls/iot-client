import {Component, OnInit} from '@angular/core';
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
            [dcu_id]="dcu_id">
          </app-amount-card>
        </div>
        <div class="col-md-4">
          <app-amount-card
            [title]="'현재수도 검침량'"
            [showPacket]="'water'"
            [hcu_id]="hcu_id"
            [dcu_id]="dcu_id">
          </app-amount-card>
        </div>
      </div>
      <hr>
      <mat-toolbar color="primary">
        <span>현재 동작하지 않습니다!!</span>
      </mat-toolbar>
      <div class="row">
        <div class="col-md-12">
          <button mat-raised-button color="primary" class="floor-btn">1층전등 ON</button>
          <button mat-raised-button color="primary" class="floor-btn">2층전등 ON</button>
          <button mat-raised-button color="primary" class="floor-btn">3층전등 ON</button>
          <button mat-raised-button color="primary" class="floor-btn">4층전등 ON</button>
          <button mat-raised-button color="primary" class="floor-btn">5층전등 ON</button>
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
