import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver.component';


const routes: Routes = [
  {
    path: '',
    component: DriverComponent,
    data:{
      title: 'Driver'
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
