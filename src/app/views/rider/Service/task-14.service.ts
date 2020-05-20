import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { idLocale } from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class Task14Service {


  constructor(private http: HttpClient) { }

  croneName = new Subject<any>();
  croneData: [];





}
