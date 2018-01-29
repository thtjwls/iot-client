import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {ServerConnectionService} from '../../../service/server-connection.service';
import {HttpClient} from '@angular/common/http';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';

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
  selector: 'az-chart',
  template: `
    최근 반영시간 {{ last_update }}
    <div class="row">
      <div class="col-md-12">
        <div id="chartDiv" [style.width.%]="100" [style.height.px]="500"></div>
      </div>
    </div>
  `,
  styles: [`
    .dateTypeRadio { margin: 0 5px; }
  `],
  providers: [

  ]
})
export class ChartComponent implements OnInit {

  @Input() hcu_id: string;
  @Input() dcu_id: string;

  private chart: AmChart;
  private start_date: any;
  private end_date: any;
  private chartData = [];
  private io: any;
  private requestURL: string;
  private initAPIURL: string;
  private initRequest: any;
  private httpRequest: any;
  last_update: string;


  constructor(private AmCharts: AmChartsService, private connect: ServerConnectionService, private _http: HttpClient) {
  }

  ngOnInit() {

    /**
     * 날짜 초기화
     */
    this.start_date = this.initToDate();
    this.end_date = this.initToDate();
    this.initAPIURL = `${this.connect.API_URL}/chart/unit/hour?start_date=${this.start_date}&end_date=${this.end_date}&dcu_id=${this.dcu_id}&hcu_id=${this.hcu_id}`;
    this.requestURL = `${this.connect.API_URL}/packet/dcu_id/${this.dcu_id}/hcu_id/${this.hcu_id}/last`;
    this.io = this.connect.io;
    this.initRequest = this._http.get(`${this.initAPIURL}`);
    this.httpRequest = this._http.get(`${this.requestURL}`);

    this.initChart();
    this.initChartData();
  }

  initChart() {
    this.chart = this.AmCharts.makeChart('chartDiv', {
      'type' : 'serial',
      'theme' : 'light',
      'marginRight': 100,
      'marginTop': 100,
      'marginLeft': 100,
      'marginBottom': 100,
      'dataProvider': this.chartData, // Chart GenerateChartData()
      "mouseWheelZoomEnabled":true,
      "legend": {
        "equalWidths": false,
        "useGraphSettings": true,
        "valueAlign": "left",
        "valueWidth": 120
      },
      'valueAxes': [{
        'position': 'left',
        'title' : '검침 차트'
      }],
      'graphs': [
        {
          'id': 'g1',
          'fillAlphas': 0.4,
          'valueField': 'electric',
          'balloon': {
            'drop': true,
            'adjustBorderColor': false,
            'color': '#FFF'
          },
          "legendValueText": "[[value]] kwh",
          "title": "전기",
          'balloonText': '<div style="margin: 2px;"><b>[[value]]</b></b></div>'
        },
        {
          'id': 'g2',
          'fillAlphas': 0.4,
          'valueField': 'water',
          'balloon': {
            'drop': true,
            'adjustBorderColor': false,
            'color': '#000'
          },
          "legendValueText": "[[value]] ㎡",
          "title": "수도",
          'balloonText': '<div style="margin: 2px;"><b>[[value]]</b></b></div>'
        }
      ],
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable":true
      },
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis":false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount":true,
        "color":"#AAAAAA",
      },
      'categoryField': 'packet_time'
    });



    this.io.on('hubToServerOnData', () => {
      console.log('chart component set data from server');
    });
  }

  updateChart() {
    this.AmCharts.updateChart(this.chart, () => {
      this.chart.dataProvider = [];
    });
  }

  /**
   * Init Chart Data
   */
  initChartData(): void {
    this.initRequest.subscribe( res => {
      this.last_update = res[0].packet_time.substring(0, res[0].packet_time.length - 2);
      console.log(res[0].packet_time.length);

      for (let value of res) {
        // this.last_update = res[res.length - 1].packet_time;
        value.electric = parseFloat(value.electric);
        value.water = parseFloat(value.water);
        value.packet_time = this.parseFromDate(value.packet_time);
        this.chartData.unshift(value);
      }

      this.AmCharts.updateChart(this.chart, () => {
        this.chart.dataProvider = this.chartData;
      });
    });
  }

  /**
   * 날짜 초기화
   */
  initToDate(date?: Date): string {
    let today = new Date();
    let y = today.getFullYear();
    let m = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`;
    let d = (today.getDate()) < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
    let returnDate = `${y}-${m}-${d}`;
    return returnDate;
  }

  /**
   * 날짜 형태 변경
   */
  parseFromDate(date?: string): string {

    let dateObject = new Date(date);

    let y = dateObject.getFullYear();
    let m = (dateObject.getMonth() + 1) < 10 ? `0${dateObject.getMonth() + 1}` : `${dateObject.getMonth() + 1}`;
    let d = (dateObject.getDate()) < 10 ? `0${dateObject.getDate()}` : `${dateObject.getDate()}`;
    let hh = dateObject.getHours() < 10 ? `0${dateObject.getHours()}` : `${dateObject.getHours()}`;
    let mm = dateObject.getMinutes() < 10 ? `0${dateObject.getMinutes()}` : `${dateObject.getMinutes()}`;
    let dd = dateObject.getDay() < 10 ? `0${dateObject.getDay()}` : `${dateObject.getDay()}`;

    //let returnDate = `${y}-${m}-${d} ${hh}:${mm}:${dd}`;
    let returnDate = `${hh}:${mm}`;

    return returnDate;
  }
}
