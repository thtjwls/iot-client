import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';

interface IPacketDetail {
  dcu_id: string;
  electric: string;
  ext1: string;
  ext2: string;
  ext3: string;
  ext4: string;
  hcu_id: string;
  header: string;
  hub_id: string;
  hub_version: string;
  len: number;
  name: string;
  water: string;
}

@Component({
  selector: 'app-amount-card',
  template: `
    <h4 class="text-center">{{ title }}</h4>
    <mat-card class="text-right">
      {{ packet }}
      <mat-progress-bar mode="query" *ngIf="is_socket_send == true"></mat-progress-bar>
      <mat-progress-bar mode="buffer" *ngIf="is_socket_send == false"></mat-progress-bar>
    </mat-card>
  `,
  styles: []
})
export class AmountCardComponent implements OnInit {

  API_URL: string = 'http://127.0.0.1:8080/api';
  SOCKET_URL: string = 'http://127.0.0.1:5000';

  packetDetail: IPacketDetail;
  electric: string;
  packet: string;

  socket: any; // socket Control object

  is_socket_send: boolean = false;

  @Input() title: string;
  @Input() showPacket: string;
  @Input() hcu_id: string;
  @Input() dcu_id: string;

  constructor( private http: HttpClient ) {}

  ngOnInit() {
    this.API_URL = `${this.API_URL}/packet/dcu_id/${this.dcu_id}/hcu_id/${this.hcu_id}`;

    this.http.get<IPacketDetail>(this.API_URL)
      .subscribe( res => {
        this.packetDetail = res;
        this.packet = this.packetDetail[this.showPacket];
      });

    this.socket = io(this.SOCKET_URL);
    this.amount_see();
  }

  /**
   * 실시간으로 소켓의 변경값을 구성함
   */
  amount_see() {
    this.socket.on('connect', () => {
      console.log('connect');
      this.is_socket_send = true;
    })

    this.socket.on('receive-packet', (data) => {
      let res = JSON.parse(data);

      if ( res.dcu_id == this.dcu_id && res.hcu_id == this.hcu_id ) {
        this.packetDetail = res;
      }
    });

    this.socket.on('disconnect', () => {
      this.is_socket_send = false;
    });
  }

}
