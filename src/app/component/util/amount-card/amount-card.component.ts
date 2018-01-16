import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerConnectionService} from "../../../service/server-connection.service";

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
      <mat-progress-bar mode="query" *ngIf="sc.is_socket_connect == true"></mat-progress-bar>
      <mat-progress-bar mode="buffer" *ngIf="sc.is_socket_connect == false"></mat-progress-bar>
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

  is_socket_connect: boolean = false;

  @Input() title: string;
  @Input() showPacket: string;
  @Input() hcu_id: string;
  @Input() dcu_id: string;
  @Input() unit_type: string;


  constructor( private http: HttpClient, public sc: ServerConnectionService) {}

  ngOnInit() {
    this.API_URL = `${this.sc.API_URL}/packet/dcu_id/${this.dcu_id}/hcu_id/${this.hcu_id}`;

    this.http.get<IPacketDetail>(this.API_URL)
      .subscribe( res => {
        this.packetDetail = res;
        this.packet = this.packetDetail[this.showPacket];
      });

    this.socket = this.sc.io;
    this.reloadData();
    this.onData();
  }

  onData() {
    this.socket.on('hubToServerOnData', () => {
      this.reloadData();
    });
  }

  reloadData() {
    this.http.get<IPacketDetail>(this.API_URL)
      .subscribe( res => {
        this.packetDetail = res;
        this.packet = this.packetDetail[this.showPacket];
      });
  }

}
