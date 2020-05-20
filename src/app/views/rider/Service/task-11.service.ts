import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { idLocale } from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class Task11Service {


  priceName = new Subject<any>();
  priceData: [];


  constructor(private http: HttpClient) { }


  onAddEmployee(newEmployee) {
    return this.http.post('http://localhost:3000/api/createTrip/editEmployee', newEmployee);
  }

  onReadEmployee() {
    this.http.post('http://localhost:3000/api/createTrip/list',{}).subscribe(cdata=>{
      this.priceName.next(cdata);
      //console.log(cdata)
    });
    //console.log('ewew',this.countryName)

    return this.http.post('http://localhost:3000/api/createTrip/list',{});
  }

  onDeleteEmployee(id: any) {
    const deleteOne = {
      id : id
    }
    return this.http.post('http://localhost:3000/api/createTrip/deleteEmployee' ,  deleteOne);
  }

  // onDeleteEmployeetask12(id: any) {
  //   const deleteOne = {
  //     id : id
  //   }
  //   console.log(deleteOne);
  //   return this.http.post('http://localhost:3000/api/createTrip/deleteEmployee' ,  deleteOne);
  // }


  onUpdateEmployee(user) {
    console.log(user.id);
    const updateOne = {
      id : user.id,
      user : user
    }
    return this.http.post('http://localhost:3000/api/createTrip/updateEmployeeByID', updateOne);
  }


  onUpdateEmployeeAssign(user,newData) {
    console.log(newData);
    const data = {
      id : newData._id,
      user : newData
    }
    console.log(data);
    return this.http.post('http://localhost:3000/api/createTrip/updateEmployeeByIdAssign', data);
  }


  getReqData(user)
  {
    const data = {
      user: user
    }
    console.log(data);
    return this.http.post('http://localhost:3000/api/createTrip/listById' , data);
  }


  onUpdateReq(user,driver){
    console.log(user, driver);
    // const userID={
    //   id:user
    // }
    const updateOne = {
      id : user.id,
      user : user,
      // id: driver.id,
      driver: driver.id
    }
    // console.log(userID.id);
    return this.http.post('http://localhost:3000/api/driverassign/updateIncoming', updateOne);
  }

}
