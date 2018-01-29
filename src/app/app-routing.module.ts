import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {RoomListComponent} from './component/room-list/room-list.component';
import {RoomDetailComponent} from './component/room-detail/room-detail.component';
import {MeterDashboardComponent} from './component/meter-dashboard/meter-dashboard.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: RoomListComponent},
  {path: 'rooms', component: RoomListComponent},
  {path: 'room/:dcu_id/id/:hcu_id', component: RoomDetailComponent},
  {path: 'meter-dashboard', component: MeterDashboardComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
