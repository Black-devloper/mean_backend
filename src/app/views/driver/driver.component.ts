import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, FormControlName } from '@angular/forms';
import { DriverAssign } from '../driver/Model/Task-10Model';
import { HttpClient } from '@angular/common/http';
import { Task10Service } from '../driver/Service/task-10.service';
import { Task12Service } from '../rider/Service/task-12.service';
import {  Task1Service } from '../price/Service/task-1.service';
import { Task8Service } from '../price/Service/task-8.service';
import { Task11Service } from '../rider/Service/task-11.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driverId: { _id: any; name: any; email: any; mobile: any; status: any; service: any; request: any; };

  page = 10;
  pageSize = 4;
  collectionSize = 20;
  editMode = false;
  approved = false;
  id: any;
  service = new FormControl('');
  cname = new FormControl('');
  name = new FormControl('');
  email = new FormControl('');
  mobile = new FormControl('');
  lat = new FormControl('');
  lng = new FormControl('');
  city = new FormControl('');
  f: FormGroup;
 search: string;
  emp: any = [];
  allName:[];
  aa: any = [];
  cntName:[];
  driverName:[];
  onlyName:[];
  comingData:[];
  countries: [] = [];
  updCar;
  images: any;
  imagePreview: string | ArrayBuffer;
  priceData: any = [];
  myRequestData: any = [];
  acceptData: any = [];
  newReqData: any = [];
  da:boolean=false;
  dId: any = [];
  tripData:any = [];
  userId : any = [];

  constructor(private fb: FormBuilder, private http: HttpClient ,
     private employeeServise: Task10Service,
     private countryServise: Task1Service ,
     private task12: Task12Service ,
     private task11: Task11Service,
     private driverServise: Task8Service
      ) {}


  ngOnInit() {

    console.log(this.myRequestData);

    this.task11.onReadEmployee();
    this.task11.priceName.subscribe(data => {
      this.priceData = data;
      console.log(this.priceData,data);
    })

    this.countryServise.onReadEmployee();
    this.countryServise.countryName.subscribe(cnm => {
      this.cntName = cnm;
      console.log(this.cntName, 'past country');
    });

    this.driverServise.getCar();
    this.driverServise.carData.subscribe(driver => {
      this.driverName = driver;
      console.log(driver);
    });

    this.onReadEmployee(),
    this.f = this.fb.group({
      cname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      lng: [null, [Validators.required]],
      city: [null, [Validators.required]],

    });

  }


  // add employee method
  onAddEmployee() {
    this.editMode = false;
    {
      const newEmployee = {
      cname: this.f.value.cname,
      lat: this.f.value.lat,
      lng: this.f.value.lng,
      name: this.f.value.name,
      email: this.f.value.email,
      mobile: this.f.value.mobile,
      status: 'Decline',
      service: '',
      request: '',
      AcceptTrip: [],
      city: this.f.value.city

    };
    this.employeeServise.onAddEmployee(newEmployee).subscribe(data => {
      this.emp.push(data);
      this.onReadEmployee();
      this.f = this.fb.group({
        cname: null,
        name: null,
        email: null,
        mobile: null,
        lat: null,
        lng: null,
        city: null
      });
    });
  }
}

 // read employee method
  onReadEmployee() {
    this.employeeServise.onReadEmployee().subscribe(data => {
      this.emp = data;
    });
  }

   // delete employee method
  onDeleteEmployee(id: any) {
    console.log(id);
    this.employeeServise.onDeleteEmployee(id).subscribe(deleteData => {
      this.onReadEmployee();
    });
  }


  // when update click get all value by id
  Update(emp: DriverAssign ) {
    this.editMode = true,
    this.id = emp._id,
    console.log(this.id);
    this.f.controls.name.setValue(emp.name),
    this.f.controls.cname.setValue(emp.cname),
    this.f.controls.email.setValue(emp.email),
    this.f.controls.mobile.setValue(emp.mobile),
    this.f.controls.lat.setValue(emp.lat),
    this.f.controls.lng.setValue(emp.lng),
    console.log(emp);
  }

  onAssignDriver(car) {
    console.log(car.name);
    const user = {
      id: this.updCar.id,
      name: this.updCar.name,
      email: this.updCar.email,
      mobile: this.updCar.mobile,
      service: car.carName
    };
    console.log(user);
    this.employeeServise.onUpdateEmployee(this.id,user).subscribe((data) => {
      console.log(data);
      this.onReadEmployee();
    });
  }

  updateAssign(emp)
  {
    const user = {
      id: emp._id,
      name: emp.name,
      email: emp.email,
      mobile: emp.mobile,
      service: emp.service

    };
    this.updCar = user;
    console.log(this.updCar);
  }

  selectedImage(event){
    if(event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.images = file;
    }
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3000/task8/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }


onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.f.patchValue({avtar: file});
  this.f.get('avtar').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result;
  };
  reader.readAsDataURL(file);
}



   // add employee method
  onUpdateEmployee(id: any) {
    const user = {
      id: this.id,
      name: this.f.value.name,
      cname: this.f.value.cname,
      email: this.f.value.email,
      mobile: this.f.value.mobile,
      lat: this.f.value.lat,
      lng: this.f.value.lng,
      service: this.f.value.service,
      avtar: this.f.value.avtar,

    };
    console.log(user);

    this.employeeServise.onUpdateEmployee(this.id,user).subscribe(() => {
       console.log( this.onUpdateEmployee ) ;
       this.onReadEmployee();
       this.f = this.fb.group({
        name: null,
        email: null,
        mobile: null,
        avtar: null,
        cname: null,
        lat: null,
        lng: null
      });
     });
  }



  onUpdateAccept(user,emp) {
    this.acceptData = [];
    console.log(user);
    console.log(emp);
    this.task11.getReqData(user).subscribe(da => {
      console.log(da);
       this.acceptData.push(da);
      console.log(this.acceptData);
    });

  }


  onUpdateRequest(user, emp){
    this.myRequestData = [];
    this.userId = user;
    console.log(user,'user request');
    console.log(emp._id, 'driver id');
     this.dId = emp;
    console.log(this.dId);
    console.log(emp,'driver');
    this.task11.getReqData(user).subscribe(da => {
      console.log(da);
       this.myRequestData.push(da);
      console.log(this.myRequestData);
    });
  }



  onStatusChange(emp)
  {
    this.id = emp._id;
    console.log(this.id);

    let newStatus = emp.status;
    if (newStatus === 'Decline') {
      newStatus = 'Approved';
    } else {
      newStatus = 'Decline';
    }
    const user: any = {
      id: this.id,
      cname: emp.cname,
      name: emp.name,
      email: emp.email,
      mobile: emp.mobile,
      status: newStatus,
      service: emp.service,
      lat: emp.lat,
      lng: emp.lng,
    };
    console.log(user);
    this.employeeServise.onUpdateEmployee(this.id,user).subscribe(() => {
      console.log( this.onUpdateEmployee ) ;
      this.onReadEmployee();
      this.f = this.fb.group({
       name: null,
       email: null,
       mobile: null,
       cname: null,
       lat: null,
       lng: null
     });
    });
  }

  onReject(user) {
    console.log(this.dId);
    const id = this.dId._id;
    const data = {
      _id: this.dId._id,
        name: this.dId.name,
        email: this.dId.email,
        mobile: this.dId.mobile,
        status: this.dId.status,
        service: this.dId.service,
        city: this.dId.city,
        cname: this.dId.cname,
        AcceptTrip: this.dId.AcceptTrip,
        lat: this.dId.lat,
        lng: this.dId.lng,
        request: ''
    }
    console.log(data);
    // tslint:disable-next-line: no-shadowed-variable
    this.employeeServise.onUpdateReqNew(id,data).subscribe(data => {
      console.log(data);
      this.onReadEmployee();
    });

    console.log(this.userId);
    this.task11.getReqData(this.userId).subscribe(data => {
      console.log(data);
      this.tripData = data;
      console.log(this.tripData);
      const neData = {
        _id: this.tripData._id,
        name: this.tripData.name,
        email: this.tripData.email,
        mobile: this.tripData.mobile,
        payment: this.tripData.payment,
        pickup: this.tripData.pickup,
        waypoint: this.tripData.waypoint,
        drop: this.tripData.drop,
        datetime: this.tripData.datetime,
        maindistance: this.tripData.maindistance,
        service: this.tripData.service,
        avtar: this.tripData.avtar,
        dtime: this.tripData.dtime,
        price: this.tripData.price,
        assign: 'Reassign',
        historyStatus: 'Rejected',
        cDate: this.tripData.cDate,
      }
      console.log(neData);
      this.task11.onUpdateEmployeeAssign(this.userId,neData).subscribe(data => {
        console.log(data);
        this.onReadEmployee();
      });
    })

  }



    onAccept() {
      console.log(this.dId);
      const newData = this.dId._id;
      console.log(newData);
      const mydata = {
        id: this.dId._id,
        name: this.dId.name,
        email: this.dId.email,
        mobile: this.dId.mobile,
        status: this.dId.status,
        service: this.dId.service,
        request: '',
        AcceptTrip: this.dId.request
      }
      console.log(mydata);
      this.employeeServise.onUpdateReqNewAccept(this.id, mydata).subscribe((data) => {
        console.log(data);
          this.onReadEmployee();
        });


        console.log(this.userId);
        this.task11.getReqData(this.userId).subscribe(data => {
          console.log(data);
          this.tripData = data;
          console.log(this.tripData);
          const neData = {
            _id: this.tripData._id,
            name: this.tripData.name,
            email: this.tripData.email,
            mobile: this.tripData.mobile,
            payment: this.tripData.payment,
            pickup: this.tripData.pickup,
            waypoint: this.tripData.waypoint,
            drop: this.tripData.drop,
            datetime: this.tripData.datetime,
            maindistance: this.tripData.maindistance,
            service: this.tripData.service,
            avtar: this.tripData.avtar,
            dtime: this.tripData.dtime,
            price: this.tripData.price,
            assign: this.tripData.assign,
            historyStatus: 'Accepted',
            cDate: this.tripData.cDate,
          }
          console.log(neData);
          this.task11.onUpdateEmployeeAssign(this.userId,neData).subscribe(data => {
            console.log(data);
            this.onReadEmployee();
          });
        })
  }

 // sorting by all coloumn
sortingName(n) {
  // tslint:disable-next-line: one-variable-per-declaration
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById('empTable');
  switching = true;
  dir = 'asc';
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      if (dir === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount === 0 && dir === 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

}



