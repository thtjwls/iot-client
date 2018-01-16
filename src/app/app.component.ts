import {Component, OnInit} from '@angular/core';
import {ServerConnectionService} from "./service/server-connection.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  socket: any;

  device_socket_len = 0;

  constructor( private connectionService: ServerConnectionService) {
    this.socket = connectionService.io;
  }

  ngOnInit(): void {
    this.socket.on('getTcpConnections', (data) => {
      this.device_socket_len = data;
    });
  }

}
