import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import Notify from 'handy-notification'

@Component({
  selector: 'app-confirmedtrips',
  templateUrl: './confirmedtrips.component.html',
  styleUrls: ['./confirmedtrips.component.css']
})
export class ConfirmedtripsComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }
  calendarPlugins = [dayGridPlugin];


}
