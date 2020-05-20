import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class Task8Service
{
  carData=new Subject<any>();
  constructor(private postReq:HttpClient,private from:FormBuilder) { }
  onAdd(carData,fromData)
  {
    console.log('third');
    console.log(carData,fromData);
    //this.uploadFile(this.carData)
    const formData=new FormData();
    formData.append('file',fromData);
     this.postReq.post<any>('http://localhost:3000/api/Vehicle/upd',formData).subscribe(res=>{
      console.log(res)
    });
    setTimeout(()=>
    {
      this.postReq.post('http://localhost:3000/api/Vehicle/add', carData).subscribe(data => {
        console.log(data);
        this.getCar();
      });
    },1000)

  }
  uploadFile(fromData)
  {
   //console.log(carData)
    // const formData=new FormData();
    // formData.append('file',fromData);
    //  this.postReq.post<any>('http://localhost:3000/task7/upd',formData).subscribe(res=>{
    //   console.log(res)
    // });
  }
  updateCar(id,data,fromData)
    {
      const formData=new FormData();
      formData.append('file',fromData);
      this.postReq.post<any>('http://localhost:3000/api/Vehicle/upd',formData).subscribe(res=>{
        });
        setTimeout(()=>{
          const updateData={
            id:id,
            data:data
          }
        this.postReq.patch('http://localhost:3000/api/Vehicle/update',updateData).subscribe(data => {
          this.getCar();
        });
      },100)
    }
    deleteCar(id)
    {
      const deleteId={
        id:id
      }
        this.postReq.post('http://localhost:3000/api/Vehicle/delete',deleteId).subscribe(data => {
            this.getCar();
        });
        // console.log('ok',deleteId)
    }
    getCar()
    {
        this.postReq.post('http://localhost:3000/api/Vehicle/fetchAll',{}).subscribe(data=>{
        this.carData.next(data)
    })

  }
}
