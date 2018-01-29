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
    <a (click)="generateChartData()" class="btn btn-primary">tzest</a>
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
      'dataProvider': [], // Chart GenerateChartData()
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
