import { Component, OnInit } from '@angular/core';
import { Task11Service } from '../Service/task-11.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task8Service } from '../../price/Service/task-8.service';
import { Task10Service } from '../../driver/Service/task-10.service';
import { HttpClient } from '@angular/common/http';
import { Task12Service } from '../Service/task-12.service';

@Component({
  selector: 'app-cronerequest',
  templateUrl: './cronerequest.component.html',
  styleUrls: ['./cronerequest.component.css']
})
export class CronerequestComponent implements OnInit {
  newSearch:string;
  id: any;
  priceData: any;
  priceData1: any;
  f: FormGroup;


  page = 10;
  pageSize = 3;
  collectionSize = 20;
  driverName: any;
  search: string;
  filter: any;
  employeeData: any;
  newemployeeData: any = [];
  clickData: any = [];
  radioData: any = [];
  show : boolean = false;
  userData: any = [];
  userid: any;
  driver: any;
  anyDriver: any;

  public dateTime: Date;

  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private fb: FormBuilder, private task11: Task11Service , private task10: Task10Service,  private task12: Task12Service , private driverServise: Task8Service) { }

  ngOnInit() {

    this.driverServise.getCar();
    this.driverServise.carData.subscribe(driver => {
      this.driverName = driver;
      console.log(driver);
    });

    this.task10.onReadNewEmployee();
    this.task10.employeeName.subscribe(data => {
      this.employeeData = data;
      console.log(this.employeeData);
    });

    this.task11.onReadEmployee();
    this.task11.priceName.subscribe(data => {
      this.priceData = data;
      console.log(this.priceData, 'price');
      this.priceData1 = this.priceData;
      console.log(this.priceData1);
      console.log(this.priceData);
    });

    this.f = this.fb.group({
      name: [null],
      email: [null],
      mobile: [null],
      cdate: [null],
      datetime: [null],
      drop: [null],
      pickup: [null],
      maindistance: [null],
      dtime: [null],
      price: [null],
      search: [null],
      servise: [null],
      searchOption: [null],
      newSearch: [null],
    });

  }

  onSearch() {
    this.priceData = this.priceData1;
    console.log(this.priceData1);
    console.log(this.priceData);
    if (this.f.value.datetime !==  null) {
      const date = this.f.value.datetime.toISOString();
      console.log(date.split('T')[0], '1');
      this.priceData = this.priceData.filter(getData => {
        console.log(getData.datetime.split('T')[0]);
        console.log(date.split('T')[0] === getData.datetime.split('T')[0]);
        return date.split('T')[0] === getData.datetime.split('T')[0];
      });
    }

    if(this.f.value.cdate !== null) {
      const date  = this.f.value.cdate.toISOString();;
      console.log(date.split('T')[0]);
      this.priceData = this.priceData.filter(getData => {
        console.log(getData.cDate.split('T')[0]);
        console.log(date.split('T')[0] === getData.cDate.split('T')[0]);
        return date.split('T')[0] === getData.cDate.split('T')[0];
      });

    }

    if (this.f.value.servise !==  null) {
      const date = this.f.value.servise;
      console.log(date, '3');
      this.priceData = this.priceData.filter(getData => {
        console.log(getData.service);
        return date === getData.service;
      });
      console.log(this.priceData);
    }

    if  (this.f.value.searchOption !==  null) {
      const date = this.f.value.searchOption;
      console.log(date, '4');

      if  (date === 'User') {
        if  (this.f.value.search !==  null) {
          const date1 = this.f.value.search;
          console.log(date1, '5');
          this.priceData = this.priceData.filter(getData => {
            console.log(getData.name === date1);
            return date1 === getData.name;
          });
        }
      }

      if (date === 'Pickup Addresh')  {
        if  (this.f.value.search !==  null) {
          const date1 = this.f.value.search;
          console.log(date1, '5');
          this.priceData = this.priceData.filter(getData => {
            console.log(getData.pickup === date1);
            return date1 === getData.pickup;
          });
        }
      }

      if (date === 'Drop Addresh')  {
        if  (this.f.value.search !==  null) {
          const date1 = this.f.value.search;
          console.log(date1, '5');
          this.priceData = this.priceData.filter(getData => {
            console.log(getData.drop === date1);
            return date1 === getData.drop;
          });
        }
      }

    }
  }




  onCancel(){
    console.log('hello');
    console.log(this.priceData);
    this.task11.onReadEmployee();
    // tslint:disable-next-line: no-unused-expression
    this.f = this.fb.group({
      name: [null],
      email: [null],
      mobile: [null],
      cdate: [null],
      datetime: [null],
      drop: [null],
      pickup: [null],
      maindistance: [null],
      dtime: [null],
      price: [null],
      search: [null],
      servise: [null],
      searchOption: [null],
      newSearch: [null],
    });

  }


  getRadio(name) {
    this.driver = name._id,
    console.log(this.driver);
    // this.driverid = {
    //   id: name._id,
    // }
    // console.log(this.id);
  }


  onAssign(item) {        
    this.newemployeeData = [];
    console.log(item);
    this.userid = item._id;
    this.id = this.userid;
    console.log(this.userid);
    console.log(this.employeeData);
    for(let i = 0 ; i <= 50 ; i++) {
      if(item.service   ===   this.employeeData[i].service) {
        console.log('yes');
        console.log(this.employeeData[i]);
        this.newemployeeData.push(this.employeeData[i]);
        console.log(this.newemployeeData);
      }
    }

  }


  selectedDriver() {
    console.log('click');
    console.log(this.id,'user');
    console.log(this.driver,'driver');
    this.task10.onUpdateReq(this.id, this.driver).subscribe(() => {
    })
  }

  selectAnyDriver(){
    console.log('hello');
    console.log(this.id);
    console.log(this.employeeData);
    for (let i = 0; i <= 50; i++) {
      console.log(this.employeeData[i]._id);
      this.anyDriver = this.employeeData[i]._id;
      console.log(this.anyDriver);
      this.task10.onUpdateReqAny(this.id, this.anyDriver).subscribe(() => {
     });
     setTimeout(() => {
      console.log(this.employeeData[i]);
      const id = this.employeeData[i]._id;
      const data = {
        _id: this.employeeData[i]._id,
          name: this.employeeData[i].name,
          email: this.employeeData[i].email,
          mobile: this.employeeData[i].mobile,
          status: this.employeeData[i].status,
          service: this.employeeData[i].service,
          city: this.employeeData[i].city,
          cname: this.employeeData[i].cname,
          AcceptTrip: this.employeeData[i].AcceptTrip,
          lat: this.employeeData[i].lat,
          lng: this.employeeData[i].lng,
          request: ''
      }
      console.log(data);
      // tslint:disable-next-line: no-shadowed-variable
      this.task10.onUpdateReqNew(id,data).subscribe(data => {
        console.log(data);
        this.onReadEmployee();
      });
     }, 30000);

    }

  }

  onGet(item) {
    this.show = true;
    this.userData = item;
   console.log(this.userData);
  }

  onReadEmployee() {
    this.task11.onReadEmployee().subscribe(data => {
      this.priceData = data;
      console.log(this.priceData);
    });
  }

  onDelete(id: any) {
    console.log('hbhsd');
    console.log(id);
    this.task11.onDeleteEmployee(id).subscribe(data => {
      console.log(data);
      this.onReadEmployee();
    });
  }

}

