import { Injectable } from '@angular/core';
import {SocketConnectService} from "./socket-connect.service";


@Injectable()
export class IoEventsService {

  constructor(
    private socket: SocketConnectService
  ) { }

}
