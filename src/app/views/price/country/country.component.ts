import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder , FormGroup } from '@angular/forms';
import { Task1Service } from '../Service/task-1.service';
import { Country } from '../Model/Task-1Model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  search: string;
  flag = new FormControl('');
  name = new FormControl('');
  currencySymbol = new FormControl('');
  numericCode = new FormControl('');
  currencyCode = new FormControl('');
  lat = new FormControl('');
  lng = new FormControl('');
  f: FormGroup;
  coun: any = [];
  editmode = false;
  id: any;

  countries: any = [];
  i: any;
  currencySignList: any;

  constructor(private fb: FormBuilder, private http: HttpClient , private employeeServise: Task1Service) { }

  ngOnInit() {
    const resp = this.http.get('https://restcountries.eu/rest/v2/all');
    resp.subscribe((data) => {
      this.countries = data;
    })
    this.onReadEmployee(),
    this.f = this.fb.group({
      flag: null,
      name: null,
      currencySymbol: null,
      numericCode: null,
      currencyCode: null,
      lat: null,
      lng: null
    });
  }

//modal add button event
  addCountry() {
    console.log('hbecjh');
    this.f = this.fb.group({
      flag: null,
      name: null,
      currencySymbol: null,
      numericCode: null,
      currencyCode: null,
      lat: null,
      lng: null
    });
  }


  onAddEmployee() {
    const newEmployee = {
      flag: this.f.value.flag,
      name: this.f.value.name,
      currencySymbol: this.f.value.currencySymbol,
      numericCode: this.f.value.numericCode,
      currencyCode: this.f.value.currencyCode,
      lat: this.f.value.lat,
      lng: this.f.value.lng
    };
    console.log(newEmployee);
    this.employeeServise.onAddEmployee(newEmployee).subscribe(data => {
      // console.log(data);
      this.coun.push(newEmployee);
      console.log(this.coun,'hello');
      this.f = this.fb.group({
        flag: null,
        name: null,
        currencySymbol: null,
        numericCode: null,
        currencyCode: null,
        lat: null,
        lng: null
      });
     });
     this.onReadEmployee();
}


onReadEmployee() {
  this.employeeServise.onReadEmployee().subscribe(data => {
    this.coun = data;
  });
}

update(coun: Country ) {
   this.editmode = true;
   this.id=coun._id;

   this.f.controls.name.patchValue(coun.name);
   this.f.controls.currencySymbol.patchValue(coun.currencySymbol);
   this.f.controls.flag.patchValue(coun.flag);
   this.f.controls.numericCode.setValue(coun.numericCode);
   this.f.controls.currencyCode.setValue(coun.currencyCode);
   this.f.controls.lat.patchValue(coun.lat);
   this.f.controls.lng.patchValue(coun.lng);
}

onUpdateEmployee(id: any) {
  const user = {
    // id: this.id,
    name: this.f.value.name,
    currencySymbol: this.f.value.currencySymbol,
    flag: this.f.value.flag,
    numericCode: this.f.value.numericCode,
    currencyCode: this.f.value.currencyCode,
    lat: this.f.value.lat,
    lng: this.f.value.lng
  };
  console.log(this.id);
  console.log(user);
  this.employeeServise.onUpdateEmployee(this.id,user).subscribe(() => {
    console.log(this.onUpdateEmployee);
    this.onReadEmployee();
  })
}

delete(id: any){
  console.log(this.coun);
  this.employeeServise.onDeleteEmployee(id).subscribe(deleteData => {
    this.onReadEmployee();
  });
}

// tslint:disable-next-line: ban-types
onSelectCountry(event: any){
  const CountryName = event.target.value;
  this.countries.filter(country => {
    if (country.name === CountryName) {
      console.log(this.currencySymbol);
      this.f.patchValue({
        currencySymbol: country.currencies[0].symbol,
        flag: country.flag,
        numericCode: country.numericCode,
        currencyCode: country.currencies[0].code,
        lat: country.latlng[0],
        lng: country.latlng[1]
      });
    }
  });
}




}
