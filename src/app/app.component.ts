import {Component} from '@angular/core';
import {SocketConnectService} from "./service/socket-connect.service";

interface IEventList {
  data: any;
  nowTime: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public socket: SocketConnectService;
  public connect_count = { client: 0, device: 0 };
  public device_infos = [];
  public client_infos = [];
  public sockets;
  public event_lists = [];
  public packet: any;

  public constructor(private io: SocketConnectService) {
    this.socket = io;

    this.eventBinder();
    this.getConnection();
  }

  public getConnection() {
    this.socket.io.emit('get-connect-count');
    this.socket.io.on('response-connect-count', (res) => {
      this.connect_count.client = res.client;
      this.connect_count.device = res.device;
      this.device_infos = res.device_info;
      this.client_infos = res.client_info;
    })
  }

  public eventBinder() {
    this.socket.io.on('receive-packet', (res) => {
      this.event_lists.push({time: new Date(), desc: '서버로부터의 데이터 - ' + res});
    });

    this.socket.io.on('send-packet-bind', (res) => {
      this.event_lists.push({time: new Date(), desc: '서버로부터의 데이터 - ' + res});
    });
  }

  packet_send() {
    this.socket.io.emit('send-packet', this.packet);
    this.event_lists.push({time: new Date(), desc: '보낸 데이터' + this.packet});
    this.packet = '';
  }

  logEmpty() {
    this.event_lists = [];
  }
}
