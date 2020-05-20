import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, FormControlName } from '@angular/forms';
import { Task7Service } from '../user/Service/task-7.service';
import {  Task1Service } from '../price/Service/task-1.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from './Model/Task-7Model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  page = 10;
  pageSize = 5;
  collectionSize = 20;
  editMode = false;
  id: any;
  name = new FormControl('');
  email = new FormControl('');
  mobile = new FormControl('');
  cname = new FormControl('');
  f: FormGroup;
 search: string;
  emp: any = [];
  selectedFile = null;
  coun: any = [];
  countryData: any = [];
  cntName:[];
  countries: any = [];
  images: any;
  userData: any;



  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private http: HttpClient , private employeeServise: Task7Service, private countryServise:  Task1Service ) { }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {

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

    // this.http.post<any>('http://localhost:3000/task8/file', formData).subscribe(
      // (res) => console.log(res),
      // (err) => console.log(err)
    // )
  }

  ngOnInit() {
    this.countryServise.onReadEmployee();
    this.countryServise.countryName.subscribe(cnm => {
      this.cntName = cnm;
      console.log(this.cntName, 'past country');
    });

    this.onReadEmployee(),
    this.f = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      cname: [null, [Validators.required]],
    });
  }

  // insert employee data
  onAddEmployee() {
    this.editMode = false;
    {
    const newEmployee = {
      name: this.f.value.name,
      email: this.f.value.email,
      mobile: this.f.value.mobile,
      cname: this.f.value.cname,
    };
    this.employeeServise.onAddEmployee(newEmployee).subscribe(data => {
      console.log(data);
      this.onReadEmployee();
      this.emp.push(data);
      this.f = this.fb.group({
        name: null,
        email: null,
        mobile: null,
        cname: null,
      });

    });
    console.log(this.f.value.name);
    console.log(this.f.value.email);
    console.log(this.f.value.mobile);
  }
}

// read all employee
  onReadEmployee() {
    this.employeeServise.onReadEmployee().subscribe(data => {
      console.log(data);
      this.emp = data;
    });
  }

// delete  employee by id
  onDeleteEmployee(id: any) {
    console.log(id);
    this.employeeServise.onDeleteEmployee(id).subscribe(deleteData => {
      this.onReadEmployee();
      console.log(deleteData);
    });
  }

// when update click get exist value by id from table
  Update(emp: Employee ) {
    this.editMode = true,
    this.id = emp._id,
    console.log(this.id);
    this.f.controls.name.setValue(emp.name),
    this.f.controls.email.setValue(emp.email),
    this.f.controls.mobile.setValue(emp.mobile),
    this.f.controls.cname.setValue(emp.cname),
    console.log(emp);

  }

// update all employee data by id
  onUpdateEmployee(id: any) {
    const user = {
      name: this.f.value.name,
      email: this.f.value.email,
      mobile: this.f.value.mobile,
      cname: this.f.value.cname,
    };
    console.log(user);
    this.employeeServise.onUpdateEmployee(this.id,user).subscribe(() => {
       console.log(this.onUpdateEmployee ) ;
       this.onReadEmployee();
     });
     this.f = this.fb.group({
      name: null,
      email: null,
      mobile: null,
      cname: null,
    });
    this.editMode = false;

  }

// sorting logic by all coloumn click
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

onSearch() {
  this.userData = this.emp;
  console.log(this.userData);
  console.log(this.emp);



}



onCancel() {
return this.emp;
}



}






