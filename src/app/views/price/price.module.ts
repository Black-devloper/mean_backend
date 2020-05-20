import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceRoutingModule } from './price-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryComponent } from './country/country.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { PricingComponent } from './pricing/pricing.component';
import { AgmCoreModule } from '@agm/core';
import { Task1Pipe } from '../price/Pipe/task-1.pipe';
import { ZoneComponent } from './zone/zone.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [CountryComponent, VehicleComponent, PricingComponent,ZoneComponent, Task1Pipe, ChatComponent],
  imports: [
    CommonModule,
    PriceRoutingModule,
    FormsModule,

    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      //  apiKey:
      //     'AIzaSyBocWck5OhqW0AX7kNeaFIQp_IJwXFzr70',
        libraries: ['places' , 'drawing' , 'geometry'],
       }),
  ]
})
export class PriceModule { }
