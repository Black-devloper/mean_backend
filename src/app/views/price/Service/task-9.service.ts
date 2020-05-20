import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Task9Service {

  vehicle = new Subject<any>();
  vehicleData: [];

  constructor(private http: HttpClient) { }


  onAddEmployee(newEmployee) {
    console.log(newEmployee);
    return this.http.post('http://localhost:3000/api/vehicleprice/editEmployee', newEmployee);
  }

  onReadEmployee() {
    this.http.get('http://localhost:3000/api/vehicleprice/list').subscribe(cdata=>{
      this.vehicle.next(cdata);
      //console.log(cdata)
    });
    //console.log('ewew',this.countryName)

    return this.http.post('http://localhost:3000/api/vehicleprice/list',{});
  }

  onUpdateEmployee(user) {
    console.log(user.id);
    const data = {
      id: user.id,
      user: user
    }
    return this.http.post('http://localhost:3000/api/vehicleprice/updateEmployeeById', data);
  }

  onDeleteEmployee(id: any) {
    const data  = {
      id: id
    }
    return this.http.post('http://localhost:3000/api/vehicleprice/deleteEmployee', data );
  }

}
