import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllMapRoutingModule } from './all-map-routing.module';
import { SearchlocationComponent } from './searchlocation/searchlocation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { TimedistanceComponent } from './timedistance/timedistance.component';
import { AgmDirectionModule } from 'agm-direction';
import { Zone4Component } from './zone4/zone4.component';
import { MultiplezoneComponent } from './multiplezone/multiplezone.component';
import { RandomcolorModule } from 'angular-randomcolor';


@NgModule({
  declarations: [SearchlocationComponent, TimedistanceComponent, Zone4Component, MultiplezoneComponent],
  imports: [
    CommonModule,
    AllMapRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmDirectionModule,
    RandomcolorModule,
    AgmCoreModule.forRoot({
      //  apiKey:
      //     'AIzaSyBocWck5OhqW0AX7kNeaFIQp_IJwXFzr70',
        libraries: ['places' , 'drawing' , 'geometry'],
       }),
  ]
})
export class AllMapModule { }
