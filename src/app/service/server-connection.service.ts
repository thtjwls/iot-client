import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class ServerConnectionService {

  // url: string = '115.71.233.41';
  SOCKET_URL = 'http://115.71.233.41:5000';
  //SOCKET_URL = 'http://127.0.0.1:5000';
  API_URL = 'http://127.0.0.1:8080/api';


  io: any;

  is_socket_connect = false;

  constructor() {
    this.io = io(this.SOCKET_URL);
    this.io.on('connect', () => {
      this.is_socket_connect = true;
    });

    this.io.on('disconnect', () => {
      this.is_socket_connect = false;
    });
  }

}
