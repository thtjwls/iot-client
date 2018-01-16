import {Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import 'rxjs/add/operator/map';
import {ChartService} from "../../../service/chart.service";

@Component({
  selector: 'az-chart',
  template: `
    <mat-form-field>
      <mat-select placeholder="차트 타입 선택" [(value)]="selectType" (change)="onChartView()">
        <mat-option *ngFor="let type of chartType" value="{{ type.value }}">
          {{ type.name }} 
        </mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field class="example-full-width">
      <input matInput [matDatepicker]="picker" placeholder="날짜 선택 ( DEMO )">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker touchUi="true" #picker></mat-datepicker>
    </mat-form-field>
    

    <div class="row">
      <div class="col-md-6">
        <div *ngIf="chart1">
          <canvas id="canvas">{{ chart1 }}</canvas>
        </div>
      </div>
      <div class="col-md-6">
        <div *ngIf="chart2"> 
          <canvas id="canvas2">{{ chart2 }}</canvas>
        </div>
      </div>
    </div>     
  `,
  styles: [`
  
  `]
})
export class ChartComponent implements OnInit {

  @Input() hcu_id: string;
  @Input() dcu_id: string;

  chartType = [
    {name: '라인', value: 'line'},
    {name: '그래프 바', value: 'bar'},
    {name: '레이더', value: 'radar'}
  ];

  chart1: Chart = [];
  chart2: Chart = [];

  packet_time       = [];
  water             = [];
  eletric           = [];

  selectType = 'line';

  data = {};





  constructor( private _chart: ChartService ) {

  }

  ngOnInit() {

    this.data = {
      hcu_id: this.hcu_id,
      dcu_id: this.dcu_id
    };

    this.onChartView();
  }

  onChartView() {
    this.destroyChart();

    let data = this.data;
    this._chart.chartData(data)
      .subscribe( res => {

        for (let i in res) {
          let vPacket_time = res[i].packet_time.substr(11,5);
          this.packet_time.unshift(vPacket_time);
          this.water.unshift(res[i].water);
          this.eletric.unshift(res[i].electric);
        }


        //차트
        this.chart1 = new Chart('canvas', {
          type: this.selectType, // line, bar, radar,
          data: {
            labels: this.packet_time,
            datasets: [
              {
                label: '전기',
                data: this.eletric,
                borderColor: "#F11C1C",
                fill: false
              }
            ]
          },
          options: {
            scales: {
              yAxes: [{ }]
            }
          }
        });
        // END 차트


        //차트
        this.chart2 = new Chart('canvas2', {
          type: this.selectType, // line, bar, radar,
          data: {
            labels: this.packet_time,
            datasets: [
              {
                label: '수도',
                data: this.water,
                borderColor: "#3f51b5",
                fill: false
              }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  stepSize: 0.5
                }
              }]
            }
          }
        });
        // END 차트

      });
  }

  destroyChart() {
    if ( this.chart1.length != 0 ) {
      this.chart1.destroy();
    }

    if ( this.chart2.length != 0 ) {
      this.chart2.destroy();
    }

    this.packet_time       = [];
    this.water             = [];
    this.eletric           = [];
  }

}
