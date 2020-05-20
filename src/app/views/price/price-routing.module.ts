import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ZoneComponent } from './zone/zone.component';
import { PricingComponent } from './pricing/pricing.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {
    path: '',
    component: CountryComponent,
    data : {
      title: 'Country'
    }
  },
  {
    path: 'zone',
    component: ZoneComponent,
    data : {
      title: 'Zone'
    }
  },
  {
    path: 'vehicle',
    component: VehicleComponent,
    data : {
      title: 'Vehicle'
    }
  },
  {
    path: 'pricing',
    component: PricingComponent,
    data : {
      title: 'Pricing'
    }
  },
  {
    path: 'chat',
    component: ChatComponent,
    data : {
      title: 'Chat'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRoutingModule { }
