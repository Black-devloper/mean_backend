import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Task12Service {

  comingName = new Subject<any>();
  comingData: [];

  constructor(private http: HttpClient) { }

  onAddEmployee(newEmployee) {
    return this.http.post('http://localhost:3000/task12/editEmployee', newEmployee);
  }

  onReadEmployee() {
    // console.log(userid);
    this.http.post('http://localhost:3000/createTrip/list',{}).subscribe(cdata => {
      this.comingName.next(cdata);
      console.log(cdata);
    });
    console.log('ewew', this.comingName);
    // console.log(userid);
    return this.http.post('http://localhost:3000/createTrip/list',{});
  }

  // onDeleteEmployee(id: any) {
  //   return this.http.delete('http://localhost:3000/task12/deleteEmployee/' + id );
  // }


  onDeleteEmployee(id: any) {
    const deleteOne = {
      id : id
    }
    return this.http.post('http://localhost:3000/api/createTrip/deleteEmployee' ,  deleteOne);
  }



  onUpdateEmployee(user) {
    return this.http.post('http://localhost:3000/task12/updateEmployee',user);
  }

  onUpdateReq(user,driver){
    console.log(user, driver);
    const userID={
      id:user,
      user: user
    }
    const driverID={
      id:driver,
      driver: driver
    }
    console.log(userID.id);
    return this.http.post('http://localhost:3000/api/driverassign/updateIncoming', userID );
  }
}
