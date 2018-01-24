import {Component, Input, OnInit} from '@angular/core';
import {AmChartsService, AmChart} from "@amcharts/amcharts3-angular";
import {ServerConnectionService} from "../../../service/server-connection.service";
import {HttpClient} from "@angular/common/http";

interface IPacket {
  name: string;
  len: number;
  header: string;
  hub_version: string;
  hub_id: string;
  hcu_id: string;
  dcu_id: string;
  electric: string;
  water: string;
  ext1: string;
  ext2: string;
  ext3: string;
  ext4: string;
  packet_time: string;
}

@Component({
  selector: 'az-amchart-wrapper',
  template: `    
    <a (click)="generateChartData()" class="btn btn-primary">test</a>
    <div class="row">
      <div class="col-md-12">
        <div id="chartDiv" [style.width.%]="100" [style.height.px]="400"></div>
      </div>
    </div>
  `,
  styles: []
})
export class AmchartWrapperComponent implements OnInit {

  private chart: AmChart;
  private chartData: any;

  @Input() hcu_id: string;
  @Input() dcu_id: string;

  io: any;

  httpRequest: any;

  packets: IPacket;

  constructor( private AmCharts: AmChartsService, private connect: ServerConnectionService, private _http: HttpClient) {
    this.io = connect.io;
    this.httpRequest = _http.get(`${this.connect.API_URL}/packet/dcu_id/${this.dcu_id}/hcu_id/${this.hcu_id}/last`);
  }

  ngOnInit() {

    this.chart = this.AmCharts.makeChart('chartDiv', {
      'type' : 'serial',
      'theme' : 'light',
      'marginRight': 80,
      'dataProvider': [
        {
          "name": "omni",
          "len": 31,
          "header": null,
          "hub_version": "1",
          "hub_id": "14",
          "hcu_id": "1",
          "dcu_id": "1",
          "electric": "0",
          "water": "0.03",
          "ext1": "0:0:0:0",
          "ext2": null,
          "ext3": null,
          "ext4": null,
          "packet_time": "2018-01-24 00:06:22.0"
        },
        {
          "name": "omni",
          "len": 31,
          "header": null,
          "hub_version": "1",
          "hub_id": "14",
          "hcu_id": "1",
          "dcu_id": "1",
          "electric": "0",
          "water": "0.03",
          "ext1": "0:0:0:0",
          "ext2": null,
          "ext3": null,
          "ext4": null,
          "packet_time": "2018-01-23 00:01:02.0"
        },
        {
          "name": "omni",
          "len": 31,
          "header": null,
          "hub_version": "1",
          "hub_id": "14",
          "hcu_id": "1",
          "dcu_id": "1",
          "electric": "0",
          "water": "0.03",
          "ext1": "0:0:0:0",
          "ext2": null,
          "ext3": null,
          "ext4": null,
          "packet_time": "2018-01-22 00:06:56.0"
        },
        {
          "name": "omni",
          "len": 31,
          "header": null,
          "hub_version": "1",
          "hub_id": "14",
          "hcu_id": "1",
          "dcu_id": "1",
          "electric": "0",
          "water": "0.03",
          "ext1": "0:0:0:0",
          "ext2": null,
          "ext3": null,
          "ext4": null,
          "packet_time": "2018-01-21 00:01:55.0"
        },
        {
          "name": "omni",
          "len": 31,
          "header": null,
          "hub_version": "1",
          "hub_id": "14",
          "hcu_id": "1",
          "dcu_id": "1",
          "electric": "0",
          "water": "0.03",
          "ext1": "0:0:0:0",
          "ext2": null,
          "ext3": null,
          "ext4": null,
          "packet_time": "2018-01-20 00:07:14.0"
        },
        {
          "name": "omni",
          "len": 31,
          "header": null,
          "hub_version": "1",
          "hub_id": "14",
          "hcu_id": "1",
          "dcu_id": "1",
          "electric": "0",
          "water": "0.03",
          "ext1": "0:0:0:0",
          "ext2": null,
          "ext3": null,
          "ext4": null,
          "packet_time": "2018-01-19 00:02:11.0"
        },
        {
          "name": "omni",
          "len": 31,
          "header": null,
          "hub_version": "1",
          "hub_id": "14",
          "hcu_id": "1",
          "dcu_id": "1",
          "electric": "0",
          "water": "0.03",
          "ext1": "0:0:0:0",
          "ext2": null,
          "ext3": null,
          "ext4": null,
          "packet_time": "2018-01-18 00:07:28.0"
        },
        {
          "name": "omni",
          "len": 31,
          "header": null,
          "hub_version": "1",
          "hub_id": "14",
          "hcu_id": "1",
          "dcu_id": "1",
          "electric": "0",
          "water": "0.03",
          "ext1": "0:0:0:0",
          "ext2": null,
          "ext3": null,
          "ext4": null,
          "packet_time": "2018-01-17 00:02:42.0"
        }
        ], // Chart GenerateChartData()
      'valueAxes': [{
        'position': 'left',
        'title' : '차트 타이틀'
      }],
      'graphs': [{
        'id': 'g1',
        'fillAlphas': 0.4,
        'valueField': 'water',
        'balloonText': '<div style="margin: 5px; font-size: 19px;">Visits: <b>[[value]]</b></b></div>'
      }],
      'categoryField': 'packet_time'
    })
  }

  updateChart() {
    this.AmCharts.updateChart(this.chart, () => {
      this.chart.dataProvider = [];
    });
  }

  generateChartData() {
    let chartData = [];

    this.httpRequest.subscribe( res => {
      console.log(res);
    });
  }

}
