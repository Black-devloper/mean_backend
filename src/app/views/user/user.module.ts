import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserPipe } from './Pipe/user.pipe';


@NgModule({
  declarations: [UserComponent, UserPipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
  ]
})
export class UserModule { }
