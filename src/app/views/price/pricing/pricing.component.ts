import { Component, OnInit } from '@angular/core';
import {  Task1Service } from '../Service/task-1.service';
import { HttpClient } from '@angular/common/http';
// import { Task8Service } from '../Service/task-8.service';
// import { ServiceServiceMap } from '../shared/AllServise/task6.servise';
import {Task9Service } from '../Service/task-9.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, FormControlName } from '@angular/forms';
import { Task8Service } from '../Service/task-8.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  cntName: [];
  driverName: [];
  zoneData: [];
  f: FormGroup;
  vehicleprices: any = [];

  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder , private http: HttpClient , private countryServise: Task1Service ,
     private driverServise: Task8Service ,
     private task9service : Task9Service) { }

  ngOnInit() {
    console.log(this.vehicleprices);
    this.onReadEmployee();
    this.countryServise.onReadEmployee();
    this.countryServise.countryName.subscribe(cnm => {
      this.cntName = cnm;
      console.log(cnm);
    });

    this.driverServise.getCar();
    this.driverServise.carData.subscribe(driver => {
      this.driverName = driver;
      console.log(driver);
    });

    // this.ServiceServiceMap.onReadEmployee();
    // this.ServiceServiceMap.zoneData.subscribe(driver => {
    //   this.zoneData = driver;
    //   console.log(this.zoneData);
    // });
    this.f = this.fb.group({
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      type: [null, [Validators.required]],
      maxspace: [null, [Validators.required]],
      providerprofit: [null, [Validators.required]],
      minfare: [null, [Validators.required]],
      distanceforbaseprice: [null, [Validators.required]],
      baseprice: [null, [Validators.required]],
      priceperunitdistance: [null, [Validators.required]],
      priceperunittime: [null, [Validators.required]],
    });

  }


onReadEmployee() {
  this.task9service.onReadEmployee().subscribe(data => {
    this.vehicleprices = data;
    console.log(this.vehicleprices);
  });
}


  onAddEmployee(){
    const newEmployee = {
      country : this.f.value.country,
      city : this.f.value.city,
      type : this.f.value.type,
      maxspace : this.f.value.maxspace,
      providerprofit : this.f.value.providerprofit,
      minfare : this.f.value.minfare,
      distanceforbaseprice : this.f.value.distanceforbaseprice,
      baseprice : this.f.value.baseprice,
      priceperunitdistance : this.f.value.priceperunitdistance,
      priceperunittime : this.f.value.priceperunittime
    }
    console.log(newEmployee);
    alert('Successfull your data stored in database!!')
    this.task9service.onAddEmployee(newEmployee).subscribe(data => {
      this.vehicleprices.push(data);
    });
  }


}
