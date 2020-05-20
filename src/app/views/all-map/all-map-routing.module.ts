import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllMapModule } from './all-map.module';
import { SearchlocationComponent } from './searchlocation/searchlocation.component';
import { TimedistanceComponent } from './timedistance/timedistance.component';
import { Zone4Component } from './zone4/zone4.component';
import { MultiplezoneComponent } from './multiplezone/multiplezone.component';


const routes: Routes = [
  {
    path: '',
    component: SearchlocationComponent,
    data:{
      title: 'SearchLocation'
    }
  },
  {
    path: 'timedistance',
    component: TimedistanceComponent,
    data:{
      title: 'TimeDistance'
    }
  },
  {
    path: 'zone4',
    component: Zone4Component,
    data:{
      title: 'Zone'
    }
  },
  {
    path: 'multiplezone',
    component: MultiplezoneComponent,
    data:{
      title: 'MultipleZone'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllMapRoutingModule { }
