import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { userInfo } from 'os';
import { request } from 'http';

@Injectable({
  providedIn: 'root'
})
export class Task10Service {
  employeeName = new Subject<any>();
  employeeData: [];
  constructor(private http: HttpClient) { }


  onAddEmployee(newEmployee) {
    console.log(newEmployee);
    return this.http.post('http://localhost:3000/api/driverassign/editEmployee', newEmployee);
  }

  onReadEmployee() {
    this.http.post('http://localhost:3000/api/driverassign/list',{}).subscribe(cdata=>{
      this.employeeName.next(cdata);
    });
    return this.http.post('http://localhost:3000/api/driverassign//list',{});
  }

// approved only give list
  onReadNewEmployee() {
    this.http.post('http://localhost:3000/api/driverassign/list12',{}).subscribe(cdata=>{
      this.employeeName.next(cdata);
    });
    return this.http.post('http://localhost:3000/api/driverassign/list12',{});
  }


  getReqData(user)
  {
    console.log(user);
    return this.http.post('http://localhost:3000/api/driverassign/listById' , user);
  }


  getReqDataAccept(id,user)
  {
    const da = {
      id: id
    }
    console.log(da);
    return this.http.post('http://localhost:3000/api/driverassign/listById' , da);
  }



  onDeleteEmployee(id: any) {
    const data1 = {
      id: id,
    }
    return this.http.post('http://localhost:3000/api/driverassign/deleteEmployee',data1);
  }


  // onUpdateReq(user,driver){
  //   console.log(user, driver);
  //   const userID={
  //     id:user
  //   }
  //   console.log(userID.id);
  //   return this.http.put('http://localhost:3000/api/driverassign/updateIncoming' , { driver, userID});
  // }

  onUpdateEmployee(id,user) {
    console.log(id);
    console.log(user);
    const updateOne = {
      id : user.id,
      user : user
    }
    console.log(updateOne);
    return this.http.post('http://localhost:3000/api/driverassign/updateEmployeeById', updateOne);
  }



  onUpdateAnyDriver(employeeData){
    console.log(employeeData);
  }

  onUpdateReq(userid, driver){
    console.log(userid, driver);
    const updateOne = {
      id : userid,
      driver : driver,
    }
    console.log(updateOne);
    return this.http.post('http://localhost:3000/api/driverassign/updateIncoming', updateOne);
  }

  onUpdateReqAny(id, driver){
    console.log(id);
    console.log(driver);
    console.log(id, driver);
    const updateOne = {
      id : id,
      driver : driver,
    }
    console.log(updateOne);
    return this.http.post('http://localhost:3000/api/driverassign/updateIncoming', updateOne);
  }


  onUpdateReqNew(userid,driver){
    console.log(userid,driver);
    const updateOne = {
      id : userid,
      driver : driver,
    }
    console.log(updateOne);
    return this.http.post('http://localhost:3000/api/driverassign/updateIncomingReject', updateOne);
  }


  onUpdateReqNewAccept(request, mydata){
    const updateOne = {
      request: request,
      user : mydata,
    }
    console.log(updateOne);
    return this.http.post('http://localhost:3000/api/driverassign/updateDriver', updateOne);
  }

}

