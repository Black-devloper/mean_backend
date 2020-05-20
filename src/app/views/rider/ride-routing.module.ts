import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { ShowrequestComponent } from './showrequest/showrequest.component';
import { ConfirmedtripsComponent } from './confirmedtrips/confirmedtrips.component';
import { CronerequestComponent } from './cronerequest/cronerequest.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {
    path: '',
    component: CreateTripComponent,
    data: {
      title: 'Create-Trip'
    }
  },
  {
    path: 'showrequest',
    component: ShowrequestComponent,
    data: {
      title: 'ShowRequest'
    }
  },
  {
    path: 'confirmedtrips',
    component: ConfirmedtripsComponent,
    data: {
      title: 'ConfirmedTrips'
    },
  },
  {
    path: 'cronerequest',
    component: CronerequestComponent,
    data: {
      title: 'CroneRequest'
    }
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {
      title: 'All History'
    }
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderRoutingModule { }
