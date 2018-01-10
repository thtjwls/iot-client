import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
import {Config} from "../../../config";

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
      <h5>{{ packet }} {{ unit_type }}</h5>
      <mat-progress-bar mode="query" *ngIf="is_socket_send == true"></mat-progress-bar>
      <mat-progress-bar mode="buffer" *ngIf="is_socket_send == false"></mat-progress-bar>
    </mat-card>
  `,
  styles: [`
    h5 { font-weight: bold; font-size: 18px; }
  `]
})
export class AmountCardComponent implements OnInit {


  API_URL     : string;
  SOCKET_URL  : string;

  packetDetail: IPacketDetail;
  electric: string;
  packet: string;

  socket: any; // socket Control object

  is_socket_send: boolean = false;

  @Input() title: string;
  @Input() showPacket: string;
  @Input() hcu_id: string;
  @Input() dcu_id: string;
  @Input() unit_type: string;


  constructor( private http: HttpClient, private cf: Config ) {}

  ngOnInit() {
    this.API_URL = this.cf.API_URL;
    this.SOCKET_URL = this.cf.SOCKET_URL;

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
      this.is_socket_send = true;
    })

    this.socket.on('receive-packet', (data) => {
      let res = JSON.parse(data);

      if ( res.dcu_id == this.dcu_id && res.hcu_id == this.hcu_id ) {
        this.packetDetail = res;
        this.packet = this.packetDetail[this.showPacket];
      }
    });

    this.socket.on('disconnect', () => {
      this.is_socket_send = false;
    });
  }

}
