import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerConnectionService} from "./server-connection.service";

@Injectable()
export class ChartService {

  constructor( private _http: HttpClient, private sc: ServerConnectionService) { }

  chartData(data, parameterObject) {

    let param = parameterObject;

    let prevURL = `${this.sc.API_URL}/chart/dcu_id/${data.dcu_id}/hcu_id/${data.hcu_id}`;
    let API_URL = `${this.sc.API_URL}/chart/unit/${param.dateType}?start_date=${param.start_date}&end_date=${param.end_date}&dcu_id=${param.dcu_id}&hcu_id=${param.hcu_id}`;

    // http://127.0.0.1:8080/api/chart/unit/day?start_date=2018-01-17&end_date=2018-01-17&dcu_id=1&hcu_id=1

    return this._http.get(API_URL)
      .map(result => result);
  }
}
