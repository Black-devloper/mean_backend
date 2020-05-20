import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DriverComponent],
  imports: [
    CommonModule,
    DriverRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class DriverModule { }
