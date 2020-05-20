import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder , FormGroup, Validators } from '@angular/forms';
import { Task8Service } from '../Service/task-8.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit

{
  carForm:FormGroup
  updateMode=false
  updateId
  image
  carData:any//Car[]
  constructor(private carService:Task8Service){}
  ngOnInit()
  {
    this.carForm=new FormGroup({
      carName:new FormControl(),
      carImage:new FormControl()
    })
    this.getUpdatedCar();
  }
  selectImage(event)
  {
   //console.log(event)
   if(event.target.files.length>0)
   {
     const file=event.target.files[0];
     this.image=file;
   }
   //console.log(this.image)
   this.carService.uploadFile(this.image);
  }
  onAdd()
  {
    console.log('first');
    if(this.updateMode)
    {
      this.carService.updateCar(this.updateId,this.carForm.value,this.image);
      this.updateMode=false;
      this.carForm.reset();
    }
    else
    {
      console.log('second');
      this.carService.onAdd(this.carForm.value,this.image)
      this.carForm.reset();

    }
    this.getUpdatedCar();

  }
  onUpdate(updateCar)
  {
    this.updateMode=true
    this.updateId=updateCar._id
    this.carForm.controls['carName'].setValue(updateCar.carName);
    //this.carForm.controls['carImage'].setValue(updateCar.carImage);
  }
  onDelete(id)
  {
    // console.log(id)
    this.carService.deleteCar(id);
    this.getUpdatedCar();
  }
  getUpdatedCar()
  {
    this.carService.getCar();
    this.carService.carData.subscribe((data:any)=>{
    this.carData=data;
    })
  }
  onCancel()
  {
    this.updateMode=null;
    this.updateId=null;
    this.carForm.reset();
  }
}
