import {Component, Input, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Config} from "../../../config";
import {MatDialog} from "@angular/material";
import {DialogTemplateComponent} from "../../dialog-template/dialog-template.component";

@Component({
  selector: 'az-floor',
  template: `    
    <button mat-raised-button color="{{ status | floor:'color' }}" class="floor-btn" (click)="floorControl()">{{ floor }}층전등 {{ status | floor:'status' }}</button>
  `,
  styles: [`
    .floor-btn { display: block; width: 100%; padding: 20px 16px; font-size: 24px; margin-bottom: 10px; }
  `]
})
export class FloorComponent implements OnInit {

  io: any;

  @Input() floor: number = 1;
  @Input() status: boolean = false;

  constructor( private cf: Config, private dialog: MatDialog) { }

  ngOnInit() {
    this.io = socketIo(this.cf.SOCKET_URL);
  }

  floorControl() {
    let control = this.status ? 'off' : 'on';
    let emitter = `floor-${control}`;
    this.status = !this.status;
    let data = { floor: this.floor, status: this.status };
    this.io.emit(emitter, data);
    this.dialogOpen();
  }

  dialogOpen() {
    this.dialog.open(DialogTemplateComponent, {
      disableClose: false
    });
    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);
  }

}
