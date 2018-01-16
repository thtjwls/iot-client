import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerConnectionService} from "./server-connection.service";

@Injectable()
export class ChartService {

  constructor( private _http: HttpClient, private sc: ServerConnectionService) { }

  chartData(data) {
    return this._http.get(`${this.sc.API_URL}/chart/dcu_id/${data.dcu_id}/hcu_id/${data.hcu_id}`)
      .map(result => result);
  }
}
