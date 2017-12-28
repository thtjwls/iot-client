import {Injectable, Output} from '@angular/core';
import * as SocketIo from 'socket.io-client';

@Injectable()
export class SocketConnectService {
  io: any;
  WEB_SOCKET_URL = 'http://115.71.233.53:5000';
  //WEB_SOCKET_URL = 'http://127.0.0.1:5000';

  public connect_count = { client: 0, device: 0 };
  public device_infos = [];
  public client_infos = [];
  public sockets;
  public event_lists = [];
  public test: string = 'test';
  public packet: any;

  constructor() {
    this.io = SocketIo(this.WEB_SOCKET_URL);
    console.log('Real-Time Networking');
    this.eventBinder();
    this.getConnection();

  }

  public getConnection() {
    this.io.emit('get-connect-count');
    this.io.on('response-connect-count', (res) => {
      this.connect_count.client = res.client;
      this.connect_count.device = res.device;
      this.device_infos = res.device_info;
      this.client_infos = res.client_info;
    })
  }

  public eventBinder() {
    this.io.on('receive-packet', (res) => {
      this.event_lists.unshift({time: new Date(), desc: '서버로부터의 데이터 - ' + res});
    });

    this.io.on('send-packet-bind', (res) => {
      this.event_lists.unshift({time: new Date(), desc: '서버로부터의 데이터 - ' + res});
    });
  }

  packet_send() {
    this.io.emit('send-packet', this.packet);
    this.event_lists.unshift({time: new Date(), desc: '보낸 데이터' + this.packet});
    this.packet = '';
  }

  logEmpty() {
    this.event_lists = [];
  }

  /* 패킷 파싱 */

}
