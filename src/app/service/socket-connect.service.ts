import { Injectable } from '@angular/core';
import * as SocketIo from 'socket.io-client';

@Injectable()
export class SocketConnectService {
  io: any;
  WEB_SOCKET_URL = 'http://115.71.233.53:5000';

  constructor() {
    this.io = SocketIo(this.WEB_SOCKET_URL);
  }

}
