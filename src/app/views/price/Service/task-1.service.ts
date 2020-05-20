import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Task1Service {
  countryName = new Subject<any>();
  CountryData: [];
  constructor(private http: HttpClient) { }


  onAddEmployee(newEmployee) {
    return this.http.post('http://localhost:3000/api/country/editEmployee', newEmployee);
  }

  onReadEmployee() {
    this.http.get('http://localhost:3000/api/country/list').subscribe(cdata=>{
      this.countryName.next(cdata);
    });
    return this.http.get('http://localhost:3000/api/country/list');
  }

  onUpdateEmployee(id,user) {
    const updateOne = {
      id : id,
      user : user
    }
    return this.http.post('http://localhost:3000/api/country/updateEmployeeById', updateOne);
  }


  onDeleteEmployee(id: any) {
    const deleteOne = {
      id : id
    }
    return this.http.post('http://localhost:3000/api/country/deleteEmployee', deleteOne );
  }


}

