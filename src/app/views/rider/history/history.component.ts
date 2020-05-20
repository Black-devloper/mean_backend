import { Component, OnInit } from '@angular/core';
import { Task11Service } from '../Service/task-11.service';
import { Task8Service } from '../../price/Service/task-8.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task1Service } from '../../price/Service/task-1.service';
import { Task10Service } from '../../driver/Service/task-10.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  priceData: any = [];
  priceData1: any = [];
  show : boolean = false;
  userData: any = [];
  driverName: any;
  f: FormGroup;
  drName: any = [];
  page = 10;
  pageSize = 3;
  collectionSize = 20;
  cntName: any;

  // tslint:disable-next-line: max-line-length
  constructor( private task11: Task11Service , private fb: FormBuilder , private driverServise: Task8Service,private task10: Task10Service, private task1:Task1Service) { }

  ngOnInit(): void {

    this.driverServise.getCar();
    this.driverServise.carData.subscribe(driver => {
      this.driverName = driver;
      console.log(driver);
    });

    this.task10.onReadEmployee();
    this.task10.employeeName.subscribe(data => {
      // console.log(data);
      this.drName = data;
      // console.log(this.drName);
    })

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
      cname: [null],
      historyStatus: [null],
      mobile: [null],
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


  changeColor(item){
    console.log(item.historyStatus);
  }

  onSearch() {
    this.priceData = this.priceData1;
    console.log(this.priceData1);
    console.log(this.priceData);
    if (this.f.value.datetime !==  null) {
      const date = this.f.value.datetime;
      console.log(date, '1');
      this.priceData = this.priceData.filter(getData => {
        console.log(getData.datetime);
        console.log(date === getData.datetime);
        return date === getData.datetime;
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


    if (this.f.value.cname !==  null) {
      const date = this.f.value.cname;
      console.log(date, '3');
      this.priceData = this.priceData.filter(getData => {
        console.log(getData.cname);
        return date === getData.cname;
      });
      console.log(this.priceData);
    }

    if (this.f.value.historyStatus !==  null) {
      const date = this.f.value.historyStatus;
      console.log(date, '3');
      this.priceData = this.priceData.filter(getData => {
        console.log(getData.historyStatus);
        return date === getData.historyStatus;
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
      cname: [null],
      datetime: [null],
      drop: [null],
      pickup: [null],
      maindistance: [null],
      historyStatus: [null],
      dtime: [null],
      price: [null],
      search: [null],
      servise: [null],
      searchOption: [null],
      newSearch: [null],
    });

  }

  onGet(item){
    this.show = true;
    this.userData = item;
   console.log(this.userData);
  }

}
