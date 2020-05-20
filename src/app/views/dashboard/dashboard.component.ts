import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  constructor(public auth: AuthenticationService,private router: Router) {}

  navigate() {
    this.router.navigate(['../login']);
}
}
