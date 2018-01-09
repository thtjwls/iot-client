import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SocketConnectService} from "./service/socket-connect.service";
import * as socketIo from 'socket.io-client';
import {Config} from "./config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  SOCKET_SERVER: string = `${this.cf.SOCKET_URL}`
  socket: any;

  device_socket_len = 0;

  public constructor( private cf: Config ) {
    this.socket = socketIo(this.SOCKET_SERVER);
  }

  ngOnInit(): void {
    this.socket.on('response-connect-count', (data) => {
      this.device_socket_len = data.device_info.length;
    });
  }

}
