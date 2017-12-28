import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SocketConnectService} from "./service/socket-connect.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor( private socketService: SocketConnectService ) {

  }

}
