import {Component, Input, OnInit} from '@angular/core';
import {SocketConnectService} from "../../service/socket-connect.service";


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public io;

  ngOnInit(): void {

  }

  constructor( private socket: SocketConnectService ) {
    this.io = socket;
  }

}
