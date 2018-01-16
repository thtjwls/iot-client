import {Injectable, OnInit} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class ServerConnectionService {

  SOCKET_URL: string = 'http://115.71.233.41:5000';
  API_URL:string = 'http://115.71.233.41:8080/api';


  io: any;

  is_socket_connect: boolean = false;

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
