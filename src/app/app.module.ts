import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SocketConnectService} from "./service/socket-connect.service";
import {LogComponent} from './component/log/log.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {FooterComponent} from './component/footer/footer.component';
import {FloorPipe} from './pipe/floor.pipe';
import {AmountCardComponent} from './component/util/amount-card/amount-card.component';
import {HttpClientModule} from '@angular/common/http';
import {RoomListComponent} from './component/room-list/room-list.component';
import {RoomDetailComponent} from './component/room-detail/room-detail.component';
import {Config} from "./config";
import {FloorComponent} from './component/util/floor/floor.component';
import {DialogTemplateComponent} from './component/dialog-template/dialog-template.component';
import {MeterDashboardComponent} from './component/meter-dashboard/meter-dashboard.component';
import {ChartComponent} from './component/util/chart/chart.component';
import {ChartService} from "./service/chart.service";
import {ServerConnectionService} from "./service/server-connection.service";
import {MzDatepickerModule, MzTimepickerModule} from "ng2-materialize";
import {AmChartsModule} from "@amcharts/amcharts3-angular";
import { AmchartWrapperComponent } from './component/util/amchart-wrapper/amchart-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    DashboardComponent,
    FooterComponent,
    FloorPipe,
    AmountCardComponent,
    RoomListComponent,
    RoomDetailComponent,
    FloorComponent,
    DialogTemplateComponent,
    MeterDashboardComponent,
    ChartComponent,
    AmchartWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
    MzDatepickerModule,
    MzTimepickerModule,
    AmChartsModule
  ],
  providers: [
    SocketConnectService,
    Config,
    ChartService,
    ServerConnectionService
  ],
  entryComponents: [
    DialogTemplateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
