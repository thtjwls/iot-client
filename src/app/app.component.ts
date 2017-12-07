import {Component} from '@angular/core';
import {SocketConnectService} from "./service/socket-connect.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket: SocketConnectService;
  event_lists = [];
  thisTime = new Date();
  packet: any;

  public constructor(private io: SocketConnectService) {
    this.socket = io;

    this.eventBinder();
  }

  public eventBinder() {
    this.socket.io.on('receive-packet', (res) => {
      let data = { data: res, registTime: new Date() + ' 에 이벤트가 바인딩 되었습니다.' }
      this.event_lists.push(res);
      console.log(data);
      console.log(this.event_lists);
    })
  }

  packet_send() {
    this.socket.io.emit('send-packet', this.packet);
    this.event_lists.push(this.packet + ' 을 전송하였습니다.');
  }
}
