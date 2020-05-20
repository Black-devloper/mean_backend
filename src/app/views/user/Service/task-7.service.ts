import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Task7Service {

  userName = new Subject<any>();
  userData: [];
  constructor(private http: HttpClient) { }

  // onAddEmployee(newEmployee) {
  //   return this.http.post('http://localhost:3000/api/user/editEmployee', newEmployee);
  // }

  onAddEmployee(newEmployee) {
    console.log(newEmployee);
    return this.http.post('http://localhost:3000/api/user/editEmployee', newEmployee);
  }

  // onReadEmployee(){
  //   return this.http.post('http://localhost:3000/api/user/list', {});
  // }

  onReadEmployee() {
    this.http.post('http://localhost:3000/api/user/list',{}).subscribe(cdata=>{
      this.userName.next(cdata);
    });
    return this.http.post('http://localhost:3000/api/user/list',{});
  }

  onDeleteEmployee(id: any) {
    const deleteOne = {
      id : id
    }
    return this.http.post('http://localhost:3000/api/user/deleteEmployee' , deleteOne );
  }

  onUpdateEmployee(id,user) {
    console.log(id);
    console.log(user);
    const updateOne = {
      id : id,
      user : user
    }
    console.log(updateOne);
    return this.http.post('http://localhost:3000/api/user/updateEmployeeById', updateOne);
  }
}

