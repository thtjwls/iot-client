import {Injectable} from '@angular/core';
import * as SocketIo from 'socket.io-client';
import {Config} from "../config";

interface IPacket {
  type: string;
  data: any;
}

@Injectable()
export class SocketConnectService {

  config = {
    LOCAL_API_ROOT: 'http://127.0.0.1:8080/api',
    API_ROOT: 'http://115.71.233.53:8080/api',
    LOCAL_SOCKET_ROOT: 'http://127.0.0.1:5000',
    SOCKET_ROOT: 'http://115.71.233.53:5000'
  }

  io: any;
  WEB_SOCKET_URL = `${this.cf.SOCKET_URL}`;

  actPacket: IPacket[];

  connect_count = { client: 0, device: 0 };
  device_infos = [];
  client_infos = [];
  sockets;
  event_lists = [];
  test = 'test';
  packet: any;

  API_URL:string = `${this.cf.API_URL}/packet/detail`;
  electric_amount: number;

  constructor(private cf: Config) {
    this.io = SocketIo(this.WEB_SOCKET_URL);
    console.log('Real-Time Networking');
    this.eventBinder();
    this.getConnection();
    this.init_amount('electric');

  }

  /* 초기화 했을때 만 사용하는 검침 데이터 */
  init_amount( type:string ) {
    this.API_URL += `${this.API_URL}${type}`;
  }


  /* 초기화 후 사용하는 검침 데이터 */

  getConnection() {
    this.io.emit('get-connect-count');
    this.io.on('response-connect-count', (res) => {
      this.connect_count.client = res.client;
      this.connect_count.device = res.device;
      this.device_infos = res.device_info;
      this.client_infos = res.client_info;
    })
  }

  eventBinder() {
    this.io.on('receive-packet', (res) => {
      this.actPacket = JSON.parse(res);

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

}
