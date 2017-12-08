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
  public event_lists = [];
  public packet: any;

  public constructor(private io: SocketConnectService) {
    this.socket = io;

    this.eventBinder();
    // this.packet_send();
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
