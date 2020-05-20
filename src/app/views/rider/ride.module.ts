import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiderRoutingModule } from './ride-routing.module';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ShowrequestComponent } from './showrequest/showrequest.component';
import { ConfirmedtripsComponent } from './confirmedtrips/confirmedtrips.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CronerequestComponent } from './cronerequest/cronerequest.component';
import { HistoryComponent } from './history/history.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';


import { NgxStripeModule } from 'ngx-stripe';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CreateTripComponent, ShowrequestComponent, ConfirmedtripsComponent, CronerequestComponent, HistoryComponent],
  imports: [
    CommonModule,
    RiderRoutingModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgmDirectionModule,
    NgxStripeModule.forRoot('pk_test_DNiF5qPdVqgLEh3RdsnfGLXR00C5uK95fY'),
    FullCalendarModule,
    NgbPaginationModule,
    AgmCoreModule.forRoot({
      //  apiKey:
      //     'AIzaSyBocWck5OhqW0AX7kNeaFIQp_IJwXFzr70',
        libraries: ['places' , 'drawing' , 'geometry'],
       }),
  ]
})
export class RideModule { }
