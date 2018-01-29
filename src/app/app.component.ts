import {Component, OnInit} from '@angular/core';
import {ServerConnectionService} from "./service/server-connection.service";

@Component({
  selector: 'app-root',
  template: `
    <!-- Toolbar -->
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <!-- LOGO -->
        <span>
          <a routerLink="/" class="toolbar-logo">DELTA-ON</a>
        </span>
        <!-- END LOGO -->

        <!-- 툴바 Spacer -->
        <span class="spacer"></span>

        <!-- Right Toggle -->
        <mat-chip-list>
          <mat-chip color="primary" selected="true">
            {{ today }}
          </mat-chip>
        </mat-chip-list>
        
        <mat-chip-list>
          <mat-chip color="primary" selected="true" *ngIf="device_socket_len > 0">
            ON
          </mat-chip>
          <mat-chip color="warn" selected="true" *ngIf="device_socket_len == 0" matTooltip="장비의 연결 매개체가 없습니다. 장비 연결을 확인 해주세요.">
            OFF
          </mat-chip>
        </mat-chip-list>
        <button mat-icon-button mat-button [matMenuTriggerFor]="menu">
          <mat-icon>more_vert</mat-icon>
        </button>

        <mat-menu #menu="matMenu">
          <button mat-menu-item routerLink="/">리스트</button>
          <button mat-menu-item routerLink="/meter-dashboard">검침 대시보드</button>
        </mat-menu>

        <!-- Right Toggle -->

      </mat-toolbar-row>

    </mat-toolbar>
    <!-- END Toolbar -->
    <hr>
    <router-outlet></router-outlet>
    <app-footer></app-footer>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  socket: any;

  device_socket_len = 0;

  today: string = new Date().toLocaleDateString("ko", {hour: "2-digit", minute: "2-digit", second: "2-digit"});

  constructor( private connectionService: ServerConnectionService) {
    this.socket = connectionService.io;



    //setInterval(this.currentToday, 1000);
  }

  ngOnInit(): void {
    this.socket.on('getTcpConnections', (data) => {
      console.log(data);
      this.device_socket_len = data;
    });

    this.currentToday();
  }

  currentToday() {
    setInterval(() => {
      this.today = new Date()
        .toLocaleDateString("ko", {
          hour: "2-digit", minute: "2-digit", second: "2-digit"
        });
    }, 1000);
  }

}
